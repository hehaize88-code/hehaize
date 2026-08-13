import { categoryRoutes, productRoutes, type CatalogRoute } from "./site-products";

export type Locale = "en" | "de" | "fr" | "es" | "it" | "pl";

export type StaticRouteKey =
  | "home"
  | "finds"
  | "categories"
  | "how-to-buy"
  | "guides"
  | "faq"
  | "articles"
  | "guides/how-to-use-kameymall-spreadsheet"
  | "guides/cny-price-vs-final-cost"
  | "guides/what-to-inspect-before-ordering"
  | "articles/kameymall-spreadsheet-guide-2026"
  | "articles/how-to-buy-from-kameymall-2026"
  | "articles/kameymall-shipping-cost-guide-2026"
  | "articles/how-to-read-kameymall-qc-photos"
  | "articles/kameymall-warehouse-storage-returns-guide"
  | "articles/kameymall-payment-methods-fees"
  | "articles/kameymall-order-status-guide"
  | "articles/kameymall-consolidation-vs-split-parcels";

export type RouteKey = StaticRouteKey | CatalogRoute;

export const staticRoutes: StaticRouteKey[] = [
  "home",
  "finds",
  "categories",
  "how-to-buy",
  "guides",
  "faq",
  "articles",
  "guides/how-to-use-kameymall-spreadsheet",
  "guides/cny-price-vs-final-cost",
  "guides/what-to-inspect-before-ordering",
  "articles/kameymall-spreadsheet-guide-2026",
  "articles/how-to-buy-from-kameymall-2026",
  "articles/kameymall-shipping-cost-guide-2026",
  "articles/how-to-read-kameymall-qc-photos",
  "articles/kameymall-warehouse-storage-returns-guide",
  "articles/kameymall-payment-methods-fees",
  "articles/kameymall-order-status-guide",
  "articles/kameymall-consolidation-vs-split-parcels",
];

export const supportedRoutes: RouteKey[] = [
  ...staticRoutes,
  ...categoryRoutes,
  ...productRoutes,
];

export function isRouteKey(value: string): value is RouteKey {
  return supportedRoutes.includes(value as RouteKey);
}

export function isStaticRouteKey(value: string): value is StaticRouteKey {
  return staticRoutes.includes(value as StaticRouteKey);
}

export const languages: Array<{ code: Locale; short: string; label: string }> = [
  { code: "en", short: "EN", label: "English" },
  { code: "de", short: "DE", label: "Deutsch" },
  { code: "fr", short: "FR", label: "Français" },
  { code: "es", short: "ES", label: "Español" },
  { code: "it", short: "IT", label: "Italiano" },
  { code: "pl", short: "PL", label: "Polski" },
];

export function routeHref(locale: Locale, route: RouteKey): string {
  const prefix = locale === "en" ? "" : `/${locale}`;
  return route === "home" ? `${prefix || "/"}` : `${prefix}/${route}`;
}

type CategoryCopy = { label: string; description: string };
type StepCopy = { title: string; body: string };
type CardCopy = { label: string; title: string; body: string; action: string };
type FaqCopy = { question: string; answer: string };
type ProseSection = { heading: string; paragraphs: string[]; bullets?: string[] };

export type SiteCopy = {
  nav: { finds: string; categories: string; how: string; guides: string; articles: string; faq: string };
  language: string;
  home: {
    eyebrow: string;
    title: string;
    lede: string;
    searchPlaceholder: string;
    searchLabel: string;
    explore: string;
    howAction: string;
    categoriesCount: string;
    findsCount: string;
    direct: string;
    listingPages: string;
  };
  finder: {
    kicker: string;
    verified: string;
    filterPlaceholder: string;
    allCategories: string;
    allListed: string;
    clear: string;
    item: string;
    category: string;
    price: string;
    status: string;
    open: string;
    original: string;
    approximate: string;
    listed: string;
    noMatches: string;
    rateNote: string;
  };
  categories: {
    kicker: string;
    title: string;
    intro: string;
    open: string;
    items: Record<string, CategoryCopy>;
  };
  how: {
    kicker: string;
    title: string;
    intro: string;
    action: string;
    steps: StepCopy[];
  };
  guides: {
    kicker: string;
    title: string;
    intro: string;
    cards: CardCopy[];
  };
  faq: {
    kicker: string;
    title: string;
    intro: string;
    items: FaqCopy[];
  };
  articles: {
    kicker: string;
    title: string;
    intro: string;
    cards: CardCopy[];
    read: string;
  };
  pageIntros: Record<Exclude<StaticRouteKey, "home">, { kicker: string; title: string; intro: string }>;
  guidePages: Record<string, { title: string; label: string; intro: string; sections: ProseSection[] }>;
  articlePage: {
    label: string;
    title: string;
    intro: string;
    updated: string;
    readTime: string;
    sections: ProseSection[];
    conclusionTitle: string;
    conclusion: string;
    sourceNote?: string;
    primaryKeyword?: string;
    seoTitle?: string;
    seoDescription?: string;
  };
  common: {
    home: string;
    backToGuides: string;
    backToArticles: string;
    openProducts: string;
    verifyNote: string;
  };
  footer: { notice: string; copyright: string };
};

const english: SiteCopy = {
  nav: { finds: "Finds", categories: "Categories", how: "How to Buy", guides: "Guides", articles: "SEO Articles", faq: "FAQ" },
  language: "Language",
  home: {
    eyebrow: "Independent KameyMall shopping guide · Updated Aug 2026",
    title: "KameyMall Spreadsheet 2026: 30 Curated Product Finds",
    lede: "Browse 30 curated KameyMall spreadsheet finds across shoes, hoodies, jerseys and accessories. Compare prices, use QC guidance and open exact product pages.",
    searchPlaceholder: "Search 30 curated China finds",
    searchLabel: "Search the main product database",
    explore: "Explore featured finds",
    howAction: "How it works",
    categoriesCount: "categories",
    findsCount: "product finds",
    direct: "Direct",
    listingPages: "listing pages",
  },
  finder: {
    kicker: "Live find database",
    verified: "30 verified listings",
    filterPlaceholder: "Search displayed items...",
    allCategories: "All categories",
    allListed: "All listed",
    clear: "Clear",
    item: "Item",
    category: "Category",
    price: "USD price",
    status: "Status",
    open: "Open",
    original: "Original listing",
    approximate: "approx.",
    listed: "Listed",
    noMatches: "No featured finds match those filters.",
    rateNote: "Approximate USD values use ¥1 = $0.1481 on Aug 1, 2026. Confirm the current price on the destination listing.",
  },
  categories: {
    kicker: "Browse the sheet",
    title: "Every find, in the right category",
    intro: "Every category link below has been checked against the matching destination collection, so you do not land on a generic or unrelated page.",
    open: "Open category",
    items: {
      shoes: { label: "Shoes", description: "Sneakers, runners, slides and everyday footwear." },
      sweatshirts: { label: "Sweatshirts", description: "Hoodies, pullovers, knits and layered essentials." },
      tshirts: { label: "T-Shirts", description: "Short sleeves, long sleeves and graphic tees." },
      jackets: { label: "Jackets", description: "Outerwear, windbreakers, puffers and coats." },
      pants: { label: "Pants & Shorts", description: "Denim, cargos, sweatpants and summer shorts." },
      headwear: { label: "Headwear", description: "Caps, beanies, knitted hats and seasonal styles." },
      accessories: { label: "Accessories", description: "Bags, wallets, belts, scarves and small goods." },
      jersey: { label: "Jersey", description: "Club, national-team and player-version jerseys." },
      electronics: { label: "Electronics", description: "Watches, headphones, speakers and tech finds." },
      other: { label: "Other Finds", description: "Home items, toys, gifts and uncategorized picks." },
    },
  },
  how: {
    kicker: "How to buy",
    title: "How the agent-shopping process works",
    intro: "This six-stage workflow follows KameyMall’s published shopping instructions. Treat timeframes and availability as platform information to verify at the time of your order.",
    action: "Browse all product finds",
    steps: [
      { title: "Find or paste the product", body: "KameyMall’s published tutorial says shoppers can paste a product URL or search by product name. Confirm that the parsed title, seller, options and photos belong to the item you intended to open." },
      { title: "Submit the order details", body: "Select color, size and quantity when the listing is captured correctly. If an automatic listing cannot be read, the official flow provides a manual agent-order form instead." },
      { title: "Pay the item-stage charges", body: "The official tutorial separates the product order from the later parcel order. At this stage the shopper pays for the item and Chinese domestic delivery; international freight is handled after warehousing." },
      { title: "Wait for agent purchase and seller delivery", body: "The shopping agent contacts the seller and places the order. KameyMall’s public FAQ says normal seller dispatch is commonly 1–7 days, while presale items may take longer." },
      { title: "Review inspection photos and storage", body: "After arrival, the service says it performs an inspection, photographs the item and stores it. Compare the ordered color, size, quantity and visible condition before building a parcel." },
      { title: "Submit the international parcel", body: "Select stored items, enter the destination, compare eligible routes and choose any packaging or insurance options. Some products are restricted from particular delivery lines, so use the live route list." },
    ],
  },
  guides: {
    kicker: "Practical guides",
    title: "Shop with better information",
    intro: "Short, honest guidance for reading listings, estimating cost and avoiding preventable ordering mistakes.",
    cards: [
      { label: "Start here", title: "How to use a KameyMall spreadsheet", body: "Use the sheet to shortlist products, then verify the exact listing, option, seller price and product notes before placing an agent order.", action: "Read the buying flow" },
      { label: "Cost planning", title: "CNY price vs. final delivered cost", body: "Separate the item price and Chinese domestic delivery from warehouse-stage packaging and international freight.", action: "See the full cost guide" },
      { label: "Warehouse check", title: "QC photos, storage and returns", body: "Use inspection photos quickly: KameyMall’s public FAQ lists 90 free storage days but says returns are not supported after an item has remained in the warehouse for more than five days.", action: "See the warehouse checklist" },
    ],
  },
  faq: {
    kicker: "FAQ",
    title: "Clear answers before you click “buy”",
    intro: "This guide helps you discover products. The destination listing is always the source of truth for the live price and available options.",
    items: [
      { question: "What is a KameyMall sheet?", answer: "A KameyMall sheet is an independent product-discovery index that organizes China shopping finds into searchable categories. It helps you compare basic listing information before opening the corresponding product page." },
      { question: "Is this the official KameyMall website?", answer: "No. KameyMall Sheet is an independent product-discovery and research guide. It does not sell products, accept payments, operate a warehouse or provide international delivery." },
      { question: "How does KameyMall’s published purchase flow begin?", answer: "Its official tutorial says a shopper can paste a product URL or search by product name, choose the available options, submit the order and pay for the item plus Chinese domestic delivery." },
      { question: "Which source marketplaces does the published tutorial mention?", answer: "The current tutorial names Taobao, Tmall and JD.com. KameyMall’s shopping-agent overview also mentions Weidian and 1688. Listing capture can vary, so check the imported information before paying." },
      { question: "What payment methods does KameyMall publicly list?", answer: "Its shopping-agent page names international credit cards including Visa and Mastercard, PayPal and Alipay. Its detailed tutorial also lists WeChat, Chinese debit cards and bank telegraphic transfer. The live checkout determines what is available for a particular account and country." },
      { question: "Are the prices on this sheet final delivered prices?", answer: "No. Featured USD prices are approximate conversions of the listed CNY item amount. Seller-price changes, Chinese domestic delivery, payment or service charges, packaging, international freight, tax and customs outcomes can change the total." },
      { question: "What happens when an item reaches the warehouse?", answer: "KameyMall’s published flow says the item is inspected, photographed and stored. Review the photos against the ordered color, size, quantity and visible condition before submitting an international parcel." },
      { question: "How long does KameyMall say items can be stored?", answer: "A public KameyMall FAQ states that orders have a 180-day storage period, with up to 90 days free. It also lists an Extended Storage service at RMB 10 per month. Confirm the current countdown and fee in your account." },
      { question: "Can every stored item be returned?", answer: "No. KameyMall’s FAQ lists non-returnable categories and says the final result can depend on the seller. It also says returns are not supported after an item has been in the warehouse for more than five days, so inspect promptly." },
      { question: "Can every product use every international route?", answer: "No. The official parcel instructions say some products are restricted from certain delivery types. Route availability, packaging choices, chargeable weight and destination should be checked when the parcel is submitted." },
      { question: "Do product and category buttons on this site lead elsewhere?", answer: "Product, category and search actions lead only to the matching pages on the selected destination database. Navigation, guides, articles and FAQ links remain inside KameyMall Sheet." },
    ],
  },
  articles: {
    kicker: "Reverse-shopping SEO library",
    title: "Research-led KameyMall articles",
    intro: "Five original guides for overseas shoppers researching product finds, listing checks, QC, warehouse decisions, returns and cross-border cost planning.",
    read: "Read article",
    cards: [
      { label: "2026 guide", title: "KameyMall Spreadsheet Guide for Overseas Shoppers", body: "A complete workflow for turning a spreadsheet find into a carefully checked cross-border order without treating the first price as the final cost.", action: "Read the full article" },
      { label: "Buying method", title: "How to Buy Through KameyMall in 2026", body: "A fact-checked walkthrough of product links, agent ordering, payment, seller dispatch, QC photos, storage and parcel submission.", action: "Read the buying guide" },
      { label: "Cost planning", title: "KameyMall Shipping Cost Guide 2026", body: "A practical breakdown of CNY item price, Chinese domestic delivery, warehouse measurements, packaging and international freight.", action: "Read the shipping guide" },
    ],
  },
  pageIntros: {
    finds: { kicker: "30-product spreadsheet", title: "KameyMall Spreadsheet Finds: 30 Curated Products", intro: "Filter 30 distinct product entries across 10 categories, compare dated CNY and approximate USD prices, then open the exact product detail or live destination listing." },
    categories: { kicker: "Direct collections", title: "Browse every category without a 404", intro: "These destination links have been checked individually, including the corrected Sweatshirts collection." },
    "how-to-buy": { kicker: "Shopping workflow", title: "How to Buy Through KameyMall: Six Agent Stages", intro: "A source-based path from product link and first payment to seller delivery, QC photos, storage and international parcel submission." },
    guides: { kicker: "Guide library", title: "KameyMall Guides for Listings, QC and Shipping", intro: "Three independent guides turn published platform information into practical checks for listings, costs, warehouse photos, storage and delivery." },
    faq: { kicker: "Frequently asked questions", title: "KameyMall FAQ: Orders, QC, Storage and Shipping", intro: "Fact-checked answers separate this independent sheet from the platform’s published purchase, payment, warehouse, return and parcel information." },
    articles: { kicker: "Independent guide library", title: "KameyMall Guides for QC, Shipping, Storage and Returns", intro: "Five source-checked 2026 articles cover spreadsheet finds, the agent-shopping workflow, shipping costs, QC photos, warehouse storage and returns." },
    "guides/how-to-use-kameymall-spreadsheet": { kicker: "Start here", title: "How to use a KameyMall spreadsheet", intro: "A step-by-step method for searching, comparing and validating a find before moving forward." },
    "guides/cny-price-vs-final-cost": { kicker: "Price check", title: "CNY product price vs. final delivered cost", intro: "Separate the number shown on a product card from the complete cost of a cross-border order." },
    "guides/what-to-inspect-before-ordering": { kicker: "Warehouse check", title: "QC Photos, Storage and Returns", intro: "A fact-checked checklist for visible inspection, the published storage period, return timing, packaging and route restrictions." },
    "articles/kameymall-spreadsheet-guide-2026": { kicker: "2026 reverse-shopping guide", title: "KameyMall Spreadsheet Guide for Overseas Shoppers", intro: "A research-led framework for discovering China products, checking listings and planning the full order rather than only the item price." },
    "articles/how-to-buy-from-kameymall-2026": { kicker: "Fact-checked buying guide", title: "How to Buy Through KameyMall in 2026", intro: "The published agent-shopping workflow, from pasting a product link to QC, storage and international parcel submission." },
    "articles/kameymall-shipping-cost-guide-2026": { kicker: "Cross-border cost guide", title: "KameyMall Shipping Cost Guide 2026", intro: "How to separate the CNY item price from domestic delivery, warehouse-stage choices and international freight." },
    "articles/how-to-read-kameymall-qc-photos": { kicker: "Warehouse inspection guide", title: "How to Read KameyMall QC Photos Before Shipping", intro: "A source-checked method for comparing warehouse photos with the ordered variant, spotting visible problems and acting before the return opportunity closes." },
    "articles/kameymall-warehouse-storage-returns-guide": { kicker: "Storage and returns guide", title: "KameyMall Warehouse Storage and Returns Guide", intro: "A source-checked timeline for QC review, return decisions, free storage, extended storage and parcel preparation." },
  },
  guidePages: {
    "guides/how-to-use-kameymall-spreadsheet": {
      label: "Start here",
      title: "How to use a KameyMall spreadsheet",
      intro: "Use the sheet to reach a relevant listing, then follow the published agent-shopping stages. Fact-checked against KameyMall’s public tutorial on August 3, 2026.",
      sections: [
        { heading: "1. Shortlist, then verify the exact listing", paragraphs: ["Search by a specific item name or browse the relevant category. The sheet is an index, so open the exact product page and confirm the live CNY price, seller images, variant names, size information and quantity rules.", "KameyMall’s tutorial says shoppers can paste a product URL or search by name. If a listing is not captured correctly, the published process provides a manual agent-order form. Never replace missing product information with a guess."] },
        { heading: "2. Keep the first payment separate", paragraphs: ["The official tutorial says the item-stage payment covers the product and Chinese domestic delivery. International freight is paid later, after the article reaches the warehouse and a parcel is created.", "Record the selected variant, CNY price and all visible checkout lines. An approximate USD conversion helps comparison but does not lock the seller price, exchange rate or later shipping cost."] },
        { heading: "3. Use warehouse photos as a decision point", paragraphs: ["After arrival, the published flow says the item is inspected, photographed and stored. Compare visible color, quantity, size label, condition and included accessories with the order record.", "KameyMall’s FAQ says returns are not supported after an item has remained in the warehouse for more than five days, and some categories cannot be returned. Review QC photos promptly rather than waiting until parcel submission."] },
        { heading: "4. Build the parcel with measured data", paragraphs: ["KameyMall’s public FAQ lists 180 days of total storage and up to 90 free days, but the live account countdown is the current source. Consolidate only items that are ready and sensible to ship together.", "Choose an eligible route using warehouse weight, dimensions, product restrictions and packaging needs. The parcel instructions mention packaging removal, reinforcement and insurance; each choice can change protection and chargeable weight."] },
      ],
    },
    "guides/cny-price-vs-final-cost": {
      label: "Price check",
      title: "CNY product price vs. final delivered cost",
      intro: "A converted product price is useful for comparison, but KameyMall’s published workflow places it at the beginning—not the end—of a cross-border budget.",
      sections: [
        { heading: "What the card price represents", paragraphs: ["The displayed USD figure is a transparent mathematical conversion of the listed CNY product amount. It helps overseas shoppers compare products in a familiar currency.", "It is not a quote and does not lock the exchange rate or seller price. Always reopen the destination listing before paying."] },
        { heading: "Costs that can appear before warehousing", paragraphs: ["Domestic delivery from the seller to the warehouse, service charges and payment conversion may be added during the order stage. The exact structure depends on the service used for the purchase.", "A promotion can lower one line without changing the others, so compare the complete checkout rather than one advertised discount."] },
        { heading: "Costs that depend on the parcel", paragraphs: ["International freight depends on destination, route, actual or volumetric weight, packaging and product restrictions. The final parcel data is usually more reliable than an early estimate.", "Removing unnecessary packaging may reduce size, while protective packaging may increase chargeable weight. Choose based on the product’s fragility and value."] },
        { heading: "A better comparison method", paragraphs: ["Keep three numbers separate: product price, pre-shipment subtotal and final delivered estimate. This prevents a cheap-looking item from hiding an expensive shipping profile.", "Compare the same route assumptions across products or services. Mixing different destinations, package weights or delivery speeds produces misleading results."] },
      ],
    },
    "guides/what-to-inspect-before-ordering": {
      label: "Verification",
      title: "QC photos, storage and returns",
      intro: "Use the warehouse stage quickly and deliberately. The current guide is based on KameyMall’s public inspection, storage and return information reviewed August 3, 2026.",
      sections: [
        { heading: "What QC photos can and cannot show", paragraphs: ["Use the photos to verify visible color, quantity, size label, obvious damage and included accessories. Compare them with the exact order record, not only with the seller’s main promotional image.", "QC photos cannot establish authenticity, hidden materials, long-term durability or exact fit. Ask for clarification when a decision depends on a detail that is not visible."] },
        { heading: "Act within the available return window", paragraphs: ["KameyMall’s public FAQ lists products that may not be returned, says the result can depend on the seller and states that returns are not supported after more than five days in the warehouse.", "Inspect promptly. When reporting a problem, identify the precise mismatch and attach the source listing or selected-option evidence. A general statement that the item looks bad is less useful than a measurable discrepancy."] },
        { heading: "Understand storage without delaying inspection", paragraphs: ["The same public FAQ states that orders have a 180-day storage period, with up to 90 days free, and lists extended storage at RMB 10 per month. Confirm the current countdown and fee inside the account.", "Storage time and return time are different. A product can still have free storage remaining after the practical return opportunity has closed."] },
        { heading: "Prepare the correct parcel", paragraphs: ["Use measured weight and dimensions to update the freight estimate. Check whether the product is restricted from particular routes before combining it with other stored items.", "Balance package removal against protection. KameyMall’s FAQ warns that damage under simple packaging is not covered by insurance, so choose packaging according to the value and fragility of the item."] },
      ],
    },
  },
  articlePage: {
    label: "2026 reverse-shopping guide",
    title: "KameyMall Spreadsheet Guide for Overseas Shoppers",
    intro: "How to use a product sheet as a research tool, validate the live listing, understand warehouse handling and plan an international order with fewer surprises.",
    updated: "Updated August 2026",
    readTime: "14 minute read",
    sourceNote: "Fact-check basis: KameyMall’s public Shopping Agent Service page, How to Purchase tutorial and FAQ were reviewed on August 3, 2026. Platform statements are described as published policies or targets, not independent guarantees.",
    primaryKeyword: "kameymall spreadsheet",
    seoTitle: "KameyMall Spreadsheet Guide 2026: Finds, QC & Shipping",
    seoDescription: "Use a KameyMall spreadsheet safely: find products, verify live listings, review QC photos, plan warehouse storage and estimate international shipping.",
    sections: [
      { heading: "Why a spreadsheet is useful—but not the final answer", paragraphs: ["Overseas shoppers often discover Chinese products through social posts, screenshots or short product names that are difficult to search on a marketplace. A focused spreadsheet reduces that friction by grouping finds into recognizable categories and attaching a direct destination link. It is faster than opening dozens of unrelated search results, especially when you are comparing shoes, jerseys, sweatshirts, accessories or electronics.", "The sheet should still be treated as an index. A product card can tell you which listing to inspect and provide a reference price, but it cannot guarantee that the seller has kept the same stock, variants or price. The reliable workflow therefore has two layers: discover and shortlist on the sheet, then verify on the live destination page." ] },
      { heading: "Start with a search that reflects what you actually want", paragraphs: ["A vague keyword produces a broad mix of styles and price levels. Before searching, define the item type, important design detail, intended use and any non-negotiable requirement such as size, color or compatibility. Search a specific model name when you know it, or begin with a category when you want to compare alternatives.", "The KameyMall Sheet search sends the entered keyword to the main product database’s real results page. That matters because a search button should not send every query to a generic all-products page. If you search Nike, the destination should display Nike-related results; if you search a product model, the query must remain visible in the destination URL and results heading." ] },
      { heading: "Use categories to reduce false matches", paragraphs: ["Category browsing is valuable when product names are inconsistent or translated differently. The same sweatshirt may be described as a hoodie, pullover, sweater or long-sleeve top. A dedicated collection narrows the dataset before you compare individual items.", "Every category link also needs to be checked. A label is not enough if its URL returns a 404. In this site, the correct Sweatshirts destination is the Hoodies and Sweaters collection, while shoes, T-shirts, jackets, pants and shorts, headwear, accessories, jerseys, electronics and other finds each use their own working destination route." ] },
      { heading: "Read the product card as a shortlist, not a promise", paragraphs: ["A useful card includes the product name, category, source currency, approximate conversion, reference number, image and exact detail link. These details make comparisons faster and help you return to the same item later.", "The USD value is intentionally marked approximate. Currency rates move, and the listed CNY amount can change. More importantly, the product price usually excludes domestic shipping, service charges, payment conversion, packaging and international freight. A $30 converted product is not automatically a $30 delivered order." ] },
      { heading: "Verify the live listing before paying", paragraphs: ["Open the destination page and confirm the current seller price, images, available variants and product notes. For clothing, read the measurement chart and compare it with a garment that fits; familiar letters such as M or L do not guarantee familiar dimensions. For electronics, confirm model, included accessories, plug or compatibility details, and any battery-related shipping limits.", "Look for differences between the main photo and the selected option. Some listings use a premium version in the gallery while the lowest price belongs to a different variant. If the information is incomplete, pause. Asking a question before payment is cheaper than correcting a wrong order after domestic shipping." ] },
      { heading: "Understand what happens between purchase and international shipping", paragraphs: ["A shopping-agent workflow generally separates the product order from the international parcel. The item is first purchased from the seller and sent domestically to a warehouse. After arrival, the warehouse records the item, provides inspection information and prepares it for a later international shipment.", "This separation creates a useful control point. Compare warehouse photos with the ordered color, size and quantity. Review visible condition and packaging while a return or exchange may still be possible. Then use the measured weight and dimensions to replace rough shipping assumptions with a better estimate." ] },
      { heading: "Build the budget in layers", paragraphs: ["Keep a simple cost table with the listed product price, domestic delivery, service or payment costs, optional inspection or packaging choices, and international freight. Do not combine them into one early number until each line is understood. This makes it easier to compare two products that have different sizes or shipping profiles.", "International freight may be calculated from actual weight or volumetric weight. A light but bulky shoe box can cost more than its scale weight suggests. Consolidation can reduce repeated parcel charges, but adding more items also changes the total weight and customs value. The best choice depends on destination, route availability, delivery speed and risk tolerance—not only the lowest advertised rate." ] },
      { heading: "Use inspection and delivery decisions as part of product quality", paragraphs: ["Quality control is not only about whether the item looks good in a product photo. It includes receiving the correct variant, identifying visible defects, protecting the item during transit and selecting a route that accepts the product type. A fragile item may justify stronger packaging; a bulky item may benefit from removing unnecessary retail packaging.", "Before submitting the parcel, verify the address, declared contents, route restrictions, insurance options and estimated delivery window. Keep screenshots or order references for the listing and inspection record. These small habits make support conversations clearer if something changes." ] },
      { heading: "A repeatable checklist for every find", paragraphs: ["The strongest spreadsheet workflow is repeatable: define the product intent, search or browse a category, shortlist comparable listings, open the exact detail page, verify live price and variants, calculate costs in layers, check warehouse inspection information, then choose delivery with the actual parcel data.", "This method does not remove every cross-border shopping risk, but it prevents the most avoidable mistakes: broken links, wrong variants, unrealistic price expectations and shipping decisions made without weight or restriction data. A good KameyMall spreadsheet is therefore most valuable when it helps you ask better questions before you pay.", "Keep the evidence attached to the decision. Save the product URL and selected option, record the price visible when the order was submitted, and retain the warehouse inspection and parcel measurements. If a seller changes the listing or a route estimate moves, those records make it easier to identify what changed. They also keep a review article honest: a personal delivery time or freight price can be reported as one dated experience, but it should never be presented as the permanent result every shopper will receive." ], bullets: ["Use a specific keyword or the matching category.", "Confirm the exact destination link and reference number.", "Check live price, variant, size and product notes.", "Separate product price from the complete delivered cost.", "Review warehouse photos, weight and dimensions.", "Compare route restrictions, protection and delivery time before shipment."] },
    ],
    conclusionTitle: "The practical takeaway",
    conclusion: "Use KameyMall Sheet to discover and organize options, then treat the live product page and warehouse record as the sources that complete the decision before choosing what to do next. Careful verification is more valuable than a long list of unchecked links.",
  },
  common: {
    home: "Home",
    backToGuides: "Back to all guides",
    backToArticles: "Back to SEO articles",
    openProducts: "Search the complete product database",
    verifyNote: "Always confirm live price, variants and shipping eligibility on the destination page before ordering.",
  },
  footer: {
    notice: "An independent product-discovery guide. We do not sell products, process payments or provide shipping services. Product information can change after publication; verify it on the destination page.",
    copyright: "© 2026 KameyMall Sheet. Independent shopping guide.",
  },
};

