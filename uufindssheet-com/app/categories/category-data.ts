export type CategoryListing = {
  name: string;
  listingId: string;
  price: string;
  image: string;
  detailUrl: string;
  filterNote: string;
};

export type CategoryLanding = {
  slug: "shoes" | "hoodies" | "jersey" | "accessories";
  name: string;
  keyword: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  categoryUrl: string;
  filterTips: { title: string; text: string }[];
  listings: CategoryListing[];
};

export const categoryLandings: CategoryLanding[] = [
  {
    slug: "shoes",
    name: "Shoes",
    keyword: "uufinds shoes spreadsheet",
    title: "UUFinds Shoes Spreadsheet 2026: Product Finds & QC Tips",
    description: "Browse a focused UUFinds shoes spreadsheet with distinct footwear finds, checked prices, quick filtering notes and exact matching product pages.",
    h1: "UUFinds Shoes Spreadsheet",
    intro: "Use this focused shoes landing page to compare four different footwear listings without sorting through unrelated categories. Prices and destinations were checked on August 8, 2026; confirm the current size options, seller information and available QC evidence before deciding.",
    categoryUrl: "https://www.cnbuycha.com/shoes/",
    filterTips: [
      { title: "Choose the use case", text: "Separate indoor comfort, everyday trainers and running-focused designs before comparing price." },
      { title: "Check shape first", text: "Use matched QC photos to compare toe shape, heel construction, panel spacing and outsole pattern." },
      { title: "Verify sizing", text: "Open the exact detail page and look for measurements or size guidance; a familiar model name does not guarantee a familiar fit." },
      { title: "Keep the exact ID", text: "Match the listing ID when researching QC so a visually similar shoe is not treated as the same product." },
    ],
    listings: [
      {
        name: "Fuzzy Slippers",
        listingId: "7815098103",
        price: "91",
        image: "/product-images/category-fuzzy-slippers.webp",
        detailUrl: "https://www.cnbuycha.com/AllProducts/3379.html",
        filterNote: "Indoor slip-on option; compare lining coverage, sole shape and visible sizing details.",
      },
      {
        name: "New Balance 1906R",
        listingId: "7818078364",
        price: "300",
        image: "/product-images/category-new-balance-1906r.webp",
        detailUrl: "https://www.cnbuycha.com/AllProducts/3378.html",
        filterNote: "Lifestyle runner; inspect mesh panels, overlays, heel structure and outsole alignment.",
      },
      {
        name: "HOKA Speedgoat 5 Trail Running Shoes",
        listingId: "7806024805",
        price: "218",
        image: "/product-images/1-260G31AHDQ.webp",
        detailUrl: "https://www.cnbuycha.com/AllProducts/3359.html",
        filterNote: "Trail-oriented shape; compare upper proportions, heel height and tread pattern from several angles.",
      },
      {
        name: "Adidas Futurecraft 4D Running Shoes",
        listingId: "7801363863",
        price: "210",
        image: "/product-images/category-adidas-futurecraft-4d.jpg",
        detailUrl: "https://www.cnbuycha.com/AllProducts/3348.html",
        filterNote: "Structured midsole design; focus on lattice consistency, upper shape and the upper-to-sole join.",
      },
    ],
  },
  {
    slug: "hoodies",
    name: "Hoodies",
    keyword: "uufinds hoodies spreadsheet",
    title: "UUFinds Hoodies Spreadsheet 2026: Product Finds & QC Tips",
    description: "Browse a focused UUFinds hoodies spreadsheet with non-duplicate sweatshirt finds, checked prices, filtering notes and exact product pages.",
    h1: "UUFinds Hoodies Spreadsheet",
    intro: "This landing page keeps hoodies and sweatshirts separate from the general spreadsheet so you can compare four distinct listings by style, price and the details that matter in QC photos. Prices and destinations were checked on August 8, 2026.",
    categoryUrl: "https://www.cnbuycha.com/hoodies-sweaters/",
    filterTips: [
      { title: "Pick a construction", text: "Decide between a hoodie, crewneck sweatshirt or lighter knit before comparing graphics and price." },
      { title: "Compare measurements", text: "Check chest width, body length, sleeve length and shoulder line rather than relying only on a letter size." },
      { title: "Inspect placement", text: "For printed or embroidered pieces, compare scale, centring, edge finish and distance from seams." },
      { title: "Check the live variant", text: "Multi-style listings need an extra check that the selected colour or design matches the QC set you reviewed." },
    ],
    listings: [
      {
        name: "Canada Goose Sweatshirt",
        listingId: "7815092173",
        price: "229",
        image: "/product-images/category-canada-goose-sweatshirt.webp",
        detailUrl: "https://www.cnbuycha.com/AllProducts/3380.html",
        filterNote: "Crewneck option; compare neckline shape, ribbing, badge placement and overall proportions.",
      },
      {
        name: "Nike Sweater",
        listingId: "7818023240",
        price: "264",
        image: "/product-images/category-nike-sweater.jpg",
        detailUrl: "https://www.cnbuycha.com/AllProducts/3375.html",
        filterNote: "Sweater-style listing; check knit or fabric texture, logo position, cuffs and hem finish.",
      },
      {
        name: "Maison Margiela Hoodie",
        listingId: "7806044269",
        price: "130",
        image: "/product-images/1-260G31AZ3Y4.webp",
        detailUrl: "https://www.cnbuycha.com/AllProducts/3360.html",
        filterNote: "Pullover hoodie; inspect hood shape, print placement, seam alignment and garment measurements.",
      },
      {
        name: "Denim Tears Cotton Bloom Sweatshirt",
        listingId: "7786991498",
        price: "144.5",
        image: "/product-images/category-denim-tears-sweatshirt.webp",
        detailUrl: "https://www.cnbuycha.com/AllProducts/3309.html",
        filterNote: "Eight-style listing; verify the chosen design before comparing print spacing, cuffs and fabric surface.",
      },
    ],
  },
  {
    slug: "jersey",
    name: "Jersey",
    keyword: "uufinds jersey spreadsheet",
    title: "UUFinds Jersey Spreadsheet 2026: Product Finds & QC Tips",
    description: "Browse a focused UUFinds jersey spreadsheet with four distinct teamwear finds, checked prices, filtering notes and exact matching product pages.",
    h1: "UUFinds Jersey Spreadsheet",
    intro: "Use this jersey landing page to compare four distinct football shirt listings instead of mixing teamwear with general clothing finds. Prices and destinations were checked on August 8, 2026; re-check the selected player, season, size and customisation on the live product page.",
    categoryUrl: "https://www.cnbuycha.com/Jersey/",
    filterTips: [
      { title: "Confirm the edition", text: "Separate season, national-team, club and player versions before comparing otherwise similar designs." },
      { title: "Match the selected style", text: "Multi-style pages require the colour, player name, number and patch options to match the QC material." },
      { title: "Read measurements", text: "Compare chest width and body length with a jersey you own; teamwear sizing can vary by cut and seller." },
      { title: "Inspect print details", text: "Check crest, sponsor, name and number alignment, plus collar, sleeve and side-seam construction." },
    ],
    listings: [
      {
        name: "2024 Germany Müller / Havertz Jersey",
        listingId: "7754483748",
        price: "99",
        image: "/product-images/category-germany-2024-jersey.jpg",
        detailUrl: "https://www.cnbuycha.com/AllProducts/3208.html",
        filterNote: "Multi-style national-team listing; verify player, number and patch selection before comparing QC.",
      },
      {
        name: "2024 Manchester City Haaland / De Bruyne Jersey",
        listingId: "7754464120",
        price: "99",
        image: "/product-images/category-manchester-city-2024-jersey.jpg",
        detailUrl: "https://www.cnbuycha.com/AllProducts/3206.html",
        filterNote: "Club player listing; compare crest and sponsor placement plus the selected name and number.",
      },
      {
        name: "2024 Croatia Modrić / Perišić Jersey",
        listingId: "7751542480",
        price: "89",
        image: "/product-images/category-croatia-2024-jersey.jpg",
        detailUrl: "https://www.cnbuycha.com/AllProducts/3202.html",
        filterNote: "National-team shirt; inspect checker alignment, collar finish and the chosen player details.",
      },
      {
        name: "2025–2026 Football Jersey — 25 Styles",
        listingId: "7709831123",
        price: "89",
        image: "/product-images/category-football-2025-26-jersey.jpg",
        detailUrl: "https://www.cnbuycha.com/AllProducts/2890.html",
        filterNote: "Broad multi-style listing; identify the exact club and version before treating any QC set as relevant.",
      },
    ],
  },
  {
    slug: "accessories",
    name: "Accessories",
    keyword: "uufinds accessories spreadsheet",
    title: "UUFinds Accessories Spreadsheet 2026: Bags, Wallets & QC Tips",
    description: "Browse a focused UUFinds accessories spreadsheet with four distinct bags and wallets, checked prices, filtering notes and exact product pages.",
    h1: "UUFinds Accessories Spreadsheet",
    intro: "Use this accessories landing page to compare four distinct bag and wallet listings without mixing them with clothing or electronics. Product names, prices, IDs, images and destinations were checked on August 8, 2026; confirm the live variant and any matching QC evidence before deciding.",
    categoryUrl: "https://www.cnbuycha.com/accessories/",
    filterTips: [
      { title: "Choose the accessory type", text: "Separate backpacks, shoulder bags and wallets before comparing price, capacity or construction." },
      { title: "Check useful proportions", text: "Compare overall shape, pocket layout, strap length and visible measurements with how you plan to use the item." },
      { title: "Inspect stress points", text: "Use matched QC photos to review zipper tracks, strap anchors, edge paint, stitching and hardware attachment." },
      { title: "Keep the exact product ID", text: "Bag and wallet listings can look similar, so match the ID, selected colour and seller link before relying on a QC set." },
    ],
    listings: [
      {
        name: "Adidas Bag",
        listingId: "7818924737",
        price: "179",
        image: "/product-images/category-adidas-bag.webp",
        detailUrl: "https://www.cnbuycha.com/AllProducts/3389.html",
        filterNote: "Multi-view bag listing; compare silhouette, pocket layout, strap attachment and zipper alignment.",
      },
      {
        name: "Nike Elite Backpack",
        listingId: "7804348058",
        price: "89",
        image: "/product-images/1-260F6161259202.webp",
        detailUrl: "https://www.cnbuycha.com/AllProducts/3346.html",
        filterNote: "Backpack option; inspect panel alignment, zipper tracks, shoulder-strap stitching and interior space.",
      },
      {
        name: "Nike Bag",
        listingId: "7798017133",
        price: "69",
        image: "/product-images/category-nike-bag.webp",
        detailUrl: "https://www.cnbuycha.com/AllProducts/3342.html",
        filterNote: "Compact bag listing; compare handle and strap placement, seam finish, pocket shape and dimensions.",
      },
      {
        name: "Carhartt Wallet",
        listingId: "7788829484",
        price: "85",
        image: "/product-images/category-carhartt-wallet.webp",
        detailUrl: "https://www.cnbuycha.com/AllProducts/3322.html",
        filterNote: "Wallet listing; check fold alignment, edge finish, card-slot spacing, logo placement and closure details.",
      },
    ],
  },
];

export function getCategoryLanding(slug: string) {
  return categoryLandings.find((category) => category.slug === slug);
}
