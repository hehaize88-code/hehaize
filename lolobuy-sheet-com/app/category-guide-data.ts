import type { Locale } from "./i18n";
import type { ProductKind } from "./site-data";

export type CategoryGuideSlug = "shoes" | "hoodies-sweaters" | "bags";

type Check = {
  title: string;
  text: string;
};

type Faq = {
  question: string;
  answer: string;
};

type CategoryGuideText = {
  name: string;
  eyebrow: string;
  title: string;
  metaTitle: string;
  description: string;
  intro: string[];
  orderTitle: string;
  orderIntro: string;
  orderChecks: Check[];
  qcTitle: string;
  qcIntro: string;
  qcChecks: Check[];
  costTitle: string;
  costParagraphs: string[];
  productsTitle: string;
  productsIntro: string;
  openDirectory: string;
  viewProduct: string;
  faqTitle: string;
  faqs: Faq[];
};

export type CategoryGuide = CategoryGuideText & {
  slug: CategoryGuideSlug;
  image: string;
  directoryHref: string;
  productKinds: ProductKind[];
};

type CategoryGuideConfig = {
  slug: CategoryGuideSlug;
  image: string;
  directoryHref: string;
  productKinds: ProductKind[];
  copy: Record<Locale, CategoryGuideText>;
};

const categoryGuides: CategoryGuideConfig[] = [
  {
    slug: "shoes",
    image: "/products/sneakers.webp",
    directoryHref: "https://www.cnbuycha.com/shoes/",
    productKinds: ["shoes"],
    copy: {
      en: {
        name: "Shoes",
        eyebrow: "LOLOBUY SHOES SPREADSHEET",
        title: "Find shoes, then verify the pair you will actually receive.",
        metaTitle: "Lolobuy Shoes Spreadsheet: Size & QC Guide",
        description:
          "Browse Lolobuy shoe finds with a practical size, listing and warehouse-QC checklist for sneakers, slides and other footwear.",
        intro: [
          "A shoes landing page should do more than place several product cards under one heading. The useful part is the decision trail: identify a live listing, select the exact colour and size, save the seller evidence, and inspect the physical pair after it reaches the warehouse.",
          "Size labels are not measurements. Two sellers can use the same EU, UK or US number for different internal lengths, and a translated variant can hide whether the option is a shoe size, colour or deposit. Compare the seller chart with a pair that already fits and record the measurement method before paying.",
          "LoloBuy publicly describes warehouse inspection and photographs, but its public homepage does not publish a universal number of free images, a guaranteed measurement service or one return rule for every seller. Use the evidence attached to the current order and act before international shipping.",
        ],
        orderTitle: "Five checks before submitting a shoe link",
        orderIntro:
          "Treat the spreadsheet entry as discovery. The live seller page and the order created from it control the actual purchase.",
        orderChecks: [
          { title: "Confirm the exact variant", text: "Match colour, model, batch or version, labelled size and quantity. Do not assume the first image is the selected option." },
          { title: "Translate size into length", text: "Compare the seller chart with the insole or foot measurement used by that listing and with a shoe you already wear." },
          { title: "Read the whole listing", text: "Check whether the displayed price belongs to the shoe, an accessory, a deposit or a different variant." },
          { title: "Save the evidence", text: "Keep the source URL, selected option, chart, visible price and any non-negotiable detail with the order record." },
          { title: "Budget beyond the item price", text: "Allow for China-side delivery, packed weight or volume, international freight and destination charges." },
        ],
        qcTitle: "Review warehouse shoe photos in a fixed order",
        qcIntro:
          "Start with identity and sizing before examining small cosmetic details. A perfect stitch does not compensate for a mismatched pair.",
        qcChecks: [
          { title: "Identity", text: "Confirm model, colour, labelled size, quantity and any pieces explicitly included in the listing." },
          { title: "The pair", text: "Check that left and right shoes match and compare size labels, overall length, colour and construction." },
          { title: "Shape", text: "Compare toe boxes, heel height, panel alignment and symmetry across more than one angle." },
          { title: "Construction", text: "Inspect seams, glue, edges, eyelets, closures and obvious stains, tears or deformation." },
          { title: "Soles and measurements", text: "Check outsole attachment and request only the specific measurement that could change your decision when that option is available." },
        ],
        costTitle: "Shoe boxes can change the shipping calculation",
        costParagraphs: [
          "Footwear is relatively dense, while retail-style boxes add volume. Removing a box may reduce packed dimensions but also removes structure and protection. Decide from the actual packing options and route rules rather than assuming that one choice is always cheaper.",
          "International cost becomes meaningful only after packed weight, dimensions and eligible routes are shown. Taxes, import restrictions and declarations depend on the destination. A spreadsheet price is therefore a product-discovery figure, not a delivered total.",
        ],
        productsTitle: "Current shoe finds in this directory",
        productsIntro:
          "Open the internal product page first, then continue to the current listing to recheck price, option and availability.",
        openDirectory: "Open the complete current shoe directory",
        viewProduct: "Review product details",
        faqTitle: "Lolobuy shoe questions",
        faqs: [
          { question: "Does the Lolobuy shoe size label guarantee fit?", answer: "No. Use the seller's measurement method and compare it with a shoe that fits. A label alone cannot account for last shape, lining or measurement differences." },
          { question: "Should I ask for an insole measurement?", answer: "Ask for a targeted measurement only when it is available and could change the decision. First check whether the seller chart already explains its method." },
          { question: "Can QC photos prove shoe authenticity?", answer: "No. They can document visible identity, size labels, construction and damage, but they do not prove origin, material composition, durability or authenticity." },
          { question: "Is shipping with the shoe box always better?", answer: "No. A box may add protection and volume. Compare the actual packing choice, parcel dimensions, route eligibility and your tolerance for transit damage." },
        ],
      },
      es: {
        name: "Calzado",
        eyebrow: "SPREADSHEET DE CALZADO LOLOBUY",
        title: "Encuentra calzado y verifica el par que realmente recibirás.",
        metaTitle: "Spreadsheet de calzado Lolobuy: talla y QC",
        description: "Explora calzado Lolobuy con una lista práctica para talla, ficha actual y control QC de almacén.",
        intro: [
          "Una página de calzado debe explicar el recorrido completo: encontrar una ficha, elegir color y talla, guardar la prueba del vendedor y revisar el par físico cuando llegue al almacén.",
          "La etiqueta de talla no es una medida. Compara la tabla del vendedor con un par que ya te quede bien y anota si la ficha usa largo interior, pie o suela.",
          "LoloBuy anuncia inspección y fotografías en almacén, pero su página pública no fija un número universal de fotos, una medición garantizada o una única regla de devolución. Usa las pruebas del pedido actual.",
        ],
        orderTitle: "Cinco controles antes de enviar un enlace de calzado",
        orderIntro: "Usa el spreadsheet para descubrir; la ficha actual y el pedido generado controlan la compra.",
        orderChecks: [
          { title: "Variante exacta", text: "Confirma color, modelo, versión, talla y cantidad; la primera imagen puede no ser la opción elegida." },
          { title: "Talla convertida en medida", text: "Compara la tabla y su método con un zapato que ya uses." },
          { title: "Ficha completa", text: "Comprueba si el precio corresponde al calzado, un accesorio, depósito u otra variante." },
          { title: "Pruebas guardadas", text: "Conserva URL, opción, tabla, precio y cualquier detalle imprescindible." },
          { title: "Coste total", text: "Añade entrega en China, peso o volumen embalado, transporte y cargos de destino." },
        ],
        qcTitle: "Revisa las fotos QC en un orden fijo",
        qcIntro: "Empieza por identidad y talla antes de los detalles cosméticos.",
        qcChecks: [
          { title: "Identidad", text: "Confirma modelo, color, talla, cantidad y piezas expresamente incluidas." },
          { title: "El par", text: "Comprueba que izquierda y derecha coincidan y compara etiquetas, largo, color y construcción." },
          { title: "Forma", text: "Compara puntera, talón, paneles y simetría desde varios ángulos." },
          { title: "Construcción", text: "Revisa costuras, pegamento, bordes, ojales, cierres y daños visibles." },
          { title: "Suelas y medidas", text: "Comprueba la unión de la suela y solicita solo la medida decisiva cuando esté disponible." },
        ],
        costTitle: "La caja puede cambiar el cálculo de envío",
        costParagraphs: [
          "El calzado es denso y la caja añade volumen. Retirarla puede reducir dimensiones, pero también protección. Decide con las opciones reales del paquete y la ruta.",
          "El coste internacional solo es fiable con peso, medidas y rutas elegibles del paquete. Impuestos, restricciones y declaración dependen del destino.",
        ],
        productsTitle: "Calzado actual en este directorio",
        productsIntro: "Abre primero la ficha interna y después confirma precio, opción y disponibilidad actuales.",
        openDirectory: "Abrir el directorio completo de calzado",
        viewProduct: "Revisar producto",
        faqTitle: "Preguntas sobre calzado Lolobuy",
        faqs: [
          { question: "¿La talla garantiza el ajuste?", answer: "No. Compara el método del vendedor con un zapato que te quede bien; la etiqueta no refleja forma, forro o diferencias de medición." },
          { question: "¿Conviene pedir una medida interior?", answer: "Solo si está disponible y puede cambiar tu decisión. Revisa primero cómo mide el vendedor." },
          { question: "¿Las fotos QC prueban autenticidad?", answer: "No. Documentan detalles visibles, no origen, composición, durabilidad o autenticidad." },
          { question: "¿Es mejor enviar siempre con caja?", answer: "No. La caja añade protección y volumen; compara el paquete, la ruta y el riesgo de daño." },
        ],
      },
      de: {
        name: "Schuhe",
        eyebrow: "LOLOBUY SCHUH-SPREADSHEET",
        title: "Schuhe finden und das tatsächlich gelieferte Paar prüfen.",
        metaTitle: "Lolobuy Schuhe Spreadsheet: Größe & QC",
        description: "Lolobuy-Schuhfunde mit praktischer Größen-, Angebots- und Lager-QC-Checkliste durchsuchen.",
        intro: [
          "Eine gute Schuhseite zeigt den ganzen Entscheidungsweg: Angebot finden, Farbe und Größe wählen, Verkäuferbelege sichern und das eingetroffene Paar im Lager prüfen.",
          "Eine Größenangabe ist kein Maß. Verkäufer können dieselbe EU-, UK- oder US-Zahl unterschiedlich auslegen. Maßtabelle und Methode mit einem passenden eigenen Schuh vergleichen.",
          "LoloBuy beschreibt öffentlich Lagerprüfung und Fotos, veröffentlicht aber keine allgemeine Fotozahl, garantierte Messung oder einheitliche Rückgaberegel. Es zählen die aktuellen Auftragsdaten.",
        ],
        orderTitle: "Fünf Prüfungen vor dem Einreichen eines Schuhlinks",
        orderIntro: "Das Spreadsheet dient der Entdeckung; Angebot und erzeugter Auftrag bestimmen den Kauf.",
        orderChecks: [
          { title: "Genaue Variante", text: "Farbe, Modell, Version, Größe und Menge abgleichen; das erste Bild ist nicht zwingend die Auswahl." },
          { title: "Größe als Maß", text: "Verkäufermethode und Tabelle mit einem passenden eigenen Schuh vergleichen." },
          { title: "Gesamtes Angebot", text: "Prüfen, ob der Preis für Schuh, Zubehör, Anzahlung oder andere Variante gilt." },
          { title: "Belege sichern", text: "URL, Auswahl, Tabelle, Preis und unverzichtbare Details speichern." },
          { title: "Gesamtkosten", text: "China-Versand, Packgewicht oder Volumen, Auslandsfracht und Zielkosten einplanen." },
        ],
        qcTitle: "Lagerfotos in fester Reihenfolge prüfen",
        qcIntro: "Identität und Größe kommen vor kleinen kosmetischen Details.",
        qcChecks: [
          { title: "Identität", text: "Modell, Farbe, Größenetikett, Menge und ausdrücklich enthaltene Teile bestätigen." },
          { title: "Das Paar", text: "Links und rechts abgleichen sowie Etiketten, Länge, Farbe und Aufbau vergleichen." },
          { title: "Form", text: "Zehenbox, Ferse, Paneele und Symmetrie aus mehreren Winkeln prüfen." },
          { title: "Verarbeitung", text: "Nähte, Kleber, Kanten, Ösen, Verschlüsse und sichtbare Schäden prüfen." },
          { title: "Sohle und Maße", text: "Sohlenverbindung prüfen und nur entscheidende Maße anfordern, wenn verfügbar." },
        ],
        costTitle: "Schuhkartons verändern das Versandgewicht",
        costParagraphs: [
          "Schuhe sind dicht, Kartons erhöhen das Volumen. Entfernen kann Maße senken, aber Schutz kosten. Die konkrete Packoption und Route entscheiden.",
          "Ein belastbarer Auslandsbetrag entsteht erst mit Packgewicht, Maßen und zulässigen Routen. Steuern und Einfuhrregeln hängen vom Ziel ab.",
        ],
        productsTitle: "Aktuelle Schuhfunde im Verzeichnis",
        productsIntro: "Zuerst die interne Produktseite öffnen, danach Preis, Option und Bestand aktuell prüfen.",
        openDirectory: "Vollständiges Schuhverzeichnis öffnen",
        viewProduct: "Produkt prüfen",
        faqTitle: "Fragen zu Lolobuy-Schuhen",
        faqs: [
          { question: "Garantiert die Größe eine passende Form?", answer: "Nein. Messmethode und Tabelle mit einem passenden Schuh vergleichen; Etiketten erfassen Leisten und Futter nicht." },
          { question: "Sollte ich die Innensohle messen lassen?", answer: "Nur wenn die Option verfügbar ist und das Ergebnis die Entscheidung beeinflusst. Zuerst die Verkäufertabelle prüfen." },
          { question: "Beweisen QC-Fotos Echtheit?", answer: "Nein. Sie zeigen sichtbare Details, nicht Herkunft, Material, Haltbarkeit oder Echtheit." },
          { question: "Ist Versand mit Karton immer besser?", answer: "Nein. Kartons bringen Schutz und Volumen. Packdaten, Route und Schadensrisiko vergleichen." },
        ],
      },
      fr: {
        name: "Chaussures",
        eyebrow: "SPREADSHEET CHAUSSURES LOLOBUY",
        title: "Trouvez des chaussures puis contrôlez la paire réellement reçue.",
        metaTitle: "Spreadsheet chaussures Lolobuy : taille et QC",
        description: "Parcourez les chaussures Lolobuy avec une liste de contrôle pour taille, fiche et QC d'entrepôt.",
        intro: [
          "Une bonne page chaussures couvre tout le parcours : trouver la fiche, choisir couleur et taille, conserver les preuves du vendeur et examiner la paire arrivée.",
          "Une étiquette de taille n'est pas une mesure. Comparez la méthode et le tableau du vendeur avec une paire qui vous va.",
          "LoloBuy décrit inspection et photos en entrepôt, sans publier un nombre universel d'images, une mesure garantie ou une règle de retour unique. Utilisez le dossier réel.",
        ],
        orderTitle: "Cinq contrôles avant de soumettre un lien",
        orderIntro: "Le spreadsheet sert à découvrir ; la fiche actuelle et la commande générée contrôlent l'achat.",
        orderChecks: [
          { title: "Variante exacte", text: "Confirmez couleur, modèle, version, taille et quantité." },
          { title: "Taille en mesure", text: "Comparez tableau et méthode avec une chaussure qui vous va." },
          { title: "Fiche complète", text: "Vérifiez si le prix vise la chaussure, un accessoire, un acompte ou une autre option." },
          { title: "Preuves conservées", text: "Gardez URL, option, tableau, prix et détail indispensable." },
          { title: "Coût total", text: "Prévoyez livraison chinoise, poids ou volume, fret et frais de destination." },
        ],
        qcTitle: "Examiner les photos QC dans un ordre fixe",
        qcIntro: "Commencez par identité et taille avant les détails cosmétiques.",
        qcChecks: [
          { title: "Identité", text: "Confirmez modèle, couleur, taille, quantité et pièces incluses." },
          { title: "La paire", text: "Comparez gauche et droite, étiquettes, longueur, couleur et construction." },
          { title: "Forme", text: "Contrôlez avant, talon, panneaux et symétrie sous plusieurs angles." },
          { title: "Construction", text: "Examinez coutures, colle, bords, œillets, fermetures et dommages." },
          { title: "Semelles et mesures", text: "Contrôlez l'assemblage et demandez seulement la mesure décisive disponible." },
        ],
        costTitle: "La boîte peut changer le calcul d'expédition",
        costParagraphs: [
          "Les chaussures sont denses et la boîte ajoute du volume. La retirer réduit parfois les dimensions mais aussi la protection. Décidez avec le colis réel.",
          "Le coût international devient fiable avec poids, dimensions et routes admissibles. Taxes et règles d'importation dépendent du pays.",
        ],
        productsTitle: "Chaussures actuelles dans ce catalogue",
        productsIntro: "Ouvrez la fiche interne puis confirmez prix, option et disponibilité.",
        openDirectory: "Ouvrir tout le catalogue chaussures",
        viewProduct: "Examiner le produit",
        faqTitle: "Questions chaussures Lolobuy",
        faqs: [
          { question: "La taille garantit-elle le chaussant ?", answer: "Non. Comparez la méthode du vendeur avec une paire adaptée ; l'étiquette ne décrit pas forme ou doublure." },
          { question: "Faut-il demander la longueur intérieure ?", answer: "Seulement si l'option existe et peut changer la décision. Vérifiez d'abord le tableau." },
          { question: "Les photos QC prouvent-elles l'authenticité ?", answer: "Non. Elles documentent le visible, pas l'origine, la composition, la durée ou l'authenticité." },
          { question: "Faut-il toujours garder la boîte ?", answer: "Non. Elle ajoute protection et volume ; comparez colis, route et risque de dommage." },
        ],
      },
      it: {
        name: "Scarpe",
        eyebrow: "SPREADSHEET SCARPE LOLOBUY",
        title: "Trova le scarpe e controlla la coppia che riceverai davvero.",
        metaTitle: "Spreadsheet scarpe Lolobuy: taglia e QC",
        description: "Esplora scarpe Lolobuy con una lista pratica per taglia, scheda e QC di magazzino.",
        intro: [
          "Una buona pagina scarpe copre l'intero percorso: trovare la scheda, scegliere colore e taglia, salvare le prove e controllare la coppia arrivata.",
          "L'etichetta non è una misura. Confronta metodo e tabella del venditore con una scarpa che ti calza bene.",
          "LoloBuy descrive ispezione e foto in magazzino, ma non pubblica un numero universale, una misurazione garantita o una regola unica di reso. Usa i dati dell'ordine.",
        ],
        orderTitle: "Cinque controlli prima di inviare il link",
        orderIntro: "Lo spreadsheet serve alla scoperta; scheda attuale e ordine generato controllano l'acquisto.",
        orderChecks: [
          { title: "Variante esatta", text: "Conferma colore, modello, versione, taglia e quantità." },
          { title: "Taglia come misura", text: "Confronta tabella e metodo con una scarpa adatta." },
          { title: "Scheda completa", text: "Verifica se il prezzo riguarda scarpa, accessorio, deposito o altra opzione." },
          { title: "Prove salvate", text: "Conserva URL, selezione, tabella, prezzo e dettaglio indispensabile." },
          { title: "Costo totale", text: "Considera consegna cinese, peso o volume, trasporto e costi di destinazione." },
        ],
        qcTitle: "Controlla le foto QC in ordine",
        qcIntro: "Parti da identità e taglia prima dei dettagli cosmetici.",
        qcChecks: [
          { title: "Identità", text: "Conferma modello, colore, taglia, quantità e pezzi inclusi." },
          { title: "La coppia", text: "Confronta scarpa sinistra e destra, etichette, lunghezza, colore e costruzione." },
          { title: "Forma", text: "Controlla punta, tallone, pannelli e simmetria da più angoli." },
          { title: "Costruzione", text: "Esamina cuciture, colla, bordi, occhielli, chiusure e danni." },
          { title: "Suole e misure", text: "Controlla l'unione e chiedi solo la misura decisiva disponibile." },
        ],
        costTitle: "La scatola può cambiare il calcolo",
        costParagraphs: [
          "Le scarpe sono dense e la scatola aggiunge volume. Rimuoverla riduce talvolta le dimensioni ma anche la protezione.",
          "Il costo internazionale è affidabile solo con peso, misure e rotte idonee. Tasse e importazione dipendono dal paese.",
        ],
        productsTitle: "Scarpe attuali nel catalogo",
        productsIntro: "Apri la pagina interna e poi conferma prezzo, opzione e disponibilità.",
        openDirectory: "Apri il catalogo completo delle scarpe",
        viewProduct: "Controlla il prodotto",
        faqTitle: "Domande sulle scarpe Lolobuy",
        faqs: [
          { question: "La taglia garantisce la calzata?", answer: "No. Confronta il metodo con una scarpa adatta; l'etichetta non descrive forma o fodera." },
          { question: "Devo chiedere la misura interna?", answer: "Solo se disponibile e decisiva. Controlla prima la tabella del venditore." },
          { question: "Le foto QC provano autenticità?", answer: "No. Mostrano dettagli visibili, non origine, materiale, durata o autenticità." },
          { question: "La scatola è sempre migliore?", answer: "No. Aggiunge protezione e volume; confronta pacco, rotta e rischio." },
        ],
      },
    },
  },
  {
    slug: "hoodies-sweaters",
    image: "/products/hoodie.webp",
    directoryHref: "https://www.cnbuycha.com/hoodies-sweaters/",
    productKinds: ["hoodie"],
    copy: {
      en: {
        name: "Hoodies & sweaters",
        eyebrow: "LOLOBUY HOODIE FINDS",
        title: "Compare hoodie measurements, fabric and print before ordering.",
        metaTitle: "Lolobuy Hoodie Finds: Size & QC Checklist",
        description: "Browse Lolobuy hoodie finds with measurement, fabric, print-placement and warehouse-QC guidance.",
        intro: [
          "Hoodie listings often combine many colours, prints and fabrics under one page. The lowest displayed price or first photograph may belong to a different option, so a useful directory sends you back to the exact variant before any payment decision.",
          "Chest width, shoulder, sleeve and back length are more useful than S, M or L by themselves. Compare the seller chart with a hoodie measured flat in the same way, and decide whether the intended fit is close, regular or oversized.",
          "Warehouse photographs can reveal a wrong colour, labelled size, print placement, visible stain or damaged closure. They cannot prove fabric composition, long-term shrinkage, warmth, colourfastness or authenticity.",
        ],
        orderTitle: "Build a hoodie order record",
        orderIntro: "Write down the option as if another person had to purchase it without guessing.",
        orderChecks: [
          { title: "Exact design", text: "Record colour, front and back artwork, hood style, zip or pullover construction and quantity." },
          { title: "Four measurements", text: "Compare chest, shoulder, sleeve and length with a garment that fits the intended way." },
          { title: "Fabric claims", text: "Treat weight, blend, lining and wash claims as seller information, not facts proven by a directory card." },
          { title: "Variant price", text: "Select the exact size and colour before comparing the live price and China-side delivery." },
          { title: "Saved screenshots", text: "Keep the chart, selected option and artwork reference for the warehouse review." },
        ],
        qcTitle: "What to inspect in hoodie QC photos",
        qcIntro: "Review overall identity first, then construction and decoration.",
        qcChecks: [
          { title: "Identity and size", text: "Confirm colour, labelled size, zip or pullover style and whether the correct design arrived." },
          { title: "Measurements", text: "Check ruler placement and compare the decisive garment dimensions with the saved chart." },
          { title: "Print or embroidery", text: "Inspect position, scale, alignment and obvious lifting, cracking, gaps or loose threads." },
          { title: "Garment construction", text: "Review hood shape, neckline, shoulder seams, cuffs, hem, pockets and closures." },
          { title: "Visible condition", text: "Look for stains, holes, pulls, uneven panels and colour differences across available angles." },
        ],
        costTitle: "Fabric and packing affect delivered cost",
        costParagraphs: [
          "A thick fleece hoodie can weigh and pack very differently from a light sweatshirt or knit. Multiple folded garments may also increase parcel dimensions. Use the warehouse parcel data instead of a generic per-item shipping claim.",
          "If a size or print is wrong, resolve it before international shipment. The public LoloBuy homepage confirms inspection and photographs, but it does not publish one complete seller-return policy or guaranteed remedy for every mismatch.",
        ],
        productsTitle: "Current hoodie finds in this directory",
        productsIntro: "Use each internal detail page to preserve the reference before opening the current seller destination.",
        openDirectory: "Open the complete hoodie directory",
        viewProduct: "Review product details",
        faqTitle: "Lolobuy hoodie questions",
        faqs: [
          { question: "Which hoodie measurements matter most?", answer: "Chest width, shoulder, sleeve and back length are a useful starting set. Compare using the same flat-measurement method." },
          { question: "Can a QC photo prove fabric weight?", answer: "No. A photograph can show visible texture and lining, but it does not reliably prove fibre content, measured weight, warmth or shrinkage." },
          { question: "What if the print looks off-centre?", answer: "Compare it with the saved listing from similar camera angles. If the difference is material, identify the exact location and use the current order remedy before shipping." },
          { question: "Does oversized mean I should size down?", answer: "Not automatically. Compare actual garment measurements and the intended fit rather than relying on an oversized label." },
        ],
      },
      es: {
        name: "Sudaderas y jerséis",
        eyebrow: "SUDADERAS LOLOBUY",
        title: "Compara medidas, tejido y estampado antes de pedir.",
        metaTitle: "Sudaderas Lolobuy: talla y lista QC",
        description: "Explora sudaderas Lolobuy con consejos de medidas, tejido, estampado y control QC.",
        intro: [
          "Una ficha puede reunir muchos colores, estampados y tejidos. El primer precio o imagen puede corresponder a otra opción.",
          "Pecho, hombro, manga y largo son más útiles que S, M o L. Compara la tabla con una sudadera medida del mismo modo.",
          "Las fotos de almacén muestran color, talla, estampado y daños visibles, pero no prueban composición, encogimiento, abrigo o autenticidad.",
        ],
        orderTitle: "Crea un registro claro del pedido",
        orderIntro: "Anota la opción para que otra persona pueda comprarla sin adivinar.",
        orderChecks: [
          { title: "Diseño exacto", text: "Guarda color, gráfico delantero y trasero, capucha, cremallera y cantidad." },
          { title: "Cuatro medidas", text: "Compara pecho, hombro, manga y largo con una prenda adecuada." },
          { title: "Tejido", text: "Peso, mezcla, forro y lavado son afirmaciones del vendedor, no pruebas del directorio." },
          { title: "Precio de variante", text: "Selecciona talla y color antes de comparar precio y entrega nacional." },
          { title: "Capturas", text: "Conserva tabla, opción y referencia del gráfico para el QC." },
        ],
        qcTitle: "Qué revisar en las fotos QC",
        qcIntro: "Primero identidad; después construcción y decoración.",
        qcChecks: [
          { title: "Identidad y talla", text: "Confirma color, etiqueta, estilo y diseño." },
          { title: "Medidas", text: "Revisa la posición de la regla y compárala con la tabla." },
          { title: "Estampado o bordado", text: "Comprueba posición, escala, alineación y defectos visibles." },
          { title: "Construcción", text: "Revisa capucha, cuello, hombros, puños, bajo, bolsillos y cierres." },
          { title: "Estado", text: "Busca manchas, agujeros, tirones, paneles irregulares o diferencias de color." },
        ],
        costTitle: "El tejido y el embalaje cambian el coste",
        costParagraphs: [
          "Una sudadera gruesa pesa y ocupa más que una prenda ligera. Usa los datos reales del paquete, no una tarifa genérica.",
          "Resuelve talla o estampado incorrectos antes del envío. La web pública confirma inspección y fotos, no una solución universal.",
        ],
        productsTitle: "Sudaderas actuales en el directorio",
        productsIntro: "La ficha interna conserva la referencia antes de abrir el destino actual.",
        openDirectory: "Abrir el directorio completo de sudaderas",
        viewProduct: "Revisar producto",
        faqTitle: "Preguntas sobre sudaderas Lolobuy",
        faqs: [
          { question: "¿Qué medidas importan?", answer: "Pecho, hombro, manga y largo son un buen inicio. Usa el mismo método en plano." },
          { question: "¿Una foto prueba el peso del tejido?", answer: "No. Muestra textura y forro visibles, no composición, peso, abrigo o encogimiento." },
          { question: "¿Qué hago si el estampado está descentrado?", answer: "Compáralo con la ficha guardada e identifica la diferencia exacta antes del envío." },
          { question: "¿Oversize significa bajar talla?", answer: "No necesariamente. Compara medidas reales y ajuste deseado." },
        ],
      },
      de: {
        name: "Hoodies & Pullover",
        eyebrow: "LOLOBUY HOODIE-FUNDE",
        title: "Maße, Stoff und Druck vor der Bestellung vergleichen.",
        metaTitle: "Lolobuy Hoodie Funde: Größe & QC",
        description: "Lolobuy-Hoodies mit Maß-, Stoff-, Druck- und Lager-QC-Hinweisen durchsuchen.",
        intro: [
          "Ein Angebot kann viele Farben, Drucke und Stoffe verbinden. Erstes Bild und niedrigster Preis gehören möglicherweise zu einer anderen Option.",
          "Brust, Schulter, Ärmel und Rückenlänge sind hilfreicher als S, M oder L. Mit einem flach gleich gemessenen Hoodie vergleichen.",
          "Lagerfotos zeigen Farbe, Etikett, Druck und sichtbare Schäden, beweisen aber nicht Zusammensetzung, Einlaufen, Wärme oder Echtheit.",
        ],
        orderTitle: "Einen eindeutigen Hoodie-Auftrag anlegen",
        orderIntro: "Die Auswahl so notieren, dass niemand raten muss.",
        orderChecks: [
          { title: "Genaues Design", text: "Farbe, Vorder- und Rückmotiv, Kapuze, Reißverschluss und Menge sichern." },
          { title: "Vier Maße", text: "Brust, Schulter, Ärmel und Länge mit einem passenden Kleidungsstück vergleichen." },
          { title: "Stoffangaben", text: "Gewicht, Mischung, Futter und Pflege sind Verkäuferangaben, keine Verzeichnisbeweise." },
          { title: "Variantenpreis", text: "Größe und Farbe wählen, dann Preis und China-Versand vergleichen." },
          { title: "Screenshots", text: "Tabelle, Auswahl und Motiv für die Lagerprüfung speichern." },
        ],
        qcTitle: "Hoodie-QC-Fotos prüfen",
        qcIntro: "Zuerst Identität, dann Verarbeitung und Dekoration.",
        qcChecks: [
          { title: "Identität und Größe", text: "Farbe, Etikett, Stil und Motiv bestätigen." },
          { title: "Maße", text: "Linealplatzierung prüfen und mit der gespeicherten Tabelle vergleichen." },
          { title: "Druck oder Stickerei", text: "Position, Größe, Ausrichtung und sichtbare Fehler prüfen." },
          { title: "Verarbeitung", text: "Kapuze, Ausschnitt, Schultern, Bündchen, Saum, Taschen und Verschlüsse prüfen." },
          { title: "Zustand", text: "Flecken, Löcher, Ziehfäden, ungleiche Paneele und Farbabweichungen suchen." },
        ],
        costTitle: "Stoff und Packung verändern die Kosten",
        costParagraphs: [
          "Dicker Fleece wiegt und packt anders als ein leichter Sweater. Reale Paketdaten statt pauschaler Stückkosten nutzen.",
          "Falsche Größe oder Druck vor Auslandsversand klären. Öffentliche Angaben bestätigen Prüfung und Fotos, nicht jede Rückgabelösung.",
        ],
        productsTitle: "Aktuelle Hoodie-Funde",
        productsIntro: "Die interne Seite sichert die Referenz vor dem aktuellen Zielangebot.",
        openDirectory: "Vollständiges Hoodie-Verzeichnis öffnen",
        viewProduct: "Produkt prüfen",
        faqTitle: "Fragen zu Lolobuy-Hoodies",
        faqs: [
          { question: "Welche Maße sind wichtig?", answer: "Brust, Schulter, Ärmel und Länge sind ein guter Anfang. Immer dieselbe flache Messmethode nutzen." },
          { question: "Beweist ein Foto das Stoffgewicht?", answer: "Nein. Sichtbare Textur und Futter sind erkennbar, Zusammensetzung, Gewicht, Wärme und Einlaufen nicht." },
          { question: "Was bei schiefem Druck?", answer: "Mit gespeichertem Angebot vergleichen, Abweichung genau benennen und vor Versand handeln." },
          { question: "Bedeutet oversized kleiner bestellen?", answer: "Nicht automatisch. Maße und gewünschte Passform vergleichen." },
        ],
      },
      fr: {
        name: "Sweats et pulls",
        eyebrow: "SWEATS LOLOBUY",
        title: "Comparez mesures, tissu et motif avant de commander.",
        metaTitle: "Sweats Lolobuy : taille et checklist QC",
        description: "Parcourez les sweats Lolobuy avec conseils sur mesures, tissu, motif et QC.",
        intro: [
          "Une fiche peut réunir plusieurs couleurs, motifs et tissus. Le premier prix ou visuel peut viser une autre option.",
          "Poitrine, épaules, manches et longueur sont plus utiles que S, M ou L. Comparez avec un sweat mesuré de la même façon.",
          "Les photos montrent couleur, taille, motif et dommages visibles, sans prouver composition, rétrécissement, chaleur ou authenticité.",
        ],
        orderTitle: "Créer un dossier de commande clair",
        orderIntro: "Notez l'option pour qu'une autre personne puisse acheter sans deviner.",
        orderChecks: [
          { title: "Design exact", text: "Gardez couleur, motifs avant et arrière, capuche, zip et quantité." },
          { title: "Quatre mesures", text: "Comparez poitrine, épaules, manches et longueur avec un vêtement adapté." },
          { title: "Tissu", text: "Poids, mélange, doublure et entretien restent des affirmations vendeur." },
          { title: "Prix de variante", text: "Choisissez taille et couleur avant de comparer prix et livraison chinoise." },
          { title: "Captures", text: "Conservez tableau, option et référence du motif pour le QC." },
        ],
        qcTitle: "Contrôler les photos QC",
        qcIntro: "Identité d'abord, construction et décoration ensuite.",
        qcChecks: [
          { title: "Identité et taille", text: "Confirmez couleur, étiquette, style et motif." },
          { title: "Mesures", text: "Vérifiez la règle et comparez au tableau sauvegardé." },
          { title: "Impression ou broderie", text: "Contrôlez position, échelle, alignement et défauts visibles." },
          { title: "Construction", text: "Examinez capuche, col, épaules, poignets, ourlet, poches et fermetures." },
          { title: "État", text: "Cherchez taches, trous, fils tirés, panneaux irréguliers et écarts de couleur." },
        ],
        costTitle: "Tissu et emballage changent le coût",
        costParagraphs: [
          "Un fleece épais pèse et se compacte autrement qu'un sweat léger. Utilisez les données du colis.",
          "Résolvez erreur de taille ou motif avant l'envoi. Le site public confirme inspection et photos, pas un recours universel.",
        ],
        productsTitle: "Sweats actuels dans le catalogue",
        productsIntro: "La fiche interne conserve la référence avant d'ouvrir la destination.",
        openDirectory: "Ouvrir tout le catalogue sweats",
        viewProduct: "Examiner le produit",
        faqTitle: "Questions sur les sweats Lolobuy",
        faqs: [
          { question: "Quelles mesures comptent ?", answer: "Poitrine, épaules, manches et longueur sont un bon départ avec la même méthode à plat." },
          { question: "Une photo prouve-t-elle le poids du tissu ?", answer: "Non. Elle montre texture et doublure visibles, pas composition, poids, chaleur ou rétrécissement." },
          { question: "Que faire si le motif est décentré ?", answer: "Comparez à la fiche sauvegardée et identifiez l'écart exact avant l'envoi." },
          { question: "Oversize signifie-t-il prendre plus petit ?", answer: "Pas automatiquement. Comparez mesures et coupe souhaitée." },
        ],
      },
      it: {
        name: "Felpe e maglioni",
        eyebrow: "FELPE LOLOBUY",
        title: "Confronta misure, tessuto e stampa prima dell'ordine.",
        metaTitle: "Felpe Lolobuy: taglia e checklist QC",
        description: "Esplora felpe Lolobuy con consigli su misure, tessuto, stampa e QC.",
        intro: [
          "Una scheda può unire colori, stampe e tessuti diversi. Primo prezzo e prima foto possono appartenere a un'altra opzione.",
          "Torace, spalla, manica e lunghezza sono più utili di S, M o L. Confronta con una felpa misurata allo stesso modo.",
          "Le foto mostrano colore, taglia, stampa e danni visibili, ma non provano composizione, restringimento, calore o autenticità.",
        ],
        orderTitle: "Crea un registro chiaro",
        orderIntro: "Annota l'opzione in modo che nessuno debba indovinare.",
        orderChecks: [
          { title: "Design esatto", text: "Salva colore, grafica fronte e retro, cappuccio, zip e quantità." },
          { title: "Quattro misure", text: "Confronta torace, spalla, manica e lunghezza con un capo adatto." },
          { title: "Tessuto", text: "Peso, miscela, fodera e lavaggio sono dichiarazioni del venditore." },
          { title: "Prezzo variante", text: "Scegli taglia e colore prima di confrontare prezzo e consegna cinese." },
          { title: "Screenshot", text: "Conserva tabella, opzione e riferimento della grafica." },
        ],
        qcTitle: "Controlla le foto QC",
        qcIntro: "Prima identità, poi costruzione e decorazione.",
        qcChecks: [
          { title: "Identità e taglia", text: "Conferma colore, etichetta, stile e grafica." },
          { title: "Misure", text: "Controlla il righello e confronta la tabella salvata." },
          { title: "Stampa o ricamo", text: "Verifica posizione, scala, allineamento e difetti visibili." },
          { title: "Costruzione", text: "Esamina cappuccio, collo, spalle, polsini, orlo, tasche e chiusure." },
          { title: "Stato", text: "Cerca macchie, fori, fili tirati, pannelli irregolari e differenze di colore." },
        ],
        costTitle: "Tessuto e imballaggio cambiano il costo",
        costParagraphs: [
          "Un pile pesante occupa e pesa più di una felpa leggera. Usa i dati reali del pacco.",
          "Risolvi taglia o stampa errate prima dell'invio. Il sito conferma ispezione e foto, non un rimedio universale.",
        ],
        productsTitle: "Felpe attuali nel catalogo",
        productsIntro: "La pagina interna conserva il riferimento prima della destinazione.",
        openDirectory: "Apri il catalogo completo delle felpe",
        viewProduct: "Controlla il prodotto",
        faqTitle: "Domande sulle felpe Lolobuy",
        faqs: [
          { question: "Quali misure contano?", answer: "Torace, spalla, manica e lunghezza sono un buon inizio con lo stesso metodo in piano." },
          { question: "Una foto prova il peso del tessuto?", answer: "No. Mostra texture e fodera visibili, non composizione, peso, calore o restringimento." },
          { question: "Cosa fare con una stampa decentrata?", answer: "Confronta la scheda salvata e indica la differenza esatta prima della spedizione." },
          { question: "Oversize significa taglia più piccola?", answer: "Non automaticamente. Confronta misure e vestibilità desiderata." },
        ],
      },
    },
  },
  {
    slug: "bags",
    image: "/products/bag.webp",
    directoryHref: "https://www.cnbuycha.com/accessories/",
    productKinds: ["bag"],
    copy: {
      en: {
        name: "Bags",
        eyebrow: "LOLOBUY BAG FINDS",
        title: "Check dimensions, compartments and hardware before shipping a bag.",
        metaTitle: "Lolobuy Bags Spreadsheet: QC & Size Guide",
        description: "Browse Lolobuy bag finds with a practical checklist for dimensions, straps, compartments, closures and warehouse QC.",
        intro: [
          "Bag photographs can make two sizes or constructions look almost identical. Before ordering, translate the listing into measurable facts: width, height, depth, strap range, compartment layout, closure type and every detachable piece included in the selected option.",
          "A directory image cannot confirm material, capacity, hardware finish or seller consistency. Save the exact variant and compare the live description with the order generated from the link. If the intended use matters—laptop, school, travel or daily carry—measure the object that must fit.",
          "Warehouse QC is best for visible identity, shape, stitching, closures, stains and missing pieces. It cannot prove long-term load strength, waterproofing, fibre composition, metal plating, colourfastness or authenticity.",
        ],
        orderTitle: "Turn a bag listing into a measurable specification",
        orderIntro: "A short specification prevents a familiar-looking photo from replacing the option you actually selected.",
        orderChecks: [
          { title: "Overall dimensions", text: "Record width, height and depth and note whether the seller measures the body or includes handles." },
          { title: "Carry system", text: "Confirm handle drop, strap length or adjustment range and every attachment point." },
          { title: "Storage layout", text: "Count main compartments, internal pockets, sleeves and closures required for the intended use." },
          { title: "Exact variant", text: "Save colour, size, material claim, hardware colour and included detachable pieces." },
          { title: "Live cost", text: "Check item price, China-side delivery and the current option before estimating packed international cost." },
        ],
        qcTitle: "A practical bag QC sequence",
        qcIntro: "Inspect the silhouette before zooming into logos or small hardware.",
        qcChecks: [
          { title: "Identity and pieces", text: "Confirm colour, size, selected style, quantity, straps, pouches or charms explicitly included." },
          { title: "Shape and panels", text: "Compare front, back, base and sides for distortion, asymmetry, dents or uneven seams." },
          { title: "Closures", text: "Inspect zips, buckles, snaps, magnets and drawstrings for visible alignment and missing parts." },
          { title: "Straps and stress points", text: "Check stitching and attachment areas where handles or straps carry weight." },
          { title: "Interior and condition", text: "Use available images to review lining, compartments, stains, tears and loose threads." },
        ],
        costTitle: "Shape and protection influence parcel volume",
        costParagraphs: [
          "Soft bags can sometimes pack flatter, while structured bags may need internal support to avoid deformation. Compressing an item may reduce volume but increase the risk of creasing. Choose the packing request from the actual construction and your tolerance for transit damage.",
          "Do not treat a directory price as a delivered quote. The prepared parcel determines weight, dimensions and eligible routes; destination taxes and import rules remain separate.",
        ],
        productsTitle: "Current bag finds in this directory",
        productsIntro: "Review the internal reference and then verify every current dimension, option and included piece.",
        openDirectory: "Search the complete current product directory",
        viewProduct: "Review product details",
        faqTitle: "Lolobuy bag questions",
        faqs: [
          { question: "Which bag dimensions should I record?", answer: "Width, height and depth are the base set. Add handle drop, strap range, opening width or laptop-sleeve size when relevant." },
          { question: "Can QC photos prove the bag material?", answer: "No. Photos show visible texture and construction, but they do not reliably prove fibre content, leather type, coating, waterproofing or durability." },
          { question: "What should I inspect around straps?", answer: "Check attachment points, stitching, reinforcement, adjusters and whether detachable pieces match the selected listing." },
          { question: "Should a structured bag be compressed for shipping?", answer: "That is a trade-off. Less volume may mean more creasing or deformation. Decide from the item's construction, packing options and actual route quote." },
        ],
      },
      es: {
        name: "Bolsos",
        eyebrow: "BOLSOS LOLOBUY",
        title: "Comprueba medidas, compartimentos y herrajes antes del envío.",
        metaTitle: "Spreadsheet de bolsos Lolobuy: QC y medidas",
        description: "Explora bolsos Lolobuy con controles de medidas, correas, compartimentos, cierres y QC.",
        intro: [
          "Las fotos pueden hacer que dos tamaños parezcan iguales. Anota ancho, alto, fondo, rango de correa, compartimentos, cierre y piezas incluidas.",
          "Una imagen no confirma material, capacidad o consistencia del vendedor. Guarda la variante y mide el objeto que debe caber.",
          "El QC muestra identidad, forma, costuras, cierres, manchas y piezas ausentes; no prueba resistencia, impermeabilidad, composición o autenticidad.",
        ],
        orderTitle: "Convierte la ficha en una especificación",
        orderIntro: "Las medidas evitan que una foto familiar sustituya la opción elegida.",
        orderChecks: [
          { title: "Dimensiones", text: "Guarda ancho, alto y fondo y cómo mide el vendedor." },
          { title: "Transporte", text: "Confirma caída del asa, largo de correa, ajuste y puntos de unión." },
          { title: "Organización", text: "Cuenta compartimentos, bolsillos, fundas y cierres necesarios." },
          { title: "Variante", text: "Guarda color, tamaño, material declarado, herrajes y piezas desmontables." },
          { title: "Coste actual", text: "Comprueba precio, entrega en China y opción antes de estimar envío." },
        ],
        qcTitle: "Secuencia práctica de QC",
        qcIntro: "Revisa la silueta antes de ampliar detalles pequeños.",
        qcChecks: [
          { title: "Identidad y piezas", text: "Confirma color, tamaño, estilo, cantidad, correas y accesorios incluidos." },
          { title: "Forma y paneles", text: "Compara frente, reverso, base y laterales por deformación o asimetría." },
          { title: "Cierres", text: "Revisa cremalleras, hebillas, botones, imanes y cordones." },
          { title: "Correas", text: "Comprueba costuras y puntos que soportan peso." },
          { title: "Interior y estado", text: "Revisa forro, compartimentos, manchas, roturas e hilos sueltos." },
        ],
        costTitle: "La forma y protección cambian el volumen",
        costParagraphs: [
          "Un bolso blando puede plegarse; uno estructurado puede necesitar soporte. Comprimir reduce volumen pero aumenta riesgo de arrugas.",
          "El paquete preparado determina peso, medidas y rutas. Impuestos y reglas del destino van aparte.",
        ],
        productsTitle: "Bolsos actuales en el directorio",
        productsIntro: "Revisa la referencia interna y confirma medidas, opción y piezas.",
        openDirectory: "Buscar en todo el directorio",
        viewProduct: "Revisar producto",
        faqTitle: "Preguntas sobre bolsos Lolobuy",
        faqs: [
          { question: "¿Qué medidas debo guardar?", answer: "Ancho, alto y fondo; añade asa, correa, abertura o funda para portátil cuando importe." },
          { question: "¿Las fotos prueban el material?", answer: "No. Muestran textura visible, no composición, cuero, recubrimiento, impermeabilidad o duración." },
          { question: "¿Qué revisar en las correas?", answer: "Uniones, costuras, refuerzo, ajustes y piezas desmontables." },
          { question: "¿Conviene comprimir un bolso rígido?", answer: "Es un equilibrio entre volumen y deformación. Decide con construcción, embalaje y ruta." },
        ],
      },
      de: {
        name: "Taschen",
        eyebrow: "LOLOBUY TASCHEN-FUNDE",
        title: "Maße, Fächer und Beschläge vor dem Versand prüfen.",
        metaTitle: "Lolobuy Taschen Spreadsheet: QC & Maße",
        description: "Lolobuy-Taschen mit Checkliste für Maße, Gurte, Fächer, Verschlüsse und Lager-QC.",
        intro: [
          "Fotos lassen zwei Größen oft gleich wirken. Breite, Höhe, Tiefe, Gurtbereich, Fächer, Verschlüsse und Lieferumfang notieren.",
          "Ein Verzeichnisbild bestätigt weder Material noch Kapazität. Variante sichern und den Gegenstand messen, der hineinpassen muss.",
          "QC zeigt Identität, Form, Nähte, Verschlüsse, Flecken und fehlende Teile, beweist aber nicht Belastbarkeit, Wasserdichte, Zusammensetzung oder Echtheit.",
        ],
        orderTitle: "Das Angebot messbar machen",
        orderIntro: "Eine kurze Spezifikation verhindert, dass das Bild die Auswahl ersetzt.",
        orderChecks: [
          { title: "Maße", text: "Breite, Höhe, Tiefe und Messmethode notieren." },
          { title: "Tragesystem", text: "Henkelhöhe, Gurtlänge, Verstellung und Befestigung prüfen." },
          { title: "Aufteilung", text: "Hauptfächer, Taschen, Hüllen und nötige Verschlüsse zählen." },
          { title: "Variante", text: "Farbe, Größe, Materialangabe, Beschlagfarbe und abnehmbare Teile sichern." },
          { title: "Aktuelle Kosten", text: "Preis, China-Versand und Option vor der Auslandsplanung prüfen." },
        ],
        qcTitle: "Praktische Taschen-QC-Reihenfolge",
        qcIntro: "Zuerst Silhouette, dann kleine Details.",
        qcChecks: [
          { title: "Identität und Teile", text: "Farbe, Größe, Stil, Menge, Gurte und enthaltenes Zubehör bestätigen." },
          { title: "Form und Paneele", text: "Vorder-, Rück-, Unter- und Seitenflächen auf Verzug und Asymmetrie prüfen." },
          { title: "Verschlüsse", text: "Reißverschlüsse, Schnallen, Druckknöpfe, Magnete und Kordeln prüfen." },
          { title: "Gurte", text: "Nähte und tragende Befestigungspunkte prüfen." },
          { title: "Innenraum und Zustand", text: "Futter, Fächer, Flecken, Risse und lose Fäden prüfen." },
        ],
        costTitle: "Form und Schutz beeinflussen das Volumen",
        costParagraphs: [
          "Weiche Taschen packen flacher; strukturierte benötigen eventuell Stützung. Kompression spart Volumen, kann aber Knicke verursachen.",
          "Erst das vorbereitete Paket bestimmt Gewicht, Maße und Routen. Zielsteuern und Einfuhrregeln bleiben getrennt.",
        ],
        productsTitle: "Aktuelle Taschenfunde",
        productsIntro: "Interne Referenz prüfen und danach Maße, Option und Teile bestätigen.",
        openDirectory: "Gesamtes Produktverzeichnis durchsuchen",
        viewProduct: "Produkt prüfen",
        faqTitle: "Fragen zu Lolobuy-Taschen",
        faqs: [
          { question: "Welche Maße brauche ich?", answer: "Breite, Höhe und Tiefe; bei Bedarf Henkel, Gurt, Öffnung oder Laptopfach ergänzen." },
          { question: "Beweisen Fotos das Material?", answer: "Nein. Sie zeigen Textur, nicht Zusammensetzung, Lederart, Beschichtung, Wasserdichte oder Haltbarkeit." },
          { question: "Was an Gurten prüfen?", answer: "Befestigung, Nähte, Verstärkung, Versteller und abnehmbare Teile." },
          { question: "Strukturierte Tasche komprimieren?", answer: "Das ist ein Tausch zwischen Volumen und Verformung. Nach Aufbau, Packung und Route entscheiden." },
        ],
      },
      fr: {
        name: "Sacs",
        eyebrow: "SACS LOLOBUY",
        title: "Contrôlez dimensions, compartiments et accessoires avant l'envoi.",
        metaTitle: "Spreadsheet sacs Lolobuy : QC et mesures",
        description: "Parcourez les sacs Lolobuy avec contrôles des dimensions, sangles, compartiments, fermetures et QC.",
        intro: [
          "Les photos peuvent faire paraître deux tailles identiques. Notez largeur, hauteur, profondeur, sangle, compartiments, fermeture et pièces incluses.",
          "Une image ne confirme ni matière ni capacité. Gardez la variante et mesurez l'objet qui doit entrer.",
          "Le QC montre identité, forme, coutures, fermetures, taches et pièces manquantes, pas résistance, étanchéité, composition ou authenticité.",
        ],
        orderTitle: "Transformer la fiche en spécification",
        orderIntro: "Des mesures empêchent l'image de remplacer l'option choisie.",
        orderChecks: [
          { title: "Dimensions", text: "Notez largeur, hauteur, profondeur et méthode du vendeur." },
          { title: "Portage", text: "Confirmez chute de poignée, longueur de sangle, réglage et attaches." },
          { title: "Rangement", text: "Comptez compartiments, poches, housses et fermetures." },
          { title: "Variante", text: "Gardez couleur, taille, matière annoncée, accessoires et pièces amovibles." },
          { title: "Coût actuel", text: "Vérifiez prix, livraison chinoise et option avant d'estimer le fret." },
        ],
        qcTitle: "Séquence pratique de QC",
        qcIntro: "Examinez la silhouette avant les petits détails.",
        qcChecks: [
          { title: "Identité et pièces", text: "Confirmez couleur, taille, style, quantité, sangles et accessoires." },
          { title: "Forme et panneaux", text: "Comparez avant, arrière, base et côtés pour déformation ou asymétrie." },
          { title: "Fermetures", text: "Contrôlez zips, boucles, pressions, aimants et cordons." },
          { title: "Sangles", text: "Vérifiez coutures et attaches portant le poids." },
          { title: "Intérieur et état", text: "Contrôlez doublure, compartiments, taches, déchirures et fils." },
        ],
        costTitle: "Forme et protection changent le volume",
        costParagraphs: [
          "Un sac souple se plie ; un modèle structuré peut exiger un support. Comprimer réduit le volume mais augmente les plis.",
          "Le colis préparé détermine poids, dimensions et routes. Taxes et règles du pays restent séparées.",
        ],
        productsTitle: "Sacs actuels dans le catalogue",
        productsIntro: "Examinez la référence interne puis confirmez dimensions, option et pièces.",
        openDirectory: "Rechercher dans tout le catalogue",
        viewProduct: "Examiner le produit",
        faqTitle: "Questions sur les sacs Lolobuy",
        faqs: [
          { question: "Quelles dimensions noter ?", answer: "Largeur, hauteur, profondeur, puis poignée, sangle, ouverture ou housse ordinateur si utile." },
          { question: "Les photos prouvent-elles la matière ?", answer: "Non. Elles montrent texture visible, pas composition, type de cuir, revêtement, étanchéité ou durée." },
          { question: "Que contrôler sur les sangles ?", answer: "Attaches, coutures, renforts, réglages et pièces amovibles." },
          { question: "Compresser un sac structuré ?", answer: "C'est un compromis entre volume et déformation. Décidez selon construction, emballage et route." },
        ],
      },
      it: {
        name: "Borse",
        eyebrow: "BORSE LOLOBUY",
        title: "Controlla misure, scomparti e accessori prima dell'invio.",
        metaTitle: "Spreadsheet borse Lolobuy: QC e misure",
        description: "Esplora borse Lolobuy con controlli su misure, cinturini, scomparti, chiusure e QC.",
        intro: [
          "Le foto possono far sembrare uguali due misure. Annota larghezza, altezza, profondità, cinturino, scomparti, chiusura e pezzi inclusi.",
          "Un'immagine non conferma materiale o capacità. Salva la variante e misura l'oggetto che deve entrare.",
          "Il QC mostra identità, forma, cuciture, chiusure, macchie e pezzi mancanti, non resistenza, impermeabilità, composizione o autenticità.",
        ],
        orderTitle: "Trasforma la scheda in specifica",
        orderIntro: "Le misure impediscono alla foto di sostituire l'opzione scelta.",
        orderChecks: [
          { title: "Dimensioni", text: "Salva larghezza, altezza, profondità e metodo del venditore." },
          { title: "Trasporto", text: "Conferma altezza manico, lunghezza cinturino, regolazione e attacchi." },
          { title: "Organizzazione", text: "Conta scomparti, tasche, custodie e chiusure." },
          { title: "Variante", text: "Salva colore, misura, materiale dichiarato, accessori e pezzi rimovibili." },
          { title: "Costo attuale", text: "Controlla prezzo, consegna cinese e opzione prima del trasporto." },
        ],
        qcTitle: "Sequenza pratica di QC",
        qcIntro: "Controlla prima la forma, poi i piccoli dettagli.",
        qcChecks: [
          { title: "Identità e pezzi", text: "Conferma colore, misura, stile, quantità, cinturini e accessori." },
          { title: "Forma e pannelli", text: "Confronta fronte, retro, base e lati per deformazione o asimmetria." },
          { title: "Chiusure", text: "Controlla zip, fibbie, bottoni, magneti e cordini." },
          { title: "Cinturini", text: "Verifica cuciture e attacchi che portano il peso." },
          { title: "Interno e stato", text: "Controlla fodera, scomparti, macchie, strappi e fili." },
        ],
        costTitle: "Forma e protezione cambiano il volume",
        costParagraphs: [
          "Una borsa morbida si piega; una strutturata può richiedere supporto. Comprimere riduce volume ma aumenta le pieghe.",
          "Il pacco preparato determina peso, dimensioni e rotte. Tasse e importazione restano separate.",
        ],
        productsTitle: "Borse attuali nel catalogo",
        productsIntro: "Controlla il riferimento interno e poi misure, opzione e pezzi.",
        openDirectory: "Cerca in tutto il catalogo",
        viewProduct: "Controlla il prodotto",
        faqTitle: "Domande sulle borse Lolobuy",
        faqs: [
          { question: "Quali misure servono?", answer: "Larghezza, altezza e profondità, poi manico, cinturino, apertura o vano laptop se utile." },
          { question: "Le foto provano il materiale?", answer: "No. Mostrano texture, non composizione, tipo di pelle, rivestimento, impermeabilità o durata." },
          { question: "Cosa controllare sui cinturini?", answer: "Attacchi, cuciture, rinforzi, regolatori e pezzi rimovibili." },
          { question: "Comprimere una borsa strutturata?", answer: "È un compromesso tra volume e deformazione. Decidi da costruzione, imballaggio e rotta." },
        ],
      },
    },
  },
];

export const categoryGuideSlugs = categoryGuides.map(
  (guide) => guide.slug,
);

export function getCategoryGuide(
  slug: string,
  locale: Locale,
): CategoryGuide | undefined {
  const guide = categoryGuides.find((item) => item.slug === slug);
  if (!guide) return undefined;

  return {
    slug: guide.slug,
    image: guide.image,
    directoryHref: guide.directoryHref,
    productKinds: guide.productKinds,
    ...guide.copy[locale],
  };
}
