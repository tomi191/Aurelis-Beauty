import Link from "next/link";
import SunRays from "@/components/SunRays";
import { contact, hours } from "@/lib/data";

const nav = [
  { href: "/za-nas", label: "За нас" },
  { href: "/konsultatsia", label: "Консултации" },
  { href: "/uslugi", label: "Услуги" },
  { href: "/lazerna-epilatsia", label: "Лазерна епилация" },
  { href: "/paketi", label: "Пакети" },
  { href: "/marki", label: "Марки" },
  { href: "/kontakti", label: "Контакти" },
];

export default function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden rounded-t-[2.5rem] bg-bordeaux-deep text-paper">
      <div
        className="blob -top-24 right-[10%] h-96 w-96 bg-gold/15"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-6 pb-28 pt-16 md:px-8 md:pt-20 lg:pb-12">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SunRays half className="w-14 text-gold-soft" />
            <p className="mt-4 font-display text-4xl font-medium tracking-[0.06em]">
              AURÈLIS
            </p>
            <p className="mt-1 text-[0.62rem] uppercase tracking-[0.42em] text-paper/50">
              Beauty Atelier
            </p>
            <p className="mt-6 max-w-xs text-[0.95rem] leading-relaxed text-paper/70">
              Истинската грижа започва там, където човекът е по-важен от
              процедурата.
            </p>
            <a
              href={contact.phoneHref}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3 text-[0.95rem] text-bordeaux transition-all duration-300 hover:-translate-y-0.5"
            >
              Запази час · {contact.phone}
            </a>
          </div>

          <div className="lg:col-span-3">
            <p className="text-[0.8rem] text-paper/45">Навигация</p>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.95rem] text-paper/80 transition-colors duration-300 hover:text-gold-soft"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="text-[0.8rem] text-paper/45">Работно време</p>
            <ul className="mt-4 space-y-3">
              {hours.map((h) => (
                <li key={h.days} className="flex items-baseline text-[0.92rem]">
                  <span className="whitespace-nowrap text-paper/70">
                    {h.short}
                  </span>
                  <span className="dot-leader opacity-40" />
                  <span className="tnum whitespace-nowrap text-paper/90">
                    {h.time}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[0.8rem] text-paper/45">Адрес</p>
            <address className="mt-2 space-y-1 text-[0.92rem] not-italic text-paper/80">
              <p>{contact.addressFull}</p>
              <p>
                <a
                  href={`mailto:${contact.email}`}
                  className="break-all transition-colors duration-300 hover:text-gold-soft"
                >
                  {contact.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t hairline-cream pt-6 text-[0.78rem] text-paper/40 md:flex-row md:justify-between">
          <p>
            {contact.company} · ЕИК {contact.eik}
          </p>
          <p>© {new Date().getFullYear()} AURÈLIS Beauty Atelier</p>
        </div>
      </div>
    </footer>
  );
}
