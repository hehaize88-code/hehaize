"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import ProductImage from "../components/product-image";
import SiteFooter from "../components/site-footer";
import SiteHeader from "../components/site-header";
import { homeCopy, localizedPath, type Locale } from "../i18n";
import { getLocalizedProducts } from "../localized-data";

type Filter = "all" | "new" | "trending" | "essential";

const directoryCopy = {
  en: {
    home: "Home",
    eyebrow: "CURATED PRODUCT DIRECTORY",
    title: "Lolobuy Spreadsheet Finds: Curated Product Directory",
    intro:
      "Browse every current entry in one place. Each card carries its image, category and listing reference directly to the matching current product page on the main site.",
    countLabel: "matched product routes",
    routeLabel: "direct click",
    routeValue: "Directory reference → main listing",
    searchLabel: "Search these products",
    searchPlaceholder: "Search by name or category",
    results: "products shown",
    reference: "Reference",
    details: "View matching product",
    emptyTitle: "No matching product pages",
    emptyText: "Try a broader product name or return to the All filter.",
    guideEyebrow: "HOW THIS DIRECTORY WORKS",
    guideTitle: "One index. Exact references. Direct product routes.",
    guide: [
      [
        "Browse the complete index",
        "The Finds page keeps every curated entry together so visitors and search engines can reach the full collection from one permanent URL.",
      ],
      [
        "Check the directory reference",
        "Each card keeps the matching image, product name, category and main-site listing reference together.",
      ],
      [
        "Open the matching product",
        "The card opens the exact corresponding main-site product in a new tab so the current offer can be checked immediately.",
      ],
    ],
  },
  es: {
    home: "Inicio",
    eyebrow: "DIRECTORIO SELECCIONADO DE PRODUCTOS",
    title: "Todos los hallazgos con su producto correspondiente.",
    intro:
      "Consulta todas las entradas actuales en un solo lugar. Cada tarjeta abre directamente el producto correspondiente del sitio principal con la misma referencia.",
    countLabel: "rutas de producto verificadas",
    routeLabel: "clic directo",
    routeValue: "Referencia → producto principal",
    searchLabel: "Buscar productos",
    searchPlaceholder: "Buscar por nombre o categoría",
    results: "productos mostrados",
    reference: "Referencia",
    details: "Ver producto correspondiente",
    emptyTitle: "No hay productos coincidentes",
    emptyText: "Prueba un nombre más amplio o vuelve al filtro Todos.",
    guideEyebrow: "CÓMO FUNCIONA EL DIRECTORIO",
    guideTitle: "Un índice. Referencias exactas. Rutas directas.",
    guide: [
      ["Explora el índice", "La página reúne todas las entradas en una URL permanente."],
      ["Comprueba la referencia", "Cada tarjeta conserva juntos la imagen, el nombre, la categoría y la referencia correspondiente."],
      ["Abre el producto", "La tarjeta abre directamente el producto exacto del sitio principal en una pestaña nueva."],
    ],
  },
  de: {
    home: "Startseite",
    eyebrow: "KURATIERTES PRODUKTVERZEICHNIS",
    title: "Alle Fundstücke mit dem jeweils passenden Produkt.",
    intro:
      "Alle aktuellen Einträge an einem Ort. Jede Karte öffnet anhand derselben Referenz direkt das passende Produkt auf der Hauptseite.",
    countLabel: "zugeordnete Produktrouten",
    routeLabel: "direkter Klick",
    routeValue: "Referenz → Hauptangebot",
    searchLabel: "Produkte durchsuchen",
    searchPlaceholder: "Nach Name oder Kategorie suchen",
    results: "Produkte angezeigt",
    reference: "Referenz",
    details: "Passendes Produkt öffnen",
    emptyTitle: "Keine passenden Produktseiten",
    emptyText: "Versuche einen allgemeineren Begriff oder den Filter Alle.",
    guideEyebrow: "SO FUNKTIONIERT DAS VERZEICHNIS",
    guideTitle: "Ein Index. Exakte Referenzen. Direkte Produktrouten.",
    guide: [
      ["Gesamtindex öffnen", "Alle kuratierten Einträge sind über eine feste URL erreichbar."],
      ["Referenz prüfen", "Jede Karte hält Bild, Name, Kategorie und passende Hauptseiten-Referenz zusammen."],
      ["Produkt öffnen", "Die Karte öffnet das exakt passende Produkt der Hauptseite direkt in einem neuen Tab."],
    ],
  },
  fr: {
    home: "Accueil",
    eyebrow: "RÉPERTOIRE PRODUITS SÉLECTIONNÉ",
    title: "Toute la sélection avec le produit correspondant.",
    intro:
      "Retrouvez toutes les entrées actuelles au même endroit. Chaque carte ouvre directement le produit correspondant du site principal avec la même référence.",
    countLabel: "routes produit associées",
    routeLabel: "clic direct",
    routeValue: "Référence → produit principal",
    searchLabel: "Rechercher des produits",
    searchPlaceholder: "Rechercher par nom ou catégorie",
    results: "produits affichés",
    reference: "Référence",
    details: "Voir le produit correspondant",
    emptyTitle: "Aucun produit correspondant",
    emptyText: "Essayez un terme plus large ou revenez au filtre Tout.",
    guideEyebrow: "FONCTIONNEMENT DU RÉPERTOIRE",
    guideTitle: "Un index. Des références exactes. Des routes directes.",
    guide: [
      ["Parcourir l’index", "Toutes les entrées sont accessibles depuis une URL permanente."],
      ["Vérifier la référence", "Chaque carte réunit l’image, le nom, la catégorie et la référence correspondante."],
      ["Ouvrir le produit", "La carte ouvre directement le produit exact du site principal dans un nouvel onglet."],
    ],
  },
  it: {
    home: "Home",
    eyebrow: "DIRECTORY CURATA DEI PRODOTTI",
    title: "Tutti i prodotti con l’articolo corrispondente.",
    intro:
      "Consulta tutte le voci attuali in un unico posto. Ogni scheda apre direttamente il prodotto corrispondente del sito principale con lo stesso riferimento.",
    countLabel: "percorsi prodotto associati",
    routeLabel: "clic diretto",
    routeValue: "Riferimento → prodotto principale",
    searchLabel: "Cerca prodotti",
    searchPlaceholder: "Cerca per nome o categoria",
    results: "prodotti visualizzati",
    reference: "Riferimento",
    details: "Vedi prodotto corrispondente",
    emptyTitle: "Nessun prodotto corrispondente",
    emptyText: "Prova un termine più ampio o torna al filtro Tutti.",
    guideEyebrow: "COME FUNZIONA LA DIRECTORY",
    guideTitle: "Un indice. Riferimenti esatti. Percorsi diretti.",
    guide: [
      ["Sfoglia l’indice", "Tutte le voci curate sono raggiungibili da un URL permanente."],
      ["Controlla il riferimento", "Ogni scheda riunisce immagine, nome, categoria e riferimento corrispondente."],
      ["Apri il prodotto", "La scheda apre direttamente il prodotto esatto del sito principale in una nuova scheda."],
    ],
  },
} as const;

