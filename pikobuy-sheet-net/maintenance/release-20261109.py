"""Build complete seven-language article sets from retained Markdown assets.
Dependencies: python -m pip install -r maintenance/requirements.txt
"""
from pathlib import Path
from copy import deepcopy
from lxml import html, etree
import json, re
import markdown

ROOT=Path(__file__).resolve().parents[1]
SOURCE=ROOT/'maintenance/content-20261109'
ORIGIN='https://pikobuy-sheet.net'
DATE='2026-11-09'
LANGS=['en','de','fr','es','it','pl','pt']
NEW=['how-long-does-pikobuy-take','how-to-submit-pikobuy-parcel','is-pikobuy-legit-buying-risks']
TRACK='pikobuy-tracking-warehouse-to-delivery'
FEES='pikobuy-fees-product-shipping-extra-costs'
COST='estimate-pikobuy-parcel-cost'
QC='warehouse-photos-before-shipping'
IMAGE='pikobuy-image-search-dead-link-recovery'
UI=json.loads((SOURCE/'interface.json').read_text())
old_sitemap=etree.parse(str(ROOT/'editorial-sitemap.xml'))
old_dates={x.xpath('string(./*[local-name()="loc"])'):x.xpath('string(./*[local-name()="lastmod"])') for x in old_sitemap.getroot()}

def pre(lang):return '' if lang=='en' else '/'+lang
def route(lang,slug):return pre(lang)+'/articles/'+slug+'/'
def file_for(path):return ROOT/path.strip('/')/'index.html'
def read(p):return html.fromstring(p.read_text())
def write(p,d):
 p.parent.mkdir(parents=True,exist_ok=True)
 p.write_text('<!DOCTYPE html>\n'+html.tostring(d,encoding='unicode',method='html')+'\n')
def add(parent,tag,text=None,**attrs):
 e=etree.SubElement(parent,tag,attrs)
 if text is not None:e.text=text
 return e
def meta(d,title,desc):
 d.find('head/title').text=title
 for attr,key,value in [('name','description',desc),('property','og:title',title),('property','og:description',desc),('name','twitter:title',title),('name','twitter:description',desc)]:
  es=d.xpath(f'//head/meta[@{attr}="{key}"]')
  if not es:es=[add(d.find('head'),'meta',**{attr:key})]
  for e in es:e.set('content',value)
def body_of(d):return d.xpath('//article//div[contains(concat(" ",@class," ")," editorial-body ") or contains(concat(" ",@class," ")," article-copy ")]')[0]
def section(parent,title,ident):
 s=add(parent,'section',id=ident);add(s,'h2',title);return s
def metadata(d,lang,path):
 d.set('lang',lang);d.find('body').set('data-locale',lang)
 for e in d.xpath('//head/link[@rel="canonical" or @rel="alternate"]'):e.getparent().remove(e)
 add(d.find('head'),'link',rel='canonical',href=ORIGIN+path)
 bare=path[len(pre(lang)):]
 for l in LANGS:add(d.find('head'),'link',rel='alternate',hreflang=l,href=ORIGIN+pre(l)+bare)
 add(d.find('head'),'link',rel='alternate',hreflang='x-default',href=ORIGIN+bare)
 for e in d.xpath('//head/meta[@property="og:url"]'):e.set('content',ORIGIN+path)
 for e in d.xpath('//head/meta[@property="og:type"]'):e.set('content','article' if '/articles/' in path else 'website')
 for e in d.xpath('//head/meta[@name="robots"]'):e.getparent().remove(e)
 add(d.find('head'),'meta',name='robots',content='index,follow,max-image-preview:large')
 for e in d.xpath('//header[contains(@class,"piko-header")]//a[@hreflang]'):e.set('href',pre(e.get('hreflang'))+bare)
 for e in d.xpath('//a[contains(concat(" ",@class," ")," piko-brand ")]'):e.set('href',pre(lang)+'/')
 for e in d.xpath('//script[@src]'):
  if '/assets/piko-site-' in e.get('src'):e.set('src','/assets/piko-site-20261016-research-v1.js')
 if not d.xpath('//link[@href="/assets/piko-seo-20261016-v1.css"]'):add(d.find('head'),'link',rel='stylesheet',href='/assets/piko-seo-20261016-v1.css')
 if not d.xpath('//link[@href="/assets/piko-seo-20261109-v1.css"]'):add(d.find('head'),'link',rel='stylesheet',href='/assets/piko-seo-20261109-v1.css')
 # Use the same progressive reading controls in static preview and production.
 if bare!='/':
  classes=d.find('body').get('class','').split()
  if 'piko-compact-page' not in classes:classes.append('piko-compact-page')
  d.find('body').set('class',' '.join(classes))
  if not d.xpath('//link[@href="/assets/piko-mobile-20261013-v1.css"]'):add(d.find('head'),'link',rel='stylesheet',href='/assets/piko-mobile-20261013-v1.css')
  for e in d.xpath('//script[contains(@src,"piko-mobile-")]'):e.getparent().remove(e)
  add(d.find('head'),'script',src='/assets/piko-mobile-20261109-v1.js',defer='')
