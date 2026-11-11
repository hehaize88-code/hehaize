const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const prefix=lang=>lang==='en'?'':'/'+lang;
const money=value=>'$'+value;
export function purchasingPlatforms(sourceId) {
 if (!/^\d{5,20}$/.test(String(sourceId))) return [];
 const id = String(sourceId), source = encodeURIComponent(`https://weidian.com/item.html?itemID=${id}`);
 return [
  ['Superbuy', `https://www.superbuy.com/en/page/buy/?url=${source}`],
  ['CSSBuy', `https://www.cssbuy.com/shop/goodsDetail?type=micro&id=${id}`],
  ['Kakobuy', `https://kakobuy.com/item/details?url=${source}`],
  ['USFans', `https://www.usfans.com/product/3/${id}`],
  ['HubBuy', `https://www.hubbuy.com/product/2/${id}`],
  ['Oopbuy', `https://oopbuy.com/goods/details?id=${id}&channel=weidian`],
  ['Hipobuy', `https://hipobuy.com/product/weidian/${id}`],
  ['Litbuy', `https://litbuy.com/product/weidian/${id}`],
  ['Lovegobuy', `https://www.lovegobuy.com/product?id=${id}&shop_type=weidian`],
  ['Hoobuy', `https://hoobuy.com/product/2/${id}`],
  ['OrientDig', `https://orientdig.com/product/?shop_type=weidian&id=${id}`],
  ['Joyagoo', `https://joyagoo.com/product?id=${id}&platform=WEIDIAN`],
 ];
}
export function renderProductDetail(product,lang,t,buy) {
 const im=(url,i,kind='catalogue')=>`<button class="photo-tile" type="button" data-photo-src="${escapeHtml(url)}" data-photo-kind="${kind}" aria-label="Enlarge photo ${i+1}"><img src="${escapeHtml(url)}" alt="${escapeHtml(product.title)} ${i+1}" width="160" height="160" referrerpolicy="no-referrer" loading="lazy"><span>${i+1}</span></button>`;
 return `<a class="back" href="${prefix(lang)}/spreadsheet/">← ${t.back}</a>
<section class="catalog-detail" data-product-detail data-source-id="${escapeHtml(product.sourceId)}" data-source-url="${escapeHtml(product.sourceUrl)}">
 <div class="catalog-gallery"><div class="section-caption"><h2>Product photos</h2><span>${product.images.length}</span></div>
  <div class="gallery-main" tabindex="0" role="region" aria-label="Product photos"><button type="button" data-gallery-prev aria-label="Previous photo">‹</button><img id="gallery-main" src="${escapeHtml(product.images[0]||'')}" alt="${escapeHtml(product.title)}" width="800" height="800"><button type="button" data-gallery-next aria-label="Next photo">›</button><button class="gallery-zoom" type="button" data-enlarge aria-label="Enlarge photo">⤢</button><span class="gallery-counter" aria-live="polite">1 / ${product.images.length}</span></div>
  <div class="gallery-thumbs" aria-label="Product photos">${product.images.map((url,i)=>`<button type="button" data-gallery-index="${i}" aria-label="Image ${i+1}" aria-current="${i===0}"><img src="${escapeHtml(url)}" alt="" width="120" height="120" loading="lazy"></button>`).join('')}</div>
 </div>
 <div class="catalog-product-info"><p class="catalog-eyebrow">SUGARGOO</p><h1>${escapeHtml(product.title)}</h1><p class="product-source-id">ID: <strong>${escapeHtml(product.sourceId)}</strong></p>
  <p class="detail-price"><span data-detail-price data-price-amount="${escapeHtml(product.price)}" data-price-currency="USD">${money(product.price)}</span> <small data-currency-code>USD</small></p><p class="detail-price-note" data-source-price></p><p class="detail-price-note">Estimated conversion. Shipping, taxes and platform fees are not included.</p><p class="rate-status" data-rate-status role="status"></p>
  ${buy?`<a class="buy-button" data-track="outbound_purchase_click" data-destination="sugargoo" href="${escapeHtml(buy)}" target="_blank" rel="noopener noreferrer" >${t.buy} ↗</a>`:''}
  <div class="product-action-row"><details class="agent-picker"><summary>Other buying agents <span aria-hidden="true">⌄</span></summary><div class="agent-options"><p>Open this product with another buying agent. Confirm its price and available options there.</p><label class="sr-only" for="agent-query">Search buying agents</label><input id="agent-query" type="search" placeholder="Search buying agents"><div class="agent-list">${purchasingPlatforms(product.sourceId).map(([name,href])=>`<a href="${escapeHtml(href)}" data-agent="${name.toLowerCase()}" target="_blank" rel="noopener noreferrer">${name} <span aria-hidden="true">↗</span></a>`).join('')}</div><p data-no-agents hidden>No buying agents found.</p></div></details><button type="button" class="copy-source" data-copy-source>Copy Weidian link</button></div>
  <p class="copy-status" data-copy-status role="status"></p><textarea data-copy-fallback hidden readonly aria-label="Original Weidian listing"></textarea>
  <section class="product-styles" aria-labelledby="styles-title"><div class="section-caption"><h2 id="styles-title">Styles</h2><span data-style-count></span></div><p data-options-status role="status">Loading styles…</p><button data-options-retry type="button" hidden>Retry</button><div class="style-grid" tabindex="0" role="group" aria-label="Styles" data-style-grid></div><div data-option-groups></div><p class="selected-option" data-selected-option role="status"></p><p class="style-note">Style photos are a reference. Confirm the selected style and size on the buying platform.</p><a class="original-link" href="${escapeHtml(product.sourceUrl)}" target="_blank" rel="noopener noreferrer">Open on Weidian ↗</a></section>
 </div>
</section>
<section class="product-qc" aria-labelledby="qc-title"><div class="section-caption"><h2 id="qc-title">QC photos</h2><span>0</span></div><div class="qc-empty"><p>No verified QC photos are available from the catalogue source for this item.</p><a href="${prefix(lang)}/qc/">Read the QC guide →</a></div></section>
<section class="source-photos" aria-labelledby="source-photos-title"><div class="section-caption"><h2 id="source-photos-title">Catalogue photos</h2><span>${product.images.length}</span></div><p>These are catalogue reference photos; they are not identified as warehouse QC.</p><div class="source-photo-grid">${product.images.map((url,i)=>im(url,i)).join('')}</div></section>

<dialog class="photo-viewer" aria-label="Product photos"><button type="button" data-close-viewer aria-label="Close">×</button><img alt="${escapeHtml(product.title)}"><button type="button" data-viewer-prev aria-label="Previous photo">‹</button><button type="button" data-viewer-next aria-label="Next photo">›</button><p data-viewer-counter></p></dialog>`;
}
