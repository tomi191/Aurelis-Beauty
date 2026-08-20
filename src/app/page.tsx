import Link from "next/link";
import Faq from "@/components/Faq";
import GoldDust from "@/components/GoldDust";
import HomeHero from "@/components/HomeHero";
import ImageSlot from "@/components/ImageSlot";
import JsonLd from "@/components/JsonLd";
import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";
import SunRays from "@/components/SunRays";
import { Card, CtaGhost, CtaSolid } from "@/components/ui";
import {
  brands,
  categories,
  consultation,
  contact,
  facePackages,
} from "@/lib/data";

function proc(catSlug: string, procSlug: string) {
  const cat = categories.find((c) => c.slug === catSlug);
  const p = cat?.procedures.find((pr) => pr.slug === procSlug);
  return { cat, p };
}

function minPrice(prices: { price: string }[]): string {
  const nums = prices
    .map((p) => parseInt(p.price, 10))
    .filter((n) => !Number.isNaN(n));
  return nums.length ? `от ${Math.min(...nums)} €` : "по запитване";
}

/* Бързите категории следват четирите карти от плана на клиента. */
const quickCategories = [
  {
    title: "Грижа за лице",
    topics: ["почистване", "пилинги", "хидратация", "възстановяване"],
    href: "/uslugi/pochistvane-na-lice",
    photo: "почистване на лице в кабинета",
  },
  {
    title: "Терапии",
    topics: ["BioRePeel", "Casmara", "NOON", "SQT", "карбокси"],
    href: "/uslugi/terapii-za-litse",
    photo: "терапия за лице отблизо",
  },
  {
    title: "Лазерна епилация",
    topics: ["лице", "тяло", "интимна зона", "пакети"],
    href: "/lazerna-epilatsia",
    photo: "лазерният апарат в действие",
  },
  {
    title: "Вежди",
    topics: ["оформяне", "къна", "LED терапия"],
    href: "/uslugi/vezhdi",
    photo: "оформяне на вежди",
  },
];

/* Подходът: точките идват от консултация.pdf и работния процес на Йоана. */
const approach = [
  "Анализ на състоянието на кожата",
  "Персонален план за професионална грижа",
  "План и продукти за домашна грижа",
  "Подбор на подходяща козметика",
  "Проследяване на резултатите",
  "Само процедури, които кожата ви наистина изисква",
];

/* Популярните услуги: осемте от плана, с реалните цени от ценоразписа. */
const popular = [
  { cat: "pochistvane-na-lice", slug: "klasichesko-pochistvane" },
  { cat: "pochistvane-na-lice", slug: "vodno-dermabrazio" },
  { cat: "biorepeel", slug: "biorepeel" },
  { cat: "terapii-za-litse", slug: "casmara" },
  { cat: "terapii-za-litse", slug: "noon" },
  { cat: "mikronidling", slug: "mikronidling-fusion" },
  { cat: "mikronidling", slug: "sqt-bio-microneedling" },
] as const;

/* FAQ: отговорите са само от реалните данни на процедурите. */
const faq = [
  {
    q: "Колко процедури са нужни, за да има резултат?",
    a: "Зависи от процедурата и кожата: повечето терапии се правят в курс от 4 до 6 посещения през 1 до 3 седмици. Точния план изготвяме на консултацията.",
  },
  {
    q: "Има ли възстановителен период?",
    a: "Повечето процедури нямат: излизате със свежа кожа. При BioRePeel е възможно леко лющене 2 до 5 дни, при микронидлинг зачервяването отшумява за 24 до 48 часа.",
  },
  {
    q: "Колко струва консултацията?",
    a: "20 €, а стойността ѝ се приспада при последваща процедура. Включва анализ на кожата и личен план за професионална и домашна грижа.",
  },
  {
    q: "Как се записва час?",
    a: "Обадете се на 088 981 6905 или ни пишете през формата в Контакти. Работим вторник, четвъртък и събота от 08:00 до 16:00, сряда и петък от 12:00 до 20:00.",
  },
];

