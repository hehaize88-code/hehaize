import assert from "node:assert/strict";
import test from "node:test";

const localePrefixes = [
  "",
  "/zh",
  "/de",
  "/pl",
  "/es",
  "/it",
  "/fr",
  "/pt",
  "/ro",
  "/sv",
];
const articleRoutes = [
  "how-to-buy",
  "qc-guide",
  "shipping-guide",
  "returns",
  "how-to-buy-from-taobao-with-joyagoo",
  "joyagoo-fees-explained",
  "joyagoo-parcel-consolidation-packaging-guide",
  "joyagoo-qc-photo-checklist",
  "joyagoo-return-window-warehouse-storage",
  "joyagoo-volumetric-weight-shipping-cost",
];

let worker;

async function getWorker() {
  if (worker) return worker;
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("seo-test", `${process.pid}-${Date.now()}`);
  ({ default: worker } = await import(workerUrl.href));
  return worker;
}

async function request(path, hostname = "localhost") {
  const activeWorker = await getWorker();
  return activeWorker.fetch(
    new Request(`https://${hostname}${path}`, {
      headers: { accept: "text/html" },
      redirect: "manual",
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

function count(html, expression) {
  return html.match(expression)?.length ?? 0;
}

function visibleText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(?:#\d+|#x[\da-f]+|[a-z][\da-z]+);/gi, " ");
}

test("new consolidation guide has complete SEO signals and 1,200–1,800 English words", async () => {
  const slug = "joyagoo-parcel-consolidation-packaging-guide";
  for (const prefix of localePrefixes) {
    const path = `${prefix}/${slug}/`;
    const response = await request(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, /"@type":"Article"/, `${path}: Article schema`);
    assert.match(html, /"@type":"BreadcrumbList"/, `${path}: breadcrumb schema`);
    assert.match(html, /<meta property="og:type" content="article"/i, `${path}: Open Graph`);
    assert.equal(count(html, /\bhreflang=/gi), 11, `${path}: hreflang`);
  }

  const englishHtml = await (await request(`/${slug}/`)).text();
  const body = englishHtml.match(/<div class="article-body">([\s\S]*?)<\/div>\s*<\/div>\s*<\/article>/)?.[1] ?? "";
  const words = visibleText(body).match(/[A-Za-z]+(?:[’'-][A-Za-z]+)*/g) ?? [];
  assert.ok(words.length >= 1200 && words.length <= 1800, `English consolidation guide has ${words.length} visible words`);
});

test("all 100 article pages expose images, breadcrumbs and direct official sources", async () => {
  for (const slug of articleRoutes) {
    for (const prefix of localePrefixes) {
      const path = `${prefix}/${slug}/`;
      const response = await request(path);
      assert.equal(response.status, 200, path);
      const html = await response.text();
      assert.match(html, /"@type":"Article"/, `${path}: Article schema`);
      assert.match(
        html,
        /"image":\{"@type":"ImageObject","url":"https:\/\/joyagoochina\.org\/products\//,
        `${path}: Article image schema`,
      );
      assert.match(
        html,
        /"@type":"BreadcrumbList"/,
        `${path}: BreadcrumbList`,
      );
      assert.match(
        html,
        /<meta property="og:image" content="https:\/\/joyagoochina\.org\/products\//i,
        `${path}: og:image`,
      );
      assert.match(
        html,
        /<meta name="twitter:card" content="summary_large_image"/i,
        `${path}: large Twitter card`,
      );
      assert.match(
        html,
        /<figure class="article-cover"><img[^>]+width="\d+"[^>]+height="\d+"/i,
        `${path}: sized cover image`,
      );
      assert.match(
        html,
        /href="https:\/\/mgt\.joyagoo\.com\/help-center\//i,
        `${path}: official source link`,
      );
    }
  }
});

test("homepage keeps its English title and H1 while fixing catalogue mappings", async () => {
  const html = await (await request("/" )).text();
  assert.match(
    html,
    /<title>Joyagoo Spreadsheet 2026 \| Products, QC &amp; Shipping Guides<\/title>/,
  );
  assert.match(
    html,
    /<h1>Joyagoo Spreadsheet 2026: Find Better Products with Real Buying Guidance<\/h1>/,
  );
  assert.match(html, /Updated August 9, 2026/);
  assert.match(html, /"@type":"Organization"/);
  assert.match(html, /"logo":\{"@type":"ImageObject"/);

  const expectedCards = [
    ["numeris-rick-owens-high-tops-3367", "3367.webp", "NUMERIS / Rick Owens High-Top Shoes"],
    ["off-white-hoodies-3369", "3369.webp", "Off-White Hoodies — 39 Styles"],
    ["designer-hats-3373", "3373.jpg", "Designer Hats — Multiple Brands"],
    ["samsung-galaxy-watch8-3357", "3357.webp", "Samsung Galaxy Watch8"],
  ];
  for (const [slug, image, label] of expectedCards) {
    assert.match(
      html,
      new RegExp(
        `href="/product/${slug}/"[\\s\\S]{0,700}src="/products/${image}"[\\s\\S]{0,500}<span>${label}</span>`,
      ),
      slug,
    );
  }
  assert.doesNotMatch(html, /\b\d+ finds\b/i);
  assert.doesNotMatch(visibleText(html), /SEO Articles/i);
});

test("spreadsheet images are sized, lazy-loaded and no longer use the large GIF", async () => {
  const html = await (await request("/spreadsheet/")).text();
  const productImages = [
    ...html.matchAll(/<div class="product-image">\s*(<img[^>]+>)/gi),
  ].map((match) => match[1]);
  assert.equal(productImages.length, 36);
  for (const image of productImages) {
    assert.match(image, /\bwidth="\d+"/i);
    assert.match(image, /\bheight="\d+"/i);
    assert.match(image, /\bloading="lazy"/i);
  }
  assert.match(html, /\/products\/3370\.webp/);
  assert.doesNotMatch(html, /\/products\/3370\.gif/);
  assert.ok(
    count(html, /<link[^>]+rel="preload"[^>]+as="image"/gi) <= 1,
    "spreadsheet should not mass-preload product images",
  );
});

test("product pages use neutral listing copy and include outbound dimensions", async () => {
  for (const prefix of localePrefixes) {
    const path = `${prefix}/product/hoka-speedgoat-5-3359/`;
    const html = await (await request(path)).text();
    assert.doesNotMatch(html, /CNBuy Sheet listing/i, path);
    assert.match(
      html,
      /data-outbound-kind="product"[^>]+data-product-id="3359"/i,
      path,
    );
    assert.match(
      html,
      /<div class="product-detail-image">\s*<img[^>]+width="750"[^>]+height="750"/i,
      path,
    );
  }
});

test("footer trust pages and added store categories are directly linked", async () => {
  for (const prefix of localePrefixes) {
    const html = await (await request(`${prefix}/`)).text();
    for (const slug of ["about", "editorial-policy", "privacy", "terms"]) {
      assert.match(html, new RegExp(`href="${prefix}/${slug}/"`), `${prefix || "/"}: ${slug}`);
    }
  }

  const categoriesHtml = await (await request("/categories/")).text();
  assert.match(categoriesHtml, /href="https:\/\/www\.cnbuycha\.com\/Jersey\/"/);
  assert.match(categoriesHtml, /href="https:\/\/www\.cnbuycha\.com\/other-stuff\/"/);
  assert.match(categoriesHtml, /data-outbound-kind="category"/);
});

test("outbound event endpoint accepts only same-origin store events", async () => {
  const activeWorker = await getWorker();
  const env = {
    ASSETS: {
      fetch: async () => new Response("Not found", { status: 404 }),
    },
  };
  const ctx = {
    waitUntil() {},
    passThroughOnException() {},
  };
  const valid = await activeWorker.fetch(
    new Request("https://localhost/api/outbound-click", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        origin: "https://localhost",
      },
      body: JSON.stringify({
        destination: "https://www.cnbuycha.com/AllProducts/3359.html",
        source_page: "/spreadsheet/",
        language: "en",
        link_kind: "product",
        product_id: "3359",
        category: "Footwear",
      }),
    }),
    env,
    ctx,
  );
  assert.equal(valid.status, 204);
  assert.equal(valid.headers.get("cache-control"), "no-store");

  const invalid = await activeWorker.fetch(
    new Request("https://localhost/api/outbound-click", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        origin: "https://example.com",
      },
      body: JSON.stringify({
        destination: "https://www.cnbuycha.com/AllProducts/3359.html",
      }),
    }),
    env,
    ctx,
  );
  assert.equal(invalid.status, 403);
});

test("production HTML receives edge caching headers and is stored by pathname", async () => {
  const activeWorker = await getWorker();
  const originalCaches = Object.getOwnPropertyDescriptor(globalThis, "caches");
  const stored = [];
  const pending = [];
  Object.defineProperty(globalThis, "caches", {
    configurable: true,
    value: {
      default: {
        match: async () => undefined,
        put: async (key, response) => {
          stored.push({ key: key.url, response });
        },
      },
    },
  });

  try {
    const response = await activeWorker.fetch(
      new Request("https://joyagoochina.org/qc-guide/?utm_source=test", {
        headers: { accept: "text/html" },
      }),
      {
        ASSETS: {
          fetch: async () => new Response("Not found", { status: 404 }),
        },
      },
      {
        waitUntil(promise) {
          pending.push(promise);
        },
        passThroughOnException() {},
      },
    );
    assert.equal(response.status, 200);
    assert.equal(
      response.headers.get("cache-control"),
      "public, max-age=0",
    );
    assert.equal(
      response.headers.get("cloudflare-cdn-cache-control"),
      "public, max-age=21600, stale-while-revalidate=86400",
    );
    await Promise.all(pending);
    assert.equal(stored.length, 1);
    assert.equal(stored[0].key, "https://joyagoochina.org/qc-guide/");
  } finally {
    if (originalCaches) {
      Object.defineProperty(globalThis, "caches", originalCaches);
    } else {
      delete globalThis.caches;
    }
  }
});

test("English and localized pages expose complete hreflang clusters", async () => {
  for (const path of ["/qc-guide/", "/de/qc-guide/"]) {
    const response = await request(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.equal(count(html, /\bhreflang=/gi), 11, path);
    assert.match(html, /hreflang="x-default"/i);
    assert.match(html, /href="https:\/\/joyagoochina\.org\/zh\/qc-guide\/"/);
  }
});

test("product detail pages are indexable in English and localized routes", async () => {
  for (const path of [
    "/product/hoka-speedgoat-5-3359/",
    "/zh/product/hoka-speedgoat-5-3359/",
  ]) {
    const response = await request(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, /HOKA Speedgoat 5 Trail Shoes/);
    assert.match(html, /hreflang="x-default"/i);
  }
});

test("invalid paths return a real 404 response", async () => {
  const response = await request("/not-a-real-page-92731/");
  assert.equal(response.status, 404);
  const html = await response.text();
  assert.match(html, /page does not exist/i);
  assert.doesNotMatch(html, /SEO articles/i);
});

test("www and the obsolete sitemap path redirect permanently", async () => {
  const wwwResponse = await request("/qc-guide/?source=test", "www.joyagoochina.org");
  assert.equal(wwwResponse.status, 301);
  assert.equal(
    wwwResponse.headers.get("location"),
    "https://joyagoochina.org/qc-guide/?source=test",
  );

  const sitemapResponse = await request("/sitemap-main.xml");
  assert.equal(sitemapResponse.status, 301);
  assert.equal(
    sitemapResponse.headers.get("location"),
    "https://joyagoochina.org/sitemap.xml",
  );
});
