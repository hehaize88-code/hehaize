"""Apply the shared catalogue/navigation to the existing static editorial pages.
Run with a chrome JSON created from commerce/chrome.mjs (see IMPLEMENTATION.md).
"""
from pathlib import Path
from urllib.parse import urlsplit,parse_qs,urlencode
from lxml import html,etree
import json,sys,re
root=Path(__file__).resolve().parents[1]
chrome=json.loads(Path(sys.argv[1]).read_text())
metadata=json.loads((root/'commerce/routes.json').read_text())
legacy=metadata['legacyProducts']
copy={
'en':['Pikobuy Spreadsheet 2026 | Finds, Search & QC Photos','Pikobuy Spreadsheet — Find it. Check it.','Browse product finds in USD, search by keyword or image, compare product photos and QC references, then open the original item on Pikobuy.','Search by image','USD prices from the product catalogue. The final price, selected option and shipping charges must be confirmed on Pikobuy.'],
'de':['Pikobuy Spreadsheet 2026 | Produkte, Suche & QC-Bilder','Pikobuy Spreadsheet — Finden und prüfen.','Entdecke Produkte mit USD-Preisen, suche nach Begriffen oder Bildern und vergleiche Produktfotos sowie QC-Referenzen. Öffne anschließend den Originalartikel bei Pikobuy.','Bildersuche','USD-Preise aus dem Produktkatalog. Endpreis, gewählte Variante und Versandkosten bitte bei Pikobuy bestätigen.'],
'fr':['Pikobuy Spreadsheet 2026 | Produits, recherche et photos QC','Pikobuy Spreadsheet — Trouver et vérifier.','Explorez les produits en USD, recherchez par mot-clé ou image et comparez les photos et références QC avant d’ouvrir l’article original sur Pikobuy.','Recherche par image','Prix en USD du catalogue. Confirmez le prix final, la variante et les frais de livraison sur Pikobuy.'],
'es':['Pikobuy Spreadsheet 2026 | Productos, búsqueda y fotos QC','Pikobuy Spreadsheet — Encuentra y comprueba.','Explora productos en USD, busca por palabra o imagen y compara fotos y referencias QC antes de abrir el artículo original en Pikobuy.','Buscar por imagen','Precios en USD del catálogo. Confirma el precio final, la variante y los gastos de envío en Pikobuy.'],
'it':['Pikobuy Spreadsheet 2026 | Prodotti, ricerca e foto QC','Pikobuy Spreadsheet — Trova e controlla.','Esplora prodotti in USD, cerca per parola o immagine e confronta foto e riferimenti QC prima di aprire l’articolo originale su Pikobuy.','Ricerca per immagine','Prezzi in USD dal catalogo. Conferma prezzo finale, variante e spese di spedizione su Pikobuy.'],
'pl':['Pikobuy Spreadsheet 2026 | Produkty, wyszukiwanie i zdjęcia QC','Pikobuy Spreadsheet — Znajdź i sprawdź.','Przeglądaj produkty z cenami w USD, szukaj słowem lub zdjęciem i porównuj zdjęcia oraz materiały QC. Następnie otwórz oryginalny produkt w Pikobuy.','Szukaj obrazem','Ceny w USD z katalogu produktów. Potwierdź końcową cenę, wariant i koszt wysyłki w Pikobuy.'],
'pt':['Pikobuy Spreadsheet 2026 | Produtos, pesquisa e fotos QC','Pikobuy Spreadsheet — Encontra e verifica.','Explora produtos em USD, pesquisa por palavra ou imagem e compara fotografias e referências QC antes de abrir o artigo original no Pikobuy.','Pesquisar por imagem','Preços em USD do catálogo. Confirma o preço final, a variante e os custos de envio no Pikobuy.']}
def fragment(s):return html.fragment_fromstring(s)
def replace(el,new):el.getparent().replace(el,new)
def local(href,lang):
 pre='' if lang=='en' else '/'+lang
 u=urlsplit(href)
 if u.netloc.replace('www.','')=='cnbuycha.com':
  if u.path=='/search.html':return pre+'/catalog/?'+urlencode({'q':parse_qs(u.query).get('keywords',[''])[0]})
  return pre+'/catalog'+('/' if u.path in ['/','/AllProducts/'] else u.path)+('?' + u.query if u.query else '')
 if u.netloc and u.netloc not in ['pikobuy-sheet.net','www.pikobuy-sheet.net']:return href
 bare=re.sub(r'^/(de|fr|es|it|pl|pt)(?=/|$)','',u.path)
 if bare.rstrip('/')=='/finds':return pre+'/catalog/'
 if bare.startswith('/finds/') and bare.strip('/').split('/')[-1] in legacy:return local(legacy[bare.strip('/').split('/')[-1]],lang)
 if bare.startswith('/categories/'):
  cat=bare.strip('/').split('/')[-1];cat='hoodies-sweaters' if cat=='hoodies' else cat
  return pre+'/catalog/'+cat+'/'
 return href
