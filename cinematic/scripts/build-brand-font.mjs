import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { TTFLoader } from "three/addons/loaders/TTFLoader.js";
// Derive four glyphs from the site's licensed Cormorant Garamond font.
// Keep runtime free of TTF parsing and additional font requests.
const fontPath = fileURLToPath(
  new URL("../public/fonts/editorial.ttf", import.meta.url),
);
const buffer = readFileSync(fontPath);
const data = new TTFLoader().parse(
  buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength),
);
data.glyphs = Object.fromEntries(
  [..."BALI? "]
    .map((letter) => [letter, data.glyphs[letter]])
    .filter(([, glyph]) => glyph),
);
for (const glyph of Object.values(data.glyphs)) {
  if (!Number.isFinite(glyph.x_min)) glyph.x_min = 0;
  if (!Number.isFinite(glyph.x_max)) glyph.x_max = 0;
}
data.original_font_information = {
  source: "public/fonts/editorial.ttf",
  license:
    "SIL Open Font License; see public/fonts/CormorantGaramond-LICENSE.txt",
};
writeFileSync(
  new URL("../lib/bali-editorial.typeface.json", import.meta.url),
  JSON.stringify(data) + "\n",
);
console.log(
  `Generated ${Object.keys(data.glyphs).join(", ")} from ${data.familyName}. License: public/fonts/CormorantGaramond-LICENSE.txt`,
);
