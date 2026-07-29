import type { MetadataRoute } from "next";
import { articles, guides } from "./data";
import { localeOptions, localizePath } from "./i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://pikobuy-sheet.net";
  const staticPages = [
    "/",
    "/finds",
    "/categories",
    "/guides",
    "/faq",
    "/seo-articles",
    "/about",
  ];
  const urls = [
    ...localeOptions.flatMap((locale) =>
      staticPages.map((path) => localizePath(locale.code, path)),
    ),
    ...localeOptions.flatMap((locale) =>
      guides.map((guide) =>
        localizePath(locale.code, `/guides/${guide.slug}`),
      ),
    ),
    ...localeOptions.flatMap((locale) =>
      articles.map((article) =>
        localizePath(locale.code, `/articles/${article.slug}`),
      ),
    ),
  ];

  return urls.map((path) => ({
    url: `${base}${path === "/" ? "" : path}`,
    lastModified: new Date("2026-07-29T00:00:00.000Z"),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.split("/").length === 2 ? 0.8 : 0.7,
  }));
}
