const geometry = require("./prepared-model-mesh.cjs");
const manifest = require("../lib/flower-model.json");
module.exports = (quality) => geometry(manifest.variants[quality].file);
