import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { default as worker } from "../_worker.js";

const root = new URL("../", import.meta.url);
const assets = new Set();
for (const prefix of ["", "/de", "/fr", "/es", "/it", "/pl"]) {
  for (const suffix of ["", "/articles", "/articles/kameymall-shipping-to-uk", "/articles/kameymall-tshirt-finds"]) {
    const pathname = `${prefix}${suffix}` || "/";
    const response = await worker.fetch(new Request(`https://kameymall-sheet.com${pathname}`), {
      ASSETS: { fetch: () => new Response("Not found", { status: 404 }) },
    }, { waitUntil() {}, passThroughOnException() {} });
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    assert.ok(html.includes(`/assets/v20261109-1/`), pathname);
    for (const match of html.matchAll(/(?:src|href)="(\/assets\/[^"?#]+)"|url\((\/assets\/[^)]+)\)/g)) {
      assets.add(match[1] ?? match[2]);
    }
  }
}
for (const asset of assets) {
  assert.ok(asset.startsWith("/assets/v20261109-1/"), asset);
  assert.ok((await stat(new URL(asset.slice(1), root))).size > 0, asset);
}
const sitemap = await readFile(new URL("sitemap.xml", root), "utf8");
assert.equal((sitemap.match(/<loc>/g) ?? []).length, 456);
console.log(`Pages bundle verified: 24 rendered pages, ${assets.size} referenced assets including fonts, 456 sitemap URLs.`);
