import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { ScrollCue } from "./scroll-cue";

/**
 * Subpage hero. One H1 per page lives here.
 *
 * Full viewport height, per koombei-studio-skill Part 6. Measured in svh
 * rather than vh so that mobile browser chrome cannot crop the content: vh
 * refers to the viewport with the address bar hidden, which is taller than
 * what the visitor actually sees on load.
 *
 * The image is optional: Nkrabea's photography is incomplete, and a page with
 * no confirmed photograph should render a composed black band rather than a
 * generated stand-in.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  crumbs,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  crumbs?: { label: string; href?: string }[];
}) {
  return (
    <section className="relative isolate flex min-h-svh flex-col overflow-hidden bg-band text-band-foreground">
      <div className="absolute inset-0 -z-10">
        {image && (
          <>
            <Image
              src={image}
              alt={imageAlt ?? ""}
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-band via-band/75 to-band/40" />
          </>
        )}
        <div className="absolute inset-0 grain-overlay opacity-50" />
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pb-28 pt-28 sm:px-6 lg:px-8 lg:pt-36">
        <div className="max-w-3xl">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 text-xs text-band-foreground/60"
          >
            <Link href="/" className="hover:text-band-foreground">
              Home
            </Link>
            {crumbs?.map((c) => (
              <span key={c.label} className="flex items-center gap-1.5">
                <ChevronRight className="h-3 w-3" aria-hidden="true" />
                {c.href ? (
                  <Link href={c.href} className="hover:text-band-foreground">
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

          <h1 className="mt-6 font-display text-4xl leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>

          {description && (
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-band-foreground/75 sm:text-lg">
              {description}
            </p>
          )}
        </div>
      </div>

      <ScrollCue />

      <div className="kente-divider" aria-hidden="true" />
    </section>
  );
}
