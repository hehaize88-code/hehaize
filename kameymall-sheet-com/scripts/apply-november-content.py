"""Reproducibly apply the reviewed six-language November editorial update."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "content/november"
TARGET = ROOT / "app/site-article-refresh.json"
data = json.loads(TARGET.read_text())
copy = json.loads((SOURCE / "copy.json").read_text())
routes = {"uk": "articles/kameymall-shipping-to-uk", "tshirts": "articles/kameymall-tshirt-finds"}
related = ["/finds", "/articles/kameymall-size-guide", "/articles/how-to-read-kameymall-qc-photos"]
tshirt_sources = {
    "en": "Editorial review: November 9, 2026. Product references and prices come from this site's catalog, last checked September 1, 2026. No new stock, price, fabric or authenticity verification is claimed. Measurement and QC examples are editorial guidance; confirm current purchasing and shipping service before payment.",
    "de": "Redaktionelle Prüfung: 9. November 2026. Referenzen und Preise stammen aus dem Katalog, zuletzt geprüft am 1. September 2026. Keine neue Prüfung von Bestand, Preis, Material oder Echtheit. Mess- und QC-Beispiele sind redaktionelle Hilfen; aktuellen Einkaufs- und Versandservice vor Zahlung bestätigen.",
    "fr": "Révision éditoriale : 9 novembre 2026. Références et prix viennent du catalogue contrôlé le 1er septembre 2026. Aucune nouvelle vérification de stock, prix, matière ou authenticité. Mesures et QC sont des conseils éditoriaux ; confirmez le service d’achat et de livraison avant paiement.",
    "es": "Revisión editorial: 9 de noviembre de 2026. Referencias y precios proceden del catálogo revisado el 1 de septiembre de 2026. No hay nueva verificación de stock, precio, tejido o autenticidad. Medidas y QC son orientación editorial; confirma compra y envío actuales antes de pagar.",
    "it": "Revisione editoriale: 9 novembre 2026. Riferimenti e prezzi provengono dal catalogo controllato il 1° settembre 2026. Nessuna nuova verifica di scorte, prezzo, tessuto o autenticità. Misure e QC sono consigli editoriali; conferma acquisto e spedizione attuali prima di pagare.",
    "pl": "Przegląd redakcyjny: 9 listopada 2026. Referencje i ceny pochodzą z katalogu sprawdzonego 1 września 2026. Nie deklarujemy nowej kontroli zapasu, ceny, materiału ani autentyczności. Pomiary i QC to wskazówki redakcyjne; potwierdź usługę zakupową i wysyłkową przed płatnością.",
}

for locale, ui in copy.items():
    pages = data[locale]["pages"]
    fallback_labels = {
        "en": ["Tracking without updates", "How to buy", "Order status"],
        "de": ["Tracking ohne Aktualisierung", "So kaufst du ein", "Bestellstatus"],
        "fr": ["Suivi sans mise à jour", "Comment acheter", "Statut de commande"],
        "es": ["Seguimiento sin novedades", "Cómo comprar", "Estado del pedido"],
        "it": ["Tracking senza aggiornamenti", "Come acquistare", "Stato dell’ordine"],
        "pl": ["Śledzenie bez aktualizacji", "Jak kupować", "Status zamówienia"],
    }
    fallback = dict(zip(["articles/kameymall-tracking-no-update-guide", "articles/how-to-buy-from-kameymall-2026", "articles/kameymall-order-status-guide"], fallback_labels[locale]))
    def title(route):
        return pages[route]["title"] if route in pages else fallback[route]
    authored = json.loads((SOURCE / f"{locale}.json").read_text())
    for key, route in routes.items():
        article = authored[key]
        pages[route] = {
            "label": "UK" if key == "uk" else {"en": "T-shirt finds", "de": "T-Shirt-Auswahl", "fr": "Sélection T-shirts", "es": "Selección de camisetas", "it": "Selezione T-shirt", "pl": "Wybór koszulek"}[locale],
            "title": article["title"], "intro": article["intro"],
            "seoTitle": article["title"], "seoDescription": article["description"],
            "updated": ui["updated"], "published": "2026-11-09", "modified": "2026-11-09",
            "readTime": {"en": "8 minute read", "de": "8 Minuten Lesezeit", "fr": "8 minutes de lecture", "es": "8 minutos de lectura", "it": "8 minuti di lettura", "pl": "8 minut czytania"}[locale],
            "sourceNote": ui["source"] if key == "uk" else tshirt_sources[locale],
            "primaryKeyword": "kameymall shipping to uk" if key == "uk" else "kameymall t shirt finds",
            "sections": [{"heading": heading, "paragraphs": [paragraph]} for heading, paragraph in article["sections"]],
            "conclusionTitle": article["conclusionTitle"], "conclusion": article["conclusion"],
            "relatedTitle": ui["related"],
            "relatedLinks": [
                {"label": ui["browse"], "href": "/finds"},
                *[{"label": title(r), "href": "/" + r} for r in (
                    ["articles/kameymall-shipping-cost-guide-2026", "articles/kameymall-volumetric-weight-guide", "articles/kameymall-tracking-no-update-guide"] if key == "uk" else
                    ["articles/kameymall-size-guide", "articles/how-to-read-kameymall-qc-photos", "articles/kameymall-product-link-not-working"]
                )]
            ],
        }
    # Preserve the legacy body and dated research, adding a concrete worked example.
    for route, prefix in [("articles/kameymall-spreadsheet-guide-2026", "spreadsheet"), ("articles/kameymall-product-link-not-working", "link")]:
        page = pages[route]
        page["title"] = page["seoTitle"] = ui[prefix + "Title"]
        if prefix == "link": page["seoDescription"] = ui["linkDescription"]
        page["updated"], page["modified"] = ui["updated"], "2026-11-09"
        page["sourceNote"] = page["sourceNote"].split("\n")[0] + "\n" + ui["historical"]
        heading = ui[prefix + "CaseTitle"]
        page["sections"] = [s for s in page["sections"] if s["heading"] != heading]
        page["sections"].insert(1, {"heading": heading, "paragraphs": ui[prefix + "Case"]})
        targets = ["articles/kameymall-tshirt-finds", "articles/kameymall-shipping-to-uk", "articles/kameymall-size-guide"] if prefix == "spreadsheet" else ["articles/how-to-buy-from-kameymall-2026", "articles/kameymall-order-status-guide", "articles/how-to-read-kameymall-qc-photos"]
        page["relatedTitle"] = ui["related"]
        page["relatedLinks"] = [{"label": ui["browse"], "href": "/finds"}] + [{"label": title(t), "href": "/" + t} for t in targets]
    # Link existing relevant articles to the new destinations in every language.
    for parent, child in [
        ("articles/kameymall-size-guide", routes["tshirts"]),
        ("articles/kameymall-shipping-cost-guide-2026", routes["uk"]),
        ("articles/kameymall-volumetric-weight-guide", routes["uk"]),
    ]:
        links = pages[parent].setdefault("relatedLinks", [])
        if not any(l["href"] == "/" + child for l in links):
            links.append({"label": pages[child]["title"], "href": "/" + child})
        pages[parent]["modified"] = "2026-11-09"
        pages[parent]["updated"] = ui["updated"]
    data[locale]["ui"]["libraryIntro"] = ui["library"]

# Correct identified translation errors in the actual shared content source.
replacements = {
    "de": {"Leitfaden zum aufladbaren Gewicht": "Ratgeber zum Abrechnungsgewicht"},
    "pl": {"trasy, adresy i zwyczaje": "trasy, adresy i odprawa celna", "Przeglądaj przestarzałe znaleziska": "Przeglądaj produkty z datowanymi cenami"},
    "it": {"Reperti di felpe e felpe": "Selezione di felpe e hoodie", "Reperti di maglie da calcio": "Selezione di maglie da calcio"},
}
for locale, edits in replacements.items():
    raw = json.dumps(data[locale], ensure_ascii=False)
    for before, after in edits.items(): raw = raw.replace(before, after)
    data[locale] = json.loads(raw)
for locale, changed in {
    "de": ["articles/kameymall-volumetric-weight-guide"],
    "pl": ["articles/kameymall-shipping-to-philippines", "articles/kameymall-budget-finds-under-100-cny"],
    "it": ["articles/kameymall-hoodie-finds", "articles/kameymall-football-jersey-finds"],
}.items():
    for route in changed:
        data[locale]["pages"][route]["modified"] = "2026-11-09"
        data[locale]["pages"][route]["updated"] = copy[locale]["updated"]
TARGET.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n")
print("Updated 26 articles in each of six languages; retained original publication dates.")
