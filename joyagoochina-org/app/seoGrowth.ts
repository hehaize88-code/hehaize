import english from './seoGrowth.en.json';
import localized from './seoGrowth.json';
import type { Locale } from './i18n';
import type { SeoArticleEntry } from './seoArticleLibrary';

export const growthArticleSlugs = english.articles.map(({ slug }) => slug);
// Committed, complete locale assets. No English fallback for translated bodies.
export const growthCopy = { en: english, ...localized } as Record<Locale, typeof english>;

export function applyGrowthRefresh(entries: SeoArticleEntry[], locale: Locale): SeoArticleEntry[] {
  const copy = growthCopy[locale];
  const updates = copy.refresh as Record<string, (typeof copy.refresh)[keyof typeof copy.refresh]>;
  const available = new Set([...entries, ...copy.articles].map(entry => entry.slug));
  const revised = entries.map(entry => {
    const update = updates[entry.slug];
    if (!update) return entry;
    return {
      ...entry,
      seoTitle: update.seoTitle,
      modifiedAt: '2026-10-16',
      relatedLinks: [...new Set(update.relatedLinks.map(slug => available.has(slug) || slug === "articles" ? slug : "shipping-guide"))],
      article: {
        ...entry.article,
        title: update.title,
        description: update.description,
        // Replace the earlier answer section; retain its useful comparison table.
        sections: [{ ...entry.article.sections[0], ...update.section }, ...entry.article.sections.slice(1)],
      },
    };
  });
  return [...copy.articles, ...revised].sort((a, b) => b.modifiedAt.localeCompare(a.modifiedAt));
}
