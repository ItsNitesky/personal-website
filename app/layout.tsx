import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import clsx from "clsx";

import { Providers } from "./providers";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Hi, I'm Brant",
  description: "Community & Content Marketing Professional in Gaming, combining marketing expertise with web development skills.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
        )}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
