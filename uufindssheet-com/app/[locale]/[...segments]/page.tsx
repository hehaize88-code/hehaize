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

const locales = ["en-gb", "de", "pl", "pt-br"] as const;
type Locale = (typeof locales)[number];

const text = {
  "en-gb": {
    lang: "en-GB", region: "UK", guide: "Guide", products: "Products", articles: "Guides", faq: "Frequently asked questions",
    finds: "Product finds by category", how: "How UUFinds research works",
    intro: "Independent, practical information for researching products, comparing available QC material and checking the current CNBuy Sheet page.",
    view: "View product details", read: "Read the guide", price: "Displayed reference price", open: "Open on CNBuy Sheet ↗",
    check: "Before deciding, always confirm the current price, variants, sizing, seller link and available QC material.",
    backProducts: "Back to product finds", allGuides: "All guides", home: "Home", productDetail: "Product detail",
    listingNote: "These images belong to the corresponding CNBuy Sheet listing and are not presented as a UUFinds warehouse QC album.",
    questions: ["Is this the official UUFinds website?", "Does a QC photo guarantee product quality?", "What should I check on the destination page?"],
    answers: ["No. This is an independent editorial guide.", "No. QC material records a particular item or batch and does not replace your own assessment.", "Check the item, seller, price, variants, measurements and current shipping and service terms."],
  },
  de: {
    lang: "de", region: "DE", guide: "Leitfaden", products: "Produkte", articles: "Ratgeber", faq: "Häufige Fragen",
    finds: "Produktfunde nach Kategorie", how: "So funktioniert die UUFinds-Recherche",
    intro: "Unabhängige, praktische Informationen für die Produktsuche, den Vergleich von QC-Material und die anschließende Prüfung der aktuellen CNBuy-Sheet-Seite.",
    view: "Produktdetails ansehen", read: "Ratgeber lesen", price: "Angezeigter Referenzpreis", open: "Bei CNBuy Sheet öffnen ↗",
    check: "Prüfe vor einer Entscheidung immer den aktuellen Preis, die Varianten, Größenangaben, den Verkäuferlink und die verfügbaren QC-Aufnahmen.",
    backProducts: "Zurück zu den Produkten", allGuides: "Alle Ratgeber", home: "Startseite", productDetail: "Produktdetail",
    listingNote: "Diese Bilder gehören zum entsprechenden CNBuy-Sheet-Angebot und werden nicht als UUFinds-Warehouse-QC-Album dargestellt.",
    questions: ["Ist diese Website die offizielle UUFinds-Seite?", "Garantiert ein QC-Foto die Produktqualität?", "Was sollte ich auf der Zielseite prüfen?"],
    answers: ["Nein. Dies ist ein unabhängiger redaktioneller Ratgeber.", "Nein. QC-Material ist ein Hinweis zu einem bestimmten Artikel oder einer Charge und ersetzt keine eigene Prüfung.", "Kontrolliere Artikel, Verkäufer, Preis, Varianten, Maße sowie aktuelle Versand- und Servicebedingungen."],
  },
  pl: {
    lang: "pl", region: "PL", guide: "Przewodnik", products: "Produkty", articles: "Poradniki", faq: "Najczęstsze pytania",
    finds: "Znaleziska według kategorii", how: "Jak działa wyszukiwanie z UUFinds",
    intro: "Niezależne, praktyczne informacje o wyszukiwaniu produktów, porównywaniu materiałów QC i sprawdzaniu aktualnej strony w CNBuy Sheet.",
    view: "Zobacz szczegóły produktu", read: "Przeczytaj poradnik", price: "Wyświetlana cena orientacyjna", open: "Otwórz w CNBuy Sheet ↗",
    check: "Przed podjęciem decyzji zawsze sprawdź aktualną cenę, warianty, rozmiary, link sprzedawcy i dostępne materiały QC.",
    backProducts: "Wróć do produktów", allGuides: "Wszystkie poradniki", home: "Strona główna", productDetail: "Szczegóły produktu",
    listingNote: "Te zdjęcia pochodzą z odpowiedniej oferty CNBuy Sheet i nie są przedstawiane jako magazynowy album QC z UUFinds.",
    questions: ["Czy to oficjalna strona UUFinds?", "Czy zdjęcie QC gwarantuje jakość?", "Co sprawdzić na stronie docelowej?"],
    answers: ["Nie. To niezależny przewodnik redakcyjny.", "Nie. Materiały QC dotyczą konkretnego produktu lub partii i nie zastępują własnej oceny.", "Sprawdź produkt, sprzedawcę, cenę, warianty, wymiary oraz aktualne warunki wysyłki i obsługi."],
  },
  "pt-br": {
    lang: "pt-BR", region: "BR", guide: "Guia", products: "Produtos", articles: "Guias", faq: "Perguntas frequentes",
    finds: "Achados por categoria", how: "Como funciona a pesquisa com UUFinds",
    intro: "Informações independentes e práticas para pesquisar produtos, comparar materiais de QC e conferir a página atual no CNBuy Sheet.",
    view: "Ver detalhes do produto", read: "Ler o guia", price: "Preço de referência exibido", open: "Abrir no CNBuy Sheet ↗",
    check: "Antes de decidir, confirme sempre o preço atual, as variantes, os tamanhos, o link do vendedor e os materiais de QC disponíveis.",
    backProducts: "Voltar aos produtos", allGuides: "Todos os guias", home: "Início", productDetail: "Detalhes do produto",
    listingNote: "Estas imagens pertencem ao anúncio correspondente no CNBuy Sheet e não são apresentadas como um álbum de QC de armazém do UUFinds.",
    questions: ["Este é o site oficial do UUFinds?", "Uma foto de QC garante a qualidade?", "O que conferir na página de destino?"],
    answers: ["Não. Este é um guia editorial independente.", "Não. O material de QC registra um item ou lote específico e não substitui sua própria avaliação.", "Confira produto, vendedor, preço, variantes, medidas e as condições atuais de envio e serviço."],
  },
} as const;

