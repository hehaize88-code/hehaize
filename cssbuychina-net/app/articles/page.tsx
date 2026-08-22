import type { Metadata } from "next";
import { InnerShell } from "../components/InnerShell";
import { articles } from "./article-data";

export const metadata: Metadata = {
  title: { absolute: "CSSBuy Articles 2026: Search, QC & Shipping" },
  description: "Read fact-checked CSSBuy articles about keyword and image-assisted product search, spreadsheet links, category checks, warehouse QC and parcel planning.",
  alternates: { canonical: "/articles" },
};

export default function ArticlesPage() {
  return (
    <InnerShell>
      <section className="inner-hero articles-hero">
        <p className="eyebrow"><span /> SEO knowledge library</p>
        <h1>CSSBuy articles built around real shopper questions.</h1>
        <p>Long-form, fact-first reading based on CSSBuy's public workflow and policies—without invented fees, ratings, promises, or customer stories.</p>
      </section>
      <section className="guides-index articles-index">
        <div className="guides-index-intro"><span>ARTICLE DESK / FACT-CHECKED AUG 2026</span><h2>Start with product discovery. Then verify the listing and plan the parcel.</h2><p>The library separates keyword search, dead-link image recovery, spreadsheet categories, product-link checks and total parcel cost into distinct search intents.</p></div>
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
