import revisions from './search-improvements.json';
import novemberRevisions from './november-revisions.json';
import type {ArticleRecord} from './article-data';
import type {Locale} from './translations';
export const searchRevisions = revisions;
export function improveArticle(article:ArticleRecord, locale:Locale):ArticleRecord {
 const revision=(revisions[locale] as Record<string, {title:string;seoTitle:string;description:string;standfirst:string;section:ArticleRecord['sections'][number]}>)[article.slug];
 let result = article;
 if(revision){
  const {section,...copy}=revision;
  result = {...article,...copy,modifiedDate:'2026-10-17',checkedDate:{en:'17 October 2026',de:'17. Oktober 2026',es:'17 de octubre de 2026',fr:'17 octobre 2026',it:'17 ottobre 2026'}[locale],sections:[section,...article.sections]};
 }
 const update=(novemberRevisions[locale] as Record<string, Partial<ArticleRecord> & {section:ArticleRecord['sections'][number]}>)[article.slug];
 if(!update)return result;
 const {section,...copy}=update;
 return {...result,...copy,modifiedDate:'2026-11-09',checkedDate:{en:'9 November 2026',de:'9. November 2026',es:'9 de noviembre de 2026',fr:'9 novembre 2026',it:'9 novembre 2026'}[locale],sections:[section,...result.sections]};
}
