import {
  HandHeart,
  Package,
  Users,
  CalendarDays,
  Megaphone,
  GraduationCap,
  Handshake,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

/**
 * Icons an editor can pick for a card that has no photo. The names match the
 * options offered in Sanity (studio/schemaTypes/objects.ts, CARD_ICONS).
 */
export const CARD_ICONS: Record<string, LucideIcon> = {
  heart: HandHeart,
  package: Package,
  people: Users,
  calendar: CalendarDays,
  megaphone: Megaphone,
  learning: GraduationCap,
  partnership: Handshake,
  sparkle: Sparkles,
};

export function CardIcon({ name, className = "h-6 w-6 text-primary" }: { name?: string; className?: string }) {
  const Icon = (name && CARD_ICONS[name]) || Sparkles;
  return <Icon className={className} aria-hidden="true" />;
}
