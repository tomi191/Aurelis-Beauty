"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Цената се "изброява" при влизане във viewport (веднъж). SSR рендва
 * крайната стойност (SEO/без flash); анимацията тръгва от 0 само на
 * клиента, при видимост и без reduced-motion. Приема низ като "295 €" —
 * брои числото, пази суфикса.
 */
export default function CountUp({
  value,
  className,
  duration = 900,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const target = parseInt(value, 10);
  const suffix = Number.isNaN(target)
    ? ""
    : value.slice(String(target).length);
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState<number | null>(null);

  useEffect(() => {
    if (Number.isNaN(target)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min((t - t0) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setShown(Math.round(target * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, duration]);

  if (Number.isNaN(target)) {
    return <span className={className}>{value}</span>;
  }
  return (
    <span ref={ref} className={`tnum ${className ?? ""}`}>
      {shown ?? target}
      {suffix}
    </span>
  );
}
