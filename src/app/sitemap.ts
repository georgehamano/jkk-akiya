import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/mdx";
import { fetchVacancies } from "@/lib/fetchVacancies";

const BASE = "https://jkk-akiya.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "hourly", priority: 1 },
    { url: `${BASE}/guide`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/simulator`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  // noindex 指定の記事はサイトマップにも含めない
  const articles: MetadataRoute.Sitemap = getAllArticles()
    .filter((a) => !a.noindex)
    .map((a) => ({
      url: `${BASE}/guide/${a.slug}`,
      lastModified: a.date ? new Date(a.date) : now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  // 物件ページ（取得できない場合は静的分のみ返す）
  let properties: MetadataRoute.Sitemap = [];
  try {
    const data = await fetchVacancies();
    properties =
      data?.properties.map((p) => ({
        url: `${BASE}/vacancy/${encodeURIComponent(p.name)}`,
        lastModified: now,
        changeFrequency: "daily" as const,
        priority: 0.6,
      })) ?? [];
  } catch {
    properties = [];
  }

  return [...staticPages, ...articles, ...properties];
}
