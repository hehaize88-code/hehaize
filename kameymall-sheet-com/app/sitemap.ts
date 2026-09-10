import type { MetadataRoute } from "next";
import { isEnglishOnlyArticleRoute, languages, routeHref, supportedRoutes, type RouteKey } from "./site-content";

const SITE_URL = "https://kameymall-sheet.com";
const DEFAULT_LAST_MODIFIED = "2026-08-03";
const routeDates: Partial<Record<RouteKey, string>> = {
  home: "2026-09-10",
  articles: "2026-09-10",
  "articles/kameymall-warehouse-storage-returns-guide": "2026-08-08",
  "articles/kameymall-payment-methods-fees": "2026-08-09",
  "articles/kameymall-order-status-guide": "2026-08-11",
  "articles/kameymall-consolidation-vs-split-parcels": "2026-08-13",
  "articles/kameymall-shipping-lines-comparison": "2026-08-27",
  "articles/kameymall-tracking-no-update-guide": "2026-08-29",
  "articles/is-kameymall-legit-2026": "2026-09-10",
  "articles/kameymall-shipping-to-usa": "2026-09-10",
  "articles/kameymall-shoes-buying-guide": "2026-09-10",
  "articles/kameymall-volumetric-weight-guide": "2026-09-10",
  "articles/kameymall-customs-declaration-guide": "2026-09-10",
  "articles/kameymall-packaging-options-guide": "2026-09-10",
  "articles/kameymall-insurance-claims-guide": "2026-09-10",
  "articles/kameymall-product-link-not-working": "2026-09-10",
  "articles/kameymall-app-vs-website": "2026-09-10",
  "articles/kameymall-shipping-to-philippines": "2026-09-10",
};

export default function sitemap(): MetadataRoute.Sitemap {
  return languages.flatMap((language) =>
    supportedRoutes
      .filter((route) => language.code === "en" || !isEnglishOnlyArticleRoute(route))
      .map((route) => {
      const path = routeHref(language.code, route);
      return {
        url: `${SITE_URL}${path === "/" ? "" : path}`,
        lastModified: new Date(`${routeDates[route] ?? DEFAULT_LAST_MODIFIED}T00:00:00Z`),
        changeFrequency: route === "home" || route === "finds" || route === "articles" ? "weekly" as const : "monthly" as const,
        priority: route === "home" ? 1 : route === "finds" || route === "articles" ? 0.85 : 0.72,
      };
    }),
  );
}
