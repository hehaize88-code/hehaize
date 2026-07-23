import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { DocumentLanguage } from "../components/document-language";
import { ResponsiveHeroImage, SiteImage } from "../components/site-image";
import { products } from "../products/product-data";
import { articleCards, categories } from "../site-data";
import { socialImage } from "../seo-image";

const localized = {
  de: {
    region: "DE",
    htmlTitle: "UUFinds Spreadsheet & QC Guide auf Deutsch",
    description: "Deutschsprachiger UUFinds- und QC-Leitfaden mit direkten Kategorien und Produktseiten bei CNBuy Sheet.",
    eyebrow: "Unabhängiger Leitfaden / Deutsch",
    title: "Produkte recherchieren.",
    accent: "Gezielt bei CNBuy Sheet öffnen.",
    intro: "Nutze Kategorien für die Produktsuche, prüfe vorhandene QC-Bilder und öffne anschließend die passende aktuelle Produktseite bei CNBuy Sheet.",
    search: "Schuhe, Hoodies oder Zubehör suchen",
    searchButton: "Bei CNBuy Sheet suchen ↗",
    categoryTitle: "Mit einer Kategorie beginnen.",
    categoryIntro: "Jeder Link führt direkt zum passenden Bereich bei CNBuy Sheet.",
    articleLabel: "SEO-Ratgeber / 2026",
    articleTitle: "Vom UUFinds-QC-Check zum passenden Produkt",
    articleText: "Der ausführliche Leitfaden erklärt die getrennten Schritte: entdecken, QC-Material vergleichen und die aktuelle Produktseite verifizieren.",
    articleButton: "Vollständigen Ratgeber lesen →",
    nav: { finds: "Funde", products: "Produkte", qcGuide: "QC-Leitfaden", howItWorks: "So funktioniert es", articles: "Artikel", faq: "FAQ", shopMain: "CNBuy Sheet öffnen", language: "Sprache" },
    names: ["Schuhe", "Hoodies", "T-Shirts", "Jacken", "Hosen", "Kopfbedeckungen", "Accessoires", "Trikots", "Elektronik"],
    notes: ["Sneaker & Schuhe", "Pullover & Sweatshirts", "Shirts & Oberteile", "Mäntel & Oberbekleidung", "Hosen & Shorts", "Caps & Hüte", "Taschen, Geldbörsen & mehr", "Teamwear-Funde", "Technik & Geräte"],
    marketText: "Fünf wichtige UUFinds-Märkte",
    marketNote: "Aktuelle öffentliche Traffic-Schätzung",
  },
  pl: {
    region: "PL",
    htmlTitle: "UUFinds Spreadsheet i poradnik QC po polsku",
    description: "Polski przewodnik po UUFinds i kontroli QC z bezpośrednimi kategoriami oraz stronami produktów CNBuy Sheet.",
    eyebrow: "Niezależny przewodnik / Polski",
    title: "Sprawdź produkt.",
    accent: "Otwórz właściwą ofertę.",
    intro: "Przeglądaj kategorie, porównuj dostępne zdjęcia QC, a następnie przejdź do aktualnej strony odpowiedniego produktu w CNBuy Sheet.",
    search: "Szukaj butów, bluz lub akcesoriów",
    searchButton: "Szukaj w CNBuy Sheet ↗",
    categoryTitle: "Zacznij od kategorii.",
    categoryIntro: "Każdy skrót otwiera właściwą kategorię CNBuy Sheet.",
    articleLabel: "PORADNIK SEO / 2026",
    articleTitle: "Od kontroli QC w UUFinds do właściwego produktu",
    articleText: "Pełny poradnik oddziela trzy decyzje: odkrywanie produktów, analizę materiałów QC i weryfikację aktualnej oferty.",
    articleButton: "Przeczytaj pełny poradnik →",
    nav: { finds: "Znaleziska", products: "Produkty", qcGuide: "Poradnik QC", howItWorks: "Jak to działa", articles: "Artykuły", faq: "FAQ", shopMain: "Otwórz CNBuy Sheet", language: "Język" },
    names: ["Buty", "Bluzy", "T-shirty", "Kurtki", "Spodnie", "Nakrycia głowy", "Akcesoria", "Koszulki sportowe", "Elektronika"],
    notes: ["Sneakersy i obuwie", "Swetry i bluzy", "Koszulki i topy", "Płaszcze i odzież wierzchnia", "Spodnie i szorty", "Czapki i kapelusze", "Torby, portfele i więcej", "Odzież drużynowa", "Technologia i urządzenia"],
    marketText: "Pięć ważnych rynków UUFinds",
    marketNote: "Aktualny publiczny szacunek ruchu",
  },
  "pt-br": {
    region: "BR",
    htmlTitle: "Planilha UUFinds e guia de QC em português",
    description: "Guia brasileiro independente sobre UUFinds e QC, com categorias e páginas de produtos diretas no CNBuy Sheet.",
    eyebrow: "Guia independente / Português do Brasil",
    title: "Pesquise o produto.",
    accent: "Abra o anúncio certo.",
    intro: "Use as categorias para descobrir produtos, compare as imagens de QC disponíveis e depois confirme a página atual do item no CNBuy Sheet.",
    search: "Buscar tênis, moletons ou acessórios",
    searchButton: "Buscar no CNBuy Sheet ↗",
    categoryTitle: "Comece por uma categoria.",
    categoryIntro: "Cada atalho abre a categoria correspondente no CNBuy Sheet.",
    articleLabel: "GUIA SEO / 2026",
    articleTitle: "Da pesquisa de QC no UUFinds ao produto correto",
    articleText: "O guia completo separa descoberta, comparação de evidências de QC e verificação da página atual do produto.",
    articleButton: "Ler o guia completo →",
    nav: { finds: "Achados", products: "Produtos", qcGuide: "Guia de QC", howItWorks: "Como funciona", articles: "Artigos", faq: "FAQ", shopMain: "Abrir CNBuy Sheet", language: "Idioma" },
    names: ["Tênis", "Moletons", "Camisetas", "Jaquetas", "Calças", "Bonés", "Acessórios", "Camisas esportivas", "Eletrônicos"],
    notes: ["Tênis e calçados", "Suéteres e moletons", "Camisetas e blusas", "Casacos e agasalhos", "Calças e shorts", "Bonés e chapéus", "Bolsas, carteiras e mais", "Roupas esportivas", "Tecnologia e dispositivos"],
    marketText: "Cinco mercados importantes do UUFinds",
    marketNote: "Estimativa pública recente de tráfego",
  },
  "en-gb": {
    region: "UK",
    htmlTitle: "UUFinds Spreadsheet & QC Guide for UK Shoppers",
    description: "An independent UK English UUFinds and QC guide with direct CNBuy Sheet category and product routes.",
    eyebrow: "Independent guide / United Kingdom",
    title: "Research the product.",
    accent: "Open the right listing.",
    intro: "Use categories to discover products, compare available QC material and then confirm the current item page on CNBuy Sheet.",
    search: "Search trainers, hoodies or accessories",
    searchButton: "Search CNBuy Sheet ↗",
    categoryTitle: "Start with a category.",
    categoryIntro: "Each shortcut opens the matching CNBuy Sheet section, not a generic homepage.",
    articleLabel: "SEO BUYING GUIDE / 2026",
    articleTitle: "From UUFinds QC research to the right product",
    articleText: "The complete guide separates discovery, QC evidence comparison and verification of the current product listing.",
    articleButton: "Read the complete guide →",
    nav: { finds: "Finds", products: "Products", qcGuide: "QC Guide", howItWorks: "How It Works", articles: "Articles", faq: "FAQ", shopMain: "Enter CNBuy Sheet", language: "Language" },
    names: ["Trainers", "Hoodies", "T-Shirts", "Jackets", "Trousers", "Headwear", "Accessories", "Football Shirts", "Electronics"],
    notes: ["Trainers & footwear", "Jumpers & sweatshirts", "Tees & tops", "Coats & outerwear", "Trousers & shorts", "Caps & hats", "Bags, wallets & more", "Teamwear finds", "Tech & devices"],
    marketText: "Five important UUFinds markets",
    marketNote: "Recent public traffic estimate",
  },
} as const;

