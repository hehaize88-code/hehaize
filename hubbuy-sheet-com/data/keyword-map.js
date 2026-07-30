import { articles } from "./articles.js";
import { categoryPages } from "./categories.js";
import { products } from "./site.js";

const corePages = [
  {
    url: "/",
    primaryQuery: "Hubbuy spreadsheet",
    secondaryTerms: ["Hubbuy spreadsheet 2026", "Hubbuy product spreadsheet"],
    searchIntent: "Broad product discovery and site overview",
    angle: "Pillar page connecting product categories, research and practical guides",
    evidence: ["Current catalog records", "Hubbuy public purchase workflow"],
    internalLinkRole: "Primary pillar linking to products, categories, guides and articles",
  },
  {
    url: "/products/",
    primaryQuery: "Hubbuy spreadsheet finds",
    secondaryTerms: ["Hubbuy product finds", "Hubbuy product list"],
    searchIntent: "Browse current product references",
    angle: "Sixty-four product references grouped into eight reviewable categories",
    evidence: ["CNBuy Sheet live product destinations", "Recorded source IDs and July 2026 reference prices"],
    internalLinkRole: "Catalog hub linking to every category and product research page",
  },
  {
    url: "/articles/",
    primaryQuery: "Hubbuy research articles",
    secondaryTerms: ["Hubbuy shopping guides", "Hubbuy agent research"],
    searchIntent: "Find long-form research and troubleshooting",
    angle: "Editorial index separating deep research from short action checklists",
    evidence: ["Article metadata", "Source ledgers and fact-check dates"],
    internalLinkRole: "Editorial hub linking to every English article",
  },
  {
    url: "/guides/how-to-buy/",
    primaryQuery: "Hubbuy order checklist",
    secondaryTerms: ["Hubbuy buying steps", "Hubbuy link to parcel checklist"],
    searchIntent: "Follow a concise ordering workflow",
    angle: "Five-step action checklist from product definition to parcel submission",
    evidence: ["Hubbuy public three-stage purchase workflow"],
    internalLinkRole: "Action hub linking to detailed purchase and link-troubleshooting articles",
  },
  {
    url: "/guides/qc-checks/",
    primaryQuery: "Hubbuy warehouse QC checklist",
    secondaryTerms: ["Hubbuy QC by product category", "Hubbuy measurement photo checklist"],
    searchIntent: "Choose category-specific warehouse checks",
    angle: "Visible evidence and measurement prompts by product type",
    evidence: ["Hubbuy public statement about inspection images", "Category-specific editorial checks"],
    internalLinkRole: "QC action hub linking to QC research and relevant categories",
  },
  {
    url: "/guides/shipping/",
    primaryQuery: "Hubbuy parcel planning checklist",
    secondaryTerms: ["Hubbuy packaging checklist", "Hubbuy shipping route checklist"],
    searchIntent: "Prepare a completed warehouse parcel",
    angle: "Packing, weight, dimensions, protection and route eligibility",
    evidence: ["Hubbuy public parcel stage", "Live-route verification boundary"],
    internalLinkRole: "Shipping action hub linking to cost and consolidation research",
  },
  {
    url: "/faq/",
    primaryQuery: "Hubbuy FAQ",
    secondaryTerms: ["Hubbuy order questions", "Hubbuy QC storage shipping answers"],
    searchIntent: "Get concise answers and source boundaries",
    angle: "Grouped factual answers without inventing universal fees or service limits",
    evidence: ["Hubbuy public homepage and footer help topics"],
    internalLinkRole: "Question hub distributing readers to the correct guide or article",
  },
  {
    url: "/about/",
    primaryQuery: "About Hubbuy Sheet",
    secondaryTerms: ["Hubbuy Sheet editorial policy", "independent Hubbuy guide"],
    searchIntent: "Verify publisher identity and research method",
    angle: "Editorial identity, commercial disclosure and correction process",
    evidence: ["Visible site disclosures", "Documented fact-check method"],
    internalLinkRole: "Trust page referenced by article author structured data",
  },
  {
    url: "/contact/",
    primaryQuery: "Contact Hubbuy Sheet",
    secondaryTerms: ["Hubbuy Sheet correction", "report a product link"],
    searchIntent: "Submit an editorial correction",
    angle: "Separates site corrections from Hubbuy order support and catalog issues",
    evidence: ["Public GitHub correction channel"],
    internalLinkRole: "Correction destination linked from research source ledgers",
  },
  {
    url: "/legal/privacy/",
    primaryQuery: "Hubbuy Sheet privacy policy",
    secondaryTerms: ["Hubbuy Sheet data policy"],
    searchIntent: "Understand site data handling",
    angle: "Plain-language privacy scope for an informational guide",
    evidence: ["Current site behavior and disclosed external links"],
    internalLinkRole: "Legal trust page linked from the footer",
  },
  {
    url: "/legal/terms/",
    primaryQuery: "Hubbuy Sheet terms",
    secondaryTerms: ["Hubbuy Sheet disclaimer", "Hubbuy Sheet acceptable use"],
    searchIntent: "Understand site limitations and terms",
    angle: "Editorial, product-reference and external-transaction boundaries",
    evidence: ["Current site functions and commercial disclosure"],
    internalLinkRole: "Legal trust page linked from the footer",
  },
];

