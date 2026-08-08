import type { Metadata } from "next";
import { InnerShell } from "../../components/InnerShell";

const guideData = {
  "cssbuy-spreadsheet-guide": {
    title: "How to Use a CSSBuy Spreadsheet: From First Payment to Parcel",
    description: "Use a CSSBuy spreadsheet as a discovery tool, then verify the exact option, two-payment workflow, warehouse inspection, return deadline, storage, and parcel cost.",
    readTime: "10 MIN READ",
    updated: "UPDATED AUGUST 8, 2026",
    sections: [
      ["1. Treat the spreadsheet as discovery, not proof", ["A spreadsheet helps you find products that would otherwise be difficult to search. CSSBuy states that products presented through its shopping-agent service come from third-party Chinese marketplaces and are not sold directly by CSSBuy. A spreadsheet therefore cannot prove seller reliability, stock, fit, quality, authenticity, or international route eligibility. It should lead to a specific product page and show when that route was last checked.", "Open the current product page before making any decision. Read the option names, compare all listing images, look for material and measurement notes, and check whether the displayed price applies to the exact variation you want. A low headline number can belong to an accessory, deposit, child size, or basic version rather than the main image."]],
      ["2. Check the URL and product options", ["Make sure the destination is a product page, not a generic search result or an unrelated category. Then review color, model, size, and bundle options one by one. If the translated option text is unclear, save a screenshot and ask for clarification before paying.", "A working URL can still change later. Sellers may update photos, replace options, or remove a listing. That is why this site shows a link-check date instead of making a permanent “verified” claim."]],
      ["3. Use measurements instead of labels", ["Sizing labels are not a universal standard. For clothing, compare chest width, shoulder, sleeve, and length with a similar garment you own. For footwear, prioritize insole or foot-length guidance and check whether the seller uses centimeters. For bags and accessories, confirm dimensions so the object is not much smaller or larger than the photos suggest.", "If a key measurement is missing, request it through the shopping service or ask for an extra warehouse photo with a ruler. Paying for a simple measurement is usually cheaper than shipping an unsuitable item internationally."]],
      ["4. Plan the warehouse QC check", ["CSSBuy's public item pages say the basic warehouse inspection covers visible style, quantity, color, size, model, and damage. Before arrival, decide which additional visible details matter. For shoes this may include pair alignment, outsole shape, glue marks, and insole length. For a jersey it may include badge position, player print, patches, and shirt width. For a jacket it may include zipper hardware, stains, garment measurements, and total weight.", "Warehouse photographs can reveal visible mismatches and defects, but they cannot prove composition, long-term durability, electronics safety, waterproofing, internal construction, or authenticity. Request an extra angle or ruler photo when the standard set does not answer a decision-critical question."]],
      ["5. Separate the two CSSBuy payments", ["CSSBuy's public product pages describe two stages. The first payment covers the selected goods and Chinese domestic delivery to the warehouse. After receipt and inspection, the shopper creates a parcel, chooses current packaging and an eligible route, and makes the second payment for international shipping. The product number in a spreadsheet is therefore not the delivered total.", "Domestic delivery, current checkout costs, optional photographs or services, packaging, actual or dimensional weight, and international shipping may all affect the outcome. Combine compatible items only when it makes sense. Removing nonessential packaging may reduce volume, but fragile or structured goods still need protection."]],
      ["6. Resolve returns and storage before parcel approval", ["CSSBuy's public FAQ says a return can be assisted if the seller accepts it, the item has been in the warehouse for fewer than seven days, and the shopper pays return delivery. Review warehouse photographs promptly rather than waiting for every planned item. Seller rules and custom products can still remove the return option.", "The homepage states 90 days of free storage, while some public item pages distinguish 90 days for common goods and 30 days for sensitive goods. Use the deadline shown for the specific order in the account. A good spreadsheet makes discovery easier; a good buying process combines that discovery with current terms, measurements, visible evidence, and a realistic parcel budget."]],
    ],
  },
  "read-warehouse-qc-photos": {
    title: "How to Read CSSBuy Warehouse QC Photos Before Shipping",
    description: "Use CSSBuy's published visible-inspection scope as a baseline, then review option, measurements, condition, limitations, and the return clock before parcel approval.",
    readTime: "8 MIN READ",
    updated: "UPDATED AUGUST 8, 2026",
    sections: [
      ["1. Start with CSSBuy's published inspection scope", ["CSSBuy's public item pages describe a basic warehouse inspection of visible style, quantity, color, size, model, and damage. Use those checks as a baseline, not as a promise that every product characteristic has been tested. Compare the warehouse images with the exact option text saved in the order rather than relying on memory.", "Confirm model, color, size label, quantity, and included parts first. If the order includes a special print, patch, accessory, or bundle, make sure it is visible. Ask for an extra photograph when the standard images do not show a detail that would change your decision."]],
      ["2. Inspect overall shape and symmetry", ["Look at the object as a whole before zooming into details. Compare left and right shoes, garment panels, collar shape, pocket position, and print alignment. Wide-angle warehouse photos may distort edges, so use multiple views instead of judging from one frame.", "For structured items such as shoes or bags, check whether storage or packing has crushed the shape. Minor deformation may recover, while severe creasing or asymmetry may not."]],
      ["3. Check measurements with a reference", ["A ruler photo is useful only when you know what measurement it represents. Compare the same points on an item you already own. For tops, chest width is normally measured flat, while circumference is approximately twice that value. For footwear, clarify whether the image shows the removable insole, outsole, or internal space.", "Allow for small measurement error, but do not ignore a difference large enough to affect fit."]],
      ["4. Separate lighting from real color differences", ["Warehouse lighting, camera white balance, screens, and reflective materials can change apparent color. Compare several photos and look for consistent differences. If color is critical, ask for a neutral-light image or a photo beside a known color reference.", "Also inspect for stains, scuffs, glue, pulled threads, dents, missing hardware, and inconsistent surface finish. Zoom carefully, but remember that compression can create artifacts."]],
      ["5. Know what photos cannot prove", ["QC photographs do not verify authenticity, internal construction, battery health, electrical compliance, chemical composition, waterproofing, or long-term durability. They are best used to assess visible condition and whether the received item resembles the selected option. Do not turn a visible warehouse check into an unsupported “fully quality checked” claim.", "For regulated, restricted, fragile, liquid, battery-powered, or high-value items, check the current CSSBuy route, insurance, and destination rules before deciding to ship. A photo of a product in the warehouse does not prove that every carrier will accept it."]],
      ["6. Decide while the return window may still be open", ["CSSBuy's public FAQ says a return can be assisted when the seller accepts it, the item has been in the warehouse for fewer than seven days, and the shopper pays the return delivery. Inspect promptly and raise a clear issue with the relevant photograph or measurement. Product-specific seller rules can still prevent a return.", "Approve international shipping only after the visible evidence answers the important questions. Time already spent purchasing and delivering within China is not a reason to ship the wrong option or an obvious defect. Resolve the warehouse decision first, then package the item appropriately and compare current parcel routes."]],
    ],
  },
  "product-price-vs-parcel-cost": {
    title: "CSSBuy Product Price vs. Total Parcel Cost",
    description: "Separate CSSBuy's first product-and-domestic-delivery payment from warehouse decisions, packaging, route selection, and the second international-shipping payment.",
    readTime: "9 MIN READ",
    updated: "UPDATED AUGUST 8, 2026",
    sections: [
      ["1. Start with the exact option price", ["The first number on a listing may not be the price of the version shown in the main image. Select the exact color, size, model, or bundle and check whether domestic shipping is added. Keep the source currency separate from an approximate display conversion because the checkout exchange rate can differ.", "When comparing two sellers, compare equivalent options. A cheaper listing without the same accessories, materials, or size range is not a direct comparison."]],
      ["2. Understand the first CSSBuy payment", ["CSSBuy's public item pages say the first stage covers the goods and Chinese domestic delivery to its warehouse. Domestic delivery may be free, fixed, or calculated by the seller. Current payment, exchange-rate, or service amounts shown at checkout also belong in the first-stage decision.", "Do not invent a universal fee percentage. Use the current CSSBuy checkout when placing the order, and keep the recorded CNY product value separate from any approximate display conversion."]],
      ["3. Understand actual and volumetric weight", ["Carriers may charge using actual weight or a dimensional calculation based on parcel volume. Shoes in rigid boxes, puffer jackets, and large bags can occupy more space than their weight suggests. Dense items, by contrast, may be dominated by actual weight.", "An estimate becomes more useful after the warehouse records item weight and dimensions. Before that, treat any delivery figure as a range rather than a promise."]],
      ["4. Make packaging choices deliberately", ["Removing retail packaging can reduce volume, but it can also reduce protection or resale value. Reinforcement, corner protection, waterproof wrapping, and bubble wrap can increase size and weight while lowering damage risk. Fragile items should not be stripped down simply to chase the lowest shipping figure.", "Ask which packaging services are available and choose them based on the item, route, and your tolerance for damage risk."]],
      ["5. Understand the second CSSBuy payment", ["After warehouse receipt and inspection, the shopper combines or separates items, chooses packaging and an eligible current route, and pays international shipping. CSSBuy provides a fee estimator, but route availability, product restrictions, parcel data, and billing rules can change. Treat an early number as an estimate, not a guaranteed quote.", "A useful comparison includes the exact variation, domestic delivery, current checkout costs, optional services, expected chargeable weight, packaging, and the international line. It should also include the possible return cost if warehouse evidence shows a problem."]],
      ["6. Keep return and storage timing in the calculation", ["CSSBuy's public FAQ describes a seller-accepted return while the item has been in the warehouse for fewer than seven days, with return delivery paid by the shopper. Inspect early enough to use that option if it applies. Delaying a decision can turn a returnable item into stored inventory that must be shipped or abandoned.", "The homepage states 90 days of free storage and a paid extension, while some product pages distinguish common and sensitive items. Use the order-specific account deadline. The best spreadsheet find is not automatically the cheapest listing; it is the one that still makes sense after quality uncertainty, timing, parcel impact, and the full two-stage workflow are considered."]],
    ],
  },
} as const;

