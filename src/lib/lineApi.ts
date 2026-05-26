const LINE_API = "https://api.line.me/v2/bot";

export async function fetchLineFollowerIds(): Promise<string[]> {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN ?? "";
  if (!token) throw new Error("LINE_CHANNEL_ACCESS_TOKEN is not set");

  const ids: string[] = [];
  let cursor: string | undefined;
  do {
    const url = new URL(`${LINE_API}/followers/ids`);
    url.searchParams.set("limit", "300");
    if (cursor) url.searchParams.set("start", cursor);
    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`LINE followers API: ${res.status} ${body}`);
    }
    const data = (await res.json()) as { userIds: string[]; next?: string };
    ids.push(...data.userIds);
    cursor = data.next;
  } while (cursor);
  return ids;
}
