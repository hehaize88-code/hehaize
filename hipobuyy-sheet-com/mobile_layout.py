"""Progressive mobile reading layout; full text remains in static HTML."""
import html
import re

VERSION = '20261013-mobile-1'
COPY = {
    'en': ['Expand all', 'Collapse all', 'Show more', 'Show fewer', 'Related guides'],
    'de': ['Alles öffnen', 'Alles schließen', 'Mehr anzeigen', 'Weniger anzeigen', 'Weitere Ratgeber'],
    'es': ['Abrir todo', 'Cerrar todo', 'Mostrar más', 'Mostrar menos', 'Guías relacionadas'],
    'fr': ['Tout développer', 'Tout replier', 'Afficher plus', 'Afficher moins', 'Guides associés'],
    'it': ['Apri tutto', 'Chiudi tutto', 'Mostra altro', 'Mostra meno', 'Guide correlate'],
}

def assets():
    return f'<link rel="stylesheet" href="/assets/mobile-inner.css?v={VERSION}"><script defer src="/assets/mobile-inner.js?v={VERSION}"></script>'

def chapters(blocks):
    """Keep introductory blocks visible; make each complete H2 section a disclosure."""
    result = []
    active = False
    for block in blocks:
        if block.startswith('<h2'):
            if active:
                result.append('</div></details>')
            result.append('<details class="mobile-chapter" open><summary>' + block + '</summary><div class="mobile-chapter-body">')
            active = True
        else:
            result.append(block)
    if active:
        result.append('</div></details>')
    return ''.join(result)

def compact_support(body, lang):
    def wrap(match):
        content = match.group(0)
        title = re.search(r'<h2[^>]*>(.*?)</h2>', content)
        label = title.group(1) if title else html.escape(COPY[lang][4])
        return '<details class="mobile-topic" open><summary>' + label + '</summary><div class="mobile-topic-body">' + content + '</div></details>'
    body = re.sub(r'<(section|nav) class="(?:parcel-calculator|editorial-products|related-guides)"[^>]*>.*?</\1>', wrap, body, flags=re.S)
    if 'class="mobile-chapter"' in body:
        labels = COPY[lang]
        tools = '<div class="mobile-reading-tools"><button type="button" data-reading="open">' + labels[0] + '</button><button type="button" data-reading="close">' + labels[1] + '</button></div>'
        body = body.replace('<div class="wrap route">', '<div class="wrap route">' + tools, 1)
    return body
