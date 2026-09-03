import type { MetadataRoute } from "next";
import { SITE_URL, ROUTES } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.path === "/news" ? "weekly" : "monthly",
    priority: route.priority,
  }));
}
