import type { Metadata } from "next";
import { InnerShell } from "../components/InnerShell";

export const metadata: Metadata = {
  title: "How CSSBuy Works – Two Payments, Warehouse QC & Shipping",
  description: "Follow CSSBuy's published two-stage workflow: find and verify a product, pay for the item and China delivery, inspect it in the warehouse, then submit and pay for the international parcel.",
  alternates: { canonical: "/how-it-works" },
};

const steps = [
  ["Find and verify", "Search by product name, focused category, or exact URL. Reopen the current product page and confirm the variation, price, measurements, seller notes, and availability."],
  ["Make the first payment", "CSSBuy's public product pages place the goods and Chinese domestic delivery in the first stage. Confirm both before authorizing the purchase."],
  ["Inspect in the warehouse", "Compare the received style, quantity, color, size, model, visible damage, and any requested measurements with the option you ordered."],
  ["Submit the parcel", "Choose suitable packing and a current eligible shipping line, review its terms and recorded parcel data, then make the international shipping payment."],
] as const;

export default function HowItWorksPage() {
  return (
    <InnerShell>
      <section className="inner-hero how-hero">
        <p className="eyebrow"><span /> CSSBuy's published two-stage process</p>
        <h1>From a spreadsheet find to a warehouse-checked parcel.</h1>
        <p>The product and delivery within China are paid first. International shipping is selected and paid after warehouse receipt, inspection, and parcel preparation.</p>
      </section>
      <section className="workflow-section standalone-workflow">
        <div className="workflow-intro">
          <p className="eyebrow"><span /> How it works</p>
          <h2>Find it. Check it. Then decide.</h2>
          <p>A reachable link is useful, but it is not a quality guarantee. Use the current product page, warehouse evidence, account deadlines, and route terms at each stage.</p>
          <a href="/guides/cssbuy-spreadsheet-guide">Open the detailed guide <span aria-hidden="true">↗</span></a>
        </div>
        <ol className="workflow-list">
          {steps.map(([title, description], index) => (
            <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><b>{title}</b><p>{description}</p></div></li>
          ))}
        </ol>
      </section>
      <section className="section process-checks">
        <div className="section-heading"><div><p className="eyebrow dark"><span /> Before you approve shipping</p><h2>Three decisions that still belong to the shopper.</h2></div></div>
        <div className="process-check-grid">
          <article><span>01</span><h2>Fit and measurements</h2><p>Compare centimeters with an item you already own. Do not rely only on a familiar size label.</p></article>
          <article><span>02</span><h2>Visible QC evidence</h2><p>CSSBuy lists style, quantity, color, size, model, and damage as basic visible checks. Request more evidence when needed.</p></article>
          <article><span>03</span><h2>Total parcel impact</h2><p>Separate the first product-and-China-delivery payment from packaging, current route selection, and international shipping.</p></article>
        </div>
      </section>
    </InnerShell>
  );
}
