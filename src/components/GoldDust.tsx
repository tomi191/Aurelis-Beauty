"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

type Particle = {
  x: number;
  y: number;
  vy: number;
  phase: number;
  freq: number;
  r: number;
  life: number;
  maxLife: number;
  big: boolean;
};

/**
 * Златен прашец в hero арката: фини частици, които бавно се издигат и
 * премигват като прашинки в слънчев лъч (aurum, изгряващото слънце от
 * логото). Canvas 2D, нула зависимости, pool от частици без алокации в
 * hot loop-а. Изключва се при reduced-motion, извън viewport и в скрит таб.
 */
export default function GoldDust({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = false;
    let last = 0;

    const count = window.innerWidth < 768 ? 40 : 70;
    const pool: Particle[] = [];

    // Едрите прашинки се рисуват от предварително генериран sprite
    const sprite = document.createElement("canvas");
    sprite.width = sprite.height = 32;
    const sctx = sprite.getContext("2d");
    if (sctx) {
      const grad = sctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, "rgba(217, 185, 138, 0.9)");
      grad.addColorStop(0.4, "rgba(217, 185, 138, 0.35)");
      grad.addColorStop(1, "rgba(217, 185, 138, 0)");
      sctx.fillStyle = grad;
      sctx.fillRect(0, 0, 32, 32);
    }

    function seed(p: Particle, randomY: boolean) {
      p.x = Math.random() * w;
      p.y = randomY ? Math.random() * h : h + 6;
      p.vy = 6 + Math.random() * 8;
      p.phase = Math.random() * Math.PI * 2;
      p.freq = 0.2 + Math.random() * 0.3;
      p.big = Math.random() < 0.1;
      p.r = p.big ? 2.5 + Math.random() * 0.5 : 0.6 + Math.random() * 1.2;
      p.maxLife = 6 + Math.random() * 5;
      p.life = 0;
    }

    function resize() {
      w = parent!.clientWidth;
      h = parent!.clientHeight;
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    for (let i = 0; i < count; i++) {
      const p = {} as Particle;
      seed(p, true);
      p.life = Math.random() * p.maxLife;
      pool.push(p);
    }

    function frame(t: number) {
      if (!running) return;
      const dt = Math.min((t - last) / 1000, 0.1);
      last = t;
      ctx!.clearRect(0, 0, w, h);
      ctx!.globalCompositeOperation = "lighter";
      for (const p of pool) {
        p.life += dt;
        if (p.life >= p.maxLife || p.y < -6) {
          seed(p, false);
          continue;
        }
        p.y -= p.vy * dt;
        p.x += Math.sin(p.life * p.freq * Math.PI * 2 + p.phase) * 0.15;
        const frac = p.life / p.maxLife;
        const ramp =
          frac < 0.2 ? frac / 0.2 : frac > 0.8 ? (1 - frac) / 0.2 : 1;
        const alpha = ramp * 0.5;
        if (p.big) {
          ctx!.globalAlpha = alpha;
          const s = p.r * 4;
          ctx!.drawImage(sprite, p.x - s / 2, p.y - s / 2, s, s);
        } else {
          ctx!.globalAlpha = alpha;
          ctx!.fillStyle = "#d9b98a";
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx!.fill();
        }
      }
      ctx!.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    // Извън viewport и в скрит таб не гори кадри
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0.05 }
    );
    io.observe(parent);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reduce]);

  if (reduce) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none ${className ?? ""}`}
    />
  );
}
