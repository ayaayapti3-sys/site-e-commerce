"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import styles from "./bestsellers.module.css";
import { useFavorites } from "@/context/favorites-context";


export default function BestsellersClient({ products }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  return (
    <section className={styles.bestsellers} data-aos="fade-up">
      <div className={styles.container}>
        <header className={styles.header} data-aos="fade-up">
          <div className={styles.headingContent}>
            <span className={styles.eyebrow}>Nos bestsellers</span>

            <h2 className={styles.title}>
              Les pièces que vous choisissez
              <br />
              <em>encore et encore.</em>
            </h2>

            <p className={styles.intro}>
              Découvrez les créations les plus appréciées pour leur élégance,
              leur confort et leur qualité intemporelle.
            </p>
          </div>

          <Link href="/products" className={styles.viewAll}>
            Voir tous les produits
            <ArrowRight size={18} strokeWidth={1.5} />
          </Link>
        </header>

        <div className={styles.products}>
  {products.map((product) => {
    const productIsFavorite = isFavorite(product.href);

    return (
      <article
        className={styles.productCard}
        key={product.id}
        data-aos="fade-up"
      >
        <div className={styles.imageWrapper}>
          <Link href={product.href} className={styles.imageLink}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 620px) 100vw, (max-width: 1000px) 50vw, 25vw"
              className={`${styles.productImage} ${styles.mainImage}`}
            />

            <Image
              src={product.hoverImage}
              alt={`${product.name} - deuxième vue`}
              fill
              sizes="(max-width: 620px) 100vw, (max-width: 1000px) 50vw, 25vw"
              className={`${styles.productImage} ${styles.hoverImage}`}
            />
          </Link>

          {/* <span
            className={`${styles.badge} ${styles[product.badgeType]}`}
          >
            {product.badge}
          </span> */}
          {product.badge && (
  <span
    className={`${styles.badge} ${styles[product.badgeType]}`}
  >
    {product.badge}
  </span>
)}

          <button
            type="button"
            className={
              productIsFavorite
                ? `${styles.favoriteButton} ${styles.favoriteActive}`
                : styles.favoriteButton
            }
            onClick={() => toggleFavorite(product)}
            aria-label={
              productIsFavorite
                ? `Retirer ${product.name} des favoris`
                : `Ajouter ${product.name} aux favoris`
            }
            aria-pressed={productIsFavorite}
          >
            <Heart
              size={19}
              strokeWidth={1.5}
              fill={productIsFavorite ? "currentColor" : "none"}
            />
          </button>

          <Link href={product.href} className={styles.quickView}>
            Voir le produit
            <ArrowRight size={16} strokeWidth={1.5} />
          </Link>
        </div>

        <div className={styles.productInfo}>
          <span className={styles.category}>
            {product.category}
          </span>

          <div className={styles.productTop}>
            <Link
              href={product.href}
              className={styles.productName}
            >
              {product.name}
            </Link>

      {product.colors?.length > 0 && (
  <div
    className={styles.colors}
    aria-label="Couleurs disponibles"
  >
    {product.colors.map((color, index) => (
      <span
        key={`${product.id}-${index}`}
        className={styles.color}
        style={{ backgroundColor: color }}
        aria-hidden="true"
      />
    ))}
  </div>
)}
          </div>

          <div className={styles.prices}>
            <span className={styles.price}>
              {product.price.toLocaleString("fr-FR")} MAD
            </span>

            {product.oldPrice && (
              <span className={styles.oldPrice}>
                {product.oldPrice.toLocaleString("fr-FR")} MAD
              </span>
            )}
          </div>
        </div>
      </article>
    );
  })}
</div>
      </div>
    </section>
  );
}