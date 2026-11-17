/** Bounded, reversible timing curves shared by the camera, images and navigation. */
export function smootherstep(value: number) {
  const t = Math.max(0, Math.min(1, value));
  return t * t * t * (t * (t * 6 - 15) + 10);
}
export function navigationDuration(distance: number, viewport: number) {
  const screens = Math.abs(distance) / Math.max(1, viewport);
  return Math.min(3.6, 1.05 + screens * 0.42);
}
export function photoVisibility(progress: number, from: number, to: number) {
  return (
    smootherstep((progress - from) / 0.065) *
    (1 - smootherstep((progress - to + 0.065) / 0.065))
  );
}
