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
    image:
      "https://www.cnbuycha.com/uploads/allimg/20260722/1-260H2211J0L9.webp",
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
    image:
      "https://www.cnbuycha.com/uploads/allimg/20260722/1-260H221155C13.webp",
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
    image:
      "https://www.cnbuycha.com/uploads/allimg/20260722/1-260H2211102W7.webp",
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
    image:
      "https://www.cnbuycha.com/uploads/allimg/20260722/1-260H2210I0623.webp",
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
    image:
      "https://www.cnbuycha.com/uploads/allimg/20260713/1-260G31AHDQ.webp",
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
    image:
      "https://www.cnbuycha.com/uploads/allimg/20260706/1-260F6161259202.webp",
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
    image:
      "https://www.cnbuycha.com/uploads/allimg/20260706/1-260F6160550120.webp",
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
    image:
      "https://www.cnbuycha.com/uploads/allimg/20260701/1-260F115520U91.webp",
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
    name: "All products",
    slug: "all-products",
    image: "/products/bag.webp",
    href: `${destinationBase}/AllProducts/`,
    description:
      "Search the complete live product directory when a category shortcut is too narrow.",
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
          "Seller photos are marketing material. Warehouse quality-control photos document the physical item that arrived for your order. The two image sets answer different questions. The seller page helps you understand the promised design and options; QC photos help you compare the received item with that promise.",
          "Lolobuy's public shopping flow describes inspection and photographs after an item reaches the warehouse. Exact photo coverage and any optional services can change, so confirm the current service details inside the platform before relying on a particular angle or number of images.",
          "When QC images become available, first verify the basic identity of the item: color, selected variant, quantity and visible size tag. Then move to construction, symmetry and obvious damage. A request for an additional image should be specific—such as a close-up of a seam or a measurement beside a ruler—rather than a general request for a better photo.",
        ],
      },
      {
        heading: "Calculate a decision price, not only an item price",
        paragraphs: [
          "The amount on the product page is only one part of the final cost. Domestic delivery to the warehouse, service charges where applicable, international shipping, packaging choices and destination-country taxes can all affect the total. Bulky but inexpensive items can be costly to ship because some routes use volumetric weight.",
          "A simple planning estimate is enough at the discovery stage: item price plus domestic delivery plus a conservative share of international shipping. Do not present that estimate as a quote. Final shipping options depend on the packed parcel, route, destination and current carrier rules.",
        ],
        bullets: [
          "Check whether domestic shipping is included or added later.",
          "Note estimated item weight and whether the item is unusually bulky.",
          "Leave room for packaging and consolidation changes.",
          "Review the final parcel quote before submitting international shipping.",
        ],
      },
      {
        heading: "Keep a short verification record",
        paragraphs: [
          "When comparing several products, save the destination URL, selected option, seller size chart, current price and the date you checked it. A screenshot can help when a listing changes, but the live page still controls the order. This record also makes it easier to explain a mismatch during the warehouse stage.",
          "Bookmarks on this site are a lightweight browsing aid for the current page session. They are not a guarantee that a listing will stay available. Return to the destination page before ordering and repeat the essential checks.",
        ],
      },
      {
        heading: "The practical rule",
        paragraphs: [
          "Use a Lolobuy spreadsheet to discover and organize. Use the live listing to confirm what is being sold. Use warehouse QC photos to inspect what physically arrived. Use the final parcel quote to choose shipping. Keeping those four stages separate prevents a directory from being mistaken for a seller, an inspector or a freight quotation.",
        ],
      },
    ],
  },
  {
    slug: "how-to-read-qc-photos",
    title:
      "How to Read Warehouse QC Photos: A Practical Checklist for Clothing, Shoes, Bags and Accessories",
    shortTitle: "A practical warehouse QC photo checklist",
    description:
      "Learn what warehouse QC photos can show, what they cannot prove, and how to review shape, measurements, construction, damage and order details.",
    eyebrow: "QC FIELD GUIDE",
    published: "2026-07-26",
    updated: "2026-07-26",
    readingTime: "13 min read",
    factCheckLine:
      "Fact-checked July 26, 2026. LoloBuy publicly confirms warehouse inspection and photos; exact photo counts and paid extras are not stated on its public homepage.",
    visual: {
      eyebrow: "QC TRIAGE",
      title: "Review the evidence in the right order.",
      caption:
        "A calm sequence prevents a tiny cosmetic detail from distracting you from the wrong size, missing piece or structural problem.",
      items: [
        {
          label: "Identity",
          text: "Item, color, size, quantity and included pieces.",
        },
        {
          label: "Structure",
          text: "Shape, symmetry, alignment and visible damage.",
        },
        {
          label: "Measurements",
          text: "Fit-critical dimensions compared with a known item.",
        },
        {
          label: "Action",
          text: "Accept, request one focused check, or use the current remedy.",
        },
      ],
    },
    sources: [
      {
        label: "LoloBuy public website",
        note: "Confirms quality inspection and photography after warehouse arrival.",
      },
      {
        label: "Early independent LoloBuy user report",
        note: "One shopper's preliminary report on QC photos, a size mismatch and support response; not a representative score.",
      },
    ],
    intro: [
      "Warehouse QC photos are most useful when you approach them with a checklist. Looking only for an overall impression makes small but important problems easy to miss; zooming into every pixel can create false alarms caused by lighting, compression or the camera angle.",
      "The goal is not to prove that an item is perfect. It is to confirm that the received item matches the order closely enough for you to make an informed accept, exchange or return decision within the platform's available process.",
    ],
    sections: [
      {
        heading: "Begin with order identity",
        paragraphs: [
          "Before examining stitching or texture, confirm that the photographs belong to the correct item. Compare the ordered color, model, size and quantity with what is visible. Look for the size tag or packaging label where it is shown, but remember that a tag alone does not prove fit.",
          "Check whether the set is complete. Shoes should normally appear as a pair; a multi-piece outfit should include the expected pieces; accessories advertised with a strap, pouch or detachable part should be compared with the listing contents. Packaging may differ from marketing photos and should not be assumed unless it was explicitly part of the offer.",
        ],
        bullets: [
          "Correct item type and color",
          "Correct size or selected variant",
          "Correct quantity and expected pieces",
          "No obvious transit or handling damage",
        ],
      },
      {
        heading: "Keep the public fact boundary clear",
        paragraphs: [
          "LoloBuy's public homepage confirms that items are inspected and photographed after the merchant sends them to the warehouse. It does not, on the public page we checked, specify a universal number of free photographs, a permanent price for extra angles or a guaranteed video-inspection service. Those details should therefore be verified in the current account interface or with support, not copied from an old promotion or another agent's policy.",
          "That boundary is practical, not merely cautious wording. QC coverage can differ by product type, service tier or current warehouse procedure. Build your first decision from the images that are actually attached to the order. If a critical question remains, check what focused inspection options are available before the return or exchange window closes.",
        ],
      },
      {
        heading: "Read shape and symmetry before small details",
        paragraphs: [
          "Large structural problems matter more than tiny cosmetic variation. For clothing, compare sleeve length, shoulder alignment, collar shape and the way the garment lies flat. For shoes, compare the left and right toe shape, heel height, panel placement and sole alignment. For a bag, inspect the overall silhouette, handle placement and whether the body sits evenly.",
          "Camera perspective can exaggerate asymmetry. Use several angles when they are available and compare features that sit at the same distance from the camera. If only one angle makes a part look distorted, ask whether perspective or folding could explain it before treating it as a defect.",
        ],
      },
      {
        heading: "Allow for lighting, compression and camera distance",
        paragraphs: [
          "Warehouse photographs are evidence, but they are still photographs. Overhead lighting can make black fabric look washed out, a warm bulb can shift white toward cream, and a wide-angle phone lens can make the nearest edge appear larger. Image compression can also turn fine texture into blocky noise. Compare the same feature across several frames before deciding that the physical item is discolored or misshapen.",
          "Use fixed references when they are visible. A neutral background, ruler, size tag, outsole edge or repeated panel can help you judge scale and alignment. If exact color is central to the purchase, ask for a clearly described lighting condition when the platform offers that option, while accepting that no screen reproduces color perfectly.",
        ],
      },
      {
        heading: "Use measurements to answer fit questions",
        paragraphs: [
          "A photograph cannot tell you how a garment will fit without a reference. Measurement images are therefore among the most valuable QC records. Compare the ruler placement with the seller's chart and with a garment you know fits. Make sure the item is laid flat and that the measurement starts at the correct seam or edge.",
          "Allow for small differences caused by manual measurement, fabric stretch and how the garment is positioned. A meaningful discrepancy is one that changes the intended fit, not a few millimeters created by a tilted ruler. If a critical measurement is missing, request that exact measurement rather than a generic extra photo.",
        ],
      },
      {
        heading: "Ask for one answer, not simply more photos",
        paragraphs: [
          "A vague request such as “take a better picture” leaves the photographer to guess what matters. A useful request names the feature, angle and reference: measure the insole from heel to toe; photograph the left shoe's inner panel beside the right shoe; show the jacket chest width with the garment flat; or capture the zipper teeth at the point where they appear misaligned.",
          "Prioritize requests that can change the decision. An extra logo close-up may be interesting, but a missing size measurement, cracked component or incorrect color is more likely to determine whether you accept the order. Group related questions when the service permits it, and avoid asking for a photograph that still cannot establish comfort, material composition or long-term durability.",
        ],
        bullets: [
          "Name the exact feature or measurement.",
          "State the angle or comparison you need.",
          "Explain the suspected mismatch in one sentence.",
          "Choose evidence that could change the accept-or-action decision.",
        ],
      },
      {
        heading: "Clothing checklist",
        paragraphs: [
          "For tops and jackets, inspect the neckline, zipper path, button spacing, print or embroidery placement, pocket symmetry and major seam lines. Check for stains, pulls, holes and visibly loose stitching. Dark garments may hide details in underexposed images, while pale fabrics can look warmer or cooler under warehouse lighting.",
          "For trousers and shorts, compare the rise, leg shape, waistband, pocket placement and hem. If the style depends on a wash or pattern, compare the overall treatment rather than expecting every mark to be identical to a sample photograph.",
        ],
      },
      {
        heading: "Shoes, bags and accessory checklist",
        paragraphs: [
          "For shoes, compare both sides of the pair, outsole attachment, visible glue, stitching paths, lace hardware, heel counters and the alignment of repeated panels. Minor adhesive traces can look dramatic in a close crop; decide whether they are removable cosmetic residue or a sign of separation.",
          "For bags, inspect the front and back shape, corners, handles, strap attachments, zipper path, lining and hardware color. Request a close-up when a clasp, engraving or seam is important. For jewelry and small accessories, scale is easy to misread, so use item dimensions and a ruler image when available.",
        ],
      },
      {
        heading: "Know what photos cannot establish",
        paragraphs: [
          "QC photos cannot reliably prove long-term durability, exact material composition, comfort, electronics performance or authenticity. They also cannot show every hidden seam or internal component. Treat claims that every photographed item is fully verified with caution unless the service clearly defines what was inspected.",
          "Color accuracy is limited by lighting and screens. If a precise shade matters, compare multiple images and the seller's option name, but expect some uncertainty. Odor, softness and sound are also outside the normal scope of a photograph.",
        ],
      },
      {
        heading: "Save the evidence before the parcel moves on",
        paragraphs: [
          "Keep the order reference, listing screenshot, selected option and important QC frames together until the transaction is complete. If you raise an issue, record the date, the image number and the outcome you requested. A short evidence trail is easier for support to follow than a long message built from memory.",
          "Do not let documentation become a reason to miss a deadline. Warehouse remedies depend on the seller and the platform's current process, and some listings may limit returns. Check the available action and time window first, then provide the clearest evidence you have. A good QC review ends with a timely decision, not an endlessly growing gallery.",
        ],
      },
      {
        heading: "Make a calm accept-or-action decision",
        paragraphs: [
          "Classify findings into three groups: normal variation, a cosmetic issue you can accept, and a mismatch or defect that materially affects the order. Then check the platform's current deadline and available action. If you contact support, identify the photo, location and requested outcome clearly.",
          "Lolobuy publicly describes warehouse inspection and photography in its shopping flow, but service details and remedies may change. The current order page and support process are the authority for deadlines, extra-photo requests, exchanges and returns.",
        ],
      },
    ],
  },
  {
    slug: "plan-china-shopping-haul",
    title:
      "Planning a China Shopping Haul: Storage, Consolidation, Weight and Shipping Decisions",
    shortTitle: "Plan storage, consolidation and shipping",
    description:
      "A grounded haul-planning guide covering warehouse storage, consolidation, actual and volumetric weight, packaging choices and route checks.",
    eyebrow: "SHIPPING PLANNER",
    published: "2026-07-26",
    updated: "2026-07-26",
    readingTime: "13 min read",
    factCheckLine:
      "Fact-checked July 26, 2026. The 90-day storage statement is public; live route prices and eligibility must be checked on the packed parcel.",
    visual: {
      eyebrow: "LANDED-COST STACK",
      title: "The product price is only the first line.",
      caption:
        "Keep estimates and confirmed charges separate. The final international choice becomes meaningful only after the warehouse has parcel data.",
      items: [
        {
          label: "Product",
          text: "Selected variant at the current seller price.",
        },
        {
          label: "China-side cost",
          text: "Domestic delivery and any clearly disclosed order charges.",
        },
        {
          label: "Parcel",
          text: "Packaging, actual weight, dimensions and route rules.",
        },
        {
          label: "Destination",
          text: "International freight plus applicable tax or customs obligations.",
        },
      ],
    },
    sources: [
      {
        label: "LoloBuy public website",
        note: "Public 90-day free-storage and warehouse-service statements.",
      },
      {
        label: "LoloBuy community ordering guide",
        note: "Describes consolidation, route selection, international payment and tracking stages.",
      },
    ],
    intro: [
      "A haul is not cheaper merely because several items travel together. Consolidation can reduce repeated base charges and unused packaging, but parcel size, route restrictions and timing still matter. Good planning begins before the first item reaches the warehouse.",
      "Lolobuy's public website currently advertises 90 days of free storage and describes consolidation followed by international shipping. Treat that as a planning window rather than a reason to wait until the last day; always confirm the live storage terms and order deadlines in your account.",
    ],
    sections: [
      {
        heading: "Start with what LoloBuy actually publishes",
        paragraphs: [
          "LoloBuy's public website says that it assists with purchases from Chinese sales channels, inspects and photographs goods after warehouse arrival, and provides 90 days of free storage. A public ordering guide in its named Reddit community describes storing multiple arrivals, consolidating them, selecting an international route and receiving tracking after dispatch. Together, those sources support the basic warehouse-agent flow.",
          "They do not create a permanent price list for your parcel. The public homepage does not give one universal shipping rate, because a usable quote needs a destination, an eligible line and parcel data. Route names, delivery estimates, restricted-item rules, compensation and promotions can change. A responsible shipping guide therefore teaches the questions to ask instead of copying a price that may already be stale.",
          "The same caution applies to the 90-day statement. It is a public planning fact as of the date of this guide, not permission to ignore the order clock. Check how the account displays each item's storage start and any exceptional status, then set your own deadline comfortably earlier.",
        ],
      },
      {
        heading: "Build the parcel on paper first",
        paragraphs: [
          "List each intended item with an estimated weight, broad dimensions, material and any special handling concern. You do not need perfect data at the browsing stage. The purpose is to notice combinations that may create a poor parcel, such as a bulky puffer jacket mixed with dense footwear or a fragile accessory surrounded by heavy items.",
          "Separate wants from must-haves. If one late item would hold the entire parcel beyond your preferred shipping date, decide in advance whether you would ship without it. That avoids a rushed choice after other items have already arrived.",
        ],
      },
      {
        heading: "Keep estimates in ranges",
        paragraphs: [
          "A pre-purchase weight from a seller page is useful for rough planning, but it is not the packed weight. Size selection, retail boxes, protective material and consolidation all change the result. Record a low and high estimate instead of one precise-looking number. The range reminds you that the cost is unresolved while still helping you spot a parcel that is likely to be dense or bulky.",
          "Do the same with timing. Seller dispatch, Chinese domestic delivery, warehouse intake, QC review, problem resolution, packing, export handling and destination customs are separate stages. Adding their advertised best-case times produces false confidence. Build a buffer around the date you actually need the parcel and avoid ordering time-sensitive goods with no room for delay.",
        ],
        bullets: [
          "Estimated item weight: low and high",
          "Likely retail packaging: removable or protective",
          "Fit with other items: compatible, fragile or restricted",
          "Personal ship-by date: earlier than the storage maximum",
        ],
      },
      {
        heading: "Understand actual and volumetric weight",
        paragraphs: [
          "Actual weight is what the packed parcel weighs on a scale. Volumetric weight converts the parcel's outer dimensions into a chargeable weight using the carrier's formula. A carrier may charge whichever is higher. The divisor and rules vary by route, so a generic online calculator is only an estimate.",
          "Soft items may compress; rigid shoe boxes, helmets and decorative objects may not. Removing unnecessary retail packaging can reduce volume, but it can also reduce protection or affect the condition in which an item arrives. Decide based on the item, not a blanket rule.",
        ],
        bullets: [
          "Dense and compact items are usually driven by actual weight.",
          "Light but bulky items can be driven by volumetric weight.",
          "Outer packaging and protective materials change both figures.",
          "The warehouse parcel data is more useful than a pre-purchase guess.",
        ],
      },
      {
        heading: "Use warehouse storage as a buffer",
        paragraphs: [
          "Storage allows items from different sellers and arrival dates to wait for consolidation. It also gives you time to review QC photos and resolve a problem before international shipping. Record the warehouse arrival date of each item and set an earlier personal deadline than the platform maximum.",
          "Do not assume every item shares the same storage clock or status. Cancelled, returned or exceptional orders may follow different rules. Lolobuy's public 90-day statement is helpful context, but the order record and current terms should guide action.",
        ],
      },
      {
        heading: "Consolidate with compatibility in mind",
        paragraphs: [
          "A good consolidated parcel combines items that can travel safely and through the same route. Batteries, liquids, magnets, food, branded goods and other restricted categories can face route limitations. Restrictions vary by destination and carrier and can change, so check eligibility before building the entire plan around one shipping line.",
          "Heavy items can crush softer goods if internal packing is poor. Fragile products may benefit from reinforcement, corner protection or a separate parcel. Packaging services can add weight and dimensions, but that trade-off can be worthwhile when damage risk is meaningful.",
        ],
      },
      {
        heading: "Compare consolidation with splitting honestly",
        paragraphs: [
          "Consolidation can remove duplicated outer boxes and may avoid paying several minimum or first-weight charges. That does not mean one large parcel is always cheaper. A bigger carton can cross a route's size threshold, trigger volumetric weight, mix an ineligible item with otherwise eligible goods or concentrate too much value and risk in one shipment.",
          "Splitting can isolate a restricted or fragile product and keep the rest of the haul on a suitable line. It can also duplicate base charges, packaging and tracking work. Compare the two realistic parcel plans after warehouse weights and dimensions are available: one consolidated quote versus two eligible quotes. Do not compare one confirmed price with a guessed alternative.",
          "There is also a practical middle ground. Remove unnecessary packaging from soft goods where safe, keep protection for structured or fragile items, and group products by compatible route. The goal is not the fewest boxes; it is the best balance of eligibility, protection, cost and the consequences if one parcel is delayed.",
        ],
      },
      {
        heading: "Compare routes on more than headline price",
        paragraphs: [
          "The cheapest route is not automatically the best fit. Compare chargeable weight rules, estimated delivery window, tracking quality, compensation limits, restricted-item policy and destination-country handling. Estimated delivery is not a guarantee, especially around holidays, weather disruptions and customs processing.",
          "Taxes and import rules belong to the destination country. A shopping directory cannot determine your legal obligations. Review the carrier description and official customs guidance for your destination, and declare contents accurately.",
        ],
      },
      {
        heading: "Read tracking as a sequence of scans",
        paragraphs: [
          "Tracking usually records events, not continuous movement. A parcel can travel between facilities while the public page shows no new scan. The first tracking number may belong to a logistics partner before a local carrier receives the shipment, and translated status text can be vague. Keep the parcel number, route name and dispatch date together so you know which party currently has the useful information.",
          "A quiet tracking period is not by itself proof that the parcel is lost. Compare it with the route's current guidance and contact the appropriate support channel when it exceeds that guidance or shows an exception. Customs review and local delivery sit outside the warehouse's direct control, so avoid promising readers a fixed arrival date.",
        ],
      },
      {
        heading: "Rehearse the final submission",
        paragraphs: [
          "Before paying for international shipping, review the parcel contents, delivery address, selected route, declared information, insurance or protection options, packaging requests and final chargeable weight. Keep the parcel number and tracking information together.",
          "If the final quote is much higher than the planning estimate, look for the cause rather than immediately switching routes. Parcel dimensions, added packaging, a restricted category or a different weight rule may explain the gap. A smaller parcel split can sometimes help, but it can also repeat base charges.",
        ],
      },
      {
        heading: "A useful planning rhythm",
        paragraphs: [
          "Browse with total cost in mind, inspect each arrival, resolve issues early, consolidate compatible items, compare eligible routes and review the final parcel before payment. That rhythm uses the warehouse as a decision point rather than treating it as an automatic conveyor belt.",
        ],
      },
    ],
  },
  {
    slug: "lolobuy-review-early-user-experience",
    title:
      "Lolobuy Review 2026: What an Early User Report Tells Us—and What It Does Not",
    shortTitle: "Lolobuy review: useful evidence, clear limits",
    description:
      "A source-led Lolobuy review examining one detailed early shopper report, the QC mismatch it documented, and the important questions that still require a completed parcel.",
    eyebrow: "REVIEW EVIDENCE",
    published: "2026-07-26",
    updated: "2026-07-26",
    readingTime: "14 min read",
    factCheckLine:
      "Research checked July 26, 2026. This article separates LoloBuy's own claims from one independent shopper's preliminary experience.",
    visual: {
      eyebrow: "EVIDENCE LADDER",
      title: "A useful review shows where every claim comes from.",
      caption:
        "Platform statements explain the intended service. A shopper report documents one experience. Your own order screen controls current prices, options and deadlines.",
      items: [
        {
          label: "Published service",
          text: "Link purchasing, warehouse inspection, photos and 90-day storage.",
        },
        {
          label: "Observed case",
          text: "One shopper reported a caught size mismatch and a handled return.",
        },
        {
          label: "Still unknown",
          text: "Completed shipping cost, parcel outcome and repeat-order consistency.",
        },
        {
          label: "Your verification",
          text: "Check the live quote, evidence and current remedy before paying.",
        },
      ],
    },
    sources: [
      {
        label: "LoloBuy public website",
        note: "Primary source for public purchasing, inspection, photography and storage claims.",
      },
      {
        label: "Preliminary independent shopper report",
        note: "First-person report covering footwear, handbags, QC, support and a size-mismatch case.",
      },
      {
        label: "LoloBuy community ordering guide",
        note: "Public process description used to compare the reported experience with the advertised workflow.",
      },
    ],
    intro: [
      "Most young shopping services accumulate promotional videos long before they accumulate enough independent, completed-order evidence for a confident verdict. LoloBuy is in that stage. Its public website explains a recognizable warehouse-agent model, and recent community posts show people testing the service, but the searchable review base is still small. Calling it universally excellent—or universally unsafe—would outrun the evidence.",
      "This review takes a narrower approach. It examines a detailed preliminary report from a Reddit user who said they had purchased footwear and handbags through LoloBuy, compares the observations with LoloBuy's published process, and lists the parts of a complete shopping cycle that the post had not yet tested. The result is more useful than a star rating because readers can see exactly what supports each conclusion.",
    ],
    sections: [
      {
        heading: "Why the word preliminary matters",
        paragraphs: [
          "The author explicitly presented the post as early thoughts, not a final haul review. At that point, they discussed purchasing, warehouse QC, the handling of a mismatch, the interface and customer service. They also said a full review would come after the haul. That means the report contains meaningful evidence about the China-side stages, but it should not be used as proof of international shipping speed, final freight cost, customs handling or the parcel's delivered condition.",
          "This is not a weakness in the post. Clear scope is one sign of a credible review. The problem begins when another website removes that qualifier and turns an unfinished case into a blanket claim such as “fast worldwide delivery.” We keep the original boundary visible.",
        ],
      },
      {
        heading: "What the shopper actually tested",
        paragraphs: [
          "The reviewer said they had used LoloBuy for both shoes and handbags. That gives the report more substance than an account-registration walkthrough because physical orders reached a stage where photographs and order handling could be assessed. The author also linked to separate QC posts, giving readers a way to inspect some of the visual context rather than relying only on praise.",
          "The range is still narrow. Two product categories and one user's early orders cannot tell us how the warehouse handles electronics, fragile home goods, batteries, unusual custom requests or a large mixed parcel. Nor does it establish average processing time. The evidence is specific: this shopper's footwear and handbag purchasing stages were described positively.",
        ],
      },
      {
        heading: "The two-different-sizes incident is the most useful detail",
        paragraphs: [
          "The strongest part of the report is not the general statement that the experience felt smooth. It is the description of a concrete mismatch: the order contained two shoes in different sizes. According to the shopper, LoloBuy noticed the problem and handled a return even though the source listing was described as B-grade, a category where remedies can be more restricted.",
          "That incident aligns with the practical purpose of warehouse inspection. LoloBuy's public homepage says it conducts quality inspection and takes photos after goods arrive. Catching an obvious size mismatch before international dispatch is exactly the kind of avoidable loss that the warehouse stage should prevent.",
          "One successful intervention does not establish a guaranteed return policy. Seller rules, listing conditions, timing and the nature of a defect can change the available remedy. The useful conclusion is narrower: in this documented case, the inspection process surfaced a material mismatch and support helped the shopper address it before shipping.",
        ],
      },
      {
        heading: "What “solid QC photos” can and cannot tell us",
        paragraphs: [
          "The reviewer described the QC images positively. That is encouraging, particularly because linked QC posts allow readers to judge framing and detail for themselves. It also fits the platform's published statement that warehouse arrivals are photographed.",
          "Image quality is only one layer of QC. A clear photograph can help confirm the pair, size label, color, overall shape and visible defects. It cannot prove comfort, material composition, durability, authenticity or every hidden construction detail. A fair review should not convert good-looking photos into a guarantee about the product.",
          "There is another missing public detail: the LoloBuy homepage we checked does not publish a universal free-photo count, a fixed extra-photo price or a permanent video-inspection fee. Anyone comparing agents should verify those current terms in the account rather than borrow numbers from an old social post.",
        ],
      },
      {
        heading: "The interface and browsing-history comments are useful, but personal",
        paragraphs: [
          "The shopper found the interface intuitive and noted that prior searches remained available, reducing the need to keep every product link separately. That feature could be genuinely helpful when comparing several marketplace listings. It does not replace a personal order record, because a seller can edit or remove a listing and search history may not preserve the exact option you intended.",
          "Ease of use is also subjective. A frequent warehouse-agent user may understand status labels that confuse a first-time buyer. When evaluating the interface yourself, check whether the cost lines are understandable, selected options remain visible, QC images are easy to match to the order, and the parcel screen clearly separates estimates from final charges.",
        ],
      },
      {
        heading: "Responsive support in one case is a positive signal, not a service-level promise",
        paragraphs: [
          "The reviewer described customer service as responsive during the early experience. Combined with the handled size mismatch, that gives the praise a concrete context. It suggests that support was reachable and able to move one order toward a remedy.",
          "Response quality should be judged over more than a single uncomplicated exchange. Time zones, sales events, warehouse volume and the complexity of a seller dispute can change the experience. A stronger long-term review would record when the issue was submitted, when a useful response arrived, whether the resolution matched the request and whether any cost was clearly explained.",
          "For your own order, write short support messages that identify the item, photograph and requested outcome. Clear evidence makes the interaction easier to evaluate and reduces back-and-forth regardless of the platform.",
        ],
      },
      {
        heading: "The referral link should remain visible in the evidence assessment",
        paragraphs: [
          "The Reddit post included a LoloBuy invitation link. Referral links can create an incentive, so readers should know one was present. That does not automatically make the described size mismatch, linked QC posts or support interaction false. It simply means the review should be weighed by the specificity and verifiability of its evidence rather than accepted because the tone is positive.",
          "Good review writing handles this openly. It distinguishes observed events from opinion, notes any referral relationship and avoids claims the author did not test. A promotional link hidden behind a supposedly neutral verdict is much less useful than a disclosed link beside a well-documented order.",
        ],
      },
      {
        heading: "The biggest unanswered questions begin at parcel submission",
        paragraphs: [
          "The preliminary post did not yet provide a completed international-shipping comparison. It did not publish the final packed weight and dimensions, route chosen, freight paid, transit time, customs outcome, delivery condition or any compensation claim. Those are not minor details; for many shoppers, international freight is the largest uncertain cost.",
          "It also cannot tell us how consistent the service is across repeat orders. A robust follow-up would compare several purchase times, QC turnaround, packing accuracy and support outcomes. It would show the original seller cost separately from China-side delivery and international freight, then explain any coupon or balance adjustment without presenting a temporary promotion as a standard price.",
          "Until that evidence exists, readers should treat claims such as cheapest, fastest or best agent as unproven. Use LoloBuy's live estimator or parcel screen for a current route decision and compare like with like: the same destination, chargeable weight, category and protection level.",
        ],
      },
      {
        heading: "How to run a low-assumption first order",
        paragraphs: [
          "If the public workflow and early report make LoloBuy worth considering, test the service with an order whose size, color and condition can be judged clearly. Keep the source listing, selected option and seller terms. When the item arrives, review identity and measurements before cosmetic details, and check the current deadline for any action.",
          "Do not build a large time-sensitive haul around an untested estimate. Use the warehouse stage to learn how the account presents QC, storage and parcel options. Before international payment, compare the final packed data, eligible routes, tracking description, compensation terms and destination obligations.",
        ],
        bullets: [
          "Choose an item with clear options and a usable size chart.",
          "Save the exact listing and selected variant.",
          "Evaluate the QC evidence before adding more orders.",
          "Wait for packed parcel data before judging freight.",
          "Record the delivered result so the review covers the complete cycle.",
        ],
      },
      {
        heading: "A careful verdict",
        paragraphs: [
          "The available early report is a positive signal for the purchasing and warehouse stages. It describes a real mismatch being caught, a return being handled, usable QC photographs, an approachable interface and responsive support. Those details are more persuasive than generic praise because they describe what happened.",
          "They are not enough for a platform-wide score. The searchable independent sample remains small, the report was explicitly preliminary, and the international parcel had not yet supplied the evidence needed to judge total cost or delivery. The honest 2026 conclusion is that LoloBuy shows promising early warehouse-stage evidence, while shoppers should still verify current terms and judge the service through a complete, documented order.",
        ],
      },
    ],
  },
];

