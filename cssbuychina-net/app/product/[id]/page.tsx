import type { Metadata } from "next";
import { InnerShell } from "../../components/InnerShell";
import { ProductCard } from "../../components/ProductCard";
import { products } from "../../site-data";

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((item) => item.id === id);
  return {
    title: product ? `${product.name} – CSSBuy Find` : "CSSBuy Product Find",
    description: product?.summary ?? "Review a checked CSSBuy spreadsheet find with a recorded CNY value, warehouse checklist, and direct product route.",
    alternates: { canonical: `/product/${id}` },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((item) => item.id === id) ?? products[0];
  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3);
  const more = related.length ? related : products.filter((item) => item.id !== product.id).slice(0, 3);

  return (
    <InnerShell>
      <nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href={`/category/${product.category}`}>{product.categoryLabel}</a><span>/</span><span>{product.name}</span></nav>
      <section className="product-detail">
        <div className="detail-image"><img src={product.image} alt={product.name} /><span>PRODUCT ROUTE CHECKED · {product.checked.toUpperCase()}, 2026</span></div>
        <div className="detail-copy">
          <p className="eyebrow dark"><span /> {product.categoryLabel} find</p>
          <h1>{product.name}</h1>
          <p className="detail-summary">{product.summary}</p>
          <div className="detail-price"><strong>≈ ${product.usd}</strong><span>Recorded product value: ¥{product.cny}</span></div>
          <p className="price-note">USD is an approximate display conversion, not a checkout quote. Seller price, exchange rate, domestic delivery, service fees, and international shipping can change the total.</p>
          <a className="detail-cta" href={product.storeUrl} rel="nofollow">Open product page <span aria-hidden="true">↗</span></a>
          <div className="detail-facts">
            <div><span>ROUTE</span><b>Matching product page</b></div>
            <div><span>QUALITY</span><b>Not guaranteed</b></div>
            <div><span>STATUS</span><b>Link reachable</b></div>
          </div>
        </div>
      </section>
      <section className="inspection-section">
        <div><p className="eyebrow dark"><span /> Before approval</p><h2>A four-point warehouse check</h2><p>CSSBuy publicly lists visible checks including style, quantity, color, size, model, and damage. Photos still show only the supplied angles, so request extra evidence when a detail matters.</p></div>
        <ol>
          <li><span>01</span><b>Shape & alignment</b><p>Compare the pair, panels, seams, print, and overall silhouette.</p></li>
          <li><span>02</span><b>Measurements</b><p>Use real centimeters rather than depending only on a size label.</p></li>
          <li><span>03</span><b>Color & material</b><p>Allow for lighting shifts, but flag obvious mismatches or marks.</p></li>
          <li><span>04</span><b>Parcel impact</b><p>Heavy boxes and bulky jackets can change the international cost.</p></li>
        </ol>
      </section>
      <section className="related-section">
        <div className="section-heading compact-heading"><h2>Related checked finds</h2><a className="text-link" href={`/category/${product.category}`}>More {product.categoryLabel} ↗</a></div>
        <div className="product-grid detail-related">{more.map((item) => <ProductCard product={item} key={item.id} />)}</div>
      </section>
    </InnerShell>
  );
}
