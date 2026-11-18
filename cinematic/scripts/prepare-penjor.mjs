/** Prepare the selected CC BY penjor locally, preserving its original ornaments. */
import { writeFile, mkdir } from "node:fs/promises";
import { Matrix4, Matrix3, Vector3, Quaternion, Box3 } from "three";
import { MeshoptSimplifier } from "meshoptimizer";
import { readGlb, accessorData } from "./gateway-source.mjs";
const root = new URL("../", import.meta.url);
const source = await readGlb(
  process.argv[2] || new URL("asset-source/penjor/source.glb", root),
);
const parts = [],
  bounds = new Box3();
const visit = (id, parent) => {
  const node = source.json.nodes[id];
  const matrix = node.matrix
    ? new Matrix4().fromArray(node.matrix)
    : new Matrix4().compose(
        new Vector3(...(node.translation || [0, 0, 0])),
        new Quaternion(...(node.rotation || [0, 0, 0, 1])),
        new Vector3(...(node.scale || [1, 1, 1])),
      );
  matrix.premultiply(parent);
  const normalMatrix = new Matrix3().getNormalMatrix(matrix);
  if (node.mesh !== undefined)
    for (const primitive of source.json.meshes[node.mesh].primitives) {
      const positions = accessorData(source, primitive.attributes.POSITION),
        normals = accessorData(source, primitive.attributes.NORMAL);
      for (let i = 0; i < positions.length; i += 3) {
        const v = new Vector3(...positions.subarray(i, i + 3)).applyMatrix4(
          matrix,
        );
        positions.set(v.toArray(), i);
        bounds.expandByPoint(v);
        normals.set(
          new Vector3(...normals.subarray(i, i + 3))
            .applyMatrix3(normalMatrix)
            .normalize()
            .toArray(),
          i,
        );
      }
      parts.push({
        name: node.name,
        material: primitive.material,
        positions,
        normals,
        uv: accessorData(source, primitive.attributes.TEXCOORD_0),
        indices: accessorData(source, primitive.indices),
      });
    }
  for (const child of node.children || []) visit(child, matrix);
};
for (const node of source.json.scenes[source.json.scene || 0].nodes)
  visit(node, new Matrix4());
const origin = bounds.getCenter(new Vector3()).toArray(),
  height = bounds.max.y - bounds.min.y;
for (const p of parts)
  for (let i = 0; i < p.positions.length; i++)
    p.positions[i] = (p.positions[i] - origin[i % 3]) / height;
