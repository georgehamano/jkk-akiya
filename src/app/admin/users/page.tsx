import type { Metadata } from "next";
import { loadPrefs } from "@/lib/userPrefs";
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

export default async function AdminUsersPage() {
  const { prefs } = await loadPrefs();
  const entries = Object.entries(prefs);

  const totalUsers = entries.length;
  const noFilterUsers = entries.filter(([, areas]) => !areas || areas.length === 0).length;
  const filteredUsers = totalUsers - noFilterUsers;

  const areaPopularity = new Map<string, number>();
  for (const [, areas] of entries) {
    if (!areas) continue;
    for (const a of areas) {
      areaPopularity.set(a, (areaPopularity.get(a) ?? 0) + 1);
    }
  }
  const popularityRanking = [...areaPopularity.entries()].sort((a, b) => b[1] - a[1]);

  const unusedAreas = ALL_AREAS.filter((a) => !areaPopularity.has(a));

  const sortedEntries = entries.sort(([, a], [, b]) => {
    const aLen = a?.length ?? 0;
    const bLen = b?.length ?? 0;
    return bLen - aLen;
  });

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* ヘッダー */}
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

      {/* 統計カード */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard label="登録ユーザー" value={totalUsers} unit="人" />
          <StatCard label="エリア指定あり" value={filteredUsers} unit="人" />
          <StatCard label="全エリア通知" value={noFilterUsers} unit="人" />
          <StatCard label="指定中エリア数" value={areaPopularity.size} unit={`/${ALL_AREAS.length}`} />
        </div>
      </section>

      {/* エリア人気ランキング */}
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
                          <td className="px-5 py-3 text-[#6C757D]">
                            {isAll ? "—" : areas.length}
                          </td>
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

function StatCard({ label, value, unit }: { label: string; value: number; unit?: string }) {
  return (
    <div className="bg-white rounded-lg border border-[#1A1A1A]/5 p-5">
      <p className="text-xs text-[#6C757D] mb-1.5">{label}</p>
      <p
        className="text-3xl font-extrabold text-[#1A1A1A] tracking-tighter"
        style={{ fontFamily: "Manrope, sans-serif" }}
      >
        {value.toLocaleString()}
        {unit && <span className="text-base font-bold text-[#6C757D] ml-1">{unit}</span>}
      </p>
    </div>
  );
}
