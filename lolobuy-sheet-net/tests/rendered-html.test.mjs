import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

const workerPromise = (async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  return (await import(workerUrl.href)).default;
})();

async function fetchUrl(url) {
  const worker = await workerPromise;
  return worker.fetch(
    new Request(url, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

async function fetchPage(pathname) {
  return fetchUrl(`http://localhost${pathname}`);
}

test("renders indexable English metadata without Product rich-result claims", async () => {
  const response = await fetchPage("/");

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();

  assert.match(html, developmentPreviewMeta);
  assert.match(html, /"@type":"ItemList"/);
  assert.doesNotMatch(html, /"@type":"Product"/);
  assert.match(html, /hrefLang="es"/);
  assert.match(html, /hrefLang="x-default"/);
});

test("server-renders localized URLs with reciprocal SEO signals", async () => {
  const checks = [
    ["/es", "es", "Hoja LoloBuy 2026", "/es/products"],
    ["/de/qc-guide", "de", "Praktische QC-Checkliste", "/de/products"],
    ["/fr/shipping", "fr", "Comprenez ce qui peut modifier", "/fr/products"],
    [
      "/it/articles",
      "it",
      "Guide LoloBuy documentate",
      "/it/products",
    ],
  ];

  for (const [pathname, locale, expectedText, expectedLink] of checks) {
    const response = await fetchPage(pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();

    assert.match(html, new RegExp(`<html[^>]+lang="${locale}"`), pathname);
    assert.match(html, new RegExp(expectedText), pathname);
    assert.match(html, new RegExp(`href="${expectedLink}"`), pathname);
    assert.match(
      html,
      new RegExp(
        `rel="canonical" href="https://lolobuy-sheet\\.net${pathname.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`,
      ),
      pathname,
    );
    assert.equal(
      (html.match(/hrefLang="/g) ?? []).length >= 6,
      true,
      pathname,
    );
    assert.doesNotMatch(html, /\?lang=/, pathname);
  }
});

test("publishes 103 canonical sitemap URLs with language alternates", async () => {
  const response = await fetchPage("/sitemap.xml");
  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /application\/xml|text\/xml/i,
  );

  const xml = await response.text();
  assert.equal((xml.match(/<url>/g) ?? []).length, 103);
  assert.match(xml, /<loc>https:\/\/lolobuy-sheet\.net\/es<\/loc>/);
  assert.match(
    xml,
    /hreflang="de" href="https:\/\/lolobuy-sheet\.net\/de\/qc-guide"/,
  );
  assert.match(xml, /hreflang="x-default"/);
  assert.equal((xml.match(/<lastmod>/g) ?? []).length, 103);
  assert.match(
    xml,
    /<loc>https:\/\/lolobuy-sheet\.net\/products<\/loc>[\s\S]*?<lastmod>2026-07-29<\/lastmod>/,
  );
  assert.match(
    xml,
    /<loc>https:\/\/lolobuy-sheet\.net\/es\/products<\/loc>[\s\S]*?<lastmod>2026-07-29<\/lastmod>/,
  );
  assert.equal(
    new Set([...xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((match) => match[1])).size >= 4,
    true,
  );
  assert.match(
    xml,
    /<loc>https:\/\/lolobuy-sheet\.net\/articles\/lolobuy-hoodie-size-guide<\/loc>[\s\S]*?<lastmod>2026-07-30<\/lastmod>/,
  );
  assert.match(
    xml,
    /<loc>https:\/\/lolobuy-sheet\.net\/articles\/how-to-buy-from-lolobuy<\/loc>[\s\S]*?<lastmod>2026-08-03<\/lastmod>/,
  );
  assert.match(
    xml,
    /<loc>https:\/\/lolobuy-sheet\.net\/articles\/lolobuy-bag-qc-guide<\/loc>[\s\S]*?<lastmod>2026-08-10<\/lastmod>/,
  );
  assert.match(xml, /<loc>https:\/\/lolobuy-sheet\.net\/es\/articles\/lolobuy-bag-qc-guide<\/loc>/);
  assert.match(xml, /<loc>https:\/\/lolobuy-sheet\.net\/products\/3359<\/loc>/);
  assert.match(xml, /<loc>https:\/\/lolobuy-sheet\.net\/categories\/shoes<\/loc>/);
  assert.match(xml, /<loc>https:\/\/lolobuy-sheet\.net\/about<\/loc>/);
  assert.match(
    xml,
    /<loc>https:\/\/lolobuy-sheet\.net\/editorial-policy<\/loc>/,
  );
  assert.match(
    xml,
    /<loc>https:\/\/lolobuy-sheet\.net\/research-method<\/loc>/,
  );
  assert.match(xml, /<loc>https:\/\/lolobuy-sheet\.net\/contact<\/loc>/);
  assert.match(
    xml,
    /<loc>https:\/\/lolobuy-sheet\.net\/privacy-policy<\/loc>/,
  );
  assert.match(xml, /<loc>https:\/\/lolobuy-sheet\.net\/terms<\/loc>/);
  assert.match(
    xml,
    /<loc>https:\/\/lolobuy-sheet\.net\/independent-disclosure<\/loc>/,
  );
});

test("uses concise standalone SEO titles for all long-form guides", async () => {
  const expectedTitles = new Map([
    [
      "/articles/how-to-use-lolobuy-spreadsheet",
      "How to Use a LoloBuy Spreadsheet | 2026 Guide",
    ],
    [
      "/articles/lolobuy-qc-photos-guide",
      "LoloBuy QC Photos Guide: What to Check",
    ],
    [
      "/articles/lolobuy-shipping-cost-guide",
      "LoloBuy Shipping Cost Guide: Weight &amp; Parcel Size",
    ],
    [
      "/articles/lolobuy-hoodie-size-guide",
      "LoloBuy Hoodie Size Guide: Measure Before Ordering",
    ],
    [
      "/articles/how-to-buy-from-lolobuy",
      "How to Buy from LoloBuy: Link-to-Warehouse Guide",
    ],
  ]);

  for (const [pathname, title] of expectedTitles) {
    const response = await fetchPage(pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    assert.match(
      html,
      new RegExp(`<title>${title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}</title>`),
      pathname,
    );
    assert.doesNotMatch(
      html,
      /<title>[^<]+\| LoloBuy Sheet<\/title>/,
      pathname,
    );
  }
});

test("publishes a distinct evidence-led hoodie sizing article", async () => {
  const pathname = "/articles/lolobuy-hoodie-size-guide";
  const response = await fetchPage(pathname);
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(
    html,
    /<h1>LoloBuy Hoodie Size Guide: A Measurement-First Method for Better Fit Decisions<\/h1>/,
  );
  assert.match(
    html,
    /rel="canonical" href="https:\/\/lolobuy-sheet\.net\/articles\/lolobuy-hoodie-size-guide"/,
  );
  assert.match(html, /"@type":"Article"/);
  assert.match(html, /"@type":"BreadcrumbList"/);
  assert.match(html, /"datePublished":"2026-07-30"/);
  assert.match(html, /Evidence ledger and limits/);
  assert.match(html, /90 days of free storage/);
  assert.match(html, /href="\/categories"/);
  assert.match(html, /href="\/articles\/lolobuy-qc-photos-guide"/);
  assert.match(html, /href="\/articles\/how-to-use-lolobuy-spreadsheet"/);

  const lengthMatch = html.match(
    /<dt>Length<\/dt><dd>([\d,]+)(?:<!-- -->)? words<\/dd>/,
  );
  assert.ok(lengthMatch, "visible editorial word count is missing");
  const words = Number(lengthMatch[1].replaceAll(",", ""));
  assert.equal(
    words >= 1200 && words <= 1800,
    true,
    `hoodie guide reports ${words} editorial words`,
  );

  const absoluteLinks = [...html.matchAll(/href="(https?:\/\/[^"]+)"/g)].map(
    (match) => new URL(match[1]).hostname,
  );
  assert.deepEqual(
    [...new Set(absoluteLinks)].sort(),
    ["lolobuy-sheet.net", "www.cnbuycha.com"],
  );
  assert.doesNotMatch(html, /"@type":"Product"/);
});

test("publishes a distinct order-to-warehouse buying guide", async () => {
  const pathname = "/articles/how-to-buy-from-lolobuy";
  const response = await fetchPage(pathname);
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(
    html,
    /<h1>How to Buy from LoloBuy: From Product Link to Warehouse Check<\/h1>/,
  );
  assert.match(
    html,
    /rel="canonical" href="https:\/\/lolobuy-sheet\.net\/articles\/how-to-buy-from-lolobuy"/,
  );
  assert.match(html, /"@type":"Article"/);
  assert.match(html, /"@type":"BreadcrumbList"/);
  assert.match(html, /"datePublished":"2026-08-03"/);
  assert.match(html, /Evidence ledger and limits/);
  assert.match(html, /Five separate checkpoints/i);
  assert.match(html, /90 days of free storage/);
  assert.match(html, /href="\/articles\/how-to-use-lolobuy-spreadsheet"/);
  assert.match(html, /href="\/articles\/lolobuy-qc-photos-guide"/);
  assert.match(html, /href="\/articles\/lolobuy-shipping-cost-guide"/);

  const lengthMatch = html.match(
    /<dt>Length<\/dt><dd>([\d,]+)(?:<!-- -->)? words<\/dd>/,
  );
  assert.ok(lengthMatch, "visible editorial word count is missing");
  const words = Number(lengthMatch[1].replaceAll(",", ""));
  assert.equal(
    words >= 1200 && words <= 1800,
    true,
    `buying guide reports ${words} editorial words`,
  );

  const absoluteLinks = [...html.matchAll(/href="(https?:\/\/[^\"]+)"/g)].map(
    (match) => new URL(match[1]).hostname,
  );
  assert.deepEqual(
    [...new Set(absoluteLinks)].sort(),
    ["lolobuy-sheet.net", "www.cnbuycha.com"],
  );
  assert.doesNotMatch(html, /"@type":"Product"/);
});

test("publishes a distinct evidence-led bag QC guide", async () => {
  const pathname = "/articles/lolobuy-bag-qc-guide";
  const response = await fetchPage(pathname);
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /<h1>LoloBuy Bag QC Guide: Measure Structure, Straps and Hardware Before Shipping<\/h1>/);
  assert.match(html, /rel="canonical" href="https:\/\/lolobuy-sheet\.net\/articles\/lolobuy-bag-qc-guide"/);
  assert.match(html, /"@type":"Article"/);
  assert.match(html, /"@type":"BreadcrumbList"/);
  assert.match(html, /"datePublished":"2026-08-10"/);
  assert.match(html, /src="\/social\/bag-qc-guide\.svg"/);
  assert.match(html, /href="\/articles\/lolobuy-qc-photos-guide"/);
  assert.match(html, /href="\/categories"/);

  const lengthMatch = html.match(/<dt>Length<\/dt><dd>([\d,]+)(?:<!-- -->)? words<\/dd>/);
  assert.ok(lengthMatch, "visible editorial word count is missing");
  const words = Number(lengthMatch[1].replaceAll(",", ""));
  assert.equal(words >= 1200 && words <= 1800, true, `bag QC guide reports ${words} editorial words`);

  const absoluteLinks = [...html.matchAll(/href="(https?:\/\/[^\"]+)"/g)].map((match) => new URL(match[1]).hostname);
  assert.deepEqual([...new Set(absoluteLinks)].sort(), ["lolobuy-sheet.net", "www.cnbuycha.com"]);
  assert.doesNotMatch(html, /"@type":"Product"/);
});

test("publishes a function-first stitching and finish QC checklist", async () => {
  const pathname = "/articles/lolobuy-stitching-finish-qc-checklist";
  const response = await fetchPage(pathname);
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /<h1>LoloBuy Stitching and Finish QC:/);
  assert.match(html, /rel="canonical" href="https:\/\/lolobuy-sheet\.net\/articles\/lolobuy-stitching-finish-qc-checklist"/);
  assert.match(html, /"@type":"Article"/);
  assert.match(html, /"@type":"BreadcrumbList"/);
  assert.match(html, /"datePublished":"2026-08-12"/);
  assert.match(html, /src="\/social\/stitching-finish-qc\.svg"/);
  assert.doesNotMatch(html, /"@type":"Product"/);

  const lengthMatch = html.match(/<dt>Length<\/dt><dd>([\d,]+)(?:<!-- -->)? words<\/dd>/);
  assert.ok(lengthMatch, "visible editorial word count is missing");
  assert.equal(Number(lengthMatch[1].replaceAll(",", "")) >= 1200, true);
  assert.equal(Number(lengthMatch[1].replaceAll(",", "")) <= 1800, true);
});

test("publishes a perspective-aware alignment and print-placement QC guide", async () => {
  const pathname = "/articles/lolobuy-alignment-symmetry-print-placement-qc";
  const response = await fetchPage(pathname);
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /<h1>LoloBuy Alignment QC:/);
  assert.match(html, /rel="canonical" href="https:\/\/lolobuy-sheet\.net\/articles\/lolobuy-alignment-symmetry-print-placement-qc"/);
  assert.match(html, /"@type":"Article"/);
  assert.match(html, /"@type":"BreadcrumbList"/);
  assert.match(html, /"datePublished":"2026-08-14"/);
  assert.doesNotMatch(html, /"@type":"Product"/);

  const lengthMatch = html.match(/<dt>Length<\/dt><dd>([\d,]+)(?:<!-- -->)? words<\/dd>/);
  assert.ok(lengthMatch, "visible editorial word count is missing");
  const words = Number(lengthMatch[1].replaceAll(",", ""));
  assert.equal(words >= 1200 && words <= 1800, true, `alignment QC guide reports ${words} words`);
});

test("redirects legacy language parameters to clean locale paths", async () => {
  const response = await fetchPage("/shipping?lang=fr");
  assert.equal(response.status, 301);
  assert.equal(
    response.headers.get("location"),
    "http://localhost/fr/shipping",
  );
});

test("permanently redirects www to the canonical host and preserves path and query", async () => {
  const response = await fetchUrl(
    "https://www.lolobuy-sheet.net/es/shipping?parcel=2",
  );
  assert.equal(response.status, 301);
  assert.equal(
    response.headers.get("location"),
    "https://lolobuy-sheet.net/es/shipping?parcel=2",
  );
});

function visibleMainWordCount(html) {
  const main = html.match(/<main\b[\s\S]*?<\/main>/i)?.[0] ?? html;
  const text = main
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(?:[a-z]+|#\d+);/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text ? text.split(" ").length : 0;
}

test("gives every standalone guide enough independent editorial value", async () => {
  const minimumWords = new Map([
    ["/how-it-works", 500],
    ["/categories", 480],
    ["/products", 490],
    ["/faq", 1000],
    ["/articles", 520],
    ["/qc-guide", 570],
    ["/shipping", 580],
  ]);

  for (const [pathname, minimum] of minimumWords) {
    const response = await fetchPage(pathname);
    assert.equal(response.status, 200, pathname);
    const count = visibleMainWordCount(await response.text());
    assert.equal(
      count >= minimum,
      true,
      `${pathname} rendered ${count} words; expected at least ${minimum}`,
    );
  }
});

test("shows visible authorship that agrees with Article structured data", async () => {
  for (const pathname of [
    "/articles/how-to-use-lolobuy-spreadsheet",
    "/articles/lolobuy-qc-photos-guide",
    "/articles/lolobuy-shipping-cost-guide",
    "/articles/lolobuy-hoodie-size-guide",
    "/articles/how-to-buy-from-lolobuy",
  ]) {
    const response = await fetchPage(pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();

    assert.match(html, /Written by/);
    assert.match(html, /LoloBuy Sheet Editorial/);
    assert.match(html, /href="\/about"/);
    assert.match(html, /href="\/editorial-policy"/);
    assert.match(html, /href="\/research-method"/);
    assert.match(html, /Last reviewed:/);
    assert.match(
      html,
      /"publishingPrinciples":"https:\/\/lolobuy-sheet\.net\/editorial-policy"/,
    );
  }
});

test("publishes transparent editorial, legal and commercial-disclosure pages", async () => {
  const pages = new Map([
    ["/about", "Who writes LoloBuy Sheet"],
    ["/editorial-policy", "No invented fees, ratings or customer stories"],
    ["/research-method", "How a LoloBuy Sheet guide is researched"],
    ["/contact", "This static site does not currently publish a verified editorial inbox"],
    ["/privacy-policy", "Technical request data and hosting"],
    ["/terms", "External links and commercial context"],
    ["/independent-disclosure", "Associated catalog and potential commercial benefit"],
  ]);

  for (const [pathname, expectedText] of pages) {
    const response = await fetchPage(pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    assert.match(html, new RegExp(expectedText));
    assert.match(
      html,
      new RegExp(
        `rel="canonical" href="https://lolobuy-sheet\\.net${pathname.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`,
      