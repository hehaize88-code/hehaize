"""Deterministic, single-site refresh of the published static PikoBuy directory."""
from pathlib import Path
from copy import deepcopy
from urllib.parse import urlsplit, urlunsplit, parse_qs, urlencode
from lxml import html, etree
import json
import re

ROOT = Path(__file__).resolve().parents[1]
ORIGIN = 'https://pikobuy-sheet.net'
DATE = '2026-10-03'
LANGS = ['en', 'de', 'fr', 'es', 'it', 'pl', 'pt']
VERSION = '20261003-articles-27-v1'

def read(path):
    return html.fromstring(path.read_text())

def write(path, doc):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text('<!DOCTYPE html>\n' + html.tostring(doc, encoding='unicode', method='html') + '\n')

def fragment(markup):
    return html.fragment_fromstring(markup)

def canonical_path(path):
    value = '/' + str(path.relative_to(ROOT)).removesuffix('index.html')
    return value

def locale_route(path):
    match = re.match(r'^/(de|fr|es|it|pl|pt)(/.*)$', path)
    return (match[1], match[2]) if match else ('en', path)

def local_path(lang, route):
    return route if lang == 'en' else '/' + lang + route

def file_for(route):
    return ROOT / route.lstrip('/') / 'index.html'

def metadata(doc, title, description):
    titles = doc.xpath('//head/title')
    if titles:
        titles[0].text = title
    else:
        etree.SubElement(doc.find('head'), 'title').text = title
    for key, value, attr in [('description',description,'name'), ('og:title',title,'property'),
                             ('og:description',description,'property'), ('twitter:title',title,'name'),
                             ('twitter:description',description,'name')]:
        nodes = doc.xpath(f'//head/meta[@{attr}="{key}"]')
        if not nodes:
            nodes = [etree.SubElement(doc.find('head'), 'meta', {attr:key})]
        for node in nodes:
            node.set('content',value)

def schema(doc, data, ident):
    for old in doc.xpath(f'//script[@id="{ident}"]'):
        old.getparent().remove(old)
    s = etree.SubElement(doc.find('head'), 'script', {'type':'application/ld+json', 'id':ident})
    s.text = json.dumps(data, ensure_ascii=False, separators=(',',':'))

def main_search(keyword):
    return 'https://www.cnbuycha.com/search.html?' + urlencode({'keywords':keyword,'channelid':'2'})

def normalize_target(href):
    u = urlsplit(href)
    if u.hostname in ('www.cnbuycha.com','cnbuycha.com') and u.path.lower().rstrip('/') == '/allproducts':
        q = parse_qs(u.query).get('q')
        if q:
            return main_search(q[0])
    return href

# Read the existing published inventory instead of inventing products or images.
finds = read(ROOT/'finds/index.html')
cards = {}
for card in finds.xpath('//a[contains(concat(" ",@class," ")," product-card ")]'):
    cards[card.get('href').strip('/').split('/')[-1]] = deepcopy(card)

def product_examples(slugs, intro='Historical catalogue references · July 30, 2026'):
    section = etree.Element('section', {'class':'catalogue-examples', 'data-refresh':DATE})
    etree.SubElement(section, 'h2').text = 'Catalogue references to compare'
    etree.SubElement(section, 'p', {'class':'snapshot-note'}).text = intro + '. Prices are dated USD snapshots, not live quotes; catalogue images are not warehouse QC photos.'
    grid = etree.SubElement(section, 'div', {'class':'research-product-grid'})
    for slug in slugs:
        card = deepcopy(cards[slug])
        for small in card.xpath('.//*[contains(@class,"product-date")]'):
            small.text = 'Catalogue snapshot: 2026-07-30'
        for img in card.xpath('.//img'):
            img.set('loading','lazy')
        grid.append(card)
    return section

