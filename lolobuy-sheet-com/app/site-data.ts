export const destinationBase = "https://www.cnbuycha.com";

export type ProductKind =
  | "eyewear"
  | "headwear"
  | "hoodie"
  | "shoes"
  | "bag"
  | "jacket";

export type ProductFind = {
  slug: string;
  name: string;
  image: string;
  destinationHref: string;
  listingReference: string;
  kind: ProductKind;
  category: string;
  tags: ("all" | "new" | "trending" | "essential")[];
  description: string;
};

export const productFinds: ProductFind[] = [
  {
    slug: "snow-ski-goggles",
    name: "Snow ski goggles",
    image: "/product-finds/snow-ski-goggles-1-320.webp",
    destinationHref: `${destinationBase}/AllProducts/3372.html`,
    listingReference: "3372",
    kind: "eyewear",
    category: "Eyewear",
    tags: ["all", "new", "trending"],
    description:
      "A visual product-directory entry for snow ski goggles. Use the current listing to confirm the selected lens, frame option, included pieces and current availability before ordering.",
  },
  {
    slug: "gucci-hat",
    name: "Gucci hat",
    image: "/product-finds/gucci-hat-1-320.webp",
    destinationHref: `${destinationBase}/AllProducts/3371.html`,
    listingReference: "3371",
    kind: "headwear",
    category: "Headwear",
    tags: ["all", "new", "essential"],
    description:
      "A visual product-directory entry for a Gucci-labelled hat. Confirm the exact option, dimensions, construction details and live listing information rather than relying on the directory image alone.",
  },
  {
    slug: "off-white-hoodies",
    name: "Off-White hoodies",
    image: "/product-finds/off-white-hoodies-1-320.webp",
    destinationHref: `${destinationBase}/AllProducts/3369.html`,
    listingReference: "3369",
    kind: "hoodie",
    category: "Hoodies & sweaters",
    tags: ["all", "trending", "essential"],
    description:
      "A visual product-directory entry for Off-White-labelled hoodies. Check the chosen design, garment measurements, print placement and live variant information before making a decision.",
  },
  {
    slug: "numeris-high-top-shoes",
    name: "Numeris high-top shoes",
    image: "/product-finds/numeris-high-top-shoes-1-320.webp",
    destinationHref: `${destinationBase}/AllProducts/3367.html`,
    listingReference: "3367",
    kind: "shoes",
    category: "Shoes",
    tags: ["all", "new", "trending"],
    description:
      "A visual product-directory entry for Numeris high-top shoes. Verify the selected size and color, then use measurements and warehouse photos to check the pair that actually arrives.",
  },
  {
    slug: "hoka-speedgoat-5",
    name: "HOKA Speedgoat 5",
    image: "/product-finds/hoka-speedgoat-5-1-320.webp",
    destinationHref: `${destinationBase}/AllProducts/3359.html`,
    listingReference: "3359",
    kind: "shoes",
    category: "Shoes",
    tags: ["all", "new", "trending"],
    description:
      "A visual product-directory entry for a HOKA Speedgoat 5-labelled shoe. Confirm the current option, size information and listing details, then compare both shoes during warehouse QC.",
  },
  {
    slug: "nike-elite-backpack",
    name: "Nike Elite backpack",
    image: "/product-finds/nike-elite-backpack-1-320.webp",
    destinationHref: `${destinationBase}/AllProducts/3346.html`,
    listingReference: "3346",
    kind: "bag",
    category: "Bags",
    tags: ["all", "trending", "essential"],
    description:
      "A visual product-directory entry for a Nike Elite-labelled backpack. Confirm dimensions, compartments, straps, closures and the chosen color on the current listing before ordering.",
  },
  {
    slug: "balenciaga-puffer",
    name: "Balenciaga puffer",
    image: "/product-finds/balenciaga-puffer-1-320.webp",
    destinationHref: `${destinationBase}/AllProducts/3343.html`,
    listingReference: "3343",
    kind: "jacket",
    category: "Outerwear",
    tags: ["all", "trending"],
    description:
      "A visual product-directory entry for a Balenciaga-labelled puffer jacket. Compare garment measurements, closures, panel alignment and fill distribution before accepting the warehouse arrival.",
  },
  {
    slug: "winter-hooded-jacket",
    name: "Winter hooded jacket",
    image: "/product-finds/winter-hooded-jacket-1-320.webp",
    destinationHref: `${destinationBase}/AllProducts/3341.html`,
    listingReference: "3341",
    kind: "jacket",
    category: "Outerwear",
    tags: ["all", "trending", "essential"],
    description:
      "A visual product-directory entry for a winter hooded jacket. Check the selected size and color, garment measurements, hood, closures, pockets and visible construction before shipping.",
  },
];

