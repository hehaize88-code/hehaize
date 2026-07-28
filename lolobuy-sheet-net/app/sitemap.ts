import type { MetadataRoute } from "next";
import { articles } from "./article-data";
import {
  absoluteUrl,
  corePaths,
  languageAlternates,
  localizedLocales,
  localizedPath,
  type CorePath,
} from "./i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const priorities: Record<CorePath, number> = {
    "/": 1,
    "/products": 0.9,
    "/categories": 0.85,
    "/qc-guide": 0.85,
    "/shipping": 0.85,
    "/articles": 0.85,
    "/faq": 0.85,
    "/how-it-works": 0.8,
  };
  const locales = ["en", ...localizedLocales] as const;

  return [
    ...corePaths.flatMap((path) =>
      locales.map((locale) => ({
        url: absoluteUrl(localizedPath(locale, path)),
        lastModified: new Date("2026-07-28"),
        changeFrequency: "weekly" as const,
        priority: priorities[path],
        alternates: {
          languages: languageAlternates(path),
        },
      })),
    ),
    ...articles.map((article) => ({
      url: absoluteUrl(`/articles/${article.slug}`),
      lastModified: new Date("2026-07-28"),
      changeFrequency: "monthly" as const,
      priority: 0.82,
    })),
  ];
}