SELECTIONS = {
 'pikobuy-budget-finds-price-qc-notes':['fuzzy-slippers-3379','ugg-gloves-3381','labubu-coke-pendant-3315','goyard-umbrella-3268'],
 'pikobuy-jacket-spreadsheet-fit-lining-weight':['celine-coat-3356','louis-vuitton-jacket-3354'],
 'pikobuy-t-shirt-spreadsheet-prints-measurements':['acne-studios-longsleeve-3350','polo-ralph-lauren-long-sleeve-3353'],
}
KEYWORDS = {
 'pikobuy-budget-finds-price-qc-notes':['pikobuy budget finds','cheap pikobuy finds','pikobuy budget spreadsheet'],
 'pikobuy-jacket-spreadsheet-fit-lining-weight':['pikobuy jacket spreadsheet','pikobuy jacket finds','pikobuy jacket sizing'],
 'pikobuy-t-shirt-spreadsheet-prints-measurements':['pikobuy t shirt spreadsheet','pikobuy t shirt finds','pikobuy t shirt sizing'],
 'pikobuy-pants-jeans-spreadsheet-fit-guide':['pikobuy pants spreadsheet','pikobuy jeans finds','pikobuy pants sizing'],
}

def related_block():
    section = etree.Element('section', {'class':'related-research','data-refresh':DATE})
    etree.SubElement(section,'h2').text = 'Continue your product research'
    for label,route in [
      ('Browse all product finds','/finds/'),
      ('Compare shoe sizes and QC','/articles/pikobuy-shoes-spreadsheet-size-qc-fields/'),
      ('Compare hoodie measurements','/articles/pikobuy-hoodie-spreadsheet-fabric-measurements-weight/'),
      ('Estimate parcel costs','/articles/estimate-pikobuy-parcel-cost/'),
      ('Read the full article library','/seo-articles/')]:
        p = etree.SubElement(section,'p')
        etree.SubElement(p,'a',href=route).text = label
    return section

base = read(ROOT/'articles/pikobuy-shoes-spreadsheet-size-qc-fields/index.html')
new_articles = []
for source in sorted((ROOT/'maintenance/articles').glob('*.md')):
    lines = source.read_text().splitlines()
    title, description, category = lines[:3]
    paragraphs = '\n'.join(lines[3:]).strip().split('\n\n')
    slug = source.stem
    route = '/articles/' + slug + '/'
    doc = deepcopy(base)
    for node in doc.xpath('//head/link[@rel="canonical"]'):
        node.set('href',ORIGIN+route)
    for node in doc.xpath('//head/link[@rel="alternate"]'):
        node.getparent().remove(node)
    for node in doc.xpath('//head/meta[@property="og:url"]'):
        node.set('content',ORIGIN+route)
    for node in doc.xpath('//head/meta[@property="article:published_time" or @property="article:modified_time"]'):
        node.set('content',DATE+'T08:00:00Z')
    for node in doc.xpath('//script[@type="application/ld+json"]'):
        node.getparent().remove(node)
    metadata(doc,title,description)
    article = doc.xpath('//article')[0]
    article.clear()
    article.set('class','longform research-article')
    header = etree.SubElement(article,'header')
    etree.SubElement(header,'span',{'class':'kicker'}).text=category
    etree.SubElement(header,'h1').text=title
    etree.SubElement(header,'p').text=description
    byline = etree.SubElement(header,'div',{'class':'article-byline'})
    etree.SubElement(byline,'span').text='PikoBuy Sheet Research Desk'
    etree.SubElement(byline,'time',datetime=DATE).text='Published October 3, 2026'
    notice = etree.SubElement(article,'aside',{'class':'fact-box'})
    notice.text='Independent research. This site is not operated by or affiliated with PikoBuy. Product links open an external catalogue; check the destination, exact option and current terms before ordering.'
    layout = etree.SubElement(article,'div',{'class':'article-layout'})
    toc = etree.SubElement(layout,'aside',{'class':'article-toc'})
    etree.SubElement(toc,'strong').text='In this guide'
    body = etree.SubElement(layout,'div',{'class':'article-copy article-body'})
    current = body
    num = 0
    for text in paragraphs:
        if text.startswith('## '):
            num += 1
            ident = 'section-'+str(num)
            current=etree.SubElement(body,'section',id=ident)
            etree.SubElement(current,'h2').text=text[3:]
            etree.SubElement(toc,'a',href='#'+ident).text=f'{num:02d} '+text[3:]
        else:
            etree.SubElement(current,'p').text=text
    if slug in SELECTIONS:
        body.insert(2, product_examples(SELECTIONS[slug]))
    if 'pants-jeans' in slug:
        action=etree.SubElement(body,'p',{'class':'research-search'})
        etree.SubElement(action,'a',href=main_search('pants jeans')).text='Search the catalogue for pants and jeans'
    body.append(related_block())
    schema(doc,{'@context':'https://schema.org','@type':'BlogPosting','headline':title,'description':description,
      'datePublished':DATE+'T08:00:00Z','dateModified':DATE+'T08:00:00Z','inLanguage':'en',
      'mainEntityOfPage':ORIGIN+route,'keywords':KEYWORDS[slug],
      'author':{'@type':'Organization','name':'PikoBuy Sheet Research Desk','url':ORIGIN+'/about/'},
      'publisher':{'@type':'Organization','name':'PikoBuy Sheet','logo':{'@type':'ImageObject','url':ORIGIN+'/pikobuy-logo.png'}},
      'image':ORIGIN+'/article-social.svg','isAccessibleForFree':True},'article-schema')
    schema(doc,{'@context':'https://schema.org','@type':'BreadcrumbList','itemListElement':[
      {'@type':'ListItem','position':1,'name':'PikoBuy Sheet','item':ORIGIN+'/'},
      {'@type':'ListItem','position':2,'name':'Articles','item':ORIGIN+'/seo-articles/'},
      {'@type':'ListItem','position':3,'name':title,'item':ORIGIN+route}]},'breadcrumb-schema')
    write(file_for(route),doc)
    new_articles.append({'slug':slug,'title':title,'description':description,'category':category,'route':route})