export const categories = [
  {
    name: "Shoes",
    slug: "shoes",
    image: "/products/sneakers.webp",
    href: `${destinationBase}/shoes/`,
    description:
      "Browse running shoes, casual silhouettes, slides and other footwear, then check the current listing before ordering.",
  },
  {
    name: "Hoodies & Sweaters",
    slug: "hoodies-sweaters",
    image: "/products/hoodie.webp",
    href: `${destinationBase}/hoodies-sweaters/`,
    description:
      "Explore hoodies, crewnecks and knitwear with size, fabric and measurement checks in mind.",
  },
  {
    name: "Jackets",
    slug: "jackets",
    image: "/products/jacket.webp",
    href: `${destinationBase}/jackets/`,
    description:
      "Find lightweight layers and heavier outerwear while accounting for material, construction and packed volume.",
  },
  {
    name: "Pants & Shorts",
    slug: "pants-shorts",
    image: "/products/cargo-pants.webp",
    href: `${destinationBase}/pants-shorts/`,
    description:
      "Compare casual trousers, cargo styles and shorts using garment measurements rather than the size label alone.",
  },
  {
    name: "Headwear",
    slug: "headwear",
    image: "/products/cap.webp",
    href: `${destinationBase}/headwear/`,
    description:
      "Browse caps and other headwear, paying attention to shape, adjustability, embroidery and circumference.",
  },
  {
    name: "Accessories",
    slug: "accessories",
    image: "/products/accessories.webp",
    href: `${destinationBase}/accessories/`,
    description:
      "Explore wallets, jewelry, eyewear and small accessories while checking materials and item dimensions.",
  },
  {
    name: "T-Shirts",
    slug: "t-shirts",
    image: "/products/sweatshirt.webp",
    href: `${destinationBase}/t-shirts/`,
    description:
      "Review tees by print placement, collar construction, fabric weight and the seller's measurement chart.",
  },
  {
    name: "Bags",
    slug: "bags",
    image: "/products/bag.webp",
    href: `${destinationBase}/accessories/`,
    description:
      "Compare backpacks and other bags by dimensions, compartments, straps, closures and the exact selected option.",
  },
  {
    name: "Jersey",
    slug: "jersey",
    image: "/products/jersey.webp",
    href: `${destinationBase}/Jersey/`,
    description:
      "Browse football, basketball and other sports jerseys, then confirm the exact team, season, size and selected version.",
  },
] as const;

export type ArticleSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type ArticleSource = {
  label: string;
  note: string;
};

export type ArticleVisual = {
  eyebrow: string;
  title: string;
  caption: string;
  items: {
    label: string;
    text: string;
  }[];
};

export type Article = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  eyebrow: string;
  published: string;
  updated: string;
  readingTime: string;
  factCheckLine: string;
  visual: ArticleVisual;
  sources: ArticleSource[];
  intro: string[];
  sections: ArticleSection[];
};

