import type { ReactNode } from "react";

/**
 * CSS marquee (по референтния проект): дублира съдържанието 4 пъти,
 * анимацията е чист CSS (.marquee-track в globals.css), гейтната зад
 * prefers-reduced-motion — при reduced-motion лентата стои статична с видимо
 * съдържание. Пауза на hover, edge-fade отстрани.
 */
export default function Marquee({ children }: { children: ReactNode }) {
  return (
    <div className="marquee relative flex overflow-hidden py-2 [--gap:3rem] [gap:var(--gap)]">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          aria-hidden={i > 0}
          inert={i > 0 || undefined}
          className="marquee-track flex shrink-0 items-baseline justify-around [gap:var(--gap)]"
        >
          {children}
        </div>
      ))}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-paper to-transparent lg:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-paper to-transparent lg:w-32" />
    </div>
  );
}
