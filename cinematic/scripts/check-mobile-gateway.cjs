const assert = require("node:assert/strict");
const path = require("node:path");
const sharp = require("sharp");
const T = require("three");
const load = require("./load-ts.cjs");
const { fitGateway } = load(path.join(__dirname, "../lib/gateway-framing.ts"));
const { sampleGatewayEntrance } = load(
  path.join(__dirname, "../lib/mobile-gateway-motion.ts"),
);
const bounds = require("../lib/sculpture-bounds.json").gateway;
const geometry = require("./gateway-mesh.cjs");

(async () => {
  for (const quality of ["low", "medium", "high"]) {
    const g = geometry(quality);
    g.computeBoundingBox();
    for (const axis of ["x", "y", "z"]) {
      const i = ["x", "y", "z"].indexOf(axis);
      assert(g.boundingBox.min[axis] >= bounds.min[i] - 1e-6);
      assert(g.boundingBox.max[axis] <= bounds.max[i] + 1e-6);
    }
    for (const aspect of [0.4, 0.65, 1, 1.78, 3.2]) {
      const view = fitGateway(aspect);
      const camera = new T.PerspectiveCamera(view.fov, aspect, 0.01, 30);
      assert.equal(view.center[0], 0, "gateway split stays on the centreline");
      camera.position.set(
        view.center[0],
        view.center[1],
        view.center[2] + view.distance,
      );
      camera.lookAt(...view.center);
      camera.updateMatrixWorld();
      for (const x of [bounds.min[0], bounds.max[0]])
        for (const y of [bounds.min[1], bounds.max[1]])
          for (const z of [bounds.min[2], bounds.max[2]]) {
            const p = new T.Vector3(x, y, z).project(camera);
            assert(
              Math.abs(p.x) * 1.045 < 0.95 &&
                Math.abs(p.y) * 1.045 < 0.95 &&
                p.z > -1 &&
                p.z < 1,
              `${quality}/${aspect}: complete gateway inside the normal-flow hero`,
            );
          }
    }
    g.dispose();
  }
  const poster = await sharp(
    path.join(__dirname, "../public/images/sculpture-gateway.webp"),
  ).metadata();
  assert.equal(poster.width, 600);
  assert.equal(poster.height, 600);
  const food = await sharp(
    path.join(__dirname, "../public/images/sharing.webp"),
  ).metadata();
  assert.equal(
    food.width / food.height,
    5 / 4,
    "food fits the normal-flow stage without cropping",
  );
  for (const side of ["left", "right"]) {
    const filename = path.join(
      __dirname,
      `../public/images/gateway-${side}.webp`,
    );
    const meta = await sharp(filename).metadata();
    assert.equal(meta.width, 1000);
    assert.equal(meta.height, 800);
    assert(meta.hasAlpha, "transparent original model render");
    assert(
      require("node:fs").statSync(filename).size < 150000,
      "bounded mobile layer download",
    );
    const { data, info } = await sharp(filename)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    let opaque = 0,
      wrongHalf = 0;
    for (let y = 0; y < info.height; y++)
      for (let x = 0; x < info.width; x++) {
        const alpha = data[(y * info.width + x) * 4 + 3];
        if (alpha < 32) continue;
        opaque++;
        if ((side === "left" && x > 501) || (side === "right" && x < 498))
          wrongHalf++;
      }
    assert(
      opaque > 15000 && opaque < 160000,
      "intact stone with transparent surrounding space",
    );
    assert.equal(wrongHalf, 0, "layer is clipped at the real central plane");
  }
  const first = sampleGatewayEntrance(0),
    last = sampleGatewayEntrance(1);
  assert.equal(first.scale, 1);
  assert.equal(first.shift, 0);
  assert.equal(first.stoneOpacity, 1);
  assert.equal(first.photoOpacity, 0);
  assert.equal(last.stoneOpacity, 0);
  assert.equal(last.photoOpacity, 1);
  assert(
    Math.hypot(0.5 / (0.28 * last.aperture), 0.55 / (0.43 * last.aperture)) <
      0.65,
    "final aperture fully reveals all photo corners",
  );
  let previous = first;
  const samples = [];
  for (let i = 0; i <= 500; i++) {
    const view = sampleGatewayEntrance(i / 500);
    assert(Object.values(view).every(Number.isFinite));
    assert(view.scale >= previous.scale && view.shift >= previous.shift);
    assert(
      view.stoneOpacity <= previous.stoneOpacity &&
        view.photoOpacity >= previous.photoOpacity,
    );
    assert(Math.abs(view.scale - previous.scale) < 0.02, "continuous approach");
    assert(
      view.aperture * view.photoScale >= 0.96 - 1e-9 &&
        view.aperture * view.photoScale <= 1 + 1e-9,
      "aperture never enlarges or crops the food",
    );
    samples.push(view);
    previous = view;
  }
  for (let i = 500; i >= 0; i--)
    assert.deepEqual(
      sampleGatewayEntrance(i / 500),
      samples[i],
      "exact reverse scroll framing",
    );
  console.log(
    "PASS: complete original gateway, transparent stone layers, continuous reversible entrance and fully uncropped photo endpoint.",
  );
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
