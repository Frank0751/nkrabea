"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ORG } from "@/lib/content";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-foreground text-primary-foreground">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/social/fb-1.jpg"
          alt="Nkrabea dancers in kente cloth and beaded necklaces"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/70 to-foreground/30" />
        <div className="absolute inset-0 grain-overlay opacity-60" />
      </div>

      <div className="mx-auto flex min-h-[90vh] max-w-7xl flex-col justify-end px-4 pb-14 pt-32 sm:px-6 lg:px-8 lg:pb-20 lg:pt-40">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/5 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground/85 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Accra, Ghana &middot; Est. {ORG.foundedYear}
          </span>

          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-7xl">
            Translating Ghanaian
            <br className="hidden sm:block" /> culture into something
            <br className="hidden sm:block" />{" "}
            <span className="text-accent">the world can feel.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/75 sm:text-lg">
            Nkrabea Culture &amp; Arts Ensemble preserves traditional dance,
            drumming and music, and carries it to stages, schools and
            communities around the world.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg" className="group">
              <Link href="/bookings">
                Book a performance
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/25 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Link href="/programs">Explore the programs</Link>
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-2 text-sm text-primary-foreground/60">
            <MapPin className="h-4 w-4" />
            <span>{ORG.location}</span>
          </div>
        </div>
      </div>

      <div className="kente-divider" />
    </section>
  );
}
