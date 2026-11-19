const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const sharp = require("sharp");
const textureChecks = [];
const {
  Mesh,
  MeshBasicMaterial,
  DoubleSide,
  Raycaster,
  Vector3,
} = require("three");
const manifest = require("../lib/gateway-model.json");
const geometryFor = require("./gateway-mesh.cjs");
assert.equal(manifest.license, "CC BY 4.0");
assert(manifest.source.includes("9051dc244c984da8a1a4ec7e90e1a567"));
let count = Infinity;
for (const quality of ["high", "medium", "low"]) {
  const v = manifest.variants[quality],
    bytes = fs.readFileSync(path.join(__dirname, "../public/models", v.file));
  assert(
    bytes.length === v.bytes &&
      bytes.length < (quality === "high" ? 22_000_000 : 6_000_000),
    "bounded self-contained web model",
  );
  const n = bytes.readUInt32LE(12),
    j = JSON.parse(bytes.subarray(20, 20 + n));
  assert.equal(j.meshes.length, 5);
  assert.equal(j.images.length, 5);
  assert(
    j.images.every((i) => i.bufferView !== undefined && !i.uri),
    "textures embedded locally",
  );
  const expectedResolution = { high: 4096, medium: 1024, low: 768 }[quality];
  assert.equal(v.textureResolution, expectedResolution);
  const bin = bytes.subarray(28 + n);
  for (const image of j.images) {
    const view = j.bufferViews[image.bufferView];
    const encoded = bin.subarray(
      view.byteOffset || 0,
      (view.byteOffset || 0) + view.byteLength,
    );
    textureChecks.push(
      sharp(encoded)
        .metadata()
        .then((metadata) => {
          assert.equal(
            metadata.width,
            expectedResolution,
            `${quality}: actual embedded atlas width`,
          );
          assert.equal(
            metadata.height,
            expectedResolution,
            `${quality}: actual embedded atlas height`,
          );
        }),
    );
  }
  const g = geometryFor(quality);
  assert([...g.getAttribute("position").array].every(Number.isFinite));
  assert.equal(g.index.count / 3, v.triangles);
  assert(v.triangles < count, "quality tiers preserve descending detail");
  count = v.triangles;
  const m = new MeshBasicMaterial({ side: DoubleSide }),
    mesh = new Mesh(g, m);
  mesh.updateMatrixWorld();
  const ray = new Raycaster(
    new Vector3(0, manifest.gate[1], 2),
    new Vector3(0, 0, -1),
    0,
    4,
  );
  assert.equal(
    ray.intersectObject(mesh).length,
    0,
    "real central passage stays open",
  );
  ray.set(new Vector3(-0.09, manifest.gate[1], 2), new Vector3(0, 0, -1));
  assert(
    ray.intersectObject(mesh).length > 0,
    "left carved half remains solid",
  );
  ray.set(new Vector3(0.09, manifest.gate[1], 2), new Vector3(0, 0, -1));
  assert(
    ray.intersectObject(mesh).length > 0,
    "right carved half remains solid",
  );
  g.dispose();
  m.dispose();
}
assert(
  fs
    .readFileSync(
      path.join(__dirname, "../public/models/ATTRIBUTION.txt"),
      "utf8",
    )
    .includes(manifest.author),
);
Promise.all(textureChecks)
  .then(() =>
    console.log(
      "PASS: native 4K High atlases, unchanged mobile resolutions, bounded local variants, real open passage and intact stone halves.",
    ),
  )
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
