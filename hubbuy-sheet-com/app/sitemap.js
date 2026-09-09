import { products, SITE_URL } from "@/data/site";
import { articles } from "@/data/articles";
import { categoryPages } from "@/data/categories";

export const dynamic = "force-static";

export default function sitemap() {
  const baseRoutes = [
    "/",
    "/products/",
    "/articles/",
    "/guides/how-to-buy/",
    "/guides/qc-checks/",
    "/guides/shipping/",
    "/faq/",
    "/about/",
    "/contact/",
    "/legal/privacy/",
    "/legal/terms/",
    ...articles.map((article) => `/articles/${article.slug}/`),
    ...categoryPages.map((category) => `/categories/${category.slug}/`),
  ];
  const locales = [
    { code: "en", prefix: "" },
    { code: "pt-BR", prefix: "/pt-br" },
    { code: "de", prefix: "/de" },
  ];

  const localizedPath = (route, prefix) => prefix ? `${prefix}${route}` : route;
  const localizedEntries = baseRoutes.flatMap((route) => {
    const article = route.startsWith("/articles/") && route !== "/articles/"
      ? articles.find((item) => route.includes(item.slug))
      : null;
    const supportedLocales = article?.locales || locales.map(({ code }) => code === "pt-BR" ? "pt-br" : code);
    const portugueseOnly = supportedLocales.length === 1 && supportedLocales[0] === "pt-br";
    const englishOnly = supportedLocales.length === 1 && supportedLocales[0] === "en";
    const languages = portugueseOnly
      ? {
          "pt-BR": `${SITE_URL}${localizedPath(route, "/pt-br")}`,
          "x-default": `${SITE_URL}${localizedPath(route, "/pt-br")}`,
        }
      : englishOnly
      ? {
          en: `${SITE_URL}${localizedPath(route, "")}`,
          "x-default": `${SITE_URL}${localizedPath(route, "")}`,
        }
      : {
          en: `${SITE_URL}${localizedPath(route, "")}`,
          "pt-BR": `${SITE_URL}${localizedPath(route, "/pt-br")}`,
          de: `${SITE_URL}${localizedPath(route, "/de")}`,
          "x-default": `${SITE_URL}${localizedPath(route, "")}`,
        };
    const routeLocales = portugueseOnly
      ? locales.filter(({ code }) => code === "pt-BR")
      : englishOnly ? locales.filter(({ code }) => code === "en") : locales;
    return routeLocales.map(({ prefix }) => ({
      url: `${SITE_URL}${localizedPath(route, prefix)}`,
      lastModified: new Date(`${article?.updated || "2026-07-22"}T00:00:00Z`),
      changeFrequency: ["/", "/products/", "/articles/"].includes(route) ? "weekly" : "monthly",
      priority: route === "/" ? (prefix ? 0.9 : 1) : route === "/products/" ? 0.9 : route === "/articles/" ? 0.85 : article ? 0.8 : 0.7,
      alternates: { languages },
    }));
  });
  const productEntries = products.flatMap((product) => locales.map(({ code, prefix }) => ({
    url: `${SITE_URL}${localizedPath(product.localHref, prefix)}`,
    lastModified: new Date(`${product.checked}T00:00:00Z`),
    changeFrequency: "weekly",
    priority: 0.72,
    alternates: { languages: {
      en: `${SITE_URL}${product.localHref}`,
      "pt-BR": `${SITE_URL}${localizedPath(product.localHref, "/pt-br")}`,
      de: `${SITE_URL}${localizedPath(product.localHref, "/de")}`,
      "x-default": `${SITE_URL}${product.localHref}`,
    } },
  })));
  return [...localizedEntries, ...productEntries];
}