export const faqs = [
  {
    question: "What is a Lolobuy spreadsheet?",
    basis: "INDEPENDENT DIRECTORY",
    answer:
      "A Lolobuy spreadsheet is an independent product-discovery directory that groups product links, categories and practical buying guidance in one place. It is not a service described or operated by LoloBuy on its public homepage, and it is not a substitute for the live product listing. Use the directory to discover an item, then recheck the current title, seller, selected colour or size, quantity, price and China-side delivery charge on the destination page before submitting an order. A spreadsheet link is a lead, not evidence that an item is still in stock, that the seller is reliable or that the physical product has passed warehouse inspection.",
  },
  {
    question: "Is Lolobuy Sheet an official Lolobuy website?",
    basis: "INDEPENDENT DIRECTORY",
    answer:
      "No. Lolobuy Sheet is an independent product-discovery and educational website. It is not owned, operated or endorsed by LoloBuy. The service facts in this FAQ were checked against LoloBuy's publicly indexed English homepage on July 26, 2026, but live account information still controls an actual order. Product availability, service options, warehouse deadlines and charges can change after a page is researched. A product card on this site is not an offer from LoloBuy and does not create a promise about price, stock, inspection results, shipping eligibility or delivery.",
  },
  {
    question: "Does this site sell, store or ship products?",
    basis: "INDEPENDENT DIRECTORY",
    answer:
      "No. This site organizes product finds and explains the buying process; it does not accept payment, purchase from sellers, inspect goods, operate a warehouse or arrange international delivery. Each product card first opens an independent detail page so that you can review the item reference and a pre-order checklist. Only the final product button continues to the current ordering destination. Any order status, payment, warehouse photograph, return request, parcel quote or tracking update belongs to the service handling that transaction, not to this directory.",
  },
  {
    question: "What does LoloBuy officially say its buying service does?",
    basis: "CONFIRMED ON OFFICIAL HOMEPAGE",
    answer:
      "LoloBuy's public English homepage says it assists users with purchasing products from channels in China, both online and offline. It also says a user can paste a product link to begin the order. That wording supports describing LoloBuy as a purchasing service rather than the original seller of every listed item. The homepage does not turn every Chinese listing into a guaranteed order: seller availability, product restrictions, incomplete information or a changed listing can still require confirmation. For a real purchase, preserve the original link and verify the exact variant and displayed cost in the order record before payment.",
  },
  {
    question: "How does a LoloBuy order begin with a product link?",
    basis: "CONFIRMED ON OFFICIAL HOMEPAGE",
    answer:
      "The official homepage says that you only need to paste a product link to complete the order process. In practice, the link identifies the seller page, but it may not communicate your intended size, colour, version or quantity. Before submitting it, open the live listing and record the exact option you want, the seller price and any visible China-side delivery charge. After pasting the link, compare the generated order information with the source listing instead of assuming the first image or lowest displayed price represents your choice. If the listing cannot be read correctly, do not guess; wait for the order details to be clarified.",
  },
  {
    question: "Which product links can be submitted to LoloBuy?",
    basis: "OFFICIAL CLAIM, WITH A CLEAR LIMIT",
    answer:
      "The public homepage uses broad language: it says LoloBuy assists with purchases from online and offline channels in China and lets users start by pasting a product link. The homepage we checked does not publish a complete marketplace whitelist, a guaranteed list of supported sellers or a promise that every product category can be purchased and shipped. Therefore, this FAQ does not copy a marketplace list from a community post or another agent. Paste the current seller link, check whether the order page can identify it correctly, and confirm any product or route restriction before paying.",
  },
  {
    question: "Are all product links on this directory manually verified every day?",
    basis: "INDEPENDENT DIRECTORY POLICY",
    answer:
      "No daily-verification claim is made. Seller listings can be edited, removed, repriced or placed out of stock without notice, and a directory cannot guarantee the continuing accuracy of every external page. Treat each product card as a discovery reference, open its detail page, and verify the current destination listing immediately before ordering. Pay particular attention to the selected variant because the lowest price may belong to a different size, colour, accessory or deposit. If the product title, image or options no longer match the directory entry, rely on the live listing and do not place the order from an old assumption.",
  },
  {
    question: "What happens after the seller sends an item to the LoloBuy warehouse?",
    basis: "CONFIRMED ON OFFICIAL HOMEPAGE",
    answer:
      "LoloBuy's official homepage says that after the merchant sends the goods to its warehouse, the service conducts a quality inspection, takes photographs for the user and provides 90 days of free storage. Those are the clearest publicly indexed warehouse facts available on the site. The same homepage does not publish the complete inspection checklist, the photo count, the processing time or the remedy for every defect. When the warehouse record appears, compare it with the saved order details and raise any visible mismatch before arranging international shipment; sending the parcel removes the opportunity to inspect it at the warehouse stage.",
  },
  {
    question: "What does QC mean on a LoloBuy order?",
    basis: "OFFICIAL WAREHOUSE PROCESS EXPLAINED",
    answer:
      "QC means quality control. LoloBuy's homepage specifically states that warehouse arrivals receive a quality inspection and photographs. Those images help a buyer compare the physical arrival with the ordered item before international shipping. Start with objective checks: product type, colour, labelled size, quantity and obvious damage. Then review symmetry, print or embroidery placement, stitching, measurements and other category-specific details that are actually visible. QC photographs are evidence of visible condition at a particular angle and time; they do not prove hidden construction, long-term durability, exact material composition, comfort, electronics performance or authenticity.",
  },
  {
    question: "How many free QC photos does LoloBuy provide?",
    basis: "NOT PUBLISHED ON OFFICIAL HOMEPAGE",
    answer:
      "The official homepage confirms that photographs are taken after warehouse arrival, but it does not publish a universal number of free QC images. This FAQ therefore does not borrow a photo count from another purchasing agent, a referral post or an old promotion. Check the actual image set attached to the warehouse order and judge whether it shows the details needed for your decision. If an important area is missing, identify the precise evidence required—for example, an insole measurement, a label, a damaged corner or the opposite side—then check whether the current account offers a suitable inspection request before any return deadline.",
  },
  {
    question: "Does LoloBuy offer extra photos or a warehouse video?",
    basis: "NOT PUBLISHED ON OFFICIAL HOMEPAGE",
    answer:
      "The publicly indexed homepage reviewed for this FAQ does not state a permanent extra-photo service, warehouse-video option, included quantity or price. It would be misleading to publish another platform's fee as if it were LoloBuy's. Before ordering an item that needs a specific measurement or functional view, check the current service options in the account or ask support whether that evidence can be produced. Make a focused request rather than asking for “more photos”: name the exact angle, label, measurement or visible feature needed, and confirm the charge and timing before relying on the request.",
  },
  {
    question: "How long is free LoloBuy warehouse storage?",
    basis: "CONFIRMED ON OFFICIAL HOMEPAGE",
    answer:
      "LoloBuy's official homepage currently advertises 90 days of free storage after goods reach the warehouse stage. The public page does not explain in the indexed text exactly when the 90-day clock begins, how exceptional items are handled or what fee or disposal rule applies after the free period. Record the warehouse-arrival date shown for every item and plan consolidation or shipment well before the final day instead of treating day 90 as a safe target. If items arrive on different dates, track each one separately because the oldest warehouse item can determine how much decision time remains.",
  },
  {
    question: "Can several LoloBuy orders be combined into one international parcel?",
    basis: "NOT PUBLISHED ON OFFICIAL HOMEPAGE",
    answer:
      "LoloBuy's public homepage confirms warehouse storage, but the indexed homepage text we checked does not publish a detailed consolidation policy or guarantee that every item can share one parcel. Do not present consolidation as automatic. Before building a multi-seller haul, confirm in the current parcel workflow whether the stored items can be selected together and whether any product restriction, size, protection requirement or route rule makes a split necessary. Compare the packed result rather than assuming that one large parcel is always cheaper; dimensions and route eligibility can matter as much as the item count.",
  },
  {
    question: "How much does LoloBuy international shipping cost?",
    basis: "NO FIXED PRICE PUBLISHED",
    answer:
      "The official homepage does not publish one fixed international-shipping price that can answer every order. A useful quote must be tied to the actual destination, packed weight and dimensions, eligible route, product restrictions and current charges shown for that parcel. Any article promising a universal per-kilogram total before the goods are packed is leaving out important variables. Use early estimates only for budgeting, then make the shipping decision from the current parcel data and payable amount. Also check what the quoted price includes and whether destination taxes, customs charges or remote-area fees remain separate.",
  },
  {
    question: "Does LoloBuy publish guaranteed delivery times, carriers or tracking rules?",
    basis: "NOT PUBLISHED ON OFFICIAL HOMEPAGE",
    answer:
      "The publicly indexed homepage used for this FAQ does not provide a complete, permanent table of international carriers, country coverage, delivery promises or tracking milestones. Route names and estimates can change, so a static FAQ should not turn them into guarantees. When a real parcel is ready, compare only the routes currently offered for the destination and product type. Record whether the time shown is an estimate or a guarantee, what compensation terms apply, when tracking is expected to update and which events are outside the carrier's control. Judge delivery performance from dispatch to receipt, not from the day the seller was paid.",
  },
  {
    question: "Does LoloBuy publish a fixed service fee or exchange-rate markup?",
    basis: "NOT PUBLISHED ON OFFICIAL HOMEPAGE",
    answer:
      "The public homepage text reviewed on July 26, 2026 does not state a universal service-fee percentage or fixed exchange-rate markup. This page therefore does not invent one. To understand the real purchase cost, compare the seller's current item price with the amount shown in the order breakdown, then separate China-side delivery, optional services, payment charges and later international freight. If the account converts currencies, compare the displayed rate and final payable amount at the same moment because market rates and payment-provider charges can move. A coupon should be shown as a separate reduction, not used to hide the underlying cost.",
  },
  {
    question: "Why can a product price change after I open a spreadsheet link?",
    basis: "PRACTICAL LISTING CHECK",
    answer:
      "A spreadsheet records a discovery reference, while the seller controls the live listing. The displayed headline price may belong to the cheapest variant, an accessory, a deposit or an option different from the first image; the seller may also change the price or remove stock after the directory was updated. LoloBuy's homepage explains that an order can begin from a pasted product link, but it does not promise that an old directory price will be honoured. Select the intended variant on the live page and compare the title, option, quantity, seller price and China-side delivery shown in the generated order before paying.",
  },
  {
    question: "What are LoloBuy's return or exchange rules after QC?",
    basis: "NOT PUBLISHED ON OFFICIAL HOMEPAGE",
    answer:
      "The official homepage confirms warehouse inspection and photographs, but the indexed page does not publish a complete return-and-exchange policy, seller deadline or fee table. The result can depend on the seller's own terms, the reason for the request and the current order status. Review warehouse images promptly, preserve screenshots of the ordered option and identify the mismatch with specific evidence. Then check the return or exchange action available for that order before authorising international shipment. Do not assume that a visible problem automatically creates a free return, and do not use another platform's deadline as if it were LoloBuy's rule.",
  },
  {
    question: "Are LoloBuy coupons and shipping discounts permanent?",
    basis: "NO PERMANENT OFFER PUBLISHED",
    answer:
      "The public homepage reviewed for this FAQ does not publish a permanent universal coupon value, minimum spend or guaranteed shipping discount. Promotions can be limited by account, route, destination, order value, code, start date or expiry date. Treat a coupon as valid only when the current checkout accepts it and shows the reduced payable amount. Compare the total after the discount, not the headline value alone, and avoid describing a temporary referral or event offer as a normal platform price. This FAQ intentionally omits coupon codes and dollar amounts that cannot be verified as current official terms.",
  },
  {
    question: "What does W2C mean on a Lolobuy spreadsheet?",
    basis: "INDEPENDENT DIRECTORY TERM",
    answer:
      "W2C commonly means “where to cop”: the source or destination link used to find a product. It is a shopping-community term, not a policy defined on LoloBuy's public homepage. A W2C link can help you locate a listing to paste into an ordering service, but it does not prove that the listing is current, that the photographed item is the variant you want or that the seller and product are acceptable for international shipping. Open the source, verify the exact option and current price, and keep the link with the order so the later warehouse photos can be compared with what was originally selected.",
  },
  {
    question: "What should I check in LoloBuy warehouse QC photos?",
    basis: "PRACTICAL QC CHECKLIST",
    answer:
      "The official homepage confirms inspection and photographs after warehouse arrival but does not publish a universal inspection checklist. Use a repeatable order: first confirm product type, colour, labelled size and quantity; next look for obvious damage, stains, missing parts or a wrong variant; then inspect category-specific details such as shape, symmetry, stitching, print placement, zips or measurements. Compare against the saved seller listing rather than memory. If lighting or angle prevents a fair conclusion, do not label the item defective from one ambiguous image. Check whether a precise additional inspection request is available before the relevant decision window closes.",
  },
  {
    question: "Can a Lolobuy spreadsheet or QC photo guarantee authenticity or import legality?",
    basis: "IMPORTANT LIMIT",
    answer:
      "No. LoloBuy's public homepage states that warehouse goods are inspected and photographed, but it does not publish a guarantee that those photographs authenticate branded goods or establish legal importability in every country. A directory link also cannot prove intellectual-property status, material composition, safety certification or compliance with destination customs rules. QC images are useful for visible comparison only. Before ordering, follow the platform's current restrictions and the laws that apply to the destination; for regulated, branded, battery-powered, liquid or otherwise sensitive products, confirm route eligibility and customs obligations rather than relying on a spreadsheet label.",
  },
] as const;
