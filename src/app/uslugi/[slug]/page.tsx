import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import {
  Card,
  Chip,
  CtaGhost,
  CtaSolid,
  MetaStrip,
  PriceRow,
} from "@/components/ui";
import { categories, contact } from "@/lib/data";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) return {};
  return {
    title: cat.seoTitle,
    description: cat.seoDescription,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) notFound();

  return (
    <>
      <section className="relative overflow-hidden">
        <div
          className="blob -top-24 right-[5%] h-72 w-72 bg-gold/20"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl px-5 pb-4 pt-8 md:px-8 md:pt-12">
          <Reveal>
            <Link href="/uslugi" className="link-ink text-[0.9rem]">
              ← Всички услуги
            </Link>
            <h1 className="mt-5 max-w-[18ch] font-display text-[clamp(2.1rem,4.6vw,3.8rem)] font-normal leading-[1.05] text-bordeaux">
              {cat.name}
            </h1>
            <p className="mt-4 max-w-xl text-secondary-ink">{cat.intro}</p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-8 px-5 py-12 md:px-8 md:py-16">
        {cat.procedures.map((proc, i) => (
          <Reveal key={proc.slug} delay={i === 0 ? 0 : 0.05}>
            <Card className="overflow-hidden">
              <article className="grid gap-10 p-7 md:p-10 lg:grid-cols-12">
                <div className="lg:col-span-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="font-display text-[clamp(1.55rem,2.8vw,2.15rem)] font-medium leading-tight text-bordeaux">
                      {proc.name}
                    </h2>
                  </div>
                  <p className="mt-3 font-display text-[1.2rem] leading-snug text-primary-ink">
                    {proc.short}
                  </p>
                  <div className="mt-5 space-y-4 text-[0.95rem] text-secondary-ink">
                    {proc.description.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                  {proc.effects.length > 0 && (
                    <div className="mt-7">
                      <p className="text-[0.85rem] text-tertiary-ink">Ефект</p>
                      <ul className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                        {proc.effects.map((e) => (
                          <li key={e} className="flex items-start gap-2.5">
                            <span className="mt-1 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-gold/15 text-[0.6rem] text-gold">
                              ✓
                            </span>
                            <span className="text-[0.9rem] text-secondary-ink">
                              {e}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-6 lg:col-span-6">
                  <MetaStrip
                    items={[
                      { term: "Времетраене", value: proc.duration },
                      { term: "Възстановяване", value: proc.recovery },
                      { term: "Курс", value: proc.count },
                      { term: "Интервал", value: proc.interval },
                    ]}
                  />
                  <div className="rounded-[1.5rem] bg-paper-soft/70 px-6 py-5 md:px-7">
                    <p className="text-[1.02rem] font-semibold text-bordeaux">
                      Цени
                    </p>
                    <div className="mt-2">
                      {proc.prices.map((p) => (
                        <PriceRow
                          key={p.label}
                          label={p.label}
                          price={p.price}
                        />
                      ))}
                    </div>
                    {proc.note && (
                      <p className="mt-2 text-[0.85rem] text-tertiary-ink">
                        {proc.note}
                      </p>
                    )}
                    <div className="mt-5 flex flex-wrap gap-3 border-t hairline pt-5">
                      <CtaSolid href={contact.phoneHref} external>
                        Запази час
                      </CtaSolid>
                      <CtaGhost href="/konsultatsia">Консултация</CtaGhost>
                    </div>
                  </div>
                </div>
              </article>
            </Card>
          </Reveal>
        ))}

        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-bordeaux-deep px-6 py-12 text-center text-paper md:py-14">
            <div
              className="blob -top-24 left-1/2 h-64 w-64 -translate-x-1/2 bg-gold/20"
              aria-hidden="true"
            />
            <div className="relative">
              <p className="mx-auto max-w-xl font-display text-[1.5rem] leading-snug">
                Не сте сигурни коя процедура е за вас? Елате на консултация:
                за 30 минути ще прегледаме кожата ви и ще изберем заедно.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-4">
                <CtaSolid href="/konsultatsia">Консултация · 20 €</CtaSolid>
                <CtaGhost href={contact.phoneHref} external dark>
                  {contact.phone}
                </CtaGhost>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
