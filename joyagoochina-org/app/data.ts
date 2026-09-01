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
  imageWidth: number;
  imageHeight: number;
  checkedAt: string;
};

const productImageUrls: Record<string, string> = {
  "3382": "https://si.geilicdn.com/pcitem1908502154-3d2e0000019352019e400a2301b4_1920_1440.jpg",
  "3381": "https://si.geilicdn.com/pcitem1945679661-18e20000019a01e90e4d0a2315ef_1179_854.jpg",
  "3380": "https://si.geilicdn.com/open1643175405-1234478995-2e7400000198897d99360a23b491_1200_1200.jpg",
  "3379": "https://si.geilicdn.com/open1854268377-252808396-4d6e00000191446430a40aa0233d_1920_1920.jpg",
  "3378": "https://si.geilicdn.com/pcitem1888255644-2e180000019216d4c7ad0a2396f4_3276_3276.jpg",
  "3377": "https://si.geilicdn.com/pcitem1950350917-78650000019855d32b720a20e273_1200_1200.jpg",
  "3376": "https://si.geilicdn.com/pcitem1990432175-1ad80000019a594b73b40a23037f-unadjust_914_850.png",
  "3375": "https://si.geilicdn.com/open1648936853-1234478995-4572000001976a2c05100a231226_1812_1926.jpg",
  "3374": "https://si.geilicdn.com/open1293584826-1234478995-69d700000192b84fb0220a8115b5_799_1066.jpg",
  "3373": "https://si.geilicdn.com/open1823774813-1234478995-2701000001986adcd7fc0aa0c791_800_800.jpg",
  "3372": "https://si.geilicdn.com/pcitem901971902089-2e8a0000019b5f5780350a23041a_1170_1162.jpg",
  "3371": "https://si.geilicdn.com/open1675274933-1234478995-0a3d000001973979dad60aa08290_1080_1080.jpg",
  "3370": "https://si.geilicdn.com/open1675274933-1234478995-2d4400000197861fc4680a8133b0-unadjust_799_800.gif",
  "3369": "https://si.geilicdn.com/open1623462477-1234478995-07080000019749bc02df0aa08290_1200_1200.jpg",
  "3368": "https://si.geilicdn.com/open772349099-1234478995-5abf00000198c91be1cd0a22d249_818_818.jpg",
  "3367": "https://si.geilicdn.com/pcitem1809160355-344300000197e7a863740a20e273_4279_4376.jpg",
  "3366": "https://si.geilicdn.com/pcitem902066489412-048c0000019e542e384d0a2315ef_1617_1280.jpg",
  "3365": "https://si.geilicdn.com/pcitem1911933909-620a0000019e88ee80b30a23038e-unadjust_809_625.png",
  "3364": "https://si.geilicdn.com/pcitem2068757090-68ec0000019e6db771840a2396f4_1386_1279.jpg",
  "3363": "https://si.geilicdn.com/pcitem1911933909-620a0000019e88ee80b30a23038e-unadjust_809_625.png",
  "3362": "https://si.geilicdn.com/pcitem1827620616-2d75000001921c19b1cf0a20e273_800_800.jpg",
  "3361": "https://si.geilicdn.com/open1783698133-1234478995-5ecb0000019a760826c60a231226_800_800.jpg",
  "3360": "https://si.geilicdn.com/pcitem901940024420-4b4000000198111f99660a2301b4_792_999.jpg",
  "3359": "https://si.geilicdn.com/pcitem208074778-06de0000019367d221e90a2315ef_800_800.jpg",
  "3358": "https://si.geilicdn.com/pcitem901898590714-5cdc00000194e94532360a21146b_1080_720.jpg",
  "3357": "https://si.geilicdn.com/wdseller1778358520-0031000001999bf297160a210256_1080_1920.jpg",
  "3356": "https://si.geilicdn.com/pcitem901940024420-6db7000001992d06e09c0a2303ee_1080_1080.jpg",
  "3355": "https://si.geilicdn.com/pcitem901862111711-01f50000018fe686ebd10a239846_800_600.jpg",
  "3354": "https://si.geilicdn.com/open1737227933-1234478995-374200000198554fb0760aa043f9_1200_1200.jpg",
  "3353": "https://si.geilicdn.com/pcitem1806271682-6c550000019151695e690a210256_1080_914.jpg",
  "3352": "https://si.geilicdn.com/open1685879877-252808396-3a9600000192a3a2c6e80a239383_1120_1120.jpg",
  "3351": "https://si.geilicdn.com/pcitem1902887107-0fcc000001997b0a31400a2396f4_1200_1200.jpg",
  "3350": "https://si.geilicdn.com/open1624782517-1624782517-27220000019932791d600a8115c2_1200_1200.jpg",
  "3349": "https://si.geilicdn.com/pcitem1935497113-5cb2000001995d4d9f900a231316_2000_2000.jpg",
  "3348": "https://si.geilicdn.com/wdseller1541848429-053f000001843f802ce60a22d3f7_1284_1284.jpg",
  "3347": "https://si.geilicdn.com/pcitem901898590714-6b4d0000019410d6e2430a2301b4_1200_1200.jpg",
};

