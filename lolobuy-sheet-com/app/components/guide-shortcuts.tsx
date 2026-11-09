import Link from "next/link";
import { localizedPath, type Locale } from "../i18n";

const copy: Record<Locale, {title: string; labels: string[]}> = {
  en: {title: "LoloBuy buying guides", labels: ["Use the spreadsheet", "Shipping to France", "Estimate shipping costs", "Submit a package", "Shipping time", "Shipping to Germany", "Reduce parcel costs"]},
  fr: {title: "Guides d’achat LoloBuy", labels: ["Utiliser le spreadsheet", "Livraison en France", "Calculer les frais d’envoi", "Soumettre un colis", "Délais de livraison", "Livraison en Allemagne", "Réduire les frais"]},
  de: {title: "LoloBuy Einkaufsratgeber", labels: ["Spreadsheet verwenden", "Versand nach Frankreich", "Versandkosten schätzen", "Paket einreichen", "Lieferzeit", "Versand nach Deutschland", "Paketkosten senken"]},
  es: {title: "Guías de compra LoloBuy", labels: ["Usar el spreadsheet", "Envíos a Francia", "Estimar gastos de envío", "Enviar una solicitud de paquete", "Plazos de entrega", "Envíos a Alemania", "Reducir gastos"]},
  it: {title: "Guide agli acquisti LoloBuy", labels: ["Usare lo spreadsheet", "Spedire in Francia", "Stimare le spese di spedizione", "Inviare una richiesta di pacco", "Tempi di consegna", "Spedire in Germania", "Ridurre i costi"]},
};
const slugs = ["lolobuy-spreadsheet-guide", "lolobuy-shipping-france-guide", "lolobuy-shipping-calculator-guide", "lolobuy-submit-package-guide", "lolobuy-shipping-time-guide", "lolobuy-shipping-germany-guide", "lolobuy-reduce-shipping-cost-guide"];
export default function GuideShortcuts({locale}: {locale: Locale}) {
 const t = copy[locale];
 return <nav className="guide-shortcuts" aria-label={t.title}><strong>{t.title}</strong><div>{slugs.map((slug,index) => <Link key={slug} href={localizedPath(`/articles/${slug}`,locale)}>{t.labels[index]} <span aria-hidden="true">→</span></Link>)}</div></nav>;
}
