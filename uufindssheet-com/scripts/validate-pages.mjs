import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const root = new URL("../out/", import.meta.url);
const locales = ["en-gb", "de", "pl", "pt-br"];
const translatedLocales = ["de", "pl", "pt-br"];
const guideSlugs = [
  "uufinds-spreadsheet-shopping-guide-2026",
  "uufinds-qc-checklist",
  "how-to-use-uufinds",
  "spreadsheet-vs-qc-finder",
];
const englishOnlyGuideSlug = "uufinds-product-weight-vs-volumetric-weight";
const linkSearchGuideSlug = "uufinds-taobao-1688-weidian-qc-search-guide";
const trousersGuideSlug = "uufinds-jeans-trousers-qc-checklist";
const sizeNotesGuideSlug = "uufinds-size-measurement-notes-before-option";
const sellerGuideSlug = "uufinds-seller-information-reliability-signals";
const costGuideSlug = "uufinds-product-price-total-parcel-cost";
const categorySlugs = ["shoes", "hoodies", "jersey", "accessories"];
const policySlugs = ["about", "contact", "editorial-policy", "privacy", "terms"];
const readPage = (path) => readFile(new URL(`${path.replace(/^\/|\/$/g, "") || "."}/index.html`, root), "utf8");
const count = (html, pattern) => (html.match(pattern) ?? []).length;
const structure = (html) => ({
  sections: count(html, /<section\b/g),
  articles: count(html, /<article\b/g),
  h2: count(html, /<h2\b/g),
  h3: count(html, /<h3\b/g),
  details: count(html, /<details\b/g),
  listItems: count(html, /<li\b/g),
  images: count(html, /<img\b/g),
});
const block = (html, tag, className) => {
  const match = html.match(new RegExp(`<${tag}[^>]*class="${className}"[^>]*>[\\s\\S]*?</${tag}>`));
  assert.ok(match, `missing ${tag}.${className}`);
  return match[0];
};
const betweenClasses = (html, startClass, endClass) => {
  const start = html.indexOf(`class="${startClass}"`);
  const end = html.indexOf(`class="${endClass}"`, start + 1);
  assert.ok(start >= 0 && end > start, `missing range ${startClass} -> ${endClass}`);
  return html.slice(start, end);
};
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const prefixedPath = (prefix, path) => path === "/" ? `/${prefix}/` : `/${prefix}${path}`;
const englishPathFor = (path) => path.replace(/^\/(?:en-gb|de|pl|pt-br)(?=\/)/, "") || "/";
const assertLocaleCluster = (html, currentPath, label) => {
  const englishPath = englishPathFor(currentPath);
  const expected = {
    "x-default": englishPath,
    en: englishPath,
    "en-GB": prefixedPath("en-gb", englishPath),
    "de-DE": prefixedPath("de", englishPath),
    "pl-PL": prefixedPath("pl", englishPath),
    "pt-BR": prefixedPath("pt-br", englishPath),
  };
  assert.match(
    html,
    new RegExp(`<link rel="canonical" href="${escapeRegExp(`https://uufindssheet.com${currentPath}`)}"`),
    `${label} must use a self-canonical`,
  );
  for (const [hrefLang, path] of Object.entries(expected)) {
    assert.match(
      html,
      new RegExp(`<link rel="alternate" hrefLang="${escapeRegExp(hrefLang)}" href="${escapeRegExp(`https://uufindssheet.com${path}`)}"`),
      `${label} is missing reciprocal ${hrefLang}`,
    );
  }
};

const filesUnder = async (directory) => {
  const result = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) result.push(...await filesUnder(path));
    else if (entry.isFile()) result.push(path);
  }
  return result;
};

