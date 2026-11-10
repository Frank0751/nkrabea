import type { MetadataRoute } from "next";
import { SITE_URL, IS_PUBLIC_SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Preview builds and local development stay out of the index. See lib/site.ts.
  if (!IS_PUBLIC_SITE) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
