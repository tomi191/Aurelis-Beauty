import type { Metadata } from "next";
import BlurTitle from "@/components/BlurTitle";
import Reveal from "@/components/Reveal";
import { Card, Chip } from "@/components/ui";
import { brands } from "@/lib/data";

export const metadata: Metadata = {
  title: "Марките, с които работим",
  description:
    "Професионалната козметика в AURÈLIS Beauty Atelier: Collagena, BioRePeel, Casmara, NOON Aesthetics, Fusion Meso и SQT Bio-Microneedling. Историята и патентите зад всяка марка.",
  alternates: { canonical: "/marki" },
};

export default function MarkiPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div
          className="blob -top-24 right-[5%] h-80 w-80 bg-gold/20"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl px-5 pb-4 pt-8 md:px-8 md:pt-12">
          <Reveal>
            <Chip>Професионална козметика</Chip>
            <BlurTitle
              text="Марките, с които работим"
              className="mt-6 max-w-[17ch] font-display text-[clamp(2.3rem,5vw,4.2rem)] font-normal leading-[1.05] text-bordeaux"
            />
            <p className="mt-5 max-w-xl text-secondary-ink">
              Качествената грижа започва с качествения избор. Всяка марка в
              ателието е избрана с причина: патент, формула или технология,
              чийто ефект се вижда в резултата.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
        <div className="grid gap-5 md:grid-cols-2">
          {brands.map((brand, i) => (
            <Reveal key={brand.name} delay={(i % 2) * 0.07}>
              <Card className="hover-lift flex h-full flex-col p-7 md:p-8">
                <h2 className="font-display text-[1.7rem] font-medium leading-snug text-bordeaux">
                  {brand.name}
                </h2>
                <p className="mt-2 font-display text-[1.1rem] leading-snug text-primary-ink">
                  {brand.tagline}
                </p>
                <div className="mt-5 space-y-4 border-t hairline pt-5">
                  <div>
                    <p className="text-[0.8rem] text-tertiary-ink">
                      Историята зад марката
                    </p>
                    <p className="mt-1 text-[0.93rem] text-secondary-ink">
                      {brand.story}
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.8rem] text-tertiary-ink">
                      Сърцето на марката
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
      </section>
    </>
  );
}
