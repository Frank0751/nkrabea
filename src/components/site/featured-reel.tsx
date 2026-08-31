"use client";

import * as React from "react";
import Image from "next/image";
import { Play, Volume2, VolumeX } from "lucide-react";
import { ORG } from "@/lib/content";
import { SectionEyebrow } from "./about";
import { Reveal } from "./reveal";

export function FeaturedReel() {
  const [playing, setPlaying] = React.useState(false);
  const [muted, setMuted] = React.useState(true);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  const tiktokEmbedUrl = `https://www.tiktok.com/embed/v2/7676738559776197921`;

  return (
    <section
      id="reel"
      className="relative scroll-mt-20 overflow-hidden bg-foreground py-20 text-primary-foreground lg:py-28"
    >
      <div className="absolute inset-0 grain-overlay opacity-50" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionEyebrow>From the socials</SectionEyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                See the ensemble in motion
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 text-base leading-relaxed text-primary-foreground/70">
                The rhythm, the movement, the elegance. Adowa and Kete as we
                share them on TikTok and Instagram. Press play to watch a
                recent reel, or follow us for daily updates from the stage and
                the studio.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-primary-foreground/10 pt-6">
                <PlatformStat
                  label="Instagram"
                  handle="@nkra.bea"
                  href={ORG.social.instagram}
                />
                <PlatformStat
                  label="Facebook"
                  handle="465 followers"
                  href={ORG.social.facebook}
                />
                <PlatformStat
                  label="TikTok"
                  handle="@hayeoye_"
                  href={ORG.social.tiktok}
                />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={120}>
              <div className="relative aspect-[9/16] max-w-sm overflow-hidden rounded-2xl border border-primary-foreground/15 bg-card shadow-2xl sm:aspect-[16/10] sm:max-w-2xl">
                {!playing ? (
                  <button
                    type="button"
                    onClick={() => setPlaying(true)}
                    className="group relative block h-full w-full"
                    aria-label="Play featured reel"
                  >
                    <Image
                      src="/images/reel-poster.png"
                      alt="Nkrabea ensemble dancer in motion"
                      fill
                      sizes="(max-width: 768px) 80vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-foreground/30" />
                    <span className="absolute left-4 top-4 rounded-full bg-primary-foreground/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary-foreground backdrop-blur-sm">
                      Featured reel
                    </span>
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform duration-300 group-hover:scale-110">
                        <Play className="ml-0.5 h-6 w-6 fill-current" />
                      </span>
                    </span>
                    <span className="absolute bottom-4 left-4 right-4 text-left text-sm text-primary-foreground/80">
                      Adowa and Kete in motion. Tap to play.
                    </span>
                  </button>
                ) : (
                  <div className="relative h-full w-full bg-black">
                    <iframe
                      ref={iframeRef}
                      src={`${tiktokEmbedUrl}?autoplay=1${muted ? "&muted=1" : ""}`}
                      title="Nkrabea featured reel"
                      allow="autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full"
                    />
                    <button
                      type="button"
                      onClick={() => setMuted((m) => !m)}
                      className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-foreground/60 text-primary-foreground backdrop-blur-sm transition-colors hover:bg-foreground/80"
                      aria-label={muted ? "Unmute reel" : "Mute reel"}
                    >
                      {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </button>
                  </div>
                )}
              </div>
            </Reveal>
            <p className="mt-3 text-center text-xs text-primary-foreground/50 sm:text-left">
              Reel via{" "}
              <a
                href={ORG.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-2 hover:underline"
              >
                @hayeoye_ on TikTok
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlatformStat({
  label,
  handle,
  href,
}: {
  label: string;
  handle: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col"
    >
      <span className="text-[11px] font-medium uppercase tracking-wider text-primary-foreground/50">
        {label}
      </span>
      <span className="mt-1 text-sm font-medium text-primary-foreground transition-colors group-hover:text-accent">
        {handle}
      </span>
    </a>
  );
}
