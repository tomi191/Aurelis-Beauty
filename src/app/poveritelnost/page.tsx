import type { Metadata } from "next";
import BlurTitle from "@/components/BlurTitle";
import Reveal from "@/components/Reveal";
import { Chip } from "@/components/ui";
import { contact } from "@/lib/data";

export const metadata: Metadata = {
  title: "Поверителност",
  description:
    "Как сайтът на AURÈLIS Beauty Atelier работи с личните ви данни: без проследяващи бисквитки и без аналитични инструменти. Данни само от формата за запитване, права по GDPR.",
  alternates: { canonical: "/poveritelnost" },
};

/* Стълбата на прозата: заглавие на секция + текст в стила на останалите страници */
const h2 = "mt-10 font-display text-[clamp(1.5rem,2.6vw,2rem)] font-medium leading-tight text-bordeaux";
const p = "mt-3 text-[0.98rem] leading-relaxed text-secondary-ink";
const li = "flex gap-3 text-[0.98rem] leading-relaxed text-secondary-ink";
const bullet = (
  <span aria-hidden="true" className="mt-[0.65em] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
);

export default function PoveritelnostPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div
          className="blob -top-24 right-[5%] h-80 w-80 bg-gold/20"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl px-5 pb-4 pt-8 md:px-8 md:pt-12">
          <Reveal>
            <Chip>Лични данни</Chip>
            <BlurTitle
              text="Политика за поверителност"
              className="mt-6 max-w-[16ch] font-display text-[clamp(2.3rem,5vw,4.2rem)] font-normal leading-[1.05] text-bordeaux"
            />
            <p className="mt-5 max-w-xl text-secondary-ink">
              Този сайт събира възможно най-малко данни. Тук описваме честно
              кои са те, за какво се използват и какви права имате.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-10 md:px-8 md:py-14">
        <Reveal as="div">
          <h2 className={`${h2} mt-0`}>Кой отговаря за данните ви</h2>
          <p className={p}>
            Администратор на личните данни е „Аурелис Бюти Ателие“ ЕООД, ЕИК{" "}
            {contact.eik}, с адрес {contact.addressFull}. За всякакви въпроси
            за личните ви данни пишете на{" "}
            <a href={`mailto:${contact.email}`} className="link-ink break-all">
              {contact.email}
            </a>{" "}
            или се обадете на{" "}
            <a href={contact.phoneHref} className="link-ink tnum">
              {contact.phone}
            </a>
            .
          </p>

          <h2 className={h2}>Какво този сайт не прави</h2>
          <ul className="mt-3 space-y-2.5">
            <li className={li}>
              {bullet}
              <span>
                Не използва бисквитки за проследяване. Затова няма и банер за
                бисквитки: няма какво да приемате или отказвате.
              </span>
            </li>
            <li className={li}>
              {bullet}
              <span>
                Не използва аналитични инструменти. Не следим кой разглежда
                сайта, откъде идва и какво натиска.
              </span>
            </li>
            <li className={li}>
              {bullet}
              <span>
                Не подава данни към рекламни мрежи и не изгражда профили на
                посетителите.
              </span>
            </li>
          </ul>

          <h2 className={h2}>Какви данни събираме</h2>
          <p className={p}>Само две неща, и двете сведени до минимум:</p>

          <h3 className="mt-6 text-[1.05rem] font-semibold text-bordeaux">
            1. Формата за запитване
          </h3>
          <p className={p}>
            Когато изпратите запитване през сайта, ни давате име, телефон и
            текста на съобщението си. Те пристигат като имейл в пощата на
            студиото ({contact.email}) и се използват единствено за да се
            свържем с вас по конкретното запитване. Не ги предаваме на трети
            страни, не ги използваме за реклама или бюлетини и изтриваме
            кореспонденцията, след като комуникацията по запитването
            приключи.
          </p>
          <p className={p}>
            Формата се изпраща само след като изрично се съгласите с това
            (отметката под полетата). Ако предпочитате, винаги може просто да
            се обадите по телефона: тогава сайтът не записва нищо.
          </p>

          <h3 className="mt-6 text-[1.05rem] font-semibold text-bordeaux">
            2. Сървърни логове
          </h3>
          <p className={p}>
            Хостинг доставчикът на сайта води стандартни технически логове
            (IP адрес, час на заявката, заредена страница). Те служат за
            сигурност и откриване на злоупотреби, съхраняват се за кратък
            срок и не се използват за нищо друго. Нямаме практическа
            възможност, нито намерение, да свързваме тези записи с конкретен
            човек.
          </p>

          <h2 className={h2}>Вашите права</h2>
          <p className={p}>
            По Общия регламент за защита на данните (GDPR) имате право:
          </p>
          <ul className="mt-3 space-y-2.5">
            <li className={li}>
              {bullet}
              <span>
                да поискате копие от данните, които пазим за вас (право на
                достъп);
              </span>
            </li>
            <li className={li}>
              {bullet}
              <span>да поискате коригиране на неточни данни;</span>
            </li>
            <li className={li}>
              {bullet}
              <span>
                да поискате изтриване на данните си, когато вече не са нужни
                за целта, за която сте ги дали;
              </span>
            </li>
            <li className={li}>
              {bullet}
              <span>
                да възразите срещу обработването или да поискате то да бъде
                ограничено;
              </span>
            </li>
            <li className={li}>
              {bullet}
              <span>
                да подадете жалба до Комисията за защита на личните данни
                (КЗЛД):{" "}
                <a
                  href="https://www.cpdp.bg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-ink"
                >
                  cpdp.bg
                </a>
                .
              </span>
            </li>
          </ul>
          <p className={p}>
            За да упражните което и да е от тези права, пишете на{" "}
            <a href={`mailto:${contact.email}`} className="link-ink break-all">
              {contact.email}
            </a>{" "}
            и ще получите отговор най-късно до един месец, както изисква
            регламентът. На практика отговаряме много по-бързо.
          </p>

          <h2 className={h2}>Промени по тази политика</h2>
          <p className={p}>
            Ако начинът, по който сайтът работи с данни, се промени (например
            добавим нова функционалност), ще актуализираме тази страница.
            Последна актуализация: 18 август 2026 г.
          </p>
        </Reveal>
      </section>
    </>
  );
}
