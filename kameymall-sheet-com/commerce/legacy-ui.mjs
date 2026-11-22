import { products } from "../app/site-products.ts";

const paths = new Map(products.map(p => [p.url, "/products/" + p.slug]));
const camera = '<svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M3 7h4l2-3h6l2 3h4v13H3z"/><circle cx="12" cy="13" r="3.5"/></svg>';
const style = `<style>
.hero-search{display:flex;align-items:center}.hero-search input{min-width:0;flex:1}.hero-search .km-camera{display:grid;place-items:center;flex:0 0 42px;width:42px;height:42px;color:inherit;border-radius:10px}.km-camera:hover,.km-camera:focus-visible{background:#fff1e6}
.km-currency{font:inherit;max-width:5rem;min-height:35px;border:1px solid #ddd;background:white;border-radius:8px}.header-actions{flex-wrap:wrap}.language-popover{max-height:55vh;overflow:auto}
</style>`;
const currencyCodes = "CNY USD AUD BRL CAD CHF CZK DKK EUR GBP HKD HUF IDR ILS INR ISK JPY KRW MXN MYR NOK NZD PHP PLN RON SEK SGD THB TRY ZAR TWD VND".split(" ");
function selector(){
 return '<select class="km-currency" aria-label="Currency">'+currencyCodes.map(code=>'<option>'+code+'</option>').join('')+'</select>';
}
export function enhanceLegacy(html, searchPath, localePrefix) {
 const data = Object.fromEntries(products.map(p=>[p.reference,p.cny]));
 return html.replace(/<a\b[^>]*>/gi, tag=>tag.replace(/href="([^"]+)"/, (a,url)=>paths.has(url)?'href="'+localePrefix+paths.get(url)+'"':a))
   .replace(/<form\b[^>]*class="hero-search[^"]*"[^>]*>[\s\S]*?<\/form>/g, form=>form.replace('<button ', '<a class="km-camera" href="'+searchPath+'" aria-label="Image search" title="Image search">'+camera+'</a><button '))
   .replace(/<nav aria-label="Primary navigation">/,s=>s+'<a href="'+searchPath+'">Image search</a>')
   .replace('<details class="language-menu">',selector()+'<details class="language-menu">')
   .replaceAll('href="/favicon.svg"','href="/kameymall-icon.png"')
   .replace('</head>', style+'</head>')
   .replace('</body>','<script type="application/json" id="km-cny">'+JSON.stringify(data)+'</script><script defer src="/km-ui.js"></script></body>');
}
