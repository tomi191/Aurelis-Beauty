import type { Metadata } from "next";
import BlurTitle from "@/components/BlurTitle";
import Reveal from "@/components/Reveal";
import SunRays from "@/components/SunRays";
import { Card, Chip, CtaGhost, CtaSolid } from "@/components/ui";
import { about, contact, founder } from "@/lib/data";

export const metadata: Metadata = {
  title: "За нас · Козметично студио AURÈLIS Варна",
  description:
    "AURÈLIS Beauty Atelier е козметично студио във Варна, създадено от медицинския козметик Йоана Здравкова. Историята на ателието, името и философията ни за грижа за кожата.",
  alternates: { canonical: "/za-nas" },
};

export default function ZaNasPage() {
  return (
    <>
      {/* ——— За AURÈLIS ——— */}
      <section className="relative overflow-hidden">
        <div
          className="blob -top-24 right-[0%] h-96 w-96 bg-gold/20"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl px-5 pb-4 pt-8 md:px-8 md:pt-12">
          <Reveal>
            <span className="gold-rule" aria-hidden="true" />
            <BlurTitle
              text="За AURÈLIS"
              className="mt-6 max-w-[16ch] font-display text-[clamp(2.3rem,5vw,4.2rem)] font-normal leading-[1.05] text-bordeaux"
            />
            <p className="mt-6 max-w-2xl font-display text-[clamp(1.35rem,2.4vw,1.8rem)] leading-snug text-primary-ink">
              {about.intro}
            </p>
            <p className="mt-5 max-w-2xl text-secondary-ink">
              {about.philosophy}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
        <div className="grid gap-5 md:grid-cols-2">
          <Reveal>
            <Card className="h-full p-7 md:p-8">
              <h2 className="text-[1.05rem] font-semibold text-bordeaux">
                Нашата мисия
              </h2>
              <p className="mt-3 text-[0.98rem] text-secondary-ink">
                {about.mission}
              </p>
            </Card>
          </Reveal>
          <Reveal delay={0.08} className="md:mt-10">
            <Card className="h-full p-7 md:p-8">
              <h2 className="text-[1.05rem] font-semibold text-bordeaux">
                Нашата визия
              </h2>
              <p className="mt-3 text-[0.98rem] text-secondary-ink">
                {about.vision}
              </p>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* ——— А защо AURÈLIS? ——— */}
      <section className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-bordeaux-deep px-6 py-16 text-paper md:px-16 md:py-24">
            <div
              className="blob -top-24 left-1/2 h-80 w-80 -translate-x-1/2 bg-gold/20"
              aria-hidden="true"
            />
            <div className="relative mx-auto max-w-2xl text-center">
              <SunRays className="mx-auto w-16 text-gold-soft" />
              <h2 className="mt-7 font-display text-[clamp(2rem,4vw,3.1rem)] font-medium leading-tight">
                А защо AURÈLIS?
              </h2>
              <div className="mt-8 space-y-5 text-left text-[1rem] leading-relaxed text-paper/75">
                {about.whyName.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <p className="mx-auto mt-12 max-w-xl font-display text-[1.45rem] leading-snug text-paper md:text-[1.7rem]">
                {about.closing}
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ——— Моята история ——— */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal>
            <span className="gold-rule" aria-hidden="true" />
            <h2 className="font-display text-[clamp(1.9rem,3.6vw,3rem)] font-medium leading-tight text-bordeaux">
              Моята история
            </h2>
            <p className="mt-2 text-[0.95rem] text-tertiary-ink">
              {founder.name} · {founder.role}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {founder.facts.map((f) => (
                <Chip key={f}>{f}</Chip>
              ))}
            </div>
          </Reveal>
          <div className="mt-7 space-y-4 text-[0.98rem] text-secondary-ink">
            {[...founder.story, ...founder.whyCreated].map((p, i) => (
              <Reveal key={i} delay={0.12 + i * 0.05} as="div">
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <blockquote className="mt-8 border-l-2 border-gold pl-6 font-display text-[1.4rem] leading-snug text-bordeaux">
              „{founder.quote}“
            </blockquote>
            <p className="mt-6 text-[0.98rem] text-secondary-ink">
              {founder.closing}
            </p>
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
              <SunRays draw className="w-28 text-taupe/80" />
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-gold/40 bg-card/90 px-3 py-1 text-[0.68rem] text-tertiary-ink">
                Снимка: портрет на Йоана
              </span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ——— CTA ——— */}
      <section className="mx-auto max-w-6xl px-5 pb-14 md:px-8 md:pb-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-paper-soft/70 px-6 py-12 text-center md:py-14">
            <p className="mx-auto max-w-xl font-display text-[1.5rem] leading-snug text-bordeaux">
              {about.firstVisit.split(".")[0]}.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-4">
              <CtaSolid href={contact.phoneHref} external>
                Запази час · {contact.phone}
              </CtaSolid>
              <CtaGhost href="/konsultatsia">Консултация · 20 €</CtaGhost>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
