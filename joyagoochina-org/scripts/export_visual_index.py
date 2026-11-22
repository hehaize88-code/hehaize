"""Publish a compact searchable index from the verified native-resolution seed."""
import base64
import gzip
import hashlib
import json
from pathlib import Path


def encode(value):
    return json.dumps(value, ensure_ascii=False, separators=(',', ':')).encode()


def sha(data):
    return hashlib.sha256(data).hexdigest()


def write_json(path, value):
    temporary = path.with_suffix('.next')
    temporary.write_bytes(encode(value))
    temporary.replace(path)


def publish(directory, source, catalogue):
    directory = Path(directory)
    groups = {}
    titles = {}
    for shard in source['shards']:
        raw = (directory / shard['url'].lstrip('/')).read_bytes()
        if sha(raw) != shard['sha256']:
            raise ValueError('Image shard checksum mismatch')
        for record in json.loads(raw)['products']:
            path = record['path']
            titles[path] = record['title']
            # The client uses the native-area algorithm for hashes starting with "a".
            signature = 'a' + format(int(record['hash'], 2), '016x')
            color = base64.b64encode(bytes(value >> 3 for value in record['cells'])).decode()
            kind = {'gallery': 'source', 'seller': 'gallery', 'style': 'style'}[record['kind']]
            groups.setdefault(path, []).append([record['image'], signature, color, kind])
    if len(groups) != source['indexedProductCount']:
        raise ValueError('Product count mismatch')
    batches, rows, size = [], [], 0
    for path in sorted(groups):
        images = groups[path]
        if rows and size + len(images) > 6000:
            batches.append((rows, size))
            rows, size = [], 0
        rows.append([path, images])
        size += len(images)
    if rows:
        batches.append((rows, size))
    payloads = []
    for rows, count in batches:
        raw = encode(rows)
        packed = gzip.compress(raw, compresslevel=6, mtime=0)
        payloads.append((packed, {'count': count, 'sha256': sha(packed), 'jsonSha256': sha(raw)}))
    if sum(meta['count'] for _, meta in payloads) != source['indexedImageCount']:
        raise ValueError('Image count mismatch')
    title_bytes = encode(titles)
    revision = sha(encode([sha(title_bytes)] + [meta['sha256'] for _, meta in payloads]))[:16]
    relative = f'assets/visual-index/{revision}'
    folder = directory / relative
    folder.mkdir(parents=True, exist_ok=True)
    shards = []
    for i, (packed, meta) in enumerate(payloads):
        name = f'{i}.bin'
        (folder / name).write_bytes(packed)
        shards.append({'url': f'/{relative}/{name}', **meta})
    (folder / 'titles.json').write_bytes(title_bytes)
    prices = {p['path']: float(p['price']) for p in catalogue if p['price'] not in (None, '')}
    (directory / 'commerce').mkdir(exist_ok=True)
    write_json(directory / 'commerce/image-search-prices.json', prices)
    manifest = {**source, 'version': 3, 'descriptorAlgorithm': 'compact-rgb-dhash', 'shards': shards,
                'titles': {'url': f'/{relative}/titles.json', 'sha256': sha(title_bytes)}}
    write_json(directory / 'catalog-image-index.json', manifest)
