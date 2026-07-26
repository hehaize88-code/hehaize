import type { Locale } from "./i18n";

export const commonPageCopy: Record<
  Locale,
  {
    home: string;
    guides: string;
    articles: string;
    categories: string;
    updated: string;
    independentGuide: string;
    sourceLabel: string;
    researchBasis: string;
    continueReading: string;
    allArticles: string;
  }
> = {
  en: {
    home: "Home",
    guides: "Guides",
    articles: "Articles",
    categories: "Categories",
    updated: "Updated",
    independentGuide: "Independent editorial guide",
    sourceLabel: "Sources",
    researchBasis: "Research basis",
    continueReading: "Continue with another guide",
    allArticles: "All articles",
  },
  es: {
    home: "Inicio",
    guides: "Guías",
    articles: "Artículos",
    categories: "Categorías",
    updated: "Actualizado",
    independentGuide: "Guía editorial independiente",
    sourceLabel: "Fuentes",
    researchBasis: "Base de la investigación",
    continueReading: "Continúa con otra guía",
    allArticles: "Todos los artículos",
  },
  de: {
    home: "Startseite",
    guides: "Ratgeber",
    articles: "Artikel",
    categories: "Kategorien",
    updated: "Aktualisiert",
    independentGuide: "Unabhängiger redaktioneller Ratgeber",
    sourceLabel: "Quellen",
    researchBasis: "Recherchegrundlage",
    continueReading: "Mit einem weiteren Ratgeber fortfahren",
    allArticles: "Alle Artikel",
  },
  fr: {
    home: "Accueil",
    guides: "Guides",
    articles: "Articles",
    categories: "Catégories",
    updated: "Mis à jour",
    independentGuide: "Guide éditorial indépendant",
    sourceLabel: "Sources",
    researchBasis: "Base de recherche",
    continueReading: "Poursuivre avec un autre guide",
    allArticles: "Tous les articles",
  },
  it: {
    home: "Home",
    guides: "Guide",
    articles: "Articoli",
    categories: "Categorie",
    updated: "Aggiornato",
    independentGuide: "Guida editoriale indipendente",
    sourceLabel: "Fonti",
    researchBasis: "Base della ricerca",
    continueReading: "Continua con un'altra guida",
    allArticles: "Tutti gli articoli",
  },
};

export const categoriesPageCopy = {
  en: {
    eyebrow: "PRODUCT DIRECTORY",
    title: "Browse the Lolobuy spreadsheet by category.",
    intro:
      "Start broad, compare a few candidates, then confirm the selected variant, current price and measurements on the destination listing.",
    crumb: "Categories",
    directory: "DIRECTORY",
    open: "Open current listings",
    searchEyebrow: "SEARCH THE FULL DIRECTORY",
    searchTitle: "Describe the item, not the hype.",
    searchText:
      "Try a product type, material, color or construction detail. The search opens the current product directory in a new tab.",
    notes: [
      [
        "Compare measurements",
        "Size labels are inconsistent. Compare the seller's chart with an item you already own before selecting a variant.",
      ],
      [
        "Read the option selector",
        "The lowest displayed price can belong to a different option. Select the intended color and size before judging cost.",
      ],
      [
        "Check again before ordering",
        "Listings can change after they are added to a directory. The live destination page is the source for current availability.",
      ],
    ],
  },
  es: {
    eyebrow: "DIRECTORIO DE PRODUCTOS",
    title: "Explora el spreadsheet de Lolobuy por categoría.",
    intro:
      "Empieza con una categoría, compara varias opciones y confirma variante, precio y medidas en la ficha actual antes de pedir.",
    crumb: "Categorías",
    directory: "DIRECTORIO",
    open: "Abrir fichas actuales",
    searchEyebrow: "BUSCAR EN TODO EL DIRECTORIO",
    searchTitle: "Describe el producto, no la moda.",
    searchText:
      "Prueba con el tipo de producto, material, color o detalle de construcción. La búsqueda abre el directorio actual en una pestaña nueva.",
    notes: [
      [
        "Compara las medidas",
        "Las tallas no son uniformes. Compara la tabla del vendedor con una prenda que ya te quede bien.",
      ],
      [
        "Lee el selector de opciones",
        "El precio más bajo puede pertenecer a otra variante. Elige color y talla antes de valorar el coste.",
      ],
      [
        "Comprueba de nuevo antes de pedir",
        "Las fichas pueden cambiar después de entrar en el directorio. La página actual controla disponibilidad y precio.",
      ],
    ],
  },
  de: {
    eyebrow: "PRODUKTVERZEICHNIS",
    title: "Das Lolobuy Spreadsheet nach Kategorien durchsuchen.",
    intro:
      "Beginne breit, vergleiche mehrere Angebote und prüfe Variante, Preis und Maße anschließend im aktuellen Angebot.",
    crumb: "Kategorien",
    directory: "VERZEICHNIS",
    open: "Aktuelle Angebote öffnen",
    searchEyebrow: "GESAMTES VERZEICHNIS DURCHSUCHEN",
    searchTitle: "Beschreibe den Artikel, nicht den Hype.",
    searchText:
      "Suche nach Produkttyp, Material, Farbe oder Verarbeitungsdetail. Die Suche öffnet das aktuelle Verzeichnis in einem neuen Tab.",
    notes: [
      [
        "Maße vergleichen",
        "Größenbezeichnungen sind uneinheitlich. Vergleiche die Verkäufertabelle mit einem passenden eigenen Artikel.",
      ],
      [
        "Optionsauswahl lesen",
        "Der niedrigste Preis kann zu einer anderen Variante gehören. Farbe und Größe vor der Preisbewertung auswählen.",
      ],
      [
        "Vor der Bestellung erneut prüfen",
        "Angebote können sich nach der Aufnahme ins Verzeichnis ändern. Für Bestand und Preis gilt die aktuelle Zielseite.",
      ],
    ],
  },
  fr: {
    eyebrow: "CATALOGUE PRODUITS",
    title: "Parcourez le spreadsheet Lolobuy par catégorie.",
    intro:
      "Commencez par une catégorie, comparez quelques options puis confirmez variante, prix et mesures sur la fiche actuelle.",
    crumb: "Catégories",
    directory: "CATALOGUE",
    open: "Ouvrir les fiches actuelles",
    searchEyebrow: "RECHERCHER DANS TOUT LE CATALOGUE",
    searchTitle: "Décrivez l'article, pas la tendance.",
    searchText:
      "Essayez le type de produit, la matière, la couleur ou un détail de construction. La recherche ouvre le catalogue actuel dans un nouvel onglet.",
    notes: [
      [
        "Comparer les mesures",
        "Les tailles ne sont pas uniformes. Comparez le tableau vendeur à un article qui vous va déjà.",
      ],
      [
        "Lire le sélecteur d'options",
        "Le prix le plus bas peut correspondre à une autre variante. Sélectionnez couleur et taille avant de juger le coût.",
      ],
      [
        "Revérifier avant de commander",
        "Une fiche peut changer après son ajout au catalogue. La page actuelle fait foi pour le stock et le prix.",
      ],
    ],
  },
  it: {
    eyebrow: "CATALOGO PRODOTTI",
    title: "Esplora lo spreadsheet Lolobuy per categoria.",
    intro:
      "Parti da una categoria, confronta alcune opzioni e conferma variante, prezzo e misure nella scheda attuale.",
    crumb: "Categorie",
    directory: "CATALOGO",
    open: "Apri le schede attuali",
    searchEyebrow: "CERCA IN TUTTO IL CATALOGO",
    searchTitle: "Descrivi l'articolo, non l'hype.",
    searchText:
      "Prova tipo di prodotto, materiale, colore o dettaglio costruttivo. La ricerca apre il catalogo attuale in una nuova scheda.",
    notes: [
      [
        "Confronta le misure",
        "Le etichette di taglia non sono uniformi. Confronta la tabella del venditore con un capo che possiedi.",
      ],
      [
        "Leggi il selettore delle opzioni",
        "Il prezzo più basso può riferirsi a un'altra variante. Scegli colore e taglia prima di valutarlo.",
      ],
      [
        "Ricontrolla prima dell'ordine",
        "Le schede possono cambiare dopo l'inserimento nel catalogo. La pagina attuale controlla disponibilità e prezzo.",
      ],
    ],
  },
} as const;

