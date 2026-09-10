import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SitePage from "./site-page";
import { articleRoute, articleRoutes, copies, isEnglishOnlyArticleRoute, isRouteKey, isStaticRouteKey, languages, Locale, routeHref, RouteKey } from "./site-content";
import { additionalArticles, additionalArticleRoutes } from "./site-articles";
import { catalogCopies } from "./site-catalog-copy";
import { priorityCategoryEditorial } from "./site-category-editorial";
import { categoryFromRoute, productFromRoute } from "./site-products";

const SITE_URL = "https://kameymall-sheet.com";

const englishSeoOverrides: Partial<Record<RouteKey, { title: string; description: string }>> = {
  categories: {
    title: "KameyMall Finds by Category: Shoes, Clothing & Accessories",
    description: "Browse 30 KameyMall spreadsheet finds by category, including shoes, hoodies, T-shirts, jackets, jerseys, accessories and electronics.",
  },
  faq: {
    title: "KameyMall FAQ 2026: Buying, QC, Storage & Shipping",
    description: "Get clear answers about KameyMall buying, payments, QC photos, warehouse storage, returns, packaging, shipping and tracking.",
  },
  articles: {
    title: "KameyMall Guides 2026: QC, Shipping, Customs & More",
    description: "Read 20 independent KameyMall guides covering product links, ordering, QC, shipping, customs, insurance, packaging and country-specific planning.",
  },
};

export function slugToRoute(slug: string[]): RouteKey {
  const value = slug.join("/");
  if (!isRouteKey(value) || value === "home") notFound();
  return value as RouteKey;
}

export function renderSiteRoute(locale: Locale, slug: string[]) {
  const route = slugToRoute(slug);
  if (locale !== "en" && isEnglishOnlyArticleRoute(route)) notFound();
  return <SitePage locale={locale} route={route} />;
}

export function buildMetadata(locale: Locale, route: RouteKey): Metadata {
  if (locale !== "en" && isEnglishOnlyArticleRoute(route)) notFound();
  const copy = copies[locale];
  const catalog = catalogCopies[locale];
  const product = productFromRoute(route);
  const category = categoryFromRoute(route);
  const isHome = route === "home";
  const staticRoute = isStaticRouteKey(route) ? route : null;
  const page = staticRoute && staticRoute !== "home" ? copy.pageIntros[staticRoute] : null;
  const isArticle = staticRoute ? articleRoutes.includes(staticRoute) : false;
  const articlePage = staticRoute && isArticle
    ? route === articleRoute
      ? copy.articlePage
      : additionalArticles[locale][route as (typeof additionalArticleRoutes)[number]]
    : null;
  const categoryLabel = category
    ? copy.categories.items[category].label
    : product
      ? copy.categories.items[product.categoryKey].label
      : null;
  const categoryEditorial = category ? priorityCategoryEditorial[locale][category] : null;
  const generatedTitle = product
    ? catalog.productSeoTitle.replace("{name}", product.name)
    : category
      ? categoryEditorial?.seoTitle ?? catalog.categorySeoTitle.replace("{category}", categoryLabel ?? "")
      : isHome
        ? catalog.homeSeoTitle
        : articlePage?.seoTitle ?? `${page?.title} | KameyMall Sheet`;
  const generatedDescription = product
    ? catalog.productMeta.replace("{name}", product.name)
    : category
      ? categoryEditorial?.metaDescription ?? catalog.categoryMeta.replace("{category}", categoryLabel ?? "")
      : isHome
        ? copy.home.lede
        : articlePage?.seoDescription ?? page?.intro;
  const override = locale === "en" ? englishSeoOverrides[route] : undefined;
  const title = override?.title ?? generatedTitle;
  const description = override?.description ?? generatedDescription;
  const canonicalPath = routeHref(locale, route);
  const canonical = `${SITE_URL}${canonicalPath === "/" ? "" : canonicalPath}`;
  const alternateLanguages = isEnglishOnlyArticleRoute(route)
    ? languages.filter((language) => language.code === "en")
    : languages;
  const alternates = Object.fromEntries(
    alternateLanguages.map((language) => {
      const path = routeHref(language.code, route);
      return [language.code, `${SITE_URL}${path === "/" ? "" : path}`];
    }),
  );
  return {
    title,
    description,
    alternates: {
      canonical,
      languages: { ...alternates, "x-default": `${SITE_URL}${routeHref("en", route) === "/" ? "" : routeHref("en", route)}` },
    },
    openGraph: {
      title,
      description,
      type: isArticle ? "article" : "website",
      url: canonical,
      images: product ? [{ url: `${SITE_URL}${product.image}`, alt: product.name }] : undefined,
    },
  };
}
