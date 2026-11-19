/** Offline preparation of the licensed Sketchfab source. Never fetches credentials. */
import { writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { MeshoptSimplifier } from "meshoptimizer";
import { readGlb, accessorData } from "./gateway-source.mjs";
const root = new URL("../", import.meta.url);
const sourcePath =
  process.argv[2] ||
  fileURLToPath(new URL("asset-source/candi-bentar/source-4k.glb", root));
const source = await readGlb(sourcePath);
await MeshoptSimplifier.ready;
const parts = source.json.meshes.flatMap((m) =>
  m.primitives.map((p) => ({
    material: p.material,
    positions: accessorData(source, p.attributes.POSITION),
    normals: accessorData(source, p.attributes.NORMAL),
    uv: accessorData(source, p.attributes.TEXCOORD_0),
    indices: accessorData(source, p.indices),
  })),
);
// Weld only for connected-component classification, retaining the original UV seams.
const parents = [],
  weld = new Map();
const find = (a) => {
  while (parents[a] !== a) {
    parents[a] = parents[parents[a]];
    a = parents[a];
  }
  return a;
};
const union = (a, b) => {
  a = find(a);
  b = find(b);
  if (a !== b) parents[b] = a;
};
for (const p of parts) {
  p.ids = [];
  for (let i = 0; i < p.positions.length; i += 3) {
    const key = Array.from(p.positions.subarray(i, i + 3), (x) =>
      Math.round(x * 1e5),
    ).join(",");
    if (!weld.has(key)) {
      weld.set(key, parents.length);
      parents.push(parents.length);
    }
    p.ids.push(weld.get(key));
  }
  for (let i = 0; i < p.indices.length; i += 3) {
    union(p.ids[p.indices[i]], p.ids[p.indices[i + 1]]);
    union(p.ids[p.indices[i]], p.ids[p.indices[i + 2]]);
  }
}
const counts = new Map();
for (const p of parts)
  for (let i = 0; i < p.indices.length; i += 3) {
    const r = find(p.ids[p.indices[i]]);
    counts.set(r, (counts.get(r) || 0) + 1);
  }
const main = [...counts].sort((a, b) => b[1] - a[1])[0][0];
for (const p of parts) {
  const keep = [];
  for (let i = 0; i < p.indices.length; i += 3) {
    const ids = Array.from(p.indices.subarray(i, i + 3));
    const centroid = [0, 1, 2].map(
      (a) => ids.reduce((n, k) => n + p.positions[k * 3 + a], 0) / 3,
    );
    // Retain the gateway and stairs; crop peripheral vegetation and empty scan ground.
    if (
      find(p.ids[ids[0]]) === main &&
      centroid[0] >= -0.255 &&
      centroid[0] <= -0.015 &&
      centroid[2] >= -0.72 &&
      centroid[2] <= -0.31 &&
      centroid[1] >= 0.54
    )
      keep.push(...ids);
  }
  p.indices = new Uint32Array(keep);
}
const height = 1.0087003707885742 - 0.5339316129684448;
const origin = [-0.134, (1.0087003707885742 + 0.5339316129684448) / 2, -0.54];
for (const p of parts)
  for (let i = 0; i < p.positions.length; i++)
    p.positions[i] = (p.positions[i] - origin[i % 3]) / height;
const directory = new URL("public/models/", root);
await mkdir(directory, { recursive: true });
const manifest = {
  title: "Candi Bentar",
  author: "nusaheritage.id",
  authorUrl: "https://sketchfab.com/nusaheritage",
  source:
    "https://sketchfab.com/3d-models/candi-bentar-9051dc244c984da8a1a4ec7e90e1a567",
  license: "CC BY 4.0",
  licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
  modifications:
    "Removed detached scan fragments and peripheral vegetation/ground; normalised the mesh around its passage; simplified geometry and resized/recompressed textures.",
  sourceTriangles: 123538,
  normalisation: { origin, height },
  gate: [0, (0.8 - origin[1]) / height],
  variants: {},
};
for (const [quality, ratio, error, resolution] of [
  ["high", 0.7, 0.001, 4096],
  ["medium", 0.45, 0.002, 1024],
  ["low", 0.25, 0.004, 768],
]) {
  const j = {
    asset: {
      version: "2.0",
      generator: "Bali Bali licensed gateway preparation",
      copyright: "Candi Bentar by nusaheritage.id, CC BY 4.0",
    },
    scene: 0,
    scenes: [{ nodes: [] }],
    nodes: [],
    meshes: [],
    materials: structuredClone(source.json.materials),
    textures: structuredClone(source.json.textures),
    samplers: structuredClone(source.json.samplers),
    images: [],
    buffers: [],
    bufferViews: [],
    accessors: [],
  };
  let offset = 0;
  const chunks = [];
  const addView = (data, target) => {
    const index = j.bufferViews.length;
    j.bufferViews.push({
      buffer: 0,
      byteOffset: offset,
      byteLength: data.byteLength,
      ...(target ? { target } : {}),
    });
    chunks.push(Buffer.from(data.buffer, data.byteOffset, data.byteLength));
    offset += data.byteLength;
    const pad = (4 - (offset % 4)) % 4;
    if (pad) {
      chunks.push(Buffer.alloc(pad));
      offset += pad;
    }
    return index;
  };
  const addAccessor = (data, type, componentType, target) => {
    const n = { SCALAR: 1, VEC2: 2, VEC3: 3 }[type];
    const a = {
      bufferView: addView(data, target),
      componentType,
      count: data.length / n,
      type,
    };
    if (type === "VEC3") {
      a.min = [0, 1, 2].map((k) => {
        let v = Infinity;
        for (let i = k; i < data.length; i += n) v = Math.min(v, data[i]);
        return v;
      });
      a.max = [0, 1, 2].map((k) => {
        let v = -Infinity;
        for (let i = k; i < data.length; i += n) v = Math.max(v, data[i]);
        return v;
      });
    }
    j.accessors.push(a);
    return j.accessors.length - 1;
  };
  let triangles = 0,
    vertices = 0;
  for (const p of parts) {
    const [simplified] = MeshoptSimplifier.simplify(
      p.indices,
      p.positions,
      3,
      Math.floor((p.indices.length * ratio) / 3) * 3,
      error,
      ["LockBorder"],
    );
    const indices = simplified.slice();
    const [remap, count] = MeshoptSimplifier.compactMesh(indices);
    const compact = (data, n) => {
      const out = new Float32Array(count * n);
      for (let i = 0; i < remap.length; i++)
        if (remap[i] !== 0xffffffff)
          for (let k = 0; k < n; k++) out[remap[i] * n + k] = data[i * n + k];
      return out;
    };
    const positions = compact(p.positions, 3),
      normals = compact(p.normals, 3),
      uv = compact(p.uv, 2);
    const primitive = {
      attributes: {
        POSITION: addAccessor(positions, "VEC3", 5126, 34962),
        NORMAL: addAccessor(normals, "VEC3", 5126, 34962),
        TEXCOORD_0: addAccessor(uv, "VEC2", 5126, 34962),
      },
      indices: addAccessor(new Uint16Array(indices), "SCALAR", 5123, 34963),
      material: p.material,
      mode: 4,
    };
    const mesh = j.meshes.length;
    j.meshes.push({ name: `candi-stone-${mesh}`, primitives: [primitive] });
    j.scenes[0].nodes.push(j.nodes.length);
    j.nodes.push({ mesh, name: `candi-stone-${mesh}` });
    triangles += indices.length / 3;
    vertices += count;
  }
  for (const image of source.json.images) {
    const view = source.json.bufferViews[image.bufferView];
    const bytes = source.bin.subarray(
      view.byteOffset || 0,
      (view.byteOffset || 0) + view.byteLength,
    );
    const jpeg = await sharp(bytes)
      .resize({
        width: resolution,
        height: resolution,
        fit: "inside",
        withoutEnlargement: true,
      })
      .jpeg({ quality: quality === "high" ? 86 : 78, mozjpeg: true })
      .toBuffer();
    j.images.push({ bufferView: addView(jpeg), mimeType: "image/jpeg" });
  }
  j.buffers = [{ byteLength: offset }];
  const raw = Buffer.from(JSON.stringify(j));
  const json = Buffer.concat([
    raw,
    Buffer.alloc((4 - (raw.length % 4)) % 4, 32),
  ]);
  const header = Buffer.alloc(20);
  header.write("glTF");
  header.writeUInt32LE(2, 4);
  header.writeUInt32LE(28 + json.length + offset, 8);
  header.writeUInt32LE(json.length, 12);
  header.writeUInt32LE(0x4e4f534a, 16);
  const binHeader = Buffer.alloc(8);
  binHeader.writeUInt32LE(offset);
  binHeader.writeUInt32LE(0x004e4942, 4);
  const result = Buffer.concat([header, json, binHeader, ...chunks]);
  // A new URL prevents browsers/CDNs from retaining the former 1536px model.
  const file =
    quality === "high"
      ? "candi-bentar-high-4k.glb"
      : `candi-bentar-${quality}.glb`;
  await writeFile(new URL(file, directory), result);
  manifest.variants[quality] = {
    file,
    triangles,
    vertices,
    textureResolution: resolution,
    bytes: result.length,
  };
  console.log(quality, manifest.variants[quality]);
}
await writeFile(
  new URL("lib/gateway-model.json", root),
  JSON.stringify(manifest, null, 2) + "\n",
);
await writeFile(
  new URL("ATTRIBUTION.txt", directory),
  `${manifest.title} by ${manifest.author}\n${manifest.authorUrl}\n${manifest.source}\nLicensed under ${manifest.license}: ${manifest.licenseUrl}\nChanges: ${manifest.modifications}\n`,
);
