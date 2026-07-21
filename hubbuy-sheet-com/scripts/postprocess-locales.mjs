import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { articles } from "../data/articles.js";
import { getLocalizedPath, translations } from "../data/i18n.js";
import { localePages } from "../data/locale-content.js";

const outputRoot = resolve(process.argv[2] || "out");
const siteUrl = "https://hubbuy-sheet.com";
const lastModified = "2026-07-21";
const localeConfig = {
  en: { code: "en", hrefLang: "en", htmlLang: "en", short: "EN", ogLocale: "en_US" },
  "pt-br": localePages["pt-br"],
  de: localePages.de,
};
const baseRoutes = [
  "/",
  "/products/",
  "/articles/",
  "/guides/how-to-buy/",
  "/guides/qc-checks/",
  "/guides/shipping/",
  "/faq/",
  "/about/",
  "/contact/",
  "/legal/privacy/",
  "/legal/terms/",
  ...articles.map((article) => `/articles/${article.slug}/`),
];
const staticAssetPattern = /\.(?:avif|css|gif|ico|jpe?g|js|json|png|svg|txt|webp|xml)$/i;
const translatedMetaFields = new Set([
  "description",
  "keywords",
  "og:title",
  "og:description",
  "twitter:title",
  "twitter:description",
]);

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#x27;");
}

function decodeHtml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&#39;", "'")
    .replaceAll("&apos;", "'");
}

function routeForLocale(route, locale) {
  return getLocalizedPath(route, locale);
}

function htmlPath(route, locale = "en") {
  const localizedRoute = routeForLocale(route, locale);
  return localizedRoute === "/"
    ? resolve(outputRoot, "index.html")
    : resolve(outputRoot, localizedRoute.slice(1), "index.html");
}

function translateValue(value, dictionary) {
  const leading = value.match(/^\s*/)?.[0] || "";
  const trailing = value.match(/\s*$/)?.[0] || "";
  const trimmed = value.slice(leading.length, value.length - trailing.length);
  const translated = dictionary[decodeHtml(trimmed)];
  return translated ? `${leading}${escapeHtml(translated)}${trailing}` : value;
}

function localizeInternalPath(rawValue, locale) {
  if (!rawValue.startsWith("/") || rawValue.startsWith("//")) return rawValue;
  const url = new URL(rawValue, siteUrl);
  if (staticAssetPattern.test(url.pathname)) return rawValue;
  return `${routeForLocale(url.pathname, locale)}${url.search}${url.hash}`;
}

function localizeAbsoluteUrl(rawValue, locale) {
  if (!rawValue.startsWith(siteUrl)) return rawValue;
  const url = new URL(rawValue);
  if (staticAssetPattern.test(url.pathname)) return rawValue;
  return `${siteUrl}${routeForLocale(url.pathname, locale)}${url.search}${url.hash}`;
}

function translateJsonValues(value, dictionary, locale, parentKey = null) {
  if (Array.isArray(value)) return value.map((item) => translateJsonValues(item, dictionary, locale, parentKey));
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, translateJsonValues(item, dictionary, locale, key)]),
    );
  }
  if (typeof value !== "string") return value;
  if (parentKey === "@context" || parentKey === "@type") return value;
  if (value.startsWith(siteUrl)) return localizeAbsoluteUrl(value, locale);
  if (/^https?:\/\//.test(value)) return value;
  if (value === "en") return localeConfig[locale].htmlLang;
  return dictionary[value] || value;
}

function alternateLinks(route) {
  const alternates = [
    ["en", routeForLocale(route, "en")],
    ["pt-BR", routeForLocale(route, "pt-br")],
    ["de", routeForLocale(route, "de")],
    ["x-default", routeForLocale(route, "en")],
  ];
  return alternates
    .map(([code, path]) => `<link rel="alternate" hreflang="${code}" href="${siteUrl}${path}"/>`)
    .join("");
}

