import { parseHTML } from "linkedom/worker";
export type Style = {
  id: string;
  name: string;
  image: string;
  priceCny: number | null;
  priceCnyMax: number | null;
};
const cache = new Map<string, { styles: Style[]; at: number }>();
const pending = new Map<string, Promise<Style[]>>();
export function parseSeller(html: string, id: string): Style[] {
  const doc = parseHTML(html).document;
  const raw = doc
    .querySelector("#__rocker-render-inject__")
    ?.getAttribute("data-obj");
  if (!raw) return [];
  const data = JSON.parse(raw),
    model = data?.result?.default_model;
  if (data?.status?.code !== 0 || String(model?.item_info?.item_id) !== id)
    return [];
  const props = model?.sku_properties;
  const group = props?.attr_list?.find((a: any) =>
    a.attr_values?.some((v: any) => v.img),
  );
  if (!group) return [];
  return group.attr_values.slice(0, 240).flatMap((v: any) => {
    try {
      const image = new URL(v.img);
      if (
        image.protocol !== "https:" ||
        image.hostname !== "si.geilicdn.com" ||
        image.username ||
        image.password ||
        image.port
      )
        return [];
      const prices = Object.values(props.sku || {})
        .filter((sku: any) =>
          String(sku.attr_ids).split("-").includes(String(v.attr_id)),
        )
        .map((sku: any) => Number(sku.price))
        .filter((p: number) => Number.isFinite(p) && p > 0);
      return [
        {
          id: String(v.attr_id),
          name: String(v.attr_value || ""),
          image: image.href,
          priceCny: prices.length ? Math.min(...prices) : null,
          priceCnyMax: prices.length ? Math.max(...prices) : null,
        },
      ];
    } catch {
      return [];
    }
  });
}
export async function sellerStyles(id: string): Promise<Style[]> {
  if (!/^\d{5,20}$/.test(id)) return [];
  const old = cache.get(id);
  if (old && Date.now() - old.at < 600000) return old.styles;
  if (pending.has(id)) return pending.get(id)!;
  const request = (async () => {
    try {
      const r = await fetch(`https://weidian.com/item.html?itemID=${id}`, {
        signal: AbortSignal.timeout(12000),
        headers: {
          Accept: "text/html",
          "User-Agent":
            "Mozilla/5.0 (compatible; LoveGoBuyTab/1.0; +https://lovegobuytab.com)",
        },
      });
      if (!r.ok) throw Error("seller unavailable");
      const html = await r.text();
      if (html.length > 2500000) throw Error("seller response size");
      const styles = parseSeller(html, id);
      if (cache.size >= 100) cache.delete(cache.keys().next().value!);
      cache.set(id, { styles, at: Date.now() });
      return styles;
    } catch {
      return old && Date.now() - old.at < 3600000 ? old.styles : [];
    } finally {
      pending.delete(id);
    }
  })();
  pending.set(id, request);
  return request;
}
