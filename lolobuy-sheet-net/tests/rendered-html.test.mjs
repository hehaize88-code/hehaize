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

test("publishes 93 canonical sitemap URLs with language alternates", async () => {
  const response = await fetchPage("/sitemap.xml");
  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /application\/xml|text\/xml/i,
  );

  const xml = await response.text();
  assert.equal((xml.match(/<url>/g) ?? []).length, 93);
  assert.match(xml, /<loc>https:\/\/lolobuy-sheet\.net\/es<\/loc>/);
  assert.match(
    xml,
    /hreflang="de" href="https:\/\/lolobuy-sheet\.net\/de\/qc-guide"/,
  );
  assert.match(xml, /hreflang="x-default"/);
  assert.equal((xml.match(/<lastmod>/g) ?? []).length, 93);
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
      ),
    );
    assert.match(html, /LoloBuy Sheet Editorial/);
  }
});

test("uses distinct 1200 by 630 social images for audited page intents", async () => {
  const pages = new Map([
    ["/", "spreadsheet-guide.png"],
    ["/products", "product-catalog.png"],
    ["/categories", "categories.png"],
    ["/qc-guide", "qc-guide.png"],
    ["/shipping", "shipping-guide.png"],
    ["/articles", "buying-guides.png"],
    ["/faq", "faq.png"],
    ["/how-it-works", "how-it-works.png"],
    ["/privacy-policy", "editorial-standards.png"],
    ["/articles/lolobuy-hoodie-size-guide", "hoodie-sizing-guide.png"],
    ["/articles/how-to-buy-from-lolobuy", "how-to-buy-lolobuy.png"],
  ]);

  for (const [pathname, filename] of pages) {
    const response = await fetchPage(pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    assert.match(
      html,
      new RegExp(
        `property="og:image" content="https://lolobuy-sheet\\.net/social/${filename.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`,
      ),
      pathname,
    );
  }

  for (const filename of new Set(pages.values())) {
    const bytes = await readFile(
      new URL(`../public/social/${filename}`, import.meta.url),
    );
    assert.equal(bytes.readUInt32BE(16), 1200, filename);
    assert.equal(bytes.readUInt32BE(20), 630, filename);
  }
});

test("keeps all twelve product references while removing unverified brand titles", async () => {
  const response = await fetchPage("/");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /Cushioned trail running shoes/);
  assert.match(html, /Graphic pullover hoodie collection/);
  assert.doesNotMatch(
    html,
    /HOKA|Off-White|GUCCI|Samsung|Rick Owens|Nike|Louis Vuitton|Dior|Celine|Golden Goose|Polo Ralph|Syna World|Corteiz|NUMERIS/i,
  );
  assert.match(html, /not endorsed by LoloBuy or any product brand/);
  assert.match(html, /operator may benefit commercially/);

  const referenceIds = [
    ...html.matchAll(/href="\/products\/(\d+)"/g),
  ].map((match) => match[1]);
  assert.equal(new Set(referenceIds).size, 12);
});

test("uses the requested homepage title, H1 and Buying Guides label", async () => {
  const response = await fetchPage("/");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /<title>LoloBuy Spreadsheet 2026: Finds, QC &amp; Shipping<\/title>/);
  assert.match(html, /<h1 id="hero-title">LoloBuy Spreadsheet 2026: Matched Product Finds &amp; Buying Guides<\/h1>/);
  assert.match(html, />Buying Guides<\/a>/);
  assert.doesNotMatch(html, /SEO Articles|SEO articles/);
});

test("publishes twelve internal product reference pages with honest schema", async () => {
  const ids = [3359, 3369, 3371, 3357, 3367, 3366, 3368, 3372, 3356, 3355, 3353, 3351];

  for (const id of ids) {
    const pathname = `/products/${id}`;
    const response = await fetchPage(pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();

    assert.match(html, /"@type":"ItemPage"/, pathname);
    assert.match(html, /"@type":"BreadcrumbList"/, pathname);
    assert.doesNotMatch(html, /"@type":"Product"|"@type":"Offer"/, pathname);
    assert.match(html, /These are dated reference values, not a live offer/, pathname);
    assert.match(html, new RegExp(`AllProducts/${id}\\.html`), pathname);
    assert.match(html, /rel="sponsored noopener noreferrer"/, pathname);
  }
});

test("publishes four internal category reference pages", async () => {
  for (const slug of ["shoes", "hoodies", "jackets", "accessories"]) {
    const pathname = `/categories/${slug}`;
    const response = await fetchPage(pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();

    assert.match(html, /"@type":"CollectionPage"/, pathname);
    assert.match(html, /"@type":"ItemList"/, pathname);
    assert.match(html, /href="\/products\/\d+"/, pathname);
    assert.match(html, /rel="sponsored noopener noreferrer"/, pathname);
  }
});

test("publishes every article detail in all five languages with reciprocal hreflang", async () => {
  const slugs = [
    "how-to-use-lolobuy-spreadsheet",
    "lolobuy-qc-photos-guide",
    "lolobuy-shipping-cost-guide",
    "how-to-buy-from-lolobuy",
    "lolobuy-hoodie-size-guide",
    "lolobuy-bag-qc-guide",
  ];
  const localeMarkers = new Map([
    ["es", "Qué decisión resuelve esta guía"],
    ["de", "Welche Entscheidung dieser Ratgeber unterstützt"],
    ["fr", "La décision traitée par ce guide"],
    ["it", "La decisione affrontata dalla guida"],
  ]);

  for (const slug of slugs) {
    for (const [locale, marker] of localeMarkers) {
      const pathname = `/${locale}/articles/${slug}`;
      const response = await fetchPage(pathname);
      assert.equal(response.status, 200, pathname);
      const html = await response.text();

      assert.match(html, new RegExp(`<html[^>]+lang="${locale}"`), pathname);
      assert.match(html, new RegExp(`data-article-locale="${locale}"`), pathname);
      assert.match(html, new RegExp(marker), pathname);
      assert.match(html, new RegExp(`rel="canonical" href="https://lolobuy-sheet\\.net${pathname}"`), pathname);
      assert.match(html, new RegExp(`hrefLang="en" href="https://lolobuy-sheet\\.net/articles/${slug}"`), pathname);
      assert.match(html, new RegExp(`hrefLang="${locale}" href="https://lolobuy-sheet\\.net/${locale}/articles/${slug}"`), pathname);
      assert.match(html, new RegExp(`"inLanguage":"${locale}"`), pathname);
    }
  }
});

test("serves responsive lazy product images and marks commercial links sponsored", async () => {
  const response = await fetchPage("/");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /imageSrcSet="\/products-320\/3359\.webp 320w, \/products-480\/3359\.webp 480w, \/products\/3359\.webp 750w"/);
  assert.match(html, /fetchPriority="high"/);
  assert.match(html, /loading="lazy"/);
  assert.match(html, /rel="sponsored noopener noreferrer"/);
  assert.doesNotMatch(html, /target="_blank" rel="noopener noreferrer"/);
});
