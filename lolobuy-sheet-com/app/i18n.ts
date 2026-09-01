export const localeOptions = [
  { code: "en", label: "English", short: "EN" },
  { code: "es", label: "Español", short: "ES" },
  { code: "de", label: "Deutsch", short: "DE" },
  { code: "fr", label: "Français", short: "FR" },
  { code: "it", label: "Italiano", short: "IT" },
] as const;

export type Locale = (typeof localeOptions)[number]["code"];

export function normalizeLocale(value: string | string[] | null | undefined): Locale {
  const candidate = Array.isArray(value) ? value[0] : value;
  return localeOptions.some((option) => option.code === candidate)
    ? (candidate as Locale)
    : "en";
}

export function stripLocalePrefix(pathname: string) {
  const match = pathname.match(/^\/(en|es|de|fr|it)(?=\/|$)/);
  if (!match) {
    return pathname || "/";
  }

  const stripped = pathname.slice(match[0].length);
  return stripped ? (stripped.startsWith("/") ? stripped : `/${stripped}`) : "/";
}

export function localizedPath(path: string, locale: Locale) {
  if (path.startsWith("http") || path.startsWith("#")) {
    return path;
  }

  const [base, hash] = path.split("#", 2);
  const [pathname, query = ""] = base.split("?", 2);
  const params = new URLSearchParams(query);
  params.delete("lang");

  const cleanPathname = stripLocalePrefix(pathname || "/");
  const localizedPathname =
    locale === "en"
      ? cleanPathname
      : cleanPathname === "/"
        ? `/${locale}/`
        : `/${locale}${cleanPathname}`;
  const queryString = params.toString();
  const localized = queryString
    ? `${localizedPathname}?${queryString}`
    : localizedPathname;

  return hash ? `${localized}#${hash}` : localized;
}

export const headerCopy = {
  en: {
    finds: "Finds",
    categories: "Categories",
    workflow: "How it works",
    qc: "QC guide",
    shipping: "Shipping",
    faq: "FAQ",
    articles: "Articles",
    browse: "Browse all",
    language: "Language",
    menu: "Toggle navigation",
  },
  es: {
    finds: "Hallazgos",
    categories: "Categorías",
    workflow: "Cómo funciona",
    qc: "Guía QC",
    shipping: "Envíos",
    faq: "Preguntas",
    articles: "Artículos",
    browse: "Ver todo",
    language: "Idioma",
    menu: "Abrir navegación",
  },
  de: {
    finds: "Produkte",
    categories: "Kategorien",
    workflow: "So funktioniert’s",
    qc: "QC-Leitfaden",
    shipping: "Versand",
    faq: "FAQ",
    articles: "Artikel",
    browse: "Alle ansehen",
    language: "Sprache",
    menu: "Navigation öffnen",
  },
  fr: {
    finds: "Sélection",
    categories: "Catégories",
    workflow: "Fonctionnement",
    qc: "Guide QC",
    shipping: "Livraison",
    faq: "FAQ",
    articles: "Articles",
    browse: "Tout voir",
    language: "Langue",
    menu: "Ouvrir la navigation",
  },
  it: {
    finds: "Selezione",
    categories: "Categorie",
    workflow: "Come funziona",
    qc: "Guida QC",
    shipping: "Spedizione",
    faq: "FAQ",
    articles: "Articoli",
    browse: "Vedi tutto",
    language: "Lingua",
    menu: "Apri navigazione",
  },
} as const;

export const searchCopy = {
  en: {
    label: "Search the live product directory",
    placeholder: "Search shoes, jackets, bags and more",
    submit: "Search",
  },
  es: {
    label: "Buscar en el directorio de productos",
    placeholder: "Buscar zapatillas, chaquetas, bolsos y más",
    submit: "Buscar",
  },
  de: {
    label: "Im Produktverzeichnis suchen",
    placeholder: "Schuhe, Jacken, Taschen und mehr suchen",
    submit: "Suchen",
  },
  fr: {
    label: "Rechercher dans le catalogue produits",
    placeholder: "Rechercher chaussures, vestes, sacs et plus",
    submit: "Rechercher",
  },
  it: {
    label: "Cerca nel catalogo prodotti",
    placeholder: "Cerca scarpe, giacche, borse e altro",
    submit: "Cerca",
  },
} as const;

