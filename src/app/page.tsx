import { VacancyDashboard } from "@/components/vacancy/VacancyDashboard";
import { fetchVacancies } from "@/lib/fetchVacancies";

const LINE_ADD_FRIEND_URL = "https://lin.ee/Y5P8ovy";

export default async function Home() {
  // サーバーサイドで初期データを取得してヒーローのカウンターに表示
  const initialData = await fetchVacancies().catch(() => null);
  const propertyCount = initialData?.properties.length ?? 0;
  const unitCount = initialData?.properties.reduce((s, p) => s + p.total, 0) ?? 0;

  return (
    <div>
      {/* ヒーローセクション */}
      <section className="bg-[#F8F9FA] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* 左: テキスト */}
          <div>
            <p className="text-[#6C757D] text-sm mb-4 tracking-widest uppercase">
              東京都住宅供給公社 — 非公式監視サービス
            </p>
            <h1
              className="text-5xl md:text-6xl font-extrabold text-[#1A1A1A] leading-[1.1] tracking-tighter mb-8"
            >
              JKKの空き家が出た瞬間、<br />あなたのLINEに届く。
            </h1>
            <p className="text-lg text-[#6C757D] mb-12 leading-relaxed max-w-lg">
              AIが10分おきに監視。礼金・更新料・仲介手数料0円の物件を誰よりも早くつかむ。
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={LINE_ADD_FRIEND_URL}
                className="bg-[#06C755] text-white px-10 py-5 rounded-lg text-lg font-bold flex items-center justify-center gap-3 transition-all duration-200 hover:opacity-90 active:scale-95 shadow-lg shadow-[#06C755]/10"
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
                LINE友だち追加（無料）
              </a>
              <a
                href="#vacancy-list"
                className="border-2 border-[#1A1A1A]/20 text-[#1A1A1A] px-10 py-5 rounded-lg text-lg font-bold transition-all hover:bg-[#F3F4F5] active:scale-95 text-center"
              >
                物件一覧を見る
              </a>
            </div>
          </div>

          {/* 右: 物件カウンター */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-[#DBE4ED]/30 rounded-full blur-3xl opacity-50" />
            <div className="relative bg-white rounded-lg shadow-[0_12px_40px_rgba(26,26,26,0.06)] border border-[#1A1A1A]/5 p-12 text-center w-full max-w-sm">
              <p className="text-[#6C757D] text-sm mb-6 uppercase tracking-widest">現在の空き家</p>
              <div className="mb-8">
                <span
                  className="text-8xl font-extrabold text-[#1A1A1A] tracking-tighter leading-none"
                >
                  {propertyCount}
                </span>
                <span className="text-2xl font-bold text-[#6C757D] ml-2">物件</span>
              </div>
              <div className="h-px bg-[#E9ECEF] mb-8" />
              <div>
                <span
                  className="text-5xl font-extrabold text-[#1A1A1A] tracking-tighter leading-none"
                >
                  {unitCount}
                </span>
                <span className="text-xl font-bold text-[#6C757D] ml-2">戸</span>
              </div>
              <p className="text-[#6C757D] text-xs mt-6">AIが10分おきに更新</p>
            </div>
          </div>
        </div>
      </section>

      {/* 信頼セクション（3カラム） */}
      <section className="py-24 bg-[#F3F4F5]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-start gap-4 p-8 bg-white rounded-lg border border-[#1A1A1A]/5 shadow-[0_12px_40px_rgba(26,26,26,0.06)]">
              <span className="material-symbols-outlined text-[#1A1A1A] text-4xl">
                currency_yen_off
              </span>
              <h3 className="text-xl font-bold text-[#1A1A1A]">礼金0円</h3>
              <p className="text-[#6C757D] leading-relaxed">
                JKKの物件は礼金が不要。初期費用を大幅に抑えてスタートできます。
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 p-8 bg-white rounded-lg border border-[#1A1A1A]/5 shadow-[0_12px_40px_rgba(26,26,26,0.06)]">
              <span className="material-symbols-outlined text-[#1A1A1A] text-4xl">
                autorenew
              </span>
              <h3 className="text-xl font-bold text-[#1A1A1A]">更新料0円</h3>
              <p className="text-[#6C757D] leading-relaxed">
                2年ごとの更新料も不要。長く住むほど一般賃貸との差は広がります。
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 p-8 bg-white rounded-lg border border-[#1A1A1A]/5 shadow-[0_12px_40px_rgba(26,26,26,0.06)]">
              <span className="material-symbols-outlined text-[#1A1A1A] text-4xl">
                handshake
              </span>
              <h3 className="text-xl font-bold text-[#1A1A1A]">仲介手数料0円</h3>
              <p className="text-[#6C757D] leading-relaxed">
                仲介業者を介さず直接申込み。仲介手数料がかからないのも大きなメリット。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 物件一覧セクション */}
      <section id="vacancy-list" className="py-32 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-extrabold text-[#1A1A1A] tracking-tight mb-4">
                現在の空き家一覧
              </h2>
              <p className="text-[#6C757D]">
                AIが10分おきに監視。今すぐ申し込める空き家を表示しています。
              </p>
            </div>
          </div>
          <VacancyDashboard />
        </div>
      </section>
    </div>
  );
}
