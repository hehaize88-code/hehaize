import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  LocalizedHome,
  LocalizedPage,
} from "../../components/LocalizedExperience";
import ProductPage from "../../components/ProductPage";
import { getProductBySlug, products } from "../../data";
import {
  isLocale,
  languages,
  translations,
} from "../../i18n";
import { languageAlternates, localizedRoutePath } from "../../seoAlternates";
import { seoArticleCopy } from "../../seoArticles";
import {
  getSeoArticleEntry,
  seoArticleSlugs,
} from "../../seoArticleLibrary";

const routeSlugs = [
  "spreadsheet",
  "categories",
  "how-to-buy",
  "qc-guide",
  "shipping-guide",
  "faq",
  "guides",
  "returns",
  "about",
  "editorial-policy",
  "privacy",
  "terms",
  "articles",
  ...seoArticleSlugs,
];

export function generateStaticParams() {
  return languages
    .filter((language) => language.code !== "en")
    .flatMap((language) => [
      { locale: language.code, slug: [] },
      ...routeSlugs.map((slug) => ({
        locale: language.code,
        slug: [slug],
      })),
      ...products.map((product) => ({
        locale: language.code,
        slug: ["product", product.slug],
      })),
    ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug?: string[] }>;
}): Promise<Metadata> {
  const { locale, slug = [] } = await params;
  if (!isLocale(locale) || locale === "en" || slug.length > 2) return {};

  const localizedProduct =
    slug[0] === "product" && slug[1]
      ? getProductBySlug(slug[1])
      : undefined;
  if (localizedProduct) {
    const routePath = `/product/${localizedProduct.slug}/`;
    const title = `${localizedProduct.name} — ${translations[locale].nav.spreadsheet}`;
    const description = `${localizedProduct.name}. ${localizedProduct.price} · ID ${localizedProduct.id}. ${translations[locale].home.latestDescription}`;
    return {
      title,
      description,
      alternates: {
        ...languageAlternates(routePath),
        canonical: localizedRoutePath(locale, routePath),
      },
      openGraph: {
        type: "website",
        title,
        description,
        url: `https://joyagoochina.org${localizedRoutePath(locale, routePath)}`,
        images: [`https://joyagoochina.org${localizedProduct.image}`],
      },
    };
  }

  const route = slug[0];
  const seoArticle = route ? getSeoArticleEntry(locale, route) : undefined;
  const page = route
    ? route === "articles"
      ? {
          title: seoArticleCopy[locale].indexTitle,
          intro: seoArticleCopy[locale].indexIntro,
        }
      : seoArticle
        ? {
            title: seoArticle.article.title,
            intro: seoArticle.article.description,
          }
        : translations[locale].pages[route]
    : {
        title: translations[locale].home.title,
        intro: translations[locale].home.intro,
      };
  if (!page) return {};

  const basePath = route ? `/${route}/` : "/";
  const metadata: Metadata = {
    title: page.title,
    description: page.intro,
    keywords: seoArticle?.keywords,
    alternates: {
      ...languageAlternates(basePath),
      canonical: localizedRoutePath(locale, basePath),
    },
  };
  if (seoArticle?.slug === "joyagoo-parcel-consolidation-packaging-guide") {
    metadata.openGraph = {
      type: "article",
      title: seoArticle.article.title,
      description: seoArticle.article.description,
      url: `https://joyagoochina.org${localizedRoutePath(locale, basePath)}`,
    };
  }
  return metadata;
}

export default async function LocalizedRoute({
  params,
}: {
  params: Promise<{ locale: string; slug?: string[] }>;
}) {
  const { locale, slug = [] } = await params;
  if (
    !isLocale(locale) ||
    locale === "en" ||
    slug.length > 2 ||
    (slug.length === 1 && !routeSlugs.includes(slug[0])) ||
    (slug.length === 2 &&
      (slug[0] !== "product" || !getProductBySlug(slug[1])))
  ) {
    notFound();
  }

  if (slug.length === 0) return <LocalizedHome locale={locale} />;
  if (slug[0] === "product") {
    return (
      <ProductPage locale={locale} product={getProductBySlug(slug[1])!} />
    );
  }
  return <LocalizedPage locale={locale} slug={slug[0]} />;
}
