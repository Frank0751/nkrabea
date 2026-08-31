import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { STORIES } from "@/lib/content";
import { SectionEyebrow } from "./about";

export function Stories() {
  return (
    <section id="stories" className="scroll-mt-20 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <SectionEyebrow>Field notes</SectionEyebrow>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
              Stories from the ensemble
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Notes from the road, the rehearsal room and the archive. Written
              by the people who keep the rhythm going.
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {STORIES.map((story) => (
            <article
              key={story.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-card/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary backdrop-blur">
                  {story.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{story.date}</span>
                  <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {story.readTime}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-foreground">
                  {story.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {story.excerpt}
                </p>
                <Link
                  href="#stories"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                >
                  Read the note
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
