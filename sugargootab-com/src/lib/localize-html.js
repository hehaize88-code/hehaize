export function localizeCatalogueHtml(html, dictionary, locale) {
 const decodeText = s => s.replace(/&(#x[\da-f]+|#\d+|quot|apos|amp|lt|gt|nbsp);/gi, (_, entity) => {
  if(entity[0]==='#'){const code=entity[1].toLowerCase()==='x'?parseInt(entity.slice(2),16):Number(entity.slice(1));return code>0&&code<=0x10ffff?String.fromCodePoint(code):'\ufffd';}
  return ({quot:'"',apos:"'",amp:'&',lt:'<',gt:'>',nbsp:' '})[entity.toLowerCase()];
 });
 const encodeText = s => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const translate = s => {
  const trimmed=s.trim(),value=decodeText(trimmed); let found;
  // Reuse reviewed base labels for decorated buttons and numbered photos.
  const parts=value.match(/^(←\s*)?(.+?)(\s*[↗→]|\s+\d+)?$/);
  if(parts&&(parts[1]||parts[3])&&dictionary[parts[2]])found=(parts[1]||'')+dictionary[parts[2]]+(parts[3]||'');
  if(!found&&value.includes(' | ')){
   const sections=value.split(' | ');
   if(sections.every(part=>dictionary[part]||part==='SugargooTab'))found=sections.map(part=>dictionary[part]||part).join(' | ');
  }
  if(!found)found=dictionary[value];
  if(!found&&/^Hubbuy (.+) Spreadsheet$/.test(value)){const category=value.match(/^Hubbuy (.+) Spreadsheet$/)[1];found=(dictionary['Hubbuy spreadsheet']||'Hubbuy Spreadsheet')+' · '+(dictionary[category]||category);}
  if(!found&&value.startsWith('Hubbuy ')&&dictionary[value.slice(7)])found='Hubbuy '+dictionary[value.slice(7)];
  if(!found&&value.includes(' | '))found=value.split(' | ').map(part=>dictionary[part]||part).join(' | ');
  return found?s.replace(trimmed,encodeText(found)):s;
 };
 const protectedBlocks = [];
 html=html.replace(/<h1\b[^>]*data-product-title[^>]*>[\s\S]*?<\/h1>|<img\b[^>]*data-product-title[^>]*>/gi,value=>`<!--LOCALE_BLOCK_${protectedBlocks.push(value)-1}-->`);
 html=html.replace(/<a\b[^>]*(?:data-locale-code|data-agent)="[^"]+"[^>]*>[\s\S]*?<\/a>/gi,value=>`<!--LOCALE_BLOCK_${protectedBlocks.push(value)-1}-->`);
 html = html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, value => {
  if(value.includes('application/ld+json'))try{const data=JSON.parse(value.replace(/^<script[^>]*>|<\/script>$/gi,''));const walk=(v,key='')=>Array.isArray(v)?v.map(x=>walk(x,key)):v&&typeof v==='object'?Object.fromEntries(Object.entries(v).map(([k,x])=>[k,walk(x,k)])):typeof v==='string'&&!key.startsWith('@')?(key==='inLanguage'?locale:dictionary[v]||v):v;value='<script type="application/ld+json">'+JSON.stringify(walk(data)).replaceAll('<','\\u003c')+'</script>';}catch{}
  return `<!--LOCALE_BLOCK_${protectedBlocks.push(value)-1}-->`;
 });
 html = html.replace(/>([^<>]+)</g, (_, value) => '>' + translate(value) + '<')
  .replace(/<meta\b[^>]*>/gi,tag=>tag.replace(/content="([^"]*)"/,(whole,value)=>{const decoded=decodeText(value);const translated=dictionary[decoded]||decoded.split('. ').map(part=>dictionary[part]||part).join('. ');return `content="${encodeText(translated)}"`;}))
  .replace(/\b(alt|aria-label|title|placeholder)="([^"]*)"/g, (_, key, value) => `${key}="${translate(value)}"`)
  .replace(/<html lang="[^"]+"/, `<html lang="${locale}"`)
  .replace(/<!--LOCALE_BLOCK_(\d+)-->/g, (_, n) => protectedBlocks[Number(n)]);
 return html;
}
