import {
  categories,
  featuredProducts,
  guideCards,
  mainSite,
  productCollections,
  products,
  type Product,
} from "../data";
import {
  localizedContent,
  type ContentSection,
} from "../localizedContent";
import {
  localizePath,
  translations,
  type Locale,
} from "../i18n";
import { seoArticleCopy } from "../seoArticles";
import {
  getSeoArticleEntries,
  getSeoArticleEntry,
} from "../seoArticleLibrary";
import {
  completeLocalizedSections,
  requireLocalizedField,
} from "../contentParity";
import { collectionNames } from "../productContent";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

const localizedCategoryNames: Record<Locale, string[]> = {
  en: ["Shoes", "Sweatshirts", "T-Shirts", "Jackets", "Pants", "Headwear", "Accessories", "Electronics"],
  zh: ["鞋类", "卫衣", "T恤", "夹克", "裤装", "帽子", "配饰", "电子产品"],
  de: ["Schuhe", "Sweatshirts", "T-Shirts", "Jacken", "Hosen", "Kopfbedeckung", "Accessoires", "Elektronik"],
  pl: ["Buty", "Bluzy", "T-shirty", "Kurtki", "Spodnie", "Nakrycia głowy", "Akcesoria", "Elektronika"],
  es: ["Calzado", "Sudaderas", "Camisetas", "Chaquetas", "Pantalones", "Gorras", "Accesorios", "Electrónica"],
  it: ["Scarpe", "Felpe", "T-shirt", "Giacche", "Pantaloni", "Cappelli", "Accessori", "Elettronica"],
  fr: ["Chaussures", "Sweats", "T-shirts", "Vestes", "Pantalons", "Couvre-chefs", "Accessoires", "Électronique"],
  pt: ["Calçados", "Moletons", "Camisetas", "Jaquetas", "Calças", "Chapéus", "Acessórios", "Eletrônicos"],
  ro: ["Pantofi", "Hanorace", "Tricouri", "Jachete", "Pantaloni", "Pălării", "Accesorii", "Electronice"],
  sv: ["Skor", "Tröjor", "T-shirts", "Jackor", "Byxor", "Huvudbonader", "Accessoarer", "Elektronik"],
};

const guideSlugs = ["how-to-buy", "qc-guide", "shipping-guide", "returns"];
const policySlugs = ["about", "editorial-policy", "privacy", "terms"];

function completeGuide(locale: Locale, slug: string) {
  const english = localizedContent.en.guides[slug];
  const translated = localizedContent[locale].guides[slug];

  return {
    facts: english.facts.map((englishFact, index) => ({
      value: requireLocalizedField(
        locale,
        translated?.facts?.[index]?.value,
        englishFact.value,
        `${slug}.facts[${index}].value`,
      ),
      label: requireLocalizedField(
        locale,
        translated?.facts?.[index]?.label,
        englishFact.label,
        `${slug}.facts[${index}].label`,
      ),
    })),
    sections: completeLocalizedSections(
      locale,
      translated?.sections,
      english.sections,
      slug,
    ),
    sourceLabel: requireLocalizedField(
      locale,
      translated?.sourceLabel,
      english.sourceLabel,
      `${slug}.sourceLabel`,
    ),
  };
}

function completePolicy(locale: Locale, slug: string) {
  return completeLocalizedSections(
    locale,
    localizedContent[locale].policies[slug],
    localizedContent.en.policies[slug],
    slug,
  );
}

function completeFaq(locale: Locale) {
  return translations.en.faq.map((englishItem, index) => {
    const translatedItem = translations[locale].faq[index];
    return {
      q: requireLocalizedField(
        locale,
        translatedItem?.q,
        englishItem.q,
        `faq[${index}].question`,
      ),
      a: requireLocalizedField(
        locale,
        translatedItem?.a,
        englishItem.a,
        `faq[${index}].answer`,
      ),
    };
  });
}

