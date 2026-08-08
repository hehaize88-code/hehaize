function prefixedPath(prefix: string, path: string) {
  return path === "/" ? `/${prefix}/` : `/${prefix}${path}`;
}

export function localizedAlternates(path: string) {
  return {
    canonical: path,
    languages: {
      "x-default": path,
      en: path,
      "en-GB": prefixedPath("en-gb", path),
      "de-DE": prefixedPath("de", path),
      "pl-PL": prefixedPath("pl", path),
      "pt-BR": prefixedPath("pt-br", path),
    },
  };
}
