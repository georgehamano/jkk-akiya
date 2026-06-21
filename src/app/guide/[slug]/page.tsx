import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
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
      {article.meta.thumbnail && (
        <div className="aspect-[16/9] w-full rounded-xl overflow-hidden mb-6 bg-[#1A1A1A]/5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.meta.thumbnail}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <p className="text-xs text-gray-400 mb-2">{article.meta.date}</p>
      <h1 className="text-2xl font-bold leading-snug mb-6">{article.meta.title}</h1>

      <LineCTABanner variant="inline" />

      <div className="prose prose-gray mt-8">
        <MDXRemote
          source={article.content}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>

      <div className="mt-12">
        <LineCTABanner variant="inline" />
      </div>
    </div>
  );
}