export const qcPageCopy = {
  en: {
    eyebrow: "WAREHOUSE FIELD GUIDE",
    title: "Read Lolobuy QC photos with a repeatable checklist.",
    intro:
      "Quality-control photos document the item that reached the warehouse. They are evidence for a decision—not a guarantee of perfection, authenticity or long-term performance.",
    crumb: "QC photos",
    checks: [
      [
        "Confirm the order",
        "Match the item type, selected color, size or variant, quantity and expected pieces before examining small details.",
      ],
      [
        "Check large structure",
        "Compare shape, symmetry, major panel placement and obvious damage. Use more than one angle when perspective may distort the item.",
      ],
      [
        "Use measurements",
        "Compare ruler photos with the seller chart and an item you own. Request one precise missing measurement when fit is uncertain.",
      ],
      [
        "Make a focused decision",
        "Separate normal variation from a cosmetic issue and from a material mismatch that justifies action within the platform process.",
      ],
    ],
    sourceEyebrow: "SOURCE CHECKED · JULY 26, 2026",
    sourceTitle: "Inspection and photos are public facts; a fixed photo count is not.",
    sourceText:
      "LoloBuy's public website says the warehouse conducts quality inspection and takes photos after a merchant sends the goods. The public page we checked does not state one universal number of free images or a permanent extra-photo or video price. Confirm those live service details before relying on them.",
    sourceLink: "Read the detailed source-checked QC article",
    fastEyebrow: "FAST CHECKLIST",
    fastTitle: "Identity before details.",
    fastItems: [
      "Correct item and color",
      "Correct size or variant",
      "Correct quantity and pieces",
      "No obvious damage or stains",
      "Critical measurements checked",
    ],
    fullArticle: "Read the full QC article",
    prose: [
      [
        "CLOTHING",
        "Fit depends on measurements, not the printed size.",
        "Check shoulder alignment, neckline, sleeve length, major seams, pocket position, print placement, stains and visible holes. For trousers, review the waistband, rise, leg shape and hem.",
        "Warehouse lighting can shift color and hide detail in dark fabric. Ask for a specific close-up when one feature materially affects your decision.",
      ],
      [
        "SHOES",
        "Compare the left and right item together.",
        "Look at toe shape, heel height, panel alignment, outsole attachment, lace hardware and visible glue. One angled photo can exaggerate asymmetry, so compare matching features from similar viewpoints.",
      ],
      [
        "BAGS & ACCESSORIES",
        "Use dimensions when scale is hard to judge.",
        "Inspect the silhouette, corners, handle and strap attachment, zipper path, lining and hardware. Small accessories are easy to misread without a ruler or known reference.",
      ],
      [
        "LIMITS",
        "Know what an image cannot prove.",
        "Photos cannot reliably prove durability, exact composition, comfort, electronics performance or authenticity. Current coverage, optional services and remedies must be confirmed on the platform.",
      ],
      [
        "FOCUSED REQUESTS",
        "Ask for an answer, not simply another image.",
        "Name the feature, angle and reference that would change your decision: an insole measurement, matching left-and-right view, chest width with the garment flat, or a close-up of suspected damage.",
      ],
    ],
    nextEyebrow: "NEXT DECISION",
    nextTitle: "Plan the parcel after you accept the item.",
    nextLink: "Open shipping guide",
  },
  es: {
    eyebrow: "GUÍA DE CAMPO DEL ALMACÉN",
    title: "Lee las fotos QC de Lolobuy con una lista repetible.",
    intro:
      "Las fotos de control documentan el artículo que llegó al almacén. Ayudan a decidir, pero no garantizan perfección, autenticidad ni rendimiento futuro.",
    crumb: "Fotos QC",
    checks: [
      ["Confirma el pedido", "Comprueba tipo, color, talla o variante, cantidad y piezas antes de mirar detalles pequeños."],
      ["Revisa la estructura", "Compara forma, simetría, paneles principales y daños evidentes desde varios ángulos."],
      ["Usa medidas", "Compara las fotos con regla con la tabla del vendedor y una prenda propia."],
      ["Decide con precisión", "Distingue variación normal, defecto cosmético y diferencia material que requiere actuar."],
    ],
    sourceEyebrow: "FUENTE COMPROBADA · 26 DE JULIO DE 2026",
    sourceTitle: "La inspección y las fotos son públicas; una cantidad fija no.",
    sourceText:
      "La web pública de LoloBuy afirma que el almacén inspecciona y fotografía los artículos recibidos. No publica una cantidad universal de fotos gratuitas ni un precio permanente para fotos extra o vídeo. Comprueba esos servicios en la cuenta actual.",
    sourceLink: "Leer el artículo QC verificado",
    fastEyebrow: "LISTA RÁPIDA",
    fastTitle: "Primero la identidad.",
    fastItems: ["Artículo y color correctos", "Talla o variante correcta", "Cantidad y piezas correctas", "Sin daños o manchas evidentes", "Medidas críticas revisadas"],
    fullArticle: "Leer el artículo QC completo",
    prose: [
      ["ROPA", "El ajuste depende de medidas, no de la talla impresa.", "Revisa hombros, cuello, mangas, costuras, bolsillos, estampado, manchas y agujeros. En pantalones, comprueba cintura, tiro, pierna y bajo.", "La luz del almacén puede alterar el color. Pide un primer plano concreto si un detalle cambia tu decisión."],
      ["CALZADO", "Compara juntos el pie izquierdo y el derecho.", "Revisa puntera, talón, paneles, unión de la suela, herrajes y pegamento visible desde ángulos equivalentes."],
      ["BOLSOS Y ACCESORIOS", "Usa medidas cuando la escala no esté clara.", "Comprueba forma, esquinas, asas, correas, cremalleras, forro y herrajes. Una regla evita errores de escala."],
      ["LÍMITES", "Entiende lo que una imagen no demuestra.", "Las fotos no prueban durabilidad, composición exacta, comodidad, funcionamiento electrónico o autenticidad. Verifica cobertura y soluciones actuales en la plataforma."],
      ["PETICIONES CONCRETAS", "Pide una respuesta, no solo otra foto.", "Indica la característica, el ángulo y la referencia necesarios: plantilla, vista del par, ancho de pecho o primer plano del posible daño."],
    ],
    nextEyebrow: "SIGUIENTE DECISIÓN",
    nextTitle: "Planifica el paquete después de aceptar el artículo.",
    nextLink: "Abrir guía de envío",
  },
  de: {
    eyebrow: "PRAXISLEITFADEN FÜRS LAGER",
    title: "Lolobuy-QC-Fotos mit einer festen Checkliste lesen.",
    intro:
      "QC-Fotos dokumentieren den Lagereingang. Sie sind eine Entscheidungshilfe, aber keine Garantie für Perfektion, Echtheit oder Haltbarkeit.",
    crumb: "QC-Fotos",
    checks: [
      ["Bestellung bestätigen", "Artikeltyp, Farbe, Größe oder Variante, Menge und erwartete Teile zuerst abgleichen."],
      ["Große Struktur prüfen", "Form, Symmetrie, Paneele und sichtbare Schäden aus mehreren Perspektiven vergleichen."],
      ["Maße verwenden", "Linealfotos mit Verkäufertabelle und einem passenden eigenen Artikel vergleichen."],
      ["Gezielt entscheiden", "Normale Abweichung, kosmetischen Mangel und handlungsrelevante Falschlieferung trennen."],
    ],
    sourceEyebrow: "QUELLE GEPRÜFT · 26. JULI 2026",
    sourceTitle: "Prüfung und Fotos sind bestätigt; eine feste Fotozahl nicht.",
    sourceText:
      "LoloBuy beschreibt öffentlich Qualitätsprüfung und Fotos nach dem Lagereingang. Eine allgemeine Zahl kostenloser Bilder oder dauerhafte Preise für Zusatzfotos und Videos werden dort nicht genannt. Aktuelle Leistungen im Konto prüfen.",
    sourceLink: "Ausführlichen, quellengeprüften QC-Artikel lesen",
    fastEyebrow: "SCHNELL-CHECKLISTE",
    fastTitle: "Identität vor Details.",
    fastItems: ["Richtiger Artikel und Farbe", "Richtige Größe oder Variante", "Richtige Menge und Teile", "Keine sichtbaren Schäden oder Flecken", "Wichtige Maße geprüft"],
    fullArticle: "Vollständigen QC-Artikel lesen",
    prose: [
      ["KLEIDUNG", "Passform hängt von Maßen ab, nicht vom Größenetikett.", "Schultern, Ausschnitt, Ärmel, Nähte, Taschen, Druck, Flecken und Löcher prüfen. Bei Hosen Bund, Leibhöhe, Beinform und Saum ansehen.", "Lagerlicht kann Farben verändern. Bei einem entscheidenden Detail eine konkrete Nahaufnahme anfragen."],
      ["SCHUHE", "Linken und rechten Schuh gemeinsam vergleichen.", "Zehenform, Ferse, Paneele, Sohlenverbindung, Ösen und sichtbaren Kleber aus vergleichbaren Blickwinkeln prüfen."],
      ["TASCHEN & ZUBEHÖR", "Maße nutzen, wenn die Größe unklar ist.", "Silhouette, Ecken, Griffe, Gurte, Reißverschluss, Futter und Beschläge prüfen. Ein Lineal schafft Maßstab."],
      ["GRENZEN", "Wissen, was ein Bild nicht beweist.", "Fotos beweisen weder Haltbarkeit, genaue Zusammensetzung, Komfort, Elektronikfunktion noch Echtheit. Aktuelle Leistungen und Abhilfe im Konto prüfen."],
      ["GEZIELTE ANFRAGEN", "Eine konkrete Antwort statt einfach mehr Bilder verlangen.", "Merkmal, Blickwinkel und Referenz nennen: Innenlänge, Paaransicht, Brustweite oder Nahaufnahme eines vermuteten Schadens."],
    ],
    nextEyebrow: "NÄCHSTE ENTSCHEIDUNG",
    nextTitle: "Das Paket nach Annahme des Artikels planen.",
    nextLink: "Versandratgeber öffnen",
  },
  fr: {
    eyebrow: "GUIDE PRATIQUE D'ENTREPÔT",
    title: "Lisez les photos QC Lolobuy avec une liste reproductible.",
    intro:
      "Les photos QC documentent l'article reçu à l'entrepôt. Elles aident à décider sans garantir perfection, authenticité ou durabilité.",
    crumb: "Photos QC",
    checks: [
      ["Confirmer la commande", "Vérifiez type, couleur, taille ou variante, quantité et pièces avant les petits détails."],
      ["Contrôler la structure", "Comparez forme, symétrie, panneaux principaux et dommages visibles sous plusieurs angles."],
      ["Utiliser les mesures", "Comparez les photos avec règle au tableau vendeur et à un article qui vous va."],
      ["Prendre une décision ciblée", "Distinguez variation normale, défaut cosmétique et écart matériel nécessitant une action."],
    ],
    sourceEyebrow: "SOURCE VÉRIFIÉE · 26 JUILLET 2026",
    sourceTitle: "Inspection et photos sont publiques ; leur nombre fixe ne l'est pas.",
    sourceText:
      "Le site public LoloBuy indique que l'entrepôt inspecte et photographie les articles reçus. Il ne publie ni nombre universel de photos gratuites ni tarif permanent pour des photos ou vidéos supplémentaires. Vérifiez ces services dans le compte actuel.",
    sourceLink: "Lire l'article QC détaillé et vérifié",
    fastEyebrow: "LISTE RAPIDE",
    fastTitle: "L'identité avant les détails.",
    fastItems: ["Bon article et bonne couleur", "Bonne taille ou variante", "Quantité et pièces correctes", "Aucun dommage ou tache évident", "Mesures critiques vérifiées"],
    fullArticle: "Lire l'article QC complet",
    prose: [
      ["VÊTEMENTS", "La coupe dépend des mesures, pas de la taille imprimée.", "Vérifiez épaules, col, manches, coutures, poches, motif, taches et trous. Pour un pantalon, contrôlez taille, fourche, jambe et ourlet.", "La lumière d'entrepôt peut modifier les couleurs. Demandez un gros plan précis si un détail change la décision."],
      ["CHAUSSURES", "Comparez ensemble le pied gauche et le pied droit.", "Contrôlez bout, talon, panneaux, fixation de semelle, œillets et colle visible depuis des angles comparables."],
      ["SACS ET ACCESSOIRES", "Utilisez les dimensions quand l'échelle est incertaine.", "Inspectez silhouette, coins, poignées, sangles, zip, doublure et quincaillerie. Une règle donne l'échelle."],
      ["LIMITES", "Sachez ce qu'une image ne prouve pas.", "Les photos ne prouvent pas durabilité, composition exacte, confort, fonctionnement électronique ou authenticité. Vérifiez les services et recours actuels sur la plateforme."],
      ["DEMANDES CIBLÉES", "Demandez une réponse, pas simplement une autre photo.", "Nommez la caractéristique, l'angle et la référence nécessaires : semelle intérieure, vue de la paire, largeur poitrine ou gros plan du dommage."],
    ],
    nextEyebrow: "DÉCISION SUIVANTE",
    nextTitle: "Planifiez le colis après avoir accepté l'article.",
    nextLink: "Ouvrir le guide d'expédition",
  },
  it: {
    eyebrow: "GUIDA PRATICA DI MAGAZZINO",
    title: "Leggi le foto QC Lolobuy con una lista ripetibile.",
    intro:
      "Le foto QC documentano l'articolo arrivato in magazzino. Sono prove utili, non garanzie di perfezione, autenticità o durata.",
    crumb: "Foto QC",
    checks: [
      ["Conferma l'ordine", "Verifica tipo, colore, taglia o variante, quantità e pezzi prima dei dettagli minori."],
      ["Controlla la struttura", "Confronta forma, simmetria, pannelli principali e danni visibili da più angoli."],
      ["Usa le misure", "Confronta le foto con righello, la tabella del venditore e un capo adatto."],
      ["Decidi in modo mirato", "Distingui variazione normale, difetto estetico e differenza sostanziale che richiede azione."],
    ],
    sourceEyebrow: "FONTE VERIFICATA · 26 LUGLIO 2026",
    sourceTitle: "Ispezione e foto sono fatti pubblici; un numero fisso non lo è.",
    sourceText:
      "Il sito pubblico LoloBuy afferma che il magazzino ispeziona e fotografa gli articoli ricevuti. Non pubblica un numero universale di foto gratuite né prezzi permanenti per foto o video extra. Controlla i servizi attuali nell'account.",
    sourceLink: "Leggi l'articolo QC dettagliato e verificato",
    fastEyebrow: "LISTA RAPIDA",
    fastTitle: "Prima l'identità.",
    fastItems: ["Articolo e colore corretti", "Taglia o variante corretta", "Quantità e pezzi corretti", "Nessun danno o macchia evidente", "Misure critiche controllate"],
    fullArticle: "Leggi l'articolo QC completo",
    prose: [
      ["ABBIGLIAMENTO", "La vestibilità dipende dalle misure, non dalla taglia stampata.", "Controlla spalle, collo, maniche, cuciture, tasche, stampa, macchie e fori. Per i pantaloni verifica vita, cavallo, gamba e orlo.", "La luce del magazzino può alterare il colore. Richiedi un primo piano preciso se un dettaglio cambia la decisione."],
      ["SCARPE", "Confronta insieme scarpa sinistra e destra.", "Controlla punta, tallone, pannelli, attacco suola, occhielli e colla visibile da angoli equivalenti."],
      ["BORSE E ACCESSORI", "Usa le dimensioni quando la scala non è chiara.", "Ispeziona forma, angoli, manici, cinturini, zip, fodera e metallo. Un righello chiarisce la scala."],
      ["LIMITI", "Conosci ciò che un'immagine non prova.", "Le foto non provano durata, composizione esatta, comfort, funzionamento elettronico o autenticità. Verifica servizi e rimedi attuali sulla piattaforma."],
      ["RICHIESTE MIRATE", "Chiedi una risposta, non semplicemente un'altra foto.", "Indica caratteristica, angolo e riferimento: soletta, vista della coppia, larghezza torace o primo piano del possibile danno."],
    ],
    nextEyebrow: "DECISIONE SUCCESSIVA",
    nextTitle: "Pianifica il pacco dopo aver accettato l'articolo.",
    nextLink: "Apri la guida di spedizione",
  },
} as const;

