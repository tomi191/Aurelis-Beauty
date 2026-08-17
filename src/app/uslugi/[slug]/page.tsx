import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { CtaGhost, CtaSolid, MetaList, PriceRow } from "@/components/ui";
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
    title: `${cat.name} · Варна`,
    description: `${cat.intro} Цени и описание на процедурите в AURÈLIS Beauty Atelier, Варна.`,
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
      <section className="border-b hairline">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
          <Reveal>
            <Link href="/uslugi" className="link-ink text-[0.9rem]">
              ← Всички услуги
            </Link>
            <h1 className="mt-6 max-w-[18ch] font-display text-[clamp(2.2rem,5.5vw,4.2rem)] font-medium leading-[1.05] text-bordeaux">
              {cat.name}
            </h1>
            <p className="mt-5 max-w-xl text-secondary-ink">{cat.intro}</p>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          {cat.procedures.map((proc, i) => (
            <article
              key={proc.slug}
              className={`grid gap-10 py-16 md:grid-cols-12 md:py-24 ${
                i > 0 ? "border-t hairline" : ""
              }`}
            >
              <Reveal className="md:col-span-5">
                <h2 className="font-display text-[clamp(1.7rem,3.2vw,2.5rem)] font-medium leading-tight text-bordeaux">
                  {proc.name}
                </h2>
                <p className="mt-4 font-display text-[1.25rem] leading-snug text-primary-ink">
                  {proc.short}
                </p>
                <div className="mt-6 space-y-4 text-[0.98rem] text-secondary-ink">
                  {proc.description.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </Reveal>

              <div className="md:col-span-6 md:col-start-7">
                {proc.effects.length > 0 && (
                  <Reveal delay={0.08}>
                    <h3 className="font-display text-lg text-bordeaux">
                      Ефект
                    </h3>
                    <ul className="mt-4 space-y-2">
                      {proc.effects.map((e) => (
                        <li key={e} className="flex gap-3 text-[0.95rem]">
                          <span className="mt-[0.65em] h-px w-4 shrink-0 bg-gold" />
                          <span className="text-secondary-ink">{e}</span>
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                )}
                <Reveal delay={0.14} className="mt-10">
                  <MetaList
                    items={[
                      { term: "Времетраене", value: proc.duration },
                      { term: "Възстановяване", value: proc.recovery },
                      { term: "Препоръчителен курс", value: proc.count },
                      { term: "Интервал", value: proc.interval },
                    ]}
                  />
                </Reveal>
                <Reveal delay={0.2} className="mt-10 bg-paper-warm p-6 md:p-7">
                  {proc.prices.map((p) => (
                    <PriceRow key={p.label} label={p.label} price={p.price} />
                  ))}
                  {proc.note && (
                    <p className="mt-3 text-[0.85rem] text-tertiary-ink">
                      {proc.note}
                    </p>
                  )}
                </Reveal>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t hairline bg-paper-warm">
        <div className="mx-auto max-w-6xl px-5 py-16 text-center md:px-8 md:py-20">
          <Reveal>
            <p className="mx-auto max-w-xl font-display text-[1.5rem] leading-snug text-bordeaux">
              Не сте сигурни коя процедура е за вас? Започнете с консултация:
              анализ на кожата и личен план за грижа.
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
