import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SunRays from "@/components/SunRays";
import { CtaGhost, CtaSolid, MetaList } from "@/components/ui";
import { consultation, contact } from "@/lib/data";

export const metadata: Metadata = {
  title: "Персонална консултация · 20 €",
  description:
    "Персонална козметична консултация във Варна: анализ на кожата, индивидуален план за професионална и домашна грижа. Стойността се приспада при последваща процедура.",
};

export default function KonsultatsiaPage() {
  return (
    <>
      <section className="border-b hairline">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-12 md:px-8 md:py-24">
          <Reveal className="md:col-span-7">
            <h1 className="max-w-[15ch] font-display text-[clamp(2.4rem,6vw,4.6rem)] font-medium leading-[1.05] text-bordeaux">
              Преоткрийте своята истинска кожа
            </h1>
            <p className="mt-6 max-w-xl text-secondary-ink">
              Козметичната консултация е първата и най-важна стъпка към
              постигането на здрава, балансирана и красива кожа. По време на
              срещата се извършва детайлен анализ на състоянието на кожата,
              обсъждат се индивидуалните нужди, навици и цели, след което се
              изготвя персонализиран план за професионална и домашна грижа.
            </p>
            <p className="mt-4 max-w-xl text-secondary-ink">
              Подходът е изцяло индивидуален, с фокус върху дългосрочни
              резултати и правилно подбрани терапии, съобразени с типа и
              състоянието на кожата.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-4 md:col-start-9">
            {/* Картата повтаря печатната консултационна карта на клиента */}
            <div className="relative border hairline bg-paper-warm p-7 md:p-8">
              <SunRays className="absolute right-6 top-6 w-11 text-gold/80" />
              <p className="font-display text-xl text-bordeaux">
                Персонална консултация
              </p>
              <p className="mt-4 font-display text-[3rem] font-semibold leading-none text-bordeaux">
                {consultation.price}
              </p>
              <p className="mt-4 border-t hairline pt-4 text-[0.85rem] text-tertiary-ink">
                {consultation.note}
              </p>
              <div className="mt-6">
                <CtaSolid href={contact.phoneHref} external>
                  Запазете час
                </CtaSolid>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-12 md:px-8 md:py-24">
          <Reveal className="md:col-span-5">
            <h2 className="font-display text-[clamp(1.8rem,3.2vw,2.6rem)] font-medium leading-tight text-bordeaux">
              Какво включва
            </h2>
            <ul className="mt-8 space-y-3">
              {consultation.includes.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-gold">✓</span>
                  <span className="text-secondary-ink">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-5 md:col-start-7">
            <h2 className="font-display text-[clamp(1.8rem,3.2vw,2.6rem)] font-medium leading-tight text-bordeaux">
              Практична информация
            </h2>
            <div className="mt-8">
              <MetaList
                items={[
                  { term: "Времетраене", value: consultation.duration },
                  { term: "Кога е препоръчителна", value: consultation.when },
                  { term: "Цена", value: `${consultation.price}, приспада се` },
                ]}
              />
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <CtaSolid href={contact.phoneHref} external>
                {contact.phone}
              </CtaSolid>
              <CtaGhost href="/kontakti">Работно време</CtaGhost>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
