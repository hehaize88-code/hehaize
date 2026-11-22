// Localized static articles keep the server-rendered labels and units.
const worksheet = document.querySelector('.shipping-worksheet');
if (worksheet) {
  const inputs = [...worksheet.querySelectorAll('input')];
  const fields = [...worksheet.querySelectorAll('.worksheet-results strong')];
  const rule = worksheet.querySelector('select');
  if (fields.length === 3 && inputs.length === 8 && rule) {
    const units = fields[0].textContent.replace(/^[\d.,\s]+/, '');
    const pending = fields[2].textContent;
    const number = new Intl.NumberFormat(document.documentElement.lang, {maximumFractionDigits: 3});
    const price = new Intl.NumberFormat(document.documentElement.lang, {style: 'currency', currency: 'USD'});
    const update = () => {
      const [weight,length,width,height,divisor,rounding,freight,extras] = inputs.map(i=>Number(i.value));
      const valid = inputs.every((n,i)=>n.validity.valid && (i>=6 || n.valueAsNumber>0));
      const volume = length*width*height/divisor;
      const base = rule.value==='actual' ? weight : Math.max(weight,volume);
      const billed = Math.ceil(Number((base/rounding).toPrecision(12)))*rounding;
      fields[0].textContent = valid ? number.format(volume)+' '+units : '—';
      fields[1].textContent = valid ? number.format(billed)+' '+units : '—';
      fields[2].textContent = valid && inputs[6].value.trim() ? price.format(freight+extras) : pending;
    };
    worksheet.addEventListener('input',update);
    worksheet.addEventListener('change',update);
  }
}
