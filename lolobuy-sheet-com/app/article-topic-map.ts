export type ArticleTopicMapEntry = {
  url: `/articles/${string}`;
  primaryQuery: string;
  relatedTerms: string[];
  intent: "informational" | "commercial investigation" | "problem solving";
  angle: string;
  evidence: string[];
  internalLinkRole: string;
};

export const articleTopicMap: ArticleTopicMapEntry[] = [
  {
    url: "/articles/lolobuy-spreadsheet-guide",
    primaryQuery: "lolobuy spreadsheet guide",
    relatedTerms: ["lolobuy spreadsheet", "verify product links", "lolobuy finds"],
    intent: "informational",
    angle: "Use a directory for discovery while rechecking the live seller record.",
    evidence: ["LoloBuy public website", "Identified community ordering guide"],
    internalLinkRole: "Entry point to the finds directory, source verification and general QC.",
  },
  {
    url: "/articles/how-to-read-qc-photos",
    primaryQuery: "how to read lolobuy qc photos",
    relatedTerms: ["lolobuy qc checklist", "warehouse photos", "qc photo measurements"],
    intent: "informational",
    angle: "Interpret visible identity, measurements and condition without overstating what photographs prove.",
    evidence: ["LoloBuy public website", "Independent preliminary LoloBuy report"],
    internalLinkRole: "General inspection hub linking to category checks and shipping decisions.",
  },
  {
    url: "/articles/plan-china-shopping-haul",
    primaryQuery: "lolobuy shipping guide",
    relatedTerms: ["warehouse storage", "parcel consolidation", "actual vs volumetric weight"],
    intent: "informational",
    angle: "Plan a parcel from packed evidence rather than a universal shipping-cost promise.",
    evidence: ["LoloBuy public website", "Identified community ordering guide"],
    internalLinkRole: "Connect warehouse decisions with the packed-parcel shipping guide.",
  },
  {
    url: "/articles/lolobuy-review-early-user-experience",
    primaryQuery: "lolobuy review",
    relatedTerms: ["lolobuy experience", "lolobuy qc review", "is lolobuy legit"],
    intent: "commercial investigation",
    angle: "Separate one preliminary warehouse-stage report from untested parcel claims.",
    evidence: ["LoloBuy public website", "Independent preliminary LoloBuy report", "Identified community ordering guide"],
    internalLinkRole: "Evidence boundary for readers comparing published service claims with user reports.",
  },
  {
    url: "/articles/lolobuy-weidian-link-guide",
    primaryQuery: "lolobuy weidian link",
    relatedTerms: ["weidian product link", "lolobuy product link", "verify weidian variants"],
    intent: "problem solving",
    angle: "Preserve the exact source listing and verify parsed variants from URL to warehouse.",
    evidence: ["LoloBuy public website", "Identified community ordering guide", "Documented Weidian-to-LoloBuy example", "Weidian public website"],
    internalLinkRole: "Marketplace-specific entry point to product pages, spreadsheet verification and QC.",
  },
  {
    url: "/articles/lolobuy-qc-mismatch-evidence-guide",
    primaryQuery: "what to do if lolobuy qc is wrong",
    relatedTerms: ["lolobuy qc mismatch", "wrong size warehouse photos", "lolobuy return after qc", "qc evidence for refund request"],
    intent: "problem solving",
    angle: "Build a verifiable evidence file after a mismatch appears, without inventing a universal return or refund policy.",
    evidence: ["LoloBuy public website", "Identified community ordering guide", "Independent preliminary LoloBuy report", "Lolobuy Sheet editorial evidence framework"],
    internalLinkRole: "Remedial follow-on from the general QC checklist to category evidence, seller-link records and current order actions.",
  },
  {
    url: "/articles/lolobuy-tracking-not-updating-guide",
    primaryQuery: "lolobuy tracking not updating",
    relatedTerms: ["lolobuy tracking number not working", "lolobuy parcel no update", "lolobuy customs tracking delay", "lolobuy package stuck"],
    intent: "problem solving",
    angle: "Diagnose the exact last carrier event and responsible handoff before escalating, without inventing a universal lost-parcel threshold or delivery promise.",
    evidence: ["LoloBuy public website and parcel interface", "DHL eCommerce tracking FAQ", "USPS Tracking: The Basics", "UPS Tracking Support", "Lolobuy Sheet last-scan framework"],
    internalLinkRole: "Post-dispatch troubleshooting follow-on from parcel planning, connecting route selection with carrier, customs and evidence-led escalation.",
  },
  {
    url: "/articles/lolobuy-shoe-size-guide",
    primaryQuery: "lolobuy shoe size guide",
    relatedTerms: ["how to choose lolobuy shoe size", "lolobuy insole measurement", "lolobuy shoe qc photos", "chinese shoe size chart lolobuy"],
    intent: "problem solving",
    angle: "Compare foot, reference-insole and listing measurements before using warehouse evidence to verify the received pair.",
    evidence: ["LoloBuy public website", "Lolobuy Sheet measurement framework"],
    internalLinkRole: "Category-specific sizing path from shoe finds to the general QC and mismatch-evidence guides.",
  },
  {
    url: "/articles/lolobuy-keyword-search-product-finds",
    primaryQuery: "lolobuy keyword search",
    relatedTerms: ["lolobuy product search", "find products on lolobuy", "lolobuy search terms", "lolobuy spreadsheet keywords"],
    intent: "problem solving",
    angle: "Build a query ladder, compare live source records and preserve exact variants instead of collecting random search cards.",
    evidence: ["LoloBuy public website checked August 12, 2026", "Lolobuy Sheet query-and-variant framework"],
    internalLinkRole: "Product-discovery bridge from the finds directory to source-link verification and spreadsheet maintenance.",
  },
  {
    url: "/articles/lolobuy-taobao-finds-compare-options",
    primaryQuery: "LoloBuy Taobao finds",
    relatedTerms: ["compare Taobao product options", "LoloBuy Taobao size color quantity", "Taobao finds checklist", "LoloBuy Taobao product link"],
    intent: "commercial investigation",
    angle: "Compare exact live option combinations, evidence and seller terms before submitting a Taobao source link.",
    evidence: ["LoloBuy public website checked August 14, 2026", "Lolobuy Sheet Taobao option-comparison framework"],
    internalLinkRole: "Marketplace-specific comparison branch after keyword discovery and before order or warehouse verification.",
  },
  {
    url: "/articles/lolobuy-1688-finds-moq-variants",
    primaryQuery: "LoloBuy 1688 finds",
    relatedTerms: ["LoloBuy 1688 MOQ", "1688 variant verification", "1688 quantity tiers", "1688 seller questions"],
    intent: "commercial investigation",
    angle: "Verify minimum quantity, pricing unit, exact SKU, applicable tier and seller-supplied conditions before submitting a 1688 link.",
    evidence: ["LoloBuy public website checked August 26, 2026", "Current 1688 listing fields", "Lolobuy Sheet 1688 order-equation framework"],
    internalLinkRole: "Wholesale-listing branch after keyword discovery, distinct from the retail-option focus of the Taobao comparison guide.",
  },
];
