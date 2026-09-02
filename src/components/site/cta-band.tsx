import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaBand({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="bg-band py-16 text-band-foreground lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-6 rounded-2xl border border-band-foreground/10 bg-band-foreground/5 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10 lg:p-12">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
              {title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-band-foreground/70 sm:text-base">
              {description}
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="group bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href={primaryHref}>
                {primaryLabel}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            {secondaryLabel && secondaryHref && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-band-foreground/25 bg-transparent text-band-foreground hover:bg-band-foreground/10 hover:text-band-foreground"
              >
                <Link href={secondaryHref}>{secondaryLabel}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
