"use client";

import * as React from "react";
import { Play } from "lucide-react";

/**
 * Plays a video an editor pasted a link to.
 *
 * - YouTube (watch, youtu.be, shorts, embed links): shows the video's own
 *   thumbnail and loads the player only when someone presses play, from
 *   youtube-nocookie.com. A YouTube player costs about a megabyte and sets
 *   cookies; most visitors never press play, so they pay for neither.
 * - A direct video file (.mp4, .webm, or a Cloudinary video link): the
 *   browser's own player, downloading nothing until play.
 * - Anything else (Facebook, TikTok): a clear "Watch on ..." link, since
 *   those platforms do not allow a reliable embed.
 */

export function youTubeId(url: string): string | null {
  const m =
    /(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/.exec(url);
  return m ? m[1] : null;
}

const isVideoFile = (url: string) =>
  /\.(mp4|webm|mov)(\?|$)/i.test(url) || /res\.cloudinary\.com\/[^/]+\/video\//.test(url);

function hostName(url: string) {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    if (host.includes("facebook")) return "Facebook";
    if (host.includes("tiktok")) return "TikTok";
    if (host.includes("instagram")) return "Instagram";
    return host;
  } catch {
    return "the original site";
  }
}

export function VideoEmbed({
  url,
  title,
  poster,
  className = "",
}: {
  url: string;
  /** Read by screen readers and shown on hover. */
  title: string;
  poster?: string;
  className?: string;
}) {
  const [playing, setPlaying] = React.useState(false);
  const id = youTubeId(url);
  const frame = `relative aspect-video w-full overflow-hidden rounded-xl bg-black ${className}`;

  if (id) {
    if (playing) {
      return (
        <div className={frame}>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
      );
    }
    return (
      <button
        type="button"
        onClick={() => setPlaying(true)}
        className={`${frame} group block text-left`}
        aria-label={`Play video: ${title}`}
      >
        <img
          src={poster || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <span className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/15" aria-hidden="true" />
        <span
          className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform group-hover:scale-110"
          aria-hidden="true"
        >
          <Play className="ml-1 h-7 w-7" fill="currentColor" />
        </span>
      </button>
    );
  }

  if (isVideoFile(url)) {
    return (
      <video
        controls
        preload="none"
        playsInline
        poster={poster}
        className={`aspect-video w-full rounded-xl bg-black ${className}`}
        aria-label={title}
      >
        <source src={url} type="video/mp4" />
        Your browser cannot play this video.
      </video>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/50 ${className}`}
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-band text-band-foreground">
        <Play className="ml-0.5 h-5 w-5" fill="currentColor" aria-hidden="true" />
      </span>
      <span className="text-sm font-semibold text-foreground underline-offset-4 group-hover:underline">
        Watch on {hostName(url)}
        <span className="sr-only"> (opens in a new tab)</span>
      </span>
    </a>
  );
}
