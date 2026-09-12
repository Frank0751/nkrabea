/**
 * Shared by the image scripts: every Cloudinary photograph the site uses,
 * read from content.ts so the list can never drift from what is rendered.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const CLOUD_BASE = "https://res.cloudinary.com/dmyrmlj5z/image/upload/";

export function contentPaths() {
  const file = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "src", "lib", "content.ts");
  const text = fs.readFileSync(file, "utf8");
  return [...new Set([...text.matchAll(/cld\(\s*"([^"]+)"\s*\)/g)].map((m) => m[1]))];
}

/** Same rule as src/lib/cloudinary.ts: after any baked transformation, before the version. */
export function withTransform(src, params) {
  if (!src.startsWith(CLOUD_BASE)) return src;
  const rest = src.slice(CLOUD_BASE.length);
  const match = rest.match(/(^|\/)v\d+\//);
  if (!match || match.index === undefined) return `${CLOUD_BASE}${params}/${rest}`;
  const cut = match.index + match[1].length;
  return `${CLOUD_BASE}${rest.slice(0, cut)}${params}/${rest.slice(cut)}`;
}

export async function pool(items, limit, worker) {
  let next = 0;
  const results = [];
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (next < items.length) {
        const i = next++;
        results[i] = await worker(items[i], i);
      }
    })
  );
  return results;
}
