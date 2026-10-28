export type Source = {title:string;url:string};
export type Section = {id:string;title:string;paragraphs:string[];bullets?:string[];table?:{headers:string[];rows:string[][]}};
export type Article = {id:string;slug:string;title:string;description:string;keyword:string;category:string;published:string;updated:string;intro:string[];sections:Section[];checklist:string[];sources:Source[];related:string[];actions?:string[]};
export type FAQ = {id:string;group:string;question:string;answer:string;sources:Source[]};
export type Editorial = {locale:string;reviewed:string;ui:Record<string,string>;groups:Record<string,string>;faqs:FAQ[];articles:Article[]};
const files=import.meta.glob('../content/editorial/??.json',{eager:true,import:'default'}) as Record<string,Editorial>;
const data=new Map(Object.values(files).map(x=>[x.locale,x]));
export function content(lang:string):Editorial {const value=data.get(lang);if(!value)throw new Error('Editorial locale unavailable: '+lang);return value;}
export function minutes(article:Article){const text=[...article.intro,...article.sections.flatMap(s=>[s.title,...s.paragraphs,...(s.bullets||[])]),...article.checklist].join(' ');return Math.max(3,Math.ceil(text.split(/\s+/).length/210));}
export function topic(category:string,ui:Record<string,string>){return ui[({'getting-started':'categoryGetting',quality:'categoryQuality',shipping:'categoryShipping',account:'categoryAccount'} as Record<string,string>)[category]]||ui.articles;}
