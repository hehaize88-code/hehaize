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
      "Browse every current entry in one place. Open a card to review its image, category, listing reference and practical QC checklist before using the final listing button.",
    countLabel: "independent product pages",
    routeLabel: "step browsing route",
    routeValue: "Directory → details → current listing",
    searchLabel: "Search these product pages",
    searchPlaceholder: "Search by name or category",
    results: "products shown",
    reference: "Reference",
    details: "View product details",
    emptyTitle: "No matching product pages",
    emptyText: "Try a broader product name or return to the All filter.",
    guideEyebrow: "HOW THIS DIRECTORY WORKS",
    guideTitle: "One index. Separate pages. A deliberate final step.",
    guide: [
      [
        "Browse the complete index",
        "The Finds page keeps every curated entry together so visitors and search engines can reach the full collection from one permanent URL.",
      ],
      [
        "Open an on-site detail page",
        "Each card leads to a unique product page with a useful summary, reference, category-specific checks and related finds.",
      ],
      [
        "Continue only when ready",
        "The external listing is reached from the final button on the detail page, after the shopper has reviewed what should be verified.",
      ],
    ],
  },
  es: {
    home: "Inicio",
    eyebrow: "DIRECTORIO SELECCIONADO DE PRODUCTOS",
    title: "Todos los hallazgos, cada uno con su propia página.",
    intro:
      "Consulta todas las entradas actuales en un solo lugar. Abre una tarjeta para revisar la imagen, categoría, referencia y lista QC antes de continuar al anuncio actual.",
    countLabel: "páginas de producto independientes",
    routeLabel: "pasos de navegación",
    routeValue: "Directorio → detalles → anuncio actual",
    searchLabel: "Buscar en estas páginas",
    searchPlaceholder: "Buscar por nombre o categoría",
    results: "productos mostrados",
    reference: "Referencia",
    details: "Ver detalles del producto",
    emptyTitle: "No hay productos coincidentes",
    emptyText: "Prueba un nombre más amplio o vuelve al filtro Todos.",
    guideEyebrow: "CÓMO FUNCIONA EL DIRECTORIO",
    guideTitle: "Un índice. Páginas separadas. Un último paso consciente.",
    guide: [
      ["Explora el índice", "La página reúne todas las entradas en una URL permanente."],
      ["Abre el detalle", "Cada tarjeta conduce a una página propia con información y controles QC."],
      ["Continúa al final", "El anuncio externo solo se abre desde el botón final de la página de detalle."],
    ],
  },
  de: {
    home: "Startseite",
    eyebrow: "KURATIERTES PRODUKTVERZEICHNIS",
    title: "Alle Fundstücke mit jeweils eigener Detailseite.",
    intro:
      "Alle aktuellen Einträge an einem Ort. Öffne eine Karte, um Bild, Kategorie, Referenz und QC-Prüfliste zu lesen, bevor du zum aktuellen Angebot weitergehst.",
    countLabel: "eigenständige Produktseiten",
    routeLabel: "Navigationsschritte",
    routeValue: "Verzeichnis → Details → aktuelles Angebot",
    searchLabel: "Produktseiten durchsuchen",
    searchPlaceholder: "Nach Name oder Kategorie suchen",
    results: "Produkte angezeigt",
    reference: "Referenz",
    details: "Produktdetails ansehen",
    emptyTitle: "Keine passenden Produktseiten",
    emptyText: "Versuche einen allgemeineren Begriff oder den Filter Alle.",
    guideEyebrow: "SO FUNKTIONIERT DAS VERZEICHNIS",
    guideTitle: "Ein Index. Eigene Seiten. Ein bewusster letzter Schritt.",
    guide: [
      ["Gesamtindex öffnen", "Alle kuratierten Einträge sind über eine feste URL erreichbar."],
      ["Detailseite lesen", "Jede Karte öffnet eine eigene Seite mit Angaben und QC-Prüfpunkten."],
      ["Gezielt fortfahren", "Das externe Angebot folgt erst über die Schaltfläche auf der Detailseite."],
    ],
  },
  fr: {
    home: "Accueil",
    eyebrow: "RÉPERTOIRE PRODUITS SÉLECTIONNÉ",
    title: "Toute la sélection, avec une page dédiée par produit.",
    intro:
      "Retrouvez toutes les entrées actuelles au même endroit. Ouvrez une carte pour consulter l’image, la catégorie, la référence et la liste QC avant l’annonce actuelle.",
    countLabel: "pages produit indépendantes",
    routeLabel: "étapes de navigation",
    routeValue: "Répertoire → détails → annonce actuelle",
    searchLabel: "Rechercher dans ces pages",
    searchPlaceholder: "Rechercher par nom ou catégorie",
    results: "produits affichés",
    reference: "Référence",
    details: "Voir la fiche produit",
    emptyTitle: "Aucun produit correspondant",
    emptyText: "Essayez un terme plus large ou revenez au filtre Tout.",
    guideEyebrow: "FONCTIONNEMENT DU RÉPERTOIRE",
    guideTitle: "Un index. Des pages séparées. Une dernière étape maîtrisée.",
    guide: [
      ["Parcourir l’index", "Toutes les entrées sont accessibles depuis une URL permanente."],
      ["Lire la fiche", "Chaque carte ouvre une page unique avec des informations et contrôles QC."],
      ["Continuer ensuite", "L’annonce externe s’ouvre uniquement depuis le bouton final de la fiche."],
    ],
  },
  it: {
    home: "Home",
    eyebrow: "DIRECTORY CURATA DEI PRODOTTI",
    title: "Tutti i prodotti, ciascuno con una pagina dedicata.",
    intro:
      "Consulta tutte le voci attuali in un unico posto. Apri una scheda per vedere immagine, categoria, riferimento e controlli QC prima dell’inserzione corrente.",
    countLabel: "pagine prodotto indipendenti",
    routeLabel: "passaggi di navigazione",
    routeValue: "Directory → dettagli → inserzione corrente",
    searchLabel: "Cerca tra queste pagine",
    searchPlaceholder: "Cerca per nome o categoria",
    results: "prodotti visualizzati",
    reference: "Riferimento",
    details: "Vedi dettagli prodotto",
    emptyTitle: "Nessun prodotto corrispondente",
    emptyText: "Prova un termine più ampio o torna al filtro Tutti.",
    guideEyebrow: "COME FUNZIONA LA DIRECTORY",
    guideTitle: "Un indice. Pagine separate. Un ultimo passaggio consapevole.",
    guide: [
      ["Sfoglia l’indice", "Tutte le voci curate sono raggiungibili da un URL permanente."],
      ["Apri i dettagli", "Ogni scheda porta a una pagina unica con informazioni e controlli QC."],
      ["Continua alla fine", "L’inserzione esterna si apre solo dal pulsante finale della pagina."],
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
            <strong>3</strong>
            <span>{copy.routeLabel}</span>
          </p>
          <p>
            <strong>01 → 02 → 03</strong>
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
                <Link
                  href={localizedPath(`/products/${product.slug}`, locale)}
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
                </Link>
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
