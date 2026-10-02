// Run once with internet:  npm run images
// Downloads every photo to /public/images, drops dead IDs from the report, and writes src/data/local-images.json
// so the site serves local files first. Needs Node 18+.
import { writeFile, readFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = await readFile(path.join(root, "src/data/images.js"), "utf8");
const ids = [...new Set([...src.matchAll(/photo-[0-9]{10,}-[0-9a-f]{12}/g)].map((m) => m[0]))];
const outDir = path.join(root, "public/images");
await mkdir(outDir, { recursive: true });

const map = {}, dead = [];
for (const id of ids) {
  const url = `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`;
  try {
    const r = await fetch(url, { redirect: "follow" });
    const type = r.headers.get("content-type") || "";
    if (!r.ok || !type.startsWith("image/")) throw new Error(`HTTP ${r.status} ${type}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.length < 5000) throw new Error("file too small");
    await writeFile(path.join(outDir, id + ".jpg"), buf);
    map[id] = `/images/${id}.jpg`;
    console.log("ok   ", id, Math.round(buf.length / 1024) + " KB");
  } catch (e) {
    dead.push(id);
    console.log("DEAD ", id, "-", e.message);
  }
}
await writeFile(path.join(root, "src/data/local-images.json"), JSON.stringify(map, null, 2) + "\n");
console.log(`\n${Object.keys(map).length} saved locally, ${dead.length} unavailable.`);
if (dead.length) console.log("Replace these IDs in src/data/images.js (galleryImages / SPARE_IDS):\n  " + dead.join("\n  "));
