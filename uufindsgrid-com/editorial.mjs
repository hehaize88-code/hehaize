function editorialView(lang,t){
 const edition=editions[lang]||editions.en;
 const language=editions[lang]?lang:'en';
 const sourcesLabel={en:'Sources',zh:'参考来源',de:'Quellen',fr:'Sources',es:'Fuentes',it:'Fonti',nl:'Bronnen','pt-br':'Fontes',pl:'Źródła',ro:'Surse',sv:'Källor',da:'Kilder',fi:'Lähteet',el:'Πηγές',cs:'Zdroje',hu:'Források',bg:'Източници',sk:'Zdroje',hr:'Izvori',ja:'参考資料',ko:'참고 자료',vi:'Nguồn tham khảo',th:'แหล่งอ้างอิง',id:'Sumber'}[language];
 const root='/'+language+'/';
 const isZh=lang==='zh';
 const headings={faq:isZh?'最新常见问题':lang==='en'?'Latest FAQ':t('FAQ'),articles:isZh?'最新 SEO 文章':lang==='en'?'Latest articles':t('Articles')};
 const sorted=rows=>[...rows].sort((a,b)=>b.published.localeCompare(a.published)||b.order-a.order);
 const questions=sorted(edition.faq), articles=sorted(edition.articles);
 const jsonld=value=>'<script type="application/ld+json">'+JSON.stringify(value).replaceAll('<','\\u003c')+'</script>';
 const articleHref=a=>root+'articles/'+a.slug+'/';
 const faqHref=f=>root+'faq/#'+f.slug;
 function articleCard(a){
  return '<a class="story-card" href="'+articleHref(a)+'" lang="'+language+'"><time datetime="'+a.published+'">'+new Intl.DateTimeFormat(lang,{year:'numeric',month:'short',day:'numeric',timeZone:'UTC'}).format(new Date(a.published+'T12:00:00Z'))+'</time><h3>'+h(a.title)+'</h3><p>'+h(a.description)+'</p></a>';
 }
 function panel(title,href,body){
  return '<section class="bottom-panel"><div class="panel-title"><h2>'+title+'</h2><a href="'+href+'">'+t('Open')+' ›</a></div>'+body+'</section>';
 }
 function latest(){
  const cards=questions.slice(0,5).map(f=>'<a class="question-card" href="'+faqHref(f)+'" lang="'+language+'"><h3>'+h(f.question)+'</h3><p>'+h(f.answer)+'</p></a>').join('');
  return '<div class="home-editorial">'+panel(headings.faq,root+'faq/','<div class="question-cards">'+cards+'</div>')+panel(headings.articles,root+'articles/','<div class="story-cards">'+articles.slice(0,3).map(articleCard).join('')+'</div>')+'</div>';
 }
 function page(path){
  if(path==='faq/'){
   const items=questions.map(f=>'<details id="'+f.slug+'"><summary>'+h(f.question)+'</summary><p>'+h(f.answer)+'</p></details>').join('');
   const schema={'@context':'https://schema.org','@type':'FAQPage',inLanguage:language,mainEntity:questions.map(f=>({'@type':'Question',name:f.question,acceptedAnswer:{'@type':'Answer',text:f.answer}}))};
   return {heading:'FAQ',body:'<article class="reader questions" lang="'+language+'"><h1>FAQ</h1>'+items+'</article>'+jsonld(schema)+'<script>function openQuestion(){const el=document.getElementById(location.hash.slice(1));if(el&&el.tagName==="DETAILS")el.open=true}openQuestion();addEventListener("hashchange",openQuestion)</script>'};
  }
  if(path==='articles/'){
   const title=isZh?'SEO 文章':lang==='en'?'SEO Articles':'SEO · '+t('Articles');
   return {heading:title,body:'<section class="articles-index"><h1>'+title+'</h1><div class="story-cards">'+articles.map(articleCard).join('')+'</div></section>'};
  }
  const a=articles.find(article=>path==='articles/'+article.slug+'/');
  if(!a)return null;
  const refs=a.sources.map(s=>'<li><a href="'+h(s.url)+'">'+h(s.title)+'</a></li>').join('');
  const body=a.sections.map(s=>'<section><h2>'+h(s.heading)+'</h2>'+s.paragraphs.map(p=>'<p>'+h(p)+'</p>').join('')+'</section>').join('');
  const schema={'@context':'https://schema.org','@type':'Article',headline:a.title,description:a.description,inLanguage:language,datePublished:a.published,mainEntityOfPage:siteOrigin+articleHref(a),author:{'@type':'Organization',name:'UUFinds Grid'},citation:a.sources.map(s=>s.url)};
  return {heading:a.title,description:a.description,body:'<article class="reader longread" lang="'+language+'"><a href="'+root+'articles/">‹ '+t('Articles')+'</a><h1>'+h(a.title)+'</h1><p class="standfirst">'+h(a.description)+'</p>'+body+'<aside><h2>'+sourcesLabel+'</h2><ul>'+refs+'</ul></aside></article>'+jsonld(schema)};
 }
 return {latest,page};
}
