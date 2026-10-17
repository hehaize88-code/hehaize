export default function workerAdapter() {
  return { name: 'kakobuy-fetch-worker', hooks: {
    'astro:config:done': ({ setAdapter }) => setAdapter({
      name: 'kakobuy-fetch-worker', entrypointResolution: 'auto',
      serverEntrypoint: new URL('./entry.mjs', import.meta.url),
      supportedAstroFeatures: { serverOutput: 'stable', staticOutput: 'unsupported', hybridOutput: 'stable' }
    })
  }};
}
