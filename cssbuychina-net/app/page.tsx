"use client";

import { FormEvent, useMemo, useState } from "react";
import { trackAnalyticsEvent } from "./components/AnalyticsEvents";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { localizedCategories, localeCopy, localePrefix, SiteLocale } from "./i18n";
import { categories, products } from "./site-data";

const STORE_SEARCH = "https://cnbuycha.com/AllProducts/?q=";

const languageTags: Record<SiteLocale, string> = { en: "en", "pt-br": "pt-BR", de: "de-DE", es: "es" };

function buildHomeJsonLd(locale: SiteLocale) {
  const copy = localeCopy[locale];
  const prefix = localePrefix(locale);
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${copy.hero.title} ${copy.hero.emphasis}`,
    description: copy.hero.lede,
    url: `https://cssbuychina.net${prefix || "/"}`,
    inLanguage: languageTags[locale],
    isPartOf: { "@type": "WebSite", name: "CSSBuy China", url: "https://cssbuychina.net/" },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: product.name,
        url: `https://cssbuychina.net/product/${product.id}`,
      })),
    },
  };
}

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

function SearchBox({ compact = false, locale = "en" }: { compact?: boolean; locale?: SiteLocale }) {
  const [query, setQuery] = useState("");
  const copy = localeCopy[locale];

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = query.trim();
    if (!value) return;
    trackAnalyticsEvent("store_search_submit", {
      search_location: compact ? "footer" : "hero",
      query_length: value.length,
      site_locale: locale,
    });
    window.location.href = `${STORE_SEARCH}${encodeURIComponent(value)}`;
  }

  return (
    <form className={`search-box ${compact ? "search-box--compact" : ""}`} onSubmit={submit}>
      <label className="sr-only" htmlFor={compact ? "nav-search" : "hero-search"}>
        {copy.searchLabel}
      </label>
      <span className="search-icon" aria-hidden="true">⌕</span>
      <input
        id={compact ? "nav-search" : "hero-search"}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={compact ? copy.nav.all : copy.hero.placeholder}
        autoComplete="off"
      />
      <button type="submit">{copy.hero.search} <ArrowIcon /></button>
    </form>
  );
}