function cloneEnglish(): SiteCopy {
  return structuredClone(english);
}

const german = cloneEnglish();
german.nav = { finds: "Fundstücke", categories: "Kategorien", how: "So kaufst du", guides: "Ratgeber", articles: "SEO-Artikel", faq: "FAQ" };
german.language = "Sprache";
german.home = { eyebrow: "Unabhängiger KameyMall-Einkaufsratgeber · Aktualisiert Aug. 2026", title: "KameyMall-Tabelle 2026: 30 kuratierte Produktfunde", lede: "Entdecke 30 kuratierte KameyMall-Tabellenfunde aus Schuhen, Hoodies, Trikots und Accessoires. Vergleiche Preise, nutze den QC-Ratgeber und öffne die exakten Produktseiten.", searchPlaceholder: "30 kuratierte China-Fundstücke durchsuchen", searchLabel: "Haupt-Produktdatenbank durchsuchen", explore: "Empfohlene Fundstücke", howAction: "So funktioniert es", categoriesCount: "Kategorien", findsCount: "Produktfundstücke", direct: "Direkt", listingPages: "zu Produktseiten" };
german.finder = { kicker: "Live-Funddatenbank", verified: "30 geprüfte Angebote", filterPlaceholder: "Angezeigte Artikel filtern...", allCategories: "Alle Kategorien", allListed: "Alle gelistet", clear: "Löschen", item: "Artikel", category: "Kategorie", price: "Preis in USD", status: "Status", open: "Öffnen", original: "Originalangebot", approximate: "ca.", listed: "Gelistet", noMatches: "Keine empfohlenen Fundstücke entsprechen diesen Filtern.", rateNote: "Ungefähre USD-Werte mit ¥1 = $0,1481 am 1. Aug. 2026. Prüfe den aktuellen Preis auf der Zielseite." };
german.categories = { kicker: "Tabelle durchsuchen", title: "Jedes Fundstück in der richtigen Kategorie", intro: "Jeder Kategorienlink wurde mit der passenden Zielsammlung geprüft, damit du nicht auf einer allgemeinen, unpassenden oder fehlerhaften Seite landest.", open: "Kategorie öffnen", items: {
  shoes: { label: "Schuhe", description: "Sneaker, Laufschuhe, Slides und Alltagsschuhe." }, sweatshirts: { label: "Sweatshirts", description: "Hoodies, Pullover, Strick und Lagenlooks." }, tshirts: { label: "T-Shirts", description: "Kurzarm, Langarm und grafische Shirts." }, jackets: { label: "Jacken", description: "Windbreaker, Daunenjacken und Mäntel." }, pants: { label: "Hosen & Shorts", description: "Jeans, Cargos, Jogginghosen und Shorts." }, headwear: { label: "Kopfbedeckungen", description: "Caps, Mützen und saisonale Modelle." }, accessories: { label: "Accessoires", description: "Taschen, Geldbörsen, Gürtel und kleine Artikel." }, jersey: { label: "Trikots", description: "Vereins-, Nationalteam- und Spielerversionen." }, electronics: { label: "Elektronik", description: "Uhren, Kopfhörer, Lautsprecher und Technik." }, other: { label: "Weitere Fundstücke", description: "Wohnartikel, Spielzeug, Geschenke und Sonstiges." },
} };
german.how = { kicker: "So kaufst du", title: "Vom Fundstück zur geprüften Bestellung", intro: "Eine Tabelle ist nur der Ausgangspunkt. Prüfe das Live-Angebot auf der Zielseite, bevor du bestellst.", action: "Alle Produktfundstücke ansehen", steps: [
  { title: "Passendes Angebot finden", body: "Durchsuche die Datenbank oder eine Kategorie und wähle das Produkt, dessen Fotos und Beschreibung zu deinem Bedarf passen." }, { title: "Zielseite prüfen", body: "Bestätige aktuellen CNY-Preis, Verkäuferbilder, Varianten, Größen und Hinweise." }, { title: "Gesamtkosten prüfen", body: "Plane Service, Inlandsversand und internationalen Versand zusätzlich zum Produktpreis ein." }, { title: "Lagerinformationen kontrollieren", body: "Vergleiche nach Eingang Fotos, Farbe, Größe und Menge mit der Bestellung." }, { title: "Versand bewusst wählen", body: "Vergleiche Route, Laufzeit, Einschränkungen und abrechenbares Gewicht statt nur den niedrigsten Preis." },
] };
german.guides = { kicker: "Praktische Ratgeber", title: "Mit besseren Informationen einkaufen", intro: "Klare Hinweise zu Angeboten, Kosten und vermeidbaren Bestellfehlern.", cards: [
  { label: "Start", title: "Eine KameyMall-Tabelle verwenden", body: "Nach Kategorie filtern, CNY-Betrag vergleichen, exakte Produktseite öffnen und jedes Detail prüfen.", action: "Kaufablauf lesen" }, { label: "Preisprüfung", title: "CNY-Preis und Endkosten", body: "Warum der umgerechnete Produktpreis nützlich ist, aber Service und internationalen Versand nicht enthält.", action: "Kostenratgeber öffnen" }, { label: "Prüfung", title: "Was vor der Bestellung zu prüfen ist", body: "Fotos, Varianten, Größenhinweise und Live-Preis kontrollieren; bei Lücken zuerst nachfragen.", action: "Prüftipps öffnen" },
] };
german.faq = { kicker: "FAQ", title: "Klare Antworten vor dem Kauf", intro: "Dieser Ratgeber hilft bei der Produktsuche. Für Live-Preis und verfügbare Optionen zählt immer die Zielseite.", items: [
  { question: "Was ist eine KameyMall-Tabelle?", answer: "Ein unabhängiger Produktindex, der China-Fundstücke in durchsuchbaren Kategorien ordnet und vor dem Öffnen der passenden Produktseite einen Vergleich ermöglicht." }, { question: "Werden Preise in US-Dollar angezeigt?", answer: "Ja, als ungefähre Umrechnung des CNY-Betrags. Wechselkurs und Verkäuferpreis können sich ändern." }, { question: "Öffnen Produkt- und Kategorienbuttons die richtigen Seiten?", answer: "Ja. Bilder, Namen und Öffnen-Buttons führen zum passenden Produkt; Kategorien zur passenden Sammlung." }, { question: "Verkauft oder versendet diese Website Produkte?", answer: "Nein. KameyMall Sheet ist ein Informations- und Entdeckungsratgeber. Kauf, Prüfung, Lagerung und Versand erfolgen über den gewählten Zielservice." }, { question: "Wie prüfe ich ein Fundstück?", answer: "Öffne das Angebot und prüfe Preis, Varianten, Größe, Fotos, Gebühren und Versandoptionen vor der Zahlung." }, { question: "Warum sind die Endkosten höher?", answer: "Zum Artikelpreis können Inlandsversand, Service, Umrechnung, Verpackung und internationale Fracht kommen." },
] };
german.articles = { kicker: "SEO-Bibliothek für Reverse Shopping", title: "Recherchebasierte KameyMall-Artikel", intro: "Originale Ratgeber zu China-Fundstücken, Angebotsprüfung, Lagerkontrolle und grenzüberschreitender Kostenplanung.", read: "Artikel lesen", cards: [
  { label: "Ratgeber 2026", title: "KameyMall Spreadsheet Guide für Käufer im Ausland", body: "Ein vollständiger Ablauf vom Tabellenfundstück bis zur geprüften grenzüberschreitenden Bestellung.", action: "Vollständigen Artikel lesen" }, { label: "Kaufmethode", title: "KameyMall Sheet ohne übersehene Details nutzen", body: "Kategorien, Suche, Varianten und Prüfung der Zielseite verständlich erklärt.", action: "Praxisratgeber öffnen" }, { label: "Kostenplanung", title: "CNY-Preis, Lagergewicht und internationaler Versand", body: "Welche Werte früh vergleichbar sind und welche Kosten erst später feststehen.", action: "Kostenratgeber öffnen" },
] };

const french = cloneEnglish();
french.nav = { finds: "Sélections", categories: "Catégories", how: "Comment acheter", guides: "Guides", articles: "Articles SEO", faq: "FAQ" };
french.language = "Langue";
french.home = { eyebrow: "Guide d’achat KameyMall indépendant · Mis à jour en août 2026", title: "Tableur KameyMall 2026 : 30 produits sélectionnés", lede: "Parcourez 30 trouvailles KameyMall sélectionnées parmi chaussures, sweats, maillots et accessoires. Comparez les prix, utilisez le guide QC et ouvrez les fiches exactes.", searchPlaceholder: "Rechercher parmi 30 trouvailles sélectionnées", searchLabel: "Rechercher dans la base principale", explore: "Voir les sélections", howAction: "Fonctionnement", categoriesCount: "catégories", findsCount: "trouvailles", direct: "Direct", listingPages: "fiches produit" };
french.finder = { kicker: "Base de trouvailles en direct", verified: "30 fiches vérifiées", filterPlaceholder: "Filtrer les articles affichés...", allCategories: "Toutes les catégories", allListed: "Tous listés", clear: "Effacer", item: "Article", category: "Catégorie", price: "Prix USD", status: "Statut", open: "Ouvrir", original: "Annonce d’origine", approximate: "env.", listed: "Listé", noMatches: "Aucune sélection ne correspond à ces filtres.", rateNote: "Valeurs USD approximatives avec ¥1 = 0,1481 $ au 1 août 2026. Vérifiez le prix actuel sur la page de destination." };
french.categories = { kicker: "Parcourir la feuille", title: "Chaque trouvaille dans la bonne catégorie", intro: "Chaque lien a été vérifié avec la collection correspondante afin d’éviter une page générique, sans rapport ou introuvable.", open: "Ouvrir la catégorie", items: {
  shoes: { label: "Chaussures", description: "Baskets, running, claquettes et chaussures du quotidien." }, sweatshirts: { label: "Sweats", description: "Sweats à capuche, pulls, mailles et superpositions." }, tshirts: { label: "T-shirts", description: "Manches courtes, longues et modèles graphiques." }, jackets: { label: "Vestes", description: "Coupe-vent, doudounes, manteaux et extérieur." }, pants: { label: "Pantalons & shorts", description: "Jeans, cargos, joggings et shorts d’été." }, headwear: { label: "Couvre-chefs", description: "Casquettes, bonnets et modèles saisonniers." }, accessories: { label: "Accessoires", description: "Sacs, portefeuilles, ceintures et petits articles." }, jersey: { label: "Maillots", description: "Clubs, équipes nationales et versions joueur." }, electronics: { label: "Électronique", description: "Montres, écouteurs, enceintes et produits tech." }, other: { label: "Autres trouvailles", description: "Maison, jouets, cadeaux et sélections diverses." },
} };
french.how = { kicker: "Comment acheter", title: "De la trouvaille à la commande vérifiée", intro: "Une feuille n’est qu’un point de départ. Vérifiez l’annonce en direct avant toute commande.", action: "Voir tous les produits", steps: [
  { title: "Trouver la bonne annonce", body: "Recherchez dans la base ou ouvrez une catégorie, puis choisissez le produit correspondant à votre besoin." }, { title: "Vérifier la page de destination", body: "Confirmez prix CNY, photos, variantes, tailles et notes spécifiques." }, { title: "Calculer le coût complet", body: "Ajoutez service, livraison nationale et transport international au prix produit." }, { title: "Contrôler les informations d’entrepôt", body: "Comparez les photos de contrôle avec la couleur, la taille et la quantité commandées." }, { title: "Choisir l’expédition avec méthode", body: "Comparez ligne, délai, restrictions et poids facturable, pas seulement le prix d’appel." },
] };
french.guides = { kicker: "Guides pratiques", title: "Acheter avec de meilleures informations", intro: "Des conseils clairs pour lire les annonces, estimer le coût et éviter les erreurs courantes.", cards: [
  { label: "Commencer", title: "Utiliser une feuille KameyMall", body: "Filtrer, comparer le CNY, ouvrir la fiche exacte et vérifier chaque détail.", action: "Lire le parcours d’achat" }, { label: "Prix", title: "Prix CNY et coût final", body: "Pourquoi la conversion aide à comparer sans inclure service ni livraison internationale.", action: "Lire le guide des coûts" }, { label: "Vérification", title: "Que contrôler avant de commander", body: "Photos, variantes, taille et prix en direct : en cas de doute, vérifiez d’abord.", action: "Voir la liste de contrôle" },
] };
french.faq = { kicker: "FAQ", title: "Des réponses claires avant d’acheter", intro: "Le guide facilite la découverte. La page de destination reste la référence pour le prix et les options en direct.", items: [
  { question: "Qu’est-ce qu’une feuille KameyMall ?", answer: "Un index indépendant qui organise des trouvailles de shopping en Chine dans des catégories consultables avant d’ouvrir la fiche correspondante." }, { question: "Les prix sont-ils en dollars US ?", answer: "Oui, sous forme de conversion approximative du montant CNY. Le taux et le prix vendeur peuvent changer." }, { question: "Les boutons ouvrent-ils les bonnes pages ?", answer: "Oui. Images, noms et boutons mènent à la fiche exacte, et les catégories à la collection correspondante." }, { question: "Ce site vend-il ou expédie-t-il les produits ?", answer: "Non. KameyMall Sheet est un guide d’information. Achat, contrôle, entrepôt, expédition et SAV dépendent du service choisi." }, { question: "Comment vérifier une trouvaille ?", answer: "Ouvrez la fiche, contrôlez prix, variantes, tailles, photos, frais et options d’expédition avant de payer." }, { question: "Pourquoi le coût final peut-il être supérieur ?", answer: "Livraison nationale, service, conversion, emballage et fret international peuvent s’ajouter." },
] };
french.articles = { kicker: "Bibliothèque SEO de reverse shopping", title: "Articles KameyMall fondés sur la recherche", intro: "Guides originaux sur les trouvailles chinoises, la vérification, l’entrepôt et la planification des coûts transfrontaliers.", read: "Lire l’article", cards: [
  { label: "Guide 2026", title: "Guide KameyMall Spreadsheet pour les acheteurs internationaux", body: "Un parcours complet de la trouvaille jusqu’à une commande transfrontalière soigneusement vérifiée.", action: "Lire l’article complet" }, { label: "Méthode d’achat", title: "Utiliser KameyMall Sheet sans manquer de détails", body: "Catégories, recherche, variantes et vérification de la page de destination.", action: "Ouvrir le guide pratique" }, { label: "Planification", title: "Prix CNY, poids d’entrepôt et expédition internationale", body: "Comprendre les montants comparables tôt et les coûts connus plus tard.", action: "Ouvrir le guide des coûts" },
] };

