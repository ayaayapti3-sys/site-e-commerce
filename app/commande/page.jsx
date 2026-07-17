"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, LoaderCircle } from "lucide-react";

import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { useCart } from "@/context/cart-context";
import styles from "./commande.module.css";

export default function CommandePage() {
  const { cart: cartItems = [] } = useCart();

  const checkoutStarted = useRef(false);

  const [error, setError] = useState("");
  const [cartChecked, setCartChecked] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCartChecked(true);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (cartItems.length === 0 || checkoutStarted.current) {
      return;
    }

    checkoutStarted.current = true;

    const redirectToShopifyCheckout = async () => {
      try {
        setError("");

        const response = await fetch("/api/shopify-cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartItems,
          }),
        });

        const result = await response.json();

        if (!response.ok || !result.success || !result.checkoutUrl) {
          throw new Error(
            result.message || "Impossible de créer le checkout Shopify."
          );
        }

        window.location.replace(result.checkoutUrl);
      } catch (checkoutError) {
        console.error("Erreur checkout Shopify :", checkoutError);

        checkoutStarted.current = false;

        setError(
          checkoutError instanceof Error
            ? checkoutError.message
            : "Une erreur est survenue."
        );
      }
    };

    redirectToShopifyCheckout();
  }, [cartItems]);

  return (
    <>
      <Header />

      <main className={styles.successPage}>
        <section className={styles.successCard}>
          {!error && (
            <>
              <LoaderCircle
                size={34}
                strokeWidth={1.4}
                className={styles.checkoutLoader}
              />

              <span className={styles.eyebrow}>Maison Élyra</span>

              <h1>Redirection vers Shopify</h1>

              <p>
                Votre panier est en cours de préparation. Vous allez être
                redirigé vers le paiement sécurisé Shopify.
              </p>
            </>
          )}

          {error && (
            <>
              <span className={styles.eyebrow}>Maison Élyra</span>

              <h1>Impossible d’ouvrir le paiement</h1>

              <p>{error}</p>

              <button
                type="button"
                className={styles.homeButton}
                onClick={() => window.location.reload()}
              >
                Réessayer
              </button>
            </>
          )}

          {cartChecked && cartItems.length === 0 && !error && (
            <>
              <p>Votre panier est vide.</p>

              <Link href="/nouveautes" className={styles.homeButton}>
                <ArrowLeft size={18} strokeWidth={1.5} />
                Découvrir la collection
              </Link>
            </>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}