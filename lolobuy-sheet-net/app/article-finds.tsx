import Link from 'next/link';
import finds from './article-finds.json';
import {localizedPath} from './i18n';
import type {Locale} from './translations';
const names:Record<Locale,string[]>={
 en:["Women's coat","Women's shoes · 10315","Strappy dress","Loose-fit long-sleeve top · 3400","Autumn long-sleeve top · 3394","Printed long-sleeve shirt · 3384"],
 de:['Damenmantel','Damenschuhe · 10315','Trägerkleid','Lockeres Langarmoberteil · 3400','Herbstliches Langarmoberteil · 3394','Bedrucktes Langarmhemd · 3384'],
 es:['Abrigo de mujer','Calzado de mujer · 10315','Vestido de tirantes','Camiseta holgada de manga larga · 3400','Prenda de manga larga de otoño · 3394','Camisa estampada de manga larga · 3384'],
 fr:['Manteau femme','Chaussures femme · 10315','Robe à bretelles','Haut ample à manches longues · 3400','Haut à manches longues d’automne · 3394','Chemise imprimée à manches longues · 3384'],
 it:['Cappotto da donna','Scarpe da donna · 10315','Abito con spalline','Maglia ampia a maniche lunghe · 3400','Maglia autunnale a maniche lunghe · 3394','Camicia stampata a maniche lunghe · 3384']
};
const copy:Record<Locale,string[]>={
 en:['Matched product links','Reference prices checked 17 October 2026. Open each listing to confirm options, current price and availability.','View product and photos','Original item ID'],
 de:['Passende Produktlinks','Referenzpreise vom 17. Oktober 2026. Prüfe aktuelle Optionen, Preise und Verfügbarkeit in jedem Angebot.','Produkt und Bilder ansehen','Ursprüngliche Artikel-ID'],
 es:['Enlaces de productos asociados','Precios de referencia del 17 de octubre de 2026. Abre cada ficha para confirmar opciones, precio actual y disponibilidad.','Ver producto y fotos','ID original del artículo'],
 fr:['Liens produits associés','Prix indicatifs vérifiés le 17 octobre 2026. Ouvrez chaque fiche pour confirmer les options, le prix actuel et la disponibilité.','Voir le produit et ses photos','Identifiant produit d’origine'],
 it:['Link ai prodotti abbinati','Prezzi di riferimento del 17 ottobre 2026. Apri ogni scheda per verificare opzioni, prezzo attuale e disponibilità.','Vedi prodotto e foto','ID originale del prodotto']
};
export function ArticleFinds({slug,locale}:{slug:string;locale:Locale}){
 const indexes=slug==='lolobuy-women-spreadsheet-finds'?[0,1,2]:slug==='lolobuy-long-sleeve-finds'?[3,4,5]:[];
 if(!indexes.length)return null;
 const t=copy[locale];
 return <section className="article-finds" aria-labelledby="matched-finds"><h2 id="matched-finds">{t[0]}</h2><p>{t[1]}</p><div className="article-finds-grid">{indexes.map(i=>{const p=finds[i];return <Link key={p.path} href={localizedPath(locale,'/catalog'+p.path)} className="article-find-card" data-track-event="product_detail_click"><img src={p.images[0]} alt={names[locale][i]} width={320} height={320} loading="lazy"/><strong>{names[locale][i]}</strong><span>{Number(p.price).toLocaleString(locale,{style:'currency',currency:'USD',currencyDisplay:'code'})}</span><small>{t[3]}: {p.sourceId}</small><span>{t[2]} →</span></Link>})}</div></section>
}
