import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {localizeStaticDocument} from '../scripts/complete-locales.mjs';
import {localeList,htmlLocale} from '../public/assets/locale-core.mjs';
const home=readFileSync('out/index.html','utf8');
const source=readFileSync('out/articles/index.html','utf8').replace('</main>','<a href="https://example.com/item?a=1&amp;b=2">External</a></main>');
for(const [code] of localeList){
 const html=localizeStaticDocument(source,'/articles/',code,{'Articles':'文章','Hubbuy Articles':'Hubbuy 文章'}),prefix=code==='en'?'':'/'+code;
 assert.ok(localizeStaticDocument(home,'/',code,{}).includes('data-locale="'+code+'"'));
 assert.ok(html.includes('<html lang="'+htmlLocale(code)+'"'));
 assert.ok(html.includes('rel="canonical" href="https://hubbuy-sheet.com'+prefix+'/articles/"'));
 const alternates=[...html.matchAll(/rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)];assert.equal(alternates.length,25);
 const menu=[...html.matchAll(/<a\b[^>]*data-locale-code="([^"]+)"[^>]*>/g)];assert.equal(menu.length,24);assert.equal(menu.filter(x=>x[0].includes('aria-current="page"')).length,1);
 assert.ok(menu.find(x=>x[1]===code)[0].includes('aria-current="page"'));
 for(const [other] of localeList){const a=menu.find(x=>x[1]===other)[0];assert.ok(a.includes('href="'+(other==='en'?'':'/'+other)+'/articles/"'));}
 assert.ok(html.includes('href="'+prefix+'/guides/shipping'));assert.ok(!html.includes('/'+code+'/assets/'));assert.ok(!html.includes('self.__next_f'));assert.ok(html.includes('/assets/experience.js'));assert.ok(html.includes('https://example.com/item?a=1&amp;b=2'));assert.ok(!html.includes('&amp;amp;'));
 for(const json of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g))assert.ok(JSON.parse(json[1])['@type']);
}
console.log('PASS static localization: 24 same-route language menus, one selected language, 25 reciprocal alternates, canonical URLs, native language codes, safe assets and no English hydration.');
