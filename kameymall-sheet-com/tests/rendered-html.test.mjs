import assert from "node:assert/strict";
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
  assert.match(homeHtml, /Les trouvailles KameyMall/);
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

  for (const prefix of localePrefixes) {
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
    assert.equal((articlesHtml.match(/class="article-card"/g) ?? []).length, 3, `${prefix || "/"} article cards`);
    assert.equal((categoriesHtml.match(/class="category-card"/g) ?? []).length, 10, `${prefix || "/"} categories`);

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

test("adds product, breadcrumb, and category ItemList structured data", async () => {
  const worker = await loadWorker();
  const productResponse = await render(worker, "/products/new-balance-1906r");
  const categoryResponse = await render(worker, "/categories/shoes");
  const productHtml = await productResponse.text();
  const categoryHtml = await categoryResponse.text();

  assert.match(productHtml, /"@type":"Product"/);
  assert.match(productHtml, /"@type":"BreadcrumbList"/);
  assert.match(productHtml, /KMS-7818078364/);
  assert.match(productHtml, /href="https:\/\/www\.cnbuycha\.com\/AllProducts\/3378\.html"/);
  assert.match(categoryHtml, /"@type":"CollectionPage"/);
  assert.match(categoryHtml, /"@type":"ItemList"/);
  assert.equal((categoryHtml.match(/class="catalog-product-card"/g) ?? []).length, 3);
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
  ...categoryRoutes,
  ...productRoutes,
];

test("uses the correct root HTML language on all 318 canonical pages", async () => {
  const worker = await loadWorker();
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
      assert.match(
        await response.text(),
        new RegExp(`<html\\b[^>]*\\blang=["']${expectedLanguage}["'][^>]*>`, "i"),
        `${pathname} root html lang`,
      );
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
