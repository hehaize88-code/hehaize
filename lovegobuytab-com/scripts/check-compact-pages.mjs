import assert from "node:assert/strict";
import fs from "node:fs";
import { parseHTML } from "linkedom";
import worker from "../dist/server/index.js";
const origin = "https://lovegobuytab.com";
const ui = JSON.parse(fs.readFileSync("src/content/image-search-ui.json"));
const products = JSON.parse(
  fs.readFileSync("public/assets/catalog-image-index.json"),
).products.slice(0, 60);
const escape = (s) =>
  String(s)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;");
// Source parser fixture built from existing real catalogue records; no live requests.
const fixture =
  '<html><title>CnBuyCha</title><a class="category-item" href="/shoes/"><h3>Shoes</h3><span class="category-count">60</span></a><span class="results-summary">60 products</span>' +
  products
    .map(
      (p) =>
        `<article class="product-card"><a class="product-title" href="${escape(p.path)}"><h3>${escape(p.title)}</h3></a><img src="${escape(p.image)}"><span class="product-price">${escape(p.price)}</span></article>`,
    )
    .join("") +
  "</html>";
globalThis.fetch = async (url) => {
  assert.ok(String(url).startsWith("https://cnbuycha.com/"));
  return new Response(fixture);
};
for (const lang of Object.keys(ui)) {
  const prefix = lang === "en" ? "" : "/" + lang;
  for (const path of ["/", "/spreadsheet/", "/spreadsheet/shoes/"]) {
    const response = await worker.fetch(
      new Request(origin + prefix + path + "?q=jacket&sort=price"),
      {},
    );
    assert.equal(response.status, 200);
    const { document: d } = parseHTML(await response.text());
    const form = d.querySelector("[data-image-search-form]");
    assert.ok(form);
    assert.equal(d.querySelectorAll("h1").length, 1, lang + path);
    assert.equal(
      form.querySelector("[data-image-search-trigger]").getAttribute("type"),
      "button",
    );
    assert.ok(form.querySelector('button[type="submit"]'));
    assert.equal(d.querySelectorAll("[data-visual-app]").length, 1);
    assert.ok(d.querySelector("dialog[data-image-search-dialog]"));
    assert.equal(d.querySelector("#image-file").type, "file");
    if (path !== "/") {
      assert.equal(form.querySelector('[name="q"]').value, "jacket");
      assert.equal(form.querySelector('[name="sort"]').value, "price");
      assert.equal(
        d.querySelectorAll(".catalog-section > .product-grid .product-card")
          .length,
        20,
      );
    }
  }
  const faqResponse = await worker.fetch(
    new Request(origin + prefix + "/faq/"),
    {},
  );
  const { document: faqDoc } = parseHTML(await faqResponse.text());
  const faq = JSON.parse(fs.readFileSync(`src/content/faq/${lang}.json`)).faq;
  assert.equal(faqDoc.querySelectorAll("[data-faq]").length, faq.length);
  for (const f of faq)
    assert.ok(faqDoc.getElementById(f.id).textContent.includes(f.answer));
  assert.ok(faqDoc.body.classList.contains("compact-page"));
  const articleResponse = await worker.fetch(
    new Request(origin + prefix + "/articles/lovegobuy-tracking-guide/"),
    {},
  );
  const { document: d } = parseHTML(await articleResponse.text());
  const article = JSON.parse(
    fs.readFileSync(`src/content/articles/${lang}.json`),
  ).articles.find((a) => a.slug === "lovegobuy-tracking-guide");
  assert.equal(
    d.querySelectorAll("details.article-section:not(.article-sources)").length,
    article.sections.length,
  );
  assert.equal(d.querySelectorAll(".article-section[open]").length, 0);
  for (let i = 0; i < article.sections.length; i++) {
    assert.equal(d.getElementById("section-" + i).tagName, "DETAILS");
    assert.ok(d.querySelector(`.article-toc a[href="#section-${i}"]`));
  }
}
console.log(
  "PASS: search-box camera and text forms, one H1, 20 catalogue items, complete FAQs and collapsed article sections in all 24 locales.",
);
