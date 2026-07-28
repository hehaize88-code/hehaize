"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  headerCopy,
  localeOptions,
  localizedPath,
  type Locale,
} from "../i18n";

export default function SiteHeader({
  locale: initialLocale = "en",
}: {
  locale?: Locale;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const locale = initialLocale;
  const copy = headerCopy[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem("lolobuy-sheet-language", locale);
  }, [locale]);

  const navigation = [
    { label: copy.finds, href: "/finds" },
    { label: copy.categories, href: "/categories" },
    { label: copy.workflow, href: "/how-it-works" },
    { label: copy.qc, href: "/guides/qc" },
    { label: copy.shipping, href: "/guides/shipping" },
    { label: copy.faq, href: "/faq" },
    { label: copy.articles, href: "/articles" },
  ];

  function changeLocale(nextLocale: Locale) {
    const url = new URL(window.location.href);
    window.localStorage.setItem("lolobuy-sheet-language", nextLocale);
    window.location.assign(
      localizedPath(`${url.pathname}${url.search}${url.hash}`, nextLocale),
    );
  }

  return (
    <header className="site-header">
      <Link
        className="wordmark"
        href={localizedPath("/", locale)}
        aria-label="Lolobuy Sheet home"
      >
        <Image
          className="brand-logo"
          src="/lolobuy-logo.png"
          alt="LoloBuy"
          width={127}
          height={29}
          priority
          unoptimized
        />
      </Link>

      <button
        className="menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="main-navigation"
        onClick={() => setMenuOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
        <span className="sr-only">{copy.menu}</span>
      </button>

      <nav
        className={menuOpen ? "main-nav is-open" : "main-nav"}
        id="main-navigation"
        aria-label={copy.menu}
      >
        {navigation.map((item) => (
          <Link
            href={localizedPath(item.href, locale)}
            key={item.href}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}
        <Link
          className="nav-directory-link"
          href={localizedPath("/finds", locale)}
          onClick={() => setMenuOpen(false)}
        >
          {copy.browse} →
        </Link>
      </nav>

      <div className="header-actions">
        <label className="language-picker">
          <span className="language-icon" aria-hidden="true">
            ◎
          </span>
          <span className="sr-only">{copy.language}</span>
          <select
            aria-label={copy.language}
            value={locale}
            onChange={(event) => changeLocale(event.target.value as Locale)}
          >
            {localeOptions.map((option) => (
              <option value={option.code} key={option.code}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <Link
          className="header-cta"
          href={localizedPath("/finds", locale)}
        >
          {copy.browse}
        </Link>
      </div>
    </header>
  );
}
