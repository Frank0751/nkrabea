import type { MetadataRoute } from "next";
import { SITE_URL, IS_PUBLIC_SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Until NEXT_PUBLIC_SITE_URL names the organisation's real domain, this is a
  // deployment URL that must stay out of the index. See lib/site.ts.
  if (!IS_PUBLIC_SITE) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // The API routes accept POST only and hold submitted enquiries.
        // Nothing there is useful to a crawler.
        disallow: "/api/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
