import type { Metadata } from "next";
import Link from "next/link";
import {
  ArticleCards,
  FAQList,
  GuideCards,
  PageShell,
  ProductGrid,
  SearchBox,
} from "../components";
import {
  articles,
  categories,
  faqItems,
  guides,
  MAIN_SITE,
  workflow,
} from "../data";
import { HomePage } from "../page";
import {
  type Locale,
  isLocale,
  localeOptions,
  localizePath,
  t,
} from "../i18n";
import { getSiteData } from "../localized-data";
import { getLocalizedLongform } from "../localized-longform";
import {
  articleContent as researchedArticleContent,
  guideContent as researchedGuideContent,
} from "../seo-content";

type Params = Promise<{ slug: string[] }>;

const pageUi: Record<
  Locale,
  {
    researchRule: string;
    researchRuleText: string;
    browseCategory: string;
    method: string;
    methodTitle: string;
    methodText: string;
    about: { title: string; text: string }[];
    lastReview: string;
    reviewed: string;
    guideEyebrow: string;
    articleEyebrow: string;
    notFoundEyebrow: string;
    notFoundTitle: string;
    notFoundText: string;
    browseFinds: string;
    readGuides: string;
  }
> = {
  en: {
    researchRule: "Research rule",
    researchRuleText: "A product card is a discovery shortcut. Confirm the live listing, available options, current price and warehouse photos before shipping.",
    browseCategory: "Browse category ↗",
    method: "Method",
    methodTitle: "Facts first. Advice second.",
    methodText: "Platform steps and policy details are checked against PikoBuy’s published pages. Practical guidance is labelled clearly, without invented fees, delivery promises or quality guarantees.",
    about: [
      { title: "What we publish", text: "We publish organised product paths, category indexes, QC checklists, shipping explainers and beginner guides. Product links open the full external catalogue so readers can inspect live details." },
      { title: "How facts are checked", text: "Platform claims are checked against PikoBuy’s official About, Beginner’s Guide, Shipping Cost Estimation, Shipping Policy and Returns & Exchanges pages. Changeable fees are never presented as permanent." },
      { title: "What a listing does not prove", text: "Inclusion does not guarantee authenticity, stock, seller performance, materials, durability or fit. Warehouse photos help with visible inspection but cannot prove every quality claim." },
    ],
    lastReview: "Last methodology review",
    reviewed: "Reviewed 2026-07-29",
    guideEyebrow: "PikoBuy guide",
    articleEyebrow: "PikoBuy research article",
    notFoundEyebrow: "Page not found",
    notFoundTitle: "This research path has moved.",
    notFoundText: "Return to the product index or choose one of the current guides.",
    browseFinds: "Browse finds",
    readGuides: "Read guides →",
  },
  de: {
    researchRule: "Recherche-Regel",
    researchRuleText: "Eine Produktkarte ist nur eine Abkürzung zur Entdeckung. Prüfe vor dem Versand das aktuelle Angebot, Optionen, Preis und Lagerfotos.",
    browseCategory: "Kategorie öffnen ↗",
    method: "Methode",
    methodTitle: "Zuerst Fakten, dann Rat.",
    methodText: "Abläufe und Richtlinien werden mit den veröffentlichten PikoBuy-Seiten abgeglichen. Praktische Hinweise sind gekennzeichnet; Gebühren, Lieferzusagen oder Qualitätsgarantien werden nicht erfunden.",
    about: [
      { title: "Was wir veröffentlichen", text: "Wir veröffentlichen geordnete Produktpfade, Kategorien, QC-Checklisten, Versanderklärungen und Einsteiger-Ratgeber. Produktlinks öffnen den vollständigen externen Katalog." },
      { title: "Wie Fakten geprüft werden", text: "Aussagen werden mit PikoBuys offiziellen Seiten zu Unternehmen, Einstieg, Versandkosten, Versandrichtlinie und Rückgaben abgeglichen. Veränderliche Gebühren werden nicht als dauerhaft dargestellt." },
      { title: "Was ein Eintrag nicht beweist", text: "Die Aufnahme garantiert weder Echtheit, Bestand, Verkäuferleistung, Material, Haltbarkeit noch Passform. Lagerfotos helfen bei sichtbaren Prüfungen, beweisen aber nicht jede Qualitätsaussage." },
    ],
    lastReview: "Letzte Methodenprüfung",
    reviewed: "Geprüft am 29.07.2026",
    guideEyebrow: "PikoBuy-Ratgeber",
    articleEyebrow: "PikoBuy-Rechercheartikel",
    notFoundEyebrow: "Seite nicht gefunden",
    notFoundTitle: "Dieser Recherchepfad wurde verschoben.",
    notFoundText: "Zur Produktübersicht zurückkehren oder einen aktuellen Ratgeber wählen.",
    browseFinds: "Produkte ansehen",
    readGuides: "Ratgeber lesen →",
  },
  fr: {
    researchRule: "Règle de recherche",
    researchRuleText: "Une carte produit est un raccourci de découverte. Vérifiez l’annonce active, les options, le prix et les photos d’entrepôt avant l’expédition.",
    browseCategory: "Ouvrir la catégorie ↗",
    method: "Méthode",
    methodTitle: "Les faits d’abord, le conseil ensuite.",
    methodText: "Les étapes et politiques sont vérifiées sur les pages publiées par PikoBuy. Les conseils pratiques sont signalés, sans frais inventés, promesses de délai ni garantie de qualité.",
    about: [
      { title: "Ce que nous publions", text: "Nous publions des parcours produit, catégories, checklists QC, explications d’expédition et guides débutants. Les liens ouvrent le catalogue externe complet." },
      { title: "Comment les faits sont vérifiés", text: "Les affirmations sont comparées aux pages officielles de PikoBuy : À propos, guide débutant, estimation, politique d’expédition et retours. Les frais variables ne sont pas présentés comme permanents." },
      { title: "Ce qu’une fiche ne prouve pas", text: "La présence dans l’index ne garantit ni authenticité, ni stock, ni vendeur, ni matière, ni durabilité, ni coupe. Les photos d’entrepôt n’attestent pas toutes les qualités." },
    ],
    lastReview: "Dernière révision de la méthode",
    reviewed: "Révisé le 29/07/2026",
    guideEyebrow: "Guide PikoBuy",
    articleEyebrow: "Article de recherche PikoBuy",
    notFoundEyebrow: "Page introuvable",
    notFoundTitle: "Ce parcours de recherche a été déplacé.",
    notFoundText: "Revenez à l’index produit ou choisissez un guide actuel.",
    browseFinds: "Voir les produits",
    readGuides: "Lire les guides →",
  },
  es: {
    researchRule: "Regla de investigación",
    researchRuleText: "Una tarjeta es un atajo para descubrir. Antes del envío, confirma el anuncio activo, las opciones, el precio y las fotos del almacén.",
    browseCategory: "Abrir categoría ↗",
    method: "Método",
    methodTitle: "Primero los hechos. Después el consejo.",
    methodText: "Los pasos y políticas se contrastan con las páginas publicadas por PikoBuy. La orientación práctica se distingue sin inventar tarifas, plazos ni garantías de calidad.",
    about: [
      { title: "Qué publicamos", text: "Publicamos rutas de productos, índices de categorías, listas QC, explicaciones de envío y guías para principiantes. Los enlaces abren el catálogo externo completo." },
      { title: "Cómo comprobamos los hechos", text: "Las afirmaciones se contrastan con las páginas oficiales de PikoBuy sobre la empresa, guía, estimación, envío y devoluciones. Las tarifas variables no se presentan como permanentes." },
      { title: "Qué no demuestra un anuncio", text: "La inclusión no garantiza autenticidad, stock, vendedor, materiales, durabilidad ni ajuste. Las fotos ayudan con lo visible, pero no demuestran todas las cualidades." },
    ],
    lastReview: "Última revisión del método",
    reviewed: "Revisado el 29/07/2026",
    guideEyebrow: "Guía PikoBuy",
    articleEyebrow: "Artículo de investigación PikoBuy",
    notFoundEyebrow: "Página no encontrada",
    notFoundTitle: "Esta ruta de investigación se ha movido.",
    notFoundText: "Vuelve al índice de productos o elige una guía actual.",
    browseFinds: "Ver productos",
    readGuides: "Leer guías →",
  },
  it: {
    researchRule: "Regola di ricerca",
    researchRuleText: "Una scheda è una scorciatoia di scoperta. Prima della spedizione verifica annuncio attivo, opzioni, prezzo e foto del magazzino.",
    browseCategory: "Apri categoria ↗",
    method: "Metodo",
    methodTitle: "Prima i fatti. Poi i consigli.",
    methodText: "Passaggi e politiche sono verificati sulle pagine pubblicate da PikoBuy. I consigli pratici sono distinti senza inventare tariffe, tempi o garanzie.",
    about: [
      { title: "Cosa pubblichiamo", text: "Pubblichiamo percorsi prodotto, categorie, checklist QC, spiegazioni sulla spedizione e guide per principianti. I link aprono il catalogo esterno completo." },
      { title: "Come verifichiamo i fatti", text: "Le affermazioni sono confrontate con le pagine ufficiali PikoBuy: informazioni, guida, stima, politica di spedizione e resi. Le tariffe variabili non sono presentate come permanenti." },
      { title: "Cosa non dimostra una scheda", text: "L’inclusione non garantisce autenticità, stock, venditore, materiali, durata o vestibilità. Le foto aiutano con i dettagli visibili ma non provano ogni qualità." },
    ],
    lastReview: "Ultima revisione del metodo",
    reviewed: "Revisionato il 29/07/2026",
    guideEyebrow: "Guida PikoBuy",
    articleEyebrow: "Articolo di ricerca PikoBuy",
    notFoundEyebrow: "Pagina non trovata",
    notFoundTitle: "Questo percorso di ricerca è stato spostato.",
    notFoundText: "Torna all’indice prodotti o scegli una guida aggiornata.",
    browseFinds: "Sfoglia i prodotti",
    readGuides: "Leggi le guide →",
  },
  pl: {
    researchRule: "Zasada researchu",
    researchRuleText: "Karta produktu skraca drogę do odkrycia. Przed wysyłką sprawdź aktywną ofertę, opcje, cenę i zdjęcia magazynowe.",
    browseCategory: "Otwórz kategorię ↗",
    method: "Metoda",
    methodTitle: "Najpierw fakty, potem porada.",
    methodText: "Proces i zasady są sprawdzane na opublikowanych stronach PikoBuy. Praktyczne wskazówki są oznaczone, bez wymyślonych opłat, terminów i gwarancji jakości.",
    about: [
      { title: "Co publikujemy", text: "Publikujemy uporządkowane ścieżki produktów, kategorie, checklisty QC, objaśnienia wysyłki i poradniki. Linki otwierają pełny zewnętrzny katalog." },
      { title: "Jak sprawdzamy fakty", text: "Twierdzenia porównujemy z oficjalnymi stronami PikoBuy: informacje, poradnik, kalkulator, wysyłka i zwroty. Zmiennych opłat nie przedstawiamy jako stałych." },
      { title: "Czego oferta nie potwierdza", text: "Obecność nie gwarantuje autentyczności, stanu magazynu, sprzedawcy, materiału, trwałości ani dopasowania. Zdjęcia pokazują tylko widoczne cechy." },
    ],
    lastReview: "Ostatnia kontrola metodologii",
    reviewed: "Sprawdzono 29.07.2026",
    guideEyebrow: "Poradnik PikoBuy",
    articleEyebrow: "Artykuł badawczy PikoBuy",
    notFoundEyebrow: "Nie znaleziono strony",
    notFoundTitle: "Ta ścieżka researchu została przeniesiona.",
    notFoundText: "Wróć do indeksu produktów lub wybierz aktualny poradnik.",
    browseFinds: "Przeglądaj produkty",
    readGuides: "Czytaj poradniki →",
  },
  pt: {
    researchRule: "Regra de pesquisa",
    researchRuleText: "Um cartão é um atalho para descoberta. Antes do envio, confirme anúncio ativo, opções, preço e fotos do armazém.",
    browseCategory: "Abrir categoria ↗",
    method: "Método",
    methodTitle: "Primeiro os fatos. Depois a orientação.",
    methodText: "Etapas e políticas são verificadas nas páginas publicadas pelo PikoBuy. A orientação prática é identificada, sem inventar tarifas, prazos ou garantias.",
    about: [
      { title: "O que publicamos", text: "Publicamos caminhos de produtos, categorias, checklists QC, explicações de envio e guias para iniciantes. Os links abrem o catálogo externo completo." },
      { title: "Como os fatos são verificados", text: "As afirmações são comparadas às páginas oficiais do PikoBuy sobre empresa, guia, estimativa, envio e devoluções. Tarifas variáveis não são tratadas como permanentes." },
      { title: "O que um anúncio não comprova", text: "A inclusão não garante autenticidade, estoque, vendedor, materiais, durabilidade ou ajuste. Fotos ajudam na inspeção visível, mas não comprovam toda qualidade." },
    ],
    lastReview: "Última revisão da metodologia",
    reviewed: "Revisado em 29/07/2026",
    guideEyebrow: "Guia PikoBuy",
    articleEyebrow: "Artigo de pesquisa PikoBuy",
    notFoundEyebrow: "Página não encontrada",
    notFoundTitle: "Este caminho de pesquisa foi movido.",
    notFoundText: "Volte ao índice de produtos ou escolha um guia atual.",
    browseFinds: "Ver produtos",
    readGuides: "Ler guias →",
  },
};