for (const locale of locales) {
  const home = await readPage(locale);
  assert.match(home, /class="hero"/, `${locale} home must use the primary hero`);
  assert.match(home, /class="hero-visual"/, `${locale} home must keep the hero visual`);
  assert.match(home, /hero-product-collage-480\.webp/, `${locale} home must keep responsive hero images`);
  assert.ok(count(home, /\/product-images\//g) >= 8, `${locale} home must render all product cards`);
  assert.doesNotMatch(home, /class="localized-hero"/, `${locale} home must not use the retired alternate layout`);
  assertLocaleCluster(home, `/${locale}/`, `${locale} home`);

  const expectations = {
    finds: ["hub-page", "hub-hero", "category-grid", "evidence-matrix"],
    products: ["hub-page", "hub-hero", "product-showcase-grid", "evidence-matrix"],
    "how-it-works": ["hub-page", "hub-hero", "workflow-grid", "evidence-matrix"],
    articles: ["hub-page", "hub-hero article-hub-hero", "article-grid article-hub-grid"],
    faq: ["hub-page faq-page", "hub-hero faq-hero", "faq-directory", "faq-groups"],
  };
  for (const [route, classNames] of Object.entries(expectations)) {
    const html = await readPage(`${locale}/${route}`);
    const english = await readPage(route);
    for (const className of classNames) {
      assert.match(html, new RegExp(`class="${className.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`), `${locale}/${route} is missing ${className}`);
    }
    assert.deepEqual(structure(html), structure(english), `${locale}/${route} must keep the English page structure`);
  }

  const finds = await readPage(`${locale}/finds`);
  assert.equal(count(finds, /class="category-card"/g), 9, `${locale}/finds must keep all 9 category routes`);
  assert.equal(count(block(finds, "div", "evidence-grid"), /<article>/g), 4, `${locale}/finds must keep all 4 evidence cards`);
  assert.equal(count(block(finds, "section", "decision-checklist"), /<li>/g), 5, `${locale}/finds must keep the 5-step discovery routine`);
  assert.equal(count(finds, /class="source-method-note"/g), 1, `${locale}/finds must keep its source boundary`);

  const how = await readPage(`${locale}/how-it-works`);
  assert.equal(count(betweenClasses(how, "official-fact-strip", "workflow-grid"), /<article>/g), 3, `${locale}/how-it-works must keep all verified facts`);
  assert.equal(count(block(how, "div", "workflow-grid"), /<article>/g), 3, `${locale}/how-it-works must keep all workflow steps`);
  assert.equal(count(block(how, "div", "evidence-grid"), /<article>/g), 4, `${locale}/how-it-works must keep all evidence cards`);
  assert.equal(count(block(how, "section", "decision-checklist"), /<li>/g), 5, `${locale}/how-it-works must keep the 5-line decision record`);
  assert.equal(count(how, /class="method-note"/g), 1, `${locale}/how-it-works must keep the conclusion panel`);

  const faq = await readPage(`${locale}/faq`);
  assert.equal(count(faq, /class="faq-group"/g), 4, `${locale}/faq must keep all 4 English-equivalent topic groups`);
  assert.equal(count(betweenClasses(faq, "faq-directory", "source-method-note"), /<details/g), 18, `${locale}/faq must keep all 18 English-equivalent answers`);
  assert.equal(count(betweenClasses(faq, "official-fact-strip", "faq-directory"), /<article>/g), 3, `${locale}/faq must keep all verified facts`);
  assert.equal(count(faq, /class="faq-next-step"/g), 1, `${locale}/faq must keep the next-step panel`);

  const product = await readPage(`${locale}/products/hoka-speedgoat-5-trail-running-shoes`);
  assert.match(product, /class="product-page"/);
  assert.match(product, /class="product-gallery"/);
  assert.match(product, /class="product-thumbnails"/);
  assert.ok(count(product, /\/product-images\//g) >= 5, `${locale} product detail must keep the complete gallery`);
  assert.match(product, new RegExp(`href="/${locale === "pl" ? "de" : "pl"}/products/hoka-speedgoat-5-trail-running-shoes/"`), "language switch must preserve the product route");
  assert.deepEqual(
    structure(product),
    structure(await readPage("products/hoka-speedgoat-5-trail-running-shoes")),
    `${locale} product detail must keep the English page structure`,
  );

  for (const slug of guideSlugs) {
    const guide = await readPage(`${locale}/guides/${slug}`);
    const englishGuide = await readPage(`guides/${slug}`);
    assert.match(guide, /class="guide-page"/);
    assert.match(guide, /class="guide-layout"/);
    assert.match(guide, /class="guide-body"/);
    assert.equal(
      count(guide, /class="lead"/g),
      count(englishGuide, /class="lead"/g),
      `${locale}/${slug} must keep every English introductory paragraph`,
    );
    assert.equal(
      count(guide, /id="section-\d+"/g),
      count(englishGuide, /id="section-\d+"/g),
      `${locale}/${slug} must keep every English guide section`,
    );
    assert.deepEqual(structure(guide), structure(englishGuide), `${locale}/${slug} must keep the English guide structure`);
    assert.equal(count(guide, /class="source-note"/g), 1, `${locale}/${slug} must keep the complete primary-source note`);
  }

  for (const policy of policySlugs) {
    const html = await readPage(`${locale}/${policy}`);
    const english = await readPage(policy);
    assert.match(html, /class="trust-page"/, `${locale}/${policy} must use the trust-page layout`);
    assert.match(html, /class="trust-page-body"/, `${locale}/${policy} must keep the complete policy body`);
    assert.deepEqual(structure(html), structure(english), `${locale}/${policy} must keep the English policy structure`);
  }
}

for (const locale of translatedLocales) {
  const targetPages = await Promise.all([
    readPage(`${locale}/finds`),
    readPage(`${locale}/products`),
    readPage(`${locale}/how-it-works`),
    readPage(`${locale}/articles`),
    readPage(`${locale}/faq`),
    ...guideSlugs.map((slug) => readPage(`${locale}/guides/${slug}`)),
    ...policySlugs.map((slug) => readPage(`${locale}/${slug}`)),
    readPage(`${locale}/products/hoka-speedgoat-5-trail-running-shoes`),
  ]);
  for (const html of targetPages) {
    assert.doesNotMatch(html, /A photographed item is not a guarantee for every later unit\./, `${locale} page must not fall back to the retired English evidence card`);
    assert.doesNotMatch(html, />ON THIS PAGE</, `${locale} guides must localize their section navigation`);
    assert.doesNotMatch(html, />What this site is</, `${locale} trust pages must not reuse English policy copy`);
    assert.doesNotMatch(html, />Match the exact source</, `${locale} product pages must localize the complete inspection method`);
    assert.doesNotMatch(html, />Claim standard</, `${locale} article pages must localize their editorial standards`);
    assert.doesNotMatch(html, />LISTING IMAGE</, `${locale} product pages must localize evidence-card labels`);
  }
}

const englishOnlyGuide = await readPage(`guides/${englishOnlyGuideSlug}`);
assert.match(englishOnlyGuide, /<h1>UUFinds Product Weight vs Volumetric Weight: A Practical Parcel Estimate<\/h1>/);
assert.match(englishOnlyGuide, /<link rel="canonical" href="https:\/\/uufindssheet\.com\/guides\/uufinds-product-weight-vs-volumetric-weight\/"/);
assert.doesNotMatch(englishOnlyGuide, /hrefLang="(?:de-DE|pl-PL|pt-BR|en-GB)"|hreflang="(?:de-DE|pl-PL|pt-BR|en-GB)"/i, "English-only article must not claim a translated equivalent");
assert.match(englishOnlyGuide, /"datePublished":"2026-07-29"/);
assert.match(englishOnlyGuide, /"dateModified":"2026-07-29"/);
assert.match(englishOnlyGuide, /"@type":"Article"/);
assert.match(englishOnlyGuide, /"@type":"BreadcrumbList"/);
assert.match(englishOnlyGuide, /class="evidence-ledger"/);
assert.match(englishOnlyGuide, /class="guide-table-wrap"/);
assert.match(englishOnlyGuide, /href="\/guides\/uufinds-qc-checklist\/"/);
assert.match(englishOnlyGuide, /href="\/guides\/uufinds-spreadsheet-shopping-guide-2026\/"/);
const wordCountMatch = englishOnlyGuide.match(/data-visible-word-count="(\d+)"/);
assert.ok(wordCountMatch, "English-only article must expose its validated visible word count");
const visibleWordCount = Number(wordCountMatch[1]);
assert.ok(visibleWordCount >= 1200 && visibleWordCount <= 1800, `English-only article word count must be 1,200–1,800, received ${visibleWordCount}`);
assert.match(englishOnlyGuide, new RegExp(`"wordCount":${visibleWordCount}`));
await assert.rejects(readPage(`de/guides/${englishOnlyGuideSlug}`), "English-only article must not generate a fake German page");
await assert.rejects(readPage(`pl/guides/${englishOnlyGuideSlug}`), "English-only article must not generate a fake Polish page");
await assert.rejects(readPage(`pt-br/guides/${englishOnlyGuideSlug}`), "English-only article must not generate a fake Portuguese page");

const linkSearchGuide = await readPage(`guides/${linkSearchGuideSlug}`);
assert.match(linkSearchGuide, /<title>UUFinds Taobao, 1688 &amp; Weidian QC Search Guide \| UUFinds Sheet<\/title>/);
assert.match(linkSearchGuide, /<h1>How to Find UUFinds QC Photos from Taobao, 1688 and Weidian Links<\/h1>/);
assert.match(linkSearchGuide, new RegExp(`<link rel="canonical" href="https://uufindssheet\\.com/guides/${linkSearchGuideSlug}/"`));
assert.doesNotMatch(linkSearchGuide, /hrefLang="(?:de-DE|pl-PL|pt-BR|en-GB)"|hreflang="(?:de-DE|pl-PL|pt-BR|en-GB)"/i, "Link-search article must not claim a translated equivalent");
assert.match(linkSearchGuide, /"datePublished":"2026-08-10"/);
assert.match(linkSearchGuide, /"dateModified":"2026-08-10"/);
assert.match(linkSearchGuide, /"@type":"Article"/);
assert.match(linkSearchGuide, /"@type":"BreadcrumbList"/);
assert.match(linkSearchGuide, /class="evidence-ledger"/);
assert.match(linkSearchGuide, /class="guide-table-wrap"/);
assert.match(linkSearchGuide, /href="\/guides\/uufinds-qc-checklist\/"/);
assert.match(linkSearchGuide, /href="\/guides\/how-to-use-uufinds\/"/);
const linkSearchWordCountMatch = linkSearchGuide.match(/data-visible-word-count="(\d+)"/);
assert.ok(linkSearchWordCountMatch, "Link-search article must expose its validated visible word count");
const linkSearchVisibleWordCount = Number(linkSearchWordCountMatch[1]);
assert.ok(linkSearchVisibleWordCount >= 1200 && linkSearchVisibleWordCount <= 1800, `Link-search article word count must be 1,200–1,800, received ${linkSearchVisibleWordCount}`);
assert.match(linkSearchGuide, new RegExp(`"wordCount":${linkSearchVisibleWordCount}`));
for (const locale of ["en-gb", "de", "pl", "pt-br"]) {
  await assert.rejects(readPage(`${locale}/guides/${linkSearchGuideSlug}`), `English-only link-search article must not generate a fake ${locale} page`);
}

const trousersGuide = await readPage(`guides/${trousersGuideSlug}`);
assert.match(trousersGuide, /<title>UUFinds Jeans QC Checklist: Fit, Wash &amp; Construction \| UUFinds Sheet<\/title>/);
assert.match(trousersGuide, /<h1>UUFinds Jeans QC Checklist: Fit, Wash and Construction Evidence<\/h1>/);
assert.match(trousersGuide, new RegExp(`<link rel="canonical" href="https://uufindssheet\\.com/guides/${trousersGuideSlug}/"`));
assert.doesNotMatch(trousersGuide, /hrefLang="(?:de-DE|pl-PL|pt-BR|en-GB)"|hreflang="(?:de-DE|pl-PL|pt-BR|en-GB)"/i, "Trousers guide must not claim a translated equivalent");
assert.match(trousersGuide, /"datePublished":"2026-08-26"/);
assert.match(trousersGuide, /"dateModified":"2026-08-26"/);
assert.match(trousersGuide, /"@type":"Article"/);
assert.match(trousersGuide, /"@type":"BreadcrumbList"/);
assert.match(trousersGuide, /class="evidence-ledger"/);
assert.match(trousersGuide, /class="guide-table-wrap"/);
const trousersWordCountMatch = trousersGuide.match(/data-visible-word-count="(\d+)"/);
assert.ok(trousersWordCountMatch, "Trousers guide must expose its validated visible word count");
const trousersVisibleWordCount = Number(trousersWordCountMatch[1]);
assert.ok(trousersVisibleWordCount >= 1200 && trousersVisibleWordCount <= 1800, `Trousers guide word count must be 1,200–1,800, received ${trousersVisibleWordCount}`);
assert.match(trousersGuide, new RegExp(`"wordCount":${trousersVisibleWordCount}`));
for (const locale of ["en-gb", "de", "pl", "pt-br"]) {
  await assert.rejects(readPage(`${locale}/guides/${trousersGuideSlug}`), `English-only trousers guide must not generate a fake ${locale} page`);
}

const sizeNotesGuide = await readPage(`guides/${sizeNotesGuideSlug}`);
assert.match(sizeNotesGuide, /<title>UUFinds Size &amp; Measurement Notes Before Choosing \| UUFinds Sheet<\/title>/);
assert.match(sizeNotesGuide, /<h1>UUFinds Size and Measurement Notes: Choose the Right Option<\/h1>/);
assert.match(sizeNotesGuide, new RegExp(`<link rel="canonical" href="https://uufindssheet\\.com/guides/${sizeNotesGuideSlug}/"`));
assert.doesNotMatch(sizeNotesGuide, /hrefLang="(?:de-DE|pl-PL|pt-BR|en-GB)"|hreflang="(?:de-DE|pl-PL|pt-BR|en-GB)"/i, "Size-notes guide must not claim a translated equivalent");
assert.match(sizeNotesGuide, /"datePublished":"2026-08-28"/);
assert.match(sizeNotesGuide, /"dateModified":"2026-08-28"/);
assert.match(sizeNotesGuide, /"@type":"Article"/);
assert.match(sizeNotesGuide, /"@type":"BreadcrumbList"/);
assert.match(sizeNotesGuide, /class="evidence-ledger"/);
assert.match(sizeNotesGuide, /class="guide-table-wrap"/);
const sizeNotesWordCountMatch = sizeNotesGuide.match(/data-visible-word-count="(\d+)"/);
assert.ok(sizeNotesWordCountMatch, "Size-notes guide must expose its validated visible word count");
const sizeNotesVisibleWordCount = Number(sizeNotesWordCountMatch[1]);
assert.ok(sizeNotesVisibleWordCount >= 1200 && sizeNotesVisibleWordCount <= 1800, `Size-notes guide word count must be 1,200–1,800, received ${sizeNotesVisibleWordCount}`);
assert.match(sizeNotesGuide, new RegExp(`"wordCount":${sizeNotesVisibleWordCount}`));
for (const locale of ["en-gb", "de", "pl", "pt-br"]) {
  await assert.rejects(readPage(`${locale}/guides/${sizeNotesGuideSlug}`), `English-only size-notes guide must not generate a fake ${locale} page`);
}

const sellerGuide = await readPage(`guides/${sellerGuideSlug}`);
assert.match(sellerGuide, /<title>UUFinds Seller Information &amp; Reliability Signals \| UUFinds Sheet<\/title>/);
assert.match(sellerGuide, /<h1>UUFinds Seller Information: Reliability Signals Without Guesswork<\/h1>/);
assert.match(sellerGuide, new RegExp(`<link rel="canonical" href="https://uufindssheet\\.com/guides/${sellerGuideSlug}/"`));
assert.doesNotMatch(sellerGuide, /hrefLang="(?:de-DE|pl-PL|pt-BR|en-GB)"|hreflang="(?:de-DE|pl-PL|pt-BR|en-GB)"/i, "Seller guide must not claim a translated equivalent");
assert.match(sellerGuide, /"datePublished":"2026-08-30"/);
assert.match(sellerGuide, /"dateModified":"2026-08-30"/);
assert.match(sellerGuide, /"@type":"Article"/);
assert.match(sellerGuide, /"@type":"BreadcrumbList"/);
assert.match(sellerGuide, /class="guide-table-wrap"/);
assert.doesNotMatch(sellerGuide, /class="evidence-ledger"|class="source-note"|Primary source notes|Evidence and source ledger/, "Seller guide must not expose research-process modules");
const sellerGuideBodyStart = sellerGuide.indexOf('class="guide-body"');
const sellerGuideBodyEnd = sellerGuide.indexOf("</article>", sellerGuideBodyStart);
assert.ok(sellerGuideBodyStart >= 0 && sellerGuideBodyEnd > sellerGuideBodyStart, "Seller guide body must be extractable");
const sellerGuideBody = sellerGuide.slice(sellerGuideBodyStart, sellerGuideBodyEnd);
assert.doesNotMatch(sellerGuideBody, /href="https?:\/\//i, "Seller guide body must not add external links");
const sellerWordCountMatch = sellerGuide.match(/data-visible-word-count="(\d+)"/);
assert.ok(sellerWordCountMatch, "Seller guide must expose its validated visible word count");
const sellerVisibleWordCount = Number(sellerWordCountMatch[1]);
assert.ok(sellerVisibleWordCount >= 1200 && sellerVisibleWordCount <= 1800, `Seller guide word count must be 1,200–1,800, received ${sellerVisibleWordCount}`);
assert.match(sellerGuide, new RegExp(`"wordCount":${sellerVisibleWordCount}`));
for (const locale of ["en-gb", "de", "pl", "pt-br"]) {
  await assert.rejects(readPage(`${locale}/guides/${sellerGuideSlug}`), `English-only seller guide must not generate a fake ${locale} page`);
}

const costGuide = await readPage(`guides/${costGuideSlug}`);
assert.match(costGuide, /<title>UUFinds Product Price vs Total Parcel Cost \| UUFinds Sheet<\/title>/);
assert.match(costGuide, /<h1>UUFinds Product Price vs Total Parcel Cost: Build a Research Range<\/h1>/);
assert.match(costGuide, new RegExp(`<link rel="canonical" href="https://uufindssheet\\.com/guides/${costGuideSlug}/"`));
assert.doesNotMatch(costGuide, /hrefLang="(?:de-DE|pl-PL|pt-BR|en-GB)"|hreflang="(?:de-DE|pl-PL|pt-BR|en-GB)"/i, "Cost guide must not claim a translated equivalent");
assert.match(costGuide, /"datePublished":"2026-09-01"/);
assert.match(costGuide, /"dateModified":"2026-09-01"/);
assert.match(costGuide, /"@type":"Article"/);
assert.match(costGuide, /"@type":"BreadcrumbList"/);
assert.match(costGuide, /class="guide-table-wrap"/);
assert.doesNotMatch(costGuide, /class="evidence-ledger"|class="source-note"|Primary source notes|Evidence and source ledger/, "Cost guide must not expose research-process modules");
const costGuideBodyStart = costGuide.indexOf('class="guide-body"');
const costGuideBodyEnd = costGuide.indexOf("</article>", costGuideBodyStart);
assert.ok(costGuideBodyStart >= 0 && costGuideBodyEnd > costGuideBodyStart, "Cost guide body must be extractable");
const costGuideBody = costGuide.slice(costGuideBodyStart, costGuideBodyEnd);
assert.doesNotMatch(costGuideBody, /href="https?:\/\//i, "Cost guide body must not add external links");
assert.match(costGuideBody, /independent purchasing agent|independently chosen purchasing agent|independent agent you choose/i);
assert.match(costGuideBody, /not affiliated|does not imply|Do not interpret successful link handling as an affiliation/i);
const costWordCountMatch = costGuide.match(/data-visible-word-count="(\d+)"/);
assert.ok(costWordCountMatch, "Cost guide must expose its validated visible word count");
const costVisibleWordCount = Number(costWordCountMatch[1]);
assert.ok(costVisibleWordCount >= 1200 && costVisibleWordCount <= 1800, `Cost guide word count must be 1,200–1,800, received ${costVisibleWordCount}`);
assert.match(costGuide, new RegExp(`"wordCount":${costVisibleWordCount}`));
for (const locale of ["en-gb", "de", "pl", "pt-br"]) {
  await assert.rejects(readPage(`${locale}/guides/${costGuideSlug}`), `English-only cost guide must not generate a fake ${locale} page`);
}

const articleIndex = await readPage("articles");
assert.match(articleIndex, new RegExp(`href="/guides/${englishOnlyGuideSlug}/"`));
assert.match(articleIndex, new RegExp(`href="/guides/${linkSearchGuideSlug}/"`));
assert.match(articleIndex, new RegExp(`href="/guides/${trousersGuideSlug}/"`));
assert.match(articleIndex, new RegExp(`href="/guides/${sizeNotesGuideSlug}/"`));
assert.match(articleIndex, new RegExp(`href="/guides/${costGuideSlug}/"`));
for (const locale of locales) {
  const localizedArticleIndex = await readPage(`${locale}/articles`);
  assert.match(localizedArticleIndex, new RegExp(`href="/guides/${englishOnlyGuideSlug}/"`), `${locale} article index must route the English-only card to its canonical page`);
    assert.match(localizedArticleIndex, new RegExp(`href="/guides/${linkSearchGuideSlug}/"`), `${locale} article index must route the link-search card to its canonical page`);
    assert.match(localizedArticleIndex, new RegExp(`href="/guides/${trousersGuideSlug}/"`), `${locale} article index must route the English-only trousers card to its canonical page`);
    assert.match(localizedArticleIndex, new RegExp(`href="/guides/${sizeNotesGuideSlug}/"`), `${locale} article index must route the English-only size-notes card to its canonical page`);
    assert.match(localizedArticleIndex, new RegExp(`href="/guides/${costGuideSlug}/"`), `${locale} article index must route the English-only cost card to its canonical page`);
}

const home = await readPage("");
const contiguousHome = home.replaceAll("<!-- -->", "");
assertLocaleCluster(home, "/", "English home");
assert.match(home, /<title>UUFinds Guide 2026: Spreadsheet, QC Photos &amp; Product Search<\/title>/);
assert.match(home, /<meta name="description" content="Use UUFinds to search product and agent links, review QC photos, compare spreadsheet finds, and open matching product pages for shoes, hoodies, jerseys and more\."/);
assert.match(contiguousHome, /<h1>Find with UUFinds\.<br\/?>(?:Check QC photos\.)<br\/?><em>Compare products\.<\/em><\/h1>/);
assert.match(home, /Use UUFinds to search product or agent links, review available QC photos and shortlist spreadsheet finds before opening the matching product page\./);
assert.match(home, /href="\/categories\/shoes\/"/);
assert.match(home, /href="\/categories\/hoodies\/"/);
assert.match(home, /href="\/categories\/jersey\/"/);
assert.match(home, /href="\/categories\/accessories\/"/);

const polishHome = await readPage("pl");
const contiguousPolishHome = polishHome.replaceAll("<!-- -->", "");
assert.match(polishHome, /<title>UUFinds Spreadsheet 2026 – Produkty i zdjęcia QC<\/title>/);
assert.match(polishHome, /<meta name="description" content="Przeglądaj niezależny UUFinds Spreadsheet z butami, bluzami, koszulkami sportowymi i innymi produktami\. Sprawdzaj zdjęcia QC, porównuj oferty i otwieraj dopasowane strony produktów\."/);
assert.match(contiguousPolishHome, /<h1>UUFinds Spreadsheet 2026 <br\/?><em>Produkty i zdjęcia QC<\/em><\/h1>/);
assert.match(polishHome, /hrefLang="pl-PL"[^>]+href="\/pl\/"/);
for (const phrase of [
  "Jak korzystać z UUFinds Spreadsheet: produkty i proces QC",
  "Zdjęcia QC w UUFinds: lista kontroli produktu",
  "Jak korzystać z UUFinds: linki, zdjęcia QC i dopasowanie produktu",
  "Spreadsheet czy QC Finder: odkrywanie czy weryfikacja?",
  "Czy uufindssheet.com jest oficjalną stroną UUFinds?",
  "Czy zdjęcie QC gwarantuje jakość produktu?",
  "Co sprawdzić na stronie docelowej?",
]) assert.ok(polishHome.includes(phrase), `Polish home must include translated copy: ${phrase}`);
for (const retiredEnglish of [
  "Is this the official UUFinds website?",
  "Does a QC photo guarantee product quality?",
  "What should be checked on the destination page?",
  "UUFinds QC Photos Checklist: How to Review a Product",
  "How to Use UUFinds: Links, QC Photos &amp; Product Matching",
]) assert.doesNotMatch(polishHome, new RegExp(escapeRegExp(retiredEnglish)), `Polish home still contains English copy: ${retiredEnglish}`);

const keywordGuideChecks = [
  ["uufinds-spreadsheet-shopping-guide-2026", "How to Use a UUFinds Spreadsheet: Product Finds &amp; QC Workflow", "how to use a UUFinds spreadsheet"],
  ["uufinds-qc-checklist", "UUFinds QC Photos Checklist: How to Review a Product", "UUFinds QC photos"],
  ["how-to-use-uufinds", "How to Use UUFinds: Links, QC Photos &amp; Product Matching", "how to use UUFinds"],
];
const assignedGuideTitles = new Set();
for (const [slug, heading, visiblePhrase] of keywordGuideChecks) {
  const html = await readPage(`guides/${slug}`);
  const assignedTitle = heading + " | UUFinds Sheet";
  assert.ok(html.includes(`<title>${assignedTitle}</title>`), `${slug} must own its assigned title`);
  assert.match(html, new RegExp(`<h1>${heading}</h1>`), `${slug} must own its assigned H1`);
  assert.ok(html.toLowerCase().includes(visiblePhrase.toLowerCase()), `${slug} must reinforce its assigned phrase in visible copy`);
  assignedGuideTitles.add(assignedTitle);
}
assert.equal(assignedGuideTitles.size, keywordGuideChecks.length, "guide keyword targets must use distinct titles");

const productKeywordChecks = [
  ["hoka-speedgoat-5-trail-running-shoes", "Speedgoat 5 Trail Running Shoes"],
  ["maison-margiela-hoodie", "Maison Margiela Hoodie"],
  ["louis-vuitton-tee", "Louis Vuitton Tee"],
  ["celine-coat", "Celine Coat"],
  ["hello-kitty-plush-pants", "Hello Kitty Plush Pants"],
  ["era-hats", "Era Hats"],
  ["nike-elite-backpack", "Nike Elite Backpack"],
  ["samsung-galaxy-watch8", "Samsung Galaxy Watch8"],
];
for (const [slug, productName] of productKeywordChecks) {
  const html = await readPage(`products/${slug}`);
  const contiguousHtml = html.replaceAll("<!-- -->", "");
  const escapedName = escapeRegExp(productName);
  assert.match(html, new RegExp(`<title>${escapedName} QC &amp; Spreadsheet Guide \\| UUFinds</title>`), `${slug} must own a unique product + QC/spreadsheet title`);
  assert.match(contiguousHtml, new RegExp(`<h1>${escapedName} QC &amp; Spreadsheet Guide</h1>`), `${slug} must own a unique product + QC/spreadsheet H1`);
  assert.ok(contiguousHtml.toLowerCase().includes(`${productName.toLowerCase()} spreadsheet find`), `${slug} must include its product-name + spreadsheet phrase in visible copy`);
  assert.ok(contiguousHtml.toLowerCase().includes(`review ${productName.toLowerCase()} qc evidence`), `${slug} must include its product-name + QC phrase in visible copy`);
}

const categoryProductUrls = [];
for (const slug of categorySlugs) {
  const html = await readPage(`categories/${slug}`);
  const listingSection = betweenClasses(html, "product-showcase-grid category-listing-grid", "evidence-matrix");
  const productNames = [...listingSection.matchAll(/<h2>([^<]+)<\/h2>/g)].map((match) => match[1]);
  assert.match(html, new RegExp(`<h1>UUFinds ${slug === "jersey" ? "Jersey" : slug[0].toUpperCase() + slug.slice(1)} Spreadsheet</h1>`));
  assert.equal(count(html, /class="product-card"/g), 4, `${slug} category must show four distinct listings`);
  assert.equal(count(listingSection, /class="product-card-image"/g), 4, `${slug} category must show an image for every listing`);
  assert.equal(count(listingSection, /<span>¥(?:<!-- -->)?\d+(?:\.\d+)?<\/span>/g), 4, `${slug} category must show a price for every listing`);
  assert.equal(productNames.length, 4, `${slug} category must name every listing`);
  assert.equal(new Set(productNames).size, 4, `${slug} category must not repeat a product`);
  assert.equal(count(html, /class="category-listing-note"/g), 4, `${slug} category must show a filtering note for every listing`);
  assert.equal(count(html, /class="evidence-grid"[\s\S]*?<\/section>/g), 1, `${slug} category must keep its filtering guide`);
  assert.match(html, /"@type":"CollectionPage"/);
  assert.match(html, /"@type":"ItemList"/);
  assert.match(html, /"numberOfItems":4/);
  const urls = [...html.matchAll(/href="(https:\/\/www\.cnbuycha\.com\/AllProducts\/\d+\.html)"/g)].map((match) => match[1]);
  assert.equal(new Set(urls).size, 4, `${slug} category must use four non-duplicate detail destinations`);
  categoryProductUrls.push(...urls);
}
assert.equal(new Set(categoryProductUrls).size, categoryProductUrls.length, "category landing pages must not reuse product destinations across categories");

const sitemap = await readFile(join(root.pathname, "sitemap.xml"), "utf8");
assert.match(sitemap, /https:\/\/uufindssheet\.com\/pl\//);
assert.match(sitemap, /https:\/\/uufindssheet\.com\/de\/about\//);
assert.match(sitemap, /https:\/\/uufindssheet\.com\/pt-br\/terms\//);
assert.match(sitemap, new RegExp(`https://uufindssheet\\.com/guides/${englishOnlyGuideSlug}/`));
assert.match(sitemap, new RegExp(`https://uufindssheet\\.com/guides/${linkSearchGuideSlug}/`));
assert.match(sitemap, new RegExp(`https://uufindssheet\\.com/guides/${trousersGuideSlug}/`));
assert.match(sitemap, new RegExp(`https://uufindssheet\\.com/guides/${sizeNotesGuideSlug}/`));
for (const slug of categorySlugs) assert.match(sitemap, new RegExp(`https://uufindssheet\\.com/categories/${slug}/`));
assert.doesNotMatch(sitemap, new RegExp(`https://uufindssheet\\.com/(?:en-gb|de|pl|pt-br)/guides/${englishOnlyGuideSlug}/`));
assert.doesNotMatch(sitemap, new RegExp(`https://uufindssheet\\.com/(?:en-gb|de|pl|pt-br)/guides/${linkSearchGuideSlug}/`));
assert.doesNotMatch(sitemap, new RegExp(`https://uufindssheet\\.com/(?:en-gb|de|pl|pt-br)/guides/${trousersGuideSlug}/`));
assert.doesNotMatch(sitemap, new RegExp(`https://uufindssheet\\.com/(?:en-gb|de|pl|pt-br)/guides/${sizeNotesGuideSlug}/`));

const allowedOutboundHosts = new Set(["uufindssheet.com", "www.cnbuycha.com", "www.googletagmanager.com"]);
const publishedHtmlFiles = (await filesUnder(root.pathname)).filter((path) => path.endsWith(".html"));
for (const file of publishedHtmlFiles) {
  const html = await readFile(file, "utf8");
  const relativePath = file.slice(root.pathname.length).replaceAll("\\", "/");
  assert.doesNotMatch(relativePath, /\b(?:uuufinds|uufinda|uufins)\b/i, `published route must not target a UUFinds misspelling: ${relativePath}`);
  const localeMatch = relativePath.match(/^(en-gb|de|pl|pt-br)\/(.*\/)?index\.html$/);
  if (localeMatch) {
    const currentPath = `/${relativePath.replace(/index\.html$/, "")}`;
    assertLocaleCluster(html, currentPath, relativePath);
    const englishPath = englishPathFor(currentPath);
    assertLocaleCluster(await readPage(englishPath), englishPath, `English reciprocal for ${relativePath}`);
  }
  assert.doesNotMatch(
    html,
    /(?:CNBuy|CNBUY|CNF|CNFans)/,
    `published page still exposes a main-site brand name: ${file}`,
  );
  assert.doesNotMatch(
    html,
    /\b(?:uuufinds|uufinda|uufins)\b/i,
    `published page must not target a UUFinds misspelling: ${file}`,
  );
  for (const match of html.matchAll(/\b(?:href|action)="([^"]+)"/g)) {
    const target = match[1];
    if (!/^https?:\/\//i.test(target)) continue;
    const host = new URL(target).hostname;
    assert.ok(allowedOutboundHosts.has(host), `unexpected outbound destination ${host} in ${file}`);
  }
}

console.log("Validated multilingual parity, layout, images, route-preserving language links, brand-neutral copy, outbound hosts, trust pages, and sitemap.");