const spanish = cloneEnglish();
spanish.nav = { finds: "Hallazgos", categories: "Categorías", how: "Cómo comprar", guides: "Guías", articles: "Artículos SEO", faq: "FAQ" };
spanish.language = "Idioma";
spanish.home = { eyebrow: "Guía independiente de compras KameyMall · Actualizada en ago. 2026", title: "Hoja KameyMall 2026: 30 productos seleccionados", lede: "Explora 30 hallazgos seleccionados de KameyMall entre calzado, sudaderas, camisetas deportivas y accesorios. Compara precios, usa la guía QC y abre las fichas exactas.", searchPlaceholder: "Buscar entre 30 hallazgos seleccionados", searchLabel: "Buscar en la base principal", explore: "Ver hallazgos destacados", howAction: "Cómo funciona", categoriesCount: "categorías", findsCount: "hallazgos", direct: "Directo", listingPages: "fichas de producto" };
spanish.finder = { kicker: "Base de hallazgos en vivo", verified: "30 listados verificados", filterPlaceholder: "Filtrar artículos mostrados...", allCategories: "Todas las categorías", allListed: "Todos listados", clear: "Limpiar", item: "Artículo", category: "Categoría", price: "Precio USD", status: "Estado", open: "Abrir", original: "Listado original", approximate: "aprox.", listed: "Listado", noMatches: "Ningún hallazgo coincide con esos filtros.", rateNote: "Valores USD aproximados con ¥1 = 0,1481 $ el 1 de agosto de 2026. Confirma el precio actual en el destino." };
spanish.categories = { kicker: "Explorar la hoja", title: "Cada hallazgo en la categoría correcta", intro: "Cada enlace se comprobó con la colección correspondiente para evitar páginas genéricas, ajenas o inexistentes.", open: "Abrir categoría", items: {
  shoes: { label: "Calzado", description: "Zapatillas, running, sandalias y calzado diario." }, sweatshirts: { label: "Sudaderas", description: "Sudaderas con capucha, jerséis y prendas de capa." }, tshirts: { label: "Camisetas", description: "Manga corta, larga y diseños gráficos." }, jackets: { label: "Chaquetas", description: "Cortavientos, plumíferos, abrigos y exterior." }, pants: { label: "Pantalones y shorts", description: "Vaqueros, cargos, chándal y shorts de verano." }, headwear: { label: "Sombreros y gorras", description: "Gorras, gorros y estilos de temporada." }, accessories: { label: "Accesorios", description: "Bolsos, carteras, cinturones y artículos pequeños." }, jersey: { label: "Camisetas deportivas", description: "Clubes, selecciones y versiones de jugador." }, electronics: { label: "Electrónica", description: "Relojes, auriculares, altavoces y tecnología." }, other: { label: "Otros hallazgos", description: "Hogar, juguetes, regalos y artículos variados." },
} };
spanish.how = { kicker: "Cómo comprar", title: "Del hallazgo a un pedido verificado", intro: "La hoja es solo el inicio. Verifica el anuncio en vivo antes de realizar el pedido.", action: "Ver todos los productos", steps: [
  { title: "Encontrar el listado correcto", body: "Busca en la base o abre una categoría y elige el producto que mejor encaje." }, { title: "Comprobar la página de destino", body: "Confirma precio CNY, fotos, variantes, tallas y notas." }, { title: "Revisar el coste completo", body: "Incluye servicio, envío nacional y envío internacional además del producto." }, { title: "Revisar el almacén", body: "Compara fotos de inspección con color, talla y cantidad pedidas." }, { title: "Elegir el envío con criterio", body: "Compara ruta, plazo, restricciones y peso facturable, no solo el precio." },
] };
spanish.guides = { kicker: "Guías prácticas", title: "Compra con mejor información", intro: "Consejos claros para leer listados, estimar costes y evitar errores.", cards: [
  { label: "Empieza aquí", title: "Cómo usar una hoja KameyMall", body: "Filtra, compara CNY, abre la ficha exacta y verifica cada detalle.", action: "Leer el proceso" }, { label: "Precio", title: "Precio CNY y coste final", body: "La conversión ayuda a comparar, pero no incluye servicio ni envío internacional.", action: "Ver guía de costes" }, { label: "Verificación", title: "Qué revisar antes de pedir", body: "Comprueba fotos, variantes, tallas y precio; si falta información, pregunta primero.", action: "Ver consejos" },
] };
spanish.faq = { kicker: "FAQ", title: "Respuestas claras antes de comprar", intro: "La guía ayuda a descubrir productos; la ficha de destino manda sobre precio y opciones en vivo.", items: [
  { question: "¿Qué es una hoja KameyMall?", answer: "Un índice independiente que organiza hallazgos de compra en China por categorías y permite comparar antes de abrir la ficha correspondiente." }, { question: "¿Los precios están en dólares?", answer: "Sí, como conversión aproximada del CNY. El tipo de cambio y el precio pueden variar." }, { question: "¿Los botones abren páginas correctas?", answer: "Sí. Imágenes, nombres y botones llevan al producto; las categorías, a la colección correspondiente." }, { question: "¿Este sitio vende o envía productos?", answer: "No. Es una guía informativa; compra, inspección, almacén, envío y posventa pertenecen al servicio elegido." }, { question: "¿Cómo verifico un hallazgo?", answer: "Abre el listado y revisa precio, variantes, tallas, fotos, tarifas y opciones de envío antes de pagar." }, { question: "¿Por qué el coste final es mayor?", answer: "Pueden sumarse envío nacional, servicio, conversión, embalaje y transporte internacional." },
] };
spanish.articles = { kicker: "Biblioteca SEO de compra inversa", title: "Artículos KameyMall basados en investigación", intro: "Guías originales sobre hallazgos chinos, verificación, almacén y planificación transfronteriza.", read: "Leer artículo", cards: [
  { label: "Guía 2026", title: "Guía KameyMall Spreadsheet para compradores internacionales", body: "Un flujo completo desde el hallazgo hasta un pedido transfronterizo bien revisado.", action: "Leer artículo completo" }, { label: "Método", title: "Usar KameyMall Sheet sin perder detalles", body: "Categorías, búsqueda, variantes y verificación del destino.", action: "Abrir guía práctica" }, { label: "Costes", title: "Precio CNY, peso de almacén y envío internacional", body: "Qué cifras se comparan pronto y qué costes se conocen después.", action: "Abrir guía de costes" },
] };

const italian = cloneEnglish();
italian.nav = { finds: "Prodotti", categories: "Categorie", how: "Come acquistare", guides: "Guide", articles: "Articoli SEO", faq: "FAQ" };
italian.language = "Lingua";
italian.home = { eyebrow: "Guida indipendente agli acquisti KameyMall · Aggiornata ago. 2026", title: "Foglio KameyMall 2026: 30 prodotti selezionati", lede: "Sfoglia 30 prodotti KameyMall selezionati tra scarpe, felpe, maglie sportive e accessori. Confronta i prezzi, usa la guida QC e apri le schede esatte.", searchPlaceholder: "Cerca tra 30 prodotti selezionati", searchLabel: "Cerca nel database principale", explore: "Esplora i prodotti", howAction: "Come funziona", categoriesCount: "categorie", findsCount: "prodotti trovati", direct: "Diretto", listingPages: "schede prodotto" };
italian.finder = { kicker: "Database prodotti live", verified: "30 inserzioni verificate", filterPlaceholder: "Filtra gli articoli mostrati...", allCategories: "Tutte le categorie", allListed: "Tutti elencati", clear: "Cancella", item: "Articolo", category: "Categoria", price: "Prezzo USD", status: "Stato", open: "Apri", original: "Inserzione originale", approximate: "circa", listed: "Elencato", noMatches: "Nessun prodotto corrisponde ai filtri.", rateNote: "Valori USD indicativi con ¥1 = $0,1481 il 1 agosto 2026. Verifica il prezzo attuale sulla pagina di destinazione." };
italian.categories = { kicker: "Sfoglia il foglio", title: "Ogni prodotto nella categoria corretta", intro: "Ogni collegamento è stato verificato con la raccolta corrispondente per evitare pagine generiche, non pertinenti o mancanti.", open: "Apri categoria", items: {
  shoes: { label: "Scarpe", description: "Sneaker, running, ciabatte e calzature quotidiane." }, sweatshirts: { label: "Felpe", description: "Felpe con cappuccio, pullover e maglieria." }, tshirts: { label: "T-shirt", description: "Maniche corte, lunghe e grafiche." }, jackets: { label: "Giacche", description: "Antivento, piumini, cappotti e capispalla." }, pants: { label: "Pantaloni e shorts", description: "Jeans, cargo, tute e shorts estivi." }, headwear: { label: "Copricapi", description: "Cappellini, berretti e modelli stagionali." }, accessories: { label: "Accessori", description: "Borse, portafogli, cinture e piccoli articoli." }, jersey: { label: "Maglie sportive", description: "Club, nazionali e versioni giocatore." }, electronics: { label: "Elettronica", description: "Orologi, cuffie, altoparlanti e tecnologia." }, other: { label: "Altri prodotti", description: "Casa, giocattoli, regali e articoli vari." },
} };
italian.how = { kicker: "Come acquistare", title: "Dal prodotto a un ordine verificato", intro: "Il foglio è solo l’inizio. Controlla l’inserzione live prima di ordinare.", action: "Vedi tutti i prodotti", steps: [
  { title: "Trova l’inserzione giusta", body: "Cerca nel database o apri una categoria e scegli il prodotto più adatto." }, { title: "Controlla la pagina di destinazione", body: "Conferma prezzo CNY, foto, varianti, taglie e note." }, { title: "Calcola il costo completo", body: "Aggiungi servizio, spedizione nazionale e internazionale al prezzo del prodotto." }, { title: "Controlla il magazzino", body: "Confronta le foto di ispezione con colore, taglia e quantità ordinati." }, { title: "Scegli la spedizione con criterio", body: "Confronta linea, tempi, restrizioni e peso fatturabile, non solo il prezzo." },
] };
italian.guides = { kicker: "Guide pratiche", title: "Acquista con informazioni migliori", intro: "Indicazioni chiare per leggere inserzioni, stimare costi ed evitare errori.", cards: [
  { label: "Inizia qui", title: "Come usare un foglio KameyMall", body: "Filtra, confronta il CNY, apri la pagina esatta e verifica ogni dettaglio.", action: "Leggi il flusso" }, { label: "Prezzo", title: "Prezzo CNY e costo finale", body: "La conversione aiuta a confrontare ma non include servizio e spedizione internazionale.", action: "Apri la guida costi" }, { label: "Verifica", title: "Cosa controllare prima dell’ordine", body: "Foto, varianti, taglie e prezzo live; se mancano dati, verifica prima.", action: "Vedi i controlli" },
] };
italian.faq = { kicker: "FAQ", title: "Risposte chiare prima di acquistare", intro: "La guida aiuta a trovare prodotti; la pagina di destinazione resta il riferimento per prezzo e opzioni live.", items: [
  { question: "Cos’è un foglio KameyMall?", answer: "Un indice indipendente che organizza prodotti cinesi in categorie ricercabili prima di aprire la scheda corrispondente." }, { question: "I prezzi sono in dollari USA?", answer: "Sì, come conversione indicativa del CNY. Cambio e prezzo del venditore possono variare." }, { question: "I pulsanti aprono le pagine corrette?", answer: "Sì. Immagini, nomi e pulsanti portano al prodotto, le categorie alla raccolta giusta." }, { question: "Questo sito vende o spedisce?", answer: "No. È una guida informativa; acquisto, controllo, magazzino, spedizione e assistenza dipendono dal servizio scelto." }, { question: "Come verifico un prodotto?", answer: "Apri l’inserzione e controlla prezzo, varianti, taglie, foto, tariffe e spedizione prima di pagare." }, { question: "Perché il costo finale è più alto?", answer: "Possono aggiungersi spedizione nazionale, servizio, cambio, imballaggio e trasporto internazionale." },
] };
italian.articles = { kicker: "Biblioteca SEO reverse shopping", title: "Articoli KameyMall basati sulla ricerca", intro: "Guide originali su prodotti cinesi, verifica, magazzino e pianificazione dei costi internazionali.", read: "Leggi articolo", cards: [
  { label: "Guida 2026", title: "Guida KameyMall Spreadsheet per acquirenti internazionali", body: "Un percorso completo dal prodotto trovato a un ordine transfrontaliero verificato.", action: "Leggi l’articolo" }, { label: "Metodo", title: "Usare KameyMall Sheet senza perdere dettagli", body: "Categorie, ricerca, varianti e verifica della destinazione.", action: "Apri guida pratica" }, { label: "Costi", title: "Prezzo CNY, peso in magazzino e spedizione", body: "Quali valori confrontare subito e quali costi diventano chiari dopo.", action: "Apri guida costi" },
] };

const polish = cloneEnglish();
polish.nav = { finds: "Znaleziska", categories: "Kategorie", how: "Jak kupować", guides: "Poradniki", articles: "Artykuły SEO", faq: "FAQ" };
polish.language = "Język";
polish.home = { eyebrow: "Niezależny poradnik zakupowy KameyMall · Aktualizacja: sierpień 2026", title: "Arkusz KameyMall 2026: 30 wybranych produktów", lede: "Przeglądaj 30 wybranych produktów KameyMall: buty, bluzy, koszulki sportowe i akcesoria. Porównuj ceny, korzystaj z poradnika QC i otwieraj dokładne karty.", searchPlaceholder: "Szukaj wśród 30 wybranych produktów", searchLabel: "Przeszukaj główną bazę produktów", explore: "Zobacz polecane produkty", howAction: "Jak to działa", categoriesCount: "kategorii", findsCount: "znalezisk", direct: "Bezpośrednio", listingPages: "do kart produktów" };
polish.finder = { kicker: "Baza produktów na żywo", verified: "30 sprawdzonych ofert", filterPlaceholder: "Filtruj widoczne produkty...", allCategories: "Wszystkie kategorie", allListed: "Wszystkie aktywne", clear: "Wyczyść", item: "Produkt", category: "Kategoria", price: "Cena USD", status: "Status", open: "Otwórz", original: "Oferta źródłowa", approximate: "ok.", listed: "Aktywna", noMatches: "Brak produktów zgodnych z filtrami.", rateNote: "Orientacyjne wartości USD przy ¥1 = 0,1481 USD z 1 sierpnia 2026. Sprawdź bieżącą cenę na stronie docelowej." };
polish.categories = { kicker: "Przeglądaj arkusz", title: "Każdy produkt w odpowiedniej kategorii", intro: "Każdy link sprawdzono z właściwą kolekcją, aby nie prowadził do strony ogólnej, niepowiązanej lub błędu 404.", open: "Otwórz kategorię", items: {
  shoes: { label: "Buty", description: "Sneakersy, biegowe, klapki i obuwie codzienne." }, sweatshirts: { label: "Bluzy", description: "Bluzy z kapturem, swetry i warstwy." }, tshirts: { label: "T-shirty", description: "Krótki i długi rękaw oraz grafiki." }, jackets: { label: "Kurtki", description: "Wiatrówki, puchówki, płaszcze i odzież wierzchnia." }, pants: { label: "Spodnie i szorty", description: "Jeansy, cargo, dresy i letnie szorty." }, headwear: { label: "Nakrycia głowy", description: "Czapki z daszkiem, beanie i modele sezonowe." }, accessories: { label: "Akcesoria", description: "Torby, portfele, paski i drobne produkty." }, jersey: { label: "Koszulki sportowe", description: "Kluby, reprezentacje i wersje zawodnicze." }, electronics: { label: "Elektronika", description: "Zegarki, słuchawki, głośniki i technologia." }, other: { label: "Inne znaleziska", description: "Dom, zabawki, prezenty i pozostałe produkty." },
} };
polish.how = { kicker: "Jak kupować", title: "Od znaleziska do sprawdzonego zamówienia", intro: "Arkusz to początek. Przed zamówieniem sprawdź ofertę na żywo.", action: "Zobacz wszystkie produkty", steps: [
  { title: "Znajdź właściwą ofertę", body: "Przeszukaj bazę lub kategorię i wybierz produkt pasujący do potrzeb." }, { title: "Sprawdź stronę docelową", body: "Potwierdź cenę CNY, zdjęcia, warianty, rozmiary i uwagi." }, { title: "Policz pełny koszt", body: "Dodaj obsługę, wysyłkę krajową i międzynarodową do ceny produktu." }, { title: "Sprawdź dane magazynowe", body: "Porównaj zdjęcia kontroli z kolorem, rozmiarem i liczbą zamówionych sztuk." }, { title: "Wybierz wysyłkę świadomie", body: "Porównaj trasę, czas, ograniczenia i wagę rozliczeniową, nie tylko cenę." },
] };
polish.guides = { kicker: "Praktyczne poradniki", title: "Kupuj z lepszą informacją", intro: "Jasne wskazówki dotyczące ofert, kosztów i typowych błędów.", cards: [
  { label: "Zacznij tutaj", title: "Jak używać arkusza KameyMall", body: "Filtruj, porównuj CNY, otwieraj właściwą kartę i sprawdzaj szczegóły.", action: "Przeczytaj proces" }, { label: "Cena", title: "Cena CNY a koszt końcowy", body: "Przeliczenie pomaga porównywać, lecz nie obejmuje obsługi i wysyłki międzynarodowej.", action: "Otwórz poradnik kosztów" }, { label: "Weryfikacja", title: "Co sprawdzić przed zamówieniem", body: "Zdjęcia, warianty, rozmiar i cena; przy brakach najpierw zapytaj.", action: "Zobacz listę kontroli" },
] };
polish.faq = { kicker: "FAQ", title: "Jasne odpowiedzi przed zakupem", intro: "Poradnik pomaga znaleźć produkt; strona docelowa jest źródłem aktualnej ceny i wariantów.", items: [
  { question: "Czym jest arkusz KameyMall?", answer: "Niezależny indeks porządkujący chińskie produkty w kategoriach przed otwarciem odpowiadającej im karty." }, { question: "Czy ceny są w dolarach?", answer: "Tak, jako orientacyjne przeliczenie CNY. Kurs i cena sprzedawcy mogą się zmieniać." }, { question: "Czy przyciski prowadzą do właściwych stron?", answer: "Tak. Zdjęcia, nazwy i przyciski otwierają produkt, a kategorie odpowiednią kolekcję." }, { question: "Czy ta strona sprzedaje lub wysyła produkty?", answer: "Nie. To poradnik informacyjny; zakup, kontrola, magazyn, wysyłka i obsługa zależą od wybranej usługi." }, { question: "Jak zweryfikować produkt?", answer: "Otwórz ofertę i sprawdź cenę, warianty, rozmiary, zdjęcia, opłaty i wysyłkę przed płatnością." }, { question: "Dlaczego koszt końcowy jest wyższy?", answer: "Mogą dojść wysyłka krajowa, obsługa, przewalutowanie, pakowanie i transport międzynarodowy." },
] };
polish.articles = { kicker: "Biblioteka SEO zakupów odwrotnych", title: "Artykuły KameyMall oparte na analizie", intro: "Oryginalne poradniki o chińskich produktach, weryfikacji, magazynie i kosztach międzynarodowych.", read: "Czytaj artykuł", cards: [
  { label: "Poradnik 2026", title: "KameyMall Spreadsheet dla kupujących za granicą", body: "Pełny proces od znalezienia produktu do sprawdzonego zamówienia międzynarodowego.", action: "Przeczytaj artykuł" }, { label: "Metoda", title: "Jak używać KameyMall Sheet bez pomijania szczegółów", body: "Kategorie, wyszukiwanie, warianty i weryfikacja strony docelowej.", action: "Otwórz poradnik" }, { label: "Koszty", title: "Cena CNY, waga magazynowa i wysyłka", body: "Które wartości porównasz od razu, a które poznasz później.", action: "Otwórz poradnik kosztów" },
] };

const localizedPageIntros: Record<Locale, Partial<SiteCopy["pageIntros"]>> = {
  en: {},
  de: {
    finds: { kicker: "Tabelle mit 30 Produkten", title: "KameyMall-Tabelle: 30 kuratierte Produkte", intro: "Filtere 30 unterschiedliche Einträge in 10 Kategorien, vergleiche datierte CNY- und ungefähre USD-Preise und öffne die exakte Detail- oder Zielseite." },
    categories: { kicker: "Direkte Sammlungen", title: "Alle Kategorien ohne 404 durchsuchen", intro: "Alle Zieladressen wurden geprüft, einschließlich der korrigierten Sweatshirts-Sammlung." },
    "how-to-buy": { kicker: "Einkaufsablauf", title: "Ein sorgfältiger Weg von der Suche bis zur Lieferung", intro: "Prüfe Produkt, Kosten und Lagerinformationen vor dem internationalen Versand." },
    guides: { kicker: "Ratgeberbibliothek", title: "Drei Ratgeber mit jeweils eigener Seite", intro: "Öffne eine vollständige, teilbare Seite statt eines Sprungs innerhalb der Startseite." },
    faq: { kicker: "Häufige Fragen", title: "Antworten für neue Tabellenkäufer", intro: "Verstehe Zweck, Grenzen und die Details, die auf der Zielseite geprüft werden müssen." },
    articles: { kicker: "SEO-Artikelbibliothek", title: "Reverse-Shopping-Recherche für Käufer im Ausland", intro: "Originale Langformartikel zu Suche, Prüfung, Kosten, Lager und Lieferung." },
  },
  fr: {
    finds: { kicker: "Tableur de 30 produits", title: "Tableur KameyMall : 30 produits sélectionnés", intro: "Filtrez 30 fiches distinctes dans 10 catégories, comparez les prix CNY datés et USD approximatifs, puis ouvrez la page exacte." },
    categories: { kicker: "Collections directes", title: "Parcourir les catégories sans erreur 404", intro: "Toutes les destinations ont été vérifiées, y compris la collection Sweats corrigée." },
    "how-to-buy": { kicker: "Parcours d’achat", title: "Une méthode attentive de la découverte à la livraison", intro: "Vérifiez produit, coût et contrôle d’entrepôt avant l’expédition internationale." },
    guides: { kicker: "Bibliothèque de guides", title: "Trois guides sur des pages indépendantes", intro: "Ouvrez un guide complet et partageable au lieu d’une ancre sur l’accueil." },
    faq: { kicker: "Questions fréquentes", title: "Réponses pour les nouveaux utilisateurs", intro: "Comprenez le rôle du guide et les détails à confirmer sur la page de destination." },
    articles: { kicker: "Bibliothèque d’articles SEO", title: "Recherche de reverse shopping pour acheteurs internationaux", intro: "Articles originaux sur découverte, vérification, coûts, entrepôt et livraison." },
  },
  es: {
    finds: { kicker: "Hoja de 30 productos", title: "Hoja KameyMall: 30 productos seleccionados", intro: "Filtra 30 fichas distintas en 10 categorías, compara precios CNY fechados y USD aproximados y abre el detalle o destino exacto." },
    categories: { kicker: "Colecciones directas", title: "Explora categorías sin errores 404", intro: "Todos los destinos están comprobados, incluida la colección corregida de Sudaderas." },
    "how-to-buy": { kicker: "Proceso de compra", title: "Un camino cuidadoso del hallazgo a la entrega", intro: "Verifica producto, coste y almacén antes del envío internacional." },
    guides: { kicker: "Biblioteca de guías", title: "Tres guías en páginas independientes", intro: "Abre una guía completa y compartible en vez de un ancla de la portada." },
    faq: { kicker: "Preguntas frecuentes", title: "Respuestas para nuevos compradores", intro: "Entiende la función de la hoja y qué detalles confirmar en el destino." },
    articles: { kicker: "Biblioteca SEO", title: "Investigación de compra inversa para compradores internacionales", intro: "Artículos originales sobre búsqueda, verificación, costes, almacén y entrega." },
  },
  it: {
    finds: { kicker: "Foglio con 30 prodotti", title: "Foglio KameyMall: 30 prodotti selezionati", intro: "Filtra 30 schede distinte in 10 categorie, confronta CNY datati e USD indicativi e apri il dettaglio o la destinazione esatta." },
    categories: { kicker: "Raccolte dirette", title: "Sfoglia le categorie senza errori 404", intro: "Tutte le destinazioni sono state verificate, compresa la raccolta Felpe corretta." },
    "how-to-buy": { kicker: "Percorso d’acquisto", title: "Un metodo attento dalla scoperta alla consegna", intro: "Verifica prodotto, costi e dati del magazzino prima della spedizione." },
    guides: { kicker: "Raccolta guide", title: "Tre guide su pagine indipendenti", intro: "Apri una guida completa e condivisibile invece di un’ancora in home page." },
    faq: { kicker: "Domande frequenti", title: "Risposte per chi usa il foglio per la prima volta", intro: "Comprendi lo scopo e i dettagli da confermare sulla destinazione." },
    articles: { kicker: "Biblioteca articoli SEO", title: "Ricerca reverse shopping per acquirenti internazionali", intro: "Articoli originali su scoperta, verifica, costi, magazzino e consegna." },
  },
  pl: {
    finds: { kicker: "Arkusz 30 produktów", title: "Arkusz KameyMall: 30 wybranych produktów", intro: "Filtruj 30 różnych kart w 10 kategoriach, porównuj datowane CNY i orientacyjne USD oraz otwieraj dokładne szczegóły lub stronę docelową." },
    categories: { kicker: "Bezpośrednie kolekcje", title: "Przeglądaj kategorie bez błędów 404", intro: "Wszystkie adresy sprawdzono, w tym poprawioną kategorię Bluzy." },
    "how-to-buy": { kicker: "Proces zakupowy", title: "Uważna droga od znalezienia do dostawy", intro: "Sprawdź produkt, koszt i dane magazynowe przed wysyłką." },
    guides: { kicker: "Biblioteka poradników", title: "Trzy poradniki na osobnych stronach", intro: "Otwórz pełną stronę zamiast kotwicy na stronie głównej." },
    faq: { kicker: "Najczęstsze pytania", title: "Odpowiedzi dla nowych użytkowników", intro: "Poznaj rolę arkusza i dane wymagające potwierdzenia." },
    articles: { kicker: "Biblioteka SEO", title: "Analizy zakupów odwrotnych dla kupujących za granicą", intro: "Oryginalne artykuły o wyszukiwaniu, kontroli, kosztach, magazynie i dostawie." },
  },
};

