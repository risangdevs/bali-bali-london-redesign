import { spawnSync } from "node:child_process";
import { cpSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
const result = spawnSync("npm", ["run", "build"], {
  cwd: root,
  stdio: "inherit",
  env: {
    ...process.env,
    NEXT_PUBLIC_BASE_PATH: "/bali-bali-london-redesign/concept-d",
  },
});
if (result.status !== 0) process.exit(result.status || 1);
const target = fileURLToPath(new URL("../../concept-d/", import.meta.url));
mkdirSync(target, { recursive: true });
cpSync(`${root}out`, target, { recursive: true });
console.log("GitHub Pages export ready at concept-d/");
