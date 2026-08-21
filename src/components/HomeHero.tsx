"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { ArrowRight, Clock, Phone } from "lucide-react";
import GoldDust from "@/components/GoldDust";
import { brands, contact } from "@/lib/data";

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
        {/* Art direction: телефонът получава портретен crop (828x1403),
            desktop пълния 2000w пейзаж */}
        <picture className="contents">
          <source media="(max-width: 767px)" srcSet="/images/hero-bg-mob.webp" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero-bg.webp"
            alt=""
            loading="eager"
            fetchPriority="high"
            className="hero-drift h-full w-full object-cover"
          />
        </picture>
        {/* Мобилно: плътен воал — живият кадър стои в арката под текста */}
        <div className="absolute inset-0 bg-gradient-to-b from-paper/95 via-paper/88 to-paper/95 md:hidden" />
        {/* Desktop: воалът се вдига — снимката вдясно се чете като снимка */}
        <div className="absolute inset-0 hidden bg-gradient-to-r from-paper from-40% via-paper/60 via-65% to-transparent md:block" />
        {/* Тъмна бордо винетка в долния десен ъгъл — тежест и дълбочина */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 hidden w-3/5 bg-[radial-gradient(120%_100%_at_100%_100%,rgba(61,18,24,0.30),transparent_60%)] md:block"
        />
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

          {/* Плакатна скала + masked word rise; „здрава кожа" е злато-фолио.
              Копито е идентично — само markup. Маските (overflow-clip +
              pb-[0.08em]) пазят кирилските дескендери. */}
          <h1 className="mt-6 max-w-[13ch] font-display text-[clamp(2.7rem,6.6vw,6rem)] font-normal leading-[0.98] tracking-[-0.015em] text-bordeaux">
            <span className="inline-block overflow-clip align-bottom pb-[0.08em]">
              <span className="word-rise inline-block">Красотата</span>
            </span>{" "}
            <span className="inline-block overflow-clip align-bottom pb-[0.08em]">
              <span
                className="word-rise inline-block"
                style={{ animationDelay: "0.06s" }}
              >
                започва
              </span>
            </span>{" "}
            <span className="inline-block overflow-clip align-bottom pb-[0.08em]">
              <span
                className="word-rise inline-block"
                style={{ animationDelay: "0.12s" }}
              >
                със
              </span>
            </span>{" "}
            <span className="inline-block overflow-clip align-bottom pb-[0.08em]">
              <span
                className="word-rise inline-block"
                style={{ animationDelay: "0.18s" }}
              >
                <em className="foil">здрава кожа</em>.
              </span>
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-[1.05rem] leading-relaxed text-secondary-ink">
            Грижа за лице и тяло от медицински козметик Йоана Здравкова:
            процедури, лазерна епилация и план според вашата кожа.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/konsultatsia"
              className="sheen magnet group inline-flex items-center gap-2.5 rounded-full border border-gold/50 bg-bordeaux px-7 py-3.5 text-[0.95rem] text-paper shadow-pill transition-[transform,background-color] duration-200 active:scale-[0.97] motion-safe:hover:-translate-y-0.5 hover:bg-wine"
            >
              Запази консултация
              <ArrowRight className="size-4 text-gold-soft transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/uslugi"
              className="group inline-flex items-center gap-3 text-[0.95rem] text-bordeaux"
            >
              <span className="grid size-11 place-items-center rounded-full border border-gold/50 bg-card/60 text-gold-deep transition-colors duration-300 group-hover:bg-gold group-hover:text-paper">
                <ArrowRight className="size-4" />
              </span>
              <span className="border-b border-gold/50 pb-0.5">
                Разгледай услугите
              </span>
            </Link>
          </div>

          {/* Телефонът живее тук като информация, не като трети CTA:
              в реда на действията се конкурираше с консултацията */}
          <div className="mt-7 flex min-h-6 flex-wrap items-center gap-x-5 gap-y-2 text-[0.88rem] text-tertiary-ink">
            <a
              href={contact.phoneHref}
              className="tnum -my-2 inline-flex items-center gap-1.5 py-2 transition-colors duration-150 hover:text-bordeaux"
            >
              <Phone className="size-3.5 text-gold-deep" strokeWidth={1.6} />
              {contact.phone}
            </a>
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

          {/* Мобилно: живият кадър в арковидна рамка (мотивът от логото) —
              същият URL като фоновия source, нула допълнителен трансфер */}
          <div className="arch gold-frame relative mt-9 h-[19rem] overflow-hidden shadow-lift md:hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/hero-bg-mob.webp"
              alt=""
              loading="eager"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Дясната половина е оставена на кадъра: информацията от старите
            плаващи карти живее в секциите си (LED подаръкът в „Пакети и
            програми", консултацията 20 € в тъмния панел). */}
      </div>

      {/* Доверие в един ред: само проверими факти */}
      <div className="mx-auto max-w-6xl px-5 pb-6 md:px-8">
        <ul className="grid grid-cols-2 gap-x-8 gap-y-3 border-t hairline pt-6 md:grid-cols-4">
          {[
            "Медицински козметик",
            "Индивидуален протокол след анализ на кожата",
            `${brands.length} професионални марки`,
            "Предварително обявени цени",
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
