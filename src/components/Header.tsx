"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { contact } from "@/lib/data";

const nav = [
  { href: "/za-nas", label: "За нас" },
  { href: "/konsultatsia", label: "Консултации" },
  { href: "/uslugi", label: "Услуги" },
  { href: "/paketi", label: "Пакети" },
  { href: "/marki", label: "Марки" },
  { href: "/kontakti", label: "Контакти" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Плаваща pill навигация. Мобилното меню е sibling, не дете —
          backdrop-filter тук би станал containing block за fixed панела. */}
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
        <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/60 bg-paper/80 py-2 pl-5 pr-2 shadow-soft backdrop-blur-xl md:pl-7">
          <Link href="/" className="flex flex-col leading-none py-1.5">
            <span className="font-display text-[1.35rem] font-semibold tracking-[0.08em] text-bordeaux">
              AURÈLIS
            </span>
            <span className="mt-0.5 text-[0.55rem] uppercase tracking-[0.4em] text-tertiary-ink">
              Beauty Atelier
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => {
              const active =
                item.href === pathname || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-4 py-2 text-[0.9rem] transition-colors duration-300 ${
                    active
                      ? "bg-bordeaux/10 text-bordeaux"
                      : "text-secondary-ink hover:bg-bordeaux/5 hover:text-bordeaux"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={contact.phoneHref}
              className="hidden items-center gap-2 rounded-full bg-bordeaux px-5 py-2.5 text-[0.9rem] text-paper shadow-pill transition-all duration-300 hover:-translate-y-0.5 hover:bg-wine sm:flex"
            >
              Запази час
            </a>
            <button
              type="button"
              aria-expanded={open}
              aria-label={open ? "Затвори менюто" : "Отвори менюто"}
              onClick={() => setOpen(!open)}
              className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full border hairline lg:hidden"
            >
              <span
                className={`h-[1.5px] w-5 rounded bg-bordeaux transition-transform duration-300 ${
                  open ? "translate-y-[3px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-[1.5px] w-5 rounded bg-bordeaux transition-transform duration-300 ${
                  open ? "-translate-y-[3.5px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-bordeaux-deep px-6 pb-10 pt-28 lg:hidden">
          <div
            className="blob left-1/2 top-0 h-72 w-72 -translate-x-1/2 bg-gold/25"
            aria-hidden="true"
          />
          <nav className="relative flex flex-col">
            {nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                style={{ transitionDelay: `${i * 0.05}s` }}
                className="border-b hairline-cream py-4 font-display text-[1.9rem] text-paper transition-colors hover:text-gold-soft"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="relative mt-8 flex flex-col gap-3">
            <a
              href={contact.phoneHref}
              className="rounded-full bg-paper px-6 py-4 text-center text-bordeaux"
            >
              Запази час · {contact.phone}
            </a>
            <p className="text-center text-[0.85rem] text-paper/50">
              {contact.addressFull}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
