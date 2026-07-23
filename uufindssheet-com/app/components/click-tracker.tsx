"use client";

import { useEffect } from "react";

function sendEvent(payload: Record<string, string>) {
  const body = JSON.stringify(payload);
  if (navigator.sendBeacon) {
    navigator.sendBeacon("/__track", new Blob([body], { type: "application/json" }));
    return;
  }
  void fetch("/__track", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body,
    keepalive: true,
  });
}

function safeDestination(rawHref: string) {
  try {
    const url = new URL(rawHref, window.location.href);
    return `${url.hostname}${url.pathname}`.slice(0, 180);
  } catch {
    return rawHref.split("?")[0].slice(0, 180);
  }
}

export function ClickTracker() {
  useEffect(() => {
    sendEvent({ event: "page_view", page: window.location.pathname });

    const trackClick = (event: MouseEvent) => {
      const element = (event.target as Element | null)?.closest("a, button");
      if (!element) return;

      const anchor = element instanceof HTMLAnchorElement ? element : element.closest("a");
      const destination = anchor?.href
        ? safeDestination(anchor.href)
        : (element.getAttribute("type") || element.tagName.toLowerCase()).slice(0, 180);

      sendEvent({
        event: anchor && new URL(anchor.href, window.location.href).hostname !== window.location.hostname
          ? "outbound_click"
          : "site_click",
        page: window.location.pathname,
        destination,
        label: (element.textContent || element.getAttribute("aria-label") || "unlabelled")
          .replace(/\s+/g, " ")
          .trim()
          .slice(0, 100),
      });
    };

    document.addEventListener("click", trackClick, { capture: true });
    return () => document.removeEventListener("click", trackClick, { capture: true });
  }, []);

  return null;
}
