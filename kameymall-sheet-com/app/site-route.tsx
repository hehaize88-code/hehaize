import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SitePage from "./site-page";
import { articleRoute, articleRoutes, copies, isRouteKey, isStaticRouteKey, languages, Locale, routeHref, RouteKey } from "./site-content";
import { additionalArticles, additionalArticleRoutes } from "./site-articles";
import { catalogCopies } from "./site-catalog-copy";
import { categoryFromRoute, productFromRoute } from "./site-products";

const SITE_URL = "https://kameymall-sheet.com";

export function slugToRoute(slug: string[]): RouteKey {
  const value = slug.join("/");
  if (!isRouteKey(value) || value === "home") notFound();
  return value;
}

export function renderSiteRoute(locale: Locale, slug: string[]) {
  return <SitePage locale={locale} route={slugToRoute(slug)} />;
}

export function buildMetadata(locale: Locale, route: RouteKey): Metadata {
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
  const title = product
    ? `${product.name} KameyMall Find | Price & Buying Notes`
    : category
      ? `${categoryLabel} KameyMall Finds | Curated Product List`
      : isHome
        ? "KameyMall Sheet & Spreadsheet Finds | Shopping Guide"
        : articlePage?.seoTitle ?? `${page?.title} | KameyMall Sheet`;
  const description = product
    ? catalog.productMeta.replace("{name}", product.name)
    : category
      ? catalog.categoryMeta.replace("{category}", categoryLabel ?? "")
      : isHome
        ? copy.home.lede
        : articlePage?.seoDescription ?? page?.intro;
  const canonicalPath = routeHref(locale, route);
  const canonical = `${SITE_URL}${canonicalPath === "/" ? "" : canonicalPath}`;
  const alternates = Object.fromEntries(
    languages.map((language) => {
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
      images: product ? [{ url: product.image, alt: product.name }] : undefined,
    },
  };
}
