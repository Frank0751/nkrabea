import Image from "next/image";
import { Maximize2 } from "lucide-react";
import type { Photo } from "@/lib/content";

/**
 * A programme or event flyer: shown whole, never cropped, with a button that
 * opens it at full size so the small print can be read on a phone.
 */
export function FlyerCard({
  flyer,
  label = "View the flyer",
  compact = false,
}: {
  flyer: Photo;
  label?: string;
  /** A smaller version for event listings. */
  compact?: boolean;
}) {
  return (
    <a
      href={flyer.src}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block overflow-hidden rounded-xl border border-border bg-muted/40 transition-colors hover:border-primary/50 ${
        compact ? "w-full sm:w-36" : "w-full max-w-xs"
      }`}
    >
      <span className={`relative block ${compact ? "aspect-[3/4]" : "aspect-[4/5]"}`}>
        <Image
          src={flyer.src}
          alt={flyer.alt}
          fill
          sizes={compact ? "(max-width: 640px) 100vw, 144px" : "320px"}
          className="object-contain p-2"
        />
      </span>
      <span className="flex items-center justify-center gap-2 border-t border-border px-3 py-2.5 text-sm font-semibold text-primary">
        <Maximize2 className="h-4 w-4" aria-hidden="true" />
        {label}
        <span className="sr-only"> (opens full size in a new tab)</span>
      </span>
    </a>
  );
}
