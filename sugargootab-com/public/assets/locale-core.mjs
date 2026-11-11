export const localeCodes=["en", "de", "es", "fr", "it", "pl", "pt", "ro", "sv", "nl", "da", "fi", "el", "cs", "hu", "bg", "sk", "hr", "sl", "lt", "lv", "et", "ga", "mt"];
export const htmlLocale=lang=>lang;
const dictionaries=new Map();
export async function loadDictionary(locale){
 if(!localeCodes.includes(locale))locale='en';
 if(!dictionaries.has(locale))dictionaries.set(locale,fetch('/assets/locales/'+locale+'.json').then(r=>{if(!r.ok)throw Error('locale');return r.json();}).catch(()=>{dictionaries.delete(locale);return {};}));
 return dictionaries.get(locale);
}
