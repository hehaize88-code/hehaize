import assert from "node:assert/strict";
import test from "node:test";

const locales = ["zh", "de", "pl", "es", "it", "fr", "pt", "ro", "sv"];
const guideRoutes = [
  "how-to-buy",
  "qc-guide",
  "shipping-guide",
  "returns",
];
const articleRoutes = [
  "how-to-buy-from-taobao-with-joyagoo",
  "joyagoo-fees-explained",
  "joyagoo-qc-photo-checklist",
  "joyagoo-volumetric-weight-shipping-cost",
  "joyagoo-return-window-warehouse-storage",
];
const forbiddenVisibleEnglish = [
  "In this guide",
  "Source check",
  "Ready to browse",
  "Explore products",
  "Researched editorial guide",
  "Updated July",
  "Independent of Joyagoo",
  "This guide was reviewed",
  "Start with the original product listing",
  "Understand the first payment",
  "Compare the overall product first",
  "Separate product cost from parcel cost",
  "The published return policy",
  "\\bSpreadsheet\\b",
  "\\bHome\\b",
];

let worker;

async function getWorker() {
  if (worker) return worker;
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("localization-test", `${process.pid}-${Date.now()}`);
  ({ default: worker } = await import(workerUrl.href));
  return worker;
}

async function fetchHtml(path) {
  const activeWorker = await getWorker();
  const normalizedPath =
    path === "/" || path.endsWith("/") ? path : `${path}/`;
  const response = await activeWorker.fetch(
    new Request(`http://localhost${normalizedPath}`, {
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

  assert.equal(response.status, 200, normalizedPath);
  return response.text();
}

function visibleText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ");
}

function count(html, expression) {
  return html.match(expression)?.length ?? 0;
}

test("every localized homepage keeps the complete content structure", async () => {
  const english = await fetchHtml("/");
  const englishDetails = count(english, /<details\b/g);
  const englishProducts = count(english, /class="product-card /g);

  assert.equal(englishDetails, 13);
  assert.equal(englishProducts, 8);
  assert.match(english, /<html\b[^>]*\blang="en"/i);

  for (const locale of locales) {
    const html = await fetchHtml(`/${locale}`);
    assert.equal(count(html, /<details\b/g), englishDetails, locale);
    assert.equal(count(html, /class="product-card /g), englishProducts, locale);
    assert.match(html, new RegExp(`<html\\b[^>]*\\blang="${locale}"`, "i"));
    for (const slug of articleRoutes) {
      assert.match(html, new RegExp(`/${locale}/${slug}/`), `${locale}:${slug}`);
    }
  }
});

test("the product directory keeps all verified listings in every language", async () => {
  const english = await fetchHtml("/spreadsheet/");
  assert.equal(count(english, /class="product-card /g), 36);

  for (const locale of locales) {
    const html = await fetchHtml(`/${locale}/spreadsheet/`);
    assert.equal(count(html, /class="product-card /g), 36, locale);
    assert.match(html, new RegExp(`/${locale}/product/`, "i"));
  }
});

test("all localized guides preserve English section and paragraph counts", async () => {
  for (const route of guideRoutes) {
    const english = await fetchHtml(`/${route}`);
    const englishSectionCount = count(english, /id="section-\d+"/g);
    const englishParagraphCount = count(english, /<p(?:\s|>)/g);

    for (const locale of locales) {
      const html = await fetchHtml(`/${locale}/${route}`);
      assert.equal(
        count(html, /id="section-\d+"/g),
        englishSectionCount,
        `${locale}/${route}: sections`,
      );
      assert.equal(
        count(html, /<p(?:\s|>)/g),
        englishParagraphCount,
        `${locale}/${route}: paragraphs`,
      );

      const text = visibleText(html);
      for (const phrase of forbiddenVisibleEnglish) {
        assert.doesNotMatch(
          text,
          new RegExp(phrase, "i"),
          `${locale}/${route}: ${phrase}`,
        );
      }
    }
  }
});

test("all localized SEO articles preserve English structure without English fallback", async () => {
  for (const route of articleRoutes) {
    const english = await fetchHtml(`/${route}`);
    const englishSectionCount = count(
      english,
      /id="article-section-\d+"/g,
    );
    const englishParagraphCount = count(english, /<p(?:\s|>)/g);

    for (const locale of locales) {
      const html = await fetchHtml(`/${locale}/${route}`);
      assert.equal(
        count(html, /id="article-section-\d+"/g),
        englishSectionCount,
        `${locale}/${route}: sections`,
      );
      assert.equal(
        count(html, /<p(?:\s|>)/g),
        englishParagraphCount,
        `${locale}/${route}: paragraphs`,
      );

      const text = visibleText(html);
      for (const phrase of forbiddenVisibleEnglish) {
        assert.doesNotMatch(
          text,
          new RegExp(phrase, "i"),
          `${locale}/${route}: ${phrase}`,
        );
      }
    }
  }
});

test("every localized FAQ page contains all 13 translated answers", async () => {
  for (const locale of locales) {
    const html = await fetchHtml(`/${locale}/faq`);
    assert.equal(count(html, /<details\b/g), 13, locale);
  }
});
