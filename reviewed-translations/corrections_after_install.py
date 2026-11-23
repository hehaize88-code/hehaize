"""Correct one verified checkout example across the installed iTaoBuy article editions."""
import argparse
import json
import os
from pathlib import Path
import tempfile
from apply import resolve, sha, write_json

SITE = 'itaobuygrid-com'
SLUG = 'compare-display-price-and-checkout-currency'
EN_SOURCE = 'Imagine that two screenshots show 12.00 and 12.80 in your preferred currency. You cannot conclude that the second has a worse exchange rate from those figures alone. First inspect the seller price on both. If the first includes 96 yuan of goods and the second includes the same goods plus eight yuan of domestic postage, the higher amount can result from scope even when both use an identical rate. Recalculate from the original components before comparing the conversions themselves.'
EN_SHA = '73751c36c5cbe3c7f0833d5bcafc2f5ac7aece6f502b922383c214230ea0707a'
LANGUAGES = 'en de fr es it pt pl nl ro sv zh da fi el cs hu bg sk hr ja ko vi th id'.split()

def apply_checkout(sites, dictionaries, summary):
    revised = json.loads(Path(__file__).with_name('itao-checkout-example.json').read_text())
    if set(revised) != set(LANGUAGES) or sha(EN_SOURCE) != EN_SHA:
        raise ValueError('Checkout example source or localized correction coverage changed')
    worker = sites / SITE / 'worker'
    outputs = []
    receipts = []
    for lang in LANGUAGES:
        path = worker / ('editorial-content.json' if lang == 'en' else f'editorial-locales/{lang}.json')
        if lang == 'en':
            original = EN_SOURCE
        else:
            dictionary_path = resolve(dictionaries, SITE, lang)
            if not dictionary_path:
                raise ValueError(f'Missing effective dictionary for {SITE}/{lang}')
            original = json.loads(dictionary_path.read_text())[EN_SOURCE]
        content = json.loads(path.read_text())
        edition = content['en'] if lang == 'en' else content
        matches = [a for a in edition['articles'] if a['slug'] == SLUG]
        if len(matches) != 1:
            raise ValueError(f'{lang}: missing or duplicate article {SLUG}')
        paragraphs = matches[0]['sections'][4][1]
        now = paragraphs[0]
        if now not in (original, revised[lang]):
            raise ValueError(f'{lang}: section 5 paragraph 1 no longer matches the verified input')
        # The following paragraph deliberately tests a change of rate (96 / 12.8 = 7.5).
        # Its 12.80 must remain independent of the preceding example of additional postage.
        if now != revised[lang]:
            paragraphs[0] = revised[lang]
            pretty = lang == 'en'
            data = json.dumps(content, ensure_ascii=False, indent=2 if pretty else None,
                              separators=None if pretty else (',', ':')) + '\n'
            outputs.append((path, data))
        receipts.append({'language': lang, 'before_sha256': sha(original),
                         'after_sha256': sha(revised[lang]), 'changed': now != revised[lang]})
    for path, data in outputs:
        mode = path.stat().st_mode & 0o777
        with tempfile.NamedTemporaryFile(mode='w', encoding='utf8', dir=path.parent, delete=False) as handle:
            handle.write(data)
        os.chmod(handle.name,mode)
        os.replace(handle.name,path)
    write_json(summary,{'site': SITE, 'slug': SLUG, 'section': 5, 'paragraph': 1,
                        'formula': '96 / 8 = 12; (96 + 8) / 8 = 13',
                        'editions': receipts, 'edited_files': len(outputs)})
    print(f'{SITE}: confirmed checkout example for {len(receipts)} editions, changed {len(outputs)} files')

if __name__ == '__main__':
    cli = argparse.ArgumentParser(description=__doc__)
    cli.add_argument('--sites', required=True, type=Path)
    cli.add_argument('--dictionaries', required=True, type=Path)
    cli.add_argument('--summary', required=True, type=Path)
    args = cli.parse_args()
    apply_checkout(args.sites, args.dictionaries, args.summary)
