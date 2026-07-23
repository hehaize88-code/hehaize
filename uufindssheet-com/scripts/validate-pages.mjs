import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const root = new URL("../out/", import.meta.url);
const locales = ["en-gb", "de", "pl", "pt-br"];
const readPage = (path) => readFile(new URL(`${path.replace(/^\/|\/$/g, "") || "."}/index.html`, root), "utf8");
const count = (html, pattern) => (html.match(pattern) ?? []).length;
const block = (html, tag, className) => {
  const match = html.match(new RegExp(`<${tag}[^>]*class="${className}"[^>]*>[\\s\\S]*?</${tag}>`));
  assert.ok(match, `missing ${tag}.${className}`);
  return match[0];
};
const betweenClasses = (html, startClass, endClass) => {
  const start = html.indexOf(`class="${startClass}"`);
  const end = html.indexOf(`class="${endClass}"`, start + 1);
  assert.ok(start >= 0 && end > start, `missing range ${startClass} -> ${endClass}`);
  return html.slice(start, end);
};

for (const locale of locales) {
  const home = await readPage(locale);
  assert.match(home, /class="hero"/, `${locale} home must use the primary hero`);
  assert.match(home, /class="hero-visual"/, `${locale} home must keep the hero visual`);
  assert.match(home, /hero-product-collage-480\.webp/, `${locale} home must keep responsive hero images`);
  assert.ok(count(home, /\/product-images\//g) >= 8, `${locale} home must render all product cards`);
  assert.doesNotMatch(home, /class="localized-hero"/, `${locale} home must not use the retired alternate layout`);

  const expectations = {
    finds: ["hub-page", "hub-hero", "category-grid", "evidence-matrix"],
    products: ["hub-page", "hub-hero", "product-showcase-grid", "evidence-matrix"],
    "how-it-works": ["hub-page", "hub-hero", "workflow-grid", "evidence-matrix"],
    articles: ["hub-page", "hub-hero article-hub-hero", "article-grid article-hub-grid"],
    faq: ["hub-page faq-page", "hub-hero faq-hero", "faq-directory", "faq-groups"],
  };
  for (const [route, classNames] of Object.entries(expectations)) {
    const html = await readPage(`${locale}/${route}`);
    for (const className of classNames) {
      assert.match(html, new RegExp(`class="${className.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`), `${locale}/${route} is missing ${className}`);
    }
  }

  const finds = await readPage(`${locale}/finds`);
  assert.equal(count(finds, /class="category-card"/g), 9, `${locale}/finds must keep all 9 category routes`);
  assert.equal(count(block(finds, "div", "evidence-grid"), /<article>/g), 4, `${locale}/finds must keep all 4 evidence cards`);
  assert.equal(count(block(finds, "section", "decision-checklist"), /<li>/g), 5, `${locale}/finds must keep the 5-step discovery routine`);
  assert.equal(count(finds, /class="source-method-note"/g), 1, `${locale}/finds must keep its source boundary`);

  const how = await readPage(`${locale}/how-it-works`);
  assert.equal(count(betweenClasses(how, "official-fact-strip", "workflow-grid"), /<article>/g), 3, `${locale}/how-it-works must keep all verified facts`);
  assert.equal(count(block(how, "div", "workflow-grid"), /<article>/g), 3, `${locale}/how-it-works must keep all workflow steps`);
  assert.equal(count(block(how, "div", "evidence-grid"), /<article>/g), 4, `${locale}/how-it-works must keep all evidence cards`);
  assert.equal(count(block(how, "section", "decision-checklist"), /<li>/g), 5, `${locale}/how-it-works must keep the 5-line decision record`);
  assert.equal(count(how, /class="method-note"/g), 1, `${locale}/how-it-works must keep the conclusion panel`);

  const faq = await readPage(`${locale}/faq`);
  assert.equal(count(faq, /class="faq-group"/g), 4, `${locale}/faq must keep all 4 English-equivalent topic groups`);
  assert.equal(count(betweenClasses(faq, "faq-directory", "source-method-note"), /<details/g), 18, `${locale}/faq must keep all 18 English-equivalent answers`);
  assert.equal(count(betweenClasses(faq, "official-fact-strip", "faq-directory"), /<article>/g), 3, `${locale}/faq must keep all verified facts`);
  assert.equal(count(faq, /class="faq-next-step"/g), 1, `${locale}/faq must keep the next-step panel`);

  const product = await readPage(`${locale}/products/hoka-speedgoat-5-trail-running-shoes`);
  assert.match(product, /class="product-page"/);
  assert.match(product, /class="product-gallery"/);
  assert.match(product, /class="product-thumbnails"/);
  assert.ok(count(product, /\/product-images\//g) >= 5, `${locale} product detail must keep the complete gallery`);
  assert.match(product, new RegExp(`href="/${locale === "pl" ? "de" : "pl"}/products/hoka-speedgoat-5-trail-running-shoes/"`), "language switch must preserve the product route");

  const guide = await readPage(`${locale}/guides/uufinds-qc-checklist`);
  assert.match(guide, /class="guide-page"/);
  assert.match(guide, /class="guide-layout"/);
  assert.match(guide, /class="guide-body"/);
  assert.equal(count(guide, /class="lead"/g), 3, `${locale} QC guide must keep all 3 introductory paragraphs`);
  assert.equal(count(guide, /id="section-\d+"/g), 9, `${locale} QC guide must keep all 9 English-equivalent sections`);
  assert.equal(count(guide, /class="source-note"/g), 1, `${locale} QC guide must keep the complete primary-source note`);

  for (const policy of ["about", "contact", "editorial-policy", "privacy", "terms"]) {
    const html = await readPage(`${locale}/${policy}`);
    assert.match(html, /class="trust-page"/, `${locale}/${policy} must use the trust-page layout`);
    assert.match(html, /class="trust-page-body"/, `${locale}/${policy} must keep the complete policy body`);
  }
}

for (const locale of ["de", "pl", "pt-br"]) {
  const targetPages = await Promise.all([
    readPage(`${locale}/finds`),
    readPage(`${locale}/how-it-works`),
    readPage(`${locale}/faq`),
    readPage(`${locale}/guides/uufinds-qc-checklist`),
  ]);
  for (const html of targetPages) {
    assert.doesNotMatch(html, /A photographed item is not a guarantee for every later unit\./, `${locale} page must not fall back to the retired English evidence card`);
    assert.doesNotMatch(html, />ON THIS PAGE</, `${locale} QC guide must localize its section navigation`);
  }
}

const sitemap = await readFile(join(root.pathname, "sitemap.xml"), "utf8");
assert.match(sitemap, /https:\/\/uufindssheet\.com\/de\/about\//);
assert.match(sitemap, /https:\/\/uufindssheet\.com\/pt-br\/terms\//);

console.log("Validated multilingual content parity, layout, image markup, route-preserving language links, trust pages, and sitemap.");
