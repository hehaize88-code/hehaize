import Link from "next/link";
import { LanguageModule } from "./language-module";
import {
  catalogBase,
  primaryNavigation,
  type NavigationKey,
} from "./site-data";
import { localizeReactNode } from "./i18n";
import type { Locale } from "./translations";

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

export function SiteHeader({
  active,
  locale = "en",
}: {
  active?: NavigationKey;
  locale?: Locale;
}) {
  return localizeReactNode(
    <header className="site-header">
      <Link className="brand" href="/" aria-label="LoloBuy Sheet home">
        <img
          className="brand-logo"
          src="/lolobuy.png"
          alt="LoloBuy Sheet"
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
        <LanguageModule locale={locale} />
        <a
          className="header-find"
          href={`${catalogBase}/AllProducts/`}
          target="_blank"
          rel="sponsored noopener noreferrer"
        >
          Browse finds <ArrowIcon />
        </a>
      </div>
    </header>,
    locale,
  );
}

export function SiteFooter({ locale = "en" }: { locale?: Locale }) {
  return localizeReactNode(
    <footer>
      <div className="footer-brand">
        <Link className="brand" href="/" aria-label="LoloBuy Sheet home">
          <img
            className="brand-logo"
            src="/lolobuy.png"
            alt="LoloBuy Sheet"
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
        <Link href="/articles">Buying Guides</Link>
      </div>
      <div>
        <p className="footer-label">EDITORIAL</p>
        <Link href="/about">About</Link>
        <Link href="/editorial-policy">Editorial policy</Link>
        <Link href="/research-method">Research method</Link>
        <Link href="/contact">Contact</Link>
      </div>
      <div>
        <p className="footer-label">LEGAL</p>
        <Link href="/privacy-policy">Privacy policy</Link>
        <Link href="/terms">Terms of use</Link>
        <Link href="/independent-disclosure">Independent disclosure</Link>
      </div>
      <p className="footer-disclaimer">
        This independent publication is not LoloBuy and is not endorsed by
        LoloBuy or any product brand. Product, category and search links promote
        the associated catalog at cnbuycha.com, so the operator may benefit
        commercially from visits or purchases. Verify every live listing before
        ordering.
      </p>
      <p className="copyright">
        © 2026 LoloBuy Sheet · Catalog reviewed 29 July 2026
      </p>
    </footer>,
    locale,
  );
}