export const shippingPageCopy = {
  en: {
    eyebrow: "PARCEL PLANNING",
    title: "Plan Lolobuy shipping around the packed parcel.",
    intro:
      "International shipping cannot be reduced to one price chart. The destination, route, item restrictions, actual weight, dimensions and packaging all affect the final choice.",
    crumb: "Shipping",
    days: "days",
    storage:
      "LoloBuy's public website currently advertises 90 days of free warehouse storage. Use it as a planning window and confirm the live terms and each order's deadline inside the platform.",
    stages: [
      ["01 / BEFORE ARRIVAL", "Estimate the parcel mix.", "Record rough weight, dimensions, materials and restrictions for each item. Notice combinations that may create a bulky or fragile parcel."],
      ["02 / IN STORAGE", "Resolve QC issues early.", "Storage creates time to compare arrivals and handle a mismatch before submitting international shipping. Set your own earlier deadline."],
      ["03 / CONSOLIDATION", "Combine compatible items.", "Dense items, soft goods and fragile accessories need different protection. Restricted categories may also limit the available route."],
      ["04 / FINAL QUOTE", "Compare eligible routes.", "Review chargeable weight, delivery estimate, tracking, compensation, restrictions, packaging and destination-country obligations."],
    ],
    weightEyebrow: "WEIGHT EXPLAINED",
    weightTitle: "Light does not always mean cheap to ship.",
    weightOne:
      "Actual weight comes from the scale. Volumetric weight converts the parcel's outer dimensions using a carrier formula. A route may charge whichever is higher, and the formula differs by carrier.",
    weightTwo:
      "Removing unnecessary packaging can reduce volume, but it can also reduce protection. Decide item by item after the warehouse provides better parcel information.",
    questionsTitle: "Before choosing a route, ask:",
    questions: [
      "Does the route accept every item category in the parcel?",
      "Is the charge based on actual or volumetric weight?",
      "What tracking and compensation terms are described?",
      "How will packaging requests change weight and dimensions?",
      "What customs and tax obligations apply at the destination?",
    ],
    sourceEyebrow: "SOURCE CHECKED · JULY 26, 2026",
    sourceTitle: "No static page can quote your final shipping cost accurately.",
    sourceText:
      "Final cost depends on a current, packed parcel and an eligible route. Taxes, declarations and import rules belong to the destination country. LoloBuy's public homepage confirms 90 days of free storage. Use the live account and official customs information for the final decision.",
    sourceLink: "Read the detailed source-checked shipping article",
  },
  es: {
    eyebrow: "PLANIFICACIÓN DEL PAQUETE",
    title: "Planifica el envío Lolobuy según el paquete preparado.",
    intro:
      "El envío internacional no cabe en una tarifa única. Destino, ruta, restricciones, peso, dimensiones y embalaje cambian la decisión final.",
    crumb: "Envío",
    days: "días",
    storage:
      "La web pública de LoloBuy anuncia actualmente 90 días de almacenamiento gratuito. Úsalos como margen y confirma los términos y la fecha límite de cada pedido.",
    stages: [
      ["01 / ANTES DE LLEGAR", "Estima la combinación del paquete.", "Anota peso, dimensiones, materiales y restricciones aproximadas. Detecta combinaciones voluminosas o frágiles."],
      ["02 / EN ALMACÉN", "Resuelve pronto los problemas QC.", "El almacenamiento permite comparar llegadas y resolver diferencias antes del envío internacional."],
      ["03 / CONSOLIDACIÓN", "Combina artículos compatibles.", "Los productos densos, textiles y frágiles necesitan protecciones distintas; algunas categorías limitan las rutas."],
      ["04 / COTIZACIÓN FINAL", "Compara las rutas disponibles.", "Revisa peso facturable, plazo estimado, seguimiento, compensación, restricciones, embalaje y obligaciones del destino."],
    ],
    weightEyebrow: "EL PESO EXPLICADO",
    weightTitle: "Ligero no siempre significa barato.",
    weightOne:
      "El peso real procede de la báscula. El volumétrico convierte las dimensiones exteriores mediante una fórmula del transportista. La ruta puede cobrar el mayor.",
    weightTwo:
      "Quitar embalaje reduce volumen, pero también protección. Decide por artículo cuando el almacén ofrezca datos mejores.",
    questionsTitle: "Antes de elegir una ruta, pregunta:",
    questions: ["¿Acepta todas las categorías del paquete?", "¿Cobra peso real o volumétrico?", "¿Qué seguimiento y compensación describe?", "¿Cómo cambia el embalaje el peso y el volumen?", "¿Qué aduanas e impuestos exige el destino?"],
    sourceEyebrow: "FUENTE COMPROBADA · 26 DE JULIO DE 2026",
    sourceTitle: "Una página estática no puede cotizar tu coste final.",
    sourceText:
      "El coste depende del paquete preparado y de una ruta elegible. Impuestos, declaraciones y reglas de importación pertenecen al destino. La página pública confirma 90 días de almacenamiento gratuito; usa la cuenta actual para decidir.",
    sourceLink: "Leer el artículo de envío verificado",
  },
  de: {
    eyebrow: "PAKETPLANUNG",
    title: "Lolobuy-Versand anhand des gepackten Pakets planen.",
    intro:
      "Internationaler Versand lässt sich nicht auf eine Preistabelle reduzieren. Ziel, Route, Einschränkungen, Gewicht, Maße und Verpackung bestimmen die Auswahl.",
    crumb: "Versand",
    days: "Tage",
    storage:
      "LoloBuy wirbt öffentlich mit 90 Tagen kostenloser Lagerung. Nutze sie als Planungsfenster und prüfe aktuelle Bedingungen sowie die Frist jedes Auftrags.",
    stages: [
      ["01 / VOR ANKUNFT", "Paketmix grob schätzen.", "Ungefähres Gewicht, Maße, Material und Einschränkungen notieren. Sperrige oder zerbrechliche Kombinationen erkennen."],
      ["02 / IM LAGER", "QC-Probleme früh klären.", "Lagerzeit schafft Raum zum Vergleichen und zur Klärung von Abweichungen vor dem internationalen Versand."],
      ["03 / KONSOLIDIERUNG", "Kompatible Artikel bündeln.", "Dichte Artikel, Textilien und Zerbrechliches brauchen anderen Schutz; Kategorien können Routen einschränken."],
      ["04 / ENDANGEBOT", "Zulässige Routen vergleichen.", "Abrechnungsgewicht, Laufzeit, Tracking, Entschädigung, Einschränkungen, Verpackung und Zielpflichten prüfen."],
    ],
    weightEyebrow: "GEWICHT ERKLÄRT",
    weightTitle: "Leicht bedeutet nicht immer günstig.",
    weightOne:
      "Das Istgewicht kommt von der Waage. Volumengewicht rechnet Außenmaße nach einer Frachtführerformel um. Berechnet werden kann der höhere Wert.",
    weightTwo:
      "Weniger Verpackung senkt Volumen, kann aber Schutz verringern. Nach besseren Lagerdaten je Artikel entscheiden.",
    questionsTitle: "Vor der Routenwahl fragen:",
    questions: ["Akzeptiert die Route alle Artikelkategorien?", "Gilt Ist- oder Volumengewicht?", "Welche Tracking- und Entschädigungsbedingungen gelten?", "Wie verändern Verpackungswünsche Gewicht und Maße?", "Welche Zoll- und Steuerpflichten gelten am Ziel?"],
    sourceEyebrow: "QUELLE GEPRÜFT · 26. JULI 2026",
    sourceTitle: "Keine statische Seite kann den Endpreis genau nennen.",
    sourceText:
      "Die Kosten hängen vom gepackten Paket und einer zulässigen Route ab. Steuern, Deklarationen und Einfuhrregeln bestimmt das Zielland. LoloBuy bestätigt 90 Tage kostenlose Lagerung; für die Entscheidung gilt das Live-Konto.",
    sourceLink: "Ausführlichen Versandartikel lesen",
  },
  fr: {
    eyebrow: "PLANIFICATION DU COLIS",
    title: "Planifiez l'expédition Lolobuy autour du colis emballé.",
    intro:
      "L'expédition internationale ne se résume pas à un tarif. Destination, route, restrictions, poids, dimensions et emballage influencent le choix final.",
    crumb: "Expédition",
    days: "jours",
    storage:
      "Le site public LoloBuy annonce actuellement 90 jours de stockage gratuit. Utilisez-les comme marge et confirmez les conditions et la date limite de chaque commande.",
    stages: [
      ["01 / AVANT L'ARRIVÉE", "Estimer la composition du colis.", "Notez poids, dimensions, matières et restrictions approximatifs. Repérez les associations volumineuses ou fragiles."],
      ["02 / EN STOCKAGE", "Résoudre tôt les problèmes QC.", "Le stockage permet de comparer les arrivées et de traiter un écart avant l'expédition internationale."],
      ["03 / CONSOLIDATION", "Regrouper les articles compatibles.", "Produits denses, textiles et objets fragiles nécessitent des protections différentes ; certaines catégories limitent les routes."],
      ["04 / DEVIS FINAL", "Comparer les routes admissibles.", "Vérifiez poids facturable, délai, suivi, indemnisation, restrictions, emballage et obligations du pays."],
    ],
    weightEyebrow: "LE POIDS EXPLIQUÉ",
    weightTitle: "Léger ne veut pas toujours dire économique.",
    weightOne:
      "Le poids réel vient de la balance. Le poids volumétrique convertit les dimensions selon une formule du transporteur. La route peut facturer le plus élevé.",
    weightTwo:
      "Retirer un emballage réduit le volume mais aussi la protection. Décidez article par article avec les données d'entrepôt.",
    questionsTitle: "Avant de choisir une route, demandez :",
    questions: ["Accepte-t-elle toutes les catégories du colis ?", "Facture-t-elle le poids réel ou volumétrique ?", "Quelles conditions de suivi et d'indemnisation ?", "Comment l'emballage change-t-il poids et dimensions ?", "Quelles obligations douanières et fiscales au pays de destination ?"],
    sourceEyebrow: "SOURCE VÉRIFIÉE · 26 JUILLET 2026",
    sourceTitle: "Une page statique ne peut pas chiffrer votre coût final.",
    sourceText:
      "Le coût dépend du colis emballé et d'une route admissible. Taxes, déclarations et importation relèvent du pays de destination. LoloBuy confirme 90 jours de stockage gratuit ; utilisez le compte actuel pour décider.",
    sourceLink: "Lire l'article détaillé sur l'expédition",
  },
  it: {
    eyebrow: "PIANIFICAZIONE DEL PACCO",
    title: "Pianifica la spedizione Lolobuy sul pacco preparato.",
    intro:
      "La spedizione internazionale non si riduce a un listino. Destinazione, rotta, restrizioni, peso, dimensioni e imballaggio determinano la scelta.",
    crumb: "Spedizione",
    days: "giorni",
    storage:
      "Il sito pubblico LoloBuy pubblicizza 90 giorni di deposito gratuito. Usali come finestra di pianificazione e verifica termini e scadenza di ogni ordine.",
    stages: [
      ["01 / PRIMA DELL'ARRIVO", "Stima la composizione del pacco.", "Annota peso, dimensioni, materiali e restrizioni indicativi. Individua combinazioni ingombranti o fragili."],
      ["02 / IN MAGAZZINO", "Risolvi presto i problemi QC.", "Il deposito offre tempo per confrontare gli arrivi e gestire differenze prima della spedizione internazionale."],
      ["03 / CONSOLIDAMENTO", "Unisci articoli compatibili.", "Oggetti densi, tessili e fragili richiedono protezioni diverse; alcune categorie limitano le rotte."],
      ["04 / PREVENTIVO FINALE", "Confronta le rotte disponibili.", "Controlla peso fatturabile, stima, tracking, compensazione, restrizioni, imballaggio e obblighi del paese."],
    ],
    weightEyebrow: "IL PESO SPIEGATO",
    weightTitle: "Leggero non significa sempre economico.",
    weightOne:
      "Il peso reale viene dalla bilancia. Quello volumetrico converte le dimensioni esterne con una formula del vettore. Può essere addebitato il maggiore.",
    weightTwo:
      "Rimuovere imballaggio riduce il volume ma anche la protezione. Decidi articolo per articolo con i dati del magazzino.",
    questionsTitle: "Prima di scegliere una rotta, chiedi:",
    questions: ["Accetta tutte le categorie del pacco?", "Addebita peso reale o volumetrico?", "Quali condizioni di tracking e compensazione?", "Come cambiano peso e dimensioni con l'imballaggio?", "Quali obblighi doganali e fiscali al destino?"],
    sourceEyebrow: "FONTE VERIFICATA · 26 LUGLIO 2026",
    sourceTitle: "Una pagina statica non può quotare il costo finale.",
    sourceText:
      "Il costo dipende dal pacco preparato e da una rotta idonea. Tasse, dichiarazioni e regole d'importazione appartengono al paese di destinazione. LoloBuy conferma 90 giorni di deposito gratuito; usa l'account attuale per decidere.",
    sourceLink: "Leggi l'articolo dettagliato sulla spedizione",
  },
} as const;

