"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowRight, Clock, Phone } from "lucide-react";
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
  const today = todayHours();

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
          <motion.div {...anim(0, -8)}>
            <Chip>Козметично студио във Варна</Chip>
          </motion.div>

          <motion.h1
            {...(reduce
              ? {}
              : {
                  initial: { opacity: 0, y: 26 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 1.1, delay: 0.15, ease },
                })}
            className="mt-6 max-w-[16ch] font-display text-[clamp(2.5rem,5.6vw,4.9rem)] font-normal leading-[1.05] tracking-[-0.01em] text-bordeaux"
          >
            Истинската грижа започва там, където <em>човекът</em> е по-важен от
            процедурата.
          </motion.h1>

          <motion.p
            {...anim(0.5)}
            className="mt-6 max-w-lg text-[1.05rem] leading-relaxed text-secondary-ink"
          >
            Процедури за лице и лазерна епилация от медицински козметик Йоана
            Здравкова. Започваме с анализ на кожата, после план, съобразен с
            вас.
          </motion.p>

          <motion.div {...anim(0.75)}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href={contact.phoneHref}
                className="group inline-flex items-center gap-2.5 rounded-full bg-bordeaux px-7 py-3.5 text-[0.95rem] text-paper shadow-pill transition-all duration-300 hover:-translate-y-0.5 hover:bg-wine"
              >
                <Phone className="size-4" />
                Запази час
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <Link
                href="/uslugi"
                className="group inline-flex items-center gap-3 text-[0.95rem] text-bordeaux"
              >
                <span className="grid size-11 place-items-center rounded-full border hairline bg-card/60 transition-colors duration-300 group-hover:border-gold group-hover:text-gold">
                  <ArrowDown className="size-4" />
                </span>
                <span className="border-b hairline pb-0.5">
                  Разгледай процедурите
                </span>
              </Link>
            </div>
          </motion.div>

          <motion.div {...anim(1.0, 8)}>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.88rem] text-tertiary-ink">
              <span className="inline-flex items-center gap-2">
                <span
                  className={`relative grid size-2 place-items-center rounded-full ${
                    today.open ? "bg-gold" : "bg-ink/25"
                  }`}
                >
                  {today.open && !reduce && (
                    <span className="absolute inset-0 animate-ping rounded-full bg-gold/70" />
                  )}
                </span>
                {today.open ? "Днес сме отворени" : "Днес почиваме"}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-3.5" />
                {today.label}
              </span>
              <span>{contact.addressFull}</span>
            </div>
          </motion.div>
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
          <div className="arch relative mx-auto flex aspect-[4/5] max-w-sm items-center justify-center overflow-hidden bg-gradient-to-b from-wine via-bordeaux to-bordeaux-deep">
            <div
              className="blob left-1/2 top-8 h-48 w-48 -translate-x-1/2 bg-gold/30"
              aria-hidden="true"
            />
            <SunRays className="relative w-40 text-gold-soft/90" />
          </div>
          <motion.div {...anim(0.9, 12)}>
            <Card className="hover-lift absolute -left-2 bottom-16 hidden px-5 py-4 md:-left-8 md:block">
              <p className="font-display text-xl font-semibold text-bordeaux">
                Консултация · {consultation.price}
              </p>
              <p className="mt-0.5 text-[0.8rem] text-tertiary-ink">
                приспада се от първата процедура
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
        <motion.ul
          {...anim(1.15, 8)}
          className="grid grid-cols-2 gap-x-8 gap-y-3 border-t hairline pt-6 md:grid-cols-4"
        >
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
        </motion.ul>
      </div>
    </section>
  );
}
