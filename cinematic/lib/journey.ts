import { Vector3 } from "three";
export type JourneyState = { progress: number; invalidate?: () => void };
export const journey: JourneyState = { progress: 0 };
// A single reversible track. Portal sits at z=-13; the lens physically crosses it.
export const cameraStops = [
  { t: 0, position: [0, 1, 13], target: [0, 0, 0] },
  { t: 0.11, position: [1, 0.7, 9], target: [2, 0, 0] },
  { t: 0.2, position: [-1, 2, 1], target: [0, 0, -9] },
  { t: 0.29, position: [0, 0.3, -8], target: [0, 0, -20] },
  { t: 0.35, position: [0, 0.2, -15], target: [0, 0, -26] },
  { t: 0.4, position: [0, 10, -21], target: [0, 0, -26] },
  { t: 0.47, position: [0, 14, -25.9], target: [0, 0, -26] },
  { t: 0.55, position: [0, 3, -32], target: [0, 0, -44] },
  { t: 0.61, position: [0, 3, -35], target: [0, 0, -44] },
  { t: 0.71, position: [-0.4, 2, -38], target: [0, 0, -49] },
  { t: 0.81, position: [0, 1, -45], target: [0, 0, -56] },
  { t: 0.91, position: [0, 1, -53], target: [0, 0, -65] },
  { t: 1, position: [0, 1, -57], target: [0, 0, -65] },
];
export function sampleCamera(p: number, position: Vector3, target: Vector3) {
  const i = Math.max(
    0,
    cameraStops.findIndex(
      (s, j) =>
        j < cameraStops.length - 1 && p >= s.t && p <= cameraStops[j + 1].t,
    ),
  );
  const a = cameraStops[i],
    b = cameraStops[i + 1];
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