export function LocalizedHome({ locale }: { locale: Locale }) {
  const copy = translations[locale];
  const categoryNames = localizedCategoryNames[locale];
  const faq = completeFaq(locale);
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Joyagoo China",
    url: locale === "en" ? "https://joyagoochina.org/" : `https://joyagoochina.org/${locale}/`,
    description: copy.home.intro,
    inLanguage: locale,
    potentialAction: {
      "@type": "SearchAction",
      target: `${mainSite}/AllProducts/?keyword={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Joyagoo China",
    url: "https://joyagoochina.org/",
    logo: {
      "@type": "ImageObject",
      url: "https://joyagoochina.org/joyagoo-logo.png",
    },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([websiteSchema, organizationSchema, faqSchema]),
        }}
      />
      <SiteHeader locale={locale} />
      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="kicker">{copy.home.kicker}</p>
          <h1>{copy.home.title}</h1>
          <p className="hero-intro">{copy.home.intro}</p>
          <form
            className="search-form"
            action={`${mainSite}/AllProducts/`}
            method="get"
            target="_blank"
          >
            <label className="sr-only" htmlFor={`product-search-${locale}`}>
              {copy.home.search}
            </label>
            <span aria-hidden="true">⌕</span>
            <input
              id={`product-search-${locale}`}
              name="keyword"
              placeholder={copy.home.searchPlaceholder}
            />
            <button type="submit">{copy.home.search}</button>
          </form>
          <div className="trust-row">
            <span>✓ {copy.home.policyResearch}</span>
            <span>•</span>
            <span>{copy.home.independentGuidance}</span>
            <span>•</span>
            <span>{copy.home.directLinks}</span>
          </div>
        </div>

        <div className="hero-collage" aria-label={copy.home.latestTitle}>
          <div className="collage-paper" aria-hidden="true">
            <strong>{copy.home.researched}</strong>
            <span>{copy.home.buyingGuide}</span>
          </div>
          {[4, 2, 1, 6].map((productIndex, index) => (
            <a
              className={`collage-item ${
                ["collage-main", "collage-top", "collage-side", "collage-watch"][
                  index
                ]
              }`}
              href={localizePath(
                locale,
                `/product/${products[productIndex].slug}/`,
              )}
              key={products[productIndex].id}
            >
              <img
                src={products[productIndex].image}
                alt={products[productIndex].name}
                width="640"
                height="640"
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
              />
              <span>{products[productIndex].name}</span>
            </a>
          ))}
          <div className="year-stamp">2026</div>
          <div className="qc-note">{copy.home.selectedProducts}</div>
        </div>
      </section>

      <section className="category-strip" aria-label={copy.nav.categories}>
        {categories.slice(0, 6).map((category, index) => (
          <a
            href={category.href}
            target="_blank"
            rel="noopener"
            key={category.name}
          >
            <span>{category.glyph}</span>
            <strong>{categoryNames[index]}</strong>
            <small>{copy.home.browseCategory}</small>
          </a>
        ))}
      </section>

      <section className="section product-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{copy.home.latestEyebrow}</p>
            <h2>{copy.home.latestTitle}</h2>
          </div>
          <p>{copy.home.latestDescription}</p>
        </div>
        <ProductGrid locale={locale} items={featuredProducts} />
        <a
          className="text-link"
          href={localizePath(locale, "/spreadsheet/")}
        >
          {copy.home.browseAll}
        </a>
      </section>

      <section className="section guide-section">
        <div className="section-heading inverse">
          <div>
            <p className="eyebrow">{copy.home.libraryEyebrow}</p>
            <h2>{copy.home.libraryTitle}</h2>
          </div>
          <p>{copy.home.libraryDescription}</p>
        </div>
        <div className="guide-grid">
          {(["how-to-buy", "qc-guide", "shipping-guide"] as const).map(
            (slug, index) => {
              const page = copy.pages[slug];
              return (
                <a
                  className={`guide-card guide-${guideCards[index].accent}`}
                  href={localizePath(locale, `/${slug}/`)}
                  key={slug}
                >
                  <span className="guide-number">0{index + 1}</span>
                  <small>{page.eyebrow}</small>
                  <h3>{page.title}</h3>
                  <p>{page.intro}</p>
                  <strong>{copy.home.readGuide}</strong>
                </a>
              );
            },
          )}
        </div>
      </section>

      <SeoArticleFeature locale={locale} />

      <section className="section faq-section">
        <div className="faq-intro">
          <p className="eyebrow">{copy.home.quickAnswers}</p>
          <h2>{copy.home.faqTitle}</h2>
          <p>{copy.home.faqIntro}</p>
        </div>
        <FaqList locale={locale} />
      </section>
      <SiteFooter locale={locale} />
    </main>
  );
}

function SeoArticleFeature({ locale }: { locale: Locale }) {
  const seo = seoArticleCopy[locale];
  const articles = getSeoArticleEntries(locale);
  const [featured, ...sideArticles] = articles;

  return (
    <section className="section seo-home-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{seo.indexEyebrow}</p>
          <h2>{seo.indexTitle}</h2>
        </div>
        <p>{seo.indexIntro}</p>
      </div>
      <div className="seo-feature-card">
        <a
          className="seo-feature-copy"
          href={localizePath(locale, `/${featured.slug}/`)}
        >
          <div className="seo-feature-meta">
            <span>{seo.latestLabel}</span>
            <span>{seo.updatedLabel}</span>
          </div>
          <h3>{featured.article.title}</h3>
          <p>{featured.article.description}</p>
          <strong>{seo.readArticle}</strong>
        </a>
        <div className="seo-side-articles" aria-label={seo.indexTitle}>
          {sideArticles.map((entry, index) => (
            <a
              href={localizePath(locale, `/${entry.slug}/`)}
              key={entry.slug}
            >
              <span>0{index + 2}</span>
              <div>
                <small>{entry.article.eyebrow}</small>
                <h3>{entry.article.title}</h3>
                <p>{entry.article.description}</p>
              </div>
              <strong aria-hidden="true">↗</strong>
            </a>
          ))}
        </div>
      </div>
      <a
        className="text-link"
        href={localizePath(locale, "/articles/")}
      >
        {seo.navLabel} →
      </a>
    </section>
  );
}

export function ProductGrid({
  locale,
  items = products,
}: {
  locale: Locale;
  items?: Product[];
}) {
  const copy = translations[locale];
  return (
    <div className="product-grid">
      {items.map((product, index) => (
        <a
          className={`product-card product-card-${index + 1}`}
          href={localizePath(locale, `/product/${product.slug}/`)}
          key={product.id}
        >
          <div className="product-image">
            <img src={product.image} alt={product.name} width="640" height="640" loading="lazy" />
            <span>{copy.home.viewProduct}</span>
          </div>
          <div className="product-meta">
            <small>{collectionNames[locale][product.collection]}</small>
            <h3>{product.name}</h3>
            <div>
              <strong>{product.price}</strong>
              <span>{copy.common.disclaimer ? `ID ${product.id}` : product.id}</span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

function FaqList({ locale }: { locale: Locale }) {
  return (
    <div className="faq-list">
      {completeFaq(locale).map((item, index) => (
        <details open={index === 0} key={item.q}>
          <summary>{item.q}</summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  );
}

function SectionBody({ section }: { section: ContentSection }) {
  return (
    <>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {section.callout && (
        <div className="editorial-callout">
          <strong>{section.callout.title}</strong>
          <p>{section.callout.text}</p>
        </div>
      )}
    </>
  );
}

function LocalizedGuidePage({
  locale,
  slug,
}: {
  locale: Locale;
  slug: string;
}) {
  const copy = translations[locale];
  const details = localizedContent[locale];
  const page = copy.pages[slug];
  const guide = completeGuide(locale, slug);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.title,
    description: page.intro,
    dateModified: "2026-07-30",
    datePublished: "2026-07-29",
    inLanguage: locale,
    image: ["https://joyagoochina.org/products/3378.webp"],
    author: { "@type": "Organization", name: "Joyagoo China Editorial" },
    publisher: {
      "@type": "Organization",
      name: "Joyagoo China",
      url: "https://joyagoochina.org/",
    },
  };
  const guideBreadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: details.article.home, item: `https://joyagoochina.org${localizePath(locale, "/")}` },
      { "@type": "ListItem", position: 2, name: details.article.guides, item: `https://joyagoochina.org${localizePath(locale, "/guides/")}` },
      { "@type": "ListItem", position: 3, name: page.title, item: `https://joyagoochina.org${localizePath(locale, `/${slug}/`)}` },
    ],
  };

  return (
    <main className="guide-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([articleSchema, guideBreadcrumbSchema]) }}
      />
      <SiteHeader locale={locale} />
      <article>
        <header className="article-hero">
          <nav className="breadcrumb" aria-label={details.article.inGuide}>
            <a href={localizePath(locale, "/")}>{details.article.home}</a>
            <span>/</span>
            <a href={localizePath(locale, "/guides/")}>
              {details.article.guides}
            </a>
            <span>/</span>
            <span>{page.eyebrow}</span>
          </nav>
          <p className="eyebrow">{page.eyebrow}</p>
          <h1>{page.title}</h1>
          <p className="article-intro">{page.intro}</p>
          <div className="article-meta">
            <span>{details.article.researched}</span>
            <span>{details.article.updated}</span>
            <span>{details.article.independent}</span>
          </div>
        </header>

        <aside className="article-facts" aria-label={details.article.keyFacts}>
          {guide.facts.map((fact) => (
            <div key={fact.label}>
              <strong>{fact.value}</strong>
              <span>{fact.label}</span>
            </div>
          ))}
        </aside>

        <div className="article-layout">
          <aside className="article-index">
            <strong>{details.article.inGuide}</strong>
            {guide.sections.map((section, index) => (
              <a href={`#section-${index + 1}`} key={section.heading}>
                <span>0{index + 1}</span>
                {section.heading}
              </a>
            ))}
          </aside>

          <div className="article-body">
            {guide.sections.map((section, index) => (
              <section id={`section-${index + 1}`} key={section.heading}>
                <p className="section-count">0{index + 1}</p>
                <h2>{section.heading}</h2>
                <SectionBody section={section} />
              </section>
            ))}

            <aside className="source-note">
              <strong>{details.article.sourceCheck}</strong>
              <p>
                {guide.sourceLabel}. {details.article.sourceBody}
              </p>
            </aside>

            <div className="article-cta">
              <div>
                <p className="eyebrow">{details.article.ready}</p>
                <h2>{details.article.ctaTitle}</h2>
                <p>{details.article.ctaBody}</p>
              </div>
              <a
                className="button"
                href={`${mainSite}/AllProducts/`}
                target="_blank"
                rel="noopener"
              >
                {details.article.explore}
              </a>
            </div>
          </div>
        </div>
      </article>
      <SiteFooter locale={locale} />
    </main>
  );
}

