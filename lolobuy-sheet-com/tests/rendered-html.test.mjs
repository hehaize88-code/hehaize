import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
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

function decodeHtml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&#x27;", "'")
    .replaceAll("&quot;", '"')
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
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

test("publishes all 200 language URLs in the sitemap", async () => {
  const worker = await loadWorker();
  const response = await fetchPage(worker, "/sitemap.xml");
  const xml = await response.text();

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /application\/xml|text\/xml/i,
  );
  assert.equal((xml.match(/<url>/g) ?? []).length, 200);
  assert.match(xml, /https:\/\/lolobuy-sheet\.com\/de\/faq/);
  assert.match(xml, /https:\/\/lolobuy-sheet\.com\/de\/categories\/shoes/);
  assert.match(xml, /https:\/\/lolobuy-sheet\.com\/fr\/categories\/bags/);
  assert.match(xml, /https:\/\/lolobuy-sheet\.com\/de\/categories\/jackets/);
  assert.match(xml, /https:\/\/lolobuy-sheet\.com\/es\/categories\/pants-shorts/);
  assert.match(xml, /https:\/\/lolobuy-sheet\.com\/fr\/categories\/headwear/);
  assert.match(xml, /https:\/\/lolobuy-sheet\.com\/it\/categories\/accessories/);
  assert.match(xml, /https:\/\/lolobuy-sheet\.com\/de\/categories\/t-shirts/);
  assert.match(xml, /https:\/\/lolobuy-sheet\.com\/fr\/categories\/jersey/);
  assert.match(
    xml,
    /https:\/\/lolobuy-sheet\.com\/it\/articles\/lolobuy-weidian-link-guide/,
  );
  assert.match(
    xml,
    /https:\/\/lolobuy-sheet\.com\/es\/articles\/lolobuy-qc-mismatch-evidence-guide/,
  );
  assert.match(
    xml,
    /https:\/\/lolobuy-sheet\.com\/de\/articles\/lolobuy-tracking-not-updating-guide/,
  );
  assert.match(
    xml,
    /https:\/\/lolobuy-sheet\.com\/fr\/articles\/lolobuy-shoe-size-guide/,
  );
  assert.match(xml, /hreflang="x-default"/);
});

test("keeps sitemap.xml as the only sitemap document", async () => {
  const worker = await loadWorker();
  const response = await fetchPage(worker, "/sitemap-main.xml");

  assert.equal(response.status, 301);
  assert.equal(
    response.headers.get("location"),
    "https://lolobuy-sheet.com/sitemap.xml",
  );
  assert.doesNotMatch(await response.text(), /<urlset\b/i);
});

test("returns a search-safe 404 without a homepage canonical", async () => {
  const worker = await loadWorker();
  const response = await fetchPage(worker, "/missing-audit-page");
  const html = await response.text();

  assert.equal(response.status, 404);
  assert.match(html, /<title>Page Not Found \| Lolobuy Sheet<\/title>/i);
  assert.match(
    html,
    /<meta name="robots" content="noindex, follow"\s*\/?>/i,
  );
  assert.doesNotMatch(html, /<link rel="canonical"/i);
  assert.doesNotMatch(
    html,
    /<meta property="og:url" content="https:\/\/lolobuy-sheet\.com\/"/i,
  );
});

test("adds the required security headers to application responses", async () => {
  const worker = await loadWorker();
  const response = await fetchPage(worker, "/");

  assert.equal(
    response.headers.get("strict-transport-security"),
    "max-age=31536000; includeSubDomains",
  );
  assert.equal(
    response.headers.get("x-content-type-options"),
    "nosniff",
  );
  assert.equal(
    response.headers.get("referrer-policy"),
    "strict-origin-when-cross-origin",
  );
  assert.equal(response.headers.get("x-frame-options"), "DENY");
  assert.match(
    response.headers.get("content-security-policy") ?? "",
    /default-src 'self'.*frame-ancestors 'none'.*object-src 'none'/i,
  );
});