const pageMeta: Record<string, { title: string; description: string }> = {
  home: {
    title: "PikoBuy Spreadsheet 2026 | Finds, QC & Shipping Guides",
    description:
      "Browse organised PikoBuy spreadsheet finds and independent guides to QC photos, ordering and international parcel planning.",
  },
  finds: {
    title: "PikoBuy Finds 2026",
    description:
      "Browse PikoBuy spreadsheet product finds with direct category and product-detail paths.",
  },
  categories: {
    title: "PikoBuy Spreadsheet Categories",
    description:
      "Browse shoes, hoodies, T-shirts, jackets, headwear and accessories from an organised PikoBuy finds index.",
  },
  guides: {
    title: "PikoBuy Guides: Ordering, QC and Shipping",
    description:
      "Independent, evidence-based guides to the PikoBuy order process, QC photos and shipping-cost variables.",
  },
  faq: {
    title: "PikoBuy Spreadsheet FAQ",
    description:
      "Answers about PikoBuy spreadsheets, warehouse photos, shipping estimates, returns and product research.",
  },
  articles: {
    title: "PikoBuy Spreadsheet Articles",
    description:
      "Original research notes on PikoBuy product finds, QC review routines and parcel planning.",
  },
  about: {
    title: "About This PikoBuy Spreadsheet",
    description:
      "Learn how this independent PikoBuy product research site selects, checks and explains listings.",
  },
};

