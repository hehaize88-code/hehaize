import Link from "next/link";
import SearchBox from "@/components/SearchBox";
import ProductCard from "@/components/ProductCard";
import { ArrowIcon, CheckIcon } from "@/components/Icons";
import { categories, products, faqs, MAIN_SITE, SITE_URL } from "@/data/site";
import { articles } from "@/data/articles";

export const metadata = { alternates: { canonical: "/" } };

const steps = [
  ["01", "Find a product", "Search the live catalog or open a category. Start with a clear product name, source link or image reference."],
  ["02", "Verify the listing", "Check the seller page, price, size, color and variant. Save the original source before submitting an order."],
  ["03", "Review warehouse photos", "Compare the delivered item with your order and inspect the details that matter before accepting it."],
  ["04", "Plan the parcel", "Estimate the packed weight, choose sensible protection and compare available international shipping lines."],
];

const guideCards = [
  { tag: "Start here", title: "How to use a shopping agent without losing track", text: "A calm, step-by-step workflow from the product link to parcel submission.", href: "/guides/how-to-buy", tone: "mint" },
  { tag: "Before shipping", title: "A category-specific QC photo checklist", text: "Know which angles, measurements and details are actually useful.", href: "/guides/qc-checks", tone: "orange" },
  { tag: "Total cost", title: "Why weight and parcel size change the answer", text: "Compare item cost and shipping assumptions before you commit.", href: "/guides/shipping", tone: "blue" },
];

const homeArticles = articles.slice(1, 4);

