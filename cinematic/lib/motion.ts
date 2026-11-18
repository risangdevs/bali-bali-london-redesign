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
/** Fade a photo before it fills the lens or moves behind the camera. */
export function photoFramingVisibility(
  depth: number,
  width: number,
  height: number,
  aspect: number,
  fov: number,
  facing = 1,
  centerX = 0,
  centerY = 0,
) {
  if (depth <= 0 || aspect <= 0) return 0;
  const viewHeight = 2 * depth * Math.tan((fov * Math.PI) / 360);
  const coverage = Math.max(width / (viewHeight * aspect), height / viewHeight);
  const edge = Math.max(
    Math.abs(centerX) + width / (viewHeight * aspect),
    Math.abs(centerY) + height / viewHeight,
  );
  return (
    (1 - smootherstep((coverage - 0.95) / 0.35)) *
    (1 - smootherstep((edge - 0.98) / 0.3)) *
    smootherstep((depth - 0.3) / 0.8) *
    smootherstep((facing - 0.02) / 0.18)
  );
}
/** Keep the sharing-table hero in view while the camera tilts above it. */
export function photoFitScale(
  depth: number,
  width: number,
  height: number,
  aspect: number,
  fov: number,
  centerX: number,
  centerY: number,
  maxWidth = 0.9,
  maxHeight = 0.9,
) {
  if (depth <= 0) return 0.02;
  const viewHeight = 2 * depth * Math.tan((fov * Math.PI) / 360);
  return Math.max(
    0.02,
    Math.min(
      1,
      (Math.max(0, Math.min(maxWidth, 0.9 - Math.abs(centerX))) *
        viewHeight *
        aspect) /
        width,
      (Math.max(0, Math.min(maxHeight, 0.9 - Math.abs(centerY))) * viewHeight) /
        height,
    ),
  );
}
