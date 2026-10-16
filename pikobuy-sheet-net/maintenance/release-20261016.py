"""Build the researched seven-language editorial release from retained source files."""
from pathlib import Path
from copy import deepcopy
from lxml import html, etree
import json, re

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT/'maintenance/content-20261016'
ORIGIN = 'https://pikobuy-sheet.net'
DATE = '2026-10-16'
LANGS = ['en','de','fr','es','it','pl','pt']
SLUGS = {
 'fees':'pikobuy-fees-product-shipping-extra-costs',
 'tracking':'pikobuy-tracking-warehouse-to-delivery',
 'image':'pikobuy-image-search-dead-link-recovery',
 'shipping':'estimate-pikobuy-parcel-cost',
 'qc':'warehouse-photos-before-shipping',
}
COPY = {
 'en':['In this guide','Updated','Official sources','Related guides','Read article','Browse by category','Shoes','Hoodies','T-shirts','Jackets','Pants and shorts','Accessories','Choose a product, then check the details','Articles','Open image search','Search products','Independent product research. Not operated by or affiliated with PikoBuy.','Fees and shipping','Practical buyer guides','Browse shoes, clothing and accessories in the Pikobuy spreadsheet. Compare product options and photos, then check sizing, fees and shipping before ordering.'],
 'de':['In diesem Leitfaden','Aktualisiert','Offizielle Quellen','Weitere Leitfäden','Artikel lesen','Nach Kategorie suchen','Schuhe','Hoodies','T-Shirts','Jacken','Hosen und Shorts','Accessoires','Produkt auswählen und Details prüfen','Artikel','Bildersuche öffnen','Produkte suchen','Unabhängige Produktrecherche. Nicht von PikoBuy betrieben oder mit PikoBuy verbunden.','Gebühren und Versand','Praktische Kaufleitfäden','Entdecke Schuhe, Kleidung und Accessoires im Pikobuy Spreadsheet. Vergleiche Varianten und Bilder und prüfe Größen, Gebühren und Versand vor dem Kauf.'],
 'fr':['Dans ce guide','Mis à jour','Sources officielles','Guides associés','Lire l’article','Parcourir par catégorie','Chaussures','Sweats à capuche','T-shirts','Vestes','Pantalons et shorts','Accessoires','Choisir un produit, puis vérifier les détails','Articles','Ouvrir la recherche par image','Rechercher des produits','Recherche indépendante. Site ni exploité par PikoBuy ni affilié à PikoBuy.','Frais et livraison','Guides pratiques d’achat','Explorez chaussures, vêtements et accessoires du spreadsheet Pikobuy. Comparez variantes et photos, puis vérifiez tailles, frais et livraison avant de commander.'],
 'es':['En esta guía','Actualizado','Fuentes oficiales','Guías relacionadas','Leer artículo','Explorar por categoría','Calzado','Sudaderas','Camisetas','Chaquetas','Pantalones y shorts','Accesorios','Elige un producto y comprueba los detalles','Artículos','Abrir búsqueda por imagen','Buscar productos','Investigación independiente. Sitio no operado por PikoBuy ni afiliado a la plataforma.','Comisiones y envío','Guías prácticas de compra','Explora calzado, ropa y accesorios del spreadsheet Pikobuy. Compara variantes y fotos y revisa tallas, comisiones y envío antes de comprar.'],
 'it':['In questa guida','Aggiornato','Fonti ufficiali','Guide correlate','Leggi l’articolo','Esplora per categoria','Scarpe','Felpe','T-shirt','Giacche','Pantaloni e shorts','Accessori','Scegli un prodotto e verifica i dettagli','Articoli','Apri la ricerca per immagine','Cerca prodotti','Ricerca indipendente. Sito non gestito da PikoBuy né affiliato alla piattaforma.','Commissioni e spedizione','Guide pratiche all’acquisto','Esplora scarpe, abbigliamento e accessori nello spreadsheet Pikobuy. Confronta varianti e foto e controlla taglie, costi e spedizione prima dell’ordine.'],
 'pl':['W poradniku','Aktualizacja','Oficjalne źródła','Powiązane poradniki','Czytaj artykuł','Przeglądaj kategorie','Buty','Bluzy','T-shirty','Kurtki','Spodnie i szorty','Akcesoria','Wybierz produkt i sprawdź szczegóły','Artykuły','Otwórz wyszukiwanie obrazem','Szukaj produktów','Niezależne badanie produktów. Strona nie jest prowadzona przez PikoBuy ani z nim powiązana.','Opłaty i wysyłka','Praktyczne poradniki zakupowe','Przeglądaj buty, odzież i akcesoria w spreadsheet Pikobuy. Porównaj warianty i zdjęcia oraz sprawdź rozmiary, opłaty i wysyłkę przed zakupem.'],
 'pt':['Neste guia','Atualizado','Fontes oficiais','Guias relacionados','Ler artigo','Explorar categorias','Calçado','Sweatshirts','T-shirts','Casacos','Calças e calções','Acessórios','Escolha um produto e verifique os detalhes','Artigos','Abrir pesquisa por imagem','Pesquisar produtos','Pesquisa independente. Site não operado pela PikoBuy nem afiliado à plataforma.','Taxas e envio','Guias práticos de compra','Explore calçado, roupa e acessórios na planilha Pikobuy. Compare variantes e fotografias e confira tamanhos, taxas e envio antes de comprar.']
}
UPDATES=json.loads((SOURCE/'updates.json').read_text())
def pre(lang): return '' if lang=='en' else '/'+lang
def route(lang,key): return pre(lang)+'/articles/'+SLUGS[key]+'/'
def file_for(url): return ROOT/url.strip('/')/'index.html'
def read(p): return html.fromstring(p.read_text())
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
def source_content(lang,key):
 lines=(SOURCE/f'{lang}-{key}.md').read_text().splitlines()
 return lines[0],lines[1],'\n'.join(lines[2:]).strip()
