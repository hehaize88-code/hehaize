import Header from './site-header';
import {footer} from '../commerce/chrome.mjs';
import type {Locale} from './translations';
import type {NavigationKey} from './site-data';
export function SiteHeader({locale='en',path='/'}:{locale?:Locale;active?:NavigationKey;path?:string}){return <Header locale={locale} path={path}/>;}
export function SiteFooter({locale='en'}:{locale?:Locale}){return <div dangerouslySetInnerHTML={{__html:footer(locale)}}/>;}
