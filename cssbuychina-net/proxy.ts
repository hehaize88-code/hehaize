import { NextRequest, NextResponse } from "next/server";

const languageByPrefix: Record<string, string> = {
  "pt-br": "pt-BR",
  de: "de-DE",
  es: "es",
};

export function proxy(request: NextRequest) {
  const firstSegment = request.nextUrl.pathname.split("/").filter(Boolean)[0] ?? "";
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-site-language", languageByPrefix[firstSegment] ?? "en");
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.svg|cssbuy-logo.png|cssbuy-category-checks-article.webp).*)"],
};
