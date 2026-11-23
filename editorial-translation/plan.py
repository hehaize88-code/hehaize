"""Validate translation packs and divide site/locale pairs under GitHub's 256-job matrix ceiling."""
import json
import os
from pathlib import Path

def expected(folder):
    result=[]
    for file in sorted(folder.glob('*.json')):
        data=json.loads(file.read_text())
        assert data['texts'] and len(set(data['texts']))==len(data['texts'])
        assert len(set(data['languages']))==len(data['languages'])
        for lang in data['languages']:
            assert lang!='mt' and lang.isalpha()
            result.append({'site':file.stem,'locale':lang})
    assert len({v['site'] for v in result})==13
    return result

if __name__=='__main__':
    pairs=expected(Path('editorial-translation/input'))
    with open(os.environ['GITHUB_OUTPUT'],'a') as out:
        for i,key in enumerate(['first','second']):
            subset=pairs[i::2]
            assert 1<=len(subset)<=256
            print(key+'='+json.dumps({'include':subset},separators=(',',':')),file=out)
    print(len(pairs),'site and language pairs')
