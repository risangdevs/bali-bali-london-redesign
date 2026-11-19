const assert = require("node:assert/strict");
const path = require("node:path");
const sharp = require("sharp");
const T = require("three");
const load = require("./load-ts.cjs");
const { fitGateway } = load(path.join(__dirname, "../lib/gateway-framing.ts"));
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
  console.log(
    "PASS: complete frontal gateway with safe dissolve zoom and uncropped 5:4 food endpoint.",
  );
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
