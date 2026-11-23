const articleLabels = {en:'Articles',de:'Artikel',fr:'Articles',es:'Artículos',it:'Articoli',pt:'Artigos',pl:'Artykuły',nl:'Artikelen',ro:'Articole',sv:'Artiklar',zh:'文章',da:'Artikler',fi:'Artikkelit',el:'Άρθρα',cs:'Články',hu:'Cikkek',bg:'Статии',sk:'Články',hr:'Članci',ja:'記事',ko:'아티클',vi:'Bài viết',th:'บทความ',id:'Artikel'};
function structuredData(data) {
  return '<script type="application/ld+json">'+JSON.stringify(data).replace(/</g,'\\u003c')+'</script>';
}
function articlePaths(lang) {
  const articles = editorialContent[lang]?.articles || [];
  return articles.length ? ['articles', ...articles.map(a=>'articles/'+a.slug)] : [];
}
function renderFaq(lang, expanded) {
  const pairs = [];
  for(let i=0;i+1<info[lang].length;i+=2) pairs.push([info[lang][i],info[lang][i+1]]);
  if(expanded) pairs.push(...(editorialContent[lang]?.questions || []));
  const markup=pairs.map(([q,a])=>'<details><summary>'+esc(q)+'</summary><p>'+esc(a)+'</p></details>').join('');
  const schema=expanded?structuredData({'@context':'https://schema.org','@type':'FAQPage',mainEntity:pairs.map(([name,text])=>({'@type':'Question',name,acceptedAnswer:{'@type':'Answer',text}}))}):'';
  return '<div class="faq">'+markup+'</div>'+schema;
}
function editorialView(lang, slug) {
  const articles=editorialContent[lang].articles;
  const label=articleLabels[lang];
  const base='/'+lang+'/articles';
  if(!slug) return {title:label,body:'<section class="info"><h1>'+esc(label)+'</h1><ul>'+articles.map(a=>'<li><a href="'+base+'/'+esc(a.slug)+'">'+esc(a.title)+'</a><p>'+esc(a.summary)+'</p></li>').join('')+'</ul></section>'};
  const article=articles.find(a=>a.slug===slug);
  const url=PROD+base+'/'+slug;
  const sections=article.sections.map(([h,ps])=>'<section><h2>'+esc(h)+'</h2>'+ps.map(p=>'<p>'+esc(p)+'</p>').join('')+'</section>').join('');
  const links=article.sources.map(([name,href])=>'<a href="'+esc(href)+'">'+esc(name)+'</a>').join(' · ');
  const schema=structuredData({'@context':'https://schema.org','@type':'Article',headline:article.title,description:article.summary,inLanguage:lang,mainEntityOfPage:url,citation:article.sources.map(s=>s[1])});
  return {title:article.title,description:article.summary,body:'<article class="info" style="max-width:72ch;margin-inline:auto"><p><a href="'+base+'">'+esc(label)+'</a></p><h1>'+esc(article.title)+'</h1><p>'+esc(article.summary)+'</p>'+sections+'<p>'+links+'</p></article>'+schema};
}
