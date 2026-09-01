"use client";

import { useEffect } from "react";

type AnalyticsParams = Record<string, string | number>;

declare global {
  interface Window {
    gtag?: (command: "event", eventName: string, params: AnalyticsParams) => void;
  }
}

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

function sendGoogleAnalyticsEvent(eventName: string, params: AnalyticsParams) {
  window.gtag?.("event", eventName, params);
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

      if (element instanceof HTMLButtonElement && element.type === "submit" && element.form) {
        return;
      }

      const anchor = element instanceof HTMLAnchorElement ? element : element.closest("a");
      const trackedElement = element.closest<HTMLElement>("[data-track-event]");
      const destinationUrl = anchor?.href ? new URL(anchor.href, window.location.href) : null;
      const destination = anchor?.href
        ? safeDestination(anchor.href)
        : (element.getAttribute("type") || element.tagName.toLowerCase()).slice(0, 180);
      const isOutbound = destinationUrl?.hostname !== window.location.hostname;
      const isMainSite = destinationUrl?.hostname === "cnbuycha.com" || destinationUrl?.hostname === "www.cnbuycha.com";
      const eventName = trackedElement?.dataset.trackEvent
        || (isMainSite ? "main_site_click" : isOutbound ? "outbound_click" : "site_click");
      const label = (element.textContent || element.getAttribute("aria-label") || "unlabelled")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 100);
      const itemId = trackedElement?.dataset.itemId || "";
      const category = trackedElement?.dataset.category || "";
      const ctaPosition = trackedElement?.dataset.ctaPosition || "";
      const language = document.documentElement.lang || "en";

      sendEvent({
        event: eventName,
        page: window.location.pathname,
        destination,
        label,
        itemId,
        category,
        ctaPosition,
        language,
      });
      sendGoogleAnalyticsEvent(eventName, {
        page_path: window.location.pathname,
        destination,
        link_text: label,
        item_id: itemId,
        category,
        cta_position: ctaPosition,
        language,
      });
    };

    const trackSubmit = (event: SubmitEvent) => {
      const form = event.target instanceof HTMLFormElement ? event.target : null;
      if (!form) return;
      const eventName = form.dataset.trackEvent || "search_submit";
      const destination = safeDestination(form.action || window.location.href);
      const ctaPosition = form.dataset.ctaPosition || "";
      const language = document.documentElement.lang || "en";
      const label = form.getAttribute("aria-label") || "Main-site product search";

      sendEvent({
        event: eventName,
        page: window.location.pathname,
        destination,
        label,
        itemId: "",
        category: "",
        ctaPosition,
        language,
      });
      sendGoogleAnalyticsEvent(eventName, {
        page_path: window.location.pathname,
        destination,
        link_text: label,
        cta_position: ctaPosition,
        language,
      });
    };

    document.addEventListener("click", trackClick, { capture: true });
    document.addEventListener("submit", trackSubmit, { capture: true });
    return () => {
      document.removeEventListener("click", trackClick, { capture: true });
      document.removeEventListener("submit", trackSubmit, { capture: true });
    };
  }, []);

  return null;
}
