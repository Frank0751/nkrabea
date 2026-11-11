import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { SectionEyebrow } from "@/components/site/section-eyebrow";
import { Reveal, RevealGroup } from "@/components/site/reveal";
import { PartnershipForm } from "@/components/site/partnership-form";
import { PhotoFigure } from "@/components/site/photo";
import { getSiteContent } from "@/lib/site-content";

/** Check Sanity for edits at most once a minute. */
export const revalidate = 60;

export const metadata: Metadata = {
  alternates: { canonical: "/partner" },
  title: "Partner With Us",
  description:
    "Nkrabea works with corporate sponsors, grant funders and institutional partners. Support is structured as strategic investment in Ghanaian communities.",
};

export default async function PartnerPage() {
  const c = await getSiteContent();
  const t = c.text.partnerPage;
  return (
    <>
      <PageHero
        {...c.heroes.partner}
        crumbs={[{ label: "Partner" }]}
      />

      {/* The case */}
      <section data-rhythm-node className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <SectionEyebrow>{t.s("caseEyebrow")}</SectionEyebrow>
            <h2 className="mt-5 font-display text-section text-foreground">
              {t.s("caseTitle")}
            </h2>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2">
            {t.cards("casePoints").map((point, i) => (
              <div
                key={`${point.title}-${i}`}
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
            <SectionEyebrow>{t.s("partnersEyebrow")}</SectionEyebrow>
            <h2 className="mt-5 font-display text-section text-foreground">
              {t.s("partnersTitle")}
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-5">
              <PhotoFigure
                photo={t.photo("partnersPhoto")}
                fill
                position="50% 20%"
                sizes="(max-width: 1024px) 100vw, 40vw"
                caption={t.photo("partnersPhoto").caption}
              />
            </Reveal>
            {/* Four stacked entries set the height; the photograph matches it. */}
            <RevealGroup className="grid gap-8 lg:col-span-7 lg:content-center">
              {c.text.homePage.cards("audiences").map((audience, i) => (
                <div key={`${audience.title}-${i}`} className="border-l-2 border-gold-edge/50 pl-5">
                  <h3 className="font-display text-lg leading-snug text-foreground">
                    {audience.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    {audience.body}
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
                photo={t.photo("fundingPhoto")}
                fill
                position="50% 25%"
                sizes="(max-width: 1024px) 100vw, 33vw"
                caption={t.photo("fundingPhoto").caption}
              />
            </Reveal>

            <div className="order-1 lg:order-2 lg:col-span-8">
              <Reveal>
                <SectionEyebrow>{t.s("fundingEyebrow")}</SectionEyebrow>
                <h2 className="mt-5 font-display text-section text-foreground">
                  {t.s("fundingTitle")}
                </h2>
                <ul className="mt-8 grid gap-5 sm:grid-cols-2">
                  {c.programmes.filter((p) => p.status === "fundraising").map(
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
                  {t.s("formTitle")}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {t.s("formIntro")}
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
