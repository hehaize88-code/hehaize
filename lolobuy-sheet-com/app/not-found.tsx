import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "./components/site-footer";
import SiteHeader from "./components/site-header";

export const metadata: Metadata = {
  title: { absolute: "Page Not Found | Lolobuy Sheet" },
  description:
    "This Lolobuy Sheet page is unavailable. Browse the current product directory, category guides and research articles instead.",
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Page Not Found | Lolobuy Sheet",
    description:
      "The requested page is unavailable. Browse current product research and guides instead.",
    siteName: "Lolobuy Sheet",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Page Not Found | Lolobuy Sheet",
    description:
      "The requested page is unavailable. Browse current product research and guides instead.",
  },
};

export default function NotFound() {
  return (
    <>
      <title>Page Not Found | Lolobuy Sheet</title>
      <meta
        name="description"
        content="This Lolobuy Sheet page is unavailable. Browse the current product directory, category guides and research articles instead."
      />
      <meta name="robots" content="noindex, follow" />
      <main>
        <SiteHeader />
        <section className="not-found">
          <p className="eyebrow">404 / PAGE NOT FOUND</p>
          <h1>This route is no longer on the sheet.</h1>
          <p>
            The page may have moved, or the address may be incomplete. Return
            to the directory or browse the current guides.
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
    </>
  );
}
