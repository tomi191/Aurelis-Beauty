import { brandOg, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Процедури за лице и тяло във Варна";

export default function OpengraphImage() {
  return brandOg("Процедури за лице и тяло", "Козметично студио · Варна");
}
