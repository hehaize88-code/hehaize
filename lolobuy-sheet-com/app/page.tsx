import type { Metadata } from "next";
import HomeClient from "./home-client";
import JsonLd from "./components/json-ld";
import { homeCopy, normalizeLocale, type Locale } from "./i18n";
import { absoluteLocalizedUrl, localizedMetadata } from "./seo";

const homeMetadataCopy: Record<
  Locale,
  { title: string; description: string }
> = {
  en: {
    title: "Lolobuy Spreadsheet 2026 | Curated Finds & QC Guide",
    description:
      "Browse a curated Lolobuy spreadsheet, explore product categories, learn how to review QC photos, and open current product listings.",
  },
  es: {
    title: "Spreadsheet Lolobuy 2026 | Productos y guía QC",
    description:
      "Explora un spreadsheet Lolobuy seleccionado, descubre categorías, aprende a revisar fotos QC y abre las fichas actuales de cada producto.",
  },
  de: {
    title: "Lolobuy Spreadsheet 2026 | Produkte & QC-Leitfaden",
    description:
      "Durchsuche ein kuratiertes Lolobuy Spreadsheet, entdecke Kategorien, prüfe Lagerfotos mit einem QC-Leitfaden und öffne aktuelle Angebote.",
  },
  fr: {
    title: "Spreadsheet Lolobuy 2026 | Produits et guide QC",
    description:
      "Parcourez un spreadsheet Lolobuy sélectionné, explorez les catégories, apprenez à contrôler les photos QC et ouvrez les fiches actuelles.",
  },
  it: {
    title: "Spreadsheet Lolobuy 2026 | Prodotti e guida QC",
    description:
      "Esplora uno spreadsheet Lolobuy selezionato, scopri le categorie, impara a controllare le foto QC e apri le schede prodotto attuali.",
  },
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string | string[] }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const locale = normalizeLocale(params.lang);
  return localizedMetadata({
    locale,
    path: "/",
    ...homeMetadataCopy[locale],
  });
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string | string[] }>;
}) {
  const params = await searchParams;
  const locale = normalizeLocale(params.lang);
  const copy = homeCopy[locale];

  return (
    <>
      <HomeClient locale={locale} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Lolobuy Sheet",
          url: absoluteLocalizedUrl("/", locale),
          inLanguage: locale,
          description: copy.intro,
          publisher: {
            "@type": "Organization",
            "@id": "https://lolobuy-sheet.com/#organization",
            name: "Lolobuy Sheet",
            url: "https://lolobuy-sheet.com/",
            logo: {
              "@type": "ImageObject",
              url: "https://lolobuy-sheet.com/social/lolobuy-publisher-logo.png",
              width: 512,
              height: 512,
            },
          },
        }}
      />
    </>
  );
}
