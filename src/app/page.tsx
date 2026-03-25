import { VacancyDashboard } from "@/components/vacancy/VacancyDashboard";
import { LineCTABanner } from "@/components/cta/LineCTABanner";

const LINE_ADD_FRIEND_URL = "https://lin.ee/Y5P8ovy";

export default function Home() {
  return (
    <div>
      {/* ヒーローセクション */}
      <section className="bg-white border border-gray-200 rounded-[4px] px-8 py-12 mb-12 text-center shadow-sm">
        <p className="text-[#6C757D] text-sm mb-3 tracking-widest uppercase">
          東京都住宅供給公社 — 非公式監視サービス
        </p>
        <h1 className="text-3xl font-bold text-[#001F5B] mb-4 leading-tight">
          JKKの空き家が出た瞬間、<br />あなたのLINEに届く。
        </h1>
        <p className="text-[#6C757D] text-sm mb-8 max-w-md mx-auto">
          AIが10分おきに監視。礼金・更新料・仲介手数料0円のJKK物件を、誰よりも早くつかむ。
        </p>
        <a
          href={LINE_ADD_FRIEND_URL}
          className="inline-block bg-[#001F5B] text-white font-bold px-10 py-3 rounded-[4px] text-base"
        >
          LINE友だち追加（無料）
        </a>
      </section>

      {/* 物件一覧 */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-[#001F5B] mb-1">現在の空き家一覧</h2>
        <p className="text-[#6C757D] text-sm">
          AIが10分おきに監視。今すぐ申し込める空き家を表示しています。
        </p>
      </div>

      <VacancyDashboard />

      <div className="mt-12">
        <LineCTABanner variant="inline" />
      </div>
    </div>
  );
}
