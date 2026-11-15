import type { MetadataRoute } from "next";
import { news } from "@/lib/content";
import { isPlaceholderNews, siteUrl } from "@/lib/seo";

/** Served at /sitemap.xml: tells search engines which pages exist and which matter most. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/fragrances", priority: 0.9, changeFrequency: "monthly" },
    { path: "/flavours", priority: 0.9, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
    { path: "/about", priority: 0.7, changeFrequency: "yearly" },
    { path: "/our-story", priority: 0.6, changeFrequency: "yearly" },
    { path: "/centres", priority: 0.6, changeFrequency: "yearly" },
    { path: "/news", priority: 0.5, changeFrequency: "weekly" },
    { path: "/csr", priority: 0.4, changeFrequency: "yearly" },
    { path: "/careers", priority: 0.4, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.1, changeFrequency: "yearly" },
  ];

  return [
    ...pages.map((p) => ({
      url: `${siteUrl}${p.path}`,
      lastModified: now,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),
    ...news
      .filter((n) => !isPlaceholderNews(n))
      .map((n) => ({
        url: `${siteUrl}/news/${n.slug}`,
        lastModified: new Date(n.date),
        changeFrequency: "yearly" as const,
        priority: 0.5,
      })),
  ];
}