test("keeps every indexed title concise and every description snippet bounded", async () => {
  const worker = await loadWorker();
  const sitemapResponse = await fetchPage(worker, "/sitemap.xml");
  const sitemap = await sitemapResponse.text();
  const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (match) => new URL(match[1]).pathname,
  );
  const titles = new Map();

  for (const path of paths) {
    const response = await fetchPage(worker, path);
    const html = await response.text();
    const title = decodeHtml(html.match(/<title>([^<]+)<\/title>/i)?.[1] ?? "");
    const description = decodeHtml(
      html.match(/<meta name="description" content="([^"]*)"/i)?.[1] ?? "",
    );

    assert.equal(response.status, 200, path);
    assert.ok(title.length > 0, `${path} must have a title`);
    assert.ok(title.length <= 60, `${path} title is ${title.length} characters`);
    assert.ok(
      description.length > 0,
      `${path} must have a meta description`,
    );
    assert.ok(
      description.length <= 155,
      `${path} description is ${description.length} characters`,
    );
    assert.equal(titles.has(title), false, `${path} duplicates title "${title}"`);
    titles.set(title, path);
  }
});

test("aligns priority landing-page titles and H1s with their target queries", async () => {
  const worker = await loadWorker();
  const pages = [
    [
      "/finds",
      "Lolobuy Spreadsheet Finds 2026 | Product Directory",
      "Lolobuy Spreadsheet Finds: Curated Product Directory",
    ],
    [
      "/articles",
      "LoloBuy Guides 2026 | Spreadsheet, QC, Shipping & Tracking",
      "LoloBuy Spreadsheet, QC, Shipping & Tracking Guides",
    ],
    [
      "/faq",
      "LoloBuy FAQ 2026 | QC, Storage, Shipping & Fees",
      "LoloBuy FAQ: Spreadsheet, QC, Storage & Shipping",
    ],
  ];

  for (const [path, title, h1] of pages) {
    const response = await fetchPage(worker, path);
    const html = await response.text();

    assert.equal(response.status, 200, path);
    assert.equal(
      decodeHtml(html.match(/<title>([^<]+)<\/title>/i)?.[1] ?? ""),
      title,
    );
    assert.equal(
      decodeHtml(html.match(/<h1>([^<]+)<\/h1>/i)?.[1] ?? ""),
      h1,
    );
  }
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

  const mismatchArticle = await fetchPage(
    worker,
    "/de/articles/lolobuy-qc-mismatch-evidence-guide",
  );
  const mismatchHtml = await mismatchArticle.text();
  assert.equal(mismatchArticle.status, 200);
  assert.match(mismatchHtml, /Wenn Lolobuy-QC nicht passt/i);
  assert.match(mismatchHtml, /DIE ABWEICHUNGSAKTE/i);
});

test("category cards open the matching live directories and use a jersey card", async () => {
  const worker = await loadWorker();
  const response = await fetchPage(worker, "/categories");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /href="https:\/\/www\.cnbuycha\.com\/shoes\/"/);
  assert.match(html, /href="https:\/\/www\.cnbuycha\.com\/hoodies-sweaters\/"/);
  assert.match(html, /href="https:\/\/www\.cnbuycha\.com\/accessories\/"/);
  assert.match(html, /href="https:\/\/www\.cnbuycha\.com\/Jersey\/"/);
  assert.match(html, /src="\/products\/jersey\.webp"/);
  assert.match(html, /<h2>Jersey<\/h2>/);
  assert.match(html, /href="\/categories\/jersey"/);
  assert.match(html, /rel="sponsored noopener"/);
  assert.doesNotMatch(html, /<h2>All products<\/h2>/);
});

test("homepage fourth edit is Jersey and commercial links are qualified", async () => {
  const worker = await loadWorker();
  const response = await fetchPage(worker, "/");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /href="https:\/\/www\.cnbuycha\.com\/Jersey\/"[^>]*rel="sponsored noopener"/);
  assert.match(html, /src="\/products\/jersey\.webp"/);
  assert.match(html, />Jersey<\/span>/);
  assert.match(html, />Bags &amp; Accessories<\/span>/);
});

