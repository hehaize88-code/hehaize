import assert from "node:assert/strict";
import test from "node:test";

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
  for (const prefix of ["", "/zh", "/de", "/pl", "/es", "/it", "/fr", "/pt", "/ro", "/sv"]) {
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
  assert.match(await response.text(), /page does not exist/i);
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
