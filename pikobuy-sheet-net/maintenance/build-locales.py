"""Build public-page text dictionaries from the published markup and catalogue controls.

Existing editorial translations take precedence wherever text nodes align exactly.
Set LOCALE_LANGS to restrict a rebuild to a comma-separated subset.
"""
from collections import Counter, defaultdict
from concurrent.futures import ThreadPoolExecutor, as_completed
import argparse
import ast
import json
import os
from pathlib import Path
import re
from urllib.parse import urlencode
from urllib.request import urlopen

from lxml import html as lhtml

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "assets/locale-packs"
LANGUAGES = "en de fr es it nl pt pl ro sv zh da fi el cs hu bg sk hr ja ko vi th id".split()
NATIVE = {"de", "fr", "es", "it", "pl", "pt"}
PROTECTED = set("PikoBuy Pikobuy USD CNY EUR FAQ QC".split())
WIDGETS = [
    "Language", "Currency", "Other buying agents", "Copy Weidian link", "Copy style link",
    "Copy product link", "Link copied", "Copied", "Copy failed", "Styles", "Style", "Select a style",
    "Selected style", "Product photos", "Detail photos", "QC photos", "Image search", "Search by image",
    "Choose an image", "Choose a file", "Browse", "Search", "Close", "Product ID",
    "Choose an option before copying the link", "A link for this combination is unavailable.",
    "Open in PikoBuy", "Exchange rates", "Last updated", "Rates unavailable", "Shopping cart",
    "Product unavailable", "Not found", "Catalogue unavailable", "All products", "Home",
    "Expand all sections", "Collapse sections", "Tap a heading to read", "Show more", "Show fewer",
    "Uploading image", "Loading image index…", "Comparing catalogue images…", "similar products",
    "Could not read this image. Choose a JPEG, PNG or WebP under 10 MB.",
    "Image index unavailable. Please try again.", "products indexed", "Index updated",
]
# Product selectors and status messages use consistent wording even when a merchant
# has thousands of options. Values follow DETAIL_KEYS in the same order.
DETAIL_KEYS = (
    "QC and detail photos", "Seller photos", "Copy the link below",
    "Style information is temporarily unavailable.", "Confirm the selected options on Weidian.",
    "Styles", "Product photos", "Other buying agents", "Copy Weidian link",
)
DETAIL_COPY = {
    "de": "QC- und Detailfotos|Verkäuferfotos|Link unten kopieren|Die Varianten sind derzeit nicht verfügbar.|Bestätige die ausgewählten Optionen auf Weidian.|Varianten|Produktfotos|Weitere Einkaufsagenten|Weidian-Link kopieren",
    "fr": "Photos de contrôle qualité et de détail|Photos du vendeur|Copier le lien ci-dessous|Les variantes sont momentanément indisponibles.|Confirmez les options sélectionnées sur Weidian.|Variantes|Photos du produit|Autres agents d’achat|Copier le lien Weidian",
    "es": "Fotos de control de calidad y detalles|Fotos del vendedor|Copiar el enlace de abajo|Las variantes no están disponibles temporalmente.|Confirma las opciones seleccionadas en Weidian.|Variantes|Fotos del producto|Otros agentes de compra|Copiar enlace de Weidian",
    "it": "Foto del controllo qualità e dei dettagli|Foto del venditore|Copia il link qui sotto|Le varianti sono temporaneamente indisponibili.|Conferma le opzioni selezionate su Weidian.|Varianti|Foto del prodotto|Altri agenti di acquisto|Copia il link Weidian",
    "nl": "QC- en detailfoto’s|Foto’s van de verkoper|Kopieer de onderstaande link|De varianten zijn tijdelijk niet beschikbaar.|Bevestig de geselecteerde opties op Weidian.|Varianten|Productfoto’s|Andere aankoopagenten|Weidian-link kopiëren",
    "pt": "Fotos de controlo de qualidade e de detalhes|Fotos do vendedor|Copiar o link abaixo|As variantes estão temporariamente indisponíveis.|Confirme as opções selecionadas na Weidian.|Variantes|Fotos do produto|Outros agentes de compras|Copiar link da Weidian",
    "pl": "Zdjęcia kontroli jakości i detali|Zdjęcia sprzedawcy|Skopiuj poniższy link|Informacje o wariantach są chwilowo niedostępne.|Potwierdź wybrane opcje w Weidian.|Warianty|Zdjęcia produktu|Inni pośrednicy zakupowi|Skopiuj link Weidian",
    "ro": "Fotografii de control al calității și de detaliu|Fotografiile vânzătorului|Copiază linkul de mai jos|Informațiile despre variante sunt temporar indisponibile.|Confirmă opțiunile selectate pe Weidian.|Variante|Fotografii ale produsului|Alți agenți de cumpărături|Copiază linkul Weidian",
    "sv": "Bilder från kvalitetskontrollen och detaljbilder|Säljarens bilder|Kopiera länken nedan|Variantinformationen är tillfälligt otillgänglig.|Bekräfta de valda alternativen på Weidian.|Varianter|Produktbilder|Andra inköpsagenter|Kopiera Weidian-länken",
    "zh": "质检图和详情图|卖家图片|复制下方链接|暂时无法获取款式信息。|请在微店确认所选款式和规格。|款式|商品图片|其他购买平台|复制微店链接",
    "da": "Billeder fra kvalitetskontrol og detaljebilleder|Sælgerens billeder|Kopiér linket nedenfor|Variantoplysningerne er midlertidigt utilgængelige.|Bekræft de valgte muligheder på Weidian.|Varianter|Produktbilleder|Andre indkøbsagenter|Kopiér Weidian-link",
    "fi": "Laadunvalvonta- ja yksityiskohtakuvat|Myyjän kuvat|Kopioi alla oleva linkki|Vaihtoehtojen tiedot eivät ole juuri nyt saatavilla.|Vahvista valitut vaihtoehdot Weidianissa.|Vaihtoehdot|Tuotekuvat|Muut ostovälittäjät|Kopioi Weidian-linkki",
    "el": "Φωτογραφίες ποιοτικού ελέγχου και λεπτομερειών|Φωτογραφίες πωλητή|Αντιγραφή του παρακάτω συνδέσμου|Οι πληροφορίες για τις παραλλαγές δεν είναι προσωρινά διαθέσιμες.|Επιβεβαιώστε τις επιλογές σας στο Weidian.|Παραλλαγές|Φωτογραφίες προϊόντος|Άλλοι αντιπρόσωποι αγορών|Αντιγραφή συνδέσμου Weidian",
    "cs": "Fotografie kontroly kvality a detailů|Fotografie prodejce|Zkopírovat odkaz níže|Informace o variantách jsou dočasně nedostupné.|Potvrďte vybrané možnosti na Weidianu.|Varianty|Fotografie produktu|Další zprostředkovatelé nákupu|Zkopírovat odkaz na Weidian",
    "hu": "Minőség-ellenőrzési és részletfotók|Az eladó képei|Az alábbi hivatkozás másolása|A változatok adatai átmenetileg nem érhetők el.|Erősítse meg a kiválasztott lehetőségeket a Weidianon.|Változatok|Termékfotók|További vásárlási közvetítők|Weidian-hivatkozás másolása",
    "bg": "Снимки от контрола на качеството и на детайлите|Снимки на продавача|Копирайте връзката по-долу|Информацията за вариантите временно не е достъпна.|Потвърдете избраните опции в Weidian.|Варианти|Снимки на продукта|Други посредници за покупки|Копиране на връзката към Weidian",
    "sk": "Fotografie kontroly kvality a detailov|Fotografie predajcu|Skopírovať odkaz nižšie|Informácie o variantoch sú dočasne nedostupné.|Potvrďte vybrané možnosti na Weidiane.|Varianty|Fotografie produktu|Ďalší sprostredkovatelia nákupu|Skopírovať odkaz na Weidian",
    "hr": "Fotografije kontrole kvalitete i detalja|Fotografije prodavača|Kopirajte poveznicu u nastavku|Podaci o varijantama privremeno su nedostupni.|Potvrdite odabrane opcije na Weidianu.|Varijante|Fotografije proizvoda|Drugi posrednici pri kupnji|Kopiraj poveznicu na Weidian",
    "ja": "検品写真・詳細画像|出品者の写真|下のリンクをコピー|現在、バリエーション情報を取得できません。|選択した仕様を微店で確認してください。|バリエーション|商品画像|その他の購入代行サービス|微店のリンクをコピー",
    "ko": "검수 및 상세 사진|판매자 사진|아래 링크 복사|현재 옵션 정보를 불러올 수 없습니다.|웨이디엔에서 선택한 옵션을 확인하세요.|옵션|상품 사진|다른 구매대행 플랫폼|웨이디엔 링크 복사",
    "vi": "Ảnh kiểm hàng và ảnh chi tiết|Ảnh của người bán|Sao chép liên kết bên dưới|Thông tin mẫu mã tạm thời chưa có.|Hãy xác nhận các tùy chọn đã chọn trên Weidian.|Mẫu mã|Ảnh sản phẩm|Đơn vị mua hộ khác|Sao chép liên kết Weidian",
    "th": "ภาพตรวจสอบคุณภาพและภาพรายละเอียด|ภาพจากผู้ขาย|คัดลอกลิงก์ด้านล่าง|ไม่สามารถแสดงข้อมูลตัวเลือกได้ชั่วคราว|โปรดยืนยันตัวเลือกที่เลือกบน Weidian|ตัวเลือกสินค้า|ภาพสินค้า|ผู้ให้บริการสั่งซื้อรายอื่น|คัดลอกลิงก์ Weidian",
    "id": "Foto pemeriksaan kualitas dan detail|Foto penjual|Salin tautan di bawah|Informasi varian untuk sementara tidak tersedia.|Konfirmasikan pilihan Anda di Weidian.|Varian|Foto produk|Agen pembelian lainnya|Salin tautan Weidian",
}
def overrides(lang):
    values = DETAIL_COPY[lang].split("|")
    result = dict(zip(DETAIL_KEYS, values, strict=True))
    if lang == "zh":
        result.update({
            "Choose a file": "选择文件", "Choose an image": "选择图片", "Copy failed": "复制失败",
            "Copy style link": "复制款式链接", "Detail photos": "详情图", "Independent-site notice:": "独立站说明：",
            "Open in PikoBuy": "在 PikoBuy 打开", "Open in Pikobuy": "在 PikoBuy 打开",
            "Product unavailable": "商品暂不可用", "Register on Pikobuy ↗": "注册 PikoBuy ↗",
            "Select a style": "选择款式", "Selected style": "已选款式", "Shipping": "配送",
        })
    return result


