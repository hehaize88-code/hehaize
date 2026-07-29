import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import { localeNames, translations, type Locale } from "./translations";

export const localizedLocales = ["es", "de", "fr", "it"] as const;
export type LocalizedLocale = (typeof localizedLocales)[number];

export const corePaths = [
  "/",
  "/products",
  "/categories",
  "/qc-guide",
  "/shipping",
  "/articles",
  "/faq",
  "/how-it-works",
] as const;

export type CorePath = (typeof corePaths)[number];

const translatableProps = new Set([
  "alt",
  "aria-label",
  "description",
  "eyebrow",
  "intro",
  "label",
  "placeholder",
  "title",
]);

function normalized(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

export function isLocale(value: string | null | undefined): value is Locale {
  return Boolean(value && value in localeNames);
}

export function isLocalizedLocale(
  value: string | null | undefined,
): value is LocalizedLocale {
  return localizedLocales.includes(value as LocalizedLocale);
}

export function isCorePath(value: string): value is CorePath {
  return corePaths.includes(value as CorePath);
}

export function translate(locale: Locale, value: string) {
  if (locale === "en") return value;
  const key = normalized(value);
  const translated = translations[locale][key];
  if (!translated) return value;

  const leading = value.match(/^\s*/)?.[0] ?? "";
  const trailing = value.match(/\s*$/)?.[0] ?? "";
  return `${leading}${translated}${trailing}`;
}

function removeLocalePrefix(pathname: string) {
  const segments = pathname.split("/");
  if (isLocalizedLocale(segments[1])) {
    segments.splice(1, 1);
  }
  const result = segments.join("/") || "/";
  return result.startsWith("/") ? result : `/${result}`;
}

export function corePathFromSegments(
  segments: string[] | undefined,
): CorePath | null {
  const path = segments?.length ? `/${segments.join("/")}` : "/";
  return isCorePath(path) ? path : null;
}

export function localizedPath(locale: Locale, rawHref: string) {
  if (
    !rawHref.startsWith("/") ||
    rawHref.startsWith("//") ||
    rawHref.startsWith("/assets/") ||
    rawHref.startsWith("/products/")
  ) {
    return rawHref;
  }

  const url = new URL(rawHref, "https://lolobuy-sheet.net");
  const basePath = removeLocalePrefix(url.pathname).replace(/\/+$/, "") || "/";

  if (!isCorePath(basePath)) {
    return `${basePath}${url.search}${url.hash}`;
  }

  const pathname =
    locale === "en"
      ? basePath
      : basePath === "/"
        ? `/${locale}`
        : `/${locale}${basePath}`;

  return `${pathname}${url.search}${url.hash}`;
}

export function absoluteUrl(path: string) {
  return new URL(path, "https://lolobuy-sheet.net").toString();
}

export function languageAlternates(path: CorePath) {
  return {
    en: absoluteUrl(localizedPath("en", path)),
    es: absoluteUrl(localizedPath("es", path)),
    de: absoluteUrl(localizedPath("de", path)),
    fr: absoluteUrl(localizedPath("fr", path)),
    it: absoluteUrl(localizedPath("it", path)),
    "x-default": absoluteUrl(localizedPath("en", path)),
  };
}

export function localizeReactNode(
  node: ReactNode,
  locale: Locale,
): ReactNode {
  if (typeof node === "string") {
    return translate(locale, node);
  }

  if (Array.isArray(node)) {
    return node.map((child) => localizeReactNode(child, locale));
  }

  if (!isValidElement(node)) {
    return node;
  }

  const element = node as ReactElement<Record<string, unknown>>;
  const props = element.props;

  if ("data-i18n-ignore" in props) {
    return node;
  }

  const nextProps: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(props)) {
    if (key === "children") continue;

    if (key === "href" && typeof value === "string") {
      nextProps[key] = localizedPath(locale, value);
      continue;
    }

    if (translatableProps.has(key) && typeof value === "string") {
      nextProps[key] = translate(locale, value);
    }
  }

  if ("children" in props) {
    nextProps.children = Children.map(props.children as ReactNode, (child) =>
      localizeReactNode(child, locale),
    );
  }

  return cloneElement(element, nextProps);
}
