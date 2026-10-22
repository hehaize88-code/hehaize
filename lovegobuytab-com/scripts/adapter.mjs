export default function workerAdapter() {
  return {
    name: "lovegobuy-fetch-worker",
    hooks: {
      "astro:config:done": ({ setAdapter }) =>
        setAdapter({
          name: "lovegobuy-fetch-worker",
          entrypointResolution: "auto",
          serverEntrypoint: new URL("./entry.mjs", import.meta.url),
          supportedAstroFeatures: {
            serverOutput: "stable",
            staticOutput: "unsupported",
            hybridOutput: "stable",
          },
        }),
    },
  };
}
