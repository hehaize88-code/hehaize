import type { Metadata } from "next";
import HomeClient from "./home-client";
import JsonLd from "./components/json-ld";
import { homeCopy, normalizeLocale, type Locale } from "./i18n";
import { absoluteLocalizedUrl, localizedMetadata } from "./seo";
import { getLocalizedArticles, getLocalizedFaqs } from "./localized-data";

const homeMetadataCopy: Record<
  Locale,
  { title: string; description: string }
> = {
  en: {
    title: "LoloBuy Spreadsheet: Product Finds, QC & Shipping Guides",
    description:
      "Browse Lolobuy product finds by category, open current listing links, and check sizing, variants and QC details before ordering.",
  },
  es: {
    title: "LoloBuy Spreadsheet: productos, QC y guías de envío",
    description:
      "Explora un spreadsheet Lolobuy seleccionado, descubre categorías, aprende a revisar fotos QC y abre las fichas actuales de cada producto.",
  },
  de: {
    title: "LoloBuy Spreadsheet: Produkte, QC und Versandratgeber",
    description:
      "Durchsuche ein kuratiertes Lolobuy Spreadsheet, entdecke Kategorien, prüfe Lagerfotos mit einem QC-Leitfaden und öffne aktuelle Angebote.",
  },
  fr: {
    title: "Spreadsheet LoloBuy : produits, QC et livraison",
    description:
      "Trouvez des produits LoloBuy, comparez les prix en USD et consultez les guides QC, frais et livraison en France avant de préparer votre colis.",
  },
  it: {
    title: "LoloBuy Spreadsheet: prodotti, QC e spedizioni",
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
  const latestArticles = getLocalizedArticles(locale).slice(0, 4).map(
    ({ slug, shortTitle, description, eyebrow, updated, readingTime }) =>
      ({ slug, shortTitle, description, eyebrow, updated, readingTime }),
  );

  return (
    <>
      <HomeClient locale={locale} latestArticles={latestArticles} localizedFaqs={getLocalizedFaqs(locale).slice(0, 5)} />
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
