import type { SiteLocale } from '../i18n';
import { LanguageSwitcher } from './LanguageSwitcher';
import { chromeCopy, siteNavigation, footerNavigation, REGISTER_URL } from '../../shared/site-chrome';

export function SiteHeader({locale='en'}:{locale?:SiteLocale}) {
 const t=chromeCopy[locale];
 return <header className="unified-header">
  <a className="unified-brand" href={locale==='en'?'/':`/${locale}`} aria-label={t.home}><img src="https://assets.cssbuy.com/static/icon/logo.svg" alt="CSSBuy" width={138} height={42}/></a>
  <nav aria-label="Navigation">{siteNavigation(locale).map(([label,href])=><a key={href} href={href}>{label}</a>)}</nav>
  <div className="unified-actions"><LanguageSwitcher locale={locale}/><a className="unified-register" href={REGISTER_URL} target="_blank" rel="noopener noreferrer" data-track-event="register_click">{t.register} ↗</a></div>
 </header>;
}
export function SiteFooter({locale='en'}:{locale?:SiteLocale}) {
 return <footer className="unified-footer"><div><p>{chromeCopy[locale].independent}</p><nav aria-label="Footer">{footerNavigation(locale).map(([label,href])=><a key={href} href={href}>{label}</a>)}</nav><small>© 2026 cssbuychina.net</small></div></footer>;
}