def body_of(d):
 return d.xpath('//article//div[contains(concat(" ",@class," ")," editorial-body ") or contains(concat(" ",@class," ")," article-copy ")]')[0]
def section(parent,heading,paragraphs,ident):
 s=add(parent,'section',id=ident);add(s,'h2',heading)
 for p in paragraphs:add(s,'p',p)
 return s
def render_md(parent,text):
 current=parent
 for part in text.split('\n\n'):
  if part.startswith('## '):
   current=add(parent,'section',id='section-'+str(len(parent)+1));add(current,'h2',part[3:])
  else:add(current,'p',part)
def install_metadata(d,lang,key,title,desc,published):
 path=route(lang,key);d.set('lang',lang);d.find('body').set('data-locale',lang)
 meta(d,title,desc);head=d.find('head')
 for e in d.xpath('//head/meta[@name="robots"]'):e.getparent().remove(e)
 add(head,'meta',name='robots',content='index,follow,max-image-preview:large')
 for e in d.xpath('//head/link[@rel="canonical" or @rel="alternate"]'):e.getparent().remove(e)
 add(head,'link',rel='canonical',href=ORIGIN+path)
 for l in LANGS:add(head,'link',rel='alternate',hreflang=l,href=ORIGIN+route(l,key))
 add(head,'link',rel='alternate',hreflang='x-default',href=ORIGIN+route('en',key))
 for e in d.xpath('//head/meta[@property="og:url"]'):e.set('content',ORIGIN+path)
 for name,val in [('article:published_time',published),('article:modified_time',DATE+'T08:00:00Z')]:
  es=d.xpath(f'//head/meta[@property="{name}"]')
  if not es:es=[add(head,'meta',property=name)]
  for e in es:e.set('content',val)
 for e in d.xpath('//script[@type="application/ld+json"]'):e.getparent().remove(e)
 graph=[{'@type':'BlogPosting','headline':title,'description':desc,'datePublished':published,'dateModified':DATE+'T08:00:00Z','inLanguage':lang,'mainEntityOfPage':ORIGIN+path,'image':ORIGIN+'/article-social.svg','author':{'@type':'Organization','name':'PikoBuy Sheet Research Desk','url':ORIGIN+pre(lang)+'/about/'},'publisher':{'@type':'Organization','name':'PikoBuy Sheet','logo':{'@type':'ImageObject','url':ORIGIN+'/pikobuy-logo.png'}},'isAccessibleForFree':True}, {'@type':'BreadcrumbList','itemListElement':[{'@type':'ListItem','position':1,'name':'PikoBuy Sheet','item':ORIGIN+(pre(lang) or '')+'/'},{'@type':'ListItem','position':2,'name':COPY[lang][13],'item':ORIGIN+pre(lang)+'/seo-articles/'},{'@type':'ListItem','position':3,'name':title,'item':ORIGIN+path}]}]
 add(head,'script',json.dumps({'@context':'https://schema.org','@graph':graph},ensure_ascii=False),type='application/ld+json')
 for e in d.xpath('//header[contains(@class,"piko-header")]//a[@hreflang]'):e.set('href',route(e.get('hreflang'),key))
