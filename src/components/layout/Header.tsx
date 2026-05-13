"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, MessageCircle } from "lucide-react";

const LINE_ADD_FRIEND_URL = "https://lin.ee/Y5P8ovy";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full top-0 z-50 bg-[#F8F9FA] border-b border-[#1A1A1A]/5">
      <nav className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/img/logo.png"
            alt="JKK空き家速報"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span
            className="text-xl sm:text-2xl font-bold text-[#1A1A1A] tracking-tighter"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            JKK空き家速報
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link
            href="/guide"
            className="text-[#6C757D] hover:text-[#1A1A1A] transition-colors px-2 py-1 rounded-sm hover:bg-[#F3F4F5]"
          >
            攻略ガイド
          </Link>
          <Link
            href="/simulator"
            className="text-[#6C757D] hover:text-[#1A1A1A] transition-colors px-2 py-1 rounded-sm hover:bg-[#F3F4F5]"
          >
            費用シミュレーター
          </Link>
          <a
            href={LINE_ADD_FRIEND_URL}
            className="bg-[#06C755] text-white font-bold px-5 py-2.5 rounded-lg text-sm transition-all duration-200 hover:opacity-90 active:scale-95 flex items-center gap-2"
          >
            <MessageCircle size={15} className="fill-current" />
            LINEで通知を受け取る
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-[#1A1A1A] hover:bg-[#F3F4F5] rounded-lg transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label="メニュー"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-[#1A1A1A]/5 bg-[#F8F9FA] px-4 py-4 flex flex-col gap-1">
          <Link
            href="/guide"
            onClick={() => setOpen(false)}
            className="text-[#1A1A1A] font-medium px-4 py-3 rounded-lg hover:bg-[#F3F4F5] transition-colors"
          >
            攻略ガイド
          </Link>
          <Link
            href="/simulator"
            onClick={() => setOpen(false)}
            className="text-[#1A1A1A] font-medium px-4 py-3 rounded-lg hover:bg-[#F3F4F5] transition-colors"
          >
            費用シミュレーター
          </Link>
          <a
            href={LINE_ADD_FRIEND_URL}
            onClick={() => setOpen(false)}
            className="mt-2 bg-[#06C755] text-white font-bold px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-all hover:opacity-90"
          >
            <MessageCircle size={16} className="fill-current" />
            LINEで通知を受け取る（無料）
          </a>
        </div>
      )}
    </header>
  );
}
