import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SitePage from "./site-page";
import { articleRoute, articleRoutes, copies, isRouteKey, languages, Locale, routeHref, RouteKey } from "./site-content";
import { additionalArticles, additionalArticleRoutes } from "./site-articles";

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
  const isHome = route === "home";
  const page = isHome ? null : copy.pageIntros[route];
  const articlePage = articleRoutes.includes(route)
    ? route === articleRoute
      ? copy.articlePage
      : additionalArticles[locale][route as (typeof additionalArticleRoutes)[number]]
    : null;
  const title = isHome
    ? "KameyMall Sheet & Spreadsheet Finds | Shopping Guide"
    : articlePage?.seoTitle ?? `${page?.title} | KameyMall Sheet`;
  const description = isHome ? copy.home.lede : articlePage?.seoDescription ?? page?.intro;
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
    openGraph: { title, description, type: articleRoutes.includes(route) ? "article" : "website", url: canonical },
  };
}
