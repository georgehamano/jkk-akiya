import Link from "next/link";
import { LineCTABanner } from "@/components/cta/LineCTABanner";

export function Header() {
  return (
    <header>
      <LineCTABanner variant="header" />
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-gray-900 text-lg">
          JKK空き家速報
        </Link>
        <nav className="flex gap-4 text-sm text-gray-600">
          <Link href="/guide" className="hover:text-gray-900">攻略ガイド</Link>
          <Link href="/simulator" className="hover:text-gray-900">費用シミュレーター</Link>
        </nav>
      </div>
    </header>
  );
}
