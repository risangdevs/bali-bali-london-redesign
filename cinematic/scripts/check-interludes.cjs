const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const T = require("three");
const sharp = require("sharp");
const load = require("./load-ts.cjs");
const { sampleInterlude } = load(path.join(__dirname, "../lib/interlude.ts"));
const bounds = require("../lib/sculpture-bounds.json");
const source = {
  gateway: require("./gateway-mesh.cjs"),
  penjor: require("./penjor-mesh.cjs"),
  jepun: require("./flower-mesh.cjs"),
};
const { makeCulturalGeometry } = load(
  path.join(__dirname, "../lib/cultural-geometry.ts"),
);
source.foliage = (q) => makeCulturalGeometry("foliage", q);
const gates = {
  gateway: require("../lib/gateway-model.json").gate,
  penjor: require("../lib/penjor-model.json").gate,
  jepun: require("../lib/flower-model.json").gate,
  foliage: [0, 0],
};
(async () => {
  for (const name of Object.keys(source)) {
    const b = bounds[name];
    const corners = [];
    for (const x of [b.min[0], b.max[0]])
      for (const y of [b.min[1], b.max[1]])
        for (const z of [b.min[2], b.max[2]])
          corners.push(new T.Vector3(x, y, z));
    for (const aspect of [0.4, 0.65, 1, 1.78, 3.2]) {
      const camera = new T.PerspectiveCamera(38, aspect, 0.01, 30),
        samples = [];
      for (let i = 0; i <= 1000; i++) {
        const s = sampleInterlude(b, gates[name], aspect, i / 1000);
        assert(
          s.position.every(Number.isFinite) && s.target.every(Number.isFinite),
        );
        assert(s.opacity >= -1e-12 && s.opacity <= 1 + 1e-12);
        camera.position.fromArray(s.position);
        camera.lookAt(...s.target);
        camera.updateMatrixWorld();
        if (s.opacity > 0.001)
          for (const corner of corners) {
            const p = corner.clone().project(camera);
            assert(
              Math.abs(p.x) < 0.95 &&
                Math.abs(p.y) < 0.95 &&
                p.z > -1 &&
                p.z < 1,
              `${name} at ${aspect}: whole bounding box fits while visible`,
            );
          }
        samples.push(JSON.stringify(s));
      }
      for (let i = 1000; i >= 0; i--)
        assert.equal(
          JSON.stringify(sampleInterlude(b, gates[name], aspect, i / 1000)),
          samples[i],
          "reverse scroll uses exactly the same views",
        );
      for (const p of [0.56, 0.82, 0.9]) {
        const h = 1e-6,
          a = sampleInterlude(b, gates[name], aspect, p - h).position,
          c = sampleInterlude(b, gates[name], aspect, p).position,
          d = sampleInterlude(b, gates[name], aspect, p + h).position;
        const left = new T.Vector3(...c)
            .sub(new T.Vector3(...a))
            .divideScalar(h),
          right = new T.Vector3(...d).sub(new T.Vector3(...c)).divideScalar(h);
        assert(left.distanceTo(right) < 0.1, "continuous camera velocity");
      }
    }
    for (const q of ["low", "medium", "high"]) {
      const g = source[name](q);
      g.computeBoundingBox();
      for (const axis of ["x", "y", "z"]) {
        const k = ["x", "y", "z"].indexOf(axis);
        assert(
          g.boundingBox.min[axis] >= b.min[k] - 1e-6 &&
            g.boundingBox.max[axis] <= b.max[k] + 1e-6,
          "frame includes every quality tier",
        );
      }
      const material = new T.MeshBasicMaterial({ side: T.DoubleSide }),
        mesh = new T.Mesh(g, material);
      mesh.updateMatrixWorld();
      for (let i = 0; i < 9; i++) {
        const a = (i * Math.PI) / 4,
          r = i === 8 ? 0 : 0.008;
        const ray = new T.Raycaster(
          new T.Vector3(
            gates[name][0] + Math.cos(a) * r,
            gates[name][1] + Math.sin(a) * r,
            0.8,
          ),
          new T.Vector3(0, 0, -1),
          0,
          1.45,
        );
        assert.equal(
          ray.intersectObject(mesh).length,
          0,
          `${name} ${q}: final passage is clear`,
        );
      }
      g.dispose();
      material.dispose();
    }
    const poster = path.join(
      __dirname,
      "../public/images",
      `sculpture-${name}.webp`,
    );
    const metadata = await sharp(poster).metadata();
    assert.equal(metadata.width, 600);
    assert.equal(metadata.height, 600);
    assert(
      fs.statSync(poster).size < 50_000,
      "lightweight complete-model poster",
    );
  }
  console.log(
    "PASS: whole-model framing throughout visible motion across portrait/landscape aspects, all detail tiers, reversible continuous camera, real clear passages and complete loading posters.",
  );
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
