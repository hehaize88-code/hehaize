"""Narrow English paraphrases for a translation input only; keep the original as the cache/output key."""
import re

# Longer, context-limited phrases precede general ones. No substitutions for ambiguous
# standalone words such as print, ease, left, set, order, lead, line, return or tier.
_PHRASES = [
    ("read any storage deadline against the individual warehouse entry", "check the deadline for storing each item in its own warehouse record"),
    ("left chest as worn", "left side of the chest from the perspective of the person wearing the garment"),
    ("right chest as worn", "right side of the chest from the perspective of the person wearing the garment"),
    ("left and right as worn", "left and right from the perspective of the person wearing the garment"),
    ("left as worn", "left from the perspective of the person wearing the garment"),
    ("right as worn", "right from the perspective of the person wearing the garment"),
    ("text belongs on a sleeve", "text should be printed on the part of the garment covering the arm"),
    ("which sleeve", "whether it is the right or left sleeve of the garment"),
    ("body size, garment width and ease", "body measurements, garment width and extra room for movement"),
    ("garment ease", "extra room between the garment and the body"),
    ("recommended chest circumference", "recommended measurement around the person's chest"),
    ("finished chest circumference", "measurement around the chest of the finished garment"),
    ("recommended body measurements", "recommended measurements of the person wearing the garment"),
    ("a personalised print", "a design printed on clothing at the customer's request"),
    ("a personalized print", "a design printed on clothing at the customer's request"),
    ("shoe insole measurement", "measurement of the inner sole of a shoe"),
    ("outbound parcels", "packages being shipped from the warehouse to customers"),
    ("outbound parcel", "package being shipped from the warehouse to the customer"),
    ("warehouse entries", "warehouse records for individual items"),
    ("warehouse entry", "warehouse record for an individual item"),
    ("quantity price tiers", "different prices for different order quantities"),
    ("quantity breaks", "order quantities at which the unit price changes"),
    ("minimum order quantity", "smallest number of units the seller accepts in one order"),
    ("split seller delivery", "delivery that the seller sends in separate packages"),
    ("split shipment", "shipment divided into separate packages"),
    ("domestic tracking number", "tracking number for the shipment within the country"),
    ("garment laid flat", "garment placed flat on a surface"),
    ("laid-flat measurements", "measurements taken with the garment lying flat"),
    ("single-piece options", "options to buy just one piece of clothing"),
    ("order note", "note containing instructions for the purchase"),
]
_TERMS = dict(_PHRASES)
_MATCH = re.compile(r"(?<![\w/-])(?:"+"|".join(re.escape(k) for k in sorted(_TERMS,key=len,reverse=True))+r")(?![\w/-])", re.I)
_SKIP = re.compile(r'(https?://[^\s<>]+|<[^>]+>|\x60[^\x60]+\x60)')
def prepare_for_mt(text):
    """Return conservative English MT input; URLs, markup and inline code stay intact."""
    def substitute(match):
        original=match.group(0)
        value=_TERMS[original.lower()]
        return value[:1].upper()+value[1:] if original[0].isupper() else value
    return ''.join(bit if i%2 else _MATCH.sub(substitute,bit) for i,bit in enumerate(_SKIP.split(text)))