def refresh_toc(d,lang):
 toc=d.xpath('//aside[contains(@class,"article-toc")]')[0];toc.clear();toc.set('class','article-toc');add(toc,'strong',COPY[lang][0])
 for i,s in enumerate(body_of(d).xpath('./section[h2]'),1):
  ident=s.get('id') or 'chapter-'+str(i);s.set('id',ident)
  add(toc,'a',f'{i:02d} '+s.find('h2').text_content(),href='#'+ident)

records={l:{} for l in LANGS}
for lang in LANGS:
 for key in ['fees','tracking','image','shipping','qc']:
  p=file_for(route(lang,key));new=key in ['fees','tracking'] or (key=='image' and lang!='en')
  if new:
   d=read(file_for(route(lang,'qc')));a=d.xpath('//article')[0];a.clear();a.set('class','longform research-article')
   title,desc,content=source_content(lang,key)
   header=add(a,'header');add(header,'span',COPY[lang][18],**{'class':'kicker'});add(header,'h1',title);add(header,'p',desc)
   add(header,'div',COPY[lang][1]+' '+DATE,**{'class':'article-byline'})
   add(a,'aside',COPY[lang][16],**{'class':'fact-box'})
   layout=add(a,'div',**{'class':'article-layout'});add(layout,'aside',**{'class':'article-toc'});body=add(layout,'div',**{'class':'article-copy'})
   render_md(body,content)
   published=DATE+'T08:00:00Z'
  else:
   d=read(p);body=body_of(d);u=UPDATES[lang]
   for e in d.xpath('//*[@data-release="20261016"]'):e.getparent().remove(e)
   if key=='image':
    title=d.find('head/title').text;desc=d.xpath('//head/meta[@name="description"]')[0].get('content')
    published='2026-08-28T08:00:00Z'
    s=section(body,u['imageHeading'],u['image'],'local-image-search');body.remove(s);body.insert(0,s)
   else:
    title,desc=u[key+'Title'],u[key+'Desc']
    published=('2026-07-25' if key=='shipping' else '2026-07-27')+'T04:00:00Z'
    s=section(body,u[key+'Heading'],u[key],'worked-example-20261016');body.remove(s);body.insert(0,s)
   s.set('data-release','20261016')
   d.xpath('//article/header/h1')[0].text=title
   hs=d.xpath('//article/header/p')
   if hs:hs[0].text=desc
   by=d.xpath('//article/header/div[contains(@class,"article-byline")]')
   if by:add(by[0],'span',COPY[lang][1]+' '+DATE,**{'data-release':'20261016'})
  if key=='image':
   s=section(body,COPY[lang][14],[], 'try-image-search');s.set('data-release','20261016')
   add(s,'a',COPY[lang][14]+' →',href=pre(lang)+'/catalog/image-search/',**{'class':'primary-button dark'})
   add(s,'p');add(s[-1],'a',COPY[lang][15]+' →',href=pre(lang)+'/catalog/')
  sources={'fees':['user','shipping'],'tracking':['guide'],'shipping':['shipping-cost','guide'],'qc':['shipping','returns'],'image':['guide','home']}[key]
  s=section(body,COPY[lang][2]+' · '+DATE,[], 'official-sources-20261016');s.set('data-release','20261016')
  for name in sources:
   path='/protocol/'+name if name in ['user','shipping','returns'] else '/'+name
   add(add(s,'p'),'a','PikoBuy · '+name,href='https://www.pikobuy.com'+path,rel='noopener noreferrer',target='_blank')
  install_metadata(d,lang,key,title,desc,published);refresh_toc(d,lang);write(p,d)
  records[lang][key]={'title':title,'description':desc,'path':route(lang,key)}

