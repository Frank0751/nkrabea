import Link from "next/link";
import { ArrowRight, Target, Users, HeartHandshake } from "lucide-react";
import { Hero } from "@/components/site/hero";
import { SectionEyebrow } from "@/components/site/section-eyebrow";
import { Reveal, RevealGroup } from "@/components/site/reveal";
import { CountUp } from "@/components/site/count-up";
import { CtaBand } from "@/components/site/cta-band";
import { ProgrammeCard } from "@/components/site/programme-card";
import { ProofBar } from "@/components/site/proof-bar";
import { DataBand, RegionChips } from "@/components/site/figures";
import { PhotoFigure, PhotoBreak } from "@/components/site/photo";
import { WhoWeServe } from "@/components/site/who-we-serve";
import {
  PROGRAMMES,
  STRATEGIC_FOCUS,
  FIGURES,
  MISSION,
  PROGRAMME_FIGURES,
  PHOTOS,
  IDENTITY,
} from "@/lib/content";

const FOCUS_ICONS = {
  economic: Target,
  inclusion: Users,
  wellbeing: HeartHandshake,
} as const;

export default function HomePage() {
  const headline = FIGURES.find((f) => f.value === "500");

  return (
    <>
      <Hero />

      <ProofBar />

      {/* Mission */}
      <section
        data-rhythm-node
        className="py-20 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* The photograph takes the full height of the text column, so
                the two end on the same line instead of the picture hanging
                below a short paragraph with a hole beside it. */}
            <Reveal className="order-2 lg:order-1 lg:col-span-5">
              <PhotoFigure
                photo={PHOTOS.loom}
                fill
                position="50% 18%"
                sizes="(max-width: 1024px) 100vw, 40vw"
                caption={PHOTOS.loom.caption}
              />
            </Reveal>
            <div className="order-1 lg:order-2 lg:col-span-7">
              <Reveal>
                <SectionEyebrow>Our mission</SectionEyebrow>
                <h2 className="mt-5 font-display text-section text-foreground">
                  Culture is the tool. Development is the work.
                </h2>
              </Reveal>
              <Reveal delay={120} className="mt-8">
                <p className="text-lg leading-relaxed text-foreground/90">
                  {MISSION}
                </p>
              </Reveal>

              <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-3">
                {STRATEGIC_FOCUS.map((focus) => {
                  const Icon =
                    FOCUS_ICONS[focus.id as keyof typeof FOCUS_ICONS] ?? Target;
                  return (
                    <div key={focus.id}>
                      <Icon
                        className="h-5 w-5 text-primary"
                        aria-hidden="true"
                      />
                      <h3 className="mt-3 font-display text-base text-foreground">
                        {focus.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {focus.description}
                      </p>
                    </div>
                  );
                })}
              </RevealGroup>
            </div>
          </div>
        </div>
      </section>

      <WhoWeServe />

      {/* Featured programmes */}
      <section
        data-rhythm-node
        className="bg-sand py-20 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <SectionEyebrow>Our work</SectionEyebrow>
              <h2 className="mt-5 font-display text-section text-foreground">
                The programmes we are running and raising for
              </h2>
            </div>
            <Link
              href="/programmes"
              className="group inline-flex shrink-0 items-center py-1 text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              All programmes
              <ArrowRight
                className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-6 lg:grid-cols-3">
            {PROGRAMMES.map((programme) => (
              <ProgrammeCard key={programme.id} programme={programme} />
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Headline figure */}
      {headline && (
        <DataBand
          eyebrow="The scale of the need"
          title="Five hundred people, four regions, one programme"
          lede="Our accessible soap production programme is designed to train five hundred persons with disabilities in a trade they can run themselves."
        >
          <div className="grid items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-20">
            <p className="font-display text-[clamp(4.5rem,11vw,8rem)] leading-[0.85] text-accent">
              <CountUp value={500} />
            </p>
            <div>
              <RegionChips
                regions={PROGRAMME_FIGURES.soapProduction.regions}
                note="Nkrabea has not published how the five hundred places divide between these four regions, so no split is drawn."
              />
              <p className="mt-7 text-sm text-band-foreground/70">
                A programme target, not a result to date.
              </p>
            </div>
          </div>
        </DataBand>
      )}

      <PhotoBreak
        photo={PHOTOS.fiveDancers}
        quote={IDENTITY.whoWeAre[1]}
        cite="From our organisational profile"
      />

      <div data-rhythm-node>
        <CtaBand
          title="Support that works as investment, not charity"
          description="We work with corporate sponsors, grant funders and institutional partners to put Ghanaian culture to work for the communities that need it most."
          primaryLabel="Partner With Us"
          primaryHref="/partner"
          secondaryLabel="Make a donation"
          secondaryHref="/get-involved"
        />
      </div>
    </>
  );
}
