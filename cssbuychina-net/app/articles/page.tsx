import type { Metadata } from "next";
import { InnerShell } from "../components/InnerShell";
import { articles } from "./article-data";

export const metadata: Metadata = {
  title: { absolute: "CSSBuy Guides 2026: Warehouse, QC, Shipping & Tracking" },
  description: "Practical CSSBuy guides for warehouse status, QC photos, shipping calculator inputs, restrictions, tracking and spreadsheet product research.",
  alternates: { canonical: "/articles" },
};

export default function ArticlesPage() {
  return (
    <InnerShell>
      <section className="inner-hero articles-hero">
        <p className="eyebrow"><span /> Buyer research library</p>
        <h1>CSSBuy articles built around real shopper questions.</h1>
        <p>Long-form, fact-first reading based on CSSBuy's public workflow and policies—without invented fees, ratings, promises, or customer stories.</p>
      </section>
      <section className="guides-index articles-index">
        <div className="guides-index-intro"><span>ARTICLE DESK / FACT-CHECKED SEP 2026</span><h2>Start with the current warehouse or parcel decision.</h2><p>The library separates warehouse status, QC, shipping calculations, restrictions, tracking, product-link checks and spreadsheet research into distinct search intents.</p></div>
        <div className="editorial-grid">
          {Object.entries(articles).map(([slug, article], index) => (
            <a className={`editorial-card editorial-${["blue", "acid", "orange"][index % 3]}`} href={`/articles/${slug}`} key={slug}>
              <div className="editorial-number">0{index + 1}</div><span>{article.label}</span><h2>{article.title}</h2><p>{article.description}</p><b>Read full article ↗</b>
            </a>
          ))}
        </div>
      </section>
    </InnerShell>
  );
}
