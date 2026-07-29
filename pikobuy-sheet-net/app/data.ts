export const MAIN_SITE = "https://www.cnbuycha.com";
export const USD_CNY_REFERENCE_RATE = 6.7719;
export const USD_RATE_DATE = "2026-07-24";

export function formatUsdFromCny(priceCny: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(priceCny / USD_CNY_REFERENCE_RATE);
}

export type Category = {
  name: string;
  slug: string;
  href: string;
  countLabel: string;
  accent: string;
};

export const categories: Category[] = [
  {
    name: "Shoes",
    slug: "shoes",
    href: `${MAIN_SITE}/shoes/`,
    countLabel: "Sneakers · slides · runners",
    accent: "#ff3d16",
  },
  {
    name: "Hoodies",
    slug: "hoodies",
    href: `${MAIN_SITE}/hoodies-sweaters/`,
    countLabel: "Hoodies · knits · sweatshirts",
    accent: "#6b2e68",
  },
  {
    name: "T-Shirts",
    slug: "t-shirts",
    href: `${MAIN_SITE}/t-shirts/`,
    countLabel: "Tees · polos · long sleeves",
    accent: "#ff7a1a",
  },
  {
    name: "Jackets",
    slug: "jackets",
    href: `${MAIN_SITE}/jackets/`,
    countLabel: "Coats · puffers · windbreakers",
    accent: "#24314c",
  },
  {
    name: "Headwear",
    slug: "headwear",
    href: `${MAIN_SITE}/headwear/`,
    countLabel: "Caps · beanies · hats",
    accent: "#ee315d",
  },
  {
    name: "Accessories",
    slug: "accessories",
    href: `${MAIN_SITE}/accessories/`,
    countLabel: "Bags · jewelry · small goods",
    accent: "#8a5d2b",
  },
];

export type Product = {
  name: string;
  category: string;
  priceCny: number;
  image: string;
  href: string;
  review: string;
  tone: string;
};

export const products: Product[] = [
  {
    name: "HOKA Speedgoat 5 Trail Running Shoes",
    category: "Shoes",
    priceCny: 218,
    image:
      "https://www.cnbuycha.com/uploads/allimg/20260713/1-260G31AHDQ.webp",
    href: `${MAIN_SITE}/AllProducts/3359.html`,
    review: "Check tread, heel shape and size label",
    tone: "#fff3ed",
  },
  {
    name: "Off-White Hoodies — 39 styles",
    category: "Hoodies",
    priceCny: 299.52,
    image:
      "https://www.cnbuycha.com/uploads/allimg/20260722/1-260H2211102W7.webp",
    href: `${MAIN_SITE}/AllProducts/3369.html`,
    review: "Compare print placement and measurements",
    tone: "#f3eff8",
  },
  {
    name: "Celine Coat",
    category: "Jackets",
    priceCny: 247,
    image:
      "https://www.cnbuycha.com/uploads/allimg/20260713/1-260G31A22I07.webp",
    href: `${MAIN_SITE}/AllProducts/3356.html`,
    review: "Check fabric, seams and front alignment",
    tone: "#f1f4f7",
  },
  {
    name: "GUCCI Hat",
    category: "Headwear",
    priceCny: 75,
    image:
      "https://www.cnbuycha.com/uploads/allimg/20260722/1-260H221155C13.webp",
    href: `${MAIN_SITE}/AllProducts/3371.html`,
    review: "Check embroidery and inside label",
    tone: "#fff1f2",
  },
  {
    name: "Louis Vuitton Jacket",
    category: "Jackets",
    priceCny: 388,
    image:
      "https://www.cnbuycha.com/uploads/allimg/20260713/1-260G3164SUC.webp",
    href: `${MAIN_SITE}/AllProducts/3354.html`,
    review: "Compare pattern joins and hardware",
    tone: "#f4f0eb",
  },
  {
    name: "Polo Ralph Lauren Long Sleeve",
    category: "T-Shirts",
    priceCny: 168,
    image:
      "https://www.cnbuycha.com/uploads/allimg/20260713/1-260G31645454b.webp",
    href: `${MAIN_SITE}/AllProducts/3353.html`,
    review: "Confirm chest width and logo position",
    tone: "#eef4f2",
  },
];

export const workflow = [
  {
    number: "01",
    title: "Choose a product",
    text: "Start from a Chinese marketplace listing and confirm style, colour and size.",
  },
  {
    number: "02",
    title: "Search or paste",
    text: "Use keywords or paste a Taobao, Tmall, 1688, Weidian or Yupoo link.",
  },
  {
    number: "03",
    title: "Submit and pay",
    text: "Select the options, submit the order and complete the first payment.",
  },
  {
    number: "04",
    title: "Inspect at warehouse",
    text: "The warehouse checks the item, photographs it and looks for visible defects.",
  },
  {
    number: "05",
    title: "Choose shipping",
    text: "Submit the parcel, compare available routes and pay international shipping.",
  },
  {
    number: "06",
    title: "Track the parcel",
    text: "Wait for dispatch and follow the logistics updates through delivery.",
  },
];

