import { localizePath, translations, type Locale } from "../i18n";
import { seoArticleCopy } from "../seoArticles";
import {
  priorityArticleLocales,
  prioritySeoArticleSlugs,
} from "../priorityShippingArticles";
import LanguageSwitcher from "./LanguageSwitcher";

export default function SiteHeader({
  locale = "en",
  articleSlug,
}: {
  locale?: Locale;
  articleSlug?: string;
}) {
  const copy = translations[locale];
  const supportedLocales = prioritySeoArticleSlugs.includes(articleSlug as never)
    ? priorityArticleLocales
    : undefined;

  return (
    <header className="site-header">
      <div className="header-inner">
        <a
          className="brand brand-image"
          href={localizePath(locale, "/")}
          aria-label={`Joyagoo — ${copy.common.home}`}
        >
          <img
            src="/joyagoo-logo.png"
            alt="JoyaGoo"
            width={768}
            height={235}
            loading="eager"
            fetchPriority="low"
          />
        </a>
        <nav className="desktop-nav" aria-label={copy.common.guides}>
          <a href={localizePath(locale, "/spreadsheet/")}>
            {copy.nav.spreadsheet}
          </a>
          <a href={localizePath(locale, "/categories/")}>
            {copy.nav.categories}
          </a>
          <a
            className="nav-articles"
            href={localizePath(locale, "/articles/")}
          >
            {seoArticleCopy[locale].navLabel}
          </a>
          <a href={localizePath(locale, "/how-to-buy/")}>{copy.nav.howTo}</a>
          <a href={localizePath(locale, "/qc-guide/")}>{copy.nav.qc}</a>
          <a href={localizePath(locale, "/shipping-guide/")}>
            {copy.nav.shipping}
          </a>
          <a href={localizePath(locale, "/faq/")}>{copy.nav.faq}</a>
        </nav>
        <div className="header-actions">
          <LanguageSwitcher
            currentLocale={locale}
            supportedLocales={supportedLocales}
          />
          <a
            className="button button-small"
            href={localizePath(locale, "/spreadsheet/")}
          >
            {copy.nav.explore}
          </a>
        </div>
      </div>
    </header>
  );
}
