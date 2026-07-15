/** Delay (ms) for the Nth item (0-indexed) in a staggered grid/list, capped so long lists don't feel sluggish. */
export function staggerDelay(index: number, step = 90, max = 600) {
  return Math.min(index * step, max);
}