def norm(text):
    return " ".join(text.split())


def eligible(text):
    return (
        bool(re.search(r"[a-zA-Z]", text))
        and text not in PROTECTED
        and not text.startswith(("https://", "http://"))
    )


def page_nodes(path):
    doc = lhtml.document_fromstring(path.read_bytes())
    tree = doc.getroottree()
    nodes = {}
    skip = {"script", "style", "noscript"}
    metadata = {"description", "og:title", "og:description", "twitter:title", "twitter:description"}
    for node in doc.iter():
        if not isinstance(node.tag, str):
            continue
        ancestry = [node, *node.iterancestors()]
        if any(el.tag in skip or el.get("hreflang") for el in ancestry):
            continue
        key = tree.getpath(node)
        for slot in ("text", "tail", "alt", "placeholder", "aria-label", "title", "content"):
            if slot == "content":
                if node.tag != "meta" or node.get("name", node.get("property")) not in metadata:
                    continue
            value = getattr(node, slot) if slot in ("text", "tail") else node.get(slot)
            if isinstance(value, str) and norm(value):
                nodes[(key, slot)] = norm(value)
    return nodes


def public_copy():
    routes = json.loads((ROOT / "commerce/routes.json").read_text())["routes"]
    weights = Counter()
    aligned = defaultdict(lambda: defaultdict(Counter))
    for route in routes:
        if route.strip("/").split("/")[0] in NATIVE:
            continue
        if route != "/categories/" and route.startswith(("/finds/", "/categories/")):
            continue
        path = ROOT / route.strip("/") / "index.html"
        if not path.exists():
            continue
        english = page_nodes(path)
        weights.update(text for text in english.values() if eligible(text))
        for lang in NATIVE:
            localized_path = ROOT / lang / path.relative_to(ROOT)
            if not localized_path.exists():
                continue
            target = page_nodes(localized_path)
            # Different article revisions cannot be paired by positional index.
            if english.keys() != target.keys():
                continue
            for key, source in english.items():
                translated = target[key]
                if eligible(source) and source != translated:
                    aligned[lang][source][translated] += 1
    for string in (*WIDGETS, *DETAIL_KEYS):
        weights[string] += 200
    catalog = (ROOT / "commerce/catalog.mjs").read_text()
    for group in re.finditer(r"\ben:\s*(\[[^\]]+\])", catalog):
        try:
            values = ast.literal_eval(group[1])
        except (SyntaxError, ValueError):
            continue
        for string in values:
            weights[string] += 150
    return [text for text, _ in weights.most_common()], aligned


