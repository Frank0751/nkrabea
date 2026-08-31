"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { GALLERY, SOCIAL_LINKS, type GalleryItem } from "@/lib/content";
import { PageHero } from "@/components/site/page-hero";
import { SectionEyebrow } from "@/components/site/section-eyebrow";
import { Reveal } from "@/components/site/reveal";
import { CtaBand } from "@/components/site/cta-band";

function spanClass(span: GalleryItem["span"]): string {
  if (span === "tall") return "row-span-2";
  if (span === "wide") return "col-span-2";
  return "";
}

export default function GalleryPage() {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const closeBtnRef = React.useRef<HTMLButtonElement | null>(null);
  const lastFocusedRef = React.useRef<HTMLElement | null>(null);

  const isOpen = activeIndex !== null;
  const current = activeIndex !== null ? GALLERY[activeIndex] : null;
  const indexLabel =
    activeIndex !== null
      ? `${activeIndex + 1} / ${GALLERY.length}`
      : "";

  const close = React.useCallback(() => setActiveIndex(null), []);

  const showNext = React.useCallback(
    () =>
      setActiveIndex((i) =>
        i === null ? null : (i + 1) % GALLERY.length
      ),
    []
  );

  const showPrev = React.useCallback(
    () =>
      setActiveIndex((i) =>
        i === null ? null : (i - 1 + GALLERY.length) % GALLERY.length
      ),
    []
  );

  // Body scroll lock while the lightbox is open.
  React.useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  // Move focus into the dialog when it opens; restore focus on close.
  React.useEffect(() => {
    if (isOpen) {
      lastFocusedRef.current = document.activeElement as HTMLElement | null;
      // Defer to next frame so the button is mounted before we focus it.
      const id = window.setTimeout(() => {
        closeBtnRef.current?.focus();
      }, 0);
      return () => window.clearTimeout(id);
    }
    if (lastFocusedRef.current) {
      lastFocusedRef.current.focus?.();
      lastFocusedRef.current = null;
    }
  }, [isOpen]);

  // Keyboard navigation: Escape, Arrow Left, Arrow Right.
  React.useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        showNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        showPrev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close, showNext, showPrev]);

  return (
    <>
      <PageHero
        eyebrow="In the frame"
        title="Moments from stage, studio and community"
        description="Performance stills, rehearsal shots and community moments from three decades of Nkrabea. Tap any image to view it full screen, then move through the set with the arrow keys."
        image="/images/social/fb-3.jpg"
        imageAlt="Art exhibition featuring a red robed figure painting, part of a Nkrabea visual arts collaboration"
        crumbs={[{ label: "Gallery" }]}
      />

      {/* Masonry-style gallery grid */}
      <section
        id="gallery"
        aria-labelledby="gallery-heading"
        className="scroll-mt-20 border-t border-border bg-secondary/30 py-20 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <Reveal>
                <SectionEyebrow>The collection</SectionEyebrow>
              </Reveal>
              <Reveal delay={80}>
                <h2
                  id="gallery-heading"
                  className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl"
                >
                  Performance, craft and community
                </h2>
              </Reveal>
            </div>
            <Reveal delay={120}>
              <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                A growing archive of stills from stages, studios and
                celebrations across Accra and beyond.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:gap-4 lg:grid-cols-4">
            {GALLERY.map((item, i) => (
              <button
                key={`${item.src}-${i}`}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={`Open image ${i + 1} of ${GALLERY.length}: ${item.caption}`}
                className={`group relative overflow-hidden rounded-xl bg-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${spanClass(
                  item.span
                )}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 translate-y-2 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:p-4">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-foreground/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-1 text-sm font-medium leading-snug text-primary-foreground">
                    {item.caption}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Follow our socials */}
      <section
        id="socials"
        aria-labelledby="socials-heading"
        className="border-t border-border py-20 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Reveal>
              <SectionEyebrow>Follow our socials</SectionEyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2
                id="socials-heading"
                className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl"
              >
                Catch us where we post daily
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                From rehearsal clips to performance stills and community
                workshops, our socials are the most direct way to follow
                the ensemble between tours.
              </p>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {SOCIAL_LINKS.map((s, i) => (
              <Reveal key={s.label} delay={i * 80}>
                <Link
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                        {s.label}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                    </div>
                    <p className="mt-4 font-display text-xl font-semibold leading-tight tracking-tight text-foreground">
                      {s.handle}
                    </p>
                  </div>
                  <div className="mt-8 flex items-center gap-1.5 text-sm font-medium text-primary">
                    Follow
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="See us live"
        description="The next performance is closer than you think."
        primaryLabel="View upcoming events"
        primaryHref="/events"
        secondaryLabel="Book the ensemble"
        secondaryHref="/bookings"
      />

      {/* Lightbox */}
      {isOpen && current && activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          className="fixed inset-0 z-[80] flex items-center justify-center bg-foreground/95 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <button
            ref={closeBtnRef}
            type="button"
            onClick={close}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground transition-colors hover:bg-primary-foreground/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:right-6 sm:top-6"
            aria-label="Close viewer"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground transition-colors hover:bg-primary-foreground/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:left-6"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground transition-colors hover:bg-primary-foreground/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:right-6"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div
            className="relative max-h-[85vh] w-full max-w-4xl overflow-hidden rounded-xl bg-foreground/40"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[55vh] sm:h-[72vh]">
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent p-5">
              <div className="flex items-end justify-between gap-4">
                <div className="min-w-0">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-foreground/60">
                    Nkrabea gallery
                  </span>
                  <p className="mt-1 text-sm font-medium text-primary-foreground sm:text-base">
                    {current.caption}
                  </p>
                </div>
                <span
                  className="shrink-0 rounded-full bg-primary-foreground/10 px-2.5 py-1 text-xs font-medium tabular-nums text-primary-foreground"
                  aria-label={`Image ${activeIndex + 1} of ${GALLERY.length}`}
                >
                  {indexLabel}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