for lang in LANGS:
 for key in SLUGS:
  p=file_for(route(lang,key));d=read(p);s=section(body_of(d),COPY[lang][3],[],'related-guides-20261016');s.set('data-release','20261016')
  for other in SLUGS:
   if other!=key:add(add(s,'p'),'a',records[lang][other]['title'],href=route(lang,other))
  refresh_toc(d,lang);write(p,d)

def article_card(lang,key):
 r=records[lang][key];a=etree.Element('a',{'class':'article-card','href':r['path'],'data-research-key':key})
 top=add(a,'div',**{'class':'article-top'});add(top,'span',COPY[lang][18]);add(top,'time',DATE,datetime=DATE)
 add(a,'h3',r['title']);add(a,'p',r['description']);add(a,'strong',COPY[lang][4]);return a

for lang in LANGS:
 for page in ['seo-articles','']:
  p=file_for(pre(lang)+'/'+(page+'/' if page else ''));d=read(p)
  grid=d.xpath('//div[contains(concat(" ",@class," ")," article-grid ")]')[0]
  if page:
   for card in list(grid):
    href=card.get('href','');key=next((k for k,s in SLUGS.items() if '/articles/'+s+'/' in href),None)
    if key:grid.remove(card)
   for key in reversed(['fees','tracking','shipping','qc','image']):grid.insert(0,article_card(lang,key))
   for e in d.xpath('//*[@data-library-count]'):
    e.set('data-library-count','29');e.text=re.sub(r'\b27\b','29',e.text or '')
   hero=d.xpath('//section[contains(@class,"inner-hero")]')[0]
   hero.find('h1').text=COPY[lang][18]+' — PikoBuy'
   hero.find('span').text=COPY[lang][13]
   meta(d,COPY[lang][18]+' | PikoBuy',COPY[lang][19])
  else:
   grid.clear();grid.set('class','article-grid')
   for key in ['fees','tracking','shipping','qc','image']:grid.append(article_card(lang,key))
   visual=d.xpath('//div[contains(concat(" ",@class," ")," hero-visual ")]')[0]
   visual.clear();visual.set('class','hero-visual piko-discovery')
   add(visual,'span',COPY[lang][5],**{'class':'kicker'});add(visual,'h2',COPY[lang][12]);links=add(visual,'div',**{'class':'piko-category-links'})
   for cat,label in zip(['shoes','hoodies-sweaters','t-shirts','jackets','pants-shorts','accessories'],COPY[lang][6:12]):add(links,'a',label+' →',href=pre(lang)+'/catalog/'+cat+'/')
   add(visual,'a',COPY[lang][17]+' →',href=route(lang,'fees'),**{'class':'piko-cost-link'})
   desc=d.xpath('//div[@class="hero-copy"]/p')[0];desc.text=COPY[lang][19]
   title={'en':'Pikobuy Spreadsheet 2026 | Shoes, Clothing & QC Guides','de':'Pikobuy Spreadsheet 2026 | Schuhe, Kleidung & QC','fr':'Pikobuy Spreadsheet 2026 | Chaussures, vêtements et QC','es':'Pikobuy Spreadsheet 2026 | Calzado, ropa y guías QC','it':'Pikobuy Spreadsheet 2026 | Scarpe, abbigliamento e QC','pl':'Pikobuy Spreadsheet 2026 | Buty, odzież i poradniki QC','pt':'Pikobuy Spreadsheet 2026 | Calçado, roupa e guias QC'}[lang]
   meta(d,title,COPY[lang][19])
  for e in d.xpath('//head/meta[@name="robots"]'):e.set('content','index,follow,max-image-preview:large')
  write(p,d)

