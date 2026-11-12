const patterns=new Map();


// Translate descriptive listing text, preserving brand/model identities. This
// shared function is shared by cards, headings, image alt and SEO.
const protectedNames = /\b(?:Chrome Hearts|Stone Island|Palm Angels|Off[- ]White|The North Face|White Fox|New Balance|Black Diamond|Golden Goose|Canada Goose|Blue Blue Japan|Red Wing|Pink Palm Puff|Louis Vuitton|Air Force \d+|Air Jordan \d+|Free Metcon\s*\d*|XLG Runner Deluxe|Cloud[- ]flake|Royal Pop|Shark Breeder|Valley Dreams|Vale Dreams|Fear of God|Anti Social Social Club|A Cold Wall|Blue Sky|Comme des Garcons|Comme des Garçons|Top Stoney|Stone Island|Polo Ralph Lauren|Ralph Lauren|Golden State Warriors|Chicago Bulls|New York Yankees|Los Angeles Lakers|Louis Vuitton|Tom Ford|Saint Laurent|Victoria.?s Secret)\b/gi;
const aliases = {
  pans:'pants', trouser:'pants', trousers:'pants', joggers:'pants',
  't shirts':'t-shirt', 't-shirts':'t-shirt', tshirt:'t-shirt', tshirts:'t-shirt', tee:'t-shirt', tees:'t-shirt',
  hoodies:'hoodie', jackets:'jacket', shirts:'shirt', sweaters:'sweater', sweatshirts:'sweatshirt',
  sneaker:'sneakers', shoe:'shoes', belts:'belt', bags:'bag', wallets:'wallet', caps:'cap', hats:'hat',
  sock:'socks', glove:'gloves', scarves:'scarf', watches:'watch', necklaces:'necklace', bracelets:'bracelet', rings:'ring',
  sets:'set', vests:'vest', coats:'coat', boot:'boots', sandal:'sandals', slipper:'slippers', loafer:'loafers',
  gray:'grey', style:'styles', 'high-quality':'high quality', 'long-sleeve':'long sleeve', 'short-sleeve':'short sleeve',
  'zip up':'zip-up', 'zip hoodie':'zip-up hoodie', 'puffer':'down jacket', 'polo':'polo shirt',
  'short':'shorts', 'suits':'suit', 'tops':'top', 'short sleeved':'short sleeve', 'long sleeved':'long sleeve', 'colors':'color', 'sleeves':'sleeve', 'fashionable':'fashion', 'clothes':'clothing', 'trainers':'sneakers', 'handbag':'bag',
};
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
// Older full-title dictionaries sometimes left descriptions untranslated or
// translated a brand as an ordinary word. Prefer the product glossary in those
// cases, and preserve the source spelling of known brand identities.
const identityNames = /\b(?:Dsquared(?:\s*2)?|Moncler|Diesel|Nike|Adidas|Asics|Timberland|Louis Vuitton|Gucci|Dior|Prada|Balenciaga|Burberry|Stussy|Corteiz|Stone Island|Chrome Hearts|Ralph Lauren|New Balance|Off[- ]White)\b/gi;
export function localizedProductTitle(raw, lang, dictionary, glossaries) {
 const exact = dictionary[raw];
 const brands = String(raw).match(identityNames) || [];
 const identityPreserved = exact && brands.every(name => exact.toLowerCase().includes(name.toLowerCase()));
 if (exact && exact.trim().toLowerCase() !== String(raw).trim().toLowerCase() && identityPreserved && !/\bpuffer\b/i.test(raw)) return exact;
 return translateProductTitle(raw,lang,glossaries);
}
export function translateProductTitle(raw, lang, glossaries, fullTitles = {}) {
  raw=String(raw||'').replace(/&amp;/gi,'&').replace(/#[^\s#]+/g,'').replace(/\s+/g,' ').trim();
  const exact=fullTitles[lang]?.[raw.toLowerCase()];
  if(exact)return exact;
  const glossary = glossaries[lang];
  if (!glossary) return raw.replace(/Ture Religion/gi,'True Religion').replace(/\bpans\b/gi,'pants');
  if(glossary[raw.toLowerCase()])return glossary[raw.toLowerCase()];
  const names = [];
  let title = raw.replace(/Ture Religion/gi,'True Religion').replace(protectedNames, name => `\uE000${names.push(name)-1}\uE001`);
  // Normalize only whole words; never change substrings inside a brand/model.
  const aliasPattern = new RegExp('(?<![\\p{L}\\p{N}_])(' + Object.keys(aliases).sort((a,b)=>b.length-a.length).map(esc).join('|') + ')(?![\\p{L}\\p{N}_])','giu');
  title = title.replace(aliasPattern, word => aliases[word.toLowerCase()]);
  let pattern = patterns.get(lang);
  if(!pattern) { pattern = new RegExp('(?<![\\p{L}\\p{N}_])(' + Object.keys(glossary).sort((a,b)=>b.length-a.length).map(esc).join('|') + ')(?![\\p{L}\\p{N}_])','giu'); patterns.set(lang,pattern); }
  return title.replace(pattern, word => glossary[word.toLowerCase()])
    .replace(/\uE000(\d+)\uE001/g,(_, i)=>names[Number(i)]);
}
