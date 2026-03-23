import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllArticles, getArticle } from "@/lib/mdx";
import { LineCTABanner } from "@/components/cta/LineCTABanner";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return { title: `${article.meta.title} — JKK空き家速報`, description: article.meta.description };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <div className="max-w-2xl mx-auto">
      <p className="text-xs text-gray-400 mb-2">{article.meta.date}</p>
      <h1 className="text-2xl font-bold leading-snug mb-6">{article.meta.title}</h1>

      <LineCTABanner variant="inline" />

      <div className="prose prose-gray mt-8">
        <MDXRemote source={article.content} />
      </div>

      <div className="mt-12">
        <LineCTABanner variant="inline" />
      </div>
    </div>
  );
}
