import { defineConfig } from 'astro/config';
import workerAdapter from './scripts/adapter.mjs';
import { targets } from './site-targets.mjs';
export default defineConfig({site:process.env.SITE_URL||targets.production,output:'server',adapter:workerAdapter(),devToolbar:{enabled:false},build:{inlineStylesheets:'always'},image:{service:{entrypoint:'astro/assets/services/noop'}},server:{host:'0.0.0.0',port:4173,allowedHosts:['terminal.local']}});

