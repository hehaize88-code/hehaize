import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InnerShell } from "../../components/InnerShell";
import { ArticleSlug, articles } from "../article-data";

const categoryArticleSlug = "cssbuy-spreadsheet-categories-explained";
const categoryArticleImage = "https://cssbuychina.net/cssbuy-category-checks-article.webp";

const categoryDecisionRows = [
  { category: "Shoes", before: "Foot or insole length, exact size and color", qc: "Pair alignment, sole, finish, ruler photo", shipping: "Rigid box and crush protection", href: "/category/shoes", anchor: "CSSBuy Shoes Spreadsheet" },
  { category: "Clothing", before: "Flat garment measurements and exact print", qc: "Size label, seams, hardware, marks", shipping: "Bulky hoodies and jackets add volume", href: "/category/hoodies-sweaters", anchor: "CSSBuy Clothing Spreadsheet" },
  { category: "Jerseys", before: "Fan or player cut, print and patch options", qc: "Front, back, badge, name and number", shipping: "Protect prints from hard folds and heat", href: "/category/jerseys", anchor: "CSSBuy Jersey Spreadsheet" },
  { category: "Bags & accessories", before: "Dimensions, included parts and materials listed", qc: "Interior, straps, zips, shape and scratches", shipping: "Support structured shapes; check components", href: "/category/accessories", anchor: "CSSBuy Accessories Spreadsheet" },
  { category: "Electronics", before: "Model, plug, battery, compatibility and route", qc: "Label, visible condition and included parts", shipping: "Restricted routes, protection and insurance terms", href: "/category/electronics", anchor: "CSSBuy Electronics Spreadsheet" },
] as const;

