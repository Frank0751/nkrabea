"use client";

import * as React from "react";
import Image from "next/image";
import { GALLERY } from "@/lib/content";
import { SectionEyebrow } from "./about";

export function Gallery() {
  const [lightbox, setLightbox] = React.useState<number | null>(null);

  return (
    <section
      id="gallery"
      className="scroll-mt-20 border-t border-border bg-secondary/40 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <SectionEyebrow>In the frame</SectionEyebrow>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
              Moments from the stage and the studio
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            A selection of stills from recent performances, rehearsals and
            workshops.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {GALLERY.map((item, i) => (
            <button
              key={item.src + i}
              type="button"
              onClick={() => setLightbox(i)}
              className={`group relative overflow-hidden rounded-xl bg-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                item.span === "tall"
                  ? "row-span-2 aspect-[3/4]"
                  : item.span === "wide"
                    ? "col-span-2 aspect-[16/10]"
                    : "aspect-square"
              }`}
              aria-label={`View image: ${item.caption}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="absolute bottom-3 left-3 right-3 translate-y-1 text-left text-sm font-medium text-primary-foreground opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {item.caption}
              </span>
            </button>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute right-5 top-5 rounded-full bg-primary-foreground/10 p-2 text-primary-foreground transition-colors hover:bg-primary-foreground/20"
            aria-label="Close viewer"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
          <div
            className="relative aspect-[4/3] w-full max-w-4xl overflow-hidden rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={GALLERY[lightbox].src}
              alt={GALLERY[lightbox].alt}
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent p-5">
              <p className="text-sm font-medium text-primary-foreground">
                {GALLERY[lightbox].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
