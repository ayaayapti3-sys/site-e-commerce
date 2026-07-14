"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  LockKeyhole,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Truck,
} from "lucide-react";

import Header from "@/components/header/header";
import { useCart } from "@/context/cart-context";
import styles from "./panier.module.css";

export default function PanierPage() {
  const {
    cart,
    cartCount,
    cartTotal,
    isLoaded,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();

  if (!isLoaded) {
    return (
      <>
        <Header />

        <main className={styles.page}>
          <section className={styles.loading}>
            <ShoppingBag size={28} strokeWidth={1.2} />
            <span>Maison Élyra</span>
            <p>Chargement de votre panier...</p>
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />

      <main className={styles.page}>
        {/* HERO */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.breadcrumb}>
              <Link href="/">Accueil</Link>
              <span>/</span>
              <span>Panier</span>
            </div>

            <div className={styles.heroContent}>
              <div>
                <span className={styles.eyebrow}>
                  Votre sélection
                </span>

                <h1>
                  Votre panier,
                  <br />
                  <em>presque à vous.</em>
                </h1>
              </div>

              <div className={styles.heroAside}>
                <p>
                  Vérifiez votre sélection avant de poursuivre votre
                  commande.
                </p>

                <span>
                  {cartCount.toString().padStart(2, "0")}{" "}
                  {cartCount > 1 ? "articles" : "article"}
                </span>
              </div>
            </div>
          </div>

          <span className={styles.watermark} aria-hidden="true">
            PANIER
          </span>
        </section>

        {cart.length > 0 ? (
          <section className={styles.cartSection}>
            <div className={styles.container}>
              <div className={styles.cartLayout}>
                {/* PRODUITS */}
                <div className={styles.cartProducts}>
                  <div className={styles.productsHeader}>
                    <div>
                      <span className={styles.eyebrow}>
                        Vos articles
                      </span>

                      <h2>
                        {cartCount}{" "}
                        {cartCount > 1 ? "articles" : "article"}
                      </h2>
                    </div>

                    <button
                      type="button"
                      className={styles.clearButton}
                      onClick={clearCart}
                    >
                      <Trash2 size={15} strokeWidth={1.4} />
                      Vider le panier
                    </button>
                  </div>

                  <div className={styles.productsList}>
                    {cart.map((product, index) => (
                      <article
                        className={styles.product}
                        key={product.href}
                      >
                        <Link
                          href={product.href}
                          className={styles.productImage}
                        >
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="(max-width: 600px) 110px, 180px"
                          />

                          <span className={styles.productNumber}>
                            {(index + 1)
                              .toString()
                              .padStart(2, "0")}
                          </span>
                        </Link>

                        <div className={styles.productContent}>
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
                                <Link href={product.href}>
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
                              aria-label={`Supprimer ${product.name} du panier`}
                            >
                              <Trash2
                                size={17}
                                strokeWidth={1.4}
                              />
                            </button>
                          </div>

                          <div className={styles.productBottom}>
                            <div className={styles.quantity}>
                              <span>Quantité</span>

                              <div className={styles.quantityControl}>
                                <button
                                  type="button"
                                  onClick={() =>
                                    decreaseQuantity(product.href)
                                  }
                                  aria-label={`Diminuer la quantité de ${product.name}`}
                                >
                                  <Minus
                                    size={14}
                                    strokeWidth={1.5}
                                  />
                                </button>

                                <strong>{product.quantity}</strong>

                                <button
                                  type="button"
                                  onClick={() =>
                                    increaseQuantity(product.href)
                                  }
                                  aria-label={`Augmenter la quantité de ${product.name}`}
                                >
                                  <Plus
                                    size={14}
                                    strokeWidth={1.5}
                                  />
                                </button>
                              </div>
                            </div>

                            <div className={styles.productPrice}>
                              <span>
                                {product.price.toLocaleString(
                                  "fr-FR"
                                )}{" "}
                                MAD
                              </span>

                              {product.quantity > 1 && (
                                <strong>
                                  {(
                                    product.price *
                                    product.quantity
                                  ).toLocaleString("fr-FR")}{" "}
                                  MAD
                                </strong>
                              )}
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>

                  <Link
                    href="/nouveautes"
                    className={styles.continueShopping}
                  >
                    Continuer mes achats
                    <ArrowUpRight size={17} strokeWidth={1.5} />
                  </Link>
                </div>

                {/* RÉSUMÉ */}
                <aside className={styles.summary}>
                  <div className={styles.summaryHeader}>
                    <span className={styles.eyebrow}>
                      Récapitulatif
                    </span>

                    <h2>Votre commande</h2>
                  </div>

                  <div className={styles.summaryRows}>
                    <div className={styles.summaryRow}>
                      <span>Sous-total</span>

                      <strong>
                        {cartTotal.toLocaleString("fr-FR")} MAD
                      </strong>
                    </div>

                    <div className={styles.summaryRow}>
                      <span>Livraison</span>
                      <strong>Calculée ensuite</strong>
                    </div>
                  </div>

                  <div className={styles.total}>
                    <span>Total estimé</span>

                    <strong>
                      {cartTotal.toLocaleString("fr-FR")} MAD
                    </strong>
                  </div>

                  <p className={styles.taxes}>
                    Les frais de livraison seront calculés au moment de
                    la validation de votre commande.
                  </p>

                  <Link
                    href="/commande"
                    className={styles.checkoutButton}
                  >
                    Passer la commande
                    <ArrowRight size={17} strokeWidth={1.5} />
                  </Link>

                  <div className={styles.reassurance}>
                    <div>
                      <LockKeyhole size={18} strokeWidth={1.3} />

                      <span>
                        <strong>Paiement sécurisé</strong>
                        Données protégées
                      </span>
                    </div>

                    <div>
                      <Truck size={19} strokeWidth={1.3} />

                      <span>
                        <strong>Livraison suivie</strong>
                        Partout au Maroc
                      </span>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </section>
        ) : (
          /* PANIER VIDE */
          <section className={styles.empty}>
            <div className={styles.emptyIcon}>
              <ShoppingBag size={32} strokeWidth={1.2} />
            </div>

            <span className={styles.eyebrow}>
              Votre panier est vide
            </span>

            <h2>
              Aucune pièce
              <br />
              <em>ne vous attend encore.</em>
            </h2>

            <p>
              Explorez les collections Maison Élyra et ajoutez vos
              créations préférées à votre panier.
            </p>

            <div className={styles.emptyLinks}>
              <Link href="/nouveautes">
                Nouveautés
                <ArrowRight size={16} strokeWidth={1.5} />
              </Link>

              <Link href="/sacs">
                Sacs
                <ArrowRight size={16} strokeWidth={1.5} />
              </Link>

              <Link href="/sandales">
                Sandales
                <ArrowRight size={16} strokeWidth={1.5} />
              </Link>

              <Link href="/bottes">
                Bottes
                <ArrowRight size={16} strokeWidth={1.5} />
              </Link>
            </div>
          </section>
        )}
      </main>
    </>
  );
}