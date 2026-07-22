import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import ProductCard from "@/components/ProductCard";
import { ArrowIcon, CheckIcon, ExternalIcon } from "@/components/Icons";
import { getCategory } from "@/data/categories";
import { getProduct, getProductImageUrl, products, SITE_URL } from "@/data/site";
import { createPageMetadata } from "@/data/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map(({ id }) => ({ id: String(id) }));
}

function referenceDescription(product) {
  return `Review the ${product.name} catalog reference: recorded at ¥${product.price}, source ID ${product.sourceId}, with ${product.category.toLowerCase()} QC and parcel-planning checks.`;
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return {};
  const description = referenceDescription(product);
  const metadata = createPageMetadata({
    title: `${product.name} – Hubbuy Sheet Reference`,
    description,
    path: product.localHref,
    openGraphTitle: `${product.name} | Hubbuy Sheet Product Research`,
    openGraphDescription: description,
    imageAlt: `${product.name} catalog reference`,
  });
  return {
    ...metadata,
    openGraph: { ...metadata.openGraph, type: "article", images: [{ url: product.image, alt: `${product.name} catalog reference` }] },
    twitter: { ...metadata.twitter, images: [product.image] },
  };
}

function variantNote(product) {
  if (/styles|\bCP\b|\d+\+/i.test(product.name)) {
    return `The recorded title signals that this listing may contain several styles or options. Treat the image and ¥${product.price} figure as one catalog reference, not proof that every variation has the same price, material, measurements or availability. Save the exact option shown at checkout.`;
  }
  return `The recorded title does not establish how many colors, sizes or versions are currently selectable. Before using the ¥${product.price} reference, open the live page and save the exact option, seller information and current source images that apply to your intended order.`;
}

function checkedLabel(value) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${value}T00:00:00Z`));
}

export default async function ProductReferencePage({ params }) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  const category = getCategory(product.category === "T-Shirts" ? "t-shirts" : product.category.toLowerCase());
  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4);
  const pageUrl = `${SITE_URL}${product.localHref}`;
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "ItemPage",
    name: `${product.name} catalog reference`,
    description: referenceDescription(product),
    url: pageUrl,
    dateModified: product.checked,
    mainEntity: {
      "@type": "Product",
      name: product.name,
      image: getProductImageUrl(product),
      sku: product.sourceId,
      category: product.category,
      offers: {
        "@type": "Offer",
        url: product.href,
        priceCurrency: "CNY",
        price: product.price,
      },
    },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Products", item: `${SITE_URL}/products/` },
      { "@type": "ListItem", position: 3, name: product.category, item: `${SITE_URL}/categories/${category.slug}/` },
      { "@type": "ListItem", position: 4, name: product.name, item: pageUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PageHero
        eyebrow="Independent product reference"
        title={product.name}
        intro={`A locally indexed review page for catalog item ${product.id}, with the recorded source ID, CNY price reference and ${product.category.toLowerCase()}-specific checks before you open the live listing.`}
        crumbs={["Products", product.category, product.name]}
      />

      <section className="section product-reference-section">
        <div className="wrap product-reference-grid">
          <figure className="product-reference-image">
            <img src={product.image} alt={`${product.name} catalog reference`} width="900" height="900" loading="eager" />
            <figcaption>Catalog reference image recorded on {checkedLabel(product.checked)}. It is not a warehouse QC photograph or an authenticity claim.</figcaption>
          </figure>
          <div className="product-reference-summary">
            <span className="eyebrow">Recorded catalog facts</span>
            <h2>Check the saved reference against the live page.</h2>
            <dl>
              <div><dt>Reference price</dt><dd>¥{product.price} CNY</dd></div>
              <div><dt>CNBuy Sheet item</dt><dd>{product.id}</dd></div>
              <div><dt>Source listing ID</dt><dd>{product.sourceId}</dd></div>
              <div><dt>Category</dt><dd>{product.category}</dd></div>
              <div><dt>Checked</dt><dd>{checkedLabel(product.checked)}</dd></div>
            </dl>
            <a className="live-product-button" href={product.href} target="_blank" rel="noopener">
              Open the current live listing <ExternalIcon />
            </a>
            <p className="product-reference-disclosure">The destination page controls the current seller, price, variants, stock and transaction. Hubbuy Sheet does not sell this item or process an order.</p>
          </div>
        </div>
      </section>

      <section className="section product-decision-section">
        <div className="wrap product-decision-copy">
          <div>
            <span className="eyebrow">What this local page adds</span>
            <h2>A decision record, not another unverified product claim.</h2>
          </div>
          <div className="product-review-prose">
            <p>This page records the catalog label <strong>{product.name}</strong>, the reference price of <strong>¥{product.price}</strong>, CNBuy Sheet item number <strong>{product.id}</strong> and source listing ID <strong>{product.sourceId}</strong>. Those facts make it easier to return to the same reference instead of relying on a screenshot or a generic category link. They do not confirm who manufactured the item, whether a trademark claim is authorized, or whether the seller and inventory remain unchanged.</p>
            <p>{variantNote(product)}</p>
            <p>{category.intro} Compare the current source listing with the option you intend to submit, then keep a screenshot of the title, selected variant, seller and price. If the destination no longer matches this record, rely on the live page and choose whether to continue rather than treating an older spreadsheet entry as a promise.</p>
          </div>
        </div>

        <div className="wrap product-check-grid">
          {category.checks.map((check, index) => (
            <article key={check}><span>0{index + 1}</span><CheckIcon /><p>{check}</p></article>
          ))}
        </div>
      </section>

      <section className="section product-evidence-section">
        <div className="wrap product-evidence-grid">
          <article>
            <span>Warehouse QC focus</span>
            <h2>Ask for evidence that can change the decision.</h2>
            <p>{category.qc}</p>
            <p>Compare the warehouse images with the exact saved option rather than with the product name alone. A clear photograph can support visible checks, but it cannot independently prove authenticity, internal construction, material composition, personal fit or future durability.</p>
            <Link href="/guides/qc-checks/">Open the complete QC checklist <ArrowIcon /></Link>
          </article>
          <article>
            <span>Parcel planning note</span>
            <h2>Recalculate after the packed item is known.</h2>
            <p>{category.shipping}</p>
            <p>International cost and route eligibility depend on the destination, packed weight, dimensions, product restrictions and current line rules. The item price is therefore not a delivered-price quote. Review the parcel page after warehouse arrival and before paying for international shipping.</p>
            <Link href="/guides/shipping/">Open the parcel checklist <ArrowIcon /></Link>
          </article>
        </div>
      </section>

      <section className="section related-product-section">
        <div className="wrap">
          <div className="section-heading inline-heading">
            <div><span className="eyebrow">More {product.category.toLowerCase()}</span><h2>Compare distinct references in the same category.</h2></div>
            <Link href={`/categories/${category.slug}/`}>View all 8 references <ArrowIcon /></Link>
          </div>
          <div className="product-grid category-product-grid">
            {related.map((item) => <ProductCard key={item.id} product={item} />)}
          </div>
          <div className="editorial-note"><strong>Verification boundary</strong><p>Names, brand terms, images and prices reproduce reference information from the linked catalog as checked on {checkedLabel(product.checked)}. They are not endorsements, seller verification or authenticity findings. Re-check the current destination and applicable platform rules before making a decision.</p></div>
        </div>
      </section>
    </>
  );
}
