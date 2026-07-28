import assert from "node:assert/strict";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker;
}

async function fetchPage(worker, path) {
  return worker.fetch(
    new Request(`https://lolobuy-sheet.com${path}`, {
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

test("renders development preview metadata", async () => {
  const worker = await loadWorker();
  const response = await fetchPage(worker, "/");

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  assert.match(await response.text(), developmentPreviewMeta);
});

test("serves localized paths with complete reciprocal SEO signals", async () => {
  const worker = await loadWorker();
  const response = await fetchPage(worker, "/de/faq");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("content-language"), "de");
  assert.match(html, /<html lang="de"/i);
  assert.match(html, /<title>LoloBuy-Fakten[^<]*<\/title>/i);
  assert.match(
    html,
    /<link rel="canonical" href="https:\/\/lolobuy-sheet\.com\/de\/faq"/i,
  );

  for (const [locale, path] of [
    ["en", "/faq"],
    ["es", "/es/faq"],
    ["de", "/de/faq"],
    ["fr", "/fr/faq"],
    ["it", "/it/faq"],
    ["x-default", "/faq"],
  ]) {
    assert.match(
      html,
      new RegExp(
        `<link(?=[^>]*\\brel="alternate")(?=[^>]*\\bhrefLang="${locale}")(?=[^>]*\\bhref="https:\\/\\/lolobuy-sheet\\.com${path.replaceAll("/", "\\/")}")`,
        "i",
      ),
    );
  }
});

test("redirects legacy query and /en URLs to canonical language paths", async () => {
  const worker = await loadWorker();
  const legacy = await fetchPage(worker, "/faq?lang=fr");
  assert.equal(legacy.status, 301);
  assert.equal(legacy.headers.get("location"), "https://lolobuy-sheet.com/fr/faq");

  const englishPrefix = await fetchPage(worker, "/en/faq");
  assert.equal(englishPrefix.status, 301);
  assert.equal(englishPrefix.headers.get("location"), "https://lolobuy-sheet.com/faq");
});

test("publishes all 120 language URLs in the sitemap", async () => {
  const worker = await loadWorker();
  const response = await fetchPage(worker, "/sitemap.xml");
  const xml = await response.text();

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /application\/xml|text\/xml/i,
  );
  assert.equal((xml.match(/<url>/g) ?? []).length, 120);
  assert.match(xml, /https:\/\/lolobuy-sheet\.com\/de\/faq/);
  assert.match(xml, /hreflang="x-default"/);
});
