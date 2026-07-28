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

test("renders production metadata without development-preview signals", async () => {
  const worker = await loadWorker();
  const response = await fetchPage(worker, "/");

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  assert.doesNotMatch(await response.text(), developmentPreviewMeta);
});

test("permanently redirects www to the apex while preserving path and query", async () => {
  const worker = await loadWorker();
  const response = await worker.fetch(
    new Request("https://www.lolobuy-sheet.com/de/faq?source=bookmark"),
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

  assert.equal(response.status, 301);
  assert.equal(
    response.headers.get("location"),
    "https://lolobuy-sheet.com/de/faq?source=bookmark",
  );
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

test("publishes all 140 language URLs in the sitemap", async () => {
  const worker = await loadWorker();
  const response = await fetchPage(worker, "/sitemap.xml");
  const xml = await response.text();

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /application\/xml|text\/xml/i,
  );
  assert.equal((xml.match(/<url>/g) ?? []).length, 140);
  assert.match(xml, /https:\/\/lolobuy-sheet\.com\/de\/faq/);
  assert.match(xml, /https:\/\/lolobuy-sheet\.com\/de\/categories\/shoes/);
  assert.match(xml, /https:\/\/lolobuy-sheet\.com\/fr\/categories\/bags/);
  assert.match(
    xml,
    /https:\/\/lolobuy-sheet\.com\/it\/articles\/lolobuy-weidian-link-guide/,
  );
  assert.match(xml, /hreflang="x-default"/);
});

test("serves substantial localized category and article landing pages", async () => {
  const worker = await loadWorker();
  const category = await fetchPage(worker, "/de/categories/shoes");
  const categoryHtml = await category.text();
  assert.equal(category.status, 200);
  assert.match(categoryHtml, /LOLOBUY SCHUH-SPREADSHEET/i);
  assert.match(
    categoryHtml,
    /rel="canonical" href="https:\/\/lolobuy-sheet\.com\/de\/categories\/shoes"/i,
  );

  const article = await fetchPage(
    worker,
    "/fr/articles/lolobuy-weidian-link-guide",
  );
  const articleHtml = await article.text();
  assert.equal(article.status, 200);
  assert.match(articleHtml, /Guide lien Weidian avec Lolobuy 2026/i);
  assert.match(articleHtml, /Du lien au QC/i);
});

test("serves eight evidence-led product pages with local responsive images", async () => {
  const worker = await loadWorker();
  const products = [
    ["snow-ski-goggles", "7813573584", 5],
    ["gucci-hat", "7813802324", 5],
    ["off-white-hoodies", "7813733346", 5],
    ["numeris-high-top-shoes", "7810791921", 2],
    ["hoka-speedgoat-5", "7806024805", 5],
    ["nike-elite-backpack", "7804348058", 4],
    ["balenciaga-puffer", "7804322444", 4],
    ["winter-hooded-jacket", "7798076213", 4],
  ];

  for (const [slug, sourceItemId, galleryCount] of products) {
    const response = await fetchPage(worker, `/products/${slug}`);
    const html = await response.text();

    assert.equal(response.status, 200, slug);
    assert.match(
      html,
      new RegExp(`<dt>Source item ID</dt><dd>${sourceItemId}</dd>`),
    );
    assert.match(
      html,
      new RegExp(
        `<dt>Distinct source gallery files</dt><dd>${galleryCount}</dd>`,
      ),
    );
    assert.match(
      html,
      new RegExp(
        `srcSet="/product-finds/${slug}-1-160\\.webp 160w, /product-finds/${slug}-1-320\\.webp 320w, /product-finds/${slug}-1-640\\.webp 640w"`,
      ),
    );
    assert.doesNotMatch(html, /cnbuycha\.com\/uploads/i);
    assert.match(html, /"@type":"ItemPage"/);
    assert.match(html, /"@type":"BreadcrumbList"/);
    assert.doesNotMatch(html, /"@type":"Product"/);
    assert.doesNotMatch(html, /"offers"|"review"|"aggregateRating"/);
  }
});

test("publishes article images, social previews and complete article schema", async () => {
  const worker = await loadWorker();
  const slugs = [
    "lolobuy-spreadsheet-guide",
    "how-to-read-qc-photos",
    "plan-china-shopping-haul",
    "lolobuy-review-early-user-experience",
    "lolobuy-weidian-link-guide",
  ];

  for (const slug of slugs) {
    const response = await fetchPage(worker, `/articles/${slug}`);
    const html = await response.text();

    assert.equal(response.status, 200, slug);
    assert.match(html, new RegExp(`<img[^>]+src="/articles/${slug}\\.webp"`));
    assert.match(
      html,
      new RegExp(
        `<meta property="og:image" content="https://lolobuy-sheet\\.com/articles/${slug}\\.webp"`,
      ),
    );
    assert.match(
      html,
      new RegExp(
        `<meta name="twitter:image" content="https://lolobuy-sheet\\.com/articles/${slug}\\.webp"`,
      ),
    );
    assert.match(html, /"@type":"Article"/);
    assert.match(html, /"image":\{"@type":"ImageObject"/);
    assert.match(html, /"author":\{[^}]*"url":"https:\/\/lolobuy-sheet\.com\/about"/);
    assert.match(
      html,
      /"publisher":\{.*?"url":"https:\/\/lolobuy-sheet\.com\/".*?"logo":\{"@type":"ImageObject","url":"https:\/\/lolobuy-sheet\.com\/social\/lolobuy-publisher-logo\.png"/,
    );
    assert.match(html, /"@type":"BreadcrumbList"/);
  }
});
