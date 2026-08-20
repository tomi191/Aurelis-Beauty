"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import * as Nav from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";
import { categories, contact } from "@/lib/data";

/* Навигацията следва дървото от клиентския план (Whimsical) 1:1:
   Main page → За AURÈLIS; главен ред: Консултации · УСЛУГИ · Пакети ·
   Марките · Контакти; УСЛУГИ → Козметични процедури + Лазерна епилация;
   Пакети → пакети за процедури + пакети за лазерна. */

const simpleLeft = [
  { href: "/za-nas", label: "За AURÈLIS" },
  { href: "/konsultatsia", label: "Консултации" },
];
const simpleRight = [
  { href: "/marki", label: "Марки" },
  { href: "/kontakti", label: "Контакти" },
];

const linkCls = (active: boolean) =>
  `relative rounded-full px-4 py-2 text-[0.9rem] transition-colors duration-150 ${
    active
      ? "bg-bordeaux/10 text-bordeaux after:absolute after:-bottom-0.5 after:left-1/2 after:h-1 after:w-1 after:-translate-x-1/2 after:rounded-full after:bg-gold after:content-['']"
      : "text-secondary-ink hover:bg-bordeaux/5 hover:text-bordeaux"
  }`;

function DropPanel({ children }: { children: React.ReactNode }) {
  return (
    <Nav.Content className="fade-up absolute left-1/2 top-full z-50 mt-3 w-[26rem] -translate-x-1/2 rounded-3xl border border-gold/30 bg-card p-3 shadow-lift">
      {children}
    </Nav.Content>
  );
}

