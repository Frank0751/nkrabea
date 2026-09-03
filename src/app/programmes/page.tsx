import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { SectionEyebrow } from "@/components/site/section-eyebrow";
import { Reveal, RevealGroup } from "@/components/site/reveal";
import { CtaBand } from "@/components/site/cta-band";
import { PROGRAMMES, ART_FORMS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "The programmes Nkrabea is running and raising funds for: skills development at Cape Coast School for the Deaf, accessible soap production for persons with disabilities, and a Culture and Arts Centre.",
};

const STATUS_LABEL = {
  running: "Running",
  fundraising: "Raising funds",
  vision: "Long-term vision",
} as const;

export default function ProgrammesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our work"
        title="Programmes with a measurable end"
        description="Nkrabea is currently running and raising funds for the following initiatives."
        image="/images/social/fb-reel.jpg"
        imageAlt="A woman dancing under a canopy at an outdoor gathering, with drummers playing behind her."
        crumbs={[{ label: "Our Work" }]}
      />

      <section data-rhythm-node className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-16 lg:space-y-24">
            {PROGRAMMES.map((programme, index) => (
              <Reveal key={programme.id}>
                <article className="grid gap-8 lg:grid-cols-12 lg:gap-12">
                  <div className="lg:col-span-4">
                    <p className="label-mono text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <span
                      className={`label-mono mt-4 inline-block rounded-full px-2.5 py-1 ${
                        programme.status === "fundraising"
                          ? "bg-accent/20 text-gold-ink"
                          : programme.status === "running"
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {STATUS_LABEL[programme.status]}
                    </span>
                    <h2 className="mt-5 font-display text-2xl leading-snug tracking-tight text-foreground sm:text-3xl">
                      {programme.name}
                    </h2>
                    {programme.value && (
                      <p className="mt-4 text-sm text-muted-foreground">
                        Programme value{" "}
                        <span className="font-semibold text-emphasis">
                          {programme.value}
                        </span>
                      </p>
                    )}
                  </div>

                  <div className="lg:col-span-8">
                    <p className="text-base leading-relaxed text-foreground/90 sm:text-lg">
                      {programme.summary}
                    </p>

                    <ul className="mt-8 space-y-4">
                      {programme.details.map((detail) => (
                        <li
                          key={detail}
                          className="flex gap-4 border-b border-border pb-4 last:border-0"
                        >
                          <span
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                            aria-hidden="true"
                          />
                          <span className="text-sm leading-relaxed text-foreground/90 sm:text-base">
                            {detail}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {programme.sdgs && programme.sdgs.length > 0 && (
                      <p className="mt-6 text-sm text-muted-foreground">
                        Aligns with UN Sustainable Development Goals{" "}
                        {programme.sdgs.join(", ")}.
                      </p>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Art forms */}
      <section
        data-rhythm-node
        className="border-t border-border bg-secondary/40 py-20 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <SectionEyebrow>How we teach</SectionEyebrow>
            <h2 className="mt-5 font-display text-3xl leading-tight tracking-tight text-foreground sm:text-4xl">
              The art forms we work through
            </h2>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2">
            {ART_FORMS.map((form) => (
              <div
                key={form.id}
                className="spotlight-card rounded-2xl border border-border bg-card p-7"
              >
                <h3 className="font-display text-lg text-foreground">
                  {form.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {form.note}
                </p>
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>

      <div data-rhythm-node>
        <CtaBand
          title="Fund a programme"
          description="Each of these initiatives is costed and ready to run. Partnership puts them in motion."
          primaryLabel="Partner With Us"
          primaryHref="/partner"
          secondaryLabel="Make a donation"
          secondaryHref="/get-involved"
        />
      </div>
    </>
  );
}
