import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { CtaGhost, CtaSolid } from "@/components/ui";
import { contact, laserZones } from "@/lib/data";

export const metadata: Metadata = {
  title: "Лазерна епилация · Варна",
  description:
    "Лазерна епилация за жени и мъже в AURÈLIS Beauty Atelier, Варна. Пълен ценоразпис по зони: лице, тяло и интимна зона, с пакети и отстъпки за курс.",
};

export default function LaserPage() {
  return (
    <>
      <section className="bg-bordeaux-deep text-paper">
        <div className="passepartout mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <Reveal>
            <h1 className="max-w-[16ch] font-display text-[clamp(2.4rem,6vw,4.6rem)] font-medium leading-[1.05]">
              Гладката кожа обича постоянството
            </h1>
            <p className="mt-6 max-w-xl text-paper/70">
              Лазерна епилация за жени и мъже, по зони или в пакет. Курс от
              процедури носи до −15% отстъпка, а при 2+ зони получавате
              допълнителни −5%.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <CtaSolid href={contact.phoneHref} external>
                Запазете час · {contact.phone}
              </CtaSolid>
              <CtaGhost href="/paketi" dark>
                Пакети и отстъпки
              </CtaGhost>
            </div>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <Reveal>
            <div className="flex items-baseline justify-between gap-6">
              <h2 className="font-display text-[clamp(1.9rem,3.5vw,2.9rem)] font-medium text-bordeaux">
                Зони и цени
              </h2>
              <p className="hidden text-[0.85rem] text-tertiary-ink md:block">
                Ж = жени · М = мъже
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-x-16 gap-y-14 md:grid-cols-2">
            {laserZones.map((group, gi) => (
              <Reveal key={group.group} delay={gi * 0.06}>
                <h3 className="flex items-baseline justify-between border-b-2 border-bordeaux pb-3 font-display text-xl text-bordeaux">
                  {group.group}
                  <span className="flex gap-8 text-[0.75rem] font-normal tracking-wide text-tertiary-ink">
                    <span className="w-12 text-right">Ж</span>
                    <span className="w-12 text-right">М</span>
                  </span>
                </h3>
                <ul className="divide-y hairline">
                  {group.zones.map((z) => (
                    <li
                      key={z.zone}
                      className="flex items-baseline justify-between gap-4 py-2.5"
                    >
                      <span className="text-secondary-ink">{z.zone}</span>
                      <span className="flex shrink-0 gap-8">
                        <span className="w-12 text-right font-display text-[1.05rem] font-semibold text-bordeaux">
                          {z.f}
                        </span>
                        <span className="w-12 text-right font-display text-[1.05rem] text-taupe">
                          {z.m}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <p className="mt-14 border-t hairline pt-6 text-[0.95rem] text-tertiary-ink">
              Курс от 3, 6 или 8 процедури носи от −5% до −15% отстъпка, а
              комбинациите от 2+ зони: допълнителни −5%.{" "}
              <Link href="/paketi" className="link-ink">
                Вижте пакетите
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
