import Link from "next/link";
import PageHero from "@/components/PageHero";
import { GuideShell, GuideSection } from "@/components/GuideLayout";
import { ArrowIcon, CheckIcon } from "@/components/Icons";
import { SITE_URL } from "@/data/site";
import { createBreadcrumbSchema } from "@/data/structured-data";

const OFFICIAL_SITE = "https://hubbuy.com/";
const OFFICIAL_EXAMPLES = [
  "https://hubbuy.com/product/0/739628897330",
  "https://hubbuy.com/product/0/977294707440",
  "https://hubbuy.com/product/2/7315036362",
];

export const metadata = {
  title: "Hubbuy Warehouse QC Checklist by Product Category",
  description: "Use category-specific Hubbuy warehouse checks for clothing, shoes, bags, accessories and electronics, including useful angles, labels and measurement requests.",
  alternates: { canonical: "/guides/qc-checks/" },
  openGraph: {
    title: "Hubbuy Warehouse QC Checklist by Product Category",
    description: "A practical checklist for choosing useful warehouse views, labels and measurements by product type.",
    url: `${SITE_URL}/guides/qc-checks/`,
    images: [{ url: "/brand/og-card.png", width: 1200, height: 630, alt: "Hubbuy warehouse QC checklist" }],
  },
};

const toc = [
  { id: "official", label: "Confirm the live interface" },
  { id: "purpose", label: "Set the evidence boundary" },
  { id: "source", label: "Save the exact variant" },
  { id: "universal", label: "Run five base checks" },
  { id: "category", label: "Choose your category" },
  { id: "request", label: "Request one missing view" },
  { id: "sources", label: "Official sources" },
];

