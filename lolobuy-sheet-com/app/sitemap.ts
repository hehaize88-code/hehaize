import type { MetadataRoute } from "next";
import { localeOptions, localizedPath } from "./i18n";
import { languageAlternates } from "./seo";
import { getLocalizedArticles } from "./localized-data";
import { categoryGuideSlugs } from "./category-guide-data";

const baseUrl = "https://lolobuy-sheet.com";
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/categories", "/how-it-works", "/guides/qc", "/guides/shipping", "/articles", "/faq", "/about", "/contact", "/privacy", "/terms"];
  return localeOptions.flatMap(({code: locale}) => {
    const pages = [
      ...staticRoutes.map(path => ({path, updated: "2026-10-17", priority: path === "/" ? 1 : 0.8})),
      ...getLocalizedArticles(locale).map(article => ({path: `/articles/${article.slug}`, updated: article.updated, priority: 0.8})),
      ...categoryGuideSlugs.map(slug => ({path: `/categories/${slug}`, updated: "2026-10-17", priority: 0.8})),
    ];
    return pages.map(page => ({
      url: `${baseUrl}${localizedPath(page.path, locale)}`,
      lastModified: new Date(page.updated),
      changeFrequency: "monthly" as const,
      priority: page.priority,
      alternates: {languages: Object.fromEntries(Object.entries(languageAlternates(page.path)).map(([lang,path]) => [lang, `${baseUrl}${path}`]))},
    }));
  });
}
