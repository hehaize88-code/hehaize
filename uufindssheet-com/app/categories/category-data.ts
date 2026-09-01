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
    intro: "Use this focused shoes landing page to compare four different footwear listings without sorting through unrelated categories. Prices and destinations were checked on September 1, 2026; confirm the current size options, seller information and available QC evidence before deciding.",
    categoryUrl: "https://cnbuycha.com/shoes/",
    filterTips: [
      { title: "Choose the use case", text: "Separate indoor comfort, everyday trainers and running-focused designs before comparing price." },
      { title: "Check shape first", text: "Use matched QC photos to compare toe shape, heel construction, panel spacing and outsole pattern." },
      { title: "Verify sizing", text: "Open the exact detail page and look for measurements or size guidance; a familiar model name does not guarantee a familiar fit." },
      { title: "Keep the exact ID", text: "Match the listing ID when researching QC so a visually similar shoe is not treated as the same product." },
    ],
    listings: [
      {
        name: "Lacoste Green Fashion Sneakers",
        listingId: "7837491967",
        price: "33.06",
        image: "https://si.geilicdn.com/pcitem2047173755-67fd0000019d0b76332f0a239846_1074_1280.jpg",
        detailUrl: "https://cnbuycha.com/shoes/3418.html",
        filterNote: "Fashion sneaker listing; compare upper shape, panel alignment, heel construction and outsole finish.",
      },
      {
        name: "PK 03-Fashionable sneakers",
        listingId: "7840423590",
        price: "63.61",
        image: "https://si.geilicdn.com/pcitem777921373-5aa400000195cc4de7ec0a81347d_1200_1200.jpg",
        detailUrl: "https://cnbuycha.com/shoes/3417.html",
        filterNote: "Fashion sneaker listing; inspect toe shape, overlays, heel symmetry and outsole alignment.",
      },
      {
        name: "White Leather Fashion Sneakers with Zebra Heel",
        listingId: "7837468389",
        price: "63.89",
        image: "https://si.geilicdn.com/open1734448301-1234478995-49670000019909db00520a22d249_800_800.jpg",
        detailUrl: "https://cnbuycha.com/shoes/3416.html",
        filterNote: "Leather sneaker listing; compare panel edges, heel pattern, left-right shape and stitching.",
      },
      {
        name: "HJ 00-2025 Sole classic casual shoes",
        listingId: "7831516792",
        price: "39.31",
        image: "https://si.geilicdn.com/pcitem901972187166-2b370000019970101c8d0a8133cc_440_276.jpg",
        detailUrl: "https://cnbuycha.com/shoes/3409.html",
        filterNote: "Casual shoe listing; focus on proportions, upper-to-sole join, heel shape and tread consistency.",
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
    intro: "This landing page keeps hoodies and sweatshirts separate from the general spreadsheet so you can compare four distinct listings by style, price and the details that matter in QC photos. Prices and destinations were checked on September 1, 2026.",
    categoryUrl: "https://cnbuycha.com/hoodies-sweaters/",
    filterTips: [
      { title: "Pick a construction", text: "Decide between a hoodie, crewneck sweatshirt or lighter knit before comparing graphics and price." },
      { title: "Compare measurements", text: "Check chest width, body length, sleeve length and shoulder line rather than relying only on a letter size." },
      { title: "Inspect placement", text: "For printed or embroidered pieces, compare scale, centring, edge finish and distance from seams." },
      { title: "Check the live variant", text: "Multi-style listings need an extra check that the selected colour or design matches the QC set you reviewed." },
    ],
    listings: [
      {
        name: "1500-OG 9 Pullover polar fleece autumn and winter warm padded casual hooded men's and women's vests",
        listingId: "7818019286",
        price: "55.42",
        image: "https://si.geilicdn.com/open1293584826-1234478995-69d700000192b84fb0220a8115b5_799_1066.jpg",
        detailUrl: "https://cnbuycha.com/hoodies-sweaters/3426.html",
        filterNote: "Hooded fleece vest listing; compare pile, padding, hood construction, arm openings and zipper alignment.",
      },
      {
        name: "Autumn and winter new fashion sweater",
        listingId: "7813733346",
        price: "41.60",
        image: "https://si.geilicdn.com/open1623462477-1234478995-07080000019749bc02df0aa08290_1200_1200.jpg",
        detailUrl: "https://cnbuycha.com/hoodies-sweaters/3413.html",
        filterNote: "Sweater listing; check knit texture, neckline, shoulder proportions, cuffs and hem finish.",
      },
      {
        name: "Co Big C Camouflage Embroidery with Mauhair Crewneck Sweater",
        listingId: "7810786445",
        price: "50.48",
        image: "https://si.geilicdn.com/open772349099-1234478995-5abf00000198c91be1cd0a22d249_818_818.jpg",
        detailUrl: "https://cnbuycha.com/hoodies-sweaters/3412.html",
        filterNote: "Crewneck sweater listing; inspect knit surface, embroidery edges, neckline, cuffs and measurements.",
      },
      {
        name: "Loose printed hooded sweater for men and women",
        listingId: "7797975195",
        price: "20.14",
        image: "https://si.geilicdn.com/pcitem901940024420-6e5500000199ccddce200a21146b_4594_4593.jpg",
        detailUrl: "https://cnbuycha.com/hoodies-sweaters/3373.html",
        filterNote: "Printed hooded sweater; verify the selected design before comparing print spacing, cuffs and fabric surface.",
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
    intro: "Use this jersey landing page to compare four distinct football shirt listings instead of mixing teamwear with general clothing finds. Prices and destinations were checked on September 1, 2026; re-check the selected player, season, size and customisation on the live product page.",
    categoryUrl: "https://cnbuycha.com/jersey/",
    filterTips: [
      { title: "Confirm the edition", text: "Separate season, national-team, club and player versions before comparing otherwise similar designs." },
      { title: "Match the selected style", text: "Multi-style pages require the colour, player name, number and patch options to match the QC material." },
      { title: "Read measurements", text: "Compare chest width and body length with a jersey you own; teamwear sizing can vary by cut and seller." },
      { title: "Inspect print details", text: "Check crest, sponsor, name and number alignment, plus collar, sleeve and side-seam construction." },
    ],
    listings: [
      {
        name: "World Cup jerseys: Brazil, Argentina, Mexico, Germany, Spain, Portugal, and the USA–Canada–Mexico football kits.",
        listingId: "7831491050",
        price: "19.17",
        image: "https://si.geilicdn.com/pcitem902067221760-658f0000019dfdbc6d370a23047e-unadjust_924_924.png",
        detailUrl: "https://cnbuycha.com/jersey/3407.html",
        filterNote: "Multi-team listing; verify national team, edition, number and patch selection before comparing QC.",
      },
      {
        name: "Fashionable All-match Jersey Short-Sleeve（1 number）",
        listingId: "7788837248",
        price: "17.92",
        image: "https://si.geilicdn.com/open1817836269-1234478995-3b4100000196edcfbe960a22d249_800_800.jpg",
        detailUrl: "https://cnbuycha.com/jersey/3292.html",
        filterNote: "Short-sleeve jersey listing; compare number placement, collar, shoulder seams and selected style.",
      },
      {
        name: "2024 Germany World Cup Muller Havertz Jersey(28 styles)",
        listingId: "7754483748",
        price: "13.75",
        image: "https://cnbuycha.com/uploads/allimg/20260430/1-260430212R11E.jpg",
        detailUrl: "https://cnbuycha.com/jersey/3208.html",
        filterNote: "Multi-style national-team listing; verify player, number and patch selection before comparing QC.",
      },
      {
        name: "Premier League club player version football jersey (12 Styles)",
        listingId: "7751350455",
        price: "12.22",
        image: "https://cnbuycha.com/uploads/allimg/20260430/1-2604302126395I.jpg",
        detailUrl: "https://cnbuycha.com/jersey/3207.html",
        filterNote: "Multi-style club listing; identify the exact club, player and version before treating any QC set as relevant.",
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
    intro: "Use this accessories landing page to compare four distinct accessory listings without mixing them with clothing or electronics. Product names, prices, IDs, images and destinations were checked on September 1, 2026; confirm the live variant and any matching QC evidence before deciding.",
    categoryUrl: "https://cnbuycha.com/accessories/",
    filterTips: [
      { title: "Choose the accessory type", text: "Separate backpacks, shoulder bags and wallets before comparing price, capacity or construction." },
      { title: "Check useful proportions", text: "Compare overall shape, pocket layout, strap length and visible measurements with how you plan to use the item." },
      { title: "Inspect stress points", text: "Use matched QC photos to review zipper tracks, strap anchors, edge paint, stitching and hardware attachment." },
      { title: "Keep the exact product ID", text: "Bag and wallet listings can look similar, so match the ID, selected colour and seller link before relying on a QC set." },
    ],
    listings: [
      {
        name: "Ji bracelet",
        listingId: "7828321581",
        price: "24.31",
        image: "https://si.geilicdn.com/open1817836269-1234478995-32b20000019846819eee0a8115c2_1000_1000.jpg",
        detailUrl: "https://cnbuycha.com/accessories/3410.html",
        filterNote: "Bracelet listing; compare clasp, link alignment, surface finish and visible dimensions.",
      },
      {
        name: "Luminous wristwatch, birthday gift, calendar watch, men’s watch, mechanical sports watch, mechanical timepiece",
        listingId: "7820097463",
        price: "44.44",
        image: "https://si.geilicdn.com/pcitem1754635574-742f00000191ca2b3e660a20e35c_1747_1733.jpg",
        detailUrl: "https://cnbuycha.com/accessories/3390.html",
        filterNote: "Watch listing; inspect dial alignment, casing, crown, strap connection and included pieces.",
      },
      {
        name: "XJXPCS New fashion all-match backpack-01",
        listingId: "7818924737",
        price: "24.86",
        image: "https://si.geilicdn.com/open1874129237-1234478995-7c450000019660da62230a8133b0_800_800.jpg",
        detailUrl: "https://cnbuycha.com/accessories/3378.html",
        filterNote: "Backpack listing; inspect panel alignment, zipper tracks, shoulder-strap stitching and interior space.",
      },
      {
        name: "Aluminum Carry-On Suitcase",
        listingId: "7815015337",
        price: "121.67",
        image: "https://si.geilicdn.com/pcitem1990432175-1ad80000019a594b73b40a23037f-unadjust_914_850.png",
        detailUrl: "https://cnbuycha.com/accessories/3369.html",
        filterNote: "Suitcase listing; check shell alignment, handle, wheels, closures, corners and interior layout.",
      },
    ],
  },
];

export function getCategoryLanding(slug: string) {
  return categoryLandings.find((category) => category.slug === slug);
}
