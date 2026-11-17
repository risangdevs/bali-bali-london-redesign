import { Vector3 } from "three";
import { culturalLayout, culturalGate } from "./cultural-layout";
export type JourneyState = {
  progress: number;
  time: number;
  invalidate?: () => void;
};
export const journey: JourneyState = { progress: 0, time: 0 };
type Stop = { t: number; position: number[]; target: number[] };
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
  ): Stop => {
    const { point, normal } = gates[symbol];
    return {
      t,
      position: point.clone().addScaledVector(normal, distance).toArray(),
      target: point.clone().addScaledVector(normal, -8).toArray(),
    };
  };
  return [
    { t: 0, position: [0, 1, 13], target: [0, 0, 0] },
    { t: 0.11, position: [1, 0.7, 9], target: [2, 0, 0] },
    { t: 0.2, position: [-1, 2, 1], target: gates.gateway.point.toArray() },
    gateStop(0.29, "gateway", 4.5),
    gateStop(0.325, "gateway", 0.8),
    gateStop(0.34, "gateway", -1.2),
    gateStop(0.37, "penjor", 0.8),
    gateStop(0.395, "penjor", -1.2),
    { t: 0.445, position: [0, 12, -23], target: [0, 0, -26] },
    { t: 0.47, position: [0, 14, -25.9], target: [0, 0, -26] },
    gateStop(0.54, "foliage", 12),
    gateStop(0.625, "foliage", 0.8),
    gateStop(0.65, "foliage", -1.2),
    gateStop(0.705, "jepun", 0.8),
    gateStop(0.73, "jepun", -1.2),
    { t: 0.81, position: [0, 1, -55], target: [0, 0, -65] },
    { t: 0.91, position: [0, 1, -56], target: [0, 0, -65] },
    { t: 1, position: [0, 1, -57], target: [0, 0, -65] },
  ];
}
export const cameraStops = createCameraStops(false);
export const mobileCameraStops = createCameraStops(true);
// The lens physically follows each mesh's local forward axis across its open gate.
export function sampleCamera(
  p: number,
  position: Vector3,
  target: Vector3,
  mobile = false,
) {
  p = Math.min(1, Math.max(0, p));
  const stops = mobile ? mobileCameraStops : cameraStops;
  const i = Math.max(
    0,
    stops.findIndex(
      (s, j) => j < stops.length - 1 && p >= s.t && p <= stops[j + 1].t,
    ),
  );
  const a = stops[i],
    b = stops[i + 1];
  const n = Math.min(1, Math.max(0, (p - a.t) / (b.t - a.t)));
  const t = n * n * (3 - 2 * n);
  position.set(
    a.position[0] + (b.position[0] - a.position[0]) * t,
    a.position[1] + (b.position[1] - a.position[1]) * t,
    a.position[2] + (b.position[2] - a.position[2]) * t,
  );
  target.set(
    a.target[0] + (b.target[0] - a.target[0]) * t,
    a.target[1] + (b.target[1] - a.target[1]) * t,
    a.target[2] + (b.target[2] - a.target[2]) * t,
  );
}