const guideContent: Record<
  string,
  {
    title: string;
    deck: string;
    fact: string;
    sections: { title: string; paragraphs: string[]; bullets?: string[] }[];
  }
> = {
  "how-to-use-pikobuy": {
    title: "How to Use PikoBuy: The Six-Step Order Process",
    deck:
      "PikoBuy’s published beginner guide divides an order into six stages. This guide turns those stages into a practical checklist, with extra attention on the decisions that are still yours to make.",
    fact:
      "Source basis: PikoBuy’s official Beginner’s Guide, About page and Shipping Cost Estimation page, reviewed July 29, 2026.",
    sections: [
      {
        title: "1. Begin with a listing you can actually evaluate",
        paragraphs: [
          "The official process starts with choosing a product from Taobao, Tmall, 1688, Weidian or Yupoo. Before you paste anything into an agent search box, slow down long enough to record the seller, option names, size chart and listing photos. A link alone is fragile: sellers change options, remove photos and sometimes replace the item behind a familiar listing.",
          "Treat your shortlist like a research note. Save the exact colour and size, capture the current price and identify any detail that would make the item unacceptable. This gives you something concrete to compare with the warehouse photos later.",
        ],
        bullets: [
          "Confirm that the option names match the listing images.",
          "Keep the seller or store name with the product link.",
          "Translate and save the size chart before ordering.",
          "Do not treat a catalogue card as proof that stock is available.",
        ],
      },
      {
        title: "2. Search by keyword or paste the original link",
        paragraphs: [
          "PikoBuy says users can paste a product link or search by keyword. Pasting the original listing is usually the clearer path because it preserves the seller and option context. Keyword search is useful for discovery, but it can return visually similar products from different sellers or batches.",
          "When the imported page appears, compare it with the source. Check the displayed price, domestic shipping, colour, size and quantity. If a listing needs a manual note, make it specific and observable—for example, “black, size L, white embroidery”—instead of asking an agent to choose what looks best.",
        ],
      },
      {
        title: "3. Understand the first payment",
        paragraphs: [
          "The third official stage is selecting options, submitting the order and completing the first payment. This is the product-side payment, not the final cost of getting the parcel to your country. International shipping comes later, after warehouse arrival and parcel submission.",
          "That distinction matters when comparing products. A low item price can be offset by domestic shipping, bulky packaging or a heavy material. Keep room in your budget for the second payment rather than treating the listing price as your delivered cost.",
        ],
      },
      {
        title: "4. Use the warehouse stage as a decision point",
        paragraphs: [
          "PikoBuy’s beginner guide says the warehouse will inspect the item, check it in, take photos and look for defects. Those photos are not a ceremonial step. They are your best opportunity to compare the received item with the details you saved before purchase.",
          "Review the obvious first: correct item, colour, size and quantity. Then move to category-specific points such as shoe shape, print alignment, bag hardware or garment measurements. If the standard photos do not show the detail that decides whether you will keep the item, request a useful close-up rather than collecting random extra images.",
        ],
      },
      {
        title: "5. Compare shipping with complete parcel information",
        paragraphs: [
          "PikoBuy’s fifth stage is choosing a logistics route, submitting the parcel and paying international shipping. The official estimator asks for destination, product type, weight and three dimensions. That tells you why a single rate-per-kilogram screenshot is not enough to predict the final amount.",
          "Compare the routes shown for the actual parcel. Look at delivery expectations, billing method, item restrictions and available protection. Packaging changes can reduce or increase the measured size, so decide on box removal or reinforcement before treating an estimate as final.",
        ],
      },
      {
        title: "6. Track without overreacting to quiet periods",
        paragraphs: [
          "PikoBuy’s guide says logistics information may become available within three days after shipment. Cross-border tracking often moves in stages: warehouse dispatch, carrier acceptance, export processing, destination customs and local delivery. A short quiet period does not automatically mean the parcel is lost.",
          "Keep the parcel number and route name together. If a promised tracking window passes, ask about the most recent carrier scan rather than relying only on a third-party tracking label. The order is complete when the condition of the delivered parcel matches what you approved at the warehouse.",
        ],
      },
    ],
  },
  "pikobuy-qc-checklist": {
    title: "PikoBuy QC Photos: What to Check Before Shipping",
    deck:
      "Warehouse photos are most useful when you know what evidence you need. This checklist helps you move from a quick glance to a repeatable product review.",
    fact:
      "PikoBuy states that items are inspected and photographed at the warehouse. Its shipping policy also notes that additional detailed photos may be purchased when needed.",
    sections: [
      {
        title: "Start with identity, not tiny details",
        paragraphs: [
          "The first question is whether the warehouse received the product you ordered. Compare the product type, colour, size label, quantity and visible option details. A perfect close-up is irrelevant if the wrong variant arrived.",
          "Keep the source listing open beside the warehouse set. Look for differences in shape, panel layout, print placement, colour blocking and included accessories. Lighting can shift colour, so use multiple photos before deciding that a shade is wrong.",
        ],
        bullets: [
          "Correct product, colour, size and quantity",
          "No obvious damage from domestic transport",
          "Option details match the submitted order",
          "Included parts and accessories are present",
        ],
      },
      {
        title: "Shoes: structure, pair consistency and labels",
        paragraphs: [
          "For shoes, compare the left and right shoe rather than inspecting only the better-looking side. Check toe shape, heel height, outsole alignment, stitching paths and the spacing of panels. Ask for a label photo when sizing is important, and request an insole or outsole measurement when the listing chart is unclear.",
          "Small glue marks may be cosmetic, but separated soles, deep creases, major asymmetry or conflicting size labels deserve attention before shipping. Photos cannot prove comfort or materials, so avoid writing certainty into your conclusion.",
        ],
      },
      {
        title: "Clothing: measurements beat size letters",
        paragraphs: [
          "A warehouse photo of an L label does not tell you whether the garment fits like the L you own. Compare chest width, length, shoulders and sleeves with a garment that fits you. Flat measurements are more useful than a generic promise that an item is true to size.",
          "Then inspect visible construction: print centring, embroidery, pocket alignment, zipper path, loose threads and stains. Wrinkles from packing are different from damage; focus on issues that will remain after the garment is unpacked.",
        ],
      },
      {
        title: "Bags and accessories: hardware, symmetry and finish",
        paragraphs: [
          "For bags, check the front and back shape, handle alignment, strap attachment, edge paint, hardware colour and closure. Ask for the bag to be opened if the interior or included strap matters. For hats, look at the crown shape, embroidery and the inside label. For small accessories, confirm scale with a ruler when listing dimensions are vague.",
          "Reflective metal and coated surfaces can look different under warehouse lights. Use close-ups to identify scratches, missing coating or uneven finishing, but do not confuse reflections with defects.",
        ],
      },
      {
        title: "Know the limits of a photo review",
        paragraphs: [
          "QC photos can reveal visible condition at a moment in time. They cannot reliably prove fibre content, odour, waterproofing, electronics performance, comfort or long-term durability. PikoBuy’s shipping policy also says specialised products may not receive professional inspection.",
          "Write your decision in measured language: “no visible stain in the provided photos” is more accurate than “perfect quality.” This protects you from turning limited evidence into a promise the images cannot support.",
        ],
      },
    ],
  },
  "pikobuy-shipping-cost": {
    title: "PikoBuy Shipping Cost: Weight, Size and Route Variables",
    deck:
      "International shipping is a parcel calculation, not a single product price. Learn what to collect before comparing routes or estimating your delivered cost.",
    fact:
      "PikoBuy’s official estimator asks for destination country or region, product type, weight, length, width and height.",
    sections: [
      {
        title: "Why weight alone is not enough",
        paragraphs: [
          "The official estimator’s three dimension fields are the clue: a parcel can be light and still occupy a large amount of cargo space. Carriers may use actual weight, volumetric weight or another billing rule depending on the route. That is why a puffer jacket, shoebox or rigid package can cost more than a simple item-weight comparison suggests.",
          "Use packed measurements whenever possible. Seller estimates or product-page dimensions are only early planning figures because the warehouse can consolidate items, remove packaging or add protection before the final parcel is measured.",
        ],
      },
      {
        title: "Product type changes the available routes",
        paragraphs: [
          "PikoBuy asks for product type before presenting an estimate. Batteries, liquids, cosmetics, food and other restricted categories can reduce the route list or require different handling. Do not copy a shipping quote from an ordinary clothing parcel and assume it applies to electronics or sensitive goods.",
          "When a parcel mixes categories, the most restrictive item may affect the whole shipment. Separating items can create more route choices, but it also creates another parcel charge. Compare both structures with the live estimator rather than assuming one is automatically cheaper.",
        ],
      },
      {
        title: "Destination and route are separate decisions",
        paragraphs: [
          "A destination country tells the system where the parcel is going; the route tells you how it will move. Routes can differ in timing, billing method, restrictions and handling. The lowest displayed price is not always the best fit if it excludes the item type or offers less predictable tracking.",
          "Look at the route details presented during parcel submission. Cross-border conditions, customs rules and carrier capacity can change, so a guide should explain the variables instead of publishing a permanent “cheapest route” claim.",
        ],
      },
      {
        title: "Use a three-stage estimate",
        paragraphs: [
          "For an early estimate, add the seller’s product weights and allow room for packing. At warehouse arrival, replace guesses with recorded weights and measurements. At parcel submission, compare the live routes using the final package data. Each stage reduces uncertainty.",
          "Keep product cost, domestic shipping, return costs, international shipping and any optional packaging as separate lines. This makes it easier to see where the budget changed and prevents a low product price from hiding a high delivered cost.",
        ],
        bullets: [
          "Early plan: estimated item weight and likely packaging",
          "Warehouse plan: recorded weight, dimensions and product type",
          "Final decision: live route, restrictions and parcel charge",
        ],
      },
      {
        title: "Packaging choices should solve a specific problem",
        paragraphs: [
          "Removing a retail box may reduce volume, but it can also reduce protection. Reinforcement adds material and may increase measurements, but it can be sensible for fragile or easily crushed items. Choose packaging based on the item’s risk rather than selecting every add-on by habit.",
          "Recalculate after any meaningful packaging change. The goal is not the smallest parcel at any cost; it is a sensible balance between billed size, item protection and the route requirements shown for your destination.",
        ],
      },
    ],
  },
};

