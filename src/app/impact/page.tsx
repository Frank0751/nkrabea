import type { Metadata } from "next";
import { Info } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { SectionEyebrow } from "@/components/site/section-eyebrow";
import { Reveal, RevealGroup } from "@/components/site/reveal";
import { CountUp } from "@/components/site/count-up";
import { Gallery } from "@/components/site/gallery";
import { CtaBand } from "@/components/site/cta-band";
import { FIGURES, MILESTONES, TESTIMONIALS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Impact",
  description:
    "Programme targets, milestones and photography from Nkrabea Culture and Arts Ensemble.",
};

export default function ImpactPage() {
  return (
    <>
      <PageHero
        eyebrow="Our impact"
        title="What we are set up to change"
        description="The figures below state plainly whether each is a programme target or a result already achieved."
        image="/images/social/fb-2.jpg"
        imageAlt="Members of the Nkrabea ensemble performing together."
        crumbs={[{ label: "Impact" }]}
      />

      {/* Figures */}
      <section data-rhythm-node className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <SectionEyebrow>By the numbers</SectionEyebrow>
            <h2 className="mt-5 font-display text-3xl leading-tight tracking-tight text-foreground sm:text-4xl">
              Targets and facts, labelled as such
            </h2>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FIGURES.map((figure) => {
              const numeric = parseInt(figure.value, 10);
              const isNumber = !Number.isNaN(numeric) && figure.kind !== "fact";
              return (
                <div
                  key={figure.label}
                  className="spotlight-card rounded-2xl border border-border bg-card p-6"
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
              <span>
                Nkrabea publishes programme targets and achieved results
                separately. A target describes what a funded programme is
                designed to deliver, not what has already been delivered.
              </span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Milestones */}
      <section
        data-rhythm-node
        className="border-y border-border bg-secondary/40 py-20 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <SectionEyebrow>Milestones</SectionEyebrow>
            <h2 className="mt-5 font-display text-3xl leading-tight tracking-tight text-foreground sm:text-4xl">
              The record so far
            </h2>
          </Reveal>

          <RevealGroup as="ol" className="mt-12 space-y-6">
            {MILESTONES.map((milestone) => (
              <li
                key={milestone.year}
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
              Further milestones will be published as Nkrabea confirms dates and
              supporting evidence for each.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Gallery */}
      <section data-rhythm-node className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <SectionEyebrow>In the frame</SectionEyebrow>
            <h2 className="mt-5 font-display text-3xl leading-tight tracking-tight text-foreground sm:text-4xl">
              Our work in pictures
            </h2>
          </Reveal>

          <div className="mt-12">
            <Gallery />
          </div>
        </div>
      </section>

      {/* Testimonials, only when real ones exist */}
      {TESTIMONIALS.length > 0 && (
        <section
          data-rhythm-node
          className="border-t border-border bg-secondary/40 py-20 lg:py-28"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal className="max-w-2xl">
              <SectionEyebrow>In their words</SectionEyebrow>
            </Reveal>
            <RevealGroup className="mt-12 grid gap-6 lg:grid-cols-3">
              {TESTIMONIALS.map((t) => (
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
          title="Turn a target into a result"
          description="Every figure on this page becomes an achieved result once a programme is funded."
          primaryLabel="Partner With Us"
          primaryHref="/partner"
          secondaryLabel="Make a donation"
          secondaryHref="/get-involved"
        />
      </div>
    </>
  );
}
