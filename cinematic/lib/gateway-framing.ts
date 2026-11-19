import bounds from "./sculpture-bounds.json";
import gateway from "./gateway-model.json";
import { smootherstep } from "./motion";

/** A level, frontal view of the complete gateway. */
export function fitGateway(aspect: number, fill = 0.84) {
  const { min, max } = bounds.gateway;
  const center = min.map((v, i) => (v + max[i]) / 2) as [
    number,
    number,
    number,
  ];
  const size = max.map((v, i) => v - min[i]);
  const fov = 38;
  const tangent = Math.tan((fov * Math.PI) / 360);
  const distance =
    size[2] / 2 +
    Math.max(
      size[1] / (2 * tangent * fill),
      size[0] / (2 * tangent * Math.max(0.15, aspect) * fill),
    );
  return { center, fov, distance };
}

/** One mobile entrance: approach the real split, pass through it, reveal food.
 * The last frame stays filled; there is no disappearing-model/empty-stage exit.
 */
export function sampleMobileGateway(progress: number, aspect: number) {
  const p = Math.max(0, Math.min(1, progress));
  const fit = fitGateway(aspect);
  const travel = smootherstep((p - 0.06) / 0.94);
  const align = smootherstep((p - 0.05) / 0.35);
  const y = fit.center[1] + (gateway.gate[1] - fit.center[1]) * align;
  const z = fit.center[2] + fit.distance;
  const position: [number, number, number] = [0, y, z + (-0.65 - z) * travel];
  const target: [number, number, number] = [0, y, position[2] - 2];
  return {
    position,
    target,
    photoOpacity: smootherstep((p - 0.48) / 0.42),
    introOpacity: 1 - smootherstep(p / 0.08),
  };
}
