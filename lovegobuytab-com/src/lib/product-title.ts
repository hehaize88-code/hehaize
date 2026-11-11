import glossaries from "../content/product-glossary.json";

// Translate descriptive listing text, preserving brand/model identities. This
// pure server-side function is shared by cards, headings, image alt and SEO.
const protectedNames =
  /\b(?:Chrome Hearts|Stone Island|Palm Angels|Off[- ]White|The North Face|White Fox|New Balance|Black Diamond|Golden Goose|Canada Goose|Blue Blue Japan|Red Wing|Pink Palm Puff|Louis Vuitton|Air Force \d+|Air Jordan \d+|Free Metcon\s*\d*|XLG Runner Deluxe|Cloud[- ]flake|Royal Pop|Shark Breeder|Valley Dreams|Vale Dreams)\b/gi;
const aliases: Record<string, string> = {
  pans: "pants",
  trouser: "pants",
  trousers: "pants",
  joggers: "pants",
  "t shirts": "t-shirt",
  "t-shirts": "t-shirt",
  tshirt: "t-shirt",
  tshirts: "t-shirt",
  tee: "t-shirt",
  tees: "t-shirt",
  hoodies: "hoodie",
  jackets: "jacket",
  shirts: "shirt",
  sweaters: "sweater",
  sweatshirts: "sweatshirt",
  sneaker: "sneakers",
  shoe: "shoes",
  belts: "belt",
  bags: "bag",
  wallets: "wallet",
  caps: "cap",
  hats: "hat",
  sock: "socks",
  glove: "gloves",
  scarves: "scarf",
  watches: "watch",
  necklaces: "necklace",
  bracelets: "bracelet",
  rings: "ring",
  sets: "set",
  vests: "vest",
  coats: "coat",
  boot: "boots",
  sandal: "sandals",
  slipper: "slippers",
  loafer: "loafers",
  gray: "grey",
  style: "styles",
  "long-sleeve": "long sleeve",
  "short-sleeve": "short sleeve",
  "zip up": "zip-up",
  "zip hoodie": "zip-up hoodie",
  puffer: "down jacket",
  polo: "polo shirt",
  "short sleeve": "short sleeve",
  "polo shirt": "polo shirt",
  short: "shorts",
  trainers: "sneakers",
  handbag: "bag",
  clothes: "clothing",
};
const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
export function productTitle(raw: string, lang: string) {
  const glossary = (glossaries as Record<string, Record<string, string>>)[lang];
  if (!glossary) return raw;
  const names: string[] = [];
  let title = raw.replace(
    protectedNames,
    (name) => `\uE000${names.push(name) - 1}\uE001`,
  );
  // Normalize only whole words; never change substrings inside a brand/model.
  const aliasPattern = new RegExp(
    "(?<![\\p{L}\\p{N}_])(" +
      Object.keys(aliases)
        .sort((a, b) => b.length - a.length)
        .map(esc)
        .join("|") +
      ")(?![\\p{L}\\p{N}_])",
    "giu",
  );
  title = title.replace(aliasPattern, (word) => aliases[word.toLowerCase()]);
  const pattern = new RegExp(
    "(?<![\\p{L}\\p{N}_])(" +
      Object.keys(glossary)
        .sort((a, b) => b.length - a.length)
        .map(esc)
        .join("|") +
      ")(?![\\p{L}\\p{N}_])",
    "giu",
  );
  return title
    .replace(pattern, (word) => glossary[word.toLowerCase()])
    .replace(/\uE000(\d+)\uE001/g, (_, i) => names[Number(i)]);
}
