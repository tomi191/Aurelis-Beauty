import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import {
  Card,
  Chip,
  CtaGhost,
  CtaSolid,
  MetaStrip,
  PriceRow,
} from "@/components/ui";
import { categories, contact, facePackages } from "@/lib/data";
import { siteUrl } from "@/lib/site";

/* Hero кадър по категория — единната брандинг линия на всяка страница */
const CATEGORY_HERO: Record<string, string> = {
  "pochistvane-na-lice": "/images/cat-cleansing.webp",
  biorepeel: "/images/proc-biorepeel.webp",
  "terapii-za-litse": "/images/cat-therapy.webp",
  mikronidling: "/images/proc-needling.webp",
  "led-terapia": "/images/led-hero.webp",
  vezhdi: "/images/cat-brows.webp",
};

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
    alternates: { canonical: `/uslugi/${cat.slug}` },
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

  // Програмите, които включват процедура от тази категория (по steps href)
  const relatedPrograms = facePackages.programs.filter((p) =>
    p.steps.some((s) => s.href === `/uslugi/${cat.slug}`)
  );

  return (
    <>
      {/* Service схема с реалните оферти + breadcrumb пътеката за Google */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            ...cat.procedures.map((proc) => ({
              "@type": "Service",
              name: proc.name,
              serviceType: cat.name,
              provider: { "@id": `${siteUrl}/#salon` },
              areaServed: "Варна",
              url: `${siteUrl}/uslugi/${cat.slug}#${proc.slug}`,
              offers: proc.prices
                .filter((p) => !Number.isNaN(parseInt(p.price, 10)))
                .map((p) => ({
                  "@type": "Offer",
                  name: p.label,
                  price: parseInt(p.price, 10),
                  priceCurrency: "EUR",
                })),
            })),
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Начало", item: siteUrl },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Услуги",
                  item: `${siteUrl}/uslugi`,
                },
                { "@type": "ListItem", position: 3, name: cat.name },
              ],
            },
          ],
        }}
      />
      <PageHero
        img={CATEGORY_HERO[cat.slug] ?? "/images/uslugi-hub-hero.webp"}
        title={`${cat.name} във Варна`}
        titleClassName="mt-5 max-w-[18ch] font-display text-[clamp(2.1rem,4.6vw,3.8rem)] font-normal leading-[1.05] text-bordeaux"
        sub={cat.intro}
        eyebrow={
          <Link
            href="/uslugi"
            className="link-ink -my-2.5 inline-flex items-center py-2.5 pr-3 text-[0.9rem]"
          >
            ← Всички услуги
          </Link>
        }
      />

      <section className="mx-auto max-w-6xl space-y-8 px-5 py-12 md:px-8 md:py-16">
        {cat.procedures.map((proc, i) => (
          <Reveal key={proc.slug} delay={i === 0 ? 0 : 0.05}>
            {/* id-то прави процедурата дълбоко линкваема (#slug от
                „Избрани процедури" на началната) */}
            <Card className="scroll-mt-28 overflow-hidden" id={proc.slug}>
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
                            <span className="mt-1 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border border-gold/60 bg-gold/20 text-[0.6rem] text-gold-deep">
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

        {relatedPrograms.length > 0 && (
          <Reveal>
            {/* Интерлинкинг: процедурите от категорията влизат в пакетни
                програми с отстъпка — преди одита това беше задънена улица */}
            <div className="rounded-[2rem] border border-gold/40 bg-blush/40 p-7 md:p-8">
              <span className="gold-rule" aria-hidden="true" />
              <h2 className="font-display text-[1.5rem] font-medium text-bordeaux">
                По-изгодно в програма
              </h2>
              <p className="mt-2 max-w-2xl text-[0.95rem] text-secondary-ink">
                Процедури от тази категория влизат в пакетните ни програми с
                отстъпка и LED терапия подарък към всяко посещение.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {relatedPrograms.map((prog) => (
                  <Link
                    key={prog.slug}
                    href={`/paketi/${prog.slug}`}
                    className="group inline-flex items-baseline gap-2.5 rounded-full border border-gold/50 bg-card px-5 py-2.5 transition-colors duration-200 hover:border-bordeaux"
                  >
                    <span className="text-[0.95rem] font-semibold text-bordeaux">
                      {prog.name}
                    </span>
                    <span className="tnum text-[0.9rem] text-gold-deep">
                      {prog.price}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-bordeaux-deep px-6 py-12 text-center text-paper md:py-14">
            <div
              className="blob -top-24 left-1/2 h-64 w-64 -translate-x-1/2 bg-gold/20"
              aria-hidden="true"
            />
            <div className="relative">
              <p className="mx-auto max-w-xl font-display text-[1.5rem] leading-snug">
                Не сте сигурни коя процедура е за вас? Елате на консултация:
                преглеждаме кожата ви и избираме заедно.
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
