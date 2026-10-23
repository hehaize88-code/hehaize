import assert from "node:assert/strict";
import fs from "node:fs";
import { parseHTML } from "linkedom";
import worker from "../dist/server/index.js";
const origin = "https://lovegobuytab.com";
const langs = (
  process.env.CHECK_LOCALES ||
  "en de es fr it pl pt ro sv nl da fi el cs hu bg sk hr sl lt lv et ga mt"
).split(" ");
const local = (lang, path) => (lang === "en" ? "" : "/" + lang) + path;
const get = async (path, host = origin) => {
  const response = await worker.fetch(
    new Request(host + path),
    {},
    { waitUntil() {} },
  );
  return { response, html: await response.text() };
};
let routes = 0,
  tables = 0;
for (const lang of langs) {
  const { articles } = JSON.parse(
    fs.readFileSync(`src/content/articles/${lang}.json`, "utf8"),
  );
  const index = await get(local(lang, "/articles/"));
  assert.equal(index.response.status, 200);
  const indexDoc = parseHTML(index.html).document;
  assert.equal(
    indexDoc.querySelectorAll(".articles-index .article-card").length,
    13,
  );
  assert.match(
    indexDoc
      .querySelector(".articles-index .article-card a")
      .getAttribute("href"),
    /lovegobuy-tracking-guide/,
  );
  for (const article of articles) {
    const path = local(lang, `/articles/${article.slug}/`);
    const { response, html } = await get(path);
    assert.equal(response.status, 200, path);
    const doc = parseHTML(html).document;
    assert.equal(doc.documentElement.lang, lang, path);
    assert.equal(doc.querySelector("title").textContent, article.title, path);
    assert.equal(
      doc.querySelector('link[rel="canonical"]').href,
      origin + path,
      path,
    );
    assert.equal(
      doc.querySelectorAll('link[rel="alternate"]').length,
      25,
      path,
    );
    assert.equal(doc.querySelector('meta[name="robots"]'), null, path);
    assert.equal(
      doc.querySelectorAll('script[src*="googletagmanager.com/gtag/js"]')
        .length,
      1,
      path,
    );
    assert.equal(
      doc.querySelectorAll('script[src="/interaction-events.js"]').length,
      1,
      path,
    );
    const schema = JSON.parse(
      doc.querySelector('script[type="application/ld+json"]').textContent,
    );
    assert.equal(schema["@type"], "Article");
    assert.equal(schema.inLanguage, lang);
    assert.equal(schema.datePublished, article.datePublished || "2026-10-22");
    assert.equal(schema.dateModified, article.dateModified || "2026-10-22");
    const body = doc.querySelector(".article-body");
    for (const text of [
      ...article.intro,
      ...article.takeaways,
      ...article.sections.flatMap((s) => [
        s.heading,
        ...s.paragraphs,
        ...(s.bullets || []),
        ...(s.table ? s.table.rows.flat() : []),
      ]),
    ]) {
      assert.ok(
        body.textContent.includes(text),
        `Missing localized text ${path}: ${text.slice(0, 50)}`,
      );
    }
    const count = article.sections.filter((s) => s.table).length;
    assert.equal(doc.querySelectorAll(".editorial-table").length, count, path);
    tables += count;
    assert.ok(
      doc.querySelectorAll(".article-grid .article-card").length >= 3,
      `Missing related articles ${path}`,
    );
    for (const anchor of doc.querySelectorAll(
      ".article-grid a, .guide-links a",
    )) {
      const href = anchor.getAttribute("href");
      assert.ok(
        href.startsWith(lang === "en" ? "/" : "/" + lang + "/"),
        `Wrong related language: ${path}`,
      );
      if (href.includes("/articles/"))
        assert.ok(
          articles.some((a) => href === local(lang, `/articles/${a.slug}/`)),
          `Broken related article: ${href}`,
        );
    }
    routes++;
  }
}
const { response: sitemapResponse, html: sitemap } = await get(
  "/sitemaps/pages.xml",
);
assert.equal(sitemapResponse.status, 200);
assert.match(sitemapResponse.headers.get("content-type"), /application\/xml/);
const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (m) => m[1],
);
assert.equal(locations.length, 408);
assert.equal(new Set(locations).size, 408);
for (const lang of langs)
  for (const slug of [
    "lovegobuy-tracking-guide",
    "lovegobuy-shipping-time",
    "lovegobuy-image-search-guide",
  ]) {
    assert.ok(locations.includes(origin + local(lang, `/articles/${slug}/`)));
  }
assert.equal(
  (sitemap.match(/<lastmod>2026-10-23<\/lastmod>/g) || []).length,
  288,
);
const preview = await get(
  "/articles/lovegobuy-tracking-guide/",
  "https://lovegobuytab-preview.hehaize88.workers.dev",
);
assert.equal(preview.response.status, 200);
assert.match(preview.response.headers.get("x-robots-tag"), /noindex/);
assert.ok(!preview.html.includes("G-W9KK0L385M"));
assert.ok(!preview.html.includes("/interaction-events.js"));
const missing = await get("/articles/does-not-exist/");
assert.equal(missing.response.status, 404);
assert.match(missing.html, /noindex,follow/);
const www = await get(
  "/de/articles/lovegobuy-tracking-guide/?test=1",
  "https://www.lovegobuytab.com",
);
assert.equal(www.response.status, 301);
assert.equal(
  www.response.headers.get("location"),
  origin + "/de/articles/lovegobuy-tracking-guide/?test=1",
);
console.log(
  `Passed ${routes} localized article routes, ${tables} translated tables, ${langs.length} article indexes, 408 sitemap URLs, dates, metadata, related links and production/preview isolation.`,
);
