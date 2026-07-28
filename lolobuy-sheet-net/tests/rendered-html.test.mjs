import assert from "node:assert/strict";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

const workerPromise = (async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  return (await import(workerUrl.href)).default;
})();

async function fetchPage(pathname) {
  const worker = await workerPromise;
  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
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
    ["/es", "es", "Encuentra el artículo", "/es/products"],
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

test("publishes 47 canonical sitemap URLs with language alternates", async () => {
  const response = await fetchPage("/sitemap.xml");
  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /application\/xml|text\/xml/i,
  );

  const xml = await response.text();
  assert.equal((xml.match(/<url>/g) ?? []).length, 47);
  assert.match(xml, /<loc>https:\/\/lolobuy-sheet\.net\/es<\/loc>/);
  assert.match(
    xml,
    /hreflang="de" href="https:\/\/lolobuy-sheet\.net\/de\/qc-guide"/,
  );
  assert.match(xml, /hreflang="x-default"/);
  assert.equal((xml.match(/<lastmod>/g) ?? []).length, 47);
  assert.match(
    xml,
    /<loc>https:\/\/lolobuy-sheet\.net\/products<\/loc>[\s\S]*?<lastmod>2026-07-28<\/lastmod>/,
  );
  assert.match(
    xml,
    /<loc>https:\/\/lolobuy-sheet\.net\/es\/products<\/loc>[\s\S]*?<lastmod>2026-07-28<\/lastmod>/,
  );
  assert.equal(
    new Set([...xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((match) => match[1])).size,
    2,
  );
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

test("redirects legacy language parameters to clean locale paths", async () => {
  const response = await fetchPage("/shipping?lang=fr");
  assert.equal(response.status, 301);
  assert.equal(
    response.headers.get("location"),
    "http://localhost/fr/shipping",
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

test("publishes transparent editorial identity and policy pages", async () => {
  const pages = new Map([
    ["/about", "Who writes LoloBuy Sheet"],
    ["/editorial-policy", "No invented fees, ratings or customer stories"],
    ["/research-method", "How a LoloBuy Sheet guide is researched"],
    ["/contact", "This static site does not currently publish a verified editorial inbox"],
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
      ),
    );
    assert.match(html, /LoloBuy Sheet Editorial/);
  }
});
