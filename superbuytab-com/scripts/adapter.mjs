export default function workerAdapter() {
  return { name: 'superbuy-fetch-worker', hooks: {
    'astro:config:done': ({ setAdapter }) => setAdapter({
      name: 'superbuy-fetch-worker', entrypointResolution: 'auto',
      serverEntrypoint: new URL('./entry.mjs', import.meta.url),
      supportedAstroFeatures: { serverOutput: 'stable', staticOutput: 'unsupported', hybridOutput: 'stable' }
    })
  }};
}

