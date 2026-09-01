import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function loadWorker() {
  const workerUrl = pathToFileURL(new URL("../_worker.js", import.meta.url).pathname);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  return (await import(workerUrl.href)).default;
}

function createEnv() {
  return {
    ASSETS: {
      async fetch(request) {
        const url = new URL(request.url);
        const relativePath = url.pathname.replace(/^\//, "");
        try {
          const body = await readFile(new URL(relativePath, projectRoot));
          const contentType = relativePath.endsWith(".xml")
            ? "application/xml"
            : relativePath.endsWith(".txt")
              ? "text/plain"
              : "application/octet-stream";
          return new Response(body, { status: 200, headers: { "content-type": contentType } });
        } catch {
          return new Response("Not found", { status: 404 });
        }
      },
    },
  };
}

const context = { waitUntil() {}, passThroughOnException() {} };

test("serves production pages and crawler directives", async () => {
  const worker = await loadWorker();
  const env = createEnv();

  const home = await worker.fetch(new Request("https://cssbuychina.net/"), env, context);
  assert.equal(home.status, 200);
  const html = await home.text();
  assert.match(html, /CSSBuy Spreadsheet 2026/i);
  assert.match(html, /content=["']index, follow["']/i);
  assert.doesNotMatch(html, /codex-preview/i);
  assert.doesNotMatch(html, /\/workspace\//i);

  const visibleText = (html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? html)
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ");
  assert.doesNotMatch(visibleText, /cnbuycha/i);

  const externalHrefs = [
    ...html.matchAll(/href=["'](https?:\/\/[^"']+)["']/g),
  ].map((match) => new URL(match[1]).hostname);
  assert.deepEqual(
    [...new Set(externalHrefs.filter((hostname) => hostname !== "cssbuychina.net"))],
    ["cnbuycha.com", "fonts.googleapis.com"],
  );

  const assetPaths = [
    ...html.matchAll(/(?:src|href)=["'](\/assets\/[^"']+)["']/g),
  ].map((match) => match[1]);
  assert.ok(assetPaths.length > 0, "homepage should reference packaged assets");
  await Promise.all(
    [...new Set(assetPaths)].map((assetPath) =>
      access(new URL(assetPath.replace(/^\//, ""), projectRoot)),
    ),
  );

  const article = await worker.fetch(
    new Request("https://cssbuychina.net/articles/how-to-check-a-cssbuy-product-link"),
    env,
    context,
  );
  assert.equal(article.status, 200);

  const localizedPages = [
    ["/pt-br", "pt-BR"],
    ["/de", "de-DE"],
    ["/es", "es"],
  ];
  for (const [pathname, language] of localizedPages) {
    const localized = await worker.fetch(
      new Request(`https://cssbuychina.net${pathname}`),
      env,
      context,
    );
    assert.equal(localized.status, 200);
    assert.match(await localized.text(), new RegExp(`<html lang=["']${language}["']`, "i"));
  }

  const articleImage = await worker.fetch(
    new Request("https://cssbuychina.net/cssbuy-category-checks-article.webp"),
    env,
    context,
  );
  assert.equal(articleImage.status, 200);

  const missing = await worker.fetch(
    new Request("https://cssbuychina.net/this-page-does-not-exist"),
    env,
    context,
  );
  assert.equal(missing.status, 404);

  const robots = await worker.fetch(new Request("https://cssbuychina.net/robots.txt"), env, context);
  assert.equal(robots.status, 200);
  assert.match(await robots.text(), /Allow: \/[\s\S]*Sitemap: https:\/\/cssbuychina\.net\/sitemap\.xml/);
});

test("redirects www requests to the canonical hostname", async () => {
  const worker = await loadWorker();
  const response = await worker.fetch(
    new Request("https://www.cssbuychina.net/products?from=www"),
    createEnv(),
    context,
  );
  assert.equal(response.status, 301);
  assert.equal(response.headers.get("location"), "https://cssbuychina.net/products?from=www");
});