function LocalizedGuideIndex({ locale }: { locale: Locale }) {
  const copy = translations[locale];
  const details = localizedContent[locale];
  const cards = [
    ...(["how-to-buy", "qc-guide", "shipping-guide"] as const).map(
      (slug, index) => ({
        slug,
        eyebrow: copy.pages[slug].eyebrow,
        title: copy.pages[slug].title,
        text: copy.pages[slug].intro,
        accent: guideCards[index].accent,
      }),
    ),
    {
      slug: "returns",
      eyebrow: details.guidesIndex.returnEyebrow,
      title: details.guidesIndex.returnTitle,
      text: details.guidesIndex.returnText,
      accent: "orange",
    },
  ];

  return (
    <main className="guide-index-page">
      <SiteHeader locale={locale} />
      <section className="index-hero">
        <p className="eyebrow">{copy.pages.guides.eyebrow}</p>
        <h1>{copy.pages.guides.title}</h1>
        <p>{details.guidesIndex.intro}</p>
      </section>
      <section className="guide-index-grid">
        {cards.map((card, index) => (
          <a
            className={`guide-card guide-${card.accent}`}
            href={localizePath(locale, `/${card.slug}/`)}
            key={card.slug}
          >
            <span className="guide-number">0{index + 1}</span>
            <small>{card.eyebrow}</small>
            <h2>{card.title}</h2>
            <p>{card.text}</p>
            <strong>{copy.home.readGuide}</strong>
          </a>
        ))}
      </section>
      <SiteFooter locale={locale} />
    </main>
  );
}

