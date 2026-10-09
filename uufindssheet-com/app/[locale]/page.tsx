import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {SeoHome,homeCopy,type HomeLocale} from '../components/seo-home';
const locales=['en-gb','de','pl','pt-br'] as const;
export function generateStaticParams(){return locales.map(locale=>({locale}));}
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const{locale}=await params;if(!locales.includes(locale as typeof locales[number]))notFound();const c=homeCopy[locale as HomeLocale];return{title:c.title,description:c.description,alternates:{canonical:`/${locale}/`,languages:{'x-default':'/',en:'/','en-GB':'/en-gb/','de-DE':'/de/','pl-PL':'/pl/','pt-BR':'/pt-br/'}},openGraph:{title:c.title,description:c.description,url:`https://uufindssheet.com/${locale}/`},twitter:{title:c.title,description:c.description}};}
export default async function LocalizedHome({params}:{params:Promise<{locale:string}>}){const{locale}=await params;if(!locales.includes(locale as typeof locales[number]))notFound();return <SeoHome locale={locale as HomeLocale}/>;}
