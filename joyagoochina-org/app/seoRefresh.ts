import payload from "./seoRefresh.json";
import english from "./seoRefresh.en.json";
import type { Locale } from "./i18n";
import type { SeoArticleEntry } from "./seoArticleLibrary";

export const newArticleSlugs = [
  "joyagoo-order-status-stock-arrived-qc-stored",
  "joyagoo-shipping-time-stages",
  "joyagoo-tracking-not-updating",
  "joyagoo-qc-photos-missing-unclear",
] as const;

// Only expose complete, reviewed locale payloads. Never use English as a
// translated page body while a locale is still being prepared.
export const refreshCopy = { ...payload, en: english } as Partial<Record<Locale, typeof english>>;

export function applyEditorialRefresh(entries: SeoArticleEntry[], locale: Locale): SeoArticleEntry[] {
  const copy = refreshCopy[locale];
  if (!copy) return [...entries].sort((a, b) => b.modifiedAt.localeCompare(a.modifiedAt));
  const updates = copy.refresh as Record<string, (typeof copy.refresh)[keyof typeof copy.refresh]>;
  const revised = entries.map((entry) => {
    const update = updates[entry.slug];
    if (!update) return ["joyagoo-shipping-calculator-cost-estimate-guide", "joyagoo-shipping-to-uk-cost-planner"].includes(entry.slug)
      ? { ...entry, modifiedAt: "2026-10-02" }
      : entry;
    return {
      ...entry,
      seoTitle: update.seoTitle,
      modifiedAt: "2026-10-02",
      relatedLinks: update.relatedLinks,
      article: {
        ...entry.article,
        title: update.title,
        description: update.description,
        sections: [update.section, ...entry.article.sections],
      },
    };
  });
  return [...copy.articles, ...revised].sort((a, b) => b.modifiedAt.localeCompare(a.modifiedAt));
}
