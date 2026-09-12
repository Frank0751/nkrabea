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

export function cld(path: string): string {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${path}`;
}
