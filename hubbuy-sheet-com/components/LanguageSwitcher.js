"use client";

import { useRef } from "react";
import { getLanguage, languages } from "@/data/i18n";
import { useSiteLanguage } from "@/components/LanguageRuntime";

export default function LanguageSwitcher() {
  const menuRef = useRef(null);
  const { locale, setLanguage } = useSiteLanguage();
  const current = getLanguage(locale);

  function selectLanguage(code) {
    setLanguage(code);
    menuRef.current?.removeAttribute("open");
  }

  return (
    <details className="language-switcher" ref={menuRef} data-no-translate>
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
            <button
              className="language-option"
              type="button"
              key={language.code}
              aria-current={selected ? "true" : undefined}
              onClick={() => selectLanguage(language.code)}
            >
              <span className="language-flag" aria-hidden="true">{language.flag}</span>
              <span>
                <strong>{language.label}</strong>
                <small>{language.market}</small>
              </span>
              <span className="language-check" aria-hidden="true">{selected ? "✓" : ""}</span>
            </button>
          );
        })}
      </div>
    </details>
  );
}
