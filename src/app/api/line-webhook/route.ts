import crypto from 'node:crypto'

export const runtime = 'nodejs'

const LINE_REPLY_URL = 'https://api.line.me/v2/bot/message/reply'
const GITHUB_API = 'https://api.github.com'
const REPO = 'georgehamano/jkk-akiya-monitor'
const PREFS_PATH = 'user_prefs.json'

type UserPrefs = Record<string, string[] | null>

function verifySignature(rawBody: string, signature: string): boolean {
  const secret = process.env.LINE_CHANNEL_SECRET ?? ''
  const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('base64')
  const a = Buffer.from(expected)
  const b = Buffer.from(signature)
  if (a.length !== b.length) return false
  return crypto.timingSafeEqual(a, b)
}

async function loadPrefs(): Promise<{ prefs: UserPrefs; sha: string }> {
  const pat = process.env.GITHUB_PREFS_PAT ?? ''
  const res = await fetch(`${GITHUB_API}/repos/${REPO}/contents/${PREFS_PATH}`, {
    headers: {
      Authorization: `Bearer ${pat}`,
      'User-Agent': 'jkk-webhook',
      Accept: 'application/vnd.github+json',
    },
    cache: 'no-store',
  })
  if (!res.ok) return { prefs: {}, sha: '' }
  const data = await res.json() as { content: string; sha: string }
  const prefs = JSON.parse(
    Buffer.from(data.content.replace(/\n/g, ''), 'base64').toString('utf-8')
  ) as UserPrefs
  return { prefs, sha: data.sha }
}

async function savePrefs(prefs: UserPrefs, sha: string): Promise<void> {
  const pat = process.env.GITHUB_PREFS_PAT ?? ''
  const content = Buffer.from(JSON.stringify(prefs, null, 2) + '\n').toString('base64')
  const body: Record<string, string> = {
    message: 'chore: ユーザー設定を更新 [skip ci]',
    content,
  }
  if (sha) body.sha = sha
  await fetch(`${GITHUB_API}/repos/${REPO}/contents/${PREFS_PATH}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${pat}`,
      'Content-Type': 'application/json',
      'User-Agent': 'jkk-webhook',
    },
    body: JSON.stringify(body),
  })
}

async function replyText(replyToken: string, text: string): Promise<void> {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN ?? ''
  await fetch(LINE_REPLY_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ replyToken, messages: [{ type: 'text', text }] }),
  })
}

function isAreaName(text: string): boolean {
  return text.length >= 2 && text.length <= 10 && /[区市町村都道府]$/.test(text)
}

function describePrefs(areas: string[] | null): string {
  if (areas === null || areas.length === 0) return '全エリア'
  return areas.join('、')
}

const WELCOME =
  'JKK空き家速報へようこそ！\n\n' +
  '空き家が出たとき自動でお知らせします。\n\n' +
  '【地域フィルターの設定方法】\n' +
  '区・市名を送ると、その地域のみ通知を受け取れます。\n' +
  '例：「港区」「世田谷区」「八王子市」\n\n' +
  '「全エリア」→ 全地域に戻す\n' +
  '「確認」→ 現在の設定を表示'

const HELP =
  '区・市名を送ると通知する地域を設定できます。\n' +
  '例：「港区」「世田谷区」「八王子市」\n\n' +
  '「全エリア」→ 全地域の通知に戻す\n' +
  '「確認」→ 現在の設定を表示\n\n' +
  '同じ区・市名を送ると解除されます。'

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

        if (text === '確認') {
          const { prefs } = await loadPrefs()
          const areas = prefs[userId] ?? null
          await replyText(replyToken, `現在の設定：${describePrefs(areas)}`)

        } else if (text === 'リセット' || text === '全エリア') {
          const { prefs, sha } = await loadPrefs()
          prefs[userId] = null
          await savePrefs(prefs, sha)
          await replyText(replyToken, '全エリアの通知に設定しました。')

        } else if (isAreaName(text)) {
          const { prefs, sha } = await loadPrefs()
          const current = prefs[userId] ?? null
          let areas: string[] = current ?? []

          if (areas.includes(text)) {
            areas = areas.filter((a) => a !== text)
            const next = areas.length > 0 ? areas : null
            prefs[userId] = next
            await savePrefs(prefs, sha)
            await replyText(replyToken, `${text}を解除しました。\n現在の設定：${describePrefs(next)}`)
          } else {
            areas = [...areas, text]
            prefs[userId] = areas
            await savePrefs(prefs, sha)
            await replyText(replyToken, `${text}を追加しました。\n現在の設定：${describePrefs(areas)}`)
          }

        } else {
          await replyText(replyToken, HELP)
        }
      }
    } catch (err) {
      console.error('LINE webhook error:', err)
    }
  }

  return new Response('OK', { status: 200 })
}
