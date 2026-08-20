"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { ArrowDown, ArrowRight, Clock, Phone } from "lucide-react";
import GoldDust from "@/components/GoldDust";
import { Card } from "@/components/ui";
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

  return (
    /* Отрицателният top margin вкарва фоновата снимка под прозрачния header
       (main има pt-20/24); вътрешният padding връща съдържанието надолу. */
    <section className="relative -mt-20 overflow-x-clip md:-mt-24">
      {/* Фонова снимка на цялото hero + воали за четимост на текста.
          overflow-hidden е задължителен: parallax-ът (hero-drift) мести
          кадъра надолу и без clip долният му ръб виси под секцията. */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-bg.webp"
          alt=""
          loading="eager"
          fetchPriority="high"
          className="hero-drift h-full w-full object-cover"
        />
        {/* Мобилно: почти плътен воал (текстът е върху цялата ширина) */}
        <div className="absolute inset-0 bg-gradient-to-b from-paper/90 via-paper/80 to-paper/90 md:hidden" />
        {/* Desktop: текстът вляво на плътно, снимката диша вдясно */}
        <div className="absolute inset-0 hidden bg-gradient-to-r from-paper via-paper/75 to-paper/10 md:block" />
        {/* Светла лента горе за навигацията */}
        <div className="absolute inset-x-0 top-0 hidden h-28 bg-gradient-to-b from-paper/80 to-transparent md:block" />
        {/* Плавен преход към хартията на следващата секция */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-paper" />
        {/* Златен прашец върху кадъра */}
        <GoldDust className="absolute inset-0" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-14 pt-28 md:px-8 md:pt-[9.5rem] lg:grid-cols-12 lg:gap-8">
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
              className="sheen magnet group inline-flex items-center gap-2.5 rounded-full bg-bordeaux px-7 py-3.5 text-[0.95rem] text-paper shadow-pill transition-[transform,background-color] duration-200 active:scale-[0.97] motion-safe:hover:-translate-y-0.5 hover:bg-wine"
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
              className="-my-3 inline-flex items-center gap-2 py-3 text-[0.95rem] text-secondary-ink transition-colors duration-150 hover:text-bordeaux"
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

        {/* Плаващи карти върху фоновата снимка. CSS fade-up вместо framer:
            transform на анимиран wrapper би станал containing block за
            absolute картите и би счупил позиционирането им. */}
        <div className="relative hidden lg:col-span-5 lg:block lg:self-stretch">
          <div
            className="fade-up absolute right-0 top-6"
            style={{ animationDelay: "0.7s" }}
          >
            <Card className="hover-lift px-5 py-4">
              <p className="font-display text-xl font-semibold text-bordeaux">
                LED терапия подарък
              </p>
              <p className="mt-0.5 text-[0.8rem] text-tertiary-ink">
                към всяка пакетна програма за лице
              </p>
            </Card>
          </div>
          <div
            className="fade-up absolute bottom-10 left-6"
            style={{ animationDelay: "0.9s" }}
          >
            <Card className="hover-lift px-5 py-4">
              <p className="font-display text-xl font-semibold text-bordeaux">
                Консултация · {consultation.price}
              </p>
              <p className="mt-0.5 text-[0.8rem] text-tertiary-ink">
                приспада се при последваща процедура
              </p>
            </Card>
          </div>
        </div>
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
