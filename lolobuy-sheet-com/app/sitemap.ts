import type { MetadataRoute } from "next";
import { localeOptions, localizedPath } from "./i18n";
import { languageAlternates } from "./seo";
import { articles, productFinds } from "./site-data";
import { categoryGuideSlugs } from "./category-guide-data";
import { englishOnlyArticleSlugs } from "./priority-articles";

const baseUrl = "https://lolobuy-sheet.com";
const staticLastModified = new Date("2026-08-10");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/finds",
    "/categories",
    "/how-it-works",
    "/guides/qc",
    "/guides/shipping",
    "/articles",
    "/faq",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const pages = [
    ...staticRoutes.map((path) => ({
      path: path || "/",
      lastModified: staticLastModified,
      changeFrequency:
        path === "" ? ("daily" as const) : ("monthly" as const),
      priority: path === "" ? 1 : path.startsWith("/guides") ? 0.8 : 0.7,
    })),
    ...articles.map((article) => ({
      path: `/articles/${article.slug}`,
      lastModified: new Date(article.updated),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...categoryGuideSlugs.map((slug) => ({
      path: `/categories/${slug}`,
      lastModified: staticLastModified,
      changeFrequency: "weekly" as const,
      priority: 0.86,
    })),
    ...productFinds.map((product) => ({
      path: `/products/${product.slug}`,
      lastModified: staticLastModified,
      changeFrequency: "weekly" as const,
      priority: 0.82,
    })),
  ];

  return pages.flatMap((page) => {
    const articleSlug = page.path.startsWith("/articles/")
      ? page.path.slice("/articles/".length)
      : null;
    const locales =
      articleSlug && englishOnlyArticleSlugs.has(articleSlug)
        ? localeOptions.filter((option) => option.code === "en")
        : localeOptions;
    const alternates =
      articleSlug && englishOnlyArticleSlugs.has(articleSlug)
        ? {
            en: `${baseUrl}${localizedPath(page.path, "en")}`,
            "x-default": `${baseUrl}${localizedPath(page.path, "en")}`,
          }
        : Object.fromEntries(
            Object.entries(languageAlternates(page.path)).map(([locale, path]) => [
              locale,
              `${baseUrl}${path}`,
            ]),
          );

    return locales.map((option) => ({
      url: `${baseUrl}${localizedPath(page.path, option.code)}`,
      lastModified: page.lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: alternates,
      },
    }));
  });
}
