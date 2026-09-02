import type { Metadata } from "next";
import Link from "next/link";
import { Smartphone, Landmark, CreditCard, HandHeart, Package } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { SectionEyebrow } from "@/components/site/section-eyebrow";
import { Reveal, RevealGroup } from "@/components/site/reveal";
import { NewsletterForm } from "@/components/site/newsletter-form";
import { ORG } from "@/lib/content";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Support Nkrabea Culture and Arts Ensemble through mobile money, volunteering or in-kind support.",
};

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero
        eyebrow="Get involved"
        title="Ways to support the work"
        description="Every contribution goes into programmes that build skills, livelihoods and dignity in Ghanaian communities."
        image="/images/social/fb-5.jpg"
        imageAlt="Nkrabea dancers in traditional regalia."
        crumbs={[{ label: "Get Involved" }]}
      />

      {/* Give */}
      <section data-rhythm-node className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <SectionEyebrow>Give</SectionEyebrow>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
              Make a donation
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <Reveal className="lg:col-span-1">
              <div className="h-full rounded-2xl border-2 border-accent bg-card p-7">
                <Smartphone
                  className="h-6 w-6 text-accent"
                  aria-hidden="true"
                />
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                  Mobile money
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  The fastest way to give from within Ghana.
                </p>
                <dl className="mt-5 space-y-3 border-t border-border pt-5">
                  <div>
                    <dt className="label-mono text-muted-foreground">
                      MTN MoMo
                    </dt>
                    <dd className="mt-1 font-display text-xl font-semibold tracking-tight text-foreground">
                      {ORG.momo}
                    </dd>
                  </div>
                  <div>
                    <dt className="label-mono text-muted-foreground">
                      Account name
                    </dt>
                    <dd className="mt-1 text-sm text-foreground">
                      {ORG.legalName}
                    </dd>
                  </div>
                </dl>
                <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
                  Please use your name as the reference so we can thank you
                  properly.
                </p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="h-full rounded-2xl border border-border bg-card p-7">
                <Landmark
                  className="h-6 w-6 text-muted-foreground"
                  aria-hidden="true"
                />
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                  Bank transfer
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  For larger gifts and institutional grants, a bank transfer is
                  usually simpler.
                </p>
                <p className="mt-5 rounded-lg border border-border bg-muted/50 p-4 text-sm leading-relaxed text-muted-foreground">
                  Bank details are issued directly on request, so that they
                  always come from us and can be verified.{" "}
                  <Link
                    href="/contact"
                    className="font-semibold text-primary underline-offset-4 hover:underline"
                  >
                    Request bank details
                  </Link>
                  .
                </p>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="h-full rounded-2xl border border-border bg-card p-7">
                <CreditCard
                  className="h-6 w-6 text-muted-foreground"
                  aria-hidden="true"
                />
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                  Card payment
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Card giving, including from outside Ghana, is being set up.
                </p>
                <p className="mt-5 rounded-lg border border-border bg-muted/50 p-4 text-sm leading-relaxed text-muted-foreground">
                  Coming soon. In the meantime, mobile money and bank transfer
                  are both available, and we can invoice an organisation
                  directly.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Other ways */}
      <section
        data-rhythm-node
        className="border-y border-border bg-secondary/40 py-20 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <SectionEyebrow>Beyond money</SectionEyebrow>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
              Other ways to help
            </h2>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2">
            <div className="spotlight-card rounded-2xl border border-border bg-card p-7">
              <HandHeart className="h-6 w-6 text-primary" aria-hidden="true" />
              <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                Volunteer
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                We work with trainers, artisans, teachers and coordinators
                across our programmes. Tell us what you do and where you are.
              </p>
              <Link
                href="/contact"
                className="mt-5 inline-block text-sm font-semibold text-primary underline-offset-4 hover:underline"
              >
                Offer your time
              </Link>
            </div>

            <div className="spotlight-card rounded-2xl border border-border bg-card p-7">
              <Package className="h-6 w-6 text-primary" aria-hidden="true" />
              <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                In-kind support
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Looms, drums, raw materials, packaging, transport and venue
                space all reduce programme cost directly.
              </p>
              <Link
                href="/partner"
                className="mt-5 inline-block text-sm font-semibold text-primary underline-offset-4 hover:underline"
              >
                Discuss in-kind support
              </Link>
            </div>
          </RevealGroup>
        </div>
      </section>

      {/* Newsletter */}
      <section data-rhythm-node className="py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <SectionEyebrow>Stay in touch</SectionEyebrow>
            <h2 className="mt-5 font-display text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
              Hear when a programme opens or completes
            </h2>
            <div className="mt-8">
              <NewsletterForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
