export const mainSite = "https://www.cnbuycha.com";

export type ProductCollection =
  | "Footwear"
  | "Clothing"
  | "Bags & Accessories"
  | "Watches & Tech";

export type Product = {
  id: string;
  slug: string;
  name: string;
  label: string;
  collection: ProductCollection;
  price: string;
  priceCny: number;
  popularity: string;
  href: string;
  image: string;
  checkedAt: string;
};

const product = (
  id: string,
  slug: string,
  name: string,
  label: string,
  collection: ProductCollection,
  priceCny: number,
  views: number,
  extension: "webp" | "jpg" | "gif" = "webp",
): Product => ({
  id,
  slug,
  name,
  label,
  collection,
  price: `$${(priceCny / 6.77).toFixed(2)}`,
  priceCny,
  popularity: `${views} finds`,
  href: `${mainSite}/AllProducts/${id}.html`,
  image: `/products/${id}.${extension}`,
  checkedAt: "2026-07-30",
});

// Names, IDs, source prices, images and destination URLs were checked against
// the live CNBuy Sheet product directory on 30 July 2026. USD figures are
// clearly presented as references and are not checkout quotes.
export const products: Product[] = [
  product("3382", "louis-vuitton-wallet-3382", "Louis Vuitton Wallet", "Wallet", "Bags & Accessories", 115, 548),
  product("3381", "ugg-gloves-3381", "UGG Gloves", "Gloves", "Bags & Accessories", 99, 871, "jpg"),
  product("3380", "canada-goose-sweatshirt-3380", "Canada Goose Sweatshirt", "Sweatshirt", "Clothing", 229, 765),
  product("3379", "fuzzy-slippers-3379", "Fuzzy Slippers", "Slippers", "Footwear", 91, 875),
  product("3378", "new-balance-1906r-3378", "New Balance 1906R", "Running shoes", "Footwear", 300, 849),
  product("3377", "coach-backpack-3377", "Coach Backpack — Multiple Styles", "Backpack", "Bags & Accessories", 180, 998),
  product("3376", "rimowa-luggage-3376", "Rimowa Luggage", "Luggage", "Bags & Accessories", 876, 914),
  product("3375", "nike-sweater-3375", "Nike Sweater", "Sweater", "Clothing", 264, 500, "jpg"),
  product("3374", "acg-supreme-pullover-3374", "ACG & Supreme Pullover Sweatshirt", "Pullover", "Clothing", 399, 825),
  product("3373", "designer-hats-3373", "Designer Hats — Multiple Brands", "Headwear", "Bags & Accessories", 203, 599, "jpg"),
  product("3372", "designer-snow-goggles-3372", "Designer Snow Goggles", "Goggles", "Bags & Accessories", 340, 546),
  product("3371", "gucci-hat-3371", "Gucci Hat", "Headwear", "Bags & Accessories", 75, 909),
  product("3370", "balenciaga-accessory-3370", "Balenciaga Accessory", "Accessory", "Bags & Accessories", 90, 515, "gif"),
  product("3369", "off-white-hoodies-3369", "Off-White Hoodies — 39 Styles", "Hoodie", "Clothing", 299.52, 583),
  product("3368", "corteiz-c-star-sweater-3368", "Corteiz C Star Sweater — 15 Styles", "Sweater", "Clothing", 363.48, 915),
  product("3367", "numeris-rick-owens-high-tops-3367", "NUMERIS / Rick Owens High-Top Shoes", "High-top shoes", "Footwear", 455, 657),
  product("3366", "nike-uptempo-slippers-3366", "Nike Air More Uptempo Slippers", "Slippers", "Footwear", 408, 637),
  product("3365", "royal-oak-style-watch-3365", "Royal Oak Style Watch", "Watch", "Watches & Tech", 328, 838),
  product("3364", "designer-style-watches-3364", "Designer Style Watches", "Watch", "Watches & Tech", 88, 787),
  product("3363", "ap-swatch-style-watch-3363", "AP x Swatch Style Watch", "Watch", "Watches & Tech", 298, 825),
  product("3362", "gucci-tracksuit-3362", "Gucci Tracksuit", "Tracksuit", "Clothing", 433, 790),
  product("3361", "jellycat-plush-3361", "Jellycat Plush", "Plush toy", "Bags & Accessories", 39, 619),
  product("3360", "maison-margiela-hoodie-3360", "Maison Margiela Hoodie", "Hoodie", "Clothing", 130, 530),
  product("3359", "hoka-speedgoat-5-3359", "HOKA Speedgoat 5 Trail Shoes", "Trail shoes", "Footwear", 218, 891),
  product("3358", "louis-vuitton-slides-3358", "Louis Vuitton Slides", "Slides", "Footwear", 100, 916),
  product("3357", "samsung-galaxy-watch8-3357", "Samsung Galaxy Watch8", "Smartwatch", "Watches & Tech", 218, 923),
  product("3356", "celine-coat-3356", "Celine Coat", "Coat", "Clothing", 247, 703),
  product("3355", "golden-goose-low-tops-3355", "Golden Goose Low-Top Shoes", "Low-top shoes", "Footwear", 460, 532),
  product("3354", "louis-vuitton-jacket-3354", "Louis Vuitton Jacket", "Jacket", "Clothing", 388, 812),
  product("3353", "polo-ralph-lauren-long-sleeve-3353", "Polo Ralph Lauren Long-Sleeve Top", "Long-sleeve top", "Clothing", 168, 986),
  product("3352", "off-white-tshirt-3352", "Off-White T-Shirt", "T-shirt", "Clothing", 112, 935),
  product("3351", "syna-world-mask-3351", "Syna World Mask", "Face covering", "Bags & Accessories", 69, 956),
  product("3350", "acne-studios-long-sleeve-3350", "Acne Studios Long-Sleeve Top", "Long-sleeve top", "Clothing", 110, 993),
  product("3349", "saint-vanity-windbreaker-3349", "Saint Vanity Windbreaker", "Windbreaker", "Clothing", 240, 600),
  product("3348", "adidas-futurecraft-4d-3348", "Adidas Futurecraft 4D Running Shoes", "Running shoes", "Footwear", 210, 732, "jpg"),
  product("3347", "louis-vuitton-tshirt-3347", "Louis Vuitton T-Shirt", "T-shirt", "Clothing", 150, 778),
];

