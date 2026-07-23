function prefixedPath(prefix: string, path: string) {
  return path === "/" ? `/${prefix}/` : `/${prefix}${path}`;
}

export function localizedAlternates(path: string) {
  return {
    canonical: path,
    languages: {
      "x-default": path,
      "en-US": path,
      "en-GB": prefixedPath("en-gb", path),
      de: prefixedPath("de", path),
      pl: prefixedPath("pl", path),
      "pt-BR": prefixedPath("pt-br", path),
    },
  };
}
