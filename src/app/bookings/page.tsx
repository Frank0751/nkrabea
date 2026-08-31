import type { Metadata } from "next";
import Link from "next/link";
import { Check, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { SectionEyebrow } from "@/components/site/section-eyebrow";
import { BookingForm } from "@/components/site/booking-form";
import { Button } from "@/components/ui/button";
import { ORG, SERVICES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Bookings",
  description:
    "Book the Nkrabea Culture & Arts Ensemble for performances, workshops, residencies, festivals and corporate events. Every engagement funds young Ghanaian artists.",
};

const PROCESS_STEPS = [
  {
    title: "Tell us your dates",
    description: "Share the window you are working with and the kind of event.",
  },
  {
    title: "We shape a programme",
    description: "Our producer builds a programme to fit your stage and audience.",
  },
  {
    title: "We confirm logistics",
    description: "Travel, instruments, costumes and cast size land in writing.",
  },
  {
    title: "We perform",
    description: "The ensemble arrives, sets up and carries heritage to your stage.",
  },
];

const PRICING_TIERS = [
  {
    name: "Community",
    audience: "Schools, local gatherings and community stages",
    priceHint: "Tailored quote",
    includes: [
      "Ensemble of 8 to 12 performers",
      "30 to 45 minute set with live drumming",
      "Workshop add-on available",
    ],
    highlight: false,
  },
  {
    name: "Festival",
    audience: "Festival stages and large public audiences",
    priceHint: "Tailored quote",
    includes: [
      "Full company of up to 25 performers",
      "60 minute headline programme",
      "Sound check, costume changes and stage plan",
    ],
    highlight: true,
  },
  {
    name: "International",
    audience: "Touring, cultural exchanges and diaspora audiences",
    priceHint: "Tailored quote",
    includes: [
      "Touring cast with travel and visas handled",
      "Repertoire shaped for international audiences",
      "Workshop and residency add-ons",
    ],
    highlight: false,
  },
];

export default function BookingsPage() {
  return (
    <>
      <PageHero
        eyebrow="Work with us"
        title="How the ensemble can come to you"
        description="Every engagement funds the training of young Ghanaian artists and the documentation of heritage forms. Tell us your dates and we will shape a programme around them."
        image="/images/social/fb-1.jpg"
        imageAlt="Nkrabea dancers in kente cloth and beaded necklaces with camera crew"
        crumbs={[{ label: "Bookings" }]}
      />

      {/* Services */}
      <section
        id="services"
        aria-labelledby="services-heading"
        className="py-20 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Reveal>
              <SectionEyebrow>What we offer</SectionEyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2
                id="services-heading"
                className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl"
              >
                Four ways to bring the ensemble to your stage
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                From a single performance set to a multi-year residency, each
                engagement is shaped to your audience and budget.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {SERVICES.map((service, i) => (
              <Reveal key={service.id} delay={i * 80}>
                <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 lg:p-9">
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                  <ul className="mt-6 space-y-3 border-t border-border pt-6">
                    {service.deliverables.map((d) => (
                      <li
                        key={d}
                        className="flex items-start gap-3 text-sm font-medium text-foreground/85"
                      >
                        <span
                          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary text-primary"
                          aria-hidden="true"
                        >
                          <Check className="h-3 w-3" />
                        </span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section
        id="process"
        aria-labelledby="process-heading"
        className="border-y border-border bg-secondary/40 py-20 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Reveal>
              <SectionEyebrow>How booking works</SectionEyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2
                id="process-heading"
                className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl"
              >
                From first message to first beat
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                A clear four-step path. You will always know what comes next,
                and you will always be talking to the producer, not a sales desk.
              </p>
            </Reveal>
          </div>

          <ol className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {PROCESS_STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 100}>
                <li className="relative flex h-full flex-col px-0 lg:px-6">
                  <div className="flex items-center gap-4 lg:flex-col lg:items-start">
                    <span
                      className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-foreground font-display text-base font-semibold text-primary-foreground"
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    {i < PROCESS_STEPS.length - 1 && (
                      <span
                        className="hidden h-px flex-1 bg-border lg:block"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Pricing clarity */}
      <section
        id="pricing"
        aria-labelledby="pricing-heading"
        className="py-20 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Reveal>
              <SectionEyebrow>Pricing clarity</SectionEyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2
                id="pricing-heading"
                className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl"
              >
                Indicative scope, tailored quote
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                These tiers describe the kind of engagement, not a fixed price.
                Every quote is built around your dates, venue, audience and
                cast size. No hidden fees.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {PRICING_TIERS.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 100}>
                <article
                  className={`flex h-full flex-col rounded-2xl border p-7 lg:p-8 ${
                    tier.highlight
                      ? "border-primary bg-card shadow-sm"
                      : "border-border bg-card"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-xl font-semibold text-foreground">
                      {tier.name}
                    </h3>
                    {tier.highlight && (
                      <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium uppercase tracking-wider text-primary">
                        Most booked
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {tier.audience}
                  </p>
                  <p className="mt-5 font-display text-2xl font-semibold text-foreground">
                    {tier.priceHint}
                  </p>
                  <ul className="mt-6 space-y-3 border-t border-border pt-6">
                    {tier.includes.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm font-medium text-foreground/85"
                      >
                        <span
                          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary text-primary"
                          aria-hidden="true"
                        >
                          <Check className="h-3 w-3" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7 pt-2">
                    <Button
                      asChild
                      variant={tier.highlight ? "default" : "outline"}
                      className="group w-full"
                    >
                      <Link href="#book-form">
                        Request quote
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </Button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Booking form */}
      <section
        id="book-form"
        aria-labelledby="book-form-heading"
        className="scroll-mt-20 border-t border-border bg-secondary/40 py-20 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Left column: reassurance + contact alternatives */}
            <div className="lg:col-span-5">
              <Reveal>
                <SectionEyebrow>Start a booking</SectionEyebrow>
              </Reveal>
              <Reveal delay={80}>
                <h2
                  id="book-form-heading"
                  className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl"
                >
                  Tell us about your event
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
                  <p>
                    Share your dates and a short brief. Our producer reads every
                    request personally and replies within two working days with
                    availability and a tailored quote.
                  </p>
                  <p>
                    Every booking funds the Youth Academy and our heritage
                    archive, so your event trains the next generation of
                    Ghanaian artists.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={240}>
                <div className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-7">
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    Prefer to reach us directly?
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    For urgent or near-date enquiries, call the office during
                    office hours.
                  </p>
                  <ul className="mt-5 space-y-4">
                    <li>
                      <a
                        href={`mailto:${ORG.email}`}
                        className="flex items-start gap-3 text-sm font-medium text-foreground hover:text-primary"
                      >
                        <span
                          className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary"
                          aria-hidden="true"
                        >
                          <Mail className="h-4 w-4" />
                        </span>
                        <span className="flex flex-col">
                          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            Email
                          </span>
                          <span className="mt-0.5 break-words">{ORG.email}</span>
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href={`tel:${ORG.phones[0].replace(/\s/g, "")}`}
                        className="flex items-start gap-3 text-sm font-medium text-foreground hover:text-primary"
                      >
                        <span
                          className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary"
                          aria-hidden="true"
                        >
                          <Phone className="h-4 w-4" />
                        </span>
                        <span className="flex flex-col">
                          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            Phone
                          </span>
                          <span className="mt-0.5">
                            {ORG.phones.join("  /  ")}
                          </span>
                        </span>
                      </a>
                    </li>
                    <li>
                      <div className="flex items-start gap-3 text-sm font-medium text-foreground">
                        <span
                          className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary"
                          aria-hidden="true"
                        >
                          <MapPin className="h-4 w-4" />
                        </span>
                        <span className="flex flex-col">
                          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            Studio &amp; office
                          </span>
                          <span className="mt-0.5">{ORG.location}</span>
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </Reveal>
            </div>

            {/* Right column: the booking form */}
            <div className="lg:col-span-7">
              <Reveal delay={120}>
                <BookingForm />
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
