import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductImage } from "../../product-image";
import {
  categoryInternalPath,
  getProduct,
  productInternalPath,
  productPriceUsd,
  productSnapshotDate,
  products,
} from "../../site-data";
import { absoluteUrl } from "../../i18n";
import { SiteFooter, SiteHeader } from "../../site-shell";

export function generateStaticParams() {
  return products.map((product) => ({ id: String(product.id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return {};

  const canonical = productInternalPath(product.id);
  const description = `${product.name}: recorded CNY and USD reference values, selection notes, product-specific QC checks and the matching current catalog link.`;

  return {
    title: { absolute: `${product.name} | LoloBuy Spreadsheet Find` },
    description,
    alternates: { canonical },
    openGraph: {
      title: `${product.name} | LoloBuy Spreadsheet Find`,
      description,
      type: "website",
      url: canonical,
      images: [{ url: product.image, width: 750, height: 750, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | LoloBuy Spreadsheet Find`,
      description,
      images: [product.image],
    },
  };
}

export default async function ProductReferencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  const canonical = absoluteUrl(productInternalPath(product.id));
  const categoryPath = categoryInternalPath(product.categorySlug);
  const itemPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemPage",
    name: product.name,
    description: product.selectionNote,
    url: canonical,
    primaryImageOfPage: absoluteUrl(product.image),
    dateModified: productSnapshotDate,
    isPartOf: {
      "@type": "WebSite",
      name: "LoloBuy Sheet",
      url: absoluteUrl("/"),
    },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Products", item: absoluteUrl("/products") },
      { "@type": "ListItem", position: 3, name: product.name, item: canonical },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <SiteHeader active="products" />
      <main className="product-reference-main">
        <article className="product-reference-page">
          <nav className="product-reference-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/products">Products</Link><span>/</span>
            <span aria-current="page">Item {product.id}</span>
          </nav>

          <section className="product-reference-hero">
            <figure>
              <ProductImage product={product} priority sizes="(max-width: 760px) 100vw, 48vw" />
            </figure>
            <div>
              <p className="eyebrow">INDEPENDENT PRODUCT REFERENCE</p>
              <h1>{product.name}</h1>
              <Link className="product-reference-category" href={categoryPath}>
                {product.category}
              </Link>
              <dl className="product-reference-facts">
                <div><dt>USD reference</dt><dd>${productPriceUsd(product.priceCny)}</dd></div>
                <div><dt>Original CNY snapshot</dt><dd>¥{product.priceCny}</dd></div>
                <div><dt>Item reference</dt><dd>{product.id}</dd></div>
                <div><dt>Snapshot checked</dt><dd><time dateTime={productSnapshotDate}>30 July 2026</time></dd></div>
              </dl>
              <p className="product-reference-notice">
                These are dated reference values, not a live offer. The current listing controls price, stock, seller details and available variants.
              </p>
              <div className="product-reference-actions">
                <a className="button button-primary" href={product.url} target="_blank" rel="sponsored noopener noreferrer">
                  Open current product page <span aria-hidden="true">↗</span>
                </a>
                <Link className="button button-secondary" href="/products">
                  Back to product finds
                </Link>
              </div>
            </div>
          </section>

          <section className="product-reference-editorial">
            <article>
              <span>01</span>
              <h2>Confirm the selected variant</h2>
              <p>{product.selectionNote}</p>
              <p>Save the current source page, option wording, price and date before submitting an order. A product image alone cannot identify every colour, size, version or included accessory.</p>
            </article>
            <article>
              <span>02</span>
              <h2>Use product-specific QC</h2>
              <p>{product.qcFocus}</p>
              <p>Warehouse photographs document visible condition at one point in time. They cannot prove fit, hidden construction, durability, material composition or authenticity.</p>
            </article>
            <article>
              <span>03</span>
              <h2>Plan the parcel from measured data</h2>
              <p>Only plan international shipping after the item is accepted. Compare the packed weight, parcel dimensions, eligible routes and protection choices shown for the actual parcel.</p>
              <p>Do not estimate international shipping from the product price. Packaging can protect the item while also increasing chargeable or volumetric weight.</p>
            </article>
          </section>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