type Locale = keyof typeof localized;

export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(localized).map((locale) => ({ locale })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const content = localized[locale as Locale];
  if (!content) return {};
  return {
    title: content.htmlTitle,
    description: content.description,
    alternates: {
      canonical: `/${locale}/`,
      languages: { "x-default": "/", "en-US": "/", "en-GB": "/en-gb/", de: "/de/", pl: "/pl/", "pt-BR": "/pt-br/" },
    },
    openGraph: {
      title: content.htmlTitle,
      description: content.description,
      url: `/${locale}/`,
      siteName: "UUFinds Sheet",
      type: "website",
      locale: locale === "pt-br" ? "pt-BR" : locale === "en-gb" ? "en-GB" : locale,
      images: [socialImage],
    },
    twitter: { card: "summary_large_image", title: content.htmlTitle, description: content.description, images: [socialImage.url] },
  };
}

export default async function LocalizedHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const content = localized[locale as Locale];
  if (!content) notFound();

  return (
    <main>
      <DocumentLanguage language={locale === "pt-br" ? "pt-BR" : locale === "en-gb" ? "en-GB" : locale} />
      <SiteHeader locale={content.region} labels={content.nav} />

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">{content.eyebrow}</p>
          <h1>{content.title}<br /><em>{content.accent}</em></h1>
          <p className="hero-intro">{content.intro}</p>
          <form className="search-box" action="https://www.cnbuycha.com/search.html" method="get" role="search">
            <input type="hidden" name="channelid" value="2" />
            <span className="search-icon" aria-hidden="true">⌕</span>
            <input name="keywords" required placeholder={content.search} aria-label={content.search} />
            <button type="submit">{content.searchButton}</button>
          </form>
          <a className="browse-button" href="#finds">
            <span aria-hidden="true">↗</span><strong>{content.categoryTitle}</strong><b aria-hidden="true">→</b>
          </a>
          <div className="proof-row" aria-label="Site features">
            <div><span>09</span><small>Category<br />shortcuts</small></div>
            <div><span>QC</span><small>First buying<br />guide</small></div>
            <div><span>↗</span><small>Direct CNBuy<br />Sheet links</small></div>
          </div>
        </div>

        <div className="hero-visual" aria-label="Editorial collage of a shoe, hoodie, and cap">
          <div className="index-mark" aria-hidden="true">01</div>
          <div className="grid-lines" aria-hidden="true" />
          <ResponsiveHeroImage />
          <div className="route-tag" aria-hidden="true">
            <span>CNBUY SHEET LINK</span>
            <strong>READY TO OPEN</strong>
            <b>↑</b>
          </div>
        </div>
      </section>

      <section className="category-section" id="finds">
        <div className="section-heading">
          <div><p className="eyebrow">09 / CNBUY SHEET</p><h2>{content.categoryTitle}</h2></div>
          <p>{content.categoryIntro}</p>
        </div>
        <div className="category-grid">
          {categories.map((category, index) => (
            <a className="category-card" href={category.href} target="_blank" rel="noreferrer" key={category.name}>
              <div className={`category-code ${category.color}`}>{category.code}</div>
              <div className="category-symbol" aria-hidden="true">{category.name.slice(0, 2).toUpperCase()}</div>
              <h2>{content.names[index]}</h2><p>{content.notes[index]}</p><span className="card-arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </section>

      <section className="product-showcase-section" id="featured-products">
        <div className="section-heading">
          <div><p className="eyebrow">Product routes / 08</p><h2>{content.nav.products}</h2></div>
          <p>{content.intro}</p>
        </div>
        <div className="product-showcase-grid">
          {products.map((product, index) => (
            <Link className="product-card" href={`/${locale}/products/${product.slug}/`} key={product.slug}>
              <div className="product-card-image">
                <SiteImage src={product.images[0]} alt={product.name} width={800} height={800} />
                <span>{String(index + 1).padStart(2, "0")} / 08</span>
              </div>
              <div className="product-card-copy">
                <p>{product.category}</p>
                <h3>{product.shortName}</h3>
                <div><span>¥{product.price}</span><b>{content.nav.products} ↗</b></div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="split-callout" id="qc-guide">
        <div>
          <p className="eyebrow inverse">QC before checkout</p>
          <h2>{content.articleTitle}</h2>
        </div>
        <div className="callout-copy">
          <p>{content.articleText}</p>
          <Link href={`/${locale}/guides/uufinds-qc-checklist/`}>{content.nav.qcGuide} <span>→</span></Link>
        </div>
      </section>

      <section className="workflow-section" id="how-it-works">
        <div className="section-heading">
          <div><p className="eyebrow">Research route / 03 steps</p><h2>{content.nav.howItWorks}</h2></div>
          <p>{content.intro}</p>
        </div>
        <div className="workflow-grid">
          <article><span>01</span><p className="step-label">RESEARCH</p><h3>UUFinds</h3><p>{content.intro}</p><Link href={`/${locale}/guides/how-to-use-uufinds/`}>{content.articleButton}</Link></article>
          <article><span>02</span><p className="step-label">COMPARE</p><h3>QC</h3><p>{content.articleText}</p><Link href={`/${locale}/guides/uufinds-qc-checklist/`}>{content.nav.qcGuide} →</Link></article>
          <article><span>03</span><p className="step-label">BROWSE</p><h3>CNBuy Sheet</h3><p>{content.categoryIntro}</p><a href="https://www.cnbuycha.com/AllProducts/" target="_blank" rel="noreferrer">{content.nav.shopMain} ↗</a></article>
        </div>
      </section>

      <section className="articles-section" id="articles">
        <div className="section-heading">
          <div><p className="eyebrow">{content.articleLabel}</p><h2>{content.nav.articles}</h2></div>
          <p>{content.articleText}</p>
        </div>
        <div className="article-grid">
          {articleCards.map((article, index) => (
            <Link href={`/${locale}${article.href}`} className={`article-card${article.featured ? " article-card-featured" : ""}`} key={article.href}>
              <div className="article-meta"><span>{index === 0 ? content.articleLabel : article.tag}</span><b>0{index + 1}</b></div>
              <h3>{index === 0 ? content.articleTitle : article.title}</h3>
              <p>{index === 0 ? content.articleText : article.summary}</p>
              <div className="article-foot"><span>{article.read}</span><b>{content.articleButton}</b></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="trust-section">
        <div className="trust-card">
          <p className="eyebrow">Independent guide</p>
          <h2>UUFinds Sheet</h2>
          <p>{content.description}</p>
        </div>
        <div className="facts-card">
          <div><span>01</span><p>UUFinds publicly describes a QC finder for available photos and videos.</p></div>
          <div><span>02</span><p>Keep the exact product link, seller and variant attached to any QC evidence.</p></div>
          <div><span>03</span><p>Confirm current product details on the live CNBuy Sheet page.</p></div>
          <div className="source-row"><a href="https://www.cnbuycha.com/AllProducts/" target="_blank" rel="noreferrer">{content.nav.shopMain} ↗</a></div>
        </div>
      </section>

      <section className="faq-section">
        <div>
          <p className="eyebrow">FAQ</p>
          <h2>{content.nav.faq}</h2>
          <Link className="full-faq-link" href={`/${locale}/faq/`}>{content.nav.faq} →</Link>
        </div>
        <div className="faq-list">
          <details open><summary>Is this the official UUFinds website?<span>+</span></summary><p>No. UUFinds Sheet is an independent editorial guide.</p></details>
          <details><summary>Does a QC photo guarantee product quality?<span>+</span></summary><p>No. It documents one photographed item or batch and must be matched to the intended listing.</p></details>
          <details><summary>What should be checked on the destination page?<span>+</span></summary><p>Confirm the product ID, price, variants, sizing, seller link and current availability.</p></details>
        </div>
      </section>

      <SiteFooter locale={locale as Locale} />
    </main>
  );
}