type LocalizedLongForm = { guideSections: ProseSection[][]; articleSections: ProseSection[] };
const longFormTranslations: Partial<Record<Locale, LocalizedLongForm>> = {};

longFormTranslations.de = {
  guideSections: [
    [
      { heading: "1. Mit dem konkreten Bedarf beginnen", paragraphs: ["Beginne mit einer klaren Produktart, einem Einsatzzweck oder einem wichtigen Designdetail. Je genauer dein Ziel ist, desto leichter lassen sich passende Angebote vergleichen.", "Nutze Kategorien zum Entdecken. Wenn Marke, Modell, Kleidungsart oder Suchbegriff bereits feststehen, ist die Hauptsuche schneller."] },
      { heading: "2. Sichtbare Angaben vergleichen", paragraphs: ["Die Tabelle zeigt Name, Kategorie, CNY-Referenzpreis, ungefähre USD-Umrechnung und direkten Produktlink. Diese Felder dienen einer Auswahlliste, nicht einer endgültigen Kaufentscheidung.", "Ähnliche Produkte können sich bei Material, Größen, Version oder Verkäufer unterscheiden. Öffne beide Zielseiten, bevor du nur nach dem niedrigeren Preis entscheidest."] },
      { heading: "3. Zielangebot verifizieren", paragraphs: ["Prüfe aktuellen Preis, Varianten, Verkäuferbilder, Maße und besondere Hinweise. Fehlende Angaben sollten nicht durch Vermutungen ersetzt werden.", "Speichere Produktlink oder Referenznummer, damit du später zum selben Angebot zurückkehrst und es nicht mit einer ähnlichen Abbildung verwechselst."] },
      { heading: "4. Mit vollständigen Kosten fortfahren", paragraphs: ["Plane nach der Auswahl Inlandsversand, Service, Zahlungsumrechnung, Verpackung und internationale Fracht ein. Diese Posten fehlen in einer einfachen Produktumrechnung.", "Nutze Lagerfotos sowie gemessenes Gewicht und Maße als zweite Prüfung, bevor du das internationale Paket abschickst."] },
    ],
    [
      { heading: "Was der Kartenpreis bedeutet", paragraphs: ["Der USD-Wert ist eine transparente Umrechnung des gelisteten CNY-Produktpreises. So lassen sich Angebote in einer vertrauten Währung vergleichen.", "Er ist kein verbindliches Angebot und fixiert weder Wechselkurs noch Verkäuferpreis. Öffne die Zielseite vor der Zahlung erneut."] },
      { heading: "Kosten vor dem Lager", paragraphs: ["Inlandsversand, Service und Zahlungsumrechnung können bereits bei der Bestellung hinzukommen. Die genaue Struktur hängt vom gewählten Einkaufsservice ab.", "Ein Gutschein kann einen Posten senken, ohne die anderen zu verändern. Vergleiche deshalb den kompletten Checkout."] },
      { heading: "Paketabhängige Kosten", paragraphs: ["Internationale Fracht hängt von Zielland, Route, tatsächlichem oder volumetrischem Gewicht, Verpackung und Einschränkungen ab. Lagerdaten sind zuverlässiger als eine frühe Schätzung.", "Weniger Verpackung kann Volumen sparen; Schutzverpackung erhöht eventuell das Gewicht. Entscheide nach Empfindlichkeit und Wert des Produkts."] },
      { heading: "Besser vergleichen", paragraphs: ["Halte Produktpreis, Zwischensumme vor Versand und voraussichtliche Endkosten getrennt. So versteckt ein günstiger Artikel kein teures Versandprofil.", "Nutze bei allen Vergleichen dieselben Annahmen zu Ziel, Gewicht und Geschwindigkeit. Unterschiedliche Grundlagen führen zu falschen Ergebnissen."] },
    ],
    [
      { heading: "Identität des Angebots", paragraphs: ["Bestätige Titel, Verkäuferbilder, Farbe, Modell und Version. Ähnliche Vorschaubilder können unterschiedliche Materialien oder Lieferumfänge verbergen.", "Vergleiche beim erneuten Öffnen Referenznummer und direkten Link."] },
      { heading: "Größe und Variante", paragraphs: ["Lies Maße statt nur Buchstaben wie M oder L. Prüfe, ob die Variante den Preis verändert und ob abgebildetes Zubehör enthalten ist.", "Wenn wichtige Informationen fehlen, frage vor der Bestellung, statt die Standardoption zu wählen."] },
      { heading: "Preis und Einschränkungen", paragraphs: ["Bestätige Live-CNY-Preis und Inlandsversand. Akkus, Flüssigkeiten, Markenware oder große Produkte können eingeschränkte Routen haben.", "Ein bestellbarer Artikel ist nicht automatisch für jede internationale Versandlinie zugelassen."] },
      { heading: "Lagerprüfung", paragraphs: ["Vergleiche Lagerfotos mit Farbe, Größe und Menge der Bestellung. Achte auf sichtbare Schäden, falsche Varianten und deutliche Verarbeitungsfehler.", "Aktualisiere die Versandkalkulation mit gemessenem Gewicht und Maßen, bevor du das Paket einreichst."] },
    ],
  ],
  articleSections: [
    { heading: "Warum eine Tabelle nützlich ist – aber nicht die letzte Antwort", paragraphs: ["Käufer im Ausland entdecken chinesische Produkte oft über Bilder, kurze Namen oder soziale Beiträge, die auf Marktplätzen schwer zu suchen sind. Eine thematische Tabelle ordnet Fundstücke, verkürzt die Suche und führt direkt zum Zielangebot.", "Die Tabelle bleibt ein Index. Karten helfen beim Finden und Vergleichen, garantieren aber weder Bestand noch Varianten oder aktuellen Preis. Deshalb folgt auf die Vorauswahl immer die Prüfung der Live-Produktseite."] },
    { heading: "Mit einer konkreten Suche beginnen", paragraphs: ["Definiere Produktart, wichtiges Detail, Nutzung, Größe oder Farbe, bevor du suchst. Nutze Modellnamen für gezielte Treffer und Kategorien, wenn du Alternativen vergleichen möchtest.", "Die Suche dieses KameyMall Sheet übergibt das eingegebene Wort an die echte Ergebnisseite der Hauptdatenbank. Eine Nike-Suche zeigt daher Nike-Ergebnisse statt immer nur die allgemeine Produktübersicht."] },
    { heading: "Kategorien gegen falsche Treffer nutzen", paragraphs: ["Kategorien helfen, wenn Produktnamen uneinheitlich übersetzt sind. Hoodie, Pullover, Sweater und Longsleeve können ähnliche Produkte beschreiben, die durch eine passende Sammlung leichter vergleichbar werden.", "Auch die URL muss stimmen. Der korrekte Sweatshirts-Link führt zur Sammlung Hoodies und Sweaters; die übrigen Kategorien besitzen ebenfalls geprüfte eigene Ziele."] },
    { heading: "Produktkarten als Auswahlliste lesen", paragraphs: ["Eine gute Karte zeigt Name, Kategorie, Ausgangswährung, ungefähre Umrechnung, Referenz, Bild und Detailadresse. Diese Daten beschleunigen den Vergleich und machen ein Produkt später wieder auffindbar.", "Der USD-Wert bleibt ungefähr. Wechselkurs und CNY-Preis ändern sich, und Kosten für Inlandsversand, Service, Zahlung, Verpackung sowie internationale Fracht sind noch nicht enthalten."] },
    { heading: "Live-Angebot vor der Zahlung prüfen", paragraphs: ["Öffne die Zielseite und kontrolliere Preis, Bilder, Varianten und Hinweise. Bei Kleidung zählen tatsächliche Maße mehr als vertraute Größenbuchstaben; bei Elektronik müssen Modell, Zubehör, Kompatibilität und Akku-Regeln geprüft werden.", "Achte darauf, ob Galerie und gewählte Variante übereinstimmen. Wenn entscheidende Informationen fehlen, frage vor der Zahlung nach."] },
    { heading: "Zwischen Kauf und internationalem Versand", paragraphs: ["Im Agentenablauf werden Produktbestellung und internationales Paket getrennt. Der Verkäufer schickt den Artikel zunächst an ein Lager, das Eingang, Prüfung und spätere Paketvorbereitung übernimmt.", "Dieser Zwischenpunkt ermöglicht Kontrolle: Vergleiche Fotos, Farbe, Größe und Menge. Mit gemessenem Gewicht und Maßen wird aus einer groben Versandschätzung eine belastbarere Planung."] },
    { heading: "Budget in Ebenen aufbauen", paragraphs: ["Notiere Produktpreis, Inlandsversand, Service, optionale Prüf- oder Verpackungskosten und internationale Fracht getrennt. So bleiben die Ursachen des Gesamtpreises nachvollziehbar.", "Fracht kann nach tatsächlichem oder volumetrischem Gewicht berechnet werden. Konsolidierung spart wiederholte Paketkosten, verändert aber Gewicht, Wert und mögliche Zollfolgen."] },
    { heading: "Prüfung und Lieferung als Qualitätsfaktoren", paragraphs: ["Qualität bedeutet auch richtige Variante, sichtbarer Zustand, Schutz während des Transports und eine zulässige Versandroute. Zerbrechliche Ware braucht eventuell mehr Schutz, sperrige Ware weniger Einzelverpackung.", "Prüfe vor dem Versand Adresse, Inhalt, Einschränkungen, Versicherung und Zeitfenster. Bewahre Angebots- und Prüfbelege für Rückfragen auf."] },
    { heading: "Wiederholbare Checkliste", paragraphs: ["Ein verlässlicher Ablauf lautet: Bedarf definieren, suchen oder Kategorie öffnen, vergleichbare Angebote auswählen, Live-Seite prüfen, Kosten staffeln, Lagerkontrolle ansehen und mit echten Paketdaten versenden.", "Das beseitigt nicht jedes Risiko, verhindert aber viele vermeidbare Fehler wie defekte Links, falsche Varianten, unrealistische Preisannahmen und ungeprüfte Versandentscheidungen.", "Behalte die Nachweise bei der jeweiligen Entscheidung. Speichere Produkt-URL und gewählte Variante, notiere den bei der Bestellung sichtbaren Preis und bewahre Lagerprüfung sowie Paketmaße auf. Ändert der Verkäufer das Angebot oder schwankt eine Routenschätzung, lässt sich so erkennen, was sich geändert hat. Auch Bewertungsartikel bleiben dadurch ehrlich: Eine persönliche Lieferzeit oder ein Frachtpreis kann als datierte Einzelerfahrung berichtet werden, darf aber nie als dauerhaftes Ergebnis für alle Käufer dargestellt werden."], bullets: ["Konkretes Suchwort oder passende Kategorie nutzen.", "Zieladresse und Referenznummer bestätigen.", "Preis, Variante, Größe und Hinweise prüfen.", "Produktpreis und gelieferte Gesamtkosten trennen.", "Lagerfotos, Gewicht und Maße kontrollieren.", "Route, Einschränkungen, Schutz und Laufzeit vergleichen."] },
  ],
};

longFormTranslations.fr = {
  guideSections: [
    [
      { heading: "1. Commencer par un besoin précis", paragraphs: ["Définissez un type de produit, un usage ou un détail de design important. Une intention précise permet de comparer des annonces réellement proches.", "Utilisez les catégories pour explorer. Si vous connaissez déjà la marque, le modèle ou le mot-clé, utilisez la recherche principale."] },
      { heading: "2. Comparer les informations visibles", paragraphs: ["La feuille fournit nom, catégorie, prix CNY de référence, conversion USD approximative et lien direct. Ces champs servent à créer une présélection, pas à décider définitivement.", "Deux produits similaires peuvent varier par matière, taille, version ou vendeur. Ouvrez les deux pages avant de choisir uniquement le moins cher."] },
      { heading: "3. Vérifier l’annonce de destination", paragraphs: ["Contrôlez prix actuel, variantes, photos vendeur, mesures et remarques. Une information absente ne doit pas être remplacée par une supposition.", "Conservez le lien ou la référence afin de retrouver exactement la même annonce et d’éviter une image presque identique."] },
      { heading: "4. Planifier le coût complet", paragraphs: ["Ajoutez livraison nationale, service, conversion de paiement, emballage et fret international. Une simple conversion du prix produit ne couvre pas ces lignes.", "Utilisez photos d’entrepôt, poids et dimensions mesurés comme seconde vérification avant d’expédier le colis international."] },
    ],
    [
      { heading: "Ce que représente le prix de la carte", paragraphs: ["Le montant USD est la conversion transparente du prix produit CNY affiché. Il facilite la comparaison dans une devise familière.", "Ce n’est pas un devis et il ne bloque ni le taux ni le prix vendeur. Rouvrez la page de destination avant de payer."] },
      { heading: "Les coûts avant l’entrepôt", paragraphs: ["La livraison du vendeur à l’entrepôt, le service et la conversion de paiement peuvent être ajoutés dès la commande. Leur structure dépend du service choisi.", "Une promotion peut réduire une ligne sans modifier les autres. Comparez donc le panier complet."] },
      { heading: "Les coûts liés au colis", paragraphs: ["Le fret international dépend du pays, de la ligne, du poids réel ou volumétrique, de l’emballage et des restrictions. Les données finales d’entrepôt sont plus fiables qu’une estimation précoce.", "Retirer un emballage inutile réduit parfois le volume; une protection supplémentaire augmente parfois le poids. Décidez selon fragilité et valeur."] },
      { heading: "Une meilleure méthode de comparaison", paragraphs: ["Séparez prix produit, sous-total avant expédition et estimation livrée. Un article bon marché ne masquera ainsi pas un profil d’expédition coûteux.", "Utilisez les mêmes hypothèses de destination, poids et vitesse. Mélanger des bases différentes rend la comparaison trompeuse."] },
    ],
    [
      { heading: "Identité de l’annonce", paragraphs: ["Confirmez titre, photos, couleur, modèle et version. Des vignettes similaires peuvent cacher une matière ou un contenu différent.", "Vérifiez référence et lien direct lorsque vous revenez sur un produit enregistré."] },
      { heading: "Taille et variante", paragraphs: ["Lisez les mesures plutôt que les seules lettres M ou L. Vérifiez si la variante modifie le prix et si les accessoires photographiés sont inclus.", "Si une donnée essentielle manque, demandez avant de commander au lieu de choisir l’option par défaut."] },
      { heading: "Prix et restrictions", paragraphs: ["Confirmez prix CNY et livraison nationale. Batteries, liquides, marques et gros volumes peuvent limiter les lignes disponibles.", "Un produit commandable n’est pas automatiquement accepté par toutes les routes internationales."] },
      { heading: "Contrôle d’entrepôt", paragraphs: ["Comparez les photos avec couleur, taille et quantité commandées. Recherchez dommage visible, mauvaise variante ou défaut évident.", "Mettez à jour l’estimation avec le poids et les dimensions mesurés avant de soumettre le colis."] },
    ],
  ],
  articleSections: [
    { heading: "Pourquoi une feuille est utile sans être la réponse finale", paragraphs: ["Les acheteurs internationaux découvrent souvent des produits chinois via une capture, un nom court ou une publication difficile à retrouver. Une feuille thématique classe ces trouvailles et relie directement l’annonce, ce qui réduit fortement le temps de recherche.", "La feuille reste un index. La carte aide à découvrir et comparer, mais ne garantit ni stock, ni variante, ni prix actuel. La présélection doit donc être suivie d’une vérification de la page en direct."] },
    { heading: "Commencer par une recherche précise", paragraphs: ["Définissez type, usage, détail essentiel, taille ou couleur avant de chercher. Utilisez un modèle précis pour une recherche ciblée et une catégorie pour comparer des alternatives.", "La recherche KameyMall Sheet transmet réellement le mot saisi à la page de résultats de la base principale. Une recherche Nike ouvre donc des résultats Nike au lieu d’une page générale identique pour tous les mots."] },
    { heading: "Réduire les faux résultats avec les catégories", paragraphs: ["Les catégories sont utiles lorsque les noms sont traduits de plusieurs façons. Hoodie, pull, sweat et haut manches longues peuvent décrire des produits proches, plus faciles à comparer dans une collection dédiée.", "Le lien doit aussi fonctionner. La destination correcte pour les sweats est la collection Hoodies and Sweaters; les autres catégories utilisent également leurs routes vérifiées."] },
    { heading: "Lire la carte comme une présélection", paragraphs: ["Une carte utile montre nom, catégorie, devise source, conversion, référence, image et lien exact. Ces données accélèrent la comparaison et permettent de retrouver le même produit.", "Le montant USD reste approximatif. Taux, prix CNY, livraison nationale, service, paiement, emballage et fret international peuvent encore changer le coût."] },
    { heading: "Vérifier l’annonce avant de payer", paragraphs: ["Ouvrez la destination et contrôlez prix, images, variantes et notes. Pour un vêtement, comparez des mesures réelles; pour l’électronique, vérifiez modèle, accessoires, compatibilité et contraintes de batterie.", "Assurez-vous que la variante choisie correspond aux photos. Si une donnée importante manque, demandez avant de payer."] },
    { heading: "Entre achat et expédition internationale", paragraphs: ["Le flux d’un agent sépare généralement commande produit et colis international. Le vendeur livre d’abord à un entrepôt, qui enregistre, contrôle et prépare ensuite le colis.", "Cette étape permet de comparer photos, couleur, taille et quantité. Le poids et les dimensions réels remplacent ensuite une estimation de transport trop générale."] },
    { heading: "Construire le budget par étapes", paragraphs: ["Notez séparément prix produit, livraison nationale, service, options de contrôle ou d’emballage et fret. Vous voyez ainsi clairement l’origine du total.", "Le transport peut dépendre du poids réel ou volumétrique. La consolidation réduit certains frais répétés mais modifie poids, valeur et éventuelles conséquences douanières."] },
    { heading: "Contrôle et livraison font partie de la qualité", paragraphs: ["La qualité comprend la bonne variante, l’état visible, la protection et une route qui accepte le produit. Un article fragile peut demander plus de protection; un article volumineux moins d’emballage commercial.", "Avant l’envoi, vérifiez adresse, contenu, restrictions, assurance et délai. Conservez annonces et contrôles pour toute question au support."] },
    { heading: "Une liste de contrôle répétable", paragraphs: ["Le processus fiable est simple: définir le besoin, chercher ou ouvrir une catégorie, présélectionner, vérifier l’annonce, détailler les coûts, contrôler l’entrepôt puis choisir la livraison avec les vraies données du colis.", "Cette méthode n’élimine pas tous les risques, mais évite de nombreux problèmes prévisibles: liens cassés, mauvaise variante, prix irréaliste ou expédition choisie sans poids ni restrictions.", "Conservez les preuves liées à chaque décision. Enregistrez l’URL du produit et l’option choisie, notez le prix visible lors de la commande et gardez les contrôles d’entrepôt ainsi que les mesures du colis. Si le vendeur modifie l’annonce ou si une estimation de ligne change, ces éléments permettent d’identifier précisément l’évolution. Ils rendent aussi un article d’avis honnête : un délai ou un prix de fret personnel peut être présenté comme une expérience datée, jamais comme le résultat permanent de tous les acheteurs."], bullets: ["Utiliser un mot précis ou la bonne catégorie.", "Confirmer lien et référence.", "Vérifier prix, variante, taille et notes.", "Séparer prix produit et coût livré.", "Contrôler photos, poids et dimensions.", "Comparer restrictions, protection et délai."] },
  ],
};

