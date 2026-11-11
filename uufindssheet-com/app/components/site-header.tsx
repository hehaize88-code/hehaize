"use client";

import Link from "next/link";
import { SiteImage } from "./site-image";
import {localeList} from "../../public/assets/locale-core.mjs";
import {pageLanguages,pageLanguageHref} from "../../public/assets/page-languages.mjs";
import {CURRENCIES} from "../../commerce/experience.mjs";
const languageOptions = [
  { code: "EN", label: "English", language: "en", href: "/", hrefLang: "en" },
  { code: "UK", label: "English (UK)", language: "en-gb", href: "/en-gb/", hrefLang: "en-GB" },
  { code: "DE", label: "Deutsch", language: "de", href: "/de/", hrefLang: "de-DE" },
  { code: "PL", label: "Polski", language: "pl", href: "/pl/", hrefLang: "pl-PL" },
  { code: "BR", label: "Português", language: "pt-br", href: "/pt-br/", hrefLang: "pt-BR" },
];

type HeaderLabels = {
  finds: string;
  products: string;
  qcGuide: string;
  howItWorks: string;
  articles: string;
  faq: string;
  shopMain: string;
  language: string;
  menu?: string;
};

const defaultLabels: HeaderLabels = {
  finds: "Finds",
  products: "Products",
  qcGuide: "QC Guide",
  howItWorks: "How It Works",
  articles: "Articles",
  faq: "FAQ",
  shopMain: "Enter the main site",
  language: "Language",
  menu: "Menu",
};

export function SiteHeader({
  locale = "EN",
  labels = defaultLabels,
  routePath = "",
  englishOnly = false,
}: {
  locale?: string;
  labels?: HeaderLabels;
  routePath?: string;
  englishOnly?: boolean;
}) {
  const language = locale === "UK" ? "en-gb" : locale === "DE" ? "de" : locale === "PL" ? "pl" : locale === "BR" ? "pt-br" : "en";
  const current = languageOptions.find((option) => option.language === language) || languageOptions[0];
  const prefix = language === "en" ? "" : `/${language}`;
  const localHref = (path: string) => `${prefix}${path}`;
  const expandedLanguages = localeList.map(([language,label,code]:string[])=>({language,label,code,hrefLang:language}));
  const availableLanguages=pageLanguages(englishOnly);
  const languageHref = (code:string) => pageLanguageHref(code,routePath || "/");
  const availability = ({de:{available:"Sprachen dieser Seite",missing:"Für diese Seite noch nicht verfügbar",more:"Weitere Sprachen sind im Produktkatalog verfügbar."},pl:{available:"Języki tej strony",missing:"Tłumaczenie tej strony jeszcze niedostępne",more:"Więcej języków jest dostępnych w katalogu produktów."},"pt-br":{available:"Idiomas desta página",missing:"Tradução desta página ainda indisponível",more:"Mais idiomas estão disponíveis no catálogo de produtos."}} as Record<string,{available:string;missing:string;more:string}>)[language] || {available:"Languages for this page",missing:"Translation not yet available for this page",more:"More languages are available in the product catalogue."};
  const currentLabels = language === "de"
    ? { finds: "Funde", products: "Produkte", qcGuide: "QC-Leitfaden", howItWorks: "So funktioniert es", articles: "Artikel", faq: "FAQ", shopMain: "Hauptseite öffnen", language: "Sprache", menu: "Menü" }
    : language === "pl"
      ? { finds: "Znaleziska", products: "Produkty", qcGuide: "Poradnik QC", howItWorks: "Jak to działa", articles: "Artykuły", faq: "FAQ", shopMain: "Otwórz stronę główną", language: "Język", menu: "Menu" }
      : language === "pt-br"
        ? { finds: "Achados", products: "Produtos", qcGuide: "Guia de QC", howItWorks: "Como funciona", articles: "Artigos", faq: "FAQ", shopMain: "Abrir site principal", language: "Idioma", menu: "Menu" }
        : labels;

  return (
    <header className="site-header">
      <Link className="brand" href={localHref("/")} aria-label="UUFinds Sheet home">
        <SiteImage
          className="brand-logo"
          src="/uufinds-official-logo.png"
          alt="UUFinds"
          width={1144}
          height={284}
          priority
        />
      </Link>
      <nav aria-label="Main navigation">
        {/* The catalogue serves HTML outside Next's exported client router. */}
        <a href={localHref("/catalog/")}>{currentLabels.finds}</a>
        <a href={localHref("/catalog/")}>{currentLabels.products}</a>
        <Link href={localHref("/guides/uufinds-qc-checklist/")}>{currentLabels.qcGuide}</Link>
        <Link href={localHref("/how-it-works/")}>{currentLabels.howItWorks}</Link>
        <Link href={localHref("/articles/")}>{currentLabels.articles}</Link>
        <Link href={localHref("/faq/")}>{currentLabels.faq}</Link>
      </nav>
      <div className="header-actions">
        <details className="mobile-nav-menu">
          <summary aria-label={currentLabels.menu ?? "Menu"}>{currentLabels.menu ?? "Menu"}</summary>
          <div className="mobile-nav-panel">
            <a href={localHref("/catalog/")}>{currentLabels.finds}</a>
            <a href={localHref("/catalog/")}>{currentLabels.products}</a>
            <Link href={localHref("/guides/uufinds-qc-checklist/")}>{currentLabels.qcGuide}</Link>
            <Link href={localHref("/how-it-works/")}>{currentLabels.howItWorks}</Link>
            <Link href={localHref("/articles/")}>{currentLabels.articles}</Link>
            <Link href={localHref("/faq/")}>{currentLabels.faq}</Link>
          </div>
        </details>
        <details className="language-menu">
          <summary aria-label={currentLabels.language}>
            <span aria-hidden="true">◎</span> {current.code} <b aria-hidden="true">⌄</b>
          </summary>
          <div className="language-panel">
            <p>{currentLabels.language}</p>
            {expandedLanguages.filter(option=>availableLanguages.includes(option.language)).map((option) => (
              <a href={languageHref(option.language)} hrefLang={option.hrefLang} lang={option.hrefLang}
                onClick={event=>{event.currentTarget.href=pageLanguageHref(option.language,routePath || "/",window.location.search,window.location.hash);}}
                aria-current={option.language === language ? "page" : undefined} key={option.code}>
                <b>{option.code}</b><span>{option.label}</span>
              </a>
            ))}
            <details className="unavailable-languages">
              <summary>{availability.missing}</summary>
              <p>{availability.more}</p>
              {expandedLanguages.filter(option=>!availableLanguages.includes(option.language)).map(option=><span className="language-unavailable" aria-disabled="true" lang={option.hrefLang} key={option.code}><b>{option.code}</b>{option.label}</span>)}
            </details>
          </div>
        </details>
        <label className="header-currency"><span className="sr-only">Currency</span><select data-currency-select aria-label="Currency">{CURRENCIES.map((code:string)=><option key={code} value={code}>{code}</option>)}</select></label>
        <a className="seo-guide-button" href="https://www.uufinds.com/register" target="_blank" rel="noreferrer" data-track-event="register_click" data-cta-position="header">
          <span className="long-label">{({de:"Bei UUFinds registrieren",pl:"Rejestracja UUFinds","pt-br":"Cadastrar no UUFinds"} as Record<string,string>)[language] || "Register on UUFinds"}</span><span className="short-label">{({de:"Registrieren",pl:"Rejestracja","pt-br":"Cadastrar"} as Record<string,string>)[language]||"Register"}</span> ↗
        </a>
      </div>
    </header>
  );
}
