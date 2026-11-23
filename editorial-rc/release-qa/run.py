from pathlib import Path
import json, subprocess,concurrent.futures,sys,collections
mode=(sys.argv[1:] or ['en'])[0]
folders=sorted(f.name for f in Path('editorial').iterdir() if (f/'package.json').exists())
chosen=sys.argv[2:] or folders
def run(site):
 try:
  x=subprocess.run(['node','release-qa/site.mjs',site,mode],text=True,capture_output=True,timeout=480 if mode=='live-en' else 2400 if mode=='live-all' else 120 if mode=='en' else 1200)
  print(x.stdout[-750:] or x.stderr[-750:],flush=True)
 except Exception as exc:print(site,str(exc),flush=True)
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:list(pool.map(run,chosen))
data={s:json.loads(f.read_text()) for s in folders if (f:=Path('release-qa',s+'.'+mode+'.json')).exists()}
docs=[a for v in data.values() for a in v['articleFingerprints']]
pairs=[]
for i,a in enumerate(docs):
 for b in docs[:i]:
  ap=set(a['paragraphHashes']);bp=set(b['paragraphHashes'])
  overlap=len(ap&bp)/max(1,min(len(ap),len(bp)))
  asha=set(a.get('shingles',[]));bsha=set(b.get('shingles',[]));near=len(asha&bsha)/max(1,min(len(asha),len(bsha)))
  if a['hash']==b['hash'] or overlap>=.20 or near>=.30:pairs.append({'a':a['url'],'b':b['url'],'exactParagraphOverlap':round(overlap,3),'sampledSevenWordOverlap':round(near,3)})
report={'mode':mode,'baseline':'9eab64e46c1b948cad97a96b374a34229efd0250','sites':{s:{'languages':len(v['languages']),'enArticles':v['languages'].get('en',{}).get('newArticleCount'),'enFAQ':(v['languages'].get('en',{}).get('faq') or {}).get('genuineEnglishQuestions'),'completeLocales':sum(l['newArticleCount']==10 and (l['faq'] or {}).get('count',0)>20 for l in v['languages'].values()),'errors':v['errors'],'warnings':v['warnings']} for s,v in data.items()},'englishArticlesScanned':len(docs),'genuineEnglishFAQTotal':sum((v['languages'].get('en',{}).get('faq') or {}).get('genuineEnglishQuestions',0) for v in data.values()),'expectedLocaleEditions':sum(len(v['expectedLocales']) for v in data.values()),'substantialDuplicateArticles':pairs}
Path('release-qa','summary-'+mode+'.json').write_text(json.dumps(report,indent=2,ensure_ascii=False))