longFormTranslations.es = {
  guideSections: [
    [
      { heading: "1. Empieza con una necesidad concreta", paragraphs: ["Define el tipo de producto, el uso o un detalle importante. Una intención precisa permite comparar listados realmente equivalentes.", "Usa categorías para explorar. Si ya conoces marca, modelo, prenda o palabra clave, utiliza la búsqueda principal."] },
      { heading: "2. Compara la información visible", paragraphs: ["La hoja muestra nombre, categoría, precio CNY de referencia, conversión USD aproximada y enlace directo. Sirve para crear una lista corta, no para decidir definitivamente.", "Dos productos parecidos pueden cambiar en material, talla, versión o vendedor. Abre ambos destinos antes de elegir solo por el precio."] },
      { heading: "3. Verifica el listado de destino", paragraphs: ["Comprueba precio actual, variantes, fotos, medidas y notas. No sustituyas un dato ausente por una suposición.", "Guarda el enlace o la referencia para volver al mismo listado y no confundirlo con una imagen similar."] },
      { heading: "4. Planifica el coste completo", paragraphs: ["Incluye envío nacional, servicio, conversión de pago, embalaje y transporte internacional. Una conversión simple no contiene esas partidas.", "Usa fotos, peso y dimensiones del almacén como segunda comprobación antes de enviar el paquete internacional."] },
    ],
    [
      { heading: "Qué representa el precio de la tarjeta", paragraphs: ["El importe USD es una conversión transparente del precio CNY listado y facilita comparar en una moneda familiar.", "No es una cotización ni bloquea el tipo de cambio o el precio del vendedor. Reabre el destino antes de pagar."] },
      { heading: "Costes antes del almacén", paragraphs: ["El envío nacional, el servicio y la conversión de pago pueden añadirse durante el pedido. La estructura depende del servicio elegido.", "Una promoción puede reducir una partida sin cambiar las demás; compara el checkout completo."] },
      { heading: "Costes dependientes del paquete", paragraphs: ["El transporte internacional depende de destino, línea, peso real o volumétrico, embalaje y restricciones. Los datos finales del almacén son más fiables que una estimación inicial.", "Quitar embalaje ahorra volumen; añadir protección puede aumentar el peso. Decide según fragilidad y valor."] },
      { heading: "Una comparación mejor", paragraphs: ["Separa precio del producto, subtotal antes del envío y estimación entregada. Así un artículo barato no oculta un envío costoso.", "Compara con las mismas condiciones de destino, peso y velocidad. Mezclar supuestos produce conclusiones engañosas."] },
    ],
    [
      { heading: "Identidad del listado", paragraphs: ["Confirma título, fotos, color, modelo y versión. Miniaturas similares pueden corresponder a materiales o paquetes distintos.", "Comprueba referencia y enlace directo al volver a un producto guardado."] },
      { heading: "Talla y variante", paragraphs: ["Lee medidas, no solo letras como M o L. Revisa si la variante cambia el precio y si incluye los accesorios mostrados.", "Si falta un dato esencial, pregunta antes de pedir en vez de aceptar la opción predeterminada."] },
      { heading: "Precio y restricciones", paragraphs: ["Confirma precio CNY y envío nacional. Baterías, líquidos, marcas y productos grandes pueden limitar rutas.", "Que un artículo se pueda comprar no significa que todas las líneas internacionales lo acepten."] },
      { heading: "Inspección de almacén", paragraphs: ["Compara fotos con color, talla y cantidad. Busca daños visibles, variante incorrecta o defectos evidentes.", "Actualiza el cálculo con peso y dimensiones medidos antes de enviar el paquete."] },
    ],
  ],
  articleSections: [
    { heading: "Por qué una hoja ayuda pero no es la respuesta final", paragraphs: ["Los compradores internacionales suelen descubrir productos chinos mediante capturas, nombres cortos o publicaciones difíciles de buscar. Una hoja temática agrupa esos hallazgos y añade el enlace exacto, ahorrando tiempo.", "La hoja sigue siendo un índice. La tarjeta ayuda a descubrir y comparar, pero no garantiza stock, variante o precio actual. Después de preseleccionar, verifica siempre la página en vivo."] },
    { heading: "Empezar con una búsqueda concreta", paragraphs: ["Define tipo, uso, detalle esencial, talla o color antes de buscar. Usa un modelo concreto para resultados precisos o una categoría para comparar alternativas.", "La búsqueda de KameyMall Sheet envía la palabra a la página real de resultados de la base principal. Buscar Nike abre resultados de Nike, no una página general igual para todas las consultas."] },
    { heading: "Usar categorías para reducir falsos resultados", paragraphs: ["Las categorías ayudan cuando un producto aparece con nombres distintos. Hoodie, sudadera, jersey y manga larga pueden describir artículos relacionados que se comparan mejor dentro de una colección.", "La URL también debe funcionar. Sudaderas utiliza la colección Hoodies and Sweaters; las demás categorías tienen sus propios destinos verificados."] },
    { heading: "Leer la tarjeta como preselección", paragraphs: ["Una tarjeta útil incluye nombre, categoría, moneda, conversión, referencia, imagen y enlace. Facilita comparar y volver al mismo producto.", "El USD es aproximado. El cambio, el precio CNY, el envío nacional, servicio, pago, embalaje y transporte internacional pueden modificar el total."] },
    { heading: "Verificar el listado antes de pagar", paragraphs: ["Abre la página y revisa precio, fotos, variantes y notas. En ropa compara medidas; en electrónica confirma modelo, accesorios, compatibilidad y límites de batería.", "Comprueba que la opción seleccionada coincida con la galería. Si falta un dato decisivo, pregunta antes de pagar."] },
    { heading: "Entre compra y envío internacional", paragraphs: ["El flujo de un agente suele separar el pedido del producto y el paquete internacional. El vendedor entrega primero al almacén, donde se registra, inspecciona y prepara.", "Esta etapa permite revisar fotos, color, talla y cantidad. El peso y las medidas reales mejoran la estimación de envío."] },
    { heading: "Construir el presupuesto por capas", paragraphs: ["Anota por separado producto, envío nacional, servicio, opciones de inspección o embalaje y transporte internacional. Así entiendes cada parte del total.", "El transporte puede usar peso real o volumétrico. Consolidar reduce algunos cargos repetidos, pero cambia peso, valor y posibles efectos aduaneros."] },
    { heading: "Inspección y entrega también son calidad", paragraphs: ["La calidad incluye variante correcta, estado visible, protección y una ruta compatible. Un objeto frágil puede necesitar más protección; uno voluminoso, menos embalaje comercial.", "Antes del envío verifica dirección, contenido, restricciones, seguro y plazo. Conserva registros para cualquier consulta."] },
    { heading: "Una lista repetible", paragraphs: ["El proceso fiable es: definir la necesidad, buscar o abrir categoría, preseleccionar, verificar, separar costes, revisar almacén y elegir envío con los datos reales.", "No elimina todo riesgo, pero evita enlaces rotos, variantes erróneas, expectativas irreales y decisiones de envío sin peso o restricciones.", "Conserva las pruebas ligadas a cada decisión. Guarda la URL del producto y la opción elegida, anota el precio visible al enviar el pedido y conserva la inspección del almacén y las medidas del paquete. Si el vendedor cambia el listado o una estimación de ruta varía, esos registros permiten identificar qué cambió. También mantienen honestos los artículos de opinión: un plazo de entrega o un precio de transporte personal puede contarse como una experiencia fechada, pero nunca como el resultado permanente de todos los compradores."], bullets: ["Usa una palabra concreta o la categoría correcta.", "Confirma enlace y referencia.", "Revisa precio, variante, talla y notas.", "Separa precio y coste entregado.", "Controla fotos, peso y medidas.", "Compara restricciones, protección y plazo."] },
  ],
};

longFormTranslations.it = {
  guideSections: [
    [
      { heading: "1. Parti da un’esigenza concreta", paragraphs: ["Definisci tipo di prodotto, uso o dettaglio importante. Un intento preciso rende più semplice confrontare inserzioni davvero equivalenti.", "Usa le categorie per esplorare. Se conosci marca, modello, capo o parola chiave, usa la ricerca principale."] },
      { heading: "2. Confronta le informazioni visibili", paragraphs: ["Il foglio mostra nome, categoria, prezzo CNY di riferimento, conversione USD indicativa e link diretto. Serve a creare una selezione, non a decidere definitivamente.", "Prodotti simili possono cambiare per materiale, taglia, versione o venditore. Apri entrambe le destinazioni prima di scegliere solo per prezzo."] },
      { heading: "3. Verifica l’inserzione di destinazione", paragraphs: ["Controlla prezzo attuale, varianti, foto, misure e note. Non sostituire un dato mancante con un’ipotesi.", "Salva link o riferimento per tornare alla stessa inserzione senza confonderla con un’immagine simile."] },
      { heading: "4. Pianifica il costo completo", paragraphs: ["Aggiungi spedizione nazionale, servizio, conversione del pagamento, imballaggio e trasporto internazionale. La semplice conversione prodotto non li include.", "Usa foto, peso e misure del magazzino come seconda verifica prima della spedizione internazionale."] },
    ],
    [
      { heading: "Cosa rappresenta il prezzo della scheda", paragraphs: ["Il valore USD è la conversione trasparente del prezzo CNY e facilita il confronto in una valuta familiare.", "Non è un preventivo e non blocca cambio o prezzo venditore. Riapri la destinazione prima di pagare."] },
      { heading: "Costi prima del magazzino", paragraphs: ["Spedizione nazionale, servizio e conversione del pagamento possono essere aggiunti nell’ordine. La struttura dipende dal servizio scelto.", "Una promozione può ridurre una voce senza cambiare le altre; confronta il checkout completo."] },
      { heading: "Costi legati al pacco", paragraphs: ["Il trasporto internazionale dipende da destinazione, linea, peso reale o volumetrico, imballaggio e restrizioni. I dati finali del magazzino sono più affidabili di una stima iniziale.", "Togliere imballaggio riduce il volume; aggiungere protezione può aumentare il peso. Decidi in base a fragilità e valore."] },
      { heading: "Un confronto migliore", paragraphs: ["Separa prezzo prodotto, subtotale prima della spedizione e stima consegnata. Così un articolo economico non nasconde un profilo di spedizione costoso.", "Usa le stesse ipotesi di destinazione, peso e velocità. Confronti su basi diverse sono fuorvianti."] },
    ],
    [
      { heading: "Identità dell’inserzione", paragraphs: ["Conferma titolo, foto, colore, modello e versione. Miniature simili possono indicare materiali o confezioni diverse.", "Controlla riferimento e link diretto quando riapri un prodotto salvato."] },
      { heading: "Taglia e variante", paragraphs: ["Leggi le misure e non soltanto lettere come M o L. Verifica se la variante cambia prezzo e se include gli accessori in foto.", "Se manca un dato essenziale, chiedi prima di ordinare invece di accettare l’opzione predefinita."] },
      { heading: "Prezzo e restrizioni", paragraphs: ["Conferma prezzo CNY e spedizione nazionale. Batterie, liquidi, marchi e articoli ingombranti possono limitare le linee.", "Un prodotto ordinabile non è automaticamente accettato da ogni rotta internazionale."] },
      { heading: "Controllo in magazzino", paragraphs: ["Confronta foto con colore, taglia e quantità. Cerca danni visibili, variante sbagliata o difetti evidenti.", "Aggiorna la stima con peso e dimensioni misurati prima di inviare il pacco."] },
    ],
  ],
  articleSections: [
    { heading: "Perché il foglio è utile ma non è la risposta finale", paragraphs: ["Gli acquirenti internazionali scoprono spesso prodotti cinesi tramite screenshot, nomi brevi o post difficili da cercare. Un foglio tematico raggruppa i prodotti e aggiunge il link esatto, riducendo il tempo di ricerca.", "Il foglio resta un indice. La scheda aiuta a scoprire e confrontare, ma non garantisce stock, variante o prezzo attuale. Dopo la selezione verifica sempre la pagina live."] },
    { heading: "Inizia con una ricerca concreta", paragraphs: ["Definisci tipo, uso, dettaglio essenziale, taglia o colore. Cerca il modello per risultati mirati oppure usa una categoria per confrontare alternative.", "La ricerca KameyMall Sheet passa la parola alla vera pagina risultati del database principale. Cercare Nike apre risultati Nike, non la stessa pagina generale per ogni query."] },
    { heading: "Riduci i risultati errati con le categorie", paragraphs: ["Le categorie aiutano quando i nomi sono tradotti in modi diversi. Hoodie, felpa, pullover e manica lunga possono descrivere articoli correlati più facili da confrontare in una raccolta.", "Anche il link deve funzionare. Felpe usa la raccolta Hoodies and Sweaters; le altre categorie hanno destinazioni verificate."] },
    { heading: "Leggi la scheda come una preselezione", paragraphs: ["Una buona scheda mostra nome, categoria, valuta, conversione, riferimento, immagine e link. Rende il confronto più rapido e permette di ritrovare lo stesso articolo.", "L’USD è indicativo. Cambio, prezzo CNY, spedizione nazionale, servizio, pagamento, imballaggio e trasporto internazionale possono cambiare il totale."] },
    { heading: "Verifica l’inserzione prima di pagare", paragraphs: ["Apri la pagina e controlla prezzo, foto, varianti e note. Per l’abbigliamento confronta misure reali; per l’elettronica verifica modello, accessori, compatibilità e regole sulle batterie.", "Assicurati che la variante scelta corrisponda alla galleria. Se manca un dato decisivo, chiedi prima del pagamento."] },
    { heading: "Tra acquisto e spedizione internazionale", paragraphs: ["Il flusso di un agente separa spesso l’ordine prodotto dal pacco internazionale. Il venditore spedisce prima al magazzino, che registra, controlla e prepara.", "Questa fase permette di confrontare foto, colore, taglia e quantità. Peso e dimensioni reali migliorano la stima di spedizione."] },
    { heading: "Costruisci il budget per livelli", paragraphs: ["Annota separatamente prodotto, spedizione nazionale, servizio, opzioni di controllo o imballaggio e trasporto internazionale. Ogni parte del totale resta chiara.", "Il trasporto può usare peso reale o volumetrico. Consolidare riduce alcuni costi ripetuti ma cambia peso, valore e possibili effetti doganali."] },
    { heading: "Ispezione e consegna fanno parte della qualità", paragraphs: ["Qualità significa variante corretta, stato visibile, protezione e rotta compatibile. Un articolo fragile richiede più protezione; uno voluminoso può beneficiare di meno confezione commerciale.", "Prima dell’invio verifica indirizzo, contenuto, restrizioni, assicurazione e tempi. Conserva inserzione e controllo per eventuali richieste."] },
    { heading: "Una checklist ripetibile", paragraphs: ["Il processo affidabile è: definire il bisogno, cercare o aprire la categoria, selezionare, verificare, separare i costi, controllare il magazzino e scegliere la spedizione con dati reali.", "Non elimina ogni rischio, ma evita link rotti, varianti errate, aspettative di prezzo irreali e spedizioni scelte senza peso o restrizioni.", "Conserva le prove legate a ogni decisione. Salva l’URL del prodotto e la variante scelta, annota il prezzo visibile al momento dell’ordine e conserva il controllo del magazzino e le misure del pacco. Se il venditore modifica l’inserzione o cambia una stima di rotta, questi dati permettono di capire cosa è cambiato. Rendono onesto anche un articolo di recensione: un tempo di consegna o un costo di trasporto personale può essere riportato come esperienza datata, mai come risultato permanente per tutti gli acquirenti."], bullets: ["Usa una parola precisa o la categoria corretta.", "Conferma link e riferimento.", "Controlla prezzo, variante, taglia e note.", "Separa prezzo e costo consegnato.", "Verifica foto, peso e dimensioni.", "Confronta restrizioni, protezione e tempi."] },
  ],
};

longFormTranslations.pl = {
  guideSections: [
    [
      { heading: "1. Zacznij od konkretnej potrzeby", paragraphs: ["Określ typ produktu, zastosowanie lub ważny szczegół. Precyzyjny cel ułatwia porównanie rzeczywiście podobnych ofert.", "Kategorie służą do odkrywania. Jeśli znasz markę, model, rodzaj ubrania lub słowo kluczowe, użyj głównej wyszukiwarki."] },
      { heading: "2. Porównaj widoczne informacje", paragraphs: ["Arkusz pokazuje nazwę, kategorię, cenę CNY, orientacyjne USD i bezpośredni link. Te dane tworzą krótką listę, a nie końcową decyzję.", "Podobne produkty mogą różnić się materiałem, rozmiarem, wersją lub sprzedawcą. Otwórz obie strony przed wyborem tylko na podstawie ceny."] },
      { heading: "3. Zweryfikuj ofertę docelową", paragraphs: ["Sprawdź bieżącą cenę, warianty, zdjęcia, wymiary i uwagi. Brakującej informacji nie zastępuj założeniem.", "Zapisz link lub numer referencyjny, aby wrócić do tej samej oferty i nie pomylić jej z podobnym zdjęciem."] },
      { heading: "4. Zaplanuj pełny koszt", paragraphs: ["Dodaj wysyłkę krajową, obsługę, przewalutowanie, pakowanie i transport międzynarodowy. Proste przeliczenie ceny ich nie obejmuje.", "Zdjęcia, waga i wymiary z magazynu są drugim punktem kontroli przed wysłaniem paczki."] },
    ],
    [
      { heading: "Co oznacza cena na karcie", paragraphs: ["Wartość USD jest przejrzystym przeliczeniem ceny CNY i ułatwia porównanie w znanej walucie.", "Nie jest ofertą wiążącą i nie blokuje kursu ani ceny sprzedawcy. Przed płatnością otwórz stronę ponownie."] },
      { heading: "Koszty przed magazynem", paragraphs: ["Wysyłka do magazynu, obsługa i przewalutowanie mogą dojść podczas zamówienia. Struktura zależy od wybranej usługi.", "Promocja może obniżyć jedną pozycję bez zmiany pozostałych, dlatego porównuj cały koszyk."] },
      { heading: "Koszty zależne od paczki", paragraphs: ["Transport międzynarodowy zależy od kraju, linii, wagi rzeczywistej lub objętościowej, opakowania i ograniczeń. Dane magazynowe są dokładniejsze od wczesnej estymacji.", "Usunięcie opakowania zmniejsza objętość, a dodatkowa ochrona może zwiększyć wagę. Decyduj według kruchości i wartości."] },
      { heading: "Lepsza metoda porównania", paragraphs: ["Oddziel cenę produktu, sumę przed wysyłką i koszt dostarczony. Tani produkt nie ukryje wtedy drogiego profilu transportowego.", "Porównuj przy tych samych założeniach dotyczących celu, wagi i szybkości. Różne podstawy fałszują wynik."] },
    ],
    [
      { heading: "Tożsamość oferty", paragraphs: ["Potwierdź tytuł, zdjęcia, kolor, model i wersję. Podobne miniatury mogą oznaczać inny materiał lub zestaw.", "Przy powrocie do zapisanego produktu sprawdź numer i bezpośredni link."] },
      { heading: "Rozmiar i wariant", paragraphs: ["Czytaj wymiary, nie tylko litery M lub L. Sprawdź, czy wariant zmienia cenę i czy obejmuje pokazane akcesoria.", "Gdy brakuje ważnej informacji, zapytaj przed zamówieniem zamiast wybierać opcję domyślną."] },
      { heading: "Cena i ograniczenia", paragraphs: ["Potwierdź cenę CNY i wysyłkę krajową. Baterie, płyny, marki i duże produkty mogą ograniczać linie.", "Możliwość zamówienia nie oznacza akceptacji przez każdą trasę międzynarodową."] },
      { heading: "Kontrola magazynowa", paragraphs: ["Porównaj zdjęcia z kolorem, rozmiarem i ilością. Szukaj uszkodzeń, złego wariantu lub oczywistych wad.", "Przelicz wysyłkę z użyciem zmierzonej wagi i wymiarów przed złożeniem paczki."] },
    ],
  ],
  articleSections: [
    { heading: "Dlaczego arkusz pomaga, ale nie jest ostateczną odpowiedzią", paragraphs: ["Kupujący za granicą często odkrywają chińskie produkty przez zrzuty, krótkie nazwy lub posty trudne do wyszukania. Tematyczny arkusz grupuje znaleziska i dodaje dokładny link, oszczędzając czas.", "Arkusz pozostaje indeksem. Karta pomaga odkryć i porównać, lecz nie gwarantuje stanu, wariantu ani bieżącej ceny. Po wyborze zawsze sprawdź stronę na żywo."] },
    { heading: "Zacznij od konkretnego wyszukiwania", paragraphs: ["Określ typ, zastosowanie, ważny szczegół, rozmiar lub kolor. Model daje precyzyjne wyniki, a kategoria pozwala porównać alternatywy.", "Wyszukiwarka KameyMall Sheet przekazuje słowo do prawdziwej strony wyników głównej bazy. Zapytanie Nike otwiera produkty Nike, a nie ogólną stronę dla każdej frazy."] },
    { heading: "Kategorie ograniczają błędne wyniki", paragraphs: ["Kategorie pomagają, gdy produkt ma różne nazwy. Hoodie, bluza, sweter i longsleeve mogą opisywać zbliżone artykuły łatwiejsze do porównania w jednej kolekcji.", "Link także musi działać. Bluzy prowadzą do kolekcji Hoodies and Sweaters, a pozostałe kategorie mają sprawdzone własne adresy."] },
    { heading: "Traktuj kartę jako krótką listę", paragraphs: ["Dobra karta zawiera nazwę, kategorię, walutę, przeliczenie, numer, zdjęcie i link. Przyspiesza porównanie i pozwala wrócić do tego samego produktu.", "USD jest orientacyjne. Kurs, cena CNY, wysyłka krajowa, obsługa, płatność, pakowanie i transport międzynarodowy mogą zmienić sumę."] },
    { heading: "Sprawdź ofertę przed płatnością", paragraphs: ["Otwórz stronę i sprawdź cenę, zdjęcia, warianty i uwagi. Przy ubraniach porównaj wymiary; przy elektronice model, akcesoria, zgodność i reguły baterii.", "Upewnij się, że wybrany wariant odpowiada galerii. Jeśli brakuje ważnego szczegółu, zapytaj przed zapłatą."] },
    { heading: "Między zakupem a wysyłką międzynarodową", paragraphs: ["Proces agenta zwykle rozdziela zamówienie produktu i paczkę międzynarodową. Sprzedawca najpierw wysyła do magazynu, który rejestruje, kontroluje i przygotowuje przesyłkę.", "Ten etap umożliwia sprawdzenie zdjęć, koloru, rozmiaru i ilości. Rzeczywista waga i wymiary poprawiają kalkulację transportu."] },
    { heading: "Buduj budżet warstwami", paragraphs: ["Zapisuj osobno produkt, wysyłkę krajową, obsługę, kontrolę lub pakowanie i transport międzynarodowy. Każda część sumy pozostaje czytelna.", "Transport może zależeć od wagi rzeczywistej lub objętościowej. Konsolidacja zmniejsza powtarzane opłaty, ale zmienia wagę, wartość i możliwe skutki celne."] },
    { heading: "Kontrola i dostawa są częścią jakości", paragraphs: ["Jakość oznacza właściwy wariant, widoczny stan, ochronę i zgodną trasę. Delikatny przedmiot wymaga większej ochrony, a duży może skorzystać z usunięcia opakowania handlowego.", "Przed wysyłką sprawdź adres, zawartość, ograniczenia, ubezpieczenie i czas. Zachowaj zapisy oferty i kontroli."] },
    { heading: "Powtarzalna lista kontrolna", paragraphs: ["Niezawodny proces to: określić potrzebę, wyszukać lub otworzyć kategorię, wybrać, zweryfikować, rozdzielić koszty, sprawdzić magazyn i wybrać wysyłkę na prawdziwych danych.", "Nie usuwa całego ryzyka, ale zapobiega błędnym linkom, wariantom, nierealnym cenom i wysyłce wybranej bez wagi lub ograniczeń.", "Zachowuj dowody związane z każdą decyzją. Zapisz adres produktu i wybrany wariant, zanotuj cenę widoczną przy składaniu zamówienia oraz przechowaj kontrolę magazynową i wymiary paczki. Gdy sprzedawca zmieni ofertę albo wycena linii wzrośnie lub spadnie, zapisy pokażą, co dokładnie się zmieniło. Dzięki nim także artykuł z opinią pozostaje uczciwy: osobisty czas dostawy lub koszt transportu można opisać jako datowane doświadczenie, ale nie jako stały wynik dla każdego kupującego."], bullets: ["Użyj konkretnego słowa lub właściwej kategorii.", "Potwierdź link i numer referencyjny.", "Sprawdź cenę, wariant, rozmiar i uwagi.", "Oddziel cenę produktu od kosztu dostawy.", "Kontroluj zdjęcia, wagę i wymiary.", "Porównaj ograniczenia, ochronę i czas."] },
  ],
};

