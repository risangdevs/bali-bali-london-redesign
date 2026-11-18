const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const T = require("three");
const manifest = require("../lib/penjor-model.json");
const geometryFor = require("./penjor-mesh.cjs");
assert.equal(
  manifest.source,
  "https://sketchfab.com/3d-models/balinese-penjor-7aca638e85d04c1699c04918cdc36a9e",
);
assert.equal(manifest.license, "CC BY 4.0");
assert.equal(manifest.author, "alterego.visual");
let previous = Infinity;
for (const quality of ["high", "medium", "low"]) {
  const v = manifest.variants[quality];
  const bytes = fs.readFileSync(
    path.join(__dirname, "../public/models", v.file),
  );
  assert.equal(bytes.length, v.bytes);
  assert(bytes.length < 2_500_000);
  const length = bytes.readUInt32LE(12),
    j = JSON.parse(bytes.subarray(20, 20 + length));
  assert.equal(
    j.meshes.length,
    10,
    "preserve all original ornament/pole groups",
  );
  assert.equal(j.materials.length, 2);
  assert(
    j.nodes.every((n) => n.mesh !== undefined),
    "source editor/camera nodes excluded",
  );
  assert(
    j.materials.every(
      (m) => m.doubleSided && m.pbrMetallicRoughness.metallicFactor === 0,
    ),
  );
  const g = geometryFor(quality);
  assert([...g.attributes.position.array].every(Number.isFinite));
  assert.equal(g.index.count / 3, v.triangles);
  assert(v.triangles < previous);
  previous = v.triangles;
  assert(
    Math.abs(g.boundingBox.max.y - g.boundingBox.min.y - 1) < 0.025,
    "complete bow height",
  );
  assert(
    g.boundingBox.max.x - g.boundingBox.min.x > 0.57,
    "hanging tip and bow retained",
  );
  const m = new T.MeshBasicMaterial({ side: T.DoubleSide }),
    mesh = new T.Mesh(g, m);
  mesh.updateMatrixWorld();
  const ray = new T.Raycaster(
    new T.Vector3(...manifest.gate, 1),
    new T.Vector3(0, 0, -1),
    0,
    2,
  );
  assert.equal(
    ray.intersectObject(mesh).length,
    0,
    "natural passage stays open",
  );
  // Any solid original triangle must remain ray-visible, independently of the gap.
  const a = new T.Vector3().fromBufferAttribute(
    g.attributes.position,
    g.index.getX(0),
  );
  const b = new T.Vector3().fromBufferAttribute(
    g.attributes.position,
    g.index.getX(1),
  );
  const c = new T.Vector3().fromBufferAttribute(
    g.attributes.position,
    g.index.getX(2),
  );
  const n = b.clone().sub(a).cross(c.clone().sub(a)).normalize(),
    center = a.add(b).add(c).divideScalar(3);
  ray.set(center.clone().addScaledVector(n, 1), n.negate());
  assert(ray.intersectObject(mesh).length > 0, "ornament surfaces are solid");
  g.dispose();
  m.dispose();
}
assert(
  fs
    .readFileSync(
      path.join(__dirname, "../public/models/penjor-ATTRIBUTION.txt"),
      "utf8",
    )
    .includes(manifest.author),
);
console.log(
  "PASS: selected licensed penjor, complete original bow/ornament groups, bounded adaptive geometry, source materials and open passage.",
);