def strip_schema(d):
 for e in d.xpath('//script[@type="application/ld+json"]'):e.getparent().remove(e)
def schema(d,data):add(d.find('head'),'script',json.dumps({'@context':'https://schema.org',**data},ensure_ascii=False),type='application/ld+json')
def article_schema(d,lang,slug,title,desc,published,modified):
 strip_schema(d);path=route(lang,slug)
 schema(d,{'@graph':[
  {'@type':'BlogPosting','headline':title,'description':desc,'datePublished':published,'dateModified':modified,'inLanguage':lang,'mainEntityOfPage':ORIGIN+path,'image':ORIGIN+'/article-social.svg','author':{'@type':'Organization','name':'PikoBuy Sheet Research Desk','url':ORIGIN+pre(lang)+'/about/'},'publisher':{'@type':'Organization','name':'PikoBuy Sheet','logo':{'@type':'ImageObject','url':ORIGIN+'/pikobuy-logo.png'}},'isAccessibleForFree':True},
  {'@type':'BreadcrumbList','itemListElement':[{'@type':'ListItem','position':1,'name':'PikoBuy Sheet','item':ORIGIN+pre(lang)+'/'},{'@type':'ListItem','position':2,'name':UI[lang]['libraryHeading'],'item':ORIGIN+pre(lang)+'/seo-articles/'},{'@type':'ListItem','position':3,'name':title,'item':ORIGIN+path}]}
 ]})
 for prop,val in [('article:published_time',published),('article:modified_time',modified)]:
  es=d.xpath(f'//head/meta[@property="{prop}"]')
  if not es:es=[add(d.find('head'),'meta',property=prop)]
  for e in es:e.set('content',val)
def render_markdown(body,text):
 fragment=html.fragment_fromstring(markdown.markdown(text,extensions=['tables','fenced_code','sane_lists']),create_parent='div')
 current=None
 for node in list(fragment):
  if node.tag=='h1':raise ValueError('Body must start with H2, not H1')
  if node.tag=='h2':
   current=add(body,'section',id='chapter-'+str(len(body)+1));current.append(node)
  else:
   if current is None:current=section(body,UI[current_lang]['quick'],'overview')
   current.append(node)
 for table in body.xpath('.//table'):
  wrapper=etree.Element('div',{'class':'table-scroll','tabindex':'0'});table.addprevious(wrapper);wrapper.append(table)
 for e in body.xpath('.//a[starts-with(@href,"https://www.pikobuy.com")]'):e.set('rel','noopener noreferrer');e.set('target','_blank')
def refresh_toc(d,lang):
 tocs=d.xpath('//aside[contains(@class,"article-toc")]')
 if not tocs:return
 toc=tocs[0];toc.clear();toc.set('class','article-toc');add(toc,'strong',UI[lang]['toc'])
 for i,s in enumerate(body_of(d).xpath('./section[h2]'),1):
  ident=s.get('id') or 'chapter-'+str(i);s.set('id',ident)
  add(toc,'a',f'{i:02d} '+s.find('h2').text_content(),href='#'+ident)

