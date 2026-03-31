import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/types/vacancy";

export function PropertyCard({ property }: { property: Property }) {
  const roomEntries = Object.entries(property.rooms).filter(([, count]) => count > 0);
  const slug = encodeURIComponent(property.name);

  return (
    <Link
      href={`/vacancy/${slug}`}
      className="group bg-white rounded-lg overflow-hidden shadow-[0_12px_40px_rgba(26,26,26,0.06)] border border-[#1A1A1A]/5 transition-transform duration-200 hover:-translate-y-1 block"
    >
      {/* 画像エリア */}
      <div className="h-48 relative overflow-hidden">
        {property.image_url ? (
          <Image
            src={property.image_url}
            alt={property.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-[#E9ECEF] flex flex-col items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[#6C757D] text-4xl">home</span>
            <span className="text-[#6C757D] text-xs">写真準備中</span>
          </div>
        )}
      </div>

      {/* コンテンツエリア */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-2 mb-4">
          <h3
            className="font-bold text-[#1A1A1A] text-lg leading-snug"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            {property.name}
          </h3>
          <span className="shrink-0 bg-[#1A1A1A] text-white text-xs font-bold px-2 py-1 rounded-[4px]">
            {property.total}戸空き
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {roomEntries.map(([room, count]) => (
            <span
              key={room}
              className="bg-[#F8F9FA] text-[#6C757D] text-xs px-2 py-1 rounded-[4px]"
            >
              {room}: {count}戸
            </span>
          ))}
        </div>

        <div className="block w-full text-center border-2 border-[#1A1A1A] text-[#1A1A1A] text-sm font-bold py-3 rounded-[4px] transition-all duration-200 group-hover:bg-[#1A1A1A] group-hover:text-white">
          詳細を見る
        </div>
      </div>
    </Link>
  );
}
