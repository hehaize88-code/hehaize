import type { Locale } from "../i18n";
import { footer } from "../../commerce/catalog.js";

export default function SiteFooter({ locale = "en" }: { locale?: Locale }) {
  return <div className="site-footer-shell" dangerouslySetInnerHTML={{ __html: footer(locale) }} />;
}
