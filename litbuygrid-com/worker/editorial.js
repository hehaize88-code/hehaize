import { editorialData } from './editorial-data.js';

export const articleLabel = {
  en:'Articles', de:'Artikel', fr:'Articles', es:'Artículos', it:'Articoli', nl:'Artikelen', pt:'Artigos', pl:'Artykuły', ro:'Articole', sv:'Artiklar', zh:'文章', da:'Artikler', fi:'Artikkelit', el:'Άρθρα', cs:'Články', hu:'Cikkek', bg:'Статии', sk:'Články', hr:'Članci', ja:'記事', ko:'기사', vi:'Bài viết', th:'บทความ', id:'Artikel'
};

function editorialEscape(value) {
  return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function structured(value) {
  return '<script type="application/ld+json">'+JSON.stringify(value).replace(/</g,'\\u003c')+'</script>';
}
export function faqSchema(qas) {
  return structured({'@context':'https://schema.org','@type':'FAQPage',mainEntity:qas.map(([name,text])=>({'@type':'Question',name,acceptedAnswer:{'@type':'Answer',text}}))});
}
export function articlePaths(lang) {
  const entries=editorialData[lang]?.articles;
  return entries?.length?['articles/',...entries.map(article=>'articles/'+article.slug+'/')]:[];
}
export function articleRoute(lang,parts,url) {
  const articles=editorialData[lang]?.articles;
  if (!articles?.length || parts.length>3) return null;
  const label=articleLabel[lang],base='/'+lang+'/articles/';
  const e=editorialEscape;
  if(parts.length===2){
    return {title:label,description:articles[0].description,body:'<section class="guide"><h1>LitBuy · '+e(label)+'</h1>'+articles.map(a=>'<article><h2><a href="'+base+a.slug+'/">'+e(a.title)+'</a></h2><p>'+e(a.description)+'</p></article>').join('')+'</section>'};
  }
  const a=articles.find(item=>item.slug===parts[2]);
  if(!a || url.pathname!==base+a.slug+'/')return null;
  const content=a.sections.map((s,i)=>'<details'+(i===0?' open':'')+'><summary>'+e(s.heading)+'</summary>'+s.paragraphs.map(p=>'<p>'+e(p)+'</p>').join('')+'</details>').join('');
  const schema=structured({'@context':'https://schema.org','@type':'Article',headline:a.title,description:a.description,inLanguage:lang,mainEntityOfPage:'https://litbuygrid.com'+url.pathname});
  return {title:a.title,description:a.description,body:'<article class="guide"><a href="'+base+'">'+e(label)+'</a><h1>'+e(a.title)+'</h1><p>'+e(a.description)+'</p>'+content+'<p>'+a.sources.map(src=>'<a href="'+e(src)+'" rel="noopener">'+e(new URL(src).host+new URL(src).pathname)+'</a>').join(' · ')+'</p></article>'+schema};
}