const articleContent: Record<
  string,
  {
    title: string;
    deck: string;
    date: string;
    sections: { title: string; paragraphs: string[]; bullets?: string[] }[];
  }
> = {
  "pikobuy-spreadsheet-product-research": {
    title: "PikoBuy Spreadsheet Research: From a Find to a Better Shortlist",
    deck:
      "A spreadsheet makes discovery faster. A research routine makes the result safer, clearer and easier to compare.",
    date: "July 29, 2026",
    sections: [
      {
        title: "A find is a lead, not a recommendation",
        paragraphs: [
          "The useful thing about a PikoBuy spreadsheet is speed. Instead of beginning with an empty search bar, you can move through categories and open products that appear close to what you want. The dangerous thing is the same speed: a clean card can make a raw product link feel more verified than it is.",
          "Use the card to enter the research process, not to skip it. Open the live detail page and look for the seller, option structure, current price, images and product identifier. If the listing changed since it was added to the directory, the live page should control your decision.",
        ],
      },
      {
        title: "Build a shortlist with reasons",
        paragraphs: [
          "A shortlist should explain why each option survived. One shoe might have clearer label photos; another might have better size information; a third might come from a seller whose listing has more consistent options. Writing one sentence beside each candidate makes comparison more honest.",
          "Remove products when the source is dead, the options are ambiguous or the listing cannot support a basic quality check. A larger list is not automatically a better list. Ten vague links create more work than three products with clear differences.",
        ],
        bullets: [
          "Live source still opens and shows the expected item",
          "Option names are clear enough to order correctly",
          "Price and domestic shipping are visible",
          "Size or measurement evidence exists",
          "You know what warehouse detail must be checked",
        ],
      },
      {
        title: "Separate visible evidence from assumptions",
        paragraphs: [
          "Listing images can show design, colour and construction details, but they do not prove the exact item a seller will send. Warehouse photos move you one step closer because they show the received product. Even then, the evidence is limited to the angles, lighting and detail provided.",
          "Keep conclusions narrow. You can reasonably say that a print looks centred in a front photo. You cannot confidently say the fabric will feel premium after months of use. This distinction makes a guide more trustworthy and keeps your own expectations realistic.",
        ],
      },
      {
        title: "Plan QC before the order arrives",
        paragraphs: [
          "The easiest time to decide what matters is before purchase. If fit is critical, save a measurement target. If a shoe shape matters, identify the heel, toe and outsole details you will compare. If a bag’s hardware is important, save a close-up of the expected finish.",
          "When the warehouse set arrives, you now have a checklist instead of a vague feeling. Extra-photo requests can focus on missing evidence rather than repeating views you already have.",
        ],
      },
      {
        title: "Keep shipping in the comparison",
        paragraphs: [
          "Product research often stops at price, but international parcels are shaped by weight, dimensions, category and destination. A low-cost item in bulky packaging may be less attractive once it joins a parcel. PikoBuy’s estimator explicitly asks for weight and three dimensions, so shipping belongs in the shortlist.",
          "You do not need a perfect delivered-cost forecast on day one. You do need to notice large differences: shoeboxes, heavy outerwear, rigid cases and sensitive product types can change the route or volume. Mark those differences before you buy.",
        ],
      },
      {
        title: "A better spreadsheet is transparent",
        paragraphs: [
          "Useful directories show where a product link goes, when information was reviewed and what the user still needs to verify. They avoid labels that imply quality certification without evidence. They also make it easy to leave the directory and inspect the full listing.",
          "The goal is not to make every find look good. It is to help a shopper reject weak options early, compare the survivors and arrive at the warehouse stage with specific questions.",
        ],
      },
    ],
  },
  "warehouse-photos-before-shipping": {
    title: "Warehouse Photos Before Shipping: A Calm, Useful Review Routine",
    deck:
      "Warehouse photos are time-sensitive evidence. Review them in a consistent order so obvious problems do not hide behind tiny details.",
    date: "July 27, 2026",
    sections: [
      {
        title: "Open the original order beside the photos",
        paragraphs: [
          "Begin with the submitted options, not with a social-media checklist. Confirm the product, seller, colour, size and quantity you paid for. Then compare the warehouse set with the source images and the measurement notes you saved.",
          "This catches the most important mistakes first. A wrong colour or size matters more than a slightly uneven thread. If the basic identity is wrong, document it before spending time on cosmetic details.",
        ],
      },
      {
        title: "Move from wide views to close details",
        paragraphs: [
          "Use the front and back views to judge overall shape, symmetry and obvious damage. Then move to labels, prints, embroidery, hardware and measurements. This order prevents a sharp close-up from distracting you from a structural mismatch.",
          "Lighting, compression and camera angle can change how colour or proportion appears. Compare several images and look for consistent evidence. If one angle creates doubt, request a view that answers the question directly.",
        ],
      },
      {
        title: "Write a precise extra-photo request",
        paragraphs: [
          "“More photos please” is not a useful instruction. Name the location, angle and evidence you need: outsole length beside a ruler, close-up of the left sleeve print, inside size label, opened bag interior or both heels photographed together.",
          "A precise request helps the warehouse create a photo you can act on. It also makes it easier to explain a return concern while the eligible window is still open.",
        ],
        bullets: [
          "Name the exact part of the item",
          "Describe the angle or measurement",
          "State the comparison you are trying to make",
          "Avoid asking staff for subjective quality verdicts",
        ],
      },
      {
        title: "Distinguish damage from presentation",
        paragraphs: [
          "Garments can arrive wrinkled, shoes may be stuffed unevenly and soft bags can lose shape in domestic shipping. These issues may be reversible. Stains, cuts, missing hardware, sole separation, deep scratches and wrong options deserve more attention.",
          "Use neutral notes. Instead of saying “terrible quality,” record “visible dark mark near the right cuff in photo three.” Specific language is easier to verify and more useful if the seller must be contacted.",
        ],
      },
      {
        title: "Decide while return options are still relevant",
        paragraphs: [
          "PikoBuy’s published policy describes eligibility rules and a five-day warehouse request period for qualifying returns. Not every product or seller participates, and condition requirements matter. That makes prompt photo review important.",
          "If the item is clearly wrong or damaged, check the live order’s return controls and seller rules immediately. Do not assume that a warehouse stay pauses every deadline.",
        ],
      },
      {
        title: "Approve only what the photos support",
        paragraphs: [
          "A clean photo set can support a decision to ship, but it is not a laboratory test or wear trial. You still do not know the exact feel, long-term durability or fit on your body. Approve because the visible evidence meets your defined threshold, not because the images prove perfection.",
          "Save the reviewed set with your order reference. If the delivered item arrives in a different condition, you have a clearer record of what was visible before dispatch.",
        ],
      },
    ],
  },
  "estimate-pikobuy-parcel-cost": {
    title: "How to Estimate a PikoBuy Parcel Before You Commit",
    deck:
      "A useful estimate shows its assumptions. Here is a practical way to plan product, package and route costs without pretending the first number is final.",
    date: "July 25, 2026",
    sections: [
      {
        title: "Start with the official estimator’s fields",
        paragraphs: [
          "PikoBuy’s shipping-cost page asks for destination country or region, product type, weight, length, width and height. Those six inputs are a better planning framework than a screenshot of someone else’s parcel price.",
          "Collect them as early as you reasonably can. Before warehouse arrival, use seller weights and package-size clues as estimates. After arrival, replace assumptions with the recorded warehouse data.",
        ],
      },
      {
        title: "Keep product weight and packed size separate",
        paragraphs: [
          "A product weight describes the item. A shipping measurement describes the parcel. Boxes, protective material and empty space create the difference. Rigid retail packaging can push the billed size upward even when the item itself is light.",
          "Label each number clearly so you do not compare an unpacked product weight with somebody else’s final parcel weight. When possible, estimate a range rather than a single precise figure.",
        ],
      },
      {
        title: "Model packaging choices",
        paragraphs: [
          "Box removal may lower volume for some items. Reinforcement can improve protection but may add size and weight. Shoe trees, retail cartons and hard cases can change the result more than small apparel packaging.",
          "Create two simple scenarios: protective packaging retained and nonessential packaging removed. Compare both only if the warehouse can provide meaningful measurements. Do not remove protection from an item that cannot tolerate compression just to chase a smaller number.",
        ],
      },
      {
        title: "Check whether one item controls the route",
        paragraphs: [
          "A parcel containing ordinary clothing may have several route options. Adding a battery, liquid or other restricted product can change the available list. Product type is present in PikoBuy’s estimator for a reason.",
          "If the mixed parcel becomes expensive or limited, compare a split shipment. Include the extra parcel charge and packaging in the comparison; two parcels are not automatically cheaper simply because each has more route choices.",
        ],
      },
      {
        title: "Budget in layers",
        paragraphs: [
          "Keep item price, Chinese domestic shipping, optional services, return cost and international shipping on separate lines. This shows whether the budget changed because of the product, the seller, the warehouse decision or the carrier route.",
          "Add a buffer for a planning estimate, but do not publish the buffer as a PikoBuy fee. It is your uncertainty allowance, not an official charge.",
        ],
        bullets: [
          "Product-side payment",
          "Domestic seller-to-warehouse shipping",
          "Optional photos or packaging",
          "International parcel charge",
          "Personal uncertainty buffer",
        ],
      },
      {
        title: "Use the live parcel quote as the decision point",
        paragraphs: [
          "A pre-purchase estimate is a filter: it helps you avoid combinations that are obviously too heavy, bulky or restricted. The live parcel quote is the point where you compare available routes using actual data.",
          "Read the route details that apply at submission. Cross-border availability and prices can change. A responsible guide explains how to compare the current options instead of promising a permanent cheapest route.",
        ],
      },
    ],
  },
};

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const locale: Locale = isLocale(rawSlug[0]) ? rawSlug[0] : "en";
  const slug = isLocale(rawSlug[0]) ? rawSlug.slice(1) : rawSlug;
  const root = slug[0] ?? "";
  const detail = slug[1];
  const canonicalRoot =
    (root === "articles" && !detail) || root === "seo-articles"
      ? "seo-articles"
      : root;
  const path = [canonicalRoot, ...slug.slice(1)].filter(Boolean).join("/");
  const canonicalPath = localizePath(locale, path ? `/${path}` : "/");
  const guideSource =
    root === "guides" ? researchedGuideContent[detail] : undefined;
  const articleSource =
    root === "articles" ? researchedArticleContent[detail] : undefined;
  const guide = guideSource
    ? getLocalizedLongform(locale, detail, guideSource)
    : undefined;
  const article = articleSource
    ? getLocalizedLongform(locale, detail, articleSource)
    : undefined;
  const localizedPageMeta: Record<string, { title: string; description: string }> = {
    home: {
      title: `${t(locale, "home.heroTop")} ${t(locale, "home.heroAccent")} ${t(locale, "home.heroBottom")}`,
      description: t(locale, "home.heroText"),
    },
    finds: {
      title: t(locale, "page.findsTitle"),
      description: t(locale, "page.findsDescription"),
    },
    categories: {
      title: t(locale, "page.categoriesTitle"),
      description: t(locale, "page.categoriesDescription"),
    },
    guides: {
      title: t(locale, "page.guidesTitle"),
      description: t(locale, "page.guidesDescription"),
    },
    faq: {
      title: t(locale, "page.faqTitle"),
      description: t(locale, "page.faqDescription"),
    },
    articles: {
      title: t(locale, "page.articlesTitle"),
      description: t(locale, "page.articlesDescription"),
    },
    about: {
      title: t(locale, "page.aboutTitle"),
      description: t(locale, "page.aboutDescription"),
    },
  };
  const meta = guide
    ? { title: guide.title, description: guide.deck }
    : article
      ? { title: article.title, description: article.deck }
      : root === "seo-articles"
        ? localizedPageMeta.articles
        : localizedPageMeta[root] ?? localizedPageMeta.home;
  const alternateEntries = Object.fromEntries(
    localeOptions.map((option) => [
      option.code,
      localizePath(option.code, path ? `/${path}` : "/"),
    ]),
  );

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: canonicalPath,
      languages: alternateEntries,
    },
  };
}

