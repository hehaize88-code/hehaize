import { parseHTML } from "linkedom/worker";
export const ORIGIN = "https://cnbuycha.com";
export const REGISTER = "https://www.lovegobuy.com/login/signup";
export type Product = {
  path: string;
  title: string;
  image: string;
  price: string;
  category: string;
};
export type Category = { slug: string; name: string; count: number };
const cache = new Map<string, { html: string; at: number }>();
const inflight = new Map<string, Promise<any>>();
const txt = (el: any) => (el?.textContent || "").trim();
const attr = (el: any, key: string) => el?.getAttribute(key) || "";
export class CatalogError extends Error {
  status: number;
  constructor(message: string, status = 503) {
    super(message);
    this.status = status;
  }
}
export function imageURL(raw: string) {
  if (!raw || /placeholder/i.test(raw)) return "";
  try {
    const u = new URL(raw, ORIGIN);
    if (u.protocol !== "https:" || u.username || u.password || u.port)
      return "";
    return (u.origin === ORIGIN &&
      /^\/(media|uploads|template)\//.test(u.pathname)) ||
      u.hostname === "si.geilicdn.com"
      ? u.href
      : "";
  } catch {
    return "";
  }
}
export async function source(path: string) {
  const url = new URL(path, ORIGIN);
  if (url.origin !== ORIGIN) throw new CatalogError("Invalid source", 400);
  const key = url.href,
    cached = cache.get(key);
  if (cached && Date.now() - cached.at < 120000)
    return parseHTML(cached.html).document;
  if (inflight.has(key)) return inflight.get(key);
  const promise = (async () => {
    try {
      const response = await fetch(url, {
        signal: AbortSignal.timeout(18000),
        headers: {
          Accept: "text/html",
          "User-Agent":
            "Mozilla/5.0 (compatible; LoveGoBuyTab/1.0; +https://lovegobuytab.com)",
        },
      });
      if (!response.ok)
        throw new CatalogError(
          `Catalog HTTP ${response.status}`,
          response.status === 404 ? 404 : 503,
        );
      const html = await response.text();
      if (html.length > 2500000 || !html.includes("CnBuyCha"))
        throw new CatalogError("Unexpected source structure");
      if (cache.size >= 100) cache.delete(cache.keys().next().value!);
      cache.set(key, { html, at: Date.now() });
      return parseHTML(html).document;
    } catch (error) {
      // Memory-only grace cache: same source response, never synthetic products.
      if (cached && Date.now() - cached.at < 900000)
        return parseHTML(cached.html).document;
      throw error;
    } finally {
      inflight.delete(key);
    }
  })();
  inflight.set(key, promise);
  return promise;
}
export function cards(doc: any): Product[] {
  return [...doc.querySelectorAll("article.product-card")]
    .map((card: any) => {
      const path = attr(card.querySelector("a.product-title"), "href");
      return {
        path,
        title: txt(card.querySelector("h3")),
        image: imageURL(attr(card.querySelector("img"), "src")),
        price: txt(card.querySelector(".product-price")),
        category: path.split("/")[1],
      };
    })
    .filter(
      (p: Product) => /^\/[a-z0-9-]+\/\d+\.html$/.test(p.path) && p.title,
    );
}
export async function home() {
  const doc = await source("/");
  const categories: Category[] = [...doc.querySelectorAll(".category-item")]
    .map((el: any) => ({
      slug: attr(el, "href").split("/")[1],
      name: txt(el.querySelector("h3")),
      count: Number(
        txt(el.querySelector(".category-count")).replace(/\D/g, ""),
      ),
    }))
    .filter((c: Category) => /^[a-z0-9-]+$/.test(c.slug) && c.name);
  const products = cards(doc);
  if (!categories.length || !products.length)
    throw new CatalogError("Catalog markup changed");
  return { categories, products };
}
export async function listing(
  category: string,
  query: string,
  sort: string,
  page: number,
) {
  if (category && !/^[a-z0-9-]+$/.test(category))
    throw new CatalogError("Invalid category", 404);
  const sourcePage = Math.floor((page - 1) / 3) + 1,
    offset = ((page - 1) % 3) * 20;
  const params = new URLSearchParams({ sort, page: String(sourcePage) });
  if (query) params.set("q", query.slice(0, 120));
  const doc = await source(
    `${category ? `/${category}/` : "/AllProducts/"}?${params}`,
  );
  const summary = txt(doc.querySelector(".results-summary"));
  if (!summary) throw new CatalogError("Catalog markup changed");
  const total = Number(summary.replace(/\D/g, ""));
  return {
    products: cards(doc).slice(offset, offset + 20),
    total,
    pages: Math.max(1, Math.ceil(total / 20)),
  };
}
export function purchase(sourceUrl: string) {
  try {
    const u = new URL(sourceUrl);
    if (
      u.protocol !== "https:" ||
      !["weidian.com", "www.weidian.com"].includes(u.hostname)
    )
      return "";
    const id = u.searchParams.get("itemID") || u.searchParams.get("itemId");
    if (!id || !/^\d+$/.test(id)) return "";
    return `https://www.lovegobuy.com/product?id=${id}&shop_type=weidian&invite_code=161CPG`;
  } catch {
    return "";
  }
}
export async function detail(path: string) {
  if (!/^\/[a-z0-9-]+\/\d+\.html$/.test(path))
    throw new CatalogError("Invalid product path", 404);
  const doc = await source(path),
    title = txt(doc.querySelector("h1.product-title"));
  if (!title) throw new CatalogError("Product unavailable", 404);
  const sourceUrl = attr(doc.querySelector(".weidian-btn"), "href"),
    buy = purchase(sourceUrl);
  return {
    path,
    title,
    category: path.split("/")[1],
    price: txt(doc.querySelector(".product-detail .product-price")),
    sourceId: buy ? new URL(buy).searchParams.get("id") || "" : "",
    sourceUrl,
    buy,
    images: [
      ...new Set(
        [...doc.querySelectorAll(".gallery-slide img")]
          .map((im: any) => imageURL(attr(im, "src")))
          .filter(Boolean),
      ),
    ] as string[],
    related: cards(doc).slice(0, 4),
  };
}

export function formatPrice(raw: string, lang = "en") {
  const numeric = Number(raw.replace(/[$,\s]/g, ""));
  return Number.isFinite(numeric) && raw.trim()
    ? new Intl.NumberFormat(lang, {
        style: "currency",
        currency: "USD",
      }).format(numeric)
    : raw;
}
