import type { Locale } from "./i18n";

type ContextCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  ariaLabel: string;
  labels: Record<string, string>;
};

const routesByArticle: Record<string, string[]> = {
  "lolobuy-spreadsheet-guide": [
    "/categories/shoes",
    "/products/numeris-high-top-shoes",
    "/guides/qc",
    "/articles/plan-china-shopping-haul",
  ],
  "how-to-read-qc-photos": [
    "/categories/bags",
    "/products/off-white-hoodies",
    "/guides/shipping",
    "/articles/lolobuy-qc-mismatch-evidence-guide",
  ],
  "plan-china-shopping-haul": [
    "/categories/bags",
    "/products/nike-elite-backpack",
    "/guides/shipping",
    "/articles/lolobuy-tracking-not-updating-guide",
  ],
  "lolobuy-review-early-user-experience": [
    "/categories/shoes",
    "/products/hoka-speedgoat-5",
    "/guides/qc",
    "/articles/lolobuy-spreadsheet-guide",
  ],
  "lolobuy-weidian-link-guide": [
    "/categories/shoes",
    "/products/hoka-speedgoat-5",
    "/guides/qc",
    "/articles/lolobuy-spreadsheet-guide",
  ],
  "lolobuy-qc-mismatch-evidence-guide": [
    "/categories/shoes",
    "/products/off-white-hoodies",
    "/guides/qc",
    "/articles/how-to-read-qc-photos",
  ],
  "lolobuy-tracking-not-updating-guide": [
    "/categories/bags",
    "/products/nike-elite-backpack",
    "/guides/shipping",
    "/articles/plan-china-shopping-haul",
  ],
  "lolobuy-shoe-size-guide": [
    "/categories/shoes",
    "/products/numeris-high-top-shoes",
    "/guides/qc",
    "/articles/lolobuy-qc-mismatch-evidence-guide",
  ],
  "lolobuy-keyword-search-product-finds": [
    "/finds",
    "/categories/hoodies-sweaters",
    "/articles/lolobuy-weidian-link-guide",
    "/articles/lolobuy-spreadsheet-guide",
  ],
  "lolobuy-taobao-finds-compare-options": [
    "/finds",
    "/articles/lolobuy-keyword-search-product-finds",
    "/articles/lolobuy-weidian-link-guide",
    "/guides/qc",
  ],
  "lolobuy-1688-finds-moq-variants": [
    "/finds",
    "/articles/lolobuy-keyword-search-product-finds",
    "/articles/lolobuy-spreadsheet-guide",
    "/guides/qc",
  ],
  "lolobuy-seller-page-checklist": [
    "/finds",
    "/articles/lolobuy-keyword-search-product-finds",
    "/articles/lolobuy-taobao-finds-compare-options",
    "/articles/lolobuy-weidian-link-guide",
  ],
  "lolobuy-product-link-not-working": [
    "/finds",
    "/articles/lolobuy-image-search-guide",
    "/articles/lolobuy-weidian-link-guide",
    "/articles/lolobuy-seller-page-checklist",
  ],
  "lolobuy-image-search-guide": [
    "/finds",
    "/articles/lolobuy-product-link-not-working",
    "/articles/lolobuy-keyword-search-product-finds",
    "/articles/lolobuy-seller-page-checklist",
  ],
  "lolobuy-order-status-guide": [
    "/how-it-works",
    "/articles/lolobuy-return-refund-guide",
    "/articles/lolobuy-tracking-not-updating-guide",
    "/guides/shipping",
  ],
  "lolobuy-fees-explained": [
    "/guides/shipping",
    "/articles/lolobuy-payment-guide",
    "/articles/plan-china-shopping-haul",
    "/finds",
  ],
  "lolobuy-payment-guide": [
    "/articles/lolobuy-fees-explained",
    "/articles/lolobuy-order-status-guide",
    "/guides/shipping",
    "/how-it-works",
  ],
  "lolobuy-return-refund-guide": [
    "/articles/how-to-read-qc-photos",
    "/articles/lolobuy-extra-qc-photos-measurements",
    "/articles/lolobuy-qc-mismatch-evidence-guide",
    "/articles/lolobuy-order-status-guide",
  ],
  "lolobuy-extra-qc-photos-measurements": [
    "/guides/qc",
    "/articles/how-to-read-qc-photos",
    "/articles/lolobuy-return-refund-guide",
    "/articles/lolobuy-shoe-size-guide",
  ],
  "lolobuy-restricted-items-shipping-routes": [
    "/guides/shipping",
    "/articles/plan-china-shopping-haul",
    "/articles/lolobuy-fees-explained",
    "/articles/lolobuy-order-status-guide",
  ],
};

