import Link from "next/link";
import { SiteImage } from "./site-image";

const footerCopy = {
  en: {
    text: "Independent educational guide. Not affiliated with, endorsed by, or operated by UUFinds. Registration and product links open on UUFinds.",
    link: "Browse product finds →",
    policy: ["About", "Contact", "Editorial Policy", "Privacy", "Terms"],
  },
  "en-gb": {
    text: "Independent educational guide. Not affiliated with, endorsed by, or operated by UUFinds. Registration and product links open on UUFinds.",
    link: "Browse product finds →",
    policy: ["About", "Contact", "Editorial Policy", "Privacy", "Terms"],
  },
  de: {
    text: "Unabhängiger Bildungsratgeber. Nicht mit UUFinds verbunden, von UUFinds empfohlen oder betrieben. Registrierung und Produktlinks öffnen UUFinds.",
    link: "Produktfunde ansehen →",
    policy: ["Über uns", "Kontakt", "Redaktionsrichtlinie", "Datenschutz", "Bedingungen"],
  },
  pl: {
    text: "Niezależny przewodnik edukacyjny. Strona nie jest powiązana z UUFinds, wspierana ani prowadzona przez UUFinds. Rejestracja i linki produktów otwierają UUFinds.",
    link: "Zobacz znalezione produkty →",
    policy: ["O stronie", "Kontakt", "Polityka redakcyjna", "Prywatność", "Warunki"],
  },
  "pt-br": {
    text: "Guia educacional independente. Não é afiliado, endossado nem operado pelo UUFinds. Cadastro e links de produtos abrem no UUFinds.",
    link: "Ver produtos encontrados →",
    policy: ["Sobre", "Contato", "Política editorial", "Privacidade", "Termos"],
  },
} as const;

type FooterLocale = keyof typeof footerCopy;

export function SiteFooter({ locale = "en" }: { locale?: FooterLocale }) {
  const copy = footerCopy[locale];
  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <footer>
      <div className="footer-brand">
        <SiteImage className="footer-logo" src="/uufinds-official-logo.png" alt="UUFinds" width={1144} height={284} />
      </div>
      <p>{copy.text}</p>
      <nav className="footer-links" aria-label="Trust and policy links">
        <Link href={`${prefix}/about/`}>{copy.policy[0]}</Link>
        <Link href={`${prefix}/contact/`}>{copy.policy[1]}</Link>
        <Link href={`${prefix}/editorial-policy/`}>{copy.policy[2]}</Link>
        <Link href={`${prefix}/privacy/`}>{copy.policy[3]}</Link>
        <Link href={`${prefix}/terms/`}>{copy.policy[4]}</Link>
      </nav>
      <Link className="footer-shop-link" href={`${prefix}/products/`}>{copy.link}</Link>
    </footer>
  );
}
