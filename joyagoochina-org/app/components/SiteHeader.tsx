import { languages, localizePath, translations, type Locale } from "../i18n";
import { seoArticleCopy } from "../seoArticles";
import { getSeoArticleEntry } from "../seoArticleLibrary";
import LanguageSwitcher from "./LanguageSwitcher";

export default function SiteHeader({
  locale = "en",
  articleSlug,
}: {
  locale?: Locale;
  articleSlug?: string;
}) {
  const copy = translations[locale];
  const supportedLocales = articleSlug
    ? languages.filter((language) => getSeoArticleEntry(language.code, articleSlug)).map((language) => language.code)
    : undefined;

  return (
    <header className="site-header">
      <div className="header-inner">
        <a
          className="brand brand-image"
          href="https://joyagoo.com/login"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Joyagoo — Register / Log in"
        >
          <img
            src="/joyagoo-official-logo.svg"
            alt="JoyaGoo"
            width={170}
            height={50}
            loading="eager"
            fetchPriority="low"
          />
        </a>
        <nav className="desktop-nav" aria-label={copy.common.guides}>
          <a href={localizePath(locale, "/catalog/")}>
            {copy.nav.spreadsheet}
          </a>
          <a href={localizePath(locale, "/catalog/")}>
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
            href={localizePath(locale, "/catalog/")}
          >
            {copy.nav.explore}
          </a>
        </div>
      </div>
    </header>
  );
}
