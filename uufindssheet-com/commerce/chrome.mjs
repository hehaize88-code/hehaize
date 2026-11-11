import {localeList,htmlLocale} from '../public/assets/locale-core.mjs';
import {CURRENCIES} from './experience.mjs';
const htmlEscape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function languageMenu(locale,path,query='',codes=localeList){
 return `<details class="language-picker"><summary aria-label="Language">◎ ${localeList.find(x=>x[0]===locale)?.[2]||'EN'} <span aria-hidden="true">⌄</span></summary><div class="catalog-languages">${codes.map(([code,name])=>`<a data-locale-code="${code}" href="${htmlEscape((code==='en'?'':'/'+code)+path+query)}" hreflang="${htmlLocale(code)}"${code===locale?' aria-current="page"':''}>${name}</a>`).join('')}</div></details>`;
}
export function currencyMenu(){return `<label class="currency-picker"><span class="sr-only">Currency</span><select data-currency-select aria-label="Currency">${CURRENCIES.map(code=>`<option value="${code}">${code}</option>`).join('')}</select></label>`;}
export function nav(locale,path,query=''){
 const p=locale==='en'?'':'/'+locale;
 const editorial=['en','en-gb','de','pl','pt-br'].includes(locale)?p:'';
 return `<header class="catalog-header"><a class="catalog-brand" href="${p}/" aria-label="UUFinds Spreadsheet"><img class="catalog-wordmark" src="/uufinds-official-logo.png" width="208" height="52" alt="UUFinds"></a><nav class="catalog-primary-nav" aria-label="Main navigation"><a href="${p}/catalog/">Products</a><a href="${p}/catalog/image-search/">Search by image</a><a href="${editorial}/guides/uufinds-qc-checklist/">QC Guide</a><a href="${editorial}/how-it-works/">How It Works</a><a href="${editorial}/articles/">Articles</a><a href="${editorial}/faq/">FAQ</a></nav><div class="catalog-actions">${languageMenu(locale,path,query)}${currencyMenu()}<a class="register" href="https://www.uufinds.com/register" target="_blank" rel="noopener noreferrer">Register on UUFinds ↗</a></div></header>`;
}
export function footer(locale){return `<footer class="catalog-footer"><p>Independent spreadsheet. Not operated by UUFinds.</p><a href="${locale==='en'?'':'/'+locale}/catalog/">Browse the full spreadsheet</a></footer>`;}
export function styles(){return '<link rel="stylesheet" href="/catalog.css?v=20261111-all-photos-v2"><script type="module" src="/assets/experience.js?v=20261111-all-photos-v2"></script>';}
