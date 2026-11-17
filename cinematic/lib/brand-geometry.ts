import { Font } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import fontData from "./bali-editorial.typeface.json";
import { type Quality } from "./effects";

export type BrandCharacter = "B" | "A" | "L" | "I";
export const brandFont = new Font(fontData);
/** Unit-height, centred, genuinely extruded glyphs from the existing editorial font. */
export function makeBrandGeometry(letter: BrandCharacter, quality: Quality) {
  const geometry = new TextGeometry(letter, {
    font: brandFont,
    size: 1,
    depth: 0.105,
    steps: 1,
    curveSegments: quality === "high" ? 12 : quality === "medium" ? 6 : 3,
    bevelEnabled: quality !== "low",
    bevelThickness: 0.006,
    bevelSize: 0.003,
    bevelSegments: quality === "high" ? 2 : 1,
  });
  geometry.computeBoundingBox();
  const box = geometry.boundingBox!;
  const height = box.max.y - box.min.y;
  geometry.translate(
    -(box.min.x + box.max.x) / 2,
    -(box.min.y + box.max.y) / 2,
    -(box.min.z + box.max.z) / 2,
  );
  geometry.scale(1 / height, 1 / height, 1 / height);
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();
  return geometry;
}
