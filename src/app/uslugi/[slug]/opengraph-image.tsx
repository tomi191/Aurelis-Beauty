import { brandOg, OG_SIZE } from "@/lib/og";
import { categories } from "@/lib/data";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Процедури в AURÈLIS Beauty Atelier · Варна";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = categories.find((c) => c.slug === slug);
  return brandOg(cat?.name ?? "Процедури", "Козметично студио · Варна");
}
