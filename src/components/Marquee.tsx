"use client";

import { useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * CSS marquee (по референтния проект): дублира съдържанието 4 пъти,
 * анимацията е чист CSS, пауза на hover, edge-fade отстрани.
 * При reduced-motion — статичен, скролируем ред.
 */
export default function Marquee({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className="flex gap-10 overflow-x-auto py-2">{children}</div>
    );
  }

  return (
    <div className="group relative flex overflow-hidden py-2 [--gap:3rem] [gap:var(--gap)]">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          aria-hidden={i > 0}
          className="animate-marquee flex shrink-0 items-baseline justify-around [gap:var(--gap)] group-hover:[animation-play-state:paused]"
        >
          {children}
        </div>
      ))}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-paper to-transparent lg:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-paper to-transparent lg:w-32" />
    </div>
  );
}
