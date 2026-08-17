import Link from "next/link";
import SunRays from "@/components/SunRays";
import { contact, hours } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-bordeaux-deep text-paper">
      <div className="passepartout mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <SunRays half className="w-14 text-gold" />
            <p className="mt-4 font-display text-3xl font-medium tracking-[0.06em]">
              AURÈLIS
            </p>
            <p className="mt-1 text-[0.62rem] uppercase tracking-[0.42em] text-paper/50">
              Beauty Atelier
            </p>
            <p className="mt-6 max-w-xs text-[0.95rem] leading-relaxed text-paper/70">
              Истинската грижа започва там, където човекът е по-важен от
              процедурата.
            </p>
          </div>

          <div className="md:col-span-4">
            <p className="font-display text-xl text-paper/90">Работно време</p>
            <ul className="mt-4 space-y-3">
              {hours.map((h) => (
                <li key={h.days} className="flex items-baseline text-[0.92rem]">
                  <span className="text-paper/70">{h.days}</span>
                  <span className="dot-leader opacity-40" />
                  <span className="text-paper/90">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="font-display text-xl text-paper/90">Контакти</p>
            <address className="mt-4 space-y-2 text-[0.92rem] not-italic text-paper/70">
              <p>{contact.addressFull}</p>
              <p>
                <a
                  href={contact.phoneHref}
                  className="transition-colors duration-300 hover:text-gold"
                >
                  {contact.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${contact.email}`}
                  className="break-all transition-colors duration-300 hover:text-gold"
                >
                  {contact.email}
                </a>
              </p>
            </address>
            <Link
              href="/kontakti"
              className="mt-5 inline-block border-b border-gold/60 pb-0.5 text-[0.9rem] text-paper/90 transition-colors duration-300 hover:text-gold"
            >
              Всички контакти
            </Link>
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
