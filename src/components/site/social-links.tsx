import { SOCIAL_ICONS } from "./social-icons-data";
import type { Social } from "@/lib/content";

/**
 * Nkrabea's social accounts, each in its platform's own logo and colour.
 *
 * The logos are the official marks (see social-icons-data.ts). Brand blue for
 * Facebook is the one place blue appears on the site: it is the platform's
 * logo, not part of the palette. White marks on every brand colour clear the
 * 3:1 contrast WCAG asks of a graphic, and black marks (TikTok, Threads, X)
 * get a hairline ring so they hold on the dark footer.
 *
 * Pure markup with no hooks, so the footer (server) and the mobile menu
 * (client) share it.
 */

const INSTAGRAM_GRADIENT =
  "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)";

export function SocialLinks({
  socials,
  size = "md",
  withNames = false,
  className = "",
}: {
  socials: Social[];
  size?: "sm" | "md";
  /** Show the platform name beside each logo (Contact page). */
  withNames?: boolean;
  className?: string;
}) {
  if (socials.length === 0) return null;
  const box = size === "sm" ? "h-10 w-10" : "h-11 w-11";
  const glyph = size === "sm" ? "h-[18px] w-[18px]" : "h-5 w-5";

  return (
    <ul className={`flex flex-wrap gap-3 ${withNames ? "flex-col sm:flex-row sm:gap-x-6" : ""} ${className}`}>
      {socials.map(({ platform, url }) => {
        const icon = SOCIAL_ICONS[platform];
        if (!icon) return null;
        const dark = icon.hex === "#000000";
        return (
          <li key={platform}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={withNames ? undefined : `Nkrabea on ${icon.title} (opens in a new tab)`}
              className="group inline-flex items-center gap-3 rounded-full"
            >
              <span
                className={`inline-flex ${box} shrink-0 items-center justify-center rounded-full text-white shadow-sm transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:scale-105 ${
                  dark ? "ring-1 ring-white/25" : ""
                }`}
                style={{ background: platform === "instagram" ? INSTAGRAM_GRADIENT : icon.hex }}
                aria-hidden="true"
              >
                <svg viewBox="0 0 24 24" className={glyph} fill="currentColor" role="presentation">
                  <path d={icon.path} />
                </svg>
              </span>
              {withNames && (
                <span className="text-sm font-medium text-foreground underline-offset-4 group-hover:underline">
                  {icon.title}
                  <span className="sr-only"> (opens in a new tab)</span>
                </span>
              )}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
