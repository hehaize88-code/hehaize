import type {
  CategoryGuideConfig,
  CategoryGuideText,
  CategoryGuideSlug,
} from "./category-guide-data";
import type { Locale } from "./i18n";
import type { ProductKind } from "./site-data";

type Detail = {
  name: string;
  singular: string;
  measurements: string;
  visibleDetails: string;
  packing: string;
};

type GuideSeed = {
  slug: CategoryGuideSlug;
  image: string;
  directoryHref: string;
  productKinds: ProductKind[];
  details: Record<Locale, Detail>;
};

type Template = {
  eyebrow: string;
  title: string;
  metaTitle: string;
  description: string;
  intro: string[];
  orderTitle: string;
  orderIntro: string;
  orderChecks: [string, string][];
  qcTitle: string;
  qcIntro: string;
  qcChecks: [string, string][];
  costTitle: string;
  costTail: string;
  productsTitle: string;
  productsIntro: string;
  openDirectory: string;
  viewProduct: string;
  faqTitle: string;
  faqs: [string, string][];
};

const templates: Record<Locale, Template> = {
  en: {
    eyebrow: "LOLOBUY {NAME} SPREADSHEET",
    title: "Lolobuy {name} Spreadsheet: Finds, Size & QC Guide",
    metaTitle: "Lolobuy {name}: Spreadsheet, Size & QC",
    description: "Browse Lolobuy {lower} finds with sizing, warehouse QC and packing checks before verifying the live listing, source price and current availability.",
    intro: [
      "A useful {lower} directory connects discovery with a repeatable decision process. Shortlist a live listing, then confirm its selected option, current price and seller-controlled details before paying.",
      "For this category, record {measurements}. Compare the seller's method with an item that already fits or serves the same purpose; a label or directory image cannot replace those measurements.",
      "LoloBuy publicly describes warehouse inspection and photographs. Those images can document {details}, but they cannot prove hidden composition, authenticity, durability or future performance.",
    ],
    orderTitle: "Four checks before submitting a {singular} link",
    orderIntro: "The spreadsheet helps with discovery; the live source page and generated order record control the purchase.",
    orderChecks: [
      ["Exact option", "Save the selected {singular}, colour, size or version, quantity and every piece explicitly included."],
      ["Decisive measurements", "Record {measurements}, including the seller's measurement method and expected tolerance."],
      ["Claims versus evidence", "Treat material, weight, finish and performance wording as seller claims until the physical arrival provides checkable evidence."],
      ["Saved record", "Keep the source URL, option, chart, price and non-negotiable details together for the warehouse comparison."],
    ],
    qcTitle: "Review {lower} QC photos in a fixed order",
    qcIntro: "Confirm identity and measurements before judging small cosmetic differences.",
    qcChecks: [
      ["Identity", "Match the ordered {singular}, colour, labelled size or version, quantity and included pieces."],
      ["Measurements", "Check the ruler position and compare {measurements} with the saved seller chart or reference item."],
      ["Category details", "Inspect {details} across every useful angle rather than relying on one flattering image."],
      ["Condition and action", "Look for visible damage or missing parts, then separate normal variation from a mismatch that changes fit, function or the ordered specification."],
    ],
    costTitle: "Plan packing and route eligibility for {lower}",
    costTail: "A dependable quote requires packed weight, dimensions, destination, eligible routes and current protection terms. Keep product price, China-side delivery, packing, freight and destination charges separate.",
    productsTitle: "Current {lower} finds in this directory",
    productsIntro: "Open an independent product page first, then confirm the current destination listing before ordering.",
    openDirectory: "Open the current {lower} directory",
    viewProduct: "Review product",
    faqTitle: "Lolobuy {lower} questions",
    faqs: [
      ["Which measurements matter for {lower}?", "Start with {measurements}. Use the seller's stated method and compare it with a known item instead of converting only from a size label."],
      ["Can warehouse photos prove material or authenticity?", "No. They document visible identity, construction and condition; they do not prove hidden composition, origin, durability or authenticity."],
      ["Is international shipping fixed on the product page?", "No. Compare the packed parcel weight, dimensions, destination and currently eligible routes."],
    ],
  },
  es: {
    eyebrow: "SPREADSHEET LOLOBUY · {NAME}",
    title: "Spreadsheet Lolobuy de {lower}: productos, talla y QC",
    metaTitle: "{name} Lolobuy: spreadsheet y guía QC",
    description: "Explora {lower} Lolobuy con controles de talla, QC y embalaje antes de verificar el anuncio, el precio y la disponibilidad actuales.",
    intro: [
      "Un directorio útil de {lower} conecta descubrimiento y decisión. Elige varias fichas y confirma opción, precio y datos actuales antes de pagar.",
      "En esta categoría, registra {measurements}. Compara el método del vendedor con un artículo que ya te quede bien o cumpla la misma función.",
      "LoloBuy describe públicamente inspección y fotos en almacén. Pueden documentar {details}, pero no prueban composición, autenticidad, durabilidad o rendimiento futuro.",
    ],
    orderTitle: "Cuatro controles antes de enviar un enlace de {singular}",
    orderIntro: "El spreadsheet ayuda a descubrir; la ficha actual y el pedido generado controlan la compra.",
    orderChecks: [
      ["Opción exacta", "Guarda {singular}, color, talla o versión, cantidad y todas las piezas incluidas."],
      ["Medidas decisivas", "Registra {measurements}, junto con el método y la tolerancia indicados."],
      ["Afirmación y prueba", "Material, peso, acabado y rendimiento son afirmaciones del vendedor hasta tener pruebas físicas."],
      ["Registro guardado", "Conserva URL, opción, tabla, precio y detalles esenciales para compararlos con la llegada al almacén."],
    ],
    qcTitle: "Revisa las fotos QC de {lower} en orden",
    qcIntro: "Confirma identidad y medidas antes de juzgar pequeñas diferencias cosméticas.",
    qcChecks: [
      ["Identidad", "Compara {singular}, color, talla o versión, cantidad y piezas incluidas."],
      ["Medidas", "Revisa la regla y compara {measurements} con la tabla o el artículo de referencia."],
      ["Detalles de categoría", "Examina {details} desde todos los ángulos útiles."],
      ["Estado y acción", "Busca daños o piezas faltantes y distingue la variación normal de un error que cambia ajuste, función o especificación."],
    ],
    costTitle: "Planifica embalaje y ruta para {lower}",
    costTail: "Una cotización fiable requiere peso y medidas embaladas, destino, rutas elegibles y protección actual. Separa precio, entrega en China, embalaje, transporte y cargos de destino.",
    productsTitle: "Productos actuales de {lower}",
    productsIntro: "Abre primero la ficha independiente y después confirma el anuncio actual.",
    openDirectory: "Abrir el directorio actual de {lower}",
    viewProduct: "Revisar producto",
    faqTitle: "Preguntas sobre {lower} en Lolobuy",
    faqs: [
      ["¿Qué medidas importan para {lower}?", "Empieza con {measurements}. Usa el método del vendedor y un artículo conocido, no solo la etiqueta."],
      ["¿Las fotos prueban material o autenticidad?", "No. Documentan identidad, construcción y estado visibles, no composición, origen, duración o autenticidad."],
      ["¿El envío internacional está fijado en la ficha?", "No. Compara peso, medidas, destino y rutas del paquete preparado."],
    ],
  },
  de: {
    eyebrow: "LOLOBUY {NAME} SPREADSHEET",
    title: "Lolobuy {name} Spreadsheet: Funde, Größe & QC",
    metaTitle: "Lolobuy {name}: Spreadsheet & QC",
    description: "Lolobuy {name} mit Größen-, Lager-QC- und Verpackungsprüfungen durchsuchen, bevor Angebot, Preis und Verfügbarkeit bestätigt werden.",
    intro: [
      "Ein nützliches Verzeichnis für {name} verbindet Produktsuche und Entscheidung. Auswahl, aktuellen Preis und Angebotsdaten vor der Zahlung prüfen.",
      "Für diese Kategorie {measurements} festhalten. Die Verkäufertabelle mit einem passenden oder gleich genutzten eigenen Artikel vergleichen.",
      "LoloBuy beschreibt öffentlich Lagerprüfung und Fotos. Sie können {details} dokumentieren, beweisen aber weder Zusammensetzung noch Echtheit, Haltbarkeit oder spätere Leistung.",
    ],
    orderTitle: "Vier Prüfungen vor dem Einreichen eines Links für {singular}",
    orderIntro: "Das Spreadsheet dient der Suche; aktuelles Angebot und erzeugter Auftrag bestimmen den Kauf.",
    orderChecks: [
      ["Genaue Auswahl", "{singular}, Farbe, Größe oder Version, Menge und enthaltene Teile speichern."],
      ["Wichtige Maße", "{measurements} samt Messmethode und genannter Toleranz festhalten."],
      ["Angabe oder Beleg", "Material, Gewicht, Oberfläche und Leistung bleiben Verkäuferangaben, bis die Ankunft prüfbare Belege liefert."],
      ["Gesicherter Datensatz", "URL, Auswahl, Tabelle, Preis und unverzichtbare Details für den Lagervergleich speichern."],
    ],
    qcTitle: "QC-Fotos für {name} in fester Reihenfolge prüfen",
    qcIntro: "Identität und Maße kommen vor kleinen kosmetischen Abweichungen.",
    qcChecks: [
      ["Identität", "{singular}, Farbe, Größenetikett oder Version, Menge und Teile abgleichen."],
      ["Maße", "Linealposition prüfen und {measurements} mit Tabelle oder Referenz vergleichen."],
      ["Kategoriedetails", "{details} aus allen nützlichen Blickwinkeln prüfen."],
      ["Zustand und Aktion", "Sichtbare Schäden oder fehlende Teile suchen und normale Abweichung von einem funktionsrelevanten Fehler trennen."],
    ],
    costTitle: "Verpackung und Route für {name} planen",
    costTail: "Ein belastbares Angebot braucht Packgewicht, Maße, Ziel, zulässige Routen und aktuelle Schutzbedingungen. Artikelpreis, China-Versand, Verpackung, Fracht und Zielkosten getrennt halten.",
    productsTitle: "Aktuelle {name}-Funde im Verzeichnis",
    productsIntro: "Zuerst die eigene Produktseite, danach das aktuelle Angebot prüfen.",
    openDirectory: "Aktuelles {name}-Verzeichnis öffnen",
    viewProduct: "Produkt prüfen",
    faqTitle: "Fragen zu Lolobuy {name}",
    faqs: [
      ["Welche Maße zählen bei {name}?", "Mit {measurements} beginnen. Verkäufertabelle und Messmethode mit einem bekannten Artikel vergleichen."],
      ["Beweisen Lagerfotos Material oder Echtheit?", "Nein. Sie zeigen sichtbare Identität, Verarbeitung und Zustand, nicht Zusammensetzung, Herkunft, Haltbarkeit oder Echtheit."],
      ["Steht der Auslandsversand auf der Produktseite fest?", "Nein. Fertiges Paket, Ziel und aktuell zulässige Route bestimmen den Vergleich."],
    ],
  },
  fr: {
    eyebrow: "SPREADSHEET LOLOBUY · {NAME}",
    title: "Spreadsheet {name} Lolobuy : produits, taille et QC",
    metaTitle: "{name} Lolobuy : spreadsheet et guide QC",
    description: "Parcourez les {lower} Lolobuy avec des contrôles de taille, de QC et d'emballage avant de confirmer l'annonce, le prix et la disponibilité.",
    intro: [
      "Un catalogue {lower} utile relie découverte et décision. Présélectionnez des fiches puis confirmez option, prix et données actuelles avant paiement.",
      "Pour cette catégorie, conservez {measurements}. Comparez la méthode du vendeur à un article connu qui convient ou remplit le même usage.",
      "LoloBuy décrit publiquement inspection et photos en entrepôt. Elles peuvent documenter {details}, sans prouver composition, authenticité, durée ou performance future.",
    ],
    orderTitle: "Quatre contrôles avant de soumettre un lien de {singular}",
    orderIntro: "Le spreadsheet aide à découvrir ; la fiche actuelle et la commande générée contrôlent l'achat.",
    orderChecks: [
      ["Option exacte", "Gardez {singular}, couleur, taille ou version, quantité et pièces incluses."],
      ["Mesures décisives", "Notez {measurements}, la méthode du vendeur et la tolérance annoncée."],
      ["Affirmation ou preuve", "Matière, poids, finition et performance restent des affirmations vendeur avant l'arrivée physique."],
      ["Dossier conservé", "Gardez URL, option, tableau, prix et détails essentiels pour comparer l'arrivée en entrepôt."],
    ],
    qcTitle: "Examiner les photos QC de {lower} dans l'ordre",
    qcIntro: "Confirmez identité et mesures avant les petits écarts cosmétiques.",
    qcChecks: [
      ["Identité", "Comparez {singular}, couleur, taille ou version, quantité et pièces."],
      ["Mesures", "Vérifiez la règle et comparez {measurements} au tableau ou à la référence."],
      ["Détails de catégorie", "Examinez {details} sous tous les angles utiles."],
      ["État et action", "Cherchez dommages ou pièces manquantes, puis distinguez variation normale et erreur affectant coupe, fonction ou commande."],
    ],
    costTitle: "Planifier emballage et route pour {lower}",
    costTail: "Un devis fiable exige poids et dimensions emballés, destination, routes admissibles et protection actuelle. Séparez prix, livraison chinoise, emballage, fret et frais de destination.",
    productsTitle: "{name} actuellement dans ce catalogue",
    productsIntro: "Ouvrez d'abord la fiche indépendante puis confirmez l'annonce actuelle.",
    openDirectory: "Ouvrir le catalogue {lower} actuel",
    viewProduct: "Examiner le produit",
    faqTitle: "Questions Lolobuy sur {lower}",
    faqs: [
      ["Quelles mesures comptent pour {lower} ?", "Commencez par {measurements}. Comparez méthode et tableau vendeur à un article connu."],
      ["Les photos prouvent-elles matière ou authenticité ?", "Non. Elles documentent identité, construction et état visibles, pas composition, origine, durée ou authenticité."],
      ["Le fret international est-il fixé sur la fiche ?", "Non. Comparez colis préparé, destination et routes actuellement admissibles."],
    ],
  },
  it: {
    eyebrow: "SPREADSHEET LOLOBUY · {NAME}",
    title: "Spreadsheet {name} Lolobuy: prodotti, taglia e QC",
    metaTitle: "{name} Lolobuy: spreadsheet e guida QC",
    description: "Esplora {lower} Lolobuy con controlli di taglia, QC e imballaggio prima di confermare la scheda, il prezzo e la disponibilità correnti.",
    intro: [
      "Una directory utile per {lower} collega scoperta e decisione. Seleziona le schede, poi conferma opzione, prezzo e dati correnti prima del pagamento.",
      "Per questa categoria registra {measurements}. Confronta il metodo del venditore con un articolo noto che veste bene o svolge lo stesso uso.",
      "LoloBuy descrive pubblicamente ispezione e foto in magazzino. Possono documentare {details}, ma non provano composizione, autenticità, durata o prestazioni future.",
    ],
    orderTitle: "Quattro controlli prima di inviare un link per {singular}",
    orderIntro: "Lo spreadsheet serve alla scoperta; scheda corrente e ordine generato controllano l'acquisto.",
    orderChecks: [
      ["Opzione esatta", "Salva {singular}, colore, taglia o versione, quantità e pezzi inclusi."],
      ["Misure decisive", "Registra {measurements}, metodo del venditore e tolleranza dichiarata."],
      ["Dichiarazione o prova", "Materiale, peso, finitura e prestazioni restano dichiarazioni del venditore fino a prove fisiche."],
      ["Dati salvati", "Conserva URL, opzione, tabella, prezzo e dettagli essenziali per confrontare l'arrivo in magazzino."],
    ],
    qcTitle: "Controlla le foto QC di {lower} in ordine",
    qcIntro: "Conferma identità e misure prima delle piccole differenze estetiche.",
    qcChecks: [
      ["Identità", "Confronta {singular}, colore, taglia o versione, quantità e pezzi."],
      ["Misure", "Controlla il righello e confronta {measurements} con tabella o riferimento."],
      ["Dettagli di categoria", "Esamina {details} da ogni angolo utile."],
      ["Condizione e azione", "Cerca danni o pezzi mancanti e separa la variazione normale da un errore che cambia vestibilità, funzione o specifica."],
    ],
    costTitle: "Pianifica imballaggio e rotta per {lower}",
    costTail: "Un preventivo affidabile richiede peso e misure imballate, destinazione, rotte idonee e protezione corrente. Separa prezzo, consegna in Cina, imballaggio, trasporto e costi di destinazione.",
    productsTitle: "{name} attuali nella directory",
    productsIntro: "Apri prima la pagina indipendente e poi conferma la scheda corrente.",
    openDirectory: "Apri la directory attuale per {lower}",
    viewProduct: "Controlla il prodotto",
    faqTitle: "Domande Lolobuy su {lower}",
    faqs: [
      ["Quali misure contano per {lower}?", "Inizia da {measurements}. Confronta metodo e tabella del venditore con un articolo noto."],
      ["Le foto provano materiale o autenticità?", "No. Documentano identità, costruzione e stato visibili, non composizione, origine, durata o autenticità."],
      ["La spedizione internazionale è fissa nella scheda?", "No. Confronta pacco preparato, destinazione e rotte attualmente idonee."],
    ],
  },
};