const policySlugs = ["about", "contact", "editorial-policy", "privacy", "terms"] as const;
const corePaths = ["finds", "products", "how-it-works", "articles", "faq", ...policySlugs];
const allSegments = [
  ...corePaths.map((path) => [path]),
  ...products.map((product) => ["products", product.slug]),
  ...guides.map((guide) => ["guides", guide.slug]),
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
      "en-US": path.replace(/^\/(en-gb|de|pl|pt-br)/, ""),
      "en-GB": path.replace(/^\/(en-gb|de|pl|pt-br)/, "/en-gb"),
      de: path.replace(/^\/(en-gb|de|pl|pt-br)/, "/de"),
      pl: path.replace(/^\/(en-gb|de|pl|pt-br)/, "/pl"),
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
  const t = text[locale as Locale];
  const route = segments.join("/");
  const product = segments[0] === "products" ? products.find((item) => item.slug === segments[1]) : undefined;
  const guide = segments[0] === "guides" ? guides.find((item) => item.slug === segments[1]) : undefined;
  const policy = segments.length === 1 && isPolicySlug(route) ? policyPages[route] : undefined;
  const routeCopy = locale === "en-gb" ? undefined : localizedRouteCopy[locale as Exclude<Locale, "en-gb">];
  const guideCopy = guide ? routeCopy?.guides[guide.slug] : undefined;
  const title = policy
    ? `${policy.title} | UUFinds Sheet`
    : product
      ? `${product.shortName} – ${t.guide} QC`
      : guide
        ? `${guideCopy?.title ?? guide.title} – ${t.guide}`
        : `${route === "faq" ? t.faq : route === "articles" ? t.articles : route === "products" ? t.products : route === "finds" ? t.finds : t.how} | UUFinds Sheet`;
  const path = `/${locale}/${route}/`;
  const description = policy?.description ?? guideCopy?.description ?? `${t.intro} ${t.check}`;
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
  const guide = segments[0] === "guides" ? guides.find((item) => item.slug === segments[1]) : undefined;
  const policy = segments.length === 1 && isPolicySlug(route) ? policyPages[route] : undefined;
  const routeCopy = currentLocale === "en-gb" ? undefined : localizedRouteCopy[currentLocale as Exclude<Locale, "en-gb">];
  const guideCopy = guide ? routeCopy?.guides[guide.slug] : undefined;
  if (!corePaths.includes(route) && !product && !guide) notFound();

  if (policy) {
    return (
      <main className="trust-page">
        <DocumentLanguage language={t.lang} />
        <SiteHeader locale={t.region} routePath={`/${policy.slug}/`} />
        <nav className="trust-breadcrumb" aria-label="Breadcrumb">
          <Link href={`/${currentLocale}/`}>{t.home}</Link><span>/</span><strong>{policy.title}</strong>
        </nav>
        <header className="trust-page-hero">
          <p className="eyebrow">{policy.eyebrow}</p>
          <h1>{policy.title}</h1>
          <p>{policy.description}</p>
          <small>Last updated {policy.updated}</small>
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
          {policy.contactEmail && <aside className="trust-contact-card"><p className="eyebrow inverse">Direct contact</p><a href={`mailto:${policy.contactEmail}`}>{policy.contactEmail}</a></aside>}
        </article>
        <SiteFooter locale={currentLocale} />
      </main>
    );
  }

  if (product) {
    return <LocalizedProduct locale={currentLocale} product={product} />;
  }

  if (guide) {
    const title = guideCopy?.title ?? guide.title;
    const description = guideCopy?.description ?? guide.description;
    const localizedSections = guideCopy
      ? [
          { heading: guideCopy.sectionTitle, paragraphs: [...guideCopy.paragraphs] },
          { heading: "QC", paragraphs: [t.check] },
          { heading: "CNBuy Sheet", paragraphs: [t.intro] },
        ]
      : guide.sections;
    return (
      <main className="guide-page">
        <DocumentLanguage language={t.lang} />
        <SiteHeader locale={t.region} routePath={`/guides/${guide.slug}/`} />
        <div className="guide-subnav"><Link className="back-link" href={`/${currentLocale}/articles/`}>← {t.allGuides}</Link></div>
        <article>
          <div className="guide-hero">
            <p className="eyebrow">{guide.label} / {t.guide}</p>
            <h1>{title}</h1>
            <p className="guide-deck">{description}</p>
            <div className="guide-byline"><span>Updated {guide.updated}</span><span>{guide.readTime}</span><span>Evidence-led editorial</span></div>
          </div>
          <div className="guide-layout">
            <aside>
              <p>ON THIS PAGE</p>
              {localizedSections.map((section, index) => <a href={`#section-${index + 1}`} key={section.heading}>{String(index + 1).padStart(2, "0")} — {section.heading.replace(/^\d+\.\s*/, "")}</a>)}
            </aside>
            <div className="guide-body">
              <p className="lead">{description}</p>
              <p className="lead">{t.intro}</p>
              {localizedSections.map((section, index) => (
                <section id={`section-${index + 1}`} key={section.heading}>
                  <p className="section-number">{String(index + 1).padStart(2, "0")}</p>
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {"points" in section && section.points && <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul>}
                </section>
              ))}
              <div className="source-note">
                <p className="eyebrow">Primary source notes</p>
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

  const title = route === "faq" ? t.faq : route === "articles" ? t.articles : route === "products" ? t.products : route === "finds" ? t.finds : t.how;
  return (
    <main className={`hub-page${route === "faq" ? " faq-page" : ""}`}>
      <DocumentLanguage language={t.lang} />
      <SiteHeader locale={t.region} routePath={`/${route}/`} />
      <section className={`hub-hero${route === "faq" ? " faq-hero" : route === "articles" ? " article-hub-hero" : ""}`}>
        <p className="eyebrow">{t.guide} / {t.region}</p>
        <h1>{title}<br /><em>UUFinds Sheet</em></h1>
        <p>{t.intro}</p>
      </section>
      <section className={`hub-content${route === "faq" ? " faq-page-content" : route === "how-it-works" ? " how-page-content" : ""}`}>
        {route === "finds" && (
          <>
            <div className="category-grid">
              {categories.map((category) => (
                <a className="category-card" href={category.href} target="_blank" rel="noreferrer" key={category.name}>
                  <div className={`category-code ${category.color}`}>{category.code}</div>
                  <div className="category-symbol" aria-hidden="true">{category.name.slice(0, 2).toUpperCase()}</div>
                  <h2>{routeCopy?.categories[category.name] ?? category.name}</h2>
                  <p>{category.note}</p><span className="card-arrow" aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
            <EvidenceMatrix title={t.finds} intro={t.intro} check={t.check} />
          </>
        )}

        {route === "products" && (
          <>
            <ProductGrid locale={currentLocale} t={t} routeCopy={routeCopy} />
            <EvidenceMatrix title={t.products} intro={t.intro} check={t.check} />
          </>
        )}

        {route === "articles" && (
          <>
            <div className="official-fact-strip article-standard">
              <article><span>01</span><div><strong>Source</strong><p>{t.intro}</p></div></article>
              <article><span>02</span><div><strong>Evidence</strong><p>{t.check}</p></div></article>
              <article><span>03</span><div><strong>Destination</strong><p>CNBuy Sheet</p></div></article>
            </div>
            <div className="article-grid article-hub-grid">
              {articleCards.map((article, index) => {
                const slug = article.href.split("/").filter(Boolean).pop() ?? "";
                const copy = routeCopy?.guides[slug];
                return (
                  <Link href={`/${currentLocale}${article.href}`} className={`article-card${article.featured ? " article-card-featured" : ""}`} key={article.href}>
                    <div className="article-meta"><span>{article.tag}</span><b>{String(index + 1).padStart(2, "0")}</b></div>
                    <h2>{copy?.title ?? article.title}</h2><p>{copy?.description ?? article.summary}</p>
                    <div className="article-foot"><span>{article.read}</span><b>{t.read} ↗</b></div>
                  </Link>
                );
              })}
            </div>
          </>
        )}

        {route === "faq" && (
          <>
            <div className="official-fact-strip">
              <article><span>01</span><div><strong>QC</strong><p>{t.intro}</p></div></article>
              <article><span>02</span><div><strong>Match</strong><p>{t.check}</p></div></article>
              <article><span>03</span><div><strong>Live page</strong><p>CNBuy Sheet</p></div></article>
            </div>
            <div className="faq-directory">
              <aside aria-label="FAQ topics"><p className="eyebrow">{t.faq}</p><a href="#questions">01 / {t.guide}</a></aside>
              <div className="faq-groups">
                <section id="questions" className="faq-group">
                  <p className="eyebrow">01 / {t.faq}</p><h2>{t.faq}</h2>
                  <div className="faq-list">
                    {t.questions.map((question, index) => <details open={index === 0} key={question}><summary>{question}<span>+</span></summary><p>{t.answers[index]}</p></details>)}
                  </div>
                </section>
              </div>
            </div>
          </>
        )}

        {route === "how-it-works" && (
          <>
            <div className="official-fact-strip" aria-label="Verified UUFinds functions">
              <article><span>01</span><div><strong>UUFinds</strong><p>{t.intro}</p></div></article>
              <article><span>02</span><div><strong>QC</strong><p>{t.check}</p></div></article>
              <article><span>03</span><div><strong>CNBuy Sheet</strong><p>{t.open}</p></div></article>
            </div>
            <div className="workflow-grid">
              <article><span>01</span><p className="step-label">MATCH</p><h2>UUFinds</h2><p>{t.intro}</p><Link href={`/${currentLocale}/finds/`}>{t.finds} →</Link></article>
              <article><span>02</span><p className="step-label">INSPECT</p><h2>QC</h2><p>{t.check}</p><Link href={`/${currentLocale}/guides/uufinds-qc-checklist/`}>{t.guide} →</Link></article>
              <article><span>03</span><p className="step-label">CONFIRM</p><h2>CNBuy Sheet</h2><p>{t.check}</p><Link href={`/${currentLocale}/products/`}>{t.products} →</Link></article>
            </div>
            <EvidenceMatrix title={t.how} intro={t.intro} check={t.check} />
          </>
        )}

        <div className="source-method-note"><p className="eyebrow">Research boundary</p><p>{t.intro} {t.check}</p></div>
      </section>
      <SiteFooter locale={currentLocale} />
    </main>
  );
}

function ProductGrid({
  locale,
  t,
  routeCopy,
}: {
  locale: Locale;
  t: (typeof text)[Locale];
  routeCopy: (typeof localizedRouteCopy)[Exclude<Locale, "en-gb">] | undefined;
}) {
  return (
    <div className="product-showcase-grid">
      {products.map((item, index) => (
        <Link className="product-card" href={`/${locale}/products/${item.slug}/`} key={item.slug}>
          <div className="product-card-image">
            <SiteImage src={item.images[0]} alt={item.name} width={800} height={800} />
            <span>{String(index + 1).padStart(2, "0")} / 08</span>
          </div>
          <div className="product-card-copy"><p>{routeCopy?.categories[item.category] ?? item.category}</p><h2>{item.shortName}</h2><div><span>¥{item.price}</span><b>{t.view} ↗</b></div></div>
        </Link>
      ))}
    </div>
  );
}

function EvidenceMatrix({ title, intro, check }: { title: string; intro: string; check: string }) {
  return (
    <section className="evidence-matrix">
      <div className="section-heading"><div><p className="eyebrow">UUFinds / QC / CNBuy Sheet</p><h2>{title}</h2></div><p>{intro}</p></div>
      <div className="evidence-grid">
        <article><p className="step-label">SOURCE LINK</p><h3>Match the exact item</h3><p>{intro}</p><strong>{check}</strong></article>
        <article><p className="step-label">QC PHOTO</p><h3>Inspect visible evidence</h3><p>{check}</p><strong>A photographed item is not a guarantee for every later unit.</strong></article>
        <article><p className="step-label">QC VIDEO</p><h3>Check motion and hidden angles</h3><p>{intro}</p><strong>Record missing evidence as unknown.</strong></article>
        <article><p className="step-label">LIVE PAGE</p><h3>Confirm current facts</h3><p>{check}</p><strong>Use the current CNBuy Sheet page for live listing data.</strong></article>
      </div>
    </section>
  );
}

function LocalizedProduct({ locale, product }: { locale: Locale; product: ProductFind }) {
  const t = text[locale];
  const routeCopy = locale === "en-gb" ? undefined : localizedRouteCopy[locale as Exclude<Locale, "en-gb">];
  const category = routeCopy?.categories[product.category] ?? product.category;
  const inspection = routeCopy?.inspections[product.slug] ?? product.inspectionFocus;
  return (
    <main className="product-page">
      <DocumentLanguage language={t.lang} />
      <SiteHeader locale={t.region} routePath={`/products/${product.slug}/`} />
      <div className="guide-subnav"><Link className="back-link" href={`/${locale}/products/`}>← {t.backProducts}</Link></div>
      <div className="product-breadcrumb" aria-label="Breadcrumb">
        <Link href={`/${locale}/`}>{t.home}</Link><span>/</span><a href={product.categoryUrl} target="_blank" rel="noreferrer">{category}</a><span>/</span><strong>{t.productDetail}</strong>
      </div>
      <article className="product-detail">
        <div className="product-gallery">
          <div className="product-main-image">
            <SiteImage src={product.images[0]} alt={product.name} width={1200} height={1200} priority />
            <span>01 / {String(product.images.length).padStart(2, "0")}</span>
          </div>
          <div className="product-thumbnails" aria-label="Additional product images">
            {product.images.slice(1).map((image, index) => (
              <div key={image}><SiteImage src={image} alt={`${product.name} — view ${index + 2}`} width={700} height={700} /><span>{String(index + 2).padStart(2, "0")}</span></div>
            ))}
          </div>
        </div>
        <div className="product-summary">
          <p className="eyebrow">{category}</p><h1>{product.shortName}</h1><p className="product-deck">{t.listingNote}</p>
          <div className="product-price-row"><div><small>{t.price}</small><strong>¥{product.price}</strong></div><div><small>MAIN-SITE ID</small><strong>{product.listingId}</strong></div></div>
          <a className="primary-product-cta" href={product.mainSiteUrl} target="_blank" rel="noreferrer">{t.open}</a>
          <div className="live-note"><strong>{product.checked}</strong><p>{t.check}</p></div>
        </div>
      </article>
      <section className="product-checks">
        <div><p className="eyebrow inverse">UUFinds / QC</p><h2>{t.how}</h2></div>
        <div className="product-check-grid">
          <article><span>01</span><h3>Match</h3><p>{t.intro}</p></article>
          <article><span>02</span><h3>Inspect</h3><p>{inspection}</p></article>
          <article><span>03</span><h3>Verify</h3><p>{t.check}</p></article>
        </div>
      </section>
      <section className="product-source-panel">
        <div><p className="eyebrow">Evidence boundary</p><h2>{t.listingNote}</h2></div>
        <div><p>{t.intro}</p><div className="product-source-links"><a href={product.mainSiteUrl} target="_blank" rel="noreferrer">{t.open}</a><a href={product.categoryUrl} target="_blank" rel="noreferrer">{category} ↗</a><Link href={`/${locale}/guides/uufinds-qc-checklist/`}>{t.guide} →</Link></div></div>
      </section>
      <SiteFooter locale={locale} />
    </main>
  );
}
