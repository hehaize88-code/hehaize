import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "../../components/site-header";
import { SiteFooter } from "../../components/site-footer";
import { DocumentLanguage } from "../../components/document-language";
import { SiteImage } from "../../components/site-image";
import { guides } from "../../guides/article-data";
import { products, type ProductFind } from "../../products/product-data";
import { articleCards, categories } from "../../site-data";
import { policyPages, type PolicyPageData } from "../../policy-data";
import { localizedRouteCopy } from "../localized-route-content";
import { socialImage } from "../../seo-image";
import { hubParityCopy } from "../localized-hub-copy";
import { localizedFAQCopy } from "../localized-faq-copy";
import {
  localizeGuide,
  localizePolicy,
  localizeText,
} from "../localized-content";

const locales = ["en-gb", "de", "pl", "pt-br"] as const;
type Locale = (typeof locales)[number];

const text = {
  "en-gb": {
    lang: "en-GB", region: "UK", guide: "Guide", products: "Products", articles: "Guides", faq: "Frequently asked questions",
    finds: "Product finds by category", how: "How UUFinds research works",
    intro: "Independent, practical information for researching products, comparing available QC material and checking the current main-site page.",
    view: "View product details", read: "Read the guide", price: "Displayed reference price", open: "Open on the main site ↗",
    check: "Before deciding, always confirm the current price, variants, sizing, seller link and available QC material.",
    backProducts: "Back to product finds", allGuides: "All guides", home: "Home", productDetail: "Product detail",
    listingNote: "These images belong to the corresponding main-site listing and are not presented as a UUFinds warehouse QC album.",
    questions: ["Is this the official UUFinds website?", "Does a QC photo guarantee product quality?", "What should I check on the destination page?"],
    answers: ["No. This is an independent editorial guide.", "No. QC material records a particular item or batch and does not replace your own assessment.", "Check the item, seller, price, variants, measurements and current shipping and service terms."],
  },
  de: {
    lang: "de", region: "DE", guide: "Leitfaden", products: "Produkte", articles: "Ratgeber", faq: "Häufige Fragen",
    finds: "Produktfunde nach Kategorie", how: "So funktioniert die UUFinds-Recherche",
    intro: "Unabhängige, praktische Informationen für die Produktsuche, den Vergleich von QC-Material und die anschließende Prüfung der aktuellen Hauptseite.",
    view: "Produktdetails ansehen", read: "Ratgeber lesen", price: "Angezeigter Referenzpreis", open: "Bei Hauptseite öffnen ↗",
    check: "Prüfe vor einer Entscheidung immer den aktuellen Preis, die Varianten, Größenangaben, den Verkäuferlink und die verfügbaren QC-Aufnahmen.",
    backProducts: "Zurück zu den Produkten", allGuides: "Alle Ratgeber", home: "Startseite", productDetail: "Produktdetail",
    listingNote: "Diese Bilder gehören zum entsprechenden Angebot der Hauptseite und werden nicht als UUFinds-Warehouse-QC-Album dargestellt.",
    questions: ["Ist diese Website die offizielle UUFinds-Seite?", "Garantiert ein QC-Foto die Produktqualität?", "Was sollte ich auf der Hauptseite prüfen?"],
    answers: ["Nein. Dies ist ein unabhängiger redaktioneller Ratgeber.", "Nein. QC-Material ist ein Hinweis zu einem bestimmten Artikel oder einer Charge und ersetzt keine eigene Prüfung.", "Kontrolliere Artikel, Verkäufer, Preis, Varianten, Maße sowie aktuelle Versand- und Servicebedingungen."],
  },
  pl: {
    lang: "pl", region: "PL", guide: "Przewodnik", products: "Produkty", articles: "Poradniki", faq: "Najczęstsze pytania",
    finds: "Znaleziska według kategorii", how: "Jak działa wyszukiwanie z UUFinds",
    intro: "Niezależne, praktyczne informacje o wyszukiwaniu produktów, porównywaniu materiałów QC i sprawdzaniu aktualnej strony w serwisie głównym.",
    view: "Zobacz szczegóły produktu", read: "Przeczytaj poradnik", price: "Wyświetlana cena orientacyjna", open: "Otwórz w serwisie głównym ↗",
    check: "Przed podjęciem decyzji zawsze sprawdź aktualną cenę, warianty, rozmiary, link sprzedawcy i dostępne materiały QC.",
    backProducts: "Wróć do produktów", allGuides: "Wszystkie poradniki", home: "Strona główna", productDetail: "Szczegóły produktu",
    listingNote: "Te zdjęcia pochodzą z odpowiedniej oferty w serwisie głównym i nie są przedstawiane jako magazynowy album QC z UUFinds.",
    questions: ["Czy to oficjalna strona UUFinds?", "Czy zdjęcie QC gwarantuje jakość?", "Co sprawdzić na stronie docelowej?"],
    answers: ["Nie. To niezależny przewodnik redakcyjny.", "Nie. Materiały QC dotyczą konkretnego produktu lub partii i nie zastępują własnej oceny.", "Sprawdź produkt, sprzedawcę, cenę, warianty, wymiary oraz aktualne warunki wysyłki i obsługi."],
  },
  "pt-br": {
    lang: "pt-BR", region: "BR", guide: "Guia", products: "Produtos", articles: "Guias", faq: "Perguntas frequentes",
    finds: "Achados por categoria", how: "Como funciona a pesquisa com UUFinds",
    intro: "Informações independentes e práticas para pesquisar produtos, comparar materiais de QC e conferir a página atual no site principal.",
    view: "Ver detalhes do produto", read: "Ler o guia", price: "Preço de referência exibido", open: "Abrir no site principal ↗",
    check: "Antes de decidir, confirme sempre o preço atual, as variantes, os tamanhos, o link do vendedor e os materiais de QC disponíveis.",
    backProducts: "Voltar aos produtos", allGuides: "Todos os guias", home: "Início", productDetail: "Detalhes do produto",
    listingNote: "Estas imagens pertencem ao anúncio correspondente no site principal e não são apresentadas como um álbum de QC de armazém do UUFinds.",
    questions: ["Este é o site oficial do UUFinds?", "Uma foto de QC garante a qualidade?", "O que conferir na página de destino?"],
    answers: ["Não. Este é um guia editorial independente.", "Não. O material de QC registra um item ou lote específico e não substitui sua própria avaliação.", "Confira produto, vendedor, preço, variantes, medidas e as condições atuais de envio e serviço."],
  },
} as const;

