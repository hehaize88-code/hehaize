"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Open without JavaScript and on desktop; compact by default on phones. */
export function MobileDisclosure({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  const details = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 680px)");
    const sync = () => { if (details.current) details.current.open = !media.matches; };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  return <details ref={details} open className={`mobile-disclosure ${className}`}>
    <summary>{title}</summary>
    <div className="mobile-disclosure-content">{children}</div>
  </details>;
}
