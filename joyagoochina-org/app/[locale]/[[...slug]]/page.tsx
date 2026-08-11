import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  LocalizedHome,
  LocalizedPage,
} from "../../components/LocalizedExperience";
import ProductPage from "../../components/ProductPage";
import { getProductBySlug, products } from "../../data";
import { editorialSocialMetadata } from "../../editorialAssets";
import {
  isLocale,
  languages,
  translations,
  type Locale,
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

const localizedHomeMetadataTitles: Partial<Record<Locale, string>> = {
  zh: "Joyagoo 选品表 2026",
  de: "Joyagoo Produkttabelle 2026",
  pl: "Arkusz Joyagoo 2026",
  es: "Hoja de productos Joyagoo 2026",
  it: "Catalogo prodotti Joyagoo 2026",
  fr: "Tableur produits Joyagoo 2026",
  pt: "Planilha de produtos Joyagoo 2026",
  ro: "Tabel produse Joyagoo 2026",
  sv: "Joyagoo produktkalkylblad 2026",
};

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
        siteName: "Joyagoo China",
        images: [
          {
            url: `https://joyagoochina.org${localizedProduct.image}`,
            width: localizedProduct.imageWidth,
            height: localizedProduct.imageHeight,
            alt: localizedProduct.name,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
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
  const absoluteUrl = `https://joyagoochina.org${localizedRoutePath(locale, basePath)}`;
  const isArticle = Boolean(
    seoArticle ||
      (route && ["how-to-buy", "qc-guide", "shipping-guide", "returns"].includes(route)),
  );
  const metadata: Metadata = {
    title: route
      ? page.title
      : { absolute: localizedHomeMetadataTitles[locale] ?? page.title },
    description: page.intro,
    keywords: seoArticle?.keywords,
    alternates: {
      ...languageAlternates(basePath),
      canonical: localizedRoutePath(locale, basePath),
    },
    ...editorialSocialMetadata({
      slug: route,
      title: page.title,
      description: page.intro,
      url: absoluteUrl,
      type: isArticle ? "article" : "website",
    }),
  };
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
