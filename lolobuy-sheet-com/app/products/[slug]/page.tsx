import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "../../components/json-ld";
import SiteFooter from "../../components/site-footer";
import SiteHeader from "../../components/site-header";
import {
  localizedPath,
  normalizeLocale,
  type Locale,
} from "../../i18n";
import { getLocalizedProducts } from "../../localized-data";
import {
  productFinds,
  type ProductKind,
} from "../../site-data";

type ProductPageLanguage = {
  home: string;
  finds: string;
  eyebrow: string;
  summaryLead: string;
  summaryTail: string;
  category: string;
  reference: string;
  reviewed: string;
  route: string;
  routeValue: string;
  openListing: string;
  listingNote: string;
  whyEyebrow: string;
  whyTitle: string;
  whyParagraphs: [string, string];
  checklistEyebrow: string;
  checklistTitle: string;
  qcEyebrow: string;
  qcTitle: string;
  qcParagraphs: [string, string];
  qcLink: string;
  relatedEyebrow: string;
  relatedTitle: string;
  viewDetails: string;
  categoryNames: Record<ProductKind, string>;
  checklist: Record<ProductKind, string[]>;
};

const productPageCopy: Record<Locale, ProductPageLanguage> = {
  en: {
    home: "Home",
    finds: "Finds",
    eyebrow: "INDEPENDENT PRODUCT DETAIL",
    summaryLead:
      "This internal detail page keeps the product image and listing reference",
    summaryTail:
      "together before you leave the guide. Current price, options, seller information and availability must still be checked on the live listing.",
    category: "Category",
    reference: "Listing reference",
    reviewed: "Page reviewed",
    route: "Purchase route",
    routeValue: "Current listing",
    openListing: "View current listing",
    listingNote:
      "Opens the matching product page in a new tab. The destination controls the current offer.",
    whyEyebrow: "WHY THIS PAGE COMES FIRST",
    whyTitle: "Discover here. Verify before committing.",
    whyParagraphs: [
      "A product card is useful for discovery, but a directory image cannot freeze a seller's price, stock, option names or description. This page gives every find a stable, indexable reference while keeping the live listing as the source for the current offer.",
      "The displayed name follows the directory entry. It is not an authentication statement and does not confirm materials, origin or trademark status. Compare the selected option and live description before ordering.",
    ],
    checklistEyebrow: "BEFORE YOU ORDER",
    checklistTitle: "Five checks worth doing on the current listing",
    qcEyebrow: "WHEN IT REACHES THE WAREHOUSE",
    qcTitle: "Use QC evidence to check the physical arrival.",
    qcParagraphs: [
      "Confirm the item, color, size or option first. Then compare the visible construction with the order record and seller images. Warehouse photos show the received item; they cannot prove comfort, long-term durability or material composition by themselves.",
      "If a decision-critical detail is unclear, ask for one focused angle or measurement when that service is available. Resolve a meaningful mismatch before international parcel submission.",
    ],
    qcLink: "Open the complete QC guide",
    relatedEyebrow: "KEEP BROWSING",
    relatedTitle: "Related curated finds",
    viewDetails: "View details",
    categoryNames: {
      eyewear: "Eyewear",
      headwear: "Headwear",
      hoodie: "Hoodies & sweaters",
      shoes: "Shoes",
      bag: "Bags",
      jacket: "Outerwear",
    },
    checklist: {
      eyewear: [
        "Confirm the selected lens tint, frame color and exact option name.",
        "Check stated dimensions and whether the strap is adjustable.",
        "Compare the included pieces with the live listing description.",
        "Look for visible lens scratches, frame damage and strap attachment issues in QC.",
        "Verify any protective film or case only when the listing explicitly includes it.",
      ],
      headwear: [
        "Confirm color, style and whether the size is fixed or adjustable.",
        "Compare the stated circumference and crown dimensions with a hat that fits.",
        "Review brim shape, panel alignment and closure construction.",
        "Inspect embroidery, print placement, stitching and visible marks in QC photos.",
        "Treat packaging or accessories as included only when the listing says so.",
      ],
      hoodie: [
        "Select the intended color, design and size before judging the displayed price.",
        "Compare chest, shoulder, sleeve and length measurements with a garment you own.",
        "Review print or embroidery placement across the listing gallery.",
        "Check cuffs, hem, pocket, hood and major seams in warehouse photos.",
        "Look for stains, holes or obvious damage before accepting the arrival.",
      ],
      shoes: [
        "Confirm the exact color and size system used by the listing.",
        "Compare insole or outsole length with footwear that already fits.",
        "Check that the warehouse received a matching left and right shoe.",
        "Compare toe shape, heel height, panel alignment and sole attachment.",
        "Confirm included accessories only when they appear in the live offer.",
      ],
      bag: [
        "Confirm color, stated dimensions and the selected style.",
        "Check the number and location of compartments, pockets and closures.",
        "Review strap type, adjustability and attachment points.",
        "Inspect zipper paths, seams, panel shape and visible marks in QC photos.",
        "Verify detachable pieces or accessories against the listing contents.",
      ],
      jacket: [
        "Confirm the selected color and size, then open the seller's measurement chart.",
        "Compare chest, shoulder, sleeve and total length with a jacket that fits.",
        "Review hood, zipper, pockets, cuffs and lining shown in the listing.",
        "Inspect panel alignment, seams and fill distribution in warehouse photos.",
        "Look for stains, tears, broken closures or visibly uneven construction.",
      ],
    },
  },
  es: {
    home: "Inicio",
    finds: "Selección",
    eyebrow: "DETALLE INDEPENDIENTE",
    summaryLead:
      "Esta página interna mantiene juntos la imagen y la referencia",
    summaryTail:
      "antes de salir de la guía. Comprueba precio, opciones, vendedor y disponibilidad en la ficha actual.",
    category: "Categoría",
    reference: "Referencia",
    reviewed: "Revisado",
    route: "Ruta de compra",
    routeValue: "Ficha actual",
    openListing: "Ver ficha actual",
    listingNote:
      "Abre la página correspondiente en otra pestaña. El destino controla la oferta actual.",
    whyEyebrow: "POR QUÉ ESTA PÁGINA VA PRIMERO",
    whyTitle: "Descubre aquí. Verifica antes de decidir.",
    whyParagraphs: [
      "Una tarjeta ayuda a descubrir, pero no puede fijar precio, stock, opciones o descripción. Esta página crea una referencia estable e indexable y deja la oferta actual en manos de la ficha activa.",
      "El nombre mostrado sigue la entrada del directorio. No autentica materiales, origen ni marcas. Compara siempre la opción y descripción actuales.",
    ],
    checklistEyebrow: "ANTES DE COMPRAR",
    checklistTitle: "Cinco comprobaciones útiles",
    qcEyebrow: "CUANDO LLEGUE AL ALMACÉN",
    qcTitle: "Usa las pruebas QC para revisar el artículo físico.",
    qcParagraphs: [
      "Confirma primero artículo, color, talla u opción. Después compara la construcción visible con el pedido y las fotos del vendedor.",
      "Si falta un detalle decisivo, solicita un ángulo o medida concreta cuando esté disponible y resuelve diferencias antes del envío internacional.",
    ],
    qcLink: "Abrir la guía QC completa",
    relatedEyebrow: "SEGUIR EXPLORANDO",
    relatedTitle: "Otros productos seleccionados",
    viewDetails: "Ver detalles",
    categoryNames: {
      eyewear: "Gafas",
      headwear: "Sombreros",
      hoodie: "Sudaderas",
      shoes: "Calzado",
      bag: "Bolsos",
      jacket: "Abrigos",
    },
    checklist: {
      eyewear: [
        "Confirma tono de lente, color de montura y opción exacta.",
        "Revisa dimensiones y ajuste de la correa.",
        "Compara las piezas incluidas con la descripción actual.",
        "Busca arañazos, daños y problemas de unión en las fotos QC.",
        "Da por incluido estuche o protector solo si aparece en la ficha.",
      ],
      headwear: [
        "Confirma color, estilo y sistema de ajuste.",
        "Compara circunferencia y altura con una gorra que te sirva.",
        "Revisa forma de visera, paneles y cierre.",
        "Inspecciona bordado, estampado, costuras y marcas.",
        "Da por incluidos accesorios solo si la ficha los menciona.",
      ],
      hoodie: [
        "Selecciona color, diseño y talla antes de valorar el precio.",
        "Compara pecho, hombro, manga y largo.",
        "Revisa la colocación de estampados o bordados.",
        "Comprueba puños, bajo, bolsillo, capucha y costuras.",
        "Busca manchas, agujeros o daños visibles.",
      ],
      shoes: [
        "Confirma color y sistema de tallas.",
        "Compara la longitud interior o de suela.",
        "Comprueba que el par izquierdo y derecho coincidan.",
        "Revisa puntera, talón, paneles y unión de la suela.",
        "Confirma accesorios solo cuando estén incluidos en la ficha.",
      ],
      bag: [
        "Confirma color, medidas y estilo seleccionado.",
        "Revisa compartimentos, bolsillos y cierres.",
        "Comprueba correas, ajuste y puntos de unión.",
        "Inspecciona cremalleras, costuras, forma y marcas.",
        "Verifica piezas desmontables con el contenido de la ficha.",
      ],
      jacket: [
        "Confirma color y talla y abre la tabla de medidas.",
        "Compara pecho, hombro, manga y largo.",
        "Revisa capucha, cremallera, bolsillos, puños y forro.",
        "Inspecciona paneles, costuras y distribución del relleno.",
        "Busca manchas, roturas, cierres dañados o zonas desiguales.",
      ],
    },
  },
  de: {
    home: "Start",
    finds: "Fundstücke",
    eyebrow: "UNABHÄNGIGES PRODUKTDETAIL",
    summaryLead:
      "Diese interne Detailseite hält Produktbild und Angebotsreferenz",
    summaryTail:
      "zusammen. Preis, Optionen, Verkäuferangaben und Verfügbarkeit im aktuellen Angebot prüfen.",
    category: "Kategorie",
    reference: "Angebotsreferenz",
    reviewed: "Geprüft",
    route: "Kaufweg",
    routeValue: "Aktuelles Angebot",
    openListing: "Aktuelles Angebot ansehen",
    listingNote:
      "Öffnet die passende Produktseite in einem neuen Tab. Dort gilt das aktuelle Angebot.",
    whyEyebrow: "WARUM DIESE SEITE ZUERST KOMMT",
    whyTitle: "Hier entdecken. Vor der Entscheidung prüfen.",
    whyParagraphs: [
      "Eine Produktkarte hilft bei der Suche, kann aber Preis, Bestand, Optionen oder Beschreibung nicht festschreiben. Diese Seite schafft eine stabile, indexierbare Referenz.",
      "Der angezeigte Name folgt dem Verzeichniseintrag. Er bestätigt weder Echtheit noch Material oder Herkunft. Aktuelle Option und Beschreibung immer vergleichen.",
    ],
    checklistEyebrow: "VOR DER BESTELLUNG",
    checklistTitle: "Fünf sinnvolle Prüfungen",
    qcEyebrow: "NACH ANKUNFT IM LAGER",
    qcTitle: "Den physischen Eingang mit QC-Nachweisen prüfen.",
    qcParagraphs: [
      "Zuerst Artikel, Farbe, Größe oder Option bestätigen. Danach sichtbare Verarbeitung mit Bestellung und Verkäuferbildern vergleichen.",
      "Fehlt ein entscheidendes Detail, eine gezielte Perspektive oder Messung anfragen, sofern verfügbar, und Abweichungen vor dem internationalen Versand klären.",
    ],
    qcLink: "Vollständigen QC-Leitfaden öffnen",
    relatedEyebrow: "WEITER ENTDECKEN",
    relatedTitle: "Weitere kuratierte Fundstücke",
    viewDetails: "Details ansehen",
    categoryNames: {
      eyewear: "Brillen",
      headwear: "Kopfbedeckung",
      hoodie: "Hoodies & Pullover",
      shoes: "Schuhe",
      bag: "Taschen",
      jacket: "Jacken",
    },
    checklist: {
      eyewear: [
        "Linsentönung, Rahmenfarbe und genaue Option bestätigen.",
        "Maße und Verstellbarkeit des Bands prüfen.",
        "Lieferumfang mit der aktuellen Beschreibung vergleichen.",
        "QC-Fotos auf Kratzer, Rahmenschäden und Bandbefestigung prüfen.",
        "Etui oder Schutz nur erwarten, wenn ausdrücklich aufgeführt.",
      ],
      headwear: [
        "Farbe, Stil und Größenverstellung bestätigen.",
        "Umfang und Kronenhöhe mit einer passenden Kappe vergleichen.",
        "Schirmform, Paneele und Verschluss prüfen.",
        "Stickerei, Druck, Nähte und sichtbare Flecken prüfen.",
        "Zubehör nur erwarten, wenn es aufgeführt ist.",
      ],
      hoodie: [
        "Farbe, Design und Größe vor der Preisbewertung auswählen.",
        "Brust, Schulter, Ärmel und Länge vergleichen.",
        "Druck- oder Stickposition in der Galerie prüfen.",
        "Bündchen, Saum, Tasche, Kapuze und Hauptnähte prüfen.",
        "Auf Flecken, Löcher oder sichtbare Schäden achten.",
      ],
      shoes: [
        "Farbe und verwendetes Größensystem bestätigen.",
        "Innen- oder Sohlenlänge mit passenden Schuhen vergleichen.",
        "Passendes linkes und rechtes Paar kontrollieren.",
        "Zehenform, Ferse, Paneele und Sohlenverbindung prüfen.",
        "Zubehör nur bei ausdrücklichem Lieferumfang erwarten.",
      ],
      bag: [
        "Farbe, Maße und gewählten Stil bestätigen.",
        "Fächer, Taschen und Verschlüsse prüfen.",
        "Gurte, Verstellung und Befestigungspunkte prüfen.",
        "Reißverschlüsse, Nähte, Form und sichtbare Flecken prüfen.",
        "Abnehmbare Teile mit dem Angebot vergleichen.",
      ],
      jacket: [
        "Farbe und Größe bestätigen und Maßtabelle öffnen.",
        "Brust, Schulter, Ärmel und Gesamtlänge vergleichen.",
        "Kapuze, Reißverschluss, Taschen, Bündchen und Futter prüfen.",
        "Paneele, Nähte und Füllverteilung in QC-Fotos prüfen.",
        "Auf Flecken, Risse, defekte Verschlüsse und Unebenheiten achten.",
      ],
    },
  },
  fr: {
    home: "Accueil",
    finds: "Sélection",
    eyebrow: "FICHE PRODUIT INDÉPENDANTE",
    summaryLead:
      "Cette fiche interne conserve l’image et la référence",
    summaryTail:
      "avant de quitter le guide. Vérifiez prix, options, vendeur et disponibilité sur la fiche actuelle.",
    category: "Catégorie",
    reference: "Référence",
    reviewed: "Vérifié",
    route: "Parcours d’achat",
    routeValue: "Fiche actuelle",
    openListing: "Voir la fiche actuelle",
    listingNote:
      "Ouvre la page produit correspondante dans un nouvel onglet. La destination contrôle l’offre actuelle.",
    whyEyebrow: "POURQUOI CETTE PAGE D’ABORD",
    whyTitle: "Découvrez ici. Vérifiez avant de décider.",
    whyParagraphs: [
      "Une carte aide à découvrir mais ne peut figer prix, stock, options ou description. Cette page fournit une référence stable et indexable.",
      "Le nom affiché suit l’entrée du catalogue. Il ne confirme ni authenticité, ni matière, ni origine. Comparez toujours l’option et la description actuelles.",
    ],
    checklistEyebrow: "AVANT DE COMMANDER",
    checklistTitle: "Cinq contrôles utiles",
    qcEyebrow: "À L’ARRIVÉE À L’ENTREPÔT",
    qcTitle: "Utilisez les preuves QC pour examiner l’article reçu.",
    qcParagraphs: [
      "Confirmez d’abord l’article, la couleur, la taille ou l’option. Comparez ensuite la construction visible avec la commande et les photos vendeur.",
      "Si un détail décisif manque, demandez un angle ou une mesure ciblée lorsque disponible et résolvez l’écart avant l’envoi international.",
    ],
    qcLink: "Ouvrir le guide QC complet",
    relatedEyebrow: "CONTINUER À EXPLORER",
    relatedTitle: "Autres trouvailles sélectionnées",
    viewDetails: "Voir les détails",
    categoryNames: {
      eyewear: "Lunettes",
      headwear: "Couvre-chefs",
      hoodie: "Sweats",
      shoes: "Chaussures",
      bag: "Sacs",
      jacket: "Vestes",
    },
    checklist: {
      eyewear: [
        "Confirmez teinte des verres, couleur de monture et option.",
        "Vérifiez dimensions et réglage de la sangle.",
        "Comparez les éléments inclus à la description actuelle.",
        "Cherchez rayures, dommages et problèmes de fixation sur les photos QC.",
        "N’attendez étui ou protection que s’ils sont indiqués.",
      ],
      headwear: [
        "Confirmez couleur, style et système de réglage.",
        "Comparez tour de tête et hauteur à une casquette adaptée.",
        "Vérifiez visière, panneaux et fermeture.",
        "Inspectez broderie, impression, coutures et marques.",
        "N’attendez des accessoires que s’ils sont indiqués.",
      ],
      hoodie: [
        "Sélectionnez couleur, motif et taille avant d’évaluer le prix.",
        "Comparez poitrine, épaules, manches et longueur.",
        "Vérifiez le placement des impressions ou broderies.",
        "Contrôlez poignets, ourlet, poche, capuche et coutures.",
        "Cherchez taches, trous ou dommages visibles.",
      ],
      shoes: [
        "Confirmez couleur et système de pointure.",
        "Comparez longueur intérieure ou de semelle.",
        "Vérifiez que chaussure gauche et droite correspondent.",
        "Contrôlez bout, talon, panneaux et fixation de semelle.",
        "Confirmez les accessoires uniquement s’ils sont inclus.",
      ],
      bag: [
        "Confirmez couleur, dimensions et style choisi.",
        "Vérifiez compartiments, poches et fermetures.",
        "Contrôlez sangles, réglages et points d’attache.",
        "Inspectez zips, coutures, forme et marques visibles.",
        "Comparez les pièces détachables au contenu annoncé.",
      ],
      jacket: [
        "Confirmez couleur et taille puis ouvrez le tableau de mesures.",
        "Comparez poitrine, épaules, manches et longueur.",
        "Vérifiez capuche, zip, poches, poignets et doublure.",
        "Inspectez panneaux, coutures et répartition du rembourrage.",
        "Cherchez taches, déchirures, fermetures cassées ou irrégularités.",
      ],
    },
  },
  it: {
    home: "Home",
    finds: "Prodotti",
    eyebrow: "DETTAGLIO PRODOTTO INDIPENDENTE",
    summaryLead:
      "Questa pagina interna mantiene insieme immagine e riferimento",
    summaryTail:
      "prima di lasciare la guida. Verifica prezzo, opzioni, venditore e disponibilità nella scheda attuale.",
    category: "Categoria",
    reference: "Riferimento",
    reviewed: "Verificato",
    route: "Percorso d’acquisto",
    routeValue: "Scheda attuale",
    openListing: "Vedi scheda attuale",
    listingNote:
      "Apre la pagina corrispondente in una nuova scheda. La destinazione controlla l’offerta attuale.",
    whyEyebrow: "PERCHÉ PRIMA QUESTA PAGINA",
    whyTitle: "Scopri qui. Verifica prima di decidere.",
    whyParagraphs: [
      "Una scheda aiuta a scoprire, ma non può bloccare prezzo, disponibilità, opzioni o descrizione. Questa pagina crea un riferimento stabile e indicizzabile.",
      "Il nome segue la voce del catalogo. Non conferma autenticità, materiali o origine. Confronta sempre opzione e descrizione attuali.",
    ],
    checklistEyebrow: "PRIMA DELL’ORDINE",
    checklistTitle: "Cinque controlli utili",
    qcEyebrow: "QUANDO ARRIVA IN MAGAZZINO",
    qcTitle: "Usa le prove QC per controllare l’articolo fisico.",
    qcParagraphs: [
      "Conferma prima articolo, colore, taglia o opzione. Poi confronta la costruzione visibile con ordine e foto del venditore.",
      "Se manca un dettaglio decisivo, richiedi un’angolazione o misura precisa quando disponibile e risolvi differenze prima della spedizione internazionale.",
    ],
    qcLink: "Apri la guida QC completa",
    relatedEyebrow: "CONTINUA A ESPLORARE",
    relatedTitle: "Altri prodotti selezionati",
    viewDetails: "Vedi dettagli",
    categoryNames: {
      eyewear: "Occhiali",
      headwear: "Copricapi",
      hoodie: "Felpe",
      shoes: "Scarpe",
      bag: "Borse",
      jacket: "Giacche",
    },
    checklist: {
      eyewear: [
        "Conferma tinta lente, colore montatura e opzione esatta.",
        "Controlla misure e regolazione del cinturino.",
        "Confronta gli elementi inclusi con la descrizione attuale.",
        "Cerca graffi, danni e problemi di fissaggio nelle foto QC.",
        "Considera custodia o protezione incluse solo se dichiarate.",
      ],
      headwear: [
        "Conferma colore, stile e sistema di regolazione.",
        "Confronta circonferenza e altezza con un cappello adatto.",
        "Controlla visiera, pannelli e chiusura.",
        "Ispeziona ricamo, stampa, cuciture e segni.",
        "Considera accessori inclusi solo se dichiarati.",
      ],
      hoodie: [
        "Seleziona colore, design e taglia prima di valutare il prezzo.",
        "Confronta torace, spalle, maniche e lunghezza.",
        "Controlla il posizionamento di stampa o ricamo.",
        "Verifica polsini, orlo, tasca, cappuccio e cuciture.",
        "Cerca macchie, fori o danni visibili.",
      ],
      shoes: [
        "Conferma colore e sistema di taglie.",
        "Confronta lunghezza interna o suola.",
        "Controlla che scarpa sinistra e destra corrispondano.",
        "Verifica punta, tallone, pannelli e fissaggio suola.",
        "Conferma accessori solo quando inclusi nella scheda.",
      ],
      bag: [
        "Conferma colore, dimensioni e stile scelto.",
        "Controlla scomparti, tasche e chiusure.",
        "Verifica cinghie, regolazione e punti di fissaggio.",
        "Ispeziona zip, cuciture, forma e segni visibili.",
        "Confronta le parti rimovibili con il contenuto dichiarato.",
      ],
      jacket: [
        "Conferma colore e taglia e apri la tabella misure.",
        "Confronta torace, spalle, maniche e lunghezza.",
        "Controlla cappuccio, zip, tasche, polsini e fodera.",
        "Ispeziona pannelli, cuciture e distribuzione dell’imbottitura.",
        "Cerca macchie, strappi, chiusure rotte o aree irregolari.",
      ],
    },
  },
};

