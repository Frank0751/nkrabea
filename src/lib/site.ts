/**
 * The public origin of the site.
 *
 * Resolution order:
 *   1. NEXT_PUBLIC_SITE_URL, if set deliberately.
 *   2. The real domain, for Vercel's production build.
 *   3. This specific Vercel deployment's URL, for previews.
 *   4. The real domain, as a last resort.
 *
 * Every environment value is validated, and anything blank or malformed is
 * skipped by toOrigin(): an environment variable that exists with an
 * empty value is a string, not null, so `??` alone passes "" straight through. That
 * is exactly what broke the first Vercel build, where `new URL("")` threw
 * ERR_INVALID_URL while collecting page data.
 *
 * Server-side only. VERCEL_URL is not a NEXT_PUBLIC_ variable, so this module
 * must not be imported by a client component.
 */

/** Trimmed value, or undefined if absent, blank, or the string "undefined". */
function cleanEnv(value: string | undefined): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed || trimmed === "undefined" || trimmed === "null") return undefined;
  return trimmed;
}

/** Adds a scheme if the host was given bare, then validates. */
function toOrigin(value: string | undefined): string | undefined {
  const cleaned = cleanEnv(value);
  if (!cleaned) return undefined;

  const withScheme = /^https?:\/\//i.test(cleaned)
    ? cleaned
    : `https://${cleaned}`;

  try {
    const url = new URL(withScheme);
    if (!url.hostname) return undefined;
    return url.origin;
  } catch {
    return undefined;
  }
}

/** Nkrabea's domain, live since November 2026. */
export const PRODUCTION_ORIGIN = "https://www.nkrabeacultureandarts.org";

/** Explicitly configured origin, if there is one. */
const CONFIGURED = toOrigin(process.env.NEXT_PUBLIC_SITE_URL);

/**
 * Vercel marks the build that serves the real domain as "production". Preview
 * builds of branches are "preview" and stay out of search engines.
 */
const IS_PRODUCTION_BUILD = process.env.VERCEL_ENV === "production";

export const SITE_URL =
  CONFIGURED ??
  (IS_PRODUCTION_BUILD ? PRODUCTION_ORIGIN : undefined) ??
  toOrigin(process.env.VERCEL_URL) ??
  PRODUCTION_ORIGIN;

/**
 * True for the production build (and for any build with NEXT_PUBLIC_SITE_URL
 * set deliberately): search engines may index it, the sitemap is published,
 * and every page names its address on www.nkrabeacultureandarts.org as
 * canonical. Preview builds and local development stay noindex.
 *
 * nkrabea.vercel.app also serves the production build, so next.config.ts
 * redirects it to the real domain; otherwise Google would find two copies.
 */
export const IS_PUBLIC_SITE = CONFIGURED !== undefined || IS_PRODUCTION_BUILD;

/**
 * Every route, with the relative priority a search engine should give it.
 * Kept here so the sitemap and any future navigation audit read one list.
 */
export const ROUTES = [
  { path: "/", priority: 1.0 },
  { path: "/about", priority: 0.9 },
  { path: "/programmes", priority: 0.9 },
  { path: "/partner", priority: 0.9 },
  { path: "/impact", priority: 0.8 },
  { path: "/get-involved", priority: 0.8 },
  { path: "/leadership", priority: 0.7 },
  { path: "/contact", priority: 0.7 },
  { path: "/news", priority: 0.6 },
] as const;