export const homeCopy = {
  en: {
    eyebrow: "CURATED SHOPPING DISCOVERY · 2026",
    title: "A smarter Lolobuy spreadsheet.",
    titleAccent: "Check QC. Shop with confidence.",
    intro:
      "Discover product ideas, open current listings, and use fact-checked LoloBuy guides for link ordering, warehouse QC, 90-day storage and parcel planning.",
    explore: "Explore curated finds",
    workflow: "How it works",
    note: "Independent discovery guide · Always verify the live listing",
    curatedOverline: "01 / DISCOVER",
    curatedTitle: "Curated finds",
    filters: {
      all: "All",
      new: "New in",
      trending: "Trending",
      essential: "Essentials",
    },
    viewDirectory: "View the full product directory",
    browseTitle: "Browse by edit",
    browseNote: "Four quick ways into the directory",
    categories: ["Sneakers", "Outerwear", "Bags & Accessories", "Jersey"],
    principles: [
      "Product discovery, not a seller",
      "QC guidance before checkout",
      "Current details checked at destination",
    ],
    storyEyebrow: "A USEFUL SHEET HAS LIMITS",
    storyTitle: "The public process is clear. The changing details still need checking.",
    storyOne:
      "LoloBuy publicly describes link-based purchasing, warehouse inspection, photographs and 90 days of free storage. Its community ordering guide also describes consolidation, route selection and tracking.",
    storyTwo:
      "It does not give this directory permission to invent a permanent shipping price, free-photo count or coupon value. Those details remain live-account checks.",
    storyLink: "See the complete workflow",
    processEyebrow: "FROM LINK TO PARCEL",
    processTitle: "Four checks that keep the stages clear",
    qcLink: "Open QC guide",
    process: [
      ["Find", "Use category shortcuts and plain-language search terms to build a shortlist."],
      ["Confirm", "Check the live price, selected variant, seller details and measurements."],
      ["Inspect", "Compare the warehouse item with the order using focused QC checks."],
      ["Ship", "Choose an eligible route using final dimensions, weight and destination rules."],
    ],
    sourceNote:
      "Lolobuy’s public flow describes warehouse inspection, photographs, consolidation and international shipping, and currently advertises 90 days of free storage. Confirm current terms on the platform.",
    readingEyebrow: "PRACTICAL READING",
    readingTitle: "Fact-checked LoloBuy guides for each buying decision",
    readingLink: "View all articles",
    faqEyebrow: "QUICK ANSWERS",
    faqTitle: "What LoloBuy confirms—and what it does not publish.",
    faqIntro:
      "Fact-checked against the official public homepage, with missing prices, counts and policies labelled instead of guessed.",
    faqLink: "Read all FAQs",
    closingEyebrow: "READY TO BROWSE?",
    closingTitle: "Search the product directory with a clearer plan.",
  },
  es: {
    eyebrow: "DESCUBRIMIENTO DE PRODUCTOS · 2026",
    title: "Una hoja Lolobuy más inteligente.",
    titleAccent: "Revisa el QC. Compra con confianza.",
    intro:
      "Descubre productos, aprende qué revisar en las fotos del almacén y abre la ficha actual antes de hacer un pedido.",
    explore: "Explorar productos",
    workflow: "Cómo funciona",
    note: "Guía independiente · Comprueba siempre la ficha actual",
    curatedOverline: "01 / DESCUBRIR",
    curatedTitle: "Selección de productos",
    filters: {
      all: "Todos",
      new: "Nuevos",
      trending: "Tendencias",
      essential: "Esenciales",
    },
    viewDirectory: "Ver el directorio completo",
    browseTitle: "Explorar por estilo",
    browseNote: "Cuatro accesos rápidos al directorio",
    categories: ["Zapatillas", "Abrigos", "Bolsos y accesorios", "Camisetas deportivas"],
    principles: [
      "Descubrimiento, no venta",
      "Guía QC antes de comprar",
      "Datos actuales en la página de destino",
    ],
    storyEyebrow: "UNA BUENA HOJA TIENE LÍMITES",
    storyTitle: "Primero descubre. Después verifica cada etapa.",
    storyOne:
      "Un directorio ahorra tiempo, pero no puede fijar el precio, el stock o la descripción del vendedor. Por eso cada producto abre su página actual.",
    storyTwo:
      "Separa cuatro decisiones: encontrar, confirmar la ficha, revisar el artículo del almacén y elegir el envío con los datos finales del paquete.",
    storyLink: "Ver el flujo completo",
    processEyebrow: "DEL ENLACE AL PAQUETE",
    processTitle: "Cuatro controles para mantener claras las etapas",
    qcLink: "Abrir guía QC",
    process: [
      ["Buscar", "Usa categorías y palabras sencillas para crear una lista corta."],
      ["Confirmar", "Revisa precio, variante, vendedor y medidas en la ficha actual."],
      ["Inspeccionar", "Compara el artículo recibido con el pedido mediante fotos QC."],
      ["Enviar", "Elige una ruta según medidas, peso y reglas del destino."],
    ],
    sourceNote:
      "El flujo público de Lolobuy describe inspección, fotos, consolidación y envío internacional, y anuncia 90 días de almacenamiento gratuito. Confirma las condiciones actuales.",
    readingEyebrow: "LECTURA PRÁCTICA",
    readingTitle: "Guías para cada decisión de compra",
    readingLink: "Ver todos los artículos",
    faqEyebrow: "RESPUESTAS RÁPIDAS",
    faqTitle: "Lo que LoloBuy confirma y lo que no publica.",
    faqIntro:
      "Verificado con la página pública oficial; los precios, cantidades y políticas no publicadas se señalan sin inventar.",
    faqLink: "Leer todas las preguntas",
    closingEyebrow: "¿LISTO PARA EXPLORAR?",
    closingTitle: "Busca en el directorio con un plan más claro.",
  },
  de: {
    eyebrow: "KURATIERTE PRODUKTSUCHE · 2026",
    title: "Ein besseres Lolobuy Spreadsheet.",
    titleAccent: "QC prüfen. Sicherer auswählen.",
    intro:
      "Entdecke Produkte, erfahre, worauf du bei Lagerfotos achten solltest, und öffne vor der Bestellung die aktuelle Produktseite.",
    explore: "Produkte entdecken",
    workflow: "So funktioniert’s",
    note: "Unabhängiger Ratgeber · Live-Angebot immer prüfen",
    curatedOverline: "01 / ENTDECKEN",
    curatedTitle: "Kuratierte Produkte",
    filters: {
      all: "Alle",
      new: "Neu",
      trending: "Trends",
      essential: "Basics",
    },
    viewDirectory: "Gesamtes Produktverzeichnis öffnen",
    browseTitle: "Nach Auswahl stöbern",
    browseNote: "Vier schnelle Wege ins Verzeichnis",
    categories: ["Sneaker", "Jacken", "Taschen & Accessoires", "Trikots"],
    principles: [
      "Produktsuche, kein Verkäufer",
      "QC-Hilfe vor dem Kauf",
      "Aktuelle Angaben am Ziel prüfen",
    ],
    storyEyebrow: "EIN GUTES SHEET HAT GRENZEN",
    storyTitle: "Erst entdecken. Danach jeden Schritt prüfen.",
    storyOne:
      "Ein Verzeichnis spart Zeit, kann aber Preis, Bestand oder Beschreibung des Verkäufers nicht festhalten. Darum führt jedes Produkt zur aktuellen Zielseite.",
    storyTwo:
      "Trenne vier Entscheidungen: Produkt finden, Live-Angebot bestätigen, Lagerartikel prüfen und Versand anhand des fertigen Pakets wählen.",
    storyLink: "Kompletten Ablauf ansehen",
    processEyebrow: "VOM LINK ZUM PAKET",
    processTitle: "Vier Prüfungen für einen klaren Ablauf",
    qcLink: "QC-Leitfaden öffnen",
    process: [
      ["Finden", "Nutze Kategorien und einfache Suchbegriffe für eine kurze Auswahl."],
      ["Bestätigen", "Prüfe Preis, Variante, Verkäufer und Maße im Live-Angebot."],
      ["Prüfen", "Vergleiche den Lagerartikel anhand gezielter QC-Fotos mit der Bestellung."],
      ["Versenden", "Wähle eine Route nach Endmaßen, Gewicht und Ziellandregeln."],
    ],
    sourceNote:
      "Lolobuys öffentlicher Ablauf beschreibt Lagerprüfung, Fotos, Konsolidierung und internationalen Versand und wirbt derzeit mit 90 Tagen kostenloser Lagerung. Prüfe die aktuellen Bedingungen.",
    readingEyebrow: "PRAKTISCHE RATGEBER",
    readingTitle: "Hilfen für die jeweilige Kaufentscheidung",
    readingLink: "Alle Artikel ansehen",
    faqEyebrow: "KURZE ANTWORTEN",
    faqTitle: "Was LoloBuy bestätigt – und was nicht veröffentlicht ist.",
    faqIntro:
      "Mit der offiziellen öffentlichen Startseite abgeglichen; fehlende Preise, Mengen und Regeln werden klar gekennzeichnet.",
    faqLink: "Alle FAQ lesen",
    closingEyebrow: "BEREIT ZUM STÖBERN?",
    closingTitle: "Durchsuche das Produktverzeichnis mit einem klaren Plan.",
  },
  fr: {
    eyebrow: "SÉLECTION SHOPPING · 2026",
    title: "Un meilleur spreadsheet Lolobuy.",
    titleAccent: "Vérifiez le QC. Choisissez sereinement.",
    intro:
      "Découvrez des produits, apprenez quoi vérifier sur les photos d’entrepôt et ouvrez la fiche actuelle avant de commander.",
    explore: "Explorer la sélection",
    workflow: "Fonctionnement",
    note: "Guide indépendant · Vérifiez toujours la fiche actuelle",
    curatedOverline: "01 / DÉCOUVRIR",
    curatedTitle: "Sélection de produits",
    filters: {
      all: "Tout",
      new: "Nouveautés",
      trending: "Tendances",
      essential: "Essentiels",
    },
    viewDirectory: "Voir le catalogue complet",
    browseTitle: "Explorer par sélection",
    browseNote: "Quatre accès rapides au catalogue",
    categories: ["Sneakers", "Vestes", "Sacs et accessoires", "Maillots"],
    principles: [
      "Découverte, pas vente",
      "Conseils QC avant achat",
      "Détails actuels sur la page cible",
    ],
    storyEyebrow: "UN BON TABLEAU A DES LIMITES",
    storyTitle: "Découvrez d’abord. Vérifiez ensuite chaque étape.",
    storyOne:
      "Un catalogue fait gagner du temps, mais ne peut pas figer le prix, le stock ou la description du vendeur. Chaque produit ouvre donc sa page actuelle.",
    storyTwo:
      "Séparez quatre décisions : trouver, confirmer la fiche, contrôler l’article en entrepôt et choisir l’envoi avec les données finales du colis.",
    storyLink: "Voir le parcours complet",
    processEyebrow: "DU LIEN AU COLIS",
    processTitle: "Quatre contrôles pour garder des étapes claires",
    qcLink: "Ouvrir le guide QC",
    process: [
      ["Trouver", "Utilisez les catégories et des termes simples pour créer une sélection."],
      ["Confirmer", "Vérifiez prix, variante, vendeur et mesures sur la fiche actuelle."],
      ["Inspecter", "Comparez l’article reçu avec la commande grâce aux photos QC."],
      ["Expédier", "Choisissez une route selon dimensions, poids et règles du pays."],
    ],
    sourceNote:
      "Le parcours public de Lolobuy décrit inspection, photos, consolidation et expédition internationale, avec 90 jours de stockage gratuit annoncés. Confirmez les conditions actuelles.",
    readingEyebrow: "LECTURES PRATIQUES",
    readingTitle: "Des guides pour chaque décision",
    readingLink: "Voir tous les articles",
    faqEyebrow: "RÉPONSES RAPIDES",
    faqTitle: "Ce que LoloBuy confirme — et ce qui n’est pas publié.",
    faqIntro:
      "Vérifié sur la page d’accueil publique officielle ; les prix, quantités et règles absents sont signalés sans être inventés.",
    faqLink: "Lire toutes les FAQ",
    closingEyebrow: "PRÊT À EXPLORER ?",
    closingTitle: "Recherchez dans le catalogue avec un plan plus clair.",
  },
  it: {
    eyebrow: "SCOPERTA DI PRODOTTI · 2026",
    title: "Uno spreadsheet Lolobuy più utile.",
    titleAccent: "Controlla il QC. Scegli con fiducia.",
    intro:
      "Scopri prodotti, impara cosa controllare nelle foto del magazzino e apri la scheda attuale prima di ordinare.",
    explore: "Esplora i prodotti",
    workflow: "Come funziona",
    note: "Guida indipendente · Verifica sempre la scheda attuale",
    curatedOverline: "01 / SCOPRI",
    curatedTitle: "Prodotti selezionati",
    filters: {
      all: "Tutti",
      new: "Novità",
      trending: "Tendenze",
      essential: "Essenziali",
    },
    viewDirectory: "Apri il catalogo completo",
    browseTitle: "Esplora per selezione",
    browseNote: "Quattro accessi rapidi al catalogo",
    categories: ["Sneaker", "Giacche", "Borse e accessori", "Maglie sportive"],
    principles: [
      "Scoperta, non vendita",
      "Guida QC prima dell’acquisto",
      "Dati attuali sulla pagina di destinazione",
    ],
    storyEyebrow: "UN BUON FOGLIO HA DEI LIMITI",
    storyTitle: "Prima scopri. Poi verifica ogni fase.",
    storyOne:
      "Un catalogo fa risparmiare tempo, ma non può bloccare prezzo, disponibilità o descrizione del venditore. Per questo ogni prodotto apre la pagina attuale.",
    storyTwo:
      "Separa quattro decisioni: trovare, confermare la scheda, controllare l’articolo in magazzino e scegliere la spedizione con i dati finali del pacco.",
    storyLink: "Vedi il flusso completo",
    processEyebrow: "DAL LINK AL PACCO",
    processTitle: "Quattro controlli per mantenere chiare le fasi",
    qcLink: "Apri la guida QC",
    process: [
      ["Trova", "Usa categorie e parole semplici per creare una selezione breve."],
      ["Conferma", "Controlla prezzo, variante, venditore e misure nella scheda attuale."],
      ["Ispeziona", "Confronta l’articolo ricevuto con l’ordine usando le foto QC."],
      ["Spedisci", "Scegli una rotta in base a dimensioni, peso e regole del paese."],
    ],
    sourceNote:
      "Il flusso pubblico di Lolobuy descrive ispezione, foto, consolidamento e spedizione internazionale e pubblicizza 90 giorni di deposito gratuito. Verifica i termini attuali.",
    readingEyebrow: "LETTURE PRATICHE",
    readingTitle: "Guide pensate per ogni decisione",
    readingLink: "Vedi tutti gli articoli",
    faqEyebrow: "RISPOSTE RAPIDE",
    faqTitle: "Cosa conferma LoloBuy e cosa non pubblica.",
    faqIntro:
      "Verificato sulla homepage pubblica ufficiale; prezzi, quantità e regole non pubblicati vengono segnalati senza inventarli.",
    faqLink: "Leggi tutte le FAQ",
    closingEyebrow: "PRONTO A ESPLORARE?",
    closingTitle: "Cerca nel catalogo con un piano più chiaro.",
  },
} as const;

