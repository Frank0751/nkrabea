"use client";

import * as React from "react";
import Image from "next/image";
import { useReducedMotion } from "@/lib/motion";
import { useHydrated } from "@/lib/use-hydrated";
import type { Photo } from "@/lib/content";

/**
 * A slow crossfade through a handful of photographs, with a gentle push on
 * the active frame.
 *
 * Nkrabea supplied 43 photographs and no video, so this is the honest way to
 * put movement in a hero: their own pictures, moving.
 *
 * Four things make it safe rather than decorative noise.
 *
 * 1. The first frame is server rendered with priority, and the rest are only
 *    mounted after hydration, so Largest Contentful Paint stays one image on
 *    a slow connection instead of three.
 * 2. The reel never advances to a frame whose image has not arrived. The
 *    first build did, and the hero showed an empty panel for a second while
 *    a lazy frame was still downloading. A still hero beats a blank one.
 * 3. Rotation stops dead for anyone who has asked to reduce motion, in
 *    either direction, because it reads useReducedMotion rather than the
 *    media query. The first frame simply stays.
 * 4. Frames that are not showing are hidden from assistive technology, so a
 *    screen reader hears one description rather than a queue of them.
 */
export function PhotoReel({
  photos,
  priority = false,
  interval = 5600,
  className = "",
}: {
  photos: Photo[];
  priority?: boolean;
  interval?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const hydrated = useHydrated();
  const [index, setIndex] = React.useState(0);

  /**
   * Which frames have pixels. A ref rather than state: nothing in the render
   * depends on it, only the timer does, and putting it in state would restart
   * the timer every time an image arrived.
   */
  const loadedRef = React.useRef<boolean[]>(photos.map(() => false));

  const rotating = reduced === false && photos.length > 1;

  React.useEffect(() => {
    if (!rotating) return;
    const id = window.setInterval(() => {
      setIndex((current) => {
        for (let step = 1; step <= photos.length; step++) {
          const candidate = (current + step) % photos.length;
          if (loadedRef.current[candidate]) return candidate;
        }
        return current;
      });
    }, interval);
    return () => window.clearInterval(id);
  }, [rotating, photos.length, interval]);

  // Only the first frame exists until the page is interactive.
  const frames = hydrated && photos.length > 1 ? photos : photos.slice(0, 1);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {frames.map((photo, i) => {
        const active = i === index;
        return (
          <div
            key={photo.src}
            data-active={active}
            className="reel-frame absolute inset-0"
            aria-hidden={!active}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              priority={priority && i === 0}
              sizes="(max-width: 1024px) 100vw, 52vw"
              className={`object-cover ${active && rotating ? "ken-burns" : ""}`}
              onLoad={() => {
                loadedRef.current[i] = true;
              }}
              ref={(el) => {
                // onLoad does not fire for an image that finished before
                // React attached the handler, which is the common case for
                // the server rendered first frame and for a warm cache.
                if (el?.complete && el.naturalWidth > 0) {
                  loadedRef.current[i] = true;
                }
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