function replaceSeoHead(html, route, locale) {
  const canonical = `${siteUrl}${routeForLocale(route, locale)}`;
  html = html
    .replace(/<link\b[^>]*rel="canonical"[^>]*>/gi, "")
    .replace(/<link\b[^>]*rel="alternate"[^>]*hreflang=[^>]*>/gi, "")
    .replace(/<meta\b[^>]*property="og:locale(?::alternate)?"[^>]*>/gi, "")
    .replace(/(<meta\b[^>]*property="og:url"[^>]*content=")([^"]*)("[^>]*>)/i, `$1${canonical}$3`);

  const otherLocales = locale === "de" ? ["en_US", "pt_BR"] : locale === "pt-br" ? ["en_US", "de_DE"] : ["pt_BR", "de_DE"];
  const localizedHead = [
    `<link rel="canonical" href="${canonical}"/>`,
    alternateLinks(route),
    `<meta property="og:locale" content="${localeConfig[locale].ogLocale}"/>`,
    ...otherLocales.map((code) => `<meta property="og:locale:alternate" content="${code}"/>`),
  ].join("");
  return html.replace("</head>", `${localizedHead}</head>`);
}

function updateLanguageMenu(html, route, locale) {
  html = html.replace(
    /(<summary[^>]*>[\s\S]*?<strong>)(?:EN|PT|DE)(<\/strong>)/i,
    `$1${localeConfig[locale].short}$2`,
  );
  return html.replace(/<a class="language-option"[\s\S]*?<\/a>/g, (link) => {
    const code = link.match(/data-locale-code="([^"]+)"/)?.[1];
    if (!code) return link;
    const href = routeForLocale(route, code);
    let updated = link
      .replace(/href="[^"]*"/, `href="${href}"`)
      .replace(/\saria-current="page"/g, "")
      .replace(/(<span class="language-check"[^>]*>)[\s\S]*?(<\/span>)/, `$1${code === locale ? "✓" : ""}$2`);
    if (code === locale) updated = updated.replace(/^(<a\b[^>]*)(>)/, '$1 aria-current="page"$2');
    return updated;
  });
}

function localizeAnchors(html, locale) {
  return html.replace(/<a\b[^>]*>/gi, (tag) => {
    if (tag.includes("data-locale-code=")) return tag;
    return tag.replace(/href="([^"]+)"/, (match, href) => `href="${localizeInternalPath(href, locale)}"`);
  });
}

function translateMeta(html, dictionary) {
  return html.replace(/<meta\b[^>]*>/gi, (tag) => {
    const field = tag.match(/(?:name|property)="([^"]+)"/i)?.[1]?.toLowerCase();
    if (!translatedMetaFields.has(field)) return tag;
    return tag.replace(/content="([^"]*)"/i, (match, value) => `content="${translateValue(value, dictionary)}"`);
  });
}

