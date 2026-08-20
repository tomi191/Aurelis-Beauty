import { brandOg, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Контакти на AURÈLIS Beauty Atelier · Варна";

export default function OpengraphImage() {
  return brandOg("Заповядайте в ателието", "ул. „Дунавски лебед“ 14 · Варна");
}
