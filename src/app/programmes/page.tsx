import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { SectionEyebrow } from "@/components/site/section-eyebrow";
import { Reveal, RevealGroup } from "@/components/site/reveal";
import { CtaBand } from "@/components/site/cta-band";
import { DataBand, SplitBar, StatTile, ProcessSteps } from "@/components/site/figures";
import { PhotoFigure, PhotoBreak } from "@/components/site/photo";
import { ProgrammeFeature } from "@/components/site/programme-feature";
import { getSiteContent } from "@/lib/site-content";

/** Check Sanity for edits at most once a minute. */
export const revalidate = 60;

export const metadata: Metadata = {
  alternates: { canonical: "/programmes" },
  title: "Our Work",
  description:
    "The programmes Nkrabea is running and raising funds for: skills development at Cape Coast School for the Deaf, accessible soap production for persons with disabilities, and a Culture and Arts Centre.",
};

/** The two parts of the split bar take the chart palette in order. */
const SPLIT_TOKENS = ["--chart-2", "--chart-1", "--chart-3"];

export default async function ProgrammesPage() {
  const c = await getSiteContent();
  const t = c.text.programmesPage;
  const total = parseInt(t.s("splitTotal").replace(/[^\d]/g, ""), 10);
  const parts = t.values("splitParts").map((p, i) => ({
    name: p.name,
    value: p.value,
    token: SPLIT_TOKENS[i % SPLIT_TOKENS.length],
  }));
  const stats = t.stats("stats");
  const artForms = t.cards("artForms");
  const steps = t.steps("steps");
  const cta = t.cta();

  return (
    <>
      <PageHero {...c.heroes.programmes} crumbs={[{ label: "Our Work" }]} />

      {c.programmes.length > 0 && (
        <section data-rhythm-node className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl space-y-20 px-4 sm:px-6 lg:space-y-28 lg:px-8">
            {c.programmes.map((programme, index) => (
              <ProgrammeFeature key={programme.id} programme={programme} index={index} />
            ))}
          </div>
        </section>
      )}

      {t.on("showChart") && Number.isFinite(total) && total > 0 && (
        <DataBand eyebrow={t.s("chartEyebrow")} title={t.s("chartTitle")} lede={t.s("chartLede")}>
          <div className={`grid gap-14 ${stats.length > 0 ? "lg:grid-cols-2 lg:gap-16" : ""}`}>
            <SplitBar
              total={total}
              totalLabel={t.s("splitTotalLabel")}
              parts={parts}
              caption={t.s("splitCaption")}
            />
            {stats.length > 0 && (
              <div className="grid gap-5 sm:grid-cols-2">
                {stats.map((stat, i) => (
                  <StatTile key={`${stat.label}-${i}`} value={stat.value} label={stat.label} note={stat.note} />
                ))}
              </div>
            )}
          </div>
        </DataBand>
      )}

      {/* Art forms */}
      {(artForms.length > 0 || (t.on("showSteps") && steps.length > 0)) && (
        <section data-rhythm-node className="bg-sand py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {artForms.length > 0 && (
              <>
                <Reveal className="max-w-2xl">
                  <SectionEyebrow>{t.s("artEyebrow")}</SectionEyebrow>
                  <h2 className="mt-5 font-display text-section text-foreground">{t.s("artTitle")}</h2>
                </Reveal>

                <RevealGroup className={`mt-12 grid gap-6 sm:grid-cols-2 ${artForms.length >= 3 ? "lg:grid-cols-3" : ""}`}>
                  {artForms.map((form, i) => (
                    <div
                      key={`${form.title}-${i}`}
                      className="spotlight-card card-lift overflow-hidden rounded-2xl border border-border bg-card"
                    >
                      {form.photo && (
                        <PhotoFigure photo={form.photo} ratio="16/9" sizes="(max-width: 640px) 100vw, 50vw" bare />
                      )}
                      <div className="p-7">
                        <h3 className="font-display text-lg text-foreground">{form.title}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{form.body}</p>
                      </div>
                    </div>
                  ))}
                </RevealGroup>
              </>
            )}

            {t.on("showSteps") && steps.length > 0 && (
              <Reveal delay={140} className={artForms.length > 0 ? "mt-20" : ""}>
                <h3 className="font-display text-sub text-foreground">{t.s("stepsTitle")}</h3>
                <div className="mt-10">
                  <ProcessSteps steps={steps} caption={t.s("stepsCaption")} />
                </div>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {t.on("showPhoto") && <PhotoBreak photo={t.photo("breakPhoto")} label={t.s("breakLabel")} />}

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
