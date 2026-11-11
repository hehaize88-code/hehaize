import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import { execFileSync } from "node:child_process";
import { parseHTML } from "linkedom";
import worker from "../dist/server/index.js";
import {
  acceptsImage,
  MAX_BYTES,
  fingerprint,
  rankProducts,
  selectResults,
  validProduct,
  safeImageURL,
} from "../src/lib/image-search-core.mjs";
const index = JSON.parse(
  fs.readFileSync("public/assets/catalog-image-index.json"),
);
const ui = JSON.parse(fs.readFileSync("src/content/image-search-ui.json"));
assert.equal(index.products.filter(validProduct).length, index.catalogCount);
assert.equal(
  new Set(index.products.map((p) => p.path)).size,
  index.catalogCount,
);
const original = index.products.find(
  (p) => p.path === "/other-stuff/3459.html",
);
assert.ok(original);
for (const [type, name] of [
  ["image/jpeg", "a.jpg"],
  ["image/png", "a.png"],
  ["image/webp", "a.webp"],
  ["image/gif", "a.gif"],
  ["", "a.jpg"],
])
  assert.ok(acceptsImage({ type, name, size: MAX_BYTES }));
for (const file of [
  { type: "text/html", name: "x.jpg", size: 10 },
  { type: "image/svg+xml", name: "x.svg", size: 10 },
  { type: "image/jpeg", size: MAX_BYTES + 1 },
  { type: "image/png", size: 0 },
])
  assert.equal(acceptsImage(file), false);
for (const image of [
  "//evil.example/x.jpg",
  "https://cnbuycha.com.evil.example/x.jpg",
  "javascript:alert(1)",
  "https://cnbuycha.com:88/media/products/a.jpg",
  "https://x@cnbuycha.com/media/products/a.jpg",
])
  assert.equal(safeImageURL(image), "");
assert.equal(validProduct({ ...original, path: "//evil.example/a" }), false);
assert.equal(validProduct({ ...original, cells: [NaN] }), false);
assert.equal(rankProducts(original, [original, original, null]).length, 1);
assert.equal(selectResults([{ p: original, score: 0.45 }]).weak, true);
assert.equal(
  selectResults([
    { p: original, score: 0.01 },
    { p: {}, score: 0.25 },
  ]).items.length,
  1,
);
// Verify retrieval from real encoded photos, including a resized/recompressed copy.
const pixels = JSON.parse(
  execFileSync(
    process.env.CODEX_PRIMARY_RUNTIME_PYTHON || "python",
    [
      "-c",
      `from PIL import Image
import json,io
im=Image.open('tests/fixtures/visual-lego.jpg').convert('RGB')
b=io.BytesIO();im.resize((320,320)).save(b,format='JPEG',quality=65)
out=[]
for x in [im,Image.open(io.BytesIO(b.getvalue())),im.resize((128,128)).quantize(colors=64).convert('RGB')]:
 d={}
 for w,h in [(9,8),(4,4)]: d[str(w)]=list(x.resize((w,h),Image.Resampling.LANCZOS).convert('RGBA').tobytes())
 out.append(d)
print(json.dumps(out))`,
    ],
    { encoding: "utf8" },
  ),
);
for (const data of pixels) {
  const canvas = { getContext: () => ctx },
    ctx = {
      fillRect() {},
      drawImage() {},
      getImageData: () => ({ data: data[String(canvas.width)] }),
    };
  const query = fingerprint({ width: 320, height: 320 }, "full", canvas);
  const matches = rankProducts(query, index.products);
  assert.equal(matches[0].p.path, original.path);
  assert.equal(selectResults(matches).items.length, 1);
}
const origin = "https://lovegobuytab.com";
const local = (l) => (l === "en" ? "" : "/" + l) + "/image-search/";
for (const lang of Object.keys(ui)) {
  assert.deepEqual(Object.keys(ui[lang]).sort(), Object.keys(ui.en).sort());
  assert.ok(
    Object.values(ui[lang]).every((s) => typeof s === "string" && s.trim()),
  );
  const r = await worker.fetch(new Request(origin + local(lang)), {});
  assert.equal(r.status, 200, lang);
  const { document } = parseHTML(await r.text());
  assert.equal(document.documentElement.lang, lang);
  assert.equal(
    document.querySelector('link[rel="canonical"]').href,
    origin + local(lang),
  );
  assert.equal(document.querySelectorAll('link[rel="alternate"]').length, 25);
  assert.ok(document.querySelector("#image-file"));
  assert.ok(document.querySelector('nav a[href="' + local(lang) + '"]'));
  assert.equal(
    document.querySelector("#image-status").textContent,
    ui[lang].empty,
  );
}
const source = fs
  .readFileSync("src/lib/image-search.js", "utf8")
  .replace(/^import[\s\S]*?;\n/gm, "");
