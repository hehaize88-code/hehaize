export type Category = {
  code: string;
  name: string;
  note: string;
  href: string;
  color: string;
};

export const categories: Category[] = [
  { code: "01", name: "Shoes", note: "Sneakers & footwear", href: "https://cnbuycha.com/shoes/", color: "blue" },
  { code: "02", name: "Hoodies", note: "Sweaters & sweatshirts", href: "https://cnbuycha.com/hoodies-sweaters/", color: "lime" },
  { code: "03", name: "T-Shirts", note: "Tees & tops", href: "https://cnbuycha.com/t-shirts/", color: "ink" },
  { code: "04", name: "Jackets", note: "Coats & outerwear", href: "https://cnbuycha.com/jackets/", color: "blue" },
  { code: "05", name: "Pants", note: "Pants & shorts", href: "https://cnbuycha.com/pants-shorts/", color: "lime" },
  { code: "06", name: "Headwear", note: "Caps & hats", href: "https://cnbuycha.com/headwear/", color: "ink" },
  { code: "07", name: "Accessories", note: "Bags, wallets & more", href: "https://cnbuycha.com/accessories/", color: "blue" },
  { code: "08", name: "Jersey", note: "Teamwear finds", href: "https://cnbuycha.com/jersey/", color: "lime" },
  { code: "09", name: "Electronics", note: "Tech & gadgets", href: "https://cnbuycha.com/electronics/", color: "ink" },
];

type ArticleCard = {
  tag: string;
  title: string;
  summary: string;
  href: string;
  read: string;
  featured?: boolean;
  englishOnly?: boolean;
  localized?: Partial<Record<"en-gb" | "de" | "pl" | "pt-br", { tag: string; title: string; summary: string }>>;
};

