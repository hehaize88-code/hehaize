import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { getBaseLanguagePath, getLocalizedPath } from "../data/i18n.js";

const outputRoot = resolve(process.argv[2] || "out");
const siteUrl = "https://hubbuy-sheet.com";
const sitemap = readFileSync(resolve(outputRoot, "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const records = [];
const brokenLinks = [];
const localeGroups = new Map();

function localeFromPath(pathname) {
  if (pathname.startsWith("/pt-br/")) return "pt-br";
  if (pathname.startsWith("/de/")) return "de";
  return "en";
}

function pagePath(url) {
  const pathname = new URL(url).pathname;
  return pathname === "/"
    ? resolve(outputRoot, "index.html")
    : resolve(outputRoot, pathname.slice(1), "index.html");
}

function internalTarget(href) {
  const pathname = href.split("#")[0].split("?")[0];
  if (!pathname || pathname === "/") return resolve(outputRoot, "index.html");
  const clean = pathname.replace(/^\//, "");
  return pathname.endsWith("/")
    ? resolve(outputRoot, clean, "index.html")
    : resolve(outputRoot, clean);
}

function expectedAlternates(basePath) {
  return new Map([
    ["en", `${siteUrl}${getLocalizedPath(basePath, "en")}`],
    ["pt-BR", `${siteUrl}${getLocalizedPath(basePath, "pt-br")}`],
    ["de", `${siteUrl}${getLocalizedPath(basePath, "de")}`],
    ["x-default", `${siteUrl}${getLocalizedPath(basePath, "en")}`],
  ]);
}

for (const url of urls) {
  const file = pagePath(url);
  if (!existsSync(file)) throw new Error(`Sitemap URL has no file: ${url}`);
  const html = readFileSync(file, "utf8");
  const pathname = new URL(url).pathname;
  const locale = localeFromPath(pathname);
  const basePath = getBaseLanguagePath(pathname);
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
  const h1 = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1].replace(/<[^>]+>/g, "").replace(/<!--.*?-->/g, "").trim();
  const h1Count = (html.match(/<h1\b/g) || []).length;
  const lang = html.match(/<html lang="([^"]+)"/)?.[1];
  const expectedLang = locale === "pt-br" ? "pt-BR" : locale;

  if (!title || !canonical || !h1 || h1Count !== 1) throw new Error(`Invalid SEO head on ${url}`);
  if (canonical !== url) throw new Error(`Canonical mismatch on ${url}: ${canonical}`);
  if (lang !== expectedLang) throw new Error(`HTML language mismatch on ${url}: ${lang}`);
  if (/__X\d|TOKEN|>>\s*por\s*<<|\?lang=(?:pt-br|de)/i.test(html)) throw new Error(`Translation artifact on ${url}`);
  if (/aria-current=["']page["']>>/.test(html)) throw new Error(`Malformed language menu on ${url}`);

  const alternates = new Map(
    [...html.matchAll(/rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)]
      .map((match) => [match[1], match[2]]),
  );
  for (const [code, href] of expectedAlternates(basePath)) {
    if (alternates.get(code) !== href) throw new Error(`Invalid ${code} alternate on ${url}`);
  }

  if (locale !== "en") {
    if (!html.includes("Static localized edition")) throw new Error(`Missing localized marker on ${url}`);
    if ((html.match(/<script\b(?![^>]*application\/ld\+json)/g) || []).length) {
      throw new Error(`Localized page still depends on client JavaScript: ${url}`);
    }
  }

  for (const script of html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    JSON.parse(script[1]);
  }

  for (const match of html.matchAll(/href="([^"]+)"/g)) {
    const href = match[1];
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    const target = internalTarget(href);
    if (!existsSync(target)) brokenLinks.push({ from: url, href });
  }

  records.push({ url, pathname, locale, basePath, title, canonical, h1, lang });
  if (!localeGroups.has(basePath)) localeGroups.set(basePath, {});
  localeGroups.get(basePath)[locale] = { title, h1, url };
}

for (const [basePath, group] of localeGroups) {
  if (!group.en || !group["pt-br"] || !group.de) throw new Error(`Incomplete locale group: ${basePath}`);
  if (group.en.title === group["pt-br"].title || group.en.title === group.de.title) {
    throw new Error(`Untranslated title in locale group: ${basePath}`);
  }
  if (group.en.h1 === group["pt-br"].h1 || group.en.h1 === group.de.h1) {
    throw new Error(`Untranslated H1 in locale group: ${basePath}`);
  }
}

for (const [locale, expectedCount] of [["en", 15], ["pt-br", 15], ["de", 15]]) {
  const file = resolve(outputRoot, `sitemap-${locale}.xml`);
  if (!existsSync(file)) throw new Error(`Missing language sitemap: ${locale}`);
  const count = (readFileSync(file, "utf8").match(/<loc>/g) || []).length;
  if (count !== expectedCount) throw new Error(`Wrong URL count in sitemap-${locale}.xml: ${count}`);
}

const duplicateTitles = records.filter((record, index) => (
  records.findIndex((candidate) => candidate.title === record.title) !== index
));
const duplicateCanonicals = records.filter((record, index) => (
  records.findIndex((candidate) => candidate.canonical === record.canonical) !== index
));

if (urls.length !== 45 || new Set(urls).size !== 45) throw new Error(`Expected 45 unique sitemap URLs, found ${urls.length}`);
if (duplicateTitles.length) throw new Error(`Duplicate titles: ${duplicateTitles.map((item) => item.url).join(", ")}`);
if (duplicateCanonicals.length) throw new Error("Duplicate canonical URLs");
if (brokenLinks.length) throw new Error(`Broken internal links: ${JSON.stringify(brokenLinks.slice(0, 10))}`);

console.log(JSON.stringify({
  sitemapUrls: urls.length,
  localeGroups: localeGroups.size,
  uniqueTitles: new Set(records.map((item) => item.title)).size,
  uniqueCanonicals: new Set(records.map((item) => item.canonical)).size,
  brokenInternalLinks: brokenLinks.length,
  languages: Object.fromEntries(["en", "pt-BR", "de"].map((lang) => [lang, records.filter((item) => item.lang === lang).length])),
}, null, 2));
