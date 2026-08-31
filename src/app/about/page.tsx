import Image from "next/image";
import { MapPin, Heart, Target, Users } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { SectionEyebrow } from "@/components/site/section-eyebrow";
import { CtaBand } from "@/components/site/cta-band";
import { Reveal } from "@/components/site/reveal";
import { CountUp } from "@/components/site/count-up";
import { ORG, ABOUT, STATS, MILESTONES } from "@/lib/content";

export const metadata = {
  title: "About",
  description:
    "Nkrabea Culture & Arts Ensemble is a Ghanaian non-profit founded in 1995 in Adenta, Accra, preserving traditional dance, drumming and music for the next generation.",
};

const VALUES = [
  {
    icon: Target,
    title: "Preservation",
    body: "We perform forms the way they were taught to us, and document the ones that risk being lost.",
  },
  {
    icon: Users,
    title: "Opportunity",
    body: "Performance revenue funds free training for young Ghanaian artists through the Youth Academy.",
  },
  {
    icon: Heart,
    title: "Translation",
    body: "We carry heritage to audiences who may never have seen live court drumming, and make it legible.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Who we are"
        title="A non-profit keeping the rhythm of Ghana alive"
        description="Formed in 1995 in Adenta, Accra, Nkrabea Culture & Arts Ensemble preserves traditional dance, drumming and music, and builds the next generation of professional artists."
        image="/images/social/fb-2.jpg"
        imageAlt="Nkrabea dancer mid movement with beadwork"
        crumbs={[{ label: "About" }]}
      />

      {/* Story */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <Reveal>
                <SectionEyebrow>Our story</SectionEyebrow>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
                  {ABOUT.lead}
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
                  {ABOUT.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={240}>
                <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6">
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Founded
                    </dt>
                    <dd className="mt-1 font-display text-2xl font-semibold text-foreground">
                      {ORG.foundedYear}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Structure
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-foreground">
                      {ORG.type}
                    </dd>
                  </div>
                </dl>
              </Reveal>
            </div>

            <div className="lg:col-span-6">
              <Reveal delay={120}>
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                    <Image
                      src="/images/social/fb-1.jpg"
                      alt="Nkrabea dancers in kente cloth and beaded necklaces"
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-8 flex flex-col gap-4 sm:gap-6">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                      <Image
                        src="/images/program-kete.png"
                        alt="Kete royal court dancers and drummers in regalia"
                        fill
                        sizes="(max-width: 1024px) 50vw, 25vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                      <Image
                        src="/images/social/fb-6.jpg"
                        alt="Framed cultural painting of a figure in patchwork robe"
                        fill
                        sizes="(max-width: 1024px) 50vw, 25vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-secondary/40 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-center font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Three decades, in numbers
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border lg:grid-cols-4">
            {STATS.map((s) => {
              const match = s.value.match(/^(\d+)(.*)$/);
              const numeric = match ? parseInt(match[1], 10) : null;
              const suffix = match ? match[2] : "";
              return (
                <div
                  key={s.label}
                  className="bg-card p-6 text-center transition-colors hover:bg-secondary/40"
                >
                  <div className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
                    {numeric !== null ? (
                      <CountUp value={numeric} suffix={suffix} />
                    ) : (
                      s.value
                    )}
                  </div>
                  <div className="mt-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Reveal>
              <SectionEyebrow>What guides us</SectionEyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
                Three commitments hold the ensemble together
              </h2>
            </Reveal>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 100}>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary">
                    <v.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {v.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-foreground py-20 text-primary-foreground lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              <span className="h-px w-6 bg-accent/40" />
              Three decades
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              From an Accra rehearsal room to international stages
            </h2>
          </div>
          <ol className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-primary-foreground/10 bg-primary-foreground/10 sm:grid-cols-2 lg:grid-cols-4">
            {MILESTONES.map((m, i) => (
              <li
                key={m.year}
                className="flex flex-col bg-foreground p-7"
              >
                <span className="font-display text-4xl font-semibold text-accent">
                  {m.year}
                </span>
                <span className="mt-4 text-xs font-medium uppercase tracking-wider text-primary-foreground/50">
                  Chapter {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold">
                  {m.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-primary-foreground/70">
                  {m.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Mission quote band */}
      <section className="bg-secondary/40 py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <span className="font-display text-5xl leading-none text-accent" aria-hidden="true">
              &ldquo;
            </span>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-4 font-display text-2xl font-semibold leading-snug tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              {ORG.tagline}
            </p>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              {ORG.mission}
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{ORG.location}</span>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Meet the ensemble behind the work"
        description="The company moves as one body: drummers, dancers, vocalists and apprentices. See who carries the tradition forward."
        primaryLabel="See the ensemble"
        primaryHref="/ensemble"
        secondaryLabel="Book a performance"
        secondaryHref="/bookings"
      />
    </>
  );
}
