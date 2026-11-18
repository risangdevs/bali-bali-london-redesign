const fs = require("node:fs");
const path = require("node:path");
const { BufferGeometry, BufferAttribute } = require("three");
const {
  mergeGeometries,
} = require("three/addons/utils/BufferGeometryUtils.js");
const manifest = require("../lib/gateway-model.json");
module.exports = function gatewayGeometry(quality) {
  const bytes = fs.readFileSync(
    path.join(__dirname, "../public/models", manifest.variants[quality].file),
  );
  const length = bytes.readUInt32LE(12),
    json = JSON.parse(bytes.subarray(20, 20 + length)),
    bin = bytes.subarray(28 + length);
  const data = (index) => {
    const a = json.accessors[index],
      view = json.bufferViews[a.bufferView],
      start = (view.byteOffset || 0) + (a.byteOffset || 0);
    const Type =
      a.componentType === 5126
        ? Float32Array
        : a.componentType === 5123
          ? Uint16Array
          : Uint32Array;
    const n = { SCALAR: 1, VEC2: 2, VEC3: 3 }[a.type];
    const copy = Buffer.from(
      bin.subarray(start, start + a.count * n * Type.BYTES_PER_ELEMENT),
    );
    return new Type(
      copy.buffer.slice(copy.byteOffset, copy.byteOffset + copy.byteLength),
    );
  };
  const parts = json.meshes.flatMap((m) =>
    m.primitives.map((p) => {
      const g = new BufferGeometry();
      g.setAttribute(
        "position",
        new BufferAttribute(data(p.attributes.POSITION), 3),
      );
      g.setIndex(new BufferAttribute(data(p.indices), 1));
      return g;
    }),
  );
  const geometry = mergeGeometries(parts, false);
  parts.forEach((g) => g.dispose());
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();
  return geometry;
};
