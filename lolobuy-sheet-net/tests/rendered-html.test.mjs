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

test("publishes 43 canonical sitemap URLs with language alternates", async () => {
  const response = await fetchPage("/sitemap.xml");
  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /application\/xml|text\/xml/i,
  );

  const xml = await response.text();
  assert.equal((xml.match(/<url>/g) ?? []).length, 43);
  assert.match(xml, /<loc>https:\/\/lolobuy-sheet\.net\/es<\/loc>/);
  assert.match(
    xml,
    /hreflang="de" href="https:\/\/lolobuy-sheet\.net\/de\/qc-guide"/,
  );
  assert.match(xml, /hreflang="x-default"/);
});

test("redirects legacy language parameters to clean locale paths", async () => {
  const response = await fetchPage("/shipping?lang=fr");
  assert.equal(response.status, 301);
  assert.equal(
    response.headers.get("location"),
    "http://localhost/fr/shipping",
  );
});
