import type { MetadataRoute } from "next";

const BASE = "https://jkk-akiya.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // 管理画面とJKKへの転送ページはクロール対象外
        disallow: ["/admin/", "/api/", "/jkk-search.html"],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
