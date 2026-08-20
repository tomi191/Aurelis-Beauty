import type { Metadata } from "next";
import Link from "next/link";
import BlurTitle from "@/components/BlurTitle";
import LaserPriceToggle from "@/components/LaserPriceToggle";
import Reveal from "@/components/Reveal";
import { Card, Chip, CtaSolid, PriceRow } from "@/components/ui";
import { categories, consultation, contact, laserPackages } from "@/lib/data";

export const metadata: Metadata = {
  title: "Ценоразпис · Козметично студио Варна",
  description:
    "Всички цени на студио AURÈLIS Варна на едно място: почистване на лице от 45 €, BioRePeel от 65 €, микронидлинг от 80 €, лазерна епилация по зони за жени и мъже. Консултация 20 €.",
  alternates: { canonical: "/tsenorazpis" },
};

export default function TsenorazpisPage() {
  return (
    <>
      {/* Херо */}
      <section className="relative overflow-hidden">
        <div
          className="blob -top-24 right-[0%] h-96 w-96 bg-gold/20"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl px-5 pb-4 pt-8 md:px-8 md:pt-12">
          <Reveal>
            <Chip>Ценоразпис</Chip>
            <BlurTitle
              text="Всички цени на едно място"
              className="mt-6 max-w-[15ch] font-display text-[clamp(2.3rem,5vw,4.2rem)] font-normal leading-[1.05] text-bordeaux"
            />
            <p className="mt-5 max-w-xl text-secondary-ink">
              Цените са крайни, в евро, и ги обявяваме предварително: и в
              студиото, и тук. Това, което виждате, е това, което плащате.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Консултация */}
      <section className="mx-auto max-w-6xl px-5 pt-10 md:px-8 md:pt-14">
        <Reveal>
          <span className="gold-rule" aria-hidden="true" />
          <h2 className="font-display text-[clamp(1.9rem,3.6vw,2.9rem)] font-medium text-bordeaux">
            Козметична консултация
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
          <Card className="mt-6 p-7">
            <PriceRow
              label={`Консултация и анализ на кожата · ${consultation.duration}`}
              price={consultation.price}
            />
            <p className="mt-2 text-[0.9rem] text-tertiary-ink">
              {consultation.note}{" "}
              <Link href="/konsultatsia" className="link-ink">
                Какво включва консултацията
              </Link>
            </p>
          </Card>
        </Reveal>
      </section>

      {/* Категории процедури */}
      {categories.map((cat, ci) => (
        <section
          key={cat.slug}
          className="mx-auto max-w-6xl px-5 pt-12 md:px-8 md:pt-16"
        >
          <Reveal>
            <span className="gold-rule" aria-hidden="true" />
            <h2 className="font-display text-[clamp(1.9rem,3.6vw,2.9rem)] font-medium text-bordeaux">
              {cat.name}
            </h2>
          </Reveal>
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            {cat.procedures.map((p, pi) => (
              <Reveal key={p.slug} delay={((ci + pi) % 2) * 0.06}>
                <Card className="h-full p-7">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 border-b-2 border-bordeaux/80 pb-3">
                    <h3 className="font-display text-xl font-semibold text-bordeaux">
                      {p.name}
                    </h3>
                    {p.duration !== "—" && (
                      <span className="tnum text-[0.8rem] text-secondary-ink">
                        {p.duration}
                      </span>
                    )}
                  </div>
                  <div className="divide-y hairline">
                    {p.prices.map((pr) => (
                      <PriceRow
                        key={pr.label}
                        label={pr.label}
                        price={pr.price}
                      />
                    ))}
                  </div>
                  {p.note && (
                    <p className="mt-2 text-[0.85rem] text-tertiary-ink">
                      {p.note}
                    </p>
                  )}
                </Card>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.08}>
            <p className="mt-5 text-[0.92rem] text-secondary-ink">
              <Link href={`/uslugi/${cat.slug}`} className="link-ink">
                Повече за процедурите
              </Link>
            </p>
          </Reveal>
        </section>
      ))}

      {/* Лазерна епилация */}
      <section className="mx-auto max-w-6xl px-5 pt-12 md:px-8 md:pt-16">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="gold-rule" aria-hidden="true" />
              <h2 className="font-display text-[clamp(1.9rem,3.6vw,2.9rem)] font-medium text-bordeaux">
                Лазерна епилация
              </h2>
            </div>
            <p className="mb-1 text-[0.88rem] text-tertiary-ink">
              Цените са на процедура, по зони
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="mt-6">
            <LaserPriceToggle />
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {laserPackages.courses.map((c) => (
              <Card key={c.name} className="hover-lift p-6 text-center">
                <p className="font-display text-xl font-semibold text-bordeaux">
                  {c.name}
                </p>
                <p className="mt-1 text-[0.88rem] text-tertiary-ink">
                  {c.label}
                </p>
                <p className="mt-3 font-display text-3xl font-semibold text-gold">
                  {c.discount}
                </p>
              </Card>
            ))}
          </div>
          <p className="mt-6 text-center text-[0.9rem] text-tertiary-ink">
            {laserPackages.extra}{" "}
            <Link href="/paketi" className="link-ink">
              Виж пакетите и програмите
            </Link>
          </p>
        </Reveal>
      </section>

      {/* Финален CTA */}
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-bordeaux-deep px-6 py-12 text-center text-paper md:px-14 md:py-16">
            <div
              className="blob -right-20 -top-28 h-80 w-80 bg-gold/20"
              aria-hidden="true"
            />
            <div className="relative">
              <h2 className="mx-auto max-w-[20ch] font-display text-[clamp(1.8rem,3.4vw,2.7rem)] font-medium leading-tight">
                Избрахте ли процедура?
              </h2>
              <p className="mx-auto mt-4 max-w-md text-paper/70">
                Обадете се и ще уточним заедно кое е подходящо за вашата кожа.
              </p>
              <div className="mt-7 flex justify-center">
                <CtaSolid href={contact.phoneHref} external>
                  Запази час · {contact.phone}
                </CtaSolid>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