# Add contextual links to each existing guide without replacing its content.
for lang in LANGS:
 for guide,key in [('pikobuy-shipping-cost','shipping'),('pikobuy-qc-checklist','qc'),('how-to-use-pikobuy','tracking')]:
  p=file_for(pre(lang)+'/guides/'+guide+'/');d=read(p)
  for old in d.xpath('//*[@id="research-next-20261016"]'):old.getparent().remove(old)
  main=d.xpath('//main')[0];s=section(main,COPY[lang][3],[],'research-next-20261016');s.set('class','inner-section piko-next-reading')
  for k in [key,'fees']:add(add(s,'p'),'a',records[lang][k]['title'],href=route(lang,k))
  for e in d.xpath('//head/meta[@name="robots"]'):e.set('content','index,follow,max-image-preview:large')
  write(p,d)

# Retain routes and product redirects; register every newly created language route.
metadata=json.loads((ROOT/'commerce/routes.json').read_text())
metadata['routes']=sorted(set(metadata['routes'])|{route(l,k) for l in LANGS for k in SLUGS})
(ROOT/'commerce/routes.json').write_text(json.dumps(metadata,ensure_ascii=False,indent=2)+'\n')
editorial=[r for r in metadata['routes'] if not re.search(r'/(finds)(/|$)',r) and not re.search(r'/categories/[^/]+/',r)]
changed={route(l,k) for l in LANGS for k in SLUGS}|{pre(l)+'/' for l in LANGS}|{pre(l)+'/seo-articles/' for l in LANGS}|{pre(l)+'/guides/'+g+'/' for l in LANGS for g in ['how-to-use-pikobuy','pikobuy-shipping-cost','pikobuy-qc-checklist']}
xml=etree.Element('urlset',nsmap={None:'http://www.sitemaps.org/schemas/sitemap/0.9'})
for r in editorial:
 u=add(xml,'url');add(u,'loc',ORIGIN+r)
 if r in changed:add(u,'lastmod',DATE)
(ROOT/'editorial-sitemap.xml').write_bytes(etree.tostring(xml,encoding='utf-8',xml_declaration=True))

# Shared catalogue reading links are generated from the same localized article metadata.
research={l:{'heading':COPY[l][3],'items':[[records[l][k]['title'],route(l,k)] for k in ['fees','tracking','shipping','qc','image']]} for l in LANGS}
module='export const RESEARCH='+json.dumps(research,ensure_ascii=False,separators=(',',':'))+';\n'
module+='export function researchLinks(lang){const r=RESEARCH[lang]||RESEARCH.en;return `<section class="catalog-research"><h2>${r.heading}</h2><div>${r.items.map(([title,href])=>`<a href="${href}">${title} →</a>`).join(\'\')}</div></section>`;}\n'
(ROOT/'commerce/research.mjs').write_text(module)
(SOURCE/'manifest.json').write_text(json.dumps({'date':DATE,'languages':LANGS,'articles':records},ensure_ascii=False,indent=2))
print('Prepared 35 article versions in 7 languages: 14 new articles, 6 new image translations and 15 existing-page updates.')
