const modules=import.meta.glob('../content/articles/*.md',{eager:true}) as Record<string,any>;
export const articles=Object.values(modules).map(module=>({
 ...module.frontmatter,
 Content:module.Content,
 headings:module.getHeadings().filter((h:any)=>h.depth===2),
 minutes:Math.ceil(module.rawContent().split(/\s+/).length/220),
 path:`/articles/${module.frontmatter.slug}/`
})).sort((a,b)=>a.order-b.order);
export const findArticle=(path:string)=>articles.find(a=>a.path===path);
