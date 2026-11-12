import {build} from 'esbuild';
import {writeFile,readFile} from 'node:fs/promises';
const result=await build({stdin:{contents:`import {getSeoArticleEntries} from './app/seoArticleLibrary';import {languages,translations} from './app/i18n';import {getEditorialImage} from './app/editorialAssets';import {products} from './app/data';export const content=Object.fromEntries(languages.map(({code})=>[code,{buyingGuides:getSeoArticleEntries(code).filter(e=>['joyagoo-size-guide-clothing-shoes','joyagoo-product-link-not-working','joyagoo-shoe-qc-checklist'].includes(e.slug)).map(e=>({slug:e.slug,title:e.article.title})),articles:getSeoArticleEntries(code).slice(0,4).map(e=>({slug:e.slug,title:e.article.title,description:e.article.description,image:getEditorialImage(e.slug)})),faq:{label:translations[code].nav.faq,title:translations[code].home.faqTitle,intro:translations[code].home.faqIntro,items:translations[code].faq.slice(0,4)},guides:['how-to-buy','qc-guide','shipping-guide'].map(slug=>({slug,title:translations[code].pages[slug].title}))}]));export const legacy=Object.fromEntries(products.map(p=>['/product/'+p.slug+'/',new URL(p.href).pathname]));`,resolveDir:process.cwd(),loader:'ts'},bundle:true,write:false,platform:'node',format:'esm'});
const mod=await import('data:text/javascript;base64,'+Buffer.from(result.outputFiles[0].text).toString('base64'));
const index=JSON.parse(await readFile('public/catalog-image-index.json','utf8'));
const covers=new Map();
const collect=records=>records.forEach(p=>{if(p.kind!=='style'&&(p.imageIndex===undefined||p.imageIndex===0)&&!covers.has(p.path))covers.set(p.path,p);});
if(index.products)collect(index.products);
else for(const shard of index.shards){collect(JSON.parse(await readFile('public'+shard.url,'utf8')).products);if(covers.size>=8)break;}
const unique=[...covers.values()];
if(unique.length<4)throw Error('Homepage requires at least four distinct product covers');
const snapshot={date:index.updatedAt,products:unique.slice(0,8).map(({path,title,image,price})=>({path,title,image:new URL(image,index.source).href,price}))};
await writeFile('commerce/content.js',`// Generated from existing editorial sources and the cnbuycha image index.\nexport const EDITORIAL=${JSON.stringify(mod.content)};\nexport const LEGACY_PRODUCTS=${JSON.stringify(mod.legacy)};\nexport const SNAPSHOT=${JSON.stringify(snapshot)};\n`);
console.log('Prepared editorial links for',Object.keys(mod.content).length,'languages and',Object.keys(mod.legacy).length,'legacy product redirects.');
