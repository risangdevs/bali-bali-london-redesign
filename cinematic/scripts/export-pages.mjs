import { spawnSync } from "node:child_process";
import { cpSync, mkdirSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
// Use the active Node runtime; a global npm binary is not needed for export.
const nextCli = fileURLToPath(
  new URL("../node_modules/next/dist/bin/next", import.meta.url),
);
const result = spawnSync(process.execPath, [nextCli, "build", "--webpack"], {
  cwd: root,
  stdio: "inherit",
  env: {
    ...process.env,
    NEXT_PUBLIC_BASE_PATH: "/bali-bali-london-redesign/concept-d",
  },
});
if (result.status !== 0) process.exit(result.status || 1);
const target = fileURLToPath(new URL("../../concept-d/", import.meta.url));
// Replace generated output only after a successful build; remove stale hashed chunks.
rmSync(target, { recursive: true, force: true });
mkdirSync(target, { recursive: true });
cpSync(`${root}out`, target, { recursive: true });
console.log("GitHub Pages export ready at concept-d/");
