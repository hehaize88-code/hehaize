import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { articles } from "../data/articles.js";
import { categoryPages } from "../data/categories.js";
import { products } from "../data/site.js";
import { getBaseLanguagePath, getLocalizedPath } from "../data/i18n.js";

const outputRoot = resolve(process.argv[2] || "out");
const siteUrl = "https://hubbuy-sheet.com";
const sitemap = readFileSync(resolve(outputRoot, "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const records = [];
const brokenLinks = [];
const localeGroups = new Map();
const articleByPath = new Map(
  articles.map((article) => [`/articles/${article.slug}/`, article]),
);
const categoryByPath = new Map(
  categoryPages.map((category) => [`/categories/${category.slug}/`, category]),
);
const productByPath = new Map(
  products.map((product) => [product.localHref, product]),
);
const breadcrumbPaths = new Set([
  "/guides/how-to-buy/",
  "/guides/qc-checks/",
  "/guides/shipping/",
  "/faq/",
  "/about/",
]);
const allowedSchemaTypes = new Set([
  "AboutPage",
  "Answer",
  "Article",
  "BreadcrumbList",
  "CollectionPage",
  "ContactPage",
  "FAQPage",
  "HowTo",
  "HowToStep",
  "ImageObject",
  "ItemPage",
  "ItemList",
  "ListItem",
  "Offer",
  "Organization",
  "Product",
  "Question",
  "WebSite",
]);

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
  if (productByPath.has(basePath)) {
    return new Map([
      ["en", `${siteUrl}${basePath}`],
      ["x-default", `${siteUrl}${basePath}`],
    ]);
  }
  return new Map([
    ["en", `${siteUrl}${getLocalizedPath(basePath, "en")}`],
    ["pt-BR", `${siteUrl}${getLocalizedPath(basePath, "pt-br")}`],
    ["de", `${siteUrl}${getLocalizedPath(basePath, "de")}`],
    ["x-default", `${siteUrl}${getLocalizedPath(basePath, "en")}`],
  ]);
}

function metaContent(html, attribute, key) {
  for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
    const tag = match[0];
    if (!new RegExp(`${attribute}=["']${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`, "i").test(tag)) continue;
    return tag.match(/content=["']([^"']*)["']/i)?.[1];
  }
  return undefined;
}

function schemaType(schema, type) {
  return schema?.["@type"] === type || (Array.isArray(schema?.["@type"]) && schema["@type"].includes(type));
}

