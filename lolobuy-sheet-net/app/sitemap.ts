import type { MetadataRoute } from "next";
import { articles } from "./article-data";
import contentDates from "./content-dates.json";
import {
  absoluteUrl,
  articleLanguageAlternates,
  corePaths,
  languageAlternates,
  localizedLocales,
  localizedPath,
  type CorePath,
} from "./i18n";
import {
  categories,
  categoryInternalPath,
} from "./site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["en", ...localizedLocales] as const;
  const coreDates = contentDates.core as Record<
    CorePath,
    Record<(typeof locales)[number], string>
  >;
  const articleDates = contentDates.articles as Record<
    string,
    { published: string; modified: string }
  >;
  const trustDates = contentDates.trust as Record<string, string>;

  return [
    ...corePaths.flatMap((path) =>
      locales.map((locale) => ({
        url: absoluteUrl(localizedPath(locale, path)),
        lastModified: coreDates[path][locale],
        alternates: {
          languages: languageAlternates(path),
        },
      })),
    ),
    ...articles.flatMap((article) =>
      locales.map((locale) => ({
        url: absoluteUrl(localizedPath(locale, `/articles/${article.slug}`)),
        lastModified: articleDates[article.slug].modified,
        alternates: {
          languages: articleLanguageAlternates(article.slug),
        },
      })),
    ),
    ...categories.map((category) => ({
      url: absoluteUrl(categoryInternalPath(category.slug)),
      lastModified: "2026-08-10",
    })),
    ...Object.entries(trustDates).map(([path, lastModified]) => ({
      url: absoluteUrl(path),
      lastModified,
    })),
  ];
}