function interpolate(template: string, detail: Detail) {
  return template
    .replaceAll("{NAME}", detail.name.toUpperCase())
    .replaceAll("{name}", detail.name)
    .replaceAll("{lower}", detail.name.toLocaleLowerCase())
    .replaceAll("{singular}", detail.singular)
    .replaceAll("{measurements}", detail.measurements)
    .replaceAll("{details}", detail.visibleDetails);
}

function makeCopy(locale: Locale, detail: Detail): CategoryGuideText {
  const template = templates[locale];
  return {
    name: detail.name,
    eyebrow: interpolate(template.eyebrow, detail),
    title: interpolate(template.title, detail),
    metaTitle: interpolate(template.metaTitle, detail),
    description: interpolate(template.description, detail),
    intro: template.intro.map((value) => interpolate(value, detail)),
    orderTitle: interpolate(template.orderTitle, detail),
    orderIntro: template.orderIntro,
    orderChecks: template.orderChecks.map(([title, text]) => ({ title, text: interpolate(text, detail) })),
    qcTitle: interpolate(template.qcTitle, detail),
    qcIntro: template.qcIntro,
    qcChecks: template.qcChecks.map(([title, text]) => ({ title, text: interpolate(text, detail) })),
    costTitle: interpolate(template.costTitle, detail),
    costParagraphs: [detail.packing, template.costTail],
    productsTitle: interpolate(template.productsTitle, detail),
    productsIntro: template.productsIntro,
    openDirectory: interpolate(template.openDirectory, detail),
    viewProduct: template.viewProduct,
    faqTitle: interpolate(template.faqTitle, detail),
    faqs: template.faqs.map(([question, answer]) => ({ question: interpolate(question, detail), answer: interpolate(answer, detail) })),
  };
}

