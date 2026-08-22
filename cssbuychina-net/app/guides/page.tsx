import type { Metadata } from "next";
import { InnerShell } from "../components/InnerShell";

export const metadata: Metadata = {
  title: { absolute: "CSSBuy Guides 2026: Spreadsheet, QC & Parcel Cost" },
  description: "Read fact-first CSSBuy spreadsheet guides covering product research, warehouse QC photos, sizing, and the difference between item price and parcel cost.",
  alternates: { canonical: "/guides" },
};

const guides = [
  {
    slug: "cssbuy-spreadsheet-guide",
    label: "START HERE · 10 MIN",
    title: "How to use a CSSBuy spreadsheet from first payment to parcel",
    description: "A researched guide to product options, CSSBuy's two paid stages, warehouse QC, returns, storage, and parcel approval.",
    theme: "blue",
  },
  {
    slug: "read-warehouse-qc-photos",
    label: "WAREHOUSE QC · 8 MIN",
    title: "How to read CSSBuy warehouse QC photos before shipping",
    description: "Start with CSSBuy's published visible-inspection scope, then check measurements, condition, limitations, and the return clock.",
    theme: "acid",
  },
  {
    slug: "product-price-vs-parcel-cost",
    label: "COST GUIDE · 9 MIN",
    title: "CSSBuy product price vs. total parcel cost",
    description: "Separate the first product-and-China-delivery payment from warehouse decisions, packaging, routes, and international shipping.",
    theme: "orange",
  },
];

export default function GuidesPage() {
  return (
    <InnerShell>
      <section className="inner-hero guides-hero">
        <p className="eyebrow"><span /> Editorial desk</p>
        <h1>CSSBuy guides for decisions that matter.</h1>
        <p>Research-led reading checked against CSSBuy's public workflow, warehouse information, shipping estimator, and FAQ on August 8, 2026.</p>
      </section>
      <section className="guides-index">
        <div className="guides-index-intro"><span>FACT CHECK / AUG 2026</span><h2>Begin with the two-payment process, then go deeper.</h2><p>These guides avoid invented customer claims, universal fee percentages, and fixed delivery promises. They identify which details come from CSSBuy's public pages and which still depend on the order, seller, route, and destination.</p></div>
        <div className="editorial-grid">
          {guides.map((guide, index) => (
            <a className={`editorial-card editorial-${guide.theme}`} href={`/guides/${guide.slug}`} key={guide.slug}>
              <div className="editorial-number">0{index + 1}</div>
              <span>{guide.label}</span>
              <h2>{guide.title}</h2>
              <p>{guide.description}</p>
              <b>Read full guide ↗</b>
            </a>
          ))}
        </div>
      </section>
      <section className="editorial-policy">
        <div><p className="eyebrow dark"><span /> Publishing standard</p><h2>What earns a place in this index.</h2></div>
        <ul><li><b>Reachable product route</b><span>The destination must open and match the find when checked.</span></li><li><b>Named research basis</b><span>Service facts are checked against current public CSSBuy pages.</span></li><li><b>Clear uncertainty</b><span>Working links and warehouse photos are never presented as quality guarantees.</span></li><li><b>Visible date</b><span>Readers can see when product routes or guidance were last reviewed.</span></li></ul>
      </section>
    </InnerShell>
  );
}
