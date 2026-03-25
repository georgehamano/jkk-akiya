"use client";

import { useEffect, useState } from "react";
import { fetchVacancies } from "@/lib/fetchVacancies";
import type { VacancyData } from "@/types/vacancy";
import { PropertyCard } from "./PropertyCard";
import { ElapsedTime } from "./ElapsedTime";
import { LineCTABanner } from "@/components/cta/LineCTABanner";

const POLL_INTERVAL_MS = 5 * 60 * 1000; // 5分ごとに再取得

export function VacancyDashboard() {
  const [data, setData] = useState<VacancyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const result = await fetchVacancies();
      setData(result);
      setLoading(false);
    };
    load();
    const id = setInterval(load, POLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  if (loading) {
    return (
      <div className="text-center py-16 text-gray-400">
        <div className="text-4xl mb-3">🔍</div>
        <p>空き家情報を取得中...</p>
      </div>
    );
  }

  if (!data || data.properties.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        <div className="text-4xl mb-3">🏠</div>
        <p className="font-bold mb-1">現在、空き家情報はありません</p>
        <p className="text-sm">新しい空きが出た瞬間にLINEでお知らせします</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-[#6C757D] text-sm">
          {data.properties.length}物件 / 合計{data.properties.reduce((s, p) => s + p.total, 0)}戸
        </p>
        <ElapsedTime updatedAt={data.updated_at} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.properties.map((property, i) => (
          <>
            <PropertyCard key={property.name} property={property} />
            {/* 3件ごとにインラインCTAを挿入 */}
            {(i + 1) % 3 === 0 && i + 1 < data.properties.length && (
              <div key={`cta-${i}`} className="sm:col-span-2 lg:col-span-3">
                <LineCTABanner variant="inline" />
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
}
