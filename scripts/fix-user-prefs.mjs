#!/usr/bin/env node
// 既存の user_prefs.json で「足立区文京区」のように連結されてしまったエントリを
// 正しい配列に修復する一回限りのスクリプト。
//
// 使い方:
//   GITHUB_PREFS_PAT=ghp_xxxx node scripts/fix-user-prefs.mjs           # dry-run
//   GITHUB_PREFS_PAT=ghp_xxxx node scripts/fix-user-prefs.mjs --write   # 実際に書き込み

const TOKYO_23_WARDS = [
  '千代田区','中央区','港区','新宿区','文京区','台東区','墨田区','江東区',
  '品川区','目黒区','大田区','世田谷区','渋谷区','中野区','杉並区','豊島区',
  '北区','荒川区','板橋区','練馬区','足立区','葛飾区','江戸川区',
]
const TAMA_CITIES = [
  '八王子市','立川市','武蔵野市','三鷹市','青梅市','府中市','昭島市','調布市',
  '町田市','小金井市','小平市','日野市','東村山市','国分寺市','国立市','福生市',
  '狛江市','東大和市','清瀬市','東久留米市','武蔵村山市','多摩市','稲城市','羽村市',
  'あきる野市','西東京市',
]
const VALID = new Set([...TOKYO_23_WARDS, ...TAMA_CITIES])

const REPO = 'georgehamano/jkk-akiya-monitor'
const PATH = 'user_prefs.json'
const PAT = process.env.GITHUB_PREFS_PAT
const WRITE = process.argv.includes('--write')

if (!PAT) {
  console.error('GITHUB_PREFS_PAT が未設定です')
  process.exit(1)
}

function parseRaw(s) {
  // split by 、,，スペース・全角スペース
  const tokens = s.split(/[、,，\s　]+/).map(t => t.trim()).filter(Boolean)
  const out = []
  for (const t of tokens) {
    if (VALID.has(t)) {
      out.push(t)
      continue
    }
    // 連結（例: 足立区文京区）を 区/市 ごとに切る
    const re = /[^区市]+[区市]/g
    let m, matched = false
    while ((m = re.exec(t))) {
      if (VALID.has(m[0])) {
        out.push(m[0])
        matched = true
      }
    }
    if (!matched && t === '23区') {
      out.push(...TOKYO_23_WARDS)
    }
  }
  return out
}

const res = await fetch(`https://api.github.com/repos/${REPO}/contents/${PATH}`, {
  headers: {
    Authorization: `Bearer ${PAT}`,
    'User-Agent': 'fix-user-prefs',
    Accept: 'application/vnd.github+json',
  },
})
if (!res.ok) {
  console.error('GET failed:', res.status)
  process.exit(1)
}
const meta = await res.json()
const prefs = JSON.parse(Buffer.from(meta.content.replace(/\n/g, ''), 'base64').toString('utf-8'))

let changed = 0
for (const [uid, areas] of Object.entries(prefs)) {
  if (!Array.isArray(areas) || areas.length === 0) continue
  const allValid = areas.every(a => VALID.has(a))
  if (allValid) continue

  const merged = areas.flatMap(parseRaw)
  const dedup = [...new Set(merged)]
  const next = dedup.length > 0 ? dedup : null
  console.log(`${uid.slice(0, 12)}... : ${JSON.stringify(areas)} → ${JSON.stringify(next)}`)
  prefs[uid] = next
  changed++
}

console.log(`\n修正対象: ${changed}件`)

if (!WRITE) {
  console.log('(dry-run。実際に書き込むには --write を付けてください)')
  process.exit(0)
}

if (changed === 0) {
  console.log('変更なし。終了。')
  process.exit(0)
}

const body = JSON.stringify({
  message: 'fix: 連結された地域名を正しい配列に修復 [skip ci]',
  content: Buffer.from(JSON.stringify(prefs, null, 2) + '\n').toString('base64'),
  sha: meta.sha,
})
const put = await fetch(`https://api.github.com/repos/${REPO}/contents/${PATH}`, {
  method: 'PUT',
  headers: {
    Authorization: `Bearer ${PAT}`,
    'User-Agent': 'fix-user-prefs',
    'Content-Type': 'application/json',
  },
  body,
})
if (!put.ok) {
  console.error('PUT failed:', put.status, await put.text())
  process.exit(1)
}
console.log('✓ 書き込み完了')
