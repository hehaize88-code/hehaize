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
export function translateProductTitle(raw, lang, glossaries, fullTitles = {}) {
  raw=String(raw||'').replace(/&amp;/gi,'&').replace(/#[^\s#]+/g,'').replace(/\s+/g,' ').replace(/Ture Religion/gi,'True Religion').replace(/\bpans\b/gi,'pants').trim();
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

// Option labels keep seller numbering, model codes and brand names intact.
const optionColorKeys=['purple','orange','navy','khaki','gold','silver','cream','burgundy','light','dark'];
const optionColorValues={
 zh:['紫色','橙色','藏蓝色','卡其色','金色','银色','奶油色','酒红色','浅','深'],
 de:['Lila','Orange','Marineblau','Khaki','Gold','Silber','Creme','Bordeaux','Hell','Dunkel'],
 pl:['Fioletowy','Pomarańczowy','Granatowy','Khaki','Złoty','Srebrny','Kremowy','Bordowy','Jasny','Ciemny'],
 es:['Morado','Naranja','Azul marino','Caqui','Dorado','Plateado','Crema','Burdeos','Claro','Oscuro'],
 it:['Viola','Arancione','Blu navy','Kaki','Oro','Argento','Crema','Bordeaux','Chiaro','Scuro'],
 fr:['Violet','Orange','Bleu marine','Kaki','Doré','Argenté','Crème','Bordeaux','Clair','Foncé'],
 pt:['Roxo','Laranja','Azul-marinho','Caqui','Dourado','Prateado','Creme','Bordô','Claro','Escuro'],
 ro:['Mov','Portocaliu','Bleumarin','Kaki','Auriu','Argintiu','Crem','Bordo','Deschis','Închis'],
 sv:['Lila','Orange','Marinblå','Khaki','Guld','Silver','Gräddvit','Vinröd','Ljus','Mörk']
};
export function translateOptionLabel(raw,lang,glossaries){
 const colors=['black','white','blue','red','green','grey','pink','brown','yellow','beige',...optionColorKeys];
 const dictionary=Object.fromEntries(colors.map((key,i)=>[key,i<10?(glossaries[lang]?.[key]||key):(optionColorValues[lang]?.[i-10]||key)]));
 const saved=[];const save=value=>`\uE000${saved.push(value)-1}\uE001`;
 let value=String(raw||'').replace(protectedNames,save).replace(/\b(?=[A-Za-z0-9_-]*[A-Za-z])(?=[A-Za-z0-9_-]*\d)[A-Za-z0-9]+(?:[-_][A-Za-z0-9]+)+\b/g,save);
 const chinese=Object.fromEntries(colors.map(key=>[glossaries.zh?.[key]||optionColorValues.zh[optionColorKeys.indexOf(key)],key]).filter(([key])=>key&&key.length>1));
 const sourcePattern=new RegExp(Object.keys(chinese).sort((a,b)=>b.length-a.length).map(esc).join('|'),'g');
 value=value.replace(sourcePattern,color=>save(lang==='zh'?dictionary[chinese[color]]:' '+dictionary[chinese[color]]+' '));
 value=value.replace(/\bgray\b/gi,'grey');
 const colorPattern=colors.filter(key=>!['light','dark'].includes(key)).join('|');
 value=value.replace(new RegExp(`\\b(${colorPattern})\\s+and\\s+(?=(?:${colorPattern})\\b)`,'gi'),'$1 / ');
 value=value.replace(new RegExp(`\\b(light|dark)\\s+(${colorPattern})\\b`,'gi'),(_,tone,color)=>{
  const a=dictionary[tone.toLowerCase()],b=dictionary[color.toLowerCase()];
  return save(lang==='zh'?a+b:['de','sv'].includes(lang)?a+b.toLowerCase():['es','it','fr','pt','ro'].includes(lang)?b+' '+a.toLowerCase():a+' '+b.toLowerCase());
 });
 const pattern=new RegExp(`\\b(${colorPattern})\\b`,'gi');
 return value.replace(pattern,color=>dictionary[color.toLowerCase()]).replace(/\uE000(\d+)\uE001/g,(_,i)=>saved[Number(i)]).replace(/\s+/g,' ').trim();
}
