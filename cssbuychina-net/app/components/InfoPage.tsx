import { InnerShell } from "./InnerShell";

export function InfoPage({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: React.ReactNode }) {
  return (
    <InnerShell>
      <section className="inner-hero text-hero">
        <p className="eyebrow"><span /> {eyebrow}</p>
        <h1>{title}</h1>
        <p>{intro}</p>
      </section>
      <article className="prose-wrap">{children}</article>
    </InnerShell>
  );
}
