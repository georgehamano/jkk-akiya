"use client";

import Image from "next/image";
import Link from "next/link";
import { Building2 } from "lucide-react";
import type { Property } from "@/types/vacancy";

type Props = {
  properties: Property[];
};

export function VacancyTable({ properties }: Props) {
  if (properties.length === 0) return null;

  return (
    <div className="mb-12 overflow-x-auto rounded-lg border border-[#1A1A1A]/5 shadow-[0_12px_40px_rgba(26,26,26,0.06)]">
      <table className="w-full bg-white text-sm">
        <thead>
          <tr className="border-b border-[#E9ECEF]">
            <th className="w-14 py-3 px-4" />
            <th className="py-3 px-4 text-left font-semibold text-[#1A1A1A]">物件名</th>
            <th className="py-3 px-4 text-left font-semibold text-[#1A1A1A] whitespace-nowrap">エリア</th>
            <th className="py-3 px-4 text-left font-semibold text-[#1A1A1A]">間取り</th>
            <th className="py-3 px-4 text-right font-semibold text-[#1A1A1A] whitespace-nowrap">合計</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((p, i) => {
            const roomsText = Object.entries(p.rooms)
              .map(([type, count]) => `${type}×${count}`)
              .join("・");
            return (
              <tr
                key={p.name}
                className={`border-b border-[#E9ECEF] last:border-0 hover:bg-[#F8F9FA] transition-colors ${
                  i % 2 === 1 ? "bg-[#FAFAFA]" : ""
                }`}
              >
                {/* サムネイル */}
                <td className="py-2 px-4">
                  <div className="w-10 h-10 rounded overflow-hidden bg-[#F3F4F5] flex-shrink-0 flex items-center justify-center">
                    {p.image_url ? (
                      <Image
                        src={p.image_url}
                        alt={p.name}
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <Building2 size={20} className="text-[#6C757D]" />
                    )}
                  </div>
                </td>

                {/* 物件名 */}
                <td className="py-2 px-4">
                  <Link
                    href={`/vacancy/${encodeURIComponent(p.name)}`}
                    className="font-medium text-[#1A1A1A] hover:underline"
                  >
                    {p.name}
                  </Link>
                </td>

                {/* エリア */}
                <td className="py-2 px-4 text-[#6C757D] whitespace-nowrap">
                  {p.location ?? "—"}
                </td>

                {/* 間取り */}
                <td className="py-2 px-4 text-[#6C757D]">
                  {roomsText || "—"}
                </td>

                {/* 合計 */}
                <td className="py-2 px-4 text-right">
                  <span className="font-bold text-[#1A1A1A]">{p.total}</span>
                  <span className="text-[#6C757D] ml-1">件</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
