import collections,datetime,json,os,pathlib,sys,urllib.request
run=sys.argv[1] if len(sys.argv)>1 else '45151418588'
jobs=[];page=0
while True:
    page+=1
    url=f'https://api.github.com/repos/hehaize88-code/hehaize/actions/runs/{run}/jobs?per_page=100&page={page}&tick='+str(int(datetime.datetime.now().timestamp())//240)
    try:
        with urllib.request.urlopen(url,timeout=15) as resp:data=json.load(resp)
    except OSError as e:
        print('Public jobs listing unavailable:',e);sys.exit(1)
    jobs.extend(data['jobs'])
    if len(jobs)>=data['total_count'] or not data['jobs']:break
state=collections.Counter(j.get('conclusion') or j['status'] for j in jobs)
failed=[dict(name=j['name'],id=j['id'],result=j['conclusion']) for j in jobs if j['conclusion'] not in (None,'success','skipped')]
snapshot=dict(run=run,at=datetime.datetime.now(datetime.UTC).isoformat(),counts=state,failed=failed)
path=pathlib.Path(__file__).with_name('jobs-'+run+'.json');p=path.with_suffix('.tmp');p.write_text(json.dumps(snapshot));os.replace(p,path)
print(json.dumps(snapshot,ensure_ascii=False))
