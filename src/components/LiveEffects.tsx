"use client";

import { useEffect } from "react";

/**
 * Pointer-живите ефекти на сайта, включени с една монтирана инстанция
 * (layout.tsx) и по клас върху елементите — без per-компонент wiring:
 *
 * - `.spot`   — топъл златен spotlight, който следва курсора по картата
 *               (CSS overlay в globals.css чете --sx/--sy оттук)
 * - `.magnet` — CTA бутонът се притегля леко към курсора и се връща
 *
 * Делегация върху document: една слушалка за целия сайт. Работи само при
 * hover: hover + pointer: fine; magnet допълнително уважава reduced-motion.
 */
export default function LiveEffects() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let magnetEl: HTMLElement | null = null;

    const resetMagnet = () => {
      if (magnetEl) {
        magnetEl.style.transform = "";
        magnetEl = null;
      }
    };

    const onMove = (e: PointerEvent) => {
      const t = e.target as Element | null;
      if (!t || typeof t.closest !== "function") return;

      const spot = t.closest<HTMLElement>(".spot");
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty("--sx", `${e.clientX - r.left}px`);
        spot.style.setProperty("--sy", `${e.clientY - r.top}px`);
      }

      if (reduce) return;
      const m = t.closest<HTMLElement>(".magnet");
      if (m !== magnetEl) resetMagnet();
      if (m) {
        magnetEl = m;
        const r = m.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        m.style.transform = `translate(${(dx * 0.2).toFixed(1)}px, ${(dy * 0.28).toFixed(1)}px)`;
      }
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", resetMagnet);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", resetMagnet);
      resetMagnet();
    };
  }, []);

  return null;
}
