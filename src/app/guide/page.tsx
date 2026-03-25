import Link from "next/link";
import { getAllArticles } from "@/lib/mdx";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JKK攻略ガイド — JKK空き家速報",
  description: "JKK（東京都住宅供給公社）の申込み・審査・先着順攻略などを徹底解説。",
};

export default function GuidePage() {
  const articles = getAllArticles();

  return (
    <div>
      {/* ページヘッダー */}
      <section className="bg-[#F8F9FA] py-24">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-[#6C757D] text-sm mb-4 uppercase tracking-widest">Guide</p>
          <h1
            className="text-5xl font-extrabold text-[#1A1A1A] tracking-tighter mb-4"
          >
            JKK攻略ガイド
          </h1>
          <p className="text-[#6C757D] text-lg max-w-lg">
            申込みのコツから審査基準まで、JKKを攻略するための情報を集めました。
          </p>
        </div>
      </section>

      {/* 記事一覧 */}
      <section className="py-16 bg-[#F3F4F5]">
        <div className="max-w-7xl mx-auto px-8">
          {articles.length === 0 ? (
            <div className="text-center py-24">
              <span className="material-symbols-outlined text-[#6C757D] text-5xl mb-4 block">
                article
              </span>
              <p className="text-[#6C757D]">記事を準備中です。</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/guide/${article.slug}`}
                  className="bg-white rounded-lg border border-[#1A1A1A]/5 shadow-[0_12px_40px_rgba(26,26,26,0.06)] p-6 transition-transform duration-200 hover:-translate-y-1 block"
                >
                  <p className="text-xs text-[#6C757D] mb-3">{article.date}</p>
                  <h2
                    className="font-bold text-[#1A1A1A] leading-snug mb-2 text-lg"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    {article.title}
                  </h2>
                  <p className="text-sm text-[#6C757D] line-clamp-2">{article.description}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
