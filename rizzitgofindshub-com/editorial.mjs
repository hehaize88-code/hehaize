import catalog from './editor-catalog.json';
import parcel from './editor-parcel.json';
import quality from './editor-quality.json';
import faq from './faq.json';

import catalogZh from './editor-zh-catalog.json';
import qualityZh from './editor-zh-quality.json';
import parcelZh from './editor-zh-parcel.json';
import faqZh from './faq-zh.json';
const articlesZh=[...catalogZh,...qualityZh,...parcelZh];
const articles = [...catalog, ...quality, ...parcel];
const labels = {en:'Guides',zh:'购物指南',de:'Ratgeber',fr:'Guides',es:'Guías',it:'Guide',nl:'Gidsen',pl:'Poradniki',pt:'Guias',ro:'Ghiduri',sv:'Guider',da:'Guider',fi:'Oppaat',el:'Οδηγοί',cs:'Průvodci',hu:'Útmutatók',bg:'Ръководства',sk:'Sprievodcovia',hr:'Vodiči',sl:'Vodniki',lt:'Gidai',lv:'Ceļveži',et:'Juhendid',ja:'ガイド',ko:'가이드',vi:'Hướng dẫn',th:'คู่มือ',id:'Panduan'};
const e = v => String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const structured = obj => '<script type="application/ld+json">'+JSON.stringify({'@context':'https://schema.org',...obj}).replace(/</g,'\\u003c')+'</script>';
export const editorialPaths = ['faq/','articles/',...articles.map(a=>'articles/'+a.slug+'/')];
export function editorialNav(lang) {
  const dest=lang==='zh'?'zh':'en', suffix=lang===dest?'':' (EN)';
  return '<a href="/'+dest+'/faq/">'+(dest==='zh'?'常见问题':'FAQ')+suffix+'</a><a href="/'+dest+'/articles/">'+e(labels[lang]||labels.en)+suffix+'</a>';
}
const faqSources = [
 ['RizzitGO buying guide','https://rizzitgo.com/how-it-work/'],
 ['Freight calculator','https://rizzitgo.com/freight-calculator'],
 ['Parcel tracking','https://track.rizzitgo.com/'],
 ['RizzitGO agreement','https://rizzitgo.com/agreement/']
].map(([label,url])=>({label,url}));
const sources = (rows,zh) => '<aside class="ed-sources"><h2>'+(zh?'参考资料':'Sources')+'</h2>'+rows.map(r=>'<a href="'+e(r.url)+'">'+e(r.label)+'</a>').join('')+'</aside>';
export function renderEditorial(parts,lang) {
  if(!['en','zh'].includes(lang))return null;
  const zh=lang==='zh', questions=zh?faqZh:faq, guides=zh?articlesZh:articles, guideLabel=zh?'购物指南':'Shopping guides';
  const section = parts[1], slug=parts[2], root='/'+lang+'/articles/';
  let title, content;
  if(section==='faq'){
    title=zh?'RizzitGO 常见问题':'RizzitGO FAQ';
    content='<h1>'+title+'</h1>'+questions.map(v=>'<details name="question"><summary>'+e(v.q)+'</summary><p>'+e(v.a)+'</p></details>').join('')+sources(zh?faqSources.map((r,i)=>({...r,label:['RizzitGO 购物指南','运费计算器','包裹追踪','服务条款'][i]})):faqSources,zh)+structured({'@type':'FAQPage',mainEntity:questions.map(v=>({'@type':'Question',name:v.q,acceptedAnswer:{'@type':'Answer',text:v.a}}))});
  }else if(!slug){
    title=zh?'RizzitGO 购物指南':'RizzitGO shopping guides';
    content='<h1>'+title+'</h1><div class="ed-index">'+guides.map(v=>'<a href="'+root+e(v.slug)+'/"><h2>'+e(v.title)+'</h2><p>'+e(v.summary)+'</p></a>').join('')+'</div>';
  }else{
    const a=guides.find(v=>v.slug===slug);
    if(!a)return null;
    title=a.title;
    content='<a href="'+root+'">← '+guideLabel+'</a><article><h1>'+e(title)+'</h1><p class="ed-intro">'+e(a.summary)+'</p>'+a.sections.map((v,i)=>(i===0?'<section class="ed-first"><h2>'+e(v.heading)+'</h2>':'<details name="chapter"'+(i===1?' open':'')+'><summary><h2>'+e(v.heading)+'</h2></summary>')+v.paragraphs.map(p=>'<p>'+e(p)+'</p>').join('')+(i===0?'</section>':'</details>')).join('')+sources(a.sources,zh)+'</article>'+structured({'@type':'Article',headline:title,description:a.summary,inLanguage:lang,mainEntityOfPage:'https://rizzitgofindshub.com'+root+slug+'/',author:{'@type':'Organization',name:'RizzitGO Finds Hub'}});
  }
  return {title,body:'<section class="ed">'+content+'</section>'};
}
