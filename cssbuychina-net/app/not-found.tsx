import { InnerShell } from "./components/InnerShell";

export default function NotFound() {
  return (
    <InnerShell>
      <section className="not-found-page">
        <span>404 / INDEX MISS</span>
        <h1>This find moved—or never existed.</h1>
        <p>Use the product index or search the live catalog instead of landing on a disguised copy of the homepage.</p>
        <div><a href="/products">Browse checked finds</a><a href="https://www.cnbuycha.com/AllProducts/" rel="nofollow">Open full catalog ↗</a></div>
      </section>
    </InnerShell>
  );
}