function PageIntro({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="inner-hero">
      <span className="kicker">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{description}</p>
      {children}
    </section>
  );
}

function FindsPage({ locale }: { locale: Locale }) {
  const copy = getSiteData(locale);
  return (
    <PageShell className="inner-main" locale={locale} currentPath="/finds">
      <PageIntro
        eyebrow={t(locale, "page.findsEyebrow")}
        title={t(locale, "page.findsTitle")}
        description={t(locale, "page.findsDescription")}
      >
        <SearchBox locale={locale} />
      </PageIntro>
      <section className="inner-section">
        <div className="filter-row">
          {categories.map((category, index) => (
            <a href={category.href} target="_blank" rel="noreferrer" key={category.slug}>
              {copy.categories[index].name} ↗
            </a>
          ))}
        </div>
        <ProductGrid locale={locale} />
      </section>
      <section className="source-note">
        <strong>{pageUi[locale].researchRule}</strong>
        <p>{pageUi[locale].researchRuleText}</p>
      </section>
    </PageShell>
  );
}

function CategoriesPage({ locale }: { locale: Locale }) {
  const copy = getSiteData(locale);
  return (
    <PageShell className="inner-main" locale={locale} currentPath="/categories">
      <PageIntro
        eyebrow={t(locale, "page.categoriesEyebrow")}
        title={t(locale, "page.categoriesTitle")}
        description={t(locale, "page.categoriesDescription")}
      />
      <section className="inner-section category-directory">
        {categories.map((category, index) => (
          <a href={category.href} target="_blank" rel="noreferrer" key={category.slug}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h2>{copy.categories[index].name}</h2>
              <p>{copy.categories[index].countLabel}</p>
            </div>
            <b>{pageUi[locale].browseCategory}</b>
          </a>
        ))}
      </section>
    </PageShell>
  );
}

