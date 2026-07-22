import Link from "next/link";
import { MAIN_SITE } from "@/data/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-intro">
          <Link href="/" className="brand brand-invert">
            <img className="brand-logo" src="/brand/hubbuy.png" alt="Hubbuy" width="963" height="133" loading="lazy" decoding="async" />
          </Link>
          <p>A compact, independent guide for comparing China shopping finds before opening the live catalog.</p>
        </div>
        <div className="footer-col">
          <strong>Explore</strong>
          <Link href="/products">Products</Link>
          <Link href="/guides/how-to-buy">How to buy</Link>
          <Link href="/guides/qc-checks">QC guide</Link>
          <Link href="/guides/shipping">Shipping guide</Link>
          <Link href="/articles">Articles</Link>
        </div>
        <div className="footer-col">
          <strong>Site</strong>
          <Link href="/faq">FAQ</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/about#cnbuy-relationship">Relationship disclosure</Link>
          <Link href="/legal/privacy">Privacy</Link>
          <Link href="/legal/terms">Terms</Link>
        </div>
        <div className="footer-col">
          <strong>Categories</strong>
          <Link href="/categories/shoes/">Shoes</Link>
          <Link href="/categories/hoodies/">Hoodies</Link>
          <Link href="/categories/electronics/">Electronics</Link>
          <a href={`${MAIN_SITE}/AllProducts/`} target="_blank" rel="noopener">Live catalog ↗</a>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <p>© 2026 Hubbuy Sheet. Editorial discovery guide for CNBuy Sheet.</p>
        <p>Independent from Hubbuy and not an official Hubbuy website. Product cards, search forms, category-page catalog buttons and Live Catalog links lead to CNBuy Sheet at cnbuycha.com, in which this website has a commercial interest. Transactions occur on the destination site; verify live details before ordering.</p>
      </div>
    </footer>
  );
}
