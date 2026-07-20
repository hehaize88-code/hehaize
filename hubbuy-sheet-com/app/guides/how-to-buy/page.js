import PageHero from "@/components/PageHero";
import { GuideShell, GuideSection } from "@/components/GuideLayout";

export const metadata = {
  title: "How to Use a Hubbuy Spreadsheet and Shopping Agent",
  description: "Follow a practical Hubbuy spreadsheet workflow from finding a source link and selecting a variant to checking warehouse photos and submitting a parcel.",
  alternates: { canonical: "/guides/how-to-buy" },
};

const toc = [
  { id: "before", label: "Before you begin" },
  { id: "source", label: "Check the source" },
  { id: "order", label: "Submit the order" },
  { id: "warehouse", label: "Warehouse review" },
  { id: "parcel", label: "Build the parcel" },
];

export default function HowToBuyPage() {
  return (
    <>
      <PageHero eyebrow="Beginner workflow" title="From spreadsheet row to an informed order." intro="The agent process is easier when you separate product research, warehouse review and international shipping instead of treating them as one purchase." crumbs={["Guides", "How to buy"]} />
      <GuideShell toc={toc}>
        <GuideSection id="before" kicker="Step zero" title="Know what the spreadsheet does—and what it cannot do.">
          <p>A Hubbuy spreadsheet is a discovery tool. It can help you find a product page and compare a reference price, but it does not prove that an item is in stock, that a seller will send the exact pictured version, or that the final parcel will be inexpensive to ship.</p>
          <p>Before starting, write down the product, color, size and maximum total budget. Your total is not just the listed item price. It can include domestic delivery to the warehouse, service or payment costs, optional packing and international shipping.</p>
          <div className="callout"><strong>Useful stopping rule</strong><p>If the listing does not clearly show the variant you want, do not submit it just because the price looks attractive.</p></div>
        </GuideSection>
        <GuideSection id="source" kicker="Step one" title="Open the individual product page and trace the source.">
          <p>Use the product card or catalog search to open the exact detail page. Compare the title, main image, price and available variants. If an original Taobao, Weidian or 1688 source is shown, keep a copy of it. That source helps you identify the seller and revisit the listing if an agent-generated link changes.</p>
          <ul className="check-list"><li>Confirm color and size are selectable, not just pictured.</li><li>Look for variant names that change the price.</li><li>Check whether domestic shipping is shown separately.</li><li>Save a screenshot of the exact option you intend to order.</li></ul>
        </GuideSection>
        <GuideSection id="order" kicker="Step two" title="Submit precise instructions, then review the order summary.">
          <p>A typical shopping-agent order asks you to paste or select a product link, choose the variant, add quantity and pay the item cost plus any domestic delivery. Use the remark field only for details the seller can realistically follow. Short, concrete instructions are better than a long paragraph.</p>
          <p>Before payment, make sure the thumbnail, option text, quantity and price agree. If the page has imported the wrong product or an unavailable variation, stop and correct it before funds move.</p>
        </GuideSection>
        <GuideSection id="warehouse" kicker="Step three" title="Treat warehouse photos as a decision point.">
          <p>After the seller sends the item to the warehouse, the agent normally records its arrival and provides inspection photos. This is the moment to compare what arrived with what you selected. Check obvious color, size label, visible damage, missing components and category-specific details.</p>
          <p>Standard photos may not show measurements or hidden details. If a detail would change your decision, request a clear additional angle before the return window closes. Do not confuse a sharp photo with a complete inspection.</p>
        </GuideSection>
        <GuideSection id="parcel" kicker="Step four" title="Choose packaging and shipping after you know the parcel.">
          <p>Combine only the items you actually want to keep. Review stored weight, dimensions and restricted-item warnings. Removing retail boxes can reduce volume, while corner protection, bubble wrap or reinforcement can increase both protection and packed weight.</p>
          <p>Compare shipping lines using the packed parcel rather than the original item listing. Transit estimates are not guarantees, and customs treatment depends on the destination, contents and current rules. Keep invoices, tracking details and the parcel photo until delivery is complete.</p>
        </GuideSection>
      </GuideShell>
    </>
  );
}
