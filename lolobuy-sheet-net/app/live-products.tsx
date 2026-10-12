"use client";
import {useEffect,useState} from "react";
import {localizedPath} from "./i18n";
import type {Locale} from "./translations";
import initial from "../commerce/home-products.json";
const labels={en:['Latest','Popular','Price: low to high','View all products'],es:['Novedades','Populares','Precio ascendente','Ver todos los productos'],de:['Neueste','Beliebt','Preis aufsteigend','Alle Produkte ansehen'],fr:['Nouveautés','Populaires','Prix croissant','Voir tous les produits'],it:['Novità','Popolari','Prezzo crescente','Vedi tutti i prodotti']};
export default function LiveProducts({locale}:{locale:Locale}){
 const [products,setProducts]=useState(initial),[sort,setSort]=useState('new');const t=labels[locale];
 useEffect(()=>{const c=new AbortController();fetch('/api/catalog?sort='+sort,{signal:c.signal}).then(r=>{if(!r.ok)throw Error();return r.json()}).then(d=>{if(d.products?.length)setProducts(d.products.slice(0,4))}).catch(()=>{});return()=>c.abort()},[sort]);
 return <div className="curated-card live-products"><div className="curated-toolbar"><h2>LoloBuy finds</h2><div className="filter-tabs">{['new','click','price'].map((s,i)=><button key={s} className={s===sort?'is-active':''} onClick={()=>setSort(s)} aria-pressed={s===sort}>{t[i]}</button>)}</div></div><div className="live-product-grid">{products.map(p=><article key={p.path}><a href={localizedPath(locale,'/catalog'+p.path)}><img src={p.image} alt={p.title} width="300" height="300"/><h3>{p.title}</h3><strong>${Number(p.price).toFixed(2)} <small>USD</small></strong></a></article>)}</div><a className="card-footer-link" href={localizedPath(locale,'/catalog/')}>{t[3]} →</a></div>;
}
