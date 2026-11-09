// The legacy database helper is optional; this site does not configure a D1 binding.
declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
  }
}
