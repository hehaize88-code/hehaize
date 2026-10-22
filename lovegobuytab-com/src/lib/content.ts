import { languages } from "./i18n";
const copies = import.meta.glob("../content/copy/*.json", {
  eager: true,
  import: "default",
});
const faqs = import.meta.glob("../content/faq/*.json", {
  eager: true,
  import: "default",
});
const articles = import.meta.glob("../content/articles/*.json", {
  eager: true,
  import: "default",
});
export function content(lang: string) {
  const copy = copies[`../content/copy/${lang}.json`] as Record<string, string>;
  const faq = faqs[`../content/faq/${lang}.json`] as any;
  const editorial = articles[`../content/articles/${lang}.json`] as any;
  if (!copy || !faq || !editorial)
    throw new Error(`Missing complete locale: ${lang}`);
  return {
    copy,
    faq: faq.faq,
    articles: editorial.articles,
    sources: [
      ...new Map(
        [...faq.sources, ...(editorial.sources || [])].map((s: any) => [
          s.id,
          s,
        ]),
      ).values(),
    ] as any[],
  };
}
export const languageCodes = languages.map(([code]) => code);
export function route(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  const lang = languageCodes.includes(parts[0]) ? parts.shift()! : "en";
  return { lang, path: "/" + parts.join("/") + (parts.length ? "/" : "") };
}
export function productRoute(path: string) {
  return "/products" + path.replace(/\.html$/, "/");
}
