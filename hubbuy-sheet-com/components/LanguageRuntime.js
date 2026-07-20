"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  LANGUAGE_STORAGE_KEY,
  getEnglishSource,
  getLanguage,
  languages,
  translateExact,
} from "@/data/i18n";

const LanguageContext = createContext({ locale: "en", setLanguage: () => {} });
const textSources = new WeakMap();
const attributeSources = new WeakMap();
const translatedAttributes = ["placeholder", "aria-label", "title"];

function isSupported(code) {
  return languages.some((language) => language.code === code);
}

function getSpacing(value) {
  const leading = value.match(/^\s*/)?.[0] || "";
  const trailing = value.match(/\s*$/)?.[0] || "";
  return { leading, trailing };
}

function shouldSkip(element) {
  return !element || Boolean(element.closest("script, style, noscript, code, pre, [data-no-translate]"));
}

function translateTextNode(node, locale) {
  if (shouldSkip(node.parentElement)) return;

  const current = node.nodeValue || "";
  const trimmed = current.trim();
  if (!trimmed) return;

  const spacing = getSpacing(current);
  const canonical = getEnglishSource(trimmed);
  let source = textSources.get(node);

  if (!source || source.english !== canonical) {
    source = { english: canonical, ...spacing };
    textSources.set(node, source);
  } else if (source.leading !== spacing.leading || source.trailing !== spacing.trailing) {
    source = { ...source, ...spacing };
    textSources.set(node, source);
  }

  const next = `${source.leading}${translateExact(source.english, locale)}${source.trailing}`;
  if (node.nodeValue !== next) node.nodeValue = next;
}

function translateElementAttributes(element, locale) {
  if (shouldSkip(element)) return;

  let sources = attributeSources.get(element);
  if (!sources) {
    sources = new Map();
    attributeSources.set(element, sources);
  }

  for (const attribute of translatedAttributes) {
    if (!element.hasAttribute(attribute)) continue;

    const current = element.getAttribute(attribute) || "";
    const canonical = getEnglishSource(current);
    if (!sources.has(attribute) || sources.get(attribute) !== canonical) sources.set(attribute, canonical);

    const next = translateExact(sources.get(attribute), locale);
    if (current !== next) element.setAttribute(attribute, next);
  }
}

function translateTree(root, locale) {
  if (!root) return;
  if (root.nodeType === Node.TEXT_NODE) {
    translateTextNode(root, locale);
    return;
  }

  if (root.nodeType === Node.ELEMENT_NODE) translateElementAttributes(root, locale);
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();
  while (node) {
    if (node.nodeType === Node.TEXT_NODE) translateTextNode(node, locale);
    else translateElementAttributes(node, locale);
    node = walker.nextNode();
  }
}

export function useSiteLanguage() {
  return useContext(LanguageContext);
}

export default function LanguageRuntime({ children }) {
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    const queryLanguage = new URLSearchParams(window.location.search).get("lang");
    let storedLanguage = null;
    try {
      storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    } catch {
      // The selector still works when storage is unavailable.
    }

    const initial = isSupported(queryLanguage) ? queryLanguage : storedLanguage;
    if (isSupported(initial)) setLocale(initial);
  }, []);

  useEffect(() => {
    document.documentElement.lang = getLanguage(locale).htmlLang;
    translateTree(document.body, locale);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "characterData") translateTextNode(mutation.target, locale);
        if (mutation.type === "attributes") translateElementAttributes(mutation.target, locale);
        for (const node of mutation.addedNodes || []) translateTree(node, locale);
      }
    });

    observer.observe(document.body, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: translatedAttributes,
    });

    return () => observer.disconnect();
  }, [locale]);

  const setLanguage = useCallback((nextLocale) => {
    if (!isSupported(nextLocale)) return;
    setLocale(nextLocale);

    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLocale);
    } catch {
      // A shareable URL remains available when storage is unavailable.
    }

    const url = new URL(window.location.href);
    if (nextLocale === "en") url.searchParams.delete("lang");
    else url.searchParams.set("lang", nextLocale);
    window.history.replaceState(window.history.state, "", url);
  }, []);

  const value = useMemo(() => ({ locale, setLanguage }), [locale, setLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
