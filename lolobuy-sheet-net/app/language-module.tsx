"use client";

import { useEffect, useState } from "react";
import {
  localeNames,
  translations,
  type Locale,
} from "./translations";

const originalText = new WeakMap<Text, string>();
const originalAttributes = new WeakMap<Element, Map<string, string>>();
const originalInternalHref = new WeakMap<HTMLAnchorElement, string>();

function normalized(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function lookup(original: string, locale: Locale) {
  if (locale === "en") return original;
  return translations[locale][normalized(original)] ?? original;
}

function translatedText(original: string, locale: Locale) {
  const translated = lookup(original, locale);
  if (translated === original) return original;
  const leading = original.match(/^\s*/)?.[0] ?? "";
  const trailing = original.match(/\s*$/)?.[0] ?? "";
  return `${leading}${translated}${trailing}`;
}

function rememberAttribute(element: Element, attribute: string) {
  let stored = originalAttributes.get(element);
  if (!stored) {
    stored = new Map<string, string>();
    originalAttributes.set(element, stored);
  }

  if (!stored.has(attribute)) {
    stored.set(attribute, element.getAttribute(attribute) ?? "");
  }

  return stored.get(attribute) ?? "";
}

function localizeInternalLinks(locale: Locale, root: ParentNode) {
  root
    .querySelectorAll<HTMLAnchorElement>('a[href^="/"]')
    .forEach((anchor) => {
      const original =
        originalInternalHref.get(anchor) ?? anchor.getAttribute("href") ?? "/";
      if (!originalInternalHref.has(anchor)) {
        originalInternalHref.set(anchor, original);
      }

      const url = new URL(original, window.location.origin);
      if (locale === "en") url.searchParams.delete("lang");
      else url.searchParams.set("lang", locale);
      anchor.setAttribute("href", `${url.pathname}${url.search}${url.hash}`);
    });
}

function applyLanguage(locale: Locale, root: ParentNode) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let current = walker.nextNode();

  while (current) {
    const textNode = current as Text;
    const parent = textNode.parentElement;

    if (
      parent &&
      !parent.closest("[data-i18n-ignore]") &&
      !["SCRIPT", "STYLE", "NOSCRIPT"].includes(parent.tagName)
    ) {
      const original = originalText.get(textNode) ?? textNode.nodeValue ?? "";
      if (!originalText.has(textNode)) originalText.set(textNode, original);
      const next = translatedText(original, locale);
      if (textNode.nodeValue !== next) textNode.nodeValue = next;
    }

    current = walker.nextNode();
  }

  root
    .querySelectorAll<HTMLElement>(
      "[placeholder], [aria-label], [title]",
    )
    .forEach((element) => {
      if (element.closest("[data-i18n-ignore]")) return;

      ["placeholder", "aria-label", "title"].forEach((attribute) => {
        if (!element.hasAttribute(attribute)) return;
        const original = rememberAttribute(element, attribute);
        const next = lookup(original, locale);
        if (element.getAttribute(attribute) !== next) {
          element.setAttribute(attribute, next);
        }
      });
    });

  localizeInternalLinks(locale, root);
}

function isLocale(value: string | null): value is Locale {
  return Boolean(value && value in localeNames);
}

export function LanguageModule() {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    const urlLocale = new URL(window.location.href).searchParams.get("lang");
    const stored = window.localStorage.getItem("lolobuy-sheet-language");
    const initial = isLocale(urlLocale)
      ? urlLocale
      : isLocale(stored)
        ? stored
        : "en";
    const frame = window.requestAnimationFrame(() => setLocale(initial));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dataset.locale = locale;
    window.localStorage.setItem("lolobuy-sheet-language", locale);
    applyLanguage(locale, document.body);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            applyLanguage(locale, node as Element);
          } else if (node.nodeType === Node.TEXT_NODE && node.parentNode) {
            applyLanguage(locale, node.parentNode);
          }
        });
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [locale]);

  function changeLocale(next: Locale) {
    setLocale(next);
    const url = new URL(window.location.href);
    if (next === "en") url.searchParams.delete("lang");
    else url.searchParams.set("lang", next);
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
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
