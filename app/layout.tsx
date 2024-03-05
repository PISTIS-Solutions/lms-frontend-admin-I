import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Favicon from "../public/favicon.ico";
import NextNProgress from "nextjs-progressbar";

const montserrat = Montserrat({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Pistis Admin",
  icons: [{ rel: "icon", url: Favicon.src }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <NextNProgress> */}
        <body className={montserrat.className}>{children}</body>
      {/* </NextNProgress> */}
    </html>
  );
}
