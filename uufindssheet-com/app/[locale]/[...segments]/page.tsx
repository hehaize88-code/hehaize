import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "../../components/site-header";
import { SiteFooter } from "../../components/site-footer";
import { DocumentLanguage } from "../../components/document-language";
import { SiteImage } from "../../components/site-image";
import { guides } from "../../guides/article-data";
import { products } from "../../products/product-data";
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
    questions: ["Is this the official UUFinds website?", "Does a QC photo guarantee product quality?", "What should I check on the destination page?"],
    answers: ["No. This is an independent editorial guide.", "No. QC material records a particular item or batch and does not replace your own assessment.", "Check the item, seller, price, variants, measurements and current shipping and service terms."],
  },
  de: {
    lang: "de", region: "DE", guide: "Leitfaden", products: "Produkte", articles: "Ratgeber", faq: "Häufige Fragen",
    finds: "Produktfunde nach Kategorie", how: "So funktioniert die UUFinds-Recherche",
    intro: "Unabhängige, praktische Informationen für die Produktsuche, den Vergleich von QC-Material und die anschließende Prüfung der aktuellen CNBuy-Sheet-Seite.",
    view: "Produktdetails ansehen", read: "Ratgeber lesen", price: "Angezeigter Referenzpreis", open: "Bei CNBuy Sheet öffnen ↗",
    check: "Prüfe vor einer Entscheidung immer den aktuellen Preis, die Varianten, Größenangaben, den Verkäuferlink und die verfügbaren QC-Aufnahmen.",
    questions: ["Ist diese Website die offizielle UUFinds-Seite?", "Garantiert ein QC-Foto die Produktqualität?", "Was sollte ich auf der Zielseite prüfen?"],
    answers: ["Nein. Dies ist ein unabhängiger redaktioneller Ratgeber.", "Nein. QC-Material ist ein Hinweis zu einem bestimmten Artikel oder einer Charge und ersetzt keine eigene Prüfung.", "Kontrolliere Artikel, Verkäufer, Preis, Varianten, Maße sowie aktuelle Versand- und Servicebedingungen."],
  },
  pl: {
    lang: "pl", region: "PL", guide: "Przewodnik", products: "Produkty", articles: "Poradniki", faq: "Najczęstsze pytania",
    finds: "Znaleziska według kategorii", how: "Jak działa wyszukiwanie z UUFinds",
    intro: "Niezależne, praktyczne informacje o wyszukiwaniu produktów, porównywaniu materiałów QC i sprawdzaniu aktualnej strony w CNBuy Sheet.",
    view: "Zobacz szczegóły produktu", read: "Przeczytaj poradnik", price: "Wyświetlana cena orientacyjna", open: "Otwórz w CNBuy Sheet ↗",
    check: "Przed podjęciem decyzji zawsze sprawdź aktualną cenę, warianty, rozmiary, link sprzedawcy i dostępne materiały QC.",
    questions: ["Czy to oficjalna strona UUFinds?", "Czy zdjęcie QC gwarantuje jakość?", "Co sprawdzić na stronie docelowej?"],
    answers: ["Nie. To niezależny przewodnik redakcyjny.", "Nie. Materiały QC dotyczą konkretnego produktu lub partii i nie zastępują własnej oceny.", "Sprawdź produkt, sprzedawcę, cenę, warianty, wymiary oraz aktualne warunki wysyłki i obsługi."],
  },
  "pt-br": {
    lang: "pt-BR", region: "BR", guide: "Guia", products: "Produtos", articles: "Guias", faq: "Perguntas frequentes",
    finds: "Achados por categoria", how: "Como funciona a pesquisa com UUFinds",
    intro: "Informações independentes e práticas para pesquisar produtos, comparar materiais de QC e conferir a página atual no CNBuy Sheet.",
    view: "Ver detalhes do produto", read: "Ler o guia", price: "Preço de referência exibido", open: "Abrir no CNBuy Sheet ↗",
    check: "Antes de decidir, confirme sempre o preço atual, as variantes, os tamanhos, o link do vendedor e os materiais de QC disponíveis.",
    questions: ["Este é o site oficial do UUFinds?", "Uma foto de QC garante a qualidade?", "O que conferir na página de destino?"],
    answers: ["Não. Este é um guia editorial independente.", "Não. O material de QC registra um item ou lote específico e não substitui sua própria avaliação.", "Confira produto, vendedor, preço, variantes, medidas e as condições atuais de envio e serviço."],
  },
} as const;

const corePaths = ["finds", "products", "how-it-works", "articles", "faq"];
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

