import {footer} from "../../commerce/chrome.mjs";
import {type Locale} from "../i18n";
export default function SiteFooter({locale="en"}:{locale?:Locale}){return <div dangerouslySetInnerHTML={{__html:footer(locale)}}/>;}
