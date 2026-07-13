import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
  title: {
    default: "ATA Law Firm",
    template: "%s | ATA Law Firm",
  },
  description:
    "ATA Law Firm, solusi hukum profesional di Majalengka, Jawa Barat. Melayani berbagai bidang hukum dengan pendekatan yang cermat dan profesional.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${fraunces.variable} ${inter.variable} ${ibmPlexMono.variable}`}
    >
      <body className="min-h-dvh flex flex-col">{children}</body>
    </html>
  );
}
