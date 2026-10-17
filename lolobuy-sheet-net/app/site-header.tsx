"use client";
import {useEffect,useRef} from 'react';
import {nav} from '../commerce/chrome.mjs';
import {localizedPath} from './i18n';
import type {Locale} from './translations';
export default function Header({locale='en',path='/'}:{locale?:Locale;path?:string}){
 const ref=useRef<HTMLDivElement>(null);
 useEffect(()=>{const path=location.pathname+location.search+location.hash;ref.current?.querySelectorAll<HTMLAnchorElement>('[data-locale-target]').forEach(a=>{a.href=localizedPath(a.dataset.localeTarget as Locale,path)});},[locale,path]);
 return <div ref={ref} dangerouslySetInnerHTML={{__html:nav(locale,path)}}/>;
}