const locales: Locale[] = ["en", "es", "de", "fr", "it"];

function makeGuide(seed: GuideSeed): CategoryGuideConfig {
  return {
    slug: seed.slug,
    image: seed.image,
    directoryHref: seed.directoryHref,
    productKinds: seed.productKinds,
    copy: Object.fromEntries(locales.map((locale) => [locale, makeCopy(locale, seed.details[locale])])) as Record<Locale, CategoryGuideText>,
  };
}

const seeds: GuideSeed[] = [
  {
    slug: "jackets",
    image: "/products/jacket.webp",
    directoryHref: "https://www.cnbuycha.com/jackets/",
    productKinds: ["jacket"],
    details: {
      en: { name: "Jackets", singular: "jacket", measurements: "chest width, shoulder width, sleeve length and back length", visibleDetails: "closure alignment, seams, lining, fill distribution, pockets and panel shape", packing: "Padded outerwear can add substantial parcel volume. Compression may reduce dimensions but can affect shape or insulation, so compare the actual packing options before shipment." },
      es: { name: "Chaquetas", singular: "una chaqueta", measurements: "pecho, hombros, manga y largo de espalda", visibleDetails: "cierres, costuras, forro, relleno, bolsillos y forma de paneles", packing: "La ropa acolchada puede añadir mucho volumen. La compresión reduce medidas, pero puede afectar forma o aislamiento; compara las opciones reales del paquete." },
      de: { name: "Jacken", singular: "eine Jacke", measurements: "Brustweite, Schulterweite, Ärmellänge und Rückenlänge", visibleDetails: "Verschlüsse, Nähte, Futter, Füllverteilung, Taschen und Paneelform", packing: "Gepolsterte Jacken können viel Volumen erzeugen. Kompression senkt Maße, kann aber Form oder Isolierung beeinflussen; reale Packoptionen vergleichen." },
      fr: { name: "Vestes", singular: "une veste", measurements: "largeur poitrine, épaules, manches et longueur dos", visibleDetails: "fermetures, coutures, doublure, rembourrage, poches et panneaux", packing: "Une veste rembourrée augmente parfois fortement le volume. La compression réduit les dimensions mais peut affecter forme ou isolation ; comparez l'emballage réel." },
      it: { name: "Giacche", singular: "una giacca", measurements: "torace, spalle, maniche e lunghezza schiena", visibleDetails: "chiusure, cuciture, fodera, imbottitura, tasche e pannelli", packing: "Le giacche imbottite possono aumentare molto il volume. La compressione riduce le misure ma può cambiare forma o isolamento; confronta le opzioni reali." },
    },
  },
  {
    slug: "pants-shorts",
    image: "/products/cargo-pants.webp",
    directoryHref: "https://www.cnbuycha.com/pants-shorts/",
    productKinds: [],
    details: {
      en: { name: "Pants & Shorts", singular: "pants or shorts item", measurements: "waist width, front rise, inseam, thigh and leg opening", visibleDetails: "waistband shape, fly, seams, pocket alignment, hems and leg symmetry", packing: "Pants and shorts usually fold compactly, but dense fabric and bundled quantities still affect packed weight. Keep measurements and quantities clear during consolidation." },
      es: { name: "Pantalones y shorts", singular: "pantalón o short", measurements: "cintura, tiro delantero, entrepierna, muslo y abertura", visibleDetails: "cinturilla, bragueta, costuras, bolsillos, bajos y simetría", packing: "Pantalones y shorts suelen plegarse bien, pero los tejidos densos y varias unidades aumentan el peso. Mantén claras medidas y cantidades al consolidar." },
      de: { name: "Hosen & Shorts", singular: "Hosen- oder Shorts-Artikel", measurements: "Bundweite, vordere Leibhöhe, Innenbein, Oberschenkel und Beinöffnung", visibleDetails: "Bundform, Reißverschluss, Nähte, Taschen, Säume und Beinsymmetrie", packing: "Hosen und Shorts lassen sich meist kompakt falten, doch dichte Stoffe und mehrere Stücke erhöhen das Gewicht. Maße und Menge bei der Konsolidierung festhalten." },
      fr: { name: "Pantalons et shorts", singular: "un pantalon ou short", measurements: "taille, fourche avant, entrejambe, cuisse et ouverture", visibleDetails: "ceinture, braguette, coutures, poches, ourlets et symétrie", packing: "Pantalons et shorts se plient souvent facilement, mais tissus denses et quantités augmentent le poids. Gardez mesures et nombre pendant la consolidation." },
      it: { name: "Pantaloni e shorts", singular: "un pantalone o short", measurements: "vita, cavallo anteriore, interno gamba, coscia e fondo", visibleDetails: "cintura, patta, cuciture, tasche, orli e simmetria", packing: "Pantaloni e shorts si piegano bene, ma tessuti pesanti e più unità aumentano il peso. Mantieni chiare misure e quantità durante il consolidamento." },
    },
  },
  {
    slug: "headwear",
    image: "/products/cap.webp",
    directoryHref: "https://www.cnbuycha.com/headwear/",
    productKinds: ["headwear"],
    details: {
      en: { name: "Headwear", singular: "headwear item", measurements: "internal circumference, crown height, brim length and adjustment range", visibleDetails: "crown shape, panel symmetry, brim curve, embroidery, seams and adjustment hardware", packing: "Structured crowns and brims can deform under pressure. A protective pack may preserve shape but increase volume, so choose from the actual packing options." },
      es: { name: "Gorras y sombreros", singular: "artículo de cabeza", measurements: "contorno interior, altura de copa, largo de visera y rango de ajuste", visibleDetails: "forma de copa, simetría, visera, bordado, costuras y cierre", packing: "Las copas y viseras estructuradas pueden deformarse con presión. Un embalaje protector conserva la forma, pero aumenta volumen; compara las opciones reales." },
      de: { name: "Kopfbedeckungen", singular: "eine Kopfbedeckung", measurements: "Innenumfang, Kronenhöhe, Schirmlänge und Verstellbereich", visibleDetails: "Kronenform, Paneelsymmetrie, Schirmkurve, Stickerei, Nähte und Verschluss", packing: "Strukturierte Kronen und Schirme können unter Druck verformen. Schutz erhält die Form, erhöht aber das Volumen; konkrete Packoptionen vergleichen." },
      fr: { name: "Casquettes et chapeaux", singular: "un couvre-chef", measurements: "tour intérieur, hauteur de calotte, longueur de visière et réglage", visibleDetails: "forme de calotte, symétrie, visière, broderie, coutures et réglage", packing: "Calottes et visières structurées peuvent se déformer sous pression. Une protection conserve la forme mais augmente le volume ; comparez l'emballage réel." },
      it: { name: "Cappelli e berretti", singular: "un copricapo", measurements: "circonferenza interna, altezza corona, lunghezza visiera e regolazione", visibleDetails: "forma della corona, simmetria, visiera, ricamo, cuciture e chiusura", packing: "Corone e visiere strutturate possono deformarsi sotto pressione. La protezione conserva la forma ma aumenta il volume; confronta l'imballaggio reale." },
    },
  },
  {
    slug: "accessories",
    image: "/products/accessories.webp",
    directoryHref: "https://www.cnbuycha.com/accessories/",
    productKinds: ["eyewear"],
    details: {
      en: { name: "Accessories", singular: "accessory", measurements: "overall dimensions, opening or strap range, attachment size and compatibility measurements", visibleDetails: "fasteners, edges, finish, alignment, moving parts and every detachable piece", packing: "Small accessories are easy to omit during consolidation, while rigid or fragile pieces need protection. Confirm the item count and route eligibility for the actual materials." },
      es: { name: "Accesorios", singular: "accesorio", measurements: "dimensiones, apertura o correa, tamaño de unión y compatibilidad", visibleDetails: "cierres, bordes, acabado, alineación, partes móviles y piezas desmontables", packing: "Los accesorios pequeños pueden faltar al consolidar y los rígidos o frágiles necesitan protección. Confirma cantidad y elegibilidad según los materiales reales." },
      de: { name: "Accessoires", singular: "ein Accessoire", measurements: "Gesamtmaße, Öffnungs- oder Riemenbereich, Anschlussgröße und Kompatibilitätsmaße", visibleDetails: "Verschlüsse, Kanten, Oberfläche, Ausrichtung, bewegliche und abnehmbare Teile", packing: "Kleine Accessoires fehlen leicht bei der Konsolidierung; starre oder zerbrechliche Teile brauchen Schutz. Stückzahl und Materialzulassung bestätigen." },
      fr: { name: "Accessoires", singular: "un accessoire", measurements: "dimensions, ouverture ou sangle, fixation et compatibilité", visibleDetails: "attaches, bords, finition, alignement, pièces mobiles et détachables", packing: "Les petits accessoires peuvent manquer à la consolidation ; les pièces rigides ou fragiles exigent une protection. Confirmez quantité et admissibilité des matières." },
      it: { name: "Accessori", singular: "un accessorio", measurements: "dimensioni, apertura o cinturino, attacco e compatibilità", visibleDetails: "chiusure, bordi, finitura, allineamento, parti mobili e removibili", packing: "Gli accessori piccoli possono mancare nel consolidamento; quelli rigidi o fragili richiedono protezione. Conferma quantità e idoneità dei materiali." },
    },
  },
  {
    slug: "t-shirts",
    image: "/products/sweatshirt.webp",
    directoryHref: "https://www.cnbuycha.com/t-shirts/",
    productKinds: [],
    details: {
      en: { name: "T-Shirts", singular: "T-shirt", measurements: "chest width, shoulder width, sleeve length and total length", visibleDetails: "collar shape, print or embroidery scale, placement, seams, hems and panel alignment", packing: "T-shirts usually pack efficiently, but several dense garments can add weight. Keep each size and design identifiable when consolidating similar items." },
      es: { name: "Camisetas", singular: "camiseta", measurements: "pecho, hombros, manga y largo total", visibleDetails: "cuello, escala y posición del estampado o bordado, costuras, bajos y paneles", packing: "Las camisetas se embalan con eficiencia, pero varias prendas densas suman peso. Mantén cada talla y diseño identificables durante la consolidación." },
      de: { name: "T-Shirts", singular: "ein T-Shirt", measurements: "Brustweite, Schulterweite, Ärmellänge und Gesamtlänge", visibleDetails: "Kragenform, Größe und Position von Druck oder Stickerei, Nähte, Säume und Paneele", packing: "T-Shirts lassen sich effizient packen, doch mehrere schwere Stoffe erhöhen das Gewicht. Größe und Motiv bei ähnlichen Teilen eindeutig halten." },
      fr: { name: "T-shirts", singular: "un T-shirt", measurements: "poitrine, épaules, manches et longueur totale", visibleDetails: "col, échelle et position du motif ou de la broderie, coutures, ourlets et panneaux", packing: "Les T-shirts se rangent efficacement, mais plusieurs tissus denses ajoutent du poids. Gardez taille et motif identifiables pendant la consolidation." },
      it: { name: "T-shirt", singular: "una T-shirt", measurements: "torace, spalle, maniche e lunghezza totale", visibleDetails: "collo, scala e posizione di stampa o ricamo, cuciture, orli e pannelli", packing: "Le T-shirt si imballano bene, ma più tessuti pesanti aumentano il peso. Mantieni riconoscibili taglia e grafica durante il consolidamento." },
    },
  },
  {
    slug: "jersey",
    image: "/products/jersey.webp",
    directoryHref: "https://www.cnbuycha.com/Jersey/",
    productKinds: [],
    details: {
      en: { name: "Jersey", singular: "jersey", measurements: "chest width, total length, sleeve length and labelled size", visibleDetails: "team and season details, badges, sponsor marks, name and number placement, seams and collar", packing: "Jerseys are usually light, but heat-applied names, numbers and badges can crease or stick under pressure. Protect printed surfaces and confirm route eligibility." },
      es: { name: "Jerseys", singular: "jersey", measurements: "pecho, largo total, manga y talla de etiqueta", visibleDetails: "equipo y temporada, escudos, patrocinadores, nombre y número, costuras y cuello", packing: "Los jerseys pesan poco, pero nombres, números y escudos aplicados con calor pueden arrugarse o pegarse. Protege las superficies y confirma la ruta." },
      de: { name: "Trikots", singular: "ein Trikot", measurements: "Brustweite, Gesamtlänge, Ärmellänge und Größenetikett", visibleDetails: "Team, Saison, Abzeichen, Sponsoren, Name und Nummer, Nähte und Kragen", packing: "Trikots sind meist leicht, aber aufgebrachte Namen, Nummern und Abzeichen können unter Druck knittern oder kleben. Oberflächen schützen und Route prüfen." },
      fr: { name: "Maillots", singular: "un maillot", measurements: "poitrine, longueur, manches et taille d'étiquette", visibleDetails: "équipe, saison, badges, sponsors, nom et numéro, coutures et col", packing: "Les maillots sont légers, mais noms, numéros et badges thermocollés peuvent se froisser ou coller sous pression. Protégez les motifs et vérifiez la route." },
      it: { name: "Maglie sportive", singular: "una maglia sportiva", measurements: "torace, lunghezza totale, maniche e taglia in etichetta", visibleDetails: "squadra, stagione, stemmi, sponsor, nome e numero, cuciture e collo", packing: "Le maglie sono leggere, ma nomi, numeri e stemmi applicati a caldo possono piegarsi o attaccarsi. Proteggi le stampe e verifica la rotta." },
    },
  },
];

export const additionalCategoryGuides = seeds.map(makeGuide);
