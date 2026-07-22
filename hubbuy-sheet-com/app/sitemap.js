import { SITE_URL } from "@/data/site";
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
  return baseRoutes.flatMap((route) => {
    const article = route.startsWith("/articles/") && route !== "/articles/"
      ? articles.find((item) => route.includes(item.slug))
      : null;
    const languages = {
      en: `${SITE_URL}${localizedPath(route, "")}`,
      "pt-BR": `${SITE_URL}${localizedPath(route, "/pt-br")}`,
      de: `${SITE_URL}${localizedPath(route, "/de")}`,
      "x-default": `${SITE_URL}${localizedPath(route, "")}`,
    };
    return locales.map(({ prefix }) => ({
      url: `${SITE_URL}${localizedPath(route, prefix)}`,
      lastModified: new Date(`${article?.updated || "2026-07-22"}T00:00:00Z`),
      changeFrequency: ["/", "/products/", "/articles/"].includes(route) ? "weekly" : "monthly",
      priority: route === "/" ? (prefix ? 0.9 : 1) : route === "/products/" ? 0.9 : route === "/articles/" ? 0.85 : article ? 0.8 : 0.7,
      alternates: { languages },
    }));
  });
}