export const articleCards: ArticleCard[] = [
  {
    tag: "IMAGE SEARCH GUIDE",
    title: "UUFinds Image Search: Find a Product From a Photo",
    summary: "Turn a screenshot into traceable candidates, compare a visual fingerprint and verify the seller, item, option and QC record.",
    href: "/guides/uufinds-image-search-guide/",
    read: "11 min read",
    featured: true,
    englishOnly: true,
  },
  {
    tag: "IPHONE APP GUIDE",
    title: "UUFinds App for iPhone: QC Search and Product Links",
    summary: "Use links, images and QC records on iPhone without losing the original source, item identity or current listing context.",
    href: "/guides/uufinds-app-iphone-guide/",
    read: "11 min read",
    englishOnly: true,
  },
  {
    tag: "BROWSER EXTENSION GUIDE",
    title: "UUFinds Chrome Extension: View QC Photos From Product Pages",
    summary: "Check the official store entry, review permissions and match extension results to the exact product page before reading QC photos.",
    href: "/guides/uufinds-chrome-extension-guide/",
    read: "11 min read",
    englishOnly: true,
  },
  {
    tag: "LISTING MATCH GUIDE",
    title: "How to Confirm a UUFinds Result Matches the Original Listing",
    summary: "Verify the marketplace, seller, item ID, option and date before treating a UUFinds result as listing-specific QC evidence.",
    href: "/guides/uufinds-confirm-result-original-listing/",
    read: "11 min read",
    englishOnly: true,
  },
  {
    tag: "SOURCE HANDOFF GUIDE",
    title: "Move From UUFinds Research to an Agent Without Losing the Source Link",
    summary: "Carry a verified candidate forward while preserving its source item, option, QC record and separate transaction facts.",
    href: "/guides/uufinds-research-to-agent-source-link/",
    read: "11 min read",
    englishOnly: true,
  },
  {
    tag: "SHOES QC GUIDE",
    title: "UUFinds Shoes Spreadsheet and QC Checklist",
    summary: "Compare exact footwear options, then inspect shape, panels, seams, outsole, labels, measurements and missing views.",
    href: "/guides/uufinds-shoes-spreadsheet-qc-checklist/",
    read: "11 min read",
    englishOnly: true,
  },
  {
    tag: "HOODIE QC GUIDE",
    title: "UUFinds Hoodie Spreadsheet and QC Checklist",
    summary: "Match the exact hoodie and size before reviewing measurements, fabric appearance, seams, graphics and finishing.",
    href: "/guides/uufinds-hoodie-spreadsheet-qc-checklist/",
    read: "11 min read",
    englishOnly: true,
  },
  {
    tag: "JERSEY QC GUIDE",
    title: "UUFinds Jersey Spreadsheet and QC Checklist",
    summary: "Preserve the full jersey configuration and inspect proportions, panels, names, numbers, badges, seams and measurements.",
    href: "/guides/uufinds-jersey-spreadsheet-qc-checklist/",
    read: "11 min read",
    englishOnly: true,
  },
  {
    tag: "BAGS QC GUIDE",
    title: "UUFinds Bags Spreadsheet and QC Checklist",
    summary: "Compare bag size and configuration with visible evidence for shape, dimensions, handles, closures, hardware and lining.",
    href: "/guides/uufinds-bags-spreadsheet-qc-checklist/",
    read: "11 min read",
    englishOnly: true,
  },
  {
    tag: "ACCESSORIES QC GUIDE",
    title: "UUFinds Accessories Spreadsheet and QC Checklist",
    summary: "Apply category-specific checks for dimensions, seams, edges, hardware, compatibility and included parts without overclaiming.",
    href: "/guides/uufinds-accessories-spreadsheet-qc-checklist/",
    read: "11 min read",
    englishOnly: true,
  },
  {
    tag: "MEASUREMENT EVIDENCE GUIDE",
    title: "UUFinds Measurement Photos: What Ruler Evidence Can and Cannot Prove",
    summary: "Check endpoints, units, item state, ruler alignment and camera angle before using a photographed dimension in a QC decision.",
    href: "/guides/uufinds-measurement-photos-ruler-evidence-limits/",
    read: "11 min read",
    englishOnly: true,
  },
  {
    tag: "COLOR EVIDENCE GUIDE",
    title: "UUFinds QC Color Check: Lighting, White Balance and Photo Limits",
    summary: "Separate a likely product-color mismatch from scene-wide casts, exposure, shadows, reflections and display differences.",
    href: "/guides/uufinds-qc-color-lighting-photo-limits/",
    read: "10 min read",
    englishOnly: true,
  },
  {
    tag: "GARMENT QC GUIDE",
    title: "UUFinds Stitching and Finish QC: A Photo Review Sequence",
    summary: "Inspect seam paths, puckering, edges, closures and trim in a repeatable order while marking details that the available photos cannot prove.",
    href: "/guides/uufinds-stitching-finish-qc-photo-checklist/",
    read: "10 min read",
    englishOnly: true,
  },
  {
    tag: "COST RESEARCH GUIDE",
    title: "UUFinds Product Price vs Total Parcel Cost: Build a Research Range",
    summary: "Use dated product and QC fields as bounded inputs, then preserve every agent, parcel and destination cost that remains unknown.",
    href: "/guides/uufinds-product-price-total-parcel-cost/",
    read: "11 min read",
    englishOnly: true,
  },
  {
    tag: "SELLER RESEARCH GUIDE",
    title: "UUFinds Seller Information: Reliability Signals Without Guesswork",
    summary: "Preserve the exact seller, source item and option, then rank dated QC evidence without treating labels or counters as guarantees.",
    href: "/guides/uufinds-seller-information-reliability-signals/",
    read: "11 min read",
    englishOnly: true,
  },
  {
    tag: "SIZE RESEARCH GUIDE",
    title: "UUFinds Size and Measurement Notes: Choose the Right Option",
    summary: "Separate reference-garment measurements, seller charts, size tags and QC records before selecting an exact listing option.",
    href: "/guides/uufinds-size-measurement-notes-before-option/",
    read: "11 min read",
    englishOnly: true,
  },
  {
    tag: "TROUSERS QC GUIDE",
    title: "UUFinds Jeans QC Checklist: Fit, Wash and Construction Evidence",
    summary: "Review matched jeans and trousers QC photos in a decision order that separates visible construction, measurement evidence and unresolved fit risk.",
    href: "/guides/uufinds-jeans-trousers-qc-checklist/",
    read: "11 min read",
    englishOnly: true,
  },
  {
    tag: "PRODUCT DETAIL RESEARCH",
    title: "How to Read a UUFinds Product Detail Page: QC Evidence Guide",
    summary: "Check route type, item identity, seller context, options, QC media and empty states without treating one record as a guarantee.",
    href: "/guides/how-to-read-uufinds-product-detail-page/",
    read: "10 min read",
    englishOnly: true,
  },
  {
    tag: "QC SEARCH EVIDENCE",
    title: "UUFinds QC Search Explained: What Results Can and Cannot Show",
    summary: "Classify listing identity, visible evidence and unresolved limits before treating a QC result as useful research.",
    href: "/guides/uufinds-qc-search-capabilities-limitations/",
    read: "10 min read",
    englishOnly: true,
  },
  {
    tag: "SEO BUYING GUIDE",
    title: "How to Use a UUFinds Spreadsheet: Product Finds & QC Workflow",
    summary: "A step-by-step workflow for using a spreadsheet to shortlist products, check matching QC evidence and verify the live detail page.",
    href: "/guides/uufinds-spreadsheet-shopping-guide-2026/",
    read: "12 min read",
    featured: true,
    localized: {
      pl: {
        tag: "PORADNIK SPREADSHEET",
        title: "Jak korzystać z UUFinds Spreadsheet: produkty i proces QC",
        summary: "Praktyczny proces krok po kroku: wybierz produkty w arkuszu, dopasuj materiały QC i zweryfikuj aktualną stronę szczegółów.",
      },
    },
  },
  {
    tag: "QC METHOD",
    title: "UUFinds QC Photos Checklist: How to Review a Product",
    summary: "How to match QC photos to the exact listing, compare visible details and record what the images cannot confirm.",
    href: "/guides/uufinds-qc-checklist/",
    read: "11 min read",
    localized: {
      pl: {
        tag: "METODA QC",
        title: "Zdjęcia QC w UUFinds: lista kontroli produktu",
        summary: "Jak dopasować zdjęcia QC do dokładnej oferty, porównać widoczne detale i zapisać informacje, których fotografie nie potwierdzają.",
      },
    },
  },
  {
    tag: "BEGINNER GUIDE",
    title: "How to Use UUFinds: Links, QC Photos & Product Matching",
    summary: "A focused tutorial for starting with a supported link, reviewing available QC material and matching the right product.",
    href: "/guides/how-to-use-uufinds/",
    read: "9 min read",
    localized: {
      pl: {
        tag: "PORADNIK DLA POCZĄTKUJĄCYCH",
        title: "Jak korzystać z UUFinds: linki, zdjęcia QC i dopasowanie produktu",
        summary: "Skoncentrowany poradnik: zacznij od obsługiwanego linku, sprawdź dostępne materiały QC i dopasuj właściwy produkt.",
      },
    },
  },
  {
    tag: "COMPARISON",
    title: "Product Spreadsheet vs QC Finder: Discovery or Verification?",
    summary: "A narrow comparison of two different jobs: organising product choices and checking evidence for one exact listing.",
    href: "/guides/spreadsheet-vs-qc-finder/",
    read: "9 min read",
    localized: {
      pl: {
        tag: "PORÓWNANIE",
        title: "Spreadsheet czy QC Finder: odkrywanie czy weryfikacja?",
        summary: "Porównanie dwóch różnych zadań: porządkowania wyboru produktów i sprawdzania dowodów dla jednej dokładnej oferty.",
      },
    },
  },
  {
    tag: "PARCEL PLANNING",
    title: "UUFinds Product Weight vs Volumetric Weight: A Practical Parcel Estimate",
    summary: "Turn a QC weight clue into transparent actual, volumetric and chargeable-weight scenarios without inventing a shipping quote.",
    href: "/guides/uufinds-product-weight-vs-volumetric-weight/",
    read: "11 min read",
    englishOnly: true,
    localized: {
      "en-gb": {
        tag: "PARCEL PLANNING",
        title: "UUFinds Product Weight vs Volumetric Weight: A Practical Parcel Estimate",
        summary: "Turn a QC weight clue into transparent actual, volumetric and chargeable-weight scenarios without inventing a shipping quote.",
      },
      de: {
        tag: "PAKETPLANUNG",
        title: "UUFinds-Produktgewicht und Volumengewicht: eine praktische Paketschätzung",
        summary: "So wird aus einem QC-Gewichtshinweis eine nachvollziehbare Schätzung für tatsächliches, volumetrisches und abrechenbares Gewicht – ohne erfundenes Versandangebot.",
      },
      pl: {
        tag: "PLANOWANIE PACZKI",
        title: "Waga produktu UUFinds a waga objętościowa: praktyczne oszacowanie paczki",
        summary: "Zamień wskazówkę o wadze z QC w przejrzyste scenariusze wagi rzeczywistej, objętościowej i rozliczeniowej bez wymyślania ceny wysyłki.",
      },
      "pt-br": {
        tag: "PLANEJAMENTO DO PACOTE",
        title: "Peso do produto no UUFinds versus peso volumétrico: uma estimativa prática",
        summary: "Transforme uma indicação de peso do QC em cenários transparentes de peso real, volumétrico e tarifável sem inventar uma cotação de frete.",
      },
    },
  },
  {
    tag: "LINK SEARCH GUIDE",
    title: "How to Find UUFinds QC Photos from Taobao, 1688 and Weidian Links",
    summary: "Search with an exact marketplace or agent link, troubleshoot an empty result and verify the seller, item and variant before trusting QC media.",
    href: "/guides/uufinds-taobao-1688-weidian-qc-search-guide/",
    read: "10 min read",
    englishOnly: true,
  },
];
