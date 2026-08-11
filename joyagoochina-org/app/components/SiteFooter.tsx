import { localizePath, translations, type Locale } from "../i18n";
import { seoArticleCopy } from "../seoArticles";

export default function SiteFooter({
  locale = "en",
}: {
  locale?: Locale;
}) {
  const copy = translations[locale];

  return (
    <footer>
      <a
        className="brand brand-image footer-brand"
        href={localizePath(locale, "/")}
      >
        <img src="/joyagoo-logo.png" alt="JoyaGoo" width="220" height="64" loading="lazy" />
      </a>
      <p>{copy.common.footer}</p>
      <nav aria-label={copy.common.footer}>
        <a href={localizePath(locale, "/")}>{copy.common.home}</a>
        <a href={localizePath(locale, "/guides/")}>
          {copy.common.guides}
        </a>
        <a href={localizePath(locale, "/articles/")}>
          {seoArticleCopy[locale].navLabel}
        </a>
        <a href={localizePath(locale, "/qc-guide/")}>{copy.nav.qc}</a>
        <a href={localizePath(locale, "/shipping-guide/")}>
          {copy.nav.shipping}
        </a>
        <a href={localizePath(locale, "/returns/")}>
          {copy.common.returns}
        </a>
        <a href={localizePath(locale, "/about/")}>About</a>
        <a href={localizePath(locale, "/editorial-policy/")}>Editorial Policy</a>
        <a href={localizePath(locale, "/privacy/")}>Privacy</a>
        <a href={localizePath(locale, "/terms/")}>Terms</a>
      </nav>
      <small>© 2026 Joyagoo China. {copy.common.disclaimer}</small>
    </footer>
  );
}