function localizeHtml(sourceHtml, route, locale) {
  const dictionary = translations[locale];
  const jsonLd = [];
  let html = sourceHtml.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi, (tag, attributes, body) => {
    if (!/type=(["'])application\/ld\+json\1/i.test(attributes)) return "";
    const parsed = JSON.parse(body);
    const translated = translateJsonValues(parsed, dictionary, locale);
    const placeholder = `__LOCALIZED_JSON_LD_${jsonLd.length}__`;
    jsonLd.push(`<script${attributes}>${JSON.stringify(translated)}</script>`);
    return placeholder;
  });

  html = html
    .replace(/<link\b[^>]*(?:as=(["'])script\1|rel=(["'])modulepreload\2)[^>]*>/gi, "")
    .replace(/<div hidden="">\s*<!--\$-->\s*<!--\/\$-->\s*<\/div>/gi, "")
    .replace(/>([^<>]+)</g, (match, text) => `>${translateValue(text, dictionary)}<`)
    .replace(
      /\b(placeholder|aria-label|title|alt)="([^"]*)"/gi,
      (match, attribute, value) => `${attribute}="${translateValue(value, dictionary)}"`,
    )
    .replace(
      /aria-label="Open ([^"]+) product details"/g,
      (_, name) => locale === "pt-br"
        ? `aria-label="Abrir detalhes do produto ${name}"`
        : `aria-label="Produktdetails zu ${name} öffnen"`,
    )
    .replace(
      /aria-label="View ([^"]+) details"/g,
      (_, name) => locale === "pt-br"
        ? `aria-label="Ver detalhes de ${name}"`
        : `aria-label="Details zu ${name} ansehen"`,
    )
    .replace(
      /alt="([^"]+) product reference"/g,
      (_, name) => locale === "pt-br"
        ? `alt="Referência do produto ${name}"`
        : `alt="Produktreferenz ${name}"`,
    )
    .replace(/<html lang="[^"]*"/i, `<html lang="${localeConfig[locale].htmlLang}"`)
    .replaceAll("hrefLang=", "hreflang=");

  html = translateMeta(html, dictionary);
  html = localizeAnchors(html, locale);
  html = updateLanguageMenu(html, route, locale);
  html = replaceSeoHead(html, route, locale);
  html = html.replace(/__LOCALIZED_JSON_LD_(\d+)__/g, (_, index) => jsonLd[Number(index)]);

  if (route === "/") {
    const page = localePages[locale];
    html = html
      .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(page.title)}</title>`)
      .replace(/(<meta\b[^>]*name="description"[^>]*content=")([^"]*)("[^>]*>)/i, `$1${escapeHtml(page.description)}$3`);
  }

  return html.replace("</body>", `<!-- Static localized edition: ${localeConfig[locale].htmlLang} --></body>`);
}

function enhanceEnglishHtml(sourceHtml, route) {
  let html = updateLanguageMenu(sourceHtml, route, "en");
  html = replaceSeoHead(html, route, "en");
  return html;
}

function sitemapXml(routes, selectedLocale = null) {
  const records = [];
  for (const route of routes) {
    const locales = selectedLocale ? [selectedLocale] : ["en", "pt-br", "de"];
    for (const locale of locales) {
      const path = routeForLocale(route, locale);
      const article = articles.find((item) => path.includes(`/articles/${item.slug}/`));
      const priority = route === "/" ? (locale === "en" ? "1.0" : "0.9") : route === "/products/" ? "0.9" : route === "/articles/" ? "0.85" : article ? "0.8" : "0.7";
      const alternates = [
        ["en", routeForLocale(route, "en")],
        ["pt-BR", routeForLocale(route, "pt-br")],
        ["de", routeForLocale(route, "de")],
        ["x-default", routeForLocale(route, "en")],
      ].map(([code, href]) => `    <xhtml:link rel="alternate" hreflang="${code}" href="${siteUrl}${href}" />`).join("\n");
      records.push(`  <url>\n    <loc>${siteUrl}${path}</loc>\n    <lastmod>${article?.updated || lastModified}</lastmod>\n    <changefreq>${["/", "/products/", "/articles/"].includes(route) ? "weekly" : "monthly"}</changefreq>\n    <priority>${priority}</priority>\n${alternates}\n  </url>`);
    }
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${records.join("\n")}\n</urlset>\n`;
}

const englishSources = new Map();
for (const route of baseRoutes) {
  const sourcePath = htmlPath(route, "en");
  if (!existsSync(sourcePath)) throw new Error(`Missing English static page: ${sourcePath}`);
  englishSources.set(route, readFileSync(sourcePath, "utf8"));
}

for (const route of baseRoutes) {
  const sourceHtml = englishSources.get(route);
  writeFileSync(htmlPath(route, "en"), enhanceEnglishHtml(sourceHtml, route));
  for (const locale of ["pt-br", "de"]) {
    const destination = htmlPath(route, locale);
    mkdirSync(dirname(destination), { recursive: true });
    writeFileSync(destination, localizeHtml(sourceHtml, route, locale));
  }
}

writeFileSync(resolve(outputRoot, "sitemap.xml"), sitemapXml(baseRoutes));
writeFileSync(resolve(outputRoot, "sitemap-en.xml"), sitemapXml(baseRoutes, "en"));
writeFileSync(resolve(outputRoot, "sitemap-pt-br.xml"), sitemapXml(baseRoutes, "pt-br"));
writeFileSync(resolve(outputRoot, "sitemap-de.xml"), sitemapXml(baseRoutes, "de"));

const robotsPath = resolve(outputRoot, "robots.txt");
let robots = existsSync(robotsPath) ? readFileSync(robotsPath, "utf8").trimEnd() : "User-agent: *\nAllow: /";
robots = robots
  .split("\n")
  .filter((line) => !line.startsWith("Sitemap:"))
  .join("\n");
for (const name of ["sitemap.xml", "sitemap-en.xml", "sitemap-pt-br.xml", "sitemap-de.xml"]) {
  robots += `\nSitemap: ${siteUrl}/${name}`;
}
writeFileSync(robotsPath, `${robots}\n`);