def translate(texts, lang):
    params = urlencode({
        "client": "gtx", "sl": "en", "tl": "zh-CN" if lang == "zh" else lang,
        "dt": "t", "q": "\n".join(texts),
    })
    with urlopen("https://translate.googleapis.com/translate_a/single?" + params, timeout=35) as response:
        segments = json.load(response)[0]
    translated = "".join(part[0] for part in segments if part[0]).strip().splitlines()
    if len(translated) == len(texts) and all(t.strip() for t in translated):
        return dict(zip(texts, map(str.strip, translated)))
    # Some responses change the line breaks. Accept only exact source matches.
    pairs = {norm(row[1]): norm(row[0]) for row in segments if len(row) > 1 and row[0] and row[1]}
    return {text: pairs[text] for text in texts if text in pairs}


def batches(texts, limit=3300):
    batch = []
    size = 0
    for text in texts:
        if batch and size + len(text) + 1 > limit:
            yield batch
            size = 0
            batch = []
        batch.append(text)
        size += len(text) + 1
    if batch:
        yield batch


def save(lang, dictionary):
    path = OUTPUT / (lang + ".json")
    temp = path.with_suffix(".tmp")
    body = json.dumps(dict(sorted(dictionary.items())), ensure_ascii=False, separators=(",", ":"))
    temp.write_text(body, encoding="utf8")
    temp.replace(path)