export const articles: Article[] = [
  {
    slug: "lolobuy-spreadsheet-guide",
    title:
      "Lolobuy Spreadsheet Guide 2026: How to Use a Product Directory Without Skipping Verification",
    shortTitle: "How to use a Lolobuy spreadsheet carefully",
    description:
      "A practical guide to using a Lolobuy spreadsheet for discovery, checking source listings, reading QC information and avoiding rushed buying decisions.",
    eyebrow: "SPREADSHEET BASICS",
    published: "2026-07-26",
    updated: "2026-07-26",
    readingTime: "13 min read",
    factCheckLine:
      "Fact-checked against LoloBuy's public website and current community ordering guide on July 26, 2026.",
    visual: {
      eyebrow: "THE FOUR-SOURCE RULE",
      title: "One decision, four different sources.",
      caption:
        "The directory starts the search. The live listing, warehouse evidence and final parcel quote each take over at a different stage.",
      items: [
        {
          label: "Directory",
          text: "Find a product idea and compare categories.",
        },
        {
          label: "Live listing",
          text: "Confirm the seller, option, current price and description.",
        },
        {
          label: "Warehouse QC",
          text: "Inspect the physical item that arrived for your order.",
        },
        {
          label: "Packed parcel",
          text: "Choose shipping from current weight, dimensions and eligibility.",
        },
      ],
    },
    sources: [
      {
        label: "LoloBuy public website",
        note: "Public purchasing, warehouse inspection, photography and 90-day storage statements.",
      },
      {
        label: "LoloBuy community ordering guide",
        note: "Public nine-stage ordering overview posted in the platform's named Reddit community.",
      },
    ],
    intro: [
      "A useful Lolobuy spreadsheet is not simply a long wall of product links. Its real job is to reduce the time between having a vague idea and reaching a listing that you can evaluate properly. Categories, clear search terms and readable product pages help with discovery; they do not remove the need to verify the seller page, current price, options and shipping restrictions.",
      "This guide explains a cautious workflow for moving from an editorial find to a purchase decision. It deliberately separates what a directory can tell you from what must be confirmed on the destination page or later in warehouse quality-control photos.",
    ],
    sections: [
      {
        heading: "Start with intent, not with an endless feed",
        paragraphs: [
          "Before opening dozens of products, write down the category, preferred material, approximate measurements, acceptable color range and maximum item price. That small brief gives every later comparison a purpose. A shopper looking for a lightweight jacket for spring has a different decision to make from someone seeking a padded winter layer, even when both products sit under the same category.",
          "Use broad category pages to learn the available vocabulary, then narrow your search. Search terms that describe the item itself usually work better than a long string of brand references: try the garment type, material, color or construction detail. If the search result is too broad, remove decorative words and keep the attributes that matter.",
        ],
        bullets: [
          "Define the item type and its intended use.",
          "Record must-have measurements or fit preferences.",
          "Set separate limits for the item price and the total landed cost.",
          "Keep two or three candidates instead of committing to the first result.",
        ],
      },
      {
        heading: "Treat every directory entry as a lead",
        paragraphs: [
          "Product directories can organize links, but listings are controlled by their destination websites. Sellers can change photos, stock, variants, prices, descriptions and shipping availability without the directory changing at exactly the same moment. For that reason, the live destination page is the authority for the current offer.",
          "Open the listing and check that its title, gallery, variant selector and description still refer to the product you expected. A low headline price may belong to a small accessory or a deposit rather than the item shown in the first image. Select the intended color and size before judging the displayed price.",
          "If the seller provides a size chart, compare the garment measurements with an item you already own. Labels such as M or XL are not universal. Shoulder width, chest width, total length, sleeve length, waist and inseam are more useful than the printed size name.",
        ],
      },
      {
        heading: "Know which parts of the LoloBuy flow are publicly confirmed",
        paragraphs: [
          "LoloBuy's public homepage says that it assists with purchases from Chinese online and offline channels and that a shopper can begin by pasting a product link. It also says that, after the merchant sends the item to the warehouse, the warehouse conducts a quality inspection, takes photographs and provides 90 days of free storage. Those are useful, specific claims because they describe the hand-off points a shopper should expect.",
          "A public ordering guide in LoloBuy's named Reddit community expands that flow into account creation, product selection, order submission, payment, procurement, warehouse arrival, QC photos, consolidation, route selection and tracking. We use that guide as supporting context, not as a substitute for the live account. Payment methods, available carriers, coupons and route names can change more quickly than an educational article.",
          "This distinction matters for search quality. A helpful Lolobuy spreadsheet should explain the process the platform actually describes while refusing to invent a permanent fee table, a guaranteed delivery time or a fixed number of free QC images. When a public source is silent, the honest answer is to check the current order screen or ask support before paying.",
        ],
      },
      {
        heading: "Turn a source link into an order note",
        paragraphs: [
          "A raw marketplace URL is not enough when a listing has many options. Alongside the link, record the exact color name, size, quantity and any seller instruction that affects the order. Save the relevant size chart and note whether the displayed price changed after selecting the option. This takes less than a minute and gives the warehouse stage a clean reference.",
          "If a listing uses translated text, keep the original option wording as well as your translation. Two colors can receive nearly identical machine-translated names, and a seller may identify a variation by an image rather than a sentence. A precise note reduces ambiguity without pretending that the directory controls how the seller fulfils the order.",
        ],
        bullets: [
          "Source URL and date checked",
          "Exact option wording and reference image",
          "Size chart or key measurements",
          "Visible product price and domestic-delivery line",
          "One sentence describing the non-negotiable detail",
        ],
      },
      {
        heading: "Be skeptical of spreadsheet claims that outrun the evidence",
        paragraphs: [
          "Words such as verified, best, cheapest and daily updated sound useful but need proof. A product being present in a directory does not prove that the seller is reliable, the item is authentic, the link was checked today or the final parcel will be inexpensive. A responsible directory dates meaningful reviews, links to the live destination and explains what it did and did not verify.",
          "The same rule applies to customer reviews. A detailed post with order context and visible QC examples is more useful than an anonymous five-star sentence, but one successful order still does not establish a platform-wide rate. Read reviews for the specific evidence they contain—handling of a mismatch, image clarity, response timing or parcel outcome—and avoid turning a single report into a universal promise.",
        ],
      },
      {
        heading: "Separate listing photos from warehouse QC photos",
        paragraphs: [
          "Seller photos are marketing material. Warehouse quality-control photos document the physical item that arrived for your order. The two image sets answer different questions. The seller page helps you understand the promised design and options; QC photos help you compare the received item with that p