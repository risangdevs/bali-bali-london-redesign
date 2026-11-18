import { Euler, Vector3 } from "three";
import gateway from "./gateway-model.json";
import flower from "./flower-model.json";
import penjor from "./penjor-model.json";
import type { CulturalSymbol } from "./cultural-geometry";

export type CulturalLayout = {
  symbol: CulturalSymbol;
  scale: number;
  position: [number, number, number];
  rotation: [number, number, number];
  from: number;
  to: number;
  gate: [number, number];
};
/** Mesh transforms and camera openings share one source. Gates are in sculpture
 * coordinates: central split, beneath the bamboo bow, carved aperture, petal gap.
 */
export function culturalLayout<T extends CulturalSymbol>(
  symbol: T,
  mobile: boolean,
): CulturalLayout & { symbol: T } {
  const layouts: Record<CulturalSymbol, CulturalLayout> = {
    gateway: {
      symbol,
      scale: mobile ? 4.5 : 7.2,
      position: [0, mobile ? -0.25 : 0.2, 4],
      rotation: [0, 0, 0],
      // The opening sculpture is already opaque at the landing position.
      from: -0.025,
      to: 0.195,
      gate: [gateway.gate[0], gateway.gate[1]],
    },
    penjor: {
      symbol,
      scale: mobile ? 3.6 : 7.2,
      position: [mobile ? 0.1 : 0.6, -0.2, -19],
      rotation: [0, 0.08, 0],
      from: 0.25,
      to: 0.435,
      gate: [penjor.gate[0], penjor.gate[1]],
    },
    foliage: {
      symbol,
      scale: mobile ? 4.2 : 6.6,
      position: [mobile ? 0.1 : 2.3, mobile ? -0.1 : -0.6, -42.5],
      rotation: [0, -0.12, 0],
      from: 0.49,
      to: 0.69,
      gate: [0, 0],
    },
    jepun: {
      symbol,
      scale: mobile ? 3.2 : 4.2,
      position: [mobile ? 0.8 : 3, mobile ? -0.5 : -0.3, -51.5],
      rotation: [0, 0.12, 0],
      from: mobile ? 0.6 : 0.635,
      to: 0.78,
      gate: [flower.gate[0], flower.gate[1]],
    },
  };
  return layouts[symbol] as CulturalLayout & { symbol: T };
}
export function culturalGate(layout: CulturalLayout) {
  const rotation = new Euler(...layout.rotation);
  return {
    point: new Vector3(
      layout.gate[0] * layout.scale,
      layout.gate[1] * layout.scale,
      0,
    )
      .applyEuler(rotation)
      .add(new Vector3(...layout.position)),
    normal: new Vector3(0, 0, 1).applyEuler(rotation),
  };
}
