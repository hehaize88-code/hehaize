import a from './editorial-a.json';
import b from './editorial-b.json';
import c from './editorial-c.json';
import faq from './faq-data.json';
import {localizeEditorial,editorialLanguage} from './editorial-locales.mjs';
export const articles=[...a,...b,...c];
const esc=v=>String(v??'').replace(/[<>&"']/g,k=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&#39;'}[k]));
const navigation={en:['FAQ','Articles','Sources'],zh:['常见问题','文章','参考资料'],de:['Häufige Fragen','Artikel','Quellen'],es:['Preguntas frecuentes','Artículos','Fuentes'],fr:['Questions fréquentes','Articles','Sources'],it:['Domande frequenti','Articoli','Fonti'],pl:['Pytania','Artykuły','Źródła'],pt:['Perguntas frequentes','Artigos','Fontes'],ro:['Întrebări frecvente','Articole','Surse'],sv:['Vanliga frågor','Artiklar','Källor'],nl:['Veelgestelde vragen','Artikelen','Bronnen'],da:['Spørgsmål og svar','Artikler','Kilder'],fi:['Usein kysytyt kysymykset','Artikkelit','Lähteet'],el:['Συχνές ερωτήσεις','Άρθρα','Πηγές'],cs:['Časté dotazy','Články','Zdroje'],hu:['Gyakori kérdések','Cikkek','Források'],bg:['Чести въпроси','Статии','Източници'],sk:['Časté otázky','Články','Zdroje'],hr:['Česta pitanja','Članci','Izvori'],ja:['よくある質問','記事','参考資料'],ko:['자주 묻는 질문','기사','출처'],vi:['Câu hỏi thường gặp','Bài viết','Nguồn'],th:['คำถามที่พบบ่อย','บทความ','แหล่งข้อมูล'],id:['Pertanyaan umum','Artikel','Sumber']};
export const editorialNav=lang=>navigation[lang]||navigation.en;
const urls=(sources,lang)=>'<aside class="ed-sources"><strong>'+editorialNav(lang)[2]+'</strong> '+sources.map(s=>'<a target="_blank" rel="noopener" href="'+esc(s.url.replace(/^\/en\//,'/'+lang+'/'))+'">'+esc(s.label||new URL(s.url,'https://cssbuy.com').hostname)+'</a>').join(' · ')+'</aside>';
const jsonLd=obj=>'<script type="application/ld+json">'+JSON.stringify(obj).replace(/</g,'\\u003c')+'</script>';
function articleCards(rows,lang){return '<div class="ed-cards" lang="'+editorialLanguage(lang)+'">'+rows.map(r=>'<a href="/'+lang+'/articles/'+r.slug+'/"><h2>'+esc(r.title)+'</h2><p>'+esc(r.summary)+'</p></a>').join('')+'</div>'}
function faqRows(rows,name){return rows.map(r=>'<details lang="'+editorialLanguage(r.lang||'en')+'" name="'+name+'"><summary>'+esc(r.q)+'</summary><p>'+esc(r.a)+'</p>'+urls([r.source],r.lang||'en')+'</details>').join('')}
export async function editorialPage(lang,route,slug){
 const labels=editorialNav(lang);
 if(route==='faq'){
 const rows=(await localizeEditorial('faq',faq,lang)).map(row=>({...row,lang}));const size=6;
 return {title:'CSSBuy · '+labels[0],body:'<section class="ed"><h1>'+labels[0]+'</h1><div class="ed-faq">'+Array.from({length:Math.ceil(rows.length/size)},(_,i)=>'<details class="ed-group" name="faqs" '+(i===0?'open':'')+'><summary>'+labels[0]+' '+(i*size+1)+'–'+Math.min(rows.length,(i+1)*size)+'</summary>'+faqRows(rows.slice(i*size,(i+1)*size),'answers')+'</details>').join('')+'</div></section>'+jsonLd({'@context':'https://schema.org','@type':'FAQPage',mainEntity:rows.map(r=>({'@type':'Question',name:r.q,acceptedAnswer:{'@type':'Answer',text:r.a}}))})}
 }
 if(!slug){const rows=await localizeEditorial('index',articles.map(({title,summary,slug})=>({title,summary,slug})),lang);return {title:'CSSBuy · '+labels[1],body:'<section class="ed"><h1>'+labels[1]+'</h1>'+articleCards(rows,lang)+'</section>'}}
 const raw=articles.find(row=>row.slug===slug);if(!raw)throw Object.assign(new Error('Article not found'),{status:404});
 const row=await localizeEditorial(slug,raw,lang);
 return {title:row.title,body:'<article class="ed ed-story" lang="'+editorialLanguage(lang)+'"><a href="/'+lang+'/articles/">'+labels[1]+'</a><h1>'+esc(row.title)+'</h1><p class="ed-lead">'+esc(row.summary)+'</p>'+row.sections.map((s,i)=>'<details class="ed-part" name="chapter" '+(i===0?'open':'')+'><summary><h2>'+esc(s.heading)+'</h2></summary>'+s.paragraphs.map(p=>'<p>'+esc(p)+'</p>').join('')+'</details>').join('')+urls(row.sources,lang)+'</article>'+jsonLd({'@context':'https://schema.org','@type':'Article',headline:row.title,description:row.summary,inLanguage:editorialLanguage(lang),citation:row.sources.map(s=>s.url)})};
}
export async function homeEditorial(lang){
 const labels=editorialNav(lang);
 const [stories,questions]=await Promise.all([localizeEditorial('home-articles',articles.slice(0,3).map(({title,summary,slug})=>({title,summary,slug})),lang),localizeEditorial('home-faq',faq.slice(0,5),lang)]);
 return '<section class="ed ed-home"><div class="bar"><h2>'+labels[1]+'</h2><a href="/'+lang+'/articles/">'+labels[1]+' (10)</a></div>'+articleCards(stories,lang)+'<div class="bar"><h2>'+labels[0]+'</h2><a href="/'+lang+'/faq/">'+labels[0]+' ('+faq.length+')</a></div>'+faqRows(questions.map(q=>({...q,lang})),'home-faq')+'</section>';
}