ORDER = list(KEYWORDS)
new_articles.sort(key=lambda a:ORDER.index(a['slug']))

# Improve existing articles in place, keeping their established URLs.
UPGRADES = {
 'pikobuy-shoes-spreadsheet-size-qc-fields':(
  'PikoBuy Shoe Sizing and QC: Compare Sizes and Photos',
  'Compare PikoBuy shoe sizing with seller charts, defined measurements and warehouse photos, using dated catalogue examples and clear evidence limits.',
  '''<section id="catalogue-check-example" data-refresh="2026-10-03"><h2>Apply the size checks to two catalogue references</h2><p>The site's July 30 catalogue includes Fuzzy Slippers and New Balance 1906R entries. These are product identifiers and historical listing references, not warehouse-tested recommendations or proof of authenticity. Their different shapes make them useful prompts for different questions: confirm the slippers' pair quantity and selected size system, then confirm the exact New Balance option, both size labels and the measurement basis associated with that listing.</p><p>A size label alone does not establish comparable internal space. Preserve the seller chart's stated system and compare like-for-like measurement methods. If a reference changes destination or no longer shows the selected item, stop using its historical price and rebuild the record from the current candidate. Keep the source photo separate from any later warehouse evidence.</p><p>For the final decision, record four fields together: selected size, seller recommendation, observed warehouse label and a defined measurement if available. An unresolved field should remain visible; neither a recognisable silhouette nor another buyer's photograph can supply it. Use the <a href="/categories/shoes/">shoe catalogue</a> for product discovery and this article for sizing and QC decisions.</p></section>'''),
 'pikobuy-hoodie-spreadsheet-fabric-measurements-weight':(
  'PikoBuy Hoodie Sizing and QC: Fabric, Fit and Weight',
  'Compare PikoBuy hoodie measurements, fabric claims and warehouse evidence while keeping GSM, garment weight and parcel weight separate.',
  '''<section id="catalogue-check-example" data-refresh="2026-10-03"><h2>Turn a hoodie entry into a usable comparison</h2><p>The historical catalogue includes Off-White Hoodies — 39 Styles and ACG &amp; SUP Pullover Sweatshirt entries. The names show why the selected variant matters: a collection title does not identify one exact print, cut, colour or size. Treat the displayed style count as historical listing wording, not a claim that every option remains available.</p><p>For either entry, save the selected option and its own size chart before comparing the headline prices. Record chest, body and sleeve measurements only with their defined endpoints. Separate a seller's fabric-weight claim from the weight of the finished garment. A long name or a more expensive option does not establish fibre quality, warmth or durability.</p><p>After warehouse arrival, add the received label and visible construction to the original record instead of overwriting it. If a measurement request was not performed using the same method, label the difference. This preserves a clear chain from the product you selected to the item you received. Browse the <a href="/categories/hoodies/">hoodie category</a> for discovery, then compare exact options here.</p></section>'''),
 'estimate-pikobuy-parcel-cost':(
  'PikoBuy Shipping Cost: Inputs, Packing and Route Comparison',
  'Estimate PikoBuy shipping costs with destination, product type, weight and dimensions. Compare packing scenarios without inventing rates or delivery promises.',
  '''<section id="quote-record" data-refresh="2026-10-03"><h2>Save a quote record you can actually compare</h2><p>Record the estimate date, destination, product type, weight, length, width, height and displayed route name together. Keep the quoted amount, currency, billing method and any separately listed service charge in distinct fields. A number without those inputs cannot be compared reliably with a later quote.</p><p>Change one assumption at a time. Compare retained packaging with an available alternative using the resulting measurements, then compare routes for the same parcel. If both the package and route change together, the difference cannot be attributed solely to repacking. Before warehouse measurements exist, label the exercise as planning and leave unsupported costs unresolved.</p><p>The official estimator and beginner workflow were reviewed again on October 3, 2026. They support the input-based comparison and separate purchase and shipping stages. This article does not claim that a historic rate or a competitor's quoted price is available today. The live parcel submission screen and applicable terms control the amount payable.</p></section>'''),
 'warehouse-photos-before-shipping':(
  'PikoBuy QC Photos: Identify, Measure and Review Before Shipping',
  'Review PikoBuy QC photos against the selected item, visible condition and defined measurements, with a clear record of missing evidence before shipping.',
  '''<section id="qc-evidence-record" data-refresh="2026-10-03"><h2>Keep the QC evidence attached to the exact order</h2><p>Use one dated review record for each item: selected option, received identity, photo date, visible issue and next action. Separate a wrong option from an uncertain detail. “The received label differs from the chosen size” is a specific observation; “the fit seems bad” needs a measurement or an explained reference.</p><p>Never attach a seller photo or another customer's warehouse image to your record as though it showed your own order. Catalogue images can identify design features, while order-specific warehouse photos describe the item received. When the decisive angle is missing, request that angle and state why it matters before making a shipping decision.</p><p>The next product-specific checks are explained in the <a href="/articles/pikobuy-shoes-spreadsheet-size-qc-fields/">shoe sizing guide</a>, <a href="/articles/pikobuy-hoodie-spreadsheet-fabric-measurements-weight/">hoodie measurement guide</a> and <a href="/articles/pikobuy-t-shirt-spreadsheet-prints-measurements/">T-shirt print guide</a>. Use the current order's eligibility and deadlines when deciding whether to keep or return it.</p></section>'''),
}
for slug,(title,description,addition) in UPGRADES.items():
    path=ROOT/'articles'/slug/'index.html'
    doc=read(path)
    metadata(doc,title,description)
    doc.xpath('//h1')[0].text=title
    for old in doc.xpath('//*[@data-refresh="2026-10-03"]'):
        old.getparent().remove(old)
    bodies=doc.xpath('//*[contains(concat(" ",@class," ")," article-copy ") or contains(concat(" ",@class," ")," article-body ")]')
    body=bodies[0] if bodies else doc.xpath('//article')[0]
    body.append(fragment(addition))
    body.append(related_block())
    for s in doc.xpath('//script[@type="application/ld+json"]'):
        try:data=json.loads(s.text)
        except (ValueError,TypeError):continue
        def update(obj):
            if isinstance(obj,dict):
                if obj.get('@type') in ['Article','BlogPosting']:
                    obj.update(headline=title,description=description,dateModified=DATE+'T08:00:00Z')
                for value in obj.values():update(value)
            elif isinstance(obj,list):
                for value in obj:update(value)
        update(data);s.text=json.dumps(data,ensure_ascii=False,separators=(',',':'))
    for m in doc.xpath('//meta[@property="article:modified_time"]'):
        m.set('content',DATE+'T08:00:00Z')
    p=etree.SubElement(body,'p',{'class':'snapshot-note','data-refresh':DATE})
    p.text='Editorial update: October 3, 2026. Added specific comparison methods and related product research. Historical catalogue dates remain unchanged.'
    write(path,doc)

