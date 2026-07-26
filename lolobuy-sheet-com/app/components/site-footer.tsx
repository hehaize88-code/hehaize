import Image from "next/image";
import Link from "next/link";
import {
  footerCopy,
  headerCopy,
  localizedPath,
  type Locale,
} from "../i18n";

const siteLabels = {
  en: ["About", "Contact", "Privacy", "Terms"],
  es: ["Acerca de", "Contacto", "Privacidad", "Términos"],
  de: ["Über uns", "Kontakt", "Datenschutz", "Bedingungen"],
  fr: ["À propos", "Contact", "Confidentialité", "Conditions"],
  it: ["Chi siamo", "Contatti", "Privacy", "Termini"],
} as const;

export default function SiteFooter({ locale = "en" }: { locale?: Locale }) {
  const copy = footerCopy[locale];
  const nav = headerCopy[locale];
  const guideLinks = [
    { label: nav.workflow, href: "/how-it-works" },
    { label: nav.qc, href: "/guides/qc" },
    { label: nav.shipping, href: "/guides/shipping" },
    { label: nav.faq, href: "/faq" },
  ];
  const siteLinks = [
    { label: siteLabels[locale][0], href: "/about" },
    { label: siteLabels[locale][1], href: "/contact" },
    { label: siteLabels[locale][2], href: "/privacy" },
    { label: siteLabels[locale][3], href: "/terms" },
  ];

  return (
    <footer className="site-footer">
      <div className="footer-lead">
        <Link
          className="wordmark footer-wordmark"
          href={localizedPath("/", locale)}
          aria-label="Lolobuy Sheet home"
        >
          <Image
            className="brand-logo footer-brand-logo"
            src="/lolobuy-logo.png"
            alt="LoloBuy"
            width={127}
            height={29}
            unoptimized
          />
        </Link>
        <p>{copy.lead}</p>
      </div>
      <div className="footer-column">
        <p>{copy.guides}</p>
        {guideLinks.map((item) => (
          <Link href={localizedPath(item.href, locale)} key={item.href}>
            {item.label}
          </Link>
        ))}
      </div>
      <div className="footer-column">
        <p>{copy.site}</p>
        {siteLinks.map((item) => (
          <Link href={localizedPath(item.href, locale)} key={item.href}>
            {item.label}
          </Link>
        ))}
      </div>
      <div className="footer-column footer-external">
        <p>{copy.directory}</p>
        <a
          href="https://www.cnbuycha.com/AllProducts/"
          target="_blank"
          rel="noopener"
        >
          {copy.directoryLink} ↗
        </a>
        <span>{copy.verify}</span>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Lolobuy Sheet</span>
        <span>{copy.imageNote}</span>
      </div>
    </footer>
  );
}
