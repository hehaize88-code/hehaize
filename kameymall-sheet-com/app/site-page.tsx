"use client";

import { FormEvent, ReactNode, useMemo, useState } from "react";
import {
  articleRoute,
  articleRoutes,
  copies,
  guideRoutes,
  isStaticRouteKey,
  languages,
  Locale,
  RouteKey,
  routeHref,
  StaticRouteKey,
} from "./site-content";
import { additionalArticles, additionalArticleRoutes } from "./site-articles";
import { priorityCategoryEditorial } from "./site-category-editorial";
import { catalogCopies } from "./site-catalog-copy";
import {
  categoryDestinations,
  categoryFromRoute,
  CategoryKey,
  categoryOrder,
  categoryRoute,
  featuredProducts,
  Product,
  productFromRoute,
  productImageSize,
  productRoute,
  products,
  productsForCategory,
} from "./site-products";

const CNY_TO_USD = 0.1481;
const SITE_URL = "https://kameymall-sheet.com";

type AnalyticsParameters = Record<string, string | number | boolean>;

function trackAnalyticsEvent(eventName: string, parameters: AnalyticsParameters) {
  const analyticsWindow = window as Window & {
    gtag?: (command: "event", name: string, params: AnalyticsParameters) => void;
  };
  analyticsWindow.gtag?.("event", eventName, {
    ...parameters,
    transport_type: "beacon",
  });
}

function trackProductClick(product: Product, locale: Locale, placement: string) {
  trackAnalyticsEvent("product_click", {
    item_id: `KMS-${product.reference}`,
    item_name: product.name,
    item_category: product.categoryKey,
    language: locale,
    link_domain: "cnbuycha.com",
    link_url: product.url,
    outbound: true,
    placement,
    source_page: window.location.pathname,
  });
}

function trackCategoryClick(category: CategoryKey, locale: Locale, placement: string) {
  trackAnalyticsEvent("category_click", {
    category,
    language: locale,
    link_domain: "cnbuycha.com",
    link_url: categoryDestinations[category],
    outbound: true,
    placement,
    source_page: window.location.pathname,
  });
}

function trackMainSiteBrowseClick(locale: Locale, placement: string) {
  trackAnalyticsEvent("main_site_browse_click", {
    language: locale,
    link_domain: "cnbuycha.com",
    link_url: "https://cnbuycha.com/AllProducts/",
    outbound: true,
    placement,
    source_page: window.location.pathname,
  });
}

function usd(cny: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cny * CNY_TO_USD);
}

function cny(cnyValue: number, locale: Locale) {
  return `¥${new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(cnyValue)}`;
}

function checkedDate(value: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeZone: "UTC" }).format(new Date(`${value}T00:00:00Z`));
}

function ArrowIcon({ external = false }: { external?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {external ? (
        <>
          <path d="M14 5h5v5" />
          <path d="m10 14 9-9" />
          <path d="M19 13v6H5V5h6" />
        </>
      ) : (
        <>
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </>
      )}
    </svg>
  );
}

