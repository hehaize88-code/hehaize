// Illustrative weight comparison only; route rates and billing rules are external.
export function compareWeights({actual,length,width,height,divisor}) {
  const values=[actual,length,width,height,divisor];
  if(values.some(value=>!Number.isFinite(value)||value<=0||value>1000000))return null;
  const volumetric=length*width*height/divisor;
  return {volumetric,chargeable:Math.max(actual,volumetric)};
}
export function installWeightCalculators(doc) {
  doc.querySelectorAll('[data-weight-calculator]').forEach(tool=>{
    const form=tool.querySelector('form');
    const format=new Intl.NumberFormat(tool.dataset.language,{maximumFractionDigits:3});
    function update(event){
      event?.preventDefault();
      const input=Object.fromEntries(['actual','length','width','height','divisor'].map(name=>[name,Number(form.elements.namedItem(name).value)]));
      const result=compareWeights(input);
      tool.querySelector('.weight-error').hidden=!!result;
      tool.querySelector('.weight-results').hidden=!result;
      if(!result)return;
      tool.querySelector('[data-volumetric]').textContent=`${format.format(result.volumetric)} kg`;
      tool.querySelector('[data-chargeable]').textContent=`${format.format(result.chargeable)} kg`;
    }
    form.addEventListener('submit',update);
    form.addEventListener('input',()=>{tool.querySelector('.weight-results').hidden=true;});
    update();
  });
}
