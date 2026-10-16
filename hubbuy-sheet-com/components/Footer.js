import Link from "next/link";
import { REGISTER_URL } from "@/data/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-intro">
          <Link href="/" className="brand brand-invert">
            <img className="brand-logo" src="/brand/hubbuy-official.svg" alt="Hubbuy" width="700" height="133" loading="lazy" fetchPriority="low" decoding="async" />
          </Link>
          <p>Hubbuy spreadsheet finds, product photos and practical buying guides.</p>
        </div>
        <div className="footer-col">
          <strong>Explore</strong>
          <a href="/catalog/">Products</a>
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
          <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer">Register on Hubbuy ↗</a>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <p>© 2026 Hubbuy Sheet. Independent editorial discovery guide.</p>
        <p>Independent from Hubbuy. Product data and photos come from CNBuy Sheet; registration and purchase links open the official Hubbuy website. Confirm the item, variant and total cost there.</p>
      </div>
    </footer>
  );
}
