import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, products } from "../product-data";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
import { SiteImage } from "../../components/site-image";
import { localizedAlternates } from "../../seo-alternates";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  const seoTitle = `${product.shortName} QC & Spreadsheet Guide | UUFinds`;
  const seoDescription = `Research ${product.shortName} as a traceable spreadsheet find, match available QC photos by item ID and open the exact current product page.`;

  return {
    title: seoTitle,
    description: seoDescription,
    alternates: localizedAlternates(`/products/${product.slug}/`),
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: "website",
      url: `/products/${product.slug}/`,
      images: [{ url: product.images[0], alt: product.name }],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <main className="product-page">
      <SiteHeader routePath={`/products/${product.slug}/`} />
      <div className="guide-subnav"><Link className="back-link" href="/products/">← Back to product finds</Link></div>

      <div className="product-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link><span>/</span><a href={product.categoryUrl} target="_blank" rel="noreferrer">{product.category}</a><span>/</span><strong>Product detail</strong>
      </div>

      <article className="product-detail">
        <div className="product-gallery">
          <div className="product-main-image">
            <SiteImage src={product.images[0]} alt={product.name} width={1200} height={1200} priority />
            <span>01 / {String(product.images.length).padStart(2, "0")}</span>
          </div>
          <div className="product-thumbnails" aria-label="Additional product images">
            {product.images.slice(1).map((image, index) => (
              <div key={image}>
                <SiteImage src={image} alt={`${product.name} — view ${index + 2}`} width={700} height={700} />
                <span>{String(index + 2).padStart(2, "0")}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="product-summary">
          <p className="eyebrow">Product find / {product.category}</p>
          <h1>{product.shortName} QC &amp; Spreadsheet Guide</h1>
          <p className="product-deck">Use this {product.shortName} spreadsheet find as a traceable starting point. These are images published with the corresponding main-site listing, not a claimed UUFinds QC album. Keep the item ID attached, then compare separately matched QC material when it exists.</p>

          <div className="product-price-row">
            <div><small>PRICE SHOWN</small><strong>¥{product.price}</strong></div>
            <div><small>MAIN-SITE ID</small><strong>{product.listingId}</strong></div>
          </div>

          <a className="primary-product-cta" href={product.mainSiteUrl} target="_blank" rel="noreferrer">
            View this product on the main site <span aria-hidden="true">↗</span>
          </a>

          <div className="live-note">
            <strong>Checked {product.checked}</strong>
            <p>The displayed price and images are a dated snapshot. Confirm the current main-site listing for price, availability, sizes, colors, seller or source link and other live details.</p>
          </div>
        </div>
      </article>

      <section className="product-checks">
        <div>
          <p className="eyebrow inverse">Apply the UUFinds research method</p>
          <h2>How to review {product.shortName} QC evidence.</h2>
        </div>
        <div className="product-check-grid">
          <article><span>01</span><h3>Match the exact source</h3><p>Confirm that the destination still shows item ID {product.listingId}. If UUFinds returns QC media, compare its source link, seller and visible variant—not only a similar thumbnail.</p></article>
          <article><span>02</span><h3>Inspect the visible evidence</h3><p>Review {product.inspectionFocus}. Compare more than one angle and record missing views or measurements as unknowns.</p></article>
          <article><span>03</span><h3>Verify current facts</h3><p>Check the current price, available variants, size information, availability and seller or source details on the main-site product page before deciding.</p></article>
        </div>
      </section>

      <section className="product-source-panel">
        <div><p className="eyebrow">Evidence boundary</p><h2>Separate {product.shortName} listing media from QC media.</h2></div>
        <div>
          <p>UUFinds publicly describes QC-photo and QC-video discovery, image recognition and supported link handling, while also stating that it does not sell products. This independent page likewise does not process an order. It identifies the main-site product, explains what to inspect and keeps the final destination explicit.</p>
          <div className="product-source-links"><a href={product.mainSiteUrl} target="_blank" rel="noreferrer">Main-site details ↗</a><a href={product.categoryUrl} target="_blank" rel="noreferrer">More {product.category} ↗</a><Link href="/guides/uufinds-qc-checklist/">QC checklist →</Link></div>
        </div>
      </section>

      <SiteFooter />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemPage",
        name: `${product.name} QC and spreadsheet research guide`,
        description: `Independent ${product.name} spreadsheet find with QC research steps and a direct link to the matching current product page.`,
        url: `https://uufindssheet.com/products/${product.slug}/`,
        primaryImageOfPage: product.images[0],
        dateModified: "2026-08-08",
        mainEntity: {
          "@type": "Product",
          name: product.name,
          image: product.images,
          sku: product.listingId,
          category: product.category,
          url: product.mainSiteUrl,
        },
      }) }} />
    </main>
  );
}
