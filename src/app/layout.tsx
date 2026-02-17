import type { Metadata } from "next";
import { Inter, Space_Grotesk, Space_Mono } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import { ToastProvider } from "@/components/Toast";
import SmoothScroll from "@/components/SmoothScroll";
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
  title: "Niko Pastore | Data & Full Stack Engineer",
  description:
    "Portfolio of Niko Pastore - Data Engineer specializing in ETL pipelines, cloud data warehousing, and full-stack development.",
  keywords: [
    "Data Engineer",
    "Full Stack Developer",
    "Python",
    "Next.js",
    "PostgreSQL",
    "Cloud Architecture",
  ],
  authors: [{ name: "Niko Pastore" }],
  openGraph: {
    title: "Niko Pastore | Data & Full Stack Engineer",
    description:
      "Portfolio of Niko Pastore - Data Engineer specializing in ETL pipelines, cloud data warehousing, and full-stack development.",
    type: "website",
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