export const footerCopy = {
  en: {
    lead: "Independent product discovery and practical QC guidance. We do not sell, store or ship products and are not affiliated with Lolobuy.",
    guides: "Guides",
    site: "Site",
    directory: "Product directory",
    directoryLink: "Open current listings",
    verify: "Verify current prices, variants and availability at destination.",
    imageNote: "Product cards open their exact matching main-site listings directly.",
  },
  es: {
    lead: "Descubrimiento independiente y orientación QC. No vendemos, almacenamos ni enviamos productos y no estamos afiliados con Lolobuy.",
    guides: "Guías",
    site: "Sitio",
    directory: "Directorio de productos",
    directoryLink: "Abrir fichas actuales",
    verify: "Comprueba precios, variantes y disponibilidad en el destino.",
    imageNote: "Cada tarjeta abre directamente el producto exacto del sitio principal.",
  },
  de: {
    lead: "Unabhängige Produktsuche und praktische QC-Hilfe. Wir verkaufen, lagern oder versenden keine Produkte und sind nicht mit Lolobuy verbunden.",
    guides: "Leitfäden",
    site: "Website",
    directory: "Produktverzeichnis",
    directoryLink: "Aktuelle Angebote öffnen",
    verify: "Preis, Variante und Verfügbarkeit auf der Zielseite prüfen.",
    imageNote: "Jede Produktkarte öffnet direkt das exakt passende Angebot der Hauptseite.",
  },
  fr: {
    lead: "Découverte indépendante et conseils QC pratiques. Nous ne vendons, stockons ou expédions aucun produit et ne sommes pas affiliés à Lolobuy.",
    guides: "Guides",
    site: "Site",
    directory: "Catalogue produits",
    directoryLink: "Ouvrir les fiches actuelles",
    verify: "Vérifiez prix, variantes et disponibilité sur la page cible.",
    imageNote: "Chaque carte ouvre directement le produit exact du site principal.",
  },
  it: {
    lead: "Scoperta indipendente e guida QC pratica. Non vendiamo, conserviamo o spediamo prodotti e non siamo affiliati a Lolobuy.",
    guides: "Guide",
    site: "Sito",
    directory: "Catalogo prodotti",
    directoryLink: "Apri le schede attuali",
    verify: "Verifica prezzi, varianti e disponibilità sulla pagina di destinazione.",
    imageNote: "Ogni scheda apre direttamente il prodotto esatto del sito principale.",
  },
} as const;

