import { extraFaq } from "./extraFaq";

export const languages = [
  { code: "en", label: "English", flag: "🌐" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "pl", label: "Polski", flag: "🇵🇱" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "pt", label: "Português", flag: "🇵🇹" },
  { code: "ro", label: "Română", flag: "🇷🇴" },
  { code: "sv", label: "Svenska", flag: "🇸🇪" },
] as const;

export type Locale = (typeof languages)[number]["code"];

export const localeCodes = languages.map((language) => language.code);

export const isLocale = (value: string): value is Locale =>
  localeCodes.includes(value as Locale);

export const localizePath = (locale: Locale, path: string) => {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return locale === "en" ? normalized : `/${locale}${normalized}`;
};

type Copy = {
  nav: {
    spreadsheet: string;
    categories: string;
    howTo: string;
    qc: string;
    shipping: string;
    faq: string;
    explore: string;
  };
  home: {
    kicker: string;
    title: string;
    intro: string;
    searchPlaceholder: string;
    search: string;
    policyResearch: string;
    independentGuidance: string;
    directLinks: string;
    researched: string;
    buyingGuide: string;
    selectedProducts: string;
    browseCategory: string;
    latestEyebrow: string;
    latestTitle: string;
    latestDescription: string;
    viewProduct: string;
    browseAll: string;
    libraryEyebrow: string;
    libraryTitle: string;
    libraryDescription: string;
    readGuide: string;
    quickAnswers: string;
    faqTitle: string;
    faqIntro: string;
  };
  pages: Record<
    string,
    {
      eyebrow: string;
      title: string;
      intro: string;
    }
  >;
  common: {
    factsTitle: string;
    factsBody: string;
    checkTitle: string;
    checkBody: string;
    nextTitle: string;
    nextBody: string;
    footer: string;
    disclaimer: string;
    home: string;
    guides: string;
    returns: string;
  };
  faq: Array<{ q: string; a: string }>;
};

const en: Copy = {
  nav: {
    spreadsheet: "Spreadsheet",
    categories: "Categories",
    howTo: "How to Buy",
    qc: "QC Guide",
    shipping: "Shipping",
    faq: "FAQ",
    explore: "Explore products",
  },
  home: {
    kicker: "Independent product discovery · Updated August 2026",
    title: "Joyagoo Spreadsheet 2026: Find Better Products with Real Buying Guidance",
    intro:
      "Browse curated products, compare categories, and learn how to use QC photos, shipping choices and return rules before you submit a parcel.",
    searchPlaceholder: "Search shoes, clothing, accessories...",
    search: "Search",
    policyResearch: "Policy research",
    independentGuidance: "Independent guidance",
    directLinks: "Direct product links",
    researched: "RESEARCHED",
    buyingGuide: "BUYING GUIDE",
    selectedProducts: "✓ Selected products",
    browseCategory: "Browse category ↗",
    latestEyebrow: "CURATED PRODUCT DISCOVERY",
    latestTitle: "Latest product finds",
    latestDescription:
      "Every image and product card opens its matching product detail page. Price and availability can change on the live listing.",
    viewProduct: "View product ↗",
    browseAll: "Browse all products ↗",
    libraryEyebrow: "JOYAGOO BUYING LIBRARY",
    libraryTitle: "Research before you ship",
    libraryDescription:
      "Clear guides based on published platform policies, with important conditions explained.",
    readGuide: "Read the guide →",
    quickAnswers: "QUICK ANSWERS",
    faqTitle: "Before you use a Joyagoo spreadsheet",
    faqIntro:
      "A spreadsheet helps you discover items. Your decision still depends on the live listing, seller terms, QC photos and available shipping line.",
  },
  pages: {
    spreadsheet: {
      eyebrow: "PRODUCT DIRECTORY",
      title: "Joyagoo Spreadsheet 2026",
      intro:
        "Browse selected products with direct links to each matching product page.",
    },
    categories: {
      eyebrow: "SHOP BY CATEGORY",
      title: "Joyagoo Spreadsheet Categories: Shoes, Clothing & Accessories",
      intro:
        "Use focused category links instead of landing on a broad, unrelated page.",
    },
    "how-to-buy": {
      eyebrow: "HOW TO BUY",
      title: "How to buy with Joyagoo",
      intro:
        "Understand product selection, the first payment, warehouse QC and international parcel submission.",
    },
    "qc-guide": {
      eyebrow: "QC GUIDE",
      title: "What to check in Joyagoo QC photos",
      intro:
        "Compare colour, shape, construction, sizing evidence and packaging before accepting an item.",
    },
    "shipping-guide": {
      eyebrow: "SHIPPING GUIDE",
      title: "Plan a Joyagoo parcel before paying",
      intro:
        "Separate product cost from international shipping and review weight, volume, packaging and route conditions.",
    },
    faq: {
      eyebrow: "QUICK ANSWERS",
      title: "Joyagoo spreadsheet FAQ",
      intro:
        "Straight answers about product links, QC, returns and this independent website.",
    },
    guides: {
      eyebrow: "RESEARCH LIBRARY",
      title: "Joyagoo buying guides",
      intro:
        "Practical guidance for product discovery, QC, shipping and returns.",
    },
    returns: {
      eyebrow: "RETURN POLICY",
      title: "Understand the five-day QC window",
      intro:
        "The published request window is not an unconditional return promise; product and seller conditions still matter.",
    },
    about: {
      eyebrow: "ABOUT",
      title: "Independent product discovery and research",
      intro:
        "This website helps readers find products and understand the agent workflow.",
    },
    "editorial-policy": {
      eyebrow: "EDITORIAL POLICY",
      title: "Facts first, practical advice second",
      intro:
        "Time-sensitive claims are checked against published platform information.",
    },
    privacy: {
      eyebrow: "PRIVACY",
      title: "Privacy policy",
      intro:
        "This website has no accounts, checkout, comments or file uploads.",
    },
    terms: {
      eyebrow: "TERMS",
      title: "Terms of use",
      intro:
        "The website provides independent information and product-discovery links.",
    },
  },
  common: {
    factsTitle: "What this page covers",
    factsBody:
      "Use this page to understand the key steps and open the relevant product or category page directly.",
    checkTitle: "Check the live details",
    checkBody:
      "Prices, availability, seller conditions, service fees and shipping routes can change. Review the current listing and account information before paying.",
    nextTitle: "Continue browsing",
    nextBody:
      "Use the product directory, categories and research guides to move between discovery and practical checks.",
    footer: "Independent Joyagoo spreadsheet research and product discovery.",
    disclaimer:
      "Not affiliated with Joyagoo. Always verify current platform policies before ordering.",
    home: "Home",
    guides: "Guides",
    returns: "Returns",
  },
  faq: [
    {
      q: "Where do the product links go?",
      a: "Each product card opens its matching product detail page. Category cards open the matching catalogue section; no product button leads to an unrelated website.",
    },
    {
      q: "Does Joyagoo inspect products at the warehouse?",
      a: "Published shopping guidance says warehouse staff perform a quality check and provide photos after the item arrives.",
    },
    {
      q: "How long is the return request window?",
      a: "The published policy describes a five-day or 120-hour request window after QC completion, subject to seller eligibility and product conditions.",
    },
    {
      q: "Is this website operated by Joyagoo?",
      a: "No. This is an independent discovery and educational website. It does not process payments, orders, QC or international parcels.",
    },
    ...extraFaq.en,
  ],
};

