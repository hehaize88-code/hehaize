import Link from "next/link";
import PageHero from "@/components/PageHero";
import { GuideShell, GuideSection } from "@/components/GuideLayout";
import { SITE_URL } from "@/data/site";

export const metadata = {
  title: "Hubbuy Parcel Planning & Packaging Checklist",
  description: "Use a Hubbuy parcel checklist to review approved items, packed weight, dimensions, protection, route eligibility and shipment records before submission.",
  alternates: { canonical: "/guides/shipping/" },
};

const toc = [
  { id: "total", label: "Set the parcel goal" },
  { id: "weight", label: "Check weight and size" },
  { id: "packing", label: "Choose protection" },
  { id: "line", label: "Compare live routes" },
  { id: "records", label: "Save parcel records" },
];

export default function ShippingPage() {
  const checklistSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Hubbuy Parcel Planning and Packaging Checklist",
    description: metadata.description,
    url: `${SITE_URL}/guides/shipping/`,
    inLanguage: "en",
    dateModified: "2026-07-20",
    author: { "@type": "Organization", name: "Hubbuy Sheet Editorial", url: `${SITE_URL}/about/` },
    step: [
      "Confirm every item is approved for the parcel",
      "Review final actual weight and parcel dimensions",
      "Choose protection that matches the contents",
      "Compare current eligible shipping lines",
      "Save the parcel, declaration and tracking records",
    ].map((name, index) => ({ "@type": "HowToStep", position: index + 1, name })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(checklistSchema) }} />
      <PageHero eyebrow="Parcel action checklist" title="Plan the parcel before choosing a shipping line." intro="Use the completed warehouse data to choose packing, protection and an eligible route for the exact items you approved." crumbs={["Guides", "Shipping"]} />
      <div className="wrap guide-review-meta"><Link href="/about/">Hubbuy Sheet Editorial</Link><span>Checklist reviewed 20 July 2026</span></div>
      <GuideShell toc={toc}>
        <div className="guide-purpose-note"><span>Use this page at parcel submission</span><strong>A packing and route checklist, not a shipping-price analysis.</strong><p>For the detailed cost model, including domestic freight, weight, volume and consolidation scenarios, read <Link href="/articles/hubbuy-shipping-cost-guide/">how Hubbuy shipping costs are built</Link>.</p></div>
        <GuideSection id="total" kicker="Parcel goal" title="Start with approved items and one clear parcel plan.">
          <p>Confirm that every included item has passed warehouse review and that no unresolved support issue remains. Record which items belong together, the destination and any protection requirement before comparing routes.</p>
          <p>Keep the earlier product budget separate from this final parcel decision. At this stage, the useful inputs are the approved contents, packed weight, dimensions, restrictions and current destination options.</p>
        </GuideSection>
        <GuideSection id="weight" kicker="Chargeable weight" title="Actual weight and volumetric weight answer different questions.">
          <p>Actual weight is what the packed parcel weighs on a scale. Volumetric weight represents how much space it occupies. Some lines charge using the larger figure, which is why a light but bulky box can cost more than expected.</p>
          <p>Shoes with retail boxes, puffer jackets and protective packaging can increase parcel volume. If the line uses volume, rehearsal or pre-packing can provide a more useful estimate than adding bare item weights.</p>
          <div className="formula"><span>Common concept</span><strong>Chargeable weight = the line’s applicable actual or volumetric weight</strong><small>The divisor and rounding method vary by carrier. Use the current platform calculator.</small></div>
        </GuideSection>
        <GuideSection id="packing" kicker="Protection" title="Choose packaging for the contents, not by habit.">
          <p>Removing unnecessary boxes may reduce volume. Bubble wrap can help isolate delicate surfaces. Corner protection or parcel reinforcement may help structured, fragile or heavy contents, but every extra material can add weight and size.</p>
          <ul className="check-list"><li>Use waterproof outer protection when moisture exposure is a realistic concern.</li><li>Keep rigid protection for items that can deform under compression.</li><li>Separate fragile pieces so they cannot strike each other.</li><li>Do not pay for bulky protection that solves no clear risk.</li></ul>
        </GuideSection>
        <GuideSection id="line" kicker="Route choice" title="Compare restrictions, billing method and tracking—not only the headline price.">
          <p>A useful comparison includes destination coverage, product restrictions, chargeable-weight method, estimated transit window, tracking and compensation terms. The lowest quote may be unsuitable for batteries, liquids, high-value contents or an unusually large parcel.</p>
          <p>Transit times are estimates and do not guarantee customs clearance or final delivery on a specific day. Read the current line description immediately before submission.</p>
        </GuideSection>
        <GuideSection id="records" kicker="After submission" title="Keep the parcel evidence until delivery is complete.">
          <p>Save the submitted declaration, parcel photo, packed dimensions, charged weight, line name and tracking number. Photograph the package before opening it if the exterior arrives damaged. Those records make a support request much easier to explain.</p>
        </GuideSection>
      </GuideShell>
    </>
  );
}
