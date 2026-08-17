import type { Metadata } from "next";
import { Cormorant_Garamond, Golos_Text } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
    default: "AURÈLIS Beauty Atelier · Козметично студио във Варна",
    template: "%s · AURÈLIS Beauty Atelier",
  },
  description:
    "Козметично студио във Варна с индивидуални протоколи за грижа за кожата: медицинско почистване, BioRePeel, терапии NOON и Casmara, микронидлинг, лазерна епилация. Консултация с медицински козметик.",
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
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
