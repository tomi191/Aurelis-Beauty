import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { brands } from "@/lib/data";

export const metadata: Metadata = {
  title: "Марките, на които се доверяваме",
  description:
    "Професионалните брандове в AURÈLIS Beauty Atelier: Collagena, BioRePeel, Casmara, NOON Aesthetics, Fusion Meso и SQT Bio-Microneedling. Историята и патентите зад всяка марка.",
};

export default function MarkiPage() {
  return (
    <>
      <section className="border-b hairline">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <Reveal>
            <h1 className="max-w-[17ch] font-display text-[clamp(2.4rem,6vw,4.6rem)] font-medium leading-[1.05] text-bordeaux">
              Качествената грижа започва с качествения избор
            </h1>
            <p className="mt-6 max-w-xl text-secondary-ink">
              Всяка марка в ателието е избрана заради реален механизъм: патент,
              формула или технология, която можем да обясним и да покажем в
              резултата.
            </p>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          {brands.map((brand, i) => (
            <Reveal
              key={brand.name}
              as="article"
              className={`grid gap-8 py-14 md:grid-cols-12 md:py-20 ${
                i > 0 ? "border-t hairline" : ""
              }`}
            >
              <div
                className={`md:col-span-4 ${i % 2 === 1 ? "md:col-start-9 md:order-2 md:text-right" : ""}`}
              >
                <h2 className="font-display text-[clamp(1.8rem,3.4vw,2.7rem)] font-medium leading-tight text-bordeaux">
                  {brand.name}
                </h2>
                <p className="mt-3 font-display text-[1.15rem] leading-snug text-primary-ink">
                  {brand.tagline}
                </p>
              </div>
              <div
                className={`space-y-6 md:col-span-7 ${
                  i % 2 === 1 ? "md:col-start-1 md:order-1" : "md:col-start-6"
                }`}
              >
                <div>
                  <h3 className="text-[0.85rem] text-tertiary-ink">
                    Историята зад бранда
                  </h3>
                  <p className="mt-2 text-secondary-ink">{brand.story}</p>
                </div>
                <div>
                  <h3 className="text-[0.85rem] text-tertiary-ink">
                    Сърцето на марката
                  </h3>
                  <p className="mt-2 text-secondary-ink">{brand.heart}</p>
                </div>
                <div>
                  <h3 className="text-[0.85rem] text-tertiary-ink">
                    Защо я избираме
                  </h3>
                  <p className="mt-2 text-secondary-ink">{brand.why}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
