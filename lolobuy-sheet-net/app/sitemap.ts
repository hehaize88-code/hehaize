import type { MetadataRoute } from "next";
import { articles } from "./article-data";
import contentDates from "./content-dates.json";
import {
  absoluteUrl,
  corePaths,
  languageAlternates,
  localizedLocales,
  localizedPath,
  type CorePath,
} from "./i18n";

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
    ...articles.map((article) => ({
      url: absoluteUrl(`/articles/${article.slug}`),
      lastModified: articleDates[article.slug].modified,
    })),
  ];
}