const policySlugs = ["about", "contact", "editorial-policy", "privacy", "terms"] as const;
const corePaths = ["finds", "products", "how-it-works", "articles", "faq", ...policySlugs];
const allSegments = [
  ...corePaths.map((path) => [path]),
  ...products.map((product) => ["products", product.slug]),
  ...guides.filter((guide) => !guide.englishOnly).map((guide) => ["guides", guide.slug]),
];

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.flatMap((locale) => allSegments.map((segments) => ({ locale, segments })));
}

function alternates(path: string) {
  return {
    canonical: path,
    languages: {
      "x-default": path.replace(/^\/(en-gb|de|pl|pt-br)/, ""),
      en: path.replace(/^\/(en-gb|de|pl|pt-br)/, ""),
      "en-GB": path.replace(/^\/(en-gb|de|pl|pt-br)/, "/en-gb"),
      "de-DE": path.replace(/^\/(en-gb|de|pl|pt-br)/, "/de"),
      "pl-PL": path.replace(/^\/(en-gb|de|pl|pt-br)/, "/pl"),
      "pt-BR": path.replace(/^\/(en-gb|de|pl|pt-br)/, "/pt-br"),
    },
  };
}

function isPolicySlug(value: string): value is PolicyPageData["slug"] {
  return policySlugs.includes(value as PolicyPageData["slug"]);
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; segments: string[] }> }): Promise<Metadata> {
  const { locale, segments } = await params;
  if (!locales.includes(locale as Locale)) return {};
  const currentLocale = locale as Locale;
  const t = text[currentLocale];
  const route = segments.join("/");
  const product = segments[0] === "products" ? products.find((item) => item.slug === segments[1]) : undefined;
  const rawGuide = segments[0] === "guides" ? guides.find((item) => item.slug === segments[1]) : undefined;
  const guide = rawGuide ? localizeGuide(currentLocale, rawGuide) : undefined;
  const rawPolicy = segments.length === 1 && isPolicySlug(route) ? policyPages[route] : undefined;
  const policy = rawPolicy ? localizePolicy(currentLocale, rawPolicy) : undefined;
  const title = policy
    ? `${policy.title} | UUFinds Sheet`
    : product
      ? `${product.shortName} – $${product.price} | UUFinds`
      : guide
        ? `${guide.title} – ${t.guide}`
        : `${route === "faq" ? t.faq : route === "articles" ? t.articles : route === "products" ? t.products : route === "finds" ? t.finds : t.how} | UUFinds Sheet`;
  const path = `/${locale}/${route}/`;
  const description = policy?.description
    ?? guide?.description
    ?? (product
      ? `${t.productDetail}: ${product.shortName}, $${product.price} USD, ID ${product.listingId}. ${t.check}`
      : `${t.intro} ${t.check}`);
  return {
    title,
    description,
    alternates: alternates(path),
    openGraph: {
      title,
      description,
      url: path,
      siteName: "UUFinds Sheet",
      type: guide ? "article" : "website",
      locale: t.lang,
      images: [socialImage],
    },
    twitter: { card: "summary_large_image", title, description, images: [socialImage.url] },
  };
}