export const guides = [
  {
    slug: "how-to-use-pikobuy",
    eyebrow: "Beginner guide",
    title: "How to Use PikoBuy: The Six-Step Order Process",
    description:
      "A practical walkthrough from finding a listing to warehouse inspection and international dispatch.",
    read: "8 min",
  },
  {
    slug: "pikobuy-qc-checklist",
    eyebrow: "QC field guide",
    title: "PikoBuy QC Photos: What to Check Before Shipping",
    description:
      "A category-by-category checklist for measurements, labels, alignment, materials and visible damage.",
    read: "10 min",
  },
  {
    slug: "pikobuy-shipping-cost",
    eyebrow: "Shipping guide",
    title: "PikoBuy Shipping Cost: Weight, Size and Route Variables",
    description:
      "Understand the inputs used by the official estimator before you compare international routes.",
    read: "9 min",
  },
];

export const articles = [
  {
    slug: "pikobuy-spreadsheet-product-research",
    date: "July 29, 2026",
    title: "PikoBuy Spreadsheet Research: From a Find to a Better Shortlist",
    description:
      "A repeatable method for screening listings without treating a product link as a quality guarantee.",
    tag: "Research",
  },
  {
    slug: "warehouse-photos-before-shipping",
    date: "July 27, 2026",
    title: "PikoBuy QC Photos Before Shipping: A Practical Review Routine",
    description:
      "A fact-checked routine for identity, measurements, extra photos and the published return window.",
    tag: "QC",
  },
  {
    slug: "estimate-pikobuy-parcel-cost",
    date: "July 25, 2026",
    title: "PikoBuy Shipping Cost: How to Estimate a Parcel Without Guessing",
    description:
      "Use destination, product type, weight, dimensions, packaging and current fees to plan a parcel.",
    tag: "Shipping",
  },
];

export const faqItems = [
  {
    question: "Is this the official PikoBuy website?",
    answer:
      "No. This is an independent product-research and shopping-guide website. It is not owned by, operated by or formally affiliated with PikoBuy.",
  },
  {
    question: "What is a PikoBuy spreadsheet?",
    answer:
      "It is a browsable collection of product finds organised by category. A listing is a starting point for research, not proof of quality, availability or seller performance.",
  },
  {
    question: "What happens after an item reaches the warehouse?",
    answer:
      "PikoBuy’s official beginner guide says the warehouse checks the item in, takes photos and looks for defects. You should review the available images before creating an international parcel.",
  },
  {
    question: "How is international shipping estimated?",
    answer:
      "PikoBuy’s estimator asks for destination country or region, product type, weight, length, width and height. The final route options and charges should be checked at parcel submission.",
  },
  {
    question: "Can every item be returned?",
    answer:
      "No. Eligibility depends on seller rules, the item’s condition, category and timing. PikoBuy’s published policy describes a five-day warehouse request window for eligible products and lists excluded categories.",
  },
  {
    question: "Does a QC photo guarantee product quality?",
    answer:
      "No. Photos can help spot visible issues, but they cannot prove material composition, long-term durability or exact fit. Use them as one part of a broader listing and seller review.",
  },
  {
    question: "Which Chinese marketplaces can be used with PikoBuy?",
    answer:
      "PikoBuy’s published beginner guide names Taobao, Tmall, 1688, Weidian and Yupoo. It says users can search by keyword or paste a product link before selecting the exact colour, size and quantity.",
  },
  {
    question: "Why are there two separate payments?",
    answer:
      "The first payment is made when the product order is submitted. International shipping is selected and paid later, after the item reaches the warehouse and a parcel is created with current weight, dimensions and route options.",
  },
  {
    question: "Can I request additional warehouse photos?",
    answer:
      "PikoBuy’s Shipping Policy says additional detailed photos may be purchased. The public policy does not state a permanent photo count, extra-photo price or video-inspection price, so check the live service screen before ordering.",
  },
  {
    question: "How long do I have to request an eligible return?",
    answer:
      "PikoBuy’s Returns & Exchanges page describes a five-day window after an item becomes Warehoused, defined there as 120 hours beginning from the next hour after that status change. Seller participation, item condition and category rules still apply.",
  },
  {
    question: "What can an unconditional return cost?",
    answer:
      "The published Returns & Exchanges page currently lists shipping to the seller, the seller’s original shipping cost and a 5 RMB service fee for an unconditional return. Verify the live order because seller rules and fees can change.",
  },
  {
    question: "When should tracking information appear?",
    answer:
      "PikoBuy’s beginner guide says logistics information should be available within three days after shipment. International parcels can still have quiet periods between carrier, export, customs and local-delivery scans.",
  },
];
