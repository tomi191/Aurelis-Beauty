import Link from "next/link";
import Faq from "@/components/Faq";
import HomeHero from "@/components/HomeHero";
import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";
import SunRays from "@/components/SunRays";
import { Card, Chip, CtaGhost, CtaSolid } from "@/components/ui";
import {
  about,
  brands,
  categories,
  consultation,
  contact,
  founder,
  hours,
  laserZones,
} from "@/lib/data";

function fromPrice(prices: { price: string }[]): string {
  const nums = prices
    .map((p) => parseInt(p.price, 10))
    .filter((n) => !Number.isNaN(n));
  return nums.length ? `от ${Math.min(...nums)} €` : "";
}

/* Навигация по проблем: всяко съответствие идва от реалните описания
   на процедурите в data.ts (нулева фабрикация). */
const concerns = [
  {
    label: "Акне, черни точки и разширени пори",
    to: [
      { name: "Почистване на лице", href: "/uslugi/pochistvane-na-lice" },
      { name: "NOON Corrective Acne", href: "/uslugi/terapii-za-litse" },
    ],
  },
  {
    label: "Пигментни петна и белези от акне",
    to: [
      { name: "BioRePeel", href: "/uslugi/biorepeel" },
      { name: "SQT био-микронидлинг", href: "/uslugi/mikronidling" },
    ],
  },
  {
    label: "Първи бръчки и загуба на тонус",
    to: [
      { name: "Микронидлинг Fusion", href: "/uslugi/mikronidling" },
      { name: "NOON Anti-Age", href: "/uslugi/terapii-za-litse" },
    ],
  },
  {
    label: "Дехидратирана и уморена кожа",
    to: [
      { name: "Протоколи Casmara", href: "/uslugi/terapii-za-litse" },
      { name: "Карбокситерапия", href: "/uslugi/terapii-za-litse" },
    ],
  },
  {
    label: "Нежелано окосмяване",
    to: [{ name: "Лазерна епилация", href: "/lazerna-epilatsia" }],
  },
];

/* Стъпките идват от консултация.pdf и текста „първата среща" на клиента. */
const steps = [
  {
    n: "1",
    title: "Разговор и анализ на кожата",
    text: "Започваме с консултация: разглеждаме кожата ви отблизо и говорим за навиците, нуждите и целите ви.",
  },
  {
    n: "2",
    title: "Процедура, подбрана за вас",
    text: "Без готови схеми: избираме процедурата и марката според това, което кожата ви наистина иска.",
  },
  {
    n: "3",
    title: "План за домашна грижа",
    text: "Тръгвате си с личен план за професионална и домашна грижа и ясна следваща стъпка.",
  },
];

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
    a: "Обадете се на 088 981 6905 или ни пишете на имейл. Работим вторник, четвъртък и събота от 08:00 до 16:00, сряда и петък от 12:00 до 20:00.",
  },
];

