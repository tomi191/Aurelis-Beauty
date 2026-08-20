import { brandOg, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Лазерна епилация във Варна";

export default function OpengraphImage() {
  return brandOg("Лазерна епилация", "Цени по зони за жени и мъже");
}
