"""Match reviewed dispositions to findings from the independent audit of raw dictionaries."""
import argparse
from collections import Counter
import json
from pathlib import Path
from apply import sha


def validate(reviews, audit_dirs):
    expected = {}
    for directory in audit_dirs:
        summary = json.loads((directory / 'summary.json').read_text())
        for edition in summary['editions']:
            key = edition['site'], edition['locale']
            if key in expected:
                raise ValueError(f'Duplicate raw audit edition: {key}')
            expected[key] = Counter()
        for line in (directory / 'review.jsonl').read_text().splitlines():
            finding = json.loads(line)
            key = finding['site'], finding['locale']
            expected[key][finding['issue'], sha(finding['source']), sha(finding['target'])] += 1
        for edition in summary['editions']:
            key = edition['site'], edition['locale']
            if expected[key].total() != sum(edition['flags'].values()):
                raise ValueError(f'Incomplete raw audit findings for {key}')
    reviewed = 0
    total = 0
    for path in sorted(reviews.glob('*/*.json')):
        record = json.loads(path.read_text())
        key = path.parent.name, path.stem
        if key != (record['site'], record['locale']) or key not in expected:
            raise ValueError(f'No matching raw audit for {key}')
        found = Counter()
        for item in record['reviewed_flags']:
            disposition = item.get('resolution') or item.get('disposition')
            if not disposition or not disposition.strip():
                raise ValueError(f'Empty raw-finding disposition for {key}')
            target = item.get('raw_target_sha256') or item['target_sha256']
            found[item['issue'], item['source_sha256'], target] += 1
        if found != expected[key]:
            raise ValueError(f'Raw audit findings and review dispositions differ for {key}')
        reviewed += 1
        total += found.total()
    return reviewed, total


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--reviews', type=Path, default=Path(__file__).parent / 'editions')
    parser.add_argument('--raw-audit', type=Path, nargs='+', required=True,
                        help='Directories holding summary.json and review.jsonl for raw, uncorrected dictionaries')
    args = parser.parse_args()
    reviewed, total = validate(args.reviews, args.raw_audit)
    print(f'Independently matched {total} raw findings in {reviewed} reviewed editions')
