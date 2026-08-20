import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Card, Chip } from "@/components/ui";
import { categories, laserZones } from "@/lib/data";

export const metadata: Metadata = {
  title: "Процедури за лице Варна · Цени",
  description:
    "Всички процедури за лице в AURÈLIS Варна: почистване, химичен пилинг BioRePeel, микронидлинг, LED терапия, терапии за акне и против стареене. Виж цените.",
  alternates: { canonical: "/uslugi" },
};

function fromPrice(prices: { price: string }[]): string {
  const nums = prices
    .map((p) => parseInt(p.price, 10))
    .filter((n) => !Number.isNaN(n));
  return nums.length ? `от ${Math.min(...nums)} €` : "по запитване";
}

export default function UslugiPage() {
  const zoneCount = laserZones.reduce((s, g) => s + g.zones.length, 0);

  return (
    <>
      <PageHero
        img="/images/uslugi-hub-hero.webp"
        title="Процедури за лице и тяло"
        sub="Всяка процедура започва с анализ на кожата и завършва с план. Разгледайте категориите или започнете с консултация, за да изберем заедно."
      />

      <section className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
        <div className="grid gap-5 md:grid-cols-3">
          {categories.map((cat, i) => (
            <Reveal
              key={cat.slug}
              delay={(i % 3) * 0.07}
              className={i === 0 || i === 3 || i === 5 ? "md:col-span-2" : ""}
            >
              <Link href={`/uslugi/${cat.slug}`} className="group block h-full">
                <Card className="spot hover-lift flex h-full flex-col justify-between p-7">
                  <div>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <h2 className="max-w-[18ch] font-display text-[1.55rem] font-medium leading-snug text-bordeaux">
                        {cat.name}
                      </h2>
                      <span className="rounded-full bg-paper-soft px-3.5 py-1 text-[0.8rem] text-tertiary-ink">
                        {cat.procedures.length}{" "}
                        {cat.procedures.length === 1
                          ? "процедура"
                          : "процедури"}
                      </span>
                    </div>
                    <p className="mt-3 text-[0.93rem] text-secondary-ink">
                      {cat.intro}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {cat.procedures.map((p) => (
                        <li
                          key={p.slug}
                          className="rounded-full border hairline px-3 py-1 text-[0.8rem] text-tertiary-ink"
                        >
                          {p.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="rounded-full bg-paper-soft px-4 py-1.5 text-[0.85rem] text-secondary-ink">
                      {fromPrice(cat.procedures.flatMap((p) => p.prices))}
                    </span>
                    <span
                      aria-hidden="true"
                      className="flex h-10 w-10 items-center justify-center rounded-full border hairline text-gold transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-paper"
                    >
                      →
                    </span>
                  </div>
                </Card>
              </Link>
            </Reveal>
          ))}

          <Reveal className="md:col-span-3">
            <Link href="/lazerna-epilatsia" className="group block">
              <div className="spot hover-lift relative overflow-hidden rounded-[1.75rem] bg-bordeaux-deep p-8 text-paper shadow-soft md:p-10">
                <div
                  className="blob -right-16 -top-28 h-80 w-80 bg-gold/20"
                  aria-hidden="true"
                />
                <div className="relative flex flex-wrap items-end justify-between gap-6">
                  <div>
                    <h2 className="font-display text-[clamp(1.7rem,3vw,2.4rem)] font-medium leading-tight">
                      Лазерна епилация
                    </h2>
                    <p className="mt-3 max-w-md text-[0.95rem] text-paper/65">
                      {zoneCount} зони за жени и мъже. Курс от процедури носи
                      до −15%, а при две или повече зони получавате още −5%.
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3 text-[0.92rem] text-bordeaux transition-transform duration-300 group-hover:-translate-y-0.5">
                    Зони и цени →
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
