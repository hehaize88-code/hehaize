import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  LocalizedHome,
  LocalizedPage,
} from "../../components/LocalizedExperience";
import {
  isLocale,
  languages,
  translations,
} from "../../i18n";
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
    ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug?: string[] }>;
}): Promise<Metadata> {
  const { locale, slug = [] } = await params;
  if (!isLocale(locale) || locale === "en" || slug.length > 1) return {};

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

  const path = route ? `/${locale}/${route}/` : `/${locale}/`;
  return {
    title: page.title,
    description: page.intro,
    keywords: seoArticle?.keywords,
    alternates: {
      canonical: path,
      languages: Object.fromEntries(
        languages.map((language) => [
          language.code,
          language.code === "en"
            ? route
              ? `/${route}/`
              : "/"
            : route
              ? `/${language.code}/${route}/`
              : `/${language.code}/`,
        ]),
      ),
    },
  };
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
    slug.length > 1 ||
    (slug[0] && !routeSlugs.includes(slug[0]))
  ) {
    notFound();
  }

  return slug.length === 0 ? (
    <LocalizedHome locale={locale} />
  ) : (
    <LocalizedPage locale={locale} slug={slug[0]} />
  );
}
