"use client";
import { useEffect, useRef } from "react";
import { nav } from "../../commerce/chrome.mjs";
import { localizedPath, type Locale } from "../i18n";
export default function SiteHeader({locale="en",path="/"}:{locale?:Locale;path?:string}) {
 const ref=useRef<HTMLDivElement>(null);
 useEffect(()=>{document.documentElement.lang=locale;const currentPath=location.pathname+location.search+location.hash;
 ref.current?.querySelectorAll<HTMLAnchorElement>("[data-locale-target]").forEach(a=>{a.href=localizedPath(currentPath,a.dataset.localeTarget as Locale)});
 },[locale,path]);
 return <div ref={ref} dangerouslySetInnerHTML={{__html:nav(locale,path,"",null)}}/>;
}
