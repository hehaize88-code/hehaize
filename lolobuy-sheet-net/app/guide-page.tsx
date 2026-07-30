import type { ReactNode } from "react";
import Link from "next/link";
import { articleWordCount, articles } from "./article-data";
import {
  catalogBase,
  categories,
  faqItems,
  products,
  type NavigationKey,
} from "./site-data";
import { SiteFooter, SiteHeader } from "./site-shell";
import { localizeReactNode } from "./i18n";
import {
  guideDepthCopy,
  type SectionCopy,
} from "./guide-depth-copy";
import type { Locale } from "./translations";

type PageKind = NavigationKey | "how-it-works" | "learn";

const hoodieGuideCallout: Record<
  Locale,
  { eyebrow: string; title: string; body: string; cta: string }
> = {
  en: {
    eyebrow: "Focused apparel guide",
    title: "Choose a hoodie size with garment measurements",
    body:
      "Compare a hoodie you already wear with the seller chart, preserve the selected option and plan one decision-changing warehouse check.",
    cta: "Read the hoodie size guide",
  },
  es: {
    eyebrow: "Guía específica de ropa",
    title: "Elige la talla de una sudadera con medidas de la prenda",
    body:
      "Compara una sudadera que ya usas con la tabla del vendedor, guarda la opción y prepara una comprobación decisiva en el almacén.",
    cta: "Leer la guía de tallas de sudaderas",
  },
  de: {
    eyebrow: "Fokussierter Bekleidungsratgeber",
    title: "Wähle eine Hoodie-Größe anhand von Kleidungsmaßen",
    body:
      "Vergleiche einen eigenen Hoodie mit der Verkäufertabelle, sichere die gewählte Variante und plane eine entscheidende Lagerprüfung.",
    cta: "Hoodie-Größenratgeber lesen",
  },
  fr: {
    eyebrow: "Guide vêtement ciblé",
    title: "Choisissez une taille de hoodie avec des mesures du vêtement",
    body:
      "Comparez un hoodie que vous portez avec le tableau vendeur, conservez l'option et préparez un contrôle d'entrepôt décisif.",
    cta: "Lire le guide des tailles de hoodie",
  },
  it: {
    eyebrow: "Guida mirata all'abbigliamento",
    title: "Scegli la taglia di una felpa con misure del capo",
    body:
      "Confronta una felpa che indossi con la tabella del venditore, conserva l'opzione e pianifica un controllo decisivo in magazzino.",
    cta: "Leggi la guida alle taglie delle felpe",
  },
};

const pageIntro: Record<
  PageKind,
  { eyebrow: string; title: string; intro: string }
> = {
  products: {
    eyebrow: "Main-site product search",
    title: "Search the catalog or open a matched product",
    intro:
      "Use the search box to send your exact keyword to the main catalog. Every product image below is paired with its corresponding main-site item page.",
  },
  categories: {
    eyebrow: "Browse by product type",
    title: "Choose a category before narrowing the item",
    intro:
      "Category links lead only to the matching section of the main catalog. Use them for broad browsing, then confirm the exact variant on the product page.",
  },
  "qc-guide": {
    eyebrow: "Warehouse-photo review",
    title: "A practical QC checklist before parcel submission",
    intro:
      "QC photos are most useful when you ask specific, visible questions. This guide helps you compare the received item with the option you selected.",
  },
  shipping: {
    eyebrow: "International parcel planning",
    title: "Understand what can change the shipping total",
    intro:
      "Destination, route restrictions, chargeable weight, parcel dimensions and packing choices can all affect a shipment. Plan with realistic inputs instead of a product-price guess.",
  },
  learn: {
    eyebrow: "LoloBuy learning center",
    title: "Research the listing before you place an order",
    intro:
      "These independent guides focus on the decisions a product spreadsheet cannot make for you: variant selection, visible QC, parcel planning and link checks.",
  },
  articles: {
    eyebrow: "Independent buying guides",
    title: "Research-backed LoloBuy guides for real buying decisions",
    intro:
      "Use focused long-form guides for product discovery, listing checks, warehouse-photo review and parcel planning. Every claim is either verifiable, clearly qualified or presented as an example.",
  },
  faq: {
    eyebrow: "Clear, fact-conscious answers",
    title: "Frequently asked questions about this LoloBuy sheet",
    intro:
      "Understand what this independent directory does, where its product links go, what QC photos can show and why shipping estimates can change.",
  },
  "how-it-works": {
    eyebrow: "From product find to parcel",
    title: "How to use the sheet without losing the product context",
    intro:
      "Start with a matched item, verify the listing, submit the original marketplace link through your chosen purchasing flow, and inspect the warehouse result before shipping.",
  },
};

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="7" />
      <path d="m16.5 16.5 4 4" />
    </svg>
  );
}

