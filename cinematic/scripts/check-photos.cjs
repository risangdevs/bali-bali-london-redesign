const assert = require("node:assert/strict");
const path = require("node:path");
const T = require("three");
const load = require("./load-ts.cjs");
const {
  foodPhotos,
  sharingPhotos,
  heritagePhotos,
  bookingPhotos,
  sharingTilt,
} = load(path.join(__dirname, "../lib/photo-layout.ts"));
const { sampleCamera, cameraFov } = load(
  path.join(__dirname, "../lib/journey.ts"),
);
const { photoVisibility, photoFramingVisibility, photoFitScale } = load(
  path.join(__dirname, "../lib/motion.ts"),
);
const evaluate = (photo, p, mobile, sharing) => {
  const camera = new T.Vector3(),
    target = new T.Vector3();
  sampleCamera(p, camera, target, mobile);
  const parent = sharing
    ? new T.Matrix4().makeRotationX(sharingTilt(p))
    : new T.Matrix4();
  if (sharing) parent.setPosition(0, 0, -26);
  const matrix = new T.Matrix4()
    .compose(
      new T.Vector3(...photo.position),
      new T.Quaternion().setFromEuler(
        new T.Euler(...(photo.rotation || [0, 0, 0])),
      ),
      new T.Vector3(1, 1, 1),
    )
    .premultiply(parent);
  const center = new T.Vector3().setFromMatrixPosition(matrix),
    toLens = camera.clone().sub(center),
    normal = new T.Vector3(0, 0, 1).transformDirection(matrix),
    facing = normal.dot(toLens.clone().normalize()),
    depth = toLens.negate().dot(target.sub(camera).normalize());
  const aspect = mobile ? 402 / 874 : 1280 / 720,
    fov = cameraFov(mobile, aspect);
  let coverage =
    depth > 0
      ? Math.max(
          photo.size[0] /
            (2 * depth * Math.tan((fov * Math.PI) / 360) * aspect),
          photo.size[1] / (2 * depth * Math.tan((fov * Math.PI) / 360)),
        )
      : Infinity;
  const viewCamera = new T.PerspectiveCamera(fov, aspect, 0.04, 110);
  viewCamera.position.copy(camera);
  viewCamera.lookAt(camera.clone().add(target));
  viewCamera.updateMatrixWorld();
  const projected = center.clone().project(viewCamera);
  const fitScale = photo.fit
    ? photoFitScale(
        depth,
        ...photo.size,
        aspect,
        fov,
        projected.x,
        projected.y,
        Array.isArray(photo.fit) ? photo.fit[0] : undefined,
        Array.isArray(photo.fit) ? photo.fit[1] : undefined,
      )
    : 1;
  coverage *= fitScale;
  return {
    opacity:
      photoVisibility(p, photo.start, photo.end) *
      photoFramingVisibility(
        depth,
        photo.size[0] * fitScale,
        photo.size[1] * fitScale,
        aspect,
        fov,
        facing,
        projected.x,
        projected.y,
      ),
    depth,
    coverage,
    facing,
  };
};
for (const mobile of [false, true]) {
  for (const [kind, photos] of [
    ["food", foodPhotos(mobile)],
    ["sharing", sharingPhotos(mobile)],
    ["heritage", heritagePhotos(mobile)],
    ["booking", bookingPhotos(mobile)],
  ]) {
    for (const photo of photos) {
      assert(
        Math.abs(photo.size[0] / photo.size[1] - 1.25) < 1e-10,
        "photo plane retains original food-image aspect",
      );
      const samples = [];
      for (let i = 0; i <= 1000; i++) {
        const p = i / 1000,
          s = evaluate(photo, p, mobile, kind === "sharing");
        assert(
          Number.isFinite(s.opacity) &&
            s.opacity >= -1e-12 &&
            s.opacity <= 1 + 1e-12,
          `${photo.id} p=${p}: ${JSON.stringify(s)}`,
        );
        if (s.opacity > 0.001) {
          assert(s.depth > 0.3 && s.facing > 0.02);
          assert(
            s.coverage < 1.3,
            "fade before the camera enters an oversized photo",
          );
        }
        if (p <= 0.14)
          assert.equal(s.opacity, 0, "gateway lands without food overlays");
        if (kind === "sharing" && p <= 0.305)
          assert.equal(
            s.opacity,
            0,
            "sharing photos do not enter the food section",
          );
        if (kind === "heritage" && p >= 0.635)
          assert.equal(
            s.opacity,
            0,
            "heritage photos clear before the flower flight",
          );
        if (kind === "booking" && p <= 0.735)
          assert.equal(
            s.opacity,
            0,
            "final food waits until the flower crossing",
          );
        samples.push(s.opacity);
      }
      for (let i = 1000; i >= 0; i--)
        assert.equal(
          evaluate(photo, i / 1000, mobile, kind === "sharing").opacity,
          samples[i],
          "exact reversible framing under the rotating sharing table",
        );
    }
  }
  for (const [photos, p, sharing] of [
    [foodPhotos(mobile), 0.25, false],
    [sharingPhotos(mobile), 0.38, true],
    [sharingPhotos(mobile), 0.405, true],
    [sharingPhotos(mobile), 0.445, true],
    [heritagePhotos(mobile), 0.56, false],
    [bookingPhotos(mobile), 0.9, false],
  ]) {
    const view = evaluate(photos[0], p, mobile, sharing);
    assert(
      view.opacity > 0.3,
      `${mobile ? "mobile" : "desktop"} ${photos[0].id} must have a readable main image at its chapter`,
    );
  }
}
assert.equal(photoFramingVisibility(-1, 3, 2.4, 0.46, 51), 0);
assert.equal(photoFramingVisibility(0.1, 3, 2.4, 0.46, 51), 0);
assert.equal(photoFramingVisibility(8, 3, 2.4, 0.46, 51, -1), 0);
console.log(
  "PASS: chapter-aligned photo timing, correct image aspect, visible chapter compositions, close/backface guards and deterministic reverse framing.",
);