export default function Home() {
  const zoneCount = laserZones.reduce((s, g) => s + g.zones.length, 0);

  return (
    <>
      {/* ——— Hero (client, motion каскада + live работно време) ——— */}
      <HomeHero />

      {/* ——— Процедури (bento) ——— */}
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-[18ch] font-display text-[clamp(1.9rem,3.6vw,3rem)] font-medium leading-tight text-bordeaux">
              Процедури за{" "}
              <span className="whitespace-nowrap">лице и тяло</span>
            </h2>
            <Link href="/uslugi" className="link-ink mb-2 text-[0.95rem]">
              Всички процедури и цени
            </Link>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {categories.map((cat, i) => (
            <Reveal
              key={cat.slug}
              delay={(i % 3) * 0.07}
              className={i === 0 || i === 3 || i === 5 ? "md:col-span-2" : ""}
            >
              <Link href={`/uslugi/${cat.slug}`} className="group block h-full">
                <Card className="hover-lift flex h-full flex-col justify-between p-7">
                  <div>
                    <h3 className="font-display text-[1.55rem] font-medium leading-snug text-bordeaux">
                      {cat.name}
                    </h3>
                    <p className="mt-3 text-[0.93rem] text-secondary-ink">
                      {cat.intro}
                    </p>
                    {(i === 0 || i === 3 || i === 5) && (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {cat.procedures.map((p) => (
                          <li
                            key={p.slug}
                            className="rounded-full border hairline px-3 py-1 text-[0.8rem] text-tertiary-ink"
                          >
                            {p.name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="tnum rounded-full bg-paper-soft px-4 py-1.5 text-[0.85rem] text-secondary-ink">
                      {fromPrice(cat.procedures.flatMap((p) => p.prices))}
                    </span>
                    <span
                      aria-hidden="true"
                      className="flex h-10 w-10 items-center justify-center rounded-full border hairline text-gold transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-paper"
                    >
                      →
                    </span>
                  </div>
                </Card>
              </Link>
            </Reveal>
          ))}
          <Reveal className="md:col-span-3">
            <Link href="/lazerna-epilatsia" className="group block">
              <div className="hover-lift relative overflow-hidden rounded-[1.75rem] bg-bordeaux-deep p-8 text-paper shadow-soft md:p-10">
                <div
                  className="blob -right-10 -top-24 h-72 w-72 bg-gold/20"
                  aria-hidden="true"
                />
                <div className="relative flex flex-wrap items-end justify-between gap-6">
                  <div>
                    <h3 className="font-display text-[clamp(1.7rem,3vw,2.4rem)] font-medium leading-tight">
                      Лазерна епилация
                    </h3>
                    <p className="mt-3 max-w-md text-[0.95rem] text-paper/65">
                      {zoneCount} зони за жени и мъже, от междувеждие до цели
                      крака. Курс от процедури носи до −15%.
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3 text-[0.92rem] text-bordeaux transition-transform duration-300 group-hover:-translate-y-0.5">
                    Зони и цени →
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ——— Как протича посещението ——— */}
      <section className="border-y hairline bg-paper-soft/50">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
          <Reveal>
            <h2 className="font-display text-[clamp(1.9rem,3.6vw,3rem)] font-medium leading-tight text-bordeaux">
              Как протича първото посещение
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <div className={i === 1 ? "md:mt-10" : i === 2 ? "md:mt-20" : ""}>
                  <p className="font-display text-[3.2rem] leading-none text-gold">
                    {s.n}
                  </p>
                  <h3 className="mt-4 text-[1.05rem] font-semibold text-primary-ink">
                    {s.title}
                  </h3>
                  <p className="mt-2 max-w-xs text-[0.93rem] text-secondary-ink">
                    {s.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-12 flex flex-wrap items-center gap-5">
              <CtaSolid href="/konsultatsia">
                Консултация · {consultation.price}
              </CtaSolid>
              <p className="text-[0.88rem] text-tertiary-ink">
                {consultation.note}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ——— По проблем ——— */}
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <Reveal>
          <h2 className="max-w-[20ch] font-display text-[clamp(1.9rem,3.6vw,3rem)] font-medium leading-tight text-bordeaux">
            С какво да ви помогнем?
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <ul className="mt-8 divide-y hairline border-y hairline">
            {concerns.map((c) => (
              <li
                key={c.label}
                className="grid gap-2 py-5 md:grid-cols-12 md:items-baseline"
              >
                <p className="text-[1.05rem] text-primary-ink md:col-span-6">
                  {c.label}
                </p>
                <p className="flex flex-wrap gap-x-5 gap-y-1 md:col-span-6">
                  {c.to.map((t) => (
                    <Link
                      key={t.name}
                      href={t.href}
                      className="link-ink text-[0.95rem]"
                    >
                      {t.name}
                    </Link>
                  ))}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* ——— За AURÈLIS ——— */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-12">
        <Reveal className="relative lg:col-span-5">
          <div className="arch relative mx-auto flex aspect-[4/5] max-w-sm items-end justify-center overflow-hidden bg-gradient-to-b from-taupe/50 via-taupe/30 to-paper-soft">
            <SunRays half className="mb-16 w-32 text-taupe" />
          </div>
          <Card className="absolute -bottom-6 left-1/2 w-[88%] max-w-sm -translate-x-1/2 px-6 py-5">
            <p className="font-display text-[1.4rem] leading-snug text-bordeaux">
              „{founder.quote}“
            </p>
            <p className="mt-2 text-[0.8rem] text-tertiary-ink">
              {founder.name}, {founder.role.toLowerCase()}
            </p>
          </Card>
        </Reveal>
        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal>
            <Chip>За AURÈLIS</Chip>
            <p className="mt-6 font-display text-[clamp(1.5rem,2.6vw,2.1rem)] leading-snug text-primary-ink">
              {about.philosophy}
            </p>
          </Reveal>
          <div className="mt-8 space-y-4">
            <Reveal delay={0.08}>
              <Card className="p-6">
                <h3 className="text-[1.02rem] font-semibold text-bordeaux">
                  Нашата мисия
                </h3>
                <p className="mt-2 text-[0.95rem] text-secondary-ink">
                  {about.mission}
                </p>
              </Card>
            </Reveal>
            <Reveal delay={0.14} className="md:pl-10">
              <Card className="p-6">
                <h3 className="text-[1.02rem] font-semibold text-bordeaux">
                  Нашата визия
                </h3>
                <p className="mt-2 text-[0.95rem] text-secondary-ink">
                  {about.vision}
                </p>
              </Card>
            </Reveal>
            <Reveal delay={0.2}>
              <Link
                href="/za-nas"
                className="link-ink inline-block text-[0.95rem]"
              >
                Защо се казваме AURÈLIS и кои сме ние
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ——— Йоана (визитка, пълната история е в /za-nas) ——— */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal>
            <Chip>Кой ще се грижи за кожата ви</Chip>
            <h2 className="mt-6 font-display text-[clamp(1.9rem,3.6vw,3rem)] font-medium leading-tight text-bordeaux">
              {founder.name}
            </h2>
            <p className="mt-2 text-[0.95rem] text-tertiary-ink">
              {founder.role}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {founder.facts.map((f) => (
                <Chip key={f}>{f}</Chip>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-7 text-[0.98rem] text-secondary-ink">
              {founder.story[0]}
            </p>
            <p className="mt-4 text-[0.98rem] text-secondary-ink">
              {founder.story[1]}
            </p>
            <Link
              href="/za-nas"
              className="link-ink mt-6 inline-block text-[0.95rem]"
            >
              Моята история и защо създадох AURÈLIS
            </Link>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
          {/* Портрет: очаква фотосесия — тонален arch placeholder с offset слой */}
          <div className="relative mx-auto max-w-sm">
            <div
              aria-hidden="true"
              className="arch absolute inset-x-6 -bottom-4 top-10 -z-10 bg-gold/20"
            />
            <div className="arch relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-gradient-to-b from-taupe/45 to-paper-soft">
              <SunRays className="w-28 text-taupe/80" />
            </div>
          </div>
        </Reveal>
      </section>

      {/* ——— Консултация ——— */}
      <section className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <Card className="grid gap-10 p-8 md:p-12 lg:grid-cols-2">
            <div>
              <Chip>Първата стъпка</Chip>
              <h2 className="mt-6 max-w-[16ch] font-display text-[clamp(1.9rem,3.6vw,2.9rem)] font-medium leading-tight text-bordeaux">
                Грижата за вас започва още с първата ни среща
              </h2>
              <p className="mt-5 max-w-md text-[0.98rem] text-secondary-ink">
                {about.firstVisit}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <CtaSolid href="/konsultatsia">
                  Консултация · {consultation.price}
                </CtaSolid>
                <CtaGhost href={contact.phoneHref} external>
                  {contact.phone}
                </CtaGhost>
              </div>
            </div>
            <div className="rounded-[1.5rem] bg-paper-soft/70 p-7 md:p-8">
              <p className="font-display text-lg font-semibold text-bordeaux">
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
              <p className="mt-6 border-t hairline pt-4 text-[0.85rem] text-tertiary-ink">
                {consultation.note}
              </p>
            </div>
          </Card>
        </Reveal>
      </section>

      {/* ——— Марките ——— */}
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="font-display text-[clamp(1.7rem,3vw,2.4rem)] font-medium text-bordeaux">
              Марките, с които работим
            </h2>
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
      <section className="border-t hairline">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2 className="font-display text-[clamp(1.9rem,3.6vw,2.9rem)] font-medium leading-tight text-bordeaux">
              Чести въпроси
            </h2>
            <p className="mt-4 max-w-xs text-[0.95rem] text-secondary-ink">
              Ако не намирате отговора тук, обадете се: {contact.phone}.
            </p>
          </Reveal>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal delay={0.08}>
              <Faq items={faq} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ——— Финален CTA ——— */}
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-bordeaux-deep px-6 py-16 text-center text-paper md:py-20">
            <div
              className="blob -bottom-32 left-1/2 h-96 w-96 -translate-x-1/2 bg-gold/20"
              aria-hidden="true"
            />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl font-display text-[clamp(2rem,4vw,3.1rem)] font-medium leading-tight">
                Всичко започва с едно обаждане
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-[0.98rem] text-paper/65">
                Ще поговорим за вашата кожа и ще преценим заедно откъде да
                започнем.
              </p>
              <a
                href={contact.phoneHref}
                className="tnum mt-8 inline-block font-display text-[clamp(1.9rem,4.5vw,3.4rem)] font-semibold text-gold-soft transition-colors duration-300 hover:text-paper"
              >
                {contact.phone}
              </a>
              <p className="mt-6 text-[0.9rem] text-paper/55">
                {contact.addressFull} · {hours[0].days} {hours[0].time} ·{" "}
                {hours[1].days} {hours[1].time}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <CtaGhost href="/kontakti" dark>
                  Контакти и работно време
                </CtaGhost>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