export const aboutPageCopy = {
  en: {
    eyebrow: "ABOUT THE PROJECT",
    title: "A product-discovery layer with visible boundaries.",
    intro:
      "Lolobuy Sheet is an independent editorial site built to make product discovery, listing verification, QC review and parcel planning easier to understand.",
    crumb: "About",
    cards: [
      ["What we publish", "Category shortcuts, search tools and human-readable guides for evaluating listings, warehouse photos, measurements, storage, consolidation and shipping choices."],
      ["What we do not do", "We do not sell products, take payment, operate a warehouse, inspect orders, quote international shipping or control destination pages."],
      ["How facts are handled", "Platform-specific statements are limited to public information and framed with a reminder that services and terms can change."],
      ["Our relationship to Lolobuy", "There is none. Lolobuy Sheet is not owned, operated, sponsored or endorsed by Lolobuy."],
    ],
    principlesEyebrow: "EDITORIAL PRINCIPLES",
    principlesTitle: "Useful beats exaggerated.",
    principles: [
      "We do not describe every link as manually verified every day.",
      "We do not invent fixed shipping prices or delivery guarantees.",
      "We separate product discovery from warehouse inspection.",
      "We label illustrative editorial imagery as illustrative.",
      "We correct factual or destination-link errors when identified.",
    ],
    ctaEyebrow: "START WITH THE METHOD",
    ctaTitle: "See how the four-stage workflow fits together.",
    cta: "How it works",
  },
  es: {
    eyebrow: "SOBRE EL PROYECTO",
    title: "Una capa de descubrimiento con límites visibles.",
    intro:
      "Lolobuy Sheet es un sitio editorial independiente que explica mejor el descubrimiento, la verificación de fichas, el QC y la planificación del paquete.",
    crumb: "Acerca de",
    cards: [
      ["Qué publicamos", "Categorías, búsqueda y guías claras para revisar fichas, fotos de almacén, medidas, almacenamiento, consolidación y envío."],
      ["Qué no hacemos", "No vendemos, cobramos, operamos almacenes, inspeccionamos pedidos, cotizamos envíos ni controlamos páginas de destino."],
      ["Cómo tratamos los datos", "Las afirmaciones sobre plataformas se limitan a información pública y recuerdan que servicios y condiciones cambian."],
      ["Relación con Lolobuy", "No existe. Lolobuy Sheet no pertenece, no está operado, patrocinado ni respaldado por Lolobuy."],
    ],
    principlesEyebrow: "PRINCIPIOS EDITORIALES",
    principlesTitle: "La utilidad vale más que la exageración.",
    principles: ["No afirmamos que cada enlace se verifique a diario.", "No inventamos tarifas fijas ni garantías de entrega.", "Separamos descubrimiento e inspección de almacén.", "Marcamos las imágenes ilustrativas.", "Corregimos errores factuales o de enlace identificados."],
    ctaEyebrow: "EMPIEZA POR EL MÉTODO",
    ctaTitle: "Descubre cómo encajan las cuatro etapas.",
    cta: "Cómo funciona",
  },
  de: {
    eyebrow: "ÜBER DAS PROJEKT",
    title: "Produktsuche mit klar sichtbaren Grenzen.",
    intro:
      "Lolobuy Sheet ist eine unabhängige redaktionelle Seite für verständliche Produktsuche, Angebotsprüfung, QC und Paketplanung.",
    crumb: "Über uns",
    cards: [
      ["Was wir veröffentlichen", "Kategorien, Suche und verständliche Leitfäden zu Angeboten, Lagerfotos, Maßen, Lagerung, Bündelung und Versand."],
      ["Was wir nicht tun", "Wir verkaufen nicht, nehmen keine Zahlung an, betreiben kein Lager, prüfen keine Aufträge und kontrollieren keine Zielseiten."],
      ["Wie Fakten behandelt werden", "Plattformspezifische Aussagen beruhen auf öffentlichen Angaben und weisen auf mögliche Änderungen hin."],
      ["Beziehung zu Lolobuy", "Es gibt keine. Lolobuy Sheet gehört nicht zu Lolobuy und wird von Lolobuy weder betrieben noch unterstützt."],
    ],
    principlesEyebrow: "REDAKTIONELLE GRUNDSÄTZE",
    principlesTitle: "Nützlichkeit statt Übertreibung.",
    principles: ["Keine Behauptung täglicher Handprüfung aller Links.", "Keine erfundenen Festpreise oder Liefergarantien.", "Produktsuche und Lagerprüfung bleiben getrennt.", "Illustrative Bilder werden als solche gekennzeichnet.", "Erkannte Sach- und Linkfehler werden korrigiert."],
    ctaEyebrow: "MIT DER METHODE STARTEN",
    ctaTitle: "So greifen die vier Phasen ineinander.",
    cta: "Ablauf ansehen",
  },
  fr: {
    eyebrow: "À PROPOS DU PROJET",
    title: "Une couche de découverte aux limites visibles.",
    intro:
      "Lolobuy Sheet est un site éditorial indépendant qui clarifie découverte, vérification des fiches, QC et planification du colis.",
    crumb: "À propos",
    cards: [
      ["Ce que nous publions", "Catégories, recherche et guides lisibles pour évaluer fiches, photos d'entrepôt, mesures, stockage, consolidation et expédition."],
      ["Ce que nous ne faisons pas", "Nous ne vendons pas, n'encaissons pas, n'exploitons pas d'entrepôt, n'inspectons pas les commandes et ne contrôlons pas les pages cibles."],
      ["Traitement des faits", "Les affirmations propres à une plateforme sont limitées aux informations publiques et rappellent que les conditions évoluent."],
      ["Relation avec Lolobuy", "Il n'y en a aucune. Lolobuy Sheet n'est ni détenu, ni exploité, ni sponsorisé, ni approuvé par Lolobuy."],
    ],
    principlesEyebrow: "PRINCIPES ÉDITORIAUX",
    principlesTitle: "L'utilité avant l'exagération.",
    principles: ["Aucune prétention de vérification manuelle quotidienne de tous les liens.", "Aucun tarif fixe ni délai garanti inventé.", "Découverte et inspection d'entrepôt restent distinctes.", "Les images illustratives sont signalées.", "Les erreurs factuelles ou de lien identifiées sont corrigées."],
    ctaEyebrow: "COMMENCER PAR LA MÉTHODE",
    ctaTitle: "Découvrez comment les quatre étapes s'enchaînent.",
    cta: "Voir le fonctionnement",
  },
  it: {
    eyebrow: "IL PROGETTO",
    title: "Uno strato di scoperta con limiti visibili.",
    intro:
      "Lolobuy Sheet è un sito editoriale indipendente che rende più chiari scoperta, verifica delle schede, QC e pianificazione del pacco.",
    crumb: "Chi siamo",
    cards: [
      ["Cosa pubblichiamo", "Categorie, ricerca e guide leggibili per valutare schede, foto di magazzino, misure, deposito, consolidamento e spedizione."],
      ["Cosa non facciamo", "Non vendiamo, incassiamo pagamenti, gestiamo magazzini, ispezioniamo ordini, quotiamo spedizioni o controlliamo pagine di destinazione."],
      ["Come gestiamo i fatti", "Le affermazioni sulla piattaforma si limitano a informazioni pubbliche e ricordano che servizi e termini possono cambiare."],
      ["Rapporto con Lolobuy", "Non esiste. Lolobuy Sheet non è posseduto, gestito, sponsorizzato o approvato da Lolobuy."],
    ],
    principlesEyebrow: "PRINCIPI EDITORIALI",
    principlesTitle: "L'utilità supera l'esagerazione.",
    principles: ["Non dichiariamo che ogni link sia verificato ogni giorno.", "Non inventiamo tariffe fisse o garanzie di consegna.", "Separiamo scoperta e ispezione di magazzino.", "Segnaliamo le immagini illustrative.", "Correggiamo errori fattuali o di destinazione identificati."],
    ctaEyebrow: "PARTI DAL METODO",
    ctaTitle: "Scopri come si collegano le quattro fasi.",
    cta: "Come funziona",
  },
} as const;

