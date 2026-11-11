import type { Metadata } from "next";
import { Mail, Phone, MapPin, Inbox } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { SectionEyebrow } from "@/components/site/section-eyebrow";
import { Reveal } from "@/components/site/reveal";
import { ContactForm } from "@/components/site/contact-form";
import { PhotoBreak } from "@/components/site/photo";
import { SocialLinks } from "@/components/site/social-links";
import { getSiteContent } from "@/lib/site-content";

/** Check Sanity for edits at most once a minute. */
export const revalidate = 60;
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact",
  description:
    "Contact Nkrabea Culture and Arts Ensemble LBG in Adentan Municipal, Greater Accra.",
};

export default async function ContactPage() {
  const c = await getSiteContent();
  const t = c.text.contactPage;
  return (
    <>
      <PageHero
        {...c.heroes.contact}
        crumbs={[{ label: "Contact" }]}
      />

      <section data-rhythm-node className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Details */}
            <div className="lg:col-span-5">
              <Reveal>
                <SectionEyebrow>{t.s("detailsEyebrow")}</SectionEyebrow>
                <h2 className="mt-5 font-display text-section text-foreground">
                  {t.s("detailsTitle")}
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
                        {c.org.headOffice}
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
                        {c.org.postalAddress}
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
                          href={`mailto:${c.org.email}`}
                          className="inline-block py-1 text-foreground underline-offset-4 hover:text-primary hover:underline"
                        >
                          {c.org.email}
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
                        {c.org.phones.map((phone) => (
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
                {c.socials.length > 0 && (
                  <div className="mt-10 border-t border-border pt-8">
                    <p className="label-mono text-muted-foreground">{t.s("followTitle")}</p>
                    <nav aria-label="Nkrabea on social media" className="mt-5">
                      <SocialLinks socials={c.socials} withNames />
                    </nav>
                  </div>
                )}
              </Reveal>
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              <Reveal delay={120}>
                <h2 className="font-display text-2xl leading-tight tracking-tight text-foreground">
                  {t.s("formTitle")}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {t.s("formIntro")}
                </p>
                <div className="mt-6">
                  <ContactForm />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {t.on("showPhoto") && (
        <PhotoBreak photo={t.photo("breakPhoto")} label={t.s("breakLabel")} />
      )}

      {/* FAQ */}
      <section
        data-rhythm-node
        className="bg-sand py-20 lg:py-28"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionEyebrow>{t.s("faqEyebrow")}</SectionEyebrow>
            <h2 className="mt-5 font-display text-section text-foreground">
              {t.s("faqTitle")}
            </h2>

            <Accordion type="single" collapsible className="mt-10">
              {c.faqs.map((faq, i) => (
                <AccordionItem key={`${faq.question}-${i}`} value={`item-${i}`}>
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