function GuidesPage({ locale }: { locale: Locale }) {
  return (
    <PageShell className="inner-main" locale={locale} currentPath="/guides">
      <PageIntro
        eyebrow={t(locale, "page.guidesEyebrow")}
        title={t(locale, "page.guidesTitle")}
        description={t(locale, "page.guidesDescription")}
      />
      <section className="inner-section">
        <GuideCards locale={locale} />
        <div className="method-panel">
          <span>{pageUi[locale].method}</span>
          <h2>{pageUi[locale].methodTitle}</h2>
          <p>{pageUi[locale].methodText}</p>
        </div>
      </section>
    </PageShell>
  );
}

function FAQPage({ locale }: { locale: Locale }) {
  const localizedFaq = getSiteData(locale).faq;
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: localizedFaq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <PageShell className="inner-main" locale={locale} currentPath="/faq">
      <PageIntro
        eyebrow={t(locale, "page.faqEyebrow")}
        title={t(locale, "page.faqTitle")}
        description={t(locale, "page.faqDescription")}
      />
      <section className="inner-section narrow-section">
        <FAQList locale={locale} />
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </PageShell>
  );
}

function ArticlesPage({ locale }: { locale: Locale }) {
  return (
    <PageShell className="inner-main" locale={locale} currentPath="/seo-articles">
      <PageIntro
        eyebrow={t(locale, "page.articlesEyebrow")}
        title={t(locale, "page.articlesTitle")}
        description={t(locale, "page.articlesDescription")}
      />
      <section className="inner-section">
        <ArticleCards locale={locale} />
      </section>
    </PageShell>
  );
}

