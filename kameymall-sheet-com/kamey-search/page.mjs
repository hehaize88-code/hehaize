import {localePath,translateTexts} from '../kamey-language/index.mjs';
import {products} from '../kamey-product/products.mjs';

const strings = {
  title:'Image search', choose:'Choose an image', file:'JPEG, PNG, WebP or GIF · 20 MB',
  hint:'Upload a product photo to find matching styles and QC photos.',
  progress:'Searching images…', invalid:'Choose a JPEG, PNG, WebP or GIF image under 20 MB.',
  failed:'The search could not finish. Please try again.', weak:'Closest visual matches',
  results:'Matching products', finds:'Finds', gallery:'QC photos', style:'Styles', seller:'Product photos', cover:'Product photos'
};
function esc(value) {
  return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
export async function searchPage(request,lang='en') {
  const keys=Object.keys(strings);
  const translated=await translateTexts([...Object.values(strings),...products.map(p=>p.name)],lang);
  const labels=Object.fromEntries(keys.map((key,i)=>[key,translated[i]]));
  const destinations=Object.fromEntries(products.map((p,i)=>[p.slug,[translated[keys.length+i],localePath('/products/'+p.slug+'/',lang)]]));
  const settings=JSON.stringify({labels,destinations}).replace(/</g,'\\u003c');
  return new Response(`<!doctype html><html lang="${esc(lang)}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(labels.title)} | KameyMall Sheet</title><link rel="stylesheet" href="/kamey-search/search.css"></head><body><header><nav><a href="${esc(localePath('/',lang))}"><img src="/kameymall-logo.png" alt="KameyMall" width="183" height="34"></a><a href="${esc(localePath('/finds/',lang))}">${esc(labels.finds)}</a><span data-km-menu></span></nav></header><main><h1>${esc(labels.title)}</h1><p>${esc(labels.hint)}</p><section class="uploader"><label for="photo">${esc(labels.choose)}</label><input id="photo" type="file" accept="image/jpeg,image/png,image/webp,image/gif"><small>${esc(labels.file)}</small><img id="preview" hidden alt=""></section><p id="status" role="status" aria-live="polite"></p><div id="matches"></div></main><script type="application/json" id="search-settings">${settings}</script><script type="module" src="/kamey-search/search.mjs"></script></body></html>`,{headers:{'Content-Type':'text/html; charset=UTF-8'}});
}
