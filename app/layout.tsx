import { Background } from "@/components/atoms/background";
import { Footer } from "@/components/organisms/footer";
import { Header } from "@/components/organisms/header";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import localFont from "next/font/local";
import "./globals.css";

const satoshi = localFont({
  src: "./fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  weight: "300 900",
});

const archivoNarrow = localFont({
  src: "./fonts/Archivo-Narrow-Regular.woff2",
  variable: "--font-archivo-narrow",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Hugh Fabre",
  description: "Solo web developer building a better web",
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  other: {
    robots: "noai, noimageai",
    googlebot: "noarchive",
    "googlebot-news": "nosnippet",
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
        className={`${satoshi.variable} ${archivoNarrow.variable} font-sans antialiased`}
        style={{ fontFamily: "var(--font-satoshi)", fontWeight: "500" }}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Background />
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
