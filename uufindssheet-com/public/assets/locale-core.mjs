export const localeList = [
 ['en','English','EN'],['en-gb','English (UK)','UK'],['de','Deutsch','DE'],['fr','Français','FR'],['es','Español','ES'],['it','Italiano','IT'],['nl','Nederlands','NL'],['pt-br','Português','PT'],['pl','Polski','PL'],['ro','Română','RO'],['sv','Svenska','SV'],['zh','简体中文','ZH'],['da','Dansk','DA'],['fi','Suomi','FI'],['el','Ελληνικά','EL'],['cs','Čeština','CS'],['hu','Magyar','HU'],['bg','Български','BG'],['sk','Slovenčina','SK'],['hr','Hrvatski','HR'],['ja','日本語','JA'],['ko','한국어','KO'],['vi','Tiếng Việt','VI'],['th','ไทย','TH'],['id','Bahasa Indonesia','ID'],
];
export const localeCodes = localeList.map(([code]) => code);
export const englishCatalogueCopy = {'Adidas pans':'Adidas pants','Ture Religion  Jeans':'True Religion Jeans',"黑色":"Black","白色":"White","蓝色":"Blue","红色":"Red","绿色":"Green","灰色":"Grey","粉色":"Pink","棕色":"Brown","黄色":"Yellow","米色":"Beige"};
export const htmlLocale = code => code === 'pt-br' ? 'pt-BR' : code === 'zh' ? 'zh-CN' : code;
export function translation(value, dictionary = {}) { return dictionary[value] || value; }
const dictionaries = new Map();
export function loadDictionary(locale) {
 if (locale === 'en' || locale === 'en-gb') return Promise.resolve(englishCatalogueCopy);
 if (!localeCodes.includes(locale)) return Promise.resolve({});
 if (!dictionaries.has(locale)) dictionaries.set(locale, fetch(`/assets/locales/${locale}.json`).then(r => {if (!r.ok) throw Error('Translation unavailable'); return r.json();}).catch(() => {dictionaries.delete(locale); return {};}));
 return dictionaries.get(locale);
}
