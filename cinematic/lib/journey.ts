import { Vector3 } from "three";
import { brandLayout, letterGate } from "./brand-layout";
export type JourneyState = {
  progress: number;
  time: number;
  invalidate?: () => void;
};
export const journey: JourneyState = { progress: 0, time: 0 };
type Stop = { t: number; position: number[]; target: number[] };
function createCameraStops(mobile: boolean): Stop[] {
  const gates = Object.fromEntries(
    (["B", "A", "L", "I"] as const).map((letter) => [
      letter,
      letterGate(brandLayout(letter, mobile)),
    ]),
  ) as Record<"B" | "A" | "L" | "I", ReturnType<typeof letterGate>>;
  const gateStop = (
    t: number,
    letter: keyof typeof gates,
    distance: number,
  ): Stop => {
    const { point, normal } = gates[letter];
    return {
      t,
      position: point.clone().addScaledVector(normal, distance).toArray(),
      target: point.clone().addScaledVector(normal, -8).toArray(),
    };
  };
  return [
    { t: 0, position: [0, 1, 13], target: [0, 0, 0] },
    { t: 0.11, position: [1, 0.7, 9], target: [2, 0, 0] },
    { t: 0.2, position: [-1, 2, 1], target: gates.B.point.toArray() },
    gateStop(0.29, "B", 4.5),
    gateStop(0.325, "B", 0.8),
    gateStop(0.34, "B", -1.2),
    gateStop(0.37, "A", 0.8),
    gateStop(0.395, "A", -1.2),
    { t: 0.445, position: [0, 12, -23], target: [0, 0, -26] },
    { t: 0.47, position: [0, 14, -25.9], target: [0, 0, -26] },
    gateStop(0.54, "L", 12),
    gateStop(0.625, "L", 0.8),
    gateStop(0.65, "L", -1.2),
    gateStop(0.705, "I", 0.8),
    gateStop(0.73, "I", -1.2),
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
