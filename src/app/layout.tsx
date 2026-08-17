import type { Metadata } from "next";
import { Cormorant_Garamond, Golos_Text } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { contact } from "@/lib/data";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const golos = Golos_Text({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-golos",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Козметично студио Варна · AURÈLIS Beauty Atelier",
    template: "%s · AURÈLIS Beauty Atelier",
  },
  description:
    "Процедури за лице, медицинско почистване, лазерна епилация и оформяне на вежди във Варна. Започваме с консултация и анализ на кожата, после план за грижа.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg" className={`${cormorant.variable} ${golos.variable}`}>
      <body className="bg-paper text-ink antialiased">
        <Header />
        <main className="pt-20 md:pt-24">{children}</main>
        <Footer />

        {/* Sticky mobile действие — обаждането е главната конверсия */}
        <div className="fixed inset-x-4 bottom-4 z-40 lg:hidden">
          <div className="flex gap-2 rounded-full border border-white/60 bg-paper/85 p-2 shadow-lift backdrop-blur-xl">
            <a
              href={contact.phoneHref}
              className="flex-1 rounded-full bg-bordeaux py-3 text-center text-[0.95rem] text-paper"
            >
              Запази час
            </a>
            <a
              href="/konsultatsia"
              className="flex-1 rounded-full py-3 text-center text-[0.95rem] text-bordeaux"
            >
              Консултация
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
