import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import BlurTitle from "@/components/BlurTitle";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { Card, Chip, CtaGhost, CtaSolid } from "@/components/ui";
import { contact, hours } from "@/lib/data";

export const metadata: Metadata = {
  title: "Контакти и работно време",
  description:
    "AURÈLIS Beauty Atelier: гр. Варна, ул. „Дунавски лебед“ 14. Телефон 088 981 6905. Работно време: вторник, четвъртък и събота 08:00–16:00; сряда и петък 12:00–20:00.",
};

export default function KontaktiPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div
          className="blob -top-24 right-[5%] h-80 w-80 bg-gold/20"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl px-5 pb-4 pt-8 md:px-8 md:pt-12">
          <Reveal>
            <Chip>Контакти</Chip>
            <BlurTitle
              text="Заповядайте в ателието"
              className="mt-6 max-w-[16ch] font-display text-[clamp(2.3rem,5vw,4.2rem)] font-normal leading-[1.05] text-bordeaux"
            />
            <p className="mt-5 max-w-xl text-secondary-ink">
              Обадете се, за да си запазите час, или ни пишете: отговаряме
              още същия ден.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
        <div className="grid gap-5 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Card className="h-full p-7 md:p-9">
              <dl className="space-y-7">
                <div className="flex gap-4">
                  <span className="mt-1 grid size-10 shrink-0 place-items-center rounded-full bg-gold/15 text-bordeaux">
                    <MapPin className="size-4" strokeWidth={1.6} />
                  </span>
                  <div>
                    <dt className="text-[0.85rem] text-tertiary-ink">Адрес</dt>
                    <dd className="mt-1 font-display text-[1.5rem] leading-snug text-primary-ink">
                      {contact.addressFull}
                    </dd>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=ул.+Дунавски+лебед+14,+Варна"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-ink mt-2 inline-block text-[0.9rem]"
                    >
                      Отвори в Google Maps
                    </a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="mt-1 grid size-10 shrink-0 place-items-center rounded-full bg-taupe/20 text-bordeaux">
                    <Phone className="size-4" strokeWidth={1.6} />
                  </span>
                  <div>
                    <dt className="text-[0.85rem] text-tertiary-ink">
                      Телефон
                    </dt>
                    <dd className="mt-1">
                      <a
                        href={contact.phoneHref}
                        className="tnum font-display text-[1.5rem] text-bordeaux underline decoration-gold/50 decoration-1 underline-offset-8 transition-colors duration-300 hover:text-wine"
                      >
                        {contact.phone}
                      </a>
                    </dd>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="mt-1 grid size-10 shrink-0 place-items-center rounded-full bg-bordeaux/10 text-bordeaux">
                    <Mail className="size-4" strokeWidth={1.6} />
                  </span>
                  <div>
                    <dt className="text-[0.85rem] text-tertiary-ink">Имейл</dt>
                    <dd className="mt-1">
                      <a
                        href={`mailto:${contact.email}`}
                        className="link-ink break-all text-[1.05rem]"
                      >
                        {contact.email}
                      </a>
                    </dd>
                  </div>
                </div>
              </dl>
              <div className="mt-8 flex flex-wrap gap-4">
                <CtaSolid href={contact.phoneHref} external>
                  Запази час
                </CtaSolid>
                <CtaGhost href={`mailto:${contact.email}`} external>
                  Пиши ни
                </CtaGhost>
              </div>
              <p className="mt-8 border-t hairline pt-5 text-[0.82rem] text-tertiary-ink">
                {contact.company} · ЕИК {contact.eik} · МОЛ: Йоана Иванова
                Здравкова
              </p>
            </Card>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-5">
            <div className="relative h-full overflow-hidden rounded-[1.75rem] bg-bordeaux-deep p-8 text-paper shadow-soft md:p-9">
              <div
                className="blob -right-16 -top-20 h-64 w-64 bg-gold/15"
                aria-hidden="true"
              />
              <div className="relative">
                <h2 className="font-display text-[1.7rem] font-medium">
                  Работно време
                </h2>
                <ul className="mt-6 space-y-5">
                  {hours.map((h) => (
                    <li key={h.days}>
                      <p className="text-[0.9rem] text-paper/60">{h.days}</p>
                      <p className="mt-0.5 font-display text-[1.45rem] text-paper">
                        {h.time}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <Card className="mt-5 p-7 md:p-9">
            <h2 className="font-display text-[clamp(1.6rem,2.8vw,2.2rem)] font-medium leading-tight text-bordeaux">
              Пишете ни направо оттук
            </h2>
            <p className="mt-2 max-w-xl text-[0.92rem] text-tertiary-ink">
              Оставете име, телефон и какво ви трябва: ще се чуем за
              свободните часове.
            </p>
            <div className="mt-7 max-w-2xl">
              <ContactForm />
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-5 overflow-hidden rounded-[1.75rem] border border-white/70 shadow-soft">
            <iframe
              title="AURÈLIS Beauty Atelier на картата"
              src="https://www.google.com/maps?q=ул.%20Дунавски%20лебед%2014%2C%20Варна&output=embed"
              className="h-[400px] w-full"
              loading="eager"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </section>
    </>
  );
}
