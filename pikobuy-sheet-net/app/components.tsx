import Link from "next/link";
import {
  articles,
  categories,
  faqItems,
  formatUsdFromCny,
  guides,
  MAIN_SITE,
  products,
} from "./data";
import {
  type Locale,
  localeOptions,
  localizePath,
  t,
} from "./i18n";
import { getSiteData } from "./localized-data";

export function Logo({ locale = "en" }: { locale?: Locale }) {
  return (
    <Link
      className="brand"
      href={localizePath(locale, "/")}
      aria-label="PikoBuy Sheet home"
    >
      <img
        className="brand-logo"
        src="/pikobuy-logo.png"
        alt="PikoBuy"
        width="204"
        height="48"
      />
    </Link>
  );
}

export function Header({
  locale = "en",
  currentPath = "/",
}: {
  locale?: Locale;
  currentPath?: string;
}) {
  const navItems = [
    { path: "/finds", label: t(locale, "nav.finds") },
    { path: "/categories", label: t(locale, "nav.categories") },
    { path: "/guides", label: t(locale, "nav.guides") },
    { path: "/faq", label: t(locale, "nav.faq") },
    { path: "/seo-articles", label: t(locale, "nav.articles") },
  ];
  const currentLocale =
    localeOptions.find((option) => option.code === locale) ?? localeOptions[0];

  return (
    <header className="site-header">
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang=${JSON.stringify(locale)};`,
        }}
      />
      <div className="header-inner">
        <Logo locale={locale} />
        <nav className="desktop-nav" aria-label={t(locale, "a11y.mainNavigation")}>
          {navItems.map((item) => (
            <Link href={localizePath(locale, item.path)} key={item.path}>
              {item.label}
            </Link>
          ))}
        </nav>
        <details className="language">
          <summary
            aria-label={`${t(locale, "language.label")}: ${currentLocale.label}`}
            title={currentLocale.label}
          >
            {locale.toUpperCase()}
          </summary>
          <div className="language-menu">
            <strong>{t(locale, "language.label")}</strong>
            {localeOptions.map((option) => (
              <Link
                className={option.code === locale ? "active" : ""}
                href={localizePath(option.code, currentPath)}
                hrefLang={option.code}
                lang={option.code}
                key={option.code}
              >
                <span aria-hidden="true">{option.flag}</span>
                <span>
                  <b>{option.label}</b>
                  <small>{option.country}</small>
                </span>
                {option.code === locale && <i aria-hidden="true">✓</i>}
              </Link>
            ))}
          </div>
        </details>
        <details className="mobile-nav">
          <summary aria-label={t(locale, "a11y.openMenu")}>
            <span />
            <span />
          </summary>
          <nav aria-label={t(locale, "a11y.mobileNavigation")}>
            {navItems.map((item) => (
              <Link href={localizePath(locale, item.path)} key={item.path}>
                {item.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}

export function SearchBox({
  compact = false,
  locale = "en",
}: {
  compact?: boolean;
  locale?: Locale;
}) {
  return (
    <form
      className={`search-box ${compact ? "compact" : ""}`}
      action={`${MAIN_SITE}/search.html`}
      method="get"
      target="_blank"
    >
      <label className="sr-only" htmlFor={compact ? "search-compact" : "search-main"}>
        {t(locale, "a11y.searchProducts")}
      </label>
      <span className="search-icon" aria-hidden="true" />
      <input
        id={compact ? "search-compact" : "search-main"}
        name="keywords"
        placeholder={t(locale, "search.placeholder")}
        autoComplete="off"
        required
      />
      <input type="hidden" name="channelid" value="2" />
      <button type="submit">{t(locale, "search.button")}</button>
    </form>
  );
}

export function CategoryStrip({ locale = "en" }: { locale?: Locale }) {
  const copy = getSiteData(locale);
  return (
    <div className="category-strip">
      {categories.slice(0, 4).map((category, index) => (
        <a
          href={category.href}
          target="_blank"
          rel="noreferrer"
          className={`category-mini ${index === 0 ? "active" : ""}`}
          key={category.slug}
        >
          <span
            className="category-glyph"
            style={{ "--cat-accent": category.accent } as React.CSSProperties}
            aria-hidden="true"
          >
            {copy.categories[index].name.slice(0, 1)}
          </span>
          <b>{copy.categories[index].name}</b>
          <i aria-hidden="true">→</i>
        </a>
      ))}
    </div>
  );
}

export function ProductGrid({
  limit,
  locale = "en",
}: {
  limit?: number;
  locale?: Locale;
}) {
  const shown = typeof limit === "number" ? products.slice(0, limit) : products;
  const copy = getSiteData(locale);
  return (
    <div className="product-grid">
      {shown.map((product) => (
        <a
          className="product-card"
          href={product.href}
          target="_blank"
          rel="noreferrer"
          key={product.href}
        >
          <div className="product-image" style={{ background: product.tone }}>
            {/* These are current product images from the linked catalogue. */}
            <img src={product.image} alt={product.name} loading="lazy" />
            <span className="verified-pill">{t(locale, "product.review")}</span>
          </div>
          <div className="product-body">
            <span className="product-category">{copy.productCategories[products.indexOf(product)]}</span>
            <h3>{product.name}</h3>
            <p>{copy.productReviews[products.indexOf(product)]}</p>
            <div className="product-meta">
              <strong>{formatUsdFromCny(product.priceCny)}</strong>
              <span>{t(locale, "product.open")}</span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

export function GuideCards({
  limit,
  locale = "en",
}: {
  limit?: number;
  locale?: Locale;
}) {
  const shown = typeof limit === "number" ? guides.slice(0, limit) : guides;
  const copy = getSiteData(locale);
  return (
    <div className="guide-grid">
      {shown.map((guide, index) => (
        <Link
          className="guide-card"
          href={localizePath(locale, `/guides/${guide.slug}`)}
          key={guide.slug}
        >
          <div className={`guide-visual visual-${index + 1}`}>
            <span>{copy.guides[index].eyebrow}</span>
            <b>{String(index + 1).padStart(2, "0")}</b>
          </div>
          <div>
            <small>{copy.guides[index].read}</small>
            <h3>{copy.guides[index].title}</h3>
            <p>{copy.guides[index].description}</p>
            <strong>{t(locale, "card.readGuide")}</strong>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function ArticleCards({
  limit,
  locale = "en",
}: {
  limit?: number;
  locale?: Locale;
}) {
  const shown = typeof limit === "number" ? articles.slice(0, limit) : articles;
  const copy = getSiteData(locale);
  return (
    <div className="article-grid">
      {shown.map((article, index) => (
        <Link
          className="article-card"
          href={localizePath(locale, `/articles/${article.slug}`)}
          key={article.slug}
        >
          <div className="article-top">
            <span>{copy.articles[index].tag}</span>
            <time>{copy.articles[index].date}</time>
          </div>
          <h3>{copy.articles[index].title}</h3>
          <p>{copy.articles[index].description}</p>
          <strong>{t(locale, "card.continue")}</strong>
        </Link>
      ))}
    </div>
  );
}

export function FAQList({
  limit,
  locale = "en",
}: {
  limit?: number;
  locale?: Locale;
}) {
  const items = getSiteData(locale).faq;
  const shown = typeof limit === "number" ? items.slice(0, limit) : items;
  return (
    <div className="faq-list">
      {shown.map((item, index) => (
        <details key={item.question} open={index === 0}>
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function Footer({ locale = "en" }: { locale?: Locale }) {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <Logo locale={locale} />
          <p>{t(locale, "footer.description")}</p>
        </div>
        <div>
          <h3>{t(locale, "footer.explore")}</h3>
          <Link href={localizePath(locale, "/finds")}>
            {t(locale, "footer.productFinds")}
          </Link>
          <Link href={localizePath(locale, "/categories")}>
            {t(locale, "nav.categories")}
          </Link>
          <Link href={localizePath(locale, "/guides")}>
            {t(locale, "nav.guides")}
          </Link>
        </div>
        <div>
          <h3>{t(locale, "footer.learn")}</h3>
          <Link href={localizePath(locale, "/seo-articles")}>
            {t(locale, "nav.articles")}
          </Link>
          <Link href={localizePath(locale, "/faq")}>{t(locale, "nav.faq")}</Link>
          <Link href={localizePath(locale, "/about")}>
            {t(locale, "footer.about")}
          </Link>
        </div>
        <div>
          <h3>{t(locale, "footer.start")}</h3>
          <a href={`${MAIN_SITE}/AllProducts/`} target="_blank" rel="noreferrer">
            {t(locale, "footer.open")}
          </a>
          <small>{t(locale, "footer.note")}</small>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 PikoBuy Sheet</span>
        <span>{t(locale, "footer.independent")}</span>
      </div>
    </footer>
  );
}

export function PageShell({
  children,
  className = "",
  locale = "en",
  currentPath = "/",
}: {
  children: React.ReactNode;
  className?: string;
  locale?: Locale;
  currentPath?: string;
}) {
  return (
    <>
      <Header locale={locale} currentPath={currentPath} />
      <main className={className}>{children}</main>
      <Footer locale={locale} />
    </>
  );
}
