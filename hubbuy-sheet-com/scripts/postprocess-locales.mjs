import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { localePages } from "../data/locale-content.js";
import { translations } from "../data/i18n.js";

const outputRoot = resolve(process.argv[2] || "out");
const lastModified = "2026-07-21";

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

function translateValue(value, dictionary) {
  const leading = value.match(/^\s*/)?.[0] || "";
  const trailing = value.match(/\s*$/)?.[0] || "";
  const trimmed = value.slice(leading.length, value.length - trailing.length);
  const translated = dictionary[decodeHtml(trimmed)];
  return translated ? `${leading}${escapeHtml(translated)}${trailing}` : value;
}

function translateJsonValues(value, dictionary, htmlLang) {
  if (Array.isArray(value)) return value.map((item) => translateJsonValues(item, dictionary, htmlLang));
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, translateJsonValues(item, dictionary, htmlLang)]),
    );
  }
  if (typeof value !== "string") return value;
  if (/^https?:\/\//.test(value)) return value;
  if (value === "en") return htmlLang;
  return dictionary[value] || value;
}

function translateStaticHtml(html, locale) {
  const dictionary = translations[locale];
  const page = localePages[locale];
  const jsonLd = [];

  html = html.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi, (tag, attributes, body) => {
    if (!/type=(["'])application\/ld\+json\1/i.test(attributes)) return "";
    const parsed = JSON.parse(body);
    const translated = translateJsonValues(parsed, dictionary, page.htmlLang);
    const placeholder = `__LOCALIZED_JSON_LD_${jsonLd.length}__`;
    jsonLd.push(`<script${attributes}>${JSON.stringify(translated)}</script>`);
    return placeholder;
  });
  html = html.replace(/<link\b[^>]*(?:as=(["'])script\1|rel=(["'])modulepreload\2)[^>]*>/gi, "");
  html = html.replace(/<div hidden="">\s*<!--\$-->\s*<!--\/\$-->\s*<\/div>/gi, "");

  html = html.replace(/>([^<>]+)</g, (match, text) => `>${translateValue(text, dictionary)}<`);
  html = html.replace(
    /\b(placeholder|aria-label|title|alt)="([^"]*)"/gi,
    (match, attribute, value) => `${attribute}="${translateValue(value, dictionary)}"`,
  );
  html = html.replace(
    /aria-label="Open ([^"]+) product details"/g,
    (_, name) => locale === "pt-br"
      ? `aria-label="Abrir detalhes do produto ${name}"`
      : `aria-label="Produktdetails zu ${name} öffnen"`,
  );
  html = html.replace(
    /aria-label="View ([^"]+) details"/g,
    (_, name) => locale === "pt-br"
      ? `aria-label="Ver detalhes de ${name}"`
      : `aria-label="Details zu ${name} ansehen"`,
  );
  html = html.replace(
    /alt="([^"]+) product reference"/g,
    (_, name) => locale === "pt-br"
      ? `alt="Referência do produto ${name}"`
      : `alt="Produktreferenz ${name}"`,
  );
  html = html.replace(
    /View all\s*<!-- -->\s*4\s*<!-- -->\s*articles/g,
    locale === "pt-br" ? "Ver os 4 artigos" : "Alle 4 Artikel ansehen",
  );
  html = html.replace(
    /Read all\s*<!-- -->\s*21\s*<!-- -->\s*questions/g,
    locale === "pt-br" ? "Ler as 21 perguntas" : "Alle 21 Fragen lesen",
  );
  html = html.replace(/<html lang="[^"]*"/i, `<html lang="${page.htmlLang}"`);
  html = html.replaceAll("hrefLang=", "hreflang=");
  html = html.replace(
    /(<summary[^>]*>[\s\S]*?<strong>)(?:EN|PT|DE)(<\/strong>)/i,
    `$1${page.short}$2`,
  );
  html = html.replace(/<a class="language-option"[\s\S]*?<\/a>/g, (link) => {
    const code = link.match(/data-locale-code="([^"]+)"/)?.[1];
    let updated = link.replace(/\saria-current="page"/g, "");
    updated = updated.replace(/(<span class="language-check"[^>]*>)[\s\S]*?(<\/span>)/, `$1${code === locale ? "✓" : ""}$2`);
    if (code === locale) updated = updated.replace(/^(<a\b[^>]*)(>)/, '$1 aria-current="page">$2');
    return updated;
  });
  html = html.replace(
    /(<a[^>]*class="[^"]*home-article-card[^"]*"[^>]*)(>)/g,
    '$1 lang="en" hreflang="en"$2',
  );
  html = html.replace(/__LOCALIZED_JSON_LD_(\d+)__/g, (_, index) => jsonLd[Number(index)]);

  if (!html.includes(`rel="canonical" href="https://hubbuy-sheet.com${page.path}"`)) {
    throw new Error(`Missing self canonical for ${locale}`);
  }
  for (const code of ["en", "pt-BR", "de", "x-default"]) {
    if (!html.includes(`hreflang="${code}"`)) throw new Error(`Missing ${code} hreflang on ${locale}`);
  }
  if (/\?lang=(?:pt-br|de)/i.test(html)) throw new Error(`Legacy query-string language URL remains on ${locale}`);

  return html.replace("</body>", `<!-- Static localized edition: ${page.htmlLang} --></body>`);
}

function languageSitemap(locale) {
  const page = localePages[locale];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://hubbuy-sheet.com${page.path}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://hubbuy-sheet.com/" />
    <xhtml:link rel="alternate" hreflang="pt-BR" href="https://hubbuy-sheet.com/pt-br/" />
    <xhtml:link rel="alternate" hreflang="de" href="https://hubbuy-sheet.com/de/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://hubbuy-sheet.com/" />
  </url>
</urlset>
`;
}

for (const locale of Object.keys(localePages)) {
  const htmlPath = resolve(outputRoot, locale, "index.html");
  if (!existsSync(htmlPath)) throw new Error(`Missing static page: ${htmlPath}`);
  const localized = translateStaticHtml(readFileSync(htmlPath, "utf8"), locale);
  writeFileSync(htmlPath, localized);
  writeFileSync(resolve(outputRoot, `sitemap-${locale}.xml`), languageSitemap(locale));
}

const robotsPath = resolve(outputRoot, "robots.txt");
if (existsSync(robotsPath)) {
  let robots = readFileSync(robotsPath, "utf8").trimEnd();
  for (const locale of Object.keys(localePages)) {
    const line = `Sitemap: https://hubbuy-sheet.com/sitemap-${locale}.xml`;
    if (!robots.includes(line)) robots += `\n${line}`;
  }
  writeFileSync(robotsPath, `${robots}\n`);
}