export default async function LocalizedRoute({ params }: { params: Promise<{ locale: string; segments: string[] }> }) {
  const { locale, segments } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const currentLocale = locale as Locale;
  const t = text[currentLocale];
  const route = segments.join("/");
  const product = segments[0] === "products" && segments.length === 2 ? products.find((item) => item.slug === segments[1]) : undefined;
  const rawGuide = segments[0] === "guides" ? guides.find((item) => item.slug === segments[1]) : undefined;
  const guide = rawGuide ? localizeGuide(currentLocale, rawGuide) : undefined;
  const rawPolicy = segments.length === 1 && isPolicySlug(route) ? policyPages[route] : undefined;
  const policy = rawPolicy ? localizePolicy(currentLocale, rawPolicy) : undefined;
  const routeCopy = currentLocale === "en-gb" ? undefined : localizedRouteCopy[currentLocale as Exclude<Locale, "en-gb">];
  if (!corePaths.includes(route) && !product && !guide) notFound();

  if (policy) {
    return (
      <main className="trust-page" lang={t.lang}>
        <DocumentLanguage language={t.lang} />
        <SiteHeader locale={t.region} routePath={`/${policy.slug}/`} />
        <nav className="trust-breadcrumb" aria-label={localizeText(currentLocale, "Breadcrumb")}>
          <Link href={`/${currentLocale}/`}>{t.home}</Link><span>/</span><strong>{policy.title}</strong>
        </nav>
        <header className="trust-page-hero">
          <p className="eyebrow">{policy.eyebrow}</p>
          <h1>{policy.title}</h1>
          <p>{policy.description}</p>
          <small>{localizeText(currentLocale, "Last updated")} {policy.updated}</small>
        </header>
        <article className="trust-page-body">
          {policy.sections.map((section, index) => (
            <section key={section.heading}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.points && <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul>}
              </div>
            </section>
          ))}
          {policy.contactEmail && <aside className="trust-contact-card"><p className="eyebrow inverse">{localizeText(currentLocale, "Direct contact")}</p><a href={`mailto:${policy.contactEmail}`}>{policy.contactEmail}</a></aside>}
        </article>
        <SiteFooter locale={currentLocale} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              name: policy.title,
              description: policy.description,
              url: `https://uufindssheet.com/${currentLocale}/${policy.slug}/`,
              dateModified: "2026-07-23",
              inLanguage: t.lang,
              isPartOf: { "@type": "WebSite", name: "UUFinds Sheet", url: "https://uufindssheet.com/" },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: t.home, item: `https://uufindssheet.com/${currentLocale}/` },
                { "@type": "ListItem", position: 2, name: policy.title, item: `https://uufindssheet.com/${currentLocale}/${policy.slug}/` },
              ],
            },
          ],
        }) }} />
      </main>
    );
  }

  if (product) {
    return <LocalizedProduct locale={currentLocale} product={product} />;
  }

  if (guide) {
    const title = guide.title;
    const description = guide.description;
    const wordCount = [
      ...guide.intro,
      ...guide.sections.flatMap((section) => [section.heading, ...section.paragraphs, ...(section.points ?? [])]),
    ].join(" ").trim().split(/\s+/).length;
    return (
      <main className="guide-page" lang={t.lang}>
        <DocumentLanguage language={t.lang} />
        <SiteHeader locale={t.region} routePath={`/guides/${guide.slug}/`} />
        <div className="guide-subnav"><Link className="back-link" href={`/${currentLocale}/articles/`}>← {t.allGuides}</Link></div>
        <article>
          <div className="guide-hero">
            <p className="eyebrow">{guide.label} / {t.guide}</p>
            <h1>{title}</h1>
            <p className="guide-deck">{description}</p>
            <div className="guide-byline">
              <span>{localizeText(currentLocale, "Updated")} {guide.updated}</span>
              <span>{guide.readTime}</span>
              <span>{localizeText(currentLocale, "Evidence-led editorial")}</span>
            </div>
          </div>
          <div className="guide-layout">
            <aside>
              <p>{localizeText(currentLocale, "ON THIS PAGE")}</p>
              {guide.sections.map((section, index) => <a href={`#section-${index + 1}`} key={section.heading}>{String(index + 1).padStart(2, "0")} — {section.heading.replace(/^\d+\.\s*/, "")}</a>)}
            </aside>
            <div className="guide-body">
              {guide.intro.map((paragraph) => <p className="lead" key={paragraph}>{paragraph}</p>)}
              {guide.sections.map((section, index) => (
                <section id={`section-${index + 1}`} key={section.heading}>
                  <p className="section-number">{String(index + 1).padStart(2, "0")}</p>
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {"points" in section && section.points && <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul>}
                </section>
              ))}
              <div className="source-note">
                <p className="eyebrow">{localizeText(currentLocale, "Primary source notes")}</p>
                <p>{guide.sourceNote ?? t.check}</p>
                <div><a href="https://www.cnbuycha.com/AllProducts/" target="_blank" rel="noreferrer">{t.open}</a></div>
              </div>
            </div>
          </div>
        </article>
        <SiteFooter locale={currentLocale} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Article", headline: title, description, image: `https://uufindssheet.com${socialImage.url}`,
              dateModified: guide.modifiedISO ?? "2026-07-22", datePublished: "2026-07-22", inLanguage: t.lang,
              author: { "@type": "Organization", name: "UUFinds Sheet Editorial" },
              publisher: { "@type": "Organization", name: "UUFinds Sheet" },
              wordCount,
              mainEntityOfPage: `https://uufindssheet.com/${currentLocale}/guides/${guide.slug}/`,
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: t.home, item: `https://uufindssheet.com/${currentLocale}/` },
                { "@type": "ListItem", position: 2, name: t.articles, item: `https://uufindssheet.com/${currentLocale}/articles/` },
                { "@type": "ListItem", position: 3, name: title, item: `https://uufindssheet.com/${currentLocale}/guides/${guide.slug}/` },
              ],
            },
          ],
        }) }} />
      </main>
    );
  }

  if (route === "finds") {
    return <LocalizedFinds locale={currentLocale} t={t} routeCopy={routeCopy} />;
  }
  if (route === "how-it-works") {
    return <LocalizedHowItWorks locale={currentLocale} t={t} />;
  }
  if (route === "faq") {
    return <LocalizedFAQ locale={currentLocale} t={t} />;
  }
  if (route === "products") {
    return <LocalizedProducts locale={currentLocale} t={t} routeCopy={routeCopy} />;
  }
  if (route === "articles") {
    return <LocalizedArticles locale={currentLocale} t={t} />;
  }
  notFound();
}

