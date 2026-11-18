import { readFile } from "node:fs/promises";
import {
  BufferGeometry,
  BufferAttribute,
  Mesh,
  MeshBasicMaterial,
  DoubleSide,
} from "three";
export async function readGlb(path) {
  const data = await readFile(path);
  if (data.toString("utf8", 0, 4) !== "glTF") throw new Error("Expected GLB");
  const length = data.readUInt32LE(12);
  return {
    json: JSON.parse(data.subarray(20, 20 + length).toString()),
    bin: data.subarray(28 + length),
  };
}
export function accessorData({ json, bin }, index) {
  const a = json.accessors[index],
    v = json.bufferViews[a.bufferView];
  const ArrayType = {
    5126: Float32Array,
    5125: Uint32Array,
    5123: Uint16Array,
    5121: Uint8Array,
  }[a.componentType];
  const n = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4 }[a.type];
  const start = (v.byteOffset || 0) + (a.byteOffset || 0),
    stride = v.byteStride || n * ArrayType.BYTES_PER_ELEMENT;
  const out = new ArrayType(a.count * n);
  for (let i = 0; i < a.count; i++)
    for (let k = 0; k < n; k++) {
      const offset = start + i * stride + k * ArrayType.BYTES_PER_ELEMENT;
      out[i * n + k] =
        a.componentType === 5126
          ? bin.readFloatLE(offset)
          : a.componentType === 5125
            ? bin.readUInt32LE(offset)
            : a.componentType === 5123
              ? bin.readUInt16LE(offset)
              : bin.readUInt8(offset);
    }
  return out;
}
export function sourceMeshes(source) {
  const material = new MeshBasicMaterial({ side: DoubleSide });
  return source.json.meshes.flatMap((m) =>
    m.primitives.map((p) => {
      const g = new BufferGeometry();
      g.setAttribute(
        "position",
        new BufferAttribute(accessorData(source, p.attributes.POSITION), 3),
      );
      if (p.attributes.NORMAL !== undefined)
        g.setAttribute(
          "normal",
          new BufferAttribute(accessorData(source, p.attributes.NORMAL), 3),
        );
      g.setIndex(new BufferAttribute(accessorData(source, p.indices), 1));
      g.computeBoundingBox();
      g.computeBoundingSphere();
      const mesh = new Mesh(g, material);
      mesh.updateMatrixWorld();
      return mesh;
    }),
  );
}
