import fs from 'node:fs';
import {registerHooks} from 'node:module';
import {spawnSync} from 'node:child_process';
registerHooks({load(url,ctx,next){if(url.endsWith('.json') && url.startsWith('file:'))return {format:'module',shortCircuit:true,source:'export default '+fs.readFileSync(new URL(url),'utf8')};return next(url,ctx);}});
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {createHash,webcrypto} from 'node:crypto';
import {parseHTML} from '../editorial/usfanstab-com/node_modules/linkedom/esm/index.js';
const [site,mode='en']=process.argv.slice(2);
const live=mode.startsWith('live-');
const netFetch=globalThis.fetch;
const folder=path.resolve('editorial',site);
const host=site.replace(/-com$/,'.com');
const origin='https://'+host;
const revision='9eab64e46c1b948cad97a96b374a34229efd0250';
const baseFile=file=>{
 const proc=spawnSync('git',['-C','editorial','show',revision+':'+site+'/'+file],{encoding:'utf8',maxBuffer:64*1024*1024});
 return proc.status===0?proc.stdout:null;
};
const report={host,scope:mode,baseline:revision,entry:'',expectedLocales:[],languages:{},errors:[],warnings:[],legacyFiltered:[],articleFingerprints:[]};
const output='release-qa/'+site+'.'+mode+'.json';
const save=()=>fs.writeFileSync(output,JSON.stringify(report,null,2));
const env={ASSETS:{fetch:async req=>{
 const u=new URL(req.url||req);const f=folder+'/dist/assets/'+u.pathname.replace(/^\//,'');
 return fs.existsSync(f)&&fs.statSync(f).isFile()?new Response(fs.readFileSync(f)):new Response(null,{status:404});
}}};
if(!globalThis.crypto)Object.defineProperty(globalThis,'crypto',{value:webcrypto});
globalThis.caches={default:{match:async()=>undefined,put:async()=>undefined}};
globalThis.fetch=async()=>new Response('<urlset></urlset>',{status:503});
const tokens=t=>norm(t).toLowerCase().match(/[a-z0-9]+/g)||[];
const hash=t=>createHash('sha256').update(t).digest('hex');
const norm=t=>(t||'').normalize('NFKC').replace(/\s+/g,' ').trim();
const txt=(d,sel)=>norm(d.querySelector(sel)?.textContent);
const check=(condition,code,item)=>{if(!condition)report.errors.push({code,item});};
const warn=(code,item)=>report.warnings.push({code,item});
try{
 const config=fs.readdirSync(folder).find(s=>/^wrangler\.jsonc?$/.test(s));
 const main=fs.readFileSync(folder+'/'+config,'utf8').match(/"main"\s*:\s*"([^"]+)"/)[1];report.entry=main;
 const worker=live?{fetch:req=>netFetch(req,{redirect:'manual',signal:AbortSignal.timeout(20000)})}:(await import(pathToFileURL(folder+'/'+main))).default;
 const get=async(url,redir=true)=>{
   let u=new URL(url,origin),r;
   for(let i=0;i<4;i++){r=await worker.fetch(new Request(u),env,{waitUntil(promise){Promise.resolve(promise).catch(()=>{});},passThroughOnException(){}});if(!redir||r.status<300||r.status>=400||!r.headers.get('Location'))break;u=new URL(r.headers.get('Location'),u);}
   return {html:await r.text(),status:r.status,path:u.pathname,href:u.href};
 };
 const doc=(response)=>parseHTML(response.html).document;
 const schemas=d=>[...d.querySelectorAll('script[type="application/ld+json"]')].flatMap(script=>{try{const data=JSON.parse(script.textContent);return data['@graph']||[data]}catch{report.errors.push({code:'invalid-json-ld'});return []}});
 const hrefs=html=>[...html.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1].replaceAll('&amp;','&'));
 const smIndex=await get('/sitemap.xml');
 const entries=hrefs(smIndex.html);
 const editorialMap=entries.find(s=>/(?:sitemap-|sitemaps\/)pages\.xml$/.test(s));
 let lists=(editorialMap?entries.filter(s=>/products-[a-z]+\.xml$/.test(s)):entries.filter(s=>/sitemap[-/][a-z]+\.xml$/i.test(s)));
 const sharedMap=editorialMap?await get(editorialMap):null;
 const expect=site==='usfanstab-com'?8:site==='ootdbuygrid-com'?30:24;
 check(lists.length===expect,'locale-sitemaps',{expected:expect,found:lists.length});
 for(const sm of lists){
  const lang=sm.match(/(?:sitemap[-/]|products-)([a-z]+)\.xml/i)?.[1];if(!lang)continue;
  report.expectedLocales.push(lang);
  if(mode.endsWith('en')&&lang!=='en')continue;
  const sitemap=sharedMap||await get(sm);const mapped=new Set(hrefs(sitemap.html));
  const base=(site==='usfanstab-com'&&lang==='en'?'':'/'+lang)+'/';
  const indexed=[...mapped].filter(s=>new URL(s).pathname.replace(/\/$/,'')===base+'articles');
  const h=await get(indexed[0]||base+'articles/');
  const summary={index:h.path,indexStatus:h.status,sitemapArticleCount:0,newArticleCount:0,faq:null,articles:[]};report.languages[lang]=summary;
  const index=doc(h);
  if(indexed.length&&h.status===200){
   const can=index.querySelector('link[rel="canonical"]')?.getAttribute('href');
   check(can===indexed[0],'article-index-canonical',{url:indexed[0],canonical:can});
   const bad=await get(base+'articles/editorial-qa-invalid-slug-9f7d/');
   if(bad.status!==404)warn('missing-article-http-status',{lang,status:bad.status});
  }
  const linked=[...new Set([...index.querySelectorAll('a[href]')].map(a=>new URL(a.getAttribute('href'),h.href)).filter(u=>u.origin===origin&&u.pathname.startsWith(base+'articles/')&&u.pathname.slice((base+'articles/').length).replace(/\/$/,'').length).map(u=>u.href))];
  const mapArticles=[...mapped].filter(s=>new URL(s).pathname.startsWith(base+'articles/')&&new URL(s).pathname.slice((base+'articles/').length).replace(/\/$/,''));
  summary.sitemapArticleCount=mapArticles.length;
  check(h.status===200,'article-index-status',h.path);
  check(indexed.length===1,'article-index-sitemap',h.path);
  let legacy=[];
  if(site==='usfanstab-com'){const o=JSON.parse(baseFile('src/content/editorial.json'));legacy=o[lang]?.articles.map(a=>a.slug)||[];}
  if(site==='ootdbuygrid-com'){const s=baseFile('qc-guide.mjs')||'';legacy=[s.match(/(?:const|let) slug\s*=\s*['"]([^'"]+)/)?.[1]];}
  const fresh=linked.filter(s=>!legacy.includes(new URL(s).pathname.split('/').filter(Boolean).at(-1)));
  if(lang==='en')report.legacyFiltered=linked.filter(s=>!fresh.includes(s));
  summary.newArticleCount=fresh.length;
  check(fresh.length===10,'new-article-count',{lang,found:fresh.length});
  for(const url of fresh){
   const r=await get(url);const d=doc(r);const meta=schemas(d).find(s=>['Article','BlogPosting'].includes(s['@type']));
   const canonical=d.querySelector('link[rel="canonical"]')?.getAttribute('href');const title=txt(d,'h1');
   const body=d.querySelector('article.article-body, main article, article')||d.querySelector('main')||d.body;
   const paragraphs=[...body.querySelectorAll('p,li')].map(p=>norm(p.textContent)).filter(p=>p.length>30);
   const words=paragraphs.join(' ').split(/\s+/).length;
   const sources=[...new Set([...body.querySelectorAll('a[href^="https://"]')].map(a=>a.getAttribute('href')).filter(link=>new URL(link).host!==host))];
   check(r.status===200&&Boolean(meta),'article-status-schema',url);
   check(canonical===url,'article-canonical',{url,canonical});
   check(mapped.has(url),'article-sitemap-missing',url);
   check(Boolean(title&&d.querySelector('meta[name="description"]')?.getAttribute('content')),'article-title-description',url);
   check(sources.length>0||Boolean(meta?.citation?.length),'article-sources',url);
   check(Boolean(d.querySelector('link[hreflang="x-default"]')),'article-hreflang',url);
   if(meta?.inLanguage)check(meta.inLanguage.toLowerCase().split('-')[0]===lang.toLowerCase().split('-')[0],'article-schema-language',url);
   if(lang==='en'){
    const fullWords=norm(body.textContent).split(/\s+/).length;
    const heads=[...body.querySelectorAll('h1,h2,h3,h4')].reduce((n,h)=>n+norm(h.textContent).split(/\s+/).length,0);
    if(words+heads<1200||words>1830)warn('visible-prose-word-count',{url,words,includingHeadings:words+heads,rawFullBodyWords:fullWords});
    const meaningful=paragraphs.filter(p=>p.split(/\s+/).length>=16);
    const ws=tokens(meaningful.join(' '));const shingles=[];for(let i=0;i+6<ws.length;i++)shingles.push(hash(ws.slice(i,i+7).join(' ')).slice(0,12));
    report.articleFingerprints.push({url,title,hash:hash(meaningful.join(' ')),paragraphHashes:meaningful.map(hash),shingles:[...new Set(shingles)].sort().slice(0,128)});
   }
   const enArticles=report.languages.en?.articles||[];
   const prior=lang==='en'?null:enArticles.find(a=>a.url.split('/').filter(Boolean).at(-1)===url.split('/').filter(Boolean).at(-1));
   const phraseHashes=paragraphs.filter(p=>p.length>150).map(hash);
   if(prior){
     if(prior.paragraphHashes?.some(t=>phraseHashes.includes(t)))warn('english-paragraph-in-translation',url);
     check(prior.title!==title,'english-title-in-translation',url);
   }
   const desc=d.querySelector('meta[name="description"]')?.getAttribute('content')||'';
   summary.articles.push({url,title,descriptionHash:hash(desc),paragraphHashes:lang==='en'?phraseHashes:undefined,textHash:hash(paragraphs.join(' ')),words,sources:[...new Set([...sources,...(Array.isArray(meta?.citation)?meta.citation:[])])],sourceCount:sources.length||meta?.citation?.length||0});
  }
  if(summary.articles.length&&new Set(summary.articles.map(a=>a.descriptionHash)).size<summary.articles.length)warn('reused-meta-descriptions',lang);
  const candidates=[...mapped].filter(u=>new URL(u).pathname.startsWith(base)).filter(u=>['faq','guide','guides','how-to-buy'].includes(new URL(u).pathname.slice(base.length).replace(/\/$/,''))).sort((a,b)=>Number(!a.includes('/faq'))-Number(!b.includes('/faq')));
  for(const url of candidates){
    const r=await get(url);const d=doc(r);const entity=schemas(d).find(x=>x['@type']==='FAQPage');
    if(!entity)continue;
    for(const script of d.querySelectorAll('script,style'))script.remove();
    const bodyText=norm(d.querySelector('main')?.textContent||d.documentElement.textContent);
    const pairs=entity.mainEntity||[];
    const can=d.querySelector('link[rel="canonical"]')?.getAttribute('href');
    check(can===url,'faq-canonical',{url,canonical:can});
    const linksToIndex=[...d.querySelectorAll('a[href]')].some(a=>{try{return new URL(a.getAttribute('href'),url).pathname.replace(/\/$/,'')===h.path.replace(/\/$/,'')}catch{return false}});
    if(!linksToIndex)warn('no-article-index-link-from-faq',url);
    summary.faq={url,genuineEnglishQuestions:lang==='en'?pairs.filter(q=>norm(q.name).endsWith('?')).length:undefined,count:pairs.length,unique:new Set(pairs.map(q=>norm(q.name))).size,visible:pairs.filter(q=>bodyText.includes(norm(q.name))&&bodyText.includes(norm(q.acceptedAnswer?.text))).length};
    check(r.status===200&&summary.faq.count>20&&summary.faq.unique===summary.faq.count,'faq-unique-count',{lang,...summary.faq});
    check(summary.faq.visible===summary.faq.count,'faq-schema-visible',{lang,...summary.faq});
    break;
  }
  check(!!summary.faq,'faq-page-missing',lang);
  if(lang==='en'&&summary.faq)check(summary.faq.genuineEnglishQuestions>=21,'insufficient-genuine-faq',summary.faq);
  if(lang!=='en'&&report.languages.en){
   const en=report.languages.en.articles;
   for(const art of summary.articles){const match=en.find(a=>a.url.split('/').filter(Boolean).at(-1)===art.url.split('/').filter(Boolean).at(-1));if(match) check(match.textHash!==art.textHash,'untranslated-article',art.url);}
  }
  save();
 }
}catch(error){report.errors.push({code:'runner-exception',detail:String(error.stack||error).slice(0,1600)});}
save();console.log(site,report.expectedLocales.length,Object.values(report.languages).map(x=>[x.newArticleCount,x.faq?.count]),report.errors.length,report.warnings.length);
