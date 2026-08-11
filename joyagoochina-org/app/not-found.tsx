import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The requested Joyagoo China page does not exist. Browse the product directory, guides, articles or FAQ.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main className="not-found-page">
      <SiteHeader locale="en" />
      <section className="not-found-content">
        <p className="eyebrow">404 · PAGE NOT FOUND</p>
        <h1>This page does not exist.</h1>
        <p>
          The address may be mistyped or the page may have moved. Continue with
          a real product, guide, article or answer below.
        </p>
        <nav aria-label="Helpful destinations">
          <Link className="button" href="/">
            Home
          </Link>
          <Link className="button secondary" href="/spreadsheet/">
            Product directory
          </Link>
          <Link className="button secondary" href="/articles/">
            Buying research
          </Link>
          <Link className="button secondary" href="/faq/">
            FAQ
          </Link>
        </nav>
      </section>
      <SiteFooter locale="en" />
    </main>
  );
}