export const articlesIndexCopy = {
  en: {
    eyebrow: "EDITORIAL GUIDES",
    title: "Researched guides, not recycled promises.",
    intro:
      "Every 1,200–1,800 word English guide separates LoloBuy's public statements, practical shopping advice and independent user evidence. Unknown prices or service details stay marked for live verification.",
    crumb: "Articles",
    policyEyebrow: "EDITORIAL POLICY",
    policyTitle: "Facts, observations and unknowns stay separate.",
    policyText:
      "Platform-specific statements use current public sources. Customer-review articles identify the scope and incentive of a report instead of converting one order into a universal score. Practical checklists are guidance, not a promise of quality, delivery time or customs outcome.",
  },
  es: {
    eyebrow: "GUÍAS EDITORIALES",
    title: "Guías investigadas, no promesas recicladas.",
    intro:
      "Cada guía separa declaraciones públicas de LoloBuy, consejos prácticos y pruebas de usuarios. Los precios o servicios desconocidos quedan marcados para comprobarlos en la cuenta actual.",
    crumb: "Artículos",
    policyEyebrow: "POLÍTICA EDITORIAL",
    policyTitle: "Datos, observaciones e incógnitas se mantienen separados.",
    policyText:
      "Las afirmaciones de plataforma usan fuentes públicas. Las reseñas explican el alcance y los incentivos del informe. Las listas son orientación, no una promesa de calidad, plazo o resultado aduanero.",
  },
  de: {
    eyebrow: "REDAKTIONELLE RATGEBER",
    title: "Recherchierte Leitfäden statt wiederholter Versprechen.",
    intro:
      "Jeder Leitfaden trennt öffentliche LoloBuy-Aussagen, praktische Hinweise und unabhängige Nutzerbelege. Unbekannte Preise oder Leistungen bleiben als Live-Prüfung markiert.",
    crumb: "Artikel",
    policyEyebrow: "REDAKTIONELLE RICHTLINIE",
    policyTitle: "Fakten, Beobachtungen und Unbekanntes bleiben getrennt.",
    policyText:
      "Plattformaussagen stützen sich auf öffentliche Quellen. Erfahrungsberichte nennen Umfang und Anreize. Checklisten sind Hilfe, keine Garantie für Qualität, Laufzeit oder Zollausgang.",
  },
  fr: {
    eyebrow: "GUIDES ÉDITORIAUX",
    title: "Des guides documentés, pas des promesses recyclées.",
    intro:
      "Chaque guide sépare déclarations publiques de LoloBuy, conseils pratiques et témoignages indépendants. Prix et services inconnus restent signalés pour vérification dans le compte actuel.",
    crumb: "Articles",
    policyEyebrow: "POLITIQUE ÉDITORIALE",
    policyTitle: "Faits, observations et inconnues restent distincts.",
    policyText:
      "Les affirmations de plateforme reposent sur des sources publiques. Les avis précisent portée et incitations. Les listes sont des conseils, pas une promesse de qualité, délai ou résultat douanier.",
  },
  it: {
    eyebrow: "GUIDE EDITORIALI",
    title: "Guide ricercate, non promesse riciclate.",
    intro:
      "Ogni guida separa dichiarazioni pubbliche di LoloBuy, consigli pratici e prove indipendenti. Prezzi o servizi ignoti restano indicati per la verifica nell'account attuale.",
    crumb: "Articoli",
    policyEyebrow: "POLITICA EDITORIALE",
    policyTitle: "Fatti, osservazioni e incognite restano separati.",
    policyText:
      "Le affermazioni sulla piattaforma usano fonti pubbliche. Le recensioni indicano portata e incentivi. Le liste sono indicazioni, non promesse di qualità, tempi o esito doganale.",
  },
} as const;

