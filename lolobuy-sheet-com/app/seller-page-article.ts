import type { Article } from "./site-data";

export const sellerPageArticle: Article = {
  slug: "lolobuy-seller-page-checklist",
  title: "LoloBuy Seller-Page Checklist: What to Verify Before Saving a Product Find",
  shortTitle: "LoloBuy seller-page checklist",
  description: "Use a dated seller-page checklist to verify listing identity, exact variants, current price fields, seller claims and evidence gaps before saving a LoloBuy product find.",
  eyebrow: "SELLER-PAGE VERIFICATION",
  published: "2026-08-28",
  updated: "2026-08-28",
  readingTime: "12 min read",
  factCheckLine: "Fact-checked August 28, 2026 against LoloBuy's current public product-link search, supported marketplace cues and warehouse workflow; seller-page scoring is independent editorial analysis.",
  visual: {
    eyebrow: "THE SAVE GATE",
    title: "Save the offer only when another person can reconstruct it.",
    caption: "A seller page earns a spreadsheet row through identifiable options, dated evidence and explicit unknowns—not through an attractive cover image.",
    items: [
      { label: "Identity", text: "Marketplace, seller, live item and final source URL." },
      { label: "Offer", text: "Exact option, quantity, selected price and delivery fields." },
      { label: "Evidence", text: "Charts, option text, conditions and decision gaps." },
      { label: "Handoff", text: "The order and warehouse checks required later." },
    ],
  },
  sources: [
    { label: "LoloBuy public website — checked August 28, 2026", note: "Primary source for LoloBuy's current product-link or product-name search, visible Taobao, Weidian and 1688 marketplace cues, image-search control, link-ordering description, warehouse inspection and photographs. It does not verify an individual seller or listing." },
    { label: "Lolobuy Sheet seller-page evidence framework", note: "The reconstruction test, evidence labels, question queue and save/archive rules are independent editorial methods for spreadsheet users." },
  ],
  intro: [
    "A seller page belongs in a LoloBuy spreadsheet only when a second reader can reconstruct the offer you evaluated. The final source URL, marketplace, seller identity, selected option, quantity, live price fields, evidence date and unresolved questions should point to one purchase—not to a vague product family. If the row cannot answer what would actually be ordered, it is not ready to save.",
    "LoloBuy's current public homepage accepts a product link or product name and visibly identifies Taobao, Weidian and 1688 beside its search control. It also describes warehouse inspection and photographs after purchase. Those facts support a source-to-order-to-warehouse workflow; they do not certify the seller page. This checklist sits before the existing marketplace guides: it decides whether any seller page has enough evidence to enter the shortlist at all.",
  ],
  sections: [
    { heading: "Begin with a reconstruction test", paragraphs: [
      "Imagine the seller changes the listing tomorrow. Could another editor identify the marketplace, shop, item, chosen option, quantity and price you saw from the saved row alone? If not, collect the missing evidence before saving. A screenshot of the first image is weak because the same image can appear across sellers, variants and replacement listings. The final product URL plus a written option record is the minimum useful anchor.",
      "Write the buying requirement before judging the page: item type, intended use, required dimensions or feature, acceptable alternatives and maximum item budget. The seller page qualifies against that brief. Without it, a polished store or low headline price can quietly change what the spreadsheet is supposed to find.",
    ] },
    { heading: "Confirm page identity before reading seller signals", paragraphs: [
      "Open the source in a clean session and let shared or shortened links resolve. Confirm that the final page is a live product offer rather than a search result, shop home, campaign page, login loop or expired share link. Record the marketplace, final URL, visible seller or shop name, item title and check date. If region or account restrictions prevent a reliable view, label the source incomplete instead of filling it from a copied card.",
      "Treat a replacement link as a new candidate. Similar photographs do not preserve the seller, SKU definitions, stock, price, dispatch conditions or after-sales terms. Never repair a dead row by silently dropping in a lookalike. Archive the old address with its last verified date, then run the full checklist on the replacement.",
    ] },
    { heading: "Read shop information as context, not a quality guarantee", paragraphs: [
      "Record seller facts that the current page actually exposes, such as the shop name, visible operating history, category focus, transaction indicators or marketplace badges. Preserve the label and date rather than translating it into a universal reliability score. A badge can describe an account or marketplace program; it cannot prove the exact item will match the listing, arrive undamaged or satisfy your expectations.",
      "Look for internal consistency. Does the shop identity remain the same between the product page and shop surface? Are product category, option names and seller notes coherent, or does the page combine unrelated goods under one title? Inconsistency creates a question, not an automatic fraud verdict. Save the observable conflict and decide whether clarification could resolve it.",
    ] },
    { heading: "Build the exact offer sentence", paragraphs: [
      "Open every selector and write quantity, colour, labelled size, model or batch, bundle, included pieces and packaging choice in one sentence. Copy seller codes and original option wording beside the readable note. The sentence must identify one selectable combination. Phrases such as “black one” or “same as photo” fail when the page contains several black styles or images shared across variants.",
      "Observe what changes after selection: image, price, stock message, minimum quantity, dispatch wording or included accessories. Save the selected state, not only the default page. If options cannot be combined, the required variant is unavailable, or a decisive field remains ambiguous, mark the candidate pending instead of choosing the nearest-looking option.",
    ], bullets: ["Final source URL and seller identity", "Exact SKU sentence and original option codes", "Quantity, stock or preorder state shown now", "Selected price and seller-to-warehouse delivery", "One dated view of decision-changing evidence"] },
    { heading: "Separate seller evidence from seller claims", paragraphs: [
      "Classify each statement. A visible dimension chart, selected option label, component list or dispatch note is listing evidence. Material descriptions, quality adjectives, performance promises and authenticity claims remain seller assertions unless supported by appropriate independent evidence. Customer images can suggest useful inspection questions, but they may describe another date, variant or batch and should not be merged into the current offer.",
      "Use the narrowest defensible wording in the spreadsheet. Write “seller states cotton blend” rather than “cotton,” or “chart lists 72 cm length” rather than “fits tall buyers.” This preserves what the page claims without converting it into a fact the directory cannot verify. If a claim is essential to the purchase and cannot be tested later, treat that as residual risk rather than reassurance.",
    ] },
    { heading: "Capture current cost fields without promising a delivered total", paragraphs: [
      "Record the price after selecting the intended option and quantity. A headline range can belong to an accessory, deposit, smaller size, sample or different bundle. Add any seller-to-warehouse delivery shown for the order and label the currency. Do not copy the lowest number into the spreadsheet when the chosen SKU produces another amount.",
      "Keep product cost, China-side delivery, payment or service charges and later international shipping separate. LoloBuy's public workflow shows purchasing, warehouse and global-shipping stages, but it does not make the seller-page price a landed-cost quote. A seller-page checklist should show whether the offer is internally clear, not predict a route, tax result or parcel price that is not yet known.",
    ] },
    { heading: "Turn missing facts into a short question queue", paragraphs: [
      "Ask only questions that could change the decision: which pieces are included, whether variants can be mixed, which measurement endpoints the chart uses, whether the item is ready stock, or whether customization changes dispatch or return conditions. Name the listing, exact option and intended quantity. “Is it good?” cannot be audited and encourages an answer without a shared standard.",
      "Store the question, reply, date and source. Seller replies remain seller-supplied evidence and may expire with stock or production changes. If the response changes the offer, add a new dated value rather than overwriting the original record. When the question remains unanswered and affects a non-negotiable requirement, reject or defer the candidate.",
    ] },
    { heading: "Plan the order and warehouse handoff before saving", paragraphs: [
      "A strong find anticipates the next two records. Write what must survive when the URL is pasted into LoloBuy: product identity, option codes, colour, size, bundle, quantity, selected amount and domestic delivery. Then name the warehouse evidence that would confirm the arrival, such as a size label, included part, printed number, defined measurement or visible damage check.",
      "LoloBuy currently describes warehouse inspection and photographs, but its homepage does not establish a universal photo count, measurement service, extra-image fee or remedy. Phrase later checks around visible, decision-changing facts and verify the live service attached to the order. If the product cannot be inspected for its essential requirement, make that limitation visible before payment.",
    ] },
    { heading: "Score completeness, then save, hold or archive", paragraphs: [
      "Use three outcomes. Save when identity, exact offer, current cost fields and decisive evidence are complete. Hold when one answer or refreshed field could qualify the page. Archive when the source is dead, the required option is unavailable, the offer cannot be reconstructed or the evidence gap is fundamental. Do not publish a numerical seller score that implies precision the marketplace data cannot support.",
      "Keep status, checked date, next-review date and archive reason in the spreadsheet. This article does not repeat the Weidian link guide, Taobao option matrix or 1688 quantity workflow: those pages explain marketplace-specific ordering after a candidate qualifies. The seller-page checklist is the earlier gate that prevents an attractive but untraceable page from entering the collection.",
    ] },
  ],
};
