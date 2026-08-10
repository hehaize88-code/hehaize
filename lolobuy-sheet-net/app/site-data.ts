export const catalogBase = "https://www.cnbuycha.com";

export const products = [
  {
    id: 3359,
    name: "Cushioned trail running shoes",
    category: "Shoes",
    categorySlug: "shoes",
    image: "/products/3359.webp",
    url: `${catalogBase}/AllProducts/3359.html`,
    priceCny: 218,
    selectionNote: "Confirm the seller size system, selected colour and exact pair before ordering.",
    qcFocus: "Compare both shoes, size labels, heel shape, upper panels, outsole and visible stitching.",
  },
  {
    id: 3369,
    name: "Graphic pullover hoodie collection",
    category: "Hoodies",
    categorySlug: "hoodies",
    image: "/products/3369.webp",
    url: `${catalogBase}/AllProducts/3369.html`,
    priceCny: 299.52,
    selectionNote: "Choose the exact design, colour and garment size; one listing may contain many styles.",
    qcFocus: "Check the received design, size label, chest width, print placement, cuffs, hem and visible marks.",
  },
  {
    id: 3371,
    name: "Monogram-pattern baseball cap",
    category: "Headwear",
    categorySlug: "accessories",
    image: "/products/3371.webp",
    url: `${catalogBase}/AllProducts/3371.html`,
    priceCny: 75,
    selectionNote: "Confirm colour, crown style and whether the selected closure is fixed or adjustable.",
    qcFocus: "Review crown symmetry, embroidery placement, brim shape, closure and visible surface marks.",
  },
  {
    id: 3357,
    name: "Round digital smartwatch",
    category: "Electronics",
    categorySlug: "accessories",
    image: "/products/3357.webp",
    url: `${catalogBase}/AllProducts/3357.html`,
    priceCny: 218,
    selectionNote: "Confirm the exact model, colour, strap option and every accessory expressly included.",
    qcFocus: "Check the screen, case, buttons, strap connections, charger and visible packaging contents.",
  },
  {
    id: 3367,
    name: "High-top platform sneakers",
    category: "Shoes",
    categorySlug: "shoes",
    image: "/products/3367.webp",
    url: `${catalogBase}/AllProducts/3367.html`,
    priceCny: 455,
    selectionNote: "Confirm the colour and seller size label, then compare a defined foot or insole measurement.",
    qcFocus: "Check pair symmetry, labels, toe shape, platform height, panels and sole attachment.",
  },
  {
    id: 3366,
    name: "Cushioned slide sandals",
    category: "Shoes",
    categorySlug: "shoes",
    image: "/products/3366.webp",
    url: `${catalogBase}/AllProducts/3366.html`,
    priceCny: 408,
    selectionNote: "Confirm colour, seller size and whether the measurement describes the footbed or outsole.",
    qcFocus: "Check that the pair matches, then review straps, footbeds, outsole edges and visible damage.",
  },
  {
    id: 3368,
    name: "Graphic knit sweater collection",
    category: "Sweaters",
    categorySlug: "hoodies",
    image: "/products/3368.webp",
    url: `${catalogBase}/AllProducts/3368.html`,
    priceCny: 363.48,
    selectionNote: "Record the exact style, colour and size because the listing contains multiple designs.",
    qcFocus: "Compare the chosen graphic, label, chest width, knit surface, collar, cuffs and hem.",
  },
  {
    id: 3372,
    name: "Snow and ski goggles",
    category: "Accessories",
    categorySlug: "accessories",
    image: "/products/3372.webp",
    url: `${catalogBase}/AllProducts/3372.html`,
    priceCny: 340,
    selectionNote: "Confirm the selected lens, frame colour, strap and any case or accessory explicitly included.",
    qcFocus: "Inspect lens surfaces, frame alignment, strap attachment and the visible included pieces.",
  },
  {
    id: 3356,
    name: "Belted wool-blend coat",
    category: "Jackets",
    categorySlug: "jackets",
    image: "/products/3356.webp",
    url: `${catalogBase}/AllProducts/3356.html`,
    priceCny: 247,
    selectionNote: "Compare chest, shoulder, sleeve and length measurements with a coat that already fits.",
    qcFocus: "Check the selected size, silhouette, belt, closures, lining, pockets and visible seam finish.",
  },
  {
    id: 3355,
    name: "Glitter low-top sneakers",
    category: "Shoes",
    categorySlug: "shoes",
    image: "/products/3355.webp",
    url: `${catalogBase}/AllProducts/3355.html`,
    priceCny: 460,
    selectionNote: "Confirm the seller size, colour treatment and whether packaging or accessories are included.",
    qcFocus: "Review pair symmetry, size labels, glitter surface, heel panels, sole edges and visible marks.",
  },
  {
    id: 3353,
    name: "Long-sleeve polo shirts",
    category: "Clothing",
    categorySlug: "hoodies",
    image: "/products/3353.webp",
    url: `${catalogBase}/AllProducts/3353.html`,
    priceCny: 168,
    selectionNote: "Confirm colour and size, then compare garment measurements rather than the label alone.",
    qcFocus: "Check the collar, placket, chest width, sleeve length, embroidery and visible seam alignment.",
  },
  {
    id: 3351,
    name: "Embroidered knit beanie",
    category: "Headwear",
    categorySlug: "accessories",
    image: "/products/3351.webp",
    url: `${catalogBase}/AllProducts/3351.html`,
    priceCny: 69,
    selectionNote: "Confirm colour, knit style, dimensions and the exact design shown for the selected option.",
    qcFocus: "Review embroidery placement, knit consistency, shape, edges and visible stains or pulls.",
  },
] as const;

