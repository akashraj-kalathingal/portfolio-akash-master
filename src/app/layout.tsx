import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/content/data";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://akashraj.dev"),
  title: {
    default: `${profile.name} — ${profile.title}`,
    template: `%s — ${profile.name}`,
  },
  description:
    "Senior Software Engineer building distributed systems, AI platforms, and payments infrastructure. BMO · Scotiabank · Target.",
  openGraph: {
    type: "website",
    title: `${profile.name} — ${profile.title}`,
    description: "Distributed systems, AI platforms, payments infrastructure.",
    siteName: profile.name,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050507",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="font-sans antialiased grain">{children}</body>
    </html>
  );
}
