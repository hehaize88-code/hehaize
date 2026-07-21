import ProductCard from "@/components/ProductCard";
import PageHero from "@/components/PageHero";
import SearchBox from "@/components/SearchBox";
import { categories, products, MAIN_SITE } from "@/data/site";
import { createPageMetadata } from "@/data/seo";

export const metadata = createPageMetadata({
  title: "Hubbuy Spreadsheet Finds 2026",
  description: "Browse recent Hubbuy spreadsheet finds by category, see reference prices in CNY and open the exact live CNBuy Sheet product page.",
  path: "/products/",
});

export default function ProductsPage() {
  return (
    <>
      <PageHero eyebrow="Hubbuy spreadsheet finds" title="A smaller list you can actually review." intro="These recent catalog finds link to individual product pages—not a generic all-products screen. Check the live listing before saving any item." crumbs={["Products"]} />
      <section className="section product-page-section">
        <div className="wrap">
          <SearchBox compact />
          <div className="category-chips">
            {categories.map(category => <a key={category.name} href={category.href} target="_blank" rel="noopener">{category.name}</a>)}
          </div>
          <div className="product-page-header"><div><span className="eyebrow">July 2026 edit</span><h2>Recent product links</h2></div><a href={`${MAIN_SITE}/AllProducts/`} target="_blank" rel="noopener">Open the complete live catalog ↗</a></div>
          <div className="product-grid">{products.map((product, index) => <ProductCard key={product.id} product={product} priority={index < 4} />)}</div>
          <div className="editorial-note"><strong>How this page is reviewed</strong><p>We check that each card opens a distinct live product URL and that the displayed name, image and reference price match the catalog page at the time of review. We do not verify sellers, authenticity, inventory or final delivered quality.</p></div>
        </div>
      </section>
    </>
  );
}
