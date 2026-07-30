import type { ReactNode } from "react";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

type PolicyPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
};

export default function PolicyPage({
  eyebrow,
  title,
  intro,
  children,
}: PolicyPageProps) {
  return (
    <main className="policy-page">
      <SiteHeader />
      <article className="policy-content">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="policy-intro">{intro}</p>
        <div className="policy-copy">{children}</div>
      </article>
      <SiteFooter />
    </main>
  );
}
