import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { SectionEyebrow } from "@/components/site/section-eyebrow";
import { Reveal, RevealGroup } from "@/components/site/reveal";
import { CtaBand } from "@/components/site/cta-band";
import {
  FOUNDERS,
  BOARD,
  MANAGEMENT_ROLES,
  GOVERNANCE_NOTE,
  type Person,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Leadership & Governance",
  description:
    "Nkrabea is governed by an Executive Council supported by an eight member management team. Meet the founders and the Board of Directors.",
};

export default function LeadershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Leadership and governance"
        title="Who carries the responsibility"
        description={GOVERNANCE_NOTE}
        crumbs={[{ label: "Leadership" }]}
      />

      {/* Founders */}
      <section data-rhythm-node className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <SectionEyebrow>Founders</SectionEyebrow>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
              The people who began it
            </h2>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-6 lg:grid-cols-2">
            {FOUNDERS.map((person) => (
              <PersonCard key={person.name} person={person} featured />
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Board */}
      <section
        data-rhythm-node
        className="border-y border-border bg-secondary/40 py-20 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <SectionEyebrow>Executive Council</SectionEyebrow>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
              Board of Directors
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              The Executive Council is the highest decision-making body of the
              organisation.
            </p>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BOARD.map((person) => (
              <PersonCard key={person.name} person={person} />
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Management */}
      <section data-rhythm-node className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Reveal>
                <SectionEyebrow>Management team</SectionEyebrow>
                <h2 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
                  Eight roles run the work
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  The management team drives day-to-day implementation across
                  every programme.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              <RevealGroup
                as="ul"
                className="grid gap-3 sm:grid-cols-2"
                stagger={0.05}
              >
                {MANAGEMENT_ROLES.map((role) => (
                  <li
                    key={role}
                    className="rounded-xl border border-border bg-card px-5 py-4 text-sm font-medium text-foreground"
                  >
                    {role}
                  </li>
                ))}
              </RevealGroup>
            </div>
          </div>
        </div>
      </section>

      <div data-rhythm-node>
        <CtaBand
          title="Talk to the Executive Director"
          description="Partnership and funding enquiries are answered by the Executive Director on behalf of the Board and Management Team."
          primaryLabel="Partner With Us"
          primaryHref="/partner"
          secondaryLabel="Contact us"
          secondaryHref="/contact"
        />
      </div>
    </>
  );
}

/**
 * Nkrabea's brief: "Photos are not complete so we will work with the ones we
 * have and leave the others blank on the site for now." Rather than a blank
 * or a stock face, an initials monogram holds the space with dignity.
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
      className={`spotlight-card flex h-full gap-5 rounded-2xl border border-border bg-card p-6 ${
        featured ? "sm:p-7" : ""
      }`}
    >
      <span
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-band font-display text-lg font-semibold text-band-foreground"
        aria-hidden="true"
      >
        {initials}
      </span>
      <div className="min-w-0">
        <h3
          className={`font-display font-semibold leading-snug text-foreground ${
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