# Produce one complete article inventory; translated entries keep their local route.
en_index=read(ROOT/'seo-articles/index.html')
en_grid=en_index.xpath('//div[contains(concat(" ",@class," ")," article-grid ")]')[0]
for node in list(en_grid):
    if node.get('href') in [a['route'] for a in new_articles]:en_grid.remove(node)
for item in reversed(new_articles):
    card=etree.Element('a',href=item['route'],attrib={'class':'article-card'})
    top=etree.SubElement(card,'div',{'class':'article-top'})
    etree.SubElement(top,'span').text=item['category']
    etree.SubElement(top,'time',datetime=DATE).text='October 3, 2026'
    etree.SubElement(card,'h3').text=item['title']
    etree.SubElement(card,'p').text=item['description']
    etree.SubElement(card,'strong').text='Read article'
    en_grid.insert(0,card)
for card in en_grid:
    slug=card.get('href','').strip('/').split('/')[-1]
    if slug in UPGRADES:
        card.find('h3').text=UPGRADES[slug][0]
        card.find('p').text=UPGRADES[slug][1]
all_cards=[deepcopy(card) for card in en_grid]
notices={
 'en':'27 practical articles. Product references show their own check dates; guide updates do not refresh historical prices.',
 'de':'Alle 27 Artikel sind hier aufgeführt. Wo noch keine Übersetzung vorliegt, ist der vollständige englische Originalartikel mit EN gekennzeichnet.',
 'fr':'Les 27 articles sont répertoriés ici. Sans traduction disponible, le texte original anglais intégral est indiqué par EN.',
 'es':'Aquí aparecen los 27 artículos. Cuando no hay traducción disponible, el artículo original completo en inglés está marcado con EN.',
 'it':'Qui trovi tutti i 27 articoli. In assenza di una traduzione, il testo originale completo in inglese è contrassegnato da EN.',
 'pl':'Tutaj znajdziesz wszystkie 27 artykułów. Jeśli nie ma tłumaczenia, pełny angielski oryginał jest oznaczony jako EN.',
 'pt':'Os 27 artigos estão listados aqui. Quando não há tradução disponível, o original completo em inglês está identificado com EN.'}
