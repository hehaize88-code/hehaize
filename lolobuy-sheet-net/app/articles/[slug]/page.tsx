import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePage } from "../../article-page";
import { articles, getArticle } from "../../article-data";
import { articleLanguageAlternates, absoluteUrl } from "../../i18n";

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
    title: { absolute: article.seoTitle },
    description: article.description,
    alternates: {
      canonical: absoluteUrl(`/articles/${article.slug}`),
      languages: articleLanguageAlternates(article.slug),
    },
    keywords: [article.primaryKeyword, ...article.secondaryKeywords],
    openGraph: {
      title: article.seoTitle,
      description: article.description,
      type: "article",
      url: `/articles/${article.slug}`,
      publishedTime: article.publishedDate,
      modifiedTime: article.modifiedDate,
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.seoTitle,
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
