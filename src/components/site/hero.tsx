import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "./magnetic";
import { ScrollCue } from "./scroll-cue";
import { PhotoReel } from "./photo-reel";
import { ORG, IDENTITY, REEL } from "@/lib/content";

/**
 * Homepage hero, to the spec in Nkrabea's brief: the photography, the logo
 * and tagline together, one plain line saying what we do and who we serve,
 * three calls to action, and one credibility marker.
 *
 * It is a split, not an overlay. The first build dimmed the photograph to 45%
 * and set cream text on top of it, which cost the picture and the words at
 * the same time. Here the photographs run at full strength in their own
 * panel, and the words sit on the band where they have 12.6:1 to work with.
 *
 * The entrance is CSS keyframes, never GSAP, so the hero paints immediately
 * and is never blank while JavaScript loads. Everything below the fold is
 * ScrollTrigger.
 *
 * The credibility marker is the registration, because that is the strongest
 * claim currently evidenced. The GES partnership and the PWD unemployment
 * figure both sit in NEEDS_EVIDENCE until Nkrabea supplies a source.
 */
export function Hero() {
  return (
    <section className="relative isolate grid min-h-svh grid-rows-[42svh_auto] overflow-hidden lg:grid-cols-[1.08fr_1fr] lg:grid-rows-1">
      {/* Photographs. Their own panel, at full strength. */}
      <div className="relative order-1 lg:order-2">
        <PhotoReel photos={REEL} priority />
        {/* The seam: the band bleeds into the picture rather than stopping
            at a hard edge. Upward on mobile, sideways on desktop. */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-band/55 via-transparent to-band/85 lg:bg-gradient-to-l lg:from-transparent lg:via-transparent lg:to-band"
          aria-hidden="true"
        />
      </div>

      {/* Words. On the band, where contrast is not a compromise. */}
      <div className="relative order-2 flex items-center bg-band text-band-foreground lg:order-1">
        <div className="kente-field absolute inset-0 opacity-80" aria-hidden="true" />
        <div className="grain-overlay absolute inset-0 opacity-60" aria-hidden="true" />

        <div className="relative w-full px-4 py-16 sm:px-6 lg:py-24 lg:pl-12 lg:pr-16 xl:pl-20">
          <div className="mx-auto max-w-xl lg:mx-0 lg:ml-auto lg:max-w-2xl">
            <div className="hero-rise hero-rise-1 flex items-center gap-4">
              <Image
                src="/logo.svg"
                alt=""
                width={56}
                height={56}
                priority
                aria-hidden="true"
                className="h-11 w-11 shrink-0 sm:h-14 sm:w-14"
              />
              <p className="label-mono text-accent">{ORG.motto}</p>
            </div>

            <div className="hero-rise hero-rise-1 section-mark mt-7" aria-hidden="true" />

            <h1 className="hero-rise hero-rise-2 mt-6 font-display text-hero">
              Ghanaian culture as a tool for{" "}
              <span className="text-accent">real change</span>
            </h1>

            <p className="hero-rise hero-rise-3 mt-6 max-w-xl text-lede text-band-foreground/80">
              {IDENTITY.lead}
            </p>

            <div className="hero-rise hero-rise-4 mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Magnetic>
                <Button
                  asChild
                  size="lg"
                  className="group w-full bg-accent text-accent-foreground hover:bg-accent/90 sm:w-auto"
                >
                  <Link href="/partner">
                    Partner With Us
                    <ArrowRight
                      className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>
              </Magnetic>

              <Magnetic>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full border-band-foreground/30 bg-transparent text-band-foreground hover:bg-band-foreground/10 hover:text-band-foreground sm:w-auto"
                >
                  <Link href="/get-involved">Support Our Work</Link>
                </Button>
              </Magnetic>

              <Button
                asChild
                size="lg"
                variant="ghost"
                className="w-full text-band-foreground/80 hover:bg-band-foreground/10 hover:text-band-foreground sm:w-auto"
              >
                <Link href="/programmes">Explore Our Work</Link>
              </Button>
            </div>

            <p className="hero-rise hero-rise-4 mt-10 flex items-start gap-2.5 text-sm text-band-foreground/70">
              <ShieldCheck
                className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                aria-hidden="true"
              />
              <span>
                A registered Ghanaian NGO under the {ORG.registration}, operating
                nationally since {ORG.incorporated}.
              </span>
            </p>
          </div>
        </div>

        <ScrollCue />
      </div>

      {/* Cloth, not a hairline, where the hero ends. */}
      <div
        className="woven-edge absolute inset-x-0 bottom-0 z-10"
        aria-hidden="true"
      />
    </section>
  );
}
