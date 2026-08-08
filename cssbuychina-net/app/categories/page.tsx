import type { Metadata } from "next";
import { InnerShell } from "../components/InnerShell";
import { categories } from "../site-data";

export const metadata: Metadata = {
  title: "CSSBuy Spreadsheet Categories – Shoes, Hoodies, Jerseys & More",
  description: "Browse eight focused CSSBuy spreadsheet categories with direct department routes and product-specific sizing, warehouse QC, packing, and shipping checks.",
  alternates: { canonical: "/categories" },
};

export default function CategoriesPage() {
  return (
    <InnerShell>
      <section className="inner-hero categories-hero">
        <p className="eyebrow"><span /> Department index</p>
        <h1>Every CSSBuy spreadsheet category, with the right checks attached.</h1>
        <p>Choose a department without being sent to a generic catalog. Each route opens the matching product category; the reading pages explain what to verify before CSSBuy's first payment and warehouse approval.</p>
      </section>
      <section className="section categories-section categories-page">
        <div className="section-heading">
          <div><p className="eyebrow dark"><span /> Eight direct routes</p><h2>Start with the product type—and its real decision points.</h2></div>
          <p>Shoes need centimeter sizing and box planning; jerseys need version and print checks; electronics need route and safety research. Categories make those differences visible.</p>
        </div>
        <div className="category-grid">
          {categories.map((category, index) => (
            <a className={`category-card tone-${(index % 4) + 1}`} href={category.storeUrl} rel="nofollow" key={category.slug}>
              <span className="category-number">0{index + 1}</span>
              <span className="category-symbol" aria-hidden="true">{category.symbol}</span>
              <span className="category-text"><b>{category.name}</b><small>{category.searchLabel}</small></span>
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
        <div className="category-index-links">
          <span>Read the focused index:</span>
          {categories.map((category) => <a href={`/category/${category.slug}`} key={category.slug}>{category.name}</a>)}
        </div>
      </section>
    </InnerShell>
  );
}
