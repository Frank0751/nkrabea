import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionEyebrow } from "./section-eyebrow";
import { Reveal, RevealGroup } from "./reveal";
import { AUDIENCES } from "@/lib/content";

/**
 * Who we serve, koombei-studio-skill Part 4 section 6.
 *
 * Nkrabea's brief names four audiences and asks that the site visibly serve
 * each rather than reading as one generic NGO homepage. Before this section
 * existed the homepage never mentioned District Assemblies, ministries or the
 * Office of Diaspora Affairs at all, so institutional partners had no way to
 * see themselves in it.
 *
 * Each card ends in the single most useful next step for that group, which is
 * the difference between naming an audience and actually routing it.
 */
export function WhoWeServe() {
  return (
    <section
      data-rhythm-node
      className="border-b border-border py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <SectionEyebrow>Who we serve</SectionEyebrow>
          <h2 className="mt-5 font-display text-3xl leading-tight tracking-tight text-foreground sm:text-4xl">
            Four groups, four different questions
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            What you need from this site depends on why you came to it.
          </p>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2">
          {AUDIENCES.map((audience) => (
            <article
              key={audience.id}
              className="spotlight-card flex h-full flex-col rounded-2xl border border-border bg-card p-7"
            >
              <h3 className="font-display text-lg leading-snug text-foreground">
                {audience.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {audience.need}
              </p>
              <Link
                href={audience.href}
                className="group mt-auto inline-flex items-center pb-1 pt-6 text-sm font-semibold text-primary underline-offset-4 hover:underline"
              >
                {audience.action}
                <ArrowRight
                  className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </article>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
