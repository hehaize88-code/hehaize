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
  assert.ok(html.includes("<title>CSSBuy Spreadsheet 2026: Links, Warehouse QC &amp; Shipping</title>"));
  assert.ok(tagWith(html, "meta", "name", "description").includes("warehouse status, QC photos, shipping costs, restrictions and parcel tracking"));
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

test("renders all priority warehouse and shipping articles with article metadata", async () => {
  const priorityArticles = [
    ["cssbuy-warehouse-status-quality-inspection", "CSSBuy Warehouse Status: Arrived and Undergoing Quality Inspection"],
    ["cssbuy-shipping-calculator-actual-vs-volumetric-weight", "CSSBuy Shipping Calculator: Actual Weight, Volume and Parcel Cost"],
    ["cssbuy-restrictions-brands-batteries-liquids", "CSSBuy Restrictions: Check Brands, Batteries, Liquids and Shipping Routes"],
    ["cssbuy-parcel-left-warehouse-tracking-status", "Parcel Has Left the CSSBuy Warehouse: What the Tracking Status Means"],
    ["cssbuy-warehouse-storage-returns-consolidation", "CSSBuy Warehouse Guide: Storage, Returns, QC and Parcel Consolidation"],
  ];

  for (const [slug, h1] of priorityArticles) {
    const html = await fetchHtml(`/articles/${slug}`);
    const url = `https://cssbuychina.net/articles/${slug}`;
    assert.ok(html.includes(`<h1>${h1}</h1>`));
    assert.ok(tagWith(html, "link", "rel", "canonical").includes(`href="${url}"`));
    assert.ok(tagWith(html, "meta", "property", "og:type").includes('content="article"'));
    assert.ok(html.includes('"datePublished":"2026-09-14"'));
    assert.match(html, /Research basis · checked[\s\S]{0,40}September 14, 2026/);
  }
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

test("renders the shoes spreadsheet guide with complete SEO metadata", async () => {
  const html = await fetchHtml("/articles/cssbuy-shoes-spreadsheet-size-qc-fields");
  const url = "https://cssbuychina.net/articles/cssbuy-shoes-spreadsheet-size-qc-fields";
  assert.ok(html.includes("<title>CSSBuy Shoes Spreadsheet: Size and QC Fields</title>"));
  assert.ok(html.includes(`<link rel="canonical" href="${url}"`));
  assert.ok(html.includes(`<meta property="og:url" content="${url}"`));
  assert.ok(html.includes("<h1>CSSBuy Shoes Spreadsheet: Record Size and QC Evidence</h1>"));
  assert.ok(html.includes('"@type":"Article"'));
  assert.ok(html.includes('"@type":"BreadcrumbList"'));
  assert.ok(html.includes('"datePublished":"2026-09-04"'));
  assert.ok(html.includes("Finish with a save, hold or reject checklist"));
});

test("renders the hoodie spreadsheet guide with complete SEO metadata", async () => {
  const html = await fetchHtml("/articles/cssbuy-hoodie-spreadsheet-fabric-measurements-weight");
  const url = "https://cssbuychina.net/articles/cssbuy-hoodie-spreadsheet-fabric-measurements-weight";
  assert.ok(html.includes("<title>CSSBuy Hoodie Spreadsheet: Fabric, Measurements &amp; Weight</title>"));
  assert.ok(html.includes(`<link rel="canonical" href="${url}"`));
  assert.ok(html.includes(`<meta property="og:url" content="${url}"`));
  assert.ok(html.includes("<h1>CSSBuy Hoodie Spreadsheet: Record Fabric, Measurements and Weight</h1>"));
  assert.ok(html.includes('"@type":"Article"'));
  assert.ok(html.includes('"@type":"BreadcrumbList"'));
  assert.ok(html.includes('"datePublished":"2026-09-06"'));
  assert.ok(html.includes("Finish with an order-ready hoodie record"));
});

test("renders the jersey spreadsheet guide with complete SEO metadata", async () => {
  const html = await fetchHtml("/articles/cssbuy-jersey-spreadsheet-sizing-customization-qc");
  const url = "https://cssbuychina.net/articles/cssbuy-jersey-spreadsheet-sizing-customization-qc";
  assert.ok(html.includes("<title>CSSBuy Jersey Spreadsheet: Sizing, Customization &amp; QC</title>"));
  assert.ok(html.includes(`<link rel="canonical" href="${url}"`));
  assert.ok(html.includes(`<meta property="og:url" content="${url}"`));
  assert.ok(html.includes("<h1>CSSBuy Jersey Spreadsheet: Record Size, Customization and QC</h1>"));
  assert.ok(html.includes('"@type":"Article"'));
  assert.ok(html.includes('"@type":"BreadcrumbList"'));
  assert.ok(html.includes('"datePublished":"2026-09-08"'));
  assert.ok(html.includes("Freeze the row before payment and append arrival evidence"));
});

test("renders the bag spreadsheet guide with complete SEO metadata", async () => {
  const html = await fetchHtml("/articles/cssbuy-bag-spreadsheet-dimensions-hardware-shipping");
  const url = "https://cssbuychina.net/articles/cssbuy-bag-spreadsheet-dimensions-hardware-shipping";
  assert.ok(html.includes("<title>CSSBuy Bag Spreadsheet: Dimensions, Hardware &amp; Shipping</title>"));
  assert.ok(html.includes(`<link rel="canonical" href="${url}"`));
  assert.ok(html.includes(`<meta property="og:url" content="${url}"`));
  assert.ok(html.includes("<h1>CSSBuy Bag Spreadsheet: Record Dimensions, Hardware and Shipping</h1>"));
  assert.ok(html.includes('"@type":"Article"'));
  assert.ok(html.includes('"@type":"BreadcrumbList"'));
  assert.ok(html.includes('"datePublished":"2026-09-10"'));
  assert.ok(html.includes("Compare candidates with exceptions, then freeze the row"));
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

test("search forms submit directly to the matching main-store results", async () => {
  for (const path of ["/", "/pt-br", "/de", "/es", "/products", "/de/products"]) {
    const html = await fetchHtml(path);
    assert.ok(html.includes('action="https://www.cnbuycha.com/AllProducts/"'));
    assert.ok(html.includes('method="get"'));
    assert.ok(html.includes('name="q"'));
  }

  const homeHtml = await fetchHtml("/");
  assert.ok(homeHtml.includes('"@type":"SearchAction"'));
  assert.ok(homeHtml.includes('"target":"https://www.cnbuycha.com/AllProducts/?q={search_term_string}"'));
});

test("renders all 30 product detail pages with current main-store shopping links", async () => {
  const ids = [
    "3402", "3401", "3387", "3393", "3380", "3400", "3392", "3396", "3394", "3208",
    "3207", "3389", "3388", "3386", "3375", "3374", "3353", "3347", "3362", "3356",
    "3206", "3204", "3365", "3364", "3373", "3372", "3371", "3357", "3235", "3184",
  ];

  for (const id of ids) {
    const html = await fetchHtml(`/product/${id}`);
    assert.ok(html.includes('class="detail-cta" href="https://www.cnbuycha.com/'));
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
      html.includes('class="product-image" href="https://www.cnbuycha.com/shoes/1011.html" rel="nofollow" data-track-event="product_outbound_click"'),
      `${path} should link the product image directly to the main-store product`,
    );
    assert.ok(
      /<h3><a href="https:\/\/www\.cnbuycha\.com\/shoes\/1011\.html"[^>]*data-track-event="product_outbound_click"[^>]*>Nike P6000&amp;Air Max 96<\/a><\/h3>/.test(html),
      `${path} should link the product title directly to the main-store product`,
    );
    assert.ok(
      html.includes('class="product-button" href="https://www.cnbuycha.com/shoes/1011.html" rel="nofollow" data-track-event="product_outbound_click"'),
      `${path} should keep the product button on the same destination`,
    );
  }
});

test("publishes CTR-focused catalog metadata and analytics hooks", async () => {
  const productsHtml = await fetchHtml("/products");
  const categoriesHtml = await fetchHtml("/categories");
  const articlesHtml = await fetchHtml("/articles");

  assert.ok(productsHtml.includes("<title>CSSBuy Links &amp; Spreadsheet 2026: Product Finds by Category | CSSBuy China</title>"));
  assert.ok(tagWith(productsHtml, "meta", "name", "description").includes("Search a CSSBuy spreadsheet by product or category"));
  assert.ok(productsHtml.includes("PRODUCT ROUTES REVIEWED SEPTEMBER 1, 2026"));
  assert.ok(productsHtml.includes('data-track-event="product_outbound_click"'));
  assert.ok(categoriesHtml.includes('data-track-event="category_outbound_click"'));
  assert.ok(articlesHtml.includes("<title>CSSBuy Guides 2026: Warehouse, QC, Shipping &amp; Tracking</title>"));
  assert.ok(articlesHtml.includes("CSSBuy Warehouse Status Explained: Arrived and Undergoing Quality Inspection"));
  assert.ok(!articlesHtml.includes("SEO knowledge library"));
});

test("publishes an indexable robots file and a 91-URL sitemap", async () => {
  const robots = await readFile(new URL("../public/robots.txt", import.meta.url), "utf8");
  const sitemap = await readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8");
  assert.match(robots, /User-agent: \*\s+Allow: \//);
  assert.match(robots, /Sitemap: https:\/\/cssbuychina\.net\/sitemap\.xml/);
  assert.equal((sitemap.match(/<url>/g) ?? []).length, 91);
  assert.ok(sitemap.includes("https://cssbuychina.net/articles/cssbuy-warehouse-status-quality-inspection"));
  assert.ok(sitemap.includes("https://cssbuychina.net/articles/cssbuy-shipping-calculator-actual-vs-volumetric-weight"));
  assert.ok(sitemap.includes("https://cssbuychina.net/articles/cssbuy-restrictions-brands-batteries-liquids"));
  assert.ok(sitemap.includes("https://cssbuychina.net/articles/cssbuy-parcel-left-warehouse-tracking-status"));
  assert.ok(sitemap.includes("https://cssbuychina.net/articles/cssbuy-warehouse-storage-returns-consolidation"));
  assert.ok(sitemap.includes("https://cssbuychina.net/articles/cssbuy-weidian-finds-options-seller-signals"));
  assert.ok(sitemap.includes("https://cssbuychina.net/articles/cssbuy-seller-page-checklist-before-saving-find"));
  assert.ok(sitemap.includes("https://cssbuychina.net/articles/cssbuy-shoes-spreadsheet-size-qc-fields"));
  assert.ok(sitemap.includes("https://cssbuychina.net/articles/cssbuy-hoodie-spreadsheet-fabric-measurements-weight"));
  assert.ok(sitemap.includes("https://cssbuychina.net/articles/cssbuy-jersey-spreadsheet-sizing-customization-qc"));
  assert.ok(sitemap.includes("https://cssbuychina.net/articles/cssbuy-bag-spreadsheet-dimensions-hardware-shipping"));
  assert.equal((sitemap.match(/\/product\//g) ?? []).length, 30);
  assert.ok(sitemap.includes("<loc>https://cssbuychina.net/product/3402</loc><lastmod>2026-09-01</lastmod>"));
  assert.ok(sitemap.includes("<loc>https://cssbuychina.net/articles</loc><lastmod>2026-09-01</lastmod>"));
  assert.ok(sitemap.includes("<loc>https://cssbuychina.net/pt-br</loc>"));
  assert.ok(!sitemap.includes("<loc>https://cssbuychina.net/pt-br/</loc>"));
});
