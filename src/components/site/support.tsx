import Link from "next/link";
import { Heart, GraduationCap, Archive, Users } from "lucide-react";
import { SectionEyebrow } from "./about";

const SUPPORT_OPTIONS = [
  {
    icon: GraduationCap,
    title: "Sponsor a student",
    body: "Fund a place in the Youth Academy for a young artist from Adenta. A full year of training, costume and instrument access.",
    action: "Email to sponsor",
  },
  {
    icon: Users,
    title: "Commission a performance",
    body: "Book the ensemble for your stage, school or corporate event. Your fee funds the next generation of dancers and drummers.",
    action: "Start a booking",
    href: "#contact",
  },
  {
    icon: Archive,
    title: "Fund a documentation trip",
    body: "Help us record an elder or a disappearing form before it is lost. Field recording, translation and open archiving.",
    action: "Partner with us",
    href: "#contact",
  },
  {
    icon: Heart,
    title: "Give directly",
    body: "Every contribution, large or small, goes to training, costumes, instruments and heritage documentation.",
    action: "Write to us",
    href: "#contact",
  },
];

export function Support() {
  return (
    <section id="support" className="scroll-mt-20 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <SectionEyebrow>Support the work</SectionEyebrow>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
            Four ways to keep heritage moving
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            As a non-profit, we exist on the trust and support of partners who
            believe Ghanaian culture belongs on every stage. Choose what fits
            you.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SUPPORT_OPTIONS.map((opt) => (
            <div
              key={opt.title}
              className="group flex flex-col rounded-2xl border border-border bg-card p-7 transition-shadow hover:shadow-md"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary">
                <opt.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
                {opt.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {opt.body}
              </p>
              {opt.href ? (
                <Link
                  href={opt.href}
                  className="mt-5 inline-flex items-center text-sm font-semibold text-primary underline-offset-4 hover:underline"
                >
                  {opt.action}
                </Link>
              ) : (
                <a
                  href="mailto:nkrabea.cna@gmail.com?subject=Sponsorship%20Enquiry"
                  className="mt-5 inline-flex items-center text-sm font-semibold text-primary underline-offset-4 hover:underline"
                >
                  {opt.action}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
