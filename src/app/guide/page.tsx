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
      <h1 className="text-2xl font-bold mb-2">JKK攻略ガイド</h1>
      <p className="text-gray-500 text-sm mb-8">申込みのコツから審査基準まで、JKKを攻略するための情報を集めました。</p>

      {articles.length === 0 ? (
        <p className="text-gray-400">記事を準備中です。</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/guide/${article.slug}`}
              className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <p className="text-xs text-gray-400 mb-2">{article.date}</p>
              <h2 className="font-bold text-gray-900 leading-snug mb-2">{article.title}</h2>
              <p className="text-sm text-gray-500 line-clamp-2">{article.description}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
