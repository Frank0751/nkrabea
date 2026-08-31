import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/lib/content";
import { SectionEyebrow } from "./about";

export function Services() {
  return (
    <section id="services" className="scroll-mt-20 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <SectionEyebrow>Work with us</SectionEyebrow>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
              How the ensemble can come to you
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Every engagement funds the training of young artists and the
            documentation of heritage forms.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="group flex flex-col bg-card p-7 transition-colors hover:bg-secondary/40 lg:p-9"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {service.title}
                </h3>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
              <ul className="mt-5 space-y-2 border-t border-border pt-5">
                {service.deliverables.map((d) => (
                  <li
                    key={d}
                    className="text-sm font-medium text-foreground/85"
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start gap-3 rounded-2xl bg-foreground p-7 text-primary-foreground sm:flex-row sm:items-center sm:justify-between sm:p-9">
          <div>
            <h3 className="font-display text-xl font-semibold sm:text-2xl">
              Have a stage, a school or a festival?
            </h3>
            <p className="mt-1.5 text-sm text-primary-foreground/70">
              Tell us your dates and we will shape a programme around them.
            </p>
          </div>
          <Link
            href="#contact"
            className="inline-flex shrink-0 items-center justify-center rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
          >
            Start a booking
          </Link>
        </div>
      </div>
    </section>
  );
}
