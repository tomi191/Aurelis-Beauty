import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Card, Chip, CtaGhost, CtaSolid } from "@/components/ui";
import { brands, contact } from "@/lib/data";

export const metadata: Metadata = {
  title: "Марките, с които работим",
  description:
    "Професионалната козметика в ателието: Collagena, BioRePeel, Casmara, NOON, Fusion Meso и SQT. Историята и патентите на всяка марка.",
  alternates: { canonical: "/marki" },
};

export default function MarkiPage() {
  return (
    <>
      <PageHero
        img="/images/about-workspace.webp"
        objectPosition="center 60%"
        title="Марките, с които работим"
        sub="Всяка марка в ателието е тук неслучайно: заради патент, формула или технология с видим резултат."
      />

      <section className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
        <div className="grid gap-5 md:grid-cols-2">
          {brands.map((brand, i) => (
            <Reveal key={brand.name} delay={(i % 2) * 0.07}>
              <Card className="flex h-full flex-col p-7 md:p-8">
                <h2 className="font-display text-[1.7rem] font-medium leading-snug text-bordeaux">
                  {brand.name}
                </h2>
                <p className="mt-2 font-display text-[1.1rem] leading-snug text-primary-ink">
                  {brand.tagline}
                </p>
                <div className="mt-5 space-y-4 border-t hairline pt-5">
                  <div>
                    <p className="text-[0.8rem] text-tertiary-ink">
                      Откъде идва
                    </p>
                    <p className="mt-1 text-[0.93rem] text-secondary-ink">
                      {brand.story}
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.8rem] text-tertiary-ink">
                      Какво я отличава
                    </p>
                    <p className="mt-1 text-[0.93rem] text-secondary-ink">
                      {brand.heart}
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.8rem] text-tertiary-ink">
                      Защо я избираме
                    </p>
                    <p className="mt-1 text-[0.93rem] text-secondary-ink">
                      {brand.why}
                    </p>
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        {/* Следващо действие: страницата беше задънена улица (одитна
            находка) — читателят, убеден от марките, отива към процедурите */}
        <Reveal delay={0.1}>
          <div className="relative mt-12 overflow-hidden rounded-[2.5rem] bg-bordeaux-deep px-6 py-12 text-center text-paper md:px-14 md:py-14">
            <div
              className="blob -right-20 -top-28 h-80 w-80 bg-gold/20"
              aria-hidden="true"
            />
            <div className="relative">
              <h2 className="mx-auto max-w-[22ch] font-display text-[clamp(1.8rem,3.4vw,2.7rem)] font-medium leading-tight">
                Вижте процедурите с тези марки
              </h2>
              <p className="mx-auto mt-4 max-w-md text-paper/70">
                Всяка марка стои зад конкретни терапии от ценоразписа ни.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-4">
                <CtaSolid href="/uslugi">Разгледай процедурите</CtaSolid>
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
