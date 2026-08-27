import type { Metadata } from "next";
import { Public_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-public-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Petzier — Premium Pet Essentials",
  description:
    "Vet-reviewed, quality-tested pet tech shipped from our Melbourne warehouse. Smart GPS collars, automatic feeders, orthopedic beds and more.",
  keywords: "pet tech, GPS collar, automatic feeder, orthopedic pet bed, cat water fountain",
  openGraph: {
    title: "Petzier — Premium Pet Essentials",
    description: "Vet-reviewed pet tech. Dispatched from Melbourne in 1–2 days.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${publicSans.variable} ${ibmPlexMono.variable}`}>
      <body className="bg-stone text-ink antialiased">
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
