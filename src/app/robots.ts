import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

/** Served at /robots.txt: lets search engines crawl the whole site and points them to the sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
