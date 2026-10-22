import { defineConfig } from "astro/config";
import adapter from "./scripts/adapter.mjs";
export default defineConfig({
  site:
    process.env.SITE_URL ||
    "https://lovegobuytab-preview.hehaize88.chatgpt.site",
  output: "server",
  adapter: adapter(),
  devToolbar: { enabled: false },
  build: { inlineStylesheets: "always" },
  image: { service: { entrypoint: "astro/assets/services/noop" } },
  server: { host: "0.0.0.0", port: 4173 },
  vite: {
    server: {
      allowedHosts: ["terminal.local"],
      watch: { ignored: ["**/src/content/**"] },
    },
  },
});
