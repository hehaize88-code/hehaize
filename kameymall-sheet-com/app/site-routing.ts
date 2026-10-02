import { newArticleRoutes } from "./site-article-routes";
import { categoryRoutes, productRoutes, type CatalogRoute } from "./site-products";

export type Locale = "en" | "de" | "fr" | "es" | "it" | "pl";

export type StaticRouteKey =
  | (typeof newArticleRoutes)[number]
  | "home"
  | "finds"
  | "categories"
  | "how-to-buy"
  | "guides"
  | "faq"
  | "articles"
  | "guides/how-to-use-kameymall-spreadsheet"
  | "guides/cny-price-vs-final-cost"
  | "guides/what-to-inspect-before-ordering"
  | "articles/kameymall-spreadsheet-guide-2026"
  | "articles/how-to-buy-from-kameymall-2026"
  | "articles/kameymall-shipping-cost-guide-2026"
  | "articles/how-to-read-kameymall-qc-photos"
  | "articles/kameymall-warehouse-storage-returns-guide"
  | "articles/kameymall-payment-methods-fees"
  | "articles/kameymall-order-status-guide"
  | "articles/kameymall-consolidation-vs-split-parcels"
  | "articles/kameymall-shipping-lines-comparison"
  | "articles/kameymall-tracking-no-update-guide"
  | "articles/is-kameymall-legit-2026"
  | "articles/kameymall-shipping-to-usa"
  | "articles/kameymall-shoes-buying-guide"
  | "articles/kameymall-volumetric-weight-guide"
  | "articles/kameymall-customs-declaration-guide"
  | "articles/kameymall-packaging-options-guide"
  | "articles/kameymall-insurance-claims-guide"
  | "articles/kameymall-product-link-not-working"
  | "articles/kameymall-app-vs-website"
  | "articles/kameymall-shipping-to-philippines";

export type RouteKey = StaticRouteKey | CatalogRoute;

export const opportunityArticleRoutes = [
  "articles/is-kameymall-legit-2026",
  "articles/kameymall-shipping-to-usa",
  "articles/kameymall-shoes-buying-guide",
  "articles/kameymall-volumetric-weight-guide",
  "articles/kameymall-customs-declaration-guide",
  "articles/kameymall-packaging-options-guide",
  "articles/kameymall-insurance-claims-guide",
  "articles/kameymall-product-link-not-working",
  "articles/kameymall-app-vs-website",
  "articles/kameymall-shipping-to-philippines",
] as const satisfies readonly StaticRouteKey[];

export const staticRoutes: StaticRouteKey[] = [
  "home",
  "finds",
  "categories",
  "how-to-buy",
  "guides",
  "faq",
  "articles",
  "guides/how-to-use-kameymall-spreadsheet",
  "guides/cny-price-vs-final-cost",
  "guides/what-to-inspect-before-ordering",
  "articles/kameymall-spreadsheet-guide-2026",
  "articles/how-to-buy-from-kameymall-2026",
  "articles/kameymall-shipping-cost-guide-2026",
  "articles/how-to-read-kameymall-qc-photos",
  "articles/kameymall-warehouse-storage-returns-guide",
  "articles/kameymall-payment-methods-fees",
  "articles/kameymall-order-status-guide",
  "articles/kameymall-consolidation-vs-split-parcels",
  "articles/kameymall-shipping-lines-comparison",
  "articles/kameymall-tracking-no-update-guide",
  ...opportunityArticleRoutes,
  ...newArticleRoutes,
];

export const supportedRoutes: RouteKey[] = [
  ...staticRoutes,
  ...categoryRoutes,
  ...productRoutes,
];

export function isRouteKey(value: string): value is RouteKey {
  return supportedRoutes.includes(value as RouteKey);
}

export function isStaticRouteKey(value: string): value is StaticRouteKey {
  return staticRoutes.includes(value as StaticRouteKey);
}

export const languages: Array<{ code: Locale; short: string; label: string }> = [
  { code: "en", short: "EN", label: "English" },
  { code: "de", short: "DE", label: "Deutsch" },
  { code: "fr", short: "FR", label: "Français" },
  { code: "es", short: "ES", label: "Español" },
  { code: "it", short: "IT", label: "Italiano" },
  { code: "pl", short: "PL", label: "Polski" },
];

export function routeHref(locale: Locale, route: RouteKey): string {
  const prefix = locale === "en" ? "" : `/${locale}`;
  return route === "home" ? `${prefix || "/"}` : `${prefix}/${route}`;
}

export const guideRoutes: StaticRouteKey[] = [
  "guides/how-to-use-kameymall-spreadsheet",
  "guides/cny-price-vs-final-cost",
  "guides/what-to-inspect-before-ordering",
];
export const articleRoute: StaticRouteKey = "articles/kameymall-spreadsheet-guide-2026";
export const articleRoutes: StaticRouteKey[] = [
  articleRoute,
  "articles/how-to-buy-from-kameymall-2026",
  "articles/kameymall-shipping-cost-guide-2026",
  "articles/how-to-read-kameymall-qc-photos",
  "articles/kameymall-warehouse-storage-returns-guide",
  "articles/kameymall-payment-methods-fees",
  "articles/kameymall-order-status-guide",
  "articles/kameymall-consolidation-vs-split-parcels",
  "articles/kameymall-shipping-lines-comparison",
  "articles/kameymall-tracking-no-update-guide",
  ...opportunityArticleRoutes,
  ...newArticleRoutes,
];
