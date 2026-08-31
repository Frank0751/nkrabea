import type { Metadata } from "next";
import Image from "next/image";
import { Drum, Music, Sprout, Wind, type LucideIcon } from "lucide-react";
import { ENSEMBLE } from "@/lib/content";
import { PageHero } from "@/components/site/page-hero";
import { SectionEyebrow } from "@/components/site/section-eyebrow";
import { Reveal } from "@/components/site/reveal";
import { CtaBand } from "@/components/site/cta-band";
import { Testimonials } from "@/components/site/testimonials";

export const metadata: Metadata = {
  title: "Ensemble",
  description:
    "The Nkrabea ensemble moves as a single body: master drummers, principal dancers, vocalists and apprentices. Four limbs, one tradition, trained across every form.",
};

type Limb = {
  icon: LucideIcon;
  description: string;
};

// Parallel metadata for each ENSEMBLE member, keyed by name for stable pairing.
const LIMBS: Record<string, Limb> = {
  "The Master Drummers": {
    icon: Drum,
    description:
      "The drum speaks before the dancer moves. Our master drummers carry the language of the atumpan and the pulse that holds every form together.",
  },
  "Principal Dancers": {
    icon: Wind,
    description:
      "Soloists and lead performers who carry Adowa, Kete and the contemporary stage. Discipline, restraint and gesture, learned from the court outward.",
  },
  Vocalists: {
    icon: Music,
    description:
      "The voice that holds the call and response. Akan oral tradition carried in song, praise and proverb, threaded through every performance.",
  },
  "Apprentice Company": {
    icon: Sprout,
    description:
      "Graduates of the Youth Academy. They train across every limb and carry the tradition into the next generation, on stage and in the studio.",
  },
};

const TRAINING = [
  {
    number: "01",
    title: "Foundation",
    subtitle: "Drumming first",
    body: "Every member, dancer or vocalist, learns the drum. The atumpan speaks the tones of Twi, and to understand rhythm is to understand the language the dance is set to.",
  },
  {
    number: "02",
    title: "Movement",
    subtitle: "Gesture and footwork",
    body: "The hands carry proverbs, the feet carry the rhythm. Members train in Adowa hand language and Kete footwork, learning restraint as the first discipline of the court forms.",
  },
  {
    number: "03",
    title: "Performance",
    subtitle: "Stage craft",
    body: "From community celebrations in Adenta to international festival stages, members learn to read an audience, hold a set and carry tradition onto any stage without losing it.",
  },
];

const BACKSTAGE = [
  {
    src: "/images/social/fb-2.jpg",
    alt: "Close up of a Nkrabea dancer mid movement, beadwork in detail",
    caption: "Detail in motion, beadwork and gesture",
  },
  {
    src: "/images/social/fb-5.jpg",
    alt: "Mixed media installation of masks and textile collage in the studio",
    caption: "Studio installation, masks in dialogue",
  },
  {
    src: "/images/social/fb-6.jpg",
    alt: "Framed painting of a figure in a patchwork robe between carved pillars",
    caption: "Symbolism and patchwork, framed",
  },
];

export default function EnsemblePage() {
  return (
    <>
      <PageHero
        eyebrow="The company"
        title="One ensemble, four limbs"
        description="Nkrabea moves as a single body. The drum speaks, the dancer answers, the voice carries the story, and the apprentices hold what comes next. Every member trains across all four limbs, so the body never breaks."
        image="/images/social/fb-1.jpg"
        imageAlt="Nkrabea dancers in kente cloth and beaded necklaces with camera crew"
        crumbs={[{ label: "Ensemble" }]}
      />

      {/* Company structure: 2x2 grid of limbs */}
      <section
        aria-labelledby="company-heading"
        className="bg-background py-20 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Reveal>
              <SectionEyebrow>The structure</SectionEyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2
                id="company-heading"
                className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl"
              >
                Four limbs of one body
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Each limb has its own discipline and its own role, but no limb
                stands alone. The drummer learns to dance, the dancer learns
                to drum, the vocalist knows the rhythm, and the apprentice
                learns all three.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
            {ENSEMBLE.map((member, i) => {
              const limb = LIMBS[member.name];
              const Icon = limb?.icon ?? Drum;
              return (
                <Reveal key={member.name} delay={i * 90}>
                  <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 lg:p-9">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                        Limb {String(i + 1).padStart(2, "0")} / 04
                      </span>
                    </div>

                    <span className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                      {member.role}
                    </span>
                    <h3 className="mt-2 font-display text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
                      {member.name}
                    </h3>
                    <p className="mt-3 text-sm font-medium text-foreground/85">
                      {member.focus}
                    </p>
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                      {limb?.description}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* How we train: 3 columns */}
      <section
        aria-labelledby="training-heading"
        className="border-y border-border bg-secondary/40 py-20 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Reveal>
              <SectionEyebrow>How we train</SectionEyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2
                id="training-heading"
                className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl"
              >
                Three stages, one craft
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Every member of the ensemble trains across all four limbs.
                The drummer learns to dance, the dancer learns to drum, and
                the vocalist knows the rhythm of both. Training moves through
                three stages, from the drum to the stage.
              </p>
            </Reveal>
          </div>

          <ol className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
            {TRAINING.map((step, i) => (
              <Reveal key={step.number} delay={i * 100}>
                <li className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 lg:p-8">
                  <span className="font-display text-4xl font-semibold tracking-tight text-primary">
                    {step.number}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-foreground">
                    {step.title}
                  </h3>
                  <span className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    {step.subtitle}
                  </span>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Leadership pull-quote on dark band */}
      <section
        aria-labelledby="leadership-heading"
        className="bg-foreground py-20 text-primary-foreground lg:py-28"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <span
              aria-hidden="true"
              className="font-display text-5xl leading-none text-accent"
            >
              &ldquo;
            </span>
          </Reveal>
          <Reveal delay={80}>
            <p
              id="leadership-heading"
              className="mt-4 font-display text-2xl font-semibold leading-snug tracking-tight sm:text-3xl lg:text-4xl"
            >
              We move as a single body. The drum speaks, the dancer answers,
              the voice carries the story, and the apprentice holds what comes
              next. That is how Ghanaian culture travels, limb by limb, to a
              world that is ready to feel it.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-8 text-sm font-medium uppercase tracking-[0.2em] text-primary-foreground/60">
              Artistic direction, Nkrabea Culture &amp; Arts Ensemble
            </p>
          </Reveal>
        </div>
      </section>

      {/* Behind the scenes gallery */}
      <section
        aria-labelledby="backstage-heading"
        className="bg-background py-20 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Reveal>
              <SectionEyebrow>Behind the scenes</SectionEyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2
                id="backstage-heading"
                className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl"
              >
                In the studio and on the road
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                A glimpse between performances: detail, installation and
                symbolism from the rehearsal room and the wider cultural work
                of the ensemble.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {BACKSTAGE.map((shot, i) => (
              <Reveal key={shot.src} delay={i * 100}>
                <figure className="flex h-full flex-col">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border">
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-3 text-sm font-medium text-muted-foreground">
                    {shot.caption}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      <CtaBand
        title="See the ensemble on your stage"
        description="Book master drummers, principal dancers, vocalists and apprentices for your festival, theatre, school or cultural exchange. Every performance funds the training of the next generation of Ghanaian artists."
        primaryLabel="Start a booking"
        primaryHref="/bookings"
        secondaryLabel="View upcoming events"
        secondaryHref="/events"
      />
    </>
  );
}
