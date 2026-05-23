import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { LineCTABanner } from "@/components/cta/LineCTABanner";

export const metadata: Metadata = {
  title: "JKK空き家速報 — 東京都住宅供給公社の空き家をリアルタイム監視",
  description:
    "JKK（東京都住宅供給公社）の空き家情報をリアルタイム監視。新着が出た瞬間にLINEでお知らせ。礼金・更新料・仲介手数料0円のお得な物件を見逃さない。",
  other: {
    "google-adsense-account": "ca-pub-2684938307917742",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2684938307917742"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-W5N4MEB7KG"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-W5N4MEB7KG');
          `}
        </Script>
      </head>
      <body className="bg-[#F8F9FA] text-[#191c1d]">
        <Header />
        <main>{children}</main>
        <footer>
          <LineCTABanner variant="footer" />
          <div className="bg-[#1A1A1A] text-white/60 text-xs py-6 px-4">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-white/50">© 2026 JKK空き家速報 — 非公式サービス</p>
              <nav className="flex items-center gap-5">
                <a href="/about" className="hover:text-white transition-colors">運営者について</a>
                <a href="/privacy" className="hover:text-white transition-colors">プライバシーポリシー</a>
                <a href="/contact" className="hover:text-white transition-colors">お問い合わせ</a>
              </nav>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
