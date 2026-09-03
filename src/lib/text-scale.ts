"use client";

import * as React from "react";

/**
 * Visitor-controlled text size.
 *
 * Nkrabea's brief asks for "readable font sizes with the ability to enlarge
 * text". For an organisation whose programmes are built around persons with
 * disabilities, that control belongs in the interface rather than buried in
 * browser settings.
 *
 * It works by changing the root font size. Every size and spacing value in
 * the build is expressed in rem, so the whole layout scales in proportion
 * rather than text overflowing fixed containers. Heroes use min-height, not
 * height, so they grow to fit rather than clipping.
 *
 * Read through useSyncExternalStore, matching how motion preference is read,
 * so there is no cascading render on mount and other tabs stay in step.
 */

export const TEXT_SCALE_KEY = "nkrabea:text-scale";

/** Browser default is 16px. These are the offered steps. */
export const TEXT_SCALES = [1, 1.125, 1.25] as const;
export type TextScale = (typeof TEXT_SCALES)[number];

export const SCALE_LABEL: Record<number, string> = {
  1: "Standard",
  1.125: "Large",
  1.25: "Larger",
};

const listeners = new Set<() => void>();

function readStored(): TextScale {
  try {
    const raw = Number(window.localStorage.getItem(TEXT_SCALE_KEY));
    const match = TEXT_SCALES.find((s) => s === raw);
    if (match) return match;
  } catch {
    // Storage unavailable. Fall through to the default.
  }
  return 1;
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function useTextScale() {
  const scale = React.useSyncExternalStore(
    subscribe,
    readStored,
    () => 1 as TextScale
  );

  const setScale = React.useCallback((next: TextScale) => {
    try {
      window.localStorage.setItem(TEXT_SCALE_KEY, String(next));
    } catch {
      // Not fatal: the change still applies for this page view.
    }
    listeners.forEach((listener) => listener());
  }, []);

  /** Move to the next step, wrapping back to Standard. */
  const cycle = React.useCallback(() => {
    const index = TEXT_SCALES.indexOf(scale);
    setScale(TEXT_SCALES[(index + 1) % TEXT_SCALES.length]);
  }, [scale, setScale]);

  return { scale, setScale, cycle, label: SCALE_LABEL[scale] ?? "Standard" };
}
