"""Release gate: language parity, indexability, route discovery and structured data."""
from pathlib import Path
from urllib.parse import urlsplit
from lxml import html,etree
import json

ROOT=Path(__file__).resolve().parents[1]
manifest=json.loads((ROOT/'maintenance/content-20261016/manifest.json').read_text())
routes=set(json.loads((ROOT/'commerce/routes.json').read_text())['routes'])
sitemap=set(etree.parse(str(ROOT/'editorial-sitemap.xml')).xpath('//*[local-name()="loc"]/text()'))
errors=[]
def check(ok,message):
 if not ok:errors.append(message)
for lang,articles in manifest['articles'].items():
 prefix='' if lang=='en' else '/'+lang
 for key,a in articles.items():
  path=a['path'];d=html.fromstring((ROOT/path.strip('/')/'index.html').read_text())
  check(d.get('lang')==lang,path+' HTML language')
  check(len(d.xpath('//h1'))==1,path+' H1 count')
  check(d.xpath('//link[@rel="canonical"]/@href')==['https://pikobuy-sheet.net'+path],path+' canonical')
  check(all('noindex' not in x for x in d.xpath('//meta[@name="robots"]/@content')),path+' indexing')
  check('https://pikobuy-sheet.net'+path in sitemap,path+' sitemap')
  expected={l:'https://pikobuy-sheet.net'+manifest['articles'][l][key]['path'] for l in manifest['languages']}
  expected['x-default']=expected['en']
  actual={e.get('hreflang'):e.get('href') for e in d.xpath('//link[@rel="alternate"]')}
  check(actual==expected,path+' reciprocal alternates')
  article=d.xpath('//article')[0]
  check(len(article.text_content().split())>=900,path+' full article body')
  check(len(article.xpath('.//section[h2]'))>=8,path+' sections')
  data=[json.loads(e.text) for e in d.xpath('//script[@type="application/ld+json"]')]
  blog=data[0]['@graph'][0]
  check(blog['inLanguage']==lang and blog['mainEntityOfPage']=='https://pikobuy-sheet.net'+path,path+' schema')
  for link in d.xpath('//a[@href]'):
   u=urlsplit(link.get('href'));target=u.path
   if not u.netloc and target.startswith('/') and '/catalog/' not in target:
    check(target in routes or target+'/' in routes,path+' broken route '+target)
   if not target and u.fragment:check(bool(d.xpath('//*[@id=$id]',id=u.fragment)),path+' missing anchor '+u.fragment)
  nav=d.xpath('//header[contains(@class,"piko-header")]//a[@hreflang]')
  check(len(nav)==7 and all(e.get('href')==manifest['articles'][e.get('hreflang')][key]['path'] for e in nav),path+' language switch')
 for page in ['/','/seo-articles/']:
  d=html.fromstring((ROOT/(prefix+page).strip('/')/'index.html').read_text())
  cards=d.xpath('//a[contains(concat(" ",@class," ")," article-card ")]')
  check(len(cards)==(5 if page=='/' else 29),prefix+page+' article count')
  for a in articles.values():check(any(c.get('href')==a['path'] for c in cards),prefix+page+' missing priority article')
 for g in ['how-to-use-pikobuy','pikobuy-qc-checklist','pikobuy-shipping-cost']:
  d=html.fromstring((ROOT/(prefix+'/guides/'+g).strip('/')/'index.html').read_text())
  check(not any('noindex' in v for v in d.xpath('//meta[@name="robots"]/@content')),prefix+g+' indexability')
if errors:raise SystemExit('\n'.join(errors))
print('PASS: 35 full article versions, 7 locales, 29 library entries each, 5 home features, canonicals/hreflang, schema, links, anchors, sitemap and guide indexing.')