const articleStrategies = {
  "hubbuy-restricted-items-shipping-guide": {
    primaryQuery: "Hubbuy restricted items",
    secondaryTerms: ["Hubbuy shipping restrictions", "Hubbuy battery shipping", "Hubbuy liquids shipping", "Hubbuy prohibited items"],
    searchIntent: "Decide whether a product is transportable before ordering or submitting an international parcel",
    angle: "Four-layer check separating prohibited goods, transport hazards, route eligibility and destination import rules",
    evidence: ["Hubbuy public purchase workflow", "Public HubbuyCN forwarding and shipping policies", "UPU dangerous-goods guidance"],
    internalLinkRole: "Restricted-items decision leaf supporting the parcel checklist without competing with the shipping-cost article",
  },
  "hubbuy-reviews-customer-experience": {
    primaryQuery: "Hubbuy reviews",
    secondaryTerms: ["Hubbuy customer reviews", "is Hubbuy reliable", "Hubbuy shipping reviews", "Hubbuy complaints"],
    searchIntent: "Assess Hubbuy through attributable public customer evidence before placing an order",
    angle: "Balanced synthesis of current support, QC, packaging, shipping and after-sales themes with explicit sample limits",
    evidence: ["Hubbuy public service description", "Trustpilot live aggregate and dated public customer reports"],
    internalLinkRole: "Decision-support article linking review evidence to the purchase, QC and shipping research clusters",
  },
  "hubbuy-product-link-not-working": {
    primaryQuery: "Hubbuy link not working",
    secondaryTerms: ["Hubbuy Taobao link", "Hubbuy Weidian link", "Hubbuy 1688 link", "Hubbuy manual order"],
    searchIntent: "Troubleshoot a source URL that fails, imports incorrectly or loses its original item",
    angle: "Diagnose the source, redirect and agent-import layers before using the manual path",
    evidence: ["Hubbuy public link search and Fill & Buy navigation", "Dated external troubleshooting and user reports"],
    internalLinkRole: "Troubleshooting leaf supporting the order checklist and purchase-research article",
  },
  "how-to-use-a-hubbuy-spreadsheet": {
    primaryQuery: "Hubbuy purchase research",
    secondaryTerms: ["how to use a Hubbuy spreadsheet", "Hubbuy buying workflow"],
    searchIntent: "Research the complete journey before ordering",
    angle: "Evidence-led path from source listing through cost, QC and parcel",
    evidence: ["Hubbuy public three-stage purchase workflow"],
    internalLinkRole: "Broad workflow article supporting the homepage pillar and three action guides",
  },
  "hubbuy-qc-photos-guide": {
    primaryQuery: "how to read Hubbuy QC photos",
    secondaryTerms: ["Hubbuy QC photo evidence", "Hubbuy extra photo request"],
    searchIntent: "Interpret warehouse images and decide the next action",
    angle: "What visible evidence can show, what it cannot prove and when one detail is missing",
    evidence: ["Hubbuy public statement about free inspection images", "Category-specific visual checks"],
    internalLinkRole: "Deep QC article supporting the QC checklist",
  },
  "hubbuy-shipping-cost-guide": {
    primaryQuery: "how Hubbuy shipping costs work",
    secondaryTerms: ["Hubbuy volumetric weight", "Hubbuy parcel shipping cost"],
    searchIntent: "Understand cost inputs before choosing a route",
    angle: "Actual weight, volume, packaging and route rules with a worked example",
    evidence: ["Hubbuy public payment stages and shipping estimate entry"],
    internalLinkRole: "Shipping-cost article supporting the parcel checklist",
  },
  "hubbuy-warehouse-storage-consolidation": {
    primaryQuery: "Hubbuy warehouse storage and consolidation",
    secondaryTerms: ["Hubbuy 300 days storage", "combine Hubbuy orders"],
    searchIntent: "Plan warehouse timing and compatible parcel groups",
    angle: "Arrival ledger, prompt QC, consolidation triggers and evidence retention",
    evidence: ["Hubbuy public storage and order-combination statements"],
    internalLinkRole: "Warehouse-planning article connecting QC and shipping clusters",
  },
};

const articlePages = articles.map((article) => ({
  url: `/articles/${article.slug}/`,
  ...articleStrategies[article.slug],
}));

const categoryPagesMap = categoryPages.map((category) => ({
  url: `/categories/${category.slug}/`,
  primaryQuery: `Hubbuy ${category.name.toLowerCase()} spreadsheet`,
  secondaryTerms: [`Hubbuy ${category.name.toLowerCase()} finds`, `${category.name.toLowerCase()} QC checklist`],
  searchIntent: `Browse and review ${category.name.toLowerCase()} product references`,
  angle: `${category.name} shortlist with category-specific source, QC and parcel checks`,
  evidence: ["Current catalog records", "Category-specific editorial research"],
  internalLinkRole: "Category hub linking the product catalog to eight relevant research pages",
}));

const productPages = products.map((product) => ({
  url: product.localHref,
  primaryQuery: `${product.name} Hubbuy reference`,
  secondaryTerms: [`${product.name} product link`, `${product.name} QC checks`],
  searchIntent: "Review one recorded product reference before opening its live listing",
  angle: `Source ID ${product.sourceId}, reference price, category checks and exact catalog destination`,
  evidence: ["CNBuy Sheet live product destination", `Recorded source ID ${product.sourceId}`],
  internalLinkRole: `Product leaf linking back to ${product.category} and the full product index`,
}));

export const keywordTopicMap = [
  ...corePages,
  ...articlePages,
  ...categoryPagesMap,
  ...productPages,
];
