import { brandOg, OG_SIZE } from "@/lib/og";
import { facePackages } from "@/lib/data";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Пакетна програма в AURÈLIS Beauty Atelier";

export function generateStaticParams() {
  return facePackages.programs.map((p) => ({ slug: p.slug }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const prog = facePackages.programs.find((p) => p.slug === slug);
  return brandOg(prog?.name ?? "Пакетна програма", prog?.tagline);
}
