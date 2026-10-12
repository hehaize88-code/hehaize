export const LANGUAGES = ['en','es','de','fr','it'];
export const SITE_REGISTER = 'https://www.lolobuy.com/index';
export const NAMES = {en:'English',de:'Deutsch',fr:'Français',es:'Español',it:'Italiano',pl:'Polski',pt:'Português'};
export const CHROME = {
 en:['Register on LoloBuy','Home','Guides','QC photos','Shipping','Articles','Independent product research. Not operated by or affiliated with LoloBuy.'],
 de:['Bei LoloBuy registrieren','Startseite','Anleitungen','QC-Bilder','Versand','Artikel','Unabhängige Produktrecherche. Nicht von LoloBuy betrieben oder mit LoloBuy verbunden.'],
 fr:["S’inscrire sur LoloBuy",'Accueil','Guides','Photos QC','Livraison','Articles','Recherche indépendante de produits. Ce site n’est ni exploité par LoloBuy ni affilié à LoloBuy.'],
 es:['Registrarse en LoloBuy','Inicio','Guías','Fotos QC','Envíos','Artículos','Investigación independiente de productos. Este sitio no está operado por LoloBuy ni afiliado a la plataforma.'],
 it:['Registrati su LoloBuy','Home','Guide','Foto QC','Spedizione','Articoli','Ricerca indipendente di prodotti. Sito non gestito da LoloBuy né affiliato alla piattaforma.'],
 pl:['Zarejestruj się w LoloBuy','Strona główna','Poradniki','Zdjęcia QC','Wysyłka','Artykuły','Niezależny katalog produktów. Witryna nie jest zarządzana przez LoloBuy ani z nim powiązana.'],
 pt:['Registar no LoloBuy','Início','Guias','Fotos QC','Envio','Artigos','Pesquisa independente de produtos. Este site não é operado pelo LoloBuy nem afiliado à plataforma.']
};
const escChrome=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function navigation(lang='en') {
 const p=lang==='en'?'':`/${lang}`,t=CHROME[lang]||CHROME.en;
 return [['Spreadsheet',p+'/catalog/'],[{en:'Categories',es:'Categorías',de:'Kategorien',fr:'Catégories',it:'Categorie'}[lang],p+'/categories'],[t[2],p+'/how-it-works'],[t[3],p+'/guides/qc'],[t[4],p+'/guides/shipping'],[t[5],p+'/articles'],['FAQ',p+'/faq']];
}
export function nav(lang,path,query='',available=null) {
 const t=CHROME[lang]||CHROME.en,p=lang==='en'?'':`/${lang}`;
 return `<header class="lolo-header"><div class="lolo-brand-actions"><a class="lolo-brand" href="${p||'/'}" aria-label="${t[1]}"><img src="/lolobuy-official.svg" width="128" height="30" alt="LoloBuy"></a><a class="lolo-register" href="${escChrome(SITE_REGISTER)}" target="_blank" rel="noopener noreferrer" data-track-event="register_click">${t[0]} ↗</a></div><nav aria-label="Navigation">${navigation(lang).map(([label,href])=>`<a href="${href}">${label}</a>`).join('')}</nav><details class="lolo-language"><summary aria-label="Language">${lang.toUpperCase()} ⌄</summary><div>${LANGUAGES.map(l=>{const prefix=l==='en'?'':`/${l}`;let route=prefix+path;if(available&&!available.has(route))route=prefix+'/articles';return `<a data-locale-target="${l}" href="${route}${escChrome(query)}" hreflang="${l}" ${l===lang?'aria-current="true"':''}>${NAMES[l]}</a>`}).join('')}</div></details></header>`;
}
export function footer(lang) {
 const t=CHROME[lang]||CHROME.en,p=lang==='en'?'':`/${lang}`;
 return `<footer class="lolo-footer"><p>${t[6]}</p><nav>${navigation(lang).map(([label,href])=>`<a href="${href}">${label}</a>`).join('')}<a href="${p}/about">lolobuy-sheet.com</a></nav><nav>${[['contact',{en:'Contact',es:'Contacto',de:'Kontakt',fr:'Contact',it:'Contatti'}[lang]],['privacy',{en:'Privacy',es:'Privacidad',de:'Datenschutz',fr:'Confidentialité',it:'Privacy'}[lang]],['terms',{en:'Terms',es:'Condiciones',de:'Bedingungen',fr:'Conditions',it:'Termini'}[lang]]].map(([route,label])=>`<a href="${p}/${route}">${label}</a>`).join('')}</nav><small>© 2026 LoloBuy Sheet</small></footer>`;
}
