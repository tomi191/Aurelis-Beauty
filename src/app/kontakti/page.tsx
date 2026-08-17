import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { CtaGhost, CtaSolid } from "@/components/ui";
import { contact, hours } from "@/lib/data";

export const metadata: Metadata = {
  title: "Контакти и работно време",
  description:
    "AURÈLIS Beauty Atelier: гр. Варна, ул. „Дунавски лебед“ 14. Телефон 088 981 6905. Работно време: вторник, четвъртък и събота 08:00–16:00; сряда и петък 12:00–20:00.",
};

/* Контактна форма: ще се добави при свързването с имейл услугата (Resend).
   Дотогава каналите са телефон и имейл — реални и работещи. */

export default function KontaktiPage() {
  return (
    <>
      <section className="border-b hairline">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <Reveal>
            <h1 className="max-w-[16ch] font-display text-[clamp(2.4rem,6vw,4.6rem)] font-medium leading-[1.05] text-bordeaux">
              Заповядайте в ателието
            </h1>
            <p className="mt-6 max-w-xl text-secondary-ink">
              Обадете се, за да запазите час, или ни пишете: ще отговорим в
              рамките на работния ден.
            </p>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-12 md:px-8 md:py-24">
          <div className="md:col-span-6">
            <Reveal>
              <dl className="space-y-8">
                <div>
                  <dt className="text-[0.85rem] text-tertiary-ink">Адрес</dt>
                  <dd className="mt-2 font-display text-[1.6rem] leading-snug text-primary-ink">
                    {contact.addressFull}
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.85rem] text-tertiary-ink">Телефон</dt>
                  <dd className="mt-2">
                    <a
                      href={contact.phoneHref}
                      className="font-display text-[1.6rem] text-bordeaux transition-colors duration-300 hover:text-bordeaux-deep"
                    >
                      {contact.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.85rem] text-tertiary-ink">Имейл</dt>
                  <dd className="mt-2">
                    <a
                      href={`mailto:${contact.email}`}
                      className="link-ink break-all text-[1.1rem]"
                    >
                      {contact.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-10 flex flex-wrap gap-4">
                <CtaSolid href={contact.phoneHref} external>
                  Запазете час
                </CtaSolid>
                <CtaGhost href={`mailto:${contact.email}`} external>
                  Пишете ни
                </CtaGhost>
              </div>
              <p className="mt-10 border-t hairline pt-5 text-[0.82rem] text-tertiary-ink">
                {contact.company} · ЕИК {contact.eik} · МОЛ: Йоана Иванова
                Здравкова
              </p>
            </Reveal>
          </div>

          {/* Работно време: повтаря печатната карта на клиента (паспарту) */}
          <Reveal delay={0.08} className="md:col-span-5 md:col-start-8">
            <div className="passepartout bg-bordeaux-deep p-10 text-paper md:p-12">
              <h2 className="text-center font-display text-[2rem] font-medium leading-tight">
                Работно време
              </h2>
              <ul className="mt-10 space-y-8 text-center">
                {hours.map((h) => (
                  <li key={h.days}>
                    <p className="text-[0.85rem] uppercase tracking-[0.22em] text-paper/85">
                      {h.days}
                    </p>
                    <p className="mt-2 font-display text-[1.5rem] text-paper">
                      {h.time}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t hairline">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
          <Reveal>
            <div className="border hairline p-2">
              <iframe
                title="AURÈLIS Beauty Atelier на картата"
                src="https://www.google.com/maps?q=ул.%20Дунавски%20лебед%2014%2C%20Варна&output=embed"
                className="h-[380px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
