import type { Metadata } from "next";
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
import { StoryFeature } from "@/components/site/story";
import { getSiteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/** Check Sanity for edits at most once a minute. */
export const revalidate = 60;

const FOCUS_ICONS = {
  economic: Target,
  inclusion: Users,
  wellbeing: HeartHandshake,
} as const;

export default async function HomePage() {
  const c = await getSiteContent();
  const t = c.text.homePage;
  const figure = parseInt(t.s("figureNumber").replace(/[^\d]/g, ""), 10);
  const cta = t.cta();

  return (
    <>
      <Hero />

      <ProofBar />

      {/* Mission */}
      <section data-rhythm-node className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* The photograph takes the full height of the text column, so
                the two end on the same line. */}
            <Reveal className="order-2 lg:order-1 lg:col-span-5">
              <PhotoFigure
                photo={t.photo("missionPhoto")}
                fill
                position="50% 18%"
                sizes="(max-width: 1024px) 100vw, 40vw"
                caption={t.photo("missionPhoto").caption}
              />
            </Reveal>
            <div className="order-1 lg:order-2 lg:col-span-7">
              <Reveal>
                <SectionEyebrow>{t.s("missionEyebrow")}</SectionEyebrow>
                <h2 className="mt-5 font-display text-section text-foreground">
                  {t.s("missionTitle")}
                </h2>
              </Reveal>
              <Reveal delay={120} className="mt-8">
                <p className="text-lg leading-relaxed text-foreground/90">
                  {c.mission}
                </p>
              </Reveal>

              {c.focus.length > 0 && (
                <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-3">
                  {c.focus.map((focus, i) => {
                    const Icon =
                      FOCUS_ICONS[focus.id as keyof typeof FOCUS_ICONS] ?? Target;
                    return (
                      <div key={`${focus.title}-${i}`}>
                        <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
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
              )}
            </div>
          </div>
        </div>
      </section>

      {c.stories[0] && (
        <StoryFeature
          story={c.stories[0]}
          eyebrow={t.s("storyEyebrow")}
          learntLabel={c.text.newsPage.s("learntLabel")}
        />
      )}

      <WhoWeServe />

      {/* Featured programmes */}
      {c.programmes.length > 0 && (
        <section data-rhythm-node className="bg-sand py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <SectionEyebrow>{t.s("programmesEyebrow")}</SectionEyebrow>
                <h2 className="mt-5 font-display text-section text-foreground">
                  {t.s("programmesTitle")}
                </h2>
              </div>
              <Link
                href="/programmes"
                className="group inline-flex shrink-0 items-center py-1 text-sm font-semibold text-primary underline-offset-4 hover:underline"
              >
                {t.s("programmesLinkLabel")}
                <ArrowRight
                  className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </Reveal>

            <RevealGroup
              className={`mt-12 grid gap-6 sm:grid-cols-2 ${c.programmes.length % 3 === 0 || c.programmes.length > 4 ? "lg:grid-cols-3" : ""}`}
            >
              {c.programmes.map((programme) => (
                <ProgrammeCard key={programme.id} programme={programme} />
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      {/* Big number */}
      {t.on("showFigure") && Number.isFinite(figure) && (
        <DataBand
          eyebrow={t.s("figureEyebrow")}
          title={t.s("figureTitle")}
          lede={t.s("figureLede")}
        >
          <div className="grid items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-20">
            <p className="font-display text-[clamp(4.5rem,11vw,8rem)] leading-[0.85] text-accent">
              <CountUp value={figure} />
            </p>
            <div>
              <RegionChips regions={t.lines("figureRegions")} note={t.s("figureNote")} />
              <p className="mt-7 text-sm text-band-foreground/70">
                {t.s("figureTargetNote")}
              </p>
            </div>
          </div>
        </DataBand>
      )}

      {t.on("showQuote") && (
        <PhotoBreak
          photo={t.photo("breakPhoto")}
          quote={t.s("breakQuote")}
          cite={t.s("breakCite")}
        />
      )}

      <div data-rhythm-node>
        <CtaBand
          title={cta.title}
          description={cta.description}
          primaryLabel={cta.primaryLabel}
          primaryHref="/partner"
          secondaryLabel={cta.secondaryLabel}
          secondaryHref="/get-involved#give"
        />
      </div>
    </>
  );
}
