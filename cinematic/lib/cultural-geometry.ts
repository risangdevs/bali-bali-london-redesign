import {
  BufferGeometry,
  CatmullRomCurve3,
  ExtrudeGeometry,
  Float32BufferAttribute,
  Path,
  Shape,
  TubeGeometry,
  Vector3,
} from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import type { Quality } from "./effects";

export const culturalSymbols = ["foliage"] as const;
export type ProceduralSymbol = (typeof culturalSymbols)[number];
export type CulturalSymbol = "gateway" | "penjor" | "jepun" | ProceduralSymbol;
export const culturalPalettes: Record<
  ProceduralSymbol,
  [string, string, string]
> = {
  foliage: ["#60372a", "#b18a51", "#815641"],
};
/** Original stylised sculptures, not scans or replicas of ceremonial objects.
 * Three material buckets keep each complete sculpture to at most three draw calls.
 * The local XY plane is the passage; all apertures stay open at every detail tier.
 */
export function makeCulturalGeometry(
  symbol: ProceduralSymbol,
  quality: Quality,
) {
  const detail = quality === "high" ? 24 : quality === "medium" ? 12 : 6;
  const radial = quality === "high" ? 8 : quality === "medium" ? 6 : 4;
  const buckets: BufferGeometry[][] = [[], [], []];
  const add = (geometry: BufferGeometry, material = 0) => {
    // Non-indexed triangles make boxes, extrusions, tubes and petal surfaces compatible.
    const triangles = geometry.index ? geometry.toNonIndexed() : geometry;
    if (triangles !== geometry) geometry.dispose();
    if (!triangles.getAttribute("color")) {
      const colors = new Float32Array(
        triangles.getAttribute("position").count * 3,
      ).fill(1);
      triangles.setAttribute("color", new Float32BufferAttribute(colors, 3));
    }
    triangles.clearGroups();
    buckets[material].push(triangles);
  };
  const extrude = (shape: Shape, depth: number, material = 0, z = 0) => {
    const g = new ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      curveSegments: detail / 2,
      bevelEnabled: quality !== "low",
      bevelSegments: quality === "high" ? 2 : 1,
      bevelSize: 0.003,
      bevelThickness: 0.003,
    });
    add(g.translate(0, 0, z - depth / 2), material);
  };
  const tube = (points: number[][], radius: number, material = 0) =>
    add(
      new TubeGeometry(
        new CatmullRomCurve3(points.map((p) => new Vector3(...p))),
        detail,
        radius,
        radial,
        false,
      ),
      material,
    );
  const leaf = (
    x: number,
    y: number,
    length: number,
    width: number,
    angle: number,
    material: number,
    z = 0.04,
    lobed = false,
  ) => {
    const s = new Shape();
    s.moveTo(0, 0);
    if (lobed) {
      s.bezierCurveTo(
        -width * 0.9,
        length * 0.1,
        -width * 1.1,
        length * 0.28,
        -width * 0.7,
        length * 0.36,
      );
      s.bezierCurveTo(
        -width * 1.25,
        length * 0.38,
        -width * 0.8,
        length * 0.58,
        -width * 0.4,
        length * 0.62,
      );
      s.bezierCurveTo(
        -width * 0.8,
        length * 0.75,
        -width * 0.4,
        length * 0.88,
        width * 0.15,
        length,
      );
      s.bezierCurveTo(
        width * 0.7,
        length * 0.8,
        width * 0.95,
        length * 0.8,
        width * 0.55,
        length * 0.64,
      );
      s.bezierCurveTo(
        width * 1.1,
        length * 0.55,
        width * 0.9,
        length * 0.45,
        width * 0.6,
        length * 0.35,
      );
      s.bezierCurveTo(width, length * 0.2, width * 0.4, length * 0.1, 0, 0);
    } else {
      s.bezierCurveTo(
        -width,
        length * 0.25,
        -width * 0.55,
        length * 0.8,
        0,
        length,
      );
      s.bezierCurveTo(
        width * 0.8,
        length * 0.72,
        width * 0.6,
        length * 0.2,
        0,
        0,
      );
    }
    const g = new ExtrudeGeometry(s, {
      depth: 0.012,
      bevelEnabled: quality !== "low",
      bevelSize: 0.0015,
      bevelThickness: 0.0015,
      bevelSegments: 1,
      curveSegments: lobed
        ? quality === "high"
          ? 4
          : quality === "medium"
            ? 3
            : 2
        : detail / 2,
    });
    const vertices = g.getAttribute("position");
    for (let i = 0; i < vertices.count; i++) {
      const t = vertices.getY(i) / length;
      vertices.setZ(
        i,
        vertices.getZ(i) + Math.sin(t * Math.PI) * 0.014 + t * t * 0.012,
      );
    }
    g.computeVertexNormals();
    g.rotateZ(angle).translate(x, y, z);
    add(g, material);
  };
  if (symbol === "foliage") {
    // A pepatran-inspired carved botanical frame, with an open pear-shaped centre.
    const frame = new Shape();
    frame.moveTo(0, 0.48);
    frame.bezierCurveTo(-0.32, 0.48, -0.47, 0.18, -0.43, -0.15);
    frame.bezierCurveTo(-0.4, -0.43, -0.2, -0.49, 0, -0.47);
    frame.bezierCurveTo(0.3, -0.49, 0.46, -0.25, 0.43, 0.05);
    frame.bezierCurveTo(0.42, 0.3, 0.24, 0.48, 0, 0.48);
    const aperture = new Path();
    aperture.absellipse(0, 0, 0.28, 0.36, 0, Math.PI * 2, true);
    frame.holes.push(aperture);
    extrude(frame, 0.075);
    for (const side of [-1, 1]) {
      tube(
        [
          [side * 0.08, -0.42, 0.054],
          [side * 0.34, -0.25, 0.054],
          [side * 0.35, 0.1, 0.054],
          [side * 0.15, 0.38, 0.054],
          [0, 0.43, 0.054],
        ],
        0.009,
        1,
      );
      for (let i = 0; i < 6; i++) {
        const theta = -1.16 + (i / 5) * 2.4;
        const x = side * Math.cos(theta) * 0.34,
          y = Math.sin(theta) * 0.38;
        leaf(
          x,
          y,
          0.18,
          0.055,
          side * (-Math.PI / 2 + theta * 0.9),
          i % 2 ? 0 : 2,
          0.02,
          true,
        );
        if (quality !== "low")
          leaf(x, y, 0.1, 0.03, side * (-0.5 + theta), 1, 0.063, true);
        if (i === 1 || i === 4) {
          const scroll = Array.from({ length: 15 }, (_, j) => {
            const a = (j / 14) * Math.PI * 2.15,
              r = 0.055 * (1 - j / 18);
            return [
              x + side * (0.025 + Math.cos(a) * r),
              y + Math.sin(a) * r,
              0.073,
            ];
          });
          tube(scroll, 0.0045, 1);
        }
      }
    }
    leaf(0, 0.37, 0.2, 0.07, 0, 0, 0.04, true);
    leaf(0, -0.37, 0.17, 0.065, Math.PI, 0, 0.04, true);
  }

  const merged = buckets.map((parts) => {
    // Every symbol has all three materials; combine per material before final merge.
    const result = mergeGeometries(parts, false)!;
    parts.forEach((part) => part.dispose());
    return result;
  });
  const geometry = mergeGeometries(merged, true)!;
  merged.forEach((part) => part.dispose());
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();
  return geometry;
}
