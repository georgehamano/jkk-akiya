import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "src/content/guide");

export type ArticleMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
};

export function getAllArticles(): ArticleMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const slug = f.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(CONTENT_DIR, f), "utf-8");
      const { data } = matter(raw);
      return { slug, title: data.title ?? slug, description: data.description ?? "", date: data.date ?? "" };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticle(slug: string): { meta: ArticleMeta; content: string } | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    meta: { slug, title: data.title ?? slug, description: data.description ?? "", date: data.date ?? "" },
    content,
  };
}
