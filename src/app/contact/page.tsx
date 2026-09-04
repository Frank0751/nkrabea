import type { Metadata } from "next";
import { Mail, Phone, MapPin, Inbox } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { SectionEyebrow } from "@/components/site/section-eyebrow";
import { Reveal } from "@/components/site/reveal";
import { ContactForm } from "@/components/site/contact-form";
import { FAQS, ORG } from "@/lib/content";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Nkrabea Culture and Arts Ensemble LBG in Adentan Municipal, Greater Accra.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to us"
        description="Partnership, programme and media enquiries all reach the same team."
        crumbs={[{ label: "Contact" }]}
      />

      <section data-rhythm-node className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Details */}
            <div className="lg:col-span-5">
              <Reveal>
                <SectionEyebrow>Details</SectionEyebrow>
                <h2 className="mt-5 font-display text-3xl leading-tight tracking-tight text-foreground sm:text-4xl">
                  Where to find us
                </h2>

                <dl className="mt-10 space-y-8">
                  <div className="flex gap-4">
                    <MapPin
                      className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <div>
                      <dt className="label-mono text-muted-foreground">
                        Head office
                      </dt>
                      <dd className="mt-2 text-sm leading-relaxed text-foreground">
                        {ORG.headOffice}
                      </dd>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Inbox
                      className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <div>
                      <dt className="label-mono text-muted-foreground">
                        Postal address
                      </dt>
                      <dd className="mt-2 text-sm leading-relaxed text-foreground">
                        {ORG.postalAddress}
                      </dd>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Mail
                      className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <div>
                      <dt className="label-mono text-muted-foreground">
                        Email
                      </dt>
                      <dd className="mt-2 text-sm">
                        <a
                          href={`mailto:${ORG.email}`}
                          className="inline-block py-1 text-foreground underline-offset-4 hover:text-primary hover:underline"
                        >
                          {ORG.email}
                        </a>
                      </dd>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Phone
                      className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <div>
                      <dt className="label-mono text-muted-foreground">
                        Telephone
                      </dt>
                      <dd className="mt-1 space-y-0.5">
                        {ORG.phones.map((phone) => (
                          <div key={phone}>
                            <a
                              href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                              className="inline-block py-1 text-sm text-foreground underline-offset-4 hover:text-primary hover:underline"
                            >
                              {phone}
                            </a>
                          </div>
                        ))}
                      </dd>
                    </div>
                  </div>
                </dl>
              </Reveal>
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              <Reveal delay={120}>
                <h2 className="font-display text-2xl leading-tight tracking-tight text-foreground">
                  Send a message
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  We aim to respond within three working days.
                </p>
                <div className="mt-6">
                  <ContactForm />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        data-rhythm-node
        className="border-t border-border bg-secondary/40 py-20 lg:py-28"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionEyebrow>Questions</SectionEyebrow>
            <h2 className="mt-5 font-display text-3xl leading-tight tracking-tight text-foreground sm:text-4xl">
              Frequently asked
            </h2>

            <Accordion type="single" collapsible className="mt-10">
              {FAQS.map((faq, i) => (
                <AccordionItem key={faq.question} value={`item-${i}`}>
                  <AccordionTrigger className="text-left font-display text-base">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>
    </>
  );
}
