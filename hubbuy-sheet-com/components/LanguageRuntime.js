"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import {
  LANGUAGE_STORAGE_KEY,
  getEnglishSource,
  getLanguage,
  getLocalizedPath,
  languages,
  translateExact,
} from "@/data/i18n";

const LanguageContext = createContext({ locale: "en", setLanguage: () => {} });
const textSources = new WeakMap();
const attributeSources = new WeakMap();
const translatedAttributes = ["placeholder", "aria-label", "title"];
const staticAssetPattern = /\.(?:avif|css|gif|ico|jpe?g|js|json|png|svg|txt|webp|xml)$/i;

function isSupported(code) {
  return languages.some((language) => language.code === code);
}

function getPathLanguage(pathname) {
  const firstSegment = pathname.split("/").filter(Boolean)[0]?.toLowerCase();
  return isSupported(firstSegment) && firstSegment !== "en" ? firstSegment : "en";
}

function getSpacing(value) {
  const leading = value.match(/^\s*/)?.[0] || "";
  const trailing = value.match(/\s*$/)?.[0] || "";
  return { leading, trailing };
}

function shouldSkip(element) {
  return !element || Boolean(element.closest("script, style, noscript, code, pre"));
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

function localizeInternalLink(element, locale) {
  if (element?.tagName !== "A" || element.hasAttribute("data-locale-code")) return;
  const href = element.getAttribute("href") || "";
  if (!href.startsWith("/") || href.startsWith("//") || staticAssetPattern.test(href.split(/[?#]/)[0])) return;

  const url = new URL(href, window.location.origin);
  const localized = `${getLocalizedPath(url.pathname, locale)}${url.search}${url.hash}`;
  if (href !== localized) element.setAttribute("href", localized);
}

function translateTree(root, locale) {
  if (!root) return;
  if (root.nodeType === Node.TEXT_NODE) {
    translateTextNode(root, locale);
    return;
  }

  if (root.nodeType === Node.ELEMENT_NODE) {
    translateElementAttributes(root, locale);
    localizeInternalLink(root, locale);
  }
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();
  while (node) {
    if (node.nodeType === Node.TEXT_NODE) translateTextNode(node, locale);
    else {
      translateElementAttributes(node, locale);
      localizeInternalLink(node, locale);
    }
    node = walker.nextNode();
  }
}

export function useSiteLanguage() {
  return useContext(LanguageContext);
}

export default function LanguageRuntime({ children }) {
  const [locale, setLocale] = useState("en");
  const pathname = usePathname() || "/";

  useEffect(() => {
    const pathLanguage = getPathLanguage(pathname);
    const search = new URLSearchParams(window.location.search);
    const queryLanguage = search.get("lang");
    if (pathLanguage === "en" && isSupported(queryLanguage) && queryLanguage !== "en") {
      search.delete("lang");
      const query = search.toString();
      const destination = `${getLocalizedPath(pathname, queryLanguage)}${query ? `?${query}` : ""}${window.location.hash}`;
      window.location.replace(destination);
      return;
    }
    setLocale(pathLanguage);
  }, [pathname]);

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
      attributeFilter: [...translatedAttributes, "href"],
    });

    return () => observer.disconnect();
  }, [locale]);

  const setLanguage = useCallback((nextLocale) => {
    if (!isSupported(nextLocale)) return;

    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLocale);
    } catch {
      // A shareable URL remains available when storage is unavailable.
    }

    const destination = getLocalizedPath(window.location.pathname, nextLocale);
    if (window.location.pathname !== destination) window.location.assign(destination);
    else setLocale(nextLocale);
  }, []);

  const value = useMemo(() => ({ locale, setLanguage }), [locale, setLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
