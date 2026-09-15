import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "./magnetic";
import { ScrollCue } from "./scroll-cue";
import { PhotoReel } from "./photo-reel";
import { HeroBackdrop } from "./hero-backdrop";
import { withBlur } from "@/lib/blur";
import { ORG, IDENTITY, REEL, LOGO } from "@/lib/content";

/**
 * Homepage hero, to the spec in Nkrabea's brief: the photography, the logo
 * and tagline together, one plain line saying what we do and who we serve,
 * three calls to action, and one credibility marker.
 *
 * The photograph is the whole background and the words are centred on it.
 * <HeroBackdrop> supplies the layers that let cream text sit on any picture
 * at AA, and the reel behind them crossfades through three of Nkrabea's own
 * stills.
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
    <section className="relative isolate flex min-h-svh items-center justify-center overflow-hidden bg-band text-band-foreground">
      <HeroBackdrop>
        <PhotoReel photos={REEL.map(withBlur)} priority />
      </HeroBackdrop>

      <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center px-4 pb-32 pt-32 text-center sm:px-6 lg:pb-36 lg:pt-40">
        {/* Nkrabea's homepage spec asks the hero to carry the logo and the
            tagline together. The mark is decorative here, since the header
            already provides the linked, labelled logo. */}
        <div className="hero-rise hero-rise-1 hero-mark">
          <Image
            src={LOGO.badge}
            alt=""
            width={112}
            height={112}
            priority
            aria-hidden="true"
            className="h-24 w-24 rounded-full sm:h-28 sm:w-28"
          />
        </div>

        <p className="hero-rise hero-rise-1 label-mono mt-8 text-accent">
          {ORG.motto}
        </p>
        <div className="hero-rise hero-rise-1 section-mark mt-6" aria-hidden="true" />

        <h1 className="hero-rise hero-rise-2 mt-7 font-display text-hero">
          Ghanaian culture as a tool for{" "}
          <span className="text-accent">real change</span>
        </h1>

        <p className="hero-rise hero-rise-3 mt-6 max-w-2xl text-lede text-band-foreground/85">
          {IDENTITY.lead}
        </p>

        <div className="hero-rise hero-rise-4 mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center">
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
              className="w-full border-band-foreground/35 bg-band/30 text-band-foreground backdrop-blur-sm hover:bg-band-foreground/10 hover:text-band-foreground sm:w-auto"
            >
              <Link href="/get-involved">Support Our Work</Link>
            </Button>
          </Magnetic>

          <Button
            asChild
            size="lg"
            variant="ghost"
            className="w-full text-band-foreground/85 hover:bg-band-foreground/10 hover:text-band-foreground sm:w-auto"
          >
            <Link href="/programmes">Explore Our Work</Link>
          </Button>
        </div>

        <p className="hero-rise hero-rise-4 mt-10 flex max-w-xl items-start justify-center gap-2.5 text-sm text-band-foreground/80">
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

      <ScrollCue />

      <div
        className="woven-edge absolute inset-x-0 bottom-0 z-10"
        aria-hidden="true"
      />
    </section>
  );
}
