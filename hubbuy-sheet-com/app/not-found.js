import Link from "next/link";

export default function NotFound() {
  return <section className="not-found"><div><span>404</span><h1>That link is not on this sheet.</h1><p>Return to the current shortlist or use the live product search from the homepage.</p><Link href="/">Back to homepage →</Link></div></section>;
}
