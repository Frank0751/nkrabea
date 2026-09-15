import { renderShareCard } from "@/lib/og-card";

export const alt =
  "Nkrabea Culture and Arts Ensemble's badge beside the words Nkrabea Culture and Arts Ensemble, impacting lives through culture and the arts, over a photograph of the troupe's young dancers.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderShareCard();
}
