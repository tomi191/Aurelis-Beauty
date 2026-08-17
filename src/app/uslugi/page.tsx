import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { categories } from "@/lib/data";

export const metadata: Metadata = {
  title: "Услуги и процедури за лице",
  description:
    "Козметични процедури в AURÈLIS Beauty Atelier, Варна: медицинско почистване, BioRePeel, специални терапии, high-tech процедури, LED фотобиомодулация и дизайн на вежди.",
};

export default function UslugiPage() {
  return (
    <>
      <section className="border-b hairline">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <Reveal>
            <h1 className="max-w-[16ch] font-display text-[clamp(2.4rem,6vw,4.6rem)] font-medium leading-[1.05] text-bordeaux">
              Процедури, подбрани за вашата кожа
            </h1>
            <p className="mt-6 max-w-xl text-secondary-ink">
              Всяка терапия започва с диагностика и завършва с план. Разгледайте
              категориите или започнете с консултация, за да изберем заедно
              правилния протокол.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Каталожно съдържание — като страница „съдържание" на печатен каталог */}
      <section>
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
          <ol className="divide-y hairline border-y hairline">
            {categories.map((cat, i) => (
              <Reveal key={cat.slug} delay={i * 0.05} as="li">
                <Link
                  href={`/uslugi/${cat.slug}`}
                  className="group grid gap-2 py-7 md:grid-cols-12 md:items-baseline md:gap-6"
                >
                  <span className="font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-tight text-primary-ink transition-colors duration-300 group-hover:text-bordeaux md:col-span-6">
                    {cat.name}
                  </span>
                  <span className="text-[0.95rem] text-tertiary-ink md:col-span-5">
                    {cat.intro}
                  </span>
                  <span
                    aria-hidden="true"
                    className="hidden text-right font-display text-xl text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:col-span-1 md:block"
                  >
                    →
                  </span>
                </Link>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={0.2}>
            <Link
              href="/lazerna-epilatsia"
              className="group mt-14 block border hairline bg-bordeaux-deep p-8 text-paper transition-colors duration-500 md:p-10"
            >
              <div className="grid gap-3 md:grid-cols-12 md:items-baseline md:gap-6">
                <span className="font-display text-[clamp(1.7rem,3.2vw,2.6rem)] leading-tight md:col-span-6">
                  Лазерна епилация
                </span>
                <span className="text-[0.95rem] text-paper/60 md:col-span-5">
                  Зони и цени за жени и мъже: от междувеждие до цели крака, с
                  пакети за постоянство.
                </span>
                <span
                  aria-hidden="true"
                  className="hidden text-right font-display text-xl text-gold md:col-span-1 md:block"
                >
                  →
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
