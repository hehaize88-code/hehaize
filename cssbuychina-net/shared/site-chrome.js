export const REGISTER_URL = 'https://www.cssbuy.com/index';
export const chromeCopy = {
 en: {register:'Register on CSSBuy',home:'CSSBuy Spreadsheet home',guides:'Guides',qc:'QC photos',shipping:'Shipping',articles:'All articles',about:'About',privacy:'Privacy',terms:'Terms',independent:'Independent spreadsheet. Not operated by or affiliated with CSSBuy.'},
 de: {register:'Bei CSSBuy registrieren',home:'CSSBuy Spreadsheet Startseite',guides:'Anleitungen',qc:'QC-Bilder',shipping:'Versand',articles:'Alle Artikel',about:'Über uns',privacy:'Datenschutz',terms:'Bedingungen',independent:'Unabhängiges Spreadsheet. Nicht von CSSBuy betrieben oder mit CSSBuy verbunden.'},
 es: {register:'Registrarse en CSSBuy',home:'Inicio de CSSBuy Spreadsheet',guides:'Guías',qc:'Fotos QC',shipping:'Envíos',articles:'Todos los artículos',about:'Acerca de',privacy:'Privacidad',terms:'Términos',independent:'Hoja independiente. No está operada por CSSBuy ni afiliada a la plataforma.'},
 'pt-br': {register:'Cadastrar no CSSBuy',home:'Início do CSSBuy Spreadsheet',guides:'Guias',qc:'Fotos QC',shipping:'Envio',articles:'Todos os artigos',about:'Sobre',privacy:'Privacidade',terms:'Termos',independent:'Planilha independente. Não operada pelo CSSBuy nem afiliada à plataforma.'}
};
export function siteNavigation(locale='en') {
 const t=chromeCopy[locale]||chromeCopy.en,p=locale==='en'?'':`/${locale}`;
 return [['Spreadsheet',`${p}/catalog/`],[t.guides,`${p}/guides`],[t.qc,`${p}/guides/read-warehouse-qc-photos`],[t.shipping,`${p}/articles/cssbuy-shipping-calculator-actual-vs-volumetric-weight`],[t.articles,`${p}/articles`],['FAQ',`${p}/faq`]];
}
export function footerNavigation(locale='en') {
 const t=chromeCopy[locale]||chromeCopy.en,p=locale==='en'?'':`/${locale}`;
 return [['Spreadsheet',`${p}/catalog/`],['FAQ',`${p}/faq`],[t.about,'/about'],[t.privacy,'/privacy'],[t.terms,'/terms']];
}