function LocalizedProducts({
  locale,
  t,
  routeCopy,
}: {
  locale: Locale;
  t: (typeof text)[Locale];
  routeCopy: (typeof localizedRouteCopy)[Exclude<Locale, "en-gb">] | undefined;
}) {
  const translate = (value: string) => localizeText(locale, value);
  const evidenceCards = [
    {
      label: "LISTING IMAGE",
      title: "Shows how the product is presented",
      body: "Use it to identify the model, color, design and seller-facing description on the current product page.",
      note: "It may be a catalog or promotional image rather than a warehouse sample.",
    },
    {
      label: "MATCHED QC PHOTO",
      title: "Shows one photographed item",
      body: "Use it to inspect visible shape, construction, finish and measurements when the source link or item ID agrees.",
      note: "It documents a sample, not every future unit.",
    },
    {
      label: "QC VIDEO",
      title: "Adds motion and hidden angles",
      body: "Use video to examine fabric drape, zipper movement, sole flex, reflective material or angles missing from still images.",
      note: "It does not confirm durability, authenticity or internal specifications.",
    },
    {
      label: "LIVE DESTINATION",
      title: "Confirms current listing data",
      body: "Use the main site to re-check the product ID, current price, available variants, size details and destination link.",
      note: "If live information conflicts with an older guide, use the live page.",
    },
  ];

  return (
    <main className="hub-page" lang={t.lang}>
      <DocumentLanguage language={t.lang} />
      <SiteHeader locale={t.region} routePath="/products/" />
      <section className="hub-hero">
        <p className="eyebrow">{translate("Products / 08 direct listing routes")}</p>
        <h1>{translate("See the listing.")}<br /><em>{translate("Separate it from QC evidence.")}</em></h1>
        <p>{translate("The images below come from the corresponding main-site listings; they are not labeled as UUFinds warehouse QC albums. Open a detail page, note the exact item ID, then use the official UUFinds research functions only when matched QC media is available for that source.")}</p>
      </section>
      <section className="hub-content">
        <ProductGrid locale={locale} routeCopy={routeCopy} />
        <section className="evidence-matrix">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{translate("Listing image versus QC evidence")}</p>
              <h2>{translate("Do not grade the wrong photo set.")}</h2>
            </div>
            <p>{translate("UUFinds says it can help find QC photos and videos. The first job is still matching that material to the exact item you intend to open.")}</p>
          </div>
          <div className="evidence-grid">
            {evidenceCards.map((card) => (
              <article key={card.label}>
                <p className="step-label">{translate(card.label)}</p>
                <h3>{translate(card.title)}</h3>
                <p>{translate(card.body)}</p>
                <strong>{translate(card.note)}</strong>
              </article>
            ))}
          </div>
        </section>
        <div className="source-method-note">
          <p className="eyebrow">{translate("Research rule / Reviewed July 23, 2026")}</p>
          <p>{translate("UUFinds publicly supports QC-photo and QC-video discovery, image recognition and marketplace or agent-link handling, but it does not sell the products. These product cards lead only to the main site, where current listing information must be confirmed.")}</p>
        </div>
      </section>
      <SiteFooter locale={locale} />
    </main>
  );
}

