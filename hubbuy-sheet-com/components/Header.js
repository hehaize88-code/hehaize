import Link from "next/link";
import { preload } from "react-dom";
import { MAIN_SITE } from "@/data/site";
import { ArrowIcon } from "@/components/Icons";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const nav = [
  ["Products", "/products"],
  ["How to buy", "/guides/how-to-buy"],
  ["QC guide", "/guides/qc-checks"],
  ["Shipping", "/guides/shipping"],
  ["Articles", "/articles"],
  ["FAQ", "/faq"],
  ["Contact", "/contact"],
];

export default function Header() {
  preload("/brand/hubbuy.png", { as: "image", fetchPriority: "high" });

  return (
    <header className="site-header">
      <div className="announcement">
        <span>Hubbuy Sheet · Independent guide</span>
        <span className="announcement-dot" />
        <span>Not the official Hubbuy website</span>
      </div>
      <div className="nav-shell wrap">
        <Link href="/" className="brand" aria-label="Hubbuy Sheet home">
          <img className="brand-logo" src="/brand/hubbuy.png" alt="Hubbuy Sheet independent guide" width="963" height="133" loading="eager" fetchPriority="high" decoding="async" />
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <LanguageSwitcher />
        <a className="nav-cta" href={`${MAIN_SITE}/AllProducts/`} target="_blank" rel="noopener">
          Live catalog <ArrowIcon size={16} />
        </a>
        <details className="mobile-nav">
          <summary aria-label="Open menu"><span /><span /><span /></summary>
          <div className="mobile-nav-panel">
            {nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
            <a href={`${MAIN_SITE}/AllProducts/`} target="_blank" rel="noopener">Open live catalog</a>
          </div>
        </details>
      </div>
    </header>
  );
}
