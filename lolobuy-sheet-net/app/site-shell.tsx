import Header from './site-header';
import {footer} from '../commerce/chrome.mjs';
import type {Locale} from './translations';
import type {NavigationKey} from './site-data';
export function SiteHeader({locale='en'}:{locale?:Locale;active?:NavigationKey}){return <Header locale={locale}/>;}
export function SiteFooter({locale='en'}:{locale?:Locale}){return <div dangerouslySetInnerHTML={{__html:footer(locale)}}/>;}
