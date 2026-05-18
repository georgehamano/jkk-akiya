const GITHUB_API = 'https://api.github.com'
const REPO = 'georgehamano/jkk-akiya-monitor'
const PREFS_PATH = 'user_prefs.json'

export type UserPrefs = Record<string, string[] | null>

export async function loadPrefs(): Promise<{ prefs: UserPrefs; sha: string }> {
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
  const data = (await res.json()) as { content: string; sha: string }
  const prefs = JSON.parse(
    Buffer.from(data.content.replace(/\n/g, ''), 'base64').toString('utf-8'),
  ) as UserPrefs
  return { prefs, sha: data.sha }
}

export async function savePrefs(prefs: UserPrefs, sha: string): Promise<void> {
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
