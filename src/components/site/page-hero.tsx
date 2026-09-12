import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { ScrollCue } from "./scroll-cue";
import type { Photo } from "@/lib/content";

/**
 * Subpage hero. One H1 per page lives here.
 *
 * Full viewport height, per koombei-studio-skill Part 6, measured in svh so
 * mobile browser chrome cannot crop it.
 *
 * Two compositions, and which one a page gets depends on whether Nkrabea have
 * a photograph for it:
 *
 *   with a photograph   a split: picture in its own panel at full strength,
 *                       words on the band. `flip` puts the picture on the
 *                       other side, so consecutive pages do not repeat the
 *                       same composition.
 *   without             the band alone, carrying the loom pattern and a
 *                       larger heading. An honest empty state, not a
 *                       stand-in photograph.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  photo,
  crumbs,
  flip = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  photo?: Photo;
  crumbs?: { label: string; href?: string }[];
  flip?: boolean;
}) {
  const words = (
    <div className="relative flex items-center bg-band text-band-foreground">
      <div className="kente-field absolute inset-0 opacity-80" aria-hidden="true" />
      <div className="grain-overlay absolute inset-0 opacity-60" aria-hidden="true" />

      {/* Beside a photograph the words sit against the seam, so the column
          hugs the inner edge of its panel. With no photograph the panel is the
          whole width, and the column has to line up with the page margin the
          header and every section below use, or it reads as adrift. */}
      <div
        className={
          photo
            ? `relative w-full px-4 py-16 sm:px-6 lg:py-24 ${
                flip ? "lg:pl-16 lg:pr-12 xl:pr-20" : "lg:pl-12 lg:pr-16 xl:pl-20"
              }`
            : "relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
        }
      >
        <div
          className={
            photo
              ? `mx-auto max-w-xl lg:mx-0 lg:max-w-2xl ${
                  flip ? "lg:mr-auto" : "lg:ml-auto"
                }`
              : "max-w-3xl"
          }
        >
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 text-xs text-band-foreground/60"
          >
            <Link href="/" className="inline-block py-1 hover:text-band-foreground">
              Home
            </Link>
            {crumbs?.map((c) => (
              <span key={c.label} className="flex items-center gap-1.5">
                <ChevronRight className="h-3 w-3" aria-hidden="true" />
                {c.href ? (
                  <Link
                    href={c.href}
                    className="inline-block py-1 hover:text-band-foreground"
                  >
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-band-foreground/90">{c.label}</span>
                )}
              </span>
            ))}
          </nav>

          <span className="label-mono mt-6 inline-flex items-center gap-2 rounded-full border border-band-foreground/25 bg-band-foreground/5 px-3.5 py-1.5 text-band-foreground/85">
            <span
              className="h-1.5 w-1.5 rounded-full bg-accent"
              aria-hidden="true"
            />
            {eyebrow}
          </span>

          <h1 className="mt-6 font-display text-hero">{title}</h1>

          {description && (
            <p className="mt-6 max-w-2xl text-lede text-band-foreground/78">
              {description}
            </p>
          )}
        </div>
      </div>

      <ScrollCue />
    </div>
  );

  if (!photo) {
    return (
      <section className="relative isolate flex min-h-svh flex-col overflow-hidden">
        <div className="flex flex-1 flex-col [&>div]:flex-1">{words}</div>
        <div className="woven-edge relative z-10" aria-hidden="true" />
      </section>
    );
  }

  return (
    <section className="relative isolate grid min-h-svh grid-rows-[38svh_auto] overflow-hidden lg:grid-cols-2 lg:grid-rows-1">
      <div
        className={`relative ${flip ? "order-1 lg:order-1" : "order-1 lg:order-2"}`}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-b from-band/45 via-transparent to-band/85 ${
            flip
              ? "lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-band"
              : "lg:bg-gradient-to-l lg:from-transparent lg:via-transparent lg:to-band"
          }`}
          aria-hidden="true"
        />
      </div>

      <div className={flip ? "order-2 lg:order-2" : "order-2 lg:order-1"}>
        {words}
      </div>

      <div
        className="woven-edge absolute inset-x-0 bottom-0 z-10"
        aria-hidden="true"
      />
    </section>
  );
}