export const faqPageCopy = {
  en: {
    eyebrow: "FREQUENTLY ASKED QUESTIONS",
    title: "LoloBuy FAQ: Spreadsheet, QC, Storage & Shipping",
    intro:
      "Read 22 evidence-led LoloBuy answers covering spreadsheet use, QC photos, warehouse storage, shipping, fees and details requiring a live account check.",
    crumb: "FAQ",
    panelTitle: "Four facts are public. The gaps are labelled.",
    panelText:
      "The official English homepage states that LoloBuy assists purchases from online and offline channels in China, lets users begin with a pasted product link, inspects and photographs warehouse arrivals, and advertises 90 days of free storage. It does not publicly specify many fixed fees, photo quantities, return rules or international route terms, so this FAQ tells you exactly what still needs a live-order check.",
  },
  es: {
    eyebrow: "PREGUNTAS FRECUENTES",
    title: "Datos de LoloBuy, separados de las suposiciones.",
    intro:
      "Cada respuesta separa lo confirmado en la página pública oficial de los datos que no publica. No copiamos tarifas, fotos, plazos ni cupones de otros agentes.",
    crumb: "Preguntas",
    panelTitle: "Hay cuatro datos públicos; los vacíos están señalados.",
    panelText:
      "La página oficial indica compras en canales chinos online y offline, inicio mediante enlace, inspección y fotos al llegar al almacén y 90 días de almacenamiento gratuito. Los demás precios y reglas deben comprobarse en el pedido actual.",
  },
  de: {
    eyebrow: "HÄUFIGE FRAGEN",
    title: "LoloBuy-Fakten, klar von Annahmen getrennt.",
    intro:
      "Jede Antwort trennt bestätigte Angaben der offiziellen Startseite von nicht veröffentlichten Details. Fremde Gebühren, Fotozahlen, Laufzeiten oder Gutscheine werden nicht übernommen.",
    crumb: "FAQ",
    panelTitle: "Vier Fakten sind öffentlich; Lücken sind markiert.",
    panelText:
      "Die offizielle Seite nennt Einkäufe über chinesische Online- und Offline-Kanäle, den Start per Produktlink, Prüfung und Fotos im Lager sowie 90 Tage kostenlose Lagerung. Weitere Preise und Regeln sind im aktuellen Auftrag zu prüfen.",
  },
  fr: {
    eyebrow: "QUESTIONS FRÉQUENTES",
    title: "Les faits LoloBuy, séparés des suppositions.",
    intro:
      "Chaque réponse distingue les éléments confirmés par la page officielle de ceux qui ne sont pas publiés. Aucun tarif, nombre de photos, délai ou coupon n’est repris d’un autre agent.",
    crumb: "FAQ",
    panelTitle: "Quatre faits sont publics ; les lacunes sont signalées.",
    panelText:
      "La page officielle mentionne les achats via des canaux chinois en ligne et hors ligne, le démarrage par lien produit, l’inspection et les photos en entrepôt, ainsi que 90 jours de stockage gratuit. Les autres prix et règles doivent être vérifiés sur la commande.",
  },
  it: {
    eyebrow: "DOMANDE FREQUENTI",
    title: "I fatti LoloBuy, separati dalle supposizioni.",
    intro:
      "Ogni risposta separa ciò che conferma la homepage ufficiale dai dettagli non pubblicati. Non copiamo tariffe, quantità di foto, tempi o coupon da altri agenti.",
    crumb: "FAQ",
    panelTitle: "Quattro fatti sono pubblici; le lacune sono indicate.",
    panelText:
      "La pagina ufficiale cita acquisti da canali cinesi online e offline, avvio tramite link prodotto, ispezione e foto in magazzino e 90 giorni di deposito gratuito. Altri prezzi e regole vanno verificati nell’ordine attuale.",
  },
} as const;

