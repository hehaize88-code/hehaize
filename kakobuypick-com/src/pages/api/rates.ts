import type { APIRoute } from 'astro';
import snapshot from '../../lib/fx-snapshot.json';

const hour = 3600000;
const week = 168 * hour;
let current = snapshot;
let lastCheck = 0;
let pending: Promise<void> | undefined;

async function refresh() {
  const response = await fetch('https://open.er-api.com/v6/latest/USD', {
    signal: AbortSignal.timeout(5000)
  });
  if (!response.ok) return;
  const feed = await response.json();
  const updated = Number(feed.time_last_update_unix) * 1000;
  if (feed.result !== 'success' || feed.base_code !== 'USD' || feed.rates?.USD !== 1
    || !Number.isFinite(updated) || updated < current.updated || updated > Date.now()+hour
    || Object.keys(snapshot.rates).some(c => !Number.isFinite(feed.rates[c]) || feed.rates[c] <= 0)) return;
  current = {updated, rates: Object.fromEntries(Object.keys(snapshot.rates).map(c => [c, feed.rates[c]])) as typeof snapshot.rates};
}

export const GET: APIRoute = async () => {
  const now = Date.now();
  if (now - current.updated > 24 * hour && now - lastCheck > hour) {
    lastCheck = now;
    pending = refresh().catch(() => {}).finally(() => { pending = undefined; });
  }
  if (pending) await pending;
  if (now - current.updated > week)
    return Response.json({error: 'rates_unavailable'}, { status: 503, headers: {'Cache-Control': 'no-store'} });
  return Response.json({base: 'USD', source: 'ExchangeRate-API', ...current}, {
    headers: {'Cache-Control': 'public,max-age=3600'}
  });
};