export default function FindsClient({ locale }: { locale: Locale }) {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const copy = directoryCopy[locale];
  const localizedProducts = getLocalizedProducts(locale);
  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: homeCopy[locale].filters.all },
    { id: "new", label: homeCopy[locale].filters.new },
    { id: "trending", label: homeCopy[locale].filters.trending },
    { id: "essential", label: homeCopy[locale].filters.essential },
  ];

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return localizedProducts.filter((product) => {
      const matchesFilter =
        activeFilter === "all" || product.tags.includes(activeFilter);
      const matchesQuery =
        !normalizedQuery ||
        `${product.name} ${product.category} ${product.listingReference}`
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesFilter && matchesQuery;
    });
  }, [activeFilter, localizedProducts, query]);

  return (
    <main className="finds-directory-page">
      <SiteHeader locale={locale} />

      <section className="finds-directory-hero">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <span>
            <Link href={localizedPath("/", locale)}>{copy.home}</Link>
            <b aria-hidden="true">/</b>
          </span>
          <span>{homeCopy[locale].curatedTitle}</span>
        </nav>

        <div className="finds-directory-intro">
          <div>
            <p className="eyebrow">{copy.eyebrow}</p>
            <h1>{copy.title}</h1>
          </div>
          <p>{copy.intro}</p>
        </div>

        <div className="finds-directory-facts" aria-label="Directory summary">
          <p>
            <strong>{localizedProducts.length}</strong>
            <span>{copy.countLabel}</span>
          </p>
          <p>
            <strong>1</strong>
            <span>{copy.routeLabel}</span>
          </p>
          <p>
            <strong>ID → ID</strong>
            <span>{copy.routeValue}</span>
          </p>
        </div>
      </section>

      <section className="finds-directory-section" aria-label={copy.eyebrow}>
        <div className="finds-directory-controls">
          <div className="filter-tabs" role="tablist" aria-label="Find filters">
            {filters.map((filter) => (
              <button
                key={filter.id}
                className={activeFilter === filter.id ? "is-active" : ""}
                type="button"
                role="tab"
                aria-selected={activeFilter === filter.id}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <label className="finds-directory-search">
            <span className="sr-only">{copy.searchLabel}</span>
            <input
              type="search"
              value={query}
              placeholder={copy.searchPlaceholder}
              onChange={(event) => setQuery(event.target.value)}
            />
            <span aria-hidden="true">⌕</span>
          </label>

          <p>
            <strong>{visibleProducts.length}</strong> {copy.results}
          </p>
        </div>

        {visibleProducts.length > 0 ? (
          <div className="finds-directory-grid">
            {visibleProducts.map((product, index) => (
              <article className="finds-directory-card" key={product.slug}>
                <a
                  href={product.destinationHref}
                  target="_blank"
                  rel="sponsored noopener"
                  aria-label={`${copy.details}: ${product.name}`}
                >
                  <div className="finds-directory-image">
                    <ProductImage
                      slug={product.slug}
                      alt={product.name}
                      sizes="(max-width: 620px) 46vw, (max-width: 1040px) 31vw, 23vw"
                      priority={index < 4}
                    />
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="finds-directory-card-copy">
                    <p>{product.category}</p>
                    <h2>{product.name}</h2>
                    <span>{product.description}</span>
                    <dl>
                      <dt>{copy.reference}</dt>
                      <dd>{product.listingReference}</dd>
                    </dl>
                    <b>
                      {copy.details} <span aria-hidden="true">→</span>
                    </b>
                  </div>
                </a>
              </article>
            ))}
          </div>
        ) : (
          <div className="finds-directory-empty">
            <h2>{copy.emptyTitle}</h2>
            <p>{copy.emptyText}</p>
          </div>
        )}
      </section>

      <section className="finds-directory-guide">
        <div>
          <p className="eyebrow">{copy.guideEyebrow}</p>
          <h2>{copy.guideTitle}</h2>
        </div>
        <ol>
          {copy.guide.map((item, index) => (
            <li key={item[0]}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{item[0]}</h3>
                <p>{item[1]}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <SiteFooter locale={locale} />
    </main>
  );
}
