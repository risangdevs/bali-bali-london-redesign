import { smootherstep } from "./motion";
export type SculptureName = "gateway" | "penjor" | "foliage" | "jepun";
export type SculptureBounds = { min: number[]; max: number[] };
type Point = [number, number, number];
export const interludeOpacity = (p: number) =>
  1 - smootherstep((p - 0.69) / 0.13);
export function fitInterlude(bounds: SculptureBounds, aspect: number) {
  const center = bounds.min.map((v, i) => (v + bounds.max[i]) / 2) as Point;
  const size = bounds.max.map((v, i) => v - bounds.min[i]) as Point;
  const fov = 38,
    tangent = Math.tan((fov * Math.PI) / 360);
  const distance =
    size[2] / 2 +
    Math.max(
      size[1] / (2 * tangent * 0.76),
      size[0] / (2 * tangent * Math.max(0.15, aspect) * 0.76),
    );
  return { center, size, fov, distance };
}
/** Hold the complete silhouette, approach gently, then fade before frame edges.
 * The final camera passage follows the model's measured natural opening.
 */
export function sampleInterlude(
  bounds: SculptureBounds,
  gate: number[],
  aspect: number,
  progress: number,
) {
  const { center, fov, distance } = fitInterlude(bounds, aspect);
  const approach = smootherstep((progress - 0.56) / 0.26);
  let position: Point = [
    center[0],
    center[1],
    center[2] + distance * (1 - 0.08 * approach),
  ];
  let target: Point = [center[0], center[1], center[2] - 2];
  const lerp = (a: Point, b: Point, t: number) =>
    a.map((v, i) => v + (b[i] - v) * t) as Point;
  const align = smootherstep((progress - 0.82) / 0.08),
    passage = smootherstep((progress - 0.9) / 0.1);
  position = lerp(position, [gate[0], gate[1], 0.8], align);
  target = lerp(target, [gate[0], gate[1], -2], align);
  position = lerp(position, [gate[0], gate[1], -0.65], passage);
  return { position, target, fov, opacity: interludeOpacity(progress) };
}
