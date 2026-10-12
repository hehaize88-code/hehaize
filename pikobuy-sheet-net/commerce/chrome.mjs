export const LANGUAGES = ['en','de','fr','es','it','pl','pt'];
export const SITE_REGISTER = 'https://www.pikobuy.com/?mode=register&redirect=/home';
export const NAMES = {en:'English',de:'Deutsch',fr:'Français',es:'Español',it:'Italiano',pl:'Polski',pt:'Português'};
export const CHROME = {
 en:['Register on Pikobuy','Home','Guides','QC photos','Shipping','Articles','Independent product research. Not operated by or affiliated with Pikobuy.'],
 de:['Bei Pikobuy registrieren','Startseite','Anleitungen','QC-Bilder','Versand','Artikel','Unabhängige Produktrecherche. Nicht von Pikobuy betrieben oder mit Pikobuy verbunden.'],
 fr:["S’inscrire sur Pikobuy",'Accueil','Guides','Photos QC','Livraison','Articles','Recherche indépendante de produits. Ce site n’est ni exploité par Pikobuy ni affilié à Pikobuy.'],
 es:['Registrarse en Pikobuy','Inicio','Guías','Fotos QC','Envíos','Artículos','Investigación independiente de productos. Este sitio no está operado por Pikobuy ni afiliado a la plataforma.'],
 it:['Registrati su Pikobuy','Home','Guide','Foto QC','Spedizione','Articoli','Ricerca indipendente di prodotti. Sito non gestito da Pikobuy né affiliato alla piattaforma.'],
 pl:['Zarejestruj się w Pikobuy','Strona główna','Poradniki','Zdjęcia QC','Wysyłka','Artykuły','Niezależny katalog produktów. Witryna nie jest zarządzana przez Pikobuy ani z nim powiązana.'],
 pt:['Registar no Pikobuy','Início','Guias','Fotos QC','Envio','Artigos','Pesquisa independente de produtos. Este site não é operado pelo Pikobuy nem afiliado à plataforma.']
};
const escChrome=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function navigation(lang='en') {
 const p=lang==='en'?'':`/${lang}`,t=CHROME[lang]||CHROME.en;
 return [['Spreadsheet',p+'/catalog/'],[t[2],p+'/guides/'],[t[3],p+'/guides/pikobuy-qc-checklist/'],[t[4],p+'/guides/pikobuy-shipping-cost/'],[t[5],p+'/seo-articles/'],['FAQ',p+'/faq/']];
}
export function nav(lang,path,query='',available=null) {
 const t=CHROME[lang]||CHROME.en,p=lang==='en'?'':`/${lang}`;
 return `<header class="piko-header"><div class="piko-brand-actions"><a class="piko-brand" href="${p||'/'}" aria-label="${t[1]}"><img src="/pikobuy-logo.png" width="204" height="48" alt="Pikobuy"></a><a class="piko-register" href="${escChrome(SITE_REGISTER)}" target="_blank" rel="noopener noreferrer" data-track-event="register_click">${t[0]} ↗</a></div><nav aria-label="Navigation">${navigation(lang).map(([label,href])=>`<a href="${href}">${label}</a>`).join('')}</nav><details class="piko-language"><summary aria-label="Language">${lang.toUpperCase()} ⌄</summary><div>${LANGUAGES.map(l=>{const prefix=l==='en'?'':`/${l}`;let route=prefix+path;if(available&&!available.has(route))route=prefix+'/seo-articles/';return `<a href="${route}${escChrome(query)}" hreflang="${l}" ${l===lang?'aria-current="true"':''}>${NAMES[l]}</a>`}).join('')}</div></details></header>`;
}
export function footer(lang) {
 const t=CHROME[lang]||CHROME.en,p=lang==='en'?'':`/${lang}`;
 return `<footer class="piko-footer"><p>${t[6]}</p><nav>${navigation(lang).map(([label,href])=>`<a href="${href}">${label}</a>`).join('')}<a href="${p}/about/">pikobuy-sheet.net</a></nav><small>© 2026 Pikobuy Sheet</small></footer>`;
}
