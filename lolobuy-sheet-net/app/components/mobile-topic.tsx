import { Children, Fragment, isValidElement, type ReactElement, type ReactNode } from "react";
import { MobileChapter } from "./mobile-reading";
import type { Locale } from "../translations";

export const detailLabels: Record<Locale, string> = {
  en: "Article details", es: "Datos del artículo", de: "Artikeldetails",
  fr: "Détails de l’article", it: "Dettagli dell’articolo",
};

export function MobileTopic({ title, children }: { title: string; children: ReactNode }) {
  return <div className="mobile-topic"><MobileChapter title={title} contents>{children}</MobileChapter></div>;
}

function headingText(node: ReactNode): string {
  for (const child of Children.toArray(node)) {
    if (!isValidElement(child)) continue;
    const element = child as ReactElement<{children?: ReactNode}>;
    if (element.type === "h2") return Children.toArray(element.props.children).filter(x => typeof x === "string" || typeof x === "number").join("");
    if (typeof element.type === "string" || element.type === Fragment) {
      const heading = headingText(element.props.children);
      if (heading) return heading;
    }
  }
  return "";
}

// Keep the complete supporting sections rendered, with a short mobile entry point.
export function compactMobileSections(node: ReactNode): ReactNode {
  return Children.map(node, child => {
    if (!isValidElement(child)) return child;
    const element = child as ReactElement<{children?: ReactNode; className?: string}>;
    if (element.type === Fragment) return <Fragment key={element.key}>{compactMobileSections(element.props.children)}</Fragment>;
    if (element.type === "section" && /(?:research-fact-band|decision-section|calculation-section)/.test(element.props.className || "")) {
      const title = headingText(element.props.children);
      if (title) return <MobileTopic title={title} key={element.key}>{element}</MobileTopic>;
    }
    return child;
  });
}