function localizeLongPages(copy: SiteCopy, locale: Locale) {
  if (locale === "en") return;
  const labels: Record<Locale, { backGuides: string; backArticles: string; home: string; products: string; note: string; footer: string; copyright: string; updated: string; read: string; articleLabel: string; articleTitle: string; articleIntro: string; takeaway: string; takeawayBody: string }> = {
    en: { backGuides: "", backArticles: "", home: "", products: "", note: "", footer: "", copyright: "", updated: "", read: "", articleLabel: "", articleTitle: "", articleIntro: "", takeaway: "", takeawayBody: "" },
    de: { backGuides: "Zurück zu allen Ratgebern", backArticles: "Zurück zu SEO-Artikeln", home: "Startseite", products: "Gesamte Produktdatenbank durchsuchen", note: "Vor der Bestellung immer Live-Preis, Varianten und Versandfähigkeit auf der Zielseite prüfen.", footer: "Ein unabhängiger Produktsuch-Ratgeber. Wir verkaufen, bezahlen oder versenden keine Produkte. Prüfe veränderliche Angaben auf der Zielseite.", copyright: "© 2026 KameyMall Sheet. Unabhängiger Einkaufsratgeber.", updated: "Aktualisiert August 2026", read: "12 Minuten Lesezeit", articleLabel: "Reverse-Shopping-Ratgeber 2026", articleTitle: "KameyMall Spreadsheet Guide für Käufer im Ausland", articleIntro: "Die Tabelle als Recherchewerkzeug nutzen, Live-Angebote prüfen, Lagerabläufe verstehen und internationale Bestellungen realistisch planen.", takeaway: "Das praktische Fazit", takeawayBody: "Nutze KameyMall Sheet zum Finden und Ordnen. Für die Entscheidung zählen anschließend Live-Produktseite und Lagerdaten." },
    fr: { backGuides: "Retour à tous les guides", backArticles: "Retour aux articles SEO", home: "Accueil", products: "Rechercher dans toute la base", note: "Vérifiez toujours le prix, les variantes et l’éligibilité d’expédition sur la page de destination.", footer: "Guide indépendant de découverte. Nous ne vendons, n’encaissons ni n’expédions de produits. Vérifiez les informations variables à destination.", copyright: "© 2026 KameyMall Sheet. Guide d’achat indépendant.", updated: "Mis à jour en août 2026", read: "12 minutes de lecture", articleLabel: "Guide reverse shopping 2026", articleTitle: "Guide KameyMall Spreadsheet pour les acheteurs internationaux", articleIntro: "Utiliser la feuille comme outil de recherche, vérifier l’annonce, comprendre l’entrepôt et planifier une commande internationale.", takeaway: "À retenir", takeawayBody: "Utilisez KameyMall Sheet pour découvrir et organiser, puis la fiche en direct et le dossier d’entrepôt pour décider." },
    es: { backGuides: "Volver a todas las guías", backArticles: "Volver a artículos SEO", home: "Inicio", products: "Buscar en toda la base", note: "Confirma siempre precio, variantes y elegibilidad de envío en la página de destino.", footer: "Guía independiente de descubrimiento. No vendemos, cobramos ni enviamos productos. Verifica la información cambiante en el destino.", copyright: "© 2026 KameyMall Sheet. Guía de compra independiente.", updated: "Actualizado en agosto de 2026", read: "12 minutos de lectura", articleLabel: "Guía de compra inversa 2026", articleTitle: "Guía KameyMall Spreadsheet para compradores internacionales", articleIntro: "Usa la hoja para investigar, verifica el listado, comprende el almacén y planifica el pedido internacional.", takeaway: "Conclusión práctica", takeawayBody: "Usa KameyMall Sheet para descubrir y organizar; decide con la ficha en vivo y los datos del almacén." },
    it: { backGuides: "Torna a tutte le guide", backArticles: "Torna agli articoli SEO", home: "Home", products: "Cerca nell’intero database", note: "Conferma sempre prezzo, varianti e idoneità alla spedizione sulla pagina di destinazione.", footer: "Guida indipendente alla scoperta. Non vendiamo, incassiamo o spediamo prodotti. Verifica le informazioni variabili sulla destinazione.", copyright: "© 2026 KameyMall Sheet. Guida indipendente.", updated: "Aggiornato ad agosto 2026", read: "12 minuti di lettura", articleLabel: "Guida reverse shopping 2026", articleTitle: "Guida KameyMall Spreadsheet per acquirenti internazionali", articleIntro: "Usa il foglio per la ricerca, verifica l’inserzione, comprendi il magazzino e pianifica l’ordine internazionale.", takeaway: "Conclusione pratica", takeawayBody: "Usa KameyMall Sheet per scoprire e organizzare; decidi con la pagina live e i dati di magazzino." },
    pl: { backGuides: "Wróć do poradników", backArticles: "Wróć do artykułów SEO", home: "Strona główna", products: "Przeszukaj całą bazę", note: "Zawsze potwierdź cenę, warianty i możliwość wysyłki na stronie docelowej.", footer: "Niezależny poradnik odkrywania produktów. Nie sprzedajemy, nie pobieramy płatności ani nie wysyłamy. Sprawdź zmienne dane na stronie docelowej.", copyright: "© 2026 KameyMall Sheet. Niezależny poradnik.", updated: "Aktualizacja: sierpień 2026", read: "12 minut czytania", articleLabel: "Poradnik zakupów odwrotnych 2026", articleTitle: "KameyMall Spreadsheet dla kupujących za granicą", articleIntro: "Używaj arkusza do analizy, sprawdzaj ofertę, poznaj proces magazynowy i planuj wysyłkę.", takeaway: "Praktyczny wniosek", takeawayBody: "Użyj KameyMall Sheet do odkrywania i porządkowania, a decyzję oprzyj na ofercie live i danych magazynu." },
  };
  const value = labels[locale];
  copy.common = { home: value.home, backToGuides: value.backGuides, backToArticles: value.backArticles, openProducts: value.products, verifyNote: value.note };
  copy.footer = { notice: value.footer, copyright: value.copyright };
  copy.articlePage.label = value.articleLabel;
  copy.articlePage.title = value.articleTitle;
  copy.articlePage.intro = value.articleIntro;
  copy.articlePage.updated = value.updated;
  copy.articlePage.readTime = value.read;
  copy.articlePage.conclusionTitle = value.takeaway;
  copy.articlePage.conclusion = value.takeawayBody;

  const guideLabels = [copy.guides.cards[0], copy.guides.cards[1], copy.guides.cards[2]];
  const guideKeys = ["guides/how-to-use-kameymall-spreadsheet", "guides/cny-price-vs-final-cost", "guides/what-to-inspect-before-ordering"];
  const longForm = longFormTranslations[locale];
  guideKeys.forEach((key, index) => {
    const page = copy.guidePages[key];
    page.label = guideLabels[index].label;
    page.title = guideLabels[index].title;
    page.intro = guideLabels[index].body;
    if (longForm) page.sections = longForm.guideSections[index];
  });
  if (longForm) copy.articlePage.sections = longForm.articleSections;
}

for (const [locale, copy] of Object.entries({ de: german, fr: french, es: spanish, it: italian, pl: polish }) as Array<[Locale, SiteCopy]>) {
  Object.assign(copy.pageIntros, localizedPageIntros[locale]);
  copy.pageIntros["guides/how-to-use-kameymall-spreadsheet"] = { kicker: copy.guides.cards[0].label, title: copy.guides.cards[0].title, intro: copy.guides.cards[0].body };
  copy.pageIntros["guides/cny-price-vs-final-cost"] = { kicker: copy.guides.cards[1].label, title: copy.guides.cards[1].title, intro: copy.guides.cards[1].body };
  copy.pageIntros["guides/what-to-inspect-before-ordering"] = { kicker: copy.guides.cards[2].label, title: copy.guides.cards[2].title, intro: copy.guides.cards[2].body };
  copy.pageIntros["articles/kameymall-spreadsheet-guide-2026"] = { kicker: copy.articles.cards[0].label, title: copy.articles.cards[0].title, intro: copy.articles.cards[0].body };
  localizeLongPages(copy, locale);
}

type ResearchUiUpdate = {
  how: SiteCopy["how"];
  guides: SiteCopy["guides"];
  faq: SiteCopy["faq"];
  articles: SiteCopy["articles"];
  warehouseGuide: { label: string; title: string; intro: string; sections: ProseSection[] };
  firstArticle: { sourceNote: string; primaryKeyword: string; seoTitle: string; seoDescription: string };
};

