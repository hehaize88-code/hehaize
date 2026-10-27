import assert from 'node:assert/strict';
import { DOMParser } from 'linkedom';
import worker from '../dist/server/index.js';

const origin = 'https://kakobuypick.com';
const request = path => worker.fetch(new Request(origin + path), {}, {});
const originalFetch = globalThis.fetch;
let sourceMode = 'ok';
const card = (path, image='/media/products/test.jpg') => `<article class="product-card"><a class="product-title" href="${path}"><h3>Source product</h3></a><img src="${image}"><span class="product-price">$12.00</span></article>`;
globalThis.fetch = async input => {
  const url = new URL(String(input));
  assert.equal(url.origin, 'https://cnbuycha.com');
  assert.equal(url.pathname, '/AllProducts/');
  if (sourceMode === 'error') return new Response('Unavailable', {status: 503});
  if (sourceMode === 'empty') return new Response('<div class="results-summary">0 products</div>');
  return new Response('<div class="results-summary">4 products</div>' +
    card('/jackets/123.html') + card('/jackets/123.html') +
    card('/unknown/456.html') + card('/shoes/789.html', '/placeholder.jpg'));
};
try {
  const response = await request('/sitemap-products.xml');
  assert.equal(response.status, 200);
  const text = await response.text();
  const xml = new DOMParser().parseFromString(text, 'text/xml');
  const urls = [...xml.querySelectorAll('loc')].map(el => el.textContent);
  assert.equal(urls.length, 24);
  assert.equal(new Set(urls).size, 24);
  assert.ok(urls.includes(origin + '/products/jackets/123.html'));
  assert.ok(urls.includes(origin + '/it/products/jackets/123.html'));
  assert.ok(urls.every(url => url.endsWith('/products/jackets/123.html')));
  assert.ok(!text.includes('lastmod'));
  for (const mode of ['empty', 'error']) {
    sourceMode = mode;
    const unavailable = await request('/sitemap-products.xml');
    assert.equal(unavailable.status, 503, mode);
    assert.equal(unavailable.headers.get('cache-control'), 'no-store');
    assert.equal(unavailable.headers.get('retry-after'), '300');
    assert.equal((await request('/sitemap.xml')).status, 200);
  }
  console.log('PASS product sitemap: real source paths, 24 locales, deduplication, unusable-card exclusion, source failure isolation');
} finally {
  globalThis.fetch = originalFetch;
}
