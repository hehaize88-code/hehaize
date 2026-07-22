import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import PageHero from "@/components/PageHero";
import SearchBox from "@/components/SearchBox";
import { categories, getProductImageUrl, products, MAIN_SITE, SITE_URL } from "@/data/site";
import { createPageMetadata } from "@/data/seo";

export const metadata = createPageMetadata({
  title: "Hubbuy Spreadsheet Finds 2026",
  description: "Browse 64 Hubbuy spreadsheet product references across eight categories, with local research pages, CNY prices, source IDs, QC prompts and live destinations.",
  path: "/products/",
});

export default function ProductsPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Hubbuy Spreadsheet Finds 2026",
    description: metadata.description,
    url: `${SITE_URL}/products/`,
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: products.length,
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: product.name,
        url: `${SITE_URL}${product.localHref}`,
        image: getProductImageUrl(product),
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <PageHero eyebrow="Hubbuy spreadsheet finds" title="A focused list you can review product by product." intro="Each catalog reference now opens a local research page with the recorded source ID, category checks, QC prompts and a separate link to the current live listing." crumbs={["Products"]} />
      <section className="section product-page-section">
        <div className="wrap">
          <SearchBox compact />
          <div className="category-chips">
            {categories.map(category => <Link key={category.name} href={category.href}>{category.name}</Link>)}
          </div>
          <div className="product-page-header"><div><span className="eyebrow">July 2026 edit</span><h2>{products.length} researched product references</h2></div><a href={`${MAIN_SITE}/AllProducts/`} target="_blank" rel="noopener">Open the complete live catalog ↗</a></div>
          <div className="product-grid">{products.map((product, index) => <ProductCard key={product.id} product={product} priority={index < 4} />)}</div>
          <div className="editorial-note"><strong>How this page is reviewed</strong><p>Each card has its own indexable Hubbuy Sheet research page and a distinct live CNBuy Sheet destination. The displayed name, image, source ID and CNY reference price were checked against that destination on 22 July 2026. We do not verify sellers, authenticity, inventory or final delivered quality.</p></div>
        </div>
      </section>
    </>
  );
}