def run():
    parser = argparse.ArgumentParser()
    parser.add_argument("--workers", type=int, default=8)
    parser.add_argument("--limit", type=int, help="Only process the most frequent source strings.")
    args = parser.parse_args()
    ordered, aligned = public_copy()
    ordered = ordered[:args.limit]
    OUTPUT.mkdir(parents=True, exist_ok=True)
    dictionaries = {}
    tasks = {}
    for lang in os.getenv("LOCALE_LANGS", " ".join(LANGUAGES)).replace(",", " ").split():
        path = OUTPUT / (lang + ".json")
        if lang == "en":
            save(lang, {})
            continue
        dictionary = json.loads(path.read_text()) if path.exists() else {}
        for source, choices in aligned[lang].items():
            if len(choices) == 1:
                dictionary[source] = next(iter(choices))
        dictionary.update(overrides(lang))
        save(lang, dictionary)
        dictionaries[lang] = dictionary
        tasks[lang] = list(batches(t for t in ordered if t not in dictionary))

    total = sum(map(len, tasks.values()))
    print(f"{len(ordered)} keys, {total} batches", flush=True)
    errors = Counter()
    with ThreadPoolExecutor(max_workers=args.workers) as pool:
        pending = {}
        for i in range(max(map(len, tasks.values()), default=0)):
            for lang, parts in tasks.items():
                if i < len(parts):
                    pending[pool.submit(translate, parts[i], lang)] = lang
        for n, future in enumerate(as_completed(pending), 1):
            lang = pending[future]
            try:
                dictionaries[lang].update(future.result())
                save(lang, dictionaries[lang])
            except Exception as error:
                errors[str(error)] += 1
            if n % 40 == 0:
                print(n, total, dict(errors), flush=True)

    missing = 0
    for lang, dictionary in dictionaries.items():
        count = sum(t in dictionary for t in ordered)
        print(lang, count, "/", len(ordered))
        missing += len(ordered) - count
    if missing:
        raise SystemExit(f"Missing {missing} translations. Rerun to resume. Network errors: {dict(errors)}")


if __name__ == "__main__":
    run()
