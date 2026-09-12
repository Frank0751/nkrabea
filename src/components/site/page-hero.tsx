import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { ScrollCue } from "./scroll-cue";
import { HeroBackdrop } from "./hero-backdrop";
import { withBlur } from "@/lib/blur";
import type { Photo } from "@/lib/content";

/**
 * Subpage hero. One H1 per page lives here.
 *
 * Full viewport height, per koombei-studio-skill Part 6, measured in svh so
 * mobile browser chrome cannot crop it. The photograph, where a page has one,
 * is the whole background, and the words are centred on it. <HeroBackdrop>
 * carries the layers that keep cream text at AA on any picture. A page with
 * no photograph gets the same composition on the band and the loom pattern
 * alone: an honest empty state, not a stand-in picture.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  photo,
  crumbs,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  photo?: Photo;
  crumbs?: { label: string; href?: string }[];
}) {
  const p = photo ? withBlur(photo) : undefined;
  return (
    <section className="relative isolate flex min-h-svh items-center justify-center overflow-hidden bg-band text-band-foreground">
      <HeroBackdrop>
        {p && (
          <Image
            src={p.src}
            alt={p.alt}
            fill
            priority
            sizes="100vw"
            placeholder={p.blur ? "blur" : "empty"}
            blurDataURL={p.blur}
            className="photo-tone object-cover"
          />
        )}
      </HeroBackdrop>

      <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center px-4 pb-32 pt-32 text-center sm:px-6 lg:pb-36 lg:pt-40">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center justify-center gap-1.5 text-xs text-band-foreground/70"
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
                <span className="text-band-foreground/95">{c.label}</span>
              )}
            </span>
          ))}
        </nav>

        <span className="label-mono mt-7 inline-flex items-center gap-2 rounded-full border border-band-foreground/30 bg-band/40 px-3.5 py-1.5 text-band-foreground/90 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          {eyebrow}
        </span>

        <div className="section-mark mt-7" aria-hidden="true" />

        <h1 className="mt-7 font-display text-hero">{title}</h1>

        {description && (
          <p className="mt-6 max-w-2xl text-lede text-band-foreground/85">
            {description}
          </p>
        )}
      </div>

      <ScrollCue />

      <div
        className="woven-edge absolute inset-x-0 bottom-0 z-10"
        aria-hidden="true"
      />
    </section>
  );
}
