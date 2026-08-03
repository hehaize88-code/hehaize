export const categoryOrder = [
  "shoes",
  "sweatshirts",
  "tshirts",
  "jackets",
  "pants",
  "headwear",
  "accessories",
  "jersey",
  "electronics",
  "other",
] as const;

export type CategoryKey = (typeof categoryOrder)[number];
export type ProductRoute = `products/${string}`;
export type CategoryRoute = `categories/${CategoryKey}`;
export type CatalogRoute = ProductRoute | CategoryRoute;

export type Product = {
  slug: string;
  name: string;
  sourceName?: string;
  categoryKey: CategoryKey;
  reference: string;
  cny: number;
  image: string;
  url: string;
  featured?: boolean;
  lastChecked: string;
};

export const products: readonly Product[] = [
  {
    slug: "new-balance-1906r",
    name: "New Balance 1906R",
    categoryKey: "shoes",
    reference: "7818078364",
    cny: 300,
    image: "https://www.cnbuycha.com/uploads/allimg/20260729/1-260H9212139344.webp",
    url: "https://www.cnbuycha.com/AllProducts/3378.html",
    featured: true,
    lastChecked: "2026-08-03",
  },
  {
    slug: "hoka-speedgoat-5",
    name: "HOKA One One Speedgoat 5 Trail Running Shoes",
    categoryKey: "shoes",
    reference: "7806024805",
    cny: 218,
    image: "https://www.cnbuycha.com/uploads/allimg/20260713/1-260G31AHDQ.webp",
    url: "https://www.cnbuycha.com/AllProducts/3359.html",
    lastChecked: "2026-08-03",
  },
  {
    slug: "adidas-futurecraft-4d",
    name: "Adidas Futurecraft 4D Running Shoes",
    sourceName: "Adidas Futurecraft 4D Running Shoes - Innovative Tech Sneakers",
    categoryKey: "shoes",
    reference: "7801363863",
    cny: 210,
    image: "https://www.cnbuycha.com/uploads/allimg/20260706/1-260F6161H3111.jpg",
    url: "https://www.cnbuycha.com/AllProducts/3348.html",
    lastChecked: "2026-08-03",
  },
  {
    slug: "canada-goose-sweatshirt",
    name: "Canada Goose Sweatshirt",
    categoryKey: "sweatshirts",
    reference: "7815092173",
    cny: 229,
    image: "https://www.cnbuycha.com/uploads/allimg/20260729/1-260H9212445610.webp",
    url: "https://www.cnbuycha.com/AllProducts/3380.html",
    featured: true,
    lastChecked: "2026-08-03",
  },
  {
    slug: "nike-sweater",
    name: "Nike Sweater",
    categoryKey: "sweatshirts",
    reference: "7818023240",
    cny: 264,
    image: "https://www.cnbuycha.com/uploads/allimg/20260729/1-260H9211624601.jpg",
    url: "https://www.cnbuycha.com/AllProducts/3375.html",
    lastChecked: "2026-08-03",
  },
  {
    slug: "off-white-hoodies",
    name: "Off-White Hoodies (39 Styles)",
    sourceName: "Off-White Hoodies [39 styles]",
    categoryKey: "sweatshirts",
    reference: "7813733346",
    cny: 299.52,
    image: "https://www.cnbuycha.com/uploads/allimg/20260722/1-260H2211102W7.webp",
    url: "https://www.cnbuycha.com/AllProducts/3369.html",
    lastChecked: "2026-08-03",
  },
  {
    slug: "polo-ralph-lauren-long-sleeve",
    name: "Polo Ralph Lauren Long Sleeve",
    categoryKey: "tshirts",
    reference: "7806010973",
    cny: 168,
    image: "https://www.cnbuycha.com/uploads/allimg/20260713/1-260G31645454b.webp",
    url: "https://www.cnbuycha.com/AllProducts/3353.html",
    lastChecked: "2026-08-03",
  },
  {
    slug: "off-white-tee",
    name: "Off-White Tee",
    categoryKey: "tshirts",
    reference: "7804363912",
    cny: 112,
    image: "https://www.cnbuycha.com/uploads/allimg/20260706/1-260F6162324124.webp",
    url: "https://www.cnbuycha.com/AllProducts/3352.html",
    featured: true,
    lastChecked: "2026-08-03",
  },
  {
    slug: "louis-vuitton-tee",
    name: "Louis Vuitton Tee",
    categoryKey: "tshirts",
    reference: "7804306830",
    cny: 150,
    image: "https://www.cnbuycha.com/uploads/allimg/20260706/1-260F6161541109.webp",
    url: "https://www.cnbuycha.com/AllProducts/3347.html",
    lastChecked: "2026-08-03",
  },
  {
    slug: "celine-coat",
    name: "Celine Coat",
    categoryKey: "jackets",
    reference: "7809005168",
    cny: 247,
    image: "https://www.cnbuycha.com/uploads/allimg/20260713/1-260G31A22I07.webp",
    url: "https://www.cnbuycha.com/AllProducts/3356.html",
    featured: true,
    lastChecked: "2026-08-03",
  },
  {
    slug: "louis-vuitton-jacket",
    name: "Louis Vuitton Jacket",
    categoryKey: "jackets",
    reference: "7809064054",
    cny: 388,
    image: "https://www.cnbuycha.com/uploads/allimg/20260713/1-260G3164SUC.webp",
    url: "https://www.cnbuycha.com/AllProducts/3354.html",
    lastChecked: "2026-08-03",
  },
  {
    slug: "saint-vanity-windbreaker",
    name: "Saint Vanity Windbreaker",
    categoryKey: "jackets",
    reference: "7801283101",
    cny: 240,
    image: "https://www.cnbuycha.com/uploads/allimg/20260706/1-260F6161Z0626.webp",
    url: "https://www.cnbuycha.com/AllProducts/3349.html",
    lastChecked: "2026-08-03",
  },
  {
    slug: "hello-kitty-plush-pants",
    name: "Hello Kitty Plush Pants",
    categoryKey: "pants",
    reference: "7801003304",
    cny: 49,
    image: "https://www.cnbuycha.com/uploads/allimg/20260701/1-260F1153153Z5.webp",
    url: "https://www.cnbuycha.com/AllProducts/3336.html",
    featured: true,
    lastChecked: "2026-08-03",
  },
  {
    slug: "balenciaga-shorts",
    name: "Balenciaga Shorts",
    categoryKey: "pants",
    reference: "7785855069",
    cny: 260,
    image: "https://www.cnbuycha.com/uploads/allimg/20260615/1-26061520402A92.webp",
    url: "https://www.cnbuycha.com/AllProducts/3319.html",
    lastChecked: "2026-08-03",
  },
  {
    slug: "louis-vuitton-shorts",
    name: "Louis Vuitton Shorts",
    categoryKey: "pants",
    reference: "7788831408",
    cny: 100,
    image: "https://www.cnbuycha.com/uploads/allimg/20260615/1-2606151639349D.webp",
    url: "https://www.cnbuycha.com/AllProducts/3314.html",
    lastChecked: "2026-08-03",
  },
  {
    slug: "gucci-hat",
    name: "GUCCI Hat",
    sourceName: "GUCCI hat",
    categoryKey: "headwear",
    reference: "7813802324",
    cny: 75,
    image: "https://www.cnbuycha.com/uploads/allimg/20260722/1-260H221155C13.webp",
    url: "https://www.cnbuycha.com/AllProducts/3371.html",
    featured: true,
    lastChecked: "2026-08-03",
  },
  {
    slug: "designer-tie-collection",
    name: "Designer Tie Collection",
    sourceName: "LV Burberry Gucci Prada Dior Hermès Tie",
    categoryKey: "headwear",
    reference: "7818001554",
    cny: 203,
    image: "https://www.cnbuycha.com/uploads/allimg/20260729/1-260H9211100531.jpg",
    url: "https://www.cnbuycha.com/AllProducts/3373.html",
    lastChecked: "2026-08-03",
  },
  {
    slug: "syna-world-mask",
    name: "Syna World Mask",
    categoryKey: "headwear",
    reference: "7801310707",
    cny: 69,
    image: "https://www.cnbuycha.com/uploads/allimg/20260706/1-260F6162300Y3.webp",
    url: "https://www.cnbuycha.com/AllProducts/3351.html",
    lastChecked: "2026-08-03",
  },
  {
    slug: "louis-vuitton-wallet",
    name: "Louis Vuitton Wallet",
    categoryKey: "accessories",
    reference: "7818117724",
    cny: 115,
    image: "https://www.cnbuycha.com/uploads/allimg/20260729/1-260H9212KN32.webp",
    url: "https://www.cnbuycha.com/AllProducts/3382.html",
    featured: true,
    lastChecked: "2026-08-03",
  },
  {
    slug: "coach-backpack",
    name: "COACH Backpack (Multiple Styles)",
    sourceName: "COACH BACKPACK(+Styles)",
    categoryKey: "accessories",
    reference: "7818068566",
    cny: 180,
    image: "https://www.cnbuycha.com/uploads/allimg/20260729/1-260H921195S58.webp",
    url: "https://www.cnbuycha.com/AllProducts/3377.html",
    lastChecked: "2026-08-03",
  },
  {
    slug: "nike-elite-backpack",
    name: "Nike Elite Backpack",
    categoryKey: "accessories",
    reference: "7804348058",
    cny: 89,
    image: "https://www.cnbuycha.com/uploads/allimg/20260706/1-260F6161259202.webp",
    url: "https://www.cnbuycha.com/AllProducts/3346.html",
    lastChecked: "2026-08-03",
  },
  {
    slug: "premier-league-jersey",
    name: "2024 Premier League Jersey",
    sourceName: "2024 Premier League Jersey Haaland Havertz Jesus",
    categoryKey: "jersey",
    reference: "7748634331",
    cny: 89,
    image: "https://www.cnbuycha.com/uploads/allimg/20260428/1-26042Q51456234.jpg",
    url: "https://www.cnbuycha.com/AllProducts/3204.html",
    featured: true,
    lastChecked: "2026-08-03",
  },
  {
    slug: "germany-world-cup-jersey",
    name: "Germany World Cup Jersey (28 Styles)",
    sourceName: "2024 Germany World Cup Muller Havertz Jersey(28 styles)",
    categoryKey: "jersey",
    reference: "7754483748",
    cny: 99,
    image: "https://www.cnbuycha.com/uploads/allimg/20260430/1-260430212R11E.jpg",
    url: "https://www.cnbuycha.com/AllProducts/3208.html",
    lastChecked: "2026-08-03",
  },
  {
    slug: "premier-league-player-version",
    name: "Premier League Player-Version Jersey (12 Styles)",
    sourceName: "Premier League club player version football jersey (12 Styles)",
    categoryKey: "jersey",
    reference: "7751350455",
    cny: 88,
    image: "https://www.cnbuycha.com/uploads/allimg/20260430/1-2604302126395I.jpg",
    url: "https://www.cnbuycha.com/AllProducts/3207.html",
    lastChecked: "2026-08-03",
  },
  {
    slug: "samsung-galaxy-watch8",
    name: "Samsung Galaxy Watch8",
    categoryKey: "electronics",
    reference: "7808981470",
    cny: 218,
    image: "https://www.cnbuycha.com/uploads/allimg/20260713/1-260G31A40J10.webp",
    url: "https://www.cnbuycha.com/AllProducts/3357.html",
    lastChecked: "2026-08-03",
  },
  {
    slug: "audemars-piguet-royal-oak-watch",
    name: "Audemars Piguet Royal Oak / AP x SWATCH / Rolex Watches",
    categoryKey: "electronics",
    reference: "7810821907",
    cny: 328,
    image: "https://www.cnbuycha.com/uploads/allimg/20260722/1-260H220595b51.webp",
    url: "https://www.cnbuycha.com/AllProducts/3365.html",
    lastChecked: "2026-08-03",
  },
  {
    slug: "audemars-cartier-watch",
    name: "Audemars Role Cartier Watches",
    sourceName: "Audemars Role Cartier Watches Square dial Watches Swatch x AP Royal Pop Savonnette Pocket Watch Mechanical Black White Clock Pocket Watch",
    categoryKey: "electronics",
    reference: "7810821909",
    cny: 88,
    image: "https://www.cnbuycha.com/uploads/allimg/20260722/1-260H2205K3353.webp",
    url: "https://www.cnbuycha.com/AllProducts/3364.html",
    lastChecked: "2026-08-03",
  },
  {
    slug: "jellycat",
    name: "Jellycat",
    categoryKey: "other",
    reference: "7805846905",
    cny: 39,
    image: "https://www.cnbuycha.com/uploads/allimg/20260713/1-260G31F043940.webp",
    url: "https://www.cnbuycha.com/AllProducts/3361.html",
    lastChecked: "2026-08-03",
  },
  {
    slug: "gucci-perfume",
    name: "Gucci Perfume",
    categoryKey: "other",
    reference: "7801355701",
    cny: 135,
    image: "https://www.cnbuycha.com/uploads/allimg/20260706/1-260F6160ZbZ.webp",
    url: "https://www.cnbuycha.com/AllProducts/3344.html",
    lastChecked: "2026-08-03",
  },
  {
    slug: "keychain",
    name: "Keychain",
    categoryKey: "other",
    reference: "7792486783",
    cny: 89,
    image: "https://www.cnbuycha.com/uploads/allimg/20260623/1-26062320564L46.webp",
    url: "https://www.cnbuycha.com/AllProducts/3324.html",
    lastChecked: "2026-08-03",
  },
] as const;

