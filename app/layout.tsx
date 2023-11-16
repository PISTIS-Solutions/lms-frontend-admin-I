import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const monte = Montserrat({ subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Pistis Admin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={monte.className}>{children}</body>
    </html>
  );
}
