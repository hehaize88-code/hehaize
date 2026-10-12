"use client";
import { useEffect, useRef } from "react";
import { nav } from "../../commerce/chrome.mjs";
import { localizedPath, type Locale } from "../i18n";
export default function SiteHeader({locale="en",languageFallbackPath}:{locale?:Locale;languageFallbackPath?:string}) {
 const ref=useRef<HTMLDivElement>(null);
 useEffect(()=>{document.documentElement.lang=locale;const path=languageFallbackPath||location.pathname+location.search+location.hash;
 ref.current?.querySelectorAll<HTMLAnchorElement>("[data-locale-target]").forEach(a=>{a.href=localizedPath(path,a.dataset.localeTarget as Locale)});
 },[locale,languageFallbackPath]);
 return <div ref={ref} dangerouslySetInnerHTML={{__html:nav(locale,languageFallbackPath||"/","",null)}}/>;
}
