#!/usr/bin/env node
/**
 * Generates src/lib/blur-data.json: a 16px, quality 1 JPEG of every
 * photograph in content.ts, inlined as a data URL, keyed by the delivery URL.
 *
 *   npm run images:blur
 *
 * Run it whenever a photograph is added to content.ts, and commit the JSON.
 * It is committed rather than built on Vercel so a Cloudinary hiccup can
 * never fail a deploy. Each placeholder is a few hundred bytes.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { CLOUD_BASE, contentPaths, withTransform, pool } from "./cloudinary-paths.mjs";

const out = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "src", "lib", "blur-data.json");
const paths = contentPaths();
const map = {};
let failed = 0;

await pool(paths, 6, async (p) => {
  const src = CLOUD_BASE + p;
  const url = withTransform(src, "w_16,e_blur:1000,q_1,f_jpg");
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("HTTP " + res.status);
    const buf = Buffer.from(await res.arrayBuffer());
    map[src] = "data:image/jpeg;base64," + buf.toString("base64");
  } catch (err) {
    failed++;
    console.log("  FAIL  " + p + "  " + (err instanceof Error ? err.message : err));
  }
});

const sorted = Object.fromEntries(Object.entries(map).sort(([a], [b]) => a.localeCompare(b)));
fs.writeFileSync(out, JSON.stringify(sorted, null, 2) + "\n");
const bytes = fs.statSync(out).size;
console.log(`${Object.keys(sorted).length} placeholders written to src/lib/blur-data.json (${Math.round(bytes / 1024)} kB)`);
process.exit(failed ? 1 : 0);
