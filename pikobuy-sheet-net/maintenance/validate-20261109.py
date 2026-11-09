"""Verify a complete, navigable, indexable multilingual release."""
from pathlib import Path
from urllib.parse import urlsplit
from lxml import html,etree
import json,re
ROOT=Path(__file__).resolve().parents[1]
M=json.loads((ROOT/'maintenance/content-20261109/manifest.json').read_text())
ORIGIN='https://pikobuy-sheet.net'
LANGS=M['languages'];routes=set(json.loads((ROOT/'commerce/routes.json').read_text())['routes'])
sitemap=etree.parse(str(ROOT/'editorial-sitemap.xml')).xpath('//*[local-name()="loc"]/text()')
errors=[]
def check(ok,msg):
 if not ok:errors.append(msg)
def file_for(path):return ROOT/path.strip('/')/'index.html'
def read(path):return html.parse(str(file_for(path)))
check(len(sitemap)==len(set(sitemap)),'Duplicate sitemap URLs')
for lang,articles in M['articles'].items():
 prefix='' if lang=='en' else '/'+lang
 check(len(articles)==32,lang+' has 32 articles')
 check(len(list((ROOT/(prefix+'/articles/').strip('/')).glob('*/index.html')))==32,lang+' has 32 real bodies')
 for slug,a in articles.items():
  path=a['path'];d=read(path)
  check(d.getroot().get('lang')==lang,path+' html lang')
  check(len(d.xpath('//h1'))==1,path+' H1 count')
  check(len(d.xpath('//title'))==1 and bool(d.xpath('//title/text()')),path+' title')
  check(d.xpath('//head/link[@rel="canonical"]/@href')==[ORIGIN+path],path+' canonical')
  expected={l:ORIGIN+M['articles'][l][slug]['path'] for l in LANGS};expected['x-default']=expected['en']
  check({e.get('hreflang'):e.get('href') for e in d.xpath('//head/link[@rel="alternate"]')}==expected,path+' alternates')
  check(ORIGIN+path in sitemap,path+' sitemap')
  check(path in routes,path+' worker route')
  check(not any('noindex' in s for s in d.xpath('//meta[@name="robots"]/@content')),path+' indexability')
  body=d.xpath('//article//div[contains(concat(" ",@class," ")," article-copy ") or contains(concat(" ",@class," ")," editorial-body ")]')[0]
  check(len(body.text_content().split())>=750,path+' substantial content')
  check(len(body.xpath('./section[h2]'))>=6,path+' real chapters')
  schemas=[json.loads(s.text) for s in d.xpath('//script[@type="application/ld+json"]')]
  blog=schemas[0]['@graph'][0]
  check(blog['inLanguage']==lang and blog['mainEntityOfPage']==ORIGIN+path,path+' schema locale and URL')
  check(blog['headline']==d.xpath('string(//head/title)'),path+' schema headline')
  nav=d.xpath('//header[contains(@class,"piko-header")]//a[@hreflang]')
  check(len(nav)==7 and all(e.get('href')==M['articles'][e.get('hreflang')][slug]['path'] for e in nav),path+' language menu')
  check(len(d.xpath('//script[@src="/assets/piko-mobile-20261109-v1.js"]'))==1,path+' reading script once')
  ids=d.xpath('//*[@id]/@id');check(len(ids)==len(set(ids)),path+' unique anchors')
  for link in d.xpath('//a[@href]'):
   raw=link.get('href');u=urlsplit(raw);target=u.path
   if (not u.netloc or u.netloc=='pikobuy-sheet.net') and target.startswith('/'):
    check(target in routes or target+'/' in routes or target.startswith(prefix+'/catalog/') or (ROOT/target.lstrip('/')).is_file(),path+' broken internal link '+raw)
    if '/articles/' in target and not link.get('hreflang'):check(target.startswith(prefix+'/articles/'),path+' wrong-language link '+raw)
   if not target and u.fragment:check(u.fragment in ids,path+' missing anchor '+u.fragment)
  for e in d.xpath('//head/link[@rel="stylesheet"]|//script[@src]'):
   href=e.get('href') or e.get('src');u=urlsplit(href)
   if not u.netloc:check((ROOT/u.path.lstrip('/')).exists(),path+' missing asset '+u.path)
 for page,count in [('/',6),('/seo-articles/',32)]:
  path=prefix+page;d=read(path);cards=d.xpath('//a[contains(concat(" ",@class," ")," article-card ")]')
  check(len(cards)==count,path+' card count');check(len({x.get('href') for x in cards})==count,path+' no duplicate cards')
  check(all(x.get('href').startswith(prefix+'/articles/') for x in cards),path+' local article cards')
  if page!='/':
   data=json.loads(d.xpath('//script[@type="application/ld+json"]')[0].text)
   check(data['mainEntity']['numberOfItems']==32,path+' schema count')
   check(not d.xpath('//*[contains(@class,"english-badge") or contains(@class,"language-badge")]'),path+' no fallback badges')
 d=read(prefix+'/faq/');faqs=d.xpath('//div[@class="faq-list"]/details');check(len(faqs)==20,lang+' FAQ count')
 schema=[json.loads(s.text) for s in d.xpath('//script[@type="application/ld+json"]') if 'FAQPage' in (s.text or '')][0]
 check(len(schema['mainEntity'])==20,lang+' FAQ schema count')
 for entry,element in zip(schema['mainEntity'],faqs):
  check(entry['name']==element.find('summary').text_content() and entry['acceptedAnswer']['text']==element.find('p').text_content(),lang+' FAQ visible/schema parity')
if errors:raise SystemExit('\n'.join(errors[:50])+f'\nTotal errors: {len(errors)}')
print(f'PASS: 224 full article pages, 32 articles and 20 FAQs per language, complete hreflang, locale switches, schema, sitemap, assets and internal links; {len(sitemap)} editorial URLs.')
