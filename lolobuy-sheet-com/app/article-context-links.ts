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
    "/articles/how-to-read-qc-photos",
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
