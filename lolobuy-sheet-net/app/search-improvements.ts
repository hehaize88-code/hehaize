import revisions from './search-improvements.json';
import type {ArticleRecord} from './article-data';
import type {Locale} from './translations';
export const searchRevisions = revisions;
export function improveArticle(article:ArticleRecord, locale:Locale):ArticleRecord {
 const revision=(revisions[locale] as Record<string, {title:string;seoTitle:string;description:string;standfirst:string;section:ArticleRecord['sections'][number]}>)[article.slug];
 if(!revision)return article;
 const {section,...copy}=revision;
 return {...article,...copy,modifiedDate:'2026-10-17',checkedDate:{en:'17 October 2026',de:'17. Oktober 2026',es:'17 de octubre de 2026',fr:'17 octobre 2026',it:'17 ottobre 2026'}[locale],sections:[section,...article.sections]};
}
