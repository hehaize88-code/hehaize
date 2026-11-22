"""Publish the shared cnbuycha catalogue snapshot as first-party PikoBuy assets.

The sibling KakobuyPick refresh workflow builds the underlying visual fingerprints
from cnbuycha and the corresponding Weidian listings. Both sites use the same
source product paths. Run after a shared index revision changes.
"""
from pathlib import Path
from collections import Counter
import gzip
import hashlib
import json
import re
import shutil

root = Path(__file__).resolve().parents[1]
source = root.parent / 'kakobuypick-com'
metadata = {}
for line in (source / 'src/lib/visual/manifest.mjs').read_text().splitlines():
    name, _, raw = line.partition('=')
    metadata[name.split()[-1]] = json.loads(raw.removesuffix(';'))
meta = metadata['imageMeta']
if meta['source'] != 'https://cnbuycha.com' or meta['partial']:
    raise ValueError('The shared image inventory is incomplete')
revision = meta['revision']
if not re.fullmatch(r'[0-9a-f]{16}', revision):
    raise ValueError('Invalid revision')
source_dir = source / 'public/image-index' / revision
target = root / 'assets/visual-index' / revision
digest = hashlib.sha256()
kinds = Counter()
paths = set()
for number in range(meta['shards']):
    blob = (source_dir / f'{number}.json.gz').read_bytes()
    digest.update(blob)
    for path, photos in json.loads(gzip.decompress(blob)):
        if path in paths or not photos:
            raise ValueError(f'Invalid image record for {path}')
        paths.add(path)
        for _, signature, color, kind in photos:
            if not signature or not color:
                raise ValueError(f'Missing image fingerprint for {path}')
            kinds[kind] += 1
if (digest.hexdigest()[:16] != revision or kinds != meta['kinds']
        or paths != set(metadata['imageNames']) or paths != set(metadata['verifiedProducts'])):
    raise ValueError('Catalogue/image index mismatch')
target.mkdir(parents=True, exist_ok=True)
for number in range(meta['shards']):
    shutil.copyfile(source_dir / f'{number}.json.gz', target / f'{number}.json.gz')
(target / 'titles.json').write_text(json.dumps(metadata['imageNames'], separators=(',', ':'), ensure_ascii=False))
manifest = root / 'catalog-image-index.json'
temporary = manifest.with_suffix('.tmp')
temporary.write_text(json.dumps(meta, separators=(',', ':')))
temporary.replace(manifest)
# Keep the previous revision available to tabs opened during deployment.
revisions = sorted((root / 'assets/visual-index').iterdir(), key=lambda p: p.stat().st_mtime, reverse=True)
previous = next((p for p in revisions if p != target and re.fullmatch('[0-9a-f]{16}', p.name)), None)
for directory in revisions:
    if directory not in (target, previous) and re.fullmatch('[0-9a-f]{16}', directory.name):
        shutil.rmtree(directory)
