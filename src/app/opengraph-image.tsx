import { brandOg, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "AURÈLIS Beauty Atelier · Козметично студио във Варна";

export default function OpengraphImage() {
  return brandOg(
    "Красотата започва със здрава кожа",
    "Козметично студио · Варна"
  );
}
