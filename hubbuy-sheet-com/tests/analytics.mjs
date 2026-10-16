import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';
const script = readFileSync('public/analytics.js', 'utf8');
function page(url) {
 const listeners = {};
 class Form { constructor(action, q) { this.action = action; this.q = q; } }
 const context = vm.createContext({
  location: new URL(url), window: {}, URL, Date, HTMLFormElement: Form,
  FormData: class { constructor(form) { this.form = form; } get() { return this.form.q; } },
  document: { addEventListener(type, listener) { (listeners[type] ||= []).push(listener); } },
 });
 const run = () => vm.runInContext(script, context);
 const dispatch = (type, event) => (listeners[type] || []).forEach(listener => listener(event));
 run();
 return {
  context, run,
  events: () => Array.from(context.window.dataLayer || [], args => Array.from(args)).filter(args => args[0] === 'event'),
  click(href, sort = false) { const anchor = { href, closest(selector) { return selector === 'a[href]' || (selector === '.sort-row' && sort) ? anchor : null; } }; dispatch('click', { target: anchor }); },
  submit(action, q) { dispatch('submit', { target: new Form(action, q) }); },
  image(detail) { dispatch('hubbuy:image-search', { detail }); },
 };
}
const excluded = page('https://another-site.example/');
excluded.click('https://hubbuy.com/signUp');
assert.equal(excluded.context.window.dataLayer, undefined);
for (const locale of ['en', 'pt-br', 'de']) {
 const prefix = locale === 'en' ? '' : '/' + locale;
 const origin = 'https://hubbuy-sheet.com';
 const p = page(origin + prefix + '/');
 p.run();
 const configs = Array.from(p.context.window.dataLayer, args => Array.from(args)).filter(args => args[0] === 'config');
 assert.equal(configs.length, 1, 'one GA config even when loaded twice');
 assert.equal(configs[0][1], 'G-QY8MM7VZV2');
 p.click('https://www.hubbuy.com/product/2/7853208944?utm_content=7853208944');
 p.click('https://hubbuy.com/signUp');
 p.click(origin + prefix + '/catalog/shoes/3460.html');
 p.click(origin + prefix + '/catalog/image-search/');
 p.click(origin + prefix + '/articles/hubbuy-image-search-find-product-links/');
 p.click(origin + prefix + '/catalog/shoes/?sort=price', true);
 p.click(origin + prefix + '/catalog/shoes/?sort=price&page=2');
 p.submit(origin + prefix + '/catalog/', '7853208944');
 p.submit(origin + prefix + '/catalog/', 'https://www.hubbuy.com/product/2/7853208944?private=example');
 p.submit(origin + prefix + '/catalog/', 'grey shoes');
 p.submit(origin + prefix + '/catalog/', '');
 p.submit('https://example.com/catalog/', 'ignored');
 p.image({ status: 'complete', count: 24, filename: 'personal.jpg', file: 'not-for-analytics' });
 p.image({ status: 'error', reason: 'file' });
 p.image({ status: 'error', reason: 'index' });
 p.click('https://hubbuy.com.example.com/signUp');
 const events = p.events();
 assert.deepEqual(events.map(e => e[1]), ['hubbuy_product_click', 'hubbuy_signup_click', 'catalog_product_click', 'image_search_open', 'article_internal_click', 'catalog_sort', 'site_search_submit', 'site_search_submit', 'site_search_submit', 'image_search_complete', 'image_search_error', 'image_search_error']);
 assert.equal(events[0][2].product_id, '7853208944');
 assert.equal(events[2][2].catalog_id, '3460');
 assert.deepEqual(events.filter(e => e[1] === 'site_search_submit').map(e => e[2].search_method), ['product_id', 'link', 'text']);
 assert.ok(events.every(e => e[2].content_language === locale && e[2].page_path === prefix + '/'));
 assert.ok(!JSON.stringify(events).includes('personal.jpg'));
 assert.ok(!JSON.stringify(events).includes('private=example'));
 assert.ok(!events.some(e => ['purchase', 'sign_up', 'page_view'].includes(e[1])), 'clicks do not assert purchases, completed registration or another page view');
}
const worker = readFileSync('_worker.js', 'utf8');
assert.ok(worker.includes('/analytics.js?v=20261016-growth-v1'));
assert.ok(!readFileSync('app/layout.js', 'utf8').includes("gtag('config'"));
assert.ok(!readFileSync('scripts/postprocess-locales.mjs', 'utf8').includes("gtag('config'"));
console.log('PASS analytics: one initializer, hostname scope, 3 languages, product/signup/search/image/sort events, pagination exclusion and no custom-event query or file payload.');