export default function QCPage() {
  const guideSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Hubbuy Warehouse QC Checklist by Product Category",
    description: metadata.description,
    url: `${SITE_URL}/guides/qc-checks/`,
    datePublished: "2026-07-20",
    dateModified: "2026-07-20",
    inLanguage: "en",
    author: { "@type": "Organization", name: "Hubbuy Sheet Editorial", url: `${SITE_URL}/about/` },
    publisher: { "@type": "Organization", name: "Hubbuy Sheet" },
    image: [`${SITE_URL}/products/3359.webp`, `${SITE_URL}/products/3346.webp`],
    citation: [OFFICIAL_SITE, ...OFFICIAL_EXAMPLES],
    step: [
      "Save the exact product variant and source evidence",
      "Check identity, quantity, visible condition, labels and scale",
      "Apply the clothing, footwear, bag or electronics checklist",
      "Request one precise missing angle or measurement",
      "Decide from visible evidence without treating photos as certification",
    ].map((name, index) => ({ "@type": "HowToStep", position: index + 1, name })),
  };
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Hubbuy warehouse QC checklist", path: "/guides/qc-checks/" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(guideSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PageHero
        eyebrow="Category checklist · Updated July 2026"
        title="A category-by-category Hubbuy warehouse QC checklist."
        intro="Choose the checks that match the product: useful views, readable labels, measurements and one precise request when an important detail is missing."
        crumbs={["Guides", "QC checks"]}
        noTranslate
      />
      <div className="wrap guide-review-meta" data-no-translate><Link href="/about/">Hubbuy Sheet Editorial</Link><span>Last fact-checked 20 July 2026</span></div>
      <GuideShell toc={toc} noTranslate>
        <div className="guide-purpose-note"><span>Use this page during warehouse review</span><strong>A product-category checklist, not a general QC photo article.</strong><p>For a deeper explanation of photographic evidence, uncertainty and acceptance decisions, read <Link href="/articles/hubbuy-qc-photos-guide/">how to interpret Hubbuy QC photos</Link>.</p></div>
        <GuideSection id="official" kicker="Before using the checklist" title="Confirm which QC fields and images the live order provides">
          <p>The official Hubbuy homepage describes the service as a purchasing agent for Chinese marketplaces including Taobao and 1688 and presents a shipping-cost estimate. On the public product pages reviewed on 20 July 2026, we also found a dedicated <strong>QC Images</strong> area with a <strong>View More</strong> link.</p>
          <p>Those product pages can also display listing-level signals such as estimated warehouse arrival, average delivery time, weight and package dimensions. The fields vary by product, and an estimate on one listing is not a permanent service promise for every order.</p>

          <div className="official-research-grid">
            <article><span>01</span><strong>QC Images</strong><p>A named image area appears on the public product examples reviewed.</p></article>
            <article><span>02</span><strong>Warehouse estimate</strong><p>Listings may show an estimated date for arrival at the Hubbuy warehouse.</p></article>
            <article><span>03</span><strong>Weight and size</strong><p>Some public listings expose grams and centimetre dimensions before ordering.</p></article>
            <article><span>04</span><strong>Delivery signal</strong><p>Some listings show an average domestic delivery time; treat it as product-level context.</p></article>
          </div>

          <figure className="qc-customer-figure" data-no-translate>
            <div className="qc-customer-visual">
              <div className="qc-customer-copy">
                <span>BEFORE YOU APPROVE</span>
                <h3>Turn every QC photo into a simple decision.</h3>
                <p>Open the saved order beside the warehouse images, then answer three practical questions.</p>
                <div className="qc-question-list">
                  <div><b>01</b><span><strong>Match the order</strong><small>Is it the color, model and size you selected?</small></span></div>
                  <div><b>02</b><span><strong>Check visible condition</strong><small>Can you see stains, damage, deformation or missing parts?</small></span></div>
                  <div><b>03</b><span><strong>Confirm key details</strong><small>Are the labels, measurements and included pieces clear?</small></span></div>
                </div>
              </div>
              <div className="qc-example-photo">
                <img src="/products/3356.webp" alt="Front and back catalog views used as a QC comparison example" width="750" height="750" />
                <span className="qc-photo-tag qc-photo-tag-front">Front view</span>
                <span className="qc-photo-tag qc-photo-tag-back">Back view</span>
                <span className="qc-photo-tag qc-photo-tag-detail">Key details</span>
              </div>
            </div>
            <figcaption>Illustrative catalog reference. Open the live Hubbuy QC Images in your order to review the actual warehouse item.</figcaption>
          </figure>

          <div className="photo-options-note">
            <CheckIcon />
            <div><strong>Need another angle?</strong><p>Check the current photo options shown in your Hubbuy order before requesting an extra view; availability and fees can change.</p></div>
          </div>
        </GuideSection>

        <GuideSection id="purpose" kicker="Evidence boundary" title="Use photos for visible decisions, not product certification">
          <p>The verified fact is that public Hubbuy product pages expose a QC Images area. What those images can prove still depends on the angle, lighting and visible detail. A warehouse photo can help confirm that an item arrived, resembles the ordered variant and has no obvious external damage.</p>
          <p>It cannot establish long-term durability, material composition, authenticity, internal electronics condition or exact fit. Treat the images as evidence for a specific keep, exchange or return decision—not as a general quality certificate.</p>
          <div className="qc-boundary-grid">
            <div><span>Photos can help show</span><strong>Variant · quantity · visible condition · labels · measurements</strong></div>
            <div><span>Photos cannot guarantee</span><strong>Authenticity · durability · internal function · exact fit · delivery outcome</strong></div>
          </div>
        </GuideSection>

        <GuideSection id="source" kicker="Before warehouse review" title="Save the exact source variant before you order">
          <p>QC review works only when you know what the warehouse image should be compared with. Save the source URL, selected color, size or model, seller size chart and a screenshot of the exact option. A listing that contains several colors or models under one page makes this especially important.</p>
          <div className="source-variant-visual">
            <figure>
              <img src="/products/3359.webp" alt="Catalog reference image showing multiple shoe variants" width="750" height="750" />
              <figcaption><strong>Footwear example:</strong> color, side profile, sole shape and size label should match the selected option.</figcaption>
            </figure>
            <figure>
              <img src="/products/3346.webp" alt="Catalog reference image showing multiple backpack variants" width="750" height="750" />
              <figcaption><strong>Bag example:</strong> color blocking, hardware, straps and included pieces are useful comparison points.</figcaption>
            </figure>
          </div>
          <p className="visual-disclaimer">These are catalog reference images from products linked by this website, not Hubbuy warehouse QC photographs and not authenticity claims. They illustrate why the selected variant must be saved before review.</p>
        </GuideSection>

        <GuideSection id="universal" kicker="Every category" title="Run the same five checks before zooming into details">
          <ul className="check-list numbered">
            <li><strong>Identity:</strong> Does the product type, color and model match the saved order?</li>
            <li><strong>Quantity:</strong> Are all ordered pieces, pairs and visibly promised accessories present?</li>
            <li><strong>Condition:</strong> Look for stains, tears, cracks, dents, deformation or transit damage.</li>
            <li><strong>Labels:</strong> Compare the visible size or model label with the selected variant.</li>
            <li><strong>Scale:</strong> Use a measurement reference or request dimensions when size affects the decision.</li>
          </ul>
        </GuideSection>

        <GuideSection id="category" kicker="Choose the product type" title="Use the checklist that matches the item">
          <div className="qc-category-grid">
            <article><span>Shoes</span><h3>Shape and sizing</h3><p>Compare both outer sides, heels, toe shape, outsoles and size tags. Ask for insole length when fit is uncertain.</p></article>
            <article><span>Clothing</span><h3>Measurements and finish</h3><p>Check front, back, size tag, seams and key print details. Chest width and garment length are more useful than a size label alone.</p></article>
            <article><span>Bags</span><h3>Alignment and hardware</h3><p>Use straight views of the front, back, base and interior. Check straps and included parts against the source listing.</p></article>
            <article><span>Electronics</span><h3>Visible identity only</h3><p>Photos can show the model and exterior condition but do not prove full operation. Check current battery and testing rules before ordering.</p></article>
          </div>
        </GuideSection>

        <GuideSection id="request" kicker="When a view is missing" title="One precise request beats five vague photos">
          <p>Write the exact view and purpose: “Please photograph the size label clearly,” “Please measure the insole from heel to toe,” or “Please show the left corner under direct light.” Avoid “check quality,” because it does not tell the warehouse worker which visible fact would change your decision.</p>
          <p>Because the public pages reviewed do not publish a universal current extra-photo allowance or price, confirm the available photo options and any fee in the live order interface before submitting the request.</p>
          <div className="callout"><strong>Keep evidence together</strong><p>Save the source screenshot, selected variant, Hubbuy QC images and any extra-photo result until the return window has passed and the parcel is delivered.</p></div>
        </GuideSection>

        <GuideSection id="sources" kicker="Research record" title="Official pages checked for this guide">
          <p>This page was reviewed against public Hubbuy pages on 20 July 2026. The links below support the statements about the agent positioning, QC Images label, warehouse estimates and product-level metrics. The practical checklist is our independent editorial interpretation.</p>
          <div className="official-source-links">
            <a href={OFFICIAL_SITE} target="_blank" rel="noopener"><span>Official homepage</span><strong>Agent positioning and shipping estimate</strong><ArrowIcon /></a>
            <a href={OFFICIAL_EXAMPLES[0]} target="_blank" rel="noopener"><span>Official product example 01</span><strong>QC Images and warehouse-arrival estimate</strong><ArrowIcon /></a>
            <a href={OFFICIAL_EXAMPLES[1]} target="_blank" rel="noopener"><span>Official product example 02</span><strong>QC Images and product-level fields</strong><ArrowIcon /></a>
            <a href={OFFICIAL_EXAMPLES[2]} target="_blank" rel="noopener"><span>Official product example 03</span><strong>QC Images, weight and dimensions</strong><ArrowIcon /></a>
          </div>
          <p className="source-note">Hubbuy can change labels, rules, fees and availability after this review date. Re-check the live page before ordering or paying for an optional service.</p>
        </GuideSection>
      </GuideShell>
    </>
  );
}
