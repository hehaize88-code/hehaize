import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

test("renders development preview metadata", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
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

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  assert.match(await response.text(), developmentPreviewMeta);
});

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("route-test", `${process.pid}-${Date.now()}-${Math.random()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker;
}

async function render(worker, pathname) {
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders every requested independent page", async () => {
  const worker = await loadWorker();
  const routes = [
    "/finds",
    "/categories",
    "/how-to-buy",
    "/guides",
    "/faq",
    "/articles",
    "/guides/how-to-use-kameymall-spreadsheet",
    "/guides/cny-price-vs-final-cost",
    "/guides/what-to-inspect-before-ordering",
    "/articles/kameymall-spreadsheet-guide-2026",
    "/articles/how-to-buy-from-kameymall-2026",
    "/articles/kameymall-shipping-cost-guide-2026",
    "/articles/how-to-read-kameymall-qc-photos",
    "/articles/kameymall-warehouse-storage-returns-guide",
    "/articles/kameymall-payment-methods-fees",
    "/articles/kameymall-order-status-guide",
    "/articles/kameymall-consolidation-vs-split-parcels",
    "/categories/shoes",
    "/products/new-balance-1906r",
    "/fr/categories/shoes",
    "/fr/products/new-balance-1906r",
  ];
  for (const route of routes) {
    const response = await render(worker, route);
    assert.equal(response.status, 200, route);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i, route);
  }
});

test("keeps complete translated page structure", async () => {
  const worker = await loadWorker();
  const frenchHome = await render(worker, "/fr");
  const frenchGuide = await render(worker, "/fr/guides/how-to-use-kameymall-spreadsheet");
  assert.equal(frenchHome.status, 200);
  const homeHtml = await frenchHome.text();
  assert.match(homeHtml, /Tableur KameyMall 2026/);
  assert.match(homeHtml, /Articles SEO/);
  assert.match(homeHtml, /Articles KameyMall (?:vérifiés|fondés sur la recherche)/i);
  assert.equal(frenchGuide.status, 200);
  const guideHtml = await frenchGuide.text();
  assert.match(guideHtml, /Commencer par un besoin précis/);
  assert.match(guideHtml, /Comparer les informations visibles/);
});

test("keeps every localized content module as complete as English", async () => {
  const worker = await loadWorker();
  const localePrefixes = ["", "/de", "/fr", "/es", "/it", "/pl"];
  let englishArticleParagraphs = 0;
  let englishHomeImages = 0;
  let englishHomeSections = 0;

  for (const prefix of localePrefixes) {
    const homeHtml = await (await render(worker, prefix || "/")).text();
    const faqHtml = await (await render(worker, `${prefix}/faq`)).text();
    const howHtml = await (await render(worker, `${prefix}/how-to-buy`)).text();
    const guidesHtml = await (await render(worker, `${prefix}/guides`)).text();
    const articlesHtml = await (await render(worker, `${prefix}/articles`)).text();
    const categoriesHtml = await (await render(worker, `${prefix}/categories`)).text();
    const articleHtml = await (await render(worker, `${prefix}/articles/kameymall-spreadsheet-guide-2026`)).text();
    const faqBlock = faqHtml.match(/<div class="faq-list">([\s\S]*?)<\/div>/)?.[1] ?? "";
    const howBlock = howHtml.match(/<ol class="step-list">([\s\S]*?)<\/ol>/)?.[1] ?? "";

    assert.equal((faqBlock.match(/<details\b/g) ?? []).length, 11, `${prefix || "/"} FAQ`);
    assert.equal((howBlock.match(/<li\b/g) ?? []).length, 6, `${prefix || "/"} buying steps`);
    assert.equal((guidesHtml.match(/class="guide-card(?: |")/g) ?? []).length, 3, `${prefix || "/"} guides`);
    assert.equal((articlesHtml.match(/class="article-card"/g) ?? []).length, 8, `${prefix || "/"} article cards`);
    assert.equal((categoriesHtml.match(/class="category-card"/g) ?? []).length, 10, `${prefix || "/"} categories`);

    const homeImages = (homeHtml.match(/<img\b/g) ?? []).length;
    const homeSections = (homeHtml.match(/<section\b/g) ?? []).length;
    if (!prefix) {
      englishHomeImages = homeImages;
      englishHomeSections = homeSections;
    }
    assert.equal(homeImages, englishHomeImages, `${prefix || "/"} homepage images`);
    assert.equal(homeSections, englishHomeSections, `${prefix || "/"} homepage sections`);

    const articleParagraphs = (articleHtml.match(/<p\b/g) ?? []).length;
    if (!prefix) englishArticleParagraphs = articleParagraphs;
    assert.equal(articleParagraphs, englishArticleParagraphs, `${prefix || "/"} long-form article paragraphs`);
  }
});

test("uses the verified destination search and category URLs", async () => {
  const worker = await loadWorker();
  const localePrefixes = ["", "/de", "/fr", "/es", "/it", "/pl"];
  const categoryUrls = [
    "shoes",
    "hoodies-sweaters",
    "t-shirts",
    "jackets",
    "pants-shorts",
    "headwear",
    "accessories",
    "jersey",
    "electronics",
    "other-stuff",
  ].map((slug) => `https://www.cnbuycha.com/${slug}/`);

  for (const prefix of localePrefixes) {
    const response = await render(worker, prefix || "/");
    const html = await response.text();
    assert.match(html, /action="https:\/\/www\.cnbuycha\.com\/search\.html"/);
    assert.match(html, /name="keywords"/);
    assert.match(html, /name="channelid"[^>]*value="2"|value="2"[^>]*name="channelid"/);
    assert.equal(
      (html.match(/class="category-card" href="https:\/\/www\.cnbuycha\.com\//g) ?? []).length,
      10,
      `${prefix || "/"} homepage category cards`,
    );
    for (const url of categoryUrls) assert.ok(html.includes(`href="${url}"`), `${prefix || "/"} ${url}`);
  }

  const categoriesResponse = await render(worker, "/categories");
  const categoriesHtml = await categoriesResponse.text();
  assert.match(categoriesHtml, /class="category-card" href="\/categories\/sweatshirts"/);

  const categoryResponse = await render(worker, "/categories/sweatshirts");
  const categoryHtml = await categoryResponse.text();
  assert.match(categoryHtml, /https:\/\/www\.cnbuycha\.com\/hoodies-sweaters\//);
});

test("redirects every www path to the matching canonical hostname with HTTP 301", async () => {
  const worker = await loadWorker();
  const response = await worker.fetch(
    new Request("https://www.kameymall-sheet.com/fr/categories/shoes?source=gsc&item=1"),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );

  assert.equal(response.status, 301);
  assert.equal(
    response.headers.get("location"),
    "https://kameymall-sheet.com/fr/categories/shoes?source=gsc&item=1",
  );
});

test("renders eight homepage finds, thirty catalog finds, and internal detail links", async () => {
  const worker = await loadWorker();
  const home = await render(worker, "/");
  const finds = await render(worker, "/finds");
  const homeHtml = await home.text();
  const findsHtml = await finds.text();

  assert.equal((homeHtml.match(/class="product-row"/g) ?? []).length, 8);
  assert.equal((findsHtml.match(/class="product-row"/g) ?? []).length, 30);
  assert.match(homeHtml, /href="\/products\/new-balance-1906r"/);
  assert.match(homeHtml, /href="\/categories\/shoes"/);
  assert.doesNotMatch(homeHtml, /class="product-name" href="https:\/\//);
});

function imageTags(html) {
  return [...html.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);
}

function productImageTags(html) {
  return imageTags(html).filter((tag) => /\bsrc=["']\/product-images\//i.test(tag));
}

test("self-hosts all product images and uses explicit, CLS-safe loading attributes", async () => {
  const publicImageDirectory = new URL("../public/product-images/", import.meta.url);
  const files = (await readdir(publicImageDirectory)).filter((file) => /\.(?:jpe?g|png|webp)$/i.test(file));
  assert.equal(files.length, 30, "local product image count");
  for (const file of files) {
    assert.ok((await stat(new URL(file, publicImageDirectory))).size >= 1024, `${file} is a usable local image`);
  }

  const worker = await loadWorker();
  const homeHtml = await (await render(worker, "/")).text();
  const findsHtml = await (await render(worker, "/finds")).text();
  const productHtml = await (await render(worker, "/products/new-balance-1906r")).text();

  for (const [pathname, html] of [["/", homeHtml], ["/finds", findsHtml], ["/products/new-balance-1906r", productHtml]]) {
    assert.doesNotMatch(html, /<img\b[^>]*cnbuycha\.com\/uploads/i, `${pathname} remote product image`);
    for (const tag of imageTags(html)) {
      assert.match(tag, /\bwidth=["']\d+["']/i, `${pathname} image width: ${tag}`);
      assert.match(tag, /\bheight=["']\d+["']/i, `${pathname} image height: ${tag}`);
      assert.match(tag, /\bdecoding=["']async["']/i, `${pathname} async image decoding: ${tag}`);
    }
  }

  const homeProducts = productImageTags(homeHtml);
  assert.equal(homeProducts.length, 8);
  assert.match(homeProducts[0], /\bloading=["']eager["']/i);
  assert.match(homeProducts[0], /\bfetchpriority=["']high["']/i);
  for (const tag of homeProducts.slice(1)) assert.match(tag, /\bloading=["']lazy["']/i);

  const findsProducts = productImageTags(findsHtml);
  assert.equal(findsProducts.length, 30);
  assert.match(findsProducts[0], /\bloading=["']eager["']/i);
  for (const tag of findsProducts.slice(1)) assert.match(tag, /\bloading=["']lazy["']/i);

  const detailProducts = productImageTags(productHtml);
  assert.equal(detailProducts.length, 3);
  assert.match(detailProducts[0], /\bloading=["']eager["']/i);
  for (const tag of detailProducts.slice(1)) assert.match(tag, /\bloading=["']lazy["']/i);
  assert.match(productHtml, /"image":\["https:\/\/kameymall-sheet\.com\/product-images\/new-balance-1906r\.webp"\]/);
});

test("adds product, breadcrumb, and category ItemList structured data", async () => {
  const worker = await loadWorker();
  const productResponse = await render(worker, "/products/new-balance-1906r");
  const categoryResponse = await render(worker, "/categories/shoes");
  const productHtml = await productResponse.text();
  const categoryHtml = await categoryResponse.text();

  assert.match(productHtml, /"@type":"Product"/);
  assert.doesNotMatch(productHtml, /"@type":"Offer"/);
  assert.match(productHtml, /"@type":"BreadcrumbList"/);
  assert.match(productHtml, /KMS-7818078364/);
  assert.match(productHtml, /href="https:\/\/www\.cnbuycha\.com\/AllProducts\/3378\.html"/);
  assert.match(categoryHtml, /"@type":"CollectionPage"/);
  assert.match(categoryHtml, /"@type":"ItemList"/);
  assert.equal((categoryHtml.match(/class="catalog-product-card"/g) ?? []).length, 3);
});

function decodeHtmlText(value) {
  return value
    .replace(/<[^>]+>/g, "")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replace(/\s+/g, " ")
    .trim();
}

function jsonLd(html) {
  const source = html.match(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i)?.[1];
  assert.ok(source, "JSON-LD script");
  return JSON.parse(source);
}


test("renders intent-specific search metadata without changing page modules", async () => {
  const worker = await loadWorker();
  const expectations = [
    ["/", "KameyMall Spreadsheet 2026 – 30 Verified Finds &amp; QC", "Browse 30 checked KameyMall finds with live product links"],
    ["/finds", "KameyMall Finds 2026: 30 Checked Products &amp; Prices", "Search 30 checked KameyMall finds across 10 categories"],
    ["/articles", "KameyMall Guides 2026: Shipping, QC, Storage &amp; Fees", "Read eight source-checked KameyMall guides"],
    ["/products/new-balance-1906r", "New Balance 1906R KameyMall Find | Price &amp; Buying Notes", "product ID 7818078364"],
  ];

  for (const [pathname, title, descriptionFragment] of expectations) {
    const html = await (await render(worker, pathname)).text();
    assert.ok(html.includes(`<title>${title}</title>`), `${pathname} title`);
    assert.ok(html.includes(descriptionFragment), `${pathname} description`);
    assert.match(html, /property="og:site_name" content="KameyMall Sheet"/);
    assert.match(html, /name="twitter:card" content="summary(?:_large_image)?"/);
  }
});

test("uses each article's real publication date in Article structured data", async () => {
  const worker = await loadWorker();
  const cases = [
    ["/articles/kameymall-spreadsheet-guide-2026", "2026-08-03"],
    ["/articles/kameymall-warehouse-storage-returns-guide", "2026-08-08"],
    ["/articles/kameymall-payment-methods-fees", "2026-08-09"],
    ["/articles/kameymall-order-status-guide", "2026-08-11"],
    ["/articles/kameymall-consolidation-vs-split-parcels", "2026-08-13"],
  ];

  for (const [pathname, expectedDate] of cases) {
    const schema = jsonLd(await (await render(worker, pathname)).text());
    const article = Array.isArray(schema) ? schema.find((item) => item["@type"] === "Article") : schema;
    assert.equal(article.datePublished, expectedDate, pathname);
    assert.equal(article.dateModified, expectedDate, pathname);
    assert.equal(article.isAccessibleForFree, true, pathname);
  }
});

test("adds visible-content-matched FAQPage structured data in all six languages", async () => {
  const worker = await loadWorker();

  for (const prefix of ["", "/de", "/fr", "/es", "/it", "/pl"]) {
    const pathname = `${prefix}/faq`;
    const html = await (await render(worker, pathname)).text();
    const faqBlock = html.match(/<div class="faq-list">([\s\S]*?)<\/div>/)?.[1] ?? "";
    const visibleEntries = [...faqBlock.matchAll(/<details(?![^>]*\bopen\b)[^>]*>\s*<summary>(.*?)<span\b[\s\S]*?<\/summary>\s*<p>(.*?)<\/p>\s*<\/details>/gi)]
      .map((match) => ({ question: decodeHtmlText(match[1]), answer: decodeHtmlText(match[2]) }));
    const schema = jsonLd(html);

    assert.equal(schema["@type"], "FAQPage", `${pathname} schema type`);
    assert.equal(schema.url, `https://kameymall-sheet.com${pathname}`, `${pathname} schema URL`);
    assert.equal(schema.inLanguage, prefix ? prefix.slice(1) : "en", `${pathname} schema language`);
    assert.equal(visibleEntries.length, 11, `${pathname} visible collapsed FAQs`);
    assert.equal(schema.mainEntity.length, visibleEntries.length, `${pathname} schema FAQ count`);
    assert.deepEqual(
      schema.mainEntity.map((entry) => ({
        question: entry.name,
        answer: entry.acceptedAnswer?.text,
      })),
      visibleEntries,
      `${pathname} schema matches visible questions and answers`,
    );
    for (const entry of schema.mainEntity) {
      assert.equal(entry["@type"], "Question", `${pathname} Question type`);
      assert.equal(entry.acceptedAnswer?.["@type"], "Answer", `${pathname} acceptedAnswer type`);
    }
  }
});

test("keeps the complete homepage in compact no-swipe mobile grids", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const compactMobile = css.slice(
    css.indexOf("/*\n * Compact mobile overview"),
    css.indexOf("/* Product and category landing pages */"),
  );

  assert.match(compactMobile, /overflow-x:\s*hidden;[\s\S]*overflow-x:\s*clip;/);
  assert.match(compactMobile, /main\[data-route="home"\] \.find-browser \.table-body\s*\{[\s\S]*?grid-template-columns:\s*repeat\(2,/);
  assert.match(compactMobile, /main\[data-route="home"\] \.category-grid\s*\{[\s\S]*?grid-template-columns:\s*repeat\(2,/);
  assert.match(compactMobile, /main\[data-route="home"\] \.step-list\s*\{[\s\S]*?grid-template-columns:\s*repeat\(2,/);
  assert.match(compactMobile, /main\[data-route="home"\] \.guide-grid,[\s\S]*?\.article-card-grid\s*\{[\s\S]*?grid-template-columns:\s*repeat\(2,/);

  const worker = await loadWorker();
  const html = await (await render(worker, "/")).text();
  assert.equal((html.match(/class="product-row"/g) ?? []).length, 8);
  assert.equal((html.match(/class="category-card"/g) ?? []).length, 10);
  assert.equal((html.match(/<ol class="step-list">[\s\S]*?<\/ol>/)?.[0].match(/<li\b/g) ?? []).length, 6);
  assert.equal((html.match(/class="guide-card(?: |")/g) ?? []).length, 3);
  assert.equal((html.match(/class="article-card"/g) ?? []).length, 8);
  assert.equal((html.match(/<div class="faq-list">[\s\S]*?<\/div>/)?.[0].match(/<details\b/g) ?? []).length, 11);
  assert.doesNotMatch(html, /<details\b[^>]*\bopen\b/i, "homepage FAQs and language menu start collapsed");
});

const locales = ["", "/de", "/fr", "/es", "/it", "/pl"];
const categoryRoutes = [
  "shoes",
  "sweatshirts",
  "tshirts",
  "jackets",
  "pants",
  "headwear",
  "accessories",
  "jersey",
  "electronics",
  "other",
].map((slug) => `/categories/${slug}`);
const productRoutes = [
  "new-balance-1906r",
  "hoka-speedgoat-5",
  "adidas-futurecraft-4d",
  "canada-goose-sweatshirt",
  "nike-sweater",
  "off-white-hoodies",
  "polo-ralph-lauren-long-sleeve",
  "off-white-tee",
  "louis-vuitton-tee",
  "celine-coat",
  "louis-vuitton-jacket",
  "saint-vanity-windbreaker",
  "hello-kitty-plush-pants",
  "balenciaga-shorts",
  "louis-vuitton-shorts",
  "gucci-hat",
  "designer-tie-collection",
  "syna-world-mask",
  "louis-vuitton-wallet",
  "coach-backpack",
  "nike-elite-backpack",
  "premier-league-jersey",
  "germany-world-cup-jersey",
  "premier-league-player-version",
  "samsung-galaxy-watch8",
  "audemars-piguet-royal-oak-watch",
  "audemars-cartier-watch",
  "jellycat",
  "gucci-perfume",
  "keychain",
].map((slug) => `/products/${slug}`);
const auditedRoutes = [
  "",
  "/finds",
  "/categories",
  "/how-to-buy",
  "/guides",
  "/faq",
  "/articles",
  "/guides/how-to-use-kameymall-spreadsheet",
  "/guides/cny-price-vs-final-cost",
  "/guides/what-to-inspect-before-ordering",
  "/articles/kameymall-spreadsheet-guide-2026",
  "/articles/how-to-buy-from-kameymall-2026",
  "/articles/kameymall-shipping-cost-guide-2026",
  "/articles/how-to-read-kameymall-qc-photos",
  "/articles/kameymall-warehouse-storage-returns-guide",
  "/articles/kameymall-payment-methods-fees",
  "/articles/kameymall-order-status-guide",
  "/articles/kameymall-consolidation-vs-split-parcels",
  ...categoryRoutes,
  ...productRoutes,
];

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

test("uses the correct root HTML language on all 348 canonical pages", async () => {
  const worker = await loadWorker();
  const englishImageCounts = new Map();
  const englishSectionCounts = new Map();
  const localeLanguages = [
    ["", "en"],
    ["/de", "de"],
    ["/fr", "fr"],
    ["/es", "es"],
    ["/it", "it"],
    ["/pl", "pl"],
  ];

  for (const [prefix, expectedLanguage] of localeLanguages) {
    for (const route of auditedRoutes) {
      const pathname = `${prefix}${route}` || "/";
      const response = await render(worker, pathname);

      assert.equal(response.status, 200, pathname);
      assert.equal(
        response.headers.get("content-language"),
        expectedLanguage,
        `${pathname} Content-Language`,
      );
      const html = await response.text();
      assert.match(
        html,
        new RegExp(`<html\\b[^>]*\\blang=["']${expectedLanguage}["'][^>]*>`, "i"),
        `${pathname} root html lang`,
      );

      const canonicalUrl = `https://kameymall-sheet.com${pathname === "/" ? "" : pathname}`;
      assert.match(
        html,
        new RegExp(`<link(?=[^>]*\\brel=["']canonical["'])(?=[^>]*\\bhref=["']${escapeRegExp(canonicalUrl)}["'])[^>]*>`, "i"),
        `${pathname} self canonical`,
      );
      assert.match(html, /<title>[^<]+<\/title>/i, `${pathname} localized title`);
      assert.match(
        html,
        /<meta(?=[^>]*\bname=["']description["'])(?=[^>]*\bcontent=["'][^"']+["'])[^>]*>/i,
        `${pathname} localized description`,
      );
      assert.match(html, /<h1\b[^>]*>[^<]+<\/h1>/i, `${pathname} H1`);

      const imageCount = (html.match(/<img\b/g) ?? []).length;
      const sectionCount = (html.match(/<section\b/g) ?? []).length;
      if (expectedLanguage === "en") {
        englishImageCounts.set(route, imageCount);
        englishSectionCounts.set(route, sectionCount);
      } else {
        assert.equal(imageCount, englishImageCounts.get(route), `${pathname} image parity`);
        assert.equal(sectionCount, englishSectionCounts.get(route), `${pathname} section parity`);
      }
      assert.doesNotMatch(html, /<img\b[^>]*cnbuycha\.com\/uploads/i, `${pathname} remote product image`);
      for (const tag of imageTags(html)) {
        assert.match(tag, /\bwidth=["']\d+["']/i, `${pathname} image width`);
        assert.match(tag, /\bheight=["']\d+["']/i, `${pathname} image height`);
        assert.match(tag, /\bdecoding=["']async["']/i, `${pathname} image decoding`);
      }

      for (const [alternatePrefix, alternateLanguage] of localeLanguages) {
        const alternatePath = `${alternatePrefix}${route}` || "/";
        const alternateUrl = `https://kameymall-sheet.com${alternatePath === "/" ? "" : alternatePath}`;
        assert.match(
          html,
          new RegExp(`<link(?=[^>]*\\brel=["']alternate["'])(?=[^>]*\\bhreflang=["']${alternateLanguage}["'])(?=[^>]*\\bhref=["']${escapeRegExp(alternateUrl)}["'])[^>]*>`, "i"),
          `${pathname} ${alternateLanguage} hreflang`,
        );
        assert.match(
          html,
          new RegExp(`<a(?=[^>]*\\bhref=["']${escapeRegExp(alternatePath)}["'])(?=[^>]*\\bhreflang=["']${alternateLanguage}["'])[^>]*>`, "i"),
          `${pathname} ${alternateLanguage} same-route language switch`,
        );
      }
      const englishPath = route || "/";
      const englishUrl = `https://kameymall-sheet.com${englishPath === "/" ? "" : englishPath}`;
      assert.match(
        html,
        new RegExp(`<link(?=[^>]*\\brel=["']alternate["'])(?=[^>]*\\bhreflang=["']x-default["'])(?=[^>]*\\bhref=["']${escapeRegExp(englishUrl)}["'])[^>]*>`, "i"),
        `${pathname} x-default hreflang`,
      );

      if (expectedLanguage !== "en") {
        const title = html.match(/<title>([^<]+)<\/title>/i)?.[1] ?? "";
        const h1 = html.match(/<h1\b[^>]*>([^<]+)<\/h1>/i)?.[1] ?? "";
        assert.doesNotMatch(
          `${title} ${h1}`,
          /Price &amp; Buying Notes|Curated Product List|KameyMall Finds|Shopping Guide/i,
          `${pathname} leaked English title or H1 template`,
        );
      }
    }
  }
});

function visibleText(html) {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(?:#\d+|#x[\da-f]+|[a-z][\da-z]+);/gi, " ");
}

function longVisibleSegments(html) {
  return [...html.matchAll(/<(?:p|h1|h2|h3|li|summary)\b[^>]*>([\s\S]*?)<\/(?:p|h1|h2|h3|li|summary)>/gi)]
    .map((match) => visibleText(match[1]).replace(/\s+/g, " ").trim())
    .filter((segment) => segment.length >= 90);
}

test("does not leave English fallback paragraphs in translated pages", async () => {
  const worker = await loadWorker();

  for (const route of auditedRoutes) {
    const englishPath = route || "/";
    const englishHtml = await (await render(worker, englishPath)).text();
    const englishSegments = new Set(longVisibleSegments(englishHtml));

    for (const prefix of locales.slice(1)) {
      const pathname = `${prefix}${route}`;
      const translatedHtml = await (await render(worker, pathname)).text();
      const leakedSegments = longVisibleSegments(translatedHtml).filter((segment) => englishSegments.has(segment));
      assert.deepEqual(leakedSegments, [], `${pathname} English fallback paragraphs`);
    }
  }
});

test("publishes a complete source-checked QC guide in all six languages", async () => {
  const worker = await loadWorker();
  const route = "/articles/how-to-read-kameymall-qc-photos";
  let englishParagraphCount = 0;

  for (const prefix of locales) {
    const pathname = `${prefix}${route}`;
    const response = await render(worker, pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    const prose = html.match(/<div class="prose-body">([\s\S]*?)<\/article>/)?.[1] ?? "";
    const paragraphCount = (prose.match(/<p\b/g) ?? []).length;
    const bulletCount = (prose.match(/<li\b/g) ?? []).length;

    if (!prefix) englishParagraphCount = paragraphCount;
    assert.equal(paragraphCount, englishParagraphCount, `${pathname} paragraph parity`);
    assert.equal(bulletCount, 6, `${pathname} checklist parity`);
    assert.match(html, /"@type":"Article"/, `${pathname} Article structured data`);
    assert.match(html, /"@type":"BreadcrumbList"/, `${pathname} breadcrumb structured data`);
  }

  const englishHtml = await (await render(worker, route)).text();
  const englishProse = englishHtml.match(/<div class="prose-body">([\s\S]*?)<\/article>/)?.[1] ?? "";
  const englishWords = visibleText(englishProse).match(/[A-Za-z]+(?:[’'-][A-Za-z]+)*/g) ?? [];
  assert.ok(englishWords.length >= 1200 && englishWords.length <= 1800, `English QC guide has ${englishWords.length} visible words`);
});

test("publishes a complete source-checked warehouse storage and returns guide in all six languages", async () => {
  const worker = await loadWorker();
  const route = "/articles/kameymall-warehouse-storage-returns-guide";
  let englishParagraphCount = 0;

  for (const prefix of locales) {
    const pathname = `${prefix}${route}`;
    const response = await render(worker, pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    const prose = html.match(/<div class="prose-body">([\s\S]*?)<\/article>/)?.[1] ?? "";
    const paragraphCount = (prose.match(/<p\b/g) ?? []).length;
    const bulletCount = (prose.match(/<li\b/g) ?? []).length;

    if (!prefix) englishParagraphCount = paragraphCount;
    assert.equal(paragraphCount, englishParagraphCount, `${pathname} paragraph parity`);
    assert.equal(bulletCount, 6, `${pathname} checklist parity`);
    assert.match(html, /"@type":"Article"/, `${pathname} Article structured data`);
    assert.match(html, /"@type":"BreadcrumbList"/, `${pathname} breadcrumb structured data`);
  }

  const englishHtml = await (await render(worker, route)).text();
  const englishProse = englishHtml.match(/<div class="prose-body">([\s\S]*?)<\/article>/)?.[1] ?? "";
  const englishWords = visibleText(englishProse).match(/[A-Za-z]+(?:[’'-][A-Za-z]+)*/g) ?? [];
  assert.ok(englishWords.length >= 1200 && englishWords.length <= 1800, `English storage guide has ${englishWords.length} visible words`);
});

test("publishes a complete source-checked payment methods and fees guide in all six languages", async () => {
  const worker = await loadWorker();
  const route = "/articles/kameymall-payment-methods-fees";
  let englishParagraphCount = 0;

  for (const prefix of locales) {
    const pathname = `${prefix}${route}`;
    const response = await render(worker, pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    const prose = html.match(/<div class="prose-body">([\s\S]*?)<\/article>/)?.[1] ?? "";
    const paragraphCount = (prose.match(/<p\b/g) ?? []).length;
    const bulletCount = (prose.match(/<li\b/g) ?? []).length;

    if (!prefix) englishParagraphCount = paragraphCount;
    assert.equal(paragraphCount, englishParagraphCount, `${pathname} paragraph parity`);
    assert.equal(bulletCount, 6, `${pathname} checklist parity`);
    assert.match(html, /"@type":"Article"/, `${pathname} Article structured data`);
    assert.match(html, /"@type":"BreadcrumbList"/, `${pathname} breadcrumb structured data`);
  }

  const englishHtml = await (await render(worker, route)).text();
  const englishProse = englishHtml.match(/<div class="prose-body">([\s\S]*?)<\/article>/)?.[1] ?? "";
  const englishWords = visibleText(englishProse).match(/[A-Za-z]+(?:[’'-][A-Za-z]+)*/g) ?? [];
  assert.ok(englishWords.length >= 1200 && englishWords.length <= 1800, `English payment guide has ${englishWords.length} visible words`);
});

test("publishes a complete source-checked order status guide in all six languages", async () => {
  const worker = await loadWorker();
  const route = "/articles/kameymall-order-status-guide";
  let englishParagraphCount = 0;

  for (const prefix of locales) {
    const pathname = `${prefix}${route}`;
    const response = await render(worker, pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    const prose = html.match(/<div class="prose-body">([\s\S]*?)<\/article>/)?.[1] ?? "";
    const paragraphCount = (prose.match(/<p\b/g) ?? []).length;
    const bulletCount = (prose.match(/<li\b/g) ?? []).length;

    if (!prefix) englishParagraphCount = paragraphCount;
    assert.equal(paragraphCount, englishParagraphCount, `${pathname} paragraph parity`);
    assert.equal(bulletCount, 6, `${pathname} checklist parity`);
    assert.match(html, /"@type":"Article"/, `${pathname} Article structured data`);
    assert.match(html, /"@type":"BreadcrumbList"/, `${pathname} breadcrumb structured data`);
  }

  const englishHtml = await (await render(worker, route)).text();
  const englishProse = englishHtml.match(/<div class="prose-body">([\s\S]*?)<\/article>/)?.[1] ?? "";
  const englishWords = visibleText(englishProse).match(/[A-Za-z]+(?:[’'-][A-Za-z]+)*/g) ?? [];
  assert.ok(englishWords.length >= 1200 && englishWords.length <= 1800, `English order status guide has ${englishWords.length} visible words`);
});

test("publishes a complete consolidation decision guide in all six languages", async () => {
  const worker = await loadWorker();
  const route = "/articles/kameymall-consolidation-vs-split-parcels";
  let englishParagraphCount = 0;

  for (const prefix of locales) {
    const pathname = `${prefix}${route}`;
    const response = await render(worker, pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    const prose = html.match(/<div class="prose-body">([\s\S]*?)<\/article>/)?.[1] ?? "";
    const paragraphCount = (prose.match(/<p\b/g) ?? []).length;
    const bulletCount = (prose.match(/<li\b/g) ?? []).length;
    if (!prefix) englishParagraphCount = paragraphCount;
    assert.equal(paragraphCount, englishParagraphCount, `${pathname} paragraph parity`);
    assert.equal(bulletCount, 6, `${pathname} checklist parity`);
    assert.match(html, /"@type":"Article"/, `${pathname} Article structured data`);
    assert.match(html, /"@type":"BreadcrumbList"/, `${pathname} breadcrumb structured data`);
    assert.doesNotMatch(html, /href="https:\/\/(?:www\.)?kameymall\.com/i, `${pathname} no platform outbound link`);
  }

  const englishHtml = await (await render(worker, route)).text();
  const englishProse = englishHtml.match(/<div class="prose-body">([\s\S]*?)<\/article>/)?.[1] ?? "";
  const englishWords = visibleText(englishProse).match(/[A-Za-z]+(?:[’'-][A-Za-z]+)*/g) ?? [];
  assert.ok(englishWords.length >= 1200 && englishWords.length <= 1800, `English consolidation guide has ${englishWords.length} visible words`);
});

test("uses the focused homepage metadata and deepens the three priority category pages", async () => {
  const worker = await loadWorker();
  const homeHtml = await (await render(worker, "/")).text();
  assert.match(homeHtml, /<title>KameyMall Spreadsheet 2026 – 30 Verified Finds &amp; QC<\/title>/);
  assert.match(homeHtml, /<h1>KameyMall Spreadsheet 2026: 30 Curated Product Finds<\/h1>/);
  assert.match(homeHtml, /Browse 30 curated KameyMall spreadsheet finds across shoes, hoodies, jerseys and accessories/);

  const expectations = [
    ["/categories/shoes", "KameyMall Shoes Spreadsheet: 3 Curated Finds", "How to compare these KameyMall shoe finds"],
    ["/categories/sweatshirts", "KameyMall Hoodie and Sweatshirt Finds", "Compare the garment, not only the product name"],
    ["/categories/jersey", "KameyMall Jersey Spreadsheet: 3 Curated Finds", "How to verify a multi-style jersey listing"],
  ];
  for (const [route, h1, h2] of expectations) {
    const html = await (await render(worker, route)).text();
    assert.ok(html.includes(`<h1>${h1}</h1>`), `${route} focused H1`);
    assert.ok(html.includes(`<h2 id="category-editorial-`), `${route} editorial block`);
    assert.ok(html.includes(h2), `${route} editorial heading`);
    assert.equal((html.match(/class="category-editorial"/g) ?? []).length, 1, `${route} single editorial block`);
  }
});

function externalActions(html) {
  return [...html.matchAll(/<(?:a|form)\b[^>]*\b(?:href|action)=["']([^"']+)["'][^>]*>/gi)]
    .map((match) => match[1].replaceAll("&amp;", "&"))
    .filter((value) => /^https?:\/\//i.test(value));
}

test("keeps the main-site brand out of visible copy and blocks third-party traffic links", async () => {
  const worker = await loadWorker();
  const allowedOrigins = new Set([
    "https://www.cnbuycha.com",
    "https://kameymall-sheet.com",
  ]);
  const forbiddenVisibleBrands = /\b(?:cnbuycha|cn\s*buy\s*cha|cnbuy|cnfans|sugargoo|oopbuy|kakobuy|joyagoo|pikobuy|lolobuy|uufinds|hubbuy|findqc|allchinabuy|acbuy|superbuy|litbuy|pandabuy|hoobuy|mulebuy)\b/i;

  for (const locale of locales) {
    for (const route of auditedRoutes) {
      const pathname = `${locale}${route}` || "/";
      const response = await render(worker, pathname);
      assert.equal(response.status, 200, pathname);
      const html = await response.text();

      assert.doesNotMatch(visibleText(html), forbiddenVisibleBrands, pathname);
      for (const destination of externalActions(html)) {
        assert.ok(
          allowedOrigins.has(new URL(destination).origin),
          `${pathname} contains disallowed traffic link: ${destination}`,
        );
      }
    }
  }
});
