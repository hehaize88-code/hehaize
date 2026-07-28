import Link from "next/link";
import { LanguageModule } from "./language-module";
import {
  catalogBase,
  primaryNavigation,
  type NavigationKey,
} from "./site-data";

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

export function SiteHeader({ active }: { active?: NavigationKey }) {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="LoloBuy Sheet home">
        <img
          className="brand-logo"
          src="/lolobuy.png"
          alt="LoloBuy"
          width="128"
          height="30"
        />
      </Link>
      <nav aria-label="Primary navigation">
        {primaryNavigation.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            aria-current={active === item.key ? "page" : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="header-tools">
        <LanguageModule />
        <a
          className="header-find"
          href={`${catalogBase}/AllProducts/`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Browse finds <ArrowIcon />
        </a>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <div className="footer-brand">
        <Link className="brand" href="/" aria-label="LoloBuy Sheet home">
          <img
            className="brand-logo"
            src="/lolobuy.png"
            alt="LoloBuy"
            width="128"
            height="30"
          />
        </Link>
        <p>
          Independent product discovery, QC notes and shipping context for
          people researching how to use LoloBuy.
        </p>
      </div>
      <div>
        <p className="footer-label">EXPLORE</p>
        <Link href="/products">Product finds</Link>
        <Link href="/categories">Categories</Link>
        <Link href="/qc-guide">QC guide</Link>
        <Link href="/faq">FAQ</Link>
      </div>
      <div>
        <p className="footer-label">PLAN</p>
        <Link href="/how-it-works">Buying flow</Link>
        <Link href="/shipping">Shipping</Link>
        <Link href="/articles">SEO Articles</Link>
      </div>
      <p className="footer-disclaimer">
        This is an independent informational website and is not LoloBuy or an
        official LoloBuy service. Product information can change. Always review
        the current item page and applicable platform terms before ordering.
      </p>
      <p className="copyright">
        © 2026 LoloBuy Sheet · Catalog reviewed 27 July 2026
      </p>
    </footer>
  );
}