const productMetadataCopy: Record<Locale, string> = {
  en: "Product Details & QC Checklist",
  es: "Detalles del producto y lista QC",
  de: "Produktdetails und QC-Prüfliste",
  fr: "Fiche produit et liste de contrôle QC",
  it: "Dettagli prodotto e lista di controllo QC",
};

export function generateStaticParams() {
  return productFinds.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string | string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const query = await searchParams;
  const locale = normalizeLocale(query.lang);
  const product = getLocalizedProducts(locale).find((item) => item.slug === slug);

  if (!product) {
    return {};
  }

  return {
    title: `${product.name} | ${productMetadataCopy[locale]}`,
    description: product.description,
    alternates: {
      canonical: localizedPath(`/products/${product.slug}`, locale),
      languages: {
        en: `/products/${product.slug}`,
        es: `/products/${product.slug}?lang=es`,
        de: `/products/${product.slug}?lang=de`,
        fr: `/products/${product.slug}?lang=fr`,
        it: `/products/${product.slug}?lang=it`,
        "x-default": `/products/${product.slug}`,
      },
    },
    openGraph: {
      title: `${product.name} | Lolobuy Sheet`,
      description: product.description,
      type: "website",
      images: [{ url: product.image, alt: product.name }],
    },
  };
}

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string | string[] }>;
}) {
  const { slug } = await params;
  const query = await searchParams;
  const locale = normalizeLocale(query.lang);
  const copy = productPageCopy[locale];
  const localizedProducts = getLocalizedProducts(locale);
  const productIndex = localizedProducts.findIndex((item) => item.slug === slug);
  const product = localizedProducts[productIndex];

  if (!product) {
    notFound();
  }

  const related = [...localizedProducts, ...localizedProducts]
    .slice(productIndex + 1, productIndex + 4);

  return (
    <main>
      <SiteHeader locale={locale} />
      <article className="product-detail">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <span>
            <Link href={localizedPath("/", locale)}>{copy.home}</Link>
            <b aria-hidden="true">/</b>
          </span>
          <span>
            <Link href={localizedPath("/finds", locale)}>{copy.finds}</Link>
            <b aria-hidden="true">/</b>
          </span>
          <span>{product.name}</span>
        </nav>

        <section className="product-detail-hero">
          <div className="product-detail-image">
            <Image
              src={product.image}
              alt={product.name}
              width={1000}
              height={1000}
              sizes="(max-width: 780px) 100vw, 48vw"
              priority
              unoptimized
            />
          </div>
          <div className="product-detail-copy">
            <p className="eyebrow">{copy.eyebrow}</p>
            <h1>{product.name}</h1>
            <p>
              {copy.summaryLead} <strong>{product.listingReference}</strong>{" "}
              {copy.summaryTail}
            </p>
            <dl className="product-facts">
              <div>
                <dt>{copy.category}</dt>
                <dd>{copy.categoryNames[product.kind]}</dd>
              </div>
              <div>
                <dt>{copy.reference}</dt>
                <dd>{product.listingReference}</dd>
              </div>
              <div>
                <dt>{copy.reviewed}</dt>
                <dd>2026-07-26</dd>
              </div>
              <div>
                <dt>{copy.route}</dt>
                <dd>{copy.routeValue}</dd>
              </div>
            </dl>
            <a
              className="button button-primary product-listing-cta"
              href={product.destinationHref}
              target="_blank"
              rel="noopener"
            >
              {copy.openListing} <span aria-hidden="true">↗</span>
            </a>
            <small>{copy.listingNote}</small>
          </div>
        </section>

        <section className="product-detail-editorial">
          <div>
            <p className="eyebrow">{copy.whyEyebrow}</p>
            <h2>{copy.whyTitle}</h2>
          </div>
          <div>
            {copy.whyParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="product-checklist">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">{copy.checklistEyebrow}</p>
              <h2>{copy.checklistTitle}</h2>
            </div>
          </div>
          <ol>
            {copy.checklist[product.kind].map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="product-qc-panel">
          <div>
            <p className="eyebrow">{copy.qcEyebrow}</p>
            <h2>{copy.qcTitle}</h2>
          </div>
          <div>
            {copy.qcParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <Link
              className="text-link"
              href={localizedPath("/guides/qc", locale)}
            >
              {copy.qcLink} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <section className="related-products">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">{copy.relatedEyebrow}</p>
              <h2>{copy.relatedTitle}</h2>
            </div>
          </div>
          <div className="related-product-grid">
            {related.map((item) => (
              <Link
                className="related-product-card"
                href={localizedPath(`/products/${item.slug}`, locale)}
                key={item.slug}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={560}
                  height={560}
                  sizes="(max-width: 620px) 30vw, 28vw"
                  unoptimized
                />
                <span>{copy.categoryNames[item.kind]}</span>
                <h3>{item.name}</h3>
                <b>
                  {copy.viewDetails} <span aria-hidden="true">→</span>
                </b>
              </Link>
            ))}
          </div>
        </section>
      </article>
      <SiteFooter locale={locale} />

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            image: product.image,
            description: product.description,
            category: product.category,
            url: `https://lolobuy-sheet.com${localizedPath(`/products/${product.slug}`, locale)}`,
            sku: product.listingReference,
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: copy.home,
                item: `https://lolobuy-sheet.com${localizedPath("/", locale)}`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: copy.finds,
                item: `https://lolobuy-sheet.com${localizedPath("/finds", locale)}`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: product.name,
                item: `https://lolobuy-sheet.com${localizedPath(`/products/${product.slug}`, locale)}`,
              },
            ],
          },
        ]}
      />
    </main>
  );
}
