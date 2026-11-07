import calculator from './november/calculator.js';
import budget from './november/budget.js';
import parcel from './november/parcel.js';
import shipping from './november/shipping.js';
const labels = {
 en: {date:'7 November 2026', language:'English article', read:'7 min read', steps:[['Compare','Current inputs'],['Check','Order evidence'],['Decide','Next action']]},
 'pt-br': {date:'7 de novembro de 2026',language:'Artigo em português',read:'7 min de leitura',steps:[['Comparar','Dados atuais'],['Conferir','Pedido'],['Decidir','Próximo passo']]},
 de: {date:'7. November 2026',language:'Artikel auf Deutsch',read:'7 Min. Lesezeit',steps:[['Vergleichen','Aktuelle Angaben'],['Prüfen','Bestellnachweise'],['Entscheiden','Nächster Schritt']]}
};
const count = text => text.replace(/[^A-Za-z0-9£¥€$.%+-]+/g,' ').trim().split(/\s+/).filter(Boolean).length;
export const novemberArticles = [calculator,budget,parcel,shipping].map(source => {
 const variants = Object.fromEntries(Object.entries(source.copy).map(([locale,copy]) => {
  const t=labels[locale];
  const text=[copy.deck,...copy.sections.flat(),...copy.links.map(x=>x[0])].join(' ');
  return [locale,{title:copy.title,seoTitle:copy.title,excerpt:copy.excerpt,category:copy.category,
   deck:copy.deck,growthContent:copy,languageLabel:t.language,readTime:t.read,displayDate:t.date,factCheckedDisplayDate:t.date,
   wordCount:locale==='en'?count(text):text.split(/\s+/).length,socialImageAlt:copy.title,
   toc:copy.sections.map(([heading],i)=>['step-'+(i+1),heading]),
   cover:{label:copy.category.toLocaleUpperCase(locale),tone:'workflow',steps:t.steps}
  }];
 }));
 return {slug:source.slug,...variants.en,variants,locales:['en','pt-br','de'],primaryKeyword:source.keyword,
 longTailKeywords:source.secondary,published:'2026-11-07',updated:'2026-11-07',factChecked:'2026-11-07',
 socialImage:source.image,citations:['https://hubbuy.com/','https://hubbuy.com/estimation'],images:[],hideResearchEvidence:true,
 novemberRevision:true};
});
export const newNovemberSlugs=novemberArticles.slice(0,3).map(a=>a.slug);
