import type { Metadata } from "next";
import { localeOptions, localizedPath, type Locale } from "./i18n";

export const siteUrl = "https://lolobuy-sheet.com";
export const defaultSocialImage = `${siteUrl}/social/lolobuy-sheet-share.webp`;

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

export function compactMetaDescription(
  description: string,
  maxLength = 155,
) {
  const normalized = description.replace(/\s+/g, " ").trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  const candidate = normalized.slice(0, maxLength - 1);
  const lastWordBoundary = candidate.lastIndexOf(" ");
  const shortened =
    lastWordBoundary >= Math.floor(maxLength * 0.72)
      ? candidate.slice(0, lastWordBoundary)
      : candidate;

  return `${shortened.replace(/[\s,;:–—-]+$/u, "")}…`;
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
  const searchDescription = compactMetaDescription(description);

  return {
    title: { absolute: title },
    description: searchDescription,
    alternates: {
      canonical,
      languages: languageAlternates(path),
    },
    openGraph: {
      title,
      description: searchDescription,
      url: canonical,
      siteName: "Lolobuy Sheet",
      locale: openGraphLocales[locale],
      alternateLocale: localeOptions
        .filter((option) => option.code !== locale)
        .map((option) => openGraphLocales[option.code]),
      type: "website",
      images: [
        {
          url: defaultSocialImage,
          width: 1200,
          height: 630,
          alt: "Lolobuy Sheet — independent product research and QC guides",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: searchDescription,
      images: [defaultSocialImage],
    },
    other: {
      "content-language": locale,
    },
  };
}
