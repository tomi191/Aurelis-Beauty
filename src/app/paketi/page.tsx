import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { CtaGhost, CtaSolid, PriceRow } from "@/components/ui";
import { contact, facePackages, laserPackages } from "@/lib/data";

export const metadata: Metadata = {
  title: "Пакети и програми",
  description:
    "Комбо програми за резултатна грижа и пакети за лазерна епилация в AURÈLIS Beauty Atelier, Варна: Acne Clear, Skin Renewal, VIP Skin Rejuvenation и отстъпки за курс от процедури.",
};

export default function PaketiPage() {
  return (
    <>
      <section className="border-b hairline">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <Reveal>
            <h1 className="max-w-[16ch] font-display text-[clamp(2.4rem,6vw,4.6rem)] font-medium leading-[1.05] text-bordeaux">
              Здравата кожа обича постоянството
            </h1>
            <p className="mt-6 max-w-xl text-secondary-ink">
              Реалните резултати идват с курс от процедури. Затова програмите
              и пакетите на AURÈLIS правят постоянството по-леко и за кожата,
              и за бюджета.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Програми за лице */}
      <section>
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <Reveal>
            <h2 className="font-display text-[clamp(1.9rem,3.5vw,2.9rem)] font-medium text-bordeaux">
              Комбо програми за резултатна грижа
            </h2>
            <p className="mt-4 max-w-xl text-[0.95rem] text-tertiary-ink">
              {facePackages.gift}
            </p>
          </Reveal>

          <div className="mt-12 space-y-0 divide-y hairline border-y hairline">
            {facePackages.programs.map((prog, i) => (
              <Reveal key={prog.name} delay={i * 0.07} as="article">
                <div
                  className={`grid gap-6 py-10 md:grid-cols-12 md:items-baseline ${
                    i % 2 === 1 ? "md:pl-16" : ""
                  }`}
                >
                  <h3 className="font-display text-[clamp(1.5rem,2.8vw,2.1rem)] leading-tight text-primary-ink md:col-span-4">
                    {prog.name}
                  </h3>
                  <ul className="space-y-1.5 text-[0.95rem] text-secondary-ink md:col-span-5">
                    {prog.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <div className="md:col-span-3 md:text-right">
                    <span className="mr-3 text-[0.95rem] text-tertiary-ink line-through decoration-1">
                      {prog.oldPrice}
                    </span>
                    <span className="font-display text-[1.9rem] font-semibold text-bordeaux">
                      {prog.price}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-10 bg-paper-warm p-6 md:p-7">
              <p className="font-display text-lg text-bordeaux">
                Грижа с дълготраен ефект
              </p>
              {facePackages.loyalty.map((l) => (
                <PriceRow key={l.label} label={l.label} price={l.discount} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Лазерни пакети */}
      <section className="bg-bordeaux-deep text-paper">
        <div className="passepartout mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <Reveal>
            <h2 className="font-display text-[clamp(1.9rem,3.5vw,2.9rem)] font-medium">
              Лазерна епилация: краткият път към гладката кожа
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-14 lg:grid-cols-12">
            <Reveal delay={0.06} className="lg:col-span-4">
              <h3 className="border-b hairline-cream pb-3 font-display text-xl text-paper/90">
                Курсове
              </h3>
              <ul className="divide-y hairline-cream">
                {laserPackages.courses.map((c) => (
                  <li key={c.name} className="flex items-baseline py-3.5">
                    <span className="text-paper/85">{c.name}</span>
                    <span className="dot-leader opacity-40" />
                    <span className="mr-4 text-[0.85rem] text-paper/50">
                      {c.label}
                    </span>
                    <span className="font-display text-[1.2rem] font-semibold text-gold">
                      {c.discount}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[0.88rem] text-paper/50">
                {laserPackages.extra}
              </p>
            </Reveal>

            <Reveal delay={0.12} className="lg:col-span-7 lg:col-start-6">
              <h3 className="border-b hairline-cream pb-3 font-display text-xl text-paper/90">
                Комбо пакети
              </h3>
              <ul className="divide-y hairline-cream">
                {laserPackages.combos.map((combo) => (
                  <li
                    key={combo.name}
                    className="grid gap-1 py-4 md:grid-cols-12 md:items-baseline"
                  >
                    <span className="font-display text-[1.25rem] md:col-span-4">
                      {combo.name}
                    </span>
                    <span className="text-[0.88rem] text-paper/55 md:col-span-5">
                      {combo.items.join(" · ")}
                    </span>
                    <span className="md:col-span-3 md:text-right">
                      <span className="mr-3 text-[0.85rem] text-paper/40 line-through decoration-1">
                        {combo.oldPrice}
                      </span>
                      <span className="font-display text-[1.35rem] font-semibold text-paper">
                        {combo.price}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t hairline bg-paper-warm">
        <div className="mx-auto max-w-6xl px-5 py-16 text-center md:px-8 md:py-20">
          <Reveal>
            <p className="mx-auto max-w-xl font-display text-[1.5rem] leading-snug text-bordeaux">
              Не знаете коя програма е за вашата кожа? Консултацията решава
              това за 30 минути.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <CtaSolid href="/konsultatsia">Консултация · 20 €</CtaSolid>
              <CtaGhost href={contact.phoneHref} external>
                {contact.phone}
              </CtaGhost>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
