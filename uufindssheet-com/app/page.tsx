import Image from "next/image";
import Link from "next/link";
import { products } from "./products/product-data";
import { articleCards, categories } from "./site-data";
import { SiteHeader } from "./components/site-header";

export default function Home() {
  return (
    <main>
      <SiteHeader />

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Independent guide <span>•</span> Updated July 2026</p>
          <h1>Find it on <em>UUFinds.</em><br />Explore it on<br />CNBuy Sheet.</h1>
          <p className="hero-intro">
            Research a product with UUFinds, check available QC material, then browse the matching category on CNBuy Sheet.
          </p>
          <form className="search-box" action="https://www.cnbuycha.com/search.html" method="get" role="search">
            <input type="hidden" name="channelid" value="2" />
            <span className="search-icon" aria-hidden="true">⌕</span>
            <input
              name="keywords"
              required
              placeholder="Search shoes, hoodies, accessories…"
              aria-label="Search CNBuy Sheet products"
            />
            <button type="submit">Search finds <span aria-hidden="true">↗</span></button>
          </form>
          <a className="browse-button" href="#finds">
            <span aria-hidden="true">↗</span><strong>Browse categories</strong><b aria-hidden="true">→</b>
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
          <Image
            src="/hero-product-collage.png"
            alt="Unbranded shoe, charcoal hoodie and black cap presented as product finds"
            width={1000}
            height={747}
            priority
            unoptimized
          />
          <div className="route-tag" aria-hidden="true">
            <span>CNBUY SHEET LINK</span>
            <strong>READY TO OPEN</strong>
            <b>↑</b>
          </div>
        </div>
      </section>

      <section className="category-section" id="finds">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Curated routes / 09</p>
            <h2>Start with a category.</h2>
          </div>
          <p>Each shortcut opens the matching CNBuy Sheet category—not a generic homepage.</p>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <a className="category-card" href={category.href} target="_blank" rel="noreferrer" key={category.name}>
              <div className={`category-code ${category.color}`}>{category.code}</div>
              <div className="category-symbol" aria-hidden="true">{category.name.slice(0, 2).toUpperCase()}</div>
              <h3>{category.name}</h3>
              <p>{category.note}</p>
              <span className="card-arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </section>

      <section className="product-showcase-section" id="featured-products">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Product routes / 08</p>
            <h2>Open a real product detail.</h2>
          </div>
          <p>Each find has its own page here, followed by one direct button to the exact CNBuy Sheet product.</p>
        </div>
        <div className="product-showcase-grid">
          {products.map((product, index) => (
            <Link className="product-card" href={`/products/${product.slug}/`} key={product.slug}>
              <div className="product-card-image">
                <Image src={product.images[0]} alt={product.name} width={800} height={800} loading="lazy" unoptimized />
                <span>{String(index + 1).padStart(2, "0")} / 08</span>
              </div>
              <div className="product-card-copy">
                <p>{product.category}</p>
                <h3>{product.shortName}</h3>
                <div><span>¥{product.price}</span><b>View details ↗</b></div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="split-callout" id="qc-guide">
        <div>
          <p className="eyebrow inverse">QC before checkout</p>
          <h2>A find is a lead.<br />QC is the check.</h2>
        </div>
        <div className="callout-copy">
          <p>UUFinds describes its service as a QC finder for product photos and videos. Use those materials to inspect the exact listing you are considering—then confirm the seller link, size details and current price on the destination page.</p>
          <a href="#how-it-works">See the three-step method <span>→</span></a>
        </div>
      </section>

      <section className="workflow-section" id="how-it-works">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Research route / 03 steps</p>
            <h2>From a link to a better shortlist.</h2>
          </div>
          <p>Keep product discovery, visual checking and destination-page verification as three separate decisions.</p>
        </div>
        <div className="workflow-grid">
          <article>
            <span>01</span>
            <p className="step-label">RESEARCH</p>
            <h3>Start with UUFinds</h3>
            <p>Paste a supported product or agent link into UUFinds and look for available QC photos or video. Match the listing—not just a similar-looking product.</p>
            <Link href="/guides/how-to-use-uufinds/">Read the on-site research guide →</Link>
          </article>
          <article>
            <span>02</span>
            <p className="step-label">COMPARE</p>
            <h3>Read the evidence</h3>
            <p>Compare shape, material, stitching, print placement, hardware, labels and measured dimensions. Check more than one angle when it is available.</p>
            <Link href="/guides/uufinds-qc-checklist/">Use the full QC checklist →</Link>
          </article>
          <article>
            <span>03</span>
            <p className="step-label">BROWSE</p>
            <h3>Continue on CNBuy Sheet</h3>
            <p>Use the category shortcuts to explore related listings. Re-check the live product page because availability, price, variants and seller information can change.</p>
            <a href="https://www.cnbuycha.com/AllProducts/" target="_blank" rel="noreferrer">Browse all products ↗</a>
          </article>
        </div>
      </section>

      <section className="articles-section" id="articles">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Field notes / July 2026</p>
            <h2>Useful answers, not link dumps.</h2>
          </div>
          <p>Original guides written around real search questions: QC photos, spreadsheet links, product matching and safer comparison habits.</p>
        </div>
        <div className="article-grid">
          {articleCards.map((article, index) => (
            <Link href={article.href} className={`article-card${article.featured ? " article-card-featured" : ""}`} key={article.href}>
              <div className="article-meta"><span>{article.tag}</span><b>0{index + 1}</b></div>
              <h3>{article.title}</h3>
              <p>{article.summary}</p>
              <div className="article-foot"><span>{article.read}</span><b>Read guide ↗</b></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="trust-section">
        <div className="trust-card">
          <p className="eyebrow">Clear relationship</p>
          <h2>Independent by design.</h2>
          <p>UUFinds Sheet is an editorial guide and routing site. We do not claim to be UUFinds, do not sell products and do not process orders. All outbound search, category and product routes on this site lead only to CNBuy Sheet.</p>
        </div>
        <div className="facts-card">
          <div><span>01</span><p><strong>Official function:</strong> UUFinds describes its website as a free QC finder for photos and videos.</p></div>
          <div><span>02</span><p><strong>Supported inputs:</strong> its App Store listing mentions 1688, Taobao, Weidian and shopping-agent link conversion.</p></div>
          <div><span>03</span><p><strong>Destination:</strong> CNBuy Sheet publishes browsable category and product-detail pages.</p></div>
          <div className="source-row"><a href="https://www.cnbuycha.com/AllProducts/" target="_blank" rel="noreferrer">Browse CNBuy Sheet products ↗</a></div>
        </div>
      </section>

      <section className="faq-section">
        <div>
          <p className="eyebrow">FAQ / Straight answers</p>
          <h2>Before you open another tab.</h2>
          <Link className="full-faq-link" href="/faq/">Open the complete fact-checked FAQ →</Link>
        </div>
        <div className="faq-list">
          <details open>
            <summary>Is uufindssheet.com the official UUFinds website?<span>+</span></summary>
            <p>No. This is an independent guide. The official UUFinds QC finder is hosted at uufinds.com.</p>
          </details>
          <details>
            <summary>Does a QC photo guarantee product quality?<span>+</span></summary>
            <p>No. A photo is evidence from one item or batch at a point in time. Match the listing carefully, inspect multiple angles and confirm the destination page before making a decision.</p>
          </details>
          <details>
            <summary>Why do the category links open CNBuy Sheet?<span>+</span></summary>
            <p>This guide connects research intent with browsable CNBuy Sheet categories. Each category button opens its matching section rather than sending every visitor to the homepage.</p>
          </details>
          <details>
            <summary>Can I search with a product name?<span>+</span></summary>
            <p>Yes. Your complete search phrase is passed to CNBuy Sheet, so searches such as “Nike shoes” or “black hoodie” open the matching product results rather than a generic category page.</p>
          </details>
          <details>
            <summary>What should I re-check on the destination page?<span>+</span></summary>
            <p>Confirm the exact item, seller link, current price, available variants, size information and any shipping or service terms shown by the relevant platform.</p>
          </details>
        </div>
      </section>

      <footer>
        <div className="footer-brand"><Image className="footer-logo" src="/uufinds-logo.png" alt="UUFinds" width={1144} height={284} unoptimized /></div>
        <p>Independent educational guide. Not affiliated with, endorsed by, or operated by UUFinds. All outbound shopping links lead only to CNBuy Sheet.</p>
        <a href="https://www.cnbuycha.com/AllProducts/" target="_blank" rel="noreferrer">Browse all CNBuy finds ↗</a>
      </footer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "UUFinds Sheet",
            url: "https://uufindssheet.com/",
            description: "Independent UUFinds spreadsheet and QC research guide with direct CNBuy Sheet category routes.",
            publisher: { "@type": "Organization", name: "UUFinds Sheet" },
          }),
        }}
      />
    </main>
  );
}
