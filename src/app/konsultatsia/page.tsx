import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
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
      <PageHero
        img="/images/konsultatsia-hero.webp"
        title="Консултация с козметик и анализ на кожата"
        sub="Разглеждаме кожата ви отблизо, говорим за навиците и целите ви, а накрая си тръгвате с личен план за професионална и домашна грижа."
      >
        <Reveal delay={0.1}>
          <div className="mt-8 max-w-3xl">
            <MetaStrip
              items={[
                { term: "Продължителност", value: consultation.duration },
                { term: "Цена", value: consultation.price },
                { term: "Кога", value: "преди първа терапия" },
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
      </PageHero>

      <section className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <Card className="spot relative h-full overflow-hidden p-7 md:p-8">
              <SunRays draw className="absolute right-6 top-6 w-11 text-gold/70" />
              <p className="text-[1.05rem] font-semibold text-bordeaux">
                Какво включва
              </p>
              <ul className="mt-5 space-y-3">
                {consultation.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-gold/60 bg-gold/20 text-[0.7rem] text-gold-deep">
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
          <Reveal delay={0.08}>
            <Card className="grid h-full content-center gap-8 p-7 md:p-8">
              <div>
                <h2 className="font-display text-[clamp(1.6rem,2.8vw,2.2rem)] font-medium leading-tight text-bordeaux">
                  Кога е добра идея
                </h2>
                <p className="mt-4 max-w-md text-[0.95rem] text-secondary-ink">
                  {consultation.when} Ако се чудите откъде да тръгнете,
                  елате първо на консултация.
                </p>
              </div>
              <div>
                <p className="text-[0.85rem] text-tertiary-ink">
                  Работно време
                </p>
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
        </div>
      </section>
    </>
  );
}
