"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Locale } from "../translations";

export const mobileCopy: Record<Locale, string[]> = {
  en: ["Expand all sections", "Collapse sections", "Show more", "Show fewer"],
  es: ["Abrir todas las secciones", "Cerrar las secciones", "Mostrar más", "Mostrar menos"],
  de: ["Alle Abschnitte öffnen", "Abschnitte schließen", "Mehr anzeigen", "Weniger anzeigen"],
  fr: ["Tout développer", "Replier les sections", "Afficher plus", "Afficher moins"],
  it: ["Apri tutte le sezioni", "Chiudi le sezioni", "Mostra altro", "Mostra meno"],
};

export function MobileReadingTools({ locale }: { locale: Locale }) {
  const copy = mobileCopy[locale];
  return <div className="mobile-reading-tools">
    <button type="button" onClick={() => window.dispatchEvent(new CustomEvent("lolo-reading", { detail: true }))}>{copy[0]}</button>
    <button type="button" onClick={() => window.dispatchEvent(new CustomEvent("lolo-reading", { detail: false }))}>{copy[1]}</button>
  </div>;
}

export function MobileChapter({ title, children, contents = false }: { title: string; children: ReactNode; contents?: boolean }) {
  // Full content is rendered open on the server and without JavaScript.
  const [open, setOpen] = useState(true);
  const [mobile, setMobile] = useState(false);
  const element = useRef<HTMLDetailsElement>(null);
  const printState = useRef(true);
  useEffect(() => {
    const media = matchMedia("(max-width: 680px)");
    const hashTarget = () => {
      let id; try { id = decodeURIComponent(location.hash.slice(1)); } catch { return false; }
      const target = id && document.getElementById(id);
      return !!target && (target === element.current?.parentElement || !!element.current?.contains(target));
    };
    const sync = () => { setMobile(media.matches); setOpen(!media.matches || hashTarget()); };
    const hash = () => { if (hashTarget()) { setOpen(true); requestAnimationFrame(() => element.current?.parentElement?.scrollIntoView({ block: "start" })); } };
    const expand = (event: Event) => { if (media.matches) setOpen((event as CustomEvent<boolean>).detail); };
    const beforePrint = () => { printState.current = element.current?.open ?? true; setOpen(true); };
    const afterPrint = () => setOpen(printState.current);
    sync(); media.addEventListener("change", sync);
    window.addEventListener("hashchange", hash); window.addEventListener("lolo-reading", expand);
    window.addEventListener("beforeprint", beforePrint); window.addEventListener("afterprint", afterPrint);
    return () => {
      media.removeEventListener("change", sync); window.removeEventListener("hashchange", hash); window.removeEventListener("lolo-reading", expand);
      window.removeEventListener("beforeprint", beforePrint); window.removeEventListener("afterprint", afterPrint);
    };
  }, [contents]);
  return <details ref={element} open={open} className={contents ? "mobile-contents" : "mobile-chapter"} onToggle={event => { if (mobile) setOpen(event.currentTarget.open); }}>
    <summary onClick={event => { if (!mobile) event.preventDefault(); }}>
      {contents ? <span>{title}</span> : <h2>{title}</h2>}
    </summary>
    <div className="mobile-chapter-content">{children}</div>
  </details>;
}
