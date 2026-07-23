import type { Metadata } from "next";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { categories } from "../site-data";
import { localizedAlternates } from "../seo-alternates";

export const metadata: Metadata = {
  title: "UUFinds Product Discovery Method & CNBuy Sheet Categories",
  description: "Use a fact-checked UUFinds discovery method, then open nine clearly labeled CNBuy Sheet categories for shoes, clothing, accessories and electronics.",
  alternates: localizedAlternates("/finds/"),
  openGraph: {
    title: "UUFinds Product Discovery Method & CNBuy Sheet Categories",
    description: "Use a fact-checked UUFinds discovery method, then open nine clearly labeled CNBuy Sheet categories for shoes, clothing, accessories and electronics.",
    url: "/finds/",
    siteName: "UUFinds Sheet",
    type: "website",
  },
};

export default function FindsPage() {
  return (
    <main className="hub-page">
      <SiteHeader routePath="/finds/" />
      <section className="hub-hero">
        <p className="eyebrow">Finds / UUFinds research + 09 direct routes</p>
        <h1>Discover broadly.<br /><em>Match precisely.</em></h1>
        <p>UUFinds publicly describes both QC discovery and personalized pages that combine items, purchasing-agent routes and social content. Use discovery to create a shortlist—then keep the exact source link so a popular image or shared page is never mistaken for proof of one specific listing.</p>
      </section>
      <section className="hub-content">
        <div className="category-grid">
          {categories.map((category) => (
            <a className="category-card" href={category.href} target="_blank" rel="noreferrer" key={category.name}>
              <div className={`category-code ${category.color}`}>{category.code}</div>
              <div className="category-symbol" aria-hidden="true">{category.name.slice(0, 2).toUpperCase()}</div>
              <h2>{category.name}</h2>
              <p>{category.note}</p>
              <span className="card-arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>

        <section className="evidence-matrix">
          <div className="section-heading">
            <div>
              <p className="eyebrow">What the official pages establish</p>
              <h2>A find is a starting point.</h2>
            </div>
            <p>The official public descriptions support product discovery, link handling, QC media and shareable item pages. They do not establish that every shared item has recent QC material or unchanged seller data.</p>
          </div>
          <div className="evidence-grid">
            <article><p className="step-label">SHARED ITEM PAGE</p><h3>Useful for collecting leads</h3><p>UUFinds describes personalized pages that integrate items, purchasing agents and social content and can be shared through one link.</p><strong>Save the original item or seller link before researching quality.</strong></article>
            <article><p className="step-label">QC FINDER</p><h3>Useful after discovery</h3><p>The official QC finder describes photos, videos and image recognition. Availability depends on what material exists for the product or link.</p><strong>A visually similar result is not automatically the same seller, variant or batch.</strong></article>
            <article><p className="step-label">CATEGORY ROUTE</p><h3>Useful when you only know the type</h3><p>Begin with Shoes, Hoodies, T-Shirts, Jackets, Pants, Headwear, Accessories, Jerseys or Electronics when no exact link exists yet.</p><strong>Shortlist two or three candidates before comparing evidence.</strong></article>
            <article><p className="step-label">EXACT PRODUCT</p><h3>Useful for the final match</h3><p>Open an individual CNBuy Sheet detail page and compare its product ID, images, price and variants with the item you researched.</p><strong>Use the live page for current facts that a shared find cannot preserve.</strong></article>
          </div>
        </section>

        <section className="decision-checklist">
          <div><p className="eyebrow">A practical discovery routine</p><h2>Turn browsing into a traceable shortlist.</h2></div>
          <ol>
            <li><span>01</span><p><strong>Name the intent:</strong> inspiration, category comparison, or verification of one exact link.</p></li>
            <li><span>02</span><p><strong>Keep the source:</strong> preserve the full item URL and visible seller or item identifier.</p></li>
            <li><span>03</span><p><strong>Narrow the field:</strong> compare category, model, material, price band and visible variants.</p></li>
            <li><span>04</span><p><strong>Research evidence:</strong> check whether matched QC photos or video exist and how recent they are.</p></li>
            <li><span>05</span><p><strong>Finish live:</strong> confirm today’s information on the exact CNBuy Sheet product page.</p></li>
          </ol>
        </section>

        <div className="source-method-note">
          <p className="eyebrow">Source boundary / Reviewed July 23, 2026</p>
          <p>Function claims on this page were checked against UUFinds’ public QC finder, QC browsing page, personalized display page, product disclaimer and app information. Category and shopping buttons remain exclusive to CNBuy Sheet.</p>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
