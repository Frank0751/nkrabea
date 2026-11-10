import { createClient } from "@sanity/client";

/**
 * Nkrabea's Sanity project. The project ID and dataset are public by design:
 * the dataset is public, so anyone can read published content anyway, and
 * the site reads without a token. Editing happens only in the Studio, behind
 * Sanity's own login.
 *
 * NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET override these,
 * for pointing a preview at a different dataset.
 */
export const SANITY_PROJECT_ID =
  (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "").trim() || "31l59nsi";
export const SANITY_DATASET =
  (process.env.NEXT_PUBLIC_SANITY_DATASET ?? "").trim() || "production";

/** How long a page may show content before checking Sanity again. */
export const CONTENT_REVALIDATE_SECONDS = 60;

export const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: "2026-02-01",
  useCdn: true,
  perspective: "published",
});
