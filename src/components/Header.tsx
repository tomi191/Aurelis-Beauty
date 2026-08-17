"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { contact } from "@/lib/data";

const nav = [
  { href: "/konsultatsia", label: "Консултация" },
  { href: "/uslugi", label: "Услуги" },
  { href: "/lazerna-epilatsia", label: "Лазерна епилация" },
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
    // Без backdrop-blur: backdrop-filter прави header-а containing block
    // за fixed менюто и го чупи (а и blur не е в печатния език на бранда).
    <header className="sticky top-0 z-50 border-b hairline bg-paper">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 md:px-8">
        <Link href="/" className="group flex flex-col leading-none">
          <span className="font-display text-[1.55rem] font-medium tracking-[0.08em] text-bordeaux">
            AURÈLIS
          </span>
          <span className="mt-1 text-[0.6rem] uppercase tracking-[0.42em] text-tertiary-ink">
            Beauty Atelier
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => {
            const active =
              item.href === pathname || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[0.92rem] transition-colors duration-300 ${
                  active
                    ? "text-bordeaux"
                    : "text-secondary-ink hover:text-bordeaux"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href={contact.phoneHref}
            className="ml-2 border hairline px-4 py-2 text-[0.9rem] text-bordeaux transition-colors duration-300 hover:border-bordeaux"
          >
            {contact.phone}
          </a>
        </nav>

        <button
          type="button"
          aria-expanded={open}
          aria-label={open ? "Затвори менюто" : "Отвори менюто"}
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-[6px] lg:hidden"
        >
          <span
            className={`h-px w-6 bg-bordeaux transition-transform duration-300 ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-bordeaux transition-transform duration-300 ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 top-[65px] z-40 flex flex-col bg-bordeaux-deep px-8 py-10 lg:hidden">
          <nav className="flex flex-col gap-1">
            {nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                style={{ transitionDelay: `${i * 0.05}s` }}
                className="border-b hairline-cream py-4 font-display text-3xl text-paper"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <a
            href={contact.phoneHref}
            className="mt-8 text-lg text-paper/70"
          >
            {contact.phone}
          </a>
        </div>
      )}
    </header>
  );
}
