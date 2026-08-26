import Link from "next/link";

const OFFICIAL_HOME = "https://hubbuy.com/";

const sourcesByArticle = {
  "how-to-buy-from-taobao-with-hubbuy": [
    ["Product-name-or-link search", "The current public portal accepts a product name or link as the starting point."],
    ["Taobao marketplace tab", "The current public shopping interface visibly separates Taobao and 1688 browsing."],
    ["Manual order form", "The public form requests the link, product name, CNY unit price, quantity, China shipping, shop name and specification note."],
  ],
  "hubbuy-return-exchange-after-qc": [
    ["Current warehouse sequence", "The official public homepage places inspection photos and storage after seller delivery to the warehouse."],
    ["Current help navigation", "The publicly indexed HubbuyCN help structure lists Returns and Refunds as a distinct purchasing-guidance topic."],
    ["Current access boundary", "The detailed help interface was under maintenance during the check, so no fixed return window, fee or outcome is claimed."],
  ],
  "hubbuy-order-status-guide": [
    ["Current purchase sequence", "The official public homepage separates ordering and payment from seller delivery to the warehouse."],
    ["Current warehouse sequence", "The official public homepage places quality inspection, inspection photos and storage after domestic arrival."],
    ["Current parcel sequence", "The official public homepage places consolidation and international-shipping payment after the warehouse stage."],
  ],
  "hubbuy-parcel-tracking-delay-guide": [
    ["Shipping policy", "Warehouse dispatch and third-party logistics handoff baseline"],
    ["Forwarding agreement", "Inbound receipt and responsibility boundary"],
    ["Insurance policy", "Delivery, recipient and customs-cooperation evidence"],
  ],
  "hubbuy-parcel-insurance-claim-guide": [
    ["Official parcel workflow", "Hubbuy places international shipping after warehouse inspection and parcel preparation.", OFFICIAL_HOME, "Official workflow ↗"],
    ["Insurance and Compensation", "The publicly indexed policy defines optional parcel-loss cover, formula, published limits, timing and exclusions.", "https://manager.hubbuycn.com/index/help/info/id/69.html", "Insurance policy ↗"],
    ["Shipping responsibility boundary", "The public shipping policy separates compensation responsibilities and excluded circumstances.", "https://manager.hubbuycn.com/index/help/info/id/20.html", "Shipping policy ↗"],
  ],
  "hubbuy-restricted-items-shipping-guide": [
    ["Official purchase workflow", "Hubbuy places international route selection after warehouse inspection and parcel preparation.", OFFICIAL_HOME, "Official page ↗"],
    ["Public shipping policy", "The HubbuyCN help center separates forbidden goods, shipment restrictions and carrier responsibility.", "https://manager.hubbuycn.com/index/help/info/id/20.html", "Shipping policy ↗"],
    ["International-mail safety boundary", "UPU identifies batteries, perfume and cleaning fluids as dangerous goods and explains that only limited exceptions may enter international mail.", "https://www.upu.int/en/Universal-Postal-Union/Outreach-Campaigns/Dangerous-Goods", "UPU guidance ↗"],
  ],
  "hubbuy-reviews-customer-experience": [
    ["Official service scope", "Hubbuy describes procurement, warehouse inspection, storage and consolidation; international shipping is provided by third parties.", OFFICIAL_HOME, "Official page ↗"],
    ["Trustpilot snapshot · 28 July 2026", "The live profile displayed 56 reviews, a 4.8 score and a 96% five-star share.", "https://www.trustpilot.com/review/hubbuy.com", "Public reviews ↗"],
    ["Trustpilot evidence boundary", "Trustpilot warns that the current sample may not be representative and labels reviews as individual opinions.", "https://www.trustpilot.com/review/hubbuy.com", "Sample limits ↗"],
  ],
  "hubbuy-product-link-not-working": [
    ["Homepage search · Product name or link", "The public search field accepts a product name or link as the starting point."],
    ["Public service description · Taobao, 1688 and Weidian", "Hubbuy publicly describes itself as a purchasing agent for these marketplaces."],
    ["Header navigation · Fill & Buy", "The current public navigation exposes a manual purchasing entry when a standard import is not enough."],
  ],
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

function OrderStatusMap() {
  return (
    <figure className="research-visual research-chain">
      <div className="research-visual-heading"><span>Original status map</span><strong>Prove the last completed handoff</strong></div>
      <div className="research-chain-grid">
        <div><b>01</b><strong>Order</strong><span>Payment and purchasing record</span></div>
        <i aria-hidden="true">→</i>
        <div><b>02</b><strong>Seller</strong><span>Domestic dispatch evidence</span></div>
        <i aria-hidden="true">→</i>
        <div><b>03</b><strong>Warehouse</strong><span>Receipt and item identification</span></div>
        <i aria-hidden="true">→</i>
        <div><b>04</b><strong>QC</strong><span>Photos, decision and storage</span></div>
      </div>
      <figcaption>Editorial stage map based on the current public purchase sequence checked on 12 August 2026. It is not an account screenshot or a promise that Hubbuy uses these exact English labels.</figcaption>
    </figure>
  );
}

function ReturnsDecisionMap() {
  return (
    <figure className="research-visual research-chain">
      <div className="research-visual-heading"><span>Original return decision map</span><strong>Keep the item out of the parcel until the issue closes</strong></div>
      <div className="research-chain-grid">
        <div><b>01</b><strong>Match</strong><span>Order, option and QC record</span></div>
        <i aria-hidden="true">→</i>
        <div><b>02</b><strong>Describe</strong><span>One observable mismatch</span></div>
        <i aria-hidden="true">→</i>
        <div><b>03</b><strong>Confirm</strong><span>Seller action, cost and timing</span></div>
        <i aria-hidden="true">→</i>
        <div><b>04</b><strong>Reconcile</strong><span>Return, exchange or acceptance</span></div>
      </div>
      <figcaption>Editorial workflow based on the current warehouse stage and public after-sales navigation checked on 14 August 2026. It is not an account screenshot or a promise of seller acceptance.</figcaption>
    </figure>
  );
}

function LinkTroubleshootingMap() {
  return (
    <figure className="research-visual research-chain">
      <div className="research-visual-heading"><span>Original troubleshooting map</span><strong>Repair the first broken handoff</strong></div>
      <div className="research-chain-grid">
        <div><b>01</b><strong>Open source</strong><span>Confirm the seller item still exists</span></div>
        <i aria-hidden="true">→</i>
        <div><b>02</b><strong>Copy final URL</strong><span>Preserve the item identifier</span></div>
        <i aria-hidden="true">→</i>
        <div><b>03</b><strong>Test import</strong><span>Match title, image and option</span></div>
        <i aria-hidden="true">→</i>
        <div><b>04</b><strong>Use manual path</strong><span>Submit saved evidence exactly</span></div>
      </div>
      <figcaption>Editorial decision flow created by Hubbuy Sheet. It is not a Hubbuy interface screenshot and does not claim that every marketplace uses one permanent URL format.</figcaption>
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

function ReviewEvidenceMatrix() {
  return (
    <figure className="research-visual review-evidence-matrix">
      <div className="research-visual-heading"><span>Original evidence matrix</span><strong>Read themes and limits together</strong></div>
      <div className="review-matrix-grid">
        <div><b>REPEATED POSITIVE</b><strong>Support · packaging · QC visibility</strong><span>Frequently described in the visible recent sample.</span></div>
        <div><b>CAUTION SIGNALS</b><strong>Cost · route choice · delivery expectations</strong><span>Appear inside both positive and lower-star reports.</span></div>
        <div><b>ISOLATED DISPUTE</b><strong>Functional electronics · compensation</strong><span>One detailed allegation; no public company reply was visible.</span></div>
        <div><b>SAMPLE LIMIT</b><strong>56 voluntary reviews · regional skew</strong><span>Useful for questions, insufficient for a universal failure rate.</span></div>
      </div>
      <figcaption>Editorial synthesis created by Hubbuy Sheet from the public Trustpilot sample checked on 28 July 2026. It is not a customer-satisfaction survey or a platform performance score.</figcaption>
    </figure>
  );
}

function RestrictedItemsMatrix() {
  return (
    <figure className="research-visual review-evidence-matrix">
      <div className="research-visual-heading"><span>Original restriction matrix</span><strong>Four checks before one parcel decision</strong></div>
      <div className="review-matrix-grid">
        <div><b>PROHIBITED</b><strong>Stop before purchase</strong><span>No route search can make an unlawful or forbidden item acceptable.</span></div>
        <div><b>DANGEROUS GOODS</b><strong>Classify and disclose</strong><span>Batteries, perfume and some everyday products need special handling.</span></div>
        <div><b>ROUTE-LIMITED</b><strong>Use the live result</strong><span>Eligibility depends on product type, packed parcel and destination.</span></div>
        <div><b>DESTINATION CHECK</b><strong>Customs decides</strong><span>An available line is not an import permit or delivery guarantee.</span></div>
      </div>
      <figcaption>Editorial decision map created by Hubbuy Sheet from public HubbuyCN shipping information and UPU dangerous-goods guidance. It is not a live route result.</figcaption>
    </figure>
  );
}

function InsuranceEvidenceMap() {
  return (
    <figure className="research-visual review-evidence-matrix">
      <div className="research-visual-heading"><span>Original insurance map</span><strong>Match one event to one evidence file</strong></div>
      <div className="review-matrix-grid">
        <div><b>PUBLISHED COVER</b><strong>Parcel loss · whole-parcel customs loss</strong><span>Confirm the wording for the live route before dispatch.</span></div>
        <div><b>VALUE RECORD</b><strong>Items · freight · insured amount</strong><span>Preserve the inputs and rate shown at checkout.</span></div>
        <div><b>EVENT RECORD</b><strong>Tracking · carrier · customs notice</strong><span>Describe what happened before assigning a claim category.</span></div>
        <div><b>EXCLUDED RISK</b><strong>Damage · delivered scan · recipient failure</strong><span>Evidence identifies an event; it does not rewrite an exclusion.</span></div>
      </div>
      <figcaption>Editorial evidence map created by Hubbuy Sheet from the publicly indexed HubbuyCN insurance policy checked on 3 August 2026. It is not a coverage certificate.</figcaption>
    </figure>
  );
}

function TrackingEvidenceMap() {
  return (
    <figure className="research-visual review-evidence-matrix">
      <div className="research-visual-heading"><span>Original tracking map</span><strong>One missing handoff, one evidence request</strong></div>
      <div className="review-matrix-grid">
        <div><b>WAREHOUSE</b><strong>Parcel · route · dispatch</strong><span>Confirm what physically left and which carrier accepted it.</span></div>
        <div><b>TRANSIT</b><strong>Last scan · time · location</strong><span>Preserve the last proven movement before opening a trace.</span></div>
        <div><b>CUSTOMS</b><strong>Notice · documents · response</strong><span>Identify the request rather than predicting the outcome.</span></div>
        <div><b>LAST MILE</b><strong>Attempt · pickup · delivery</strong><span>Use the local carrier for address and delivery evidence.</span></div>
      </div>
      <figcaption>Editorial decision map created by Hubbuy Sheet from publicly indexed HubbuyCN shipping, forwarding and insurance information checked on 10 August 2026. It is not a live tracking result.</figcaption>
    </figure>
  );
}

function TaobaoHandoffMap() {
  return (
    <figure className="research-visual research-chain">
      <div className="research-visual-heading"><span>Original Taobao handoff map</span><strong>Keep one product identity through three records</strong></div>
      <div className="research-chain-grid">
        <div><b>01</b><strong>Taobao source</strong><span>Shop, item ID and selected SKU</span></div>
        <i aria-hidden="true">→</i>
        <div><b>02</b><strong>Hubbuy order</strong><span>Exact instruction and China shipping</span></div>
        <i aria-hidden="true">→</i>
        <div><b>03</b><strong>Warehouse receipt</strong><span>Identity, quantity and visible condition</span></div>
        <i aria-hidden="true">→</i>
        <div><b>04</b><strong>Decision</strong><span>Approve, clarify or resolve</span></div>
      </div>
      <figcaption>Editorial workflow based on the public HubbuyCN purchase and manual-order interfaces checked on 26 August 2026. It is not an account screenshot or a seller-performance promise.</figcaption>
    </figure>
  );
}

function ArticleVisual({ slug }) {
  if (slug === "how-to-buy-from-taobao-with-hubbuy") return <TaobaoHandoffMap />;
  if (slug === "hubbuy-return-exchange-after-qc") return <ReturnsDecisionMap />;
  if (slug === "hubbuy-order-status-guide") return <OrderStatusMap />;
  if (slug === "hubbuy-parcel-tracking-delay-guide") return <TrackingEvidenceMap />;
  if (slug === "hubbuy-parcel-insurance-claim-guide") return <InsuranceEvidenceMap />;
  if (slug === "hubbuy-restricted-items-shipping-guide") return <RestrictedItemsMatrix />;
  if (slug === "hubbuy-reviews-customer-experience") return <ReviewEvidenceMatrix />;
  if (slug === "hubbuy-product-link-not-working") return <LinkTroubleshootingMap />;
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
      <span>Research evidence · checked {article.factCheckedDisplayDate}</span>
      <h2>See the calculation, interface logic and exact official section</h2>
      <p>{compact ? "Separate the public statement, the editorial example and the live transaction data." : "These additions separate three things that are often mixed together: what Hubbuy states publicly, the example used to explain a decision, and the live account data that must still be checked at transaction time."}</p>

      <ArticleVisual slug={article.slug} />

      <div className="source-ledger">
        <div className="source-ledger-heading"><span>Primary-source ledger</span><strong>Official Hubbuy page and named section</strong></div>
        {sources.map(([section, evidence, href = OFFICIAL_HOME, label = "Official page ↗"], index) => article.noExternalSourceLinks ? (
          <div key={section} className="source-ledger-row">
            <b>0{index + 1}</b><span><strong>{section}</strong><small>{evidence}</small></span><em>{article.slug === "how-to-buy-from-taobao-with-hubbuy" ? "Checked 26 Aug 2026" : article.slug === "hubbuy-return-exchange-after-qc" ? "Checked 14 Aug 2026" : article.slug === "hubbuy-order-status-guide" ? "Checked 12 Aug 2026" : "Checked 10 Aug 2026"}</em>
          </div>
        ) : (
          <a key={section} href={href} target="_blank" rel="noopener">
            <b>0{index + 1}</b><span><strong>{section}</strong><small>{evidence}</small></span><em>{label}</em>
          </a>
        ))}
      </div>
      <p className="research-boundary">{compact ? "Account-specific rules and restrictions must be checked in the live order or parcel interface." : "The official policy labels visible in Hubbuy’s footer may lead to account-gated help content. This article does not claim that a login-only rule was independently verified from a public page. For transaction-specific restrictions, use the live order or parcel interface and current official support."}</p>
      <div className="research-next-links"><Link href="/about/">Read the fact-check method</Link><Link href="/contact/">Report a source change</Link></div>
    </section>
  );
}
