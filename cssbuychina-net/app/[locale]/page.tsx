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
    "pt-br": "Planilha CSSBuy 2026 – Produtos e links verificados",
    de: "CSSBuy Tabelle 2026 – Geprüfte Produkte und Links",
    es: "Hoja CSSBuy 2026 – Productos y enlaces revisados",
    en: "CSSBuy Spreadsheet 2026",
  };
  return {
    title: titles[locale],
    alternates: {
      canonical: `/${locale}/`,
      languages: { en: "/", "pt-BR": "/pt-br/", "de-DE": "/de/", es: "/es/", "x-default": "/" },
    },
  };
}

export default async function LocaleHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isSiteLocale(locale) || locale === "en") notFound();
  return <HomeView locale={locale} />;
}
