export default function workerAdapter() {
  return { name: 'oopbuy-fetch-worker', hooks: {
    'astro:config:done': ({ setAdapter }) => setAdapter({
      name: 'oopbuy-fetch-worker', entrypointResolution: 'auto',
      serverEntrypoint: new URL('./entry.mjs', import.meta.url),
      supportedAstroFeatures: { serverOutput: 'stable', staticOutput: 'unsupported', hybridOutput: 'stable' }
    })
  }};
}
