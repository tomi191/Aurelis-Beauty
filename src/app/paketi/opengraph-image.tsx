import { brandOg, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Пакетни програми в AURÈLIS Beauty Atelier";

export default function OpengraphImage() {
  return brandOg("Пакети и програми", "Курсове с отстъпка и LED подарък");
}