function LocalizedArticles({
  locale,
  t,
}: {
  locale: Locale;
  t: (typeof text)[Locale];
}) {
  const translate = (value: string) => localizeText(locale, value);
  const standards = [
    {
      title: "Claim standard",
      body: "Feature statements must be supported by UUFinds’ public QC, account, product or app information.",
    },
    {
      title: "Advice standard",
      body: "Inspection advice must clearly distinguish a visible observation from an unsupported conclusion.",
    },
    {
      title: "Link standard",
      body: "Every shopping, category and product destination on this site points only to the main site.",
    },
  ];

  return (
    <main className="hub-page" lang={t.lang}>
      <DocumentLanguage language={t.lang} />
      <SiteHeader locale={t.region} routePath="/articles/" />
      <section className="hub-hero article-hub-hero">
        <p className="eyebrow">{translate("Articles / Official functions checked July 23, 2026")}</p>
        <h1>{translate("Search-led guides.")}<br /><em>{translate("Source-led claims.")}</em></h1>
        <p>{translate("Each article separates what UUFinds publicly confirms from the practical inspection method added by this independent guide. Shopping and product routes remain exclusive to the main site.")}</p>
      </section>
      <section className="hub-content">
        <div className="official-fact-strip article-standard">
          {standards.map((standard, index) => (
            <article key={standard.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><strong>{translate(standard.title)}</strong><p>{translate(standard.body)}</p></div>
            </article>
          ))}
        </div>
        <div className="article-grid article-hub-grid">
          {articleCards.map((article, index) => {
            const slug = article.href.split("/").filter(Boolean).pop() ?? "";
            const guide = guides.find((item) => item.slug === slug);
            const localizedGuide = guide ? localizeGuide(locale, guide) : undefined;
            const localizedCard = article.localized?.[locale];
            return (
              <Link href={article.englishOnly ? article.href : `/${locale}${article.href}`} hrefLang={article.englishOnly ? "en" : undefined} className={`article-card${article.featured ? " article-card-featured" : ""}`} key={article.href}>
                <div className="article-meta">
                  <span>{localizedCard?.tag ?? translate(article.tag)}</span>
                  <b>{String(index + 1).padStart(2, "0")}</b>
                </div>
                <h2>{localizedCard?.title ?? (locale === "en-gb" ? article.title : localizedGuide?.title ?? translate(article.title))}</h2>
                <p>{localizedCard?.summary ?? (locale === "en-gb" ? article.summary : localizedGuide?.description ?? translate(article.summary))}</p>
                <div className="article-foot"><span>{translate(article.read)}</span><b>{translate("Read article ↗")}</b></div>
              </Link>
            );
          })}
        </div>
        <div className="source-method-note">
          <p className="eyebrow">{translate("Editorial source set")}</p>
          <p>{translate("The current guide set was reviewed against UUFinds’ public QC finder and QC browsing copy, product-detail disclaimers, account pages, personalized display description and public app information. Where those sources do not establish a fact—such as a guaranteed number of recent QC sets, shipping price or product quality—the articles do not invent one.")}</p>
        </div>
      </section>
      <SiteFooter locale={locale} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t.home, item: `https://uufindssheet.com/${locale}/` },
          { "@type": "ListItem", position: 2, name: t.articles, item: `https://uufindssheet.com/${locale}/articles/` },
        ],
      }) }} />
    </main>
  );
}

