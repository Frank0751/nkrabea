/**
 * The public origin of the site.
 *
 * Nkrabea do not yet hold a domain, so this is resolved rather than hardcoded.
 *
 * Resolution order:
 *   1. NEXT_PUBLIC_SITE_URL, once the real domain is secured.
 *   2. The Vercel project's stable production domain.
 *   3. This specific Vercel deployment's URL.
 *   4. The intended domain, as a last resort.
 *
 * Every candidate is validated, and anything blank or malformed is skipped.
 * `??` is deliberately not used: an environment variable that exists with an
 * empty value is a string, not null, so `??` passes "" straight through. That
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

const FALLBACK = "https://nkrabeacultureandarts.org";

/** Explicitly configured origin, if there is one. */
const CONFIGURED = toOrigin(process.env.NEXT_PUBLIC_SITE_URL);

export const SITE_URL =
  CONFIGURED ??
  toOrigin(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
  toOrigin(process.env.VERCEL_URL) ??
  FALLBACK;

/**
 * True only when someone has deliberately set NEXT_PUBLIC_SITE_URL, which is
 * how we know we are serving the organisation's real public domain rather
 * than an auto-generated deployment URL.
 *
 * Search engines are kept off everything else. A *.vercel.app staging copy
 * indexed today would compete with nkrabeacultureandarts.org later, and
 * duplicate content is a painful thing to unpick once it is in the index.
 */
export const IS_PUBLIC_SITE = CONFIGURED !== undefined;

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
