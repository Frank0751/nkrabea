import Link from "next/link";
import { ArrowRight, Target, Users, HeartHandshake } from "lucide-react";
import { Hero } from "@/components/site/hero";
import { SectionEyebrow } from "@/components/site/section-eyebrow";
import { Reveal, RevealGroup } from "@/components/site/reveal";
import { CountUp } from "@/components/site/count-up";
import { CtaBand } from "@/components/site/cta-band";
import { ProgrammeCard } from "@/components/site/programme-card";
import { PROGRAMMES, STRATEGIC_FOCUS, FIGURES, MISSION } from "@/lib/content";

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

      {/* Mission */}
      <section
        data-rhythm-node
        className="border-b border-border py-20 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionEyebrow>Our mission</SectionEyebrow>
                <h2 className="mt-5 font-display text-3xl leading-tight tracking-tight text-foreground sm:text-4xl">
                  Culture is the tool. Development is the work.
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <Reveal delay={120}>
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

      {/* Featured programmes */}
      <section
        data-rhythm-node
        className="border-b border-border bg-secondary/40 py-20 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <SectionEyebrow>Our work</SectionEyebrow>
              <h2 className="mt-5 font-display text-3xl leading-tight tracking-tight text-foreground sm:text-4xl">
                The programmes we are running and raising for
              </h2>
            </div>
            <Link
              href="/programmes"
              className="group inline-flex shrink-0 items-center text-sm font-semibold text-primary underline-offset-4 hover:underline"
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
        <section
          data-rhythm-node
          className="border-b border-border bg-band py-20 text-band-foreground lg:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal className="mx-auto max-w-3xl text-center">
              <p className="label-mono text-accent">The scale of the need</p>
              <p className="mt-6 font-display text-6xl leading-none tracking-tight sm:text-7xl">
                <CountUp value={500} />
              </p>
              <p className="mt-5 text-lg leading-relaxed text-band-foreground/80">
                persons with disabilities to be trained across Greater Accra,
                Ashanti, Central and Eastern regions under our accessible soap
                production programme.
              </p>
              <p className="mt-4 text-sm text-band-foreground/55">
                A programme target, not a result to date.
              </p>
            </Reveal>
          </div>
        </section>
      )}

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