# Validate the complete content inventory before changing published files.
existing=sorted(p.parent.name for p in (ROOT/'articles').glob('*/index.html') if p.parent.name not in NEW)
assert len(existing)==29, f'Expected 29 originals, found {len(existing)}'
slugs=existing+NEW
for l in LANGS:
 for slug in slugs:
  assert (SOURCE/l/(slug+'.md')).exists() or file_for(route(l,slug)).exists(),f'Missing {l}/{slug}'

originals={s:read(file_for(route('en',s))) for s in existing}
templates={l:read(file_for(route(l,TRACK))) for l in LANGS}
records={l:{} for l in LANGS};changed=set()
for lang in LANGS:
 current_lang=lang;t=UI[lang]
 for slug in slugs:
  p=file_for(route(lang,slug));source=SOURCE/lang/(slug+'.md')
  prior=originals.get(slug)
  oldpub=prior.xpath('//meta[@property="article:published_time"]/@content') if prior is not None else []
  oldmod=prior.xpath('//meta[@property="article:modified_time"]/@content') if prior is not None else []
  published=(oldpub[0] if oldpub else '2026-07-30T08:00:00Z') if slug not in NEW else DATE+'T08:00:00Z'
  modified=DATE+'T08:00:00Z' if source.exists() or slug==TRACK else (oldmod[0] if oldmod else published)
  if source.exists():
   lines=source.read_text().splitlines();title,desc=lines[0].lstrip('# ').strip(),lines[1].strip();content='\n'.join(lines[2:]).strip()
   d=deepcopy(templates[lang]);a=d.xpath('//article')[0];a.clear();a.set('class','longform research-article')
   header=add(a,'header');add(header,'span',t['articleLabel'],**{'class':'kicker'});add(header,'h1',title);add(header,'p',desc)
   label=t['updated'] if slug in NEW else t['translated']
   add(header,'div',label+' '+DATE,**{'class':'article-byline'})
   add(a,'aside',t['independent'],**{'class':'fact-box'})
   layout=add(a,'div',**{'class':'article-layout'});add(layout,'aside',**{'class':'article-toc'});body=add(layout,'div',**{'class':'article-copy'})
   render_markdown(body,content)
  else:
   d=read(p);body=body_of(d);title=d.find('head/title').text;desc=d.xpath('//head/meta[@name="description"]/@content')[0]
  for e in d.xpath('//*[@data-release="20261109"]'):e.getparent().remove(e)
  if slug==TRACK:
   title,desc=t['trackingTitle'],t['trackingDesc']
   d.xpath('//article/header/h1')[0].text=title
   d.xpath('//article/header/p')[0].text=desc
   by=d.xpath('//article/header/div[contains(@class,"article-byline")]')
   if by:by[0].clear();by[0].set('class','article-byline');by[0].text=t['updated']+' '+DATE
   answer=etree.Element('aside',{'class':'quick-answer','data-release':'20261109'})
   add(answer,'strong',t['quick']);add(answer,'p',t['trackingAnswer'])
   d.xpath('//article/header')[0].addnext(answer)
  meta(d,title,desc);metadata(d,lang,route(lang,slug));article_schema(d,lang,slug,title,desc,published,modified)
  # Every existing article can now link to a real equivalent in this language.
  for a in d.xpath('//main//a[@href]'):
   href=a.get('href')
   if href.startswith('/articles/') and lang!='en':a.set('href',pre(lang)+href)
  refresh_toc(d,lang);write(p,d);changed.add(route(lang,slug))
  records[lang][slug]={'title':title,'description':desc,'path':route(lang,slug),'published':published,'modified':modified,'wordCount':len(body.text_content().split())}

