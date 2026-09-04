"use client";

import { useState } from "react";
import { Home } from "lucide-react";

/**
 * 物件写真ギャラリー。メイン画像＋サムネイル切り替え。
 * 画像はJKK公式（/mz_copyright/配下）のもの。
 */
export function PropertyGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="rounded-lg overflow-hidden shadow-[0_12px_40px_rgba(26,26,26,0.06)] border border-[#1A1A1A]/5 aspect-[4/3] bg-[#E9ECEF] flex flex-col items-center justify-center gap-2">
        <Home size={48} className="text-[#6C757D]" />
        <span className="text-[#6C757D] text-sm">写真準備中</span>
      </div>
    );
  }

  const current = images[Math.min(active, images.length - 1)];

  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-lg overflow-hidden shadow-[0_12px_40px_rgba(26,26,26,0.06)] border border-[#1A1A1A]/5 aspect-[4/3] bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={current}
          alt={name}
          className="w-full h-full object-contain"
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`写真 ${i + 1} を表示`}
              className={`shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                i === active ? "border-[#1A1A1A]" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
