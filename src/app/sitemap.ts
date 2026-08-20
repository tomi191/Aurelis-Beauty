import type { MetadataRoute } from "next";
import { categories, facePackages } from "@/lib/data";
import { siteUrl } from "@/lib/site";

/* Без lastModified: new Date() подпечатваше всичко като „променено сега"
   при всеки build — фалшив freshness сигнал, който Google се научава да
   игнорира. Липсата е по-честна от невярна стойност. */
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
    ...facePackages.programs.map((p) => `/paketi/${p.slug}`),
    "/marki",
    "/kontakti",
    "/poveritelnost",
  ];

  return paths.map((path) => ({ url: `${siteUrl}${path}` }));
}
