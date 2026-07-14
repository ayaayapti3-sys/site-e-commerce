import { Bodoni_Moda, Manrope } from "next/font/google";
import "./globals.css";

import AosProvider from "@/components/AosProvider";
import { FavoritesProvider } from "@/context/favorites-context";
import { CartProvider } from "@/context/cart-context";
import CartDrawer from "@/components/cart-drawer/cart-drawer";
import "lenis/dist/lenis.css"; 

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
  <FavoritesProvider>
    <CartProvider>
      <AosProvider />

      {children}

      <CartDrawer />
    </CartProvider>
  </FavoritesProvider>
</body>
    </html>
  );
}