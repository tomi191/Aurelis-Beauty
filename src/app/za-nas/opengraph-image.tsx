import { brandOg, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "За AURÈLIS Beauty Atelier";

export default function OpengraphImage() {
  return brandOg("За AURÈLIS", "Историята и хората зад ателието");
}
