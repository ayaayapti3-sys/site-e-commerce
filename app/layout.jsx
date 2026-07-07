import { Bodoni_Moda, Manrope } from "next/font/google";
import "./globals.css";
import AosProvider from "@/components/AosProvider";

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata = {
  title: "Maison Élyra",
  description: "Maroquinerie et souliers premium.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`${bodoniModa.variable} ${manrope.variable}`}>
        <AosProvider />
        {children}
      </body>
    </html>
  );
}