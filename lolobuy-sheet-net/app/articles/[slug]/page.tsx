import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePage } from "../../article-page";
import { articles, getArticle } from "../../article-data";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/articles/${article.slug}` },
    keywords: [article.primaryKeyword, ...article.secondaryKeywords],
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      url: `/articles/${article.slug}`,
      publishedTime: "2026-07-28",
      modifiedTime: "2026-07-28",
      images: [
        {
          url: article.image,
          width: 900,
          height: 900,
          alt: article.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.shortTitle,
      description: article.description,
      images: [article.image],
    },
  };
}

export default async function ArticleRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) notFound();

  return <ArticlePage article={article} />;
}
