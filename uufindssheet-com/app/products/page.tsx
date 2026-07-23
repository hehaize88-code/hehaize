import type { Metadata } from "next";
import Link from "next/link";
import { SiteImage } from "../components/site-image";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { products } from "./product-data";
import { localizedAlternates } from "../seo-alternates";

export const metadata: Metadata = {
  title: "Product Detail Research with UUFinds QC Checks | UUFinds Sheet",
  description: "Browse eight CNBuy Sheet product routes, understand what listing images can and cannot prove, and apply a fact-checked UUFinds QC research method.",
  alternates: localizedAlternates("/products/"),
  openGraph: {
    title: "Product Detail Research with UUFinds QC Checks | UUFinds Sheet",
    description: "Browse eight CNBuy Sheet product routes, understand what listing images can and cannot prove, and apply a fact-checked UUFinds QC research method.",
    url: "/products/",
    siteName: "UUFinds Sheet",
    type: "website",
  },
};

export default function ProductsPage() {
  return (
    <main className="hub-page">
      <SiteHeader routePath="/products/" />
      <section className="hub-hero">
        <p className="eyebrow">Products / 08 direct listing routes</p>
        <h1>See the listing.<br /><em>Separate it from QC evidence.</em></h1>
        <p>The images below come from the corresponding CNBuy Sheet listings; they are not labeled as UUFinds warehouse QC albums. Open a detail page, note the exact item ID, then use the official UUFinds research functions only when matched QC media is available for that source.</p>
      </section>
      <section className="hub-content">
        <div className="product-showcase-grid">
          {products.map((product, index) => (
            <Link className="product-card" href={`/products/${product.slug}/`} key={product.slug}>
              <div className="product-card-image">
                <SiteImage src={product.images[0]} alt={product.name} width={800} height={800} />
                <span>{String(index + 1).padStart(2, "0")} / 08</span>
              </div>
              <div className="product-card-copy">
                <p>{product.category}</p><h2>{product.shortName}</h2>
                <div><span>¥{product.price}</span><b>View details ↗</b></div>
              </div>
            </Link>
          ))}
        </div>

        <section className="evidence-matrix">
          <div className="section-heading">
            <div><p className="eyebrow">Listing image versus QC evidence</p><h2>Do not grade the wrong photo set.</h2></div>
            <p>UUFinds says it can help find QC photos and videos. The first job is still matching that material to the exact item you intend to open.</p>
          </div>
          <div className="evidence-grid">
            <article><p className="step-label">LISTING IMAGE</p><h3>Shows how the product is presented</h3><p>Use it to identify the model, color, design and seller-facing description on the current product page.</p><strong>It may be a catalog or promotional image rather than a warehouse sample.</strong></article>
            <article><p className="step-label">MATCHED QC PHOTO</p><h3>Shows one photographed item</h3><p>Use it to inspect visible shape, construction, finish and measurements when the source link or item ID agrees.</p><strong>It documents a sample, not every future unit.</strong></article>
            <article><p className="step-label">QC VIDEO</p><h3>Adds motion and hidden angles</h3><p>Use video to examine fabric drape, zipper movement, sole flex, reflective material or angles missing from still images.</p><strong>It does not confirm durability, authenticity or internal specifications.</strong></article>
            <article><p className="step-label">LIVE DESTINATION</p><h3>Confirms current listing data</h3><p>Use CNBuy Sheet to re-check the product ID, current price, available variants, size details and destination link.</p><strong>If live information conflicts with an older guide, use the live page.</strong></article>
          </div>
        </section>

        <div className="source-method-note">
          <p className="eyebrow">Research rule / Reviewed July 23, 2026</p>
          <p>UUFinds publicly supports QC-photo and QC-video discovery, image recognition and marketplace or agent-link handling, but it does not sell the products. These product cards lead only to CNBuy Sheet, where current listing information must be confirmed.</p>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
