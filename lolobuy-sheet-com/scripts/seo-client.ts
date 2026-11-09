import {parcelWeight} from '../app/parcel-weight.mjs';
import {installAnalyticsTracker} from '../app/components/analytics-tracker';

// Pages serves the editorial HTML without React hydration. Enhance the
// server-rendered form directly and share event tracking with hydrated routes.
installAnalyticsTracker();
document.addEventListener('submit', (event) => {
 const form=event.target;
 if(!(form instanceof HTMLFormElement)) return;
 const section=form.closest<HTMLElement>('[data-parcel-copy]');
 if(!section) return;
 event.preventDefault();
 const copy=JSON.parse(section.dataset.parcelCopy!);
 const status=section.querySelector<HTMLElement>('[role="status"]')!;
 const data=new FormData(form);
 const result=parcelWeight(Object.fromEntries([...data].map(([key,value])=>[key,key==='mode'?String(value):Number(value)])) as Parameters<typeof parcelWeight>[0]);
 status.replaceChildren();
 if(!result){status.textContent=copy.invalid;return;}
 const list=document.createElement('dl');
 [result.actual,result.dimensional,result.billable].forEach((value,index)=>{
  const row=document.createElement('div');
  const label=document.createElement('dt'); label.textContent=copy.results[index];
  const amount=document.createElement('dd');amount.textContent=new Intl.NumberFormat(copy.locale,{maximumFractionDigits:3}).format(value)+' kg';
  row.append(label,amount);list.append(row);
 });
 status.append(list);
 window.gtag?.('event','shipping_calculator_use',{page_path:location.pathname,language:copy.locale});
});
document.addEventListener('input',(event)=>{
 const target=event.target;
 if(!(target instanceof Element))return;
 const section=target.closest<HTMLElement>('[data-parcel-copy]');
 if(section)section.querySelector<HTMLElement>('[role="status"]')!.textContent=JSON.parse(section.dataset.parcelCopy!).empty;
});
