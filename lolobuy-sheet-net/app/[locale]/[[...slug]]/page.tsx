import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomePage } from "../../page";
import { GuidePage } from "../../guide-page";
import {
  articleLanguageAlternates,
  corePathFromSegments,
  isLocalizedLocale,
  localizedLocales,
  type CorePath,
} from "../../i18n";
import { coreMetadata } from "../../seo";
import { faqItems } from "../../site-data";
import { translate, absoluteUrl, localizedPath } from "../../i18n";
import { articles, getArticle } from "../../article-data";
import { ArticlePage } from "../../article-page";
import { getLocalizedArticle } from "../../article-locales";

type LocalizedParams = {
  locale: string;
  slug?: string[];
};

function resolve(params: LocalizedParams) {
  if (!isLocalizedLocale(params.locale)) notFound();
  const path = corePathFromSegments(params.slug);
  if (path) return { locale: params.locale, kind: "core" as const, path };

  if (params.slug?.length === 2 && params.slug[0] === "articles") {
    const article = getArticle(params.slug[1]);
    if (article) {
      return { locale: params.locale, kind: "article" as const, article };
    }
  }

  notFound();
}

export function generateStaticParams() {
  return localizedLocales.flatMap((locale) => [
    { locale, slug: undefined },
    ...(["products", "categories", "qc-guide", "shipping", "articles", "faq", "how-it-works"] as const).map(
      (path) => ({ locale, slug: [path] }),
    ),
    ...articles.map((article) => ({
      locale,
      slug: ["articles", article.slug],
    })),
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<LocalizedParams>;
}): Promise<Metadata> {
  const resolved = resolve(await params);
  if (resolved.kind === "article") {
    const article = getLocalizedArticle(resolved.article, resolved.locale);
    const canonicalPath = localizedPath(
      resolved.locale,
      `/articles/${article.slug}`,
    );
    return {
      title: { absolute: article.seoTitle },
      description: article.description,
      alternates: {
        canonical: absoluteUrl(canonicalPath),
        languages: articleLanguageAlternates(article.slug),
      },
      keywords: [article.primaryKeyword, ...article.secondaryKeywords],
      openGraph: {
        title: article.seoTitle,
        description: article.description,
        type: "article",
        url: absoluteUrl(canonicalPath),
        locale: resolved.locale,
        publishedTime: article.publishedDate,
        modifiedTime: article.modifiedDate,
        images: [{ url: article.image, width: 1200, height: 630, alt: article.imageAlt }],
      },
      twitter: {
        card: "summary_large_image",
        title: article.seoTitle,
        description: article.description,
        images: [article.image],
      },
    };
  }
  return coreMetadata(resolved.locale, resolved.path);
}

function LocalizedFaqData({
  locale,
}: {
  locale: "es" | "de" | "fr" | "it";
}) {
  const canonical = absoluteUrl(localizedPath(locale, "/faq"));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    url: canonical,
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: translate(locale, item.question),
      acceptedAnswer: {
        "@type": "Answer",
        text: translate(locale, item.answer),
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function kindFromPath(path: Exclude<CorePath, "/">) {
  return path.slice(1) as
    | "products"
    | "categories"
    | "qc-guide"
    | "shipping"
    | "articles"
    | "faq"
    | "how-it-works";
}

export default async function LocalizedRoute({
  params,
}: {
  params: Promise<LocalizedParams>;
}) {
  const resolved = resolve(await params);
  if (resolved.kind === "article") {
    return <ArticlePage article={resolved.article} locale={resolved.locale} />;
  }

  const { locale, path } = resolved;

  if (path === "/") {
    return <HomePage locale={locale} />;
  }

  return (
    <>
      {path === "/faq" && <LocalizedFaqData locale={locale} />}
      <GuidePage kind={kindFromPath(path)} locale={locale} />
    </>
  );
}
