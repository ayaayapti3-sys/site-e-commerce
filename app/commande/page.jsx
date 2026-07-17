"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CreditCard,
  LockKeyhole,
  PackageCheck,
  Truck,
} from "lucide-react";

import Header from "@/components/header/header";
import { useCart } from "@/context/cart-context";
import styles from "./commande.module.css";
import Footer from "@/components/footer/footer";

export default function CommandePage() {
  const { cart: cartItems = [] } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("delivery");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      return total + Number(item.price) * Number(item.quantity || 1);
    }, 0);
  }, [cartItems]);

  const shippingPrice = subtotal >= 1500 || subtotal === 0 ? 0 : 49;
  const total = subtotal + shippingPrice;

  const formatPrice = (price) => {
    return `${Number(price).toLocaleString("fr-MA")} MAD`;
  };

const handleSubmit = async (event) => {
  event.preventDefault();

  if (cartItems.length === 0) return;

  setIsSubmitting(true);

  try {
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

    if (!response.ok || !result.success) {
      throw new Error(
        result.message || "Impossible de créer la commande."
      );
    }

    window.location.href = result.checkoutUrl;
  } catch (error) {
    console.error("Erreur checkout Shopify :", error);

    alert(
      error instanceof Error
        ? error.message
        : "Une erreur est survenue."
    );

    setIsSubmitting(false);
  }
};

  if (orderPlaced) {
    return (
      <>
        <Header />

        <main className={styles.successPage} >
          <section className={styles.successCard}>
            <div className={styles.successIcon}>
              <Check size={30} strokeWidth={1.5} />
            </div>

            <span className={styles.eyebrow}>Maison Élyra</span>

            <h1>Votre commande est confirmée</h1>

            <p>
              Merci pour votre commande. Notre équipe vous contactera afin de
              confirmer les informations de livraison.
            </p>

            <div className={styles.successReference}>
              <span>Référence</span>
              <strong>ELY-{Date.now().toString().slice(-6)}</strong>
            </div>

            <Link href="/" className={styles.homeButton}>
              Retour à l’accueil
              <ArrowRight size={18} strokeWidth={1.5} />
            </Link>
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />

      <main className={styles.page} data-aos="fade-up">
        <section className={styles.heading}>
          <div className={styles.headingInner} data-aos="fade-up">
            <Link href="/" className={styles.backLink}>
              <ArrowLeft size={16} strokeWidth={1.5} />
              Continuer mes achats
            </Link>

            <span className={styles.eyebrow}>
              Maison Élyra · Paiement sécurisé
            </span>

            <h1>Finaliser votre commande</h1>

            <p>
              Complétez vos informations pour recevoir votre sélection Maison
              Élyra.
            </p>
          </div>
        </section>

        <div className={styles.checkoutContainer} data-aos="fade-up">
          <form className={styles.formColumn} onSubmit={handleSubmit}>
            <section className={styles.formSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNumber}>01</span>

                <div>
                  <h2>Informations personnelles</h2>
                  <p>Utilisées pour confirmer et suivre votre commande.</p>
                </div>
              </div>

              <div className={styles.fieldsRow}>
                <div className={styles.field}>
                  <label htmlFor="firstName">Prénom</label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Votre prénom"
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="lastName">Nom</label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Votre nom"
                    required
                  />
                </div>
              </div>

              <div className={styles.fieldsRow}>
                <div className={styles.field}>
                  <label htmlFor="email">Adresse e-mail</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="exemple@email.com"
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="phone">Téléphone</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+212 6 00 00 00 00"
                    required
                  />
                </div>
              </div>
            </section>

            <section className={styles.formSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNumber}>02</span>

                <div>
                  <h2>Adresse de livraison</h2>
                  <p>Nous livrons votre commande partout au Maroc.</p>
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="address">Adresse complète</label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Numéro, rue, quartier..."
                  required
                />
              </div>

              <div className={styles.fieldsRow}>
                <div className={styles.field}>
                  <label htmlFor="city">Ville</label>

                  <select id="city" name="city" defaultValue="" required>
                    <option value="" disabled>
                      Sélectionnez votre ville
                    </option>
                    <option value="Casablanca">Casablanca</option>
                    <option value="Rabat">Rabat</option>
                    <option value="Fès">Fès</option>
                    <option value="Marrakech">Marrakech</option>
                    <option value="Tanger">Tanger</option>
                    <option value="Agadir">Agadir</option>
                    <option value="Meknès">Meknès</option>
                    <option value="Autre">Autre ville</option>
                  </select>
                </div>

                <div className={styles.field}>
                  <label htmlFor="postalCode">Code postal</label>
                  <input
                    id="postalCode"
                    name="postalCode"
                    type="text"
                    placeholder="20000"
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="note">
                  Instructions de livraison
                  <span> Optionnel</span>
                </label>

                <textarea
                  id="note"
                  name="note"
                  rows="4"
                  placeholder="Étage, repère, disponibilité..."
                />
              </div>
            </section>

            <section className={styles.formSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNumber}>03</span>

                <div>
                  <h2>Mode de paiement</h2>
                  <p>Choisissez la méthode qui vous convient.</p>
                </div>
              </div>

              <div className={styles.paymentMethods}>
                <label
                  className={`${styles.paymentCard} ${
                    paymentMethod === "delivery"
                      ? styles.paymentCardActive
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="delivery"
                    checked={paymentMethod === "delivery"}
                    onChange={(event) =>
                      setPaymentMethod(event.target.value)
                    }
                  />

                  <span className={styles.radioMark} />

                  <PackageCheck size={24} strokeWidth={1.4} />

                  <span className={styles.paymentContent}>
                    <strong>Paiement à la livraison</strong>
                    <small>Payez en espèces à la réception.</small>
                  </span>
                </label>

                <label
                  className={`${styles.paymentCard} ${
                    paymentMethod === "card" ? styles.paymentCardActive : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(event) =>
                      setPaymentMethod(event.target.value)
                    }
                  />

                  <span className={styles.radioMark} />

                  <CreditCard size={24} strokeWidth={1.4} />

                  <span className={styles.paymentContent}>
                    <strong>Carte bancaire</strong>
                    <small>Paiement sécurisé en ligne.</small>
                  </span>
                </label>
              </div>

              {paymentMethod === "card" && (
                <div className={styles.cardNotice}>
                  <LockKeyhole size={18} strokeWidth={1.5} />

                  <p>
                    L’intégration du paiement bancaire sera connectée
                    ultérieurement à votre solution de paiement.
                  </p>
                </div>
              )}
            </section>

            <label className={styles.terms}>
              <input type="checkbox" required />

              <span>
                J’accepte les conditions générales de vente et confirme
                l’exactitude de mes informations.
              </span>
            </label>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting || cartItems.length === 0}
            >
              <span>
                {isSubmitting
                  ? "Confirmation en cours..."
                  : "Confirmer la commande"}
              </span>

              <ArrowRight size={19} strokeWidth={1.5} />
            </button>

            <div className={styles.reassurance}>
              <span>
                <LockKeyhole size={17} strokeWidth={1.4} />
                Paiement sécurisé
              </span>

              <span>
                <Truck size={19} strokeWidth={1.4} />
                Livraison suivie au Maroc
              </span>
            </div>
          </form>

          <aside className={styles.summaryColumn} data-aos="fade-up">
            <div className={styles.summaryCard}>
              <div className={styles.summaryHeader}>
                <div>
                  <span className={styles.eyebrow}>Votre sélection</span>
                  <h2>Résumé de la commande</h2>
                </div>

                <span className={styles.itemCount}>
                  {cartItems.length.toString().padStart(2, "0")} article
                  {cartItems.length > 1 ? "s" : ""}
                </span>
              </div>

              {cartItems.length === 0 ? (
                <div className={styles.emptyCart}>
                  <p>Votre panier est actuellement vide.</p>

                  <Link href="/nouveautes">Découvrir la collection</Link>
                </div>
              ) : (
                <div className={styles.products}>
                  {cartItems.map((item) => (
                    <article
                      className={styles.product}
                      key={`${item.id}-${item.color || "default"}`}
                    >
                      <div className={styles.productImage}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="90px"
                        />

                        <span>{item.quantity || 1}</span>
                      </div>

                      <div className={styles.productInfo}>
                        <small>
                          {item.category}
                          {item.color ? ` · ${item.color}` : ""}
                        </small>

                        <h3>{item.name}</h3>

                        <p>{formatPrice(item.price)}</p>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              <div className={styles.prices}>
                <div>
                  <span>Sous-total</span>
                  <strong>{formatPrice(subtotal)}</strong>
                </div>

                <div>
                  <span>Livraison</span>
                  <strong>
                    {shippingPrice === 0
                      ? subtotal === 0
                        ? "—"
                        : "Offerte"
                      : formatPrice(shippingPrice)}
                  </strong>
                </div>
              </div>

              <div className={styles.total}>
                <div>
                  <span>Total</span>
                  <small>Taxes incluses</small>
                </div>

                <strong>{formatPrice(total)}</strong>
              </div>

              {subtotal > 0 && subtotal < 1500 && (
                <div className={styles.shippingMessage}>
                  Plus que {formatPrice(1500 - subtotal)} pour bénéficier de la
                  livraison offerte.
                </div>
              )}

              <div className={styles.summaryFooter}>
                <LockKeyhole size={18} strokeWidth={1.4} />

                <p>
                  Vos informations personnelles sont protégées et utilisées
                  uniquement pour traiter votre commande.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
    
  );
}