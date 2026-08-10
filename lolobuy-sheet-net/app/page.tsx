import Link from "next/link";
import {
  catalogBase,
  categories,
  categoryInternalPath,
  faqItems,
  productInternalPath,
  productPriceUsd,
  products,
} from "./site-data";
import { ProductImage } from "./product-image";
import { SiteFooter, SiteHeader } from "./site-shell";
import {
  absoluteUrl,
  localizeReactNode,
  localizedPath,
  translate,
} from "./i18n";
import { seoCopy } from "./seo";
import type { Locale } from "./translations";
import { coreMetadata } from "./seo";

export const metadata = coreMetadata("en", "/");

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="7" />
      <path d="m16.5 16.5 4 4" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function HomePage({ locale = "en" }: { locale?: Locale }) {
  const featured = products.slice(0, 4);
  const homeUrl = absoluteUrl(localizedPath(locale, "/"));
  const homeSeo = seoCopy(locale, "/");
  const productListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: translate(locale, "LoloBuy spreadsheet product finds"),
    inLanguage: locale,
    url: homeUrl,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: translate(locale, product.name),
      image: `https://lolobuy-sheet.net${product.image}`,
      url: absoluteUrl(productInternalPath(product.id)),
    })),
  };
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "LoloBuy Sheet",
    url: homeUrl,
    inLanguage: locale,
    description: homeSeo.description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${catalogBase}/search.html?keywords={search_term_string}&channelid=2`,
      "query-input": "required name=search_term_string",
    },
  };

  return localizeReactNode(
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productListJsonLd) }}
      />

      <SiteHeader locale={locale} />

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">Independent product-finding guide</p>
            <h1 id="hero-title">
              LoloBuy Spreadsheet 2026: Matched Product Finds &amp; Buying Guides
            </h1>
            <p className="hero-lead">
              Searchable China shopping finds and practical LoloBuy guides,
              built to help you compare a listing before you order.
            </p>

            <form
              className="product-search"
              action={`${catalogBase}/search.html`}
              method="get"
            >
              <label className="sr-only" htmlFor="product-query">
                Search the product catalog
              </label>
              <SearchIcon />
              <input
                id="product-query"
                name="keywords"
                type="search"
                placeholder="Search shoes, hoodies, watches..."
                required
              />
              <input type="hidden" name="channelid" value="2" />
              <button type="submit" aria-label="Open product search">
                <SearchIcon />
              </button>
            </form>

            <div className="quick-categories" aria-label="Product categories">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={categoryInternalPath(category.slug)}
                >
                  <span aria-hidden="true">{category.symbol}</span>
                  {category.name}
                </Link>
              ))}
            </div>

            <div className="hero-actions">
              <a
                className="button button-primary"
                href={`${catalogBase}/AllProducts/`}
                target="_blank"
                rel="sponsored noopener noreferrer"
              >
                Browse product finds <span aria-hidden="true">→</span>
              </a>
              <Link className="button button-secondary" href="/how-it-works">
                How it works <span aria-hidden="true">→</span>
              </Link>
            </div>

            <p className="trust-note">
              <span className="shield" aria-hidden="true">
                <CheckIcon />
              </span>
              Independent guide · Product images matched to their destination
              pages
            </p>
          </div>

          <div className="hero-catalog" aria-label="Featured product finds">
            <Link
              className="hero-card hero-card-featured"
              href={productInternalPath(featured[0].id)}
            >
              <span className="status-tag">SOURCE MATCHED</span>
              <ProductImage product={featured[0]} priority sizes="(max-width: 900px) 100vw, 45vw" />
              <span className="hero-card-title">{featured[0].name}</span>
            </Link>

            <Link
              className="hero-card hero-card-small"
              href={productInternalPath(featured[1].id)}
            >
              <span className="card-label">{featured[1].category}</span>
              <ProductImage product={featured[1]} />
              <span className="hero-card-title">{featured[1].name}</span>
            </Link>

            <Link
              className="hero-card hero-card-small"
              href={productInternalPath(featured[2].id)}
            >
              <span className="card-label">{featured[2].category}</span>
              <ProductImage product={featured[2]} />
              <span className="hero-card-title">{featured[2].name}</span>
            </Link>

            <Link
              className="hero-card hero-card-rail"
              href={productInternalPath(featured[3].id)}
            >
              <span className="card-label">{featured[3].category}</span>
              <ProductImage product={featured[3]} />
              <span className="hero-card-title">{featured[3].name}</span>
            </Link>

            <div className="status-panel">
              <p>PRODUCT SOURCE</p>
              <strong>Image and page paired</strong>
              <span>Checked 29 Jul 2026</span>
            </div>
            <div className="status-panel">
              <p>BEFORE ORDERING</p>
              <strong>Review size and variant</strong>
              <span>Seller details may change</span>
            </div>
          </div>
        </section>

        <section className="fold-preview" aria-label="More product finds">
          {products.slice(4, 10).map((product) => (
            <Link
              key={product.id}
              href={productInternalPath(product.id)}
            >
              <ProductImage product={product} sizes="(max-width: 620px) 33vw, 16vw" />
              <span>{product.name}</span>
            </Link>
          ))}
        </section>

        <section className="section-shell product-section" id="products">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Current catalog sample</p>
              <h2>Catalog entries, correctly paired</h2>
            </div>
            <p>
              Every card below uses the first product image from its matching
              destination page. Clicking the image, title or button opens that
              exact product—not a generic category or duplicated link.
            </p>
          </div>
          <p className="catalog-rights-note">
            Neutral titles describe the visible item only. Third-party marks in
            source images belong to their owners and do not imply endorsement,
            authorization or authenticity.{" "}
            <Link href="/independent-disclosure">
              Read the independent disclosure.
            </Link>
          </p>

          <div className="product-grid">
            {products.map((product) => (
              <article className="product-card" key={product.id}>
                <Link
                  className="product-image"
                  href={productInternalPath(product.id)}
                  aria-label={`Open ${product.name}`}
                >
                  <ProductImage product={product} />
                  <span>Open product <ArrowIcon /></span>
                </Link>
                <div className="product-copy">
                  <p>{product.category}</p>
                  <h3>
                    <Link href={productInternalPath(product.id)}>
                      {product.name}
                    </Link>
                  </h3>
                  <div>
                    <span>¥{product.priceCny} · ${productPriceUsd(product.priceCny)}</span>
                    <Link
                      href={productInternalPath(product.id)}
                      aria-label={`View matching page for ${product.name}`}
                    >
                      View <ArrowIcon />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="section-cta">
            <a
              className="button button-primary"
              href={`${catalogBase}/AllProducts/`}
              target="_blank"
              rel="sponsored noopener noreferrer"
            >
              View the full product catalog <span aria-hidden="true">→</span>
            </a>
            <p>
              Availability, variants and seller details can change. Check the
              destination page again before ordering.
            </p>
          </div>
        </section>

        <section className="section-shell category-section" id="categories">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">Browse by intent</p>
              <h2>Start with a category</h2>
            </div>
            <p>
              Use a focused category when you know the item type, or use the
              search box above for a specific product name.
            </p>
          </div>

          <div className="category-grid">
            {categories.map((category, index) => (
              <Link
                key={category.name}
                href={categoryInternalPath(category.slug)}
              >
                <span className="category-number">0{index + 1}</span>
                <h3>{category.name}</h3>
                <p>{category.detail}</p>
                <span className="category-arrow" aria-hidden="true">
                  ↗
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="section-shell steps-section" id="how-it-works">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">From find to warehouse</p>
              <h2>How to use these product finds</h2>
            </div>
            <p>
              A spreadsheet is the discovery layer. LoloBuy is the purchasing
              and forwarding layer. Keep those roles separate as you review an
              item.
            </p>
          </div>

          <ol className="steps-grid">
            <li>
              <span>01</span>
              <h3>Open the matching item</h3>
              <p>
                Choose a product card. Its image and link are paired to the same
                item page, so you can inspect the source listing without
                guessing which product it represents.
              </p>
            </li>
            <li>
              <span>02</span>
              <h3>Review the source link</h3>
              <p>
                Confirm the seller page, selected variant, size, color, current
                price and domestic delivery terms. A thumbnail alone is not
                enough for a purchase decision.
              </p>
            </li>
            <li>
              <span>03</span>
              <h3>Submit the product to LoloBuy</h3>
              <p>
                LoloBuy&apos;s public homepage says shoppers can paste a product
                link to place an order. Preserve the original address and exact
                variant notes before submitting it.
              </p>
            </li>
            <li>
              <span>04</span>
              <h3>Inspect, pack and ship</h3>
              <p>
                After the seller sends the item to the warehouse, review the
                warehouse photos and item status. Submit a parcel only after
                choosing a suitable route and checking the final parcel setup.
              </p>
            </li>
          </ol>
        </section>

        <section className="guide-band" id="qc-guide">
          <div className="guide-visual">
            <div className="guide-visual-head">
              <span>QC CHECKLIST EXAMPLE</span>
              <span>3 POINT REVIEW</span>
            </div>
            <img
              src="/products/3369.webp"
              alt="Product image used as an example for a QC review"
              width="900"
              height="900"
              loading="lazy"
            />
            <div className="qc-checks">
              <p>
                <CheckIcon /> Correct variant
              </p>
              <p>
                <CheckIcon /> Size label visible
              </p>
              <p>
                <CheckIcon /> Front and back reviewed
              </p>
            </div>
          </div>
          <div className="guide-copy">
            <p className="eyebrow">Practical LoloBuy QC guide</p>
            <h2>Use warehouse photos to answer specific questions</h2>
            <p className="large-copy">
              LoloBuy&apos;s current site describes quality-inspection
              warehousing and product-photo services. Treat those images as a
              decision aid: compare what arrived with the variant you ordered,
              rather than judging an item from one flattering angle.
            </p>
            <div className="guide-points">
              <div>
                <span>01</span>
                <p>
                  Match the color, size label and selected option to your order
                  record.
                </p>
              </div>
              <div>
                <span>02</span>
                <p>
                  Look for obvious damage, marks, missing parts or a visibly
                  different item.
                </p>
              </div>
              <div>
                <span>03</span>
                <p>
                  If one area is unclear, describe the exact angle or
                  measurement needed and check the options shown for the live
                  order.
                </p>
              </div>
            </div>
            <p className="fact-note">
              QC photos reduce uncertainty, but they do not guarantee fit,
              material composition, authenticity or long-term performance.
            </p>
          </div>
        </section>

        <section className="section-shell shipping-section" id="shipping">
          <div className="shipping-copy">
            <p className="eyebrow">Shipping without guesswork</p>
            <h2>Plan the parcel before you pay international freight</h2>
            <p>
              LoloBuy&apos;s public homepage says warehouse products can be
              selected and submitted as one parcel, and describes global
              shipping. The final choice still depends on destination, route
              limits, actual weight, parcel dimensions and packing.
            </p>
            <Link className="text-link" href="/shipping">
              Read the complete shipping guide <ArrowIcon />
            </Link>
          </div>
          <div className="shipping-grid">
            <article>
              <span>WEIGHT</span>
              <h3>Actual vs. volumetric</h3>
              <p>
                Bulky, light goods may be billed by volume on routes that use
                dimensional weight. Packaging can therefore matter as much as
                the scale reading.
              </p>
            </article>
            <article>
              <span>ROUTE</span>
              <h3>Limits differ</h3>
              <p>
                Each route can have its own destination, weight and item
                restrictions. An unavailable route is a planning constraint,
                not a checkout error to ignore.
              </p>
            </article>
            <article>
              <span>PARCEL</span>
              <h3>Consolidate carefully</h3>
              <p>
                Combining warehouse items can reduce repeated base charges, but
                a very large or mixed parcel may narrow the routes available to
                you.
              </p>
            </article>
            <article>
              <span>STORAGE</span>
              <h3>Use the warehouse window</h3>
              <p>
                The public page states 90 days of free storage. Review arrivals
                promptly, resolve QC questions and leave time to compare parcel
                options.
              </p>
            </article>
          </div>
        </section>

        <section className="section-shell learn-section" id="learn">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">Decision-first reading</p>
              <h2>What to check before ordering</h2>
            </div>
            <p>
              Useful product research should change what you check—not merely
              repeat the phrase “LoloBuy spreadsheet.”
            </p>
          </div>
          <div className="learn-grid">
            <article>
              <span className="article-type">BUYING BASICS · 6 MIN</span>
              <h3>Why the listing variant matters more than the thumbnail</h3>
              <p>
                Marketplace pages can group many colors, batches or versions
                under one image. Confirm the exact selected option and preserve
                any useful note for the purchasing agent.
              </p>
              <Link href="/how-it-works">
                Read the buying flow <ArrowIcon />
              </Link>
            </article>
            <article>
              <span className="article-type">QC NOTES · 7 MIN</span>
              <h3>A repeatable warehouse-photo checklist</h3>
              <p>
                Start with identity and variant, then move to visible condition,
                labels, symmetry and the specific details that matter for that
                product type.
              </p>
              <Link href="/qc-guide">
                Use the QC checklist <ArrowIcon />
              </Link>
            </article>
            <article>
              <span className="article-type">SHIPPING · 8 MIN</span>
              <h3>How parcel dimensions can change the route decision</h3>
              <p>
                Estimate with realistic dimensions, understand chargeable
                weight and compare route restrictions before adding packaging
                services.
              </p>
              <Link href="/shipping">
                Review parcel planning <ArrowIcon />
              </Link>
            </article>
          </div>
          <div className="section-cta">
            <Link className="button button-secondary" href="/articles">
              View all buying guides <span aria-hidden="true">→</span>
            </Link>
            <p>
              Each guide focuses on a specific decision: product selection,
              warehouse-photo review or parcel planning.
            </p>
          </div>
        </section>

        <section className="section-shell faq-section">
          <div className="faq-title">
            <p className="eyebrow">Clear answers</p>
            <h2>LoloBuy spreadsheet FAQ</h2>
            <p>
              Short answers to the questions that matter before you leave the
              product-discovery stage.
            </p>
          </div>
          <div className="faq-list">
            {faqItems.slice(0, 5).map((item, index) => (
              <details key={item.question} open={index === 0}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
            <Link className="faq-more" href="/faq">
              Open the complete FAQ <ArrowIcon />
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter locale={locale} />
    </>,
    locale,
  );
}

export default function Home() {
  return <HomePage />;
}
