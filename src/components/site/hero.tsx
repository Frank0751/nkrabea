import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "./magnetic";
import { ORG, IDENTITY } from "@/lib/content";

/**
 * Homepage hero, to the spec in Nkrabea's brief: one strong photograph, the
 * tagline, a single plain-language line saying what we do and who we serve,
 * three clear calls to action, and one credibility marker.
 *
 * Entrance is CSS keyframes rather than GSAP so the hero paints immediately
 * and is never blank while JavaScript loads. Everything below the fold is
 * ScrollTrigger.
 *
 * The credibility marker is the registration, because that is the strongest
 * claim currently evidenced. The GES partnership and the PWD unemployment
 * figure both sit in NEEDS_EVIDENCE until Nkrabea supplies a source.
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[92svh] items-center overflow-hidden bg-band text-band-foreground">
      <div className="absolute inset-0 -z-10">
        {/* Video slot: drop a <video> here when Nkrabea supplies a reel. */}
        <Image
          src="/images/social/fb-1.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-band via-band/85 to-band/55" />
        <div className="absolute inset-0 grain-overlay opacity-60" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 py-28 sm:px-6 lg:px-8 lg:py-32">
        <div className="max-w-3xl">
          {/* Nkrabea's homepage spec asks the hero to carry the logo and the
              tagline together. The mark is decorative here, since the header
              already provides the linked, labelled logo. */}
          <div className="hero-rise hero-rise-1 flex items-center gap-4">
            <Image
              src="/logo.svg"
              alt=""
              width={56}
              height={56}
              priority
              aria-hidden="true"
              className="h-12 w-12 shrink-0 sm:h-14 sm:w-14"
            />
            <p className="label-mono text-accent">{ORG.motto}</p>
          </div>

          <h1 className="hero-rise hero-rise-2 mt-6 font-display text-4xl font-semibold leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.75rem]">
            Ghanaian culture as a tool for{" "}
            <span className="text-accent">real change</span>
          </h1>

          <p className="hero-rise hero-rise-3 mt-6 max-w-xl text-base leading-relaxed text-band-foreground/80 sm:text-lg">
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

      <div className="kente-divider absolute inset-x-0 bottom-0" aria-hidden="true" />
    </section>
  );
}