test("serves eight evidence-led product pages with local responsive images", async () => {
  const worker = await loadWorker();
  const products = [
    ["snow-ski-goggles", "7813573584", 5, "340–679", "50–101"],
    ["gucci-hat", "7813802324", 5, "75–85", "11–13"],
    ["off-white-hoodies", "7813733346", 5, "299.52–342.72", "44–51"],
    ["numeris-high-top-shoes", "7810791921", 2, "455", "67"],
    ["hoka-speedgoat-5", "7806024805", 5, "218", "32"],
    ["nike-elite-backpack", "7804348058", 4, "89", "13"],
    ["balenciaga-puffer", "7804322444", 4, "595", "88"],
    ["winter-hooded-jacket", "7798076213", 4, "272", "40"],
  ];

  for (const [slug, sourceItemId, galleryCount, sourceCny, approxUsd] of products) {
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
    const priceText = decodeHtml(
      html.match(
        /<p class="product-reference-price">([\s\S]*?)<\/p>/i,
      )?.[1] ?? "",
    )
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    assert.equal(
      priceText,
      `Approx. US$${approxUsd} · Source price ¥${sourceCny} · Checked 10 Aug 2026`,
      `${slug} must publish its checked CNY and approximate USD reference`,
    );
    assert.match(html, /ECB cross-rates dated 7 Aug 2026/);
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
    "lolobuy-qc-mismatch-evidence-guide",
    "lolobuy-tracking-not-updating-guide",
    "lolobuy-shoe-size-guide",
  ];

  for (const slug of slugs) {
    const extension = slug === "lolobuy-tracking-not-updating-guide"
      ? "png"
      : slug === "lolobuy-shoe-size-guide"
        ? "svg"
        : "webp";
    const response = await fetchPage(worker, `/articles/${slug}`);
    const html = await response.text();

    assert.equal(response.status, 200, slug);
    assert.match(html, new RegExp(`<img[^>]+src="/articles/${slug}\\.${extension}"`));
    assert.match(
      html,
      new RegExp(
        `<meta property="og:image" content="https://lolobuy-sheet\\.com/articles/${slug}\\.${extension}"`,
      ),
    );
    assert.match(
      html,
      new RegExp(
        `<meta name="twitter:image" content="https://lolobuy-sheet\\.com/articles/${slug}\\.${extension}"`,
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
    assert.match(html, /class="article-context-links"/);
    assert.match(html, /href="\/categories\//);
    assert.match(html, /href="\/products\//);
    assert.match(html, /href="\/(?:guides|articles)\//);
  }
});

test("publishes a measurable, Lolobuy-specific research footprint", async () => {
  const worker = await loadWorker();
  const response = await fetchPage(worker, "/about");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /CURRENT RESEARCH FOOTPRINT/);
  assert.match(html, /8<\/dt><dd>individual product evidence pages/);
  assert.match(html, /9<\/dt><dd>deep category guides/);
  assert.match(html, /11<\/dt><dd>fact-checked long-form articles/);
  assert.match(html, /href="\/articles\/lolobuy-weidian-link-guide"/);
  assert.match(html, /href="\/categories\/shoes"/);
});

test("publishes a bounded English QC-mismatch article and an evolving topic map", async () => {
  const worker = await loadWorker();
  const response = await fetchPage(
    worker,
    "/articles/lolobuy-qc-mismatch-evidence-guide",
  );
  const html = await response.text();
  const prose = html.match(
    /<div class="article-prose">([\s\S]*?)<\/div><\/div><\/article>/,
  )?.[1] ?? "";
  const visibleText = decodeHtml(
    prose.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
  );
  const words =
    visibleText.match(/[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g) ?? [];

  assert.equal(response.status, 200);
  assert.equal(words.length, 1635);
  assert.ok(words.length >= 1200, `article has only ${words.length} words`);
  assert.ok(words.length <= 1800, `article has ${words.length} words`);
  assert.match(
    html,
    /<link rel="canonical" href="https:\/\/lolobuy-sheet\.com\/articles\/lolobuy-qc-mismatch-evidence-guide"/,
  );
  assert.match(html, /"@type":"Article"/);
  assert.match(html, /"@type":"BreadcrumbList"/);
  assert.doesNotMatch(html, /href="https:\/\/www\.lolobuy\.com/i);

  const topicMap = await readFile(
    new URL("../app/article-topic-map.ts", import.meta.url),
    "utf8",
  );
  assert.match(topicMap, /primaryQuery: "what to do if lolobuy qc is wrong"/);
  assert.match(topicMap, /intent: "problem solving"/);
  assert.match(topicMap, /internalLinkRole:/);
  assert.equal(
    (topicMap.match(/url: "\/articles\//g) ?? []).length,
    11,
  );
});

test("publishes a distinct five-language tracking troubleshooting article", async () => {
  const worker = await loadWorker();
  const response = await fetchPage(
    worker,
    "/articles/lolobuy-tracking-not-updating-guide",
  );
  const html = await response.text();
  const prose = html.match(
    /<div class="article-prose">([\s\S]*?)<\/div><\/div><\/article>/,
  )?.[1] ?? "";
  const visibleText = decodeHtml(
    prose.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
  );
  const words =
    visibleText.match(/[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g) ?? [];

  assert.equal(response.status, 200);
  assert.equal(words.length, 1645);
  assert.ok(words.length >= 1200, `article has only ${words.length} words`);
  assert.ok(words.length <= 1800, `article has ${words.length} words`);
  assert.match(
    html,
    /<link rel="canonical" href="https:\/\/lolobuy-sheet\.com\/articles\/lolobuy-tracking-not-updating-guide"/,
  );
  assert.match(html, /"@type":"Article"/);
  assert.match(html, /"@type":"BreadcrumbList"/);
  assert.doesNotMatch(html, /href="https:\/\/www\.lolobuy\.com/i);

  for (const [locale, expected] of [
    ["es", /MÉTODO DEL ÚLTIMO ESCANEO/i],
    ["de", /DIE LETZTER-SCAN-METHODE/i],
    ["fr", /MÉTHODE DU DERNIER SCAN/i],
    ["it", /METODO DELL'ULTIMA SCANSIONE/i],
  ]) {
    const localized = await fetchPage(
      worker,
      `/${locale}/articles/lolobuy-tracking-not-updating-guide`,
    );
    const localizedHtml = await localized.text();
    assert.equal(localized.status, 200, locale);
    assert.match(localizedHtml, expected);
    assert.match(localizedHtml, /class="article-context-links"/);
  }

  const topicMap = await readFile(
    new URL("../app/article-topic-map.ts", import.meta.url),
    "utf8",
  );
  assert.match(topicMap, /primaryQuery: "lolobuy tracking not updating"/);
  assert.match(topicMap, /lolobuy tracking number not working/);
  assert.equal((topicMap.match(/url: "\/articles\//g) ?? []).length, 11);
});

test("publishes a distinct five-language shoe sizing decision guide", async () => {
  const worker = await loadWorker();
  const response = await fetchPage(worker, "/articles/lolobuy-shoe-size-guide");
  const html = await response.text();
  const prose = html.match(
    /<div class="article-prose">([\s\S]*?)<\/div><\/div><\/article>/,
  )?.[1] ?? "";
  const visibleText = decodeHtml(
    prose.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
  );
  const words =
    visibleText.match(/[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g) ?? [];

  assert.equal(response.status, 200);
  assert.ok(words.length >= 1200, `article has only ${words.length} words`);
  assert.ok(words.length <= 1800, `article has ${words.length} words`);
  assert.match(html, /<link rel="canonical" href="https:\/\/lolobuy-sheet\.com\/articles\/lolobuy-shoe-size-guide"/);
  assert.match(html, /"@type":"Article"/);
  assert.match(html, /"@type":"BreadcrumbList"/);
  assert.doesNotMatch(html, /href="https:\/\/www\.lolobuy\.com/i);
  assert.doesNotMatch(html, /"@type":"Product"/);

  for (const [locale, expected] of [
    ["es", /REGISTRO DE TRES MEDIDAS/i],
    ["de", /DREI-MESSWERTE-AKTE/i],
    ["fr", /DOSSIER DE TROIS MESURES/i],
    ["it", /REGISTRO DI TRE MISURE/i],
  ]) {
    const localized = await fetchPage(
      worker,
      `/${locale}/articles/lolobuy-shoe-size-guide`,
    );
    const localizedHtml = await localized.text();
    assert.equal(localized.status, 200, locale);
    assert.match(localizedHtml, expected);
    assert.match(localizedHtml, /class="article-context-links"/);
  }

  const topicMap = await readFile(
    new URL("../app/article-topic-map.ts", import.meta.url),
    "utf8",
  );
  assert.match(topicMap, /primaryQuery: "lolobuy shoe size guide"/);
  assert.match(topicMap, /lolobuy insole measurement/);
  assert.equal((topicMap.match(/url: "\/articles\//g) ?? []).length, 11);
});

test("publishes a distinct five-language keyword-search workflow", async () => {
  const worker = await loadWorker();
  const response = await fetchPage(worker, "/articles/lolobuy-keyword-search-product-finds");
  const html = await response.text();
  const prose = html.match(/<div class="article-prose">([\s\S]*?)<\/div><\/div><\/article>/)?.[1] ?? "";
  const visibleText = decodeHtml(prose.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
  const words = visibleText.match(/[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g) ?? [];

  assert.equal(response.status, 200);
  assert.equal(words.length, 1628);
  assert.match(html, /<link rel="canonical" href="https:\/\/lolobuy-sheet\.com\/articles\/lolobuy-keyword-search-product-finds"/);
  assert.match(html, /"@type":"Article"/);
  assert.match(html, /"@type":"BreadcrumbList"/);
  assert.match(html, /lolobuy-keyword-search-product-finds\.svg/);
  assert.doesNotMatch(html, /href="https:\/\/www\.lolobuy\.com/i);
  assert.doesNotMatch(html, /"@type":"Product"/);

  for (const locale of ["es", "de", "fr", "it"]) {
    const localized = await fetchPage(worker, `/${locale}/articles/lolobuy-keyword-search-product-finds`);
    assert.equal(localized.status, 200, locale);
    assert.match(await localized.text(), /class="article-context-links"/);
  }
});

test("publishes a distinct five-language Taobao option comparison guide", async () => {
  const worker = await loadWorker();
  const pathname = "/articles/lolobuy-taobao-finds-compare-options";
  const response = await fetchPage(worker, pathname);
  const html = await response.text();
  const prose = html.match(/<div class="article-prose">([\s\S]*?)<\/div><\/div><\/article>/)?.[1] ?? "";
  const visibleText = decodeHtml(prose.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
  const words = visibleText.match(/[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g) ?? [];

  assert.equal(response.status, 200);
  assert.ok(words.length >= 1200, `article has only ${words.length} words`);
  assert.ok(words.length <= 1800, `article has ${words.length} words`);
  assert.match(html, /rel="canonical" href="https:\/\/lolobuy-sheet\.com\/articles\/lolobuy-taobao-finds-compare-options"/);
  assert.match(html, /"@type":"Article"/);
  assert.match(html, /"@type":"BreadcrumbList"/);
  assert.match(html, /lolobuy-taobao-finds-compare-options\.svg/);
  assert.doesNotMatch(html, /href="https:\/\/www\.lolobuy\.com/i);
  assert.doesNotMatch(html, /"@type":"Product"/);

  for (const locale of ["es", "de", "fr", "it"]) {
    const localized = await fetchPage(worker, `/${locale}${pathname}`);
    assert.equal(localized.status, 200, locale);
    assert.match(await localized.text(), /class="article-context-links"/);
  }
});

test("publishes a distinct five-language 1688 quantity and variant guide", async () => {
  const worker = await loadWorker();
  const pathname = "/articles/lolobuy-1688-finds-moq-variants";
  const response = await fetchPage(worker, pathname);
  const html = await response.text();
  const prose = html.match(/<div class="article-prose">([\s\S]*?)<\/div><\/div><\/article>/)?.[1] ?? "";
  const visibleText = decodeHtml(prose.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
  const words = visibleText.match(/[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g) ?? [];

  assert.equal(response.status, 200);
  assert.ok(words.length >= 1200, `article has only ${words.length} words`);
  assert.ok(words.length <= 1800, `article has ${words.length} words`);
  assert.match(html, /rel="canonical" href="https:\/\/lolobuy-sheet\.com\/articles\/lolobuy-1688-finds-moq-variants"/);
  assert.match(html, /"@type":"Article"/);
  assert.match(html, /"@type":"BreadcrumbList"/);
  assert.match(html, /lolobuy-1688-finds-moq-variants\.svg/);
  assert.doesNotMatch(html, /href="https:\/\/www\.lolobuy\.com/i);
  assert.doesNotMatch(html, /"@type":"Product"/);

  for (const locale of ["es", "de", "fr", "it"]) {
    const localized = await fetchPage(worker, `/${locale}${pathname}`);
    assert.equal(localized.status, 200, locale);
    assert.match(await localized.text(), /class="article-context-links"/);
  }
});
