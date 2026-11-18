const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "../../concept-d");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
for (const id of [
  "first-taste",
  "the-table",
  "rijsttafel",
  "our-story",
  "west-end",
  "visit",
])
  assert(html.includes(`id="${id}"`), `real native chapter target ${id}`);
assert.equal(
  (html.match(/class="editorial-photo"/g) || []).length,
  4,
  "four complete food photos in their own figure elements",
);
assert.equal(
  (html.match(/data-sculpture="/g) || []).length,
  4,
  "four independent cultural stages",
);
assert(
  !html.includes('class="scroll-track"') && !html.includes('class="scene-copy'),
  "editorial content is not mounted inside the old clipped stage",
);
for (const name of ["gateway", "penjor", "foliage", "jepun"]) {
  assert(html.includes(`sculpture-${name}.webp`));
  assert(
    fs.statSync(path.join(root, "images", `sculpture-${name}.webp`)).size >
      1000,
  );
}
for (const text of [
  "Find us",
  "Opening hours",
  "12:00 to 22:00",
  "13:00 to 21:30",
  "3D asset credits",
])
  assert(
    html.includes(text),
    `complete server-rendered visit content: ${text}`,
  );
assert(
  html.includes('width="550" height="440"'),
  "intrinsic photo aspect reserves full image space",
);
console.log(
  "PASS: native chapter targets, all full photos, independent 3D stages/posters and complete visit details in the static export.",
);
