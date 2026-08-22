import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SitePage from "./site-page";
import { articleRoute, articleRoutes, copies, isRouteKey, isStaticRouteKey, languages, Locale, routeHref, RouteKey, StaticRouteKey } from "./site-content";
import { additionalArticles, additionalArticleRoutes } from "./site-articles";
import { catalogCopies } from "./site-catalog-copy";
import { priorityCategoryEditorial } from "./site-category-editorial";
import { categoryFromRoute, productFromRoute } from "./site-products";

const SITE_URL = "https://kameymall-sheet.com";
const CNY_TO_USD = 0.1481;

type SeoOverride = { title: string; description: string };

const englishSeoOverrides: Partial<Record<StaticRouteKey, SeoOverride>> = {
  home: {
    title: "KameyMall Spreadsheet 2026 – 30 Verified Finds & QC",
    description: "Browse 30 checked KameyMall finds with live product links, dated CNY and USD prices, category filters, QC checks and shipping guides. Updated August 2026.",
  },
  finds: {
    title: "KameyMall Finds 2026: 30 Checked Products & Prices",
    description: "Search 30 checked KameyMall finds across 10 categories. Compare dated CNY and USD prices, product IDs and live listing links before you buy.",
  },
  categories: {
    title: "KameyMall Spreadsheet Categories: Shoes, Hoodies & More",
    description: "Browse KameyMall spreadsheet finds by category, including shoes, hoodies, T-shirts, jackets, jerseys, accessories, electronics and more.",
  },
  "how-to-buy": {
    title: "How to Buy From KameyMall in 2026: 6-Step Guide",
    description: "Follow six KameyMall buying stages from product link and first payment to seller delivery, warehouse QC, storage and international parcel submission.",
  },
  guides: {
    title: "KameyMall Buying Guides 2026: Listings, QC & Shipping",
    description: "Use practical KameyMall guides to verify listings, compare CNY prices with final cost, review QC photos and plan storage, returns and shipping.",
  },
  articles: {
    title: "KameyMall Guides 2026: Shipping, QC, Storage & Fees",
    description: "Read eight source-checked KameyMall guides covering spreadsheet finds, buying, shipping costs, QC photos, storage, returns, payments and parcel planning.",
  },
  faq: {
    title: "KameyMall FAQ 2026: Orders, QC, Storage & Shipping",
    description: "Get source-checked answers about KameyMall ordering, payments, seller dispatch, warehouse QC, returns, storage limits and international shipping.",
  },
  "guides/how-to-use-kameymall-spreadsheet": {
    title: "How to Use a KameyMall Spreadsheet: 2026 Guide",
    description: "Learn how to search a KameyMall spreadsheet, verify the exact live listing, compare variants and prices, review QC and plan the final parcel.",
  },
  "guides/cny-price-vs-final-cost": {
    title: "KameyMall Prices Explained: CNY, Fees & Final Cost",
    description: "Separate a KameyMall product price from Chinese delivery, payment charges, warehouse choices, packaging and international freight.",
  },
  "guides/what-to-inspect-before-ordering": {
    title: "KameyMall QC Photos, Storage & Returns Checklist",
    description: "Use KameyMall QC photos to check visible details, understand the return decision, track storage and choose packaging before shipping.",
  },
};

function productMetaDescription(locale: Locale, product: NonNullable<ReturnType<typeof productFromRoute>>): string {
  const cny = new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(product.cny);
  const usd = new Intl.NumberFormat(locale, { style: "currency", currency: "USD" }).format(product.cny * CNY_TO_USD);
  const checked = new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeZone: "UTC" }).format(new Date(`${product.lastChecked}T00:00:00Z`));
  const descriptions: Record<Locale, string> = {
    en: `${product.name} KameyMall find checked ${checked}: ¥${cny} (${usd} reference), product ID ${product.reference}, category and live listing link.`,
    de: `${product.name} bei KameyMall, geprüft am ${checked}: ¥${cny} (${usd} Referenz), Produkt-ID ${product.reference}, Kategorie und Live-Link.`,
    fr: `${product.name} sur KameyMall, vérifié le ${checked} : ¥${cny} (${usd} indicatif), ID ${product.reference}, catégorie et lien en direct.`,
    es: `${product.name} en KameyMall, comprobado el ${checked}: ¥${cny} (${usd} de referencia), ID ${product.reference}, categoría y enlace activo.`,
    it: `${product.name} su KameyMall, verificato il ${checked}: ¥${cny} (${usd} indicativi), ID ${product.reference}, categoria e link live.`,
    pl: `${product.name} w KameyMall, sprawdzono ${checked}: ¥${cny} (${usd} orientacyjnie), ID ${product.reference}, kategoria i aktywny link.`,
  };
  return descriptions[locale];
}

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
  const categoryEditorial = category ? priorityCategoryEditorial[locale][category] : null;
  const seoOverride = locale === "en" && staticRoute ? englishSeoOverrides[staticRoute] : null;
  const title = product
    ? catalog.productSeoTitle.replace("{name}", product.name)
    : category
      ? categoryEditorial?.seoTitle ?? catalog.categorySeoTitle.replace("{category}", categoryLabel ?? "")
      : articlePage?.seoTitle
        ?? seoOverride?.title
        ?? (isHome ? catalog.homeSeoTitle : `${page?.title} | KameyMall Sheet`);
  const description = product
    ? productMetaDescription(locale, product)
    : category
      ? categoryEditorial?.metaDescription ?? catalog.categoryMeta.replace("{category}", categoryLabel ?? "")
      : articlePage?.seoDescription
        ?? seoOverride?.description
        ?? (isHome ? copy.home.lede : page?.intro);
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
      siteName: "KameyMall Sheet",
      images: product ? [{ url: `${SITE_URL}${product.image}`, alt: product.name }] : undefined,
    },
    twitter: {
      card: product ? "summary_large_image" : "summary",
      title,
      description,
      images: product ? [`${SITE_URL}${product.image}`] : undefined,
    },
  };
}
