// Compatible with the existing, static 64-bit dHash + 4x4 RGB catalogue index.
// No uploads, remote inference, new database or paid service.
export const MAX_BYTES = 20 * 1024 * 1024;
export function acceptsImage(file) {
  if (!file || file.size <= 0 || file.size > MAX_BYTES) return false;
  if (/^image\/(jpeg|png|webp|gif)$/.test(file.type)) return true;
  return (
    (!file.type || file.type === "application/octet-stream") &&
    /\.(jpe?g|png|webp|gif)$/i.test(file.name || "")
  );
}
export function safeImageURL(raw) {
  try {
    if (typeof raw !== "string" || !raw) return "";
    const url = new URL(raw, "https://cnbuycha.com");
    if (url.protocol !== "https:" || url.username || url.password || url.port)
      return "";
    return (url.origin === "https://cnbuycha.com" &&
      /^\/(media\/products|uploads\/allimg)\//.test(url.pathname)) ||
      url.hostname === "si.geilicdn.com"
      ? url.href
      : "";
  } catch {
    return "";
  }
}
export function validProduct(p) {
  return (
    p &&
    /^\/[a-z0-9-]+\/\d+\.html$/.test(p.path) &&
    /^[01]{64}$/.test(p.hash) &&
    Array.isArray(p.cells) &&
    p.cells.length === 48 &&
    p.cells.every((n) => Number.isFinite(n) && n >= 0 && n <= 255) &&
    typeof p.title === "string" &&
    p.title.length > 0 &&
    !!safeImageURL(p.image)
  );
}
export function distance(a, b) {
  let hash = 0,
    color = 0;
  for (let i = 0; i < 64; i++) hash += a.hash[i] !== b.hash[i];
  for (let i = 0; i < 48; i++) color += Math.abs(a.cells[i] - b.cells[i]);
  return (hash / 64) * 0.7 + (color / (48 * 255)) * 0.3;
}
export function cropArea(width, height, mode) {
  return mode === "center"
    ? [width * 0.15, height * 0.15, width * 0.7, height * 0.7]
    : [0, 0, width, height];
}
export function fingerprint(
  image,
  mode = "full",
  canvas = document.createElement("canvas"),
) {
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw Error("canvas");
  const area = cropArea(
    image.naturalWidth || image.width,
    image.naturalHeight || image.height,
    mode,
  );
  function pixels(w, h) {
    canvas.width = w;
    canvas.height = h;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(image, ...area, 0, 0, w, h);
    return ctx.getImageData(0, 0, w, h).data;
  }
  const p = pixels(9, 8),
    gray = [];
  for (let i = 0; i < p.length; i += 4)
    gray.push(0.299 * p[i] + 0.587 * p[i + 1] + 0.114 * p[i + 2]);
  let hash = "";
  for (let y = 0; y < 8; y++)
    for (let x = 0; x < 8; x++)
      hash += gray[y * 9 + x] > gray[y * 9 + x + 1] ? "1" : "0";
  const c = pixels(4, 4),
    cells = [];
  for (let i = 0; i < c.length; i += 4) cells.push(c[i], c[i + 1], c[i + 2]);
  const mean = gray.reduce((sum, n) => sum + n, 0) / gray.length;
  const variation = Math.sqrt(
    gray.reduce((sum, n) => sum + (n - mean) ** 2, 0) / gray.length,
  );
  return { hash, cells, variation };
}
export function rankProducts(query, products, limit = 24) {
  const unique = new Map();
  for (const p of products) {
    if (!validProduct(p)) continue;
    const score = distance(query, p),
      previous = unique.get(p.path);
    if (!previous || score < previous.score) unique.set(p.path, { p, score });
  }
  return [...unique.values()]
    .sort((a, b) => a.score - b.score || a.p.path.localeCompare(b.p.path))
    .slice(0, limit);
}
export function selectResults(ranked) {
  if (!ranked.length) return { items: [], weak: true };
  const best = ranked[0].score;
  if (best > 0.27) return { items: ranked.slice(0, 6), weak: true };
  // A clear first result should not be padded with visually distant products.
  return {
    items: ranked.filter((item) => item.score <= Math.min(0.27, best + 0.09)),
    weak: false,
  };
}