function pngDimensions(file) {
  const buffer = readFileSync(file);
  const signature = "89504e470d0a1a0a";
  if (buffer.subarray(0, 8).toString("hex") !== signature) throw new Error(`Invalid PNG file: ${file}`);
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

function collectSchemaTypes(value, types = []) {
  if (Array.isArray(value)) {
    for (const item of value) collectSchemaTypes(item, types);
  } else if (value && typeof value === "object") {
    if (typeof value["@type"] === "string") types.push(value["@type"]);
    for (const item of Object.values(value)) collectSchemaTypes(item, types);
  }
  return types;
}

function visibleWordCount(fragment) {
  const text = fragment
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[^;]+;/g, " ")
    .replace(/[^A-Za-z0-9£¥€$.%+-]+/g, " ")
    .trim();
  return text ? text.split(/\s+/).length : 0;
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
  const ogTitle = metaContent(html, "property", "og:title");
  const ogUrl = metaContent(html, "property", "og:url");
  const ogImage = metaContent(html, "property", "og:image");
  const twitterImage = metaContent(html, "name", "twitter:image");
  const article = articleByPath.get(basePath);
  const category = categoryByPath.get(basePath);
  const product = productByPath.get(basePath);
  const productImage = product?.image?.startsWith("http") ? product.image : product ? `${siteUrl}${product.image}` : null;
  const expectedImage = productImage || `${siteUrl}${article?.socialImage || "/brand/og-card.png"}`;

  if (!title || !canonical || !h1 || h1Count !== 1) throw new Error(`Invalid SEO head on ${url}`);
  if (canonical !== url) throw new Error(`Canonical mismatch on ${url}: ${canonical}`);
  if (!ogTitle) throw new Error(`Missing og:title on ${url}`);
  if (ogUrl !== url) throw new Error(`Open Graph URL mismatch on ${url}: ${ogUrl}`);
  if (ogImage !== expectedImage) throw new Error(`Invalid og:image on ${url}: ${ogImage}`);
  if (twitterImage !== expectedImage) throw new Error(`Invalid twitter:image on ${url}: ${twitterImage}`);
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
    if (/product references, one focused review path\.|Product price and China shipping appear at the order stage\.|The public page currently advertises 300 days|The official policy labels visible in Hubbuy’s footer/.test(html)) {
      throw new Error(`Untranslated new content on ${url}`);
    }
  }

  const schemas = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .map((script) => JSON.parse(script[1]));
  if (JSON.stringify(schemas).includes(`${siteUrl}https://`)) {
    throw new Error(`Malformed absolute URL in structured data on ${url}`);
  }
  for (const type of collectSchemaTypes(schemas)) {
    if (!allowedSchemaTypes.has(type)) throw new Error(`Invalid or translated Schema.org type on ${url}: ${type}`);
  }

  if (basePath === "/products/") {
    const collection = schemas.find((schema) => schemaType(schema, "CollectionPage"));
    const itemList = collection?.mainEntity;
    if (!collection || !schemaType(itemList, "ItemList")) throw new Error(`Missing CollectionPage + ItemList on ${url}`);
    if (itemList.numberOfItems !== products.length || itemList.itemListElement?.length !== products.length) throw new Error(`Incomplete product ItemList on ${url}`);
    if (new Set(itemList.itemListElement.map((item) => item.url)).size !== products.length) throw new Error(`Duplicate product URLs in ItemList on ${url}`);
  }

  if (category) {
    const collection = schemas.find((schema) => schemaType(schema, "CollectionPage"));
    const itemList = collection?.mainEntity;
    const expectedProducts = products.filter((product) => product.category === category.name);
    if (!collection || !schemaType(itemList, "ItemList")) throw new Error(`Missing category CollectionPage + ItemList on ${url}`);
    if (itemList.numberOfItems !== expectedProducts.length || itemList.itemListElement?.length !== expectedProducts.length) {
      throw new Error(`Incomplete category ItemList on ${url}`);
    }
    if (!schemas.some((schema) => schemaType(schema, "BreadcrumbList"))) throw new Error(`Missing category BreadcrumbList on ${url}`);
    if (locale === "en") {
      const main = html.match(/<main id="main-content">([\s\S]*?)<\/main>/)?.[1] || "";
      const count = visibleWordCount(main);
      if (count < 300 || count > 600) throw new Error(`Category page content is outside 300–600 words on ${url}: ${count}`);
    }
  }

  if (product) {
    if (locale !== "en") throw new Error(`Product reference page must remain English-only: ${url}`);
    const itemPage = schemas.find((schema) => schemaType(schema, "ItemPage"));
    if (!itemPage || !schemaType(itemPage.mainEntity, "Product") || !schemaType(itemPage.mainEntity?.offers, "Offer")) {
      throw new Error(`Missing ItemPage + Product + Offer schema on ${url}`);
    }
    if (itemPage.mainEntity.sku !== product.sourceId || itemPage.mainEntity.offers.url !== product.href) {
      throw new Error(`Product schema does not match source record on ${url}`);
    }
    if (!schemas.some((schema) => schemaType(schema, "BreadcrumbList"))) throw new Error(`Missing product BreadcrumbList on ${url}`);
    const main = html.match(/<main id="main-content">([\s\S]*?)<\/main>/)?.[1] || "";
    const count = visibleWordCount(main);
    if (count < 350 || count > 800) throw new Error(`Product research page content is outside 350–800 words on ${url}: ${count}`);
    if (!html.includes(`href="${product.href}"`)) throw new Error(`Product research page lacks its live source link: ${url}`);
  }

  if (breadcrumbPaths.has(basePath) && !schemas.some((schema) => schemaType(schema, "BreadcrumbList"))) {
    throw new Error(`Missing BreadcrumbList on ${url}`);
  }

  if (article) {
    const articleSchema = schemas.find((schema) => schemaType(schema, "Article"));
    const expectedAuthorUrl = `${siteUrl}${getLocalizedPath("/about/", locale)}`;
    if (!articleSchema) throw new Error(`Missing Article schema on ${url}`);
    if (articleSchema.author?.url !== expectedAuthorUrl) throw new Error(`Invalid Article author.url on ${url}`);
    if (articleSchema.image?.url !== expectedImage || articleSchema.image?.width !== 1200 || articleSchema.image?.height !== 630) {
      throw new Error(`Invalid Article image object on ${url}`);
    }
    if (articleSchema.thumbnailUrl !== expectedImage) throw new Error(`Invalid Article thumbnailUrl on ${url}`);
    if (!schemas.some((schema) => schemaType(schema, "BreadcrumbList"))) throw new Error(`Missing article BreadcrumbList on ${url}`);
    if (!html.includes(`src="${article.socialImage}"`)) throw new Error(`Article topic image is not visible on ${url}`);
    if (!html.includes('id="research-evidence"') || !html.includes('class="source-ledger"')) {
      throw new Error(`Missing article research enhancement on ${url}`);
    }
    const researchSection = html.match(/<section id="research-evidence"[\s\S]*?<\/section>/)?.[0] || "";
    if ((researchSection.match(/href="https:\/\/hubbuy\.com\/"/g) || []).length !== 3) {
      throw new Error(`Article does not name three exact official sections on ${url}`);
    }
    if (locale === "en") {
      const body = html.match(/<article class="seo-article-body">([\s\S]*?)<\/article>/)?.[1] || "";
      const count = visibleWordCount(body);
      if (count !== article.wordCount || count < 1200 || count > 1800) {
        throw new Error(`Article word count mismatch on ${url}: schema ${article.wordCount}, visible ${count}`);
      }
    }
  }

  for (const match of html.matchAll(/href="([^"]+)"/g)) {
    const href = match[1];
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    const target = internalTarget(href);
    if (!existsSync(target)) brokenLinks.push({ from: url, href });
  }

  records.push({ url, pathname, locale, basePath, title, canonical, h1, lang, ogTitle, ogUrl, ogImage });
  if (!product) {
    if (!localeGroups.has(basePath)) localeGroups.set(basePath, {});
    localeGroups.get(basePath)[locale] = { title, h1, ogTitle, url };
  }
}

