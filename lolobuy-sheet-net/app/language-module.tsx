"use client";

import { localizedPath } from "./i18n";
import { localeNames, type Locale } from "./translations";

export function LanguageModule({ locale }: { locale: Locale }) {
  function changeLocale(next: Locale) {
    const url = new URL(window.location.href);
    const pathname = localizedPath(next, url.pathname);

    window.location.assign(`${pathname}${url.search}${url.hash}`);
  }

  return (
    <label className="language-module" data-i18n-ignore>
      <span aria-hidden="true">文</span>
      <span className="sr-only">Select language</span>
      <select
        aria-label="Select language"
        value={locale}
        onChange={(event) => changeLocale(event.target.value as Locale)}
      >
        {(Object.keys(localeNames) as Locale[]).map((key) => (
          <option key={key} value={key}>
            {localeNames[key]}
          </option>
        ))}
      </select>
    </label>
  );
}
