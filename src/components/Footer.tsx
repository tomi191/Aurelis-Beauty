import Link from "next/link";
import { contact, hours } from "@/lib/data";

const nav = [
  { href: "/za-nas", label: "За AURÈLIS" },
  { href: "/konsultatsia", label: "Консултации" },
  { href: "/uslugi", label: "Услуги" },
  { href: "/tsenorazpis", label: "Ценоразпис" },
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
      <div className="relative mx-auto max-w-6xl px-6 pb-[calc(env(safe-area-inset-bottom)+7rem)] pt-16 md:px-8 md:pt-20 lg:pb-12">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            {/* Векторизирано от клиентския лого.pdf, кремав вариант */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-cream.svg"
              alt="AURÈLIS Beauty Atelier"
              className="h-24 w-auto opacity-90"
            />
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
            <p className="text-[0.8rem] text-paper/55">Навигация</p>
            {/* Две колони: осемте линка иначе разтягат футъра на мобилно */}
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="-my-1.5 inline-block py-1.5 text-[0.95rem] text-paper/80 transition-colors duration-300 hover:text-gold-soft"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="text-[0.8rem] text-paper/55">Работно време</p>
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
            <p className="mt-6 text-[0.8rem] text-paper/55">Адрес</p>
            <address className="mt-2 space-y-1 text-[0.92rem] not-italic text-paper/80">
              <p>{contact.addressFull}</p>
              <p>
                <a
                  href={`mailto:${contact.email}`}
                  className="break-all py-2.5 transition-colors duration-300 hover:text-gold-soft"
                >
                  {contact.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t hairline-cream pt-6 text-[0.78rem] text-paper/60 md:flex-row md:justify-between">
          <p>
            {contact.company} · ЕИК {contact.eik} ·{" "}
            <Link
              href="/poveritelnost"
              className="-my-2 inline-block py-2 transition-colors duration-300 hover:text-gold-soft"
            >
              Поверителност
            </Link>
          </p>
          <p>
            © {new Date().getFullYear()} AURÈLIS Beauty Atelier · Сайтът е
            разработен от{" "}
            <a
              href="https://level8.bg"
              target="_blank"
              rel="noopener noreferrer"
              className="-my-2 inline-block py-2 transition-colors duration-300 hover:text-gold-soft"
            >
              Level 8
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