for p in root.rglob('index.html'):
 rel=p.parent.relative_to(root).as_posix();route='/' if rel=='.' else '/'+rel+'/'
 c=chrome[route];lang=c['lang'];pre='' if lang=='en' else '/'+lang;t=copy[lang]
 d=html.fromstring(p.read_text());d.set('lang',lang)
 body=d.find('body');body.set('data-locale',lang)
 for old in d.xpath('//header[contains(@class,"site-header") or contains(@class,"piko-header")]'):replace(old,fragment(c['nav']))
 for old in d.xpath('//footer'):replace(old,fragment(c['footer']))
 for link in d.xpath('//a[@href]'):
  target=local(link.get('href'),lang)
  if target!=link.get('href'):
   link.set('href',target);link.attrib.pop('target',None);link.attrib.pop('rel',None)
 for form in d.xpath('//form[contains(@action,"cnbuycha.com")]'):
  form.set('action',pre+'/catalog/');form.attrib.pop('target',None)
  for item in form.xpath('.//input[@name="keywords"]'):item.set('name','q')
  for item in form.xpath('.//input[@name="channelid"]'):item.getparent().remove(item)
 for icon in d.xpath('//link[contains(@rel,"icon")]'):
  icon.set('href','/pikobuy-icon.png');icon.set('type','image/png')
 head=d.find('head')
 if not d.xpath('//link[contains(@href,"site-shell.css")]'):head.append(fragment('<link rel="stylesheet" href="/site-shell.css?v=20261012">'))
 if not d.xpath('//script[contains(@src,"/catalog.js")]'):head.append(fragment('<script src="/catalog.js?v=20261012" defer></script>'))
 # Remove language alternatives that point to missing translations.
 for link in d.xpath('//link[@rel="alternate"]'):
  if urlsplit(link.get('href','')).path not in metadata['routes']:head.remove(link)
 if route in ['/',*[f'/{l}/' for l in copy if l!='en']]:
  d.find('.//title').text=t[0]
  for meta in d.xpath('//meta[@name="description" or @property="og:description" or @name="twitter:description"]'):meta.set('content',t[2])
  for meta in d.xpath('//meta[@property="og:title" or @name="twitter:title"]'):meta.set('content',t[0])
  h=d.xpath('//div[@class="hero-copy"]/h1')[0];h.clear();h.text=t[1]
  desc=d.xpath('//div[@class="hero-copy"]/p')[0];desc.clear();desc.text=t[2]
  form=d.xpath('//div[@class="hero-copy"]/form')[0]
  if not d.xpath('//a[@class="piko-image-link"]'):form.addnext(fragment(f'<a class="piko-image-link" href="{pre}/catalog/image-search/">▧ {t[3]} →</a>'))
  for grid in d.xpath('//section[contains(@class,"section-products")]/div[@class="product-grid" or @id="piko-live-products"]'):
   replace(grid,fragment('<div class="piko-live-grid" id="piko-live-products">'+c['cards']+'</div>'))
  visual=d.xpath('//div[@class="hero-visual"]')
  if visual:replace(visual[0],fragment('<div class="hero-visual piko-hero-products"><div class="piko-live-grid">'+c['cards']+'</div></div>'))
  for note in d.xpath('//p[contains(@class,"price-note") or contains(@class,"catalogue-note")]'):note.clear();note.set('class','price-note');note.text=t[4]
 p.write_text('<!DOCTYPE html>\n'+html.tostring(d,encoding='unicode',method='html')+'\n')
# Exclude aliases, old snapshot products and category redirects from the index.
editorial=[r for r in metadata['routes'] if not re.search(r'/(finds)(/|$)',r) and not re.search(r'/categories/[^/]+/',r)]
xml='<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+''.join('<url><loc>https://pikobuy-sheet.net'+r+'</loc></url>' for r in editorial)+'</urlset>'
(root/'editorial-sitemap.xml').write_text(xml)
(root/'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>https://pikobuy-sheet.net/editorial-sitemap.xml</loc></sitemap><sitemap><loc>https://pikobuy-sheet.net/catalog-sitemap.xml</loc></sitemap></sitemapindex>')
(root/'_redirects').write_text('# Redirects are managed by _worker.js to preserve catalogue locale and query state.\n')
(root/'_routes.json').write_text(json.dumps({'version':1,'include':['/*'],'exclude':['/assets/*','/catalog.js','/catalog.css','/site-shell.css','/catalog-image-index.json','/pikobuy-logo.png','/pikobuy-icon.png','/favicon.ico']},indent=2))
(root/'.gitignore').write_text('.cache/\nlive-catalog.json\nindex-checkpoint.json\nindex-failures.json\n')
print('Updated',len(chrome),'static pages;',len(editorial),'editorial sitemap URLs')