export type ProductRecord = (typeof products)[number];

export const productSnapshotDate = "2026-07-30";

export function productInternalPath(id: number) {
  return `/products/${id}`;
}

export function productPriceUsd(priceCny: number) {
  return (priceCny / 6.77).toFixed(2);
}

export function getProduct(id: string | number) {
  return products.find((product) => product.id === Number(id));
}

export const categories = [
  {
    slug: "shoes",
    name: "Shoes",
    detail: "Sneakers, runners and slides",
    href: `${catalogBase}/shoes/`,
    symbol: "↗",
    intro: "Compare seller size systems, foot or insole measurements, pair symmetry and the protection-versus-volume trade-off of shoe boxes.",
  },
  {
    slug: "hoodies",
    name: "Hoodies",
    detail: "Hoodies, sweaters and layers",
    href: `${catalogBase}/hoodies-sweaters/`,
    symbol: "↗",
    intro: "Use garment measurements and the exact selected design to compare hoodies, knitwear and other upper-body layers.",
  },
  {
    slug: "jackets",
    name: "Jackets",
    detail: "Coats, jackets and outerwear",
    href: `${catalogBase}/jackets/`,
    symbol: "↗",
    intro: "Review garment dimensions, closures, lining and packed volume before accepting heavier outerwear for an international parcel.",
  },
  {
    slug: "accessories",
    name: "Accessories",
    detail: "Headwear, watches and more",
    href: `${catalogBase}/accessories/`,
    symbol: "↗",
    intro: "Confirm exact options, dimensions, included pieces and product-specific visible checks for headwear, eyewear and electronics.",
  },
] as const;

export function categoryInternalPath(slug: string) {
  return `/categories/${slug}`;
}

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getCategoryProducts(slug: string) {
  return products.filter((product) => product.categorySlug === slug);
}

export const primaryNavigation = [
  { label: "Products", href: "/products", key: "products" },
  { label: "Categories", href: "/categories", key: "categories" },
  { label: "QC Guide", href: "/qc-guide", key: "qc-guide" },
  { label: "Shipping", href: "/shipping", key: "shipping" },
  { label: "Buying Guides", href: "/articles", key: "articles" },
  { label: "FAQ", href: "/faq", key: "faq" },
] as const;

export type NavigationKey = (typeof primaryNavigation)[number]["key"];

