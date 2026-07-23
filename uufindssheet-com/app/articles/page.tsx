import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { articleCards } from "../site-data";

export const metadata: Metadata = {
  title: "Fact-Checked UUFinds Buying Guides, QC Articles & Comparisons",
  description: "Independent, source-checked guides about UUFinds QC photos, videos, image recognition, link matching and exact CNBuy Sheet destinations.",
  alternates: { canonical: "/articles" },
};

export default function ArticlesPage() {
  return (
    <main className="hub-page">
      <SiteHeader />
      <section className="hub-hero article-hub-hero">
        <p className="eyebrow">Articles / Official functions checked July 23, 2026</p>
        <h1>Search-led guides.<br /><em>Source-led claims.</em></h1>
        <p>Each article separates what UUFinds publicly confirms from the practical inspection method added by this independent guide. Shopping and product routes remain exclusive to CNBuy Sheet.</p>
      </section>
      <section className="hub-content">
        <div className="official-fact-strip article-standard">
          <article><span>01</span><div><strong>Claim standard</strong><p>Feature statements must be supported by UUFinds’ public QC, account, product or app information.</p></div></article>
          <article><span>02</span><div><strong>Advice standard</strong><p>Inspection advice must clearly distinguish a visible observation from an unsupported conclusion.</p></div></article>
          <article><span>03</span><div><strong>Link standard</strong><p>Every shopping, category and product destination on this site points only to CNBuy Sheet.</p></div></article>
        </div>
        <div className="article-grid article-hub-grid">
          {articleCards.map((article, index) => (
            <Link href={article.href} className={`article-card${article.featured ? " article-card-featured" : ""}`} key={article.href}>
              <div className="article-meta"><span>{article.tag}</span><b>{String(index + 1).padStart(2, "0")}</b></div>
              <h2>{article.title}</h2><p>{article.summary}</p>
              <div className="article-foot"><span>{article.read}</span><b>Read article ↗</b></div>
            </Link>
          ))}
        </div>
        <div className="source-method-note">
          <p className="eyebrow">Editorial source set</p>
          <p>The current guide set was reviewed against UUFinds’ public QC finder and QC browsing copy, product-detail disclaimers, account pages, personalized display description and public app information. Where those sources do not establish a fact—such as a guaranteed number of recent QC sets, shipping price or product quality—the articles do not invent one.</p>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
