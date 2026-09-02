"use client";

import * as React from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { GALLERY } from "@/lib/content";

/**
 * Photo grid with a lightbox.
 *
 * Only photographs from Nkrabea's own channels appear here. Every image
 * carries descriptive alt text, which their brief asks for explicitly.
 */
export function Gallery() {
  const [active, setActive] = React.useState<number | null>(null);
  const closeRef = React.useRef<HTMLButtonElement>(null);

  // Escape to close, and keep focus inside the dialog while it is open.
  React.useEffect(() => {
    if (active === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);

    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [active]);

  if (GALLERY.length === 0) return null;

  const current = active === null ? null : GALLERY[active];

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {GALLERY.map((item, i) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => setActive(i)}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-band/0 transition-colors duration-300 group-hover:bg-band/20" />
              <span className="sr-only">Enlarge: {item.alt}</span>
            </button>
          </li>
        ))}
      </ul>

      {current && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-band/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={() => setActive(null)}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={() => setActive(null)}
            className="absolute right-5 top-5 rounded-full bg-band-foreground/10 p-2 text-band-foreground transition-colors hover:bg-band-foreground/20"
            aria-label="Close viewer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>

          <figure
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <figcaption className="mt-4 text-center text-sm text-band-foreground/80">
              {current.caption ?? current.alt}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
