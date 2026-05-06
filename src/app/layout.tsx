import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "KOLab AI — AI Campaign Intelligence Engine",
  description:
    "Platform AI-native untuk creator economy Indonesia. Semantic matching, brief parsing, dan campaign intelligence yang memahami konteks lokal.",
  keywords: [
    "KOL",
    "influencer",
    "AI",
    "campaign",
    "creator economy",
    "Indonesia",
    "semantic matching",
  ],
  authors: [{ name: "El Pablo" }],
  openGraph: {
    title: "KOLab AI — AI Campaign Intelligence Engine",
    description:
      "Platform AI-native untuk creator economy Indonesia. Semantic matching, brief parsing, dan campaign intelligence.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
