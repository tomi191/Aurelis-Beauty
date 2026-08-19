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
    // Фонът извън менюто излиза от tab реда и a11y дървото
    const rest = document.querySelectorAll("main, footer");
    rest.forEach((el) =>
      open ? el.setAttribute("inert", "") : el.removeAttribute("inert")
    );
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) document.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      rest.forEach((el) => el.removeAttribute("inert"));
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      {/* Плаваща pill навигация. Мобилното меню е sibling, не дете —
          backdrop-filter тук би станал containing block за fixed панела. */}
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
        <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/60 bg-paper/85 py-2 pl-5 pr-2 shadow-soft backdrop-blur-md md:pl-7">
          <Link href="/" className="flex items-center py-1">
            {/* Векторизирано от клиентския лого.pdf (public/logo.svg) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.svg"
              alt="AURÈLIS Beauty Atelier"
              className="h-11 w-auto md:h-12"
            />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => {
              const active =
                item.href === pathname || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-4 py-2 text-[0.9rem] transition-colors duration-150 ${
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
              className="hidden items-center gap-2 rounded-full bg-bordeaux px-5 py-3 text-[0.9rem] text-paper shadow-pill transition-[transform,background-color] duration-200 active:scale-[0.97] motion-safe:hover:-translate-y-0.5 hover:bg-wine sm:flex"
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
                className={`h-[1.5px] w-5 rounded bg-bordeaux transition-transform duration-200 ${
                  open ? "translate-y-[3.25px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-[1.5px] w-5 rounded bg-bordeaux transition-transform duration-200 ${
                  open ? "-translate-y-[3.25px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fade-up fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-bordeaux-deep px-6 pb-10 pt-28 lg:hidden">
          <div
            className="blob left-1/2 top-0 h-72 w-72 -translate-x-1/2 bg-gold/25"
            aria-hidden="true"
          />
          <nav className="relative flex flex-col">
            {nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                style={{ animationDelay: `${0.05 + i * 0.05}s` }}
                className="word-in border-b hairline-cream py-4 font-display text-[1.9rem] text-paper transition-colors duration-150 hover:text-gold-soft"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="relative mt-8 flex flex-col gap-3">
            <a
              href={contact.phoneHref}
              className="rounded-full bg-paper px-6 py-4 text-center text-bordeaux transition-transform duration-200 active:scale-[0.97]"
            >
              Запази час · {contact.phone}
            </a>
            <p className="text-center text-[0.85rem] text-paper/60">
              {contact.addressFull}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
