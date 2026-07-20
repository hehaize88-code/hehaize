import PageHero from "@/components/PageHero";
import { GuideShell, GuideSection } from "@/components/GuideLayout";

export const metadata = {
  title: "Hubbuy Shipping and Parcel Planning Guide",
  description: "Understand actual versus volumetric weight, packaging choices, shipping estimates and parcel planning before submitting a Hubbuy agent shipment.",
  alternates: { canonical: "/guides/shipping" },
};

const toc = [
  { id: "total", label: "Calculate total cost" },
  { id: "weight", label: "Weight vs volume" },
  { id: "packing", label: "Packaging choices" },
  { id: "line", label: "Choose a line" },
  { id: "records", label: "Keep records" },
];

export default function ShippingPage() {
  return (
    <>
      <PageHero eyebrow="Parcel planning" title="The cheapest item can still build an expensive parcel." intro="Estimate shipping with weight, dimensions and packaging in mind. Product price alone is not a useful total-cost comparison." crumbs={["Guides", "Shipping"]} />
      <GuideShell toc={toc}>
        <GuideSection id="total" kicker="Cost model" title="Separate the item decision from the parcel decision.">
          <p>Your likely total can include item price, domestic delivery, payment or service costs, optional photos, packaging and international shipping. Taxes or customs charges may also apply depending on the destination and current rules.</p>
          <p>Use a range rather than one perfect estimate. A realistic low and high scenario makes it easier to decide whether the item is still worthwhile before it reaches the warehouse.</p>
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
