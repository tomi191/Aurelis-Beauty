"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowRight, Clock, Phone } from "lucide-react";
import GoldDust from "@/components/GoldDust";
import SunRays from "@/components/SunRays";
import { Card, Chip } from "@/components/ui";
import { brands, consultation, contact } from "@/lib/data";

/** Днешното работно време по графика: вт/чт/сб 08–16, ср/пт 12–20, пн/нд почивни. */
function todayHours(): { open: boolean; label: string } {
  const wd = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Sofia",
    weekday: "short",
  }).format(new Date());
  if (wd === "Mon" || wd === "Sun") return { open: false, label: "Почивен ден" };
  if (wd === "Wed" || wd === "Fri") return { open: true, label: "12:00 – 20:00" };
  return { open: true, label: "08:00 – 16:00" };
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function HomeHero() {
  const reduce = useReducedMotion();
  // Само клиентски: при static prerender денят на билда би се запекъл в
  // HTML-а (грешен текст + hydration mismatch при преминал ден).
  const [today, setToday] = useState<ReturnType<typeof todayHours> | null>(
    null
  );
  useEffect(() => {
    setToday(todayHours());
  }, []);

  /* Само за плаващите карти (не са LCP); критичният текст се рендва статично,
     за да не стои opacity:0 до hydration. */
  const anim = (delay: number, y = 18) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease },
        };

  return (
    <section className="relative overflow-hidden">
      <div
        className="blob -top-20 right-[-5%] h-[28rem] w-[28rem] bg-gold/25"
        aria-hidden="true"
      />
      <div
        className="blob bottom-[-30%] left-[-10%] h-[30rem] w-[30rem] bg-wine/15"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-14 pt-8 md:px-8 md:pt-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <span className="gold-rule" aria-hidden="true" />

          <h1 className="mt-6 max-w-[13ch] font-display text-[clamp(2.6rem,6vw,5.2rem)] font-normal leading-[1.04] tracking-[-0.01em] text-bordeaux">
            Красотата започва със <em>здрава кожа</em>.
          </h1>

          <p className="mt-6 max-w-lg text-[1.05rem] leading-relaxed text-secondary-ink">
            Грижа за лице и тяло от медицински козметик Йоана Здравкова:
            процедури, лазерна епилация и план според вашата кожа.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/konsultatsia"
              className="group inline-flex items-center gap-2.5 rounded-full bg-bordeaux px-7 py-3.5 text-[0.95rem] text-paper shadow-pill transition-[transform,background-color] duration-200 active:scale-[0.97] motion-safe:hover:-translate-y-0.5 hover:bg-wine"
            >
              Запази консултация
              <ArrowRight className="size-4 text-gold-soft transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/uslugi"
              className="group inline-flex items-center gap-3 text-[0.95rem] text-bordeaux"
            >
              <span className="grid size-11 place-items-center rounded-full border border-gold/50 bg-card/60 text-gold-deep transition-colors duration-300 group-hover:bg-gold group-hover:text-paper">
                <ArrowDown className="size-4" />
              </span>
              <span className="border-b border-gold/50 pb-0.5">
                Разгледай услугите
              </span>
            </Link>
            <a
              href={contact.phoneHref}
              className="inline-flex items-center gap-2 text-[0.95rem] text-secondary-ink transition-colors duration-150 hover:text-bordeaux"
            >
              <Phone className="size-4 text-gold-deep" strokeWidth={1.6} />
              {contact.phone}
            </a>
          </div>

          <div className="mt-7 flex min-h-6 flex-wrap items-center gap-x-5 gap-y-2 text-[0.88rem] text-tertiary-ink">
            {today && (
              <>
                <span className="fade-up inline-flex items-center gap-2">
                  <span
                    className={`relative grid size-2 place-items-center rounded-full ${
                      today.open ? "bg-gold" : "bg-ink/25"
                    }`}
                  >
                    {today.open && !reduce && (
                      <span className="soft-ping absolute inset-0 rounded-full bg-gold/70" />
                    )}
                  </span>
                  {today.open ? "Днес сме отворени" : "Днес почиваме"}
                </span>
                <span className="fade-up inline-flex items-center gap-1.5">
                  <Clock className="size-3.5" />
                  {today.label}
                </span>
              </>
            )}
            <span>{contact.addressFull}</span>
          </div>
        </div>

        {/* Арка вместо снимка: очаква фотосесия от клиента (shot-list във vault) */}
        <motion.div
          {...(reduce
            ? {}
            : {
                initial: { opacity: 0, scale: 0.94, y: 20 },
                animate: { opacity: 1, scale: 1, y: 0 },
                transition: { duration: 1.1, delay: 0.3, ease },
              })}
          className="relative lg:col-span-5"
        >
          <div className="arch gold-frame relative mx-auto flex aspect-[4/5] max-w-sm items-center justify-center overflow-hidden bg-gradient-to-b from-wine via-bordeaux to-bordeaux-deep">
            <div
              className="blob left-1/2 top-8 h-48 w-48 -translate-x-1/2 bg-gold/30"
              aria-hidden="true"
            />
            {/* Златен прашец — фини частици в слънчевия лъч */}
            <GoldDust className="absolute inset-0" />
            <SunRays className="relative w-40 text-gold-soft/90" />
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-gold/40 bg-bordeaux-deep/80 px-3 py-1 text-[0.68rem] text-paper/70">
              Снимка: портрет на Йоана или интериор
            </span>
          </div>
          <motion.div {...anim(0.9, 12)}>
            <Card className="hover-lift absolute -left-2 bottom-16 hidden px-5 py-4 md:-left-8 md:block">
              <p className="font-display text-xl font-semibold text-bordeaux">
                Консултация · {consultation.price}
              </p>
              <p className="mt-0.5 text-[0.8rem] text-tertiary-ink">
                приспада се при последваща процедура
              </p>
            </Card>
          </motion.div>
          <motion.div {...anim(1.05, 12)}>
            <Card className="hover-lift absolute -right-1 top-10 hidden px-5 py-4 md:-right-4 md:block">
              <p className="font-display text-xl font-semibold text-bordeaux">
                LED терапия подарък
              </p>
              <p className="mt-0.5 text-[0.8rem] text-tertiary-ink">
                към всяка пакетна програма за лице
              </p>
            </Card>
          </motion.div>
        </motion.div>
      </div>

      {/* Доверие в един ред: само проверими факти */}
      <div className="mx-auto max-w-6xl px-5 pb-6 md:px-8">
        <ul className="grid grid-cols-2 gap-x-8 gap-y-3 border-t hairline pt-6 md:grid-cols-4">
          {[
            "Медицински козметик",
            "Индивидуален протокол след анализ на кожата",
            `${brands.length} професионални марки`,
            "Цени без изненади, обявени предварително",
          ].map((f) => (
            <li key={f} className="text-[0.9rem] leading-snug text-tertiary-ink">
              {f}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
