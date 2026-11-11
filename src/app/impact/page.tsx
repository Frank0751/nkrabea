import type { Metadata } from "next";
import { Info } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { SectionEyebrow } from "@/components/site/section-eyebrow";
import { Reveal, RevealGroup } from "@/components/site/reveal";
import { CountUp } from "@/components/site/count-up";
import { Gallery } from "@/components/site/gallery";
import { CtaBand } from "@/components/site/cta-band";
import { DataBand, StageBars, RegionChips } from "@/components/site/figures";
import { StoryFeature } from "@/components/site/story";
import { withBlur } from "@/lib/blur";
import { getSiteContent } from "@/lib/site-content";

/** Check Sanity for edits at most once a minute. */
export const revalidate = 60;

export const metadata: Metadata = {
  alternates: { canonical: "/impact" },
  title: "Our Impact",
  description:
    "Programme targets, milestones and photography from Nkrabea Culture and Arts Ensemble.",
};

export default async function ImpactPage() {
  const c = await getSiteContent();
  const t = c.text.impactPage;
  return (
    <>
      <PageHero
        {...c.heroes.impact}
        crumbs={[{ label: "Impact" }]}
      />

      {c.stories[0] && (
        <StoryFeature
          story={c.stories[0]}
          eyebrow={t.s("storyEyebrow")}
          learntLabel={c.text.newsPage.s("learntLabel")}
        />
      )}

      {/* Figures */}
      <section data-rhythm-node className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <SectionEyebrow>{t.s("figuresEyebrow")}</SectionEyebrow>
            <h2 className="mt-5 font-display text-section text-foreground">
              {t.s("figuresTitle")}
            </h2>
          </Reveal>

          {/* Five cards: the achieved result spans both columns on a
              tablet so no card is left alone on the last row. */}
          <RevealGroup
            className={`mt-12 grid gap-6 sm:grid-cols-2 ${
              c.figures.length === 5 ? "lg:grid-cols-5" : c.figures.length % 3 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-4"
            }`}
          >
            {c.figures.map((figure, i) => {
              const numeric = parseInt(figure.value, 10);
              const isNumber = !Number.isNaN(numeric) && figure.kind !== "fact";
              return (
                <div
                  key={`${figure.label}-${i}`}
                  className={`spotlight-card card-lift rounded-2xl border border-border bg-card p-6 ${
                    figure.kind === "achieved" && c.figures.length % 2 === 1 ? "sm:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  <p className="font-display text-4xl leading-none tracking-tight text-foreground">
                    {isNumber ? <CountUp value={numeric} /> : figure.value}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-foreground/90">
                    {figure.label}
                  </p>
                  <p
                    className={`label-mono mt-4 inline-block rounded-full px-2 py-0.5 ${
                      figure.kind === "target"
                        ? "bg-accent/20 text-gold-ink"
                        : figure.kind === "achieved"
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {figure.kind}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    {figure.source}
                  </p>
                </div>
              );
            })}
          </RevealGroup>

          <Reveal delay={140}>
            <p className="mt-10 flex max-w-2xl items-start gap-3 rounded-xl border border-border bg-muted/50 p-5 text-sm leading-relaxed text-muted-foreground">
              <Info
                className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                aria-hidden="true"
              />
              <span>{t.s("figuresNote")}</span>
            </p>
          </Reveal>
        </div>
      </section>

      {t.on("showChart") && t.values("stages").length > 0 && (
      <DataBand
        eyebrow={t.s("chartEyebrow")}
        title={t.s("chartTitle")}
        lede={t.s("chartLede")}
      >
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          <StageBars
            stages={t.values("stages")}
            caption={t.s("stagesCaption")}
          />

          <div>
            <p className="label-mono text-accent">{t.s("regionsLabel")}</p>
            <div className="section-mark mt-4" aria-hidden="true" />
            <div className="mt-7">
              <RegionChips
                regions={t.lines("regions")}
                note={t.s("regionsNote")}
              />
            </div>
            <p className="mt-8 max-w-md text-sm leading-relaxed text-band-foreground/70">
              {t.s("chartDetail")}
            </p>
          </div>
        </div>
      </DataBand>
      )}

      {/* Milestones */}
      <section
        data-rhythm-node
        className="bg-sand py-20 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <SectionEyebrow>{t.s("milestonesEyebrow")}</SectionEyebrow>
            <h2 className="mt-5 font-display text-section text-foreground">
              {t.s("milestonesTitle")}
            </h2>
          </Reveal>

          <RevealGroup as="ol" className="mt-12 space-y-6">
            {c.milestones.map((milestone, i) => (
              <li
                key={`${milestone.year}-${i}`}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:gap-8 sm:p-7"
              >
                <span className="font-display text-2xl text-accent sm:w-24 sm:shrink-0">
                  {milestone.year}
                </span>
                <div>
                  <h3 className="font-display text-lg text-foreground">
                    {milestone.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {milestone.description}
                  </p>
                </div>
              </li>
            ))}
          </RevealGroup>

          <Reveal delay={120}>
            <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {t.s("milestonesNote")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Gallery */}
      <section data-rhythm-node className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <SectionEyebrow>{t.s("galleryEyebrow")}</SectionEyebrow>
            <h2 className="mt-5 font-display text-section text-foreground">
              {t.s("galleryTitle")}
            </h2>
          </Reveal>

          <div className="mt-12">
            <Gallery items={c.gallery.map(withBlur)} />
          </div>
        </div>
      </section>

      {/* Testimonials, only when real ones exist */}
      {c.testimonials.length > 0 && (
        <section
          data-rhythm-node
          className="bg-sand py-20 lg:py-28"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal className="max-w-2xl">
              <SectionEyebrow>{t.s("testimonialsEyebrow")}</SectionEyebrow>
            </Reveal>
            <RevealGroup className="mt-12 grid gap-6 lg:grid-cols-3">
              {c.testimonials.map((t) => (
                <figure
                  key={t.author}
                  className="rounded-2xl border border-border bg-card p-7"
                >
                  <blockquote className="text-base leading-relaxed text-foreground/90">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-5 text-sm">
                    <span className="font-semibold text-foreground">
                      {t.author}
                    </span>
                    <span className="block text-muted-foreground">
                      {t.role}
                      {t.organisation ? `, ${t.organisation}` : ""}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      <div data-rhythm-node>
        <CtaBand
          title={t.cta().title}
          description={t.cta().description}
          primaryLabel={t.cta().primaryLabel}
          primaryHref="/partner"
          secondaryLabel={t.cta().secondaryLabel}
          secondaryHref="/get-involved#give"
        />
      </div>
    </>
  );
}