const categorySectionLinks: Record<string, Array<{ href: string; label: string }>> = {
  "Shoes: size evidence, pair alignment, and parcel volume": [
    { href: "/category/shoes", label: "Browse the CSSBuy Shoes Spreadsheet" },
    { href: "/product/3402", label: "Review the Mixed Runner Sneaker find" },
    { href: "/product/3401", label: "Review the Leather Loafer find" },
    { href: "/product/3388", label: "Review the Runner Tatic sneaker listing" },
  ],
  "Hoodies, T-shirts, and jackets: measurements before labels": [
    { href: "/category/hoodies-sweaters", label: "Browse the CSSBuy Hoodies Spreadsheet" },
    { href: "/category/t-shirts", label: "Browse the CSSBuy T-Shirts Spreadsheet" },
    { href: "/category/jackets", label: "Browse the CSSBuy Jackets Spreadsheet" },
    { href: "/product/3393", label: "Review the Mertra-style hoodie find" },
    { href: "/product/3353", label: "Review the long-sleeve polo find" },
    { href: "/product/3356", label: "Review the long tailored coat find" },
  ],
  "Jerseys: version, print, patches, and fit": [
    { href: "/category/jerseys", label: "Browse the CSSBuy Jersey Spreadsheet" },
    { href: "/product/3208", label: "Review the Germany 2024 jersey find" },
    { href: "/product/3206", label: "Review the Manchester City 2024 jersey find" },
    { href: "/product/3204", label: "Review the Premier League 2024 jersey find" },
  ],
  "Accessories and bags: dimensions, hardware, and included parts": [
    { href: "/category/accessories", label: "Browse the CSSBuy Accessories Spreadsheet" },
    { href: "/product/3389", label: "Review the sport crossbody bag find" },
    { href: "/product/3365", label: "Review the Royal Oak-style watch selection" },
    { href: "/product/3364", label: "Review the mixed square-dial watch selection" },
  ],
  "Electronics: route eligibility and limits of visual QC": [
    { href: "/category/electronics", label: "Browse the CSSBuy Electronics Spreadsheet" },
    { href: "/product/3357", label: "Review the Galaxy Watch 8 listing" },
    { href: "/product/3235", label: "Review the luxury smartwatch listing" },
    { href: "/product/3184", label: "Review the Electronic Watch S8 listing" },
  ],
};

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles[slug as ArticleSlug];
  if (!article) return { title: "CSSBuy Article" };
  const articleUrl = `https://cssbuychina.net/articles/${slug}`;
  const isCategoryArticle = slug === categoryArticleSlug;
  const published = "published" in article ? article.published : "2026-08-08";
  const checked = "checked" in article ? article.checked : "August 10, 2026";
  return {
    title: { absolute: article.title },
    description: article.description,
    alternates: { canonical: articleUrl },
    openGraph: {
      type: "article",
      url: articleUrl,
      siteName: "CSSBuy China",
      title: article.title,
      description: article.description,
      publishedTime: `${published}T00:00:00Z`,
      modifiedTime: `${published}T00:00:00Z`,
      authors: ["https://cssbuychina.net/about"],
      images: isCategoryArticle ? [{ url: categoryArticleImage, width: 1536, height: 1024, alt: "Product-category sizing, warehouse QC and parcel-planning checklist" }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: isCategoryArticle ? [categoryArticleImage] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles[slug as ArticleSlug];
  if (!article) notFound();
  const articleUrl = `https://cssbuychina.net/articles/${slug}`;
  const isCategoryArticle = slug === categoryArticleSlug;
  const h1 = "h1" in article ? article.h1 : article.title;
  const published = "published" in article ? article.published : "2026-08-08";
  const checked = "checked" in article ? article.checked : "August 10, 2026";
  const jsonLd = {
    "@context": "https://schema.org", "@type": "Article", headline: h1, description: article.description,
    datePublished: published, dateModified: published,
    author: { "@type": "Organization", name: "CSSBuy China Editorial", url: "https://cssbuychina.net/about" },
    publisher: { "@type": "Organization", name: "CSSBuy China Editorial", url: "https://cssbuychina.net/", logo: { "@type": "ImageObject", url: "https://cssbuychina.net/cssbuy-logo.png" } },
    image: isCategoryArticle ? { "@type": "ImageObject", url: categoryArticleImage, width: 1536, height: 1024 } : undefined,
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://cssbuychina.net/" },
      { "@type": "ListItem", position: 2, name: "Articles", item: "https://cssbuychina.net/articles" },
      { "@type": "ListItem", position: 3, name: h1, item: articleUrl },
    ],
  };

  return (
    <InnerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify("published" in article ? [jsonLd, breadcrumbJsonLd] : jsonLd) }} />
      <article className="article-page">
        <header className="article-header"><div className="article-kicker"><span>UPDATED {checked.toUpperCase()}</span><span>{article.label}</span></div><h1>{h1}</h1><p>{article.description}</p></header>
        <div className="article-layout">
          <aside><span>ON THIS PAGE</span>{article.sections.map(([heading], index) => <a href={`#section-${index + 1}`} key={heading}>{heading}</a>)}</aside>
          <div className="article-body">
            {isCategoryArticle ? <>
              <figure className="article-hero-image">
                <img src="/cssbuy-category-checks-article.webp" width="1536" height="1024" alt="An editorial product inspection desk with shoes, clothing, a jersey, a bag, electronics, measurements and parcel planning" fetchPriority="high" />
                <figcaption>Choose the category first, then match the listing, warehouse evidence and parcel decision to that product type.</figcaption>
              </figure>
              <section className="category-comparison" aria-labelledby="quick-category-comparison">
                <div className="comparison-heading"><span>QUICK ANSWER</span><h2 id="quick-category-comparison">CSSBuy category decision table</h2><p>Use this table before opening the full <a href="/categories">CSSBuy spreadsheet category index</a>.</p></div>
                <div className="comparison-scroll"><table><thead><tr><th>Category</th><th>Before ordering</th><th>Warehouse QC</th><th>Shipping risk</th><th>Category entry</th></tr></thead><tbody>{categoryDecisionRows.map((row) => <tr key={row.category}><th scope="row">{row.category}</th><td>{row.before}</td><td>{row.qc}</td><td>{row.shipping}</td><td><a href={row.href}>{row.anchor} ↗</a></td></tr>)}</tbody></table></div>
              </section>
            </> : null}
            <div className="article-note"><b>Research basis · checked {checked}</b><p>{"published" in article ? "This independent article was reviewed against CSSBuy's current public Buy For Me, Search for Me and Expert Buy pages. Marketplace results and service details can change, so the current source listing and account interface remain controlling." : "This independent article was reviewed against CSSBuy's public homepage, item-page workflow, warehouse information, shipping estimator, and FAQ. Published service details can change, so the current order page, account deadline, and selected route remain controlling."}</p></div>
            {article.sections.map(([heading, paragraphs], index) => {
              const resources = isCategoryArticle ? categorySectionLinks[heading] : undefined;
              return <section id={`section-${index + 1}`} key={heading}><h2>{heading}</h2>{paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{resources ? <div className="article-resource-links"><span>RELATED CATEGORY & PRODUCT PAGES</span><div>{resources.map((resource) => <a href={resource.href} key={resource.href}>{resource.label} ↗</a>)}</div></div> : null}</section>;
            })}
            {"related" in article ? <div className="article-end"><span>RELATED READING</span><h2>Continue the same research workflow.</h2>{article.related.map(([label, href]) => <a href={href} key={href}>{label} ↗</a>)}</div> : null}
            <div className="article-end"><span>END / ARTICLE</span><h2>Continue with the live product index.</h2><a href="/products">Browse product finds ↗</a></div>
          </div>
        </div>
      </article>
    </InnerShell>
  );
}
