import { Vector3 } from "three";
import { culturalLayout, culturalGate } from "./cultural-layout";
export type JourneyState = {
  progress: number;
  time: number;
  invalidate?: () => void;
  prepare?: (progress: number) => void;
};
export const journey: JourneyState = { progress: 0, time: 0 };
type Stop = {
  t: number;
  position: number[];
  target: number[];
  velocity?: number[];
  targetVelocity?: number[];
};
function createCameraStops(mobile: boolean): Stop[] {
  const gates = Object.fromEntries(
    (["gateway", "penjor", "foliage", "jepun"] as const).map((symbol) => [
      symbol,
      culturalGate(culturalLayout(symbol, mobile)),
    ]),
  ) as Record<
    "gateway" | "penjor" | "foliage" | "jepun",
    ReturnType<typeof culturalGate>
  >;
  const gateStop = (
    t: number,
    symbol: keyof typeof gates,
    distance: number,
    speed?: number,
  ): Stop => {
    const { point, normal } = gates[symbol];
    return {
      t,
      velocity:
        speed === undefined
          ? undefined
          : normal.clone().multiplyScalar(-speed).toArray(),
      targetVelocity: speed === undefined ? undefined : [0, 0, 0],
      position: point.clone().addScaledVector(normal, distance).toArray(),
      target: point.clone().addScaledVector(normal, -8).toArray(),
    };
  };
  return [
    { t: 0, position: [0, 1, 13], target: [0, 0, 0] },
    { t: 0.11, position: [1, 0.7, 9], target: [2, 0, 0] },
    { t: 0.2, position: [-1, 2, 1], target: gates.gateway.point.toArray() },
    gateStop(0.29, "gateway", 4.5),
    gateStop(0.325, "gateway", 0.8, 2 / 0.015),
    gateStop(0.34, "gateway", -1.2, 2 / 0.015),
    gateStop(0.37, "penjor", 0.8, 80),
    gateStop(0.395, "penjor", -1.2, 80),
    { t: 0.445, position: [0, 12, -23], target: [0, 0, -26] },
    { t: 0.47, position: [0, 14, -25.9], target: [0, 0, -26] },
    gateStop(0.54, "foliage", 12),
    gateStop(0.625, "foliage", 0.8, 80),
    gateStop(0.65, "foliage", -1.2, 80),
    gateStop(0.705, "jepun", 0.8, 80),
    gateStop(0.73, "jepun", -1.2, 80),
    { t: 0.81, position: [0, 1, -55], target: [0, 0, -65] },
    { t: 0.91, position: [0, 1, -56], target: [0, 0, -65] },
    { t: 1, position: [0, 1, -57], target: [0, 0, -65] },
  ];
}
export const cameraStops = createCameraStops(false);
export const mobileCameraStops = createCameraStops(true);
// Monotone Hermite tangents preserve each composition without the old stop/start
// at every keyframe. Physical passages explicitly share straight-through velocity.
function tangents(stops: Stop[], field: "position" | "target") {
  return stops.map((stop, i) => {
    const explicit = field === "position" ? stop.velocity : stop.targetVelocity;
    if (explicit) return explicit;
    return [0, 1, 2].map((axis) => {
      if (!i || i === stops.length - 1) return 0;
      const previous = stops[i - 1],
        next = stops[i + 1];
      const h0 = stop.t - previous.t,
        h1 = next.t - stop.t;
      const a = (stop[field][axis] - previous[field][axis]) / h0;
      const b = (next[field][axis] - stop[field][axis]) / h1;
      if (a * b <= 0) return 0;
      const w0 = 2 * h1 + h0,
        w1 = h1 + 2 * h0;
      return (w0 + w1) / (w0 / a + w1 / b);
    });
  });
}
const tracks = [cameraStops, mobileCameraStops].map((stops) => ({
  stops,
  positions: tangents(stops, "position"),
  targets: tangents(stops, "target"),
}));
export function sampleCamera(
  p: number,
  position: Vector3,
  target: Vector3,
  mobile = false,
) {
  p = Math.min(1, Math.max(0, p));
  const { stops, positions, targets } = tracks[mobile ? 1 : 0];
  const i = Math.max(
    0,
    stops.findIndex(
      (s, j) => j < stops.length - 1 && p >= s.t && p <= stops[j + 1].t,
    ),
  );
  const a = stops[i],
    b = stops[i + 1],
    span = b.t - a.t;
  const t = (p - a.t) / span,
    t2 = t * t,
    t3 = t2 * t;
  const interpolate = (
    field: "position" | "target",
    velocities: number[][],
    result: Vector3,
  ) => {
    for (let axis = 0; axis < 3; axis++) {
      result.setComponent(
        axis,
        (2 * t3 - 3 * t2 + 1) * a[field][axis] +
          (t3 - 2 * t2 + t) * span * velocities[i][axis] +
          (-2 * t3 + 3 * t2) * b[field][axis] +
          (t3 - t2) * span * velocities[i + 1][axis],
      );
    }
  };
  interpolate("position", positions, position);
  interpolate("target", targets, target);
}