export const translations: Record<Locale, Copy> = {
  en,
  zh: {
    ...en,
    nav: {
      spreadsheet: "选品表",
      categories: "商品分类",
      howTo: "购买指南",
      qc: "质检指南",
      shipping: "国际运输",
      faq: "常见问题",
      explore: "浏览商品",
    },
    home: {
      kicker: "独立选品指南 · 2026年7月更新",
      title: "Joyagoo 2026 选品表：用真实购买指南找到更合适的商品",
      intro: "浏览精选商品和分类，在提交包裹前了解质检照片、运输方式和退货规则。",
      searchPlaceholder: "搜索鞋子、服装、配饰……",
      search: "搜索",
      policyResearch: "政策调研",
      independentGuidance: "独立指南",
      directLinks: "商品直达链接",
      researched: "已调研",
      buyingGuide: "购买指南",
      selectedProducts: "✓ 精选商品",
      browseCategory: "浏览分类 ↗",
      latestEyebrow: "精选商品发现",
      latestTitle: "最新商品",
      latestDescription: "每张图片和商品卡都会打开对应详情页，实时价格和库存可能发生变化。",
      viewProduct: "查看商品 ↗",
      browseAll: "浏览全部商品 ↗",
      libraryEyebrow: "JOYAGOO 购买资料库",
      libraryTitle: "发货前先做好功课",
      libraryDescription: "基于平台公开政策整理的清晰指南，并说明重要限制条件。",
      readGuide: "阅读指南 →",
      quickAnswers: "快速解答",
      faqTitle: "使用 Joyagoo 选品表之前",
      faqIntro: "选品表帮助发现商品，最终决定仍需结合实时商品页、卖家规则、质检照片和可用线路。",
    },
    pages: {
      spreadsheet: { eyebrow: "商品目录", title: "Joyagoo 2026 选品表", intro: "浏览精选商品，并直接进入每件商品对应的详情页。" },
      categories: { eyebrow: "按分类选购", title: "快速找到对应商品分类", intro: "使用精准分类入口，不再跳到无关的综合页面。" },
      "how-to-buy": { eyebrow: "购买指南", title: "如何使用 Joyagoo 下单", intro: "了解选品、首次付款、仓库质检和国际包裹提交过程。" },
      "qc-guide": { eyebrow: "质检指南", title: "Joyagoo 质检照片要检查什么", intro: "确认颜色、外形、做工、尺码证据和包装，再决定是否接受商品。" },
      "shipping-guide": { eyebrow: "运输指南", title: "付款前规划 Joyagoo 包裹", intro: "区分商品费用与国际运费，并检查重量、体积、包装和线路条件。" },
      faq: { eyebrow: "快速解答", title: "Joyagoo 选品表常见问题", intro: "关于商品链接、质检、退货和本站性质的直接解答。" },
      guides: { eyebrow: "调研资料库", title: "Joyagoo 购买指南", intro: "覆盖选品、质检、运输和退货的实用内容。" },
      returns: { eyebrow: "退货政策", title: "理解质检后的五天申请窗口", intro: "申请时间不等于无条件退货，仍受商品和卖家条件限制。" },
      about: { eyebrow: "关于我们", title: "独立选品和研究网站", intro: "帮助读者发现商品并理解代购流程。" },
      "editorial-policy": { eyebrow: "编辑政策", title: "先核对事实，再提供建议", intro: "时效性信息均以平台公开资料为依据。" },
      privacy: { eyebrow: "隐私", title: "隐私政策", intro: "本站不提供账户、结账、评论或文件上传功能。" },
      terms: { eyebrow: "条款", title: "使用条款", intro: "本站提供独立信息和商品发现链接。" },
    },
    common: {
      factsTitle: "本页内容",
      factsBody: "了解关键步骤，并直接打开对应商品或分类页面。",
      checkTitle: "核对实时信息",
      checkBody: "价格、库存、卖家规则、服务费用和运输线路可能变化，付款前请查看实时信息。",
      nextTitle: "继续浏览",
      nextBody: "通过商品目录、分类和指南，在选品与实际检查之间快速切换。",
      footer: "独立的 Joyagoo 选品表研究和商品发现网站。",
      disclaimer: "与 Joyagoo 无隶属关系。下单前请核对当前平台政策。",
      home: "首页",
      guides: "指南",
      returns: "退货",
    },
    faq: [
      { q: "商品链接会跳到哪里？", a: "每个商品卡都会打开对应详情页，分类卡也会进入对应目录，不会跳到无关网站。" },
      { q: "Joyagoo 会在仓库质检吗？", a: "公开购买指南显示，商品到仓后工作人员会进行质检并提供照片。" },
      { q: "退货申请时间有多长？", a: "公开政策说明，质检完成后通常有5天或120小时申请窗口，但仍受卖家和商品条件限制。" },
      { q: "本站由 Joyagoo 运营吗？", a: "不是。本站是独立的商品发现和教育网站，不处理付款、订单、质检或国际包裹。" },
      ...extraFaq.zh,
    ],
  },
  de: {
    ...en,
    nav: { spreadsheet: "Tabelle", categories: "Kategorien", howTo: "Kaufanleitung", qc: "QC-Guide", shipping: "Versand", faq: "FAQ", explore: "Produkte ansehen" },
    home: {
      kicker: "Unabhängige Produktsuche · Aktualisiert Juli 2026",
      title: "Joyagoo-Produkttabelle 2026: Bessere Produkte mit klarer Kaufberatung finden",
      intro: "Entdecke ausgewählte Produkte und Kategorien und informiere dich vor dem Versand über QC-Fotos, Versandarten und Rückgaben.",
      searchPlaceholder: "Schuhe, Kleidung, Accessoires suchen …", search: "Suchen", policyResearch: "Richtlinien geprüft", independentGuidance: "Unabhängiger Ratgeber", directLinks: "Direkte Produktlinks",
      researched: "GEPRÜFT", buyingGuide: "KAUFBERATUNG", selectedProducts: "✓ Ausgewählte Produkte", browseCategory: "Kategorie ansehen ↗",
      latestEyebrow: "KURATIERTE PRODUKTSUCHE", latestTitle: "Aktuelle Produktfunde", latestDescription: "Jede Karte öffnet die passende Produktdetailseite. Preis und Verfügbarkeit können sich ändern.", viewProduct: "Produkt ansehen ↗", browseAll: "Alle Produkte ansehen ↗",
      libraryEyebrow: "JOYAGOO RATGEBER", libraryTitle: "Informieren, bevor du versendest", libraryDescription: "Klare Hinweise auf Basis veröffentlichter Plattformregeln und ihrer Bedingungen.", readGuide: "Ratgeber lesen →",
      quickAnswers: "KURZE ANTWORTEN", faqTitle: "Vor der Nutzung einer Joyagoo-Tabelle", faqIntro: "Die Tabelle hilft bei der Suche; entscheidend bleiben Live-Angebot, Verkäuferregeln, QC-Fotos und verfügbare Versandlinie.",
    },
    pages: {
      spreadsheet: { eyebrow: "PRODUKTVERZEICHNIS", title: "Joyagoo-Produkttabelle 2026", intro: "Ausgewählte Produkte mit direkten Links zur passenden Detailseite." },
      categories: { eyebrow: "NACH KATEGORIE", title: "Den richtigen Produktbereich finden", intro: "Gezielte Kategorien statt einer allgemeinen, unpassenden Seite." },
      "how-to-buy": { eyebrow: "KAUFANLEITUNG", title: "So kaufst du mit Joyagoo", intro: "Produktauswahl, erste Zahlung, Lager-QC und internationale Pakete verständlich erklärt." },
      "qc-guide": { eyebrow: "QC-GUIDE", title: "Was du auf Joyagoo-QC-Fotos prüfen solltest", intro: "Farbe, Form, Verarbeitung, Größenangaben und Verpackung kontrollieren." },
      "shipping-guide": { eyebrow: "VERSAND-GUIDE", title: "Joyagoo-Pakete vor der Zahlung planen", intro: "Produktkosten und internationalen Versand trennen; Gewicht, Volumen und Route prüfen." },
      faq: { eyebrow: "KURZE ANTWORTEN", title: "FAQ zur Joyagoo-Produkttabelle", intro: "Antworten zu Produktlinks, QC, Rückgaben und dieser unabhängigen Website." },
      guides: { eyebrow: "RATGEBER", title: "Joyagoo Kaufanleitungen", intro: "Praktische Hilfe zu Produktsuche, QC, Versand und Rückgaben." },
      returns: { eyebrow: "RÜCKGABE", title: "Das fünftägige QC-Fenster verstehen", intro: "Das Zeitfenster ist keine bedingungslose Rückgabegarantie." },
      about: { eyebrow: "ÜBER UNS", title: "Unabhängige Produktsuche und Recherche", intro: "Wir helfen beim Finden von Produkten und beim Verständnis des Agentenablaufs." },
      "editorial-policy": { eyebrow: "REDAKTION", title: "Fakten zuerst, Tipps danach", intro: "Zeitkritische Angaben werden anhand veröffentlichter Informationen geprüft." },
      privacy: { eyebrow: "DATENSCHUTZ", title: "Datenschutzerklärung", intro: "Keine Konten, Kasse, Kommentare oder Datei-Uploads." },
      terms: { eyebrow: "BEDINGUNGEN", title: "Nutzungsbedingungen", intro: "Unabhängige Informationen und Produktlinks." },
    },
    common: { factsTitle: "Worum es hier geht", factsBody: "Wichtige Schritte verstehen und passende Produkt- oder Kategorieseiten direkt öffnen.", checkTitle: "Live-Angaben prüfen", checkBody: "Preise, Bestand, Verkäuferregeln, Gebühren und Versandlinien können sich ändern.", nextTitle: "Weiterstöbern", nextBody: "Nutze Produktverzeichnis, Kategorien und Ratgeber für den nächsten Schritt.", footer: "Unabhängige Recherche zur Joyagoo-Produkttabelle und Produktsuche.", disclaimer: "Nicht mit Joyagoo verbunden. Vor dem Kauf aktuelle Regeln prüfen.", home: "Startseite", guides: "Ratgeber", returns: "Rückgaben" },
    faq: [
      { q: "Wohin führen die Produktlinks?", a: "Jede Karte öffnet die passende Produktdetailseite; Kategorien führen nur in den zugehörigen Bereich." },
      { q: "Prüft Joyagoo Produkte im Lager?", a: "Laut veröffentlichter Anleitung führt das Lager nach Ankunft eine Qualitätskontrolle durch und stellt Fotos bereit." },
      { q: "Wie lang ist das Rückgabefenster?", a: "Die veröffentlichte Regel nennt fünf Tage beziehungsweise 120 Stunden nach Abschluss der QC, abhängig von Verkäufer- und Produktbedingungen." },
      { q: "Wird diese Website von Joyagoo betrieben?", a: "Nein. Sie ist eine unabhängige Informations- und Produktsuchseite." },
      ...extraFaq.de,
    ],
  },
  pl: {
    ...en,
    nav: { spreadsheet: "Arkusz", categories: "Kategorie", howTo: "Jak kupować", qc: "Kontrola QC", shipping: "Wysyłka", faq: "FAQ", explore: "Zobacz produkty" },
    home: {
      kicker: "Niezależne wyszukiwanie produktów · Aktualizacja: lipiec 2026", title: "Arkusz produktów Joyagoo 2026: znajdź lepsze produkty z praktycznym poradnikiem", intro: "Przeglądaj wybrane produkty i kategorie oraz poznaj zasady zdjęć QC, wysyłki i zwrotów przed nadaniem paczki.",
      searchPlaceholder: "Szukaj butów, odzieży, akcesoriów…", search: "Szukaj", policyResearch: "Sprawdzone zasady", independentGuidance: "Niezależny poradnik", directLinks: "Bezpośrednie linki",
      researched: "SPRAWDZONE", buyingGuide: "PORADNIK ZAKUPOWY", selectedProducts: "✓ Wybrane produkty", browseCategory: "Przeglądaj kategorię ↗",
      latestEyebrow: "WYBRANE PRODUKTY", latestTitle: "Najnowsze znaleziska", latestDescription: "Każda karta otwiera właściwą stronę produktu. Cena i dostępność mogą się zmienić.", viewProduct: "Zobacz produkt ↗", browseAll: "Zobacz wszystkie produkty ↗",
      libraryEyebrow: "BIBLIOTEKA JOYAGOO", libraryTitle: "Sprawdź przed wysyłką", libraryDescription: "Czytelne poradniki oparte na opublikowanych zasadach platformy.", readGuide: "Czytaj poradnik →",
      quickAnswers: "SZYBKIE ODPOWIEDZI", faqTitle: "Zanim użyjesz arkusza Joyagoo", faqIntro: "Arkusz pomaga znaleźć produkt; decyzję oprzyj na aktualnej ofercie, zasadach sprzedawcy, zdjęciach QC i dostępnej trasie.",
    },
    pages: {
      spreadsheet: { eyebrow: "KATALOG PRODUKTÓW", title: "Arkusz produktów Joyagoo 2026", intro: "Wybrane produkty z bezpośrednimi linkami do właściwych stron." },
      categories: { eyebrow: "KATEGORIE", title: "Znajdź właściwy dział", intro: "Dokładne linki do kategorii zamiast przypadkowej strony ogólnej." },
      "how-to-buy": { eyebrow: "JAK KUPOWAĆ", title: "Jak kupować przez Joyagoo", intro: "Wybór produktu, pierwsza płatność, QC w magazynie i przesyłka międzynarodowa." },
      "qc-guide": { eyebrow: "KONTROLA QC", title: "Co sprawdzić na zdjęciach QC Joyagoo", intro: "Porównaj kolor, kształt, wykonanie, rozmiar i opakowanie." },
      "shipping-guide": { eyebrow: "WYSYŁKA", title: "Zaplanuj paczkę Joyagoo przed płatnością", intro: "Oddziel koszt produktu od wysyłki i sprawdź wagę, objętość oraz trasę." },
      faq: { eyebrow: "ODPOWIEDZI", title: "FAQ arkusza produktów Joyagoo", intro: "Informacje o linkach, QC, zwrotach i niezależnym charakterze strony." },
      guides: { eyebrow: "PORADNIKI", title: "Poradniki zakupowe Joyagoo", intro: "Praktyczne informacje o produktach, QC, wysyłce i zwrotach." },
      returns: { eyebrow: "ZWROTY", title: "Pięciodniowe okno po QC", intro: "Okno zgłoszenia nie oznacza bezwarunkowego zwrotu." },
      about: { eyebrow: "O NAS", title: "Niezależne odkrywanie produktów", intro: "Pomagamy znaleźć produkty i zrozumieć proces agenta." },
      "editorial-policy": { eyebrow: "REDAKCJA", title: "Najpierw fakty", intro: "Informacje czasowe sprawdzamy w opublikowanych źródłach." },
      privacy: { eyebrow: "PRYWATNOŚĆ", title: "Polityka prywatności", intro: "Brak kont, płatności, komentarzy i przesyłania plików." },
      terms: { eyebrow: "WARUNKI", title: "Warunki korzystania", intro: "Niezależne informacje i linki do produktów." },
    },
    common: { factsTitle: "Zakres strony", factsBody: "Poznaj najważniejsze kroki i przejdź do właściwego produktu lub kategorii.", checkTitle: "Sprawdź aktualne dane", checkBody: "Ceny, dostępność, zasady, opłaty i trasy mogą się zmieniać.", nextTitle: "Przeglądaj dalej", nextBody: "Korzystaj z katalogu, kategorii i poradników.", footer: "Niezależne badania arkusza Joyagoo i wyszukiwanie produktów.", disclaimer: "Brak powiązania z Joyagoo. Sprawdź aktualne zasady przed zakupem.", home: "Strona główna", guides: "Poradniki", returns: "Zwroty" },
    faq: [
      { q: "Dokąd prowadzą linki produktów?", a: "Każda karta otwiera pasującą stronę produktu, a kategorie prowadzą do właściwego działu." },
      { q: "Czy Joyagoo sprawdza produkty w magazynie?", a: "Opublikowana instrukcja mówi o kontroli jakości i zdjęciach po przyjęciu produktu." },
      { q: "Ile trwa okno zwrotu?", a: "Zasady podają pięć dni lub 120 godzin od zakończenia QC, z dodatkowymi warunkami." },
      { q: "Czy to oficjalna strona Joyagoo?", a: "Nie. To niezależny serwis informacyjny i katalogowy." },
      ...extraFaq.pl,
    ],
  },
  es: {
    ...en,
    nav: { spreadsheet: "Hoja", categories: "Categorías", howTo: "Cómo comprar", qc: "Guía QC", shipping: "Envío", faq: "Preguntas", explore: "Ver productos" },
    home: {
      kicker: "Descubrimiento independiente · Actualizado en julio de 2026", title: "Hoja de productos Joyagoo 2026: encuentra mejores productos con una guía real", intro: "Explora productos y categorías seleccionados y revisa fotos QC, opciones de envío y devoluciones antes de enviar tu paquete.",
      searchPlaceholder: "Buscar zapatos, ropa, accesorios…", search: "Buscar", policyResearch: "Políticas revisadas", independentGuidance: "Guía independiente", directLinks: "Enlaces directos",
      researched: "INVESTIGADO", buyingGuide: "GUÍA DE COMPRA", selectedProducts: "✓ Productos seleccionados", browseCategory: "Ver categoría ↗",
      latestEyebrow: "SELECCIÓN DE PRODUCTOS", latestTitle: "Últimos productos", latestDescription: "Cada tarjeta abre la página correspondiente. El precio y la disponibilidad pueden cambiar.", viewProduct: "Ver producto ↗", browseAll: "Ver todos los productos ↗",
      libraryEyebrow: "GUÍAS DE JOYAGOO", libraryTitle: "Infórmate antes de enviar", libraryDescription: "Guías claras basadas en políticas publicadas y sus condiciones.", readGuide: "Leer la guía →",
      quickAnswers: "RESPUESTAS RÁPIDAS", faqTitle: "Antes de usar una hoja de Joyagoo", faqIntro: "La hoja ayuda a descubrir productos; revisa la oferta, las condiciones, las fotos QC y la ruta disponible.",
    },
    pages: {
      spreadsheet: { eyebrow: "DIRECTORIO", title: "Hoja de productos Joyagoo 2026", intro: "Productos seleccionados con enlaces directos a cada página correspondiente." },
      categories: { eyebrow: "POR CATEGORÍA", title: "Encuentra la sección adecuada", intro: "Enlaces de categoría precisos, sin páginas generales irrelevantes." },
      "how-to-buy": { eyebrow: "CÓMO COMPRAR", title: "Cómo comprar con Joyagoo", intro: "Selección, primer pago, QC en almacén y envío internacional." },
      "qc-guide": { eyebrow: "GUÍA QC", title: "Qué revisar en las fotos QC de Joyagoo", intro: "Comprueba color, forma, fabricación, talla y embalaje." },
      "shipping-guide": { eyebrow: "ENVÍO", title: "Planifica tu paquete antes de pagar", intro: "Separa producto y envío; revisa peso, volumen, embalaje y ruta." },
      faq: { eyebrow: "RESPUESTAS", title: "Preguntas sobre la hoja de productos Joyagoo", intro: "Enlaces, QC, devoluciones y la naturaleza independiente del sitio." },
      guides: { eyebrow: "GUÍAS", title: "Guías de compra Joyagoo", intro: "Información práctica sobre productos, QC, envío y devoluciones." },
      returns: { eyebrow: "DEVOLUCIONES", title: "La ventana de cinco días tras QC", intro: "El plazo no es una garantía de devolución sin condiciones." },
      about: { eyebrow: "NOSOTROS", title: "Descubrimiento independiente", intro: "Ayudamos a encontrar productos y entender el proceso." },
      "editorial-policy": { eyebrow: "EDITORIAL", title: "Primero los hechos", intro: "Verificamos la información sensible al tiempo." },
      privacy: { eyebrow: "PRIVACIDAD", title: "Política de privacidad", intro: "Sin cuentas, pagos, comentarios ni archivos." },
      terms: { eyebrow: "TÉRMINOS", title: "Términos de uso", intro: "Información independiente y enlaces de productos." },
    },
    common: { factsTitle: "Qué cubre esta página", factsBody: "Entiende los pasos clave y abre el producto o categoría adecuados.", checkTitle: "Comprueba los datos actuales", checkBody: "Precios, existencias, condiciones, tarifas y rutas pueden cambiar.", nextTitle: "Seguir explorando", nextBody: "Usa el directorio, las categorías y las guías.", footer: "Investigación independiente sobre la hoja de productos Joyagoo.", disclaimer: "Sin afiliación con Joyagoo. Revisa las políticas actuales antes de comprar.", home: "Inicio", guides: "Guías", returns: "Devoluciones" },
    faq: [
      { q: "¿A dónde llevan los enlaces?", a: "Cada tarjeta abre la página correspondiente y cada categoría su sección exacta." },
      { q: "¿Joyagoo inspecciona en el almacén?", a: "La guía publicada indica que se hace un control de calidad y se facilitan fotos." },
      { q: "¿Cuánto dura el plazo de devolución?", a: "La política publicada indica cinco días o 120 horas tras completar el QC, con condiciones." },
      { q: "¿Este sitio pertenece a Joyagoo?", a: "No. Es un sitio independiente de información y descubrimiento." },
      ...extraFaq.es,
    ],
  },
  it: {
    ...en,
    nav: { spreadsheet: "Foglio", categories: "Categorie", howTo: "Come acquistare", qc: "Guida QC", shipping: "Spedizione", faq: "FAQ", explore: "Vedi prodotti" },
    home: {
      kicker: "Scoperta indipendente · Aggiornato luglio 2026", title: "Foglio prodotti Joyagoo 2026: trova prodotti migliori con una guida concreta", intro: "Esplora prodotti e categorie selezionati e controlla foto QC, spedizione e resi prima di inviare il pacco.",
      searchPlaceholder: "Cerca scarpe, abbigliamento, accessori…", search: "Cerca", policyResearch: "Regole verificate", independentGuidance: "Guida indipendente", directLinks: "Link diretti",
      researched: "VERIFICATO", buyingGuide: "GUIDA ACQUISTO", selectedProducts: "✓ Prodotti selezionati", browseCategory: "Sfoglia categoria ↗",
      latestEyebrow: "SELEZIONE PRODOTTI", latestTitle: "Ultimi prodotti", latestDescription: "Ogni scheda apre la pagina corretta. Prezzo e disponibilità possono cambiare.", viewProduct: "Vedi prodotto ↗", browseAll: "Vedi tutti i prodotti ↗",
      libraryEyebrow: "GUIDE JOYAGOO", libraryTitle: "Informati prima di spedire", libraryDescription: "Guide chiare basate sulle regole pubblicate e sulle loro condizioni.", readGuide: "Leggi la guida →",
      quickAnswers: "RISPOSTE RAPIDE", faqTitle: "Prima di usare un foglio Joyagoo", faqIntro: "Il foglio aiuta a trovare prodotti; verifica offerta, venditore, foto QC e linea disponibile.",
    },
    pages: {
      spreadsheet: { eyebrow: "CATALOGO", title: "Foglio prodotti Joyagoo 2026", intro: "Prodotti selezionati con link diretti alle pagine corrispondenti." },
      categories: { eyebrow: "CATEGORIE", title: "Trova la sezione giusta", intro: "Link precisi alle categorie senza pagine generiche non pertinenti." },
      "how-to-buy": { eyebrow: "COME ACQUISTARE", title: "Come acquistare con Joyagoo", intro: "Selezione, primo pagamento, QC in magazzino e pacco internazionale." },
      "qc-guide": { eyebrow: "GUIDA QC", title: "Cosa controllare nelle foto QC", intro: "Verifica colore, forma, lavorazione, taglia e confezione." },
      "shipping-guide": { eyebrow: "SPEDIZIONE", title: "Pianifica il pacco prima di pagare", intro: "Distingui prodotto e spedizione; controlla peso, volume e percorso." },
      faq: { eyebrow: "RISPOSTE", title: "FAQ del foglio prodotti Joyagoo", intro: "Link, QC, resi e natura indipendente del sito." },
      guides: { eyebrow: "GUIDE", title: "Guide acquisto Joyagoo", intro: "Informazioni pratiche su prodotti, QC, spedizione e resi." },
      returns: { eyebrow: "RESI", title: "La finestra di cinque giorni dopo il QC", intro: "Il termine non garantisce un reso incondizionato." },
      about: { eyebrow: "CHI SIAMO", title: "Scoperta indipendente di prodotti", intro: "Aiutiamo a trovare prodotti e capire il processo." },
      "editorial-policy": { eyebrow: "EDITORIALE", title: "Prima i fatti", intro: "Verifichiamo le informazioni soggette a cambiamenti." },
      privacy: { eyebrow: "PRIVACY", title: "Informativa privacy", intro: "Nessun account, pagamento, commento o caricamento." },
      terms: { eyebrow: "TERMINI", title: "Termini d'uso", intro: "Informazioni indipendenti e link ai prodotti." },
    },
    common: { factsTitle: "Contenuto della pagina", factsBody: "Comprendi i passaggi e apri il prodotto o la categoria corretti.", checkTitle: "Controlla i dati attuali", checkBody: "Prezzi, disponibilità, condizioni, tariffe e rotte possono cambiare.", nextTitle: "Continua a esplorare", nextBody: "Usa catalogo, categorie e guide.", footer: "Ricerca indipendente sul foglio prodotti Joyagoo.", disclaimer: "Non affiliato a Joyagoo. Verifica le regole prima dell'acquisto.", home: "Pagina iniziale", guides: "Guide", returns: "Resi" },
    faq: [
      { q: "Dove portano i link?", a: "Ogni scheda apre la pagina prodotto corretta e ogni categoria la sezione corrispondente." },
      { q: "Joyagoo controlla i prodotti?", a: "La guida pubblicata indica un controllo qualità in magazzino con foto." },
      { q: "Quanto dura la finestra di reso?", a: "La regola indica cinque giorni o 120 ore dopo il QC, con condizioni." },
      { q: "Questo sito è gestito da Joyagoo?", a: "No. È un sito indipendente di informazione e scoperta." },
      ...extraFaq.it,
    ],
  },
  fr: {
    ...en,
    nav: { spreadsheet: "Tableur", categories: "Catégories", howTo: "Comment acheter", qc: "Guide QC", shipping: "Livraison", faq: "FAQ", explore: "Voir les produits" },
    home: {
      kicker: "Découverte indépendante · Mis à jour en juillet 2026", title: "Tableur de produits Joyagoo 2026 : trouvez de meilleurs produits avec un vrai guide", intro: "Parcourez des produits et catégories sélectionnés, puis vérifiez les photos QC, l’expédition et les retours avant d’envoyer votre colis.",
      searchPlaceholder: "Rechercher chaussures, vêtements, accessoires…", search: "Rechercher", policyResearch: "Règles vérifiées", independentGuidance: "Guide indépendant", directLinks: "Liens directs",
      researched: "VÉRIFIÉ", buyingGuide: "GUIDE D’ACHAT", selectedProducts: "✓ Produits sélectionnés", browseCategory: "Voir la catégorie ↗",
      latestEyebrow: "SÉLECTION DE PRODUITS", latestTitle: "Dernières trouvailles", latestDescription: "Chaque carte ouvre la bonne fiche produit. Prix et disponibilité peuvent changer.", viewProduct: "Voir le produit ↗", browseAll: "Voir tous les produits ↗",
      libraryEyebrow: "GUIDES JOYAGOO", libraryTitle: "Renseignez-vous avant d’expédier", libraryDescription: "Des guides clairs fondés sur les règles publiées et leurs conditions.", readGuide: "Lire le guide →",
      quickAnswers: "RÉPONSES RAPIDES", faqTitle: "Avant d’utiliser un tableur Joyagoo", faqIntro: "Le tableur aide à découvrir; vérifiez l’annonce, le vendeur, les photos QC et la ligne disponible.",
    },
    pages: {
      spreadsheet: { eyebrow: "RÉPERTOIRE", title: "Tableur de produits Joyagoo 2026", intro: "Produits sélectionnés avec des liens directs vers chaque fiche correspondante." },
      categories: { eyebrow: "CATÉGORIES", title: "Trouvez la bonne section", intro: "Des liens précis sans page générale sans rapport." },
      "how-to-buy": { eyebrow: "COMMENT ACHETER", title: "Comment acheter avec Joyagoo", intro: "Sélection, premier paiement, QC en entrepôt et colis international." },
      "qc-guide": { eyebrow: "GUIDE QC", title: "Que vérifier sur les photos QC", intro: "Contrôlez couleur, forme, fabrication, taille et emballage." },
      "shipping-guide": { eyebrow: "LIVRAISON", title: "Planifiez le colis avant de payer", intro: "Séparez produit et expédition; vérifiez poids, volume et itinéraire." },
      faq: { eyebrow: "RÉPONSES", title: "FAQ du tableur de produits Joyagoo", intro: "Liens, QC, retours et nature indépendante du site." },
      guides: { eyebrow: "GUIDES", title: "Guides d’achat Joyagoo", intro: "Informations pratiques sur produits, QC, livraison et retours." },
      returns: { eyebrow: "RETOURS", title: "La fenêtre de cinq jours après QC", intro: "Le délai n’est pas une garantie de retour sans condition." },
      about: { eyebrow: "À PROPOS", title: "Découverte indépendante de produits", intro: "Nous aidons à trouver des produits et comprendre le processus." },
      "editorial-policy": { eyebrow: "ÉDITORIAL", title: "Les faits d’abord", intro: "Les informations sensibles au temps sont vérifiées." },
      privacy: { eyebrow: "CONFIDENTIALITÉ", title: "Politique de confidentialité", intro: "Aucun compte, paiement, commentaire ou fichier." },
      terms: { eyebrow: "CONDITIONS", title: "Conditions d’utilisation", intro: "Informations indépendantes et liens produits." },
    },
    common: { factsTitle: "Ce que couvre cette page", factsBody: "Comprenez les étapes et ouvrez le bon produit ou la bonne catégorie.", checkTitle: "Vérifiez les données actuelles", checkBody: "Prix, stock, conditions, frais et itinéraires peuvent changer.", nextTitle: "Continuer à explorer", nextBody: "Utilisez le répertoire, les catégories et les guides.", footer: "Recherche indépendante sur le tableur de produits Joyagoo.", disclaimer: "Non affilié à Joyagoo. Vérifiez les règles avant l’achat.", home: "Accueil", guides: "Guides", returns: "Retours" },
    faq: [
      { q: "Où mènent les liens produits ?", a: "Chaque carte ouvre la fiche correspondante et chaque catégorie la bonne section." },
      { q: "Joyagoo inspecte-t-il les produits ?", a: "Le guide publié indique un contrôle qualité en entrepôt avec des photos." },
      { q: "Quelle est la durée du retour ?", a: "La règle publiée indique cinq jours ou 120 heures après le QC, sous conditions." },
      { q: "Ce site est-il géré par Joyagoo ?", a: "Non. C’est un site indépendant d’information et de découverte." },
      ...extraFaq.fr,
    ],
  },
  pt: {
    ...en,
    nav: { spreadsheet: "Planilha", categories: "Categorias", howTo: "Como comprar", qc: "Guia QC", shipping: "Envio", faq: "FAQ", explore: "Ver produtos" },
    home: {
      kicker: "Descoberta independente · Atualizado em julho de 2026", title: "Planilha de produtos Joyagoo 2026: encontre produtos melhores com orientação real", intro: "Explore produtos e categorias selecionados e verifique fotos QC, opções de envio e devoluções antes de enviar o pacote.",
      searchPlaceholder: "Buscar calçados, roupas, acessórios…", search: "Buscar", policyResearch: "Políticas verificadas", independentGuidance: "Guia independente", directLinks: "Links diretos",
      researched: "PESQUISADO", buyingGuide: "GUIA DE COMPRA", selectedProducts: "✓ Produtos selecionados", browseCategory: "Ver categoria ↗",
      latestEyebrow: "SELEÇÃO DE PRODUTOS", latestTitle: "Produtos recentes", latestDescription: "Cada cartão abre a página correta. Preço e disponibilidade podem mudar.", viewProduct: "Ver produto ↗", browseAll: "Ver todos os produtos ↗",
      libraryEyebrow: "GUIAS JOYAGOO", libraryTitle: "Pesquise antes de enviar", libraryDescription: "Guias claros baseados em regras publicadas e suas condições.", readGuide: "Ler o guia →",
      quickAnswers: "RESPOSTAS RÁPIDAS", faqTitle: "Antes de usar uma planilha Joyagoo", faqIntro: "A planilha ajuda a descobrir; confira oferta, vendedor, fotos QC e rota disponível.",
    },
    pages: {
      spreadsheet: { eyebrow: "CATÁLOGO", title: "Planilha de produtos Joyagoo 2026", intro: "Produtos selecionados com links diretos para as páginas correspondentes." },
      categories: { eyebrow: "CATEGORIAS", title: "Encontre a seção certa", intro: "Links precisos para categorias, sem páginas gerais irrelevantes." },
      "how-to-buy": { eyebrow: "COMO COMPRAR", title: "Como comprar com Joyagoo", intro: "Seleção, primeiro pagamento, QC no armazém e pacote internacional." },
      "qc-guide": { eyebrow: "GUIA QC", title: "O que verificar nas fotos QC", intro: "Confira cor, formato, acabamento, tamanho e embalagem." },
      "shipping-guide": { eyebrow: "ENVIO", title: "Planeje o pacote antes de pagar", intro: "Separe produto e frete; verifique peso, volume e rota." },
      faq: { eyebrow: "RESPOSTAS", title: "FAQ da planilha de produtos Joyagoo", intro: "Links, QC, devoluções e natureza independente do site." },
      guides: { eyebrow: "GUIAS", title: "Guias de compra Joyagoo", intro: "Informações práticas sobre produtos, QC, envio e devoluções." },
      returns: { eyebrow: "DEVOLUÇÕES", title: "A janela de cinco dias após QC", intro: "O prazo não é garantia de devolução sem condições." },
      about: { eyebrow: "SOBRE", title: "Descoberta independente", intro: "Ajudamos a encontrar produtos e entender o processo." },
      "editorial-policy": { eyebrow: "EDITORIAL", title: "Fatos em primeiro lugar", intro: "Verificamos informações sujeitas a mudanças." },
      privacy: { eyebrow: "PRIVACIDADE", title: "Política de privacidade", intro: "Sem contas, pagamentos, comentários ou uploads." },
      terms: { eyebrow: "TERMOS", title: "Termos de uso", intro: "Informações independentes e links de produtos." },
    },
    common: { factsTitle: "O que esta página cobre", factsBody: "Entenda as etapas e abra o produto ou a categoria correta.", checkTitle: "Confira os dados atuais", checkBody: "Preços, estoque, condições, tarifas e rotas podem mudar.", nextTitle: "Continuar navegando", nextBody: "Use o catálogo, as categorias e os guias.", footer: "Pesquisa independente sobre a planilha de produtos Joyagoo.", disclaimer: "Sem afiliação com Joyagoo. Verifique as regras antes de comprar.", home: "Início", guides: "Guias", returns: "Devoluções" },
    faq: [
      { q: "Para onde vão os links?", a: "Cada cartão abre a página correta e cada categoria a seção correspondente." },
      { q: "A Joyagoo inspeciona os produtos?", a: "O guia publicado informa controle de qualidade e fotos no armazém." },
      { q: "Quanto dura a devolução?", a: "A regra publicada indica cinco dias ou 120 horas após o QC, com condições." },
      { q: "Este site é da Joyagoo?", a: "Não. É um site independente de informação e descoberta." },
      ...extraFaq.pt,
    ],
  },
  ro: {
    ...en,
    nav: { spreadsheet: "Tabel", categories: "Categorii", howTo: "Cum cumperi", qc: "Ghid QC", shipping: "Livrare", faq: "Întrebări", explore: "Vezi produsele" },
    home: {
      kicker: "Descoperire independentă · Actualizat iulie 2026", title: "Tabel de produse Joyagoo 2026: găsește produse mai bune cu un ghid real", intro: "Explorează produse și categorii selectate și verifică fotografiile QC, livrarea și retururile înainte de expediere.",
      searchPlaceholder: "Caută pantofi, haine, accesorii…", search: "Caută", policyResearch: "Politici verificate", independentGuidance: "Ghid independent", directLinks: "Linkuri directe",
      researched: "VERIFICAT", buyingGuide: "GHID DE CUMPĂRARE", selectedProducts: "✓ Produse selectate", browseCategory: "Vezi categoria ↗",
      latestEyebrow: "PRODUSE SELECTATE", latestTitle: "Produse recente", latestDescription: "Fiecare card deschide pagina corectă. Prețul și stocul se pot schimba.", viewProduct: "Vezi produsul ↗", browseAll: "Vezi toate produsele ↗",
      libraryEyebrow: "GHIDURI JOYAGOO", libraryTitle: "Informează-te înainte de expediere", libraryDescription: "Ghiduri clare bazate pe reguli publicate și condițiile lor.", readGuide: "Citește ghidul →",
      quickAnswers: "RĂSPUNSURI RAPIDE", faqTitle: "Înainte de a folosi tabelul Joyagoo", faqIntro: "Tabelul ajută la descoperire; verifică oferta, vânzătorul, fotografiile QC și ruta disponibilă.",
    },
    pages: {
      spreadsheet: { eyebrow: "CATALOG", title: "Tabel de produse Joyagoo 2026", intro: "Produse selectate cu linkuri directe către paginile corespunzătoare." },
      categories: { eyebrow: "CATEGORII", title: "Găsește secțiunea potrivită", intro: "Linkuri precise către categorii, fără pagini generale nerelevante." },
      "how-to-buy": { eyebrow: "CUM CUMPERI", title: "Cum cumperi cu Joyagoo", intro: "Selecție, prima plată, QC în depozit și colet internațional." },
      "qc-guide": { eyebrow: "GHID QC", title: "Ce verifici în fotografiile QC", intro: "Verifică culoarea, forma, execuția, mărimea și ambalajul." },
      "shipping-guide": { eyebrow: "LIVRARE", title: "Planifică coletul înainte de plată", intro: "Separă produsul de transport; verifică greutatea, volumul și ruta." },
      faq: { eyebrow: "RĂSPUNSURI", title: "Întrebări despre tabelul de produse Joyagoo", intro: "Linkuri, QC, retururi și caracterul independent al site-ului." },
      guides: { eyebrow: "GHIDURI", title: "Ghiduri Joyagoo", intro: "Informații practice despre produse, QC, livrare și retur." },
      returns: { eyebrow: "RETUR", title: "Fereastra de cinci zile după QC", intro: "Perioada nu garantează un retur necondiționat." },
      about: { eyebrow: "DESPRE", title: "Descoperire independentă", intro: "Ajutăm la găsirea produselor și înțelegerea procesului." },
      "editorial-policy": { eyebrow: "EDITORIAL", title: "Faptele înainte", intro: "Verificăm informațiile care se pot schimba." },
      privacy: { eyebrow: "CONFIDENȚIALITATE", title: "Politica de confidențialitate", intro: "Fără conturi, plăți, comentarii sau fișiere." },
      terms: { eyebrow: "TERMENI", title: "Termeni de utilizare", intro: "Informații independente și linkuri de produse." },
    },
    common: { factsTitle: "Ce conține pagina", factsBody: "Înțelege pașii și deschide produsul sau categoria potrivită.", checkTitle: "Verifică datele actuale", checkBody: "Prețurile, stocul, condițiile, taxele și rutele se pot schimba.", nextTitle: "Continuă navigarea", nextBody: "Folosește catalogul, categoriile și ghidurile.", footer: "Cercetare independentă despre tabelul de produse Joyagoo.", disclaimer: "Fără afiliere cu Joyagoo. Verifică regulile înainte de cumpărare.", home: "Acasă", guides: "Ghiduri", returns: "Retururi" },
    faq: [
      { q: "Unde duc linkurile?", a: "Fiecare card deschide pagina corectă, iar categoriile duc la secțiunea aferentă." },
      { q: "Joyagoo verifică produsele?", a: "Ghidul publicat indică verificare de calitate și fotografii în depozit." },
      { q: "Cât durează returul?", a: "Regula publicată indică cinci zile sau 120 de ore după QC, cu condiții." },
      { q: "Este site-ul operat de Joyagoo?", a: "Nu. Este un site independent de informare și descoperire." },
      ...extraFaq.ro,
    ],
  },
  sv: {
    ...en,
    nav: { spreadsheet: "Kalkylblad", categories: "Kategorier", howTo: "Så köper du", qc: "QC-guide", shipping: "Frakt", faq: "Frågor", explore: "Visa produkter" },
    home: {
      kicker: "Oberoende produktupptäckt · Uppdaterad juli 2026", title: "Joyagoo-produktkalkylblad 2026: hitta bättre produkter med tydlig vägledning", intro: "Utforska utvalda produkter och kategorier och kontrollera QC-bilder, frakt och returer innan paketet skickas.",
      searchPlaceholder: "Sök skor, kläder, accessoarer…", search: "Sök", policyResearch: "Regler granskade", independentGuidance: "Oberoende guide", directLinks: "Direkta länkar",
      researched: "GRANSKAT", buyingGuide: "KÖPGUIDE", selectedProducts: "✓ Utvalda produkter", browseCategory: "Visa kategori ↗",
      latestEyebrow: "UTVALDA PRODUKTER", latestTitle: "Senaste fynden", latestDescription: "Varje kort öppnar rätt produktsida. Pris och tillgänglighet kan ändras.", viewProduct: "Visa produkt ↗", browseAll: "Visa alla produkter ↗",
      libraryEyebrow: "JOYAGOO-GUIDER", libraryTitle: "Läs på före frakt", libraryDescription: "Tydliga guider baserade på publicerade regler och villkor.", readGuide: "Läs guiden →",
      quickAnswers: "SNABBA SVAR", faqTitle: "Innan du använder ett Joyagoo-kalkylblad", faqIntro: "Kalkylbladet hjälper dig hitta produkter; kontrollera annonsen, säljaren, QC-bilderna och tillgänglig frakt.",
    },
    pages: {
      spreadsheet: { eyebrow: "PRODUKTKATALOG", title: "Joyagoo-produktkalkylblad 2026", intro: "Utvalda produkter med direkta länkar till rätt sida." },
      categories: { eyebrow: "KATEGORIER", title: "Hitta rätt produktavdelning", intro: "Exakta kategorilänkar utan irrelevanta landningssidor." },
      "how-to-buy": { eyebrow: "SÅ KÖPER DU", title: "Så köper du med Joyagoo", intro: "Produktval, första betalning, QC i lager och internationellt paket." },
      "qc-guide": { eyebrow: "QC-GUIDE", title: "Vad du granskar i QC-bilder", intro: "Kontrollera färg, form, utförande, storlek och förpackning." },
      "shipping-guide": { eyebrow: "FRAKT", title: "Planera paketet före betalning", intro: "Skilj produktkostnad från frakt och kontrollera vikt, volym och rutt." },
      faq: { eyebrow: "SVAR", title: "Frågor om Joyagoos produktkalkylblad", intro: "Länkar, QC, returer och webbplatsens oberoende roll." },
      guides: { eyebrow: "GUIDER", title: "Joyagoo köpguider", intro: "Praktisk information om produkter, QC, frakt och returer." },
      returns: { eyebrow: "RETURER", title: "Femdagarsfönstret efter QC", intro: "Tidsfönstret är ingen villkorslös returgaranti." },
      about: { eyebrow: "OM OSS", title: "Oberoende produktupptäckt", intro: "Vi hjälper dig hitta produkter och förstå processen." },
      "editorial-policy": { eyebrow: "REDAKTION", title: "Fakta först", intro: "Tidskänslig information granskas mot publicerade uppgifter." },
      privacy: { eyebrow: "INTEGRITET", title: "Integritetspolicy", intro: "Inga konton, betalningar, kommentarer eller filer." },
      terms: { eyebrow: "VILLKOR", title: "Användarvillkor", intro: "Oberoende information och produktlänkar." },
    },
    common: { factsTitle: "Sidans innehåll", factsBody: "Förstå stegen och öppna rätt produkt eller kategori.", checkTitle: "Kontrollera aktuella uppgifter", checkBody: "Priser, lager, villkor, avgifter och rutter kan ändras.", nextTitle: "Fortsätt utforska", nextBody: "Använd katalogen, kategorierna och guiderna.", footer: "Oberoende research om Joyagoos produktkalkylblad.", disclaimer: "Inte ansluten till Joyagoo. Kontrollera aktuella regler före köp.", home: "Hem", guides: "Guider", returns: "Returer" },
    faq: [
      { q: "Vart leder produktlänkarna?", a: "Varje kort öppnar rätt produktsida och varje kategori rätt avdelning." },
      { q: "Kontrollerar Joyagoo produkterna?", a: "Den publicerade guiden anger kvalitetskontroll och bilder i lagret." },
      { q: "Hur långt är returfönstret?", a: "Den publicerade regeln anger fem dagar eller 120 timmar efter QC, med villkor." },
      { q: "Drivs webbplatsen av Joyagoo?", a: "Nej. Det är en oberoende informations- och produktsida." },
      ...extraFaq.sv,
    ],
  },
};
