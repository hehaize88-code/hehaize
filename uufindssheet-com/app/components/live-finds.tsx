"use client";
import { useEffect, useState } from "react";
import { initialProducts } from "../catalog-snapshot";
type Product = { path:string; title:string; image:string; price:string };
export function LiveFinds({locale='en'}:{locale?:string}) {
 const [products,setProducts]=useState<Product[]>(initialProducts);
 const prefix=locale==='en'?'':`/${locale}`;
 useEffect(()=>{const controller=new AbortController();fetch('/api/catalog',{signal:controller.signal}).then(r=>r.ok?r.json():null).then(data=>{if(data?.products?.length)setProducts(data.products.slice(0,4))}).catch(()=>{});return()=>controller.abort()},[]);
 return <div className="seo-live-grid">{products.slice(0,4).map(p=><a className="seo-live-card" href={`${prefix}/catalog${p.path}`} key={p.path}><img src={p.image.startsWith('https:')?p.image:`https://cnbuycha.com${p.image}`} alt={p.title} width={400} height={400}/><div><h2>{p.title}</h2><strong>${Number(p.price).toFixed(2)} <small>USD</small></strong><span>QC ↗</span></div></a>)}</div>;
}
