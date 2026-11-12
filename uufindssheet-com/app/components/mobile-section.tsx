"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Complete server-rendered copy; one readable chapter at a time on phones. */
export function MobileSection({ title, children, first = false, group = "reading" }: {
  title: ReactNode; children: ReactNode; first?: boolean; group?: string;
}) {
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const media = matchMedia("(max-width: 680px)");
    const revealHash = () => {
      if (!location.hash || !ref.current) return;
      let id; try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
      const target = document.getElementById(id);
      if (target && (target.contains(ref.current) || ref.current.contains(target))) {
        ref.current.open = true;
        requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
      }
    };
    const sync = () => {
      if (!ref.current) return;
      if (media.matches) ref.current.setAttribute("name", `mobile-${group}`);
      else ref.current.removeAttribute("name");
      const summary = ref.current.querySelector("summary");
      if (summary) summary.tabIndex = media.matches ? 0 : -1;
      ref.current.open = !media.matches || (first && window.innerHeight >= 780);
      revealHash();
    };
    sync();
    media.addEventListener("change", sync);
    window.addEventListener("hashchange", revealHash);
    return () => {
      media.removeEventListener("change", sync);
      window.removeEventListener("hashchange", revealHash);
    };
  }, [first, group]);
  return <details ref={ref} open className="mobile-section">
    <summary>{title}<span className="mobile-section-icon" aria-hidden="true">+</span></summary>
    <div className="mobile-section-body">{children}</div>
  </details>;
}
