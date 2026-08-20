import type { Metadata } from "next";
import BlurTitle from "@/components/BlurTitle";
import Reveal from "@/components/Reveal";
import SunRays from "@/components/SunRays";
import { Card, Chip, CtaGhost, CtaSolid, MetaStrip } from "@/components/ui";
import { consultation, contact, hours } from "@/lib/data";

export const metadata: Metadata = {
  title: "Консултация с козметик Варна · Анализ на кожата",
  description:
    "Консултация с козметик във Варна: преглед и анализ на кожата, обсъждаме проблемите и целите, получавате личен план за грижа. Цена 20 евро, приспада се при процедура.",
  alternates: { canonical: "/konsultatsia" },
};

export default function KonsultatsiaPage() {
  return (
    <>
      <section className="relative overflow-x-clip">
        <div
          className="blob -top-24 right-[0%] h-96 w-96 bg-gold/20"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-6xl items-start gap-10 px-5 pb-4 pt-8 md:px-8 md:pt-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="gold-rule" aria-hidden="true" />
              <BlurTitle
                text="Консултация с козметик и анализ на кожата"
                className="mt-6 max-w-[15ch] font-display text-[clamp(2.3rem,5vw,4.2rem)] font-normal leading-[1.05] text-bordeaux"
              />
              <p className="mt-5 max-w-xl text-secondary-ink">
                Консултацията е първата и най-важна стъпка към здрава и
                балансирана кожа. Разглеждаме кожата ви отблизо, говорим за
                навиците и целите ви, а накрая си тръгвате с личен план за
                професионална и домашна грижа.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8">
                <MetaStrip
                  items={[
                    { term: "Продължителност", value: consultation.duration },
                    { term: "Цена", value: consultation.price },
                    { term: "Кога", value: "преди курс от процедури" },
                    { term: "Бонус", value: "приспада се от процедурата" },
                  ]}
                />
              </div>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-8 flex flex-wrap gap-4">
                <CtaSolid href={contact.phoneHref} external>
                  Запази час · {contact.phone}
                </CtaSolid>
                <CtaGhost href="/uslugi">Виж процедурите</CtaGhost>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-5">
            <Card className="relative overflow-hidden p-7 md:p-8">
              <SunRays draw className="absolute right-6 top-6 w-11 text-gold/70" />
              <p className="text-[1.05rem] font-semibold text-bordeaux">
                Какво включва
              </p>
              <ul className="mt-5 space-y-3">
                {consultation.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/15 text-[0.7rem] text-gold">
                      ✓
                    </span>
                    <span className="text-[0.95rem] text-secondary-ink">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-2xl bg-paper-soft/80 px-5 py-4">
                <p className="text-[0.9rem] text-secondary-ink">
                  {consultation.note}
                </p>
              </div>
            </Card>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
        <Reveal>
          <Card className="grid items-center gap-8 p-7 md:grid-cols-2 md:p-10">
            <div>
              <h2 className="font-display text-[clamp(1.6rem,2.8vw,2.2rem)] font-medium leading-tight text-bordeaux">
                Кога е добра идея
              </h2>
              <p className="mt-4 max-w-md text-[0.95rem] text-secondary-ink">
                {consultation.when} Ако не сте сигурни откъде да започнете,
                консултацията е най-доброто начало.
              </p>
            </div>
            <div>
              <p className="text-[0.85rem] text-tertiary-ink">Работно време</p>
              <ul className="mt-3 divide-y hairline">
                {hours.map((h) => (
                  <li key={h.days} className="flex items-baseline py-2.5">
                    {/* Дългите имена на дните не се събират на 390px до
                        dot-leader-а — на мобилно показваме краткия запис */}
                    <span className="text-[0.92rem] text-secondary-ink sm:hidden">
                      {h.short}
                    </span>
                    <span className="hidden text-[0.92rem] text-secondary-ink sm:inline">
                      {h.days}
                    </span>
                    <span className="dot-leader" />
                    <span className="shrink-0 whitespace-nowrap text-[0.95rem] text-primary-ink">
                      {h.time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </Reveal>
      </section>
    </>
  );
}
