#!/usr/bin/env node
/**
 * Verifies that every Fontshare URL in globals.css still resolves.
 *
 * Satoshi and Bespoke Serif cannot be committed to this public repository
 * (their licence forbids redistribution), so globals.css points at
 * Fontshare's CDN. Those URLs are content hashed and have been stable, but a
 * rotation would replace the whole typographic system with a system fallback
 * and nothing would break loudly. This makes it break loudly.
 *
 *   node scripts/check-fonts.mjs
 *
 * Exit code 1 if any face is unreachable.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const css = fs.readFileSync(
  path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "src", "app", "globals.css"),
  "utf8"
);

const urls = [...css.matchAll(/url\("(https:\/\/cdn\.fontshare\.com[^"]+)"\)/g)].map((m) => m[1]);

if (urls.length === 0) {
  console.error("No Fontshare URLs found in globals.css. Has the font strategy changed?");
  process.exit(1);
}

let failed = 0;
for (const url of urls) {
  const name = url.split("/").pop();
  try {
    const res = await fetch(url, { method: "HEAD" });
    const size = Number(res.headers.get("content-length") ?? 0);
    if (!res.ok || size === 0) {
      failed++;
      console.log(`  FAIL  HTTP ${res.status}  ${name}`);
    } else {
      console.log(`  ok    ${String(Math.round(size / 1024)).padStart(3)} kB  ${name}`);
    }
  } catch (err) {
    failed++;
    console.log(`  FAIL  ${err instanceof Error ? err.message : String(err)}  ${name}`);
  }
}

console.log("");
if (failed === 0) {
  console.log(`All ${urls.length} font files resolve.\n`);
  process.exit(0);
}
console.log(`${failed} of ${urls.length} font files are unreachable. The site would fall back to system faces.\n`);
process.exit(1);