export const articleUiCopy = {
  en: {
    inGuide: "In this guide",
    changingTerms:
      "Platform services, prices and policies can change. Confirm the current terms before acting.",
    factChecked: "Fact-checked",
    readGuide: "Read guide",
    sourceIntro:
      "Platform claims and customer observations are kept separate. The notes below identify the research basis without sending visitors away from this guide. Confirm current account terms before acting.",
  },
  es: {
    inGuide: "En esta guía",
    changingTerms:
      "Servicios, precios y políticas pueden cambiar. Confirma los términos actuales antes de actuar.",
    factChecked: "Verificado",
    readGuide: "Leer guía",
    sourceIntro:
      "Las afirmaciones de plataforma y las observaciones de clientes se mantienen separadas. Las notas explican la base de investigación sin sacar al visitante de esta guía.",
  },
  de: {
    inGuide: "In diesem Ratgeber",
    changingTerms:
      "Leistungen, Preise und Regeln können sich ändern. Aktuelle Bedingungen vor dem Handeln prüfen.",
    factChecked: "Geprüft",
    readGuide: "Ratgeber lesen",
    sourceIntro:
      "Plattformaussagen und Kundenbeobachtungen bleiben getrennt. Die Hinweise nennen die Recherchegrundlage, ohne Besucher von dieser Seite wegzuschicken.",
  },
  fr: {
    inGuide: "Dans ce guide",
    changingTerms:
      "Services, prix et règles peuvent changer. Confirmez les conditions actuelles avant d'agir.",
    factChecked: "Vérifié",
    readGuide: "Lire le guide",
    sourceIntro:
      "Les affirmations de plateforme et les observations clients restent séparées. Ces notes indiquent la base de recherche sans faire quitter le guide.",
  },
  it: {
    inGuide: "In questa guida",
    changingTerms:
      "Servizi, prezzi e regole possono cambiare. Verifica i termini attuali prima di agire.",
    factChecked: "Verificato",
    readGuide: "Leggi la guida",
    sourceIntro:
      "Le affermazioni della piattaforma e le osservazioni dei clienti restano separate. Le note indicano la base di ricerca senza portare il visitatore fuori dalla guida.",
  },
} as const;