function ProductImage({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { width, height } = productImageSize(product);
  return (
    <img
      src={product.image}
      alt={product.name}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
    />
  );
}

function Header({ locale, route }: { locale: Locale; route: RouteKey }) {
  const copy = copies[locale];
  const navItems: Array<[RouteKey, string]> = [
    ["finds", copy.nav.finds],
    ["categories", copy.nav.categories],
    ["how-to-buy", copy.nav.how],
    ["guides", copy.nav.guides],
    ["articles", copy.nav.articles],
    ["faq", copy.nav.faq],
  ];
  return (
    <header className="site-header">
      <a className="brand" href={routeHref(locale, "home")} aria-label="KameyMall Sheet home">
        <img src="/kameymall-logo.png" alt="KameyMall" width={366} height={68} decoding="async" fetchPriority="high" />
        <span>Sheet</span>
      </a>
      <div className="header-actions">
        <nav aria-label="Primary navigation">
          {navItems.map(([href, label]) => (
            <a
              key={href}
              href={routeHref(locale, href)}
              aria-current={route === href || route.startsWith(`${href}/`) || (href === "finds" && route.startsWith("products/")) ? "page" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
        <details className="language-menu">
          <summary aria-label={copy.language}>
            {languages.find((item) => item.code === locale)?.short}
            <span aria-hidden="true">⌄</span>
          </summary>
          <div className="language-popover">
            <span>{copy.language}</span>
            {languages.map((language) => (
              <a
                key={language.code}
                href={routeHref(language.code, route)}
                hrefLang={language.code}
                lang={language.code}
                aria-current={language.code === locale ? "true" : undefined}
              >
                <b>{language.short}</b> {language.label}
              </a>
            ))}
          </div>
        </details>
      </div>
    </header>
  );
}

function Footer({ locale }: { locale: Locale }) {
  const copy = copies[locale];
  const links: Array<[RouteKey, string]> = [
    ["finds", copy.nav.finds],
    ["categories", copy.nav.categories],
    ["how-to-buy", copy.nav.how],
    ["guides", copy.nav.guides],
    ["articles", copy.nav.articles],
    ["faq", copy.nav.faq],
  ];
  return (
    <footer>
      <div className="footer-brand">
        <img src="/kameymall-logo.png" alt="KameyMall" width={366} height={68} loading="lazy" decoding="async" />
        <strong>Sheet</strong>
      </div>
      <p>{copy.footer.notice}</p>
      <div className="footer-links">
        {links.map(([href, label]) => (
          <a key={href} href={routeHref(locale, href)}>{label}</a>
        ))}
      </div>
      <small>{copy.footer.copyright}</small>
    </footer>
  );
}

function MainSearch({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const copy = copies[locale];
  function submitMainSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const keyword = String(form.get("q") ?? "").trim();
    trackAnalyticsEvent("main_search_submit", {
      language: locale,
      link_domain: "cnbuycha.com",
      outbound: true,
      search_term: keyword,
      source_page: window.location.pathname,
    });
    if (!keyword) {
      window.location.assign("https://cnbuycha.com/AllProducts/");
      return;
    }
    const query = new URLSearchParams({ q: keyword });
    window.location.assign(`https://cnbuycha.com/AllProducts/?${query.toString()}`);
  }
  return (
    <form
      action="https://cnbuycha.com/AllProducts/"
      className={`hero-search${compact ? " search-compact" : ""}`}
      method="get"
      onSubmit={submitMainSearch}
    >
      <label className="sr-only" htmlFor={compact ? "route-search" : "main-search"}>{copy.home.searchLabel}</label>
      <input
        id={compact ? "route-search" : "main-search"}
        name="q"
        placeholder={copy.home.searchPlaceholder}
        type="search"
      />
      <button aria-label={copy.home.searchLabel} type="submit"><span className="search-glyph" /></button>
    </form>
  );
}

function FindBrowser({ locale, featured = false }: { locale: Locale; featured?: boolean }) {
  const copy = copies[locale];
  const [tableQuery, setTableQuery] = useState("");
  const [category, setCategory] = useState("all");
  const sourceProducts = featured ? featuredProducts : products;
  const filteredProducts = useMemo(() => {
    const query = tableQuery.trim().toLowerCase();
    return sourceProducts.filter((product) => {
      const label = copy.categories.items[product.categoryKey].label;
      const matchesQuery = !query || product.name.toLowerCase().includes(query) || label.toLowerCase().includes(query) || product.reference.includes(query);
      return matchesQuery && (category === "all" || product.categoryKey === category);
    });
  }, [category, copy.categories.items, sourceProducts, tableQuery]);
  const availableCategories = categoryOrder.filter((key) => sourceProducts.some((product) => product.categoryKey === key));

  return (
    <section className="find-browser" aria-label={copy.finder.kicker}>
      <div className="browser-heading">
        <span className="live-dot" />
        <h2>{copy.finder.kicker}</h2>
        <span className="browser-updated">{copy.finder.verified.replace("30", String(sourceProducts.length))}</span>
      </div>
      <div className="browser-toolbar">
        <label className="table-search">
          <span className="search-glyph" aria-hidden="true" />
          <span className="sr-only">{copy.finder.filterPlaceholder}</span>
          <input value={tableQuery} onChange={(event) => setTableQuery(event.target.value)} placeholder={copy.finder.filterPlaceholder} type="search" />
        </label>
        <label className="select-wrap">
          <span className="sr-only">{copy.finder.category}</span>
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value="all">{copy.finder.allCategories}</option>
            {availableCategories.map((key) => (
              <option key={key} value={key}>{copy.categories.items[key].label}</option>
            ))}
          </select>
        </label>
        <div className="listed-filter" aria-label={copy.finder.status}>{copy.finder.allListed}</div>
        <button className="clear-filter" type="button" onClick={() => { setTableQuery(""); setCategory("all"); }}>{copy.finder.clear}</button>
      </div>
      <div className="table-scroll">
        <div className="product-table" role="table" aria-label={copy.finder.kicker}>
          <div className="table-header" role="row">
            <span role="columnheader">{copy.finder.item}</span>
            <span role="columnheader">{copy.finder.category}</span>
            <span role="columnheader">{copy.finder.price}</span>
            <span role="columnheader">{copy.finder.status}</span>
            <span role="columnheader">{copy.finder.open}</span>
          </div>
          <div className="table-body">
            {filteredProducts.length ? filteredProducts.map((product, index) => (
              <div className="product-row" role="row" key={product.reference}>
                <div className="item-cell" role="cell">
                  <a href={product.url} aria-label={`${copy.finder.open} ${product.name}`} onClick={() => trackProductClick(product, locale, "find_table_image")}><ProductImage product={product} priority={index === 0} /></a>
                  <div>
                    <a className="product-name" href={product.url} onClick={() => trackProductClick(product, locale, "find_table_name")}>{product.name}</a>
                    <span>{copy.finder.original} · ¥{product.cny}</span>
                    <code>KMS-{product.reference}</code>
                  </div>
                </div>
                <a className="category-cell" role="cell" href={routeHref(locale, categoryRoute(product.categoryKey))}>{copy.categories.items[product.categoryKey].label}</a>
                <div className="price-cell" role="cell"><strong>{usd(product.cny)}</strong><small>{copy.finder.approximate}</small></div>
                <div className="status-cell" role="cell"><span /> {copy.finder.listed}</div>
                <div className="open-cell" role="cell">
                  <a className="open-pill" href={product.url} onClick={() => trackProductClick(product, locale, "find_table_button")}>{copy.finder.open}</a>
                  <a className="external-link" href={product.url} aria-label={`${copy.finder.open} ${product.name}`} onClick={() => trackProductClick(product, locale, "find_table_icon")}><ArrowIcon external /></a>
                </div>
              </div>
            )) : <p className="empty-state">{copy.finder.noMatches}</p>}
          </div>
        </div>
      </div>
      <p className="rate-note">{copy.finder.rateNote}</p>
    </section>
  );
}

function HomeHero({ locale }: { locale: Locale }) {
  const copy = copies[locale];
  const chips = ["shoes", "jersey", "sweatshirts", "headwear", "electronics"] as const;
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow"><span className="live-dot" />{copy.home.eyebrow}</p>
        <h1>{copy.home.title}</h1>
        <p className="hero-lede">{copy.home.lede}</p>
        <MainSearch locale={locale} />
        <div className="hero-actions">
          <a className="button button-primary" href={routeHref(locale, "finds")}>{copy.home.explore} <ArrowIcon /></a>
          <a className="button button-secondary" href={routeHref(locale, "how-to-buy")}>{copy.home.howAction} <span aria-hidden="true">▶</span></a>
        </div>
        <div className="proof-row" aria-label="Database highlights">
          <article><span className="proof-icon" aria-hidden="true">10</span><div><strong>10</strong><small>{copy.home.categoriesCount}</small></div></article>
          <article><span className="proof-icon" aria-hidden="true">30</span><div><strong>30</strong><small>{copy.home.findsCount}</small></div></article>
          <article><span className="proof-icon" aria-hidden="true">↗</span><div><strong>{copy.home.direct}</strong><small>{copy.home.listingPages}</small></div></article>
        </div>
        <div className="category-chips">
          {chips.map((key) => <a key={key} href={categoryDestinations[key]} onClick={() => trackCategoryClick(key, locale, "home_category_chip")}>{copy.categories.items[key].label}</a>)}
        </div>
      </div>
      <FindBrowser locale={locale} featured />
    </section>
  );
}

function SectionHeading({ kicker, title, intro }: { kicker: string; title: string; intro: string }) {
  return (
    <div className="section-heading">
      <div><p className="section-kicker">{kicker}</p><h2>{title}</h2></div>
      <p>{intro}</p>
    </div>
  );
}

function CategoriesSection({ locale, directToMainSite = false }: { locale: Locale; directToMainSite?: boolean }) {
  const copy = copies[locale];
  return (
    <section className="category-section page-section">
      <SectionHeading kicker={copy.categories.kicker} title={copy.categories.title} intro={copy.categories.intro} />
      <div className="category-grid">
        {categoryOrder.map((key, index) => (
          <a
            className="category-card"
            href={directToMainSite ? categoryDestinations[key] : routeHref(locale, categoryRoute(key))}
            key={key}
            onClick={directToMainSite ? () => trackCategoryClick(key, locale, "home_category_card") : undefined}
          >
            <span className="category-number">{String(index + 1).padStart(2, "0")}</span>
            <h3>{copy.categories.items[key].label}</h3>
            <p>{copy.categories.items[key].description}</p>
            <span className="card-link">{copy.categories.open} <ArrowIcon /></span>
          </a>
        ))}
      </div>
    </section>
  );
}

function HowSection({ locale }: { locale: Locale }) {
  const copy = copies[locale];
  return (
    <section className="how-section page-section">
      <div className="how-intro">
        <p className="section-kicker">{copy.how.kicker}</p>
        <h2>{copy.how.title}</h2>
        <p>{copy.how.intro}</p>
        <a className="button button-primary" href="https://cnbuycha.com/AllProducts/" onClick={() => trackMainSiteBrowseClick(locale, "buying_workflow")}>{copy.how.action} <ArrowIcon external /></a>
      </div>
      <ol className="step-list">
        {copy.how.steps.map((step, index) => (
          <li key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{step.title}</h3><p>{step.body}</p></div></li>
        ))}
      </ol>
    </section>
  );
}

function GuidesSection({ locale }: { locale: Locale }) {
  const copy = copies[locale];
  return (
    <section className="guides-section page-section">
      <SectionHeading kicker={copy.guides.kicker} title={copy.guides.title} intro={copy.guides.intro} />
      <div className="guide-grid">
        {copy.guides.cards.map((card, index) => (
          <article className={`guide-card${index === 0 ? " guide-featured" : ""}`} key={card.title}>
            <span className="guide-label">{card.label}</span>
            <h3>{card.title}</h3>
            <p>{card.body}</p>
            <a href={routeHref(locale, guideRoutes[index])}>{card.action} <ArrowIcon /></a>
          </article>
        ))}
      </div>
    </section>
  );
}

function ArticlesSection({ locale }: { locale: Locale }) {
  const copy = copies[locale];
  const targets: RouteKey[] = articleRoutes;
  return (
    <section className="articles-section page-section">
      <SectionHeading kicker={copy.articles.kicker} title={copy.articles.title} intro={copy.articles.intro} />
      <div className="article-card-grid">
        {copy.articles.cards.map((card, index) => (
          <article className="article-card" key={card.title}>
            <div className="article-card-top"><span>{card.label}</span><span>0{index + 1}</span></div>
            <h3>{card.title}</h3>
            <p>{card.body}</p>
            <a href={routeHref(locale, targets[index])}>{card.action} <ArrowIcon /></a>
          </article>
        ))}
      </div>
    </section>
  );
}

function FaqSection({ locale }: { locale: Locale }) {
  const copy = copies[locale];
  return (
    <section className="faq-section page-section">
      <div className="faq-intro"><p className="section-kicker">{copy.faq.kicker}</p><h2>{copy.faq.title}</h2><p>{copy.faq.intro}</p></div>
      <div className="faq-list">
        {copy.faq.items.map((faq) => (
          <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>
        ))}
      </div>
    </section>
  );
}

function Breadcrumbs({ locale, items }: { locale: Locale; items: Array<{ label: string; route?: RouteKey }> }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`}>
            {item.route ? <a href={routeHref(locale, item.route)}>{item.label}</a> : <span aria-current="page">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function ProductCard({ locale, product }: { locale: Locale; product: Product }) {
  const copy = copies[locale];
  const catalog = catalogCopies[locale];
  return (
    <article className="catalog-product-card">
      <a className="catalog-product-image" href={product.url} aria-label={`${catalog.openLiveListing}: ${product.name}`} onClick={() => trackProductClick(product, locale, "catalog_card_image")}>
        <ProductImage product={product} />
      </a>
      <div className="catalog-product-body">
        <a className="catalog-product-category" href={routeHref(locale, categoryRoute(product.categoryKey))}>{copy.categories.items[product.categoryKey].label}</a>
        <h2><a href={product.url} onClick={() => trackProductClick(product, locale, "catalog_card_name")}>{product.name}</a></h2>
        <div className="catalog-product-meta"><strong>{usd(product.cny)}</strong><span>{cny(product.cny, locale)}</span></div>
        <code>KMS-{product.reference}</code>
        <a className="catalog-product-link" href={product.url} onClick={() => trackProductClick(product, locale, "catalog_card_button")}>{catalog.openLiveListing} <ArrowIcon external /></a>
      </div>
    </article>
  );
}

function CategoryCatalogPage({ locale, category }: { locale: Locale; category: CategoryKey }) {
  const copy = copies[locale];
  const catalog = catalogCopies[locale];
  const categoryLabel = copy.categories.items[category].label;
  const categoryProducts = productsForCategory(category);
  const editorial = priorityCategoryEditorial[locale][category];
  return (
    <>
      <section className="catalog-hero">
        <Breadcrumbs locale={locale} items={[
          { label: catalog.home, route: "home" },
          { label: catalog.allCategories, route: "categories" },
          { label: categoryLabel },
        ]} />
        <div className="catalog-hero-layout">
          <div>
            <p className="section-kicker">{catalog.categoryKicker}</p>
            <h1>{editorial?.heading ?? catalog.categoryHeading.replace("{category}", categoryLabel)}</h1>
            <p>{editorial?.intro ?? `${copy.categories.items[category].description} ${catalog.categoryIntro}`}</p>
          </div>
          <div className="catalog-hero-actions">
            <span><strong>{categoryProducts.length}</strong> {catalog.productsFound}</span>
            <a className="button button-secondary" href={categoryDestinations[category]} onClick={() => trackCategoryClick(category, locale, "category_page_button")}>{catalog.openLiveCategory} <ArrowIcon external /></a>
          </div>
        </div>
      </section>
      <section className="catalog-list page-section" aria-label={`${categoryLabel} ${catalog.productsFound}`}>
        <div className="catalog-grid">
          {categoryProducts.map((product) => <ProductCard key={product.slug} locale={locale} product={product} />)}
        </div>
        {editorial ? (
          <section className="category-editorial" aria-labelledby={`category-editorial-${category}`}>
            <div className="category-editorial-copy">
              <p className="section-kicker">{copy.categories.items[category].label}</p>
              <h2 id={`category-editorial-${category}`}>{editorial.detailTitle}</h2>
              {editorial.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div className="category-editorial-checks">
              <ol>
                {editorial.checks.map((check, index) => (
                  <li key={check}><span>{String(index + 1).padStart(2, "0")}</span><p>{check}</p></li>
                ))}
              </ol>
              <h3>{editorial.relatedTitle}</h3>
              <div className="category-editorial-links">
                {editorial.related.map((link) => <a key={link.route} href={routeHref(locale, link.route)}>{link.label} <ArrowIcon /></a>)}
              </div>
            </div>
          </section>
        ) : null}
        <a className="catalog-back-link" href={routeHref(locale, "categories")}>← {catalog.allCategories}</a>
      </section>
    </>
  );
}

function ProductDetailPage({ locale, product }: { locale: Locale; product: Product }) {
  const copy = copies[locale];
  const catalog = catalogCopies[locale];
  const categoryLabel = copy.categories.items[product.categoryKey].label;
  const related = productsForCategory(product.categoryKey).filter((item) => item.slug !== product.slug);
  return (
    <article className="product-page">
      <div className="product-page-inner">
        <Breadcrumbs locale={locale} items={[
          { label: catalog.home, route: "home" },
          { label: catalog.finds, route: "finds" },
          { label: categoryLabel, route: categoryRoute(product.categoryKey) },
          { label: product.name },
        ]} />
        <div className="product-detail">
          <figure className="product-visual"><a href={product.url} aria-label={`${catalog.openLiveListing}: ${product.name}`} onClick={() => trackProductClick(product, locale, "product_detail_image")}><ProductImage product={product} priority /></a></figure>
          <div className="product-summary">
            <p className="section-kicker">{catalog.productKicker}</p>
            <h1>{product.name}</h1>
            <a className="product-category-link" href={routeHref(locale, categoryRoute(product.categoryKey))}>{categoryLabel}</a>
            <div className="product-price">
              <span>{catalog.referencePrice}</span>
              <strong>{usd(product.cny)}</strong>
              <small>{cny(product.cny, locale)}</small>
            </div>
            <p className="price-note">{catalog.priceNote}</p>
            <div className="product-cta-row">
              <a className="button button-primary" href={product.url} onClick={() => trackProductClick(product, locale, "product_detail_button")}>{catalog.openLiveListing} <ArrowIcon external /></a>
              <a className="button button-secondary" href={routeHref(locale, "finds")}>← {catalog.backToFinds}</a>
            </div>
          </div>
        </div>

        <section className="verified-facts">
          <div className="section-heading compact-heading">
            <div><p className="section-kicker">KMS-{product.reference}</p><h2>{catalog.verifiedFacts}</h2></div>
          </div>
          <dl className="fact-grid">
            <div><dt>{catalog.sourceTitle}</dt><dd>{product.sourceName ?? product.name}</dd></div>
            <div><dt>{catalog.productReference}</dt><dd>{product.reference}</dd></div>
            <div><dt>{catalog.cnyPrice}</dt><dd>{cny(product.cny, locale)}</dd></div>
            <div><dt>{catalog.usdPrice}</dt><dd>{usd(product.cny)}</dd></div>
            <div><dt>{catalog.category}</dt><dd><a href={routeHref(locale, categoryRoute(product.categoryKey))}>{categoryLabel}</a></dd></div>
            <div><dt>{catalog.lastChecked}</dt><dd><time dateTime={product.lastChecked}>{checkedDate(product.lastChecked, locale)}</time></dd></div>
          </dl>
        </section>

        <section className="buying-checklist">
          <div><p className="section-kicker">{catalog.productKicker}</p><h2>{catalog.buyingChecklist}</h2></div>
          <ol>{catalog.checklist.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></li>)}</ol>
        </section>
        <p className="accuracy-note">{catalog.accuracyNote}</p>

        <section className="related-section">
          <div className="related-heading"><h2>{catalog.relatedProducts}</h2><a href={routeHref(locale, categoryRoute(product.categoryKey))}>{catalog.backToCategory} <ArrowIcon /></a></div>
          <div className="catalog-grid related-grid">{related.map((item) => <ProductCard key={item.slug} locale={locale} product={item} />)}</div>
        </section>
      </div>
    </article>
  );
}

function InnerHero({ locale, route, children }: { locale: Locale; route: Exclude<StaticRouteKey, "home">; children?: ReactNode }) {
  const copy = copies[locale];
  const intro = copy.pageIntros[route];
  return (
    <section className="inner-hero">
      <div>
        <p className="section-kicker">{intro.kicker}</p>
        <h1>{intro.title}</h1>
        <p>{intro.intro}</p>
      </div>
      {children}
    </section>
  );
}

function ProsePage({ locale, route, article = false }: { locale: Locale; route: StaticRouteKey; article?: boolean }) {
  const copy = copies[locale];
  if (article) {
    const page = route === articleRoute
      ? copy.articlePage
      : additionalArticles[locale][route as (typeof additionalArticleRoutes)[number]];
    return (
      <>
        <InnerHero locale={locale} route={route as Exclude<StaticRouteKey, "home">}>
          <div className="article-meta"><span>{page.updated}</span><span>{page.readTime}</span></div>
        </InnerHero>
        <article className="prose-layout">
          <aside>
            <a href={routeHref(locale, "articles")}>← {copy.common.backToArticles}</a>
            <p>{copy.common.verifyNote}</p>
            <a className="button button-primary" href="https://cnbuycha.com/AllProducts/" onClick={() => trackMainSiteBrowseClick(locale, "article_sidebar")}>{copy.common.openProducts} <ArrowIcon external /></a>
          </aside>
          <div className="prose-body">
            <p className="prose-lede">{page.intro}</p>
            {page.sourceNote ? <p className="fact-note">{page.sourceNote}</p> : null}
            {page.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets ? <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}
              </section>
            ))}
            <section className="takeaway"><h2>{page.conclusionTitle}</h2><p>{page.conclusion}</p></section>
          </div>
        </article>
      </>
    );
  }
  const page = copy.guidePages[route];
  return (
    <>
      <InnerHero locale={locale} route={route as Exclude<StaticRouteKey, "home">} />
      <article className="prose-layout">
        <aside>
          <a href={routeHref(locale, "guides")}>← {copy.common.backToGuides}</a>
          <p>{copy.common.verifyNote}</p>
          <a className="button button-primary" href="https://cnbuycha.com/AllProducts/" onClick={() => trackMainSiteBrowseClick(locale, "guide_sidebar")}>{copy.common.openProducts} <ArrowIcon external /></a>
        </aside>
        <div className="prose-body">
          <p className="prose-lede">{page.intro}</p>
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets ? <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}
            </section>
          ))}
        </div>
      </article>
    </>
  );
}

function RouteContent({ locale, route }: { locale: Locale; route: RouteKey }) {
  const copy = copies[locale];
  const product = productFromRoute(route);
  const category = categoryFromRoute(route);
  if (product) return <ProductDetailPage locale={locale} product={product} />;
  if (category) return <CategoryCatalogPage locale={locale} category={category} />;
  const staticRoute = route as StaticRouteKey;
  if (route === "home") return <><HomeHero locale={locale} /><CategoriesSection locale={locale} directToMainSite /><HowSection locale={locale} /><GuidesSection locale={locale} /><ArticlesSection locale={locale} /><FaqSection locale={locale} /></>;
  if (route === "finds") return <><InnerHero locale={locale} route={staticRoute as Exclude<StaticRouteKey, "home">}><MainSearch locale={locale} compact /></InnerHero><section className="standalone-browser page-section"><FindBrowser locale={locale} /></section><div className="verification-band">{copy.common.verifyNote}</div></>;
  if (route === "categories") return <><InnerHero locale={locale} route={staticRoute as Exclude<StaticRouteKey, "home">} /><CategoriesSection locale={locale} /></>;
  if (route === "how-to-buy") return <><InnerHero locale={locale} route={staticRoute as Exclude<StaticRouteKey, "home">} /><HowSection locale={locale} /><GuidesSection locale={locale} /></>;
  if (route === "guides") return <><InnerHero locale={locale} route={staticRoute as Exclude<StaticRouteKey, "home">} /><GuidesSection locale={locale} /></>;
  if (route === "faq") return <><InnerHero locale={locale} route={staticRoute as Exclude<StaticRouteKey, "home">} /><FaqSection locale={locale} /></>;
  if (route === "articles") return <><InnerHero locale={locale} route={staticRoute as Exclude<StaticRouteKey, "home">} /><ArticlesSection locale={locale} /></>;
  if (articleRoutes.includes(staticRoute)) return <ProsePage locale={locale} route={staticRoute} article />;
  return <ProsePage locale={locale} route={staticRoute} />;
}

export default function SitePage({ locale, route }: { locale: Locale; route: RouteKey }) {
  const copy = copies[locale];
  const product = productFromRoute(route);
  const category = categoryFromRoute(route);
  const isArticle = isStaticRouteKey(route) && articleRoutes.includes(route);
  const articlePage = isArticle
    ? route === articleRoute
      ? copy.articlePage
      : additionalArticles[locale][route as (typeof additionalArticleRoutes)[number]]
    : null;
  const canonicalPath = routeHref(locale, route);
  const canonical = `https://kameymall-sheet.com${canonicalPath === "/" ? "" : canonicalPath}`;
  const categoryLabel = category ? copy.categories.items[category].label : product ? copy.categories.items[product.categoryKey].label : null;
  const pageIntro = isStaticRouteKey(route) && route !== "home" ? copy.pageIntros[route] : null;
  const breadcrumbItems = product
    ? [
        [catalogCopies[locale].home, routeHref(locale, "home")],
        [catalogCopies[locale].finds, routeHref(locale, "finds")],
        [copy.categories.items[product.categoryKey].label, routeHref(locale, categoryRoute(product.categoryKey))],
        [product.name, routeHref(locale, route)],
      ]
    : category
      ? [
          [catalogCopies[locale].home, routeHref(locale, "home")],
          [catalogCopies[locale].allCategories, routeHref(locale, "categories")],
          [copy.categories.items[category].label, routeHref(locale, route)],
        ]
      : isArticle && articlePage
        ? [
            [catalogCopies[locale].home, routeHref(locale, "home")],
            [copy.nav.articles, routeHref(locale, "articles")],
            [articlePage.title, routeHref(locale, route)],
          ]
        : [];
  const breadcrumbSchema = breadcrumbItems.length ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map(([name, path], index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: `https://kameymall-sheet.com${path === "/" ? "" : path}`,
    })),
  } : null;
  const structuredData = product
    ? [
        {
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          image: [`${SITE_URL}${product.image}`],
          sku: `KMS-${product.reference}`,
          category: categoryLabel,
          url: canonical,
          offers: { "@type": "Offer", url: product.url, priceCurrency: "CNY", price: product.cny },
        },
        breadcrumbSchema,
      ]
    : category
      ? [
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: priorityCategoryEditorial[locale][category]?.heading ?? catalogCopies[locale].categoryHeading.replace("{category}", categoryLabel ?? ""),
            url: canonical,
            inLanguage: locale,
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: productsForCategory(category).length,
              itemListElement: productsForCategory(category).map((item, index) => ({
                "@type": "ListItem",
                position: index + 1,
                url: `https://kameymall-sheet.com${routeHref(locale, productRoute(item.slug))}`,
                name: item.name,
              })),
            },
          },
          breadcrumbSchema,
        ]
      : route === "finds"
        ? {
            "@context": "https://schema.org",
            "@type": "ItemList",
            numberOfItems: products.length,
            itemListElement: products.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `https://kameymall-sheet.com${routeHref(locale, productRoute(item.slug))}`,
              name: item.name,
            })),
          }
        : route === "faq"
          ? {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              name: pageIntro?.title,
              description: pageIntro?.intro,
              url: canonical,
              inLanguage: locale,
              mainEntity: copy.faq.items.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            }
        : isArticle && articlePage
          ? [
              {
                "@context": "https://schema.org",
                "@type": "Article",
                headline: articlePage.title,
                description: articlePage.intro,
                datePublished: "2026-08-03",
                dateModified: "2026-08-03",
                mainEntityOfPage: canonical,
                url: canonical,
                inLanguage: locale,
                keywords: articlePage.primaryKeyword,
                author: { "@type": "Organization", name: "KameyMall Sheet" },
                publisher: { "@type": "Organization", name: "KameyMall Sheet" },
              },
              breadcrumbSchema,
            ]
        : {
            "@context": "https://schema.org",
            "@type": route === "home" ? "WebSite" : "WebPage",
            name: route === "home" ? "KameyMall Sheet" : pageIntro?.title,
            description: route === "home" ? copy.home.lede : pageIntro?.intro,
            url: canonical,
            inLanguage: locale,
          };
  return (
    <main lang={locale} data-route={route}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header locale={locale} route={route} />
      <RouteContent locale={locale} route={route} />
      <Footer locale={locale} />
    </main>
  );
}