export const absoluteProductImageUrl = (image: string) =>
  image.startsWith("http://") || image.startsWith("https://")
    ? image
    : `https://joyagoochina.org${image}`;

// Joyagoo's local catalogue IDs are not the same as Cnbuycha's current route
// IDs. Keep the verified destination paths explicit so a reused route number
// cannot silently send visitors to an unrelated product.
const productDestinationPaths: Record<string, string> = {
  "3382": "/accessories/3363.html",
  "3381": "/accessories/3362.html",
  "3380": "/jackets/3425.html",
  "3379": "/shoes/3365.html",
  "3378": "/shoes/3366.html",
  "3377": "/accessories/3364.html",
  "3376": "/accessories/3369.html",
  "3375": "/hoodies-sweaters/3367.html",
  "3374": "/hoodies-sweaters/3426.html",
  "3373": "/accessories/3368.html",
  "3372": "/accessories/3359.html",
  "3371": "/headwear/3353.html",
  "3370": "/headwear/3356.html",
  "3369": "/hoodies-sweaters/3413.html",
  "3368": "/hoodies-sweaters/3412.html",
  "3367": "/shoes/3355.html",
  "3366": "/shoes/3354.html",
  "3365": "/accessories/3358.html",
  "3364": "/accessories/3360.html",
  "3363": "/accessories/3357.html",
  "3362": "/short-sets/3348.html",
  "3361": "/other-stuff/3279.html",
  "3360": "/t-shirts/3400.html",
  "3359": "/shoes/3328.html",
  "3358": "/shoes/3316.html",
  "3357": "/electronics/3286.html",
  "3356": "/jackets/3402.html",
  "3355": "/shoes/3321.html",
  "3354": "/jackets/3403.html",
  "3353": "/t-shirts/3401.html",
  "3352": "/t-shirts/3392.html",
  "3351": "/headwear/3307.html",
  "3350": "/t-shirts/3394.html",
  "3349": "/short-sets/3340.html",
  "3348": "/shoes/3289.html",
  "3347": "/t-shirts/3332.html",
};

const productHref = (id: string) => {
  const destinationPath = productDestinationPaths[id];
  if (!destinationPath) {
    throw new Error(`Missing verified Cnbuycha destination for product ${id}`);
  }
  return `${mainSite}${destinationPath}`;
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
): Product => {
  const [imageWidth, imageHeight] = [600, 600];
  return {
    id,
    slug,
    name,
    label,
    collection,
    price: `$${(priceCny / 7.2).toFixed(2)}`,
    priceCny,
    popularity: `${views} finds`,
    href: productHref(id),
    image: productImageUrls[id] ?? `/products/${id}.${extension}`,
    imageWidth,
    imageHeight,
    checkedAt: "2026-09-01",
  };
};

