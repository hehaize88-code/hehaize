'use client';
import {useEffect,useState} from 'react';
import {initialProducts} from '../catalog-snapshot';
import {localePrefix, type SiteLocale} from '../i18n';
export function LiveFinds({locale}:{locale:SiteLocale}) {
 const [products,setProducts]=useState(initialProducts.slice(0,4));
 useEffect(()=>{const controller=new AbortController();fetch('/api/catalog',{signal:controller.signal}).then(r=>{if(!r.ok)throw Error();return r.json()}).then(data=>{if(data.products?.length)setProducts(data.products.slice(0,4))}).catch(()=>{});return()=>controller.abort()},[]);
 return <div className="seo-products">{products.map(p=><a key={p.path} className="seo-product" href={`${localePrefix(locale)}/catalog${p.path}`}><img src={p.image.startsWith('https:')?p.image:'https://cnbuycha.com'+p.image} alt={p.title} width={400} height={400} loading="eager"/><div><h2>{p.title}</h2><strong>${Number(p.price).toFixed(2)} <small>USD</small></strong><span>QC ↗</span></div></a>)}</div>;
}
