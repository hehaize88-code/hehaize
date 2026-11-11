"use client";
import { useEffect, useState } from "react";
import { initialProducts } from "../catalog-snapshot";
import {translateProductTitle} from "../../public/assets/product-title.mjs";
import glossaries from "../../public/assets/product-glossaries.json";
type Product = { path:string; title:string; image:string; price:string };
export function LiveFinds({locale='en'}:{locale?:string}) {
 const [products,setProducts]=useState<Product[]>(initialProducts);
 const prefix=locale==='en'?'':`/${locale}`;
 useEffect(()=>{const controller=new AbortController();fetch('/api/catalog',{signal:controller.signal}).then(r=>r.ok?r.json():null).then(data=>{if(data?.products?.length)setProducts(data.products.slice(0,4))}).catch(()=>{});return()=>controller.abort()},[]);
 return <div className="seo-live-grid">{products.slice(0,4).map(p=><a className="seo-live-card" href={`${prefix}/catalog${p.path}`} key={p.path}><img src={p.image.startsWith('https:')?p.image:`https://cnbuycha.com${p.image}`} alt={translateProductTitle(p.title,locale,glossaries)} width={400} height={400}/><div><h2>{translateProductTitle(p.title,locale,glossaries)}</h2><strong><span data-price-amount={p.price} data-price-currency="USD">${Number(p.price).toFixed(2)}</span> <small data-currency-code>USD</small></strong><span>QC ↗</span></div></a>)}</div>;
}