for lang in LANGS:
    route=local_path(lang,'/seo-articles/')
    path=file_for(route)
    doc=en_index if lang=='en' else read(path)
    grid=doc.xpath('//div[contains(concat(" ",@class," ")," article-grid ")]')[0]
    existing={locale_route(c.get('href',''))[1]:deepcopy(c) for c in grid}
    grid.clear();grid.set('class','article-grid')
    for card in all_cards:
        english=card.get('href');localized=local_path(lang,english)
        if lang!='en' and file_for(localized).exists():
            c=existing.get(english,deepcopy(card));c.set('href',localized)
        else:
            c=deepcopy(card)
            if lang!='en':
                c.set('lang','en');c.set('hreflang','en')
                top=c.xpath('.//div[contains(@class,"article-top")]')[0]
                etree.SubElement(top,'span',{'class':'article-language'}).text='EN'
        grid.append(c)
    hero=doc.xpath('//section[contains(@class,"inner-hero")]')[0]
    for old in hero.xpath('./p[@data-library-count]'):hero.remove(old)
    etree.SubElement(hero,'p',{'data-library-count':'27','class':'snapshot-note'}).text=notices[lang]
    schema(doc,{'@context':'https://schema.org','@type':'CollectionPage','name':doc.xpath('//h1')[0].text_content(),
      'url':ORIGIN+route,'inLanguage':lang,'mainEntity':{'@type':'ItemList','numberOfItems':len(grid),
      'itemListElement':[{'@type':'ListItem','position':i+1,'name':c.find('h3').text_content(),'url':ORIGIN+c.get('href')} for i,c in enumerate(grid)]}},'pikobuy-collection-schema')
    write(path,doc)

# Refresh the homepage's real article destinations; avoid stale client hydration.
home=read(ROOT/'index.html')
metadata(home,'PikoBuy Spreadsheet 2026 | Shoes, Hoodies & Budget Finds',
 'Browse PikoBuy spreadsheet finds by category. Compare product links, dated USD prices, sizing and QC notes, with practical guides for your shortlist.')
h1=home.xpath('//h1')[0];h1.clear();h1.text='PikoBuy Spreadsheet 2026 — Shoes, Hoodies & More'
for grid in home.xpath('//div[contains(concat(" ",@class," ")," article-grid ")]'):
    grid.clear();grid.set('class','article-grid')
    for card in all_cards[:4]:grid.append(deepcopy(card))
