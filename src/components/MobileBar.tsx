"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { contact } from "@/lib/data";

/* Sticky мобилно действие: обаждането е главната конверсия.
   Скрит само на /kontakti (там формата Е конверсията); на /konsultatsia
   остава — иначе под fold-а страницата беше без действие (одитна находка). */
export default function MobileBar() {
  const pathname = usePathname();
  if (pathname === "/kontakti") return null;

  return (
    <div className="mobile-bar fixed inset-x-4 bottom-[calc(env(safe-area-inset-bottom)+1rem)] z-40 lg:hidden">
      <div className="flex gap-2 rounded-full border border-white/70 bg-paper/95 p-2 shadow-lift backdrop-blur-md">
        <a
          href={contact.phoneHref}
          className="sheen flex-1 rounded-full border border-gold/50 bg-bordeaux py-3 text-center text-[0.95rem] text-paper transition-transform duration-200 active:scale-[0.97]"
        >
          Запази час
        </a>
        <Link
          href="/konsultatsia"
          className="flex-1 rounded-full py-3 text-center text-[0.95rem] text-bordeaux transition-transform duration-200 active:scale-[0.97]"
        >
          Консултация
        </Link>
      </div>
    </div>
  );
}
