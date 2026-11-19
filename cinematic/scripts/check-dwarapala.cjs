const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const T = require("three");
const manifest = require("../lib/dwarapala-model.json");
const geometryFor = require("./dwarapala-mesh.cjs");
const load = require("./load-ts.cjs");
const { sampleCamera } = load(path.join(__dirname, "../lib/journey.ts"));
const { culturalLayout } = load(
  path.join(__dirname, "../lib/cultural-layout.ts"),
);
assert.equal(
  manifest.source,
  "https://sketchfab.com/3d-models/patung-dwarapala-pintu-utara-75a1945e6b9e4a62866b13479fb48e1b",
);
assert.equal(manifest.author, "nusaheritage.id");
assert.equal(manifest.license, "CC BY 4.0");
assert.equal(
  manifest.variants.high.triangles,
  31558,
  "all statue and pedestal triangles retained at High",
);
let previous = Infinity;
for (const quality of ["high", "medium", "low"]) {
  const variant = manifest.variants[quality];
  const bytes = fs.readFileSync(
    path.join(__dirname, "../public/models", variant.file),
  );
  assert.equal(bytes.length, variant.bytes);
  assert(bytes.length < 1_600_000, "bounded embedded model download");
  const length = bytes.readUInt32LE(12),
    j = JSON.parse(bytes.subarray(20, 20 + length));
  assert.equal(
    j.meshes.length,
    2,
    "complete statue and pedestal; detached fragment removed",
  );
  assert.equal(j.materials.length, 2);
  assert.equal(
    j.images.length,
    2,
    "both original photographed surfaces embedded",
  );
  assert(
    j.images.every((image) => image.bufferView !== undefined && !image.uri),
  );
  for (const primitive of j.meshes.flatMap((mesh) => mesh.primitives)) {
    assert(
      primitive.attributes.NORMAL !== undefined &&
        primitive.attributes.TEXCOORD_0 !== undefined,
    );
  }
  const g = geometryFor(quality);
  assert([...g.attributes.position.array].every(Number.isFinite));
  assert.equal(g.index.count / 3, variant.triangles);
  assert(variant.triangles < previous);
  previous = variant.triangles;
  assert(
    Math.abs(g.boundingBox.max.y - g.boundingBox.min.y - 1) < 0.025,
    "full statue height",
  );
  assert(g.boundingBox.max.x - g.boundingBox.min.x > 0.53, "pedestal retained");
  const material = new T.MeshBasicMaterial({ side: T.DoubleSide }),
    mesh = new T.Mesh(g, material);
  mesh.updateMatrixWorld();
  const ray = new T.Raycaster(
    new T.Vector3(0, 0, 2),
    new T.Vector3(0, 0, -1),
    0,
    4,
  );
  assert(ray.intersectObject(mesh).length > 0, "statue centre remains solid");
  ray.set(new T.Vector3(...manifest.gate, 2), new T.Vector3(0, 0, -1));
  assert.equal(
    ray.intersectObject(mesh).length,
    0,
    "camera lane lies beside the statue",
  );
  const layout = culturalLayout("dwarapala", false);
  mesh.position.fromArray(layout.position);
  mesh.rotation.set(...layout.rotation);
  mesh.scale.setScalar(layout.scale);
  mesh.updateMatrixWorld();
  // The existing Our story chapter link lands at 3.28 / 6 journey progress.
  // Fit the real vertices between desktop controls before the side passage.
  for (const aspect of [1.3, 1.6, 1.78, 2.4]) {
    const camera = new T.PerspectiveCamera(43, aspect, 0.04, 110);
    const target = new T.Vector3();
    sampleCamera(3.28 / 6, camera.position, target, false);
    camera.lookAt(target);
    camera.updateMatrixWorld();
    for (let i = 0; i < g.attributes.position.count; i++) {
      const point = new T.Vector3()
        .fromBufferAttribute(g.attributes.position, i)
        .applyMatrix4(mesh.matrixWorld)
        .project(camera);
      assert(
        Math.abs(point.x) < 0.99 &&
          Math.abs(point.y) < 0.8 &&
          point.z > -1 &&
          point.z < 1,
        `${quality}/${aspect}: complete statue and pedestal in the chapter composition`,
      );
    }
  }
  g.dispose();
  material.dispose();
}
assert(
  fs
    .readFileSync(
      path.join(__dirname, "../public/models/dwarapala-ATTRIBUTION.txt"),
      "utf8",
    )
    .includes(manifest.author),
);
console.log(
  "PASS: selected CC BY Dwarapala, intact statue/pedestal, original embedded textures, bounded tiers and exterior camera lane.",
);
