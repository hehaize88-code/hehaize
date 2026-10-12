import type { ReactNode } from 'react';
import type { SiteLocale } from '../i18n';
import { SiteHeader, SiteFooter } from './SiteChrome';

export function InnerShell({children,locale='en'}:{children:ReactNode;locale?:SiteLocale}) {
 return <div className="unified-inner"><SiteHeader locale={locale}/><main className="unified-main">{children}</main><SiteFooter locale={locale}/></div>;
}
