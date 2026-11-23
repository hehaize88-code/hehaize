const articleLabels = {en:'Articles',de:'Artikel',fr:'Articles',es:'Artículos',it:'Articoli',nl:'Artikelen',pt:'Artigos',pl:'Artykuły',ro:'Articole',sv:'Artiklar',zh:'文章',da:'Artikler',fi:'Artikkelit',el:'Άρθρα',cs:'Články',hu:'Cikkek',bg:'Статии',sk:'Články',hr:'Članci',ja:'記事',ko:'기사',vi:'Bài viết',th:'บทความ',id:'Artikel'};
const escapeEditorial = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function editorialSchema(data) {
  return '<script type="application/ld+json">'+JSON.stringify(data).replaceAll('<','\\u003c')+'</script>';
}
function editorialLinks(locale) {
  const bundle=siteEditorial[locale];
  if (!bundle) return '';
  const root='/'+locale+'/';
  return (bundle.faq.length?'<a href="'+root+'faq/">FAQ</a>':'')+
    (Object.keys(bundle.articles).length?'<a href="'+root+'articles/">'+escapeEditorial(articleLabels[locale])+'</a>':'');
}
function editorialPaths(locale) {
  const bundle=siteEditorial[locale];
  if(!bundle) return [];
  const slugs=Object.keys(bundle.articles);
  return [...(bundle.faq.length?['faq/']:[]),...(slugs.length?['articles/',...slugs.map(s=>'articles/'+s+'/')]:[])];
}
function availableEditorialLocales(path) {
  return Object.keys(siteEditorial).filter(lang=>editorialPaths(lang).includes(path));
}
function editorialMetadata(url, locale, origin) {
  const path=url.pathname.slice(locale.length+2);
  if(!/^(?:articles|faq)\//.test(path)) return null;
  const langs=availableEditorialLocales(path);
  if(!langs.includes(locale)) return null;
  const bundle=siteEditorial[locale];
  const description=path==='faq/'?bundle.faq[0][0]:path==='articles/'?Object.values(bundle.articles).map(a=>a.title).slice(0,2).join(' · '):bundle.articles[path.split('/')[1]].intro[0];
  const href=lang=>escapeEditorial(origin+'/'+lang+'/'+path);
  const links=langs.map(lang=>'<link rel="alternate" hreflang="'+lang+'" href="'+href(lang)+'">').join('')+
    (langs.includes('en')?'<link rel="alternate" hreflang="x-default" href="'+href('en')+'">':'');
  return {langs,links,description};
}
function editorialPage(path,locale,origin,brand) {
  const bundle=siteEditorial[locale];
  if(!bundle || !editorialPaths(locale).includes(path)) return null;
  const root='/'+locale+'/';
  const esc=escapeEditorial;
  const url=origin+root+path;
  const articleLabel=articleLabels[locale];
  const styles='<style>.editorial-body{max-width:76ch;margin:2rem auto;padding:0 1rem;line-height:1.66}.editorial-body h1,.editorial-body h2{line-height:1.2}.editorial-body details{margin:.75em 0}.editorial-body summary{cursor:pointer;font-weight:650}.editorial-body nav a,.editorial-body p a{text-decoration:underline}.editorial-body .editorial-card{margin:1.4em 0}.editorial-body .editorial-card p{margin:.3em 0}</style>';
  let title,body;
  if(path==='faq/'){
    title=brand+' FAQ';
    body='<h1>'+esc(title)+'</h1>'+bundle.faq.map(([q,a])=>'<details><summary>'+esc(q)+'</summary><p>'+esc(a)+'</p></details>').join('')+
      editorialSchema({'@context':'https://schema.org','@type':'FAQPage',mainEntity:bundle.faq.map(([name,text])=>({'@type':'Question',name,acceptedAnswer:{'@type':'Answer',text}}))});
  } else if(path==='articles/'){
    title=brand+' '+articleLabel;
    body='<h1>'+esc(title)+'</h1>'+Object.entries(bundle.articles).map(([slug,a])=>'<div class="editorial-card"><h2><a href="'+root+'articles/'+slug+'/">'+esc(a.title)+'</a></h2><p>'+esc(a.intro[0])+'</p></div>').join('');
  } else {
    const a=bundle.articles[path.split('/')[1]];
    title=a.title;
    body='<nav><a href="'+root+'articles/">'+esc(articleLabel)+'</a></nav><h1>'+esc(a.title)+'</h1>'+
      a.intro.map(p=>'<p>'+esc(p)+'</p>').join('')+
      a.sections.map(s=>'<section><h2>'+esc(s.heading)+'</h2>'+s.paragraphs.map(p=>'<p>'+esc(p)+'</p>').join('')+'</section>').join('')+
      '<p>'+a.sources.map(([label,href])=>'<a href="'+esc(href)+'">'+esc(label)+'</a>').join(' · ')+'</p>'+
      editorialSchema({'@context':'https://schema.org','@type':'Article',headline:a.title,description:a.intro[0],inLanguage:locale,mainEntityOfPage:url,citation:a.sources.map(x=>x[1])});
  }
  return {title,body:styles+'<article class="editorial-body">'+body+'</article>'};
}