export const featuredProducts = products.slice(0, 8);

export const productCollections: Array<{
  name: ProductCollection;
  products: Product[];
}> = [
  {
    name: "Footwear",
    products: products.filter((item) => item.collection === "Footwear"),
  },
  {
    name: "Clothing",
    products: products.filter((item) => item.collection === "Clothing").slice(0, 12),
  },
  {
    name: "Bags & Accessories",
    products: products
      .filter((item) => item.collection === "Bags & Accessories")
      .slice(0, 10),
  },
  {
    name: "Watches & Tech",
    products: [
      ...products.filter((item) => item.collection === "Watches & Tech"),
      ...products.filter((item) =>
        ["3372", "3381", "3376", "3361"].includes(item.id),
      ),
    ].slice(0, 8),
  },
];

export const getProductBySlug = (slug: string) =>
  products.find((item) => item.slug === slug);

export const categories = [
  { name: "Shoes", glyph: "↗", href: `${mainSite}/shoes/` },
  {
    name: "Sweatshirts",
    glyph: "✦",
    href: `${mainSite}/hoodies-sweaters/`,
  },
  { name: "T-Shirts", glyph: "T", href: `${mainSite}/t-shirts/` },
  { name: "Jackets", glyph: "J", href: `${mainSite}/jackets/` },
  { name: "Pants", glyph: "P", href: `${mainSite}/pants-shorts/` },
  { name: "Headwear", glyph: "H", href: `${mainSite}/headwear/` },
  { name: "Accessories", glyph: "A", href: `${mainSite}/accessories/` },
  { name: "Electronics", glyph: "E", href: `${mainSite}/electronics/` },
  { name: "Jerseys", glyph: "J", href: `${mainSite}/jerseys/` },
  { name: "Other", glyph: "+", href: `${mainSite}/AllProducts/` },
];

export const guideCards = [
  {
    eyebrow: "START HERE",
    title: "How to buy with Joyagoo",
    text: "From copying a product link to checking the warehouse photos and submitting an international parcel.",
    href: "/how-to-buy/",
    accent: "orange",
  },
  {
    eyebrow: "CHECK BEFORE SHIPPING",
    title: "A practical QC photo checklist",
    text: "What to inspect, when to request a detailed photo, and why the five-day return window matters.",
    href: "/qc-guide/",
    accent: "cream",
  },
  {
    eyebrow: "PLAN THE PARCEL",
    title: "Shipping, rehearsal and storage",
    text: "Understand estimated versus final weight, optional rehearsal packing, coupons and warehouse timing.",
    href: "/shipping-guide/",
    accent: "blue",
  },
];
