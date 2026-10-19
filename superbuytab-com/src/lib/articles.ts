import {languages} from './i18n';
const modules=import.meta.glob('../content/articles/**/*.md',{eager:true}) as Record<string,any>;
const all=Object.entries(modules).map(([file,module])=>({
 ...module.frontmatter,
 lang:module.frontmatter.lang||'en',
 Content:module.Content,
 headings:module.getHeadings().filter((h:any)=>h.depth===2),
 minutes:Math.max(1,Math.ceil(module.rawContent().split(/\s+/).length/220)),
 path:`/articles/${module.frontmatter.slug}/`
}));
export const getArticles=(lang:string='en')=>all.filter(a=>a.lang===lang).sort((a,b)=>a.order-b.order);
export const articles=getArticles('en');
export const findArticle=(path:string,lang:string='en')=>getArticles(lang).find(a=>a.path===path);
export const articleLocales=languages.map(([code])=>code);
