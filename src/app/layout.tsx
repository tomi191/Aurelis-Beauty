import type { Metadata } from "next";
import { Cormorant_Garamond, Golos_Text } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBar from "@/components/MobileBar";
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
        <MobileBar />
      </body>
    </html>
  );
}
