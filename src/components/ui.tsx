import Link from "next/link";
import type { ReactNode } from "react";

/** Заоблена карта — основната повърхност на v2 дизайна. */
export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[1.75rem] border border-white/70 bg-card shadow-soft ${className}`}
    >
      {children}
    </div>
  );
}

/** Chip — малък pill етикет със златна точка (sentence case, не uppercase). */
export function Chip({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[0.85rem] ${
        dark
          ? "border-gold/40 bg-white/5 text-paper/80"
          : "border-gold/45 bg-card/70 text-secondary-ink"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
      {children}
    </span>
  );
}

/** Ред „услуга … цена" с точков водач — наследство от печатния ценоразпис. */
export function PriceRow({
  label,
  price,
  strike,
  dark = false,
}: {
  label: string;
  price: string;
  strike?: string;
  dark?: boolean;
}) {
  return (
    <div className="row-hover flex items-baseline px-2 py-2.5 -mx-2">
      <span className={dark ? "text-paper/85" : "text-secondary-ink"}>
        {label}
      </span>
      <span className="dot-leader" />
      {strike && (
        <span
          className={`mr-3 text-[0.9em] line-through decoration-1 ${
            dark ? "text-paper/40" : "text-tertiary-ink"
          }`}
        >
          {strike}
        </span>
      )}
      {/* Цените са в Golos с tabular-nums: тънкият сериф се разпада под 22px */}
      <span
        className={`tnum text-[1.02em] font-semibold ${
          dark ? "text-paper" : "text-bordeaux"
        }`}
      >
        {price}
      </span>
    </div>
  );
}

/** Плътен pill бутон — основното действие. */
export function CtaSolid({
  href,
  children,
  external = false,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  const cls =
    "inline-flex items-center justify-center gap-2 rounded-full bg-bordeaux px-7 py-3.5 text-[0.95rem] text-paper shadow-pill transition-[transform,background-color,border-color,color] duration-200 active:scale-[0.97] motion-safe:hover:-translate-y-0.5 hover:bg-wine";
  return external ? (
    <a href={href} className={cls}>
      {children}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/** Контурен pill бутон — второстепенно действие. */
export function CtaGhost({
  href,
  children,
  external = false,
  dark = false,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  dark?: boolean;
}) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-full border px-7 py-3.5 text-[0.95rem] transition-[transform,background-color,border-color,color] duration-200 active:scale-[0.97] motion-safe:hover:-translate-y-0.5 ${
    dark
      ? "hairline-cream text-paper hover:border-gold-soft hover:text-gold-soft"
      : "hairline bg-card/60 text-bordeaux hover:border-bordeaux"
  }`;
  return external ? (
    <a href={href} className={cls}>
      {children}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/** Спецификации на процедура — мини клетки в заоблена лента. */
export function MetaStrip({
  items,
}: {
  items: { term: string; value: string }[];
}) {
  const filtered = items.filter((i) => i.value && i.value !== "—");
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-ink/8 sm:grid-cols-4">
      {filtered.map((i) => (
        <div key={i.term} className="bg-paper-soft/80 px-4 py-3.5">
          <p className="text-[0.75rem] text-tertiary-ink">{i.term}</p>
          <p className="mt-1 text-[0.92rem] leading-snug text-primary-ink">
            {i.value}
          </p>
        </div>
      ))}
    </div>
  );
}
