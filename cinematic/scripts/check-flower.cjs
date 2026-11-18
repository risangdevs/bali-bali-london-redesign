const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const {
  Mesh,
  MeshBasicMaterial,
  DoubleSide,
  Raycaster,
  Vector3,
} = require("three");
const sharp = require("sharp");
const manifest = require("../lib/flower-model.json");
const geometryFor = require("./flower-mesh.cjs");
(async () => {
  assert.equal(manifest.license, "CC0 1.0");
  assert.equal(manifest.source, "https://blendswap.com/blend/14800");
  assert.equal(manifest.author, "elkid");
  let count = Infinity;
  for (const quality of ["high", "medium", "low"]) {
    const variant = manifest.variants[quality];
    const bytes = fs.readFileSync(
      path.join(__dirname, "../public/models", variant.file),
    );
    assert.equal(bytes.length, variant.bytes);
    assert(bytes.length < 700_000, "flower stays within the web asset budget");
    const length = bytes.readUInt32LE(12);
    const json = JSON.parse(bytes.subarray(20, 20 + length));
    const bin = bytes.subarray(28 + length);
    assert.equal(json.meshes.length, 5, "all five original petals retained");
    assert(
      json.nodes.every((n) => n.name.startsWith("Leaf.")),
      "exclude source camera and light geometry",
    );
    assert.equal(
      json.images.length,
      1,
      "one shared photographed petal texture",
    );
    assert(json.images[0].bufferView !== undefined && !json.images[0].uri);
    const view = json.bufferViews[json.images[0].bufferView];
    const metadata = await sharp(
      bin.subarray(view.byteOffset, view.byteOffset + view.byteLength),
    ).metadata();
    assert.equal(metadata.width, variant.textureResolution);
    assert.equal(metadata.height, variant.textureResolution);
    assert(json.materials[0].doubleSided, "curled petal backs remain visible");
    assert.equal(
      json.materials[0].pbrMetallicRoughness.baseColorTexture.index,
      0,
    );
    assert(
      json.meshes.every(
        (m) => m.primitives[0].attributes.TEXCOORD_0 !== undefined,
      ),
    );
    const geometry = geometryFor(quality);
    assert([...geometry.attributes.position.array].every(Number.isFinite));
    assert.equal(geometry.index.count / 3, variant.triangles);
    assert(variant.triangles < count, "adaptive subdivision detail");
    count = variant.triangles;
    const box = geometry.boundingBox;
    assert(Math.abs(box.max.y - box.min.y - 1) < 0.04);
    assert(
      box.max.z - box.min.z > 0.15,
      "preserve curled, thick spatial petals",
    );
    const material = new MeshBasicMaterial({ side: DoubleSide });
    const mesh = new Mesh(geometry, material);
    mesh.updateMatrixWorld();
    const ray = new Raycaster(
      new Vector3(0, 0, 2),
      new Vector3(0, 0, -1),
      0,
      4,
    );
    assert(
      ray.intersectObject(mesh).length > 0,
      "the actual flower remains solid at its centre",
    );
    ray.ray.origin.set(...manifest.gate, 2);
    assert.equal(
      ray.intersectObject(mesh).length,
      0,
      "camera uses natural negative space between outer petal tips",
    );
    material.dispose();
    geometry.dispose();
  }
  assert(
    fs
      .readFileSync(
        path.join(__dirname, "../public/models/frangipani-ATTRIBUTION.txt"),
        "utf8",
      )
      .includes(manifest.source),
  );
  console.log(
    "PASS: selected CC0 flower, five original textured petals, embedded photo, spatial curvature/thickness, detail budgets, intact centre and natural camera passage.",
  );
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
