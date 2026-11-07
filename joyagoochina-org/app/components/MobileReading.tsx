"use client";

import { useEffect } from "react";

export default function MobileReading() {
  useEffect(() => {
    if (document.querySelector('script[data-mobile-reading]')) return;
    const script = document.createElement("script");
    script.src = "/mobile-reading.js?v=20261107";
    script.dataset.mobileReading = "true";
    document.body.append(script);
  }, []);
  return null;
}
