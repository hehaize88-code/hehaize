import Link from "next/link";

type Crumb = {
  label: string;
  href?: string;
};

export default function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  crumbs: Crumb[];
}) {
  return (
    <section className="page-hero">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        {crumbs.map((crumb, index) => (
          <span key={`${crumb.label}-${index}`}>
            {crumb.href ? <Link href={crumb.href}>{crumb.label}</Link> : crumb.label}
            {index < crumbs.length - 1 ? <b aria-hidden="true">/</b> : null}
          </span>
        ))}
      </nav>
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="page-intro">{intro}</p>
    </section>
  );
}
