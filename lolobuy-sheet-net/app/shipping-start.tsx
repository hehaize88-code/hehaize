import Link from 'next/link';
import {localizedPath} from './i18n';
import {searchRevisions} from './search-improvements';
import type {Locale} from './translations';
const labels:Record<Locale,string[]>={en:['Start your shipping estimate','Compare costs using the same parcel','Check weight calculations','Check coupon conditions','Track an order or parcel'],de:['Versandschätzung vorbereiten','Kosten für dasselbe Paket vergleichen','Gewichtsrechnung prüfen','Gutscheinbedingungen prüfen','Bestellung oder Paket verfolgen'],es:['Preparar la estimación de envío','Comparar costes del mismo paquete','Comprobar el cálculo del peso','Revisar las condiciones del cupón','Seguir un pedido o paquete'],fr:['Préparer votre estimation de livraison','Comparer les frais pour le même colis','Vérifier le calcul du poids','Vérifier les conditions du coupon','Suivre une commande ou un colis'],it:['Preparare la stima di spedizione','Confrontare i costi dello stesso pacco','Verificare il calcolo del peso','Controllare le condizioni del coupon','Seguire un ordine o un pacco']};
export function ShippingStart({locale}:{locale:Locale}){
 const t=labels[locale],copy=searchRevisions[locale]['lolobuy-shipping-cost-guide'];
 return <section className="section-shell shipping-start" data-i18n-ignore><p className="eyebrow">{t[0]}</p><h2>{t[1]}</h2><p>{copy.standfirst}</p><ul>{copy.section.bullets.map(x=><li key={x}>{x}</li>)}</ul><nav aria-label={t[0]}>{['lolobuy-shipping-calculator-guide','lolobuy-coupons-guide','lolobuy-order-tracking-guide'].map((slug,i)=><Link key={slug} href={localizedPath(locale,'/articles/'+slug)} data-track-event="article_internal_click">{t[i+2]} →</Link>)}</nav></section>
}
