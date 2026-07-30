import { languages } from "./i18n";

const baseUrl = "https://joyagoochina.org";

export const normalizeRoutePath = (path: string) => {
  const withLeadingSlash = path.startsWith("/") ? path : `/${path}`;
  if (withLeadingSlash === "/") return "/";
  return withLeadingSlash.endsWith("/")
    ? withLeadingSlash
    : `${withLeadingSlash}/`;
};

export const localizedRoutePath = (locale: string, path: string) => {
  const normalized = normalizeRoutePath(path);
  return locale === "en"
    ? normalized
    : normalized === "/"
      ? `/${locale}/`
      : `/${locale}${normalized}`;
};

export const languageAlternates = (path: string) => {
  const normalized = normalizeRoutePath(path);
  return {
    canonical: normalized,
    languages: {
      ...Object.fromEntries(
        languages.map((language) => [
          language.code,
          localizedRoutePath(language.code, normalized),
        ]),
      ),
      "x-default": normalized,
    },
  };
};

export const absoluteLocalizedUrl = (locale: string, path: string) =>
  `${baseUrl}${localizedRoutePath(locale, path)}`;