await MeshoptSimplifier.ready;
const output = new URL("public/models/", root);
await mkdir(output, { recursive: true });
const manifest = {
  title: "Balinese Penjor",
  author: "alterego.visual",
  authorUrl: "https://sketchfab.com/alterego.visual",
  source:
    "https://sketchfab.com/3d-models/balinese-penjor-7aca638e85d04c1699c04918cdc36a9e",
  license: "CC BY 4.0",
  licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
  modifications:
    "Baked original node transforms, centred and scaled the complete bamboo bow and ornaments, and simplified geometry into three web detail levels. Original material colours and ornament arrangement retained.",
  sourceTriangles: parts.reduce((n, p) => n + p.indices.length / 3, 0),
  normalisation: { origin, height },
  gate: [0, 0.02],
  variants: {},
};
for (const [quality, ratio, error] of [
  ["high", 0.65, 0.0006],
  ["medium", 0.35, 0.0015],
  ["low", 0.16, 0.003],
]) {
  const j = {
    asset: {
      version: "2.0",
      generator: "Bali Bali licensed penjor preparation",
      copyright: "Balinese Penjor by alterego.visual, CC BY 4.0",
    },
    scene: 0,
    scenes: [{ nodes: [] }],
    nodes: [],
    meshes: [],
    materials: structuredClone(source.json.materials),
    buffers: [],
    bufferViews: [],
    accessors: [],
  };
  let offset = 0,
    triangles = 0,
    vertices = 0;
  const chunks = [];
  const view = (data, target) => {
    const id = j.bufferViews.length;
    j.bufferViews.push({
      buffer: 0,
      byteOffset: offset,
      byteLength: data.byteLength,
      ...(target ? { target } : {}),
    });
    chunks.push(Buffer.from(data.buffer, data.byteOffset, data.byteLength));
    offset += data.byteLength;
    const pad = (4 - (offset % 4)) % 4;
    chunks.push(Buffer.alloc(pad));
    offset += pad;
    return id;
  };
  const accessor = (data, type, componentType, target) => {
    const n = { SCALAR: 1, VEC2: 2, VEC3: 3 }[type],
      a = {
        bufferView: view(data, target),
        componentType,
        count: data.length / n,
        type,
      };
    if (type === "VEC3") {
      a.min = [0, 1, 2].map((k) => {
        let min = Infinity;
        for (let i = k; i < data.length; i += 3) min = Math.min(min, data[i]);
        return min;
      });
      a.max = [0, 1, 2].map((k) => {
        let max = -Infinity;
        for (let i = k; i < data.length; i += 3) max = Math.max(max, data[i]);
        return max;
      });
    }
    j.accessors.push(a);
    return j.accessors.length - 1;
  };
  for (const p of parts) {
    const [simplified] = MeshoptSimplifier.simplify(
      p.indices,
      p.positions,
      3,
      Math.floor((p.indices.length * ratio) / 3) * 3,
      error,
      ["LockBorder"],
    );
    const indices = simplified.slice(),
      [remap, count] = MeshoptSimplifier.compactMesh(indices);
    const compact = (data, n) => {
      const result = new Float32Array(count * n);
      for (let i = 0; i < remap.length; i++)
        if (remap[i] !== 0xffffffff)
          for (let k = 0; k < n; k++)
            result[remap[i] * n + k] = data[i * n + k];
      return result;
    };
    const attributes = {
      POSITION: accessor(compact(p.positions, 3), "VEC3", 5126, 34962),
      NORMAL: accessor(compact(p.normals, 3), "VEC3", 5126, 34962),
      TEXCOORD_0: accessor(compact(p.uv, 2), "VEC2", 5126, 34962),
    };
    const mesh = j.meshes.length;
    j.meshes.push({
      name: p.name,
      primitives: [
        {
          attributes,
          indices: accessor(new Uint16Array(indices), "SCALAR", 5123, 34963),
          material: p.material,
          mode: 4,
        },
      ],
    });
    j.scenes[0].nodes.push(j.nodes.length);
    j.nodes.push({ name: p.name, mesh });
    triangles += indices.length / 3;
    vertices += count;
  }
  j.buffers = [{ byteLength: offset }];
  const raw = Buffer.from(JSON.stringify(j)),
    json = Buffer.concat([raw, Buffer.alloc((4 - (raw.length % 4)) % 4, 32)]),
    header = Buffer.alloc(20),
    binHeader = Buffer.alloc(8);
  header.write("glTF");
  header.writeUInt32LE(2, 4);
  header.writeUInt32LE(28 + json.length + offset, 8);
  header.writeUInt32LE(json.length, 12);
  header.writeUInt32LE(0x4e4f534a, 16);
  binHeader.writeUInt32LE(offset);
  binHeader.writeUInt32LE(0x004e4942, 4);
  const bytes = Buffer.concat([header, json, binHeader, ...chunks]),
    file = `penjor-${quality}.glb`;
  await writeFile(new URL(file, output), bytes);
  manifest.variants[quality] = {
    file,
    triangles,
    vertices,
    bytes: bytes.length,
  };
  console.log(quality, manifest.variants[quality]);
}
await writeFile(
  new URL("lib/penjor-model.json", root),
  JSON.stringify(manifest, null, 2) + "\n",
);
await writeFile(
  new URL("penjor-ATTRIBUTION.txt", output),
  `${manifest.title} by ${manifest.author}\n${manifest.authorUrl}\n${manifest.source}\n${manifest.license}: ${manifest.licenseUrl}\nChanges: ${manifest.modifications}\n`,
);
