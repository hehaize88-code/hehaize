import type { Guide } from "./article-data";

// English revisions stay separate so existing reviewed translations keep their
// own copy and dates until those translations receive an editorial update.
const revised = { updated: "October 2, 2026", modifiedISO: "2026-10-02" };

export const englishGuideUpdates: Record<string, Partial<Guide>> = {
  "uufinds-spreadsheet-shopping-guide-2026": {
    ...revised,
    seoTitle: "How to Use a UUFinds Spreadsheet",
    primaryKeyword: "how to use a uufinds spreadsheet",
    description: "Learn how to use a UUFinds spreadsheet: shortlist a product, preserve its source link, match QC photos and verify the current listing before shopping.",
    intro: [
      "To learn how to use a UUFinds spreadsheet, follow one product from its category to its original listing, match any available QC photos to the same item and option, then recheck the current destination. Save the source URL, seller, selected size or color, evidence date and missing checks. This turns a list of finds into a shortlist you can actually compare.",
      "Begin with a category when you only have a product idea. Begin with the exact source link when you already know the item. This guide explains how to use an existing collection; creating a new spreadsheet is a separate setup task. A thumbnail, displayed price or old warehouse photo is a research lead, and each needs current listing context before it can support your decision.",
    ],
  },
  "uufinds-qc-checklist": {
    ...revised,
    seoTitle: "UUFinds QC Photos: Practical Checklist",
    description: "Check UUFinds QC photos in order: listing identity, size and color, visible details, measurements and missing views. Keep a clear record of what remains unknown.",
    intro: [
      "Review UUFinds QC photos in this order: confirm the source item and seller, match the intended size and color, inspect the relevant views, read any visible measurements, and record what is missing. For a hoodie, that might mean a readable chest measurement and both sides of the garment. For shoes, it might mean the size label, both shoes, side profile and outsole.",
      "Write an observation that can be checked against a specific image. Front print appears centered; back view missing is more useful than good quality. An album may document one photographed unit without establishing a later batch, current stock or durability. Keep an unresolved option or unreadable ruler marked unknown, and ask for the missing evidence before treating the record as complete.",
      "Keep one dated note for each candidate: source item, selected option, photographs reviewed, visible finding and next action. Use the same fields for alternatives so that a missing view is not confused with a defect or a confirmed match.",
    ],
  },
  "how-to-use-uufinds": {
    ...revised,
    seoTitle: "How to Use UUFinds: Links & QC Photos",
    description: "Learn how to use UUFinds with a product link or image, verify the returned item, review QC photos and keep the original source when continuing to shop.",
    intro: [
      "Here is how to use UUFinds for product research: keep the original marketplace link, use it as the search input, compare the returned item identifier and seller, then review the QC material for your selected option. If you only have a screenshot, use image discovery to find candidates and recover a verifiable source before treating any album as a match.",
      "Keep the research record separate from the shopping destination. A result can help identify a candidate or reveal a missing view, while the current listing establishes which item and option you can open now. If no usable QC set appears, record the exact input and the missing evidence; a failed search alone cannot establish product quality or prove that no photos exist elsewhere. Preserve the input, visible error and date so that a later attempt can be compared with the same starting point.",
    ],
  },
  "spreadsheet-vs-qc-finder": {
    ...revised,
    seoTitle: "Spreadsheet vs QC Finder: When to Use Each",
    description: "Use a spreadsheet to organize product candidates and a QC finder to locate listing-specific evidence. Compare the two workflows and choose your next step.",
    intro: [
      "Use a product spreadsheet when you need to discover, save or compare candidates. Use a QC finder when you have a source link or image lead and need available evidence for a particular listing. A useful research process connects the two: preserve a candidate in the sheet, check its identity and photographs, then record the result beside the original source.",
      "For example, a spreadsheet can organize three hoodies by seller, size and displayed price. A QC search can help you look for readable measurements and visible finishing for each exact option. If an album belongs to another size, keep it as a reference and leave the measurement decision open. This guide compares those jobs rather than ranking individual search services.",
    ],
  },
  "uufinds-image-search-guide": {
    ...revised,
    seoTitle: "UUFinds Image Search: Find Products",
    relatedLinks: [
      { href: "/guides/uufinds-confirm-result-original-listing/", label: "Confirm the original listing", description: "Check the source, seller and option behind a visual match." },
      { href: "/guides/uufinds-vs-finderqc/", label: "UUFinds vs FinderQC", description: "Compare documented inputs and evaluate exact-product evidence." },
      { href: "/guides/create-uufinds-spreadsheet/", label: "Save candidates in a spreadsheet", description: "Keep the original image lead beside the recovered source and QC notes." },
    ],
  },
  "uufinds-app-iphone-guide": {
    ...revised,
    seoTitle: "UUFinds iPhone App: Links & QC Search",
    relatedLinks: [
      { href: "/guides/uufinds-image-search-guide/", label: "Search from a photo", description: "Prepare a useful image and verify returned candidates." },
      { href: "/guides/create-uufinds-spreadsheet/", label: "Create a lasting research record", description: "Store source links, evidence and manual review dates." },
      { href: "/guides/uufinds-qc-checklist/", label: "Review the QC evidence", description: "Match the option before judging visible details." },
    ],
  },
};
