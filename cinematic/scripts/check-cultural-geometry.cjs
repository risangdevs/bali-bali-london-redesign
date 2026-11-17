const path = require("node:path");
const assert = require("node:assert/strict");
const {
  Mesh,
  MeshBasicMaterial,
  DoubleSide,
  Raycaster,
  Vector3,
} = require("three");
const loadTS = require("./load-ts.cjs");
const { culturalSymbols, makeCulturalGeometry } = loadTS(
  path.join(__dirname, "../lib/cultural-geometry.ts"),
);
// An open aperture alone could pass camera tests even if the sculpture were empty.
// Verify its defining solid surfaces too, independently of the layout constants.
const solid = {
  gateway: [0.3, -0.2],
  penjor: [-0.42, -0.5],
  foliage: [0.34, 0],
  jepun: [0.22, 0.09],
};
const vertices = {};
for (const symbol of culturalSymbols) {
  const counts = [];
  for (const quality of ["low", "medium", "high"]) {
    const geometry = makeCulturalGeometry(symbol, quality);
    const positions = geometry.getAttribute("position");
    assert(
      [...positions.array].every(Number.isFinite),
      `${symbol}: finite vertices`,
    );
    assert(
      [...geometry.getAttribute("normal").array].every(Number.isFinite),
      `${symbol}: finite normals`,
    );
    const colors = geometry.getAttribute("color");
    assert.equal(colors.count, positions.count);
    assert(
      [...colors.array].every((v) => Number.isFinite(v) && v >= 0 && v <= 1),
      "valid material colour gradients",
    );
    const box = geometry.boundingBox;
    assert(
      box.max.y - box.min.y > 0.8 && box.max.y - box.min.y < 1.4,
      `${symbol}: consistent scale`,
    );
    assert(
      box.max.z - box.min.z > 0.02,
      `${symbol}: genuinely spatial geometry`,
    );
    assert.equal(
      geometry.groups.length,
      3,
      `${symbol}: three batched material groups`,
    );
    assert(positions.count < 30_000, `${symbol}: bounded triangle budget`);
    const material = new MeshBasicMaterial({ side: DoubleSide });
    const mesh = new Mesh(geometry, material);
    mesh.updateMatrixWorld();
    const [x, y] = solid[symbol];
    const ray = new Raycaster(new Vector3(x, y, 1), new Vector3(0, 0, -1));
    assert(
      ray.intersectObject(mesh).length > 0,
      `${symbol}: defining surface remains solid`,
    );
    if (symbol === "jepun") {
      ray.set(new Vector3(0, 0, 1), new Vector3(0, 0, -1));
      assert(
        ray.intersectObject(mesh).length > 0,
        "jepun: golden centre stays closed",
      );
    }
    material.dispose();
    counts.push(positions.count);
    let disposed = false;
    geometry.addEventListener("dispose", () => {
      disposed = true;
    });
    geometry.dispose();
    assert(disposed, `${symbol}: explicit disposal`);
  }
  assert(
    counts[0] <= counts[1] && counts[1] <= counts[2],
    `${symbol}: adaptive detail`,
  );
  vertices[symbol] = counts;
}
console.log(
  "PASS: four cultural sculptures, solid surfaces, finite spatial geometry, batched materials, detail budgets and disposal.",
  vertices,
);
