import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/site/page-hero";
import { SectionEyebrow } from "@/components/site/section-eyebrow";
import { Reveal, RevealGroup } from "@/components/site/reveal";
import { CtaBand } from "@/components/site/cta-band";
import { PhotoFigure } from "@/components/site/photo";
import type { Person } from "@/lib/content";
import { getSiteContent } from "@/lib/site-content";

/** Check Sanity for edits at most once a minute. */
export const revalidate = 60;

export const metadata: Metadata = {
  alternates: { canonical: "/leadership" },
  title: "Leadership & Governance",
  description:
    "Nkrabea is governed by an Executive Council supported by an eight member management team. Meet the founders and the Board of Directors.",
};

export default async function LeadershipPage() {
  const c = await getSiteContent();
  const t = c.text.leadershipPage;
  return (
    <>
      <PageHero
        {...c.heroes.leadership}
        crumbs={[{ label: "Leadership" }]}
      />

      {/* Founders */}
      <section data-rhythm-node className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <SectionEyebrow>{t.s("foundersEyebrow")}</SectionEyebrow>
            <h2 className="mt-5 font-display text-section text-foreground">
              {t.s("foundersTitle")}
            </h2>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-6 lg:grid-cols-2">
            {c.founders.map((person, i) => (
              <PersonCard key={`${person.name}-${i}`} person={person} featured />
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Board */}
      <section
        data-rhythm-node
        className="bg-sand py-20 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <SectionEyebrow>{t.s("boardEyebrow")}</SectionEyebrow>
            <h2 className="mt-5 font-display text-section text-foreground">
              {t.s("boardTitle")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {t.s("boardIntro")}
            </p>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {c.board.map((person, i) => (
              <PersonCard key={`${person.name}-${i}`} person={person} />
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Management */}
      <section data-rhythm-node className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <Reveal>
                <SectionEyebrow>{t.s("managementEyebrow")}</SectionEyebrow>
                <h2 className="mt-5 font-display text-section text-foreground">
                  {t.s("managementTitle")}
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  {t.s("managementIntro")}
                </p>
              </Reveal>
            </div>
            {/* One column of roles sets the height; the photograph beside it
                fills exactly that height. */}
            <div className="lg:col-span-4">
              <RevealGroup as="ul" className="grid gap-3" stagger={0.05}>
                {c.managementRoles.map((role) => (
                  <li
                    key={role}
                    className="rounded-xl border border-border bg-card px-5 py-4 text-sm font-medium text-foreground"
                  >
                    {role}
                  </li>
                ))}
              </RevealGroup>
            </div>
            <Reveal delay={90} className="lg:col-span-4">
              <PhotoFigure
                photo={t.photo("managementPhoto")}
                fill
                position="50% 30%"
                sizes="(max-width: 1024px) 100vw, 33vw"
                caption={t.photo("managementPhoto").caption}
              />
            </Reveal>
          </div>
        </div>
      </section>

      <div data-rhythm-node>
        <CtaBand
          title={t.cta().title}
          description={t.cta().description}
          primaryLabel={t.cta().primaryLabel}
          primaryHref="/partner"
          secondaryLabel={t.cta().secondaryLabel}
          secondaryHref="/contact"
        />
      </div>
    </>
  );
}

/**
 * Nkrabea's brief: "Photos are not complete so we will work with the ones we
 * have and leave the others blank on the site for now." Where a portrait
 * exists it is used; where none does, an initials monogram holds the space
 * with dignity rather than a blank or a stock face.
 */
function PersonCard({
  person,
  featured = false,
}: {
  person: Person;
  featured?: boolean;
}) {
  const initials = person.name
    .replace(/^(Rtd\s+Capt\.|Ms\.|Mr\.|Mrs\.|Dr\.)\s*/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <article
      className={`spotlight-card card-lift flex h-full gap-5 rounded-2xl border border-border bg-card p-6 ${
        featured ? "sm:p-7" : ""
      }`}
    >
      {person.image ? (
        // The name and role sit beside the portrait in text, so the picture
        // repeats nothing and correctly takes an empty alt.
        <Image
          src={person.image}
          alt=""
          width={160}
          height={160}
          className={`shrink-0 rounded-full object-cover ${
            featured ? "h-20 w-20" : "h-14 w-14"
          }`}
        />
      ) : (
        <span
          className={`flex shrink-0 items-center justify-center rounded-full bg-band font-display text-band-foreground ${
            featured ? "h-20 w-20 text-xl" : "h-14 w-14 text-lg"
          }`}
          aria-hidden="true"
        >
          {initials}
        </span>
      )}
      <div className="min-w-0">
        <h3
          className={`font-display leading-snug text-foreground ${
            featured ? "text-lg" : "text-base"
          }`}
        >
          {person.name}
        </h3>
        <p className="label-mono mt-1.5 text-primary">{person.role}</p>
        {person.bio && (
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {person.bio}
          </p>
        )}
      </div>
    </article>
  );
}
