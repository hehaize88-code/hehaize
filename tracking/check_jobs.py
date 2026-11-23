import collections,datetime,json,os,pathlib,sys,urllib.request
import base64,html,re
def primary_graph(run):
    jobs=[]
    for group in ('first','second'):
        gid=base64.b64encode(f'prepare|-{group}-|collect'.encode()).decode()
        path=f'https://github.com/hehaize88-code/hehaize/actions/runs/{run}/graph/matrix/{gid}?attempt=1&expanded=true&monitor='+str(int(datetime.datetime.now().timestamp())//180)
        req=urllib.request.Request(path,headers={'X-Requested-With':'XMLHttpRequest','Accept':'text/html'})
        with urllib.request.urlopen(req,timeout=15) as r: data=r.read().decode()
        for job in re.findall(r'<streaming-graph-job\b[\s\S]+?</streaming-graph-job>',data):
            ident=re.search(r'/job/(\d+)',job); label=re.search(r'aria-label="([^"]+)',job)
            name=re.search(r'<tool-tip[^>]*>(.*?)</tool-tip>',job,re.S)
            if not (ident and name):continue
            status=label[1].lower() if label else ''
            conclusion='failure' if 'fail' in status else 'cancelled' if 'cancel' in status else 'success' if 'success' in status else None
            jobs.append({'name':html.unescape(re.sub('<[^>]+>','',name[1])).strip(),'id':int(ident[1]),'status':'completed' if conclusion else 'queued' if 'queu' in status else 'in_progress','conclusion':conclusion})
    if not jobs:raise ValueError('Missing public workflow graph jobs')
    return jobs

run=sys.argv[1] if len(sys.argv)>1 else '45151418588'
jobs=[];page=0
while True:
    page+=1
    url=f'https://api.github.com/repos/hehaize88-code/hehaize/actions/runs/{run}/jobs?per_page=100&page={page}&tick='+str(int(datetime.datetime.now().timestamp())//240)
    try:
        with urllib.request.urlopen(url,timeout=15) as resp:data=json.load(resp)
    except OSError as e:
        if run=='45151418588':
            jobs=primary_graph(run);break
        print('Public jobs listing unavailable:',e);sys.exit(1)
    jobs.extend(data['jobs'])
    if len(jobs)>=data['total_count'] or not data['jobs']:break
state=collections.Counter(j.get('conclusion') or j['status'] for j in jobs)
failed=[dict(name=j['name'],id=j['id'],result=j['conclusion']) for j in jobs if j['conclusion'] not in (None,'success','skipped')]
snapshot=dict(run=run,at=datetime.datetime.now(datetime.UTC).isoformat(),counts=state,failed=failed)
path=pathlib.Path(__file__).with_name('jobs-'+run+'.json');p=path.with_suffix('.tmp');p.write_text(json.dumps(snapshot));os.replace(p,path)
print(json.dumps(snapshot,ensure_ascii=False))
