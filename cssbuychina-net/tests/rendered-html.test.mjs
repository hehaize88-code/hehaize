import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

const env = {
  ASSETS: {
    fetch: async () => new Response("Not found", { status: 404 }),
  },
};

const executionContext = {
  waitUntil() {},
  passThroughOnException() {},
};

async function fetchHtml(path) {
  const response = await worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    env,
    executionContext,
  );
  assert.equal(response.status, 200, `${path} should render`);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  return response.text();
}

function tagWith(html, tag, attribute, value) {
  return html.match(new RegExp(`<${tag}(?=[^>]*\\b${attribute}=["']${value}["'])[^>]*>`, "i"))?.[0] ?? "";
}

test("renders production metadata without preview markers", async () => {
  const html = await fetchHtml("/");
  assert.doesNotMatch(html, developmentPreviewMeta);
});

test("renders the category article with aligned search and social metadata", async () => {
  const html = await fetchHtml("/articles/cssbuy-spreadsheet-categories-explained");
  const title = "How to Choose CSSBuy Spreadsheet Categories: Sizing, QC &amp; Shipping";
  const description = "Compare CSSBuy spreadsheet categories and learn the sizing, warehouse QC and parcel checks that matter for shoes, clothing, jerseys, bags and electronics.";
  const url = "https://cssbuychina.net/articles/cssbuy-spreadsheet-categories-explained";

  assert.ok(html.includes(`<title>${title}</title>`));
  assert.ok(html.includes("<h1>How to Choose a CSSBuy Spreadsheet Category</h1>"));
  assert.ok(tagWith(html, "meta", "name", "description").includes(`content="${description}"`));
  assert.ok(tagWith(html, "link", "rel", "canonical").includes(`href="${url}"`));
  assert.ok(tagWith(html, "meta", "property", "og:type").includes('content="article"'));
  assert.ok(tagWith(html, "meta", "property", "og:url").includes(`content="${url}"`));
  assert.ok(tagWith(html, "meta", "property", "og:title").includes(`content="${title}"`));
  assert.ok(tagWith(html, "meta", "property", "og:description").includes(`content="${description}"`));
  assert.ok(tagWith(html, "meta", "property", "og:image").includes('content="https://cssbuychina.net/cssbuy-category-checks-article.webp"'));
  assert.ok(tagWith(html, "meta", "name", "twitter:title").includes(`content="${title}"`));
  assert.ok(tagWith(html, "meta", "name", "twitter:description").includes(`content="${description}"`));
  assert.ok(html.includes('"author":{"@type":"Organization","name":"CSSBuy China Editorial","url":"https://cssbuychina.net/about"}'));
  assert.ok(html.includes('"publisher":{"@type":"Organization","name":"CSSBuy China Editorial"'));
  assert.ok(html.includes('"image":{"@type":"ImageObject","url":"https://cssbuychina.net/cssbuy-category-checks-article.webp","width":1536,"height":1024}'));
  assert.ok(html.includes("CSSBuy category decision table"));
  assert.ok(html.includes("CSSBuy Shoes Spreadsheet"));
  assert.ok(html.includes("Quick category decision checklist"));
  assert.ok(!html.includes("Build useful category pages, not doorway pages"));
});

test("renders localized home pages with consistent canonicals and metadata", async () => {
  const locales = [
    ["pt-br", "pt-BR", "Planilha CSSBuy 2026", "ARTIGO"],
    ["de", "de-DE", "CSSBuy Tabelle 2026", "ARTIKEL"],
    ["es", "es", "Hoja CSSBuy 2026", "ARTÍCULO"],
  ];

  for (const [path, lang, titleStart, articleLabel] of locales) {
    const html = await fetchHtml(`/${path}`);
    assert.ok(html.includes(`<title>${titleStart}`));
    assert.ok(tagWith(html, "link", "rel", "canonical").includes(`href="https://cssbuychina.net/${path}"`));
    assert.ok(html.includes(`>${articleLabel}</span>`));
    assert.ok(!html.includes("Research-led guidance on CSSBuy&#x27;s two payments"));
  }
});

test("renders all 30 product detail pages with main-store shopping links", async () => {
  const ids = [
    "3402", "3401", "3387", "3393", "3380", "3400", "3392", "3396", "3394", "3208",
    "3207", "3389", "3388", "3386", "3375", "3374", "3353", "3347", "3362", "3356",
    "3206", "3204", "3365", "3364", "3373", "3372", "3371", "3357", "3235", "3184",
  ];

  for (const id of ids) {
    const html = await fetchHtml(`/product/${id}`);
    assert.ok(html.includes(`https://www.cnbuycha.com/AllProducts/${id}.html`));
    assert.ok(html.includes("Recorded product value: ¥"));
    assert.ok(html.includes("PRODUCT ROUTE CHECKED"));
  }
});

test("publishes an indexable robots file and a 77-URL sitemap", async () => {
  const robots = await readFile(new URL("../public/robots.txt", import.meta.url), "utf8");
  const sitemap = await readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8");
  assert.match(robots, /User-agent: \*\s+Allow: \//);
  assert.match(robots, /Sitemap: https:\/\/cssbuychina\.net\/sitemap\.xml/);
  assert.equal((sitemap.match(/<url>/g) ?? []).length, 77);
  assert.equal((sitemap.match(/\/product\//g) ?? []).length, 30);
  assert.ok(sitemap.includes("<loc>https://cssbuychina.net/pt-br</loc>"));
  assert.ok(!sitemap.includes("<loc>https://cssbuychina.net/pt-br/</loc>"));
});