// Destination URLs were rechecked against the live Cnbuycha catalogue on
// 1 September 2026. USD figures are references and are not checkout quotes.
export const products: Product[] = [
  product("3382", "louis-vuitton-wallet-3382", "Zippered Bi-Fold Card Holder", "Card holder", "Bags & Accessories", 115, 548),
  product("3381", "ugg-gloves-3381", "Windproof Gloves", "Gloves", "Bags & Accessories", 99, 871, "jpg"),
  product("3380", "canada-goose-sweatshirt-3380", "Warm Lamb-Wool Sweater Jacket Collection", "Jacket collection", "Clothing", 229, 765),
  product("3379", "fuzzy-slippers-3379", "Plush Monogram House Slippers", "House slippers", "Footwear", 91, 875),
  product("3378", "new-balance-1906r-3378", "PK Batch Fashion Sneakers", "Sneakers", "Footwear", 300, 849),
  product("3377", "coach-backpack-3377", "Fashion Backpack Collection", "Backpack", "Bags & Accessories", 180, 998),
  product("3376", "rimowa-luggage-3376", "Aluminum Carry-On Suitcase", "Carry-on suitcase", "Bags & Accessories", 876, 914),
  product("3375", "nike-sweater-3375", "Nike Graphic Crewneck Sweatshirt", "Sweatshirt", "Clothing", 264, 500, "jpg"),
  product("3374", "acg-supreme-pullover-3374", "Polar Fleece Hooded Vest", "Fleece vest", "Clothing", 399, 825),
  product("3373", "designer-hats-3373", "Men's Twill Silk Tie", "Tie", "Bags & Accessories", 203, 599, "jpg"),
  product("3372", "designer-snow-goggles-3372", "Unisex Ski Goggles", "Ski goggles", "Bags & Accessories", 340, 546),
  product("3371", "gucci-hat-3371", "High-Quality Hat", "Hat", "Bags & Accessories", 75, 909),
  product("3370", "balenciaga-accessory-3370", "High-Quality Casual Hat", "Casual hat", "Bags & Accessories", 90, 515),
  product("3369", "off-white-hoodies-3369", "Autumn/Winter Fashion Sweater", "Sweater", "Clothing", 299.52, 583),
  product("3368", "corteiz-c-star-sweater-3368", "Camouflage Embroidered Mohair Crewneck Sweater", "Crewneck sweater", "Clothing", 363.48, 915),
  product("3367", "numeris-rick-owens-high-tops-3367", "MM 07 Flat Casual Non-Slip Shoes", "Casual shoes", "Footwear", 455, 657),
  product("3366", "nike-uptempo-slippers-3366", "GOOD 6 Fashion Sneakers", "Sneakers", "Footwear", 408, 637),
  product("3365", "royal-oak-style-watch-3365", "LX 11 AP-Style Fashion Watch", "Watch", "Watches & Tech", 328, 838),
  product("3364", "designer-style-watches-3364", "2026 PP-Style Fashion Watch", "Watch", "Watches & Tech", 88, 787),
  product("3363", "ap-swatch-style-watch-3363", "B5 AP-Style Fashion Watch", "Watch", "Watches & Tech", 298, 825),
  product("3362", "gucci-tracksuit-3362", "High-Quality Autumn/Winter Set", "Clothing set", "Clothing", 433, 790),
  product("3361", "jellycat-plush-3361", "Curly Animal Plush Toy", "Plush toy", "Bags & Accessories", 39, 619),
  product("3360", "maison-margiela-hoodie-3360", "Pure Cotton Loose-Fit Long-Sleeve Top", "Long-sleeve top", "Clothing", 130, 530),
  product("3359", "hoka-speedgoat-5-3359", "Skyline FloatX Outdoor Running Shoes", "Running shoes", "Footwear", 218, 891),
  product("3358", "louis-vuitton-slides-3358", "Embossed Slides", "Slides", "Footwear", 100, 916),
  product("3357", "samsung-galaxy-watch8-3357", "Galaxy Watch Ultra 8 Smartwatch", "Smartwatch", "Watches & Tech", 218, 923),
  product("3356", "celine-coat-3356", "Loose-Fit Autumn/Winter Coat", "Coat", "Clothing", 247, 703),
  product("3355", "golden-goose-low-tops-3355", "Fashion Shoes Collection", "Fashion shoes", "Footwear", 460, 532),
  product("3354", "louis-vuitton-jacket-3354", "Versatile Baseball Jacket", "Baseball jacket", "Clothing", 388, 812),
  product("3353", "polo-ralph-lauren-long-sleeve-3353", "Ralph Ten-Colour Oxford Shirt", "Oxford shirt", "Clothing", 168, 986),
  product("3352", "off-white-tshirt-3352", "Cotton Printed T-Shirt", "T-shirt", "Clothing", 112, 935),
  product("3351", "syna-world-mask-3351", "Warm Knitted Hat", "Knitted hat", "Bags & Accessories", 69, 956),
  product("3350", "acne-studios-long-sleeve-3350", "Relaxed Autumn Long-Sleeve Top", "Long-sleeve top", "Clothing", 110, 993),
  product("3349", "saint-vanity-windbreaker-3349", "Trendy Casual Set", "Clothing set", "Clothing", 240, 600),
  product("3348", "adidas-futurecraft-4d-3348", "Hole Sneakers", "Sneakers", "Footwear", 210, 732, "jpg"),
  product("3347", "louis-vuitton-tshirt-3347", "Printed Short-Sleeve Collection", "T-shirt collection", "Clothing", 150, 778),
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

export const getProductById = (id: string) =>
  products.find((item) => item.id === id);

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
  { name: "Jerseys", glyph: "J", href: `${mainSite}/Jersey/` },
  { name: "Other", glyph: "+", href: `${mainSite}/other-stuff/` },
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
