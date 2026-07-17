"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Heart,
  Trash2,
} from "lucide-react";

import Header from "@/components/header/header";
import { useFavorites } from "@/context/favorites-context";
import styles from "./favoris.module.css";
import Footer from "@/components/footer/footer";


export default function FavorisPage() {
  const {
    favorites,
    isLoaded,
    removeFavorite,
    clearFavorites,
  } = useFavorites();

  if (!isLoaded) {
    return (
      <>
        <Header />

        <main className={styles.page}>
          <section className={styles.loading}>
            <span>Maison Élyra</span>
            <p>Chargement de vos favoris...</p>
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />

      <main className={styles.page} data-aos="fade-up">
        <section className={styles.hero}>
          <div className={styles.heroInner} data-aos="fade-up">
            <div className={styles.breadcrumb}>
              <Link href="/">Accueil</Link>
              <span>/</span>
              <span>Favoris</span>
            </div>

            <div className={styles.heroContent}>
              <div>
                <span className={styles.eyebrow}>
                  Votre sélection
                </span>

                <h1>
                  Vos pièces
                  <br />
                  <em>coup de cœur.</em>
                </h1>
              </div>

              <div className={styles.heroAside}>
                <p>
                  Retrouvez ici toutes les créations Maison Élyra
                  que vous avez mises de côté.
                </p>

                <span>
                  {favorites.length
                    .toString()
                    .padStart(2, "0")}{" "}
                  {favorites.length > 1
                    ? "pièces sauvegardées"
                    : "pièce sauvegardée"}
                </span>
              </div>
            </div>
          </div>

          <span className={styles.watermark} aria-hidden="true">
            FAVORIS
          </span>
        </section>

        {favorites.length > 0 ? (
          <section className={styles.collection}>
            <div className={styles.container} data-aos="fade-up">
              <div className={styles.toolbar}>
                <p>
                  <strong>{favorites.length}</strong>{" "}
                  {favorites.length > 1
                    ? "produits favoris"
                    : "produit favori"}
                </p>

                <button
                  type="button"
                  onClick={clearFavorites}
                  className={styles.clearButton}
                >
                  <Trash2 size={15} strokeWidth={1.4} />
                  Vider les favoris
                </button>
              </div>

              <div className={styles.productGrid}>
                {favorites.map((product, index) => (
                  <article
                    className={styles.productCard}
                    key={product.href}
                    data-aos="fade-up"
                  >
                    <div className={styles.productVisual}>
                      <Link
                        href={product.href}
                        className={styles.productLink}
                      >
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 650px) 50vw, (max-width: 1000px) 50vw, 33vw"
                          className={`${styles.productImage} ${styles.mainImage}`}
                        />

                        {product.hoverImage && (
                          <Image
                            src={product.hoverImage}
                            alt={`${product.name} - vue alternative`}
                            fill
                            sizes="(max-width: 650px) 50vw, (max-width: 1000px) 50vw, 33vw"
                            className={`${styles.productImage} ${styles.hoverImage}`}
                          />
                        )}
                      </Link>

                      {product.badge && (
                        <span className={styles.badge}>
                          {product.badge}
                        </span>
                      )}

                      <button
                        type="button"
                        className={styles.removeButton}
                        onClick={() =>
                          removeFavorite(product.href)
                        }
                        aria-label={`Retirer ${product.name} des favoris`}
                      >
                        <Heart
                          size={18}
                          strokeWidth={1.4}
                          fill="currentColor"
                        />
                      </button>

                      <span className={styles.productNumber}>
                        {(index + 1)
                          .toString()
                          .padStart(2, "0")}
                      </span>

                      <Link
                        href={product.href}
                        className={styles.discover}
                      >
                        Voir le produit
                        <ArrowUpRight
                          size={16}
                          strokeWidth={1.5}
                        />
                      </Link>
                    </div>

                    <div className={styles.productInfo}>
                      <div>
                        <span className={styles.productDetails}>
                          {product.category ||
                            product.style ||
                            product.type}
                          {product.color
                            ? ` · ${product.color}`
                            : ""}
                        </span>

                        <h2>
                          <Link href={product.href}>
                            {product.name}
                          </Link>
                        </h2>
                      </div>

                      <span className={styles.price}>
                        {product.price?.toLocaleString(
                          "fr-FR"
                        )}{" "}
                        MAD
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <section className={styles.empty} >
            <div className={styles.emptyIcon} data-aos="fade-up">
              <Heart size={30} strokeWidth={1.2} />
            </div>

            <span className={styles.eyebrow} data-aos="fade-up">
              Votre sélection est vide
            </span>

            <h2 data-aos="fade-up">
              Vous n’avez pas encore
              <br />
              ajouté de coup de cœur.
            </h2>

            <p data-aos="fade-up">
              Explorez nos collections et cliquez sur le cœur pour
              sauvegarder les créations qui vous plaisent.
            </p>

            <div className={styles.emptyLinks} data-aos="fade-in">
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
      <Footer />
    </>
  );
}