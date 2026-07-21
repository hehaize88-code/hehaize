"use client";

import { getLanguage, languages } from "@/data/i18n";
import { getLocalizedPath } from "@/data/i18n";
import { useSiteLanguage } from "@/components/LanguageRuntime";
import { usePathname } from "next/navigation";

export default function LanguageSwitcher() {
  const { locale } = useSiteLanguage();
  const pathname = usePathname() || "/";
  const current = getLanguage(locale);

  return (
    <details className="language-switcher">
      <summary aria-label="Choose language">
        <span className="language-globe" aria-hidden="true">◎</span>
        <strong>{current.short}</strong>
        <span className="language-chevron" aria-hidden="true">⌄</span>
      </summary>
      <div className="language-menu" role="group" aria-label="Languages">
        <p>Language</p>
        {languages.map((language) => {
          const selected = language.code === locale;
          return (
            <a
              className="language-option"
              href={getLocalizedPath(pathname, language.code)}
              hrefLang={language.hrefLang}
              lang={language.htmlLang}
              key={language.code}
              data-locale-code={language.code}
              aria-current={selected ? "page" : undefined}
            >
              <span className="language-flag" aria-hidden="true">{language.flag}</span>
              <span>
                <strong>{language.label}</strong>
                <small>{language.market}</small>
              </span>
              <span className="language-check" aria-hidden="true">{selected ? "✓" : ""}</span>
            </a>
          );
        })}
      </div>
    </details>
  );
}
