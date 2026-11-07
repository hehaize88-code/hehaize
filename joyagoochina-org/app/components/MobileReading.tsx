"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function MobileReading() {
  const pathname = usePathname();
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/mobile-reading.js?v=20261107-2";
    script.dataset.mobileReading = "true";
    document.body.appendChild(script);
    return () => { script.remove(); };
  }, [pathname]);
  return null;
}