const researchUiUpdates: Partial<Record<Locale, ResearchUiUpdate>> = {
  de: {
    how: { kicker: "So kaufst du", title: "So funktioniert der Agenten-Einkauf", intro: "Dieser sechsstufige Ablauf folgt KameyMalls veröffentlichten Einkaufsinformationen. Zeitangaben und Verfügbarkeit müssen bei der Bestellung live geprüft werden.", action: "Alle Produktfundstücke ansehen", steps: [
      { title: "Produkt finden oder Link einfügen", body: "Laut Tutorial kann man einen Produktlink einfügen oder nach Namen suchen. Prüfe Titel, Verkäufer, Optionen und Bilder des importierten Ergebnisses." },
      { title: "Bestelldaten senden", body: "Wähle Farbe, Größe und Menge. Wenn das Angebot nicht korrekt eingelesen wird, nutze das veröffentlichte manuelle Agentenformular." },
      { title: "Artikelstufe bezahlen", body: "Die erste Zahlung umfasst laut Anleitung Artikel und chinesische Inlandszustellung. Internationale Fracht folgt erst nach dem Lager." },
      { title: "Agentenkauf und Verkäuferlieferung verfolgen", body: "Die FAQ nennt für normalen Verkäuferversand häufig 1–7 Tage; Vorbestellungen können länger benötigen." },
      { title: "QC-Fotos und Lager prüfen", body: "Vergleiche nach Ankunft Farbe, Größe, Menge und sichtbaren Zustand mit der Bestellung." },
      { title: "Internationales Paket absenden", body: "Wähle eingelagerte Artikel, eine zulässige Route sowie Verpackungs- oder Versicherungsoptionen. Nicht jede Ware ist für jede Linie geeignet." },
    ] },
    guides: { kicker: "Praktische Ratgeber", title: "Mit besseren Informationen einkaufen", intro: "Quellenbasierte Hilfe zu Produktprüfung, zweistufigen Kosten sowie QC-, Lager- und Rückgabefragen.", cards: [
      { label: "Start", title: "Eine KameyMall-Tabelle verwenden", body: "Fundstück auswählen, Live-Angebot prüfen und dem veröffentlichten Agentenablauf bis zum Paket folgen.", action: "Kaufablauf lesen" },
      { label: "Kostenplanung", title: "CNY-Preis und gelieferte Endkosten", body: "Artikel und Inlandslieferung von Lageroptionen und internationaler Fracht trennen.", action: "Kostenratgeber öffnen" },
      { label: "Lagerprüfung", title: "QC-Fotos, Lagerung und Rückgabe", body: "Fotos zeitnah prüfen: Die öffentliche FAQ nennt 90 kostenlose Lagertage, aber keine Rückgabe nach mehr als fünf Lagertagen.", action: "Lager-Checkliste öffnen" },
    ] },
    faq: { kicker: "FAQ", title: "Klare, überprüfbare Antworten", intro: "Die Antworten unterscheiden Fakten des unabhängigen Guides von veröffentlichten Plattformregeln, die sich ändern können.", items: [
      { question: "Was ist eine KameyMall-Tabelle?", answer: "Ein unabhängiger Produktindex, der China-Fundstücke ordnet und vor dem Öffnen der passenden Produktseite einen Vergleich erleichtert." },
      { question: "Ist dies die offizielle KameyMall-Website?", answer: "Nein. KameyMall Sheet ist ein unabhängiger Recherche- und Entdeckungsratgeber und verkauft, bezahlt, lagert oder versendet keine Produkte." },
      { question: "Wie beginnt der veröffentlichte Kaufablauf?", answer: "Man fügt einen Produktlink ein oder sucht nach Namen, wählt Optionen und bezahlt Artikel plus chinesischen Inlandsversand." },
      { question: "Welche Quellplattformen werden genannt?", answer: "Das Tutorial nennt Taobao, Tmall und JD.com; die Agentenübersicht zusätzlich Weidian und 1688. Importierte Daten müssen geprüft werden." },
      { question: "Welche Zahlungsarten werden öffentlich genannt?", answer: "Unter anderem Visa, Mastercard, PayPal und Alipay; das Detailtutorial nennt zusätzlich WeChat, chinesische Debitkarten und Banküberweisung. Maßgeblich ist der Live-Checkout." },
      { question: "Sind die USD-Preise gelieferte Endpreise?", answer: "Nein. Es sind ungefähre Umrechnungen des CNY-Artikels. Inlandslieferung, Zahlung, Verpackung, Fracht, Steuer und Zoll können hinzukommen." },
      { question: "Was geschieht im Lager?", answer: "Nach veröffentlichtem Ablauf wird der Artikel geprüft, fotografiert und gelagert. Vergleiche QC-Fotos mit Farbe, Größe, Menge und sichtbarem Zustand." },
      { question: "Wie lange ist die Lagerung?", answer: "Eine öffentliche FAQ nennt 180 Tage insgesamt, bis zu 90 kostenlos und verlängerte Lagerung für 10 RMB pro Monat. Prüfe den aktuellen Account-Countdown." },
      { question: "Kann jeder Artikel zurückgegeben werden?", answer: "Nein. Es gibt ausgeschlossene Kategorien und Verkäuferregeln; laut FAQ wird nach mehr als fünf Tagen im Lager keine Rückgabe unterstützt." },
      { question: "Kann jeder Artikel jede Versandlinie nutzen?", answer: "Nein. Die Paketanleitung weist auf produktabhängige Linienbeschränkungen hin. Prüfe die Live-Auswahl für Ziel, Ware und Paket." },
      { question: "Führen Produkt- und Kategorienbuttons dieser Website nach außen?", answer: "Produkt-, Kategorie- und Suchaktionen führen nur zu den passenden Seiten der ausgewählten Zieldatenbank. Navigation, Ratgeber, Artikel und FAQ bleiben innerhalb von KameyMall Sheet." },
    ] },
    articles: { kicker: "SEO-Bibliothek für Reverse Shopping", title: "Faktengeprüfte KameyMall-Artikel", intro: "Originale Langformtexte für Suche, Einkaufsablauf und Kostenplanung, mit klarer Trennung zwischen Plattformangaben und Nutzerberichten.", read: "Artikel lesen", cards: [
      { label: "Ratgeber 2026", title: "KameyMall Spreadsheet Guide für Käufer im Ausland", body: "Von der Produktsuche über Live-Prüfung und QC bis zur Versandplanung.", action: "Vollständigen Artikel lesen" },
      { label: "Kaufmethode", title: "So kaufst du 2026 über KameyMall", body: "Produktlink, Bestellung, Zahlung, Verkäuferstatus, QC, Lager und Paket faktengeprüft erklärt.", action: "Einkaufsratgeber lesen" },
      { label: "Kostenplanung", title: "KameyMall Versandkosten 2026", body: "CNY-Preis, Inlandslieferung, Lagermaße, Verpackung und internationale Fracht getrennt verstehen.", action: "Versandratgeber lesen" },
    ] },
    warehouseGuide: { label: "Lagerprüfung", title: "QC-Fotos, Lagerung und Rückgabe", intro: "Nutze den Lagerzeitpunkt schnell und bewusst. Grundlage sind die am 3. August 2026 geprüften öffentlichen Informationen.", sections: [
      { heading: "Was QC-Fotos zeigen", paragraphs: ["Prüfe sichtbare Farbe, Menge, Größenetikett, Schäden und Zubehör anhand der Bestellung.", "Fotos beweisen keine Authentizität, versteckten Materialien, Haltbarkeit oder Passform. Frage bei unsichtbaren Details nach."] },
      { heading: "Rückgabefenster nutzen", paragraphs: ["Die FAQ nennt ausgeschlossene Kategorien, Verkäuferabhängigkeit und keine Unterstützung nach mehr als fünf Lagertagen.", "Melde konkrete Abweichungen sofort und füge Quell- oder Variantennachweise bei."] },
      { heading: "Lagerzeit richtig verstehen", paragraphs: ["Veröffentlicht sind 180 Tage insgesamt, bis zu 90 kostenlos und 10 RMB pro Verlängerungsmonat.", "Lagerzeit und Rückgabefrist sind verschieden; der Account-Countdown ist aktuell maßgeblich."] },
      { heading: "Paket vorbereiten", paragraphs: ["Nutze gemessenes Gewicht, Maße und Linienbeschränkungen.", "Wäge Verpackungsentfernung gegen Schutz ab; die FAQ warnt vor fehlender Versicherungsdeckung bei einfacher Verpackung."] },
    ] },
    firstArticle: { sourceNote: "Faktenbasis: öffentliche KameyMall-Seiten zum Einkaufsagenten-Service, zur Kaufanleitung und zu häufigen Fragen, geprüft am 3. August 2026. Plattformangaben sind keine unabhängige Garantie.", primaryKeyword: "kameymall tabelle", seoTitle: "KameyMall-Tabelle 2026: Produkte, QC und Versand", seoDescription: "Die KameyMall-Tabelle richtig nutzen: Produkte finden, aktuelle Angebote prüfen, QC-Fotos lesen, Lagerzeit planen und internationale Fracht einschätzen." },
  },
  fr: {
    how: { kicker: "Comment acheter", title: "Fonctionnement de l’achat par agent", intro: "Ce parcours en six étapes suit les informations publiques de KameyMall. Délais et disponibilité doivent être confirmés au moment de la commande.", action: "Voir tous les produits", steps: [
      { title: "Trouver ou coller le produit", body: "Le tutoriel permet de coller un lien ou rechercher un nom. Vérifiez titre, vendeur, options et photos importés." },
      { title: "Envoyer les détails", body: "Choisissez couleur, taille et quantité. Si la fiche est mal lue, utilisez le formulaire manuel publié." },
      { title: "Payer l’étape produit", body: "Le premier paiement couvre produit et livraison chinoise ; le fret international vient après l’entrepôt." },
      { title: "Suivre achat et vendeur", body: "La FAQ indique souvent 1 à 7 jours pour l’envoi vendeur ; une précommande peut demander davantage." },
      { title: "Contrôler QC et stockage", body: "Comparez couleur, taille, quantité et état visible avec la commande." },
      { title: "Soumettre le colis", body: "Choisissez articles, ligne éligible, emballage et assurance. Tous les produits ne passent pas par toutes les lignes." },
    ] },
    guides: { kicker: "Guides pratiques", title: "Acheter avec de meilleures informations", intro: "Aide fondée sur les sources pour vérifier le produit, séparer les coûts et gérer QC, stockage et retour.", cards: [
      { label: "Commencer", title: "Utiliser une feuille KameyMall", body: "Sélectionnez une trouvaille, vérifiez l’annonce puis suivez les étapes publiées jusqu’au colis.", action: "Lire le parcours" },
      { label: "Coûts", title: "Prix CNY et coût livré", body: "Séparez article et livraison chinoise des options d’entrepôt et du fret international.", action: "Lire le guide des coûts" },
      { label: "Entrepôt", title: "Photos QC, stockage et retours", body: "Contrôlez vite : la FAQ annonce 90 jours gratuits mais plus de retour après cinq jours en entrepôt.", action: "Voir la checklist" },
    ] },
    faq: { kicker: "FAQ", title: "Des réponses claires et vérifiables", intro: "Les réponses séparent le rôle de ce guide des règles publiées par la plateforme, susceptibles d’évoluer.", items: [
      { question: "Qu’est-ce qu’une feuille KameyMall ?", answer: "Un index indépendant qui organise des produits chinois et facilite la comparaison avant d’ouvrir la fiche correspondante." },
      { question: "Est-ce le site officiel de KameyMall ?", answer: "Non. KameyMall Sheet est un guide indépendant ; il ne vend, n’encaisse, ne stocke ni n’expédie." },
      { question: "Comment commence le processus publié ?", answer: "Collez un lien ou cherchez un nom, sélectionnez les options puis payez l’article et la livraison chinoise." },
      { question: "Quelles marketplaces sont citées ?", answer: "Le tutoriel cite Taobao, Tmall et JD.com ; la présentation ajoute Weidian et 1688. Vérifiez toute importation." },
      { question: "Quels paiements sont annoncés ?", answer: "Visa, Mastercard, PayPal et Alipay sont cités ; le tutoriel ajoute WeChat, cartes chinoises et virement. Le checkout en direct fait foi." },
      { question: "Le prix USD est-il livré ?", answer: "Non. C’est une conversion du CNY. Livraison chinoise, paiement, emballage, fret, taxe et douane peuvent s’ajouter." },
      { question: "Que se passe-t-il à l’entrepôt ?", answer: "Le parcours publié prévoit inspection, photos et stockage. Comparez QC avec couleur, taille, quantité et état." },
      { question: "Combien de temps pour le stockage ?", answer: "La FAQ annonce 180 jours au total, jusqu’à 90 gratuits et 10 RMB par mois d’extension. Vérifiez le compteur du compte." },
      { question: "Tout peut-il être retourné ?", answer: "Non. Certaines catégories et règles vendeur l’excluent ; la FAQ ne prend plus en charge le retour après plus de cinq jours en entrepôt." },
      { question: "Tout produit utilise-t-il toute ligne ?", answer: "Non. Les instructions signalent des restrictions par produit. Utilisez la liste live pour le pays et le colis." },
      { question: "Les boutons de produit et de catégorie quittent-ils ce site ?", answer: "Les actions produit, catégorie et recherche mènent uniquement aux pages correspondantes de la base de destination sélectionnée. La navigation, les guides, les articles et la FAQ restent dans KameyMall Sheet." },
    ] },
    articles: { kicker: "Bibliothèque SEO de reverse shopping", title: "Articles KameyMall vérifiés", intro: "Des articles originaux sur la recherche, le parcours et les coûts, distinguant déclarations officielles et témoignages.", read: "Lire l’article", cards: [
      { label: "Guide 2026", title: "Guide KameyMall Spreadsheet pour acheteurs internationaux", body: "De la découverte à la vérification QC et à la planification du transport.", action: "Lire l’article complet" },
      { label: "Méthode", title: "Comment acheter via KameyMall en 2026", body: "Lien, commande, paiement, vendeur, QC, stockage et colis expliqués avec des sources.", action: "Lire le guide d’achat" },
      { label: "Coûts", title: "Coût d’expédition KameyMall 2026", body: "Comprendre séparément CNY, livraison chinoise, mesures, emballage et fret.", action: "Lire le guide transport" },
    ] },
    warehouseGuide: { label: "Entrepôt", title: "Photos QC, stockage et retours", intro: "Utilisez l’étape d’entrepôt rapidement, selon les informations publiques vérifiées le 3 août 2026.", sections: [
      { heading: "Ce que montrent les photos QC", paragraphs: ["Contrôlez couleur, quantité, étiquette de taille, dommages et accessoires visibles.", "Elles ne prouvent ni authenticité, ni matière cachée, ni durabilité, ni coupe."] },
      { heading: "Agir dans la fenêtre de retour", paragraphs: ["La FAQ cite des exclusions, la décision vendeur et aucun retour après plus de cinq jours en entrepôt.", "Signalez immédiatement un écart précis avec la preuve de la variante."] },
      { heading: "Comprendre le stockage", paragraphs: ["Sont annoncés 180 jours au total, jusqu’à 90 gratuits et 10 RMB par mois supplémentaire.", "Stockage et retour ont des délais différents ; le compteur du compte prévaut."] },
      { heading: "Préparer le colis", paragraphs: ["Utilisez poids, dimensions et restrictions de ligne mesurés.", "Arbitrez retrait et protection ; la FAQ avertit que l’emballage simple n’est pas couvert contre les dommages."] },
    ] },
    firstArticle: { sourceNote: "Vérification : pages publiques de KameyMall consacrées au service d’agent d’achat, au tutoriel d’achat et aux questions fréquentes, consultées le 3 août 2026. Les déclarations de la plateforme ne sont pas des garanties indépendantes.", primaryKeyword: "tableur kameymall", seoTitle: "Guide du tableur KameyMall 2026 : produits, QC et envoi", seoDescription: "Utiliser le tableur KameyMall : trouver des produits, vérifier les fiches, lire les photos QC, gérer le stockage et estimer le transport." },
  },
  es: {
    how: { kicker: "Cómo comprar", title: "Cómo funciona la compra con agente", intro: "Este proceso de seis pasos sigue la información publicada por KameyMall. Confirma plazos y disponibilidad al pedir.", action: "Ver todos los productos", steps: [
      { title: "Buscar o pegar el producto", body: "El tutorial permite pegar un enlace o buscar por nombre. Revisa título, vendedor, opciones e imágenes importadas." },
      { title: "Enviar los detalles", body: "Elige color, talla y cantidad. Si la ficha no se lee bien, utiliza el formulario manual publicado." },
      { title: "Pagar la etapa del artículo", body: "El primer pago cubre producto y entrega china; el transporte internacional llega tras el almacén." },
      { title: "Seguir agente y vendedor", body: "La FAQ indica a menudo 1–7 días para el vendedor; una preventa puede tardar más." },
      { title: "Revisar QC y almacén", body: "Compara color, talla, cantidad y estado visible con el pedido." },
      { title: "Enviar el paquete", body: "Elige artículos, línea admitida, embalaje y seguro. No todo producto admite toda ruta." },
    ] },
    guides: { kicker: "Guías prácticas", title: "Compra con mejor información", intro: "Ayuda documentada para verificar productos, separar costes y gestionar QC, almacén y devoluciones.", cards: [
      { label: "Empieza aquí", title: "Cómo usar una hoja KameyMall", body: "Selecciona, verifica el listado y sigue las etapas publicadas hasta el paquete.", action: "Leer el proceso" },
      { label: "Costes", title: "Precio CNY y coste entregado", body: "Separa producto y entrega china de opciones de almacén y transporte internacional.", action: "Ver guía de costes" },
      { label: "Almacén", title: "Fotos QC, almacenamiento y devoluciones", body: "Revisa pronto: la FAQ publica 90 días gratis pero no devolución tras más de cinco días en almacén.", action: "Ver checklist" },
    ] },
    faq: { kicker: "FAQ", title: "Respuestas claras y verificables", intro: "Las respuestas separan la función de esta guía de las reglas publicadas por la plataforma.", items: [
      { question: "¿Qué es una hoja KameyMall?", answer: "Un índice independiente que ordena productos chinos y permite comparar antes de abrir la ficha correspondiente." },
      { question: "¿Es el sitio oficial de KameyMall?", answer: "No. KameyMall Sheet es una guía independiente; no vende, cobra, almacena ni envía." },
      { question: "¿Cómo empieza el proceso publicado?", answer: "Pega un enlace o busca un nombre, selecciona opciones y paga el artículo más la entrega china." },
      { question: "¿Qué marketplaces se mencionan?", answer: "El tutorial cita Taobao, Tmall y JD.com; la presentación también Weidian y 1688. Verifica los datos importados." },
      { question: "¿Qué pagos se publican?", answer: "Visa, Mastercard, PayPal y Alipay; el tutorial añade WeChat, tarjetas chinas y transferencia. Manda el checkout en vivo." },
      { question: "¿El USD es precio entregado?", answer: "No. Es una conversión CNY; pueden sumarse entrega china, pago, embalaje, flete, impuestos y aduanas." },
      { question: "¿Qué ocurre en el almacén?", answer: "El flujo publicado incluye inspección, fotos y almacenamiento. Compara QC con color, talla, cantidad y estado." },
      { question: "¿Cuánto dura el almacenamiento?", answer: "La FAQ anuncia 180 días totales, hasta 90 gratis y ampliación a 10 RMB al mes. Comprueba el contador de cuenta." },
      { question: "¿Todo puede devolverse?", answer: "No. Hay exclusiones y reglas del vendedor; la FAQ no admite devolución tras más de cinco días en almacén." },
      { question: "¿Todo producto usa toda ruta?", answer: "No. Las instrucciones señalan restricciones por producto. Usa la lista en vivo para destino y paquete." },
      { question: "¿Los botones de productos y categorías salen de este sitio?", answer: "Las acciones de producto, categoría y búsqueda solo llevan a las páginas correspondientes de la base de destino seleccionada. La navegación, las guías, los artículos y las FAQ permanecen dentro de KameyMall Sheet." },
    ] },
    articles: { kicker: "Biblioteca SEO de compra inversa", title: "Artículos KameyMall verificados", intro: "Textos originales sobre búsqueda, proceso y costes, separando declaraciones de plataforma y experiencias de usuarios.", read: "Leer artículo", cards: [
      { label: "Guía 2026", title: "Guía KameyMall Spreadsheet para compradores internacionales", body: "Desde el hallazgo hasta QC y planificación del transporte.", action: "Leer artículo completo" },
      { label: "Método", title: "Cómo comprar mediante KameyMall en 2026", body: "Enlace, pedido, pago, vendedor, QC, almacén y paquete explicados con fuentes.", action: "Leer guía de compra" },
      { label: "Costes", title: "Coste de envío KameyMall 2026", body: "Separar CNY, entrega china, medidas, embalaje y transporte internacional.", action: "Leer guía de envío" },
    ] },
    warehouseGuide: { label: "Almacén", title: "Fotos QC, almacenamiento y devoluciones", intro: "Utiliza pronto la fase de almacén con información pública revisada el 3 de agosto de 2026.", sections: [
      { heading: "Qué muestran las fotos QC", paragraphs: ["Comprueba color, cantidad, etiqueta de talla, daños y accesorios visibles.", "No prueban autenticidad, materiales ocultos, duración o ajuste."] },
      { heading: "Actuar dentro de devolución", paragraphs: ["La FAQ cita exclusiones, decisión del vendedor y no devolución tras más de cinco días.", "Informa una diferencia concreta con prueba de la variante."] },
      { heading: "Entender el almacenamiento", paragraphs: ["Se publican 180 días totales, hasta 90 gratis y 10 RMB por mes extra.", "Almacenamiento y devolución tienen plazos distintos; usa el contador de cuenta."] },
      { heading: "Preparar el paquete", paragraphs: ["Usa peso, medidas y restricciones reales.", "Equilibra retirada y protección; la FAQ advierte que el embalaje simple no cubre daños por seguro."] },
    ] },
    firstArticle: { sourceNote: "Base de verificación: páginas públicas de KameyMall sobre el servicio de agente de compras, el tutorial de compra y las preguntas frecuentes, revisadas el 3 de agosto de 2026. Las afirmaciones de la plataforma no son garantías independientes.", primaryKeyword: "hoja kameymall", seoTitle: "Guía de la hoja KameyMall 2026: productos, QC y envío", seoDescription: "Usa la hoja KameyMall: encuentra productos, verifica listados, revisa fotos QC, gestiona el almacenamiento y calcula el transporte." },
  },
  it: {
    how: { kicker: "Come acquistare", title: "Come funziona l’acquisto con agente", intro: "Questo processo in sei fasi segue le informazioni pubblicate da KameyMall. Verifica tempi e disponibilità al momento dell’ordine.", action: "Vedi tutti i prodotti", steps: [
      { title: "Trova o incolla il prodotto", body: "Il tutorial consente link o ricerca per nome. Controlla titolo, venditore, opzioni e foto importate." },
      { title: "Invia i dettagli", body: "Scegli colore, taglia e quantità. Se la scheda non viene letta bene, usa il modulo manuale pubblicato." },
      { title: "Paga la fase articolo", body: "Il primo pagamento copre articolo e consegna cinese; il trasporto internazionale segue il magazzino." },
      { title: "Segui agente e venditore", body: "La FAQ indica spesso 1–7 giorni per il venditore; i preordini possono richiedere più tempo." },
      { title: "Controlla QC e deposito", body: "Confronta colore, taglia, quantità e stato visibile con l’ordine." },
      { title: "Invia il pacco", body: "Scegli articoli, linea idonea, imballaggio e assicurazione. Non ogni prodotto usa ogni rotta." },
    ] },
    guides: { kicker: "Guide pratiche", title: "Acquista con informazioni migliori", intro: "Aiuto basato su fonti per verificare prodotti, separare costi e gestire QC, deposito e resi.", cards: [
      { label: "Inizia qui", title: "Come usare un foglio KameyMall", body: "Seleziona, verifica l’inserzione e segui le fasi pubblicate fino al pacco.", action: "Leggi il processo" },
      { label: "Costi", title: "Prezzo CNY e costo consegnato", body: "Separa prodotto e consegna cinese da opzioni di magazzino e trasporto internazionale.", action: "Apri guida costi" },
      { label: "Magazzino", title: "Foto QC, deposito e resi", body: "Controlla presto: la FAQ pubblica 90 giorni gratis ma niente reso dopo oltre cinque giorni in magazzino.", action: "Vedi checklist" },
    ] },
    faq: { kicker: "FAQ", title: "Risposte chiare e verificabili", intro: "Le risposte separano il ruolo della guida dalle regole pubblicate dalla piattaforma.", items: [
      { question: "Cos’è un foglio KameyMall?", answer: "Un indice indipendente che organizza prodotti cinesi e aiuta il confronto prima di aprire la scheda." },
      { question: "È il sito ufficiale KameyMall?", answer: "No. KameyMall Sheet è una guida indipendente e non vende, incassa, conserva o spedisce." },
      { question: "Come inizia il processo pubblicato?", answer: "Incolla un link o cerca un nome, seleziona le opzioni e paga articolo più consegna cinese." },
      { question: "Quali marketplace sono citati?", answer: "Il tutorial cita Taobao, Tmall e JD.com; la panoramica anche Weidian e 1688. Verifica i dati importati." },
      { question: "Quali pagamenti sono pubblicati?", answer: "Visa, Mastercard, PayPal e Alipay; il tutorial aggiunge WeChat, carte cinesi e bonifico. Conta il checkout live." },
      { question: "Il prezzo USD è consegnato?", answer: "No. È una conversione CNY; possono aggiungersi consegna cinese, pagamento, imballo, nolo, tasse e dogana." },
      { question: "Cosa succede in magazzino?", answer: "Il flusso pubblicato prevede ispezione, foto e deposito. Confronta QC con colore, taglia, quantità e stato." },
      { question: "Quanto dura il deposito?", answer: "La FAQ annuncia 180 giorni totali, fino a 90 gratis e 10 RMB al mese extra. Controlla il conto alla rovescia." },
      { question: "Tutto può essere restituito?", answer: "No. Esistono esclusioni e regole del venditore; dopo più di cinque giorni in magazzino il reso non è supportato." },
      { question: "Ogni prodotto usa ogni linea?", answer: "No. Le istruzioni indicano restrizioni per prodotto. Usa l’elenco live per destinazione e pacco." },
      { question: "I pulsanti di prodotti e categorie portano fuori dal sito?", answer: "Le azioni prodotto, categoria e ricerca aprono soltanto le pagine corrispondenti del database di destinazione selezionato. Navigazione, guide, articoli e FAQ restano all’interno di KameyMall Sheet." },
    ] },
    articles: { kicker: "Biblioteca SEO reverse shopping", title: "Articoli KameyMall verificati", intro: "Testi originali su ricerca, processo e costi, distinguendo dichiarazioni della piattaforma e testimonianze.", read: "Leggi articolo", cards: [
      { label: "Guida 2026", title: "Guida KameyMall Spreadsheet per acquirenti internazionali", body: "Dalla scoperta al QC e alla pianificazione del trasporto.", action: "Leggi articolo completo" },
      { label: "Metodo", title: "Come acquistare tramite KameyMall nel 2026", body: "Link, ordine, pagamento, venditore, QC, deposito e pacco spiegati con fonti.", action: "Leggi guida acquisto" },
      { label: "Costi", title: "Costo spedizione KameyMall 2026", body: "Separare CNY, consegna cinese, misure, imballo e nolo internazionale.", action: "Leggi guida spedizione" },
    ] },
    warehouseGuide: { label: "Magazzino", title: "Foto QC, deposito e resi", intro: "Usa rapidamente la fase di magazzino con informazioni pubbliche verificate il 3 agosto 2026.", sections: [
      { heading: "Cosa mostrano le foto QC", paragraphs: ["Controlla colore, quantità, etichetta taglia, danni e accessori visibili.", "Non provano autenticità, materiali nascosti, durata o vestibilità."] },
      { heading: "Agire entro il reso", paragraphs: ["La FAQ cita esclusioni, decisione del venditore e nessun reso dopo più di cinque giorni.", "Segnala subito una differenza precisa con prova della variante."] },
      { heading: "Capire il deposito", paragraphs: ["Sono pubblicati 180 giorni totali, fino a 90 gratis e 10 RMB al mese extra.", "Deposito e reso hanno scadenze diverse; vale il conto dell’account."] },
      { heading: "Preparare il pacco", paragraphs: ["Usa peso, misure e restrizioni reali.", "Bilancia rimozione e protezione; la FAQ avverte che l’imballo semplice non copre i danni."] },
    ] },
    firstArticle: { sourceNote: "Base della verifica: pagine pubbliche di KameyMall dedicate al servizio di agente d’acquisto, al tutorial d’acquisto e alle domande frequenti, consultate il 3 agosto 2026. Le dichiarazioni della piattaforma non sono garanzie indipendenti.", primaryKeyword: "foglio kameymall", seoTitle: "Guida al foglio KameyMall 2026: prodotti, QC e spedizione", seoDescription: "Usa il foglio KameyMall: trova prodotti, verifica le schede, controlla le foto QC, gestisci il deposito e pianifica il trasporto." },
  },
  pl: {
    how: { kicker: "Jak kupować", title: "Jak działa zakup przez agenta", intro: "Ten sześciostopniowy proces opiera się na opublikowanych informacjach KameyMall. Terminy i dostępność sprawdzaj przy zamówieniu.", action: "Zobacz wszystkie produkty", steps: [
      { title: "Znajdź lub wklej produkt", body: "Tutorial pozwala wkleić link lub szukać po nazwie. Sprawdź tytuł, sprzedawcę, warianty i zdjęcia." },
      { title: "Wyślij dane", body: "Wybierz kolor, rozmiar i ilość. Jeśli karta jest źle odczytana, użyj opublikowanego formularza ręcznego." },
      { title: "Zapłać etap produktu", body: "Pierwsza płatność obejmuje produkt i chińską dostawę; fracht międzynarodowy następuje po magazynie." },
      { title: "Śledź agenta i sprzedawcę", body: "FAQ podaje często 1–7 dni na wysyłkę sprzedawcy; przedsprzedaż może trwać dłużej." },
      { title: "Sprawdź QC i magazyn", body: "Porównaj kolor, rozmiar, ilość i widoczny stan z zamówieniem." },
      { title: "Wyślij paczkę", body: "Wybierz produkty, dopuszczoną linię, pakowanie i ubezpieczenie. Nie każdy towar używa każdej trasy." },
    ] },
    guides: { kicker: "Praktyczne poradniki", title: "Kupuj z lepszą informacją", intro: "Pomoc oparta na źródłach: produkt, koszty, QC, magazyn i zwroty.", cards: [
      { label: "Zacznij", title: "Jak używać arkusza KameyMall", body: "Wybierz produkt, sprawdź ofertę i przejdź opublikowany proces do paczki.", action: "Przeczytaj proces" },
      { label: "Koszty", title: "Cena CNY a koszt dostawy", body: "Oddziel produkt i dostawę chińską od opcji magazynu i frachtu międzynarodowego.", action: "Otwórz poradnik" },
      { label: "Magazyn", title: "Zdjęcia QC, magazyn i zwroty", body: "Sprawdź szybko: FAQ podaje 90 dni gratis, ale brak zwrotu po ponad pięciu dniach w magazynie.", action: "Zobacz checklistę" },
    ] },
    faq: { kicker: "FAQ", title: "Jasne i sprawdzalne odpowiedzi", intro: "Odpowiedzi oddzielają rolę poradnika od opublikowanych zasad platformy.", items: [
      { question: "Czym jest arkusz KameyMall?", answer: "Niezależny indeks porządkujący chińskie produkty przed otwarciem właściwej karty." },
      { question: "Czy to oficjalna strona KameyMall?", answer: "Nie. KameyMall Sheet jest niezależnym poradnikiem i nie sprzedaje, nie pobiera płatności, nie magazynuje ani nie wysyła." },
      { question: "Jak zaczyna się opublikowany proces?", answer: "Wklej link lub szukaj nazwy, wybierz warianty i zapłać za produkt z chińską dostawą." },
      { question: "Jakie platformy są wymienione?", answer: "Tutorial wymienia Taobao, Tmall i JD.com; opis usługi także Weidian i 1688. Sprawdź importowane dane." },
      { question: "Jakie płatności są publikowane?", answer: "Visa, Mastercard, PayPal i Alipay; tutorial dodaje WeChat, chińskie karty i przelew. Liczy się checkout live." },
      { question: "Czy USD to cena z dostawą?", answer: "Nie. To przeliczenie CNY; mogą dojść dostawa chińska, płatność, pakowanie, fracht, podatki i cło." },
      { question: "Co dzieje się w magazynie?", answer: "Opublikowany proces obejmuje kontrolę, zdjęcia i magazynowanie. Porównaj QC z kolorem, rozmiarem, ilością i stanem." },
      { question: "Jak długo trwa magazynowanie?", answer: "FAQ podaje 180 dni łącznie, do 90 gratis i 10 RMB miesięcznie za przedłużenie. Sprawdź licznik konta." },
      { question: "Czy wszystko można zwrócić?", answer: "Nie. Są wyłączenia i zasady sprzedawcy; po ponad pięciu dniach w magazynie zwrot nie jest obsługiwany." },
      { question: "Czy każdy produkt używa każdej linii?", answer: "Nie. Instrukcje opisują ograniczenia produktowe. Użyj listy live dla celu i paczki." },
      { question: "Czy przyciski produktów i kategorii prowadzą poza tę stronę?", answer: "Akcje produktu, kategorii i wyszukiwania prowadzą wyłącznie do odpowiadających stron w wybranej bazie docelowej. Nawigacja, poradniki, artykuły i FAQ pozostają w KameyMall Sheet." },
    ] },
    articles: { kicker: "Biblioteka SEO", title: "Zweryfikowane artykuły KameyMall", intro: "Oryginalne treści o wyszukiwaniu, procesie i kosztach z rozróżnieniem deklaracji platformy i opinii użytkowników.", read: "Czytaj artykuł", cards: [
      { label: "Poradnik 2026", title: "KameyMall Spreadsheet dla kupujących za granicą", body: "Od znalezienia produktu przez QC do planowania transportu.", action: "Przeczytaj artykuł" },
      { label: "Metoda", title: "Jak kupować przez KameyMall w 2026", body: "Link, zamówienie, płatność, sprzedawca, QC, magazyn i paczka oparte na źródłach.", action: "Czytaj poradnik" },
      { label: "Koszty", title: "Koszt wysyłki KameyMall 2026", body: "Oddziel CNY, dostawę chińską, pomiary, pakowanie i transport międzynarodowy.", action: "Czytaj o wysyłce" },
    ] },
    warehouseGuide: { label: "Magazyn", title: "Zdjęcia QC, magazyn i zwroty", intro: "Korzystaj z etapu magazynu szybko, według informacji publicznych sprawdzonych 3 sierpnia 2026.", sections: [
      { heading: "Co pokazują zdjęcia QC", paragraphs: ["Sprawdź kolor, ilość, metkę rozmiaru, uszkodzenia i akcesoria.", "Nie potwierdzają autentyczności, ukrytych materiałów, trwałości ani dopasowania."] },
      { heading: "Działaj w terminie zwrotu", paragraphs: ["FAQ wymienia wyłączenia, decyzję sprzedawcy i brak zwrotu po ponad pięciu dniach.", "Zgłoś konkretną różnicę z dowodem wariantu."] },
      { heading: "Rozumiej magazynowanie", paragraphs: ["Publikowane jest 180 dni łącznie, do 90 gratis i 10 RMB za dodatkowy miesiąc.", "Magazyn i zwrot mają różne terminy; użyj licznika konta."] },
      { heading: "Przygotuj paczkę", paragraphs: ["Użyj realnej wagi, wymiarów i ograniczeń.", "Wyważ usunięcie opakowania i ochronę; FAQ ostrzega, że proste pakowanie nie obejmuje szkód ubezpieczeniem."] },
    ] },
    firstArticle: { sourceNote: "Podstawa weryfikacji: publiczne strony KameyMall o usłudze agenta zakupowego, instrukcji zakupu i najczęstszych pytaniach, sprawdzone 3 sierpnia 2026. Informacje platformy nie są niezależną gwarancją.", primaryKeyword: "arkusz kameymall", seoTitle: "Arkusz KameyMall 2026: produkty, QC i wysyłka", seoDescription: "Jak używać arkusza KameyMall: znajdź produkty, sprawdź oferty, oceń QC, zarządzaj magazynem i planuj transport." },
  },
};

for (const [locale, update] of Object.entries(researchUiUpdates) as Array<[Locale, ResearchUiUpdate]>) {
  const copy = { de: german, fr: french, es: spanish, it: italian, pl: polish }[locale as Exclude<Locale, "en">];
  if (!copy) continue;
  copy.how = update.how;
  copy.guides = update.guides;
  copy.faq = update.faq;
  copy.articles = update.articles;
  copy.guidePages["guides/what-to-inspect-before-ordering"] = update.warehouseGuide;
  Object.assign(copy.articlePage, update.firstArticle);
  copy.pageIntros["how-to-buy"] = { kicker: update.how.kicker, title: update.how.title, intro: update.how.intro };
  copy.pageIntros.guides = { kicker: update.guides.kicker, title: update.guides.title, intro: update.guides.intro };
  copy.pageIntros.faq = { kicker: update.faq.kicker, title: update.faq.title, intro: update.faq.intro };
  copy.pageIntros.articles = { kicker: update.articles.kicker, title: update.articles.title, intro: update.articles.intro };
  copy.pageIntros["guides/how-to-use-kameymall-spreadsheet"] = { kicker: update.guides.cards[0].label, title: update.guides.cards[0].title, intro: update.guides.cards[0].body };
  copy.pageIntros["guides/cny-price-vs-final-cost"] = { kicker: update.guides.cards[1].label, title: update.guides.cards[1].title, intro: update.guides.cards[1].body };
  copy.pageIntros["guides/what-to-inspect-before-ordering"] = { kicker: update.warehouseGuide.label, title: update.warehouseGuide.title, intro: update.warehouseGuide.intro };
  copy.pageIntros["articles/kameymall-spreadsheet-guide-2026"] = { kicker: update.articles.cards[0].label, title: update.articles.cards[0].title, intro: update.articles.cards[0].body };
  copy.pageIntros["articles/how-to-buy-from-kameymall-2026"] = { kicker: update.articles.cards[1].label, title: update.articles.cards[1].title, intro: update.articles.cards[1].body };
  copy.pageIntros["articles/kameymall-shipping-cost-guide-2026"] = { kicker: update.articles.cards[2].label, title: update.articles.cards[2].title, intro: update.articles.cards[2].body };
}

