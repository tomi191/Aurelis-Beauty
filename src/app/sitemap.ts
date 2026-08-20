import type { MetadataRoute } from "next";
import { categories } from "@/lib/data";

// Домейнът още не е избран: една env смяна (NEXT_PUBLIC_SITE_URL) при deploy
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/za-nas",
    "/konsultatsia",
    "/uslugi",
    ...categories.map((c) => `/uslugi/${c.slug}`),
    "/lazerna-epilatsia",
    "/tsenorazpis",
    "/paketi",
    "/marki",
    "/kontakti",
  ];

  return paths.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));
}
