import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Golos_Text } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import LiveEffects from "@/components/LiveEffects";
import MobileBar from "@/components/MobileBar";
import { contact, hours } from "@/lib/data";
import "./globals.css";

import { siteUrl } from "@/lib/site";

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Козметично студио Варна · AURÈLIS Beauty Atelier",
    template: "%s · AURÈLIS Beauty Atelier",
  },
  description:
    "Процедури за лице, медицинско почистване, лазерна епилация и оформяне на вежди във Варна. Започваме с консултация и анализ на кожата, после план за грижа.",
  alternates: { canonical: "/" },
  openGraph: {
    siteName: "AURÈLIS Beauty Atelier",
    locale: "bg_BG",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

/* Работното време от data.ts → schema.org (почивните дни се пропускат) */
const openingHoursSpecification = [
  { dayOfWeek: ["Tuesday", "Thursday", "Saturday"], time: hours[0].time },
  { dayOfWeek: ["Wednesday", "Friday"], time: hours[1].time },
].map(({ dayOfWeek, time }) => {
  const [opens, closes] = time.split(" – ");
  return { "@type": "OpeningHoursSpecification", dayOfWeek, opens, closes };
});

const salonSchema = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "@id": `${siteUrl}/#salon`,
  name: "AURÈLIS Beauty Atelier",
  url: siteUrl,
  image: [
    `${siteUrl}/images/interior-wide.webp`,
    `${siteUrl}/images/hero-bg.webp`,
  ],
  hasMap:
    "https://www.google.com/maps/search/?api=1&query=ул.+Дунавски+лебед+14,+Варна",
  telephone: contact.phoneHref.replace("tel:", ""),
  email: contact.email,
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: contact.address,
    addressLocality: contact.city,
    postalCode: "9004",
    addressCountry: "BG",
  },
  // Улично ниво по OpenStreetMap
  geo: { "@type": "GeoCoordinates", latitude: 43.2164, longitude: 27.9019 },
  founder: {
    "@type": "Person",
    name: contact.owner,
    jobTitle: "Медицински козметик",
  },
  openingHoursSpecification,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg" className={`${cormorant.variable} ${golos.variable}`}>
      <body className="bg-paper text-ink antialiased">
        <JsonLd data={salonSchema} />
        <LiveEffects />
        <Header />
        <main className="pt-20 md:pt-24">{children}</main>
        <Footer />
        <MobileBar />
      </body>
    </html>
  );
}
