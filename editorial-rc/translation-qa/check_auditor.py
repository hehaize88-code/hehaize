"""Targeted controls for numerals, locale punctuation, names and semantic warnings."""
from audit import audit,units_for,langcheck

def issues(s,t,l='de'):
    return {f['issue'] for f in audit({s:t},l,{s},'test')[1]}
check = [
    ('The quote was 1,500.50 yuan.','Das Angebot betrug 1.500,50 Yuan.','de',set()),
    ('The shirts measure 52 cm.','Die Hemden messen 53 cm.','de',{'example number omitted or reformatted','new digit or localized conversion'}),
    ('The box weighs two kilograms.','Die Kiste wiegt zwei Kilogramm.','de',set()),
    ('The box weighs 2 kilograms.','這個箱子重２公斤。','zh',set()),
    ('The box weighs 2 kilograms.','Der Karton wiegt 2 Euro.','de',{'quantity unit or currency changed'}),
    ('EastMallBuy sent code AX-47.','iTaoBuy hat den Code AX-48 gesendet.','de',{'unexpected platform name','example identifier changed'}),
    ('Open https://example.org/item?a=1.','Öffnen Sie https://example.org/foo?a=1.','de',{'literal URL changed'}),
]
for s,t,l,expected in check:
    actual=issues(s,t,l)
    assert expected<=actual and (expected or not actual),(s,t,actual,expected)
s='The warehouse received the parcel and checked its contents against the order. It recorded the parcel number and the arrival time in the receiving log.'
assert {'long passage unchanged','language mismatch'}<=issues(s,s)
assert langcheck('Intraċċa lista Weidian, tqabbel iċ-ċarts tad-daqs, aqra r-ritratti tal-maħżen u segwi pakkett OOTDBuy mill-ippakkjar sal-kunsinna.','mt')[1] is None
print('Nine targeted auditor controls passed.')
