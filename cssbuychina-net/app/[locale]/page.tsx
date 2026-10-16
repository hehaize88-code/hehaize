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
    "pt-br": "Planilha CSSBuy 2026: Achados, Links e Frete",
    de: "CSSBuy Spreadsheet 2026: Funde, Links & Versand",
    es: "Hoja CSSBuy 2026: Productos, Enlaces y Envíos",
    en: "CSSBuy Spreadsheet 2026",
  };
  const descriptions = {
    "pt-br": "Explore achados e links na planilha CSSBuy. Compare preços em USD, confira fotos e planeje QC, devoluções e frete para o Brasil e outros destinos.",
    de: "Entdecke CSSBuy-Funde und Produktlinks nach Kategorien. Vergleiche USD-Preise, prüfe Bilder und plane Lager-QC, Rückgaben und internationalen Versand.",
    es: "Explora productos y enlaces en la hoja CSSBuy. Compara precios en USD, revisa fotos y planifica QC, devoluciones y envíos internacionales.",
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
