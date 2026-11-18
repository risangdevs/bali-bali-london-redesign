const gatewayGeometry = require("./gateway-mesh.cjs");
const loadTS = require("./load-ts.cjs");
const path = require("node:path");
const assert = require("node:assert/strict");
const {
  Vector3,
  Euler,
  Mesh,
  MeshBasicMaterial,
  DoubleSide,
  Raycaster,
} = require("three");
const root = path.join(__dirname, "../lib");
const { sampleCamera, cameraStops, mobileCameraStops } = loadTS(
  path.join(root, "journey.ts"),
);
const { culturalLayout, culturalGate } = loadTS(
  path.join(root, "cultural-layout.ts"),
);
const { makeCulturalGeometry } = loadTS(
  path.join(root, "cultural-geometry.ts"),
);
const { smooth, transitionAt } = loadTS(path.join(root, "effects.ts"));
for (const mobile of [false, true]) {
  const stops = mobile ? mobileCameraStops : cameraStops;
  for (const stop of stops) {
    const p = new Vector3(),
      t = new Vector3();
    sampleCamera(stop.t, p, t, mobile);
    assert(p.distanceTo(new Vector3(...stop.position)) < 0.00001);
    assert(t.distanceTo(new Vector3(...stop.target)) < 0.00001);
  }
  const positions = [];
  for (let i = 0; i <= 1000; i++) {
    const p = new Vector3(),
      t = new Vector3();
    sampleCamera(i / 1000, p, t, mobile);
    assert(p.toArray().every(Number.isFinite));
    assert(p.distanceTo(t) > 0.01);
    if (i)
      assert(p.distanceTo(positions[i - 1]) < 0.5, "continuous camera travel");
    positions.push(p);
  }
  for (let i = 1000; i >= 0; i--) {
    const p = new Vector3();
    sampleCamera(i / 1000, p, new Vector3(), mobile);
    assert(p.equals(positions[i]), "exact reverse path");
  }
  for (const stop of stops.slice(1, -1)) {
    const h = 1e-6,
      before = new Vector3(),
      at = new Vector3(),
      after = new Vector3();
    sampleCamera(stop.t - h, before, new Vector3(), mobile);
    sampleCamera(stop.t, at, new Vector3(), mobile);
    sampleCamera(stop.t + h, after, new Vector3(), mobile);
    const left = at.clone().sub(before).divideScalar(h),
      right = after.sub(at).divideScalar(h);
    assert(
      left.distanceTo(right) < 0.15,
      "camera velocity is continuous across keyframes",
    );
    if (stop.velocity)
      assert(left.length() > 60, "camera keeps travelling through the passage");
  }
  for (const [symbol, from, to] of [
    ["gateway", 0.325, 0.34],
    ["penjor", 0.37, 0.395],
    ["foliage", 0.625, 0.65],
    ["jepun", 0.705, 0.73],
  ]) {
    const layout = culturalLayout(symbol, mobile),
      gate = culturalGate(layout);
    const before = new Vector3(),
      after = new Vector3();
    sampleCamera(from, before, new Vector3(), mobile);
    sampleCamera(to, after, new Vector3(), mobile);
    assert(before.clone().sub(gate.point).dot(gate.normal) > 0);
    assert(after.clone().sub(gate.point).dot(gate.normal) < 0);
    for (let step = 0; step <= 20; step++) {
      const progress = from + ((to - from) * step) / 20,
        p = new Vector3(),
        target = new Vector3();
      sampleCamera(progress, p, target, mobile);
      assert(
        p.clone().sub(gate.point).cross(gate.normal).length() < 1e-6,
        "lens follows sculpture normal through its gate",
      );
      assert(
        target.sub(p).normalize().cross(gate.normal).length() < 1e-6,
        "lens faces through gate",
      );
      assert(
        smooth(layout.from, layout.from + 0.025, progress) *
          (1 - smooth(layout.to - 0.025, layout.to, progress)) >
          0.99,
        "sculpture stays opaque throughout crossing",
      );
      assert(
        transitionAt(progress)?.mode !== "shader",
        "no alternate camera compositing during physical flight",
      );
    }
    for (const quality of ["low", "medium", "high"]) {
      const geometry =
          symbol === "gateway"
            ? gatewayGeometry(quality)
            : makeCulturalGeometry(symbol, quality),
        material = new MeshBasicMaterial({ side: DoubleSide });
      const mesh = new Mesh(geometry, material);
      mesh.position.fromArray(layout.position);
      mesh.rotation.set(...layout.rotation);
      mesh.scale.setScalar(layout.scale);
      mesh.updateMatrixWorld();
      // A small lens-radius sweep catches strokes/bevels that a centre ray could miss.
      for (let j = 0; j < 9; j++) {
        const angle = (j * Math.PI) / 4,
          radius = j === 8 ? 0 : 0.06;
        const offset = new Vector3(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          0,
        ).applyEuler(new Euler(...layout.rotation));
        const ray = new Raycaster(
          before.clone().add(offset),
          after.clone().sub(before).normalize(),
          0,
          before.distanceTo(after),
        );
        assert.equal(
          ray.intersectObject(mesh).length,
          0,
          `${mobile ? "mobile" : "desktop"} ${symbol} ${quality}: lens must not collide with sculpture surfaces`,
        );
      }
      geometry.dispose();
      material.dispose();
    }
  }
}
console.log(
  "PASS: desktop/mobile keyframes, continuous reversible flight, split gateway, bamboo bow, carved aperture and petal-gap crossings, lens clearance at every quality, opaque geometry and authoritative camera rendering.",
);
