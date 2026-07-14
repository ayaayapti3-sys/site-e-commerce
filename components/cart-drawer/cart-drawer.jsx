"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  LockKeyhole,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Truck,
  X,
} from "lucide-react";

import { useCart } from "@/context/cart-context";
import styles from "./cart-drawer.module.css";

export default function CartDrawer() {
  const {
    cart,
    cartCount,
    cartTotal,
    isCartOpen,
    closeCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  useEffect(() => {
    if (!isCartOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    function handleEscape(event) {
      if (event.key === "Escape") {
        closeCart();
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isCartOpen, closeCart]);

  return (
    <div
      className={
        isCartOpen
          ? `${styles.cartLayer} ${styles.open}`
          : styles.cartLayer
      }
      aria-hidden={!isCartOpen}
    >
      <button
        type="button"
        className={styles.overlay}
        onClick={closeCart}
        aria-label="Fermer le panier"
      />

      <aside
        className={styles.drawer}
        role="dialog"
        aria-modal="true"
        aria-label="Votre panier"
      >
        <div className={styles.header}>
          <div>
            <span className={styles.eyebrow}>
              Maison Élyra Shopping Bag
            </span>

            <h2>Votre panier</h2>
          </div>

          <button
            type="button"
            className={styles.closeButton}
            onClick={closeCart}
            aria-label="Fermer le panier"
          >
            <X size={21} strokeWidth={1.4} />
          </button>
        </div>

        <div className={styles.separator} />

        {cart.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>
              <ShoppingBag size={28} strokeWidth={1.2} />
            </div>

            <p>Votre panier est vide.</p>

            <button
              type="button"
              className={styles.continueButton}
              onClick={closeCart}
            >
              Continuer vos achats
              <ArrowRight size={16} strokeWidth={1.4} />
            </button>
          </div>
        ) : (
          <>
            <div className={styles.cartContent}>
              <div className={styles.cartCount}>
                <span>Votre sélection</span>

                <strong>
                  {cartCount.toString().padStart(2, "0")}{" "}
                  {cartCount > 1 ? "articles" : "article"}
                </strong>
              </div>

              <div className={styles.products}>
                {cart.map((product) => (
                  <article
                    className={styles.product}
                    key={product.href}
                  >
                    <Link
                      href={product.href}
                      className={styles.productImage}
                      onClick={closeCart}
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="110px"
                      />
                    </Link>

                    <div className={styles.productInfo}>
                      <div className={styles.productTop}>
                        <div>
                          <span className={styles.productMeta}>
                            {product.category ||
                              product.style ||
                              product.type ||
                              "Collection"}

                            {product.color
                              ? ` · ${product.color}`
                              : ""}
                          </span>

                          <h3>
                            <Link
                              href={product.href}
                              onClick={closeCart}
                            >
                              {product.name}
                            </Link>
                          </h3>
                        </div>

                        <button
                          type="button"
                          className={styles.removeButton}
                          onClick={() =>
                            removeFromCart(product.href)
                          }
                          aria-label={`Supprimer ${product.name}`}
                        >
                          <Trash2
                            size={15}
                            strokeWidth={1.4}
                          />
                        </button>
                      </div>

                      <div className={styles.productBottom}>
                        <div className={styles.quantity}>
                          <button
                            type="button"
                            onClick={() =>
                              decreaseQuantity(product.href)
                            }
                            aria-label="Diminuer la quantité"
                          >
                            <Minus
                              size={13}
                              strokeWidth={1.5}
                            />
                          </button>

                          <span>{product.quantity}</span>

                          <button
                            type="button"
                            onClick={() =>
                              increaseQuantity(product.href)
                            }
                            aria-label="Augmenter la quantité"
                          >
                            <Plus
                              size={13}
                              strokeWidth={1.5}
                            />
                          </button>
                        </div>

                        <strong className={styles.price}>
                          {(
                            product.price * product.quantity
                          ).toLocaleString("fr-FR")}{" "}
                          MAD
                        </strong>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className={styles.footer}>
              <div className={styles.total}>
                <span>Total estimé</span>

                <strong>
                  {cartTotal.toLocaleString("fr-FR")} MAD
                </strong>
              </div>

              <p className={styles.deliveryText}>
                Les frais de livraison seront calculés lors de la
                validation.
              </p>

              <Link
                href="/commande"
                className={styles.checkoutButton}
                onClick={closeCart}
              >
                Passer la commande
                <ArrowRight size={17} strokeWidth={1.5} />
              </Link>

              <Link
                href="/panier"
                className={styles.cartPageLink}
                onClick={closeCart}
              >
                Voir le panier complet
              </Link>

              <div className={styles.reassurance}>
                <div>
                  <LockKeyhole
                    size={17}
                    strokeWidth={1.3}
                  />

                  <span>Paiement sécurisé</span>
                </div>

                <div>
                  <Truck size={18} strokeWidth={1.3} />

                  <span>Livraison suivie au Maroc</span>
                </div>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}