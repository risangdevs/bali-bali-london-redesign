const geometry = require("./prepared-model-mesh.cjs");
const manifest = require("../lib/gateway-model.json");
module.exports = (quality) => geometry(manifest.variants[quality].file);