for (const [basePath, group] of localeGroups) {
  if (!group.en || !group["pt-br"] || !group.de) throw new Error(`Incomplete locale group: ${basePath}`);
  if (group.en.title === group["pt-br"].title || group.en.title === group.de.title) {
    throw new Error(`Untranslated title in locale group: ${basePath}`);
  }
  if (group.en.h1 === group["pt-br"].h1 || group.en.h1 === group.de.h1) {
    throw new Error(`Untranslated H1 in locale group: ${basePath}`);
  }
  if (group.en.ogTitle === group["pt-br"].ogTitle || group.en.ogTitle === group.de.ogTitle) {
    throw new Error(`Untranslated Open Graph title in locale group: ${basePath}`);
  }
}

for (const [locale, expectedCount] of [["en", 23 + products.length], ["pt-br", 23], ["de", 23]]) {
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

const expectedSitemapUrls = 69 + products.length;
if (urls.length !== expectedSitemapUrls || new Set(urls).size !== expectedSitemapUrls) throw new Error(`Expected ${expectedSitemapUrls} unique sitemap URLs, found ${urls.length}`);
if (duplicateTitles.length) throw new Error(`Duplicate titles: ${duplicateTitles.map((item) => item.url).join(", ")}`);
if (duplicateCanonicals.length) throw new Error("Duplicate canonical URLs");
if (brokenLinks.length) throw new Error(`Broken internal links: ${JSON.stringify(brokenLinks.slice(0, 10))}`);

for (const article of articles) {
  const imageFile = resolve(outputRoot, article.socialImage.slice(1));
  if (!existsSync(imageFile)) throw new Error(`Missing article image: ${article.socialImage}`);
  const { width, height } = pngDimensions(imageFile);
  if (width !== 1200 || height !== 630) throw new Error(`Wrong article image dimensions for ${article.socialImage}: ${width}x${height}`);
}

if (new Set(articles.map((article) => article.socialImage)).size !== articles.length) {
  throw new Error("Article social images must be unique");
}

console.log(JSON.stringify({
  sitemapUrls: urls.length,
  localeGroups: localeGroups.size,
  uniqueTitles: new Set(records.map((item) => item.title)).size,
  uniqueCanonicals: new Set(records.map((item) => item.canonical)).size,
  correctOpenGraphUrls: records.filter((item) => item.ogUrl === item.url).length,
  pagesWithOpenGraphImages: records.filter((item) => item.ogImage).length,
  structuredData: {
    productCollections: records.filter((item) => item.basePath === "/products/").length,
    categoryCollections: records.filter((item) => categoryByPath.has(item.basePath)).length,
    breadcrumbPages: records.filter((item) => breadcrumbPaths.has(item.basePath)).length,
    articlePagesWithAuthorAndUniqueImage: records.filter((item) => articleByPath.has(item.basePath)).length,
  },
  brokenInternalLinks: brokenLinks.length,
  languages: Object.fromEntries(["en", "pt-BR", "de"].map((lang) => [lang, records.filter((item) => item.lang === lang).length])),
}, null, 2));
