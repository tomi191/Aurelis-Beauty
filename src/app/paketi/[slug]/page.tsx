import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlurTitle from "@/components/BlurTitle";
import CountUp from "@/components/CountUp";
import Reveal from "@/components/Reveal";
import { Card, CtaGhost, CtaSolid, MetaStrip } from "@/components/ui";
import { consultation, contact, facePackages } from "@/lib/data";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return facePackages.programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const prog = facePackages.programs.find((p) => p.slug === slug);
  if (!prog) return {};
  return {
    title: `${prog.name} · Пакетна програма за лице · Варна`,
    description: `${prog.tagline}. ${prog.items.join(", ")}. Цена ${prog.price} вместо ${prog.oldPrice}, с LED терапия подарък към всяка процедура.`,
    alternates: { canonical: `/paketi/${slug}` },
  };
}

/* Спестената сума от реалните цени, без да я пишем на ръка в данните */
function savings(oldPrice: string, price: string): string {
  const diff = parseInt(oldPrice, 10) - parseInt(price, 10);
  return Number.isNaN(diff) ? "" : `${diff} €`;
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const prog = facePackages.programs.find((p) => p.slug === slug);
  if (!prog) notFound();

  const totalCount = prog.steps.reduce(
    (s, st) => s + (parseInt(st.count, 10) || 0),
    0
  );

  return (
    <>
      <section className="relative overflow-x-clip">
        <div
          className="blob -top-24 right-[5%] h-80 w-80 bg-gold/20"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl px-5 pb-4 pt-8 md:px-8 md:pt-12">
          <Reveal>
            <Link
              href="/paketi"
              className="link-ink -my-2.5 inline-flex items-center py-2.5 pr-3 text-[0.9rem]"
            >
              ← Всички пакети
            </Link>
            <span className="gold-rule mt-6 block" aria-hidden="true" />
            <BlurTitle
              text={prog.name}
              className="mt-6 max-w-[18ch] font-display text-[clamp(2.2rem,4.6vw,3.8rem)] font-normal leading-[1.06] text-bordeaux"
            />
            <p className="mt-4 max-w-xl text-[1.05rem] text-secondary-ink">
              {prog.tagline}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8">
              <MetaStrip
                items={[
                  { term: "Процедури", value: `${totalCount} посещения` },
                  { term: "Подарък", value: "LED терапия към всяка процедура" },
                  {
                    term: "Спестявате",
                    value: savings(prog.oldPrice, prog.price),
                  },
                  { term: "Графикът", value: "планира се на консултацията" },
                ]}
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <span className="gold-rule" aria-hidden="true" />
              <h2 className="mt-4 font-display text-[clamp(1.7rem,3vw,2.4rem)] font-medium leading-tight text-bordeaux">
                За кого е програмата
              </h2>
            </Reveal>
            <div className="mt-5 space-y-4 text-[0.98rem] leading-relaxed text-secondary-ink">
              {prog.about.map((p, i) => (
                <Reveal key={i} delay={0.08 + i * 0.05} as="div">
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.2}>
              <p className="mt-6 text-[0.95rem] text-tertiary-ink">
                Преди да започнем, минаваме през консултация и анализ на кожата
                ({consultation.price}, приспада се при последваща процедура).
                Там определяме и графика на посещенията.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={0.1}>
              <Card className="spot p-7 md:p-8">
                <p className="text-[1.05rem] font-semibold text-bordeaux">
                  Какво включва
                </p>
                <ul className="mt-5 divide-y hairline">
                  {prog.steps.map((st) => (
                    <li key={st.name} className="py-4">
                      <div className="flex items-baseline gap-3">
                        <span className="tnum shrink-0 font-display text-xl font-semibold text-gold-deep">
                          {st.count}
                        </span>
                        <div className="min-w-0">
                          <p className="font-semibold text-primary-ink">
                            {st.name}
                          </p>
                          <p className="mt-1 text-[0.9rem] leading-relaxed text-secondary-ink">
                            {st.note}
                          </p>
                          <Link
                            href={st.href}
                            className="link-ink mt-1.5 inline-block text-[0.88rem]"
                          >
                            Виж процедурата
                          </Link>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex items-baseline justify-between border-t hairline pt-5">
                  <span className="text-[0.95rem] text-tertiary-ink line-through decoration-1">
                    {prog.oldPrice}
                  </span>
                  <CountUp
                    value={prog.price}
                    className="font-display text-[2.2rem] font-semibold text-bordeaux"
                  />
                </div>
                <p className="mt-1 text-right text-[0.85rem] text-tertiary-ink">
                  {facePackages.gift}
                </p>
              </Card>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <CtaSolid href={contact.phoneHref} external>
              Запази час · {contact.phone}
            </CtaSolid>
            <CtaGhost href="/konsultatsia">
              Първо консултация · {consultation.price}
            </CtaGhost>
          </div>
        </Reveal>
      </section>
    </>
  );
}
