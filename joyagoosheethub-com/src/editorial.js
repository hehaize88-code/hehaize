const editorialLabels={
 en:['Articles','FAQ','Sources','On this page'],de:['Artikel','Häufige Fragen','Quellen','Auf dieser Seite'],fr:['Articles','Questions fréquentes','Sources','Sur cette page'],es:['Artículos','Preguntas frecuentes','Fuentes','En esta página'],it:['Articoli','Domande frequenti','Fonti','In questa pagina'],nl:['Artikelen','Veelgestelde vragen','Bronnen','Op deze pagina'],pt:['Artigos','Perguntas frequentes','Fontes','Nesta página'],pl:['Artykuły','Częste pytania','Źródła','Na tej stronie'],ro:['Articole','Întrebări frecvente','Surse','Pe această pagină'],sv:['Artiklar','Vanliga frågor','Källor','På den här sidan'],zh:['选购文章','常见问题','参考来源','本文目录'],da:['Artikler','Ofte stillede spørgsmål','Kilder','På denne side'],fi:['Artikkelit','Usein kysytyt kysymykset','Lähteet','Tällä sivulla'],el:['Άρθρα','Συχνές ερωτήσεις','Πηγές','Σε αυτή τη σελίδα'],cs:['Články','Časté dotazy','Zdroje','Na této stránce'],hu:['Cikkek','Gyakori kérdések','Források','Ezen az oldalon'],bg:['Статии','Често задавани въпроси','Източници','На тази страница'],sk:['Články','Časté otázky','Zdroje','Na tejto stránke'],hr:['Članci','Česta pitanja','Izvori','Na ovoj stranici'],ja:['記事','よくある質問','参考資料','目次'],ko:['구매 가이드','자주 묻는 질문','출처','목차'],vi:['Bài viết','Câu hỏi thường gặp','Nguồn tham khảo','Mục lục'],th:['บทความ','คำถามที่พบบ่อย','แหล่งข้อมูล','สารบัญ'],id:['Artikel','Pertanyaan umum','Sumber','Daftar isi']
};
function editorialCard(l,a){
 return '<a class="ed-card" href="/'+l+'/articles/'+a.slug+'/"><strong>'+e(a.title)+'</strong><span>'+e(a.summary)+'</span></a>';
}
function editorialQuestion(f){
 return '<details><summary>'+e(f.q)+'</summary><p>'+e(f.a)+'</p></details>';
}
function editorialHighlights(l){
 const data=editorialIndex[l],labels=editorialLabels[l];
 return '<section class="ed-highlights"><h2><a href="/'+l+'/articles/">'+e(labels[0])+'</a></h2><div class="ed-cards">'+data.articles.slice(0,3).map(a=>editorialCard(l,a)).join('')+'</div><h2><a href="/'+l+'/faq/">'+e(labels[1])+'</a></h2>'+data.questions.map(editorialQuestion).join('')+'</section>';
}
function editorialSchema(data){return '<script type="application/ld+json">'+JSON.stringify(data).replace(/</g,'\\u003c')+'</script>'}
async function editorialPage(u,l,route,rest,env){
 const labels=editorialLabels[l],index=editorialIndex[l],base='/'+l+'/',links=index.articles;
 const slug=rest[0],article=links.find(a=>a.slug===slug);
 if((route==='faq'&&rest.length)||(route==='articles'&&(rest.length>1||(slug&&!article))))return layout(u,l,'404','404',404);
 const path=base+route+'/'+(slug?slug+'/':'');
 if(u.pathname!==path)return Response.redirect(siteOrigin+path+u.search,308);
 const heading=route==='faq'?'JoyaGoo · '+labels[1]:article?.title||'JoyaGoo · '+labels[0];
 const crumbs=[{name:messages[l][0],path:base},{name:labels[route==='faq'?1:0],path:base+route+'/'}];
 if(article)crumbs.push({name:heading,path});
 const breadcrumb=editorialSchema({'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:crumbs.map((c,i)=>({'@type':'ListItem',position:i+1,name:c.name,item:siteOrigin+c.path}))});
 let html='<div class="ed"><nav class="ed-crumb">'+crumbs.slice(0,-1).map(c=>'<a href="'+c.path+'">'+e(c.name)+'</a>').join(' / ')+'</nav><h1>'+e(heading)+'</h1>';
 let desc=article?.summary||links.slice(0,2).map(a=>a.title).join(' · ');
 if(route==='articles'&&!article){
  html+='<div class="ed-cards">'+links.map(a=>editorialCard(l,a)).join('')+'</div>';
 }else{
  const r=await env.ASSETS.fetch(new URL('/editorial/'+l+'/'+(slug||'faq')+'.json',siteOrigin));
  if(!r.ok)throw Error('editorial content unavailable');
  const data=await r.json();
  if(route==='faq'){
   desc=data[0].faqs[0].q+' '+data[0].faqs[0].a;
   html+=data.map(group=>'<section><h2><a href="'+base+'articles/'+group.slug+'/">'+e(group.title)+'</a></h2>'+group.faqs.map(editorialQuestion).join('')+'</section>').join('');
   html+=editorialSchema({'@context':'https://schema.org','@type':'FAQPage',mainEntity:data.flatMap(group=>group.faqs.map(f=>({'@type':'Question',name:f.q,acceptedAnswer:{'@type':'Answer',text:f.a}})))});
  }else{
   html+='<p class="ed-intro">'+e(data.summary)+'</p><details class="ed-toc"><summary>'+e(labels[3])+'</summary><ol>'+data.sections.map((s,i)=>'<li><a href="#section-'+(i+1)+'">'+e(s.heading)+'</a></li>').join('')+'</ol></details>';
   html+=data.sections.map((s,i)=>'<section id="section-'+(i+1)+'"><h2>'+e(s.heading)+'</h2>'+s.paragraphs.map(p=>'<p>'+e(p)+'</p>').join('')+'</section>').join('');
   html+='<h2>'+e(labels[2])+'</h2><ul>'+data.sources.map(s=>'<li><a href="'+e(s.url.replace(siteOrigin+'/en/',siteOrigin+base))+'">'+e(s.title)+'</a></li>').join('')+'</ul><p><a href="'+base+'faq/">'+e(labels[1])+'</a></p>';
   html+=editorialSchema({'@context':'https://schema.org','@type':'Article',headline:heading,description:desc,inLanguage:l,datePublished:'2026-11-28',author:{'@type':'Organization',name:'JoyaGoo Sheet Hub',url:siteOrigin},mainEntityOfPage:siteOrigin+path,citation:data.sources.map(s=>s.url)});
  }
 }
 const alternates=Object.keys(editorialIndex).map(k=>'<link rel="alternate" hreflang="'+k+'" href="'+siteOrigin+path.replace(base,'/'+k+'/')+'">').join('')+'<link rel="alternate" hreflang="x-default" href="'+siteOrigin+path.replace(base,'/en/')+'">';
 return layout(u,l,heading,html+'</div>'+breadcrumb,200,'<meta name="description" content="'+e(desc)+'">'+alternates);
}
