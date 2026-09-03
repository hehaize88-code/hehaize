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
