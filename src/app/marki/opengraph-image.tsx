import { brandOg, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Марките, с които работи AURÈLIS Beauty Atelier";

export default function OpengraphImage() {
  return brandOg("Марките, с които работим", "6 професионални марки");
}
