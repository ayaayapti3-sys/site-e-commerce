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
import styles from "./sandales.module.css";
import Footer from "@/components/footer/footer";

const products = [
  {
    id: 1,
    name: "Sandales Tressées en Cuir",
    type: "Tressées",
    color: "Cognac",
    price: 790,
    image: "/images/sandales/sandales-tressees-en-cuir.png",
    hoverImage: "/images/sandales/sandales-tressees-en-cuir-hover.png",
    href: "/produits/sandales-tressees-en-cuir",
    badge: "Nouveau",
  },
  {
    id: 2,
    name: "Sandales à Boucle Minimalistes",
    type: "À boucle",
    color: "Noir",
    price: 850,
    image: "/images/sandales/sandales-a-boucle-minimalistes.png",
    hoverImage: "/images/sandales/sandales-a-boucle-minimalistes-hover.png",
    href: "/produits/sandales-a-boucle-minimalistes",
    badge: null,
  },
  {
    id: 3,
    name: "Sandales à Talon Bloc",
    type: "À talon",
    color: "Bordeaux",
    price: 990,
    image: "/images/sandales/sandales-a-talon-bloc.png",
    hoverImage: "/images/sandales/sandales-a-talon-bloc-hover.png",
    href: "/produits/sandales-a-talon-bloc",
    badge: "Exclusivité",
  },
  {
    id: 4,
    name: "Sandales Plates à Brides",
    type: "Plates",
    color: "Beige",
    price: 720,
    image: "/images/sandales/sandales-plates-a-brides.png",
    hoverImage: "/images/sandales/sandales-plates-a-brides-hover.png",
    href: "/produits/sandales-plates-a-brides",
    badge: null,
  },
  {
    id: 5,
    name: "Mules à Bride Large",
    type: "Mules",
    color: "Marron",
    price: 820,
    image: "/images/sandales/mules-a-bride-large.png",
    hoverImage: "/images/sandales/mules-a-bride-large-hover.png",
    href: "/produits/mules-a-bride-large",
    badge: "Nouveau",
  },
  {
    id: 6,
    name: "Sandales à Talon Sculpté",
    type: "À talon",
    color: "Cognac",
    price: 1050,
    image: "/images/sandales/sandales-a-talon-sculpte.png",
    hoverImage: "/images/sandales/sandales-a-talon-sculpte-hover.png",
    href: "/produits/sandales-a-talon-sculpte",
    badge: "Édition limitée",
  },
];

export default function SandalesPage() {
  const [sortBy, setSortBy] = useState("selection");
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
              <span>Sandales</span>
            </div>

            <span className={styles.eyebrow}>
              Maison Élyra · Fès
            </span>

            <h1>
              L’élégance
              <br />
              <em>à chaque pas.</em>
            </h1>

            <p className={styles.heroText}>
              Des sandales façonnées en cuir véritable, pensées pour
              accompagner vos journées avec légèreté, confort et caractère.
            </p>

            <div className={styles.heroMeta}>
              <span>
                {products.length.toString().padStart(2, "0")} créations
              </span>

              <span>Cuir véritable</span>
              <span>Fabrication artisanale</span>
            </div>
          </div>

          <div className={styles.heroImage} data-aos="fade-in">
            <Image
              src="/images/sandales/hero-sandales.png"
              alt="Collection de sandales Maison Élyra"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 48vw"
            />

            <div className={styles.heroImageOverlay} />

            <span className={styles.imageNumber}>
              Collection 03
            </span>
          </div>

          <span className={styles.watermark} aria-hidden="true">
            ÉLYRA
          </span>
        </section>

        {/* INTRO */}
        <section className={styles.intro} data-aos="fade-up">
          <div className={styles.container}>
            <span className={styles.eyebrow}>
              La collection
            </span>

            <div className={styles.introContent}>
              <h2>
                Entre lignes délicates
                <br />
                et matières naturelles.
              </h2>

              <div className={styles.introText}>
                <p>
                  Talons sculptés, brides tressées et finitions précises
                  donnent naissance à des silhouettes féminines et
                  intemporelles.
                </p>

                <span>
                  Conçues à Fès, portées partout.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* COLLECTION */}
        <section className={styles.collection}>
          <div className={styles.container}>
            <div className={styles.toolbar} data-aos="fade-up">
              <div className={styles.toolbarInfo}>
                <span>Toutes les sandales</span>

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
                    aria-label="Trier les sandales"
                  >
                    <option value="selection">
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
              src="/images/sandales/artisa-sandale.png"
              alt="Fabrication artisanale de sandales en cuir"
              fill
              sizes="(max-width: 900px) 100vw, 52vw"
            />
          </div>

          <div className={styles.editorialContent} data-aos="fade-up">
            <span className={styles.eyebrow}>
              Le détail juste
            </span>

            <h2>
              Marcher doucement,
              <br />
              <em>laisser une empreinte.</em>
            </h2>

            <p>
              Chaque bride est découpée, assemblée et finie à la main.
              Des gestes précis qui donnent à chaque paire son caractère
              unique.
            </p>

            <Link href="/notre-histoire">
              Notre savoir-faire

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