function LocalizedFinds({
  locale,
  t,
  routeCopy,
}: {
  locale: Locale;
  t: (typeof text)[Locale];
  routeCopy: (typeof localizedRouteCopy)[Exclude<Locale, "en-gb">] | undefined;
}) {
  const copy = hubParityCopy[locale].finds;
  return (
    <main className="hub-page" lang={t.lang}>
      <DocumentLanguage language={t.lang} />
      <SiteHeader locale={t.region} routePath="/finds/" />
      <section className="hub-hero">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title[0]}<br /><em>{copy.title[1]}</em></h1>
        <p>{copy.deck}</p>
      </section>
      <section className="hub-content">
        <div className="category-grid">
          {categories.map((category) => (
            <a
              className="category-card"
              href={category.href}
              target="_blank"
              rel="noreferrer"
              data-track-event="category_click"
              data-category={category.name}
              data-cta-position="localized_finds_category_grid"
              key={category.name}
            >
              <div className={`category-code ${category.color}`}>{category.code}</div>
              <div className="category-symbol" aria-hidden="true">{category.name.slice(0, 2).toUpperCase()}</div>
              <h2>{routeCopy?.categories[category.name] ?? category.name}</h2>
              <p>{copy.categoryNotes[category.name] ?? category.note}</p>
              <span className="card-arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
        <section className="evidence-matrix">
          <div className="section-heading">
            <div><p className="eyebrow">{copy.evidenceLabel}</p><h2>{copy.evidenceTitle}</h2></div>
            <p>{copy.evidenceDeck}</p>
          </div>
          <div className="evidence-grid">
            {copy.evidenceCards.map((card) => (
              <article key={card.label}><p className="step-label">{card.label}</p><h3>{card.title}</h3><p>{card.body}</p><strong>{card.note}</strong></article>
            ))}
          </div>
        </section>
        <section className="decision-checklist">
          <div><p className="eyebrow">{copy.checklistLabel}</p><h2>{copy.checklistTitle}</h2></div>
          <ol>
            {copy.checklist.map((item, index) => (
              <li key={item.lead}><span>{String(index + 1).padStart(2, "0")}</span><p><strong>{item.lead}</strong> {item.body}</p></li>
            ))}
          </ol>
        </section>
        <div className="source-method-note"><p className="eyebrow">{copy.sourceLabel}</p><p>{copy.sourceBody}</p></div>
      </section>
      <SiteFooter locale={locale} />
    </main>
  );
}

function LocalizedHowItWorks({ locale, t }: { locale: Locale; t: (typeof text)[Locale] }) {
  const copy = hubParityCopy[locale].how;
  const links = [`/${locale}/finds/`, `/${locale}/guides/uufinds-qc-checklist/`, `/${locale}/products/`];
  return (
    <main className="hub-page" lang={t.lang}>
      <DocumentLanguage language={t.lang} />
      <SiteHeader locale={t.region} routePath="/how-it-works/" />
      <section className="hub-hero">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title[0]}<br />{copy.title[1]}<br /><em>{copy.title[2]}</em></h1>
        <p>{copy.deck}</p>
      </section>
      <section className="hub-content how-page-content">
        <div className="official-fact-strip" aria-label={copy.factsLabel}>
          {copy.facts.map((fact, index) => (
            <article key={fact.title}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{fact.title}</strong><p>{fact.body}</p></div></article>
          ))}
        </div>
        <div className="workflow-grid">
          {copy.workflow.map((step, index) => (
            <article key={step.label}>
              <span>{String(index + 1).padStart(2, "0")}</span><p className="step-label">{step.label}</p>
              <h2>{step.title}</h2><p>{step.body}</p><Link href={links[index]}>{step.link} →</Link>
            </article>
          ))}
        </div>
        <section className="evidence-matrix">
          <div className="section-heading">
            <div><p className="eyebrow">{copy.matrixLabel}</p><h2>{copy.matrixTitle}</h2></div><p>{copy.matrixDeck}</p>
          </div>
          <div className="evidence-grid">
            {copy.matrix.map((card) => (
              <article key={card.label}><p className="step-label">{card.label}</p><h3>{card.title}</h3><p>{card.body}</p><strong>{card.note}</strong></article>
            ))}
          </div>
        </section>
        <section className="decision-checklist">
          <div><p className="eyebrow">{copy.checklistLabel}</p><h2>{copy.checklistTitle}</h2></div>
          <ol>
            {copy.checklist.map((item, index) => (
              <li key={item.lead}><span>{String(index + 1).padStart(2, "0")}</span><p><strong>{item.lead}</strong> {item.body}</p></li>
            ))}
          </ol>
        </section>
        <div className="method-note">
          <p className="eyebrow inverse">{copy.boundaryLabel}</p><h2>{copy.boundaryTitle}</h2><p>{copy.boundaryBody}</p>
          <Link href={`/${locale}/guides/uufinds-spreadsheet-shopping-guide-2026/`}>{copy.boundaryLink} →</Link>
        </div>
      </section>
      <SiteFooter locale={locale} />
    </main>
  );
}

function LocalizedFAQ({ locale, t }: { locale: Locale; t: (typeof text)[Locale] }) {
  const copy = localizedFAQCopy[locale];
  const faqEntities = copy.groups.flatMap((group) =>
    group.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  );
  return (
    <main className="hub-page faq-page" lang={t.lang}>
      <DocumentLanguage language={t.lang} />
      <SiteHeader locale={t.region} routePath="/faq/" />
      <section className="hub-hero faq-hero">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title[0]}<br /><em>{copy.title[1]}</em></h1><p>{copy.deck}</p>
      </section>
      <section className="hub-content faq-page-content">
        <div className="official-fact-strip">
          {copy.facts.map((fact, index) => (
            <article key={fact.title}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{fact.title}</strong><p>{fact.body}</p></div></article>
          ))}
        </div>
        <div className="faq-directory">
          <aside aria-label="FAQ topics"><p className="eyebrow">{copy.jumpLabel}</p>{copy.groups.map((group) => <a href={`#${group.id}`} key={group.id}>{group.label}</a>)}</aside>
          <div className="faq-groups">
            {copy.groups.map((group, groupIndex) => (
              <section id={group.id} className="faq-group" key={group.id}>
                <p className="eyebrow">{group.label}</p><h2>{group.title}</h2>
                <div className="faq-list">
                  {group.items.map((item, itemIndex) => (
                    <details key={item.question} open={groupIndex === 0 && itemIndex === 0}>
                      <summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
        <div className="source-method-note"><p className="eyebrow">{copy.sourceLabel}</p><p>{copy.sourceBody}</p></div>
        <section className="faq-next-step">
          <div><p className="eyebrow inverse">{copy.nextLabel}</p><h2>{copy.nextTitle}</h2></div>
          <div>
            <Link href={`/${locale}/guides/uufinds-qc-checklist/`}>{copy.checklistLink} →</Link>
            <Link href={`/${locale}/products/`}>{copy.productsLink} →</Link>
          </div>
        </section>
      </section>
      <SiteFooter locale={locale} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqEntities }) }} />
    </main>
  );
}

function ProductGrid({
  locale,
  routeCopy,
}: {
  locale: Locale;
  routeCopy: (typeof localizedRouteCopy)[Exclude<Locale, "en-gb">] | undefined;
}) {
  return (
    <div className="product-showcase-grid">
      {products.map((item, index) => (
        <Link
          className="product-card"
          href={`/${locale}/products/${item.slug}/`}
          data-track-event="product_detail_click"
          data-item-id={item.listingId}
          data-category={item.category}
          data-cta-position="localized_products_grid"
          key={item.slug}
        >
          <div className="product-card-image">
            <SiteImage src={item.images[0]} alt={item.name} width={800} height={800} />
            <span>{String(index + 1).padStart(2, "0")} / 08</span>
          </div>
          <div className="product-card-copy"><p>{routeCopy?.categories[item.category] ?? item.category}</p><h2>{item.shortName}</h2><div><span>${item.price}</span><b>{localizeText(locale, "View details ↗")}</b></div></div>
        </Link>
      ))}
    </div>
  );
}

function LocalizedProduct({ locale, product }: { locale: Locale; product: ProductFind }) {
  const t = text[locale];
  const routeCopy = locale === "en-gb" ? undefined : localizedRouteCopy[locale as Exclude<Locale, "en-gb">];
  const category = routeCopy?.categories[product.category] ?? product.category;
  const inspection = routeCopy?.inspections[product.slug] ?? product.inspectionFocus;
  const translate = (value: string) => localizeText(locale, value);
  return (
    <main className="product-page" lang={t.lang}>
      <DocumentLanguage language={t.lang} />
      <SiteHeader locale={t.region} routePath={`/products/${product.slug}/`} />
      <div className="guide-subnav"><Link className="back-link" href={`/${locale}/products/`}>← {t.backProducts}</Link></div>
      <div className="product-breadcrumb" aria-label={translate("Breadcrumb")}>
        <Link href={`/${locale}/`}>{t.home}</Link><span>/</span><a href={product.categoryUrl} target="_blank" rel="noreferrer" data-track-event="category_click" data-category={product.category} data-cta-position="localized_product_breadcrumb">{category}</a><span>/</span><strong>{t.productDetail}</strong>
      </div>
      <article className="product-detail">
        <div className="product-gallery">
          <div className="product-main-image">
            <SiteImage src={product.images[0]} alt={product.name} width={1200} height={1200} priority />
            <span>01 / {String(product.images.length).padStart(2, "0")}</span>
          </div>
          <div className="product-thumbnails" aria-label={translate("Additional product images")}>
            {product.images.slice(1).map((image, index) => (
              <div key={image}><SiteImage src={image} alt={`${product.name} — view ${index + 2}`} width={700} height={700} /><span>{String(index + 2).padStart(2, "0")}</span></div>
            ))}
          </div>
        </div>
        <div className="product-summary">
          <p className="eyebrow">{translate("Product find /")} {category}</p>
          <h1>{product.shortName}</h1>
          <p className="product-deck">{translate("These are images published with the corresponding main-site listing, not a claimed UUFinds QC album. Use the item ID to keep the listing traceable, then compare separately matched QC material when it exists.")}</p>
          <div className="product-price-row">
            <div><small>{translate("PRICE SHOWN")}</small><strong>${product.price}</strong></div>
            <div><small>{translate("MAIN-SITE ID")}</small><strong>{product.listingId}</strong></div>
          </div>
          <a
            className="primary-product-cta"
            href={product.mainSiteUrl}
            target="_blank"
            rel="noreferrer"
            data-track-event="product_click"
            data-item-id={product.listingId}
            data-category={product.category}
            data-cta-position="localized_product_primary"
          >
            {t.open.replace(/\s*↗$/, "")} — ${product.price} <span aria-hidden="true">↗</span>
          </a>
          <div className="live-note">
            <strong>{translate("Checked")} {translate(product.checked)}</strong>
            <p>{translate("The displayed price and images are a dated snapshot. Confirm the current main-site listing for price, availability, sizes, colors, seller or source link and other live details.")}</p>
          </div>
        </div>
      </article>
      <section className="product-checks">
        <div>
          <p className="eyebrow inverse">{translate("Apply the UUFinds research method")}</p>
          <h2>{translate("Three checks, three different jobs.")}</h2>
        </div>
        <div className="product-check-grid">
          <article>
            <span>01</span>
            <h3>{translate("Match the exact source")}</h3>
            <p>{translate("Confirm that the destination still shows item ID")} {product.listingId}{translate(". If UUFinds returns QC media, compare its source link, seller and visible variant—not only a similar thumbnail.")}</p>
          </article>
          <article>
            <span>02</span>
            <h3>{translate("Inspect the visible evidence")}</h3>
            <p>{translate("Review")} {inspection}{translate(". Compare more than one angle and record missing views or measurements as unknowns.")}</p>
          </article>
          <article>
            <span>03</span>
            <h3>{translate("Verify current facts")}</h3>
            <p>{translate("Check the current price, available variants, size information, availability and seller or source details on the main-site product page before deciding.")}</p>
          </article>
        </div>
      </section>
      <section className="product-source-panel">
        <div><p className="eyebrow">{translate("Evidence boundary")}</p><h2>{translate("Listing media is not automatically QC media.")}</h2></div>
        <div>
          <p>{translate("UUFinds publicly describes QC-photo and QC-video discovery, image recognition and supported link handling, while also stating that it does not sell products. This independent page likewise does not process an order. It identifies the main-site product, explains what to inspect and keeps the final destination explicit.")}</p>
          <div className="product-source-links">
            <a href={product.mainSiteUrl} target="_blank" rel="noreferrer" data-track-event="product_click" data-item-id={product.listingId} data-category={product.category} data-cta-position="localized_product_source">{translate("Main-site details ↗")}</a>
            <a href={product.categoryUrl} target="_blank" rel="noreferrer" data-track-event="category_click" data-category={product.category} data-cta-position="localized_product_source">{translate("More")} {category} ↗</a>
            <Link href={`/${locale}/guides/uufinds-qc-checklist/`}>{translate("QC checklist →")}</Link>
          </div>
        </div>
      </section>
      <SiteFooter locale={locale} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemPage",
        name: product.name,
        description: `${t.productDetail}: ${product.name}`,
        url: `https://uufindssheet.com/${locale}/products/${product.slug}/`,
        primaryImageOfPage: product.images[0],
        dateModified: "2026-09-01",
        inLanguage: t.lang,
        mainEntity: {
          "@type": "Product",
          name: product.name,
          image: product.images,
          sku: product.listingId,
          category,
          url: product.mainSiteUrl,
          offers: {
            "@type": "Offer",
            priceCurrency: "USD",
            price: product.price,
            url: product.mainSiteUrl,
          },
        },
      }) }} />
    </main>
  );
}
