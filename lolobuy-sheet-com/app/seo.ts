import type { Metadata } from "next";
import { localeOptions, localizedPath, type Locale } from "./i18n";

export const siteUrl = "https://lolobuy-sheet.com";

const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  es: "es_ES",
  de: "de_DE",
  fr: "fr_FR",
  it: "it_IT",
};

export function languageAlternates(path: string) {
  return {
    ...Object.fromEntries(
      localeOptions.map((option) => [
        option.code,
        localizedPath(path, option.code),
      ]),
    ),
    "x-default": localizedPath(path, "en"),
  };
}

export function absoluteLocalizedUrl(path: string, locale: Locale) {
  return `${siteUrl}${localizedPath(path, locale)}`;
}

export function localizedMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
}): Metadata {
  const canonical = localizedPath(path, locale);

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: languageAlternates(path),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Lolobuy Sheet",
      locale: openGraphLocales[locale],
      alternateLocale: localeOptions
        .filter((option) => option.code !== locale)
        .map((option) => openGraphLocales[option.code]),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    other: {
      "content-language": locale,
    },
  };
}