export function generateStaticParams() {
  return Object.keys(guideData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = guideData[slug as keyof typeof guideData] ?? guideData["cssbuy-spreadsheet-guide"];
  return { title: guide.title, description: guide.description, alternates: { canonical: `/guides/${slug}` } };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guideData[slug as keyof typeof guideData] ?? guideData["cssbuy-spreadsheet-guide"];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    dateModified: "2026-08-08",
    datePublished: "2026-08-08",
    author: { "@type": "Organization", name: "CSSBuy China Editorial" },
    publisher: { "@type": "Organization", name: "CSSBuy China Editorial" },
    mainEntityOfPage: `https://cssbuychina.net/guides/${slug}`,
  };

  return (
    <InnerShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <article className="article-page">
        <header className="article-header">
          <div className="article-kicker"><span>{guide.updated}</span><span>{guide.readTime}</span></div>
          <h1>{guide.title}</h1>
          <p>{guide.description}</p>
        </header>
        <div className="article-layout">
          <aside><span>ON THIS PAGE</span>{guide.sections.map(([heading], index) => <a href={`#section-${index + 1}`} key={heading}>{heading}</a>)}</aside>
          <div className="article-body">
            <div className="article-note"><b>Research basis · checked August 8, 2026</b><p>This independent guide was reviewed against CSSBuy's public homepage, product-page workflow, warehouse information, shipping estimator, and FAQ. It does not promise product quality, delivery time, customs treatment, or a fixed final price; confirm the current order and route terms before paying.</p></div>
            {guide.sections.map(([heading, paragraphs], index) => (
              <section id={`section-${index + 1}`} key={heading}>
                <h2>{heading}</h2>
                {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </section>
            ))}
            <div className="article-end"><span>END / GUIDE</span><h2>Continue with checked finds.</h2><a href="/products">Browse the product index ↗</a></div>
          </div>
        </div>
      </article>
    </InnerShell>
  );
}
