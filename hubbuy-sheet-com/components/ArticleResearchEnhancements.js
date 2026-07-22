import Link from "next/link";

const OFFICIAL_HOME = "https://hubbuy.com/";

const sourcesByArticle = {
  "how-to-use-a-hubbuy-spreadsheet": [
    ["How to Purchase · Place an order and pay", "Product price and China shipping appear at the order stage."],
    ["How to Purchase · Pay package fee", "The public page places inspection images and the advertised storage period at warehouse arrival."],
    ["How to Purchase · Wait for delivery", "Order combination and international shipping appear at the parcel stage."],
  ],
  "hubbuy-qc-photos-guide": [
    ["How to Purchase · Pay package fee", "Hubbuy publicly states that goods enter quality inspection and free inspection images are provided."],
    ["How to Purchase · Place an order and pay", "The source order and selected variant exist before warehouse evidence is created."],
    ["Public statement boundary", "The homepage does not state a universal QC-photo count or an extra-photo price."],
  ],
  "hubbuy-shipping-cost-guide": [
    ["Header navigation · Shipping Cost Estimate", "The public navigation exposes a shipping-estimate entry for planning."],
    ["How to Purchase · Place an order and pay", "Product price and China shipping are paid before the international parcel stage."],
    ["How to Purchase · Wait for delivery", "International shipping is paid after warehouse inspection and parcel preparation."],
  ],
  "hubbuy-warehouse-storage-consolidation": [
    ["How to Purchase · Pay package fee", "The public page currently advertises 300 days of free storage."],
    ["How to Purchase · Wait for delivery", "The public page says different orders can be combined for shipping."],
    ["Public statement boundary", "The storage headline is not presented here as a seller-return or dispute deadline."],
  ],
};

function EvidenceChain() {
  return (
    <figure className="research-visual research-chain">
      <div className="research-visual-heading"><span>Original workflow map</span><strong>One decision, one surviving record</strong></div>
      <div className="research-chain-grid">
        <div><b>01</b><strong>Source</strong><span>Listing URL + selected option</span></div>
        <i aria-hidden="true">→</i>
        <div><b>02</b><strong>Order</strong><span>Variant + China shipping</span></div>
        <i aria-hidden="true">→</i>
        <div><b>03</b><strong>Warehouse</strong><span>QC evidence + decision</span></div>
        <i aria-hidden="true">→</i>
        <div><b>04</b><strong>Parcel</strong><span>Weight + route + tracking</span></div>
      </div>
      <figcaption>Editorial workflow created by Hubbuy Sheet from the public three-stage purchase sequence. It is not an official Hubbuy interface image.</figcaption>
    </figure>
  );
}

function QcInterfaceMap() {
  return (
    <figure className="research-visual qc-interface-map">
      <div className="research-visual-heading"><span>Annotated interface map</span><strong>Turn a photo set into a decision</strong></div>
      <div className="interface-map-shell">
        <div className="interface-map-bar"><i /><i /><i /><span>Warehouse review record</span></div>
        <div className="interface-map-grid">
          <div className="interface-map-photo"><span>PHOTO SET</span><strong>Front · back · label · detail</strong><small>Visible evidence only</small></div>
          <ol>
            <li><b>1</b><span><strong>Saved order</strong>Match model, color, size and quantity.</span></li>
            <li><b>2</b><span><strong>Observation</strong>Name the visible fact—not a guess.</span></li>
            <li><b>3</b><span><strong>Action</strong>Approve, request one detail or contact support.</span></li>
          </ol>
        </div>
      </div>
      <figcaption>Editorial reconstruction for explaining the review logic; not a screenshot of a Hubbuy account or a promise about current controls.</figcaption>
    </figure>
  );
}

