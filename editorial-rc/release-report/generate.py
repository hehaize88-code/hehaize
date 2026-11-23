"""Build the Chinese release inventory from native research and checked English routes."""
import argparse
import csv
import json
from pathlib import Path
from urllib.parse import urljoin, urlsplit

ROOT=Path(__file__).resolve().parents[1]
QA=ROOT/'release-qa'
SITES=ROOT/'editorial'
OUT=ROOT/'release-report'
# Reviewed against the research files. Some routers publish posts alphabetically.
ANGLE_SLUGS={
'eastmallbuygrid-com':'return-before-warehouse-dispatch seller-consent-and-exchange-options retain-retail-packaging-before-a-return document-damage-to-a-small-accessory fit-complaint-or-inspection-mismatch read-a-size-label-in-warehouse-qc marketplace-listing-before-agent-purchase mixed-parcel-freight-estimate review-packing-before-international-dispatch reconcile-quantities-in-a-split-shipment',
'itaobuygrid-com':'find-the-original-listing-from-a-photo check-a-spreadsheet-purchase-link read-translated-options-and-style-codes write-a-two-tone-colourway-note read-flat-garment-size-charts check-pieces-in-a-seller-set organize-qc-photos-for-similar-items domestic-and-international-tracking-records compare-display-price-and-checkout-currency prepare-a-parcel-support-case',
'cnshoppergrid-com':'manual-order-or-link-import writing-a-purchase-specification separate-domestic-postage seller-option-wording link-search-and-visual-matches unavailable-size-in-an-order partial-warehouse-arrival compare-two-destinations read-an-order-timeline write-an-after-sales-request',
'superbuysheetindex-com':'shopping-agent-or-parcel-forwarding registering-a-forwarding-shipment domestic-tracking-to-warehouse-intake receiving-multiple-boxes mobile-shopping-order organizing-warehouse-entries rehearsal-packing-instructions comparing-packed-dimensions tracking-optional-services investigate-unmatched-parcel',
'bbdbuygrid-com':'bbdbuy-order-payment-record bbdbuy-purchase-or-forwarding bbdbuy-multipack-count bbdbuy-seller-price-change bbdbuy-warehouse-arrival bbdbuy-qc-item-identifiers bbdbuy-keep-shoebox bbdbuy-parcel-dimensions bbdbuy-compare-shipping-lines bbdbuy-refund-inquiry',
'vigorbuygrid-com':'vigorbuy-qc-finder-source-link vigorbuy-image-search-false-match vigorbuy-qc-model-option vigorbuy-jacket-comparison-measurements vigorbuy-qc-colour-lighting vigorbuy-warehouse-photo-request vigorbuy-package-contents-check vigorbuy-bulky-versus-heavy vigorbuy-freight-estimate-record vigorbuy-tracking-handoffs',
'litbuygrid-com':'compare-product-price-tiers identify-a-warehouse-photo-colour document-a-missing-accessory save-a-listing-before-it-changes measure-hoodie-body-length check-a-reversed-garment-print decide-whether-to-exchange prepare-a-return-evidence-record interpret-a-seller-support-response inspect-a-replacement-order',
'usfanstab-com':'garment-measurements-and-ease recover-an-unreadable-seller-link 1688-order-minimums-and-mixed-options find-a-seller-link-from-a-photo personalised-print-order-specification separate-a-set-from-individual-pieces request-a-shoe-insole-measurement match-warehouse-entries-to-a-parcel check-translated-colour-options track-a-split-seller-delivery',
}
def read(path):return json.loads(path.read_text())
def canonical(url,host):
    u=urlsplit(url)
    assert u.scheme=='https' and u.netloc==host and not any([u.query,u.fragment]) and u.path.startswith('/'),url
    return url
def slug_of(item):return urlsplit(item['url']).path.rstrip('/').split('/')[-1]
def evidence(items):
    urls=list(dict.fromkeys(items))
    assert urls and all(urlsplit(x).scheme in ['http','https'] and urlsplit(x).netloc for x in urls),urls
    return '\n'.join(urls)
