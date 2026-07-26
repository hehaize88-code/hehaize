import type { Metadata } from "next";
import JsonLd from "../components/json-ld";
import { localizedPath, normalizeLocale, type Locale } from "../i18n";
import { getLocalizedProducts } from "../localized-data";
import FindsClient from "./finds-client";

const metadataCopy: Record<Locale, { title: string; description: string; listName: string }> = {
  en: {
    title: "Lolobuy Finds | Complete Product Directory",
    description:
      "Browse every curated Lolobuy Sheet product entry, compare useful listing details and open a separate on-site product page before continuing to the current listing.",
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

  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: localizedPath("/finds", locale),
      languages: {
        en: "/finds",
        es: "/finds?lang=es",
        de: "/finds?lang=de",
        fr: "/finds?lang=fr",
        it: "/finds?lang=it",
        "x-default": "/finds",
      },
    },
  };
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
          numberOfItems: localizedProducts.length,
          itemListElement: localizedProducts.map((product, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: product.name,
            url: `https://lolobuy-sheet.com${localizedPath(`/products/${product.slug}`, locale)}`,
          })),
        }}
      />
    </>
  );
}
