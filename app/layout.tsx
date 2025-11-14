import { Background } from "@/components/atoms/background";
import { Footer } from "@/components/organisms/footer";
import { Header } from "@/components/organisms/header";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter, Roboto_Condensed } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-roboto-condensed",
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
        className={`${inter.variable} ${robotoCondensed.variable} font-sans antialiased`}
        style={{ fontFamily: "var(--font-inter)" }}
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