export const faqItems = [
  {
    question: "What is a LoloBuy spreadsheet?",
    answer:
      "It is an independent product-discovery directory that organizes marketplace finds into searchable pages. It can help you locate and compare a source item, but it does not replace the live seller listing, order record, warehouse inspection or international-shipping decision.",
  },
  {
    question: "What does LoloBuy say its service does?",
    answer:
      "LoloBuy's public homepage says it assists with purchases from Chinese online and offline channels and lets a shopper paste a product link to place an order. It also describes warehouse inspection, photos, storage, parcel consolidation and global shipping. Current account terms still govern an active order.",
  },
  {
    question: "Do these product cards open the matching item?",
    answer:
      "Yes. Each visible card uses the first image from the same destination product page, and its image, title and View control point to that exact main-site item.",
  },
  {
    question: "Where does the product search go?",
    answer:
      "The search field sends the exact keyword to the main catalog's search-results page. It does not send visitors to LoloBuy or to another third-party directory.",
  },
  {
    question: "Are the products guaranteed to be in stock?",
    answer:
      "No. Seller inventory, variants, pricing and links can change after a catalog review. Re-open the destination page and confirm the current listing before placing an order.",
  },
  {
    question: "What should I save before submitting a product link?",
    answer:
      "Save the source address, seller name if visible, exact color, size, version or batch, quantity, option code, price and any seller note that changes what will be sent. A dated screenshot is useful if the marketplace page later changes.",
  },
  {
    question: "Does LoloBuy inspect and photograph warehouse arrivals?",
    answer:
      "LoloBuy's public homepage states that after a merchant sends goods to the warehouse, the service conducts a quality inspection and takes photos. Review the live order page for the photographs and options actually available on your order.",
  },
  {
    question: "How many free QC photos does LoloBuy provide?",
    answer:
      "The public homepage checked on 28 July 2026 did not establish one universal photo count or a fixed extra-photo price. Do not rely on an old number from another guide; check the current order interface before requesting or paying for additional images.",
  },
  {
    question: "Does a warehouse photo prove product quality?",
    answer:
      "It can reveal visible differences or damage, but it cannot guarantee fit, hidden construction, material composition, authenticity or durability. Use it as one part of your review.",
  },
  {
    question: "What should I check in a QC photo?",
    answer:
      "Start with item identity, selected color or variant, the visible size label, obvious marks or damage, missing pieces and any product-specific detail that affected your choice.",
  },
  {
    question: "Can QC photos prove authenticity?",
    answer:
      "No. General warehouse photos can help identify visible details and condition, but they do not establish provenance or authenticity. If authenticity is required, use authorized retail channels and evidence designed for that decision.",
  },
  {
    question: "Can I request a return or exchange after QC?",
    answer:
      "Possibilities depend on the seller policy, product, order stage and current platform terms. Some items may have restricted or short return windows. Review the options shown for the order and act promptly when a visible mismatch changes your decision.",
  },
  {
    question: "How long does LoloBuy say it stores warehouse items for free?",
    answer:
      "LoloBuy's public homepage stated 90 days of free storage when checked on 28 July 2026. Verify the live storage counter and current terms in the account because policies can change and seller return windows may be much shorter.",
  },
  {
    question: "Can several warehouse items be combined into one parcel?",
    answer:
      "Yes. LoloBuy's public homepage says users can select products stored in the warehouse and submit them as a single parcel. A combined parcel is not automatically cheapest: dimensions, restrictions, fragility and route limits still matter.",
  },
  {
    question: "What can change an international shipping estimate?",
    answer:
      "Destination, available route, actual weight, parcel dimensions, route restrictions, consolidation and packing choices can all change the result. Treat an early estimate as a planning figure rather than a guaranteed charge.",
  },
  {
    question: "Does LoloBuy have one fixed international shipping rate?",
    answer:
      "No single public worldwide rate can describe every parcel. The useful comparison is the current set of routes shown for the actual destination, product mix, packed weight and dimensions. Old per-kilogram quotes from other parcels may not apply.",
  },
  {
    question: "What is volumetric weight?",
    answer:
      "Volumetric or dimensional weight converts parcel dimensions into a billing weight. Some routes compare it with scale weight and charge the greater value. The formula, divisor and billing rule vary, so use the rule displayed for the live route.",
  },
  {
    question: "Are customs charges included or guaranteed?",
    answer:
      "Do not assume that route availability guarantees customs clearance or no charges. Import rules, declarations, duties and taxes depend on the destination, product and current law. The recipient should review the applicable rules before shipping.",
  },
  {
    question: "Do customer reviews prove that every order will be the same?",
    answer:
      "No. A detailed review can document one buyer's product, route, dates and support outcome, but it cannot guarantee another order. Give more weight to recent reviews with verifiable detail and treat referral-driven praise or isolated ratings as limited evidence.",
  },
  {
    question: "Is LoloBuy safe or legitimate?",
    answer:
      "This independent site does not issue a blanket guarantee. Check the current legal and service terms, payment protections, warehouse records, recent detailed user reports and support responses. Begin with a small traceable order if you decide the evidence meets your risk tolerance.",
  },
  {
    question: "Is this an official LoloBuy website?",
    answer:
      "No. This is an independent product-discovery and educational site. It does not claim to be LoloBuy and does not sell, inspect, store or ship products.",
  },
  {
    question: "Does this website send visitors to other directories?",
    answer:
      "No. Educational navigation stays on this website. Product cards, category buttons and catalog search open only the associated main site at cnbuycha.com; there are no clickable links to LoloBuy or competing directories.",
  },
] as const;
