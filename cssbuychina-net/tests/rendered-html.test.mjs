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
  assert.ok(html.includes("<title>CSSBuy Spreadsheet 2026: 30 Checked Product Links</title>"));
  assert.ok(tagWith(html, "meta", "name", "description").includes("Browse 30 current CSSBuy spreadsheet finds"));
  assert.ok(html.includes('class="footer-top" data-nosnippet="true"'));
  assert.ok(!html.includes("SEO Articles"));
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

test("renders the Taobao comparison article with complete SEO metadata", async () => {
  const html = await fetchHtml("/articles/cssbuy-taobao-finds-compare-listings");
  const url = "https://cssbuychina.net/articles/cssbuy-taobao-finds-compare-listings";
  const title = "CSSBuy Taobao Finds: Compare Listings Before Ordering";

  assert.ok(html.includes(`<title>${title}</title>`));
  assert.ok(html.includes("<h1>How to Compare CSSBuy Taobao Finds Before You Order</h1>"));
  assert.ok(tagWith(html, "link", "rel", "canonical").includes(`href="${url}"`));
  assert.ok(tagWith(html, "meta", "property", "og:type").includes('content="article"'));
  assert.ok(tagWith(html, "meta", "property", "og:url").includes(`content="${url}"`));
  assert.ok(html.includes('"@type":"BreadcrumbList"'));
  assert.ok(html.includes('"datePublished":"2026-08-27"'));
  assert.ok(html.includes("Final Taobao listing decision checklist"));
});

test("renders the 1688 finds article with complete SEO metadata", async () => {
  const html = await fetchHtml("/articles/cssbuy-1688-finds-moq-variants-seller-questions");
  const url = "https://cssbuychina.net/articles/cssbuy-1688-finds-moq-variants-seller-questions";
  const title = "CSSBuy 1688 Finds: MOQ, Variants &amp; Seller Questions";

  assert.ok(html.includes(`<title>${title}</title>`));
  assert.ok(html.includes("<h1>How to Compare CSSBuy 1688 Finds Before Ordering</h1>"));
  assert.ok(tagWith(html, "link", "rel", "canonical").includes(`href="${url}"`));
  assert.ok(tagWith(html, "meta", "property", "og:type").includes('content="article"'));
  assert.ok(tagWith(html, "meta", "property", "og:url").includes(`content="${url}"`));
  assert.ok(html.includes('"@type":"BreadcrumbList"'));
  assert.ok(html.includes('"datePublished":"2026-08-29"'));
  assert.ok(html.includes("Final CSSBuy 1688 finds checklist"));
});

test("renders the Weidian finds article with complete SEO metadata", async () => {
  const html = await fetchHtml("/articles/cssbuy-weidian-finds-options-seller-signals");
  const url = "https://cssbuychina.net/articles/cssbuy-weidian-finds-options-seller-signals";
  assert.ok(html.includes("<title>CSSBuy Weidian Finds: Options &amp; Seller Signals</title>"));
  assert.ok(html.includes(`<link rel="canonical" href="${url}"`));
  assert.ok(html.includes(`<meta property="og:url" content="${url}"`));
  assert.ok(html.includes("<h1>How to Verify CSSBuy Weidian Finds Before Saving Them</h1>"));
  assert.ok(html.includes('"@type":"Article"'));
  assert.ok(html.includes('"@type":"BreadcrumbList"'));
  assert.ok(html.includes("Final CSSBuy Weidian finds checklist"));
});

test("renders the seller-page checklist with complete SEO metadata", async () => {
  const html = await fetchHtml("/articles/cssbuy-seller-page-checklist-before-saving-find");
  const url = "https://cssbuychina.net/articles/cssbuy-seller-page-checklist-before-saving-find";
  assert.ok(html.includes("<title>CSSBuy Seller-Page Checklist Before Saving a Find</title>"));
  assert.ok(html.includes(`<link rel="canonical" href="${url}"`));
  assert.ok(html.includes(`<meta property="og:url" content="${url}"`));
  assert.ok(html.includes("<h1>CSSBuy Seller-Page Checklist: Verify a Find Before Saving It</h1>"));
  assert.ok(html.includes('"@type":"Article"'));
  assert.ok(html.includes('"@type":"BreadcrumbList"'));
  assert.ok(html.includes('"datePublished":"2026-09-02"'));
  assert.ok(html.includes("Final CSSBuy seller-page checklist"));
});

