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
import styles from "./bottes.module.css";
import Footer from "@/components/footer/footer";

const products = [
  {
    id: 1,
    name: "Bottines à Talon Carré",
    type: "Talon carré",
    color: "Cognac",
    price: 1190,
    image: "/images/bottes/bottines-a-talon-carre.png",
    hoverImage: "/images/bottes/bottines-a-talon-carre-hover.png",
    href: "/produits/bottines-a-talon-carre",
    badge: "Nouveau",
  },
  {
    id: 2,
    name: "Bottines Chelsea",
    type: "Chelsea",
    color: "Bordeaux",
    price: 1250,
    image: "/images/bottes/bottines-chelsea.png",
    hoverImage: "/images/bottes/bottines-chelsea-hover.png",
    href: "/produits/bottines-chelsea",
    badge: "Exclusivité",
  },
  {
    id: 3,
    name: "Bottes Hautes en Cuir",
    type: "Montantes",
    color: "Noir",
    price: 1490,
    image: "/images/bottes/bottes-hautes-en-cuir.png",
    hoverImage: "/images/bottes/bottes-hautes-en-cuir-hover.png",
    href: "/produits/bottes-hautes-en-cuir",
    badge: null,
  },
  {
    id: 4,
    name: "Bottines à Lacets",
    type: "À lacets",
    color: "Marron",
    price: 1350,
    image: "/images/bottes/bottines-a-lacets.png",
    hoverImage: "/images/bottes/bottines-a-lacets-hover.png",
    href: "/produits/bottines-a-lacets",
    badge: "Nouveau",
  },
  {
    id: 5,
    name: "Bottes Cavalières",
    type: "Cavalières",
    color: "Cognac",
    price: 1690,
    image: "/images/bottes/bottes-cavalieres.png",
    hoverImage: "/images/bottes/bottes-cavalieres-hover.png",
    href: "/produits/bottes-cavalieres",
    badge: "Édition limitée",
  },
  {
    id: 6,
    name: "Bottines à Talon Fin",
    type: "Talon fin",
    color: "Beige",
    price: 1390,
    image: "/images/bottes/bottines-a-talon-fin.png",
    hoverImage: "/images/bottes/bottines-a-talon-fin-hover.png",
    href: "/produits/bottines-a-talon-fin",
    badge: null,
  },
];

export default function BottesPage() {
  const [sortBy, setSortBy] = useState("featured");
  const { toggleFavorite, isFavorite } = useFavorites();

  const sortedProducts = useMemo(() => {
    const result = [...products];

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
  }, [sortBy]);

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
              <span>Bottes</span>
            </div>

            <span className={styles.eyebrow}>
              La collection
            </span>

            <h1>
              Des lignes affirmées,
              <br />
              <em>une allure intemporelle.</em>
            </h1>

            <p className={styles.heroText}>
              Bottes et bottines en cuir façonnées avec précision,
              pensées pour traverser les saisons avec élégance.
            </p>

            <div className={styles.heroMeta}>
              <span>
                {products.length.toString().padStart(2, "0")} créations
              </span>

              <span>Cuir véritable</span>
              <span>Façonnées à Fès</span>
            </div>
          </div>

          <div className={styles.heroVisual} data-aos="fade-in">
            <Image
              src="/images/bottes/hero-bottes.png"
              alt="Collection de bottes Maison Élyra"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 48vw"
            />

            <div className={styles.heroOverlay} />

            <div className={styles.imageLabel}>
              <span>Maison Élyra</span>
              <p>Collection Automne · Hiver</p>
            </div>
          </div>

          <span className={styles.watermark} aria-hidden="true">
            BOTTES
          </span>
        </section>

        {/* INTRO */}
        <section className={styles.intro} data-aos="fade-up">
          <div className={styles.container}>
            <div className={styles.introHeader}>
              <div>
                <span className={styles.eyebrow}>
                  Nos créations
                </span>

                <h2>
                  Le caractère du cuir,
                  <br />
                  <em>la douceur du geste.</em>
                </h2>
              </div>

              <p>
                Chaque paire associe une silhouette forte à des détails
                précis, pour une élégance durable et naturelle.
              </p>
            </div>
          </div>
        </section>

        {/* COLLECTION */}
        <section className={styles.collection}>
          <div className={styles.container}>
            <div className={styles.toolbar} data-aos="fade-up">
              <div className={styles.toolbarInfo}>
                <span>Toutes les bottes</span>

                <strong>
                  {sortedProducts.length.toString().padStart(2, "0")}{" "}
                  {sortedProducts.length > 1
                    ? "produits"
                    : "produit"}
                </strong>
              </div>

              <div className={styles.sort}>
                <span>Trier par</span>

                <div className={styles.selectWrapper}>
                  <select
                    value={sortBy}
                    onChange={(event) =>
                      setSortBy(event.target.value)
                    }
                    aria-label="Trier les bottes"
                  >
                    <option value="featured">
                      Notre sélection
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
                    size={14}
                    strokeWidth={1.5}
                  />
                </div>
              </div>
            </div>

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

                        <Image
                          src={product.hoverImage}
                          alt={`${product.name} - vue alternative`}
                          fill
                          sizes="(max-width: 650px) 50vw, (max-width: 1000px) 50vw, 33vw"
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
                        Voir le modèle
                        <ArrowUpRight
                          size={16}
                          strokeWidth={1.5}
                        />
                      </Link>
                    </div>

                    <div className={styles.productInfo}>
                      <div>
                        <span className={styles.productDetails}>
                          {product.type} · {product.color}
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

        {/* EDITORIAL */}
        <section className={styles.editorial} data-aos="fade-up">
          <div className={styles.editorialImage} data-aos="fade-in">
            <Image
              src="/images/bottes/artisan-bottes.png"
              alt="Fabrication artisanale de bottes en cuir"
              fill
              sizes="(max-width: 900px) 100vw, 52vw"
            />
          </div>

          <div className={styles.editorialContent} data-aos="fade-up">
            <span className={styles.eyebrow}>
              Le savoir-faire
            </span>

            <h2>
              Construites pour durer,
              <br />
              <em>dessinées pour avancer.</em>
            </h2>

            <p>
              La sélection du cuir, le montage et les finitions sont
              réalisés avec soin pour créer des paires confortables,
              solides et intemporelles.
            </p>

            <Link href="/#ourStory">
              Découvrir notre histoire
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