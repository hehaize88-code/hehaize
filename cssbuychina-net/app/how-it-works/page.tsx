import type { Metadata } from "next";
import { InnerShell } from "../components/InnerShell";

export const metadata: Metadata = {
  title: { absolute: "CSSBuy Warehouse Guide 2026: QC, Storage & Shipping" },
  description: "What happens after an item reaches the CSSBuy warehouse: QC photos, order deadlines, storage, packing, parcel submission and international shipping.",
  alternates: { canonical: "/how-it-works" },
};

const steps = [
  ["Verify the order record", "Before warehouse arrival, save the exact product page, option, price, measurements, seller notes, and quantity so the received item has a clear reference."],
  ["Review warehouse evidence", "Compare the received style, quantity, color, size, model, visible damage, and any requested measurements with the option you ordered."],
  ["Check the decision clocks", "Inspect promptly. A seller return opportunity and the account's warehouse-storage deadline are different clocks; follow the dates shown for the specific order."],
  ["Submit the parcel", "Choose suitable packing and a current eligible shipping line, review recorded weight, dimensions and route terms, then make the international shipping payment."],
] as const;

export default function HowItWorksPage() {
  return (
    <InnerShell>
      <section className="inner-hero how-hero">
        <p className="eyebrow"><span /> CSSBuy warehouse guide · 2026</p>
        <h1>What happens after an item reaches the CSSBuy warehouse.</h1>
        <p>Review the received option, QC photos, order deadlines, storage status, packing choices and recorded parcel data before selecting international shipping.</p>
      </section>
      <section className="workflow-section standalone-workflow">
        <div className="workflow-intro">
          <p className="eyebrow"><span /> Warehouse workflow</p>
          <h2>Match the order. Check the evidence. Then build the parcel.</h2>
          <p>A warehouse status is not automatic approval. Use the saved order record, visible QC evidence, account deadlines, recorded parcel data and current route terms at each stage.</p>
          <a href="/guides/cssbuy-spreadsheet-guide">Read the complete CSSBuy order guide <span aria-hidden="true">↗</span></a>
        </div>
        <ol className="workflow-list">
          {steps.map(([title, description], index) => (
            <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><b>{title}</b><p>{description}</p></div></li>
          ))}
        </ol>
      </section>
      <section className="section process-checks">
        <div className="section-heading"><div><p className="eyebrow dark"><span /> Before you approve shipping</p><h2>Three warehouse decisions that still belong to the shopper.</h2></div></div>
        <div className="process-check-grid">
          <article><span>01</span><h2>Fit and measurements</h2><p>Compare centimeters with an item you already own. Do not rely only on a familiar size label.</p></article>
          <article><span>02</span><h2>QC and deadlines</h2><p>Check visible style, quantity, color, size, model and damage promptly. Request more evidence before the relevant order deadline passes.</p></article>
          <article><span>03</span><h2>Storage and parcel impact</h2><p>Follow the order-specific storage date, then compare packing, recorded weight and dimensions, route eligibility and international shipping.</p></article>
        </div>
      </section>
    </InnerShell>
  );
}
