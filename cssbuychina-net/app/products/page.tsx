"use client";

import { useMemo, useState } from "react";
import { InnerShell } from "../components/InnerShell";
import { ProductCard } from "../components/ProductCard";
import { categories, products } from "../site-data";

export default function ProductsPage() {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return products.filter((product) => {
      const categoryMatch = category === "all" || product.category === category;
      const textMatch = !term || `${product.name} ${product.categoryLabel}`.toLowerCase().includes(term);
      return categoryMatch && textMatch;
    });
  }, [category, query]);

  return (
    <InnerShell>
      <section className="inner-hero products-hero">
        <p className="eyebrow"><span /> Checked product index</p>
        <h1>All CSSBuy spreadsheet finds.</h1>
        <p>Browse the current collection by product name or category. Every card leads to an individual research page and the corresponding product route; a checked link is not a quality guarantee.</p>
        <div className="local-search">
          <label htmlFor="product-search">Search this index</label>
          <input id="product-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try: jacket or jersey" />
          <span>{filtered.length} result{filtered.length === 1 ? "" : "s"}</span>
        </div>
      </section>
      <section className="catalog-layout">
        <aside className="catalog-sidebar">
          <p>FILTER / CATEGORY</p>
          <button className={category === "all" ? "active" : ""} onClick={() => setCategory("all")}><span>All finds</span><b>{products.length}</b></button>
          {categories.map((item) => {
            const count = products.filter((product) => product.category === item.slug).length;
            return <button className={category === item.slug ? "active" : ""} key={item.slug} onClick={() => setCategory(item.slug)}><span>{item.name}</span><b>{count}</b></button>;
          })}
        </aside>
        <div>
          <div className="catalog-topline"><span>PRODUCT ROUTES REVIEWED AUGUST 8–10, 2026</span><span>USD VALUES ARE DISPLAY ESTIMATES</span></div>
          {filtered.length ? <div className="product-grid catalog-grid">{filtered.map((product) => <ProductCard product={product} key={product.id} />)}</div> : (
            <div className="empty-state"><b>No matching preview find.</b><p>Try another term or open the live store search for a wider selection.</p><a href={`https://cnbuycha.com/AllProducts/?q=${encodeURIComponent(query)}`}>Search the full catalog ↗</a></div>
          )}
        </div>
      </section>
    </InnerShell>
  );
}
