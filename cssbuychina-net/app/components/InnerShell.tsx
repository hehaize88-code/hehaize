"use client";

import { FormEvent, ReactNode, useState } from "react";
import { localeCopy, localePrefix, SiteLocale } from "../i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function InnerShell({ children, locale = "en" }: { children: ReactNode; locale?: SiteLocale }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const copy = localeCopy[locale];
  const prefix = localePrefix(locale);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = query.trim();
    if (!value) return;
    window.location.href = `https://cnbuycha.com/AllProducts/?q=${encodeURIComponent(value)}`;
  }

  return (
    <>
      <header className="site-header inner-header">
        <a className="brand" href={prefix || "/"} aria-label="CSSBuy China home">
          <img className="brand-logo" src="/cssbuy-logo.png" alt="CSSBuy" />
          <span className="brand-tagline">{copy.brandTagline}</span>
        </a>
        <nav className={menuOpen ? "nav-links nav-links--open" : "nav-links"} aria-label="Main navigation">
          <a href={`${prefix}/products`}>{copy.nav.all}</a>
          <a href={`${prefix}/categories`}>{copy.nav.categories}</a>
          <a href={`${prefix}/how-it-works`}>{copy.nav.how}</a>
          <a href={`${prefix}/guides`}>{copy.nav.guides}</a>
          <a href={`${prefix}/articles`}>{copy.nav.articles}</a>
          <a href={`${prefix}/faq`}>{copy.nav.faq}</a>
        </nav>
        <div className="header-actions">
          <LanguageSwitcher locale={locale} />
          <a className="header-cta" href={`${prefix}/products`}>{copy.nav.browse} <span aria-hidden="true">↗</span></a>
          <button className="menu-button" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </header>
      {children}
      <footer>
        <div className="footer-top">
          <a className="brand brand--light" href={prefix || "/"}>
            <img className="brand-logo" src="/cssbuy-logo.png" alt="CSSBuy" />
            <span className="brand-tagline">{copy.brandTagline}</span>
          </a>
          <p>{copy.footer.copy}</p>
          <form className="search-box search-box--compact" onSubmit={submit}>
            <label className="sr-only" htmlFor="footer-search">{copy.searchLabel}</label>
            <span className="search-icon" aria-hidden="true">⌕</span>
            <input id="footer-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={copy.nav.all} />
            <button type="submit">{copy.hero.search} <span aria-hidden="true">↗</span></button>
          </form>
        </div>
        <div className="footer-bottom">
          <span>{copy.footer.copyright}</span>
          <div>{copy.footer.links.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</div>
        </div>
      </footer>
    </>
  );
}
