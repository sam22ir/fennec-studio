/**
 * Returns the index of the tab that a keyboard key should move to in a
 * horizontal tablist, or null when the key is not a navigation key.
 * In RTL the visual order is mirrored, so Left/Right swap meaning.
 */
export function nextTabIndex(key: string, current: number, count: number, rtl: boolean): number | null {
  const forward = rtl ? "ArrowLeft" : "ArrowRight";
  const backward = rtl ? "ArrowRight" : "ArrowLeft";
  if (key === forward) return (current + 1) % count;
  if (key === backward) return (current - 1 + count) % count;
  if (key === "Home") return 0;
  if (key === "End") return count - 1;
  return null;
}
