import {SiteHeader,SiteFooter} from './components/SiteChrome';
import {homeFaq} from './home-faq';
import {LiveFinds} from './components/LiveFinds';
import {homeCopy} from './seo-home-copy';
import {localePrefix,localizedCategories,type SiteLocale} from './i18n';
import {categories} from './site-data';
import {articles} from './articles/article-data';
import {localizedArticle} from './articles/translation';
export function HomeView({locale='en'}:{locale?:SiteLocale}) {
 const t=homeCopy[locale],prefix=localePrefix(locale),faq=homeFaq[locale];
 const reading=Object.entries(articles).slice(-4).map(([slug,a])=>({slug,...localizedArticle(a,locale)}));
 const schema={'@context':'https://schema.org','@type':'WebSite',name:'CSSBuy Spreadsheet',url:'https://cssbuychina.net'+(prefix||'/'),inLanguage:locale,potentialAction:{'@type':'SearchAction',target:'https://cssbuychina.net'+prefix+'/catalog/?q={search_term_string}','query-input':'required name=search_term_string'}};
 return <div className="seo-page">
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify([schema,{'@context':'https://schema.org','@type':'FAQPage',mainEntity:faq.items.map(([question,answer])=>({'@type':'Question',name:question,acceptedAnswer:{'@type':'Answer',text:answer}}))}])}}/>
  <SiteHeader locale={locale}/>
  <main>
   <section className="seo-hero"><div className="seo-intro"><p className="seo-eyebrow">CSSBUY SPREADSHEET · 2026</p><h1>{t[1]}<em>{t[0]}</em></h1><p className="seo-lede">{t[2]}</p><form className="seo-search" action={`${prefix}/catalog/`} method="get" role="search"><label htmlFor="home-query" className="sr-only">{t[3]}</label><input id="home-query" name="q" type="search" placeholder={t[3]} maxLength={100}/><button>{t[4]} →</button></form><div className="seo-actions"><a href={`${prefix}/catalog/image-search/`}>▧ {t[5]}</a><a href={`${prefix}/catalog/`}>{t[7]} ↗</a></div><p className="seo-caption">{t[24]}</p></div><div className="seo-preview"><div className="seo-preview-title"><span>{t[8]}</span><span>USD / QC</span></div><LiveFinds locale={locale}/></div></section>
   <section className="seo-categories"><h2>{t[9]}</h2><div>{categories.map(c=><a key={c.slug} href={`${prefix}/catalog/${c.slug==='jerseys'?'jersey':c.slug}/`}><span>{c.symbol}</span>{localizedCategories[locale][c.slug].name} ↗</a>)}</div></section>
   <section className="seo-workflow"><div className="seo-section-heading"><h2>{t[10]}</h2><p>{t[25]}</p></div><div className="seo-steps">{[11,13,15].map((n,i)=><article key={n}><span>0{i+1}</span><h3>{t[n]}</h3><p>{t[n+1]}</p></article>)}</div><p className="seo-caption">{t[23]}</p></section>
   <section className="seo-reading"><div className="seo-section-heading"><h2>{t[17]}</h2><a href={`${prefix}/articles`}>{t[18]} ↗</a></div><div className="seo-article-grid">{reading.map((a,i)=><a href={`${prefix}/articles/${a.slug}`} key={a.slug}><span>0{i+1} / CSSBUY GUIDE</span><h3>{a.h1||a.title}</h3><p>{a.description}</p><b>↗</b></a>)}</div></section>
   <section className="seo-faq" id="faq" aria-labelledby="home-faq-title"><div className="seo-section-heading"><div><p className="seo-eyebrow">FAQ</p><h2 id="home-faq-title">{faq.title}</h2><p>{faq.intro}</p></div><a href={`${prefix}/faq`}>{faq.all} ↗</a></div><div className="seo-faq-list">{faq.items.map(([question,answer],index)=><details key={question} open={index===0}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
  </main>
  <SiteFooter locale={locale}/>
 </div>;
}
export default function HomePage(){return <HomeView/>}
