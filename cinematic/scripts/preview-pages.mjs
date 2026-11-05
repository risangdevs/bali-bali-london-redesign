import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../../", import.meta.url));
const mime = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".ttf": "font/ttf",
  ".woff2": "font/woff2",
  ".md": "text/plain",
  ".txt": "text/plain",
};
createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname,
    ).replace(/^\/bali-bali-london-redesign/, "");
    let file = resolve(root, `.${pathname}`);
    if (
      (file !== resolve(root) && !file.startsWith(root)) ||
      pathname.split("/").some((s) => s.startsWith("."))
    ) {
      res.writeHead(403);
      res.end();
      return;
    }
    if ((await stat(file)).isDirectory()) file += sep + "index.html";
    res.writeHead(200, {
      "Content-Type": mime[extname(file)] || "application/octet-stream",
    });
    res.end(await readFile(file));
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
}).listen(4174, "127.0.0.1", () =>
  console.log(
    "Preview: http://127.0.0.1:4174/bali-bali-london-redesign/concept-d/",
  ),
);
