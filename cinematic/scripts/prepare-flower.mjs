/** Pack locally evaluated CC0 petals with their original photographed texture. */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import sharp from "sharp";
const root = new URL("../", import.meta.url);
const directory = new URL("public/models/", root);
const input = new URL("asset-source/frangipani/", root);
const source = JSON.parse(
  await readFile(
    process.argv[2] || new URL("flower-meshes.json", input),
    "utf8",
  ),
);
await mkdir(directory, { recursive: true });
const manifest = {
  title: "Frangipani Flower",
  author: "elkid",
  authorUrl: "https://blendswap.com/profile/168722",
  source: "https://blendswap.com/blend/14800",
  license: "CC0 1.0",
  licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
  modifications:
    "Kept the five original petals, UVs and photographed petal texture; evaluated subdivision and thickness; removed source cameras/lights; centred and scaled the mesh, converted its legacy material to PBR, and resized/compressed the texture for three web detail levels.",
  blender: source.blender,
  normalisation: source.normalisation,
  gate: [0.2, 0.42],
  variants: {},
};
for (const [quality, resolution] of [
  ["high", 1024],
  ["medium", 768],
  ["low", 512],
]) {
  const j = {
    asset: {
      version: "2.0",
      generator: "Bali Bali CC0 flower preparation",
      copyright: "Frangipani Flower by elkid, CC0 1.0",
      extras: { source: manifest.source, license: manifest.licenseUrl },
    },
    scene: 0,
    scenes: [{ nodes: [] }],
    nodes: [],
    meshes: [],
    materials: [
      {
        name: "Original photographed petal",
        doubleSided: true,
        pbrMetallicRoughness: {
          baseColorTexture: { index: 0 },
          metallicFactor: 0,
          roughnessFactor: 0.55,
        },
      },
    ],
    textures: [{ sampler: 0, source: 0 }],
    samplers: [
      { magFilter: 9729, minFilter: 9987, wrapS: 33071, wrapT: 33071 },
    ],
    images: [],
    buffers: [],
    bufferViews: [],
    accessors: [],
  };
  const chunks = [];
  let offset = 0;
  const view = (bytes, target) => {
    const id = j.bufferViews.length;
    j.bufferViews.push({
      buffer: 0,
      byteOffset: offset,
      byteLength: bytes.byteLength,
      ...(target ? { target } : {}),
    });
    chunks.push(Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength));
    offset += bytes.byteLength;
    const pad = (4 - (offset % 4)) % 4;
    chunks.push(Buffer.alloc(pad));
    offset += pad;
    return id;
  };
  const accessor = (array, type, componentType, target) => {
    const n = { SCALAR: 1, VEC2: 2, VEC3: 3 }[type];
    const a = {
      bufferView: view(array, target),
      componentType,
      count: array.length / n,
      type,
    };
    if (type === "VEC3") {
      a.min = [0, 1, 2].map((k) =>
        Math.min(...Array.from(array).filter((_, i) => i % n === k)),
      );
      a.max = [0, 1, 2].map((k) =>
        Math.max(...Array.from(array).filter((_, i) => i % n === k)),
      );
    }
    j.accessors.push(a);
    return j.accessors.length - 1;
  };
  let triangles = 0,
    vertices = 0;
  for (const part of source.variants[quality]) {
    const positions = [],
      normals = [],
      uv = [],
      indices = [],
      unique = new Map();
    for (let i = 0; i < part.positions.length / 3; i++) {
      const p = part.positions.slice(i * 3, i * 3 + 3),
        n = part.normals.slice(i * 3, i * 3 + 3),
        t = part.uv.slice(i * 2, i * 2 + 2);
      const key = [...p, ...n, ...t].map((x) => Math.round(x * 1e6)).join(",");
      if (!unique.has(key)) {
        unique.set(key, positions.length / 3);
        positions.push(...p);
        normals.push(...n);
        uv.push(...t);
      }
      indices.push(unique.get(key));
    }
    const attributes = {
      POSITION: accessor(new Float32Array(positions), "VEC3", 5126, 34962),
      NORMAL: accessor(new Float32Array(normals), "VEC3", 5126, 34962),
      TEXCOORD_0: accessor(new Float32Array(uv), "VEC2", 5126, 34962),
    };
    const mesh = j.meshes.length;
    j.meshes.push({
      name: part.name,
      primitives: [
        {
          attributes,
          indices: accessor(new Uint16Array(indices), "SCALAR", 5123, 34963),
          material: 0,
          mode: 4,
        },
      ],
    });
    j.scenes[0].nodes.push(j.nodes.length);
    j.nodes.push({ mesh, name: part.name });
    vertices += positions.length / 3;
    triangles += indices.length / 3;
  }
  const photo = await sharp(new URL("petal-source.png", input).pathname)
    .resize(resolution, resolution)
    .flatten({ background: "#fff" })
    .jpeg({ quality: quality === "high" ? 90 : 84, mozjpeg: true })
    .toBuffer();
  j.images.push({ bufferView: view(photo), mimeType: "image/jpeg" });
  j.buffers.push({ byteLength: offset });
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
  const bytes = Buffer.concat([header, json, binHeader, ...chunks]);
  const file = `frangipani-${quality}.glb`;
  await writeFile(new URL(file, directory), bytes);
  manifest.variants[quality] = {
    file,
    triangles,
    vertices,
    textureResolution: resolution,
    bytes: bytes.length,
  };
  console.log(quality, manifest.variants[quality]);
}
await writeFile(
  new URL("lib/flower-model.json", root),
  JSON.stringify(manifest, null, 2) + "\n",
);
await writeFile(
  new URL("frangipani-ATTRIBUTION.txt", directory),
  `${manifest.title} by ${manifest.author}\n${manifest.source}\n${manifest.license}: ${manifest.licenseUrl}\nChanges: ${manifest.modifications}\n`,
);