function CatalogSearch({ locale }: { locale: Locale }) {
  return localizeReactNode(
    <form
      className="product-search subpage-search"
      action={`${catalogBase}/search.html`}
      method="get"
    >
      <label className="sr-only" htmlFor="subpage-product-query">
        Search the main product catalog
      </label>
      <SearchIcon />
      <input
        id="subpage-product-query"
        name="keywords"
        type="search"
        placeholder="Search shoes, hoodies, watches..."
        required
      />
      <input type="hidden" name="channelid" value="2" />
      <button type="submit" aria-label="Search the main product catalog">
        <SearchIcon />
      </button>
    </form>,
    locale,
  );
}

function ProductGrid({
  limit = products.length,
  locale,
}: {
  limit?: number;
  locale: Locale;
}) {
  return localizeReactNode(
    <div className="product-grid">
      {products.slice(0, limit).map((product, index) => (
        <article className="product-card" key={product.id}>
          <a
            className="product-image"
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${product.name} on the main site`}
          >
            <img
              src={product.image}
              alt={product.name}
              width="800"
              height="800"
              loading={index < 4 ? "eager" : "lazy"}
            />
            <span>
              Open product <span aria-hidden="true">↗</span>
            </span>
          </a>
          <div className="product-copy">
            <p>{product.category}</p>
            <h3>
              <a href={product.url} target="_blank" rel="noopener noreferrer">
                {product.name}
              </a>
            </h3>
            <div>
              <span>Item page {product.id}</span>
              <a href={product.url} target="_blank" rel="noopener noreferrer">
                View <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>,
    locale,
  );
}

function InfoCard({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="subpage-info-card">
      <span>{number}</span>
      <h2>{title}</h2>
      <div>{children}</div>
    </article>
  );
}

function DetailedCardSection({
  copy,
  ariaLabel,
}: {
  copy: SectionCopy;
  ariaLabel: string;
}) {
  return (
    <>
      <section className="section-shell depth-section-heading">
        <div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2>{copy.title}</h2>
        </div>
        <p>{copy.intro}</p>
      </section>
      <section className="subpage-card-grid" aria-label={ariaLabel}>
        {copy.cards.map((card, index) => (
          <InfoCard
            key={card.title}
            number={String(index + 1).padStart(2, "0")}
            title={card.title}
          >
            <p>{card.body}</p>
            {card.bullets && (
              <ul>
                {card.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            )}
          </InfoCard>
        ))}
      </section>
    </>
  );
}

function ProductsPage({ locale }: { locale: Locale }) {
  const depth = guideDepthCopy[locale].products;

  return localizeReactNode(
    <>
      <section className="subpage-search-band">
        <div>
          <p className="eyebrow">Search destination: your main catalog</p>
          <h2>Keep the keyword intact</h2>
          <p>
            Enter a product name, style or item type. The same text is passed as
            the search query, so “shoes” opens shoe results rather than a
            generic all-products landing page.
          </p>
        </div>
        <CatalogSearch locale={locale} />
      </section>
      <DetailedCardSection
        copy={depth}
        ariaLabel="Product filtering and verification method"
      />
      <section className="section-shell subpage-section">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">Matched product sample</p>
            <h2>Image, title and item page stay together</h2>
          </div>
          <p>
            Each card uses a locally served copy of the item&apos;s main image
            and links to its exact main-site detail page.
          </p>
        </div>
        <ProductGrid locale={locale} />
        <div className="section-cta">
          <a
            className="button button-primary"
            href={`${catalogBase}/AllProducts/`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Browse the full main catalog <span aria-hidden="true">→</span>
          </a>
          <p>Recheck availability, size, color and seller details before use.</p>
        </div>
      </section>
    </>,
    locale,
  );
}

function CategoriesPage({ locale }: { locale: Locale }) {
  const depth = guideDepthCopy[locale].categories;
  const hoodieCallout = hoodieGuideCallout[locale];

  return localizeReactNode(
    <>
      <section className="section-shell subpage-section">
        <div className="category-grid">
          {categories.map((category, index) => (
            <a
              key={category.name}
              href={category.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="category-number">0{index + 1}</span>
              <h2>{category.name}</h2>
              <p>{category.detail}</p>
              <span className="category-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          ))}
        </div>
      </section>
      <DetailedCardSection
        copy={depth}
        ariaLabel="Category-specific product checks"
      />
      <section className="section-shell subpage-note">
        <p className="eyebrow">{hoodieCallout.eyebrow}</p>
        <h2>{hoodieCallout.title}</h2>
        <p>{hoodieCallout.body}</p>
        <Link
          className="button button-primary"
          href="/articles/lolobuy-hoodie-size-guide"
        >
          {hoodieCallout.cta} <span aria-hidden="true">→</span>
        </Link>
      </section>
      <section className="section-shell decision-section">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">{depth.decisionEyebrow}</p>
            <h2>{depth.decisionTitle}</h2>
          </div>
          <p>{depth.decisionIntro}</p>
        </div>
        <div className="decision-grid">
          {depth.decisions.map((decision) => (
            <article key={decision.title}>
              <span>CHECK</span>
              <h3>{decision.title}</h3>
              <p>{decision.body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section-shell subpage-section">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">Cross-category sample</p>
            <h2>Compare the listing, not only the thumbnail</h2>
          </div>
          <p>
            A single marketplace page may contain several colors, sizes or
            versions. Open the exact item page before deciding.
          </p>
        </div>
        <ProductGrid limit={8} locale={locale} />
      </section>
    </>,
    locale,
  );
}

function QcPage({ locale }: { locale: Locale }) {
  const depth = guideDepthCopy[locale].qc;

  return localizeReactNode(
    <>
      <section className="section-shell research-fact-band">
        <div>
          <p className="eyebrow">Official fact check · 28 July 2026</p>
          <h2>What the public LoloBuy page actually confirms</h2>
        </div>
        <div className="research-facts">
          <p>
            LoloBuy states that after a merchant sends goods to its warehouse,
            the service conducts a quality inspection and takes photos.
          </p>
          <p>
            The same public page states that warehouse goods receive{" "}
            <strong>90 days of free storage</strong>.
          </p>
          <p>
            It does not publicly establish one universal photo count or a fixed
            price for extra images. Check the live order interface rather than
            relying on an old number.
          </p>
        </div>
      </section>

      <section className="subpage-card-grid" aria-label="QC review checklist">
        <InfoCard number="01" title="Preserve the order record">
          <p>
            Save the source page, exact option, size, color, version, quantity
            and any seller note before the item arrives. The warehouse result
            should be compared with this record, not with memory or a social
            media picture.
          </p>
        </InfoCard>
        <InfoCard number="02" title="Confirm identity first">
          <p>
            Check the product type, model, quantity and recognizable design
            before looking for small cosmetic details. Packaging alone is not
            enough to prove that the correct item arrived.
          </p>
          <ul>
            <li>Correct item and model</li>
            <li>Correct number of units</li>
            <li>Expected parts and accessories visible</li>
          </ul>
        </InfoCard>
        <InfoCard number="03" title="Verify option and sizing">
          <p>
            Match the visible color, option code and size label to the saved
            order. A tag is not a fit guarantee: when a measurement matters,
            specify the tape position and compare it with your own item measured
            in the same way.
          </p>
        </InfoCard>
        <InfoCard number="04" title="Review visible condition">
          <p>
            Inspect the front, back, sides and areas that may have been
            compressed in domestic transit. Separate confirmed damage from
            reflections, folds or image compression.
          </p>
          <ul>
            <li>Obvious marks, tears or deformation</li>
            <li>Missing or detached hardware</li>
            <li>Large asymmetry or listing mismatch</li>
          </ul>
        </InfoCard>
        <InfoCard number="05" title="Ask a focused question">
          <p>
            If one decision-changing point is unclear, name the location and the
            evidence you need. “Photograph the mark on the left sleeve under
            direct light” is more useful than “take better photos.”
          </p>
        </InfoCard>
        <InfoCard number="06" title="Know the limits of QC">
          <p>
            Photos cannot guarantee fit, hidden construction, material
            composition, authenticity, battery health, durability or long-term
            performance. They are evidence of visible condition at one moment.
          </p>
        </InfoCard>
      </section>

      <section className="section-shell decision-section">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">Decision framework</p>
            <h2>Pass, ask or request action</h2>
          </div>
          <p>
            Return or exchange options depend on the seller policy, product,
            order stage and current platform terms. Act promptly when the
            evidence changes your decision.
          </p>
        </div>
        <div className="decision-grid">
          <article>
            <span>PASS</span>
            <h3>The evidence matches</h3>
            <p>
              Identity, option, quantity and visible condition are consistent
              with the saved order record.
            </p>
          </article>
          <article>
            <span>ASK</span>
            <h3>One point is unclear</h3>
            <p>
              Request one specific image, measurement or clarification that can
              resolve the question.
            </p>
          </article>
          <article>
            <span>ACTION</span>
            <h3>A mismatch is visible</h3>
            <p>
              Identify the selected option and relevant photograph, then use
              the current order process without unnecessary delay.
            </p>
          </article>
        </div>
      </section>

      <DetailedCardSection
        copy={depth}
        ariaLabel="Product-specific warehouse photo checks"
      />

      <section className="section-shell subpage-note">
        <p className="eyebrow">1,200–1,800 word editorial guide</p>
        <h2>Read the complete LoloBuy QC photo workflow</h2>
        <p>
          The long-form guide includes product-specific checks, useful
          measurements, photo limitations, storage planning and a careful look
          at the available customer-experience evidence.
        </p>
        <Link
          className="button button-primary"
          href="/articles/lolobuy-qc-photos-guide"
        >
          Read the full QC guide <span aria-hidden="true">→</span>
        </Link>
      </section>
    </>,
    locale,
  );
}

function ShippingPage({ locale }: { locale: Locale }) {
  const depth = guideDepthCopy[locale].shipping;

  return localizeReactNode(
    <>
      <section className="section-shell research-fact-band">
        <div>
          <p className="eyebrow">Official fact check · 28 July 2026</p>
          <h2>What can be confirmed before estimating a parcel</h2>
        </div>
        <div className="research-facts">
          <p>
            LoloBuy states that users can select products stored in the
            warehouse and submit them as a single parcel.
          </p>
          <p>
            Its public page describes a global shipping service, but does not
            publish one fixed worldwide rate that applies to every destination
            and parcel.
          </p>
          <p>
            Use the live packed weight, dimensions, product mix and currently
            available routes. Another buyer&apos;s old per-kilogram quote is not
            a reliable price for your parcel.
          </p>
        </div>
      </section>
      <section className="subpage-card-grid" aria-label="Shipping cost factors">
        <InfoCard number="01" title="Destination and route">
          <p>
            Available lines and restrictions depend on the delivery country,
            item type, parcel weight and carrier rules. Compare only the routes
            actually available for the packed parcel.
          </p>
        </InfoCard>
        <InfoCard number="02" title="Actual and volumetric weight">
          <p>
            A bulky light parcel may be charged by dimensions on routes using
            volumetric weight. The divisor and billing rule vary by route, so
            use the formula displayed for the live option rather than assuming
            a universal calculation.
          </p>
        </InfoCard>
        <InfoCard number="03" title="Consolidation">
          <p>
            Combining items may reduce repeated packaging or minimum charges,
            while an oversized, fragile or restricted mix can narrow route
            choices. Compare a combined parcel with a logical split when the
            difference matters.
          </p>
        </InfoCard>
        <InfoCard number="04" title="Packing choices">
          <p>
            Boxes, corner protection, moisture barriers and extra cushioning
            add protection but can also add weight or dimensions. Choose them
            for the item&apos;s real risk.
          </p>
        </InfoCard>
        <InfoCard number="05" title="Restrictions and customs">
          <p>
            A route must accept the destination, product type, packed weight and
            dimensions before its headline price matters. Route availability
            does not guarantee customs clearance or that no taxes will apply.
          </p>
        </InfoCard>
        <InfoCard number="06" title="Complete cost stages">
          <p>
            Keep item price, domestic Chinese delivery and international
            shipping separate. Add current payment, packing or optional service
            costs only where they actually apply.
          </p>
        </InfoCard>
      </section>

      <section className="section-shell calculation-section">
        <div>
          <p className="eyebrow">Illustrative dimensional-weight example</p>
          <h2>Size can outweigh the scale</h2>
          <p>
            A 50 × 40 × 30 cm parcel contains 60,000 cubic centimetres. If—and
            only if—the live route uses a divisor of 6,000, the dimensional
            result is 10 kg. A route billing the greater of actual and
            dimensional weight could therefore charge 10 kg even if the parcel
            weighs 6.2 kg on a scale.
          </p>
        </div>
        <div className="formula-card" aria-label="Dimensional weight example">
          <span>50 × 40 × 30</span>
          <b>÷ 6,000</b>
          <strong>= 10 kg</strong>
          <small>
            Example only. Use the live route&apos;s divisor and billing rule.
          </small>
        </div>
      </section>

      <section className="section-shell decision-section">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">Parcel comparison</p>
            <h2>Estimate early, decide with packed data</h2>
          </div>
          <p>
            Compare only eligible routes using the same parcel inputs. Price
            alone is incomplete without restrictions, tracking, stated transit
            range and compensation terms.
          </p>
        </div>
        <div className="shipping-check-grid">
          {[
            ["01", "Accepted items", "Resolve QC issues before packing."],
            ["02", "Packed data", "Check weight, dimensions and billing method."],
            ["03", "Eligible route", "Confirm product and destination limits."],
            ["04", "Protection", "Balance reduced volume against item risk."],
            ["05", "Import rules", "Review current destination requirements."],
            ["06", "Saved record", "Keep the final quote and parcel summary."],
          ].map(([number, title, text]) => (
            <article key={title}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <DetailedCardSection
        copy={depth}
        ariaLabel="Shipping route comparison record"
      />

      <section className="section-shell subpage-note">
        <p className="eyebrow">1,200–1,800 word editorial guide</p>
        <h2>Read the complete LoloBuy shipping cost guide</h2>
        <p>
          The long-form guide covers cost stages, actual versus volumetric
          weight, consolidation, packaging, route restrictions, customs,
          storage planning and tracking expectations.
        </p>
        <Link
          className="button button-primary"
          href="/articles/lolobuy-shipping-cost-guide"
        >
          Read the full shipping guide <span aria-hidden="true">→</span>
        </Link>
      </section>
    </>,
    locale,
  );
}

function ArticlesPage({ locale }: { locale: Locale }) {
  const articleSummaries = guideDepthCopy[locale].articleSummaries;
  const depth = guideDepthCopy[locale].articles;

  return localizeReactNode(
    <>
      <section className="section-shell reading-order">
        <div>
          <p className="eyebrow">Start with the buying journey</p>
          <h2>Discovery first. QC second. Shipping third.</h2>
        </div>
        <ol>
          <li>
            <span>01</span>
            <p>
              Find and document the exact product before discussing warehouse
              quality or parcel cost.
            </p>
          </li>
          <li>
            <span>02</span>
            <p>
              Compare the warehouse arrival with the saved order record and the
              selected option.
            </p>
          </li>
          <li>
            <span>03</span>
            <p>
              Build the international parcel only after accepted items and
              realistic packed data are available.
            </p>
          </li>
        </ol>
      </section>

      <DetailedCardSection
        copy={depth}
        ariaLabel="Guide selection by buying stage"
      />

      <section className="section-shell article-index" aria-label="Buying guides">
        {articles.map((article, index) => (
          <article key={article.slug}>
            <div className="article-index-image">
              <img
                src={article.image}
                alt={article.imageAlt}
                width="1200"
                height="630"
                loading={index === 0 ? "eager" : "lazy"}
              />
              <span>{String(index + 1).padStart(2, "0")}</span>
            </div>
            <div className="article-index-copy">
              <p className="article-type">{article.eyebrow}</p>
              <h2>
                <Link href={`/articles/${article.slug}`}>{article.title}</Link>
              </h2>
              <p>{articleSummaries[article.slug]}</p>
              <dl>
                <div>
                  <dt>Primary topic</dt>
                  <dd>{article.primaryKeyword}</dd>
                </div>
                <div>
                  <dt>Length</dt>
                  <dd>
                    {articleWordCount(article).toLocaleString("en-US")} words
                  </dd>
                </div>
                <div>
                  <dt>Fact checked</dt>
                  <dd>{article.checkedDate}</dd>
                </div>
              </dl>
              <Link
                className="button button-secondary"
                href={`/articles/${article.slug}`}
              >
                Read the complete guide <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section className="section-shell editorial-standard">
        <div>
          <p className="eyebrow">Editorial standard</p>
          <h2>Facts, examples and uncertainty stay separate</h2>
        </div>
        <ul>
          <li>
            Official public statements are dated and described as statements,
            not independent guarantees.
          </li>
          <li>
            Illustrative calculations are labeled and never presented as a
            fixed LoloBuy fee.
          </li>
          <li>
            Individual customer reports are identified as individual
            experiences, not manufactured ratings.
          </li>
          <li>
            Product availability, seller terms, services and shipping routes
            are treated as changeable live information.
          </li>
        </ul>
      </section>
    </>,
    locale,
  );
}

function LearnPage({ locale }: { locale: Locale }) {
  return <ArticlesPage locale={locale} />;
}

function FaqPage({ locale }: { locale: Locale }) {
  const depth = guideDepthCopy[locale].faq;

  return localizeReactNode(
    <>
      <section className="section-shell research-fact-band">
        <div>
          <p className="eyebrow">{depth.eyebrow}</p>
          <h2>{depth.title}</h2>
        </div>
        <div className="research-facts">
          <p>{depth.intro}</p>
          {depth.points.map((point) => (
            <p key={point}>{point}</p>
          ))}
        </div>
      </section>
      <section className="section-shell faq-section faq-page-section">
        <div className="faq-title">
          <p className="eyebrow">Fact-checked practical answers</p>
          <h2>Know which details are fixed—and which can change</h2>
          <p>
            Official public statements are dated. Live seller inventory,
            platform terms, routes and fees should always be rechecked for the
            active order.
          </p>
        </div>
        <div className="faq-list">
          {faqItems.map((item, index) => (
            <details key={item.question} open={index === 0}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="section-shell subpage-note">
        <p className="eyebrow">Still looking for an item?</p>
        <h2>Search the main catalog with the exact product term</h2>
        <CatalogSearch locale={locale} />
      </section>
    </>,
    locale,
  );
}

function HowItWorksPage({ locale }: { locale: Locale }) {
  const copy = guideDepthCopy[locale].how;

  return localizeReactNode(
    <>
      <section className="section-shell research-fact-band">
        <div>
          <p className="eyebrow">{copy.factEyebrow}</p>
          <h2>{copy.factTitle}</h2>
        </div>
        <div className="research-facts">
          {copy.facts.map((fact) => (
            <p key={fact}>{fact}</p>
          ))}
        </div>
      </section>
      <section className="section-shell subpage-section" id="buying-flow">
        <ol className="steps-grid">
          {copy.steps.map((step, index) => (
            <li key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{step.title}</h2>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="section-shell depth-section-heading">
        <div>
          <p className="eyebrow">{copy.errorEyebrow}</p>
          <h2>{copy.errorTitle}</h2>
        </div>
        <p>{copy.errorIntro}</p>
      </section>
      <section className="subpage-card-grid" aria-label="Common ordering errors">
        {copy.errors.map((error, index) => (
          <InfoCard
            key={error.title}
            number={String(index + 1).padStart(2, "0")}
            title={error.title}
          >
            <p>{error.body}</p>
          </InfoCard>
        ))}
      </section>
      <section className="section-shell subpage-note">
        <p className="eyebrow">Start here</p>
        <h2>Use the exact keyword you already have in mind</h2>
        <CatalogSearch locale={locale} />
      </section>
    </>,
    locale,
  );
}

export function GuidePage({
  kind,
  locale = "en",
}: {
  kind: PageKind;
  locale?: Locale;
}) {
  const intro = pageIntro[kind];
  const active =
    kind === "how-it-works" || kind === "learn" ? undefined : kind;

  return localizeReactNode(
    <>
      <SiteHeader active={active} locale={locale} />
      <main className="subpage-main">
        <section className="subpage-hero">
          <div>
            <p className="subpage-breadcrumb">
              <Link href="/">Home</Link> <span>/</span> {intro.eyebrow}
            </p>
            <p className="eyebrow">{intro.eyebrow}</p>
            <h1>{intro.title}</h1>
            <p>{intro.intro}</p>
          </div>
        </section>
        {kind === "products" && <ProductsPage locale={locale} />}
        {kind === "categories" && <CategoriesPage locale={locale} />}
        {kind === "qc-guide" && <QcPage locale={locale} />}
        {kind === "shipping" && <ShippingPage locale={locale} />}
        {kind === "learn" && <LearnPage locale={locale} />}
        {kind === "articles" && <ArticlesPage locale={locale} />}
        {kind === "faq" && <FaqPage locale={locale} />}
        {kind === "how-it-works" && <HowItWorksPage locale={locale} />}
      </main>
      <SiteFooter locale={locale} />
    </>,
    locale,
  );
}
