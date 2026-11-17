const fs = require("node:fs");
const path = require("node:path");
const { createRequire } = require("node:module");
const ts = require("typescript");
const vm = require("node:vm");
const modules = new Map();
function loadTS(filename) {
  filename = path.resolve(filename);
  if (modules.has(filename)) return modules.get(filename);
  const compiled = {};
  modules.set(filename, compiled);
  const nativeRequire = createRequire(filename);
  const output = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
  }).outputText;
  vm.runInNewContext(output, {
    exports: compiled,
    require: (id) => {
      const local = path.resolve(path.dirname(filename), `${id}.ts`);
      return id.startsWith(".") && fs.existsSync(local)
        ? loadTS(local)
        : nativeRequire(id);
    },
  });
  return compiled;
}

module.exports = loadTS;
