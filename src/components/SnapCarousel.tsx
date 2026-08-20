"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Мобилен слайдер: под sm картите са хоризонтална scroll-snap лента,
 * която се превърта сама и се свайпва с пръст (нативен scroll, без JS
 * за жеста). От sm нагоре е обикновен grid — grid класовете идват отвън
 * с sm:/lg: префикси.
 *
 * Автоплеят: пауза при докосване (6 s), извън viewport, скрит таб и
 * reduced-motion. Децата носят max-sm:w-[82%] max-sm:shrink-0
 * max-sm:snap-start.
 */
export default function SnapCarousel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(min-width: 640px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let paused = false;
    let visible = true;

    // Докосването спира автоплея ОКОНЧАТЕЛНО: човекът е поел управлението
    // и слайдер, който му се изплъзва след 6 s, е дразнещ (одитна находка)
    const pause = () => {
      paused = true;
    };
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("pointerdown", pause);

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
      },
      { threshold: 0.35 }
    );
    io.observe(el);

    const step = () => {
      if (paused || !visible || document.hidden) return;
      const kids = Array.from(el.children) as HTMLElement[];
      if (kids.length < 2) return;
      const stride = kids[1].offsetLeft - kids[0].offsetLeft;
      const max = el.scrollWidth - el.clientWidth;
      const next = el.scrollLeft >= max - 8 ? 0 : Math.min(el.scrollLeft + stride, max);
      el.scrollTo({ left: next, behavior: "smooth" });
    };
    const timer = window.setInterval(step, 3800);

    return () => {
      window.clearInterval(timer);
      io.disconnect();
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("pointerdown", pause);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`no-scrollbar max-sm:-mx-5 max-sm:flex max-sm:snap-x max-sm:snap-mandatory max-sm:gap-4 max-sm:overflow-x-auto max-sm:scroll-px-5 max-sm:px-5 max-sm:pb-1 ${className}`}
    >
      {children}
    </div>
  );
}
