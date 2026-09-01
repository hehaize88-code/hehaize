import type { Metadata } from "next";
import { InnerShell } from "../../components/InnerShell";
import { ProductCard } from "../../components/ProductCard";
import { categories, products } from "../../site-data";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  return {
    title: category ? `CSSBuy ${category.name} Spreadsheet 2026` : "CSSBuy Product Category",
    description: category ? `Browse checked CSSBuy ${category.name.toLowerCase()} finds with recorded CNY values, direct product routes, and category-specific listing, QC, and parcel checks.` : "Browse focused CSSBuy spreadsheet categories.",
    alternates: { canonical: `/category/${slug}` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug) ?? categories[0];
  const matches = products.filter((product) => product.category === category.slug);
  const fallback = products.filter((product) => product.category !== category.slug).slice(0, 4);
  const categoryUrl = `https://cssbuychina.net/category/${category.slug}`;
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://cssbuychina.net/" },
      { "@type": "ListItem", position: 2, name: "Categories", item: "https://cssbuychina.net/categories" },
      { "@type": "ListItem", position: 3, name: `${category.name} Spreadsheet`, item: categoryUrl },
    ],
  };

  return (
    <InnerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <section className="inner-hero category-hero">
        <div>
          <p className="eyebrow"><span /> Category index</p>
          <h1>CSSBuy {category.name} Spreadsheet</h1>
          <p>Browse {category.searchLabel.toLowerCase()} with recorded CNY values, individual research pages, direct product routes, and checks written for this category.</p>
        </div>
        <div className="category-glyph" aria-hidden="true">{category.symbol}</div>
      </section>
      <section className="category-content">
        <div className="category-copy">
          <span>LINK STATUS / CHECKED 01.09.2026</span>
          <h2>What to check before choosing {category.name.toLowerCase()}</h2>
          <p>{category.checkSummary}</p>
          <a href={category.storeUrl} rel="nofollow" data-track-event="category_outbound_click" data-item-category={category.slug} data-click-area="category-detail-cta">Open the full {category.name} category <span aria-hidden="true">↗</span></a>
        </div>
        <div>
          <div className="section-heading compact-heading"><h2>{matches.length ? `Checked ${category.name} finds` : "Live category available"}</h2><p>{matches.length ? `${matches.length} representative links in this index.` : "This index has no local sample cards for the category yet; the direct category route is already connected."}</p></div>
          {matches.length ? <div className="product-grid category-product-grid">{matches.map((product) => <ProductCard product={product} key={product.id} />)}</div> : (
            <div className="category-empty"><b>Browse the complete live category.</b><p>The category button opens the matching product department rather than a generic catalog page.</p><a href={category.storeUrl} rel="nofollow" data-track-event="category_outbound_click" data-item-category={category.slug} data-click-area="category-empty-cta">Open {category.name} finds ↗</a></div>
          )}
        </div>
      </section>
      <section className="related-section">
        <div className="section-heading compact-heading"><h2>Explore another department</h2><a className="text-link" href="/products">All finds ↗</a></div>
        <div className="product-grid category-product-grid">{fallback.map((product) => <ProductCard product={product} key={product.id} />)}</div>
      </section>
    </InnerShell>
  );
}
