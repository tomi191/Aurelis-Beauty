import type { MetadataRoute } from "next";

// Домейнът още не е избран: една env смяна (NEXT_PUBLIC_SITE_URL) при deploy
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
