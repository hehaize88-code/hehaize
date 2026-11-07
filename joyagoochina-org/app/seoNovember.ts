import type { Locale } from './i18n';
import type { SeoArticleEntry } from './seoArticleLibrary';
import insurance from './november-insurance.json';
import rehearsal from './november-rehearsal.json';
import payments from './november-payments.json';
import plIt from './november-parity-pl-it.json';
import ptRo from './november-parity-pt-ro.json';
import sv from './november-parity-sv.json';
import refresh from './november-refresh.json';
import volumeZhDe from './november-volumetric-zh-de.json';
import volumeEsFr from './november-volumetric-es-fr.json';
import volumePlIt from './november-volumetric-pl-it.json';
import volumePtRo from './november-volumetric-pt-ro.json';
import volumeSv from './november-volumetric-sv.json';
import shippingSvFixes from './november-shipping-sv-fixes.json';
const volumetric = {...volumeZhDe,...volumeEsFr,...volumePlIt,...volumePtRo,sv:volumeSv} as Partial<Record<Locale,SeoArticleEntry>>;
function fixSwedishShipping(value: unknown): unknown {
  if (typeof value === 'string') return (shippingSvFixes as Record<string,string>)[value] ?? value;
  if (Array.isArray(value)) return value.map(fixSwedishShipping);
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key,item])=>[key,fixSwedishShipping(item)]));
  return value;
}

const parity = {...plIt, ...ptRo, ...sv} as Partial<Record<Locale, SeoArticleEntry[]>>;
const additions = [insurance, rehearsal, payments] as Record<Locale, SeoArticleEntry>[];
const priority = ['joyagoo-parcel-insurance-claims-guide', 'joyagoo-rehearsal-packing-guide', 'joyagoo-payment-methods-top-up-guide', 'joyagoo-shipping-time-stages', 'joyagoo-size-guide-clothing-shoes', 'joyagoo-volumetric-weight-shipping-cost'];
const checked = {
  en: 'Updated and source-checked on 7 November 2026. Examples are editorial guidance; current seller, parcel and route terms remain decisive.',
  zh: '2026 年 11 月 7 日更新并核对来源。示例为编辑说明，具体条件以当前卖家、包裹和线路规则为准。',
  de: 'Am 7. November 2026 aktualisiert und anhand der Quellen geprüft. Beispiele dienen der Orientierung; maßgeblich sind die aktuellen Verkäufer-, Paket- und Routenbedingungen.',
  pl: 'Zaktualizowano i sprawdzono źródła 7 listopada 2026 r. Przykłady są wskazówkami redakcyjnymi; decydują aktualne warunki sprzedawcy, paczki i trasy.',
  es: 'Actualizado y contrastado con las fuentes el 7 de noviembre de 2026. Los ejemplos son orientativos; prevalecen las condiciones vigentes del vendedor, paquete y ruta.',
  it: 'Aggiornato e verificato sulle fonti il 7 novembre 2026. Gli esempi sono indicazioni redazionali; valgono le condizioni attuali del venditore, del pacco e della linea.',
  fr: 'Mis à jour et vérifié auprès des sources le 7 novembre 2026. Les exemples sont indicatifs ; les conditions actuelles du vendeur, du colis et de la ligne prévalent.',
  pt: 'Atualizado e conferido nas fontes em 7 de novembro de 2026. Os exemplos são orientações editoriais; prevalecem as condições atuais do vendedor, pacote e rota.',
  ro: 'Actualizat și verificat în surse la 7 noiembrie 2026. Exemplele sunt orientative; prevalează condițiile actuale ale vânzătorului, coletului și rutei.',
  sv: 'Uppdaterad och källkontrollerad den 7 november 2026. Exemplen är redaktionell vägledning; aktuella villkor för säljare, paket och fraktlinje gäller.',
};
const sourceLabels = {
  en:['Official shipping times','Official shopping guidance','Official volumetric-weight rules'],
  zh:['官方运输时效','官方购物指南','官方体积重规则'],
  de:['Offizielle Lieferzeiten','Offizielle Kaufanleitung','Offizielle Volumengewichtsregeln'],
  pl:['Oficjalne terminy transportu','Oficjalny poradnik zakupowy','Oficjalne zasady wagi gabarytowej'],
  es:['Plazos oficiales de envío','Guía oficial de compra','Reglas oficiales de peso volumétrico'],
  it:['Tempi di spedizione ufficiali','Guida ufficiale agli acquisti','Regole ufficiali sul peso volumetrico'],
  fr:['Délais officiels de transport','Guide officiel des achats','Règles officielles du poids volumétrique'],
  pt:['Prazos oficiais de transporte','Guia oficial de compras','Regras oficiais de peso volumétrico'],
  ro:['Durate oficiale de transport','Ghidul oficial de cumpărături','Reguli oficiale privind greutatea volumetrică'],
  sv:['Officiella transporttider','Officiell köpguide','Officiella regler för volymvikt'],
};
const sourceUrls = [
  'https://mgt.joyagoo.com/help-center/parcel-dispatch-pick-up-time/',
  'https://mgt.joyagoo.com/help-center/shopping-assistant-guidance/',
  'https://mgt.joyagoo.com/help-center/actual-weight-and-volumetric-weight/',
];
export function applyNovemberRefresh(entries: SeoArticleEntry[], locale: Locale): SeoArticleEntry[] {
  const existing = new Set(entries.map(entry => entry.slug));
  const complete = [...entries, ...(parity[locale] ?? []).filter(entry => !existing.has(entry.slug))];
  const updates = refresh[locale] as Record<string, {seoTitle:string;description:string;answer:string;table:{headers:string[];rows:string[][]}}>;
  const revised = complete.map(original => {
    let entry = original.slug === 'joyagoo-volumetric-weight-shipping-cost' && volumetric[locale] ? volumetric[locale]! : original;
    if (locale === 'sv' && entry.slug === 'joyagoo-shipping-time-stages') entry = fixSwedishShipping(entry) as SeoArticleEntry;
    const update = updates[entry.slug];
    if (!update) return entry.slug === "joyagoo-shipping-cost-per-kg-explained" && locale === "en" ? {...entry,modifiedAt:"2026-11-07"} : entry;
    const index = priority.slice(3).indexOf(entry.slug);
    const related = index===0 ? priority[0] : index===1 ? 'joyagoo-shoe-qc-checklist' : priority[1];
    return {...entry, seoTitle:update.seoTitle, modifiedAt:'2026-11-07', sourceBody:checked[locale],
      sources:[{label:sourceLabels[locale][index],url:sourceUrls[index]},...(index===2?rehearsal[locale].sources:[])],
      keywords:[...new Set([...entry.keywords,update.seoTitle])],
      relatedLinks:[...new Set([related,...(entry.relatedLinks??[])])],
      article:{...entry.article,title:update.seoTitle,description:update.description,
        sections:entry.article.sections.map((section,i)=>i===0?{...section,paragraphs:[update.answer,...section.paragraphs],table:update.table}:section)}
    };
  });
  return [...revised,...additions.map(topic=>topic[locale])].sort((a,b)=>{
    const ai=priority.indexOf(a.slug),bi=priority.indexOf(b.slug);
    return (ai<0?99:ai)-(bi<0?99:bi);
  });
}
