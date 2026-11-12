"use client";

import { SocialLinks } from "./social-links";
import { useSocials } from "./site-content-context";

/**
 * The social accounts, centred under a hero's words. Reads them from the
 * site content context, so the accounts edited in Site settings appear in
 * every hero without each page passing them down.
 */
export function HeroSocials({ className = "" }: { className?: string }) {
  const socials = useSocials();
  if (socials.length === 0) return null;
  return (
    <nav aria-label="Nkrabea on social media" className={className}>
      <SocialLinks socials={socials} size="sm" className="justify-center" />
    </nav>
  );
}
