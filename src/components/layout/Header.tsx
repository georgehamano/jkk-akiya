import Link from "next/link";

const LINE_ADD_FRIEND_URL = "https://lin.ee/Y5P8ovy";

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-[#001F5B] text-lg tracking-tight">
          JKK空き家速報
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/guide" className="text-[#6C757D] hover:text-[#001F5B]">
            攻略ガイド
          </Link>
          <Link href="/simulator" className="text-[#6C757D] hover:text-[#001F5B]">
            費用シミュレーター
          </Link>
          <a
            href={LINE_ADD_FRIEND_URL}
            className="bg-[#001F5B] text-white text-sm font-bold px-4 py-2 rounded-[4px]"
          >
            LINEで通知を受け取る
          </a>
        </nav>
      </div>
    </header>
  );
}
