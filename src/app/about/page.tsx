import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { SectionEyebrow } from "@/components/site/section-eyebrow";
import { Reveal, RevealGroup } from "@/components/site/reveal";
import { CtaBand } from "@/components/site/cta-band";
import {
  ORG,
  IDENTITY,
  MISSION,
  VISION,
  VALUES,
  WHAT_WE_DO,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Nkrabea Culture and Arts Ensemble LBG is a registered Ghanaian NGO using culture and the creative arts as tools for socio-economic development.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Nkrabea means destiny"
        description={IDENTITY.lead}
        image="/images/social/fb-3.jpg"
        imageAlt="Nkrabea drummers performing with traditional Ghanaian drums."
        crumbs={[{ label: "About" }]}
      />

      {/* Who we are */}
      <section data-rhythm-node className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Reveal>
                <SectionEyebrow>Who we are</SectionEyebrow>
                <h2 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
                  Reaching back to build forward
                </h2>
              </Reveal>
            </div>
            <div className="space-y-6 lg:col-span-8">
              {IDENTITY.whoWeAre.map((paragraph, i) => (
                <Reveal key={i} delay={i * 90}>
                  <p className="text-base leading-relaxed text-foreground/90 sm:text-lg">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission and vision */}
      <section
        data-rhythm-node
        className="border-y border-border bg-secondary/40 py-20 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealGroup className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-8 sm:p-10">
              <p className="label-mono text-primary">Mission</p>
              <p className="mt-5 font-display text-xl leading-snug text-foreground sm:text-2xl">
                {MISSION}
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-8 sm:p-10">
              <p className="label-mono text-primary">Vision</p>
              <p className="mt-5 font-display text-xl leading-snug text-foreground sm:text-2xl">
                {VISION}
              </p>
            </div>
          </RevealGroup>

          <Reveal delay={160}>
            <blockquote className="mx-auto mt-12 max-w-3xl text-center">
              <p className="font-display text-2xl font-semibold leading-snug text-foreground sm:text-3xl">
                &ldquo;{ORG.motto}&rdquo;
              </p>
              <footer className="label-mono mt-4 text-muted-foreground">
                Our motto
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section data-rhythm-node className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <SectionEyebrow>Core values</SectionEyebrow>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
              Seven values guide the work
            </h2>
          </Reveal>

          <RevealGroup
            className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7"
            stagger={0.06}
          >
            {VALUES.map((value) => (
              <div
                key={value}
                className="rounded-xl border border-border bg-card px-4 py-6 text-center"
              >
                <span className="font-display text-base font-semibold text-foreground">
                  {value}
                </span>
              </div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* What we do */}
      <section
        data-rhythm-node
        className="border-y border-border bg-secondary/40 py-20 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Reveal>
                <SectionEyebrow>What we do</SectionEyebrow>
                <h2 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
                  Our constitutional objectives
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  All pursued through culture and the arts.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              <RevealGroup as="ul" className="space-y-4" stagger={0.05}>
                {WHAT_WE_DO.map((item) => (
                  <li
                    key={item}
                    className="flex gap-4 border-b border-border pb-4 last:border-0"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    <span className="text-base leading-relaxed text-foreground/90">
                      {item}
                    </span>
                  </li>
                ))}
              </RevealGroup>
            </div>
          </div>
        </div>
      </section>

      {/* Registration */}
      <section data-rhythm-node className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionEyebrow>Registration</SectionEyebrow>
            <dl className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Detail label="Legal name" value={ORG.legalName} />
              <Detail label="Status" value={ORG.type} />
              <Detail label="Registered under" value={ORG.registration} />
              <Detail label="Incorporated" value={ORG.incorporated} />
              <Detail label="Area of operation" value={ORG.areaOfOperation} />
              <Detail label="Head office" value={ORG.headOffice} />
              <Detail label="Postal address" value={ORG.postalAddress} />
              <Detail label="Governance" value="Executive Council" />
            </dl>
            <p className="mt-8 text-sm text-muted-foreground">
              Read more about{" "}
              <Link
                href="/leadership"
                className="font-semibold text-primary underline-offset-4 hover:underline"
              >
                our leadership and governance
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <div data-rhythm-node>
        <CtaBand
          title="Work with us"
          description="Whether you fund, partner or participate, there is a way in."
          primaryLabel="Partner With Us"
          primaryHref="/partner"
          secondaryLabel="Contact us"
          secondaryHref="/contact"
        />
      </div>
    </>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="label-mono text-muted-foreground">{label}</dt>
      <dd className="mt-2 text-sm leading-relaxed text-foreground">{value}</dd>
    </div>
  );
}
