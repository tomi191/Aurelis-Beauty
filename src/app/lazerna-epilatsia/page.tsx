import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Card, Chip, CtaGhost, CtaSolid } from "@/components/ui";
import { contact, laserPackages, laserZones } from "@/lib/data";

export const metadata: Metadata = {
  title: "Лазерна епилация Варна · Цени за жени и мъже",
  description:
    "Лазерна епилация във Варна с цени по зони за жени и мъже: подмишници, цели крака, интимна зона, лице, гръб. Трайно обезкосмяване с пакетни цени и отстъпки.",
  alternates: { canonical: "/lazerna-epilatsia" },
};

export default function LaserPage() {
  return (
    <>
      <PageHero
        img="/images/cat-laser.webp"
        title="Лазерна епилация във Варна"
        sub="По зони или в пакет, с цени, обявени предварително. Курс от процедури носи до −15% отстъпка, а при две или повече зони получавате още −5%."
      >
        <Reveal delay={0.08}>
          <p className="mt-4 font-display text-[1.35rem] italic text-gold-deep">
            Гладката кожа обича постоянството
          </p>
        </Reveal>
        <Reveal delay={0.14}>
          <div className="mt-8 flex flex-wrap gap-4">
            <CtaSolid href={contact.phoneHref} external>
              Запази час · {contact.phone}
            </CtaSolid>
            <CtaGhost href="/paketi">Пакети и отстъпки</CtaGhost>
          </div>
        </Reveal>
      </PageHero>

      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="gold-rule" aria-hidden="true" />
              <h2 className="font-display text-[clamp(1.9rem,3.6vw,2.9rem)] font-medium text-bordeaux">
                Зони и цени
              </h2>
            </div>
            <p className="mb-1 text-[0.88rem] text-tertiary-ink">
              Цените са на процедура, за жени и мъже
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {laserZones.map((group, gi) => (
            <Reveal key={group.group} delay={(gi % 2) * 0.07}>
              <Card className="h-full p-7">
                <div className="flex items-baseline justify-between border-b-2 border-bordeaux/80 pb-3">
                  <h3 className="font-display text-xl font-semibold text-bordeaux">
                    {group.group}
                  </h3>
                  <span className="flex gap-6 text-[0.8rem] text-secondary-ink">
                    <span className="w-14 text-right">Жени</span>
                    <span className="w-14 text-right">Мъже</span>
                  </span>
                </div>
                <ul className="divide-y hairline">
                  {group.zones.map((z) => (
                    <li
                      key={z.zone}
                      className="row-hover -mx-2 flex items-baseline justify-between gap-4 px-2 py-2.5"
                    >
                      <span className="text-[0.95rem] text-secondary-ink">
                        {z.zone}
                      </span>
                      <span className="flex shrink-0 gap-6">
                        <span className="tnum w-14 text-right text-[0.95rem] font-semibold text-bordeaux">
                          {z.f}
                        </span>
                        <span className="tnum w-14 text-right text-[0.95rem] text-secondary-ink">
                          {z.m}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {laserPackages.courses.map((c) => (
              <Card key={c.name} className="p-6 text-center">
                <p className="font-display text-xl font-semibold text-bordeaux">
                  {c.name}
                </p>
                <p className="mt-1 text-[0.88rem] text-tertiary-ink">
                  {c.label}
                </p>
                <p className="mt-3 font-display text-3xl font-semibold text-gold-deep">
                  {c.discount}
                </p>
              </Card>
            ))}
          </div>
          <p className="mt-6 text-center text-[0.9rem] text-tertiary-ink">
            {laserPackages.extra}{" "}
            <Link href="/paketi" className="link-ink">
              Виж комбо пакетите
            </Link>
          </p>
        </Reveal>

        {/* Финален booking CTA: страницата свършваше с текстов линк
            (одитна находка: без действие след ценовите таблици) */}
        <Reveal delay={0.1}>
          <div className="relative mt-12 overflow-hidden rounded-[2.5rem] bg-bordeaux-deep px-6 py-12 text-center text-paper md:px-14 md:py-14">
            <div
              className="blob -right-20 -top-28 h-80 w-80 bg-gold/20"
              aria-hidden="true"
            />
            <div className="relative">
              <h2 className="mx-auto max-w-[20ch] font-display text-[clamp(1.8rem,3.4vw,2.7rem)] font-medium leading-tight">
                Готови за трайно гладка кожа?
              </h2>
              <p className="mx-auto mt-4 max-w-md text-paper/70">
                Обадете се: избираме зоните заедно и ви запазваме час.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-4">
                <CtaSolid href={contact.phoneHref} external>
                  Запази час · {contact.phone}
                </CtaSolid>
                <CtaGhost href="/paketi" dark>
                  Пакети и отстъпки
                </CtaGhost>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
