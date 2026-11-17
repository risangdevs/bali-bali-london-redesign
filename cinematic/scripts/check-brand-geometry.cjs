const fs = require("node:fs");
const path = require("node:path");
const { createRequire } = require("node:module");
const vm = require("node:vm");
const ts = require("typescript");
const assert = require("node:assert/strict");
const {
  Mesh,
  MeshBasicMaterial,
  DoubleSide,
  Raycaster,
  Vector3,
} = require("three");
const filename = path.join(__dirname, "../lib/brand-geometry.ts");
const output = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
}).outputText;
const compiled = {};
vm.runInNewContext(output, {
  exports: compiled,
  require: createRequire(filename),
});
const { brandFont, makeBrandGeometry } = compiled;
assert.equal(brandFont.data.familyName, "Cormorant Garamond Regular");
for (const [letter, counters] of [
  ["B", 2],
  ["A", 0],
  ["L", 0],
  ["I", 0],
]) {
  const shapes = brandFont.generateShapes(letter, 1);
  assert.equal(
    shapes.reduce((n, s) => n + s.holes.length, 0),
    counters,
    `${letter}: correct letter counters`,
  );
  const counts = [];
  for (const quality of ["low", "medium", "high"]) {
    const geometry = makeBrandGeometry(letter, quality);
    const positions = geometry.getAttribute("position");
    assert(
      [...positions.array].every(Number.isFinite),
      `${letter}: finite vertices`,
    );
    const box = geometry.boundingBox;
    assert(
      Math.abs(box.max.y - box.min.y - 1) < 1e-6,
      `${letter}: unit height`,
    );
    assert(Math.abs(box.min.x + box.max.x) < 1e-6, `${letter}: centred width`);
    assert(box.max.z - box.min.z > 0.05, `${letter}: genuinely extruded`);
    assert(
      geometry.groups.some((g) => g.materialIndex === 0) &&
        geometry.groups.some((g) => g.materialIndex === 1),
      `${letter}: face/edge material groups`,
    );
    if (letter === "A") {
      // This font builds A from separate legs and crossbar contours. Its visual
      // counter must stay open even though it is not represented as a shape.hole.
      const material = new MeshBasicMaterial({ side: DoubleSide });
      const mesh = new Mesh(geometry, material);
      mesh.updateMatrixWorld();
      const ray = new Raycaster(
        new Vector3(-0.018, 0.12, 1),
        new Vector3(0, 0, -1),
      );
      assert.equal(
        ray.intersectObject(mesh).length,
        0,
        "A: open triangular counter",
      );
      ray.set(new Vector3(-0.024, -0.054, 1), new Vector3(0, 0, -1));
      assert(ray.intersectObject(mesh).length > 0, "A: solid crossbar");
      material.dispose();
    }
    counts.push(positions.count);
    let disposed = false;
    geometry.addEventListener("dispose", () => {
      disposed = true;
    });
    geometry.dispose();
    assert(disposed, `${letter}: explicit disposal`);
  }
  assert(
    counts[0] <= counts[1] && counts[1] <= counts[2],
    `${letter}: tier complexity`,
  );
}
console.log(
  "PASS: B/A/L/I editorial glyphs, preserved counters, centred unit-height extrusion, finite vertices, material groups, quality tiers and disposal.",
);
