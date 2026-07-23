"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { SiteLanguage } from "./language-translator";

const languageOptions = [
  { code: "EN", label: "English", language: "en" },
  { code: "DE", label: "Deutsch", language: "de" },
  { code: "PL", label: "Polski", language: "pl" },
  { code: "BR", label: "Português", language: "pt-br" },
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
}: {
  locale?: string;
  labels?: HeaderLabels;
}) {
  const initialLanguage = (locale === "DE" ? "de" : locale === "PL" ? "pl" : locale === "BR" ? "pt-br" : "en") as SiteLanguage;
  const [language, setLanguage] = useState<SiteLanguage>(initialLanguage);

  useEffect(() => {
    const stored = window.localStorage.getItem("uufinds-language") as SiteLanguage | null;
    if (stored && languageOptions.some((option) => option.language === stored)) {
      const frame = window.requestAnimationFrame(() => setLanguage(stored));
      return () => window.cancelAnimationFrame(frame);
    }
  }, []);

  const current = languageOptions.find((option) => option.language === language) || languageOptions[0];
  const currentLabels = language === "de"
    ? { finds: "Funde", products: "Produkte", qcGuide: "QC-Leitfaden", howItWorks: "So funktioniert es", articles: "Artikel", faq: "FAQ", shopMain: "CNBuy Sheet öffnen", language: "Sprache", menu: "Menü" }
    : language === "pl"
      ? { finds: "Znaleziska", products: "Produkty", qcGuide: "Poradnik QC", howItWorks: "Jak to działa", articles: "Artykuły", faq: "FAQ", shopMain: "Otwórz CNBuy Sheet", language: "Język", menu: "Menu" }
      : language === "pt-br"
        ? { finds: "Achados", products: "Produtos", qcGuide: "Guia de QC", howItWorks: "Como funciona", articles: "Artigos", faq: "FAQ", shopMain: "Abrir CNBuy Sheet", language: "Idioma", menu: "Menu" }
        : labels;

  function selectLanguage(nextLanguage: SiteLanguage, button: HTMLButtonElement) {
    setLanguage(nextLanguage);
    window.localStorage.setItem("uufinds-language", nextLanguage);
    window.dispatchEvent(new CustomEvent("uufinds-language-change", { detail: nextLanguage }));
    button.closest("details")?.removeAttribute("open");
  }

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="UUFinds Sheet home">
        <Image
          className="brand-logo"
          src="/uufinds-logo.png"
          alt="UUFinds"
          width={1144}
          height={284}
          priority
          unoptimized
        />
      </Link>
      <nav aria-label="Main navigation">
        <Link href="/finds">{currentLabels.finds}</Link>
        <Link href="/products">{currentLabels.products}</Link>
        <Link href="/guides/uufinds-qc-checklist">{currentLabels.qcGuide}</Link>
        <Link href="/how-it-works">{currentLabels.howItWorks}</Link>
        <Link href="/articles">{currentLabels.articles}</Link>
        <Link href="/faq">{currentLabels.faq}</Link>
      </nav>
      <div className="header-actions">
        <details className="mobile-nav-menu">
          <summary aria-label={currentLabels.menu ?? "Menu"}>{currentLabels.menu ?? "Menu"}</summary>
          <div className="mobile-nav-panel">
            <Link href="/finds">{currentLabels.finds}</Link>
            <Link href="/products">{currentLabels.products}</Link>
            <Link href="/guides/uufinds-qc-checklist">{currentLabels.qcGuide}</Link>
            <Link href="/how-it-works">{currentLabels.howItWorks}</Link>
            <Link href="/articles">{currentLabels.articles}</Link>
            <Link href="/faq">{currentLabels.faq}</Link>
          </div>
        </details>
        <details className="language-menu">
          <summary aria-label={currentLabels.language}>
            <span aria-hidden="true">◎</span> {current.code} <b aria-hidden="true">⌄</b>
          </summary>
          <div className="language-panel">
            <p>{currentLabels.language}</p>
            {languageOptions.map((option) => (
              <button
                type="button"
                aria-pressed={option.language === language}
                onClick={(event) => selectLanguage(option.language as SiteLanguage, event.currentTarget)}
                key={option.code}
              >
                <b>{option.code}</b>
                <span>{option.label}</span>
              </button>
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
