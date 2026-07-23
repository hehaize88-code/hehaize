import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const root = new URL("../out/", import.meta.url);
const locales = ["en-gb", "de", "pl", "pt-br"];
const readPage = (path) => readFile(new URL(`${path.replace(/^\/|\/$/g, "") || "."}/index.html`, root), "utf8");
const count = (html, pattern) => (html.match(pattern) ?? []).length;

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

  for (const policy of ["about", "contact", "editorial-policy", "privacy", "terms"]) {
    const html = await readPage(`${locale}/${policy}`);
    assert.match(html, /class="trust-page"/, `${locale}/${policy} must use the trust-page layout`);
    assert.match(html, /class="trust-page-body"/, `${locale}/${policy} must keep the complete policy body`);
  }
}

const sitemap = await readFile(join(root.pathname, "sitemap.xml"), "utf8");
assert.match(sitemap, /https:\/\/uufindssheet\.com\/de\/about\//);
assert.match(sitemap, /https:\/\/uufindssheet\.com\/pt-br\/terms\//);

console.log("Validated multilingual layout, image markup, route-preserving language links, trust pages, and sitemap.");
