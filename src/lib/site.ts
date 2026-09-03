/**
 * The public origin of the site.
 *
 * Nkrabea do not yet hold a domain, so this is configured rather than derived
 * from content. Set NEXT_PUBLIC_SITE_URL in the deployment environment once
 * the domain is secured. The fallback keeps canonical URLs, Open Graph tags
 * and the sitemap well-formed until then.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://nkrabeacultureandarts.org"
).replace(/\/$/, "");

/**
 * Every route, with the relative priority a search engine should give it.
 * Kept here so the sitemap and any future navigation audit read from one list.
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
