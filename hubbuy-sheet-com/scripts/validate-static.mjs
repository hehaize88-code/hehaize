import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const outputRoot = resolve(process.argv[2] || "out");
const sitemap = readFileSync(resolve(outputRoot, "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const expectedAlternates = new Map([
  ["en", "https://hubbuy-sheet.com/"],
  ["pt-BR", "https://hubbuy-sheet.com/pt-br/"],
  ["de", "https://hubbuy-sheet.com/de/"],
  ["x-default", "https://hubbuy-sheet.com/"],
]);
const records = [];
const brokenLinks = [];

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

for (const url of urls) {
  const file = pagePath(url);
  if (!existsSync(file)) throw new Error(`Sitemap URL has no file: ${url}`);
  const html = readFileSync(file, "utf8");
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
  const h1Count = (html.match(/<h1\b/g) || []).length;
  const lang = html.match(/<html lang="([^"]+)"/)?.[1];
  if (!title || !canonical || h1Count !== 1) throw new Error(`Invalid SEO head on ${url}`);
  if (canonical !== url) throw new Error(`Canonical mismatch on ${url}: ${canonical}`);
  records.push({ url, title, canonical, lang });

  for (const match of html.matchAll(/href="([^"]+)"/g)) {
    const href = match[1];
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    const target = internalTarget(href);
    if (!existsSync(target)) brokenLinks.push({ from: url, href });
  }
}

for (const locale of ["pt-br", "de"]) {
  const html = readFileSync(pagePath(`https://hubbuy-sheet.com/${locale}/`), "utf8");
  const alternates = new Map(
    [...html.matchAll(/rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)]
      .map((match) => [match[1], match[2]]),
  );
  for (const [code, href] of expectedAlternates) {
    if (alternates.get(code) !== href) throw new Error(`Invalid ${code} alternate on ${locale}`);
  }
  if ((html.match(/<script\b(?![^>]*application\/ld\+json)/g) || []).length) {
    throw new Error(`Localized page still depends on client JavaScript: ${locale}`);
  }
  if (/All(?:Produtos|Produkte)|\?lang=(?:pt-br|de)/i.test(html)) {
    throw new Error(`Localized page changed a destination URL: ${locale}`);
  }
  if (!existsSync(resolve(outputRoot, `sitemap-${locale}.xml`))) {
    throw new Error(`Missing language sitemap: ${locale}`);
  }
}

const duplicateTitles = records.filter((record, index) => (
  records.findIndex((candidate) => candidate.title === record.title) !== index
));
const duplicateCanonicals = records.filter((record, index) => (
  records.findIndex((candidate) => candidate.canonical === record.canonical) !== index
));

if (new Set(urls).size !== urls.length) throw new Error("Duplicate URLs in sitemap.xml");
if (duplicateTitles.length) throw new Error(`Duplicate titles: ${duplicateTitles.map((item) => item.url).join(", ")}`);
if (duplicateCanonicals.length) throw new Error("Duplicate canonical URLs");
if (brokenLinks.length) throw new Error(`Broken internal links: ${JSON.stringify(brokenLinks.slice(0, 10))}`);

console.log(JSON.stringify({
  sitemapUrls: urls.length,
  uniqueTitles: new Set(records.map((item) => item.title)).size,
  uniqueCanonicals: new Set(records.map((item) => item.canonical)).size,
  brokenInternalLinks: brokenLinks.length,
  localizedPages: records.filter((item) => ["/pt-br/", "/de/"].some((path) => item.url.endsWith(path))),
}, null, 2));
