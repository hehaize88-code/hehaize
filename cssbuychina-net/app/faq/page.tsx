import type { Metadata } from "next";
import { InnerShell } from "../components/InnerShell";

export const metadata: Metadata = {
  title: "CSSBuy Spreadsheet FAQ",
  description: "Fact-checked answers about CSSBuy's two payments, warehouse inspection, QC photos, order handling, returns, storage, spreadsheet prices, and shipping estimates.",
  alternates: { canonical: "/faq" },
};

const faqs = [
  ["Is this the official CSSBuy website?", "No. This is an independent CSSBuy spreadsheet and research guide. It is not operated by, endorsed by, or affiliated with CSSBuy, and it does not process CSSBuy accounts, payments, warehouse services, or parcels."],
  ["What services does CSSBuy publicly describe?", "CSSBuy's public site lists services including Buy For Me, Ship For Me, dropshipping, asking sellers questions, and shipping to Amazon FBA. The relevant terms and availability should be checked in the current CSSBuy account before use."],
  ["Why are there two payments in a CSSBuy order?", "CSSBuy's public item pages describe two stages. The first payment covers the product and delivery within China to the CSSBuy warehouse. After warehouse receipt, inspection, consolidation, and packing, the shopper chooses a route and pays the international shipping charge."],
  ["What does CSSBuy say it checks at the warehouse?", "CSSBuy's public item pages describe a basic visible inspection covering style, quantity, color, size, model, and damage. The shopper should compare the warehouse photographs with the ordered option and request another angle or measurement when an important detail is missing."],
  ["Do warehouse QC photos guarantee quality or authenticity?", "No. Photos can help confirm visible condition and whether the received item resembles the selected option. They do not prove authenticity, material composition, internal construction, electronics safety, battery health, waterproofing, or long-term durability."],
  ["How quickly does CSSBuy handle a paid order?", "CSSBuy's public FAQ says it usually fulfills an order within 24 hours after payment. “Usually” is not a guaranteed warehouse-arrival time: seller dispatch, stock, weekends, questions, and domestic delivery can add time."],
  ["What return conditions does CSSBuy publish?", "CSSBuy's public FAQ says it can help return an item when the seller accepts the return, the item has been in the warehouse for fewer than seven days, and the shopper pays the return delivery cost. Product-specific seller and marketplace conditions can still prevent a return."],
  ["How long is CSSBuy warehouse storage?", "CSSBuy's homepage states 90 days of free storage and a paid extension of 15 CNY per order per month. Some public item pages distinguish 90 days for common items and 30 days for sensitive items. Because those statements differ by context, follow the deadline shown for the specific order in the account."],
  ["Does a spreadsheet price include the complete CSSBuy cost?", "No. The recorded product value does not automatically include domestic seller-to-warehouse delivery, current checkout costs, optional services, packaging, international shipping, or possible destination taxes and duties. Select the exact variation before comparing prices."],
  ["Why does this site show both CNY and USD?", "CNY is retained as the recorded product value. The USD number is a rounded display estimate for easier comparison, not a CSSBuy checkout quote. Seller pricing, exchange rates, payment costs, and shipping can change the amount ultimately paid."],
  ["Can a CSSBuy spreadsheet promise an international shipping price?", "No. CSSBuy provides a shipping-fee estimator, but the final options can depend on destination, current routes, product restrictions, actual weight, parcel dimensions, packaging, and the billing rule used by the selected line. Recalculate with current warehouse information before parcel payment."],
  ["How can I report a dead or incorrect product link?", "Use the contact page and include the visible product title, product ID or page address, the type of mismatch, and the date you noticed it. Do not send passwords, payment details, identification, or other private account information."],
] as const;

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
  };

  return (
    <InnerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="inner-hero faq-hero"><p className="eyebrow"><span /> Official facts, clear limits</p><h1>CSSBuy spreadsheet FAQ.</h1><p>Answers checked against CSSBuy's public workflow and FAQ on August 8, 2026, with changing terms clearly identified.</p></section>
      <section className="faq-page-layout">
        <aside><span>12 FACT-CHECKED QUESTIONS</span><h2>Useful answers without invented promises.</h2><p>Where CSSBuy's public pages differ by product context, this FAQ says so. The current order, account deadline, and selected route remain controlling.</p><a href="/contact">Report an issue ↗</a></aside>
        <div className="faq-page-list">{faqs.map(([question, answer], index) => <details key={question} open={index === 0}><summary><span>{String(index + 1).padStart(2, "0")}</span>{question}<b>+</b></summary><p>{answer}</p></details>)}</div>
      </section>
    </InnerShell>
  );
}
