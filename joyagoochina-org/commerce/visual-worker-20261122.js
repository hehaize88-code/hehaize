"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // public/commerce/compact-search.mjs
  var compact_search_exports = {};
  __export(compact_search_exports, {
    compactSearch: () => compactSearch,
    resizeFingerprint: () => resizeFingerprint
  });
  function resizeFingerprint(image) {
    function pixels(width) {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = 8;
      const context = canvas.getContext("2d", { willReadFrequently: true });
      context.fillStyle = "#fff";
      context.fillRect(0, 0, width, 8);
      context.imageSmoothingQuality = "high";
      context.drawImage(image, 0, 0, width, 8);
      return context.getImageData(0, 0, width, 8).data;
    }
    const samples = pixels(8);
    const color = [];
    for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) {
      for (let c = 0; c < 3; c++) {
        const i = (y * 2 * 8 + x * 2) * 4 + c;
        const sum = [0, 4, 32, 36].reduce((n, offset) => n + (samples[i + offset] >> 3), 0);
        color.push(Math.round(sum / 4));
      }
    }
    const gray = pixels(9);
    const lum = (i) => 0.299 * gray[i] + 0.587 * gray[i + 1] + 0.114 * gray[i + 2];
    let hash = "";
    for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) {
      const i = (y * 9 + x) * 4;
      hash += lum(i + 4) > lum(i) ? "1" : "0";
    }
    return { hash, color };
  }
  function nibbles(bits) {
    return bits.match(/.{4}/g).map((n) => parseInt(n, 2));
  }
  function scorePhoto(signature, colors, query) {
    const area = signature.length === 17;
    const hash = area ? query.areaHash : query.hash;
    const cell = area ? query.areaColor : query.color;
    const rgb = atob(colors);
    let squared = 0, hamming = 0;
    for (let i = 0; i < 48; i++) squared += (rgb.charCodeAt(i) - cell[i]) ** 2;
    for (let i = 0; i < 16; i++) hamming += population[parseInt(signature[i + Number(area)], 16) ^ hash[i]];
    return 0.7 * Math.sqrt(squared / 48) / 31 + 0.3 * hamming / 64;
  }
  async function verifiedJSON(file, get) {
    const r = await get(file.url);
    if (!r.ok) throw Error("Index " + r.status + " \xB7 " + file.url.split("/").pop());
    const bytes = new Uint8Array(await r.arrayBuffer());
    const digest = await crypto.subtle.digest("SHA-256", bytes);
    const hash = Array.from(new Uint8Array(digest), (n) => n.toString(16).padStart(2, "0")).join("");
    const zipped = bytes[0] === 31 && bytes[1] === 139;
    if (hash !== (file.jsonSha256 && !zipped ? file.jsonSha256 : file.sha256)) throw Error("Index integrity \xB7 " + file.url.split("/").pop());
    const body = zipped ? new Blob([bytes]).stream().pipeThrough(new DecompressionStream("gzip")) : bytes;
    return new Response(body).json();
  }
  async function compactSearch(manifest, query, get, onProgress, limit) {
    const features = {
      areaHash: nibbles(query.hash),
      areaColor: query.cells.map((v) => v >> 3),
      hash: nibbles(query.resize.hash),
      color: query.resize.color
    };
    const titles = await verifiedJSON(manifest.titles, get);
    const paths = /* @__PURE__ */ new Set(), matches = [];
    let cursor = 0, loaded = 0;
    async function lane() {
      while (cursor < manifest.shards.length) {
        const shard = manifest.shards[cursor++];
        const rows = await verifiedJSON(shard, get);
        let count = 0;
        for (const [path, images] of rows) {
          if (paths.has(path) || !titles[path] || !images.length) throw Error("Invalid image index product");
          paths.add(path);
          let best = null;
          for (const [image, hash, color, kind] of images) {
            const score = scorePhoto(hash, color, features);
            if (!best || score < best.score) {
              best = { score, p: { path, title: titles[path], price: "", image, kind, matchedImage: image } };
            }
          }
          matches.push(best);
          count += images.length;
        }
        if (count !== shard.count) throw Error("Incomplete image shard");
        loaded += count;
        onProgress(loaded, manifest.indexedImageCount);
      }
    }
    await Promise.all(Array.from({ length: 4 }, lane));
    if (loaded !== manifest.indexedImageCount || paths.size !== manifest.indexedProductCount) throw Error("Incomplete image catalogue");
    matches.sort((a, b) => a.score - b.score || a.p.path.localeCompare(b.p.path));
    const weak = !matches.length || matches[0].score > 0.24;
    const items = matches;
    return { items, weak, imageCount: loaded, productCount: paths.size, updatedAt: manifest.updatedAt, failedImageCount: manifest.failedImageCount || 0, failedStylePageCount: manifest.failedStylePageCount || 0, failedDetailCount: manifest.failedDetailCount || 0, pendingImageCount: manifest.pendingImageCount || 0 };
  }
  var population;
  var init_compact_search = __esm({
    "public/commerce/compact-search.mjs"() {
      "use strict";
      population = [0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4];
    }
  });

  // public/commerce/image-search-core.mjs
  var MAX_BYTES = 20 * 1024 * 1024;
  function validProduct(p) {
    return p && /^\/[a-z0-9-]+\/\d+\.html$/.test(p.path) && /^[01]{64}$/.test(p.hash) && Array.isArray(p.cells) && p.cells.length === 48 && p.cells.every((n) => Number.isFinite(n) && n >= 0 && n <= 255) && typeof p.title === "string" && typeof p.image === "string" && (/^\/(?:media\/products|uploads\/allimg)\//.test(p.image) || /^https:\/\/[a-z0-9.-]+\//i.test(p.image));
  }
  function distance(a, b) {
    let hash = 0, color = 0;
    for (let i = 0; i < 64; i++) hash += a.hash[i] !== b.hash[i];
    for (let i = 0; i < 48; i++) color += Math.abs(a.cells[i] - b.cells[i]);
    return hash / 64 * 0.7 + color / (48 * 255) * 0.3;
  }
  function rankProducts(query, products, limit = 24) {
    const unique = /* @__PURE__ */ new Map();
    for (const p of products) {
      if (!validProduct(p)) continue;
      const score = distance(query, p), previous = unique.get(p.path);
      if (!previous || score < previous.score) unique.set(p.path, { p, score });
    }
    return [...unique.values()].sort((a, b) => a.score - b.score || a.p.path.localeCompare(b.p.path)).slice(0, limit);
  }
  function selectResults(ranked) {
    if (!ranked.length) return { items: [], weak: true };
    const best = ranked[0].score;
    if (best > 0.27) return { items: ranked.slice(0, 6), weak: true };
    return { items: ranked.filter((item) => item.score <= Math.min(0.27, best + 0.09)), weak: false };
  }

  // public/commerce/image-search-stream.mjs?v=20261112-v4
  async function searchAllImages(query, { fetcher = fetch, signal, onProgress = () => {
  }, limit = 24 } = {}) {
    const request = async (url, options = {}) => {
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          const r = await fetcher(url, { ...options, signal });
          if (attempt === 2 || ![408, 429, 500, 502, 503, 504].includes(r.status)) return r;
          const after = r.headers?.get("retry-after"), seconds = after ? Number(after) || Math.max(0, (Date.parse(after) - Date.now()) / 1e3) : 0;
          if (seconds > 20) return r;
          await pause(Math.max(seconds * 1e3, 500 * (attempt + 1)));
        } catch (error) {
          if (signal?.aborted || attempt === 2) throw error;
          await pause(500 * (attempt + 1));
        }
      }
    };
    function pause(ms) {
      return new Promise((resolve, reject) => {
        if (signal?.aborted) {
          reject(signal.reason);
          return;
        }
        const abort = () => {
          clearTimeout(timer);
          reject(signal.reason);
        };
        const timer = setTimeout(() => {
          signal?.removeEventListener("abort", abort);
          resolve();
        }, ms);
        signal?.addEventListener("abort", abort, { once: true });
      });
    }
    const response = await request("/catalog-image-index.json", { cache: "no-cache" });
    if (!response.ok) throw Error("Index unavailable");
    const manifest = await response.json(), shards = manifest.shards;
    if (manifest.version === 3 && manifest.descriptorAlgorithm === "compact-rgb-dhash") {
      const { compactSearch: compactSearch2 } = await Promise.resolve().then(() => (init_compact_search(), compact_search_exports));
      return compactSearch2(manifest, query, request, onProgress, limit);
    }
    if (manifest.version !== 2 || manifest.descriptorAlgorithm !== "area-v2" || !Array.isArray(shards) || !shards.length || shards.length > 1e3) throw Error("Invalid image index");
    const total = shards.reduce((n, s) => n + s.count, 0);
    if (total !== manifest.indexedImageCount || shards.some((s) => !/^\/catalog-image-index\/[a-z0-9.-]+\.json$/.test(s.url) || !Number.isSafeInteger(s.count) || s.count < 1 || !/^[a-f0-9]{64}$/.test(s.sha256))) throw Error("Incomplete image index");
    let cursor = 0, loaded = 0, best = [];
    const paths = /* @__PURE__ */ new Set();
    await Promise.all(Array.from({ length: Math.min(4, shards.length) }, async () => {
      while (cursor < shards.length) {
        const shard = shards[cursor++], r = await request(shard.url);
        if (!r.ok) throw Error("Missing image shard");
        const bytes = await r.arrayBuffer();
        const hash = [...new Uint8Array(await crypto.subtle.digest("SHA-256", bytes))].map((n) => n.toString(16).padStart(2, "0")).join("");
        if (hash !== shard.sha256) throw Error("Image shard integrity mismatch");
        const data = JSON.parse(new TextDecoder().decode(bytes));
        if (!Array.isArray(data.products) || data.products.length !== shard.count || data.products.some((p) => !validProduct(p))) throw Error("Invalid image records");
        data.products.forEach((p) => paths.add(p.path));
        const candidates = rankProducts(query, data.products, limit);
        best = rankProducts(query, [...best.map((x) => x.p), ...candidates.map((x) => x.p)], limit);
        loaded += data.products.length;
        onProgress(loaded, total);
      }
    }));
    if (loaded !== manifest.indexedImageCount || paths.size !== manifest.indexedProductCount) throw Error("Image coverage mismatch");
    return {
      ...selectResults(best),
      productCount: paths.size,
      imageCount: loaded,
      catalogCount: manifest.catalogCount,
      updatedAt: manifest.updatedAt,
      failedImageCount: manifest.failedImageCount || 0,
      failedStylePageCount: manifest.failedStylePageCount || 0,
      failedDetailCount: manifest.failedDetailCount || 0
    };
  }

  // public/commerce/image-search-worker.js
  var active;
  self.onmessage = async ({ data }) => {
    active?.abort();
    const controller = new AbortController();
    active = controller;
    try {
      const result = await searchAllImages(data.query, { signal: controller.signal, onProgress: (loaded, total) => self.postMessage({ id: data.id, type: "progress", loaded, total }) });
      if (!controller.signal.aborted) self.postMessage({ id: data.id, type: "result", result });
    } catch (error) {
      if (!controller.signal.aborted) self.postMessage({ id: data.id, type: "error", message: "Image index unavailable" });
    }
  };
})();
