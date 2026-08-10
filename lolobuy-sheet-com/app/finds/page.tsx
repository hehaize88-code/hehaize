import type { Metadata } from "next";
import JsonLd from "../components/json-ld";
import { normalizeLocale, type Locale } from "../i18n";
import { getLocalizedProducts } from "../localized-data";
import {
  absoluteLocalizedUrl,
  localizedMetadata,
} from "../seo";
import FindsClient from "./finds-client";

const metadataCopy: Record<Locale, { title: string; description: string; listName: string }> = {
  en: {
    title: "Lolobuy Spreadsheet Finds 2026 | Product Directory",
    description:
      "Browse curated Lolobuy spreadsheet finds with product pages, listing references and QC checklists before opening each current destination listing.",
    listName: "Lolobuy Sheet curated finds",
  },
  es: {
    title: "Productos Lolobuy | Directorio completo",
    description:
      "Explora todos los productos seleccionados, compara los datos útiles y abre una página independiente antes de continuar a la ficha actual.",
    listName: "Selección de productos Lolobuy Sheet",
  },
  de: {
    title: "Lolobuy-Produkte | Vollständiges Verzeichnis",
    description:
      "Alle kuratierten Produkte ansehen, wichtige Angaben vergleichen und vor dem aktuellen Angebot eine eigene Detailseite öffnen.",
    listName: "Kuratierte Lolobuy-Sheet-Produkte",
  },
  fr: {
    title: "Produits Lolobuy | Répertoire complet",
    description:
      "Parcourez toute la sélection, comparez les informations utiles et ouvrez une fiche dédiée avant de consulter l’annonce actuelle.",
    listName: "Sélection de produits Lolobuy Sheet",
  },
  it: {
    title: "Prodotti Lolobuy | Directory completa",
    description:
      "Sfoglia tutti i prodotti selezionati, confronta i dati utili e apri una pagina dedicata prima dell’inserzione corrente.",
    listName: "Selezione di prodotti Lolobuy Sheet",
  },
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string | string[] }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const locale = normalizeLocale(params.lang);
  const copy = metadataCopy[locale];

  return localizedMetadata({
    locale,
    path: "/finds",
    title: copy.title,
    description: copy.description,
  });
}

export default async function FindsPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string | string[] }>;
}) {
  const params = await searchParams;
  const locale = normalizeLocale(params.lang);
  const localizedProducts = getLocalizedProducts(locale);
  const copy = metadataCopy[locale];

  return (
    <>
      <FindsClient locale={locale} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: copy.listName,
          inLanguage: locale,
          numberOfItems: localizedProducts.length,
          itemListElement: localizedProducts.map((product, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: product.name,
            url: absoluteLocalizedUrl(`/products/${product.slug}`, locale),
          })),
        }}
      />
    </>
  );
}
