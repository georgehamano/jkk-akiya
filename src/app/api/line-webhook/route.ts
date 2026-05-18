import crypto from 'node:crypto'
import { loadPrefs, savePrefs } from '@/lib/userPrefs'
import { isValidArea, TOKYO_23_WARDS, TAMA_CITIES } from '@/lib/areas'

export const runtime = 'nodejs'

const LINE_REPLY_URL = 'https://api.line.me/v2/bot/message/reply'

function verifySignature(rawBody: string, signature: string): boolean {
  const secret = process.env.LINE_CHANNEL_SECRET ?? ''
  const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('base64')
  const a = Buffer.from(expected)
  const b = Buffer.from(signature)
  if (a.length !== b.length) return false
  return crypto.timingSafeEqual(a, b)
}

async function replyText(replyToken: string, text: string): Promise<void> {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN ?? ''
  await fetch(LINE_REPLY_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ replyToken, messages: [{ type: 'text', text }] }),
  })
}

function parseAreas(text: string): { valid: string[]; invalid: string[] } {
  const tokens = text
    .split(/[、,，\s　]+/)
    .map((t) => t.trim())
    .filter(Boolean)
  const valid: string[] = []
  const invalid: string[] = []
  for (const t of tokens) {
    if (isValidArea(t)) valid.push(t)
    else invalid.push(t)
  }
  return { valid, invalid }
}

function describePrefs(areas: string[] | null): string {
  if (areas === null || areas.length === 0) return '全エリア'
  return areas.join('、')
}

const WELCOME =
  'JKK空き家速報へようこそ！\n\n' +
  '空き家が出たとき自動でお知らせします。\n\n' +
  '通知エリアを絞りたい場合はメニューの「地域指定」をタップしてください。\n' +
  '初期設定では全エリアの通知を受け取ります。'

const AREA_GUIDE =
  '【通知エリアの設定】\n\n' +
  '通知したい区・市名を送ってください。\n' +
  '複数まとめて送るときはスペース区切り。\n\n' +
  '例：\n' +
  '　港区\n' +
  '　港区 江東区 世田谷区\n\n' +
  '■23区\n' +
  TOKYO_23_WARDS.join(' ') + '\n\n' +
  '■多摩地域\n' +
  TAMA_CITIES.join(' ') + '\n\n' +
  '【その他】\n' +
  '「全エリア」→ 地域フィルター解除\n' +
  '「確認」→ 現在の設定を表示\n' +
  '※同じ区・市名を再送すると解除されます'

const HELP =
  '区・市名を送ると通知する地域を設定できます。\n' +
  '使い方を表示するにはメニューの「地域指定」をタップしてください。'

export async function POST(request: Request): Promise<Response> {
  const rawBody = await request.text()
  const sig = request.headers.get('x-line-signature') ?? ''

  if (!verifySignature(rawBody, sig)) {
    return new Response('Unauthorized', { status: 401 })
  }

  const payload = JSON.parse(rawBody) as { events: Array<Record<string, unknown>> }

  for (const event of payload.events) {
    const userId = (event.source as Record<string, string>)?.userId
    if (!userId) continue

    try {
      if (event.type === 'follow') {
        const { prefs, sha } = await loadPrefs()
        if (!(userId in prefs)) {
          prefs[userId] = null
          await savePrefs(prefs, sha)
        }
        await replyText(event.replyToken as string, WELCOME)

      } else if (event.type === 'unfollow') {
        const { prefs, sha } = await loadPrefs()
        delete prefs[userId]
        await savePrefs(prefs, sha)

      } else if (event.type === 'message') {
        const msg = event.message as Record<string, string>
        if (msg.type !== 'text') continue
        const text = (msg.text ?? '').trim()
        const replyToken = event.replyToken as string

        if (text === '地域指定' || text === 'エリア設定' || text === 'メニュー') {
          await replyText(replyToken, AREA_GUIDE)

        } else if (text === '確認') {
          const { prefs } = await loadPrefs()
          const areas = prefs[userId] ?? null
          await replyText(replyToken, `現在の設定：${describePrefs(areas)}`)

        } else if (text === 'リセット' || text === '全エリア') {
          const { prefs, sha } = await loadPrefs()
          prefs[userId] = null
          await savePrefs(prefs, sha)
          await replyText(replyToken, '全エリアの通知に設定しました。')

        } else {
          const { valid, invalid } = parseAreas(text)
          if (valid.length === 0) {
            await replyText(replyToken, HELP)
            continue
          }

          const { prefs, sha } = await loadPrefs()
          const current = prefs[userId] ?? []
          const set = new Set(current)
          const added: string[] = []
          const removed: string[] = []
          for (const a of valid) {
            if (set.has(a)) {
              set.delete(a)
              removed.push(a)
            } else {
              set.add(a)
              added.push(a)
            }
          }
          const next = set.size > 0 ? [...set] : null
          prefs[userId] = next
          await savePrefs(prefs, sha)

          const parts: string[] = []
          if (added.length > 0) parts.push(`追加：${added.join('、')}`)
          if (removed.length > 0) parts.push(`解除：${removed.join('、')}`)
          if (invalid.length > 0) parts.push(`認識できず：${invalid.join('、')}`)
          parts.push(`現在の設定：${describePrefs(next)}`)
          await replyText(replyToken, parts.join('\n'))
        }
      }
    } catch (err) {
      console.error('LINE webhook error:', err)
    }
  }

  return new Response('OK', { status: 200 })
}