function LocalizedSeoArticleIndex({ locale }: { locale: Locale }) {
  const seo = seoArticleCopy[locale];
  const articles = getSeoArticleEntries(locale);

  return (
    <main className="seo-index-page">
      <SiteHeader locale={locale} />
      <section className="index-hero seo-index-hero">
        <p className="eyebrow">{seo.indexEyebrow}</p>
        <h1>{seo.indexTitle}</h1>
        <p>{seo.indexIntro}</p>
      </section>
      <section className="seo-index-grid">
        {articles.map((entry, index) => (
          <a
            className="seo-index-card"
            href={localizePath(locale, `/${entry.slug}/`)}
            key={entry.slug}
          >
            <div>
              <p className="eyebrow">
                {index === 0 ? seo.latestLabel : entry.article.eyebrow}
              </p>
              <h2>{entry.article.title}</h2>
              <p>{entry.article.description}</p>
              <div className="seo-feature-meta">
                <span>{seo.updatedLabel}</span>
                <span>{seo.readTime}</span>
              </div>
              <strong>{seo.readArticle}</strong>
            </div>
            <span className="seo-index-number">0{index + 1}</span>
          </a>
        ))}
      </section>
      <SiteFooter locale={locale} />
    </main>
  );
}

function LocalizedSeoArticlePage({
  locale,
  slug,
}: {
  locale: Locale;
  slug: string;
}) {
  const seo = seoArticleCopy[locale];
  const entry = getSeoArticleEntry(locale, slug);
  if (!entry) return null;
  const article = entry.article;
  const articleUrl = locale === "en"
    ? `https://joyagoochina.org/${entry.slug}/`
    : `https://joyagoochina.org/${locale}/${entry.slug}/`;
  const articleImage = `https://joyagoochina.org${products[
    ({
      "joyagoo-fees-explained": 0,
      "joyagoo-qc-photo-checklist": 4,
      "joyagoo-volumetric-weight-shipping-cost": 7,
      "joyagoo-return-window-warehouse-storage": 2,
    } as Record<string, number>)[entry.slug] ?? 0
  ].image}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: "2026-07-30",
    dateModified: "2026-07-30",
    inLanguage: locale,
    image: [articleImage],
    wordCount:
      locale === "en"
        ? article.sections
            .flatMap((section) => section.paragraphs)
            .join(" ")
            .split(/\s+/).length
        : undefined,
    author: { "@type": "Organization", name: "Joyagoo China Editorial" },
    publisher: {
      "@type": "Organization",
      name: "Joyagoo China",
      url: "https://joyagoochina.org/",
    },
    mainEntityOfPage: articleUrl,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: translations[locale].common.home, item: `https://joyagoochina.org${localizePath(locale, "/")}` },
      { "@type": "ListItem", position: 2, name: seo.navLabel, item: `https://joyagoochina.org${localizePath(locale, "/articles/")}` },
      { "@type": "ListItem", position: 3, name: article.title, item: articleUrl },
    ],
  };

  return (
    <main className="guide-page seo-article-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([articleSchema, breadcrumbSchema]) }}
      />
      <SiteHeader locale={locale} />
      <article>
        <header className="article-hero seo-article-hero">
          <nav className="breadcrumb" aria-label={seo.contentsLabel}>
            <a href={localizePath(locale, "/")}>
              {translations[locale].common.home}
            </a>
            <span>/</span>
            <a href={localizePath(locale, "/articles/")}>{seo.navLabel}</a>
            <span>/</span>
            <span>{article.eyebrow}</span>
          </nav>
          <p className="eyebrow">{article.eyebrow}</p>
          <h1>{article.title}</h1>
          <p className="article-intro">{article.description}</p>
          <div className="article-meta">
            <span>{seo.updatedLabel}</span>
            <span>{seo.readTime}</span>
            <span>{translations[locale].common.disclaimer}</span>
          </div>
        </header>

        <aside className="article-facts" aria-label={article.title}>
          {article.facts.map((fact) => (
            <div key={fact.label}>
              <strong>{fact.value}</strong>
              <span>{fact.label}</span>
            </div>
          ))}
        </aside>

        <div className="article-layout">
          <aside className="article-index">
            <strong>{seo.contentsLabel}</strong>
            {article.sections.map((section, index) => (
              <a href={`#article-section-${index + 1}`} key={section.heading}>
                <span>0{index + 1}</span>
                {section.heading}
              </a>
            ))}
          </aside>

          <div className="article-body">
            {article.sections.map((section, index) => (
              <section
                id={`article-section-${index + 1}`}
                key={section.heading}
              >
                <p className="section-count">0{index + 1}</p>
                <h2>{section.heading}</h2>
                <SectionBody section={section} />
              </section>
            ))}

            <aside className="source-note">
              <strong>{seo.sourceTitle}</strong>
              <p>{entry.sourceBody}</p>
              <p>
                <a href={entry.slug === "joyagoo-return-window-warehouse-storage" ? "https://mgt.joyagoo.com/help-center/terms-of-promised-returns-with-no-reasons/" : entry.slug === "joyagoo-volumetric-weight-shipping-cost" ? "https://mgt.joyagoo.com/help-center/value-added-services/" : "https://mgt.joyagoo.com/help-center/shopping-assistant-guidance/"} target="_blank" rel="noopener noreferrer">
                  Joyagoo official policy source ↗
                </a>{" "}· Checked 11 August 2026
              </p>
            </aside>

            <div className="article-cta">
              <div>
                <p className="eyebrow">{seo.ctaEyebrow}</p>
                <h2>{seo.ctaTitle}</h2>
                <p>{seo.ctaBody}</p>
              </div>
              <a
                className="button"
                href={`${mainSite}/AllProducts/`}
                target="_blank"
                rel="noopener"
              >
                {seo.ctaButton}
              </a>
            </div>
          </div>
        </div>
      </article>
      <SiteFooter locale={locale} />
    </main>
  );
}