function AboutPage({ locale }: { locale: Locale }) {
  return (
    <PageShell className="inner-main" locale={locale} currentPath="/about">
      <PageIntro
        eyebrow={t(locale, "page.aboutEyebrow")}
        title={t(locale, "page.aboutTitle")}
        description={t(locale, "page.aboutDescription")}
      />
      <section className="inner-section editorial-body">
        {pageUi[locale].about.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.text}</p>
          </section>
        ))}
        <div className="source-note">
          <strong>{pageUi[locale].lastReview}</strong>
          <p>2026-07-29</p>
        </div>
      </section>
    </PageShell>
  );
}

function LongFormPage({
  eyebrow,
  title,
  deck,
  fact,
  date,
  sections,
  locale,
  currentPath,
}: {
  eyebrow: string;
  title: string;
  deck: string;
  fact?: string;
  date?: string;
  sections: { title: string; paragraphs: string[]; bullets?: string[] }[];
  locale: Locale;
  currentPath: string;
}) {
  const absoluteUrl = (path: string) =>
    new URL(localizePath(locale, path), "https://pikobuy-sheet.net").toString();
  const parsedDate = date ? Date.parse(date) : Number.NaN;
  const publishedDate = Number.isNaN(parsedDate)
    ? "2026-07-29T00:00:00.000Z"
    : new Date(parsedDate).toISOString();
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": date ? "Article" : "HowTo",
    headline: title,
    description: deck,
    datePublished: publishedDate,
    dateModified: "2026-07-29T00:00:00.000Z",
    author: {
      "@type": "Organization",
      name: "PikoBuy Sheet Research Desk",
    },
    publisher: {
      "@type": "Organization",
      name: "PikoBuy Sheet",
    },
    mainEntityOfPage: absoluteUrl(currentPath),
    isAccessibleForFree: true,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "PikoBuy Sheet",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: date ? t(locale, "nav.articles") : t(locale, "nav.guides"),
        item: absoluteUrl(date ? "/seo-articles" : "/guides"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: absoluteUrl(currentPath),
      },
    ],
  };

  return (
    <PageShell
      className="inner-main"
      locale={locale}
      currentPath={currentPath}
    >
      <article className="longform">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
          }}
        />
        <header>
          <span className="kicker">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{deck}</p>
          <div className="article-byline">
            <span>{t(locale, "longform.researchDesk")}</span>
            <span>{date ?? pageUi[locale].reviewed}</span>
          </div>
        </header>
        {fact && <aside className="fact-box">{fact}</aside>}
        <div className="article-layout">
          <aside className="article-toc">
            <strong>{t(locale, "longform.inGuide")}</strong>
            {sections.map((section, index) => (
              <a href={`#section-${index + 1}`} key={section.title}>
                {String(index + 1).padStart(2, "0")} {section.title}
              </a>
            ))}
          </aside>
          <div className="editorial-body">
            {sections.map((section, index) => (
              <section id={`section-${index + 1}`} key={section.title}>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets && (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            <div className="next-step">
              <span>{t(locale, "longform.next")}</span>
              <h2>{t(locale, "longform.nextTitle")}</h2>
              <a href={`${MAIN_SITE}/AllProducts/`} target="_blank" rel="noreferrer">
                {t(locale, "longform.browse")}
              </a>
            </div>
          </div>
        </div>
      </article>
    </PageShell>
  );
}

export default async function CatchAllPage({ params }: { params: Params }) {
  const { slug: rawSlug } = await params;
  const locale: Locale = isLocale(rawSlug[0]) ? rawSlug[0] : "en";
  const slug = isLocale(rawSlug[0]) ? rawSlug.slice(1) : rawSlug;
  const [root, detail] = slug;

  if (!root) return <HomePage locale={locale} />;
  if (root === "finds") return <FindsPage locale={locale} />;
  if (root === "categories") return <CategoriesPage locale={locale} />;
  if (root === "faq") return <FAQPage locale={locale} />;
  if (root === "about") return <AboutPage locale={locale} />;
  if (root === "guides" && detail && researchedGuideContent[detail]) {
    const guide = getLocalizedLongform(
      locale,
      detail,
      researchedGuideContent[detail],
    );
    return (
      <LongFormPage
        eyebrow={pageUi[locale].guideEyebrow}
        title={guide.title}
        deck={guide.deck}
        fact={guide.fact}
        date={guide.date}
        sections={guide.sections}
        locale={locale}
        currentPath={`/guides/${detail}`}
      />
    );
  }
  if (root === "guides") return <GuidesPage locale={locale} />;
  if (root === "articles" && detail && researchedArticleContent[detail]) {
    const article = getLocalizedLongform(
      locale,
      detail,
      researchedArticleContent[detail],
    );
    return (
      <LongFormPage
        eyebrow={pageUi[locale].articleEyebrow}
        title={article.title}
        deck={article.deck}
        fact={article.fact}
        date={article.date}
        sections={article.sections}
        locale={locale}
        currentPath={`/articles/${detail}`}
      />
    );
  }
  if (root === "articles" || root === "seo-articles") {
    return <ArticlesPage locale={locale} />;
  }

  return (
    <PageShell className="inner-main" locale={locale} currentPath={`/${slug.join("/")}`}>
      <PageIntro
        eyebrow={pageUi[locale].notFoundEyebrow}
        title={pageUi[locale].notFoundTitle}
        description={pageUi[locale].notFoundText}
      >
        <div className="hero-actions">
          <Link className="primary-button" href={localizePath(locale, "/finds")}>
            {pageUi[locale].browseFinds}
          </Link>
          <Link className="text-link" href={localizePath(locale, "/guides")}>
            {pageUi[locale].readGuides}
          </Link>
        </div>
      </PageIntro>
    </PageShell>
  );
}
