const fs = require("node:fs");
const ts = require("typescript");
const vm = require("node:vm");
const assert = require("node:assert/strict");
const { Vector3 } = require("three");
const source = ts.transpileModule(
  fs.readFileSync(
    require("node:path").join(__dirname, "../lib/journey.ts"),
    "utf8",
  ),
  { compilerOptions: { module: ts.ModuleKind.CommonJS } },
).outputText;
const compiled = {};
vm.runInNewContext(source, { exports: compiled, require });
const { sampleCamera, cameraStops } = compiled;
for (const stop of cameraStops) {
  const p = new Vector3(),
    t = new Vector3();
  sampleCamera(stop.t, p, t);
  assert(p.distanceTo(new Vector3(...stop.position)) < 0.00001);
  assert(t.distanceTo(new Vector3(...stop.target)) < 0.00001);
}
const positions = [];
for (let i = 0; i <= 1000; i++) {
  const p = new Vector3(),
    t = new Vector3();
  sampleCamera(i / 1000, p, t);
  assert(p.toArray().every(Number.isFinite));
  assert(p.distanceTo(t) > 0.01);
  if (i) assert(p.distanceTo(positions[i - 1]) < 0.5);
  positions.push(p);
}
for (let i = 1000; i >= 0; i--) {
  const p = new Vector3();
  sampleCamera(i / 1000, p, new Vector3());
  assert(p.equals(positions[i]));
}
const before = new Vector3(),
  after = new Vector3();
sampleCamera(0.29, before, new Vector3());
sampleCamera(0.35, after, new Vector3());
assert(before.z > -13 && after.z < -13);
assert(Math.abs(after.x) < 3.1);
console.log(
  "PASS: keyframes, finite camera/target separation, continuity, exact reverse path and physical portal crossing.",
);
