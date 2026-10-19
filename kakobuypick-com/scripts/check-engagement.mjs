import assert from 'node:assert/strict';
import {parseHTML} from 'linkedom';
import {installEngagementTracking} from '../src/scripts/engagement.js';
const {document,window}=parseHTML(`<html lang="pl"><body>
<a id="product" href="/pl/products/jackets/123.html"><span>Product</span></a>
<a id="category" href="/pl/category/shoes/">Shoes</a>
<a id="article" href="/pl/articles/kakobuy-jacket-finds/">Guide</a>
<a id="buy" href="https://item2.kakobuy.com/item/details?url=private-source&amp;affcode=rf8x8">Buy</a>
<a id="register" href="https://kakobuy.com/register">Register</a>
<a id="source" href="https://weidian.com/item.html?itemID=123">Source</a>
<form class="search-form"><input name="q" value="  winter jacket  "></form>
</body></html>`);
const events=[];
installEngagementTracking(document,new URL('https://kakobuypick.com/pl/products/jackets/123.html'),(name,params)=>events.push({name,params}));
for(const selector of ['#product span','#category','#article','#buy','#register','#source'])document.querySelector(selector).dispatchEvent(new window.Event('click',{bubbles:true}));
document.querySelector('form').dispatchEvent(new window.Event('submit',{bubbles:true}));
assert.deepEqual(events.map(e=>e.name),['select_item','category_click','article_open','outbound_product_click','registration_click','catalog_search']);
assert.deepEqual(events[0].params.items,[{item_id:'123',item_category:'jackets'}]);
assert.equal(events[3].params.item_id,'123');
assert.equal(events[5].params.search_length,13);
assert.ok(events.every(e=>e.params.language==='pl'));
assert.ok(!JSON.stringify(events).includes('private-source'));
assert.ok(!JSON.stringify(events).includes('winter jacket'));
assert.ok(!events.some(e=>['purchase','sign_up','view_search_results'].includes(e.name)));
document.querySelector('input').value='   ';
document.querySelector('form').dispatchEvent(new window.Event('submit',{bubbles:true}));
assert.equal(events.length,6);
console.log('PASS real click/search intent, localized paths, no purchase/signup claim, no raw query/source URL, no empty-search event');