export const contactPageCopy = {
  en: {
    eyebrow: "CONTACT & CORRECTIONS",
    title: "Send the issue to the source that can resolve it.",
    intro:
      "A broken directory link, an active order and a warehouse service question belong to different teams. Use the guide below to avoid sending private order data to the wrong place.",
    crumb: "Contact",
    cards: [
      ["DIRECTORY CORRECTION", "Broken link or factual error", "Record the page URL, affected heading or link, what is wrong and the public source supporting the correction. Do not include order numbers, addresses or payment information."],
      ["PRODUCT PAGE", "Listing or destination-page issue", "Product availability, images, prices and variants are controlled by the destination directory or seller. Use the contact channel shown on that website."],
      ["ACTIVE ORDER", "Warehouse, QC or shipping question", "Contact the platform handling the active order through its authenticated support workflow. This independent site cannot view or change an order."],
      ["COPYRIGHT OR TRADEMARK", "Identification and notice", "Prepare the exact URL, protected work or mark, your authority to act and the requested correction. A public notice channel will be added before formal launch."],
    ],
    pendingContact:
      "A dedicated @lolobuy-sheet.com contact address will be published when the domain is formally connected.",
    openDirectory: "Open the current product directory",
  },
  es: {
    eyebrow: "CONTACTO Y CORRECCIONES",
    title: "Envía el problema a quien puede resolverlo.",
    intro:
      "Un enlace roto, un pedido activo y una consulta de almacén corresponden a equipos distintos. Evita enviar datos privados al lugar equivocado.",
    crumb: "Contacto",
    cards: [
      ["CORRECCIÓN DEL DIRECTORIO", "Enlace roto o error factual", "Anota URL, título o enlace afectado, error y fuente pública que respalda la corrección. No incluyas pedidos, direcciones o pagos."],
      ["PÁGINA DE PRODUCTO", "Problema con la ficha de destino", "Disponibilidad, imágenes, precios y variantes los controla la página de destino o el vendedor. Usa su canal de contacto actual."],
      ["PEDIDO ACTIVO", "Pregunta de almacén, QC o envío", "Contacta con la plataforma que gestiona el pedido desde su soporte autenticado. Este sitio independiente no puede verlo ni cambiarlo."],
      ["DERECHOS O MARCA", "Identificación y aviso", "Prepara URL exacta, obra o marca protegida, autoridad para actuar y corrección solicitada. Se añadirá un canal público antes del lanzamiento formal."],
    ],
    pendingContact:
      "Se publicará una dirección @lolobuy-sheet.com cuando el dominio esté conectado formalmente.",
    openDirectory: "Abrir el directorio actual",
  },
  de: {
    eyebrow: "KONTAKT & KORREKTUREN",
    title: "Das Problem an die zuständige Stelle senden.",
    intro:
      "Ein defekter Link, ein aktiver Auftrag und eine Lagerfrage gehören zu verschiedenen Stellen. Private Auftragsdaten nicht falsch weitergeben.",
    crumb: "Kontakt",
    cards: [
      ["VERZEICHNISKORREKTUR", "Defekter Link oder Sachfehler", "URL, betroffene Überschrift oder Link, Fehler und öffentliche Belegquelle notieren. Keine Auftragsnummern, Adressen oder Zahlungsdaten senden."],
      ["PRODUKTSEITE", "Problem mit Zielangebot", "Bestand, Bilder, Preise und Varianten kontrollieren Zielverzeichnis oder Verkäufer. Den dort gezeigten Kontaktweg verwenden."],
      ["AKTIVER AUFTRAG", "Lager-, QC- oder Versandfrage", "Die ausführende Plattform im angemeldeten Support kontaktieren. Diese unabhängige Seite kann Aufträge weder sehen noch ändern."],
      ["URHEBERRECHT ODER MARKE", "Identifizierung und Hinweis", "Genaue URL, geschütztes Werk oder Zeichen, Vertretungsbefugnis und gewünschte Korrektur vorbereiten."],
    ],
    pendingContact:
      "Eine eigene @lolobuy-sheet.com-Adresse wird nach formeller Domainverbindung veröffentlicht.",
    openDirectory: "Aktuelles Produktverzeichnis öffnen",
  },
  fr: {
    eyebrow: "CONTACT ET CORRECTIONS",
    title: "Adressez le problème à la source capable de le résoudre.",
    intro:
      "Un lien cassé, une commande active et une question d'entrepôt relèvent d'équipes différentes. N'envoyez pas de données privées au mauvais endroit.",
    crumb: "Contact",
    cards: [
      ["CORRECTION DU CATALOGUE", "Lien cassé ou erreur factuelle", "Notez URL, titre ou lien concerné, erreur et source publique justificative. N'incluez ni numéro de commande, ni adresse, ni paiement."],
      ["PAGE PRODUIT", "Problème de fiche cible", "Disponibilité, images, prix et variantes sont contrôlés par la destination ou le vendeur. Utilisez le canal de contact affiché sur ce site."],
      ["COMMANDE ACTIVE", "Question d'entrepôt, QC ou expédition", "Contactez la plateforme qui traite la commande via son support authentifié. Ce site indépendant ne peut ni voir ni modifier la commande."],
      ["DROIT D'AUTEUR OU MARQUE", "Identification et notification", "Préparez l'URL exacte, l'œuvre ou marque protégée, votre pouvoir d'agir et la correction demandée."],
    ],
    pendingContact:
      "Une adresse @lolobuy-sheet.com dédiée sera publiée lorsque le domaine sera formellement connecté.",
    openDirectory: "Ouvrir le catalogue actuel",
  },
  it: {
    eyebrow: "CONTATTI E CORREZIONI",
    title: "Invia il problema alla fonte che può risolverlo.",
    intro:
      "Un link rotto, un ordine attivo e una domanda di magazzino appartengono a team diversi. Evita di inviare dati privati al posto sbagliato.",
    crumb: "Contatti",
    cards: [
      ["CORREZIONE DEL CATALOGO", "Link rotto o errore fattuale", "Annota URL, titolo o link interessato, errore e fonte pubblica a supporto. Non includere ordini, indirizzi o dati di pagamento."],
      ["PAGINA PRODOTTO", "Problema con la scheda di destinazione", "Disponibilità, immagini, prezzi e varianti sono controllati dalla destinazione o dal venditore. Usa il contatto mostrato su quel sito."],
      ["ORDINE ATTIVO", "Domanda su magazzino, QC o spedizione", "Contatta la piattaforma che gestisce l'ordine tramite il supporto autenticato. Questo sito indipendente non può vederlo o modificarlo."],
      ["COPYRIGHT O MARCHIO", "Identificazione e avviso", "Prepara URL esatto, opera o marchio protetto, autorità ad agire e correzione richiesta."],
    ],
    pendingContact:
      "Un indirizzo @lolobuy-sheet.com dedicato sarà pubblicato quando il dominio verrà collegato formalmente.",
    openDirectory: "Apri il catalogo attuale",
  },
} as const;

export const privacyPageCopy = {
  en: {
    eyebrow: "POLICY / UPDATED 2026-07-26",
    title: "Privacy policy.",
    intro:
      "This site is designed for public reading and product discovery without user accounts, checkout or order-data collection.",
    crumb: "Privacy",
    sections: [
      ["Information this site does not request", "Lolobuy Sheet does not ask for passwords, payment information, delivery addresses, identity documents or order numbers. Do not send that information through a future general contact channel."],
      ["Bookmarks and search", "Product bookmarks use temporary page state and are not saved to a server. Searches open the current product directory in a new tab, where that destination's privacy terms apply."],
      ["Routine technical information", "Hosting infrastructure may process IP address, browser type, requested URL, timestamp and security events to deliver and protect the site. This version has no advertising profile or account database."],
      ["Outbound links", "Links can open independently operated websites. Their privacy notices, cookies and data practices are outside this site's control; review them before submitting personal information."],
      ["Changes", "This notice will be updated before any material new collection method, analytics system, account feature or contact form is enabled."],
    ],
  },
  es: {
    eyebrow: "POLÍTICA / ACTUALIZADA 2026-07-26",
    title: "Política de privacidad.",
    intro:
      "El sitio está pensado para lectura pública y descubrimiento sin cuentas, checkout ni recopilación de datos de pedido.",
    crumb: "Privacidad",
    sections: [
      ["Información que no solicitamos", "Lolobuy Sheet no pide contraseñas, pagos, direcciones, documentos de identidad o números de pedido. No envíes esos datos por un futuro canal general."],
      ["Marcadores y búsqueda", "Los marcadores usan estado temporal y no se guardan en un servidor. Las búsquedas abren el directorio actual, donde se aplica su propia privacidad."],
      ["Información técnica rutinaria", "El alojamiento puede procesar IP, navegador, URL, hora y eventos de seguridad para servir y proteger el sitio. No hay perfil publicitario ni base de cuentas."],
      ["Enlaces salientes", "Los enlaces pueden abrir sitios independientes. Sus cookies, avisos y prácticas quedan fuera del control de este sitio."],
      ["Cambios", "El aviso se actualizará antes de activar nueva recopilación, analítica, cuentas o formularios."],
    ],
  },
  de: {
    eyebrow: "DATENSCHUTZ / AKTUALISIERT 2026-07-26",
    title: "Datenschutzerklärung.",
    intro:
      "Die Seite dient öffentlichem Lesen und Produktsuche ohne Benutzerkonten, Checkout oder Erfassung von Auftragsdaten.",
    crumb: "Datenschutz",
    sections: [
      ["Nicht angeforderte Daten", "Lolobuy Sheet fragt nicht nach Passwörtern, Zahlungsdaten, Lieferadressen, Ausweisen oder Auftragsnummern. Solche Daten nicht über einen allgemeinen Kontakt senden."],
      ["Lesezeichen und Suche", "Lesezeichen sind nur temporärer Seitenzustand und werden nicht auf einem Server gespeichert. Suchen öffnen das aktuelle Verzeichnis mit dessen Datenschutzregeln."],
      ["Übliche technische Daten", "Hosting kann IP-Adresse, Browser, URL, Zeitstempel und Sicherheitsereignisse zur Auslieferung und zum Schutz verarbeiten. Es gibt kein Werbeprofil oder Kontodatenbank."],
      ["Ausgehende Links", "Links können unabhängige Websites öffnen. Deren Hinweise, Cookies und Datenpraxis liegen außerhalb unserer Kontrolle."],
      ["Änderungen", "Der Hinweis wird vor neuen Erfassungsmethoden, Analyse, Konten oder Formularen aktualisiert."],
    ],
  },
  fr: {
    eyebrow: "POLITIQUE / MISE À JOUR 2026-07-26",
    title: "Politique de confidentialité.",
    intro:
      "Le site est conçu pour la lecture publique et la découverte sans compte, paiement ni collecte de données de commande.",
    crumb: "Confidentialité",
    sections: [
      ["Informations non demandées", "Lolobuy Sheet ne demande ni mot de passe, ni paiement, ni adresse, ni pièce d'identité, ni numéro de commande. N'envoyez pas ces données via un futur contact général."],
      ["Favoris et recherche", "Les favoris restent temporaires et ne sont pas enregistrés sur un serveur. La recherche ouvre le catalogue actuel, soumis à sa propre politique."],
      ["Informations techniques courantes", "L'hébergement peut traiter IP, navigateur, URL, heure et événements de sécurité pour servir et protéger le site. Aucun profil publicitaire ni base de comptes."],
      ["Liens sortants", "Les liens peuvent ouvrir des sites indépendants. Leurs avis, cookies et pratiques échappent au contrôle de ce site."],
      ["Modifications", "Cet avis sera mis à jour avant toute nouvelle collecte, analyse, fonction de compte ou formulaire."],
    ],
  },
  it: {
    eyebrow: "PRIVACY / AGGIORNATA 2026-07-26",
    title: "Informativa sulla privacy.",
    intro:
      "Il sito è pensato per lettura pubblica e scoperta senza account, checkout o raccolta di dati d'ordine.",
    crumb: "Privacy",
    sections: [
      ["Informazioni non richieste", "Lolobuy Sheet non chiede password, pagamenti, indirizzi, documenti o numeri d'ordine. Non inviare questi dati tramite un futuro contatto generale."],
      ["Preferiti e ricerca", "I preferiti usano stato temporaneo e non sono salvati su server. Le ricerche aprono il catalogo attuale, soggetto alla sua privacy."],
      ["Informazioni tecniche ordinarie", "L'hosting può trattare IP, browser, URL, orario ed eventi di sicurezza per servire e proteggere il sito. Non esistono profili pubblicitari o database account."],
      ["Link in uscita", "I link possono aprire siti indipendenti. Informative, cookie e pratiche di quei siti sono fuori dal nostro controllo."],
      ["Modifiche", "L'avviso sarà aggiornato prima di attivare nuova raccolta, analisi, account o moduli."],
    ],
  },
} as const;

