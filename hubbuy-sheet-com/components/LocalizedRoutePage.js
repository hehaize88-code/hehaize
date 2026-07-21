import { notFound } from "next/navigation";
import ProductsPage, { metadata as productsMetadata } from "@/app/products/page";
import ArticlesPage, { metadata as articlesMetadata } from "@/app/articles/page";
import ArticlePage from "@/app/articles/[slug]/page";
import HowToBuyPage, { metadata as howToBuyMetadata } from "@/app/guides/how-to-buy/page";
import QcChecksPage, { metadata as qcChecksMetadata } from "@/app/guides/qc-checks/page";
import ShippingPage, { metadata as shippingMetadata } from "@/app/guides/shipping/page";
import FaqPage, { metadata as faqMetadata } from "@/app/faq/page";
import AboutPage, { metadata as aboutMetadata } from "@/app/about/page";
import ContactPage, { metadata as contactMetadata } from "@/app/contact/page";
import PrivacyPage, { metadata as privacyMetadata } from "@/app/legal/privacy/page";
import TermsPage, { metadata as termsMetadata } from "@/app/legal/terms/page";
import { articles, getArticle } from "@/data/articles";
import { getLocalizedPath, translateExact } from "@/data/i18n";
import { localePages } from "@/data/locale-content";
import { SITE_URL } from "@/data/site";

const staticPages = {
  products: { Component: ProductsPage, metadata: productsMetadata },
  articles: { Component: ArticlesPage, metadata: articlesMetadata },
  "guides/how-to-buy": { Component: HowToBuyPage, metadata: howToBuyMetadata },
  "guides/qc-checks": { Component: QcChecksPage, metadata: qcChecksMetadata },
  "guides/shipping": { Component: ShippingPage, metadata: shippingMetadata },
  faq: { Component: FaqPage, metadata: faqMetadata },
  about: { Component: AboutPage, metadata: aboutMetadata },
  contact: { Component: ContactPage, metadata: contactMetadata },
  "legal/privacy": { Component: PrivacyPage, metadata: privacyMetadata },
  "legal/terms": { Component: TermsPage, metadata: termsMetadata },
};

export const localizedStaticParams = [
  ...Object.keys(staticPages).map((route) => ({ segments: route.split("/") })),
  ...articles.map((article) => ({ segments: ["articles", article.slug] })),
];

function sourceMetadata(route) {
  if (staticPages[route]) return staticPages[route].metadata;
  if (route.startsWith("articles/")) {
    const article = getArticle(route.slice("articles/".length));
    if (!article) return null;
    return {
      title: { absolute: article.seoTitle },
      description: article.excerpt,
      openGraph: { type: "article", title: article.title, description: article.excerpt },
    };
  }
  return null;
}

function absoluteTitle(metadata) {
  if (typeof metadata.title === "object" && metadata.title?.absolute) return metadata.title.absolute;
  return `${metadata.title} | Hubbuy Sheet`;
}

export async function getLocalizedMetadata(params, locale) {
  const { segments = [] } = await params;
  const route = segments.join("/");
  const source = sourceMetadata(route);
  if (!source) return {};

  const englishPath = `/${route}/`;
  const canonical = getLocalizedPath(englishPath, locale);
  const page = localePages[locale];
  const title = translateExact(absoluteTitle(source), locale);
  const description = translateExact(source.description, locale);
  const alternates = {
    en: getLocalizedPath(englishPath, "en"),
    "pt-BR": getLocalizedPath(englishPath, "pt-br"),
    de: getLocalizedPath(englishPath, "de"),
    "x-default": getLocalizedPath(englishPath, "en"),
  };

  return {
    title: { absolute: title },
    description,
    alternates: { canonical, languages: alternates },
    openGraph: {
      type: source.openGraph?.type || "website",
      title: translateExact(source.openGraph?.title || absoluteTitle(source), locale),
      description: translateExact(source.openGraph?.description || source.description, locale),
      url: `${SITE_URL}${canonical}`,
      locale: page.ogLocale,
      alternateLocale: locale === "de" ? ["en_US", "pt_BR"] : ["en_US", "de_DE"],
      images: [{ url: "/brand/og-card.png", width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/brand/og-card.png"] },
  };
}

export default async function LocalizedRoutePage({ params }) {
  const { segments = [] } = await params;
  const route = segments.join("/");
  const entry = staticPages[route];
  if (entry) {
    const Component = entry.Component;
    return <Component />;
  }

  if (segments[0] === "articles" && segments.length === 2 && getArticle(segments[1])) {
    return <ArticlePage params={Promise.resolve({ slug: segments[1] })} />;
  }

  notFound();
}