const qcArticleUi: Record<Locale, { card: CardCopy; intro: { kicker: string; title: string; intro: string } }> = {
  en: {
    card: { label: "QC checklist", title: "How to Read KameyMall QC Photos Before Shipping", body: "Compare the ordered variant with warehouse photos, separate visible evidence from assumptions and act while a return may still be possible.", action: "Read the QC photo guide" },
    intro: { kicker: "Warehouse inspection guide", title: "How to Read KameyMall QC Photos Before Shipping", intro: "A source-checked method for comparing warehouse photos with the ordered variant, spotting visible problems and acting before the return opportunity closes." },
  },
  de: {
    card: { label: "QC-Prüfung", title: "KameyMall-QC-Fotos vor dem Versand richtig lesen", body: "Bestellte Variante und Lagerfotos vergleichen, sichtbare Belege von Annahmen trennen und rechtzeitig auf Probleme reagieren.", action: "QC-Fotoratgeber lesen" },
    intro: { kicker: "Ratgeber zur Lagerprüfung", title: "KameyMall-QC-Fotos vor dem Versand richtig lesen", intro: "Eine quellengeprüfte Methode, um Lagerfotos mit der Bestellung zu vergleichen, sichtbare Probleme zu erkennen und rechtzeitig zu handeln." },
  },
  fr: {
    card: { label: "Contrôle QC", title: "Comment lire les photos QC KameyMall avant l’envoi", body: "Comparez la variante commandée aux photos d’entrepôt, distinguez les preuves visibles des suppositions et agissez à temps.", action: "Lire le guide des photos QC" },
    intro: { kicker: "Guide de contrôle en entrepôt", title: "Comment lire les photos QC KameyMall avant l’envoi", intro: "Une méthode vérifiée pour comparer les photos d’entrepôt à la commande, repérer les problèmes visibles et agir avant la fin du retour possible." },
  },
  es: {
    card: { label: "Revisión QC", title: "Cómo leer las fotos QC de KameyMall antes del envío", body: "Compara la variante pedida con las fotos de almacén, separa pruebas visibles de suposiciones y actúa a tiempo.", action: "Leer guía de fotos QC" },
    intro: { kicker: "Guía de inspección en almacén", title: "Cómo leer las fotos QC de KameyMall antes del envío", intro: "Un método verificado para comparar las fotos de almacén con el pedido, detectar problemas visibles y actuar antes de que termine la opción de devolución." },
  },
  it: {
    card: { label: "Controllo QC", title: "Come leggere le foto QC KameyMall prima della spedizione", body: "Confronta la variante ordinata con le foto di magazzino, separa le prove visibili dalle ipotesi e intervieni in tempo.", action: "Leggi la guida alle foto QC" },
    intro: { kicker: "Guida al controllo in magazzino", title: "Come leggere le foto QC KameyMall prima della spedizione", intro: "Un metodo verificato per confrontare le foto di magazzino con l’ordine, individuare problemi visibili e agire prima della chiusura del possibile reso." },
  },
  pl: {
    card: { label: "Kontrola QC", title: "Jak czytać zdjęcia QC KameyMall przed wysyłką", body: "Porównaj zamówiony wariant ze zdjęciami magazynowymi, oddziel widoczne dowody od założeń i zareaguj na czas.", action: "Przeczytaj poradnik QC" },
    intro: { kicker: "Poradnik kontroli magazynowej", title: "Jak czytać zdjęcia QC KameyMall przed wysyłką", intro: "Sprawdzona metoda porównywania zdjęć magazynowych z zamówieniem, wykrywania widocznych problemów i działania przed zamknięciem możliwości zwrotu." },
  },
};

const localizedCopies: Record<Locale, SiteCopy> = { en: english, de: german, fr: french, es: spanish, it: italian, pl: polish };
for (const language of languages) {
  const copy = localizedCopies[language.code];
  copy.articles.cards.push(qcArticleUi[language.code].card);
  copy.pageIntros["articles/how-to-read-kameymall-qc-photos"] = qcArticleUi[language.code].intro;
}

const storageArticleUi: Record<Locale, { card: CardCopy; intro: { kicker: string; title: string; intro: string }; libraryIntro: string }> = {
  en: {
    card: { label: "Storage & returns", title: "KameyMall Warehouse Storage and Returns Guide", body: "Separate the short return decision from the longer storage countdown, then plan QC, consolidation, packaging and parcel submission with dated evidence.", action: "Read the storage guide" },
    intro: { kicker: "Storage and returns guide", title: "KameyMall Warehouse Storage and Returns Guide", intro: "A source-checked timeline for QC review, return decisions, free storage, extended storage and parcel preparation." },
    libraryIntro: "Five original guides cover product discovery, the agent workflow, shipping costs, QC photos, warehouse storage and returns.",
  },
  de: {
    card: { label: "Lager & Rückgabe", title: "KameyMall-Lagerung und Rückgabe", body: "Trenne die kurze Rückgabeentscheidung vom längeren Lager-Countdown und plane QC, Konsolidierung, Verpackung und Paket mit datierten Belegen.", action: "Lagerratgeber lesen" },
    intro: { kicker: "Lager- und Rückgaberatgeber", title: "KameyMall-Lagerung und Rückgabe", intro: "Ein quellengeprüfter Zeitplan für QC, Rückgabe, kostenlose und verlängerte Lagerung sowie Paketvorbereitung." },
    libraryIntro: "Fünf originale Ratgeber behandeln Produktsuche, Agentenablauf, Versandkosten, QC-Fotos, Lagerung und Rückgabe.",
  },
  fr: {
    card: { label: "Stockage & retours", title: "Stockage et retours à l’entrepôt KameyMall", body: "Distinguez la décision de retour rapide du stockage plus long, puis planifiez QC, consolidation, emballage et colis avec des preuves datées.", action: "Lire le guide stockage" },
    intro: { kicker: "Guide stockage et retours", title: "Stockage et retours à l’entrepôt KameyMall", intro: "Une chronologie vérifiée pour le QC, la décision de retour, le stockage gratuit ou prolongé et la préparation du colis." },
    libraryIntro: "Cinq guides originaux couvrent découverte, parcours d’agent, frais d’envoi, photos QC, stockage et retours.",
  },
  es: {
    card: { label: "Almacén y devoluciones", title: "Guía de almacén y devoluciones KameyMall", body: "Separa la decisión rápida de devolución del plazo de almacenamiento y planifica QC, consolidación, embalaje y paquete con pruebas fechadas.", action: "Leer guía de almacén" },
    intro: { kicker: "Guía de almacén y devoluciones", title: "Guía de almacén y devoluciones KameyMall", intro: "Un calendario verificado para QC, devoluciones, almacenamiento gratuito o ampliado y preparación del paquete." },
    libraryIntro: "Cinco guías originales cubren hallazgos, proceso de agente, costes de envío, fotos QC, almacén y devoluciones.",
  },
  it: {
    card: { label: "Deposito e resi", title: "Guida KameyMall a deposito e resi", body: "Separa la rapida decisione sul reso dal periodo di deposito e pianifica QC, consolidamento, imballaggio e pacco con prove datate.", action: "Leggi guida deposito" },
    intro: { kicker: "Guida a deposito e resi", title: "Guida KameyMall a deposito e resi", intro: "Una sequenza verificata per QC, decisioni di reso, deposito gratuito o esteso e preparazione del pacco." },
    libraryIntro: "Cinque guide originali coprono prodotti, processo agente, costi di spedizione, foto QC, deposito e resi.",
  },
  pl: {
    card: { label: "Magazyn i zwroty", title: "Magazyn KameyMall i zwroty — poradnik", body: "Oddziel szybką decyzję o zwrocie od dłuższego okresu magazynowania i planuj QC, łączenie, pakowanie oraz paczkę z datowanymi dowodami.", action: "Przeczytaj poradnik" },
    intro: { kicker: "Poradnik magazynu i zwrotów", title: "Magazyn KameyMall i zwroty — poradnik", intro: "Sprawdzona oś czasu dla QC, decyzji o zwrocie, bezpłatnego lub przedłużonego magazynu i przygotowania paczki." },
    libraryIntro: "Pięć oryginalnych poradników obejmuje produkty, proces agenta, koszty wysyłki, zdjęcia QC, magazyn i zwroty.",
  },
};

for (const language of languages) {
  const copy = localizedCopies[language.code];
  const update = storageArticleUi[language.code];
  copy.articles.cards.push(update.card);
  copy.articles.intro = update.libraryIntro;
  copy.pageIntros.articles = { ...copy.pageIntros.articles, intro: update.libraryIntro };
  copy.pageIntros["articles/kameymall-warehouse-storage-returns-guide"] = update.intro;
}

const paymentArticleUi: Record<Locale, { card: CardCopy; intro: { kicker: string; title: string; intro: string }; libraryIntro: string }> = {
  en: {
    card: { label: "Payment & fees", title: "KameyMall Payment Methods and Fees Explained", body: "Compare live payment options, reconcile every checkout line and keep the product order separate from the later international parcel payment.", action: "Read the payment guide" },
    intro: { kicker: "Payment and fee guide", title: "KameyMall Payment Methods and Fees Explained", intro: "A source-checked method for comparing payment options, currency conversion, checkout fees and the two-stage cost of an agent order." },
    libraryIntro: "Six original guides cover product discovery, the agent workflow, shipping costs, QC photos, warehouse decisions, returns, payments and fees.",
  },
  de: {
    card: { label: "Zahlung & Gebühren", title: "KameyMall-Zahlungsarten und Gebühren erklärt", body: "Aktuelle Zahlungsarten vergleichen, jede Kassenzeile abstimmen und Produktauftrag von der späteren Paketzahlung trennen.", action: "Zahlungsratgeber lesen" },
    intro: { kicker: "Zahlungs- und Gebührenleitfaden", title: "KameyMall-Zahlungsarten und Gebühren erklärt", intro: "Eine quellengeprüfte Methode für Zahlungsarten, Währungsumrechnung, Kassenpositionen und die zwei Kostenstufen des Agentenauftrags." },
    libraryIntro: "Sechs originale Ratgeber behandeln Produktsuche, Agentenablauf, Versandkosten, QC-Fotos, Lagerentscheidungen, Rückgabe, Zahlung und Gebühren.",
  },
  fr: {
    card: { label: "Paiement & frais", title: "Modes de paiement et frais KameyMall expliqués", body: "Comparez les options en direct, rapprochez chaque ligne de caisse et séparez la commande du futur paiement du colis.", action: "Lire le guide paiement" },
    intro: { kicker: "Guide paiement et frais", title: "Modes de paiement et frais KameyMall expliqués", intro: "Une méthode vérifiée pour comparer paiements, conversion, frais de caisse et les deux étapes de coût d’une commande par agent." },
    libraryIntro: "Six guides originaux couvrent découverte, parcours d’agent, transport, photos QC, entrepôt, retours, paiements et frais.",
  },
  es: {
    card: { label: "Pagos y cargos", title: "Métodos de pago y tarifas de KameyMall", body: "Compara opciones activas, concilia cada línea y separa el pago del producto del posterior pago del paquete internacional.", action: "Leer la guía de pagos" },
    intro: { kicker: "Guía de pagos y cargos", title: "Métodos de pago y tarifas de KameyMall explicados", intro: "Un método verificado para comparar pagos, conversión, cargos del checkout y las dos etapas de coste de un pedido con agente." },
    libraryIntro: "Seis guías originales cubren productos, proceso de agente, transporte, fotos QC, almacén, devoluciones, pagos y cargos.",
  },
  it: {
    card: { label: "Pagamenti e costi", title: "Metodi di pagamento e commissioni KameyMall", body: "Confronta le opzioni live, riconcilia ogni riga e separa l’ordine prodotto dal successivo pagamento del pacco.", action: "Leggi la guida pagamenti" },
    intro: { kicker: "Guida a pagamenti e costi", title: "Metodi di pagamento e commissioni KameyMall", intro: "Un metodo verificato per confrontare pagamenti, conversione, costi del checkout e le due fasi di spesa dell’ordine tramite agente." },
    libraryIntro: "Sei guide originali coprono prodotti, processo agente, spedizione, foto QC, deposito, resi, pagamenti e costi.",
  },
  pl: {
    card: { label: "Płatności i opłaty", title: "Metody płatności i opłaty KameyMall", body: "Porównaj bieżące opcje, uzgodnij każdą linię i oddziel płatność za produkt od późniejszej płatności za paczkę.", action: "Przeczytaj poradnik płatności" },
    intro: { kicker: "Poradnik płatności i opłat", title: "Metody płatności i opłaty KameyMall", intro: "Sprawdzona metoda porównania płatności, przewalutowania, opłat checkoutu i dwóch etapów kosztu zamówienia przez agenta." },
    libraryIntro: "Sześć oryginalnych poradników obejmuje produkty, proces agenta, wysyłkę, zdjęcia QC, magazyn, zwroty, płatności i opłaty.",
  },
};

for (const language of languages) {
  const copy = localizedCopies[language.code];
  const update = paymentArticleUi[language.code];
  copy.articles.cards.push(update.card);
  copy.articles.intro = update.libraryIntro;
  copy.pageIntros.articles = { ...copy.pageIntros.articles, intro: update.libraryIntro };
  copy.pageIntros["articles/kameymall-payment-methods-fees"] = update.intro;
}

const orderStatusArticleUi: Record<Locale, { card: CardCopy; intro: { kicker: string; title: string; intro: string }; libraryIntro: string }> = {
  en: {
    card: { label: "Order status", title: "KameyMall Order Status: Payment to Warehouse", body: "Read each handoff between payment, buyer, seller, domestic carrier, warehouse QC and the later international parcel.", action: "Read the status guide" },
    intro: { kicker: "Order status guide", title: "KameyMall Order Status Guide: From Payment to Warehouse", intro: "A source-checked method for identifying the next responsible party, preserving evidence and escalating the exact missing milestone." },
    libraryIntro: "Seven original guides cover product discovery, ordering, shipping costs, QC, storage, returns, payments and order-status troubleshooting.",
  },
  de: {
    card: { label: "Bestellstatus", title: "KameyMall-Bestellstatus: Zahlung bis Lager", body: "Jede Übergabe zwischen Zahlung, Einkäufer, Verkäufer, Inlandsträger, Lager-QC und späterem Auslandspaket lesen.", action: "Statusleitfaden lesen" },
    intro: { kicker: "Bestellstatus-Leitfaden", title: "KameyMall-Bestellstatus: von der Zahlung bis zum Lager", intro: "Eine quellengeprüfte Methode, den nächsten Verantwortlichen zu finden, Belege zu sichern und die fehlende Etappe zu eskalieren." },
    libraryIntro: "Sieben originale Ratgeber behandeln Produktsuche, Bestellung, Versandkosten, QC, Lager, Rückgabe, Zahlung und Statusprobleme.",
  },
  fr: {
    card: { label: "Statut de commande", title: "Statut KameyMall : du paiement à l’entrepôt", body: "Suivez chaque transfert entre paiement, acheteur, vendeur, transport chinois, QC et futur colis international.", action: "Lire le guide des statuts" },
    intro: { kicker: "Guide du statut de commande", title: "Statut de commande KameyMall : du paiement à l’entrepôt", intro: "Une méthode vérifiée pour identifier le prochain responsable, conserver les preuves et signaler l’étape exacte manquante." },
    libraryIntro: "Sept guides originaux couvrent découverte, commande, transport, QC, stockage, retours, paiements et dépannage des statuts.",
  },
  es: {
    card: { label: "Estado del pedido", title: "Estado KameyMall: del pago al almacén", body: "Sigue cada relevo entre pago, comprador, vendedor, transporte chino, QC y posterior paquete internacional.", action: "Leer guía de estados" },
    intro: { kicker: "Guía de estado del pedido", title: "Estado del pedido KameyMall: del pago al almacén", intro: "Un método verificado para identificar al siguiente responsable, guardar pruebas y escalar la etapa exacta que falta." },
    libraryIntro: "Siete guías originales cubren productos, pedidos, transporte, QC, almacén, devoluciones, pagos y solución de estados.",
  },
  it: {
    card: { label: "Stato ordine", title: "Stato KameyMall: dal pagamento al magazzino", body: "Segui ogni passaggio tra pagamento, buyer, venditore, corriere cinese, QC e successivo pacco internazionale.", action: "Leggi la guida agli stati" },
    intro: { kicker: "Guida allo stato ordine", title: "Stato ordine KameyMall: dal pagamento al magazzino", intro: "Un metodo verificato per individuare il prossimo responsabile, conservare le prove e segnalare la fase esatta mancante." },
    libraryIntro: "Sette guide originali coprono prodotti, ordini, spedizione, QC, deposito, resi, pagamenti e problemi di stato.",
  },
  pl: {
    card: { label: "Status zamówienia", title: "Status KameyMall: od płatności do magazynu", body: "Śledź przekazanie między płatnością, kupującym, sprzedawcą, przewoźnikiem, QC i późniejszą paczką.", action: "Przeczytaj poradnik statusu" },
    intro: { kicker: "Poradnik statusu zamówienia", title: "Status zamówienia KameyMall: od płatności do magazynu", intro: "Sprawdzona metoda wskazania następnej strony, zachowania dowodów i zgłoszenia dokładnie brakującego etapu." },
    libraryIntro: "Siedem oryginalnych poradników obejmuje produkty, zamówienia, wysyłkę, QC, magazyn, zwroty, płatności i statusy.",
  },
};

for (const language of languages) {
  const copy = localizedCopies[language.code];
  const update = orderStatusArticleUi[language.code];
  copy.articles.cards.push(update.card);
  copy.articles.intro = update.libraryIntro;
  copy.pageIntros.articles = { ...copy.pageIntros.articles, intro: update.libraryIntro };
  copy.pageIntros["articles/kameymall-order-status-guide"] = update.intro;
}

const consolidationArticleUi: Record<Locale, { card: CardCopy; intro: { kicker: string; title: string; intro: string }; libraryIntro: string }> = {
  en: { card: { label: "Parcel planning", title: "KameyMall Consolidation vs Split Parcels", body: "Compare route eligibility, billable shape, protection, timing and live quotes before grouping warehouse items.", action: "Read the parcel guide" }, intro: { kicker: "Parcel planning guide", title: "KameyMall Consolidation vs Split Parcels: A Decision Guide", intro: "A source-checked framework for choosing one compatible parcel, isolating a conflict item or creating sensible groups." }, libraryIntro: "Eight original guides cover product discovery, ordering, shipping costs, QC, storage, returns, payments, status troubleshooting and parcel consolidation." },
  de: { card: { label: "Paketplanung", title: "KameyMall-Konsolidierung oder Teilpakete", body: "Route, abrechenbare Form, Schutz, Zeit und Live-Angebote vor der Gruppierung vergleichen.", action: "Paketleitfaden lesen" }, intro: { kicker: "Leitfaden zur Paketplanung", title: "KameyMall-Konsolidierung oder Teilpakete: Entscheidungshilfe", intro: "Ein quellengeprüfter Rahmen für ein gemeinsames Paket, die Isolation eines Konflikts oder sinnvolle Gruppen." }, libraryIntro: "Acht originale Ratgeber behandeln Produktsuche, Bestellung, Fracht, QC, Lager, Rückgabe, Zahlung, Status und Konsolidierung." },
  fr: { card: { label: "Planification des colis", title: "Consolidation KameyMall ou colis séparés", body: "Comparez ligne, forme facturable, protection, délai et devis avant de regrouper les articles.", action: "Lire le guide colis" }, intro: { kicker: "Guide de planification des colis", title: "Consolidation KameyMall ou colis séparés : guide de décision", intro: "Un cadre vérifié pour choisir un colis compatible, isoler un conflit ou constituer des groupes cohérents." }, libraryIntro: "Huit guides originaux couvrent découverte, commande, transport, QC, stockage, retours, paiements, statuts et consolidation." },
  es: { card: { label: "Planificación de paquetes", title: "Consolidación KameyMall o paquetes separados", body: "Compara ruta, forma facturable, protección, tiempo y cotización antes de agrupar artículos.", action: "Leer guía de paquetes" }, intro: { kicker: "Guía de planificación de paquetes", title: "Consolidación KameyMall o paquetes separados: guía práctica", intro: "Un marco verificado para elegir un paquete compatible, aislar un conflicto o crear grupos sensatos." }, libraryIntro: "Ocho guías originales cubren productos, pedidos, transporte, QC, almacén, devoluciones, pagos, estados y consolidación." },
  it: { card: { label: "Pianificazione pacchi", title: "Consolidamento KameyMall o pacchi separati", body: "Confronta rotta, forma fatturabile, protezione, tempi e preventivo prima di unire gli articoli.", action: "Leggi la guida pacchi" }, intro: { kicker: "Guida alla pianificazione dei pacchi", title: "Consolidamento KameyMall o pacchi separati: guida pratica", intro: "Un metodo verificato per un pacco compatibile, isolare un conflitto o creare gruppi coerenti." }, libraryIntro: "Otto guide originali coprono prodotti, ordini, trasporto, QC, deposito, resi, pagamenti, stati e consolidamento." },
  pl: { card: { label: "Planowanie paczek", title: "Konsolidacja KameyMall czy osobne paczki", body: "Porównaj trasę, kształt rozliczeniowy, ochronę, czas i wycenę przed grupowaniem.", action: "Przeczytaj poradnik paczek" }, intro: { kicker: "Poradnik planowania paczek", title: "Konsolidacja KameyMall czy osobne paczki: poradnik", intro: "Sprawdzony schemat wyboru wspólnej paczki, izolacji konfliktu lub tworzenia logicznych grup." }, libraryIntro: "Osiem oryginalnych poradników obejmuje produkty, zamówienia, fracht, QC, magazyn, zwroty, płatności, statusy i konsolidację." },
};

for (const language of languages) {
  const copy = localizedCopies[language.code];
  const update = consolidationArticleUi[language.code];
  copy.articles.cards.push(update.card);
  copy.articles.intro = update.libraryIntro;
  copy.pageIntros.articles = { ...copy.pageIntros.articles, intro: update.libraryIntro };
  copy.pageIntros["articles/kameymall-consolidation-vs-split-parcels"] = update.intro;
}

export const copies: Record<Locale, SiteCopy> = {
  en: english,
  de: german,
  fr: french,
  es: spanish,
  it: italian,
  pl: polish,
};

function proseStructure(sections: ProseSection[]) {
  return sections.map((section) => ({
    paragraphs: section.paragraphs.length,
    bullets: section.bullets?.length ?? 0,
  }));
}

function contentStructure(copy: SiteCopy) {
  return {
    categories: Object.keys(copy.categories.items).sort(),
    steps: copy.how.steps.length,
    guides: copy.guides.cards.length,
    faq: copy.faq.items.length,
    articles: copy.articles.cards.length,
    pageIntros: Object.keys(copy.pageIntros).sort(),
    guidePages: Object.entries(copy.guidePages)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([route, page]) => ({ route, sections: proseStructure(page.sections) })),
    articlePage: proseStructure(copy.articlePage.sections),
  };
}

const englishContentStructure = JSON.stringify(contentStructure(copies.en));
for (const language of languages) {
  const localizedStructure = JSON.stringify(contentStructure(copies[language.code]));
  if (localizedStructure !== englishContentStructure) {
    throw new Error(`Incomplete ${language.code} translation: visible content structure must match English`);
  }
}

export const guideRoutes: StaticRouteKey[] = [
  "guides/how-to-use-kameymall-spreadsheet",
  "guides/cny-price-vs-final-cost",
  "guides/what-to-inspect-before-ordering",
];
export const articleRoute: StaticRouteKey = "articles/kameymall-spreadsheet-guide-2026";
export const articleRoutes: StaticRouteKey[] = [
  articleRoute,
  "articles/how-to-buy-from-kameymall-2026",
  "articles/kameymall-shipping-cost-guide-2026",
  "articles/how-to-read-kameymall-qc-photos",
  "articles/kameymall-warehouse-storage-returns-guide",
  "articles/kameymall-payment-methods-fees",
  "articles/kameymall-order-status-guide",
  "articles/kameymall-consolidation-vs-split-parcels",
];
