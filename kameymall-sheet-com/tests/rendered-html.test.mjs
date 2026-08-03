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

test("uses the verified destination search and category URLs", async () => {
  const worker = await loadWorker();
  const response = await render(worker, "/");
  const html = await response.text();
  assert.match(html, /action="https:\/\/www\.cnbuycha\.com\/search\.html"/);
  assert.match(html, /name="keywords"/);
  assert.match(html, /name="channelid"[^>]*value="2"|value="2"[^>]*name="channelid"/);
  assert.match(html, /https:\/\/www\.cnbuycha\.com\/hoodies-sweaters\//);
  assert.doesNotMatch(html, /https:\/\/www\.cnbuycha\.com\/sweatshirts\//);
});

const locales = ["", "/de", "/fr", "/es", "/it", "/pl"];
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
];

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
