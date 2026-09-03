"use client";

import * as React from "react";

/**
 * Reactive media query.
 *
 * Written with useSyncExternalStore rather than setState in an effect, so it
 * matches how motion preference is read elsewhere and does not cause a
 * cascading render on mount.
 *
 * This exists because reading `window.matchMedia(...).matches` once inside an
 * effect captures the viewport at that instant and never updates. The rhythm
 * line and kente strip did exactly that: loading the page under 1024px and
 * then widening the window left both dead for the rest of the session.
 *
 * Returns false during server rendering and the first client render, so
 * anything gated on it stays absent until the real value is known.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = React.useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query]
  );

  const getSnapshot = React.useCallback(
    () => window.matchMedia(query).matches,
    [query]
  );

  return React.useSyncExternalStore(subscribe, getSnapshot, () => false);
}

/** The breakpoint at which the decorative edge elements appear. */
export const DESKTOP_QUERY = "(min-width: 1024px)";
