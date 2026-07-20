import Link from "next/link";

export default function PageHero({ eyebrow, title, intro, crumbs = [], noTranslate = false }) {
  return (
    <section className="page-hero" data-no-translate={noTranslate ? "" : undefined}>
      <div className="wrap">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span>/</span>
          {crumbs.map((item, index) => <span key={`${item}-${index}`}>{item}{index < crumbs.length - 1 ? " /" : ""}</span>)}
        </nav>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{intro}</p>
      </div>
    </section>
  );
}