def main():
    parser=argparse.ArgumentParser()
    parser.add_argument('--live',action='store_true',help='Require matching, complete live-en tests across all thirteen domains')
    parser.add_argument('--workspace',type=Path,default=ROOT,help='Workspace containing editorial and release-qa')
    parser.add_argument('--out',type=Path,default=OUT)
    args=parser.parse_args()
    repo_root=args.workspace/'editorial';qa=args.workspace/'release-qa';args.out.mkdir(parents=True,exist_ok=True)
    rows=[];summaries=[]
    sites='usfanstab.com litbuygrid.com sugargoogrid.com orientdiggrid.com cnshoppergrid.com vigorbuygrid.com bbdbuygrid.com eastmallbuygrid.com itaobuygrid.com ootdbuygrid.com kakobuysheetgrid.com hubbuysheetgrid.com superbuysheetindex.com'.split()
    for host in sites:
        repo=host if host=='hubbuysheetgrid.com' else host.replace('.com','-com')
        source=read(repo_root/repo/'research/editorial-2026-11-23.json')
        report=read(qa/(repo+'.en.json'))
        assert not report['errors'] and host==report['host'], (repo,report['errors'])
        en=report['languages']['en']
        assert en['indexStatus']==200 and en['newArticleCount']==10 and en['sitemapArticleCount']>=10
        faq=en['faq'];count=faq['genuineEnglishQuestions']
        assert count>=21 and faq['unique']>=count and faq['visible']>=count
        index=canonical(urljoin('https://'+host,en['index']),host)
        faq_url=canonical(faq['url'],host)
        angles=source['proposed_angles']
        if len(angles)!=10:raise ValueError(f'Unexpected research angle count for {host}')
        mappings=source.get('keyword_mapping',source.get('article_keyword_mapping',[]))
        slugs=[m['slug'] for m in mappings] if mappings else ANGLE_SLUGS[repo].split()
        intents=dict(zip(slugs,angles,strict=True))
        assert len(intents)==10 and set(intents)==set(map(slug_of,en['articles'])),host
        keywords={m['slug']:m for m in mappings}
        if repo in ['usfanstab-com','litbuygrid-com']:
            if repo=='usfanstab-com':
                native=read(repo_root/repo/'src/content/editorial.json')
            else:
                native=json.loads((repo_root/repo/'worker/editorial-data.js').read_text().split('=',1)[1].strip().rstrip(';'))
            keywords.update({a['slug']:{'native_keyword':a['keyword']} for a in native['en']['articles'] if a['slug'] in intents})
        own_status='本地英文版通过，线上待核验'
        if args.live:
            live=read(qa/(repo+'.live-en.json'))
            assert live.get('scope')=='live-en' and not live['errors'] and live['host']==host
            tested=live['languages']['en']
            assert tested['faq']['genuineEnglishQuestions']==count and tested['faq']['url']==faq_url and tested['index']==en['index'] and tested['indexStatus']==200
            signatures=lambda data:{a['url']:(a['textHash'],a['title'],set(a['sources'])) for a in data['articles']}
            assert signatures(tested)==signatures(en),host
            own_status='已在线核验英文版'
        summaries.append([host,count,10,index,faq_url,own_status])
        for a in en['articles']:
            slug=slug_of(a); kw=keywords.get(slug,{})
            target=kw.get('research_keyword') or kw.get('target_phrase') or kw.get('native_keyword') or intents[slug]
            kind='研究记录目标词' if ('research_keyword' in kw or 'target_phrase' in kw) else ('文章目标词' if 'native_keyword' in kw else '研究记录选题')
            references=kw.get('evidence_urls') or kw.get('supporting_pages') or ([kw['evidence_url']] if kw.get('evidence_url') else a['sources'])
            assert a['sourceCount']>=1
            rows.append([host,count,a['title'],canonical(a['url'],host),target,kind,intents[slug],evidence(references),evidence(a['sources']),index,faq_url,a['words'],own_status])
    assert len(summaries)==13 and len(rows)==len(set(r[3] for r in rows))==130
    header=['子站','英文 FAQ 数量','英文文章标题','文章规范网址','目标词或调研选题','依据类型','调研选题','选题依据网址','文章引用网址','英文文章目录','英文 FAQ 页面','英文段落词数（不含标题）','核验状态']
    summary_header=['子站','英文 FAQ 数量','新增英文文章','英文文章目录','英文 FAQ 页面','核验状态']
    with (args.out/'13站文章与关键词.csv').open('w',encoding='utf-8-sig',newline='') as f:
        w=csv.writer(f);w.writerow(header);w.writerows(rows)
    (args.out/'inventory.json').write_text(json.dumps({'summary':[summary_header,*summaries],'articles':[header,*rows]},ensure_ascii=False))
    print(f"{len(summaries)} domains, {len(rows)} canonical URLs, {sum(s[1] for s in summaries)} English FAQs, mode={'live' if args.live else 'local'}")
if __name__=='__main__':main()