export const workflowPageCopy = {
  en: {
    eyebrow: "THE COMPLETE FLOW",
    title: "One directory. Four separate decisions.",
    intro:
      "The spreadsheet helps with discovery. The live listing, warehouse evidence and final parcel data each control a different later decision.",
    crumb: "How it works",
    stages: [
      ["Discover", "Browse categories or search for a small group of relevant live product pages.", "Browse categories"],
      ["Confirm", "Read the current destination listing and verify option, price, delivery and measurements.", "Read spreadsheet guide"],
      ["Inspect", "After warehouse arrival, compare the physical item with the order using QC photos.", "Use the QC checklist"],
      ["Plan", "Resolve mismatches, group compatible items and review the final parcel data.", "Plan shipping"],
    ],
    evidenceEyebrow: "PUBLICLY CONFIRMED",
    evidenceTitle: "LoloBuy starts with a product link, then uses the warehouse as a decision point.",
    evidenceIntro:
      "LoloBuy's public website says it assists with purchases from Chinese online and offline channels. After a merchant sends the item to the warehouse, LoloBuy says it conducts quality inspection, takes photos and provides 90 days of free storage.",
    evidenceFacts: [
      ["Link ordering", "Paste the live source link and keep the exact option, size and color with your order record."],
      ["Warehouse evidence", "Review the physical arrival through the order record and QC photos before international submission."],
      ["Parcel decision", "The public community guide describes consolidation, route selection and tracking as later stages."],
    ],
    evidenceLink: "Read the source-checked workflow guide",
    boundaryEyebrow: "WHO CONTROLS WHAT?",
    boundaryTitle: "Use the right source at each stage.",
    question: "Question",
    source: "Best source",
    rows: [
      ["What categories or ideas can I browse?", "Lolobuy Sheet and the live product directory"],
      ["What is the current price and selected option?", "The live destination listing"],
      ["What item physically reached the warehouse?", "Order record and QC photos"],
      ["What route and shipping cost apply?", "The final packed parcel quote"],
      ["What import rules and taxes apply?", "Official destination-country guidance"],
    ],
    closingEyebrow: "START WITH A CLEAR QUERY",
    closingTitle: "Search the directory, then verify the live page.",
  },
  es: {
    eyebrow: "EL FLUJO COMPLETO",
    title: "Un directorio. Cuatro decisiones separadas.",
    intro:
      "La hoja ayuda a descubrir. La ficha actual, las fotos del almacén y los datos finales del paquete controlan decisiones distintas.",
    crumb: "Cómo funciona",
    stages: [
      ["Descubrir", "Explora categorías o busca un pequeño grupo de productos relevantes.", "Ver categorías"],
      ["Confirmar", "Lee la ficha actual y verifica opción, precio, entrega y medidas.", "Leer la guía"],
      ["Inspeccionar", "Cuando llegue al almacén, compara el artículo con el pedido mediante fotos QC.", "Usar lista QC"],
      ["Planificar", "Resuelve diferencias, agrupa artículos y revisa los datos finales del paquete.", "Planear envío"],
    ],
    evidenceEyebrow: "CONFIRMADO PÚBLICAMENTE",
    evidenceTitle: "LoloBuy empieza con un enlace y usa el almacén como punto de decisión.",
    evidenceIntro:
      "La web pública de LoloBuy indica que ayuda a comprar en canales chinos. Tras la llegada al almacén, afirma realizar inspección, tomar fotos y ofrecer 90 días de almacenamiento gratuito.",
    evidenceFacts: [
      ["Pedido por enlace", "Pega la ficha actual y guarda la opción, talla y color exactos."],
      ["Pruebas del almacén", "Revisa el artículo físico mediante el pedido y las fotos QC antes del envío."],
      ["Decisión del paquete", "La guía pública de la comunidad describe consolidación, ruta y seguimiento."],
    ],
    evidenceLink: "Leer la guía del proceso verificada",
    boundaryEyebrow: "¿QUIÉN CONTROLA QUÉ?",
    boundaryTitle: "Usa la fuente correcta en cada etapa.",
    question: "Pregunta",
    source: "Mejor fuente",
    rows: [
      ["¿Qué categorías puedo explorar?", "Lolobuy Sheet y el directorio de productos"],
      ["¿Cuál es el precio y la opción actual?", "La ficha de destino actual"],
      ["¿Qué llegó físicamente al almacén?", "El pedido y las fotos QC"],
      ["¿Qué ruta y precio de envío aplican?", "La cotización final del paquete"],
      ["¿Qué impuestos y reglas aplican?", "La guía oficial del país de destino"],
    ],
    closingEyebrow: "EMPIEZA CON UNA BÚSQUEDA CLARA",
    closingTitle: "Busca en el directorio y verifica la ficha actual.",
  },
  de: {
    eyebrow: "DER KOMPLETTE ABLAUF",
    title: "Ein Verzeichnis. Vier getrennte Entscheidungen.",
    intro:
      "Das Sheet hilft beim Entdecken. Live-Angebot, Lagerfotos und finale Paketdaten bestimmen jeweils einen anderen Schritt.",
    crumb: "So funktioniert’s",
    stages: [
      ["Entdecken", "Kategorien durchsuchen oder wenige passende aktuelle Produktseiten finden.", "Kategorien ansehen"],
      ["Bestätigen", "Aktuelles Angebot lesen und Option, Preis, Lieferung und Maße prüfen.", "Sheet-Leitfaden lesen"],
      ["Prüfen", "Nach Lagereingang den Artikel anhand von QC-Fotos mit der Bestellung vergleichen.", "QC-Checkliste nutzen"],
      ["Planen", "Abweichungen klären, passende Artikel bündeln und Paketdaten prüfen.", "Versand planen"],
    ],
    evidenceEyebrow: "ÖFFENTLICH BESTÄTIGT",
    evidenceTitle: "LoloBuy beginnt mit einem Produktlink und macht das Lager zum Prüfpunkt.",
    evidenceIntro:
      "Laut öffentlicher Website unterstützt LoloBuy Einkäufe über chinesische Kanäle. Nach Lagereingang werden Qualitätsprüfung und Fotos sowie 90 Tage kostenlose Lagerung beschrieben.",
    evidenceFacts: [
      ["Bestellung per Link", "Live-Link einfügen und genaue Option, Größe und Farbe dokumentieren."],
      ["Lagernachweis", "Den eingegangenen Artikel vor dem Versand anhand von Bestellung und QC-Fotos prüfen."],
      ["Paketentscheidung", "Der öffentliche Community-Leitfaden beschreibt Bündelung, Routenwahl und Tracking."],
    ],
    evidenceLink: "Quellengeprüften Ablauf lesen",
    boundaryEyebrow: "WER BESTIMMT WAS?",
    boundaryTitle: "Nutze in jeder Phase die richtige Quelle.",
    question: "Frage",
    source: "Beste Quelle",
    rows: [
      ["Welche Kategorien kann ich ansehen?", "Lolobuy Sheet und das Produktverzeichnis"],
      ["Wie lauten Preis und gewählte Option?", "Das aktuelle Zielangebot"],
      ["Was ist im Lager angekommen?", "Bestellstatus und QC-Fotos"],
      ["Welche Route und Kosten gelten?", "Das finale Paketangebot"],
      ["Welche Einfuhrregeln gelten?", "Offizielle Hinweise des Ziellands"],
    ],
    closingEyebrow: "MIT EINER KLAREN SUCHE STARTEN",
    closingTitle: "Verzeichnis durchsuchen, dann Live-Seite prüfen.",
  },
  fr: {
    eyebrow: "LE PARCOURS COMPLET",
    title: "Un catalogue. Quatre décisions distinctes.",
    intro:
      "Le tableau aide à découvrir. La fiche actuelle, les preuves d’entrepôt et les données finales du colis contrôlent des décisions différentes.",
    crumb: "Fonctionnement",
    stages: [
      ["Découvrir", "Parcourez les catégories ou trouvez quelques fiches produit actuelles.", "Voir les catégories"],
      ["Confirmer", "Lisez la fiche actuelle et vérifiez option, prix, livraison et mesures.", "Lire le guide"],
      ["Inspecter", "Après réception, comparez l’article à la commande grâce aux photos QC.", "Utiliser la liste QC"],
      ["Planifier", "Résolvez les écarts, regroupez les articles et vérifiez les données du colis.", "Planifier l’envoi"],
    ],
    evidenceEyebrow: "CONFIRMÉ PUBLIQUEMENT",
    evidenceTitle: "LoloBuy commence par un lien produit et fait de l’entrepôt un point de décision.",
    evidenceIntro:
      "Le site public de LoloBuy indique aider aux achats via des canaux chinois. Après réception, il décrit un contrôle qualité, des photos et 90 jours de stockage gratuit.",
    evidenceFacts: [
      ["Commande par lien", "Collez la fiche actuelle et conservez l’option, la taille et la couleur exactes."],
      ["Preuve d’entrepôt", "Examinez l’article reçu avec la commande et les photos QC avant l’envoi."],
      ["Décision colis", "Le guide public de la communauté décrit consolidation, choix de route et suivi."],
    ],
    evidenceLink: "Lire le guide du parcours vérifié",
    boundaryEyebrow: "QUI CONTRÔLE QUOI ?",
    boundaryTitle: "Utilisez la bonne source à chaque étape.",
    question: "Question",
    source: "Meilleure source",
    rows: [
      ["Quelles catégories puis-je parcourir ?", "Lolobuy Sheet et le catalogue produits"],
      ["Quel est le prix et l’option actuelle ?", "La fiche de destination actuelle"],
      ["Quel article est arrivé à l’entrepôt ?", "Commande et photos QC"],
      ["Quelle route et quel tarif s’appliquent ?", "Le devis final du colis"],
      ["Quelles règles d’importation s’appliquent ?", "Les sources officielles du pays"],
    ],
    closingEyebrow: "COMMENCEZ PAR UNE RECHERCHE CLAIRE",
    closingTitle: "Recherchez, puis vérifiez la fiche actuelle.",
  },
  it: {
    eyebrow: "IL FLUSSO COMPLETO",
    title: "Un catalogo. Quattro decisioni separate.",
    intro:
      "Il foglio aiuta a scoprire. Scheda attuale, prove del magazzino e dati finali del pacco guidano decisioni diverse.",
    crumb: "Come funziona",
    stages: [
      ["Scopri", "Esplora le categorie o trova poche schede prodotto attuali.", "Vedi categorie"],
      ["Conferma", "Leggi la scheda attuale e verifica opzione, prezzo, consegna e misure.", "Leggi la guida"],
      ["Ispeziona", "Dopo l’arrivo, confronta l’articolo con l’ordine usando le foto QC.", "Usa la lista QC"],
      ["Pianifica", "Risolvi differenze, raggruppa gli articoli e controlla i dati del pacco.", "Pianifica spedizione"],
    ],
    evidenceEyebrow: "CONFERMATO PUBBLICAMENTE",
    evidenceTitle: "LoloBuy parte da un link prodotto e usa il magazzino come punto decisionale.",
    evidenceIntro:
      "Il sito pubblico di LoloBuy descrive l’assistenza agli acquisti da canali cinesi. Dopo l’arrivo, indica controllo qualità, foto e 90 giorni di deposito gratuito.",
    evidenceFacts: [
      ["Ordine tramite link", "Incolla la scheda attuale e conserva opzione, taglia e colore esatti."],
      ["Prova del magazzino", "Controlla l’articolo ricevuto con ordine e foto QC prima della spedizione."],
      ["Decisione sul pacco", "La guida pubblica della community descrive consolidamento, rotta e tracking."],
    ],
    evidenceLink: "Leggi la guida verificata sul flusso",
    boundaryEyebrow: "CHI CONTROLLA COSA?",
    boundaryTitle: "Usa la fonte corretta in ogni fase.",
    question: "Domanda",
    source: "Fonte migliore",
    rows: [
      ["Quali categorie posso esplorare?", "Lolobuy Sheet e il catalogo prodotti"],
      ["Qual è il prezzo e l’opzione attuale?", "La scheda di destinazione attuale"],
      ["Cosa è arrivato fisicamente in magazzino?", "Ordine e foto QC"],
      ["Quale rotta e costo si applicano?", "Il preventivo finale del pacco"],
      ["Quali regole d’importazione si applicano?", "Le fonti ufficiali del paese"],
    ],
    closingEyebrow: "INIZIA CON UNA RICERCA CHIARA",
    closingTitle: "Cerca nel catalogo, poi verifica la scheda attuale.",
  },
} as const;