export const termsPageCopy = {
  en: {
    eyebrow: "TERMS / UPDATED 2026-07-26",
    title: "Terms and editorial disclaimer.",
    intro:
      "By using this site, you acknowledge that it is an independent information and discovery resource rather than a seller, agent, warehouse or carrier.",
    crumb: "Terms",
    sections: [
      ["Independent informational service", "Lolobuy Sheet is not owned, operated, endorsed or sponsored by Lolobuy or by marketplaces and sellers referenced through destination pages. Names and marks are used for identification and commentary."],
      ["No sale, inspection or shipping contract", "This site does not sell products, accept payment, inspect warehouse items, arrange transport or enter into an order contract. Transactions follow the relevant destination platform's terms."],
      ["Changing external information", "Prices, stock, variants, descriptions, photos, services, storage rules and routes can change. A card or article is not a live quote; verify the destination before acting."],
      ["No guarantee", "Links, images and checklists do not guarantee authenticity, legality, quality, fit, availability, delivery, customs clearance or an outcome. QC photos cannot prove every characteristic."],
      ["Responsible and lawful use", "You are responsible for platform rules, laws, intellectual-property requirements, import restrictions, declarations and tax obligations applying to you and the destination."],
      ["Errors and availability", "Reasonable efforts are made to keep information clear, but errors or temporary unavailability can occur. Material corrections will be reviewed through the public channel after formal launch."],
    ],
  },
  es: {
    eyebrow: "TÉRMINOS / ACTUALIZADOS 2026-07-26",
    title: "Términos y aviso editorial.",
    intro:
      "Al usar el sitio aceptas que es un recurso independiente de información y descubrimiento, no un vendedor, agente, almacén o transportista.",
    crumb: "Términos",
    sections: [
      ["Servicio informativo independiente", "Lolobuy Sheet no pertenece, no está operado, respaldado o patrocinado por Lolobuy, marketplaces o vendedores. Los nombres se usan para identificación y comentario."],
      ["Sin contrato de venta, inspección o envío", "El sitio no vende, cobra, inspecciona, transporta ni crea contratos de pedido. La transacción sigue las condiciones de la plataforma de destino."],
      ["Información externa cambiante", "Precios, stock, variantes, fotos, servicios, almacenamiento y rutas pueden cambiar. Una tarjeta o artículo no es una cotización actual."],
      ["Sin garantía", "Enlaces, imágenes y listas no garantizan autenticidad, legalidad, calidad, ajuste, disponibilidad, entrega o aduanas. Las fotos QC tienen límites."],
      ["Uso responsable y legal", "Eres responsable de reglas de plataforma, leyes, propiedad intelectual, restricciones de importación, declaraciones e impuestos aplicables."],
      ["Errores y disponibilidad", "Se intenta mantener la información clara, pero puede haber errores o interrupciones. Las correcciones materiales se revisarán mediante el canal público."],
    ],
  },
  de: {
    eyebrow: "BEDINGUNGEN / AKTUALISIERT 2026-07-26",
    title: "Bedingungen und redaktioneller Hinweis.",
    intro:
      "Mit der Nutzung erkennst du die Seite als unabhängige Informations- und Suchhilfe an, nicht als Verkäufer, Agent, Lager oder Frachtführer.",
    crumb: "Bedingungen",
    sections: [
      ["Unabhängiger Informationsdienst", "Lolobuy Sheet gehört weder zu Lolobuy noch zu genannten Marktplätzen oder Verkäufern und wird von ihnen nicht betrieben oder unterstützt. Namen dienen der Identifikation."],
      ["Kein Verkaufs-, Prüf- oder Versandvertrag", "Die Seite verkauft nicht, nimmt keine Zahlung an, prüft keine Lagerartikel und organisiert keinen Transport. Es gelten die Bedingungen der Zielplattform."],
      ["Veränderliche externe Angaben", "Preise, Bestand, Varianten, Fotos, Leistungen, Lagerregeln und Routen können sich ändern. Karte oder Artikel sind kein Live-Angebot."],
      ["Keine Garantie", "Links, Bilder und Checklisten garantieren weder Echtheit, Legalität, Qualität, Passform, Bestand, Zustellung noch Zollabfertigung."],
      ["Verantwortliche und rechtmäßige Nutzung", "Du bist für Plattformregeln, Gesetze, Schutzrechte, Einfuhrbeschränkungen, Erklärungen und Steuern verantwortlich."],
      ["Fehler und Verfügbarkeit", "Trotz angemessener Sorgfalt können Fehler oder Ausfälle auftreten. Wesentliche Korrekturen werden über den öffentlichen Kanal geprüft."],
    ],
  },
  fr: {
    eyebrow: "CONDITIONS / MISES À JOUR 2026-07-26",
    title: "Conditions et avertissement éditorial.",
    intro:
      "En utilisant ce site, vous reconnaissez qu'il s'agit d'une ressource indépendante, non d'un vendeur, agent, entrepôt ou transporteur.",
    crumb: "Conditions",
    sections: [
      ["Service d'information indépendant", "Lolobuy Sheet n'est ni détenu, ni exploité, ni approuvé, ni sponsorisé par Lolobuy, les marketplaces ou vendeurs cités. Les noms servent à l'identification."],
      ["Aucun contrat de vente, inspection ou expédition", "Le site ne vend pas, n'encaisse pas, n'inspecte pas et n'organise pas le transport. Les transactions suivent les conditions de la plateforme cible."],
      ["Informations externes changeantes", "Prix, stock, variantes, photos, services, stockage et routes peuvent changer. Une carte ou un article n'est pas un devis actuel."],
      ["Aucune garantie", "Liens, images et listes ne garantissent authenticité, légalité, qualité, taille, disponibilité, livraison ou dédouanement. Les photos QC ont des limites."],
      ["Usage responsable et légal", "Vous êtes responsable des règles, lois, propriété intellectuelle, restrictions d'importation, déclarations et taxes applicables."],
      ["Erreurs et disponibilité", "Malgré des efforts raisonnables, erreurs ou interruptions sont possibles. Les corrections importantes seront examinées via le canal public."],
    ],
  },
  it: {
    eyebrow: "TERMINI / AGGIORNATI 2026-07-26",
    title: "Termini e avvertenza editoriale.",
    intro:
      "Usando il sito riconosci che è una risorsa indipendente di informazione e scoperta, non venditore, agente, magazzino o vettore.",
    crumb: "Termini",
    sections: [
      ["Servizio informativo indipendente", "Lolobuy Sheet non è posseduto, gestito, approvato o sponsorizzato da Lolobuy, marketplace o venditori citati. I nomi servono a identificazione e commento."],
      ["Nessun contratto di vendita, ispezione o spedizione", "Il sito non vende, incassa, ispeziona o organizza trasporto. Le transazioni seguono i termini della piattaforma di destinazione."],
      ["Informazioni esterne variabili", "Prezzi, stock, varianti, foto, servizi, deposito e rotte possono cambiare. Una scheda o articolo non è un preventivo attuale."],
      ["Nessuna garanzia", "Link, immagini e liste non garantiscono autenticità, legalità, qualità, vestibilità, disponibilità, consegna o sdoganamento. Le foto QC hanno limiti."],
      ["Uso responsabile e legale", "Sei responsabile di regole, leggi, proprietà intellettuale, restrizioni d'importazione, dichiarazioni e tasse applicabili."],
      ["Errori e disponibilità", "Nonostante ragionevoli sforzi, possono esserci errori o interruzioni. Le correzioni sostanziali saranno valutate tramite il canale pubblico."],
    ],
  },
} as const;
