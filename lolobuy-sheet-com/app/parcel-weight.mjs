export function parcelWeight({weight,length,width,height,divisor,increment=0,mode='volumetric'}) {
 const values=[weight,length,width,height,divisor].map(Number);
 if(values.some(n=>!Number.isFinite(n)||n<=0)||!Number.isFinite(Number(increment))||Number(increment)<0) return null;
 const [actual,l,w,h,d]=values;
 const dimensional=l*w*h/d;
 const base=mode==='actual'?actual:Math.max(actual,dimensional);
 const step=Number(increment);
 const billable=step>0?Math.ceil((base-1e-10)/step)*step:base;
 if(!Number.isFinite(dimensional)||!Number.isFinite(billable)) return null;
 return {actual,dimensional,billable};
}