const contextCopy: Record<Locale, ContextCopy> = {
  en: {
    eyebrow: "RELATED DECISION PATHS",
    title: "Continue with the evidence that answers the next question.",
    intro:
      "These links sit inside the guide because each one covers a decision that follows directly from this step.",
    ariaLabel: "Related Lolobuy research and product evidence",
    labels: {
      "/finds": "Curated product directory",
      "/categories/shoes": "Shoes size and QC guide",
      "/categories/bags": "Bags measurement and shipping guide",
      "/categories/hoodies-sweaters": "Hoodies measurement and QC guide",
      "/guides/qc": "Warehouse QC checklist",
      "/guides/shipping": "Packed-parcel shipping guide",
      "/how-it-works": "Four-stage buying workflow",
      "/about": "Editorial method and fact policy",
      "/products/off-white-hoodies": "Off-White hoodie evidence page",
      "/products/hoka-speedgoat-5": "HOKA Speedgoat 5 evidence page",
      "/products/numeris-high-top-shoes":
        "Numeris high-top shoe evidence page",
      "/products/nike-elite-backpack":
        "Nike Elite backpack evidence page",
      "/articles/plan-china-shopping-haul":
        "Haul planning and shipping article",
      "/articles/how-to-read-qc-photos": "How to read QC photos",
      "/articles/lolobuy-spreadsheet-guide":
        "Spreadsheet verification guide",
      "/articles/lolobuy-qc-mismatch-evidence-guide":
        "QC mismatch evidence guide",
      "/articles/lolobuy-tracking-not-updating-guide":
        "Tracking delay last-scan checklist",
      "/articles/lolobuy-weidian-link-guide":
        "Product-link and variant verification",
      "/articles/lolobuy-keyword-search-product-finds":
        "Keyword search and shortlist workflow",
      "/articles/lolobuy-product-link-not-working":
        "Broken product-link recovery guide",
      "/articles/lolobuy-image-search-guide":
        "Product discovery from an image",
      "/articles/lolobuy-order-status-guide":
        "Order and parcel status guide",
      "/articles/lolobuy-fees-explained":
        "Product-to-parcel cost breakdown",
      "/articles/lolobuy-payment-guide":
        "Product and parcel payment guide",
      "/articles/lolobuy-return-refund-guide":
        "Return and refund evidence guide",
      "/articles/lolobuy-extra-qc-photos-measurements":
        "Extra QC photo and measurement requests",
      "/articles/lolobuy-restricted-items-shipping-routes":
        "Restricted-item route checklist",
    },
  },
  es: {
    eyebrow: "RUTAS DE DECISIÓN RELACIONADAS",
    title: "Continúa con la prueba que responde a la siguiente pregunta.",
    intro:
      "Estos enlaces están dentro de la guía porque cubren decisiones que siguen directamente a este paso.",
    ariaLabel: "Investigación y pruebas de producto relacionadas con Lolobuy",
    labels: {
      "/finds": "Directorio de productos seleccionados",
      "/categories/shoes": "Guía de talla y QC para calzado",
      "/categories/bags": "Guía de medidas y envío para bolsos",
      "/categories/hoodies-sweaters": "Guía de medidas y QC para sudaderas",
      "/guides/qc": "Lista QC de almacén",
      "/guides/shipping": "Guía de envío del paquete preparado",
      "/how-it-works": "Flujo de compra en cuatro etapas",
      "/about": "Método editorial y política de datos",
      "/products/off-white-hoodies": "Pruebas de la sudadera Off-White",
      "/products/hoka-speedgoat-5": "Pruebas de HOKA Speedgoat 5",
      "/products/numeris-high-top-shoes":
        "Pruebas de las zapatillas altas Numeris",
      "/products/nike-elite-backpack":
        "Pruebas de la mochila Nike Elite",
      "/articles/plan-china-shopping-haul":
        "Artículo sobre haul y planificación del envío",
      "/articles/how-to-read-qc-photos": "Cómo leer fotos QC",
      "/articles/lolobuy-spreadsheet-guide":
        "Guía para verificar el spreadsheet",
      "/articles/lolobuy-qc-mismatch-evidence-guide":
        "Guía de pruebas para diferencias QC",
      "/articles/lolobuy-tracking-not-updating-guide":
        "Checklist del último escaneo de tracking",
      "/articles/lolobuy-weidian-link-guide":
        "Verificación de enlaces y variantes",
      "/articles/lolobuy-keyword-search-product-finds":
        "Búsqueda por palabras y lista corta",
    },
  },
  de: {
    eyebrow: "PASSENDE ENTSCHEIDUNGSWEGE",
    title: "Mit den Belegen für die nächste Frage fortfahren.",
    intro:
      "Diese Links stehen im Leitfaden, weil jede Seite eine Entscheidung abdeckt, die direkt aus diesem Schritt folgt.",
    ariaLabel: "Verwandte Lolobuy-Recherche und Produktbelege",
    labels: {
      "/finds": "Kuratiertes Produktverzeichnis",
      "/categories/shoes": "Schuhgrößen- und QC-Ratgeber",
      "/categories/bags": "Taschenmaß- und Versandratgeber",
      "/categories/hoodies-sweaters": "Hoodie-Maß- und QC-Ratgeber",
      "/guides/qc": "Lager-QC-Checkliste",
      "/guides/shipping": "Versandratgeber für das gepackte Paket",
      "/how-it-works": "Vierstufiger Bestellablauf",
      "/about": "Redaktionelle Methode und Faktenregeln",
      "/products/off-white-hoodies": "Belegseite zum Off-White-Hoodie",
      "/products/hoka-speedgoat-5": "Belegseite zum HOKA Speedgoat 5",
      "/products/numeris-high-top-shoes":
        "Belegseite zu den Numeris High-Top-Schuhen",
      "/products/nike-elite-backpack":
        "Belegseite zum Nike Elite-Rucksack",
      "/articles/plan-china-shopping-haul":
        "Artikel zu Haul- und Versandplanung",
      "/articles/how-to-read-qc-photos": "QC-Fotos richtig lesen",
      "/articles/lolobuy-spreadsheet-guide":
        "Ratgeber zur Spreadsheet-Prüfung",
      "/articles/lolobuy-qc-mismatch-evidence-guide":
        "Belegleitfaden für QC-Abweichungen",
      "/articles/lolobuy-tracking-not-updating-guide":
        "Letzter-Scan-Check für Trackinglücken",
      "/articles/lolobuy-weidian-link-guide":
        "Produktlink- und Variantenprüfung",
      "/articles/lolobuy-keyword-search-product-finds":
        "Keyword-Suche und Auswahlliste",
    },
  },
  fr: {
    eyebrow: "PARCOURS DE DÉCISION ASSOCIÉS",
    title: "Poursuivez avec la preuve qui répond à la question suivante.",
    intro:
      "Ces liens figurent dans le guide parce que chaque page traite une décision qui découle directement de cette étape.",
    ariaLabel: "Recherche et preuves produit associées à Lolobuy",
    labels: {
      "/finds": "Répertoire de produits sélectionnés",
      "/categories/shoes": "Guide taille et QC des chaussures",
      "/categories/bags": "Guide mesures et expédition des sacs",
      "/categories/hoodies-sweaters": "Guide mesures et QC des sweats",
      "/guides/qc": "Checklist QC d’entrepôt",
      "/guides/shipping": "Guide d’expédition du colis préparé",
      "/how-it-works": "Parcours d’achat en quatre étapes",
      "/about": "Méthode éditoriale et politique des faits",
      "/products/off-white-hoodies": "Preuves du sweat Off-White",
      "/products/hoka-speedgoat-5": "Preuves du HOKA Speedgoat 5",
      "/products/numeris-high-top-shoes":
        "Preuves des chaussures montantes Numeris",
      "/products/nike-elite-backpack":
        "Preuves du sac à dos Nike Elite",
      "/articles/plan-china-shopping-haul":
        "Article sur le haul et l’expédition",
      "/articles/how-to-read-qc-photos": "Comment lire les photos QC",
      "/articles/lolobuy-spreadsheet-guide":
        "Guide de vérification du spreadsheet",
      "/articles/lolobuy-qc-mismatch-evidence-guide":
        "Guide de preuves pour un écart QC",
      "/articles/lolobuy-tracking-not-updating-guide":
        "Checklist du dernier scan de suivi",
      "/articles/lolobuy-weidian-link-guide":
        "Vérification du lien et de la variante",
      "/articles/lolobuy-keyword-search-product-finds":
        "Recherche par mots-clés et présélection",
    },
  },
  it: {
    eyebrow: "PERCORSI DECISIONALI COLLEGATI",
    title: "Continua con le prove che rispondono alla domanda successiva.",
    intro:
      "Questi link sono inseriti nella guida perché ogni pagina copre una decisione che segue direttamente questo passaggio.",
    ariaLabel: "Ricerca Lolobuy e prove prodotto correlate",
    labels: {
      "/finds": "Directory dei prodotti selezionati",
      "/categories/shoes": "Guida taglie e QC per le scarpe",
      "/categories/bags": "Guida misure e spedizione per le borse",
      "/categories/hoodies-sweaters": "Guida misure e QC delle felpe",
      "/guides/qc": "Checklist QC di magazzino",
      "/guides/shipping": "Guida alla spedizione del pacco preparato",
      "/how-it-works": "Flusso d’acquisto in quattro fasi",
      "/about": "Metodo editoriale e politica dei fatti",
      "/products/off-white-hoodies": "Prove della felpa Off-White",
      "/products/hoka-speedgoat-5": "Prove della HOKA Speedgoat 5",
      "/products/numeris-high-top-shoes":
        "Prove delle scarpe alte Numeris",
      "/products/nike-elite-backpack":
        "Prove dello zaino Nike Elite",
      "/articles/plan-china-shopping-haul":
        "Articolo su haul e pianificazione della spedizione",
      "/articles/how-to-read-qc-photos": "Come leggere le foto QC",
      "/articles/lolobuy-spreadsheet-guide":
        "Guida alla verifica dello spreadsheet",
      "/articles/lolobuy-qc-mismatch-evidence-guide":
        "Guida alle prove per differenze QC",
      "/articles/lolobuy-tracking-not-updating-guide":
        "Checklist dell'ultima scansione tracking",
      "/articles/lolobuy-weidian-link-guide":
        "Verifica di link e varianti",
      "/articles/lolobuy-keyword-search-product-finds":
        "Ricerca per parole e lista breve",
    },
  },
};

export function getArticleContext(slug: string, locale: Locale) {
  const routes = routesByArticle[slug] ?? routesByArticle["lolobuy-spreadsheet-guide"];
  const copy = contextCopy[locale];

  return {
    ...copy,
    links: routes.map((path) => ({
      path,
      label: copy.labels[path],
    })),
  };
}
