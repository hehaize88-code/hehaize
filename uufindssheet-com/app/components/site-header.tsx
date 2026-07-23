"use client";

import Link from "next/link";
import { SiteImage } from "./site-image";
const languageOptions = [
  { code: "US", label: "English (US)", language: "en", href: "/", hrefLang: "en-US" },
  { code: "UK", label: "English (UK)", language: "en-gb", href: "/en-gb/", hrefLang: "en-GB" },
  { code: "DE", label: "Deutsch", language: "de", href: "/de/", hrefLang: "de" },
  { code: "PL", label: "Polski", language: "pl", href: "/pl/", hrefLang: "pl" },
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
  shopMain: "Enter CNBuy Sheet",
  language: "Language",
  menu: "Menu",
};

export function SiteHeader({
  locale = "EN",
  labels = defaultLabels,
  routePath = "",
}: {
  locale?: string;
  labels?: HeaderLabels;
  routePath?: string;
}) {
  const language = locale === "UK" ? "en-gb" : locale === "DE" ? "de" : locale === "PL" ? "pl" : locale === "BR" ? "pt-br" : "en";
  const current = languageOptions.find((option) => option.language === language) || languageOptions[0];
  const prefix = language === "en" ? "" : `/${language}`;
  const localHref = (path: string) => `${prefix}${path}`;
  const languageHref = (option: (typeof languageOptions)[number]) =>
    `${option.language === "en" ? "" : `/${option.language}`}${routePath || "/"}`;
  const currentLabels = language === "de"
    ? { finds: "Funde", products: "Produkte", qcGuide: "QC-Leitfaden", howItWorks: "So funktioniert es", articles: "Artikel", faq: "FAQ", shopMain: "CNBuy Sheet öffnen", language: "Sprache", menu: "Menü" }
    : language === "pl"
      ? { finds: "Znaleziska", products: "Produkty", qcGuide: "Poradnik QC", howItWorks: "Jak to działa", articles: "Artykuły", faq: "FAQ", shopMain: "Otwórz CNBuy Sheet", language: "Język", menu: "Menu" }
      : language === "pt-br"
        ? { finds: "Achados", products: "Produtos", qcGuide: "Guia de QC", howItWorks: "Como funciona", articles: "Artigos", faq: "FAQ", shopMain: "Abrir CNBuy Sheet", language: "Idioma", menu: "Menu" }
        : labels;

  return (
    <header className="site-header">
      <Link className="brand" href={localHref("/")} aria-label="UUFinds Sheet home">
        <SiteImage
          className="brand-logo"
          src="/optimized/uufinds-logo.webp"
          alt="UUFinds"
          width={1144}
          height={284}
          priority
        />
      </Link>
      <nav aria-label="Main navigation">
        <Link href={localHref("/finds/")}>{currentLabels.finds}</Link>
        <Link href={localHref("/products/")}>{currentLabels.products}</Link>
        <Link href={localHref("/guides/uufinds-qc-checklist/")}>{currentLabels.qcGuide}</Link>
        <Link href={localHref("/how-it-works/")}>{currentLabels.howItWorks}</Link>
        <Link href={localHref("/articles/")}>{currentLabels.articles}</Link>
        <Link href={localHref("/faq/")}>{currentLabels.faq}</Link>
      </nav>
      <div className="header-actions">
        <details className="mobile-nav-menu">
          <summary aria-label={currentLabels.menu ?? "Menu"}>{currentLabels.menu ?? "Menu"}</summary>
          <div className="mobile-nav-panel">
            <Link href={localHref("/finds/")}>{currentLabels.finds}</Link>
            <Link href={localHref("/products/")}>{currentLabels.products}</Link>
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
            {languageOptions.map((option) => (
              <Link
                href={languageHref(option)}
                hrefLang={option.hrefLang}
                lang={option.hrefLang}
                aria-current={option.language === language ? "page" : undefined}
                key={option.code}
              >
                <b>{option.code}</b>
                <span>{option.label}</span>
              </Link>
            ))}
          </div>
        </details>
        <a className="seo-guide-button" href="https://www.cnbuycha.com/" target="_blank" rel="noreferrer">
          <span className="long-label">{currentLabels.shopMain}</span><span className="short-label">SHOP</span> ↗
        </a>
      </div>
    </header>
  );
}
