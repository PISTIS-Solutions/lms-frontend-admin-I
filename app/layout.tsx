import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Favicon from '../public/favicon.ico';

const monte = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pistis Admin",
  icons: [{ rel: 'icon', url: Favicon.src }],
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
