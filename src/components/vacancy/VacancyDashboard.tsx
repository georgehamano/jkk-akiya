"use client";

import { useEffect, useState, useMemo } from "react";
import { fetchVacancies } from "@/lib/fetchVacancies";
import type { VacancyData } from "@/types/vacancy";
import { Search, Home, X } from "lucide-react";
import { PropertyCard } from "./PropertyCard";
import { VacancyTable } from "./VacancyTable";
import { ElapsedTime } from "./ElapsedTime";
import { LineCTABanner } from "@/components/cta/LineCTABanner";

const POLL_INTERVAL_MS = 5 * 60 * 1000;

export function VacancyDashboard() {
  const [data, setData] = useState<VacancyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [locationFilter, setLocationFilter] = useState("");
  const [roomFilter, setRoomFilter] = useState("");

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

  const locations = useMemo(() => {
    if (!data) return [];
    return [...new Set(data.properties.map((p) => p.location).filter(Boolean))].sort() as string[];
  }, [data]);

  const roomTypes = useMemo(() => {
    if (!data) return [];
    const types = new Set<string>();
    data.properties.forEach((p) => Object.keys(p.rooms).forEach((r) => types.add(r)));
    return [...types].sort();
  }, [data]);

  const filtered = useMemo(() => {
    if (!data) return [];
    return data.properties.filter((p) => {
      if (locationFilter && p.location !== locationFilter) return false;
      if (roomFilter && !(roomFilter in p.rooms)) return false;
      return true;
    });
  }, [data, locationFilter, roomFilter]);

  const hasFilter = locationFilter !== "" || roomFilter !== "";

  if (loading) {
    return (
      <div className="text-center py-24">
        <Search size={48} className="text-[#6C757D] mb-4 mx-auto animate-pulse" />
        <p className="text-[#6C757D] text-sm">空き家情報を取得中...</p>
      </div>
    );
  }

  if (!data || data.properties.length === 0) {
    return (
      <div className="text-center py-24">
        <Home size={48} className="text-[#6C757D] mb-4 mx-auto" />
        <p className="font-bold text-[#1A1A1A] mb-2">現在、空き家情報はありません</p>
        <p className="text-[#6C757D] text-sm">新しい空きが出た瞬間にLINEでお知らせします</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-[#6C757D] text-sm">
          {data.properties.length}物件 / 合計{data.properties.reduce((s, p) => s + p.total, 0)}戸
        </p>
        <ElapsedTime updatedAt={data.updated_at} />
      </div>

      {/* フィルター */}
      <div className="flex flex-wrap gap-3 mb-8">
        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="text-sm border border-[#1A1A1A]/15 rounded-lg px-4 py-2 bg-white text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/20"
        >
          <option value="">エリア：すべて</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
        <select
          value={roomFilter}
          onChange={(e) => setRoomFilter(e.target.value)}
          className="text-sm border border-[#1A1A1A]/15 rounded-lg px-4 py-2 bg-white text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/20"
        >
          <option value="">間取り：すべて</option>
          {roomTypes.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
        {hasFilter && (
          <button
            onClick={() => { setLocationFilter(""); setRoomFilter(""); }}
            className="inline-flex items-center gap-1 text-sm text-[#6C757D] hover:text-[#1A1A1A] transition-colors px-3 py-2"
          >
            <X size={14} />
            絞り込みを解除
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-24">
          <Home size={48} className="text-[#6C757D] mb-4 mx-auto" />
          <p className="font-bold text-[#1A1A1A] mb-2">該当する物件がありません</p>
          <p className="text-[#6C757D] text-sm">条件を変えてお試しください</p>
        </div>
      ) : (
        <>
          <VacancyTable properties={filtered} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((property, i) => (
              <>
                <PropertyCard key={property.name} property={property} />
                {(i + 1) % 3 === 0 && i + 1 < filtered.length && (
                  <div key={`cta-${i}`} className="sm:col-span-2 lg:col-span-3">
                    <LineCTABanner variant="inline" />
                  </div>
                )}
              </>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