# Add useful next actions to the complete existing library as well as the new pages.
for lang in LANGS:
 t=UI[lang]
 for slug in slugs:
  p=file_for(route(lang,slug));d=read(p);body=body_of(d)
  s=section(body,t['related'],'next-steps-20261109');s.set('data-release','20261109');s.set('class','article-next-steps')
  relevant=([NEW[0],NEW[1],TRACK,FEES] if any(x in slug for x in ['shipping','parcel','tracking','long-does','weight','holiday']) else [QC,FEES,'pikobuy-size-chart-measurement-guide',NEW[2]])
  for target in dict.fromkeys(relevant):
   if target!=slug:add(add(s,'p'),'a',records[lang][target]['title'],href=route(lang,target))
  add(add(s,'p'),'a',t['catalog']+' →',href=pre(lang)+'/catalog/',**{'class':'primary-button dark'})
  refresh_toc(d,lang);write(p,d)

def card(lang,slug):
 r=records[lang][slug];t=UI[lang];a=etree.Element('a',{'class':'article-card','href':r['path'],'data-article':slug})
 top=add(a,'div',**{'class':'article-top'});add(top,'span',t['articleLabel']);date=r['modified'][:10];add(top,'time',date,datetime=date)
 add(a,'h3',r['title']);add(a,'p',r['description']);add(a,'strong',t['read']+' →');return a
order=NEW+[TRACK,FEES,COST,QC,IMAGE]+[s for s in existing if s not in [TRACK,FEES,COST,QC,IMAGE]]
for lang in LANGS:
 t=UI[lang];prefix=pre(lang)
 for name in ['','seo-articles']:
  path=prefix+'/'+(name+'/' if name else '');p=file_for(path);d=read(p)
  grid=d.xpath('//div[contains(concat(" ",@class," ")," article-grid ")]')[0];grid.clear();grid.set('class','article-grid')
  featured=order if name else [NEW[0],NEW[1],NEW[2],TRACK,FEES,QC]
  for slug in featured:grid.append(card(lang,slug))
  if name:
   hero=d.xpath('//section[contains(@class,"inner-hero")]')[0];hero.find('h1').text=t['libraryHeading'];hero.find('p').text=t['libraryDesc']
   for e in d.xpath('//*[@data-library-count]'):e.set('data-library-count','32');e.text=t['libraryHeading']
   for e in d.xpath('//*[contains(@class,"language-note") or contains(@class,"fallback-note")]'):e.getparent().remove(e)
   # Remove outdated English-fallback notices, since all 32 entries now have local bodies.
   for e in d.xpath('//p'):
    text=e.text_content()
    if ('EN' in text and ('english' in text.lower() or 'anglais' in text or 'inglés' in text or 'englisch' in text.lower() or 'inglese' in text or 'angielsk' in text or 'inglês' in text)) or 'English original' in text:e.getparent().remove(e)
   meta(d,t['libraryTitle'],t['libraryDesc']);strip_schema(d)
   schema(d,{'@type':'CollectionPage','name':t['libraryHeading'],'description':t['libraryDesc'],'url':ORIGIN+path,'inLanguage':lang,'mainEntity':{'@type':'ItemList','numberOfItems':32,'itemListElement':[{'@type':'ListItem','position':i+1,'url':ORIGIN+route(lang,s),'name':records[lang][s]['title']} for i,s in enumerate(order)]}})
  else:
   hero=d.xpath('//div[@class="hero-copy"]')[0];h=hero.find('h1');h.clear();h.text=t['homeHeading'];hero.find('p').text=t['homeDesc'];meta(d,t['homeTitle'],t['homeDesc'])
   # Update visible article names on the home and remove any old root-language fallbacks.
   for e in d.xpath('//a[@href]'):
    href=e.get('href');m=re.fullmatch(r'/(?:de/|fr/|es/|it/|pl/|pt/)?articles/([^/]+)/',href)
    if m and m[1] in slugs:e.set('href',route(lang,m[1]))
  metadata(d,lang,path);write(p,d);changed.add(path)
 # FAQ grows from 12 to 20 real, visible answers. The schema mirrors the text.
 path=prefix+'/faq/';p=file_for(path);d=read(p);faqs=d.xpath('//div[@class="faq-list"]')[0]
 for e in faqs.xpath('./details[@data-release="20261109"]'):faqs.remove(e)
 assert len(faqs)==12
 for q,a,target in t['faq']:
  detail=add(faqs,'details',**{'data-release':'20261109'});add(detail,'summary',q);add(detail,'p',a);add(add(detail,'p'),'a',t['read']+' →',href=route(lang,target))
 hero=d.xpath('//section[contains(@class,"inner-hero")]')[0];hero.find('h1').text=t['faqTitle'];hero.find('p').text=t['faqDesc'];meta(d,t['faqTitle'],t['faqDesc']);metadata(d,lang,path)
 for e in d.xpath('//script[@type="application/ld+json"]'):
  if 'FAQPage' in (e.text or ''):e.getparent().remove(e)
 schema(d,{'@type':'FAQPage','inLanguage':lang,'mainEntity':[{'@type':'Question','name':e.find('summary').text_content(),'acceptedAnswer':{'@type':'Answer','text':e.find('p').text_content()}} for e in faqs]})
 write(p,d);changed.add(path)
 # All three established guide entry pages now offer the next decision in the same language.
 for guide,targets in [('how-to-use-pikobuy',NEW),('pikobuy-shipping-cost',[COST,FEES,NEW[0],NEW[1]]),('pikobuy-qc-checklist',[QC,'pikobuy-returns-5-day-window',NEW[1]])]:
  path=prefix+'/guides/'+guide+'/';p=file_for(path);d=read(p)
  for e in d.xpath('//*[@id="research-next-20261016" or @id="next-steps-20261109"]'):e.getparent().remove(e)
  s=section(d.xpath('//main')[0],t['related'],'next-steps-20261109');s.set('class','inner-section piko-next-reading')
  for target in targets:add(add(s,'p'),'a',records[lang][target]['title'],href=route(lang,target))
  add(add(s,'p'),'a',t['catalog']+' →',href=prefix+'/catalog/')
  metadata(d,lang,path);write(p,d);changed.add(path)

