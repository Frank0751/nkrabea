/**
 * Delivery URLs for Nkrabea's own Cloudinary library (cloud dmyrmlj5z,
 * folder Nkrabea).
 *
 * Showing an image needs nothing but the cloud name: Cloudinary delivery is
 * public, so no API key or secret reaches the site, the build or Vercel. The
 * key used to list the library stays in .env on the developer's machine.
 *
 * `path` is everything after /upload/ in an asset's secure URL, version
 * included, optionally preceded by a transformation. Keeping the version
 * makes each URL immutable: a replaced photograph gets a new URL rather than
 * a stale cache.
 */
export const CLOUD_NAME = "dmyrmlj5z";
export const CLOUD_BASE = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/`;

export function cld(path: string): string {
  return `${CLOUD_BASE}${path}`;
}

/**
 * Insert a transformation into a delivery URL, immediately before the
 * versioned asset and after any transformation the URL already carries.
 *
 * Order matters: Cloudinary applies chained transformations left to right,
 * so a portrait baked with a face crop must keep that crop first and take
 * the responsive resize second. Anything that is not one of our Cloudinary
 * URLs, the logo and the two local artworks, comes back untouched.
 */
export function withTransform(src: string, params: string): string {
  if (!src.startsWith(CLOUD_BASE)) return src;
  const rest = src.slice(CLOUD_BASE.length);
  const match = rest.match(/(^|\/)v\d+\//);
  if (!match || match.index === undefined) return `${CLOUD_BASE}${params}/${rest}`;
  const cut = match.index + match[1].length;
  return `${CLOUD_BASE}${rest.slice(0, cut)}${params}/${rest.slice(cut)}`;
}
