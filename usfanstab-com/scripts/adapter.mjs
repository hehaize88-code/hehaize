export default function workerAdapter() {
  return { name: 'usfans-fetch-worker', hooks: {
    'astro:config:done': ({ setAdapter }) => setAdapter({
      name: 'usfans-fetch-worker', entrypointResolution: 'auto',
      serverEntrypoint: new URL('./entry.mjs', import.meta.url),
      supportedAstroFeatures: { serverOutput: 'stable', staticOutput: 'unsupported', hybridOutput: 'stable' }
    })
  }};
}


