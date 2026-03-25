import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { LineCTABanner } from "@/components/cta/LineCTABanner";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JKK空き家速報 — 東京都住宅供給公社の空き家をリアルタイム監視",
  description:
    "JKK（東京都住宅供給公社）の空き家情報を10分おきにAIが監視。新着が出た瞬間にLINEでお知らせ。礼金・更新料・仲介手数料0円のお得な物件を見逃さない。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={`${geist.className} bg-[#F8F9FA] text-[#333333]`}>
        <Header />
        <main className="max-w-5xl mx-auto px-4 py-12">{children}</main>
        <footer>
          <LineCTABanner variant="footer" />
          <div className="text-center text-xs text-[#6C757D] py-4">
            © 2026 JKK空き家速報 — 非公式サービス
          </div>
        </footer>
      </body>
    </html>
  );
}
