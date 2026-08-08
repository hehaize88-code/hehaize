"use client";

import { FormEvent, useMemo, useState } from "react";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { localeCopy, localePrefix, SiteLocale } from "./i18n";
import { categories, products } from "./site-data";

const STORE_SEARCH = "https://www.cnbuycha.com/search.html?channelid=2&keywords=";

const homeJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "CSSBuy Spreadsheet 2026 – Checked Product Finds",
  description: "An independent, category-first CSSBuy spreadsheet index with recorded CNY values, link-check dates, fact-checked workflow guidance, and parcel-planning articles.",
  url: "https://cssbuychina.net/",
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
    window.location.href = `${STORE_SEARCH}${encodeURIComponent(value)}`;
  }

  return (
    <form className={`search-box ${compact ? "search-box--compact" : ""}`} onSubmit={submit}>
      <label className="sr-only" htmlFor={compact ? "nav-search" : "hero-search"}>
        Search product finds
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

  const visibleProducts = useMemo(
    () => products.filter((product) => activeCategory === "all" || product.category === activeCategory).slice(0, 8),
    [activeCategory],
  );

  return (
    <main className="home-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }} />
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
          <div className="quick-searches" aria-label="Popular searches">
            <span>{copy.hero.popular}</span>
            {copy.hero.terms.map((term) => (
              <a key={term} href={`${STORE_SEARCH}${encodeURIComponent(term)}`}>{term}</a>
            ))}
          </div>
          <div className="hero-notes">
            <div><strong>08</strong><span>{copy.hero.stats[0]}</span></div>
            <div><strong>12</strong><span>{copy.hero.stats[1]}</span></div>
            <div><strong>Aug 08</strong><span>{copy.hero.stats[2]}</span></div>
          </div>
        </div>

        <aside className="hero-collage" aria-label="A preview of recently checked product finds">
          <a className="collage-card collage-card--main" href={products[0].storeUrl} rel="nofollow">
            <img src={products[0].image} alt={products[0].name} fetchPriority="high" />
            <span><b>01</b>{products[0].name}</span>
          </a>
          <a className="collage-card collage-card--top" href={products[3].storeUrl} rel="nofollow">
            <img src={products[3].image} alt={products[3].name} fetchPriority="high" />
            <span><b>02</b>New layers</span>
          </a>
          <a className="collage-card collage-card--bottom" href={products[9].storeUrl} rel="nofollow">
            <img src={products[9].image} alt={products[9].name} />
            <span><b>03</b>Match day</span>
          </a>
          <div className="collage-stamp" aria-hidden="true"><span>CURATED</span><b>08</b><span>EDITIONS</span></div>
          <div className="collage-note"><span>LINK CHECK</span><b>Fresh finds,<br />clearer choices.</b></div>
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
            <a className={`category-card tone-${(index % 4) + 1}`} href={category.storeUrl} rel="nofollow" key={category.slug}>
              <span className="category-number">0{index + 1}</span>
              <span className="category-symbol" aria-hidden="true">{category.symbol}</span>
              <span className="category-text">
                <b>{category.name}</b>
                <small>{category.searchLabel}</small>
              </span>
              <ArrowIcon />
            </a>
          ))}
        </div>
        <div className="category-index-links">
          <span>{copy.categories.seo}</span>
          {categories.map((category) => <a href={`/category/${category.slug}`} key={category.slug}>{category.name}</a>)}
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
          <button className={activeCategory === "all" ? "active" : ""} onClick={() => setActiveCategory("all")}>{copy.finds.all}</button>
          {categories.slice(0, 6).map((category) => (
            <button
              className={activeCategory === category.slug ? "active" : ""}
              key={category.slug}
              onClick={() => setActiveCategory(category.slug)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {visibleProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <a className="product-image" href={`/product/${product.id}`}>
                <img src={product.image} alt={product.name} loading="lazy" />
                <span className="product-check">{copy.finds.checked}</span>
              </a>
              <div className="product-body">
                <div className="product-meta">
                  <span>{product.categoryLabel}</span>
                  <span>{product.checked}</span>
                </div>
                <h3><a href={`/product/${product.id}`}>{product.name}</a></h3>
                <div className="product-footer">
                  <div className="price">
                    <strong>≈ ${product.usd}</strong>
                    <small>{copy.finds.source} ¥{product.cny}</small>
                  </div>
                  <a className="product-button" href={product.storeUrl} rel="nofollow">{copy.finds.open} <ArrowIcon /></a>
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
            <span className="guide-label">START HERE · 10 MIN</span>
            <h3>How to use a CSSBuy spreadsheet from first payment to parcel</h3>
            <p>Check the exact option, understand the two paid stages, inspect the warehouse evidence, and budget for international shipping.</p>
            <b>{copy.reading.read} <ArrowIcon /></b>
          </a>
          <a className="guide-card" href="/guides/read-warehouse-qc-photos">
            <span className="guide-label">WAREHOUSE QC · 8 MIN</span>
            <h3>How to read CSSBuy warehouse QC photos</h3>
            <p>Use CSSBuy's published inspection scope as a baseline, then request the measurements and angles needed for your item.</p>
            <b>{copy.reading.read} <ArrowIcon /></b>
          </a>
          <a className="guide-card" href="/guides/product-price-vs-parcel-cost">
            <span className="guide-label">COST GUIDE · 9 MIN</span>
            <h3>CSSBuy product price vs. total parcel cost</h3>
            <p>Separate the product-and-domestic-delivery payment from packaging, route selection, and international shipping.</p>
            <b>{copy.reading.read} <ArrowIcon /></b>
          </a>
        </div>
      </section>

      <section className="faq-preview">
        <div>
          <p className="eyebrow"><span /> {copy.faq.eyebrow}</p>
          <h2>{copy.faq.title}</h2>
        </div>
        <div className="faq-list">
          <details open>
            <summary>Is this the official CSSBuy website?<span>+</span></summary>
            <p>No. This is an independent product-discovery and research guide. It is not operated by, endorsed by, or affiliated with CSSBuy.</p>
          </details>
          <details>
            <summary>Why does a CSSBuy order have two payments?<span>+</span></summary>
            <p>CSSBuy's public item pages separate the product and seller-to-warehouse delivery from the later international parcel charge after warehouse receipt, inspection, and packing.</p>
          </details>
          <details>
            <summary>What does CSSBuy check in the warehouse?<span>+</span></summary>
            <p>Its public pages list visible basics such as style, quantity, color, size, model, and damage. Photos do not prove authenticity, composition, safety, or long-term quality.</p>
          </details>
          <a className="text-link light" href={`${prefix}/faq`}>{copy.faq.seeAll} <ArrowIcon /></a>
        </div>
      </section>

      <footer>
        <div className="footer-top">
          <a className="brand brand--light" href="#top">
            <img className="brand-logo" src="/cssbuy-logo.png" alt="CSSBuy" />
            <span className="brand-tagline">{copy.brandTagline}</span>
          </a>
          <p>{copy.footer.copy}</p>
          <SearchBox compact locale={locale} />
        </div>
        <div className="footer-bottom">
          <span>{copy.footer.copyright}</span>
          <div><a href="/about">About</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/contact">Contact</a></div>
        </div>
      </footer>
    </main>
  );
}

export default function HomePage() {
  return <HomeView />;
}