export function HomeView({ locale = "en" }: { locale?: SiteLocale }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [menuOpen, setMenuOpen] = useState(false);
  const copy = localeCopy[locale];
  const prefix = localePrefix(locale);
  const categoryCopy = localizedCategories[locale];

  const visibleProducts = useMemo(
    () => products.filter((product) => activeCategory === "all" || product.category === activeCategory).slice(0, 8),
    [activeCategory],
  );

  function selectCategory(category: string) {
    setActiveCategory(category);
    trackAnalyticsEvent("product_filter_use", {
      filter_category: category,
      filter_location: "homepage",
      site_locale: locale,
    });
  }

  return (
    <main className="home-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildHomeJsonLd(locale)) }} />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="CSSBuy China home">
          <img className="brand-logo" src="/cssbuy-logo.png" alt="CSSBuy" />
          <span className="brand-tagline">{copy.brandTagline}</span>
        </a>
        <nav className={menuOpen ? "nav-links nav-links--open" : "nav-links"} aria-label="Main navigation">
          <a href={`${prefix}/products`}>{copy.nav.all}</a>
          <a href={`${prefix}/categories`}>{copy.nav.categories}</a>
          <a href={`${prefix}/how-it-works`}>{copy.nav.how}</a>
          <a href={`${prefix}/guides`}>{copy.nav.guides}</a>
          <a href={`${prefix}/articles`}>{copy.nav.articles}</a>
          <a href={`${prefix}/faq`}>{copy.nav.faq}</a>
        </nav>
        <div className="header-actions">
          <LanguageSwitcher locale={locale} />
          <a className="header-cta" href={`${prefix}/products`}>{copy.nav.browse} <ArrowIcon /></a>
          <button
            className="menu-button"
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-wordmark" aria-hidden="true">FIND / EDIT</div>
        <div className="hero-content">
          <p className="eyebrow"><span /> {copy.hero.eyebrow}</p>
          <h1>{copy.hero.title} <em>{copy.hero.emphasis}</em></h1>
          <p className="hero-lede">
            {copy.hero.lede}
          </p>
          <SearchBox locale={locale} />
          <div className="quick-searches" aria-label={copy.hero.popular}>
            <span>{copy.hero.popular}</span>
            {copy.hero.terms.map((term) => (
              <a
                key={term}
                href={`${STORE_SEARCH}${encodeURIComponent(term)}`}
                data-track-event="store_search_submit"
                data-search-location="popular-term"
                data-click-area="quick-search"
              >{term}</a>
            ))}
          </div>
          <div className="hero-notes">
            <div><strong>08</strong><span>{copy.hero.stats[0]}</span></div>
            <div><strong>{products.length}</strong><span>{copy.hero.stats[1]}</span></div>
            <div><strong>{products[0].checked}</strong><span>{copy.hero.stats[2]}</span></div>
          </div>
        </div>

        <aside className="hero-collage" aria-label="A preview of recently checked product finds">
          <a className="collage-card collage-card--main" href={products[0].storeUrl} rel="nofollow" data-track-event="product_outbound_click" data-item-id={products[0].id} data-item-name={products[0].name} data-item-category={products[0].category} data-click-area="hero-collage-main">
            <img src={products[0].image} alt={products[0].name} fetchPriority="high" />
            <span><b>01</b>{products[0].name}</span>
          </a>
          <a className="collage-card collage-card--top" href={products[3].storeUrl} rel="nofollow" data-track-event="product_outbound_click" data-item-id={products[3].id} data-item-name={products[3].name} data-item-category={products[3].category} data-click-area="hero-collage-top">
            <img src={products[3].image} alt={products[3].name} fetchPriority="high" />
            <span><b>02</b>{copy.collage.second}</span>
          </a>
          <a className="collage-card collage-card--bottom" href={products[9].storeUrl} rel="nofollow" data-track-event="product_outbound_click" data-item-id={products[9].id} data-item-name={products[9].name} data-item-category={products[9].category} data-click-area="hero-collage-bottom">
            <img src={products[9].image} alt={products[9].name} />
            <span><b>03</b>{copy.collage.third}</span>
          </a>
          <div className="collage-stamp" aria-hidden="true"><span>{copy.collage.top}</span><b>08</b><span>{copy.collage.bottom}</span></div>
          <div className="collage-note"><span>{copy.collage.noteLabel}</span><b>{copy.collage.note}</b></div>
        </aside>
      </section>

      <div className="trust-strip" aria-label="Important information">
        {copy.trust.map((item) => <span key={item}>{item}</span>)}
      </div>

      <section className="section categories-section" id="categories">
        <div className="section-heading">
          <div>
            <p className="eyebrow dark"><span /> {copy.categories.eyebrow}</p>
            <h2>{copy.categories.title}</h2>
          </div>
          <p>{copy.categories.description}</p>
        </div>
        <div className="category-grid">
          {categories.map((category, index) => (
            <a className={`category-card tone-${(index % 4) + 1}`} href={category.storeUrl} rel="nofollow" key={category.slug} data-track-event="category_outbound_click" data-item-category={category.slug} data-click-area="homepage-category-card">
              <span className="category-number">0{index + 1}</span>
              <span className="category-symbol" aria-hidden="true">{category.symbol}</span>
              <span className="category-text">
                <b>{categoryCopy[category.slug].name}</b>
                <small>{categoryCopy[category.slug].searchLabel}</small>
              </span>
              <ArrowIcon />
            </a>
          ))}
        </div>
        <div className="category-index-links">
          <span>{copy.categories.seo}</span>
          {categories.map((category) => <a href={`/category/${category.slug}`} key={category.slug}>{categoryCopy[category.slug].name}</a>)}
        </div>
      </section>

      <section className="section finds-section" id="finds">
        <div className="section-heading finds-heading">
          <div>
            <p className="eyebrow dark"><span /> {copy.finds.eyebrow}</p>
            <h2>{copy.finds.title}</h2>
          </div>
          <a className="text-link" href={`${prefix}/products`}>{copy.finds.viewAll} <ArrowIcon /></a>
        </div>

        <div className="filter-row" role="group" aria-label="Filter products by category">
          <button className={activeCategory === "all" ? "active" : ""} onClick={() => selectCategory("all")}>{copy.finds.all}</button>
          {categories.slice(0, 6).map((category) => (
            <button
              className={activeCategory === category.slug ? "active" : ""}
              key={category.slug}
              onClick={() => selectCategory(category.slug)}
            >
              {categoryCopy[category.slug].name}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {visibleProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <a className="product-image" href={product.storeUrl} rel="nofollow" data-track-event="product_outbound_click" data-item-id={product.id} data-item-name={product.name} data-item-category={product.category} data-click-area="homepage-card-image">
                <img src={product.image} alt={product.name} loading="lazy" />
                <span className="product-check">{copy.finds.checked}</span>
              </a>
              <div className="product-body">
                <div className="product-meta">
                  <span>{categoryCopy[product.category].name}</span>
                  <span>{product.checked}</span>
                </div>
                <h3><a href={product.storeUrl} rel="nofollow" data-track-event="product_outbound_click" data-item-id={product.id} data-item-name={product.name} data-item-category={product.category} data-click-area="homepage-card-title">{product.name}</a></h3>
                <div className="product-footer">
                  <div className="price">
                    <strong>≈ ${product.usd}</strong>
                    <small>{copy.finds.source} ¥{product.cny}</small>
                  </div>
                  <a className="product-button" href={product.storeUrl} rel="nofollow" data-track-event="product_outbound_click" data-item-id={product.id} data-item-name={product.name} data-item-category={product.category} data-click-area="homepage-card-button">{copy.finds.open} <ArrowIcon /></a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="workflow-section" id="how-it-works">
        <div className="workflow-intro">
          <p className="eyebrow"><span /> {copy.workflow.eyebrow}</p>
          <h2>{copy.workflow.title}</h2>
          <p>{copy.workflow.description}</p>
          <a href="/guides/cssbuy-spreadsheet-guide">{copy.workflow.read} <ArrowIcon /></a>
        </div>
        <ol className="workflow-list">
          {copy.workflow.steps.map(([title, description], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><b>{title}</b><p>{description}</p></div></li>)}
        </ol>
      </section>

      <section className="section guide-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow dark"><span /> {copy.reading.eyebrow}</p>
            <h2>{copy.reading.title}</h2>
          </div>
          <p>{copy.reading.description}</p>
        </div>
        <div className="guide-grid">
          <a className="guide-card guide-featured" href="/guides/cssbuy-spreadsheet-guide">
            <span className="guide-label">{copy.reading.cards[0][0]}</span>
            <h3>{copy.reading.cards[0][1]}</h3>
            <p>{copy.reading.cards[0][2]}</p>
            <b>{copy.reading.read} <ArrowIcon /></b>
          </a>
          <a className="guide-card" href="/guides/read-warehouse-qc-photos">
            <span className="guide-label">{copy.reading.cards[1][0]}</span>
            <h3>{copy.reading.cards[1][1]}</h3>
            <p>{copy.reading.cards[1][2]}</p>
            <b>{copy.reading.read} <ArrowIcon /></b>
          </a>
          <a className="guide-card" href="/guides/product-price-vs-parcel-cost">
            <span className="guide-label">{copy.reading.cards[2][0]}</span>
            <h3>{copy.reading.cards[2][1]}</h3>
            <p>{copy.reading.cards[2][2]}</p>
            <b>{copy.reading.read} <ArrowIcon /></b>
          </a>
        </div>
        <a className="article-crosslink" href="/articles/cssbuy-spreadsheet-categories-explained"><span>{copy.reading.articleLabel}</span>{copy.reading.categoryArticle} <ArrowIcon /></a>
        {locale === "en" ? <a className="article-crosslink" href="/articles/cssbuy-hoodie-spreadsheet-fabric-measurements-weight"><span>NEW ARTICLE</span>Build a hoodie fabric, measurement and weight worksheet <ArrowIcon /></a> : null}
        {locale === "en" ? <a className="article-crosslink" href="/articles/cssbuy-shoes-spreadsheet-size-qc-fields"><span>NEW ARTICLE</span>Build a shoe size and QC evidence worksheet <ArrowIcon /></a> : null}
        {locale === "en" ? <a className="article-crosslink" href="/articles/cssbuy-seller-page-checklist-before-saving-find"><span>NEW ARTICLE</span>Run the seller-page checklist before saving a find <ArrowIcon /></a> : null}
        {locale === "en" ? <a className="article-crosslink" href="/articles/cssbuy-weidian-finds-options-seller-signals"><span>NEW ARTICLE</span>Verify Weidian options and seller-page signals <ArrowIcon /></a> : null}
      </section>

      <section className="faq-preview">
        <div>
          <p className="eyebrow"><span /> {copy.faq.eyebrow}</p>
          <h2>{copy.faq.title}</h2>
        </div>
        <div className="faq-list">
          {copy.faq.preview.map(([question, answer], index) => <details open={index === 0} key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}
          <a className="text-link light" href={`${prefix}/faq`}>{copy.faq.seeAll} <ArrowIcon /></a>
        </div>
      </section>

      <footer>
        <div className="footer-top" data-nosnippet>
          <a className="brand brand--light" href="#top">
            <img className="brand-logo" src="/cssbuy-logo.png" alt="CSSBuy" />
            <span className="brand-tagline">{copy.brandTagline}</span>
          </a>
          <p>{copy.footer.copy}</p>
          <SearchBox compact locale={locale} />
        </div>
        <div className="footer-bottom" data-nosnippet>
          <span>{copy.footer.copyright}</span>
          <div>{copy.footer.links.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</div>
        </div>
      </footer>
    </main>
  );
}

export default function HomePage() {
  return <HomeView />;
}
