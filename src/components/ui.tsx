import Link from "next/link";
import type { ReactNode } from "react";

/** Ред „услуга … цена" с точков водач — езикът на печатния ценоразпис. */
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
    <div className="flex items-baseline py-2.5">
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
      <span
        className={`font-display text-[1.15em] font-semibold tracking-wide ${
          dark ? "text-paper" : "text-bordeaux"
        }`}
      >
        {price}
      </span>
    </div>
  );
}

/** Плътен бордо бутон — основното действие. */
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
    "inline-block bg-bordeaux px-7 py-3.5 text-[0.95rem] text-paper transition-colors duration-300 hover:bg-bordeaux-deep";
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

/** Контурен бутон — второстепенно действие. */
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
  const cls = `inline-block border px-7 py-3.5 text-[0.95rem] transition-colors duration-300 ${
    dark
      ? "hairline-cream text-paper hover:border-gold hover:text-gold"
      : "hairline text-bordeaux hover:border-bordeaux"
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

/** Мета ред за процедура (времетраене, възстановяване…) с hairline разделители. */
export function MetaList({
  items,
}: {
  items: { term: string; value: string }[];
}) {
  return (
    <dl className="divide-y hairline border-y hairline">
      {items
        .filter((i) => i.value && i.value !== "—")
        .map((i) => (
          <div key={i.term} className="flex items-baseline gap-4 py-2.5">
            <dt className="w-44 shrink-0 text-[0.85rem] text-tertiary-ink">
              {i.term}
            </dt>
            <dd className="text-[0.95rem] text-secondary-ink">{i.value}</dd>
          </div>
        ))}
    </dl>
  );
}
