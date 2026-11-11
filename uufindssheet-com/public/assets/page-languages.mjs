// Only offer a navigation target when this exact document has a published edition.
export const editorialLanguages = ['en','en-gb','de','pl','pt-br'];
export function pageLanguages(englishOnly=false) { return englishOnly ? ['en'] : editorialLanguages; }
export function pageLanguageHref(language, routePath='/', search='', hash='') {
 const path='/' + routePath.replace(/^\/+|\/+$/g,'');
 return (language==='en'?'':'/'+language)+(path==='/'?'/':path+'/')+search+hash;
}
