import applicationWorker from "./application.js";

const localizedLocales = new Set(["es", "de", "fr", "it"]);
const allLocales = new Set(["en", ...localizedLocales]);

function pathLocale(pathname) {
  const segment = pathname.split("/")[1]?.toLowerCase();
  return allLocales.has(segment) ? segment : null;
}

function withoutLocalePrefix(pathname) {
  const locale = pathLocale(pathname);
  if (!locale) {
    return pathname || "/";
  }

  const stripped = pathname.slice(locale.length + 1);
  return stripped ? (stripped.startsWith("/") ? stripped : `/${stripped}`) : "/";
}

function localizedPathname(pathname, locale) {
  const cleanPathname = withoutLocalePrefix(pathname);
  if (locale === "en") {
    return cleanPathname;
  }
  return cleanPathname === "/" ? `/${locale}/` : `/${locale}${cleanPathname}`;
}

function canonicalRedirect(request, url) {
  const requestedLocale = url.searchParams.get("lang")?.toLowerCase();
  const prefixedLocale = pathLocale(url.pathname);

  if (
    request.method !== "GET" &&
    request.method !== "HEAD"
  ) {
    return null;
  }

  if (requestedLocale && allLocales.has(requestedLocale)) {
    const destination = new URL(url);
    destination.pathname = localizedPathname(url.pathname, requestedLocale);
    destination.searchParams.delete("lang");
    return Response.redirect(destination, 301);
  }

  if (prefixedLocale === "en") {
    const destination = new URL(url);
    destination.pathname = withoutLocalePrefix(url.pathname);
    destination.searchParams.delete("lang");
    return Response.redirect(destination, 301);
  }

  return null;
}

function applicationRequest(request, url, locale) {
  if (!localizedLocales.has(locale)) {
    return request;
  }

  const internalUrl = new URL(url);
  internalUrl.pathname = withoutLocalePrefix(url.pathname);
  internalUrl.searchParams.set("lang", locale);
  return new Request(internalUrl, request);
}

async function localizeResponse(response, locale) {
  const headers = new Headers(response.headers);
  headers.set("Content-Language", locale);

  const contentType = headers.get("content-type") || "";
  if (!contentType.includes("text/html")) {
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  }

  const body = await response.text();
  headers.delete("content-length");
  headers.delete("content-encoding");
  headers.delete("etag");

  return new Response(
    body.replace(/<html lang="[^"]*"/i, `<html lang="${locale}"`),
    {
      status: response.status,
      statusText: response.statusText,
      headers,
    },
  );
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const redirect = canonicalRedirect(request, url);
    if (redirect) {
      return redirect;
    }

    const locale = pathLocale(url.pathname);
    const activeLocale = localizedLocales.has(locale) ? locale : "en";
    const response = await applicationWorker.fetch(
      applicationRequest(request, url, activeLocale),
      env,
      ctx,
    );
    return localizeResponse(response, activeLocale);
  },
};
