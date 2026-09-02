"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import {
  MotionContext,
  MOTION_STORAGE_KEY,
  ScrollTrigger,
  type MotionChoice,
  type MotionState,
} from "@/lib/motion";
import { useHydrated } from "@/lib/use-hydrated";

/**
 * Holds the site's motion preference and keeps ScrollTrigger honest across
 * App Router navigations.
 *
 * Both inputs - the OS preference and the visitor's stored choice - are read
 * through useSyncExternalStore rather than copied into state inside an
 * effect. That keeps the server and client snapshots explicit, avoids a
 * cascading render on mount, and means a choice made in one tab is picked up
 * by the others through the storage event.
 */

const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";

/* ---- OS preference ---- */

function subscribeSystem(onChange: () => void) {
  const query = window.matchMedia(REDUCE_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

const getSystemSnapshot = () => window.matchMedia(REDUCE_QUERY).matches;
const getSystemServerSnapshot = () => false;

/* ---- the visitor's stored choice ---- */

const choiceListeners = new Set<() => void>();

function subscribeChoice(onChange: () => void) {
  choiceListeners.add(onChange);
  // `storage` only fires in *other* tabs, so same-tab updates are pushed
  // through the listener set by setChoice below.
  window.addEventListener("storage", onChange);
  return () => {
    choiceListeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getChoiceSnapshot(): MotionChoice {
  try {
    const raw = window.localStorage.getItem(MOTION_STORAGE_KEY);
    return raw === "on" || raw === "off" ? raw : null;
  } catch {
    // Private browsing, or storage disabled. The OS preference still applies.
    return null;
  }
}

const getChoiceServerSnapshot = (): MotionChoice => null;

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const systemReduced = React.useSyncExternalStore(
    subscribeSystem,
    getSystemSnapshot,
    getSystemServerSnapshot
  );

  const choice = React.useSyncExternalStore(
    subscribeChoice,
    getChoiceSnapshot,
    getChoiceServerSnapshot
  );

  const ready = useHydrated();

  const setChoice = React.useCallback((next: MotionChoice) => {
    try {
      if (next === null) window.localStorage.removeItem(MOTION_STORAGE_KEY);
      else window.localStorage.setItem(MOTION_STORAGE_KEY, next);
    } catch {
      // Not fatal, but without storage the change cannot be observed, so
      // there is nothing further to do.
    }
    choiceListeners.forEach((listener) => listener());
  }, []);

  const reduced = choice === null ? systemReduced : choice === "off";

  // Mirror onto the document so CSS responds to the toggle, not only to the
  // media query.
  //
  // "on" is written explicitly, not just left absent, because a visitor who
  // turns motion on while their OS asks to reduce it must still get motion.
  // The stylesheet reads that attribute to opt out of the media query.
  React.useEffect(() => {
    if (!ready) return;
    const root = document.documentElement;
    if (choice === "on") root.setAttribute("data-motion", "on");
    else if (reduced) root.setAttribute("data-motion", "off");
    else root.removeAttribute("data-motion");
  }, [choice, reduced, ready]);

  // Re-measure triggers after each navigation, and kill them when motion is
  // switched off so nothing is left holding a stale transform.
  React.useEffect(() => {
    if (!ready) return;

    if (reduced) {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      return;
    }

    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => ScrollTrigger.refresh());
    });

    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  }, [pathname, reduced, ready]);

  const value = React.useMemo<MotionState>(
    () => ({ reduced, systemReduced, choice, setChoice, ready }),
    [reduced, systemReduced, choice, setChoice, ready]
  );

  return (
    <MotionContext.Provider value={value}>{children}</MotionContext.Provider>
  );
}