export default function HomePage() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Hubbuy Sheet",
    url: SITE_URL,
    description: "Independent Hubbuy spreadsheet, product discovery and shopping workflow guide.",
    inLanguage: "en",
  };
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Recent Hubbuy spreadsheet finds",
    itemListElement: products.slice(0, 8).map((product, index) => ({
      "@type": "ListItem", position: index + 1, name: product.name, url: product.href, image: `${SITE_URL}${product.image}`,
    })),
  };
  const articleListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Hubbuy buying and shipping articles",
    numberOfItems: articles.length,
    itemListElement: articles.map((article, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: article.title,
      url: `${SITE_URL}/articles/${article.slug}/`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleListSchema) }} />
      <section className="hero">
        <div className="hero-grid wrap">
          <div className="hero-copy">
            <div className="hero-pill"><span /> Independent guide · Updated for 2026</div>
            <h1>The Hubbuy spreadsheet that helps you <em>check first.</em></h1>
            <p>Browse organized China shopping finds, open the exact live product page, and use practical QC and shipping checks before making a decision.</p>
            <SearchBox />
            <div className="hero-links">
              <a href={`${MAIN_SITE}/AllProducts/`} target="_blank" rel="noopener">Browse all live products <ArrowIcon /></a>
              <Link href="/guides/how-to-buy">Read the beginner guide</Link>
            </div>
            <div className="trust-row">
              <span><CheckIcon /> Exact product links</span>
              <span><CheckIcon /> Prices shown in CNY</span>
              <span><CheckIcon /> No checkout on this site</span>
            </div>
          </div>
          <div className="hero-showcase" aria-label="Featured product preview">
            <div className="showcase-note"><span>Live shortlist</span><strong>New this week</strong></div>
            {products.slice(0, 3).map((product, index) => (
              <a key={product.id} className={`showcase-product showcase-${index + 1}`} href={product.href} target="_blank" rel="noopener">
                <img src={product.image} alt={product.name} width="520" height="520" />
                <span><small>{product.category}</small><strong>{product.name}</strong><em>¥{product.price}</em></span>
              </a>
            ))}
            <div className="showcase-stamp">2026<br/><span>EDIT</span></div>
          </div>
        </div>
      </section>

      <section className="section compact-section">
        <div className="wrap">
          <div className="section-heading inline-heading">
            <div><span className="eyebrow">Browse by category</span><h2>Start with what you need</h2></div>
            <a href={`${MAIN_SITE}/AllProducts/`} target="_blank" rel="noopener">View every category <ArrowIcon /></a>
          </div>
          <div className="category-grid">
            {categories.map(category => (
              <a key={category.name} className="category-card" href={category.href} target="_blank" rel="noopener">
                <span className="category-code">{category.code}</span>
                <span><strong>{category.name}</strong><small>{category.note}</small></span>
                <ArrowIcon size={17} />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section products-section">
        <div className="wrap">
          <div className="section-heading inline-heading">
            <div><span className="eyebrow">Recently checked</span><h2>Current spreadsheet finds</h2><p>Reference prices were checked against the linked catalog in July 2026.</p></div>
            <Link href="/products">See the full shortlist <ArrowIcon /></Link>
          </div>
          <div className="product-grid home-product-grid">
            {products.slice(0, 8).map((product, index) => <ProductCard key={product.id} product={product} priority={index < 4} />)}
          </div>
          <p className="micro-disclaimer">Names and prices are references, not endorsements or authenticity claims. Verify the current source page, variant and total cost.</p>
        </div>
      </section>

      <section className="section process-section">
        <div className="wrap process-grid">
          <div className="process-intro">
            <span className="eyebrow eyebrow-light">A better workflow</span>
            <h2>Four checks before your parcel moves.</h2>
            <p>A spreadsheet is useful only when it helps you remove uncertainty. Follow the product from source page to warehouse review, then make a shipping decision with real information.</p>
            <Link className="text-link-light" href="/guides/how-to-buy">Open the complete buying guide <ArrowIcon /></Link>
          </div>
          <div className="steps-grid">
            {steps.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section guides-section">
        <div className="wrap">
          <div className="section-heading centered-heading"><span className="eyebrow">Practical reading</span><h2>Guides built around the next decision</h2><p>Shortlists, QC and shipping are separate jobs. Give each one its own check.</p></div>
          <div className="guide-cards">
            {guideCards.map(card => <Link key={card.href} href={card.href} className={`guide-card guide-${card.tone}`}><span>{card.tag}</span><h3>{card.title}</h3><p>{card.text}</p><b>Read guide <ArrowIcon /></b></Link>)}
          </div>
        </div>
      </section>

      <section className="section home-articles-section">
        <div className="wrap">
          <div className="section-heading inline-heading home-articles-heading">
            <div>
              <span className="eyebrow">In-depth Hubbuy articles</span>
              <h2>Research before the parcel gets expensive</h2>
              <p>Fact-checked English reading on warehouse photos, shipping costs and consolidation decisions.</p>
            </div>
            <Link href="/articles">View all {articles.length} articles <ArrowIcon /></Link>
          </div>
          <div className="home-article-cards">
            {homeArticles.map(article => (
              <Link key={article.slug} href={`/articles/${article.slug}/`} className={`home-article-card home-article-${article.cover.tone}`}>
                <div className="home-article-meta">
                  <span>{article.category}</span>
                  <b>{article.readTime}</b>
                </div>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
                <strong>Read article <ArrowIcon /></strong>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section faq-preview">
        <div className="wrap faq-layout">
          <div className="faq-intro"><span className="eyebrow">Official workflow FAQ</span><h2>Before you place or ship an order</h2><p>Practical answers separate what Hubbuy publicly states from the prices, routes and order details that must be checked live.</p><Link href="/faq">Read all {faqs.length} questions <ArrowIcon /></Link></div>
          <div className="faq-list">
            {faqs.slice(0, 4).map(faq => <details key={faq.q}><summary>{faq.q}<span>+</span></summary><p>{faq.a}</p></details>)}
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="wrap final-cta-inner">
          <div><span>Search the live catalog</span><h2>Turn a vague idea into a useful shortlist.</h2></div>
          <SearchBox compact />
        </div>
      </section>
    </>
  );
}
