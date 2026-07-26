import Link from "next/link";
import SiteFooter from "./components/site-footer";
import SiteHeader from "./components/site-header";

export default function NotFound() {
  return (
    <main>
      <SiteHeader />
      <section className="not-found">
        <p className="eyebrow">404 / PAGE NOT FOUND</p>
        <h1>This route is no longer on the sheet.</h1>
        <p>
          The page may have moved, or the address may be incomplete. Return to
          the directory or browse the current guides.
        </p>
        <div>
          <Link className="button button-primary" href="/">
            Return home
          </Link>
          <Link className="button button-secondary" href="/categories">
            Browse categories
          </Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
