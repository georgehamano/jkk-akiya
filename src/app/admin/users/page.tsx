import type { Metadata } from "next";
import { revalidatePath } from "next/cache";
import { loadPrefs, savePrefs } from "@/lib/userPrefs";
import { fetchLineFollowerIds } from "@/lib/lineApi";
import { ALL_AREAS } from "@/lib/areas";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "ユーザー管理 | JKK空き家速報",
  robots: { index: false, follow: false },
};

function truncateUserId(id: string): string {
  if (id.length <= 14) return id;
  return `${id.slice(0, 8)}…${id.slice(-4)}`;
}

async function backfillGhostUsers() {
  "use server";
  const [{ prefs, sha }, lineIds] = await Promise.all([
    loadPrefs(),
    fetchLineFollowerIds(),
  ]);
  const ghosts = lineIds.filter((id) => !(id in prefs));
  if (ghosts.length === 0) {
    revalidatePath("/admin/users");
    return;
  }
  for (const id of ghosts) {
    prefs[id] = null;
  }
  await savePrefs(prefs, sha);
  revalidatePath("/admin/users");
}

export default async function AdminUsersPage() {
  const [prefsResult, lineResult] = await Promise.allSettled([
    loadPrefs(),
    fetchLineFollowerIds(),
  ]);

  const prefs = prefsResult.status === "fulfilled" ? prefsResult.value.prefs : {};
  const entries = Object.entries(prefs);

  const lineIds = lineResult.status === "fulfilled" ? lineResult.value : null;
  const lineError = lineResult.status === "rejected" ? String(lineResult.reason) : null;

  const totalUsers = entries.length;
  const noFilterUsers = entries.filter(([, areas]) => !areas || areas.length === 0).length;
  const filteredUsers = totalUsers - noFilterUsers;

  const prefsIdSet = new Set(entries.map(([id]) => id));
  const ghostUserIds = lineIds ? lineIds.filter((id) => !prefsIdSet.has(id)) : [];
  const orphanUserIds = lineIds ? entries.map(([id]) => id).filter((id) => !lineIds.includes(id)) : [];

  const areaPopularity = new Map<string, number>();
  for (const [, areas] of entries) {
    if (!areas) continue;
    for (const a of areas) {
      areaPopularity.set(a, (areaPopularity.get(a) ?? 0) + 1);
    }
  }
  const popularityRanking = [...areaPopularity.entries()].sort((a, b) => b[1] - a[1]);
  const unusedAreas = ALL_AREAS.filter((a) => !areaPopularity.has(a));

  const sortedEntries = entries.sort(([, a], [, b]) => (b?.length ?? 0) - (a?.length ?? 0));

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <section className="bg-[#1A1A1A] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <p className="text-white/50 text-xs tracking-widest uppercase mb-2">Admin / Users</p>
          <h1
            className="text-3xl font-extrabold text-white tracking-tighter"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            LINE通知ユーザー
          </h1>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard
            label="LINE登録"
            value={lineIds?.length ?? totalUsers}
            unit="人"
            note={lineIds ? "LINE API" : "—"}
          />
          <StatCard label="prefs登録" value={totalUsers} unit="人" note="user_prefs.json" />
          <StatCard
            label="未登録（幽霊）"
            value={ghostUserIds.length}
            unit="人"
            note="LINEにいるがprefs未登録"
            warn={ghostUserIds.length > 0}
          />
          <StatCard
            label="エリア指定あり"
            value={filteredUsers}
            unit={`/${totalUsers}人`}
          />
        </div>
      </section>

      {/* LINE側との照合 */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <h2 className="text-sm font-bold text-[#1A1A1A] mb-3 uppercase tracking-wider">
            LINE側との照合
          </h2>

          {lineError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-5 mb-4">
              <p className="text-sm font-bold text-red-700 mb-1">LINE APIエラー</p>
              <p className="text-xs text-red-600 font-mono break-all">{lineError}</p>
              <p className="text-xs text-red-600/80 mt-2">
                認証アカウント・プレミアムアカウントでないと `/v2/bot/followers/ids` は使えない場合があります。
              </p>
            </div>
          )}

          {lineIds && (
            <div className="bg-white rounded-lg border border-[#1A1A1A]/5 p-5">
              {ghostUserIds.length === 0 && orphanUserIds.length === 0 ? (
                <p className="text-sm text-[#1A1A1A]">
                  <span className="inline-block bg-[#06C755]/10 text-[#06C755] rounded px-2 py-0.5 text-xs font-bold mr-2">
                    OK
                  </span>
                  LINE側のフォロワーとprefsが完全に一致しています。
                </p>
              ) : (
                <>
                  {ghostUserIds.length > 0 && (
                    <div className="mb-5">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <p className="text-sm font-bold text-[#1A1A1A]">
                            幽霊ユーザー（LINE登録あり / prefs未登録）：{ghostUserIds.length}人
                          </p>
                          <p className="text-xs text-[#6C757D] mt-1">
                            このユーザーは通知配信の対象になっていません。一括補填すると初期値（全エリア通知）でprefsに追加されます。
                          </p>
                        </div>
                        <form action={backfillGhostUsers}>
                          <button
                            type="submit"
                            className="bg-[#1A1A1A] text-white font-bold text-sm px-5 py-2.5 rounded-lg hover:opacity-90 active:scale-95 transition-all whitespace-nowrap"
                          >
                            一括補填する
                          </button>
                        </form>
                      </div>
                      <div className="bg-[#F8F9FA] rounded p-3 max-h-48 overflow-y-auto">
                        <ul className="text-xs font-mono text-[#1A1A1A]/80 space-y-1">
                          {ghostUserIds.map((id) => (
                            <li key={id} title={id}>
                              {truncateUserId(id)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  {orphanUserIds.length > 0 && (
                    <div className={ghostUserIds.length > 0 ? "pt-5 border-t border-[#1A1A1A]/5" : ""}>
                      <p className="text-sm font-bold text-[#1A1A1A] mb-2">
                        孤児prefs（prefs登録あり / LINE未登録）：{orphanUserIds.length}人
                      </p>
                      <p className="text-xs text-[#6C757D] mb-3">
                        LINEで友だち解除済みだがprefsに残っているユーザー。webhookのunfollow処理失敗の可能性。
                      </p>
                      <div className="bg-[#F8F9FA] rounded p-3 max-h-32 overflow-y-auto">
                        <ul className="text-xs font-mono text-[#1A1A1A]/80 space-y-1">
                          {orphanUserIds.map((id) => (
                            <li key={id} title={id}>
                              {truncateUserId(id)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </section>

      {/* エリア人気 */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <h2 className="text-sm font-bold text-[#1A1A1A] mb-3 uppercase tracking-wider">エリア人気</h2>
          <div className="bg-white rounded-lg border border-[#1A1A1A]/5 p-5">
            {popularityRanking.length === 0 ? (
              <p className="text-sm text-[#6C757D]">エリア指定しているユーザーはまだいません。</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {popularityRanking.map(([area, count]) => (
                  <span
                    key={area}
                    className="inline-flex items-center gap-2 bg-[#F3F4F5] text-[#1A1A1A] rounded-full px-3 py-1.5 text-sm"
                  >
                    <span className="font-medium">{area}</span>
                    <span className="bg-[#1A1A1A] text-white text-xs font-bold rounded-full px-2 py-0.5 min-w-[24px] text-center">
                      {count}
                    </span>
                  </span>
                ))}
              </div>
            )}
            {unusedAreas.length > 0 && (
              <div className="mt-4 pt-4 border-t border-[#1A1A1A]/5">
                <p className="text-xs text-[#6C757D] mb-2">指定されていないエリア（{unusedAreas.length}件）</p>
                <p className="text-xs text-[#6C757D]/70 leading-relaxed">{unusedAreas.join("・")}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ユーザー一覧 */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <h2 className="text-sm font-bold text-[#1A1A1A] mb-3 uppercase tracking-wider">
            ユーザー一覧（{totalUsers}件）
          </h2>
          {totalUsers === 0 ? (
            <div className="bg-white rounded-lg border border-[#1A1A1A]/5 p-12 text-center">
              <p className="text-sm text-[#6C757D]">まだLINE友だち追加されているユーザーはいません。</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-[#1A1A1A]/5 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-[#F8F9FA] text-[#6C757D] text-xs uppercase tracking-wider">
                    <tr>
                      <th className="text-left px-5 py-3 font-semibold">LINE User ID</th>
                      <th className="text-left px-5 py-3 font-semibold w-20">エリア数</th>
                      <th className="text-left px-5 py-3 font-semibold">通知対象エリア</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedEntries.map(([userId, areas]) => {
                      const isAll = !areas || areas.length === 0;
                      return (
                        <tr key={userId} className="border-t border-[#1A1A1A]/5 hover:bg-[#F8F9FA]">
                          <td className="px-5 py-3 font-mono text-xs text-[#1A1A1A]" title={userId}>
                            {truncateUserId(userId)}
                          </td>
                          <td className="px-5 py-3 text-[#6C757D]">{isAll ? "—" : areas.length}</td>
                          <td className="px-5 py-3">
                            {isAll ? (
                              <span className="inline-block bg-[#06C755]/10 text-[#06C755] rounded px-2 py-0.5 text-xs font-bold">
                                全エリア
                              </span>
                            ) : (
                              <div className="flex flex-wrap gap-1">
                                {areas.map((a) => (
                                  <span
                                    key={a}
                                    className="inline-block bg-[#F3F4F5] text-[#1A1A1A] rounded px-2 py-0.5 text-xs"
                                  >
                                    {a}
                                  </span>
                                ))}
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <p className="text-xs text-[#6C757D]/70 mt-3">
            データソース：<code className="bg-[#1A1A1A]/5 px-1.5 py-0.5 rounded">user_prefs.json</code>（jkk-akiya-monitor リポジトリ）
          </p>
        </div>
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  unit,
  note,
  warn,
}: {
  label: string;
  value: number;
  unit?: string;
  note?: string;
  warn?: boolean;
}) {
  return (
    <div
      className={`bg-white rounded-lg border p-5 ${
        warn ? "border-amber-300 bg-amber-50/50" : "border-[#1A1A1A]/5"
      }`}
    >
      <p className="text-xs text-[#6C757D] mb-1.5">{label}</p>
      <p
        className={`text-3xl font-extrabold tracking-tighter ${
          warn ? "text-amber-700" : "text-[#1A1A1A]"
        }`}
        style={{ fontFamily: "Manrope, sans-serif" }}
      >
        {value.toLocaleString()}
        {unit && <span className="text-base font-bold text-[#6C757D] ml-1">{unit}</span>}
      </p>
      {note && <p className="text-[10px] text-[#6C757D]/70 mt-1">{note}</p>}
    </div>
  );
}
