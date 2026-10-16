"""Update the checked-in sitemap using a JSON export of article and guide data.
Usage: python scripts/update-content-sitemap.py /tmp/cssbuy-content.json
"""
import json,sys,xml.etree.ElementTree as ET
from pathlib import Path
root=Path(__file__).resolve().parent.parent
s='http://www.sitemaps.org/schemas/sitemap/0.9';x='http://www.w3.org/1999/xhtml'
ET.register_namespace('',s);ET.register_namespace('xhtml',x)
tree=ET.parse(root/'public/editorial-sitemap.xml');doc=tree.getroot();base='https://cssbuychina.net'
entries={n.find(f'{{{s}}}loc').text.removeprefix(base):n for n in doc}
def entry(path,date):
 node=entries.get(path)
 if node is None:
  node=ET.SubElement(doc,f'{{{s}}}url');ET.SubElement(node,f'{{{s}}}loc').text=base+path;entries[path]=node
 last=node.find(f'{{{s}}}lastmod')
 if last is None:last=ET.SubElement(node,f'{{{s}}}lastmod')
 last.text=date
 return node
from datetime import datetime
content=json.load(open(sys.argv[1]))
for kind,items in content.items():
 for slug,item in items.items():
  path=f'/{kind}/{slug}'
  date=datetime.strptime(item.get('checked','August 10, 2026'),'%B %d, %Y').date().isoformat()
  alternates={'en':path,'pt-BR':'/pt-br'+path,'de-DE':'/de'+path,'es':'/es'+path,'x-default':path}
  for target in dict.fromkeys(alternates.values()):
   node=entry(target,max(date, '2026-10-16') if target!=path else date)
   for old in list(node.findall(f'{{{x}}}link')):node.remove(old)
   for locale,href in alternates.items():ET.SubElement(node,f'{{{x}}}link',{'rel':'alternate','hreflang':locale,'href':base+href})
for path in ['/','/articles','/faq','/guides','/products','/pt-br','/de','/es','/pt-br/articles','/de/articles','/es/articles','/pt-br/guides','/de/guides','/es/guides']:
 entry(path,'2026-10-16')
ET.indent(tree,space='  ');tree.write(root/'public/editorial-sitemap.xml',encoding='utf-8',xml_declaration=True)
print('Sitemap URLs:',len(entries))
inventory={kind:{slug:{'sections':len(item['sections']),'paragraphs':sum(len(paragraphs) for _,paragraphs in item['sections']),'title':item.get('h1',item['title'])} for slug,item in items.items()} for kind,items in content.items()}
(root/'tests/content-inventory.json').write_text(json.dumps(inventory,ensure_ascii=False,indent=2)+'\n')
