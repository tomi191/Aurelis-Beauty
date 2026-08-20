import type { Metadata } from "next";
import Link from "next/link";
import BlurTitle from "@/components/BlurTitle";
import CountUp from "@/components/CountUp";
import Reveal from "@/components/Reveal";
import { Card, Chip, CtaGhost, CtaSolid, PriceRow } from "@/components/ui";
import { contact, facePackages, laserPackages } from "@/lib/data";

export const metadata: Metadata = {
  title: "Пакетни цени за процедури · Варна",
  description:
    "Пакетни цени за курс от процедури в AURÈLIS Варна: програми за лице Acne Clear, Skin Renewal и VIP Skin Rejuvenation, плюс пакети за лазерна епилация с отстъпка.",
  alternates: { canonical: "/paketi" },
};

export default function PaketiPage() {
  return (
    <>
      <section className="relative overflow-x-clip">
        <div
          className="blob -top-24 right-[5%] h-80 w-80 bg-gold/20"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl px-5 pb-4 pt-8 md:px-8 md:pt-12">
          <Reveal>
            <span className="gold-rule" aria-hidden="true" />
            <BlurTitle
              text="Здравата кожа обича постоянството"
              className="mt-6 max-w-[16ch] font-display text-[clamp(2.3rem,5vw,4.2rem)] font-normal leading-[1.05] text-bordeaux"
            />
            <p className="mt-5 max-w-xl text-secondary-ink">
              Видимите резултати идват с курс от процедури. Пакетите правят
              курса по-изгоден: колкото по-дълга е програмата, толкова по-голяма
              е отстъпката.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Програми за лице */}
      <section
        id="litse"
        className="mx-auto max-w-6xl scroll-mt-28 px-5 py-12 md:px-8 md:py-16"
      >
        <Reveal>
          <span className="gold-rule" aria-hidden="true" />
          <h2 className="font-display text-[clamp(1.8rem,3.2vw,2.6rem)] font-medium text-bordeaux">
            Програми за лице
          </h2>
          <p className="mt-3 max-w-xl text-[0.95rem] text-tertiary-ink">
            {facePackages.gift}
          </p>
        </Reveal>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {facePackages.programs.map((prog, i) => {
            const vip = prog.name.startsWith("VIP");
            return (
              <Reveal key={prog.name} delay={(i % 3) * 0.07}>
                {vip ? (
                  <Link
                    href={`/paketi/${prog.slug}`}
                    className="spot hover-lift relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-bordeaux-deep p-7 text-paper shadow-soft"
                  >
                    <div
                      className="blob -right-16 -top-20 h-56 w-56 bg-gold/20"
                      aria-hidden="true"
                    />
                    <h3 className="relative font-display text-[1.5rem] font-medium leading-snug">
                      {prog.name}
                    </h3>
                    <ul className="relative mt-5 flex-1 space-y-2.5">
                      {prog.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/25 text-[0.65rem] text-gold-soft">
                            ✓
                          </span>
                          <span className="text-[0.93rem] text-paper/80">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="relative mt-6 flex items-baseline justify-between border-t hairline-cream pt-5">
                      <span className="text-[0.95rem] text-paper/45 line-through decoration-1">
                        {prog.oldPrice}
                      </span>
                      <CountUp
                        value={prog.price}
                        className="font-display text-[2rem] font-semibold text-gold-soft"
                      />
                    </div>
                    <span className="relative mt-4 text-[0.9rem] text-gold-soft">
                      Виж програмата →
                    </span>
                  </Link>
                ) : (
                  <Link
                    href={`/paketi/${prog.slug}`}
                    className="spot hover-lift group flex h-full flex-col rounded-[1.75rem] border border-white/70 bg-card p-7 shadow-soft"
                  >
                    <h3 className="font-display text-[1.5rem] font-medium leading-snug text-bordeaux">
                      {prog.name}
                    </h3>
                    <ul className="mt-5 flex-1 space-y-2.5">
                      {prog.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/15 text-[0.65rem] text-gold">
                            ✓
                          </span>
                          <span className="text-[0.93rem] text-secondary-ink">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex items-baseline justify-between border-t hairline pt-5">
                      <span className="text-[0.95rem] text-tertiary-ink line-through decoration-1">
                        {prog.oldPrice}
                      </span>
                      <CountUp
                        value={prog.price}
                        className="font-display text-[2rem] font-semibold text-bordeaux"
                      />
                    </div>
                    <span className="mt-4 text-[0.9rem] text-secondary-ink transition-colors duration-200 group-hover:text-bordeaux">
                      Виж програмата →
                    </span>
                  </Link>
                )}
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.08}>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <CtaSolid href={contact.phoneHref} external>
              Запази час · {contact.phone}
            </CtaSolid>
            <p className="text-[0.88rem] text-tertiary-ink">
              Ще изберем програмата заедно, според кожата ви.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Card className="mt-8 p-7">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <h3 className="font-display text-xl font-semibold text-bordeaux">
                  Грижа с дълготраен ефект
                </h3>
                <p className="mt-1 text-[0.88rem] text-tertiary-ink">
                  Отстъпка при курс от една и съща процедура
                </p>
              </div>
              <div className="flex gap-6">
                {facePackages.loyalty.map((l) => (
                  <div key={l.label} className="text-center">
                    <p className="font-display text-[1.7rem] font-semibold text-gold">
                      {l.discount}
                    </p>
                    <p className="text-[0.85rem] text-secondary-ink">
                      {l.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </Reveal>
      </section>

      {/* Лазерни пакети */}
      <section
        id="lazer"
        className="mx-auto max-w-6xl scroll-mt-28 px-5 pb-14 md:px-8 md:pb-20"
      >
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-bordeaux-deep px-6 py-12 text-paper md:px-12 md:py-16">
            <div
              className="blob -right-24 -top-28 h-96 w-96 bg-gold/15"
              aria-hidden="true"
            />
            {/* Line-art силуетът от печатния ценоразпис на клиента */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/silhouette-m.svg"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute -right-2 top-0 hidden h-[70%] w-auto opacity-30 lg:block"
            />
            <div className="relative">
              <h2 className="max-w-[20ch] font-display text-[clamp(1.8rem,3.2vw,2.6rem)] font-medium leading-tight">
                Лазерна епилация: пакети и курсове
              </h2>

              <div className="mt-9 grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <p className="text-[0.85rem] text-paper/50">Курсове</p>
                  <ul className="mt-3 divide-y hairline-cream">
                    {laserPackages.courses.map((c) => (
                      <li key={c.name} className="flex items-baseline py-3.5">
                        <span className="font-display text-[1.15rem] text-paper/90">
                          {c.name}
                        </span>
                        <span className="dot-leader opacity-40" />
                        <span className="mr-4 text-[0.85rem] text-paper/50">
                          {c.label}
                        </span>
                        <span className="font-display text-[1.25rem] font-semibold text-gold-soft">
                          {c.discount}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-[0.85rem] text-paper/50">
                    {laserPackages.extra}
                  </p>
                </div>

                <div className="lg:col-span-7 lg:col-start-6">
                  <p className="text-[0.85rem] text-paper/50">Комбо пакети</p>
                  {/* Комбо групите са по пол, както в ценоразписа */}
                  {[
                    {
                      title: "Пакети за жени",
                      combos: laserPackages.combosWomen,
                    },
                    { title: "Пакети за мъже", combos: laserPackages.combosMen },
                  ].map((group, gi) => (
                    <div key={group.title} className={gi > 0 ? "mt-8" : "mt-3"}>
                      <h3 className="font-display text-[1.05rem] font-medium text-gold-soft">
                        {group.title}
                      </h3>
                      <ul className="mt-2 divide-y hairline-cream">
                        {group.combos.map((combo) => (
                          <li
                            key={combo.name}
                            className="grid gap-1 py-4 md:grid-cols-12 md:items-baseline"
                          >
                            <span className="font-display text-[1.2rem] text-paper md:col-span-4">
                              {combo.name}
                            </span>
                            <span className="text-[0.88rem] text-paper/55 md:col-span-5">
                              {combo.items.join(" · ")}
                            </span>
                            <span className="md:col-span-3 md:text-right">
                              <span className="mr-3 text-[0.85rem] text-paper/40 line-through decoration-1">
                                {combo.oldPrice}
                              </span>
                              <span className="font-display text-[1.35rem] font-semibold text-paper">
                                {combo.price}
                              </span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <CtaSolid href={contact.phoneHref} external>
                  Запази час · {contact.phone}
                </CtaSolid>
                <CtaGhost href="/lazerna-epilatsia" dark>
                  Цени по зони
                </CtaGhost>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
