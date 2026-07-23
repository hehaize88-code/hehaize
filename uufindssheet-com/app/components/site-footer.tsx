import Image from "next/image";
import Link from "next/link";

const footerCopy = {
  en: {
    text: "Independent educational guide. Not affiliated with, endorsed by, or operated by UUFinds. All outbound shopping links lead only to CNBuy Sheet.",
    link: "Browse product finds →",
  },
  "en-gb": {
    text: "Independent educational guide. Not affiliated with, endorsed by, or operated by UUFinds. All outbound shopping links lead only to CNBuy Sheet.",
    link: "Browse product finds →",
  },
  de: {
    text: "Unabhängiger Bildungsratgeber. Nicht mit UUFinds verbunden, von UUFinds empfohlen oder betrieben. Alle externen Shopping-Links führen ausschließlich zu CNBuy Sheet.",
    link: "Produktfunde ansehen →",
  },
  pl: {
    text: "Niezależny przewodnik edukacyjny. Strona nie jest powiązana z UUFinds, wspierana ani prowadzona przez UUFinds. Wszystkie zewnętrzne linki zakupowe prowadzą wyłącznie do CNBuy Sheet.",
    link: "Zobacz znalezione produkty →",
  },
  "pt-br": {
    text: "Guia educacional independente. Não é afiliado, endossado nem operado pelo UUFinds. Todos os links externos de compras levam somente ao CNBuy Sheet.",
    link: "Ver produtos encontrados →",
  },
} as const;

type FooterLocale = keyof typeof footerCopy;

export function SiteFooter({ locale = "en" }: { locale?: FooterLocale }) {
  const copy = footerCopy[locale];
  const prefix = locale === "en" ? "" : `/${locale}`;

  return (
    <footer>
      <div className="footer-brand">
        <Image className="footer-logo" src="/uufinds-logo.png" alt="UUFinds" width={1144} height={284} unoptimized />
      </div>
      <p>{copy.text}</p>
      <Link href={`${prefix}/products/`}>{copy.link}</Link>
    </footer>
  );
}
