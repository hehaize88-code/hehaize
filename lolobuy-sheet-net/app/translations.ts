import { guideTranslationRows } from "./translations-guides";
import { homeTranslationRows } from "./translations-home";
import { sharedTranslationRows } from "./translations-shared";

export type Locale = "en" | "es" | "de" | "fr" | "it";

export const localeNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
  de: "Deutsch",
  fr: "Français",
  it: "Italiano",
};

const translationRows = [
  ...sharedTranslationRows,
  ...homeTranslationRows,
  ...guideTranslationRows,
] as const;

function dictionary(column: 1 | 2 | 3 | 4) {
  return Object.fromEntries(
    translationRows.map((row) => [row[0], row[column]]),
  ) as Record<string, string>;
}

export const translations: Record<
  Exclude<Locale, "en">,
  Record<string, string>
> = {
  es: dictionary(1),
  de: dictionary(2),
  fr: dictionary(3),
  it: dictionary(4),
};

export const translatedEnglishKeys = new Set(
  translationRows.map((row) => row[0]),
);
