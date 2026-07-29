export const categories = [
  { code: "01", name: "Shoes", note: "Sneakers & footwear", href: "https://www.cnbuycha.com/shoes/", color: "blue" },
  { code: "02", name: "Hoodies", note: "Sweaters & sweatshirts", href: "https://www.cnbuycha.com/hoodies-sweaters/", color: "lime" },
  { code: "03", name: "T-Shirts", note: "Tees & tops", href: "https://www.cnbuycha.com/t-shirts/", color: "ink" },
  { code: "04", name: "Jackets", note: "Coats & outerwear", href: "https://www.cnbuycha.com/jackets/", color: "blue" },
  { code: "05", name: "Pants", note: "Pants & shorts", href: "https://www.cnbuycha.com/pants-shorts/", color: "lime" },
  { code: "06", name: "Headwear", note: "Caps & hats", href: "https://www.cnbuycha.com/headwear/", color: "ink" },
  { code: "07", name: "Accessories", note: "Bags, wallets & more", href: "https://www.cnbuycha.com/accessories/", color: "blue" },
  { code: "08", name: "Jersey", note: "Teamwear finds", href: "https://www.cnbuycha.com/Jersey/", color: "lime" },
  { code: "09", name: "Electronics", note: "Tech & gadgets", href: "https://www.cnbuycha.com/electronics/", color: "ink" },
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
    tag: "SEO BUYING GUIDE",
    title: "UUFinds Spreadsheet Guide 2026: from QC research to better product finds",
    summary: "A complete reverse-shopping workflow for researching evidence, comparing listings and continuing to the right CNBuy Sheet product page.",
    href: "/guides/uufinds-spreadsheet-shopping-guide-2026/",
    read: "12 min read",
    featured: true,
  },
  {
    tag: "QC METHOD",
    title: "A practical UUFinds QC checklist before you save a product link",
    summary: "What to compare in photos, which details deserve a second look, and why one image should never settle the decision.",
    href: "/guides/uufinds-qc-checklist/",
    read: "11 min read",
  },
  {
    tag: "BEGINNER GUIDE",
    title: "How to use UUFinds and continue browsing on CNBuy Sheet",
    summary: "A clear research-to-browse workflow for links from Taobao, Weidian, 1688 and supported shopping agents.",
    href: "/guides/how-to-use-uufinds/",
    read: "9 min read",
  },
  {
    tag: "COMPARISON",
    title: "Spreadsheet vs QC finder: two tools, two different jobs",
    summary: "Why product discovery and quality research work better as separate steps—and where each tool fits.",
    href: "/guides/spreadsheet-vs-qc-finder/",
    read: "9 min read",
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
];
