const assert = require("node:assert/strict");
const path = require("node:path");
const sharp = require("sharp");
const T = require("three");
const load = require("./load-ts.cjs");
const { fitGateway, sampleMobileGateway } = load(
  path.join(__dirname, "../lib/gateway-framing.ts"),
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
              Math.abs(p.x) < 0.95 &&
                Math.abs(p.y) < 0.95 &&
                p.z > -1 &&
                p.z < 1,
              `${quality}/${aspect}: complete gateway inside the normal-flow hero`,
            );
          }
      const samples = [];
      const material = new T.MeshBasicMaterial({ side: T.DoubleSide });
      const mesh = new T.Mesh(g, material);
      mesh.updateMatrixWorld();
      let previous;
      for (let i = 0; i <= 400; i++) {
        const view = sampleMobileGateway(i / 400, aspect);
        assert(
          view.position.every(Number.isFinite) &&
            view.target.every(Number.isFinite),
        );
        assert.equal(
          view.position[0],
          0,
          "camera remains centred on the split",
        );
        assert.equal(view.target[1], view.position[1], "camera remains level");
        assert(view.photoOpacity >= 0 && view.photoOpacity <= 1);
        if (previous) {
          const from = new T.Vector3(...previous.position),
            to = new T.Vector3(...view.position);
          assert(to.z <= from.z, "one continuous forward passage");
          const distance = from.distanceTo(to);
          if (distance > 1e-9)
            for (let j = 0; j < 9; j++) {
              const angle = (j * Math.PI) / 4,
                radius = j === 8 ? 0 : 0.008;
              const ray = new T.Raycaster(
                from
                  .clone()
                  .add(
                    new T.Vector3(
                      Math.cos(angle) * radius,
                      Math.sin(angle) * radius,
                      0,
                    ),
                  ),
                to.clone().sub(from).normalize(),
                0,
                distance,
              );
              assert.equal(
                ray.intersectObject(mesh).length,
                0,
                `${quality}/${aspect}: mobile camera clears the real gate`,
              );
            }
        }
        samples.push(JSON.stringify(view));
        previous = view;
      }
      for (let i = 400; i >= 0; i--)
        assert.equal(
          JSON.stringify(sampleMobileGateway(i / 400, aspect)),
          samples[i],
          "exact reverse sampling",
        );
      assert.equal(sampleMobileGateway(0, aspect).photoOpacity, 0);
      assert.equal(
        previous.photoOpacity,
        1,
        "food fills the final frame; no empty exit stage",
      );
      assert(
        previous.position[2] < g.boundingBox.min.z - 0.1,
        "camera exits behind both stone halves",
      );
      material.dispose();
    }
    g.dispose();
  }
  const poster = await sharp(
    path.join(__dirname, "../public/images/sculpture-gateway.webp"),
  ).metadata();
  assert.equal(poster.width, 600);
  assert.equal(poster.height, 600);
  console.log(
    "PASS: complete frontal gateway, single reversible camera passage with real mesh clearance, filled food handoff and loading poster.",
  );
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
