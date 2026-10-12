import { languages, type Locale } from "../i18n";
import { getSeoArticleEntry } from "../seoArticleLibrary";
import { nav } from "../../commerce/catalog.js";

export default function SiteHeader({ locale = "en", articleSlug, pagePath = "/" }: {
  locale?: Locale;
  articleSlug?: string;
  pagePath?: string;
}) {
  const supportedLanguages = articleSlug ? languages.filter(({code}) => getSeoArticleEntry(code, articleSlug)).map(({code}) => code) : undefined;
  return <div className="site-navigation" dangerouslySetInnerHTML={{
    __html: nav(locale, articleSlug ? `/${articleSlug}/` : pagePath, supportedLanguages),
  }} />;
}