function LocalizedPolicyPage({
  locale,
  slug,
}: {
  locale: Locale;
  slug: string;
}) {
  const copy = translations[locale];
  const page = copy.pages[slug];
  const sections = completePolicy(locale, slug);

  return (
    <main className="policy-page">
      <SiteHeader locale={locale} />
      <article className="policy-content">
        <p className="eyebrow">{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <p className="policy-intro">{page.intro}</p>
        <div className="policy-copy">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              <SectionBody section={section} />
            </section>
          ))}
        </div>
      </article>
      <SiteFooter locale={locale} />
    </main>
  );
}

export function LocalizedPage({
  locale,
  slug,
}: {
  locale: Locale;
  slug: string;
}) {
  const copy = translations[locale];
  if (slug === "articles") {
    return <LocalizedSeoArticleIndex locale={locale} />;
  }
  if (getSeoArticleEntry(locale, slug)) {
    return <LocalizedSeoArticlePage locale={locale} slug={slug} />;
  }
  const page = copy.pages[slug] ?? copy.pages.guides;
  const isSpreadsheet = slug === "spreadsheet";
  const isCategories = slug === "categories";
  const isFaq = slug === "faq";
  const faq = completeFaq(locale);
  const faqSchema = isFaq
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        inLanguage: locale,
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      }
    : null;

  if (guideSlugs.includes(slug)) {
    return <LocalizedGuidePage locale={locale} slug={slug} />;
  }

  if (slug === "guides") {
    return <LocalizedGuideIndex locale={locale} />;
  }

  if (policySlugs.includes(slug)) {
    return <LocalizedPolicyPage locale={locale} slug={slug} />;
  }

  return (
    <main className="policy-page localized-page">
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <SiteHeader locale={locale} />
      <section className="index-hero localized-hero">
        <p className="eyebrow">{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <p>{page.intro}</p>
      </section>

      {isSpreadsheet && (
        <section className="section localized-catalogue">
          <ProductGrid locale={locale} />
          <a
            className="text-link"
            href={`${mainSite}/AllProducts/`}
            target="_blank"
            rel="noopener"
          >
            {copy.home.browseAll}
          </a>
        </section>
      )}

      {isCategories && (
        <>
          <section className="category-strip localized-categories">
            {categories.map((category, index) => (
              <a
                href={category.href}
                target="_blank"
                rel="noopener"
                key={category.name}
              >
                <span>{category.glyph}</span>
                <strong>
                  {requireLocalizedField(
                    locale,
                    localizedCategoryNames[locale][index],
                    category.name,
                    `categories[${index}]`,
                  )}
                </strong>
                <small>{copy.home.browseCategory}</small>
              </a>
            ))}
          </section>
          <div className="category-product-groups">
            {productCollections.map((collection) => (
              <section
                className="section category-product-group"
                key={collection.name}
              >
                <div className="section-heading">
                  <div>
                    <p className="eyebrow">{copy.home.selectedProducts}</p>
                    <h2>{collectionNames[locale][collection.name]}</h2>
                  </div>
                  <p>
                    {collection.products.length} {copy.nav.spreadsheet}
                  </p>
                </div>
                <ProductGrid locale={locale} items={collection.products} />
              </section>
            ))}
          </div>
        </>
      )}

      {isFaq && (
        <section className="section faq-section standalone-faq">
          <div className="faq-intro">
            <p className="eyebrow">{copy.home.quickAnswers}</p>
            <h2>{copy.home.faqTitle}</h2>
            <p>{copy.home.faqIntro}</p>
          </div>
          <FaqList locale={locale} />
        </section>
      )}
      <SiteFooter locale={locale} />
    </main>
  );
}
