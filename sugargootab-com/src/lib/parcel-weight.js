// Divisor and billing rule belong to the chosen carrier route, not to this site.
export function parcelWeight({actual, length, width, height, divisor, rule}) {
  if (![actual, length, width, height, divisor].every(v => Number.isFinite(v) && v > 0)) return null;
  if (!['higher', 'actual'].includes(rule)) return null;
  const volumetric = length * width * height / divisor;
  const billing = rule === 'actual' ? actual : Math.max(actual, volumetric);
  if (!Number.isFinite(volumetric) || !Number.isFinite(billing)) return null;
  return {volumetric, billing};
}
