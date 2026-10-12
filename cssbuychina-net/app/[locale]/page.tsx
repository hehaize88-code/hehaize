import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomeView } from "../page";
import { isSiteLocale, localeOptions } from "../i18n";

export function generateStaticParams() {
  return localeOptions.filter((option) => option.code !== "en").map((option) => ({ locale: option.code }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isSiteLocale(locale) || locale === "en") return {};
  const titles = {
    "pt-br": "Planilha CSSBuy 2026 – Busca de produtos e fotos QC",
    de: "CSSBuy Tabelle 2026 – Produktsuche und QC-Bilder",
    es: "Hoja CSSBuy 2026 – Búsqueda de productos y fotos QC",
    en: "CSSBuy Spreadsheet 2026",
  };
  const descriptions = {
    "pt-br": "Explore uma planilha CSSBuy independente com produtos, preços em USD, categorias, verificações de QC no armazém e planejamento do pacote internacional.",
    de: "Durchsuche eine unabhängige CSSBuy-Tabelle mit Produkten, USD-Preisen, Kategorien, Lager-QC-Prüfungen und internationaler Paketplanung.",
    es: "Explora una hoja CSSBuy independiente con productos, precios en USD, categorías, controles de QC en almacén y planificación del paquete internacional.",
    en: "Browse an independent CSSBuy spreadsheet with checked product routes and practical warehouse and parcel guidance.",
  };
  const openGraphLocales = { "pt-br": "pt_BR", de: "de_DE", es: "es_ES", en: "en_US" } as const;
  const url = `https://cssbuychina.net/${locale}`;
  return {
    title: { absolute: titles[locale] },
    description: descriptions[locale],
    alternates: {
      canonical: url,
      languages: { en: "/", "pt-BR": "/pt-br", "de-DE": "/de", es: "/es", "x-default": "/" },
    },
    openGraph: { type: "website", locale: openGraphLocales[locale], url, siteName: "CSSBuy China", title: titles[locale], description: descriptions[locale] },
    twitter: { card: "summary_large_image", title: titles[locale], description: descriptions[locale] },
  };
}

export default async function LocaleHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isSiteLocale(locale) || locale === "en") notFound();
  return <HomeView locale={locale} />;
}
