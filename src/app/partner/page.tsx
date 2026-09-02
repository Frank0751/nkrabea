import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { SectionEyebrow } from "@/components/site/section-eyebrow";
import { Reveal, RevealGroup } from "@/components/site/reveal";
import { PartnershipForm } from "@/components/site/partnership-form";
import { AUDIENCES, PROGRAMMES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Partner With Us",
  description:
    "Nkrabea works with corporate sponsors, grant funders and institutional partners. Support is structured as strategic investment in Ghanaian communities.",
};

const CASE_POINTS = [
  {
    title: "Equipment stays with the community",
    body: "Under the Cape Coast programme, every instrument and loom procured remains permanently at the school as an institutional asset. Your funding does not evaporate when the programme ends.",
  },
  {
    title: "Costed, time-bound programmes",
    body: "Each initiative has a defined value, duration and beneficiary count, so a funder can see exactly what a contribution buys and when it completes.",
  },
  {
    title: "Aligned to the SDGs",
    body: "Our skills development work aligns with UN Sustainable Development Goals 4, 8, 10 and 17, which maps directly onto most corporate and institutional reporting frameworks.",
  },
  {
    title: "Governed and accountable",
    body: "A registered NGO with an Executive Council, a board secretary and an eight member management team. Accountability is one of our seven core values, not an afterthought.",
  },
];

export default function PartnerPage() {
  return (
    <>
      <PageHero
        eyebrow="Partner with us"
        title="Strategic investment, not charity"
        description="We frame support as investment because that is what it is: capability built, livelihoods created, assets left behind."
        crumbs={[{ label: "Partner" }]}
      />

      {/* The case */}
      <section data-rhythm-node className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <SectionEyebrow>The case for support</SectionEyebrow>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
              What your funding actually does
            </h2>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2">
            {CASE_POINTS.map((point) => (
              <div
                key={point.title}
                className="spotlight-card rounded-2xl border border-border bg-card p-7"
              >
                <h3 className="font-display text-lg font-semibold leading-snug text-foreground">
                  {point.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {point.body}
                </p>
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Who we work with */}
      <section
        data-rhythm-node
        className="border-y border-border bg-secondary/40 py-20 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <SectionEyebrow>Who we work with</SectionEyebrow>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
              Four kinds of partner
            </h2>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {AUDIENCES.map((audience) => (
              <div key={audience.id}>
                <h3 className="font-display text-base font-semibold leading-snug text-foreground">
                  {audience.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {audience.need}
                </p>
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Programmes open to funding */}
      <section data-rhythm-node className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionEyebrow>Open for funding</SectionEyebrow>
                <h2 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
                  Programmes ready to run
                </h2>
                <ul className="mt-8 space-y-5">
                  {PROGRAMMES.filter((p) => p.status === "fundraising").map(
                    (p) => (
                      <li key={p.id} className="border-l-2 border-accent pl-5">
                        <h3 className="font-display text-base font-semibold leading-snug text-foreground">
                          {p.name}
                        </h3>
                        {p.value && (
                          <p className="mt-1.5 text-sm font-semibold text-emphasis">
                            {p.value}
                          </p>
                        )}
                      </li>
                    )
                  )}
                </ul>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal delay={120}>
                <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight text-foreground">
                  Start a conversation
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Tell us a little about your organisation and we will come back
                  with a proposal that fits.
                </p>
                <div className="mt-6">
                  <PartnershipForm />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
