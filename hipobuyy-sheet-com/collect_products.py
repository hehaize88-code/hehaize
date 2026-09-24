"""Build a small review snapshot from the linked shop's live product cards."""
import html
import json
import re
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.parse import urljoin, urlparse

ROOT = Path(__file__).parent
BASE = 'https://cnbuycha.com'
PAGES = ['/', '/shoes/', '/hoodies-sweaters/', '/t-shirts/', '/jackets/', '/pants-shorts/', '/accessories/', '/jersey/']

def get(path):
    req = urllib.request.Request(urljoin(BASE, path), headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=22) as response:
        return response.read()

def extract(path):
    try:
        body = get(path).decode('utf-8', 'replace')
        cards = re.findall(r'<article class="product-card[^>]*>(.*?)</article>', body, re.S)
        items = []
        for card in cards:
            link = re.search(r'class="product-image"[^>]*>\s*<img src="([^"]+)"', card)
            detail = re.search(r'<a href="([^"]+)" class="product-image"', card)
            title = re.search(r'<a href="[^"]+" class="product-title"><h3>(.*?)</h3>', card, re.S)
            price = re.search(r'<div class="product-price"[^>]*>([\d.]+)', card)
            if not all((link, detail, title, price)): continue
            name = html.unescape(re.sub('<[^>]+>', '', title.group(1))).strip()
            url = urljoin(BASE, detail.group(1))
            image = urljoin(BASE, html.unescape(link.group(1)))
            if not urlparse(url).hostname.endswith('cnbuycha.com'): continue
            items.append({'id': re.search(r'/(\d+)\.html$',url).group(1), 'title': name, 'price':float(price.group(1)), 'detail':url, 'image':image, 'category':detail.group(1).strip('/').split('/')[0]})
        return items
    except Exception as e:
        print('Page skipped', path, str(e))
        return []

with ThreadPoolExecutor(max_workers=6) as pool:
    batches = list(pool.map(extract, PAGES))
seen = set(); selected = []; quotas = {'shoes':9,'hoodies-sweaters':8,'t-shirts':8,'jackets':8,'pants-shorts':8,'accessories':8,'jersey':8}
for batch in batches[1:] + batches[:1]:
    for product in batch:
        category = product['category']
        if product['id'] in seen or not quotas.get(category,0) or len(product['title']) < 7: continue
        if re.search(r'wa\s*\+?\d{7,}|whatsapp|二维码|wechat',product['title'],re.I):continue
        seen.add(product['id']);quotas[category]-=1;selected.append(product)

def download(p):
    try:
        data = get(p['image']); suffix = '.webp' if p['image'].split('?')[0].endswith('webp') else '.jpg'
        filename = f"{p['id']}{suffix}"
        (ROOT/'dist'/'assets'/filename).write_bytes(data)
        p['local_image'] = '/assets/'+filename
        return p
    except Exception as e:
        print('Image skipped',p['id'],str(e));return None

with ThreadPoolExecutor(max_workers=8) as pool:
    selected = [p for p in pool.map(download, selected) if p]
# Interleave categories so the first viewport isn't dominated by one product type.
groups={name:[p for p in selected if p['category']==name] for name in quotas}
selected=[]
while any(groups.values()):
    for name in quotas:
        if groups[name]:selected.append(groups[name].pop(0))
(ROOT/'products.json').write_text(json.dumps(selected,ensure_ascii=False,indent=2))
print('Downloaded',len(selected),'live products:',{c:sum(p['category']==c for p in selected) for c in quotas})