function ShippingExample() {
  return (
    <figure className="research-visual shipping-example">
      <div className="research-visual-heading"><span>Worked cost example</span><strong>Why a light parcel can be charged as a larger one</strong></div>
      <div className="shipping-example-grid">
        <div><span>Example packed box</span><strong>40 × 30 × 20 cm</strong><small>Illustrative dimensions</small></div>
        <div><span>Actual weight</span><strong>1.8 kg</strong><small>Example scale reading</small></div>
        <div><span>Hypothetical divisor</span><strong>÷ 6,000</strong><small>Route rules vary</small></div>
        <div className="shipping-result"><span>Example volumetric weight</span><strong>4.0 kg</strong><small>40 × 30 × 20 ÷ 6,000</small></div>
      </div>
      <p><strong>Interpretation:</strong> if a route used this illustrative divisor and charged the greater figure, the planning weight would be 4.0 kg rather than 1.8 kg. This is a teaching example—not a Hubbuy quote, permanent divisor or promised rate. Always use the divisor and chargeable-weight rule shown for the live route.</p>
      <figcaption>Original calculation example prepared by Hubbuy Sheet. No live shipping price is inferred.</figcaption>
    </figure>
  );
}

function WarehouseLedger() {
  return (
    <figure className="research-visual warehouse-ledger">
      <div className="research-visual-heading"><span>Original record example</span><strong>A four-row warehouse ledger</strong></div>
      <div className="ledger-table" role="table" aria-label="Example warehouse inventory ledger">
        <div role="row"><b role="columnheader">Item</b><b role="columnheader">Arrival</b><b role="columnheader">QC</b><b role="columnheader">Parcel group</b></div>
        <div role="row"><span>Shoes</span><span>22 Jul</span><span>Needs insole measure</span><span>Hold</span></div>
        <div role="row"><span>Jacket</span><span>23 Jul</span><span>Approved</span><span>Soft goods A</span></div>
        <div role="row"><span>Watch</span><span>25 Jul</span><span>Check model label</span><span>Route review</span></div>
      </div>
      <figcaption>Illustrative inventory record. Dates and products are examples, not a customer order or warehouse screenshot.</figcaption>
    </figure>
  );
}

function ArticleVisual({ slug }) {
  if (slug === "how-to-use-a-hubbuy-spreadsheet") return <EvidenceChain />;
  if (slug === "hubbuy-qc-photos-guide") return <QcInterfaceMap />;
  if (slug === "hubbuy-shipping-cost-guide") return <ShippingExample />;
  return <WarehouseLedger />;
}

export default function ArticleResearchEnhancements({ article }) {
  const sources = sourcesByArticle[article.slug] || [];
  const compact = article.slug === "how-to-use-a-hubbuy-spreadsheet";
  return (
    <section id="research-evidence" className="article-research-evidence">
      <span>Research evidence · checked 22 July 2026</span>
      <h2>See the calculation, interface logic and exact official section</h2>
      <p>{compact ? "Separate the public statement, the editorial example and the live transaction data." : "These additions separate three things that are often mixed together: what Hubbuy states publicly, the example used to explain a decision, and the live account data that must still be checked at transaction time."}</p>

      <ArticleVisual slug={article.slug} />

      <div className="source-ledger">
        <div className="source-ledger-heading"><span>Primary-source ledger</span><strong>Official Hubbuy page and named section</strong></div>
        {sources.map(([section, evidence], index) => (
          <a key={section} href={OFFICIAL_HOME} target="_blank" rel="noopener">
            <b>0{index + 1}</b><span><strong>{section}</strong><small>{evidence}</small></span><em>Official page ↗</em>
          </a>
        ))}
      </div>
      <p className="research-boundary">{compact ? "Account-specific rules and restrictions must be checked in the live order or parcel interface." : "The official policy labels visible in Hubbuy’s footer may lead to account-gated help content. This article does not claim that a login-only rule was independently verified from a public page. For transaction-specific restrictions, use the live order or parcel interface and current official support."}</p>
      <div className="research-next-links"><Link href="/about/">Read the fact-check method</Link><Link href="/contact/">Report a source change</Link></div>
    </section>
  );
}