export const categoryDestinations: Record<CategoryKey, string> = {
  shoes: "https://www.cnbuycha.com/shoes/",
  sweatshirts: "https://www.cnbuycha.com/hoodies-sweaters/",
  tshirts: "https://www.cnbuycha.com/t-shirts/",
  jackets: "https://www.cnbuycha.com/jackets/",
  pants: "https://www.cnbuycha.com/pants-shorts/",
  headwear: "https://www.cnbuycha.com/headwear/",
  accessories: "https://www.cnbuycha.com/accessories/",
  jersey: "https://www.cnbuycha.com/jersey/",
  electronics: "https://www.cnbuycha.com/electronics/",
  other: "https://www.cnbuycha.com/other-stuff/",
};

export const featuredProducts = products.filter((product) => product.featured);
export const productRoutes = products.map((product) => `products/${product.slug}` as ProductRoute);
export const categoryRoutes = categoryOrder.map((key) => `categories/${key}` as CategoryRoute);

export function productRoute(slug: string): ProductRoute {
  return `products/${slug}`;
}

export function categoryRoute(key: CategoryKey): CategoryRoute {
  return `categories/${key}`;
}

export function productFromRoute(route: string): Product | undefined {
  if (!route.startsWith("products/")) return undefined;
  return products.find((product) => product.slug === route.slice("products/".length));
}

export function categoryFromRoute(route: string): CategoryKey | undefined {
  if (!route.startsWith("categories/")) return undefined;
  const value = route.slice("categories/".length);
  return categoryOrder.find((key) => key === value);
}

export function productsForCategory(category: CategoryKey): readonly Product[] {
  return products.filter((product) => product.categoryKey === category);
}
