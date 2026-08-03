"use client";

import { FormEvent, ReactNode, useMemo, useState } from "react";
import {
  articleRoute,
  articleRoutes,
  categoryDestinations,
  categoryOrder,
  copies,
  guideRoutes,
  languages,
  Locale,
  products,
  RouteKey,
  routeHref,
} from "./site-content";
import { additionalArticles, additionalArticleRoutes } from "./site-articles";

const CNY_TO_USD = 0.1481;

function usd(cny: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cny * CNY_TO_USD);
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
        <img src="/kameymall-logo.png" alt="KameyMall" />
        <span>Sheet</span>
      </a>
      <div className="header-actions">
        <nav aria-label="Primary navigation">
          {navItems.map(([href, label]) => (
            <a
              key={href}
              href={routeHref(locale, href)}
              aria-current={route === href || route.startsWith(`${href}/`) ? "page" : undefined}
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
        <img src="/kameymall-logo.png" alt="KameyMall" />
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
    const keyword = String(form.get("keywords") ?? "").trim();
    if (!keyword) {
      window.location.assign("https://www.cnbuycha.com/AllProducts/");
      return;
    }
    const query = new URLSearchParams({ keywords: keyword, channelid: "2", method: "1" });
    window.location.assign(`https://www.cnbuycha.com/search.html?${query.toString()}`);
  }
  return (
    <form
      action="https://www.cnbuycha.com/search.html"
      className={`hero-search${compact ? " search-compact" : ""}`}
      method="get"
      onSubmit={submitMainSearch}
    >
      <label className="sr-only" htmlFor={compact ? "route-search" : "main-search"}>{copy.home.searchLabel}</label>
      <input name="channelid" type="hidden" value="2" />
      <input name="method" type="hidden" value="1" />
      <input
        id={compact ? "route-search" : "main-search"}
        name="keywords"
        placeholder={copy.home.searchPlaceholder}
        type="search"
      />
      <button aria-label={copy.home.searchLabel} type="submit"><span className="search-glyph" /></button>
    </form>
  );
}

function FindBrowser({ locale }: { locale: Locale }) {
  const copy = copies[locale];
  const [tableQuery, setTableQuery] = useState("");
  const [category, setCategory] = useState("all");
  const filteredProducts = useMemo(() => {
    const query = tableQuery.trim().toLowerCase();
    return products.filter((product) => {
      const label = copy.categories.items[product.categoryKey].label;
      const matchesQuery = !query || product.name.toLowerCase().includes(query) || label.toLowerCase().includes(query) || product.reference.includes(query);
      return matchesQuery && (category === "all" || product.categoryKey === category);
    });
  }, [category, copy.categories.items, tableQuery]);

  return (
    <section className="find-browser" aria-label={copy.finder.kicker}>
      <div className="browser-heading">
        <span className="live-dot" />
        <h2>{copy.finder.kicker}</h2>
        <span className="browser-updated">{copy.finder.verified}</span>
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
            {products.map((product) => (
              <option key={product.categoryKey} value={product.categoryKey}>{copy.categories.items[product.categoryKey].label}</option>
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
            {filteredProducts.length ? filteredProducts.map((product) => (
              <div className="product-row" role="row" key={product.reference}>
                <div className="item-cell" role="cell">
                  <a href={product.url} aria-label={`${copy.finder.open} ${product.name}`}><img src={product.image} alt={product.name} /></a>
                  <div>
                    <a className="product-name" href={product.url}>{product.name}</a>
                    <span>{copy.finder.original} · ¥{product.cny}</span>
                    <code>KMS-{product.reference}</code>
                  </div>
                </div>
                <a className="category-cell" role="cell" href={categoryDestinations[product.categoryKey]}>{copy.categories.items[product.categoryKey].label}</a>
                <div className="price-cell" role="cell"><strong>{usd(product.cny)}</strong><small>{copy.finder.approximate}</small></div>
                <div className="status-cell" role="cell"><span /> {copy.finder.listed}</div>
                <div className="open-cell" role="cell">
                  <a className="open-pill" href={product.url}>{copy.finder.open}</a>
                  <a className="external-link" href={product.url} aria-label={`${copy.finder.open} ${product.name}`}><ArrowIcon external /></a>
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
  const chips = ["shoes", "jersey", "sweatshirts", "headwear", "electronics"];
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
          <article><span className="proof-icon" aria-hidden="true">20K</span><div><strong>20K+</strong><small>{copy.home.findsCount}</small></div></article>
          <article><span className="proof-icon" aria-hidden="true">↗</span><div><strong>{copy.home.direct}</strong><small>{copy.home.listingPages}</small></div></article>
        </div>
        <div className="category-chips">
          {chips.map((key) => <a key={key} href={categoryDestinations[key]}>{copy.categories.items[key].label}</a>)}
        </div>
      </div>
      <FindBrowser locale={locale} />
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

function CategoriesSection({ locale }: { locale: Locale }) {
  const copy = copies[locale];
  return (
    <section className="category-section page-section">
      <SectionHeading kicker={copy.categories.kicker} title={copy.categories.title} intro={copy.categories.intro} />
      <div className="category-grid">
        {categoryOrder.map((key, index) => (
          <a className="category-card" href={categoryDestinations[key]} key={key}>
            <span className="category-number">{String(index + 1).padStart(2, "0")}</span>
            <h3>{copy.categories.items[key].label}</h3>
            <p>{copy.categories.items[key].description}</p>
            <span className="card-link">{copy.categories.open} <ArrowIcon external /></span>
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
        <a className="button button-primary" href="https://www.cnbuycha.com/AllProducts/">{copy.how.action} <ArrowIcon external /></a>
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

function InnerHero({ locale, route, children }: { locale: Locale; route: Exclude<RouteKey, "home">; children?: ReactNode }) {
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

function ProsePage({ locale, route, article = false }: { locale: Locale; route: RouteKey; article?: boolean }) {
  const copy = copies[locale];
  if (article) {
    const page = route === articleRoute
      ? copy.articlePage
      : additionalArticles[locale][route as (typeof additionalArticleRoutes)[number]];
    const seoLabels: Record<Locale, { keyword: string; title: string; description: string; details: string }> = {
      en: { keyword: "Primary keyword", title: "SEO title", description: "SEO description", details: "SEO details" },
      de: { keyword: "Hauptkeyword", title: "SEO-Titel", description: "SEO-Beschreibung", details: "SEO-Angaben" },
      fr: { keyword: "Mot-clé principal", title: "Titre SEO", description: "Description SEO", details: "Données SEO" },
      es: { keyword: "Palabra clave principal", title: "Título SEO", description: "Descripción SEO", details: "Datos SEO" },
      it: { keyword: "Parola chiave principale", title: "Titolo SEO", description: "Descrizione SEO", details: "Dati SEO" },
      pl: { keyword: "Główne słowo kluczowe", title: "Tytuł SEO", description: "Opis SEO", details: "Dane SEO" },
    };
    const labels = seoLabels[locale];
    return (
      <>
        <InnerHero locale={locale} route={route as Exclude<RouteKey, "home">}>
          <div className="article-meta"><span>{page.updated}</span><span>{page.readTime}</span></div>
        </InnerHero>
        <article className="prose-layout">
          <aside>
            <a href={routeHref(locale, "articles")}>← {copy.common.backToArticles}</a>
            <p>{copy.common.verifyNote}</p>
            <a className="button button-primary" href="https://www.cnbuycha.com/AllProducts/">{copy.common.openProducts} <ArrowIcon external /></a>
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
            {page.seoTitle && page.seoDescription ? (
              <section className="seo-details" aria-label={labels.details}>
                {page.primaryKeyword ? <p><strong>{labels.keyword}:</strong> {page.primaryKeyword}</p> : null}
                <p><strong>{labels.title}:</strong> {page.seoTitle}</p>
                <p><strong>{labels.description}:</strong> {page.seoDescription}</p>
              </section>
            ) : null}
          </div>
        </article>
      </>
    );
  }
  const page = copy.guidePages[route];
  return (
    <>
      <InnerHero locale={locale} route={route as Exclude<RouteKey, "home">} />
      <article className="prose-layout">
        <aside>
          <a href={routeHref(locale, "guides")}>← {copy.common.backToGuides}</a>
          <p>{copy.common.verifyNote}</p>
          <a className="button button-primary" href="https://www.cnbuycha.com/AllProducts/">{copy.common.openProducts} <ArrowIcon external /></a>
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
  if (route === "home") return <><HomeHero locale={locale} /><CategoriesSection locale={locale} /><HowSection locale={locale} /><GuidesSection locale={locale} /><ArticlesSection locale={locale} /><FaqSection locale={locale} /></>;
  if (route === "finds") return <><InnerHero locale={locale} route={route}><MainSearch locale={locale} compact /></InnerHero><section className="standalone-browser page-section"><FindBrowser locale={locale} /></section><div className="verification-band">{copy.common.verifyNote}</div></>;
  if (route === "categories") return <><InnerHero locale={locale} route={route} /><CategoriesSection locale={locale} /></>;
  if (route === "how-to-buy") return <><InnerHero locale={locale} route={route} /><HowSection locale={locale} /><GuidesSection locale={locale} /></>;
  if (route === "guides") return <><InnerHero locale={locale} route={route} /><GuidesSection locale={locale} /></>;
  if (route === "faq") return <><InnerHero locale={locale} route={route} /><FaqSection locale={locale} /></>;
  if (route === "articles") return <><InnerHero locale={locale} route={route} /><ArticlesSection locale={locale} /></>;
  if (articleRoutes.includes(route)) return <ProsePage locale={locale} route={route} article />;
  return <ProsePage locale={locale} route={route} />;
}

export default function SitePage({ locale, route }: { locale: Locale; route: RouteKey }) {
  const copy = copies[locale];
  return (
    <main lang={locale} data-route={route}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": articleRoutes.includes(route) ? "Article" : "WebSite", name: route === "home" ? "KameyMall Sheet" : copy.pageIntros[route as Exclude<RouteKey, "home">]?.title, description: route === "home" ? copy.home.lede : copy.pageIntros[route as Exclude<RouteKey, "home">]?.intro, inLanguage: locale }) }}
      />
      <Header locale={locale} route={route} />
      <RouteContent locale={locale} route={route} />
      <Footer locale={locale} />
    </main>
  );
}
