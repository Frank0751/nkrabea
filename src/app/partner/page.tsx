import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { SectionEyebrow } from "@/components/site/section-eyebrow";
import { Reveal, RevealGroup } from "@/components/site/reveal";
import { PartnershipForm } from "@/components/site/partnership-form";
import { PhotoFigure } from "@/components/site/photo";
import { AUDIENCES, PROGRAMMES, HERO_PHOTOS, PHOTOS } from "@/lib/content";

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
        photo={HERO_PHOTOS.partner}
        crumbs={[{ label: "Partner" }]}
      />

      {/* The case */}
      <section data-rhythm-node className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <SectionEyebrow>The case for support</SectionEyebrow>
            <h2 className="mt-5 font-display text-section text-foreground">
              What your funding actually does
            </h2>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2">
            {CASE_POINTS.map((point) => (
              <div
                key={point.title}
                className="spotlight-card card-lift rounded-2xl border border-border bg-card p-7"
              >
                <h3 className="font-display text-lg leading-snug text-foreground">
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
        className="bg-sand py-20 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <SectionEyebrow>Who we work with</SectionEyebrow>
            <h2 className="mt-5 font-display text-section text-foreground">
              Four kinds of partner
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-5">
              <PhotoFigure
                photo={PHOTOS.chiefOutside}
                fill
                position="50% 20%"
                sizes="(max-width: 1024px) 100vw, 40vw"
                caption={PHOTOS.chiefOutside.caption}
              />
            </Reveal>
            {/* Four stacked entries set the height; the photograph matches it. */}
            <RevealGroup className="grid gap-8 lg:col-span-7 lg:content-center">
              {AUDIENCES.map((audience) => (
                <div key={audience.id} className="border-l-2 border-gold-edge/50 pl-5">
                  <h3 className="font-display text-lg leading-snug text-foreground">
                    {audience.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    {audience.need}
                  </p>
                </div>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* Programmes open to funding */}
      <section data-rhythm-node className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* The photograph runs the full height of the list and the form
                together, so nothing hangs below anything. */}
            <Reveal className="order-2 lg:order-1 lg:col-span-4">
              <PhotoFigure
                photo={PHOTOS.chiefUnderUmbrella}
                fill
                position="50% 25%"
                sizes="(max-width: 1024px) 100vw, 33vw"
                caption={PHOTOS.chiefUnderUmbrella.caption}
              />
            </Reveal>

            <div className="order-1 lg:order-2 lg:col-span-8">
              <Reveal>
                <SectionEyebrow>Open for funding</SectionEyebrow>
                <h2 className="mt-5 font-display text-section text-foreground">
                  Programmes ready to run
                </h2>
                <ul className="mt-8 grid gap-5 sm:grid-cols-2">
                  {PROGRAMMES.filter((p) => p.status === "fundraising").map(
                    (p) => (
                      <li key={p.id} className="border-l-2 border-accent pl-5">
                        <h3 className="font-display text-base leading-snug text-foreground">
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

              <Reveal delay={120} className="mt-12">
                <h3 className="font-display text-2xl leading-tight tracking-tight text-foreground">
                  Start a conversation
                </h3>
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