write(ROOT/'index.html',home)

CATEGORY_GUIDES={
 'shoes':['pikobuy-shoes-spreadsheet-size-qc-fields','pikobuy-budget-finds-price-qc-notes'],
 'hoodies':['pikobuy-hoodie-spreadsheet-fabric-measurements-weight','pikobuy-budget-finds-price-qc-notes'],
 'jackets':['pikobuy-jacket-spreadsheet-fit-lining-weight','pikobuy-pants-jeans-spreadsheet-fit-guide'],
 't-shirts':['pikobuy-t-shirt-spreadsheet-prints-measurements','pikobuy-size-chart-measurement-guide'],
 'accessories':['pikobuy-budget-finds-price-qc-notes','pikobuy-accessories-price-vs-parcel-cost'],
}
for category,slugs in CATEGORY_GUIDES.items():
    path=ROOT/'categories'/category/'index.html'
    doc=read(path)
    for old in doc.xpath('//*[@id="category-reading"]'):old.getparent().remove(old)
    section=etree.SubElement(doc.xpath('//main')[0],'section',{'class':'inner-section','id':'category-reading'})
    etree.SubElement(section,'h2').text='Compare the details before choosing'
    for slug in slugs:
        target=read(ROOT/'articles'/slug/'index.html')
        p=etree.SubElement(section,'p')
        etree.SubElement(p,'a',href='/articles/'+slug+'/').text=target.xpath('//h1')[0].text_content()
    write(path,doc)

# Normalize static HTML, search forms, analytics, canonicals and real language pairs.
paths=list(ROOT.rglob('*.html'))
for path in paths:
    if 'maintenance' in path.parts:continue
    doc=read(path)
    route=canonical_path(path) if path.name=='index.html' else '/'+str(path.relative_to(ROOT))
    lang,base_route=locale_route(route)
    if re.match(r'^/finds/[^/]+/',base_route):continue
    doc.set('lang',lang)
    for script in list(doc.xpath('//script')):
        text=script.text or ''
        src=script.get('src','')
        if ('__VINEXT_' in text or script.get('id')=='_R_' or src.endswith('/'+VERSION+'.js')
            or 'googletagmanager.com/gtag/js' in src or "gtag('config'" in text or 'gtag("config"' in text):
            script.getparent().remove(script)
    for node in doc.xpath('//link[@rel="modulepreload"]'):
        node.getparent().remove(node)
    for old in doc.xpath('//script[@data-piko-enhancements]'):old.getparent().remove(old)
    etree.SubElement(doc.find('head'),'script',{'src':'/assets/piko-site-'+VERSION+'.js','defer':'','data-piko-enhancements':'true'})
    if not doc.xpath('//link[@href="/assets/piko-editorial-'+VERSION+'.css"]'):
        etree.SubElement(doc.find('head'),'link',{'rel':'stylesheet','href':'/assets/piko-editorial-'+VERSION+'.css'})
    for form in doc.xpath('//form[contains(@class,"search-box")]'):
        form.set('action','https://www.cnbuycha.com/search.html')
        form.set('method','get')
        for field in form.xpath('.//input[@name="q"]'):field.set('name','keywords')
        if not form.xpath('.//input[@name="channelid"]'):
            etree.SubElement(form,'input',{'type':'hidden','name':'channelid','value':'2'})
    for a in doc.xpath('//a[@href]'):a.set('href',normalize_target(a.get('href')))
    for keyword in doc.xpath('//meta[@name="keywords"]'):
        keyword.getparent().remove(keyword)
    for node in doc.xpath('//head/link[@rel="canonical"]'):node.getparent().remove(node)
    if path.name=='index.html':etree.SubElement(doc.find('head'),'link',{'rel':'canonical','href':ORIGIN+route})
    for node in doc.xpath('//head/link[@rel="alternate" and (@hreflang or @hrefLang or @hreflang)]'):
        node.getparent().remove(node)
    if path.name=='index.html':
        available=[lng for lng in LANGS if file_for(local_path(lng,base_route)).exists()]
        for lng in available:
            etree.SubElement(doc.find('head'),'link',{'rel':'alternate','hreflang':lng,'href':ORIGIN+local_path(lng,base_route)})
        if 'en' in available:
            etree.SubElement(doc.find('head'),'link',{'rel':'alternate','hreflang':'x-default','href':ORIGIN+base_route})
    # Duplicate graph blocks appeared in the exported homepage.
    seen=set()
    for s in list(doc.xpath('//script[@type="application/ld+json"]')):
        try:data=json.loads(s.text or '')
        except ValueError:continue
        normalized=json.dumps(data,sort_keys=True,ensure_ascii=False)
        if normalized in seen:s.getparent().remove(s)
        else:seen.add(normalized)
    write(path,doc)

