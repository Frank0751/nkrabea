import { MessageCircle } from "lucide-react";
import { ORG } from "@/lib/content";

/**
 * koombei-studio-skill Part 7's WhatsApp float. It renders only once
 * ORG.whatsapp holds a number Nkrabea have confirmed is on WhatsApp; until
 * then there is nothing on the page, rather than a button that opens a chat
 * with a landline.
 *
 * One deliberate departure from the standard: the glyph is ink, not white.
 * White on WhatsApp green measures under 2:1, below the 3:1 WCAG asks of a
 * graphic someone needs in order to use the control. Ink on the same green
 * is 7.7:1 and still reads as WhatsApp at a glance.
 *
 * When it renders, <BackToTop> moves up to sit above it.
 */
const WA_NUMBER = /^[1-9]\d{7,14}$/;

export function WhatsAppFloat() {
  const number = (ORG.whatsapp ?? "").replace(/\D/g, "");
  if (!WA_NUMBER.test(number)) return null;

  const text = encodeURIComponent(
    "Hello Nkrabea, I found you through your website."
  );

  return (
    <a
      href={`https://wa.me/${number}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Nkrabea on WhatsApp (opens WhatsApp)"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-band shadow-lg transition-transform duration-200 hover:-translate-y-0.5 hover:scale-105 lg:right-9"
    >
      <MessageCircle className="h-7 w-7" aria-hidden="true" />
    </a>
  );
}