routes=json.loads((ROOT/'commerce/routes.json').read_text());routes['routes']=sorted(set(routes['routes'])|{route(l,s) for l in LANGS for s in slugs})
(ROOT/'commerce/routes.json').write_text(json.dumps(routes,ensure_ascii=False,indent=2)+'\n')
editorial=[r for r in routes['routes'] if not re.search(r'/finds(/|$)',r) and not re.search(r'/categories/[^/]+/',r)]
xml=etree.Element('urlset',nsmap={None:'http://www.sitemaps.org/schemas/sitemap/0.9'})
for r in editorial:
 u=add(xml,'url');add(u,'loc',ORIGIN+r);date=DATE if r in changed else old_dates.get(ORIGIN+r)
 if date:add(u,'lastmod',date)
(ROOT/'editorial-sitemap.xml').write_bytes(etree.tostring(xml,encoding='utf-8',xml_declaration=True))
research={l:{'heading':UI[l]['related'],'items':[[records[l][s]['title'],route(l,s)] for s in [FEES,TRACK,NEW[0],NEW[1],QC]]} for l in LANGS}
module='export const RESEARCH='+json.dumps(research,ensure_ascii=False,separators=(',',':'))+';\n'
module+='export function researchLinks(lang){const r=RESEARCH[lang]||RESEARCH.en;return `<section class="catalog-research"><h2>${r.heading}</h2><div>${r.items.map(([title,href])=>`<a href="${href}">${title} →</a>`).join(\'\')}</div></section>`;}\n'
(ROOT/'commerce/research.mjs').write_text(module)
(SOURCE/'manifest.json').write_text(json.dumps({'date':DATE,'languages':LANGS,'newTopics':NEW,'articleCountPerLanguage':32,'articleVersions':224,'newTranslations':120,'articles':records,'changedPaths':sorted(changed)},ensure_ascii=False,indent=2)+'\n')
print(f'Built {len(LANGS)*len(slugs)} article pages; 32 per language, 20 FAQs per language, {len(editorial)} editorial sitemap URLs.')
