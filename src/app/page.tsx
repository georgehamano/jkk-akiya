import { VacancyDashboard } from "@/components/vacancy/VacancyDashboard";
import { LineCTABanner } from "@/components/cta/LineCTABanner";

export default function Home() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">JKK空き家速報</h1>
        <p className="text-gray-500 text-sm">
          AIが10分おきに監視。今すぐ申し込める空き家を表示しています。
        </p>
      </div>

      <VacancyDashboard />

      <div className="mt-10">
        <LineCTABanner variant="inline" />
      </div>
    </div>
  );
}
