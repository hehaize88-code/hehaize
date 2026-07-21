import Link from "next/link";
import PageHero from "@/components/PageHero";
import { GuideShell, GuideSection } from "@/components/GuideLayout";
import { SITE_URL } from "@/data/site";
import { createPageMetadata } from "@/data/seo";

export const metadata = createPageMetadata({
  title: "Hubbuy Order Checklist: 5 Steps from Link to Parcel",
  description: "Use a five-step Hubbuy order checklist to verify a product link, record the exact variant, review warehouse photos and prepare an international parcel.",
  path: "/guides/how-to-buy/",
});

const toc = [
  { id: "before", label: "1. Define the item" },
  { id: "source", label: "2. Save the source" },
  { id: "order", label: "3. Review the order" },
  { id: "warehouse", label: "4. Check warehouse QC" },
  { id: "parcel", label: "5. Submit the parcel" },
];

export default function HowToBuyPage() {
  const checklistSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Hubbuy Order Checklist: 5 Steps from Link to Parcel",
    description: metadata.description,
    url: `${SITE_URL}/guides/how-to-buy/`,
    inLanguage: "en",
    dateModified: "2026-07-20",
    author: { "@type": "Organization", name: "Hubbuy Sheet Editorial", url: `${SITE_URL}/about/` },
    step: [
      "Set the exact product, variant and maximum budget",
      "Open the individual product page and save the source evidence",
      "Submit precise instructions and review the order summary",
      "Compare warehouse photos with the saved order",
      "Choose packaging and a shipping line from the completed parcel data",
    ].map((name, index) => ({ "@type": "HowToStep", position: index + 1, name })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(checklistSchema) }} />
      <PageHero eyebrow="Five-step action checklist" title="A five-step Hubbuy order checklist." intro="Keep this page open while you move from a product link to order review, warehouse QC and final parcel submission." crumbs={["Guides", "How to buy"]} />
      <div className="wrap guide-review-meta"><Link href="/about/">Hubbuy Sheet Editorial</Link><span>Checklist reviewed 20 July 2026</span></div>
      <GuideShell toc={toc}>
        <div className="guide-purpose-note"><span>Use this page while ordering</span><strong>A short task list, not a research article.</strong><p>For the evidence behind Hubbuy’s buying stages, cost boundaries and warehouse workflow, read the <Link href="/articles/how-to-use-a-hubbuy-spreadsheet/">complete Hubbuy purchase-research article</Link>.</p></div>
        <GuideSection id="before" kicker="Step 01 · Prepare" title="Define the exact item and your stopping rule.">
          <p>A Hubbuy spreadsheet is a discovery tool. It can help you find a product page and compare a reference price, but it does not prove that an item is in stock, that a seller will send the exact pictured version, or that the final parcel will be inexpensive to ship.</p>
          <p>Before starting, write down the product, color, size and maximum total budget. Your total is not just the listed item price. It can include domestic delivery to the warehouse, service or payment costs, optional packing and international shipping.</p>
          <div className="callout"><strong>Useful stopping rule</strong><p>If the listing does not clearly show the variant you want, do not submit it just because the price looks attractive.</p></div>
        </GuideSection>
        <GuideSection id="source" kicker="Step 02 · Verify" title="Open the individual product page and save the source evidence.">
          <p>Use the product card or catalog search to open the exact detail page. Compare the title, main image, price and available variants. If an original Taobao, Weidian or 1688 source is shown, keep a copy of it. That source helps you identify the seller and revisit the listing if an agent-generated link changes.</p>
          <ul className="check-list"><li>Confirm color and size are selectable, not just pictured.</li><li>Look for variant names that change the price.</li><li>Check whether domestic shipping is shown separately.</li><li>Save a screenshot of the exact option you intend to order.</li></ul>
        </GuideSection>
        <GuideSection id="order" kicker="Step 03 · Order" title="Submit precise instructions, then review the order summary.">
          <p>A typical shopping-agent order asks you to paste or select a product link, choose the variant, add quantity and pay the item cost plus any domestic delivery. Use the remark field only for details the seller can realistically follow. Short, concrete instructions are better than a long paragraph.</p>
          <p>Before payment, make sure the thumbnail, option text, quantity and price agree. If the page has imported the wrong product or an unavailable variation, stop and correct it before funds move.</p>
        </GuideSection>
        <GuideSection id="warehouse" kicker="Step 04 · Review" title="Compare warehouse photos with the saved order.">
          <p>After the seller sends the item to the warehouse, the agent normally records its arrival and provides inspection photos. This is the moment to compare what arrived with what you selected. Check obvious color, size label, visible damage, missing components and category-specific details.</p>
          <p>Standard photos may not show measurements or hidden details. If a detail would change your decision, request a clear additional angle before the return window closes. Do not confuse a sharp photo with a complete inspection.</p>
        </GuideSection>
        <GuideSection id="parcel" kicker="Step 05 · Submit" title="Choose packaging and shipping after you know the parcel.">
          <p>Combine only the items you actually want to keep. Review stored weight, dimensions and restricted-item warnings. Removing retail boxes can reduce volume, while corner protection, bubble wrap or reinforcement can increase both protection and packed weight.</p>
          <p>Compare shipping lines using the packed parcel rather than the original item listing. Transit estimates are not guarantees, and customs treatment depends on the destination, contents and current rules. Keep invoices, tracking details and the parcel photo until delivery is complete.</p>
        </GuideSection>
      </GuideShell>
    </>
  );
}
