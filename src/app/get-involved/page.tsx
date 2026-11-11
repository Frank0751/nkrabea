import type { Metadata } from "next";
import Link from "next/link";
import { Smartphone, Landmark, CreditCard } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { SectionEyebrow } from "@/components/site/section-eyebrow";
import { Reveal, RevealGroup } from "@/components/site/reveal";
import { NewsletterForm } from "@/components/site/newsletter-form";
import { PhotoStrip } from "@/components/site/photo";
import { DonateForm } from "@/components/site/donate-form";
import { CardIcon } from "@/components/site/card-icon";
import { getSiteContent } from "@/lib/site-content";
import type { PageText } from "@/lib/page-text";
import { DONATIONS_ENABLED } from "@/lib/paystack";

/** Check Sanity for edits at most once a minute. */
export const revalidate = 60;

export const metadata: Metadata = {
  alternates: { canonical: "/get-involved" },
  title: "Get Involved",
  description: DONATIONS_ENABLED
    ? "Donate to Nkrabea Culture and Arts Ensemble online by card or mobile money, or support the work by volunteering and in-kind giving."
    : "Support Nkrabea Culture and Arts Ensemble through mobile money, volunteering or in-kind support.",
};

export default async function GetInvolvedPage() {
  const c = await getSiteContent();
  const t = c.text.getInvolvedPage;
  const stripPhotos = t.photos("stripPhotos");
  const otherWays = t.cards("otherWays");

  return (
    <>
      <PageHero {...c.heroes.getInvolved} crumbs={[{ label: "Get Involved" }]} />

      {/* Give */}
      <section data-rhythm-node id="give" className="scroll-mt-16 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <SectionEyebrow>{t.s("giveEyebrow")}</SectionEyebrow>
            <h2 className="mt-5 font-display text-section text-foreground">{t.s("giveTitle")}</h2>
          </Reveal>

          {/* With a Paystack key the online form leads and the direct routes
              sit beside it. Without one, nothing offers a payment the site
              cannot take. See src/lib/paystack.ts. */}
          {DONATIONS_ENABLED ? (
            <div className="mt-12 grid gap-6 lg:grid-cols-12">
              <Reveal className="lg:col-span-7">
                <DonateForm />
              </Reveal>
              <div className="grid gap-6 lg:col-span-5 lg:content-start">
                <Reveal delay={100}>
                  <MomoCard t={t} momo={c.org.momo} accountName={c.org.legalName} />
                </Reveal>
                <Reveal delay={180}>
                  <BankCard t={t} />
                </Reveal>
              </div>
            </div>
          ) : (
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              <Reveal>
                <MomoCard t={t} momo={c.org.momo} accountName={c.org.legalName} featured />
              </Reveal>
              <Reveal delay={100}>
                <BankCard t={t} />
              </Reveal>
              <Reveal delay={180}>
                <CardComingSoon />
              </Reveal>
            </div>
          )}

          {t.on("showStrip") && stripPhotos.length > 0 && (
            <Reveal delay={160} className="mt-20">
              <PhotoStrip label={t.s("stripLabel")} photos={stripPhotos} note={t.s("stripNote")} />
            </Reveal>
          )}
        </div>
      </section>

      {/* Other ways */}
      {otherWays.length > 0 && (
        <section data-rhythm-node className="bg-sand py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal className="max-w-2xl">
              <SectionEyebrow>{t.s("otherEyebrow")}</SectionEyebrow>
              <h2 className="mt-5 font-display text-section text-foreground">{t.s("otherTitle")}</h2>
            </Reveal>

            <RevealGroup className={`mt-12 grid gap-6 sm:grid-cols-2 ${otherWays.length >= 3 ? "lg:grid-cols-3" : ""}`}>
              {otherWays.map((way, i) => (
                <div
                  key={`${way.title}-${i}`}
                  className="spotlight-card card-lift flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card"
                >
                  <div className="flex flex-1 flex-col p-7">
                    <CardIcon name={way.icon} />
                    <h3 className="mt-4 font-display text-lg text-foreground">{way.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{way.body}</p>
                    {way.link && way.linkLabel && (
                      <Link
                        href={way.link}
                        className="mt-auto inline-block pt-4 text-sm font-semibold text-primary underline-offset-4 hover:underline"
                      >
                        {way.linkLabel}
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section data-rhythm-node className="py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <SectionEyebrow>{t.s("newsletterEyebrow")}</SectionEyebrow>
            <h2 className="mt-5 font-display text-2xl leading-tight tracking-tight text-foreground sm:text-3xl">
              {t.s("newsletterTitle")}
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

/** Nkrabea's own MTN MoMo line, from the site settings in Sanity. */
function MomoCard({
  t,
  momo,
  accountName,
  featured = false,
}: {
  t: PageText;
  momo: string;
  accountName: string;
  featured?: boolean;
}) {
  return (
    <div className={`h-full rounded-2xl bg-card p-7 ${featured ? "border-2 border-accent" : "border border-border"}`}>
      <Smartphone
        className={`h-6 w-6 ${featured ? "text-gold-ink" : "text-muted-foreground"}`}
        aria-hidden="true"
      />
      <h3 className="mt-4 font-display text-lg text-foreground">{t.s("momoTitle")}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.s("momoBody")}</p>
      <dl className="mt-5 space-y-3 border-t border-border pt-5">
        <div>
          <dt className="label-mono text-muted-foreground">MTN MoMo</dt>
          <dd className="mt-1 font-display text-xl tracking-tight text-foreground">{momo}</dd>
        </div>
        <div>
          <dt className="label-mono text-muted-foreground">Account name</dt>
          <dd className="mt-1 text-sm text-foreground">{accountName}</dd>
        </div>
      </dl>
      <p className="mt-5 text-xs leading-relaxed text-muted-foreground">{t.s("momoNote")}</p>
    </div>
  );
}

function BankCard({ t }: { t: PageText }) {
  return (
    <div className="h-full rounded-2xl border border-border bg-card p-7">
      <Landmark className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
      <h3 className="mt-4 font-display text-lg text-foreground">{t.s("bankTitle")}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.s("bankBody")}</p>
      <p className="mt-5 rounded-lg border border-border bg-muted/50 p-4 text-sm leading-relaxed text-muted-foreground">
        {t.s("bankNote")}{" "}
        <Link href="/contact" className="font-semibold text-primary underline-offset-4 hover:underline">
          {t.s("bankLinkLabel")}
        </Link>
      </p>
    </div>
  );
}

/** Shown only while there is no Paystack public key. */
function CardComingSoon() {
  return (
    <div className="h-full rounded-2xl border border-border bg-card p-7">
      <CreditCard className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
      <h3 className="mt-4 font-display text-lg text-foreground">Card payment</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Card giving, including from outside Ghana, is being set up.
      </p>
      <p className="mt-5 rounded-lg border border-border bg-muted/50 p-4 text-sm leading-relaxed text-muted-foreground">
        Coming soon. In the meantime, mobile money and bank transfer are both available, and we can invoice an
        organisation directly.
      </p>
    </div>
  );
}
