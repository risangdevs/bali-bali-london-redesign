import {
  BoxGeometry,
  BufferGeometry,
  CatmullRomCurve3,
  CubicBezierCurve3,
  CylinderGeometry,
  ExtrudeGeometry,
  Float32BufferAttribute,
  Matrix4,
  Path,
  Quaternion,
  Shape,
  SphereGeometry,
  TubeGeometry,
  Vector3,
} from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import type { Quality } from "./effects";

export const culturalSymbols = [
  "gateway",
  "penjor",
  "foliage",
  "jepun",
] as const;
export type CulturalSymbol = (typeof culturalSymbols)[number];
export const culturalPalettes: Record<
  CulturalSymbol,
  [string, string, string]
> = {
  gateway: ["#ac9273", "#d1b48a", "#786650"],
  penjor: ["#b88a4c", "#e2c68d", "#72805a"],
  foliage: ["#60372a", "#b18a51", "#815641"],
  jepun: ["#fff2da", "#dfb456", "#d3c2a7"],
};
/** Original stylised sculptures, not scans or replicas of ceremonial objects.
 * Three material buckets keep each complete sculpture to at most three draw calls.
 * The local XY plane is the passage; all apertures stay open at every detail tier.
 */
export function makeCulturalGeometry(symbol: CulturalSymbol, quality: Quality) {
  const detail = quality === "high" ? 24 : quality === "medium" ? 12 : 6;
  const radial = quality === "high" ? 8 : quality === "medium" ? 6 : 4;
  const buckets: BufferGeometry[][] = [[], [], []];
  const add = (geometry: BufferGeometry, material = 0) => {
    // Non-indexed triangles make boxes, extrusions, tubes and petal surfaces compatible.
    const triangles = geometry.index ? geometry.toNonIndexed() : geometry;
    if (triangles !== geometry) geometry.dispose();
    triangles.clearGroups();
    buckets[material].push(triangles);
  };
  const box = (
    x: number,
    y: number,
    z: number,
    w: number,
    h: number,
    d: number,
    material = 0,
  ) => add(new BoxGeometry(w, h, d).translate(x, y, z), material);
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
  ) => {
    const s = new Shape();
    s.moveTo(0, 0);
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
    const g = new ExtrudeGeometry(s, {
      depth: 0.012,
      bevelEnabled: false,
      curveSegments: detail / 2,
    });
    g.rotateZ(angle).translate(x, y, z);
    add(g, material);
  };
  if (symbol === "gateway") {
    // Candi bentar: matching stepped halves, a tall uninterrupted central split.
    for (const side of [-1, 1]) {
      const s = new Shape();
      const points = [
        [0.13, -0.48],
        [0.13, 0.5],
        [0.2, 0.5],
        [0.2, 0.39],
        [0.27, 0.39],
        [0.27, 0.24],
        [0.34, 0.24],
        [0.34, 0.08],
        [0.42, 0.08],
        [0.42, -0.1],
        [0.5, -0.1],
        [0.5, -0.3],
        [0.57, -0.3],
        [0.57, -0.48],
      ];
      points.forEach(([x, y], i) =>
        i ? s.lineTo(x * side, y) : s.moveTo(x * side, y),
      );
      s.closePath();
      extrude(s, 0.15);
      box(side * 0.35, -0.48, 0, 0.49, 0.055, 0.22, 2);
      // Cornices and recessed panels give depth to the silhouette from either side.
      for (const [y, width] of [
        [-0.31, 0.4],
        [-0.11, 0.32],
        [0.07, 0.24],
        [0.23, 0.17],
        [0.38, 0.1],
      ]) {
        box(side * (0.13 + width / 2), y, 0, width, 0.026, 0.2, 1);
        for (const z of [-0.081, 0.081]) {
          box(
            side * (0.16 + width / 2),
            y + 0.06,
            z,
            Math.max(0.025, width - 0.065),
            0.058,
            0.012,
            2,
          );
        }
      }
      for (const z of [-0.097, 0.097]) {
        tube(
          [
            [side * 0.151, -0.4, z],
            [side * 0.151, 0, z],
            [side * 0.151, 0.45, z],
          ],
          0.007,
          1,
        );
        for (let i = 0; i < 4; i++) {
          const y = -0.24 + i * 0.17,
            x = side * (0.41 - i * 0.075);
          leaf(x, y, 0.11, 0.035, side * -0.65, 1, z);
        }
      }
    }
  } else if (symbol === "penjor") {
    // An ornamental bamboo bow: no shrine, deity, sacred text or ritual offering.
    const curve = new CubicBezierCurve3(
      new Vector3(-0.42, -0.5, 0),
      new Vector3(-0.65, 0.95, -0.025),
      new Vector3(0.38, 0.8, 0.025),
      new Vector3(0.4, 0.08, 0),
    );
    add(new TubeGeometry(curve, detail * 2, 0.014, radial, false));
    for (let i = 1; i <= 10; i++) {
      const t = i / 12,
        point = curve.getPoint(t),
        tangent = curve.getTangent(t);
      const ring = new CylinderGeometry(0.018, 0.018, 0.009, radial);
      ring.applyMatrix4(
        new Matrix4().compose(
          point,
          new Quaternion().setFromUnitVectors(new Vector3(0, 1, 0), tangent),
          new Vector3(1, 1, 1),
        ),
      );
      add(ring, 1);
      // Woven palm-leaf flourishes follow the bow and leave the centre clear.
      if (i >= 4) {
        const angle = -Math.atan2(tangent.x, tangent.y);
        leaf(point.x, point.y, 0.105, 0.025, angle - 0.75, 1, 0.02);
        leaf(point.x, point.y, 0.085, 0.024, angle + 0.8, 2, 0.025);
      }
    }
    tube(
      [
        [0.4, 0.08, 0],
        [0.4, -0.05, 0.01],
        [0.4, -0.22, 0],
      ],
      0.004,
      1,
    );
    for (let i = 0; i < 4; i++) {
      const y = -0.02 - i * 0.045;
      leaf(0.4, y, 0.09, 0.025, -0.9, 1);
      leaf(0.4, y, 0.09, 0.025, 0.9, 1);
    }
    // A small woven diamond and separated ribbons, all beside the flight lane.
    const diamond = new Shape();
    diamond.moveTo(0.4, -0.2);
    diamond.lineTo(0.455, -0.27);
    diamond.lineTo(0.4, -0.34);
    diamond.lineTo(0.345, -0.27);
    diamond.closePath();
    extrude(diamond, 0.02, 1);
    for (let i = -1; i <= 1; i++)
      tube(
        [
          [0.4 + i * 0.018, -0.33, 0],
          [0.4 + i * 0.03, -0.4, 0.01],
          [0.4 + i * 0.034, -0.46, 0.02],
        ],
        0.003,
        i === 0 ? 2 : 1,
      );
  } else if (symbol === "foliage") {
    // A pepatran-inspired carved botanical frame, with an open pear-shaped centre.
    const frame = new Shape();
    frame.moveTo(0, 0.48);
    frame.bezierCurveTo(-0.32, 0.48, -0.47, 0.18, -0.43, -0.15);
    frame.bezierCurveTo(-0.4, -0.43, -0.2, -0.49, 0, -0.47);
    frame.bezierCurveTo(0.3, -0.49, 0.46, -0.25, 0.43, 0.05);
    frame.bezierCurveTo(0.42, 0.3, 0.24, 0.48, 0, 0.48);
    const aperture = new Path();
    aperture.absellipse(0, 0, 0.255, 0.335, 0, Math.PI * 2, true);
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
        );
        if (quality !== "low")
          leaf(x, y, 0.1, 0.03, side * (-0.5 + theta), 1, 0.063);
      }
    }
    leaf(0, 0.37, 0.2, 0.07, 0, 0);
    leaf(0, -0.37, 0.17, 0.065, Math.PI, 0);
  } else {
    // Five overlapping, cupped frangipani petals. An off-centre gap between
    // two tips is the camera passage; the flower's golden throat stays intact.
    add(
      new SphereGeometry(0.064, radial * 2, radial)
        .scale(1, 1, 0.35)
        .translate(0, 0, -0.035),
      1,
    );
    const rows = detail,
      columns = Math.max(6, detail / 2);
    for (let petal = 0; petal < 5; petal++) {
      const positions: number[] = [],
        uvs: number[] = [],
        indices: number[] = [];
      const angle = (petal * Math.PI * 2) / 5 + 0.2;
      for (let row = 0; row <= rows; row++) {
        const u = row / rows,
          radius = 0.045 + u * 0.49;
        const width = 0.008 + 0.185 * Math.pow(Math.sin(Math.PI * u), 0.8);
        const twist = angle + u * 0.32;
        for (let col = 0; col <= columns; col++) {
          const v = (col / columns) * 2 - 1;
          const x = radius,
            y = v * width;
          positions.push(
            x * Math.cos(twist) - y * Math.sin(twist),
            x * Math.sin(twist) + y * Math.cos(twist),
            -0.035 +
              Math.sin(u * Math.PI) * 0.095 +
              v * v * 0.045 +
              v * u * 0.035,
          );
          uvs.push(u, col / columns);
        }
      }
      for (let row = 0; row < rows; row++)
        for (let col = 0; col < columns; col++) {
          const a = row * (columns + 1) + col,
            b = a + columns + 1;
          indices.push(a, b, a + 1, b, b + 1, a + 1);
        }
      const g = new BufferGeometry();
      g.setAttribute("position", new Float32BufferAttribute(positions, 3));
      g.setAttribute("uv", new Float32BufferAttribute(uvs, 2));
      g.setIndex(indices);
      g.computeVertexNormals();
      // The first radial strips form a warm centre without a separate decal.
      const triangles = g.toNonIndexed();
      g.dispose();
      const center = triangles.clone(),
        ivory = triangles.clone();
      triangles.dispose();
      const split = Math.max(1, Math.floor(rows * 0.2)) * columns * 6;
      for (const [part, start, end, material] of [
        [center, 0, split, 1],
        [ivory, split, ivory.getAttribute("position").count, 0],
      ] as const) {
        for (const name of ["position", "normal", "uv"]) {
          const a = part.getAttribute(name);
          part.setAttribute(
            name,
            new Float32BufferAttribute(
              a.array.slice(start * a.itemSize, end * a.itemSize),
              a.itemSize,
            ),
          );
        }
        part.setDrawRange(0, Infinity);
        add(part, material);
      }
    }
    // Back-side botanical veins accent the sculpted surfaces without closing gaps.
    for (let i = 0; i < 5; i++) {
      const a = (i * Math.PI * 2) / 5 + 0.2;
      tube(
        [
          [Math.cos(a) * 0.07, Math.sin(a) * 0.07, -0.04],
          [Math.cos(a + 0.15) * 0.25, Math.sin(a + 0.15) * 0.25, 0.015],
          [Math.cos(a + 0.28) * 0.43, Math.sin(a + 0.28) * 0.43, 0.015],
        ],
        0.0025,
        2,
      );
    }
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
