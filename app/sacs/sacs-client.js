"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ChevronDown,
  Heart,
} from "lucide-react";

import Header from "@/components/header/header";
import { useFavorites } from "@/context/favorites-context";
import styles from "./sacs.module.css";
import Footer from "@/components/footer/footer";

const categories = ["Tous", "Sacs en cuir"];

export default function SacsClient({ products }) {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [sortBy, setSortBy] = useState("featured");

  const {
    toggleFavorite,
    isFavorite,
  } = useFavorites();

  const sortedProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== "Tous") {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    // if (selectedColor !== "Tous") {
    //   result = result.filter(
    //     (product) => product.color === selectedColor
    //   );
    // }

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sortBy === "name") {
      result.sort((a, b) =>
        a.name.localeCompare(b.name, "fr")
      );
    }

    return result;
  }, [sortBy, selectedCategory]);

  return (
    <>
      <Header />

      <main className={styles.page} data-aos="fade-up">
        {/* HERO */}
        <section className={styles.hero}>
          <div className={styles.heroContent} data-aos="fade-up">
            <div className={styles.breadcrumb}>
              <Link href="/">Accueil</Link>

              <span>/</span>

              <span>Sacs</span>
            </div>

            <span className={styles.eyebrow}>
              La collection
            </span>

            <h1>
              Des sacs façonnés
              <br />
              <em>pour vous suivre.</em>
            </h1>

            <p className={styles.heroText}>
              Des lignes intemporelles, un cuir soigneusement
              sélectionné et le savoir-faire de nos artisans à Fès.
            </p>

            <div className={styles.heroMeta}>
              <span>
                {products.length.toString().padStart(2, "0")} créations
              </span>

              <span>Cuir véritable</span>

              <span>Façonnés à Fès</span>
            </div>
          </div>

          <div className={styles.heroImage} data-aos="fade-in">
            <Image
              src="/images/sacs/hero-sac.png"
              alt="Collection de sacs Maison Élyra"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 46vw"
            />

            <div className={styles.heroOverlay} />

            <div className={styles.imageLabel}>
              <span>Maison Élyra</span>

              <p>Collection de sacs</p>
            </div>
          </div>

          <span
            className={styles.watermark}
            aria-hidden="true"
          >
            SACS
          </span>
        </section>

        {/* COLLECTION */}
        <section className={styles.collection}>
          <div className={styles.container}>
            <div className={styles.collectionHeader} data-aos="fade-up">
              <div>
                <span className={styles.eyebrow}>
                  Nos créations
                </span>

                <h2>
                  La collection
                  <br />
                  de sacs
                </h2>
              </div>

              <p>
                Chaque modèle est pensé pour conjuguer élégance,
                fonctionnalité et durabilité.
              </p>
            </div>

            {/* BARRE DE TRI */}
            <div className={styles.toolbar} data-aos="fade-up">
              <div className={styles.toolbarInfo}>
                <span>Tous les sacs</span>

                <strong>
                  {sortedProducts.length
                    .toString()
                    .padStart(2, "0")}{" "}
                  {sortedProducts.length > 1
                    ? "produits"
                    : "produit"}
                </strong>
              </div>


              <div className={styles.categories}>
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={
                      selectedCategory === category
                        ? `${styles.categoryButton} ${styles.activeCategory}`
                        : styles.categoryButton
                    }
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className={styles.sort}>
                <span>Trier par</span>

                <div className={styles.selectWrapper}>
                  <select
                    value={sortBy}
                    onChange={(event) =>
                      setSortBy(event.target.value)
                    }
                    aria-label="Trier les sacs"
                  >
                    <option value="featured">
                      Sélection
                    </option>

                    <option value="price-low">
                      Prix croissant
                    </option>

                    <option value="price-high">
                      Prix décroissant
                    </option>

                    <option value="name">
                      Nom A–Z
                    </option>
                  </select>

                  <ChevronDown
                    size={15}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>

            {/* PRODUITS */}
            <div className={styles.productGrid}>
              {sortedProducts.map((product, index) => {
                const productIsFavorite = isFavorite(
                  product.href
                );

                return (
                  <article
                    className={styles.productCard}
                    key={product.id}
                    data-aos="fade-up"
                  >
                    <div className={styles.imageContainer}>
                      <Link
                        href={product.href}
                        className={styles.productLink}
                        aria-label={`Découvrir ${product.name}`}
                      >
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 600px) 50vw, (max-width: 1100px) 50vw, 33vw"
                          className={`${styles.productImage} ${styles.mainImage}`}
                        />

                        <Image
                          src={product.hoverImage}
                          alt={`${product.name} - vue alternative`}
                          fill
                          sizes="(max-width: 600px) 50vw, (max-width: 1100px) 50vw, 33vw"
                          className={`${styles.productImage} ${styles.hoverImage}`}
                        />
                      </Link>

                      {product.badge && (
                        <span className={styles.badge}>
                          {product.badge}
                        </span>
                      )}

                      <button
                        type="button"
                        className={
                          productIsFavorite
                            ? `${styles.favorite} ${styles.favoriteActive}`
                            : styles.favorite
                        }
                        onClick={() =>
                          toggleFavorite(product)
                        }
                        aria-label={
                          productIsFavorite
                            ? `Retirer ${product.name} des favoris`
                            : `Ajouter ${product.name} aux favoris`
                        }
                        aria-pressed={productIsFavorite}
                      >
                        <Heart
                          size={18}
                          strokeWidth={1.5}
                          fill={
                            productIsFavorite
                              ? "currentColor"
                              : "none"
                          }
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
                        <span>Découvrir</span>

                        <ArrowUpRight
                          size={16}
                          strokeWidth={1.5}
                        />
                      </Link>
                    </div>

                    <div className={styles.productInfo}>
                      <div>
                        <span className={styles.productStyle}>
                          {product.style} · {product.color}
                        </span>

                        <h3>
                          <Link href={product.href}>
                            {product.name}
                          </Link>
                        </h3>
                      </div>

                      <span className={styles.price}>
                        {product.price.toLocaleString("fr-FR")} MAD
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* SAVOIR-FAIRE */}
        <section className={styles.craft} data-aos="fade-up">
          <div className={styles.craftImage} data-aos="fade-in">
            <Image
              src="/images/sacs/artisan-sac.png"
              alt="Fabrication artisanale d’un sac en cuir"
              fill
              sizes="(max-width: 900px) 100vw, 52vw"
            />
          </div>

          <div className={styles.craftContent} data-aos="fade-up">
            <span className={styles.eyebrow}>
              Le savoir-faire
            </span>

            <h2>
              Un sac façonné
              <br />
              <em>par le geste.</em>
            </h2>

            <p>
              De la découpe du cuir jusqu’aux dernières
              finitions, chaque étape est réalisée avec précision
              dans nos ateliers.
            </p>

            <Link href="/#ourStory">
              <span>Découvrir notre histoire</span>

              <ArrowUpRight
                size={17}
                strokeWidth={1.5}
              />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}