function DropLink({
  href,
  title,
  note,
}: {
  href: string;
  title: string;
  note?: string;
}) {
  return (
    <Nav.Link asChild>
      <Link
        href={href}
        className="group flex items-baseline justify-between gap-3 rounded-2xl px-4 py-2.5 transition-colors duration-150 hover:bg-paper-soft/80"
      >
        <span>
          <span className="block text-[0.92rem] text-primary-ink transition-colors duration-150 group-hover:text-bordeaux">
            {title}
          </span>
          {note && (
            <span className="block text-[0.78rem] text-tertiary-ink">
              {note}
            </span>
          )}
        </span>
        <span
          aria-hidden="true"
          className="text-gold opacity-0 transition-all duration-150 group-hover:translate-x-0.5 group-hover:opacity-100"
        >
          →
        </span>
      </Link>
    </Nav.Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    // menu-open скрива и мобилния CTA бар (globals.css) — иначе той е
    // z-40 като overlay-а и плува върху отвореното меню
    document.documentElement.classList.toggle("menu-open", open);
    const rest = document.querySelectorAll("main, footer, .mobile-bar");
    rest.forEach((el) =>
      open ? el.setAttribute("inert", "") : el.removeAttribute("inert")
    );
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) document.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      document.documentElement.classList.remove("menu-open");
      rest.forEach((el) => el.removeAttribute("inert"));
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const uslugiActive =
    pathname.startsWith("/uslugi") || pathname.startsWith("/lazerna");
  const paketiActive = pathname.startsWith("/paketi");

  return (
    <>
      {/* Мобилното меню е sibling, не дете — backdrop-filter тук би станал
          containing block за fixed панела. Фонът на лентата се проявява при
          скрол (.header-veil), за да не „реже" секциите под нея. */}
      <header className="fixed inset-x-0 top-0 z-50">
        {/* При отворено меню воалът се маха: header-ът плува върху тъмния
            overlay, затова логото и X-ът минават в кремаво */}
        <div
          className={`header-veil absolute inset-0 border-b border-gold/25 bg-paper/92 backdrop-blur-md ${
            open ? "hidden" : ""
          }`}
          aria-hidden="true"
        />
        <div className="relative mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between px-5 md:px-8">
          <Link href="/" className="flex items-center py-1">
            {/* Векторизирано от клиентския лого.pdf (public/logo.svg) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={open ? "/logo-cream.svg" : "/logo.svg"}
              alt="AURÈLIS Beauty Atelier"
              className="h-11 w-auto md:h-12"
            />
          </Link>

          <Nav.Root className="relative hidden lg:block" delayDuration={80}>
            <Nav.List className="flex items-center gap-1">
              {simpleLeft.map((item) => (
                <Nav.Item key={item.href}>
                  <Nav.Link asChild>
                    <Link
                      href={item.href}
                      className={linkCls(pathname.startsWith(item.href))}
                    >
                      {item.label}
                    </Link>
                  </Nav.Link>
                </Nav.Item>
              ))}

              <Nav.Item className="relative">
                <Nav.Trigger
                  className={`group inline-flex items-center gap-1 ${linkCls(uslugiActive)}`}
                >
                  Услуги
                  <ChevronDown
                    className="size-3.5 text-gold transition-transform duration-200 group-data-[state=open]:rotate-180"
                    strokeWidth={1.6}
                  />
                </Nav.Trigger>
                <DropPanel>
                  <p className="px-4 pb-1 pt-2 text-[0.75rem] text-tertiary-ink">
                    Козметични процедури
                  </p>
                  {categories.map((c) => (
                    <DropLink
                      key={c.slug}
                      href={`/uslugi/${c.slug}`}
                      title={c.name}
                    />
                  ))}
                  <div className="mx-4 my-2 h-px bg-gold/25" />
                  <DropLink
                    href="/lazerna-epilatsia"
                    title="Лазерна епилация"
                    note="зони и цени за жени и мъже"
                  />
                  <DropLink href="/uslugi" title="Всички услуги" />
                  <DropLink
                    href="/tsenorazpis"
                    title="Пълен ценоразпис"
                    note="всички цени на едно място"
                  />
                </DropPanel>
              </Nav.Item>

              <Nav.Item className="relative">
                <Nav.Trigger
                  className={`group inline-flex items-center gap-1 ${linkCls(paketiActive)}`}
                >
                  Пакети
                  <ChevronDown
                    className="size-3.5 text-gold transition-transform duration-200 group-data-[state=open]:rotate-180"
                    strokeWidth={1.6}
                  />
                </Nav.Trigger>
                <DropPanel>
                  <DropLink
                    href="/paketi#litse"
                    title="Програми за лице"
                    note="Acne Clear · Skin Renewal · VIP"
                  />
                  <DropLink
                    href="/paketi#lazer"
                    title="Лазерна епилация"
                    note="курсове и комбо пакети"
                  />
                  <div className="mx-4 my-2 h-px bg-gold/25" />
                  <DropLink href="/paketi" title="Всички пакети" />
                </DropPanel>
              </Nav.Item>

              {simpleRight.map((item) => (
                <Nav.Item key={item.href}>
                  <Nav.Link asChild>
                    <Link
                      href={item.href}
                      className={linkCls(pathname.startsWith(item.href))}
                    >
                      {item.label}
                    </Link>
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav.List>
          </Nav.Root>

          <div className="flex items-center gap-2">
            <a
              href={contact.phoneHref}
              className="magnet hidden items-center gap-2 rounded-full bg-bordeaux px-5 py-3 text-[0.9rem] text-paper shadow-pill transition-[transform,background-color] duration-200 active:scale-[0.97] motion-safe:hover:-translate-y-0.5 hover:bg-wine sm:flex"
            >
              Запази час
            </a>
            <button
              type="button"
              aria-expanded={open}
              aria-label={open ? "Затвори менюто" : "Отвори менюто"}
              onClick={() => setOpen(!open)}
              className={`flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full border lg:hidden ${
                open ? "border-paper/30" : "hairline"
              }`}
            >
              <span
                className={`h-[1.5px] w-5 rounded transition-transform duration-200 ${
                  open
                    ? "translate-y-[3.25px] rotate-45 bg-paper"
                    : "bg-bordeaux"
                }`}
              />
              <span
                className={`h-[1.5px] w-5 rounded transition-transform duration-200 ${
                  open
                    ? "-translate-y-[3.25px] -rotate-45 bg-paper"
                    : "bg-bordeaux"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fade-up fixed inset-0 z-40 flex flex-col overflow-y-auto bg-bordeaux-deep px-6 pb-36 pt-28 lg:hidden">
          <div
            className="blob left-1/2 top-0 h-72 w-72 -translate-x-1/2 bg-gold/25"
            aria-hidden="true"
          />
          <nav className="relative flex flex-col">
            <Link
              href="/za-nas"
              style={{ animationDelay: "0.05s" }}
              className="word-in border-b hairline-cream py-3.5 font-display text-[1.7rem] text-paper transition-colors duration-150 hover:text-gold-soft"
            >
              За AURÈLIS
            </Link>

            <Link
              href="/konsultatsia"
              style={{ animationDelay: "0.1s" }}
              className="word-in border-b hairline-cream py-3.5 font-display text-[1.7rem] text-paper transition-colors duration-150 hover:text-gold-soft"
            >
              Консултации
            </Link>

            <div
              style={{ animationDelay: "0.15s" }}
              className="word-in border-b hairline-cream py-3.5"
            >
              <Link
                href="/uslugi"
                className="font-display text-[1.7rem] text-paper transition-colors duration-150 hover:text-gold-soft"
              >
                Услуги
              </Link>
              <div className="mt-1.5 flex flex-col border-l border-gold/40 pl-4">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/uslugi/${c.slug}`}
                    className="py-2 text-[1rem] text-paper/75 transition-colors duration-150 hover:text-gold-soft"
                  >
                    {c.name}
                  </Link>
                ))}
                <Link
                  href="/lazerna-epilatsia"
                  className="py-2 text-[1rem] text-paper/75 transition-colors duration-150 hover:text-gold-soft"
                >
                  Лазерна епилация
                </Link>
              </div>
            </div>

            <div
              style={{ animationDelay: "0.2s" }}
              className="word-in border-b hairline-cream py-3.5"
            >
              <Link
                href="/paketi"
                className="font-display text-[1.7rem] text-paper transition-colors duration-150 hover:text-gold-soft"
              >
                Пакети
              </Link>
              <div className="mt-1.5 flex flex-col border-l border-gold/40 pl-4">
                <Link
                  href="/paketi#litse"
                  className="py-2 text-[1rem] text-paper/75 transition-colors duration-150 hover:text-gold-soft"
                >
                  Програми за лице
                </Link>
                <Link
                  href="/paketi#lazer"
                  className="py-2 text-[1rem] text-paper/75 transition-colors duration-150 hover:text-gold-soft"
                >
                  Лазерна епилация
                </Link>
              </div>
            </div>

            <Link
              href="/marki"
              style={{ animationDelay: "0.25s" }}
              className="word-in border-b hairline-cream py-3.5 font-display text-[1.7rem] text-paper transition-colors duration-150 hover:text-gold-soft"
            >
              Марки
            </Link>
            <Link
              href="/kontakti"
              style={{ animationDelay: "0.3s" }}
              className="word-in border-b hairline-cream py-3.5 font-display text-[1.7rem] text-paper transition-colors duration-150 hover:text-gold-soft"
            >
              Контакти
            </Link>
          </nav>
          <p className="relative mt-8 text-center text-[0.85rem] text-paper/60">
            {contact.addressFull}
          </p>
        </div>
      )}

      {/* Fixed елементите на менюто са SIBLINGS на overlay-а: той е
          анимиран (transform) скрол контейнер и fixed децата му биха
          скролвали със съдържанието. */}
      {open && (
        <>
          {/* Скролнатите линкове потъват под тъмния градиент, вместо да
              се блъскат с логото и X-а в прозрачния header */}
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-x-0 top-0 z-40 h-24 bg-gradient-to-b from-bordeaux-deep via-bordeaux-deep/85 to-transparent lg:hidden"
          />
          {/* Закачен бутон за обаждане: винаги под палеца */}
          <div className="fixed inset-x-0 bottom-0 z-40 bg-gradient-to-t from-bordeaux-deep via-bordeaux-deep/90 to-transparent px-6 pb-[calc(env(safe-area-inset-bottom)+1.1rem)] pt-8 lg:hidden">
            <a
              href={contact.phoneHref}
              className="sheen flex items-center justify-center rounded-full bg-paper px-6 py-4 text-center text-bordeaux transition-transform duration-200 active:scale-[0.97]"
            >
              Запази час · {contact.phone}
            </a>
          </div>
        </>
      )}
    </>
  );
}