export async function generateMetadata({ params }: { params: Promise<{ locale: string; segments: string[] }> }): Promise<Metadata> {
  const { locale, segments } = await params;
  if (!locales.includes(locale as Locale)) return {};
  const t = text[locale as Locale];
  const route = segments.join("/");
  const product = segments[0] === "products" ? products.find((item) => item.slug === segments[1]) : undefined;
  const guide = segments[0] === "guides" ? guides.find((item) => item.slug === segments[1]) : undefined;
  const routeCopy = locale === "en-gb" ? undefined : localizedRouteCopy[locale as Exclude<Locale, "en-gb">];
  const guideCopy = guide ? routeCopy?.guides[guide.slug] : undefined;
  const title = product ? `${product.shortName} – ${t.guide} QC` : guide ? `${guideCopy?.title ?? guide.title} – ${t.guide}` : `${route === "faq" ? t.faq : route === "articles" ? t.articles : route === "products" ? t.products : route === "finds" ? t.finds : t.how} | UUFinds Sheet`;
  const path = `/${locale}/${route}/`;
  const description = guideCopy?.description ?? `${t.intro} ${t.check}`;
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
  const t = text[locale as Locale];
  const route = segments.join("/");
  const routePath = `/${route}/`;
  const product = segments[0] === "products" && segments.length === 2 ? products.find((item) => item.slug === segments[1]) : undefined;
  const guide = segments[0] === "guides" ? guides.find((item) => item.slug === segments[1]) : undefined;
  const routeCopy = locale === "en-gb" ? undefined : localizedRouteCopy[locale as Exclude<Locale, "en-gb">];
  const guideCopy = guide ? routeCopy?.guides[guide.slug] : undefined;
  const validCore = corePaths.includes(route);
  if (!validCore && !product && !guide) notFound();

  const title = product ? product.shortName : guide ? guideCopy?.title ?? guide.title : route === "faq" ? t.faq : route === "articles" ? t.articles : route === "products" ? t.products : route === "finds" ? t.finds : t.how;

  return (
    <main className="inner-page">
      <DocumentLanguage language={t.lang} />
      <SiteHeader locale={t.region} routePath={routePath} />
      <section className="page-hero compact-page-hero">
        <p className="eyebrow">{t.guide} / {t.region}</p>
        <h1>{title}</h1>
        <p>{t.intro}</p>
      </section>

      {route === "products" || route === "finds" ? (
        <section className="product-showcase-section">
          <div className="product-showcase-grid">
            {products.map((item) => (
              <Link className="product-card" href={`/${locale}/products/${item.slug}/`} key={item.slug}>
                <div className="product-card-image"><SiteImage src={item.images[0]} alt={item.name} width={800} height={800} /></div>
                <div className="product-card-copy"><p>{routeCopy?.categories[item.category] ?? item.category}</p><h2>{item.shortName}</h2><div><span>¥{item.price}</span><b>{t.view} ↗</b></div></div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {route === "articles" ? (
        <section className="articles-section"><div className="article-grid">
          {guides.map((item) => {
            const copy = routeCopy?.guides[item.slug];
            return <Link className="article-card" href={`/${locale}/guides/${item.slug}/`} key={item.slug}><h2>{copy?.title ?? item.title}</h2><p>{copy?.description ?? item.description}</p><b>{t.read} →</b></Link>;
          })}
        </div></section>
      ) : null}

      {route === "faq" ? (
        <section className="faq-section"><div className="faq-list">{t.questions.map((question, index) => <details open={index === 0} key={question}><summary>{question}<span>+</span></summary><p>{t.answers[index]}</p></details>)}</div></section>
      ) : null}

      {route === "how-it-works" ? (
        <section className="workflow-section"><div className="workflow-grid">
          <article><span>01</span><h2>UUFinds</h2><p>{t.intro}</p></article>
          <article><span>02</span><h2>QC</h2><p>{t.check}</p></article>
          <article><span>03</span><h2>CNBuy Sheet</h2><a href="https://www.cnbuycha.com/AllProducts/" target="_blank" rel="noreferrer">{t.open}</a></article>
        </div></section>
      ) : null}

      {product ? (
        <section className="product-detail-layout">
          <div className="product-detail-gallery"><SiteImage src={product.images[0]} alt={product.name} width={900} height={900} /></div>
          <article className="product-detail-copy"><p>{routeCopy?.categories[product.category] ?? product.category}</p><h2>{product.name}</h2><p>{routeCopy?.inspections[product.slug] ?? product.inspectionFocus}</p><p><strong>{t.price}:</strong> ¥{product.price}</p><p>{t.check}</p><a className="product-cta" href={product.mainSiteUrl} target="_blank" rel="noreferrer">{t.open}</a></article>
        </section>
      ) : null}

      {guide ? (
        <article className="guide-article"><p className="article-lead">{guideCopy?.description ?? guide.description}</p><p>{t.intro}</p><h2>{guideCopy?.sectionTitle ?? "QC"}</h2><p>{t.check}</p>{(guideCopy?.paragraphs ?? [guide.sections[0]?.paragraphs?.[0] ?? "", guide.sections[1]?.paragraphs?.[0] ?? ""]).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<a href="https://www.cnbuycha.com/AllProducts/" target="_blank" rel="noreferrer">{t.open}</a></article>
      ) : null}
      <SiteFooter locale={locale as Locale} />
      {guide ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Article",
            headline: guideCopy?.title ?? guide.title,
            description: guideCopy?.description ?? guide.description,
            image: `https://uufindssheet.com${socialImage.url}`,
            dateModified: guide.modifiedISO ?? "2026-07-22",
            datePublished: "2026-07-22",
            inLanguage: t.lang,
            author: { "@type": "Organization", name: "UUFinds Sheet Editorial" },
            publisher: { "@type": "Organization", name: "UUFinds Sheet" },
            mainEntityOfPage: `https://uufindssheet.com/${locale}/guides/${guide.slug}/`,
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `https://uufindssheet.com/${locale}/` },
              { "@type": "ListItem", position: 2, name: t.articles, item: `https://uufindssheet.com/${locale}/articles/` },
              { "@type": "ListItem", position: 3, name: guideCopy?.title ?? guide.title, item: `https://uufindssheet.com/${locale}/guides/${guide.slug}/` },
            ],
          },
        ],
      }) }} /> : null}
    </main>
  );
}
