import type { Metadata } from "next";
import { Inter, Space_Grotesk, Space_Mono } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import { ToastProvider } from "@/components/Toast";
import SmoothScroll from "@/components/SmoothScroll";
import { siteConfig } from "@/lib/data";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "Niko Pastore | Data Engineer & AI Product Builder",
  description:
    "Portfolio and high-intent field notes from Niko Pastore on data engineering, AI agents, automation, and production software.",
  keywords: [
    "Data Engineer",
    "AI Agents",
    "Full Stack Developer",
    "Python",
    "Next.js",
    "Snowflake",
    "ETL Pipelines",
    "AI Automation",
  ],
  authors: [{ name: "Niko Pastore", url: siteConfig.url }],
  creator: "Niko Pastore",
  alternates: {
    canonical: siteConfig.url,
    types: {
      "application/rss+xml": `${siteConfig.url}/blog/feed.xml`,
    },
  },
  openGraph: {
    title: "Niko Pastore | Data Engineer & AI Product Builder",
    description:
      "Portfolio and high-intent field notes on data engineering, AI agents, automation, and production software.",
    url: siteConfig.url,
    siteName: "Niko Pastore",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@nikopastore",
    title: "Niko Pastore | Data Engineer & AI Product Builder",
    description:
      "Portfolio and high-intent field notes on data engineering, AI agents, automation, and production software.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${spaceMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          <ToastProvider>
            <SmoothScroll>{children}</SmoothScroll>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
