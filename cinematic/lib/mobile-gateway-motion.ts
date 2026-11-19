import { smootherstep } from "./motion";

/** A reversible perspective illusion from two renders of the original stone halves. */
export function sampleGatewayEntrance(value: number) {
  const p = Math.max(0, Math.min(1, value));
  const approach = smootherstep((p - 0.06) / 0.84);
  const reveal = smootherstep((p - 0.1) / 0.82);
  const aperture = 0.08 + 3.42 * reveal;
  return {
    scale: 1 + 3.2 * approach,
    shift: 0.3 * approach,
    stoneOpacity: 1 - smootherstep((p - 0.42) / 0.48),
    aperture,
    photoScale: (0.96 + 0.04 * reveal) / aperture,
    photoOpacity: smootherstep((p - 0.1) / 0.42),
  };
}
