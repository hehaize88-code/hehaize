"use client";

import { usePathname } from "next/navigation";
import { localeOptions, SiteLocale } from "../i18n";

const localizedSections = new Set(["/", "/products", "/categories", "/how-it-works", "/guides", "/articles", "/faq"]);

function removeLocale(pathname: string) {
  return pathname.replace(/^\/(pt-br|de|es)(?=\/|$)/, "") || "/";
}

function localeHref(pathname: string, target: SiteLocale) {
  const cleanPath = removeLocale(pathname);
  const safePath = localizedSections.has(cleanPath) ? cleanPath : "/";
  if (target === "en") return safePath;
  return safePath === "/" ? `/${target}/` : `/${target}${safePath}`;
}

export function LanguageSwitcher({ locale = "en" }: { locale?: SiteLocale }) {
  const pathname = usePathname() || "/";
  const current = localeOptions.find((option) => option.code === locale) ?? localeOptions[0];

  return (
    <details className="language-switcher">
      <summary aria-label={`Change language. Current language: ${current.label}`}>
        <span aria-hidden="true">◎</span>{current.short}<b aria-hidden="true">⌄</b>
      </summary>
      <div className="language-menu">
        <span>Language</span>
        {localeOptions.map((option) => (
          <a
            className={option.code === locale ? "active" : ""}
            href={localeHref(pathname, option.code)}
            hrefLang={option.hrefLang}
            lang={option.hrefLang}
            key={option.code}
          >
            <b>{option.short}</b>{option.label}{option.code === locale ? <i aria-hidden="true">✓</i> : null}
          </a>
        ))}
      </div>
    </details>
  );
}
