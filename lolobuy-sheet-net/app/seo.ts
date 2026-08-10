import type { Metadata } from "next";
import {
  absoluteUrl,
  languageAlternates,
  localizedPath,
  type CorePath,
} from "./i18n";
import type { Locale } from "./translations";

type SeoCopy = {
  title: string;
  description: string;
};

const routeSeo: Record<CorePath, Record<Locale, SeoCopy>> = {
  "/": {
    en: {
      title: "LoloBuy Spreadsheet 2026: Finds, QC & Shipping",
      description:
        "Browse current LoloBuy spreadsheet product finds with matched images and item links, plus independent QC and international-shipping guidance.",
    },
    es: {
      title: "Hoja LoloBuy 2026: productos, QC y envíos",
      description:
        "Consulta productos de la hoja LoloBuy con imágenes y enlaces vinculados, además de guías independientes de QC y envío internacional.",
    },
    de: {
      title: "LoloBuy Spreadsheet 2026: Produkte, QC und Versand",
      description:
        "Durchsuche LoloBuy-Produktfunde mit passenden Bildern und Artikellinks sowie unabhängige Hinweise zu QC und internationalem Versand.",
    },
    fr: {
      title: "Tableur LoloBuy 2026 : produits, QC et livraison",
      description:
        "Parcourez des produits LoloBuy avec images et liens associés, ainsi que des guides indépendants sur le QC et l'expédition internationale.",
    },
    it: {
      title: "Foglio LoloBuy 2026: prodotti, QC e spedizione",
      description:
        "Esplora prodotti LoloBuy con immagini e link abbinati, oltre a guide indipendenti su QC e spedizione internazionale.",
    },
  },
  "/products": {
    en: {
      title: "LoloBuy Products and Main-Site Search",
      description:
        "Search the main product catalog with your exact keyword and browse LoloBuy product finds with matched images and item pages.",
    },
    es: {
      title: "Productos LoloBuy y búsqueda en el catálogo",
      description:
        "Busca en el catálogo principal con tu palabra exacta y consulta productos LoloBuy con imágenes vinculadas a sus páginas.",
    },
    de: {
      title: "LoloBuy Produkte und Katalogsuche",
      description:
        "Durchsuche den Hauptkatalog mit deinem genauen Begriff und öffne LoloBuy-Produktfunde mit passenden Bildern und Artikelseiten.",
    },
    fr: {
      title: "Produits LoloBuy et recherche dans le catalogue",
      description:
        "Recherchez le terme exact dans le catalogue principal et parcourez des produits LoloBuy dont les images correspondent aux pages produit.",
    },
    it: {
      title: "Prodotti LoloBuy e ricerca nel catalogo",
      description:
        "Cerca nel catalogo principale con il termine esatto e consulta prodotti LoloBuy con immagini abbinate alle pagine articolo.",
    },
  },
  "/categories": {
    en: {
      title: "LoloBuy Product Categories",
      description:
        "Browse shoes, hoodies, jackets and accessories through focused main-catalog category links.",
    },
    es: {
      title: "Categorías de productos LoloBuy",
      description:
        "Explora calzado, sudaderas, chaquetas y accesorios mediante enlaces directos a las categorías del catálogo principal.",
    },
    de: {
      title: "LoloBuy Produktkategorien",
      description:
        "Stöbere über gezielte Kategorien des Hauptkatalogs nach Schuhen, Hoodies, Jacken und Accessoires.",
    },
    fr: {
      title: "Catégories de produits LoloBuy",
      description:
        "Parcourez chaussures, sweats, vestes et accessoires grâce aux liens ciblés vers les catégories du catalogue principal.",
    },
    it: {
      title: "Categorie di prodotti LoloBuy",
      description:
        "Esplora scarpe, felpe, giacche e accessori tramite link mirati alle categorie del catalogo principale.",
    },
  },
  "/qc-guide": {
    en: {
      title: "LoloBuy QC Photos and Warehouse Inspection Guide",
      description:
        "Use a fact-checked LoloBuy QC checklist for item identity, variants, measurements, visible condition and the limits of warehouse photos.",
    },
    es: {
      title: "Guía de fotos QC e inspección de LoloBuy",
      description:
        "Usa una lista de QC de LoloBuy para revisar identidad, variante, medidas, estado visible y límites de las fotos de almacén.",
    },
    de: {
      title: "LoloBuy QC-Fotos und Lagerprüfung",
      description:
        "Nutze eine geprüfte LoloBuy-QC-Liste für Artikelidentität, Variante, Maße, sichtbaren Zustand und die Grenzen von Lagerfotos.",
    },
    fr: {
      title: "Guide des photos QC et du contrôle LoloBuy",
      description:
        "Utilisez une liste QC LoloBuy vérifiée pour contrôler identité, variante, mesures, état visible et limites des photos d'entrepôt.",
    },
    it: {
      title: "Guida alle foto QC e al controllo LoloBuy",
      description:
        "Usa una lista QC LoloBuy verificata per controllare identità, variante, misure, condizioni visibili e limiti delle foto di magazzino.",
    },
  },
  "/shipping": {
    en: {
      title: "LoloBuy Shipping Cost and Parcel Planning Guide",
      description:
        "Understand LoloBuy shipping cost variables, route restrictions, actual and volumetric weight, consolidation and packing choices.",
    },
    es: {
      title: "Coste de envío LoloBuy y planificación del paquete",
      description:
        "Comprende las variables del envío LoloBuy: rutas, peso real y volumétrico, consolidación y opciones de embalaje.",
    },
    de: {
      title: "LoloBuy Versandkosten und Paketplanung",
      description:
        "Verstehe LoloBuy-Versandfaktoren wie Routenlimits, tatsächliches und volumetrisches Gewicht, Konsolidierung und Verpackung.",
    },
    fr: {
      title: "Coût de livraison LoloBuy et préparation du colis",
      description:
        "Comprenez les variables de livraison LoloBuy : limites de ligne, poids réel et volumétrique, consolidation et emballage.",
    },
    it: {
      title: "Costi di spedizione LoloBuy e pianificazione del pacco",
      description:
        "Comprendi le variabili di spedizione LoloBuy: limiti delle linee, peso reale e volumetrico, consolidamento e imballaggio.",
    },
  },
  "/articles": {
    en: {
      title: "LoloBuy Buying Guides: Spreadsheet, QC and Shipping",
      description:
        "Read fact-checked LoloBuy spreadsheet, QC and shipping guides written around real buying decisions.",
    },
    es: {
      title: "Guías LoloBuy: hoja, QC y envío",
      description:
        "Lee guías verificadas sobre la hoja LoloBuy, QC y envío, centradas en decisiones reales de compra.",
    },
    de: {
      title: "LoloBuy Ratgeber: Spreadsheet, QC und Versand",
      description:
        "Lies geprüfte LoloBuy-Ratgeber zu Spreadsheet, QC und Versand, die sich an echten Kaufentscheidungen orientieren.",
    },
    fr: {
      title: "Guides LoloBuy : tableur, QC et livraison",
      description:
        "Lisez des guides LoloBuy vérifiés sur le tableur, le QC et la livraison, conçus pour de vraies décisions d'achat.",
    },
    it: {
      title: "Guide LoloBuy: foglio, QC e spedizione",
      description:
        "Leggi guide LoloBuy verificate su foglio, QC e spedizione, pensate per decisioni di acquisto reali.",
    },
  },
  "/faq": {
    en: {
      title: "LoloBuy FAQ: Spreadsheet, QC, Storage and Shipping",
      description:
        "Fact-checked answers about LoloBuy spreadsheet links, ordering, QC photos, 90-day storage, consolidation and international shipping.",
    },
    es: {
      title: "FAQ LoloBuy: hoja, QC, almacén y envío",
      description:
        "Respuestas verificadas sobre enlaces LoloBuy, pedidos, fotos QC, 90 días de almacenamiento, consolidación y envío internacional.",
    },
    de: {
      title: "LoloBuy FAQ: Spreadsheet, QC, Lagerung und Versand",
      description:
        "Geprüfte Antworten zu LoloBuy-Links, Bestellung, QC-Fotos, 90 Tagen Lagerung, Konsolidierung und internationalem Versand.",
    },
    fr: {
      title: "FAQ LoloBuy : tableur, QC, stockage et livraison",
      description:
        "Réponses vérifiées sur les liens LoloBuy, commandes, photos QC, 90 jours de stockage, consolidation et livraison internationale.",
    },
    it: {
      title: "FAQ LoloBuy: foglio, QC, deposito e spedizione",
      description:
        "Risposte verificate su link LoloBuy, ordini, foto QC, 90 giorni di deposito, consolidamento e spedizione internazionale.",
    },
  },
  "/how-it-works": {
    en: {
      title: "How the LoloBuy Product-Finding Flow Works",
      description:
        "Follow a product from matched catalog page to listing review, source preservation, warehouse QC and parcel planning.",
    },
    es: {
      title: "Cómo funciona el proceso de búsqueda LoloBuy",
      description:
        "Sigue un producto desde el catálogo vinculado hasta la revisión del anuncio, conservación del enlace, QC y planificación del paquete.",
    },
    de: {
      title: "So funktioniert die LoloBuy Produktsuche",
      description:
        "Verfolge ein Produkt von der passenden Katalogseite über Angebotsprüfung und Quellsicherung bis zu QC und Paketplanung.",
    },
    fr: {
      title: "Fonctionnement de la recherche de produits LoloBuy",
      description:
        "Suivez un produit de la page catalogue associée à la vérification de l'annonce, la conservation de la source, le QC et la préparation du colis.",
    },
    it: {
      title: "Come funziona la ricerca prodotti LoloBuy",
      description:
        "Segui un prodotto dalla pagina catalogo abbinata alla verifica dell'inserzione, conservazione della fonte, QC e pianificazione del pacco.",
    },
  },
};

