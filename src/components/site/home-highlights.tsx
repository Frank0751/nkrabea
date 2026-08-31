import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SectionEyebrow } from "./section-eyebrow";
import { Reveal } from "./reveal";

type PreviewCard = {
  href: string;
  eyebrow: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
};

const PREVIEWS: PreviewCard[] = [
  {
    href: "/about",
    eyebrow: "About",
    title: "A non-profit keeping the rhythm of Ghana alive",
    excerpt:
      "Formed in 1995 in Adenta, Accra, we preserve traditional dance, drumming and music, and build the next generation of professional artists.",
    image: "/images/social/fb-2.jpg",
    imageAlt: "Nkrabea dancer mid movement with beadwork",
  },
  {
    href: "/programs",
    eyebrow: "Programs",
    title: "Adowa, Kete, drumming and the street",
    excerpt:
      "Four living traditions we carry to the stage. Each rooted in meaning, taught the way it was taught to us.",
    image: "/images/program-kete.png",
    imageAlt: "Kete royal court dancers and drummers in regalia",
  },
  {
    href: "/gallery",
    eyebrow: "Gallery",
    title: "Moments from stage, studio and community",
    excerpt:
      "Performance stills, visual arts collaborations and the people who make the ensemble move.",
    image: "/images/social/fb-reel.jpg",
    imageAlt: "Nkrabea dancer performing with drummers at a celebration",
  },
  {
    href: "/events",
    eyebrow: "Events",
    title: "Where to see us next",
    excerpt:
      "Heritage nights, youth showcases, masterclasses and Independence Day on the square.",
    image: "/images/program-street.png",
    imageAlt: "Ghanaian cultural street dance performance",
  },
];

export function HomeHighlights() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <SectionEyebrow>Start here</SectionEyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
              What Nkrabea does, in four steps
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Explore the parts of the ensemble that matter to you. Each page
              goes deeper than the landing.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {PREVIEWS.map((p, i) => (
            <Reveal key={p.href} delay={i * 90}>
              <Link
                href={p.href}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-card/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary backdrop-blur">
                    {p.eyebrow}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-semibold leading-snug text-foreground">
                    {p.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {p.excerpt}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Visit page
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
