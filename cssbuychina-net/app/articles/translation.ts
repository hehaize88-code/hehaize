import de from "./translations/de.json";
import es from "./translations/es.json";
import pt from "./translations/pt-br.json";
import type { SiteLocale } from "../i18n";
import type { Article } from "./article-types";
const dictionaries: Record<string, Record<string, string>> = { de, es, "pt-br": pt };
export function translated(text: string, locale: SiteLocale) { return locale === "en" ? text : dictionaries[locale]?.[text] ?? text; }
export function localizedArticle(article: Article, locale: SiteLocale): Article {
 const visit = (value: unknown): unknown => typeof value === "string" ? translated(value, locale) : Array.isArray(value) ? value.map(visit) : value && typeof value === "object" ? Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, visit(entry)])) : value;
 return visit(article) as Article;
}
export function contentHref(href: string, locale: SiteLocale) {
 if (locale === "en" || !/^\/(articles|guides)(\/|$)/.test(href)) return href;
 return `/${locale}${href}`;
}
