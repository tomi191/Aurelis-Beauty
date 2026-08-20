import { brandOg, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Консултация с козметик във Варна";

export default function OpengraphImage() {
  return brandOg(
    "Консултация и анализ на кожата",
    "20 €, приспада се при процедура"
  );
}
