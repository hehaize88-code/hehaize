'use client';
import {useState, type FormEvent} from 'react';
import type {Locale} from '../i18n';
import {parcelWeight} from '../parcel-weight.mjs';
const copy={
 en:{title:'Parcel weight calculator',intro:'Use the divisor and rounding increment in your selected route. This is a weight illustration, not a live freight quote.',fields:['Packed weight (kg)','Length (cm)','Width (cm)','Height (cm)','Route divisor (cm³/kg)','Billing increment (kg; 0 = no rounding)'],mode:'Weight rule',volume:'Higher of actual and volumetric',actual:'Actual weight only',button:'Calculate weight',invalid:'Enter positive weight, dimensions and divisor. The billing increment must be zero or greater.',results:['Actual weight','Volumetric weight','Illustrative billable weight'],note:'Minimum charges, route restrictions, extra fees and taxes are not calculated. Final route terms and the live quote control.',official:'Check the official shipping quote',empty:'Enter your parcel measurements to compare weight.'},
 fr:{title:'Calculateur de poids du colis',intro:'Utilisez le diviseur et le palier de votre route. Illustration de poids, pas un devis de fret en direct.',fields:['Poids emballé (kg)','Longueur (cm)','Largeur (cm)','Hauteur (cm)','Diviseur de la route (cm³/kg)','Palier (kg ; 0 = sans arrondi)'],mode:'Règle de poids',volume:'Maximum du poids réel et volumétrique',actual:'Poids réel uniquement',button:'Calculer le poids',invalid:'Saisissez poids, dimensions et diviseur positifs. Le palier doit être nul ou positif.',results:['Poids réel','Poids volumétrique','Poids facturable illustratif'],note:'Minimums, restrictions, suppléments et taxes non calculés. Les conditions actuelles et le devis final font référence.',official:'Vérifier le devis officiel',empty:'Saisissez les mesures du colis pour comparer les poids.'},
 de:{title:'Paketgewichtsrechner',intro:'Verwende Divisor und Abrechnungsschritt deiner Route. Gewichtsbeispiel, kein aktuelles Frachtangebot.',fields:['Gepacktes Gewicht (kg)','Länge (cm)','Breite (cm)','Höhe (cm)','Routendivisor (cm³/kg)','Abrechnungsschritt (kg; 0 = ohne Rundung)'],mode:'Gewichtsregel',volume:'Höherer Wert aus tatsächlichem und Volumengewicht',actual:'Nur tatsächliches Gewicht',button:'Gewicht berechnen',invalid:'Positive Werte für Gewicht, Maße und Divisor eingeben. Der Abrechnungsschritt darf nicht negativ sein.',results:['Tatsächliches Gewicht','Volumengewicht','Beispielhaftes Abrechnungsgewicht'],note:'Mindestkosten, Einschränkungen, Zuschläge und Steuern werden nicht berechnet. Aktuelle Routenbedingungen und Endangebot gelten.',official:'Offizielles Versandangebot prüfen',empty:'Paketmaße eingeben, um das Gewicht zu vergleichen.'},
 es:{title:'Calculadora de peso del paquete',intro:'Utiliza divisor e incremento de tu ruta. Ilustración del peso, no una tarifa de transporte en directo.',fields:['Peso embalado (kg)','Largo (cm)','Ancho (cm)','Alto (cm)','Divisor de la ruta (cm³/kg)','Incremento (kg; 0 = sin redondeo)'],mode:'Regla de peso',volume:'Mayor entre peso real y volumétrico',actual:'Solo peso real',button:'Calcular peso',invalid:'Introduce peso, dimensiones y divisor positivos. El incremento debe ser cero o mayor.',results:['Peso real','Peso volumétrico','Peso facturable ilustrativo'],note:'No calcula mínimos, restricciones, suplementos ni impuestos. Rigen las condiciones actuales y el presupuesto final.',official:'Consultar el presupuesto oficial',empty:'Introduce las medidas para comparar el peso.'},
 it:{title:'Calcolatore del peso del pacco',intro:'Usa divisore e incremento della tua rotta. Esempio di peso, non un preventivo di trasporto aggiornato.',fields:['Peso imballato (kg)','Lunghezza (cm)','Larghezza (cm)','Altezza (cm)','Divisore della rotta (cm³/kg)','Incremento (kg; 0 = senza arrotondamento)'],mode:'Regola del peso',volume:'Maggiore tra peso reale e volumetrico',actual:'Solo peso reale',button:'Calcola il peso',invalid:'Inserisci peso, misure e divisore positivi. L’incremento deve essere zero o maggiore.',results:['Peso reale','Peso volumetrico','Peso fatturabile illustrativo'],note:'Non calcola minimi, restrizioni, supplementi o imposte. Valgono condizioni attuali e preventivo finale.',official:'Controlla il preventivo ufficiale',empty:'Inserisci le misure per confrontare il peso.'}
};
const names=['weight','length','width','height','divisor','increment'];
export default function ParcelWeightCalculator({locale}:{locale:Locale}){
 const t=copy[locale];
 const [result,setResult]=useState<ReturnType<typeof parcelWeight>>(null);
 const [error,setError]=useState(false);
 function calculate(event:FormEvent<HTMLFormElement>){
  event.preventDefault();const data=new FormData(event.currentTarget);
  const output=parcelWeight(Object.fromEntries([...data].map(([k,v])=>[k,k==='mode'?String(v):Number(v)])) as Parameters<typeof parcelWeight>[0]);
  setResult(output);setError(!output);
  if(output)window.gtag?.('event','shipping_calculator_use',{page_path:location.pathname,language:locale});
 }
 return <section className="parcel-calculator" aria-labelledby="parcel-calculator-title">
  <h2 id="parcel-calculator-title">{t.title}</h2><p>{t.intro}</p>
  <form onSubmit={calculate} onChange={()=>{setResult(null);setError(false);}}>
   <div className="parcel-calculator-fields">{names.map((name,i)=><label key={name}>{t.fields[i]}<input name={name} type="number" inputMode="decimal" step="any" min={i===5?'0':'0.000001'} defaultValue={i===5?'0':undefined} required /></label>)}</div>
   <label>{t.mode}<select name="mode"><option value="volumetric">{t.volume}</option><option value="actual">{t.actual}</option></select></label>
   <button type="submit" className="button button-primary">{t.button}</button>
  </form>
  <div role="status" aria-live="polite">{error?<p>{t.invalid}</p>:result?<dl>{[result.actual,result.dimensional,result.billable].map((v,i)=><div key={i}><dt>{t.results[i]}</dt><dd>{new Intl.NumberFormat(locale,{maximumFractionDigits:3}).format(v)} kg</dd></div>)}</dl>:<p>{t.empty}</p>}</div>
  <p>{t.note}</p><a href="https://www.lolobuy.com/estimate" target="_blank" rel="noopener noreferrer" data-track-event="shipping_estimator_click">{t.official} ↗</a>
 </section>;
}
