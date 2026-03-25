import Link from "next/link";

const LINE_ADD_FRIEND_URL = "https://lin.ee/Y5P8ovy";

export function Header() {
  return (
    <header className="w-full top-0 z-50 bg-[#F8F9FA]">
      <nav className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold text-[#1A1A1A] tracking-tighter"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          JKK空き家速報
        </Link>

        <div className="flex items-center gap-6 text-sm">
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
            className="bg-[#06C755] text-white font-bold px-6 py-3 rounded-lg text-sm transition-all duration-200 hover:opacity-90 active:scale-95"
          >
            LINEで通知を受け取る
          </a>
        </div>
      </nav>
    </header>
  );
}
