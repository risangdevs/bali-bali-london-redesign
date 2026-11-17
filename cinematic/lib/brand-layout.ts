import { Euler, Vector3 } from "three";
import type { BrandCharacter } from "./brand-geometry";

export type BrandLayout = {
  letter: BrandCharacter;
  height: number;
  position: [number, number, number];
  rotation: [number, number, number];
  from: number;
  to: number;
  gate: [number, number];
};
/** Shared by camera and meshes: physical gate points cannot drift from the glyphs.
 * B/A use open counters; L uses its open inside corner; I passes its right edge.
 */
export function brandLayout(
  letter: BrandCharacter,
  mobile: boolean,
): BrandLayout {
  const layouts: Record<BrandCharacter, BrandLayout> = {
    B: {
      letter,
      height: mobile ? 4.2 : 7.2,
      position: [mobile ? 0.25 : 1.5, mobile ? -0.6 : 0, -13],
      rotation: [0, -0.09, 0],
      from: 0.085,
      to: 0.375,
      gate: [0.015, 0.255],
    },
    A: {
      letter,
      height: mobile ? 4.4 : 6.8,
      position: [mobile ? 0.2 : 0.9, mobile ? -0.3 : -0.1, -19],
      rotation: [0, 0.08, 0],
      from: 0.25,
      to: 0.435,
      gate: [-0.018, 0.12],
    },
    L: {
      letter,
      height: mobile ? 3.8 : 6.6,
      position: [mobile ? 0.2 : 2.9, mobile ? -0.4 : 0, -42.5],
      rotation: [0, -0.12, 0],
      from: 0.49,
      to: 0.69,
      gate: [-0.09, -0.36],
    },
    I: {
      letter,
      height: mobile ? 2.7 : 3.1,
      position: [mobile ? 0.2 : 1.6, mobile ? 0.15 : 1.4, -49],
      rotation: [0, 0.12, 0],
      from: 0.635,
      to: 0.78,
      gate: [0.27, 0],
    },
  };
  return layouts[letter];
}
export function letterGate(layout: BrandLayout) {
  const rotation = new Euler(...layout.rotation);
  return {
    point: new Vector3(
      layout.gate[0] * layout.height,
      layout.gate[1] * layout.height,
      0,
    )
      .applyEuler(rotation)
      .add(new Vector3(...layout.position)),
    normal: new Vector3(0, 0, 1).applyEuler(rotation),
  };
}
