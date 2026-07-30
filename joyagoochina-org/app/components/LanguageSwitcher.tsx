"use client";

import { languages, type Locale } from "../i18n";

const switcherLabels: Record<Locale, string> = {
  en: "Choose language",
  zh: "选择语言",
  de: "Sprache wählen",
  pl: "Wybierz język",
  es: "Elegir idioma",
  it: "Scegli la lingua",
  fr: "Choisir la langue",
  pt: "Escolher idioma",
  ro: "Alege limba",
  sv: "Välj språk",
};

export default function LanguageSwitcher({
  currentLocale = "en",
}: {
  currentLocale?: Locale;
}) {
  const changeLanguage = (nextLocale: string) => {
    const segments = window.location.pathname.split("/").filter(Boolean);
    const firstSegment = segments[0];
    const localeCodes = languages.map((language) => language.code);

    if (localeCodes.includes(firstSegment as Locale) && firstSegment !== "en") {
      segments.shift();
    }

    const suffix = segments.length ? `/${segments.join("/")}/` : "/";
    window.location.href =
      nextLocale === "en" ? suffix : `/${nextLocale}${suffix}`;
  };

  return (
    <label className="language-switcher">
      <span className="sr-only">{switcherLabels[currentLocale]}</span>
      <select
        aria-label={switcherLabels[currentLocale]}
        defaultValue={currentLocale}
        onChange={(event) => changeLanguage(event.target.value)}
      >
        {languages.map((language) => (
          <option value={language.code} key={language.code}>
            {language.flag} {language.label}
          </option>
        ))}
      </select>
    </label>
  );
}