test("renders localized home pages with consistent canonicals and metadata", async () => {
  const locales = [
    ["pt-br", "Planilha CSSBuy 2026", "ARTIGO"],
    ["de", "CSSBuy Tabelle 2026", "ARTIKEL"],
    ["es", "Hoja CSSBuy 2026", "ARTÍCULO"],
  ];

  for (const [path, titleStart, articleLabel] of locales) {
    const html = await fetchHtml(`/${path}`);
    assert.ok(html.includes(`<title>${titleStart}`));
    assert.ok(tagWith(html, "link", "rel", "canonical").includes(`href="https://cssbuychina.net/${path}"`));
    assert.ok(html.includes(`>${articleLabel}</span>`));
    assert.ok(!html.includes("Research-led guidance on CSSBuy&#x27;s two payments"));
  }
});

test("renders all 30 product detail pages with current main-store shopping links", async () => {
  const ids = [
    "3402", "3401", "3387", "3393", "3380", "3400", "3392", "3396", "3394", "3208",
    "3207", "3389", "3388", "3386", "3375", "3374", "3353", "3347", "3362", "3356",
    "3206", "3204", "3365", "3364", "3373", "3372", "3371", "3357", "3235", "3184",
  ];

  for (const id of ids) {
    const html = await fetchHtml(`/product/${id}`);
    assert.ok(html.includes('class="detail-cta" href="https://cnbuycha.com/'));
    assert.ok(html.includes('data-track-event="product_outbound_click"'));
    assert.ok(html.includes("Recorded product value: ¥"));
    assert.ok(html.includes("PRODUCT ROUTE CHECKED"));
    assert.ok(html.includes('"@type":"BreadcrumbList"'));
    assert.match(tagWith(html, "meta", "property", "og:image"), /content="https:\/\//);
  }
});

test("links product card images, titles, and buttons to matching main-store products", async () => {
  for (const path of ["/", "/products", "/de/products"]) {
    const html = await fetchHtml(path);
    assert.ok(
      html.includes('class="product-image" href="https://cnbuycha.com/shoes/1011.html" rel="nofollow" data-track-event="product_outbound_click"'),
      `${path} should link the product image directly to the main-store product`,
    );
    assert.ok(
      /<h3><a href="https:\/\/cnbuycha\.com\/shoes\/1011\.html"[^>]*data-track-event="product_outbound_click"[^>]*>Nike P6000&amp;Air Max 96<\/a><\/h3>/.test(html),
      `${path} should link the product title directly to the main-store product`,
    );
    assert.ok(
      html.includes('class="product-button" href="https://cnbuycha.com/shoes/1011.html" rel="nofollow" data-track-event="product_outbound_click"'),
      `${path} should keep the product button on the same destination`,
    );
  }
});

test("publishes CTR-focused catalog metadata and analytics hooks", async () => {
  const productsHtml = await fetchHtml("/products");
  const categoriesHtml = await fetchHtml("/categories");
  const articlesHtml = await fetchHtml("/articles");

  assert.ok(productsHtml.includes("<title>CSSBuy Finds 2026: Shoes, Hoodies, Jerseys &amp; More | CSSBuy China</title>"));
  assert.ok(tagWith(productsHtml, "meta", "name", "description").includes("Search 30 current CSSBuy finds"));
  assert.ok(productsHtml.includes("PRODUCT ROUTES REVIEWED SEPTEMBER 1, 2026"));
  assert.ok(productsHtml.includes('data-track-event="product_outbound_click"'));
  assert.ok(categoriesHtml.includes('data-track-event="category_outbound_click"'));
  assert.ok(articlesHtml.includes("<title>CSSBuy Buying Guides 2026: Product Links, QC &amp; Shipping</title>"));
  assert.ok(!articlesHtml.includes("SEO knowledge library"));
});

test("publishes an indexable robots file and an 82-URL sitemap", async () => {
  const robots = await readFile(new URL("../public/robots.txt", import.meta.url), "utf8");
  const sitemap = await readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8");
  assert.match(robots, /User-agent: \*\s+Allow: \//);
  assert.match(robots, /Sitemap: https:\/\/cssbuychina\.net\/sitemap\.xml/);
  assert.equal((sitemap.match(/<url>/g) ?? []).length, 82);
  assert.ok(sitemap.includes("https://cssbuychina.net/articles/cssbuy-weidian-finds-options-seller-signals"));
  assert.ok(sitemap.includes("https://cssbuychina.net/articles/cssbuy-seller-page-checklist-before-saving-find"));
  assert.equal((sitemap.match(/\/product\//g) ?? []).length, 30);
  assert.ok(sitemap.includes("<loc>https://cssbuychina.net/product/3402</loc><lastmod>2026-09-01</lastmod>"));
  assert.ok(sitemap.includes("<loc>https://cssbuychina.net/articles</loc><lastmod>2026-09-01</lastmod>"));
  assert.ok(sitemap.includes("<loc>https://cssbuychina.net/pt-br</loc>"));
  assert.ok(!sitemap.includes("<loc>https://cssbuychina.net/pt-br/</loc>"));
});