export function seoCopy(locale: Locale, path: CorePath) {
  return routeSeo[path][locale];
}

const coreSocialImages: Record<
  CorePath,
  { url: string; alt: string }
> = {
  "/": {
    url: "/social/spreadsheet-guide.png",
    alt: "LoloBuy Sheet product discovery, checking and parcel-planning flow",
  },
  "/products": {
    url: "/social/product-catalog.png",
    alt: "Search, match and verify product catalog workflow",
  },
  "/categories": {
    url: "/social/categories.png",
    alt: "Category map for shoes, layers, outerwear and accessories",
  },
  "/qc-guide": {
    url: "/social/qc-guide.png",
    alt: "Warehouse photo checklist for item, variant, condition and measurements",
  },
  "/shipping": {
    url: "/social/shipping-guide.png",
    alt: "Parcel planning comparison of actual and volumetric weight",
  },
  "/articles": {
    url: "/social/buying-guides.png",
    alt: "LoloBuy Sheet buying guides for spreadsheet, QC and shipping research",
  },
  "/faq": {
    url: "/social/faq.png",
    alt: "LoloBuy Sheet frequently asked questions and evidence-led answers",
  },
  "/how-it-works": {
    url: "/social/how-it-works.png",
    alt: "Seven-step product discovery, order, QC and parcel-planning flow",
  },
};

export function coreMetadata(locale: Locale, path: CorePath): Metadata {
  const copy = seoCopy(locale, path);
  const canonicalPath = localizedPath(locale, path);
  const socialImage = coreSocialImages[path];

  return {
    title: path === "/" ? { absolute: copy.title } : copy.title,
    description: copy.description,
    alternates: {
      canonical: absoluteUrl(canonicalPath),
      languages: languageAlternates(path),
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      type: "website",
      url: absoluteUrl(canonicalPath),
      siteName: "LoloBuy Sheet",
      locale,
      alternateLocale: ["en", "es", "de", "fr", "it"].filter(
        (value) => value !== locale,
      ),
      images: [
        {
          url: socialImage.url,
          width: 1200,
          height: 630,
          alt: socialImage.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
      images: [socialImage.url],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
