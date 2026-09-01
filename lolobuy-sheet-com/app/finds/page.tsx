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
      "Browse curated Lolobuy spreadsheet finds with exact listing references and direct links to each corresponding current product on the main site.",
    listName: "Lolobuy Sheet curated finds",
  },
  es: {
    title: "Productos Lolobuy | Directorio completo",
    description:
      "Explora los productos seleccionados con referencias exactas y enlaces directos a cada producto correspondiente del sitio principal.",
    listName: "Selección de productos Lolobuy Sheet",
  },
  de: {
    title: "Lolobuy-Produkte | Vollständiges Verzeichnis",
    description:
      "Kuratierte Produkte mit exakten Referenzen und direkten Links zum jeweils passenden Produkt der Hauptseite ansehen.",
    listName: "Kuratierte Lolobuy-Sheet-Produkte",
  },
  fr: {
    title: "Produits Lolobuy | Répertoire complet",
    description:
      "Parcourez la sélection avec des références exactes et des liens directs vers chaque produit correspondant du site principal.",
    listName: "Sélection de produits Lolobuy Sheet",
  },
  it: {
    title: "Prodotti Lolobuy | Directory completa",
    description:
      "Sfoglia i prodotti selezionati con riferimenti esatti e link diretti a ogni prodotto corrispondente del sito principale.",
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
