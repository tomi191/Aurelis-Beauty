import { brandOg, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Ценоразпис на AURÈLIS Beauty Atelier";

export default function OpengraphImage() {
  return brandOg("Всички цени на едно място", "Крайни цени, обявени предварително");
}