const flush = async () => {
  for (let i = 0; i < 12; i++) await new Promise((r) => setImmediate(r));
};
async function setup(embedded = false) {
  const html = await (
    await worker.fetch(new Request(origin + "/image-search/"), {})
  ).text();
  const { document, window } = parseHTML(html);
  let pickerClicks = 0;
  if (embedded) {
    const app = document.querySelector("[data-visual-app]");
    const dialog = document.createElement("dialog");
    dialog.setAttribute("data-image-search-dialog", "");
    dialog.open = false;
    dialog.showModal = () => {
      dialog.open = true;
    };
    dialog.close = () => {
      dialog.open = false;
      dialog.dispatchEvent(new window.Event("close"));
    };
    app.replaceWith(dialog);
    dialog.append(app);
    const close = document.createElement("button");
    close.setAttribute("data-image-search-close", "");
    dialog.append(close);
    const form = document.createElement("form");
    form.setAttribute("data-image-search-form", "");
    form.innerHTML =
      '<input type="search" name="q"><button type="button" data-image-search-trigger>Camera</button><button type="submit">Search</button>';
    document.body.append(form);
    document
      .getElementById("image-file")
      .addEventListener("click", () => pickerClicks++);
  }
  let fetches = 0,
    refreshes = 0,
    reply = async () => ({
      ok: true,
      json: async () => ({ ...index, products: [original] }),
    });
  document.addEventListener("lovegobuy:prices-refresh", () => refreshes++);
  vm.runInNewContext(source, {
    document,
    window,
    Image: class {
      naturalWidth = 320;
      naturalHeight = 320;
      decode() {
        return Promise.resolve();
      }
    },
    URL: { createObjectURL: () => "blob:test", revokeObjectURL() {} },
    AbortController,
    Event: window.Event,
    Intl,
    Date,
    setTimeout,
    clearTimeout,
    requestAnimationFrame: (f) => setImmediate(f),
    fetch: (...args) => {
      fetches++;
      return reply(...args);
    },
    acceptsImage,
    rankProducts,
    selectResults,
    validProduct,
    safeImageURL,
    productTitle: (t) => t,
    fingerprint: () => ({ ...original, variation: 30 }),
  });
  const node = (id) => document.getElementById("image-" + id);
  const event = (el, type, props = {}) =>
    el.dispatchEvent(
      Object.assign(new window.Event(type, { bubbles: true }), props),
    );
  const file = { type: "image/jpeg", name: "photo.jpg", size: 100 };
  async function choose(value = file) {
    Object.defineProperty(node("file"), "files", {
      value: [value],
      configurable: true,
    });
    event(node("file"), "change");
    await flush();
  }
  return {
    document,
    window,
    node,
    event,
    file,
    choose,
    reply: (fn) => (reply = fn),
    fetches: () => fetches,
    refreshes: () => refreshes,
    pickerClicks: () => pickerClicks,
  };
}
{
  const u = await setup();
  await u.choose();
  assert.ok(
    u.node("results").querySelector('a[href="/products/other-stuff/3459/"]'),
  );
  assert.ok(u.refreshes() > 0);
  assert.equal(u.fetches(), 1);
  u.event(u.window, "pagehide", { persisted: true });
  u.event(u.node("retry"), "click");
  await flush();
  assert.equal(u.fetches(), 1);
  await u.choose({ type: "text/html", name: "bad.html", size: 1 });
  assert.equal(u.node("results").children.length, 0);
  assert.ok(u.node("controls").hidden);
}
{
  const u = await setup();
  u.reply(async () => ({ ok: false }));
  await u.choose();
  assert.equal(u.node("status").textContent, ui.en.index);
  assert.equal(u.node("retry").disabled, false);
  u.reply(async () => ({
    ok: true,
    json: async () => ({ ...index, products: [original] }),
  }));
  u.event(u.node("retry"), "click");
  await flush();
  assert.equal(u.node("results").children.length, 1);
}
{
  const u = await setup();
  let finish;
  u.reply(() => new Promise((r) => (finish = r)));
  await u.choose();
  u.event(u.node("cancel"), "click");
  finish({ ok: true, json: async () => ({ ...index, products: [original] }) });
  await flush();
  assert.equal(u.node("results").children.length, 0);
  assert.equal(u.node("status").textContent, ui.en.cancelled);
  u.event(u.node("retry"), "click");
  await flush();
  assert.equal(u.node("results").children.length, 1);
  u.event(u.node("reset"), "click");
  assert.equal(u.node("results").children.length, 0);
  assert.ok(u.node("controls").hidden);
}
{
  const u = await setup();
  u.event(u.document.body, "paste", {
    clipboardData: {
      items: [{ kind: "file", type: "image/jpeg", getAsFile: () => u.file }],
    },
  });
  await flush();
  assert.equal(u.node("results").children.length, 1);
  u.event(u.node("drop"), "drop", { dataTransfer: { files: [u.file] } });
  await flush();
  assert.equal(u.node("results").children.length, 1);
  assert.equal(u.fetches(), 1);
}
{
  const u = await setup(true);
  const form = u.document.querySelector("[data-image-search-form]");
  const dialog = u.document.querySelector("[data-image-search-dialog]");
  let submissions = 0;
  form.addEventListener("submit", () => submissions++);
  u.event(form.querySelector("[data-image-search-trigger]"), "click");
  assert.equal(dialog.open, true);
  assert.equal(u.pickerClicks(), 1);
  assert.equal(submissions, 0, "The camera must not submit a text search");
  u.event(u.document.querySelector("[data-image-search-close]"), "click");
  assert.equal(dialog.open, false);
  const search = form.querySelector("input");
  search.value = "jacket";
  u.event(search, "paste", {
    clipboardData: {
      items: [{ kind: "file", type: "image/jpeg", getAsFile: () => u.file }],
    },
  });
  await flush();
  assert.equal(dialog.open, true);
  assert.equal(u.node("results").children.length, 1);
  assert.equal(search.value, "jacket", "Image search preserves the text query");
  dialog.close();
  u.event(form, "drop", { dataTransfer: { files: [u.file] } });
  await flush();
  assert.equal(dialog.open, true);
  assert.equal(u.node("results").children.length, 1);
  assert.equal(u.fetches(), 1, "Search box shares the cached catalogue index");
  dialog.close();
  u.event(search, "paste", {
    clipboardData: { items: [{ kind: "string", type: "text/plain" }] },
  });
  assert.equal(dialog.open, false, "Text paste remains a normal text search");
  u.event(form, "drop", {
    dataTransfer: {
      files: [{ type: "text/html", name: "bad.html", size: 10 }],
    },
  });
  await flush();
  assert.equal(u.node("results").children.length, 0);
  assert.equal(u.node("status").textContent, ui.en.file);
}
console.log(
  `PASS: ${index.catalogCount} valid source products, original/recompressed image retrieval, 24 localized routes, safe URLs, file validation, currency refresh, retry, cancellation, clear, paste and drop.`,
);