export default function Home() {
  return (
    <>
      {/* FAQPage schema от същите въпроси в секцията по-долу */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />

      {/* ——— Hero ——— */}
      <HomeHero />

      {/* ——— Бързи категории (4-те карти от плана) ——— */}
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="gold-rule" aria-hidden="true" />
              <h2 className="max-w-[18ch] font-display text-[clamp(1.9rem,3.6vw,3rem)] font-medium leading-tight text-bordeaux">
                С какво да започнем?
              </h2>
            </div>
            <Link href="/tsenorazpis" className="link-ink mb-2 text-[0.95rem]">
              Пълен ценоразпис
            </Link>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {quickCategories.map((qc, i) => (
            <Reveal key={qc.title} delay={i * 0.05}>
              <Link href={qc.href} className="group block h-full">
                <div className="hover-lift gold-frame-soft flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-card shadow-soft">
                  <ImageSlot label={qc.photo} ratio="3 / 2" />
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <h3 className="font-display text-[1.45rem] font-medium leading-snug text-bordeaux">
                        {qc.title}
                      </h3>
                      <ul className="mt-4 flex flex-wrap gap-1.5">
                        {qc.topics.map((t) => (
                          <li
                            key={t}
                            className="rounded-full bg-paper-soft px-3 py-1 text-[0.78rem] text-tertiary-ink"
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <span
                      aria-hidden="true"
                      className="mt-6 flex h-9 w-9 items-center justify-center rounded-full border border-gold/45 text-gold-deep transition-all duration-200 group-hover:bg-gold group-hover:text-paper"
                    >
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ——— Нашият подход (бежова секция като салона) ——— */}
      <section className="bg-blush/50">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <span className="gold-rule" aria-hidden="true" />
            <h2 className="font-display text-[clamp(1.9rem,3.6vw,3rem)] font-medium leading-tight text-bordeaux">
              Грижата започва с разбиране
            </h2>
            <p className="mt-5 max-w-md text-[0.98rem] text-secondary-ink">
              Първо гледаме кожата и слушаме вас, чак после препоръчваме
              процедура.
            </p>
            <div className="mt-7">
              <CtaGhost href="/za-nas">Повече за нашия подход</CtaGhost>
            </div>
            <ImageSlot
              label="интериорът на ателието"
              ratio="4 / 3"
              className="mt-8 max-w-md rounded-[1.75rem]"
            />
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {approach.map((a, i) => (
                <Reveal key={a} delay={i * 0.05} as="li">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold/50 text-[0.7rem] text-gold-deep">
                      ✓
                    </span>
                    <span className="text-[0.95rem] leading-snug text-secondary-ink">
                      {a}
                    </span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ——— Персонална консултация (тъмночервеният акцент) ——— */}
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <Reveal>
          <div className="gold-frame relative overflow-hidden rounded-[2.5rem] bg-bordeaux-deep px-6 py-14 text-paper md:px-14 md:py-20">
            <div
              className="blob -right-24 -top-28 h-96 w-96 bg-gold/20"
              aria-hidden="true"
            />
            {/* Втората (и последна) инстанция на златния прашец */}
            <GoldDust className="absolute inset-0" />
            <div className="relative grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-6">
                <SunRays half className="w-16 text-gold-soft" />
                <h2 className="mt-5 max-w-[16ch] font-display text-[clamp(2rem,4.2vw,3.4rem)] font-normal leading-[1.08]">
                  Преоткрийте своята <em>истинска кожа</em>
                </h2>
                <p className="mt-5 max-w-md text-[0.98rem] text-paper/70">
                  Всичко в ателието започва с персонална консултация с Йоана,
                  посветена само на вашата кожа.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-5">
                  <CtaSolid href="/konsultatsia">Запази консултация</CtaSolid>
                  <div>
                    <p className="font-display text-[1.9rem] font-semibold leading-none text-gold-soft">
                      {consultation.price}
                    </p>
                    <p className="mt-1 text-[0.8rem] text-paper/55">
                      приспада се при последваща процедура
                    </p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5 lg:col-start-8">
                <ul className="space-y-3.5">
                  {consultation.includes.map((inc) => (
                    <li key={inc} className="flex items-start gap-3">
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/25 text-[0.65rem] text-gold-soft">
                        ✓
                      </span>
                      <span className="text-[0.93rem] text-paper/80">
                        {inc}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ——— Популярни услуги (8-те от плана) ——— */}
      <section className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-12">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="gold-rule" aria-hidden="true" />
              <h2 className="max-w-[18ch] font-display text-[clamp(1.9rem,3.6vw,3rem)] font-medium leading-tight text-bordeaux">
                Избрани процедури
              </h2>
            </div>
            <Link href="/uslugi" className="link-ink mb-2 text-[0.95rem]">
              Всички услуги
            </Link>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {popular.map((pop, i) => {
            const { cat, p } = proc(pop.cat, pop.slug);
            if (!cat || !p) return null;
            return (
              <Reveal key={p.slug} delay={(i % 4) * 0.05}>
                <Link
                  href={`/uslugi/${cat.slug}`}
                  className="group block h-full"
                >
                  <Card className="hover-lift flex h-full flex-col overflow-hidden">
                    <ImageSlot label={p.name} ratio="16 / 9" />
                    <div className="flex flex-1 flex-col justify-between p-6">
                      <div>
                        <h3 className="font-display text-[1.25rem] font-medium leading-snug text-bordeaux">
                          {p.name}
                        </h3>
                        <p className="mt-2.5 text-[0.86rem] leading-relaxed text-tertiary-ink">
                          {p.short}
                        </p>
                      </div>
                      <div className="mt-5 flex items-center justify-between border-t hairline pt-4">
                        <span className="tnum text-[0.95rem] font-semibold text-gold-deep">
                          {minPrice(p.prices)}
                        </span>
                        <span className="text-[0.85rem] text-secondary-ink transition-colors duration-200 group-hover:text-bordeaux">
                          Виж детайли →
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              </Reveal>
            );
          })}
          <Reveal delay={0.35}>
            <Link href="/lazerna-epilatsia" className="group block h-full">
              <div className="hover-lift relative flex h-full flex-col justify-between overflow-hidden rounded-[1.75rem] bg-bordeaux text-paper shadow-soft">
                <div
                  className="blob -right-10 -top-16 h-44 w-44 bg-gold/25"
                  aria-hidden="true"
                />
                <ImageSlot label="лазерна епилация" ratio="16 / 9" dark />
                <div className="relative p-6 pt-4">
                  <h3 className="font-display text-[1.25rem] font-medium leading-snug">
                    Лазерна епилация
                  </h3>
                  <p className="mt-2.5 text-[0.86rem] leading-relaxed text-paper/65">
                    Трайно гладка кожа за жени и мъже, по зони или в изгодни
                    пакети.
                  </p>
                </div>
                <div className="relative mx-6 mb-6 mt-auto flex items-center justify-between border-t hairline-cream pt-4">
                  <span className="text-[0.95rem] font-semibold text-gold-soft">
                    Цени по зони
                  </span>
                  <span className="text-[0.85rem] text-paper/70 transition-colors duration-200 group-hover:text-paper">
                    Виж зоните →
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ——— Пакети и програми ——— */}
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <Reveal>
          <div>
            <span className="gold-rule" aria-hidden="true" />
            <h2 className="max-w-[20ch] font-display text-[clamp(1.9rem,3.6vw,3rem)] font-medium leading-tight text-bordeaux">
              Пакети и програми
            </h2>
            <p className="mt-3 max-w-xl text-[0.95rem] text-tertiary-ink">
              {facePackages.gift}
            </p>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {facePackages.programs.map((prog, i) => {
            const vip = prog.name.startsWith("VIP");
            return (
              <Reveal key={prog.name} delay={i * 0.07}>
                <div
                  className={
                    vip
                      ? "gold-frame relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-bordeaux-deep p-7 text-paper shadow-soft"
                      : "gold-frame-soft flex h-full flex-col rounded-[1.75rem] bg-card p-7 shadow-soft"
                  }
                >
                  {vip && (
                    <div
                      className="blob -right-16 -top-20 h-56 w-56 bg-gold/20"
                      aria-hidden="true"
                    />
                  )}
                  <h3
                    className={`relative font-display text-[1.45rem] font-medium leading-snug ${vip ? "" : "text-bordeaux"}`}
                  >
                    {prog.name}
                  </h3>
                  <ul className="relative mt-5 flex-1 space-y-2.5">
                    {prog.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span
                          className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[0.65rem] ${
                            vip
                              ? "bg-gold/25 text-gold-soft"
                              : "bg-gold/15 text-gold-deep"
                          }`}
                        >
                          ✓
                        </span>
                        <span
                          className={`text-[0.92rem] ${vip ? "text-paper/80" : "text-secondary-ink"}`}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div
                    className={`relative mt-6 flex items-baseline justify-between border-t pt-5 ${vip ? "hairline-cream" : "hairline"}`}
                  >
                    <span
                      className={`text-[0.95rem] line-through decoration-1 ${vip ? "text-paper/45" : "text-tertiary-ink"}`}
                    >
                      {prog.oldPrice}
                    </span>
                    <span
                      className={`font-display text-[2rem] font-semibold ${vip ? "text-gold-soft" : "text-bordeaux"}`}
                    >
                      {prog.price}
                    </span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <CtaSolid href={contact.phoneHref} external>
              Попитай за пакет · {contact.phone}
            </CtaSolid>
            <Link href="/paketi" className="link-ink text-[0.95rem]">
              Лазерните пакети и всички отстъпки
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ——— Марките ——— */}
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-16">
        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <span className="gold-rule" aria-hidden="true" />
              <h2 className="font-display text-[clamp(1.7rem,3vw,2.4rem)] font-medium text-bordeaux">
                Марките, на които се доверяваме
              </h2>
            </div>
            <Link href="/marki" className="link-ink text-[0.95rem]">
              Историята зад всяка марка
            </Link>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-8">
            <Marquee>
              {brands.map((b) => (
                <Link
                  key={b.name}
                  href="/marki"
                  className="font-display text-[clamp(1.5rem,2.6vw,2.1rem)] whitespace-nowrap text-bordeaux/80 transition-colors duration-300 hover:text-bordeaux"
                >
                  {b.name}
                </Link>
              ))}
            </Marquee>
          </div>
        </Reveal>
      </section>

      {/* ——— Чести въпроси ——— */}
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <span className="gold-rule" aria-hidden="true" />
            <h2 className="font-display text-[clamp(1.9rem,3.6vw,2.9rem)] font-medium leading-tight text-bordeaux">
              Чести въпроси
            </h2>
            <p className="mt-4 max-w-xs text-[0.95rem] text-secondary-ink">
              Ако не намирате отговора си тук, обадете се:{" "}
              <a href={contact.phoneHref} className="link-ink tnum">
                {contact.phone}
              </a>
            </p>
          </Reveal>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal delay={0.08}>
              <Faq items={faq} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ——— Финален CTA (бежов, златни детайли) ——— */}
      <section className="mx-auto max-w-6xl px-5 pb-16 md:px-8 md:pb-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] px-6 py-16 text-center md:py-20">
            {/* Фонова снимка на ателието с кремав воал отгоре */}
            <ImageSlot label="ателието, широк кадър за фон" fill />
            <div
              className="absolute inset-0 bg-gradient-to-b from-paper/90 via-paper/80 to-blush/75"
              aria-hidden="true"
            />
            <span className="absolute right-4 top-4 rounded-full border border-gold/40 bg-card/90 px-3 py-1 text-[0.68rem] text-tertiary-ink">
              Снимка за фон: ателието, широк кадър
            </span>
            <div className="relative">
              <SunRays half draw className="mx-auto w-24 text-gold" />
              <h2 className="mx-auto mt-6 max-w-2xl font-display text-[clamp(2rem,4vw,3.1rem)] font-medium leading-tight text-bordeaux">
                Готови ли сте да се погрижите за кожата си?
              </h2>
              <p className="mx-auto mt-4 max-w-md text-[0.95rem] text-secondary-ink">
                Обадете се или ни пишете: ще намерим удобен час и точната
                процедура за вас.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <CtaSolid href={contact.phoneHref} external>
                  Обади се · {contact.phone}
                </CtaSolid>
                <CtaGhost href="/kontakti">Пиши ни</CtaGhost>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
