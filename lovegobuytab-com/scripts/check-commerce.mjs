import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import { build } from "esbuild";
import { parseHTML } from "linkedom";
const locales =
  "en de es fr it pl pt ro sv nl da fi el cs hu bg sk hr sl lt lv et ga mt".split(
    " ",
  );
const ui = JSON.parse(fs.readFileSync("src/content/product-ui.json", "utf8"));
const glossary = JSON.parse(
  fs.readFileSync("src/content/product-glossary.json", "utf8"),
);
for (const lang of locales) {
  assert.deepEqual(Object.keys(ui[lang]).sort(), Object.keys(ui.en).sort());
  assert.ok(Object.values(ui[lang]).every((x) => x.trim()));
  if (lang !== "en")
    assert.deepEqual(
      Object.keys(glossary[lang]).sort(),
      Object.keys(glossary.de).sort(),
    );
}
async function moduleFor(entry) {
  const r = await build({
    entryPoints: [entry],
    bundle: true,
    write: false,
    platform: "node",
    format: "esm",
  });
  return import(
    "data:text/javascript;base64," +
      Buffer.from(r.outputFiles[0].text).toString("base64")
  );
}
const { productTitle } = await moduleFor("src/lib/product-title.ts");
for (const l of locales.filter((l) => l !== "en")) {
  assert.notEqual(
    productTitle("High-quality jacket", l),
    "High-quality jacket",
  );
  assert.ok(productTitle("Chrome Hearts Belt", l).startsWith("Chrome Hearts "));
  assert.ok(
    productTitle("Off-White Shark Breeder Sneakers [15 styles]", l).startsWith(
      "Off-White Shark Breeder ",
    ),
  );
  assert.equal(
    productTitle("Adidas XLG Runner Deluxe", l),
    "Adidas XLG Runner Deluxe",
  );
  assert.equal(
    productTitle("Lacoste Polo Shirt", l),
    `Lacoste ${glossary[l]["polo shirt"]}`,
  );
}
assert.equal(productTitle("High-quality jacket", "de"), "Hochwertige Jacke");
assert.equal(
  productTitle("iPhone leather wallet", "fr"),
  "iPhone Portefeuille en cuir",
);
const { parseSeller } = await moduleFor("src/lib/seller.ts");
const seller = {
  status: { code: 0 },
  result: {
    default_model: {
      item_info: { item_id: "7876894732" },
      sku_properties: {
        attr_list: [
          {
            attr_values: [
              {
                attr_id: 101,
                attr_value: "01",
                img: "https://si.geilicdn.com/photo.jpg",
              },
              {
                attr_id: 102,
                attr_value: "02",
                img: "https://evil.example/steal.jpg",
              },
            ],
          },
        ],
        sku: {
          a: { attr_ids: "101-1", price: "100" },
          b: { attr_ids: "101-2", price: "120" },
        },
      },
    },
  },
};
const html = `<script id="__rocker-render-inject__" data-obj="${JSON.stringify(seller).replaceAll('"', "&quot;")}"></script>`;
assert.deepEqual(parseSeller(html, "7876894732"), [
  {
    id: "101",
    name: "01",
    image: "https://si.geilicdn.com/photo.jpg",
    priceCny: 100,
    priceCnyMax: 120,
  },
]);
assert.deepEqual(parseSeller(html, "12345678"), []);
assert.deepEqual(parseSeller("<h1>Unavailable</h1>", "7876894732"), []);
// Exercise the actual client script against an isolated document, no network or clipboard writes.
async function client({
  rateFailure = false,
  clipboardFailure = false,
  storageFailure = false,
} = {}) {
  const { document, window } = parseHTML(
    `<html lang="en"><body><script data-commerce type="application/json">${JSON.stringify(ui.en)}</script><select data-currency-select><option value="USD">USD</option><option value="EUR">EUR</option><option value="CNY">CNY</option></select><span data-detail-money><span data-money-usd="100"></span></span><span data-currency-code></span><span data-money-usd="20"></span><span data-rate-status></span><button data-copy-weidian="https://weidian.com/item.html?itemID=7876894732"></button><span data-copy-status></span><input data-original-link hidden><img id="product-main-image"><span data-photo-index></span><span data-photo-total></span><span data-selected-style></span><button data-photo-src="https://si.geilicdn.com/style.jpg" data-style-name="01" data-style-cny="70" data-style-cny-max="140"></button><button data-photo-src="https://si.geilicdn.com/original.jpg" data-catalog-photo data-photo-index="1"></button></body></html>`,
  );
  const select = document.querySelector("select");
  let value = "USD";
  Object.defineProperty(select, "value", {
    get: () => value,
    set: (v) => (value = v),
  });
  Object.defineProperty(select, "options", {
    get: () => [...select.querySelectorAll("option")],
  });
  const saved = new Map();
  let copied = "";
  vm.runInNewContext(fs.readFileSync("src/lib/commerce.js", "utf8"), {
    document,
    Intl,
    Date,
    URL,
    AbortSignal,
    Promise,
    Set,
    Number,
    JSON,
    localStorage: {
      getItem: (k) => {
        if (storageFailure) throw Error();
        return saved.get(k);
      },
      setItem: (k, v) => {
        if (storageFailure) throw Error();
        saved.set(k, v);
      },
    },
    navigator: {
      clipboard: {
        writeText: async (text) => {
          if (clipboardFailure) throw Error();
          copied = text;
        },
      },
    },
    fetch: async () => {
      if (rateFailure) throw Error();
      return {
        ok: true,
        json: async () => ({
          result: "success",
          base_code: "USD",
          time_last_update_unix: Math.floor(Date.now() / 1000),
          rates: { USD: 1, EUR: 0.9, CNY: 7 },
        }),
      };
    },
  });
  await new Promise((r) => setTimeout(r, 0));
  const click = (sel) =>
    document
      .querySelector(sel)
      .dispatchEvent(new window.Event("click", { bubbles: true }));
  const money = document.querySelector("[data-detail-money] span");
  select.value = "EUR";
  select.dispatchEvent(new window.Event("change"));
  assert.equal(money.textContent, rateFailure ? "$100.00" : "€90.00");
  click("[data-style-cny]");
  assert.equal(
    money.textContent,
    rateFailure ? "CN¥70.00 – CN¥140.00" : "€9.00 – €18.00",
  );
  assert.equal(
    document.querySelector("[data-currency-code]").textContent,
    rateFailure ? "CNY" : "EUR",
  );
  click("[data-catalog-photo]");
  assert.equal(money.textContent, rateFailure ? "$100.00" : "€90.00");
  document.querySelector("[data-original-link]").select = () => {};
  click("[data-copy-weidian]");
  await new Promise((r) => setTimeout(r, 0));
  assert.equal(
    document.querySelector("[data-copy-status]").textContent,
    clipboardFailure ? ui.en.copyFailed : ui.en.copied,
  );
  if (!clipboardFailure)
    assert.equal(copied, "https://weidian.com/item.html?itemID=7876894732");
  else
    assert.equal(document.querySelector("[data-original-link]").hidden, false);
}
await client();
await client({
  rateFailure: true,
  clipboardFailure: true,
  storageFailure: true,
});
console.log(
  "Passed 24 locale UI resources, 23 title glossaries, brand/model preservation, seller ID/CDN validation, style price ranges, currency conversion/fallback, blocked storage and clipboard fallback.",
);
