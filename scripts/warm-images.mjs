#!/usr/bin/env node
/**
 * Asks Cloudinary for every size of every photograph once, so the derived
 * images exist and are edge cached before any visitor asks.
 *
 *   npm run images:warm
 *
 * A cold transformation costs a visitor one to two seconds; a warm one is a
 * cache hit. Cloudinary stores derived images once generated, so this holds
 * until a photograph changes. Run it after adding photographs, and after any
 * change to deviceSizes or imageSizes in next.config.ts, which must match
 * the widths listed here.
 */
import { CLOUD_BASE, contentPaths, withTransform, pool } from "./cloudinary-paths.mjs";

const WIDTHS = [64, 96, 128, 160, 256, 384, 640, 750, 828, 1080, 1280];
const ACCEPTS = [
  "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
  "image/webp,image/apng,image/*,*/*;q=0.8",
];

const jobs = [];
for (const p of contentPaths()) {
  for (const w of WIDTHS) {
    for (const accept of ACCEPTS) {
      jobs.push({ url: withTransform(CLOUD_BASE + p, `f_auto,q_auto,c_limit,w_${w}`), accept });
    }
  }
}

const started = Date.now();
let ok = 0;
let failed = 0;
let bytes = 0;
await pool(jobs, 8, async (job) => {
  try {
    const res = await fetch(job.url, { headers: { Accept: job.accept } });
    if (!res.ok) throw new Error("HTTP " + res.status);
    bytes += Number(res.headers.get("content-length") ?? 0);
    await res.arrayBuffer();
    ok++;
  } catch (err) {
    failed++;
    console.log("  FAIL  " + job.url.slice(CLOUD_BASE.length) + "  " + (err instanceof Error ? err.message : err));
  }
});

console.log(`warmed ${ok} of ${jobs.length} derived images in ${Math.round((Date.now() - started) / 1000)}s (${Math.round(bytes / 1024 / 1024)} MB served)`);
process.exit(failed ? 1 : 0);
