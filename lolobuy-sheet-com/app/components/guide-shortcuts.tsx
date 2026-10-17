import Link from "next/link";
import { localizedPath, type Locale } from "../i18n";

const copy: Record<Locale, {title: string; labels: string[]}> = {
  en: {title: "LoloBuy buying guides", labels: ["Use the spreadsheet", "Shipping to France", "Estimate shipping costs", "Submit a package"]},
  fr: {title: "Guides d’achat LoloBuy", labels: ["Utiliser le spreadsheet", "Livraison en France", "Calculer les frais d’envoi", "Soumettre un colis"]},
  de: {title: "LoloBuy Einkaufsratgeber", labels: ["Spreadsheet verwenden", "Versand nach Frankreich", "Versandkosten schätzen", "Paket einreichen"]},
  es: {title: "Guías de compra LoloBuy", labels: ["Usar el spreadsheet", "Envíos a Francia", "Estimar gastos de envío", "Enviar una solicitud de paquete"]},
  it: {title: "Guide agli acquisti LoloBuy", labels: ["Usare lo spreadsheet", "Spedire in Francia", "Stimare le spese di spedizione", "Inviare una richiesta di pacco"]},
};
const slugs = ["lolobuy-spreadsheet-guide", "lolobuy-shipping-france-guide", "lolobuy-shipping-calculator-guide", "lolobuy-submit-package-guide"];
export default function GuideShortcuts({locale}: {locale: Locale}) {
 const t = copy[locale];
 return <nav className="guide-shortcuts" aria-label={t.title}><strong>{t.title}</strong><div>{slugs.map((slug,index) => <Link key={slug} href={localizedPath(`/articles/${slug}`,locale)}>{t.labels[index]} <span aria-hidden="true">→</span></Link>)}</div></nav>;
}
