"use client";

import * as React from "react";
import { ArrowUp } from "lucide-react";
import { useMotion } from "@/lib/motion";

export function BackToTop() {
  const [visible, setVisible] = React.useState(false);
  const { reduced } = useMotion();

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 800);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => {
    // Jump rather than glide when motion is switched off.
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollTop}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-band text-band-foreground shadow-lg transition-all duration-300 hover:bg-band/85 lg:right-9 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}