# Routes are generated from actual files; only recognized pages receive aliases.
worker_path=ROOT/'_worker.js'
worker=worker_path.read_text()
routes=sorted(canonical_path(p) for p in ROOT.rglob('index.html') if 'maintenance' not in p.parts)
worker=re.sub(r'const ROUTES = new Set\(\[[\s\S]*?\]\);','const ROUTES = new Set('+json.dumps(routes,ensure_ascii=False,indent=2)+');',worker,count=1)
worker=re.sub(r'const GA_SNIPPET = String.raw`[\s\S]*?`;\n','',worker,count=1)
worker=worker.replace("    .on('head',{element(element){element.append(GA_SNIPPET,{html:true});}})\n",'')
worker=re.sub(r"const HTML_CACHE_VERSION = '[^']+';",f"const HTML_CACHE_VERSION = '{VERSION}';",worker)
if 'const canonicalPage =' not in worker:
    marker='  const destination=productDestination(url.pathname);'
    worker=worker.replace(marker,"""  const canonicalPage = url.pathname.endsWith('/index.html')
    ? url.pathname.slice(0, -10)
    : url.pathname.endsWith('/') ? url.pathname : url.pathname + '/';
  if ((request.method === 'GET' || request.method === 'HEAD') && canonicalPage !== url.pathname && ROUTES.has(canonicalPage)) {
    url.pathname = canonicalPage;
    return Response.redirect(url.toString(), 301);
  }
"""+marker)
worker=worker.replace("url.pathname==='/404.html'", "url.pathname==='/404.html'")
worker=re.sub(r'https://www\.cnbuycha\.com/AllProducts/\?q=([^\x27\x22]+)',lambda m:normalize_target(m.group(0)),worker)
worker_path.write_text(worker)
redirects=['/sitemap-main.xml /sitemap.xml 301']
for route in routes:
    if route!='/':redirects.append(route.rstrip('/')+' '+route+' 301')
    redirects.append(route+'index.html '+route+' 301')
(ROOT/'_redirects').write_text('\n'.join(redirects)+'\n')

# A fresh sitemap contains only real canonical pages, excluding redirect-only finds.
ns='http://www.sitemaps.org/schemas/sitemap/0.9'
urlset=etree.Element('{'+ns+'}urlset',nsmap={None:ns})
for route in routes:
    if re.match(r'^/(?:(?:de|fr|es|it|pl|pt)/)?finds/[^/]+/',route):continue
    url=etree.SubElement(urlset,'{'+ns+'}url')
    etree.SubElement(url,'{'+ns+'}loc').text=ORIGIN+route
    etree.SubElement(url,'{'+ns+'}lastmod').text=DATE
sitemap=etree.tostring(urlset,encoding='UTF-8',xml_declaration=True,pretty_print=True)
(ROOT/'sitemap.xml').write_bytes(sitemap)
(ROOT/'sitemap-main.xml').write_bytes(sitemap)
(ROOT/'robots.txt').write_text('User-agent: *\nAllow: /\n\nSitemap: '+ORIGIN+'/sitemap.xml\n')

(ROOT/'maintenance/release-20261003.json').write_text(json.dumps({
 'domain':'pikobuy-sheet.net','release':VERSION,'newArticles':new_articles,'articleCount':27,
 'improvedArticles':list(UPGRADES),'sitemapUrls':len(urlset),
 'productEvidence':'Existing catalogue snapshots dated 2026-07-30; no live product re-verification claimed.',
 'localization':'Existing translations preserved. All indexes include every article; untranslated English originals are explicitly labelled EN.'
},ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'newArticles':len(new_articles),'articleCount':len(list((ROOT/'articles').glob('*/index.html'))),'routes':len(routes),'sitemapUrls':len(urlset)},indent=2))
