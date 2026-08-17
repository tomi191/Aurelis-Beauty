import Link from "next/link";
import Reveal from "@/components/Reveal";
import SunRays from "@/components/SunRays";
import { CtaGhost, CtaSolid } from "@/components/ui";
import { about, brands, consultation, contact, founder } from "@/lib/data";

export default function Home() {
  return (
    <>
      {/* ——— Манифест (hero) ——— */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-5 pt-16 pb-20 md:px-8 md:pt-24 md:pb-28">
          <Reveal>
            <p className="text-[0.7rem] uppercase tracking-[0.45em] text-tertiary-ink">
              Козметично студио · Варна
            </p>
          </Reveal>
          <div className="relative mt-8 md:mt-10">
            <SunRays
              half
              className="pointer-events-none absolute -top-10 right-0 hidden w-40 text-gold/70 md:block lg:w-52"
            />
            <Reveal delay={0.08}>
              <h1 className="max-w-[17ch] font-display text-[clamp(2.6rem,7.5vw,6.2rem)] font-medium leading-[1.02] tracking-[-0.015em] text-bordeaux">
                Истинската грижа започва там, където{" "}
                <em className="font-normal">човекът</em> е по-важен от
                процедурата.
              </h1>
            </Reveal>
          </div>
          <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12">
            <Reveal delay={0.16} className="md:col-span-5 md:col-start-6">
              <p className="max-w-md text-[1.05rem] leading-relaxed text-secondary-ink">
                {about.intro} Без универсални решения: правилна диагностика,
                професионални продукти и постоянство, събрани в протокол,
                съобразен с вашата кожа.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <CtaSolid href="/konsultatsia">Запазете консултация</CtaSolid>
                <CtaGhost href={contact.phoneHref} external>
                  {contact.phone}
                </CtaGhost>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ——— За AURÈLIS ——— */}
      <section className="border-t hairline">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-12 md:px-8 md:py-32">
          <Reveal className="md:col-span-4">
            <h2 className="font-display text-[clamp(1.9rem,3.5vw,2.9rem)] font-medium leading-tight text-bordeaux">
              За AURÈLIS
            </h2>
          </Reveal>
          <div className="md:col-span-7 md:col-start-6">
            <Reveal delay={0.08}>
              <p className="font-display text-[1.45rem] leading-snug text-primary-ink md:text-[1.7rem]">
                {about.philosophy}
              </p>
            </Reveal>
            <div className="mt-12 space-y-10">
              <Reveal delay={0.12} className="border-l hairline pl-6 md:ml-0">
                <h3 className="font-display text-xl text-bordeaux">
                  Нашата мисия
                </h3>
                <p className="mt-3 max-w-xl text-secondary-ink">
                  {about.mission}
                </p>
              </Reveal>
              <Reveal
                delay={0.18}
                className="border-l hairline pl-6 md:ml-16"
              >
                <h3 className="font-display text-xl text-bordeaux">
                  Нашата визия
                </h3>
                <p className="mt-3 max-w-xl text-secondary-ink">
                  {about.vision}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ——— А защо AURÈLIS? (историята на името) ——— */}
      <section className="bg-bordeaux-deep text-paper">
        <div className="passepartout mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-36">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <SunRays className="mx-auto w-16 text-gold" />
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-8 font-display text-[clamp(2rem,4.5vw,3.4rem)] font-medium leading-tight">
                А защо AURÈLIS?
              </h2>
            </Reveal>
            <div className="mt-10 space-y-6 text-left text-[1.02rem] leading-relaxed text-paper/75">
              {about.whyName.map((p, i) => (
                <Reveal key={i} delay={0.1 + i * 0.06} as="div">
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.3}>
              <p className="mx-auto mt-14 max-w-xl font-display text-[1.5rem] leading-snug text-paper md:text-[1.75rem]">
                {about.closing}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ——— Запознайте се с мен ——— */}
      <section>
        <div className="mx-auto grid max-w-6xl items-start gap-12 px-5 py-20 md:grid-cols-12 md:px-8 md:py-32">
          {/* Снимка: очаква фотосесия от клиента (shot-list във vault). Тонален
              блок вместо стокова заместителна фотография — нулева фабрикация. */}
          <Reveal className="md:col-span-5">
            <div className="relative flex aspect-[3/4] items-end bg-taupe/25 p-6">
              <SunRays className="absolute right-6 top-6 w-12 text-taupe" />
              <div>
                <p className="font-display text-2xl text-bordeaux">
                  {founder.name}
                </p>
                <p className="mt-1 text-[0.85rem] text-tertiary-ink">
                  {founder.role}
                </p>
              </div>
            </div>
          </Reveal>

          <div className="md:col-span-6 md:col-start-7">
            <Reveal>
              <h2 className="font-display text-[clamp(1.9rem,3.5vw,2.9rem)] font-medium leading-tight text-bordeaux">
                Запознайте се с мен
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <ul className="mt-8 divide-y hairline border-y hairline">
                {founder.facts.map((f) => (
                  <li key={f} className="py-3 text-secondary-ink">
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>
            <div className="mt-8 space-y-5 text-secondary-ink">
              {founder.story.map((p, i) => (
                <Reveal key={i} delay={0.12 + i * 0.06} as="div">
                  <p>{p}</p>
                </Reveal>
              ))}
              {founder.whyCreated.map((p, i) => (
                <Reveal key={i} delay={0.24 + i * 0.06} as="div">
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.36}>
              <blockquote className="mt-10 border-l-2 border-gold pl-6 font-display text-[1.35rem] leading-snug text-bordeaux">
                „{founder.quote}“
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ——— Първата среща ——— */}
      <section className="border-t hairline bg-paper-warm">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-32">
          <div className="grid gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-5">
              <h2 className="font-display text-[clamp(1.9rem,3.5vw,2.9rem)] font-medium leading-tight text-bordeaux">
                Грижата за вас започва още с първата ни среща
              </h2>
              <p className="mt-6 max-w-md text-secondary-ink">
                {about.firstVisit}
              </p>
            </Reveal>
            <div className="md:col-span-6 md:col-start-7">
              <Reveal delay={0.1}>
                <div className="border hairline bg-paper p-7 md:p-9">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-xl text-bordeaux">
                      Персонална консултация
                    </h3>
                    <span className="font-display text-2xl font-semibold text-bordeaux">
                      {consultation.price}
                    </span>
                  </div>
                  <ul className="mt-6 space-y-2.5">
                    {consultation.includes.map((item) => (
                      <li key={item} className="flex gap-3 text-[0.95rem]">
                        <span className="text-gold">✓</span>
                        <span className="text-secondary-ink">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 border-t hairline pt-4 text-[0.85rem] text-tertiary-ink">
                    {consultation.note}
                  </p>
                  <div className="mt-6">
                    <CtaSolid href="/konsultatsia">
                      Повече за консултацията
                    </CtaSolid>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ——— Марките ——— */}
      <section className="border-t hairline">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <Reveal>
            <h2 className="font-display text-[clamp(1.9rem,3.5vw,2.9rem)] font-medium leading-tight text-bordeaux">
              Марките, на които се доверяваме
            </h2>
            <p className="mt-4 max-w-xl text-secondary-ink">
              Качествената грижа започва с качествения избор. Работим само с
              професионални брандове с доказани формули и реални патенти.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="mt-12 flex flex-wrap items-baseline gap-x-10 gap-y-6">
              {brands.map((b) => (
                <li key={b.name}>
                  <Link
                    href="/marki"
                    className="font-display text-[clamp(1.5rem,3vw,2.3rem)] text-primary-ink transition-colors duration-300 hover:text-bordeaux"
                  >
                    {b.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.16}>
            <Link
              href="/marki"
              className="link-ink mt-10 inline-block text-[0.95rem]"
            >
              Историята зад всяка марка
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ——— Финален CTA ——— */}
      <section className="border-t hairline bg-paper-warm">
        <div className="mx-auto max-w-6xl px-5 py-20 text-center md:px-8 md:py-28">
          <Reveal>
            <h2 className="mx-auto max-w-2xl font-display text-[clamp(2rem,4.5vw,3.4rem)] font-medium leading-tight text-bordeaux">
              Вашата грижа започва оттук
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-secondary-ink">
              Обадете се или ни пишете: ще поговорим за вашата кожа и ще
              изберем правилната първа стъпка.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <CtaSolid href={contact.phoneHref} external>
                {contact.phone}
              </CtaSolid>
              <CtaGhost href="/kontakti">Контакти и работно време</CtaGhost>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
