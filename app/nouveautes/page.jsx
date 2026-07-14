"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ChevronDown,
  Heart,
  SlidersHorizontal,
  X,
} from "lucide-react";

import Header from "@/components/header/header";
import styles from "./nouveautes.module.css";
import { useFavorites } from "@/context/favorites-context";
import Footer from "@/components/footer/footer";

const products = [
  {
    id: 1,
    name: "Sac Box Structuré",
    category: "Sacs",
    color: "Cognac",
    price: 1290,
    image: "/images/products/sac-box-structure.png",
    hoverImage: "/images/products/sac-box-structure-hover.png",
    href: "/produits/sac-box-structure",
    badge: "Nouveau",
  },
  {
    id: 2,
    name: "Sandales Tressées en Cuir",
    category: "Sandales",
    color: "Noir",
    price: 790,
    image: "/images/products/sandales-tressees-en-cuir.png",
    hoverImage: "/images/products/sandales-tressees-en-cuir-hover.png",
    href: "/produits/sandales-tressees-en-cuir",
    badge: "Nouveau",
  },
  {
    id: 3,
    name: "Sac Baguette Épaule",
    category: "Sacs",
    color: "Bordeaux",
    price: 1390,
    image: "/images/products/sac-baguette-epaule.png",
    hoverImage: "/images/products/sac-baguette-epaule-hover.png",
    href: "/produits/sac-baguette-epaule",
    badge: "Exclusivité",
  },
  {
    id: 4,
    name: "Bottines à Talon Carré",
    category: "Bottes",
    color: "Marron",
    price: 1190,
    image: "/images/products/bottines-a-talon-carre.png",
    hoverImage: "/images/products/bottines-a-talon-carre-hover.png",
    href: "/produits/bottines-a-talon-carre",
    badge: "Nouveau",
  },
  {
    id: 5,
    name: "Sac Hobo Souple",
    category: "Sacs",
    color: "Beige",
    price: 1490,
    image: "/images/products/sac-hobo-souple.png",
    hoverImage: "/images/products/sac-hobo-souple-hover.png",
    href: "/produits/sac-hobo-souple",
    badge: "Nouveau",
  },
  {
    id: 6,
    name: "Mules à Bride Large",
    category: "Sandales",
    color: "Cognac",
    price: 820,
    image: "/images/products/mules-a-bride-large.png",
    hoverImage: "/images/products/mules-a-bride-large-hover.png",
    href: "/produits/mules-a-bride-large",
    badge: "Nouveau",
  },
  {
    id: 7,
    name: "Sac Docteur à Fermoir",
    category: "Sacs",
    color: "Noir",
    price: 1590,
    image: "/images/products/sac-docteur-a-fermoir.png",
    hoverImage: "/images/products/sac-docteur-a-fermoir-hover.png",
    href: "/produits/sac-docteur-a-fermoir",
    badge: "Édition limitée",
  },
  {
    id: 8,
    name: "Bottines Chelsea",
    category: "Bottes",
    color: "Bordeaux",
    price: 1250,
    image: "/images/products/bottines-chelsea.png",
    hoverImage: "/images/products/bottines-chelsea-hover.png",
    href: "/produits/bottines-chelsea",
    badge: "Nouveau",
  },
];

const categories = ["Tous", "Sacs", "Sandales", "Bottes"];

const colors = [
  { name: "Tous", value: "Tous" },
  { name: "Noir", value: "Noir" },
  { name: "Cognac", value: "Cognac" },
  { name: "Bordeaux", value: "Bordeaux" },
  { name: "Marron", value: "Marron" },
  { name: "Beige", value: "Beige" },
];

export default function NouveautesPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedColor, setSelectedColor] = useState("Tous");
  const [sortBy, setSortBy] = useState("newest");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { toggleFavorite, isFavorite } = useFavorites();
  // const [favorites, setFavorites] = useState([]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== "Tous") {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (selectedColor !== "Tous") {
      result = result.filter(
        (product) => product.color === selectedColor
      );
    }

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [selectedCategory, selectedColor, sortBy]);


  function resetFilters() {
    setSelectedCategory("Tous");
    setSelectedColor("Tous");
    setSortBy("newest");
  }

  return (
    <>
      <Header />

      <main className={styles.page} data-aos="fade-up">
        {/* HERO */}
        <section className={styles.hero}>
          <div className={styles.heroDecoration} aria-hidden="true" data-aos="fade-up">
            ÉLYRA
          </div>

          <div className={styles.heroInner} data-aos="fade-up">
            <div className={styles.breadcrumb}>
              <Link href="/">Accueil</Link>
              <span>/</span>
              <span>Nouveautés</span>
            </div>

            <div className={styles.heroContent} data-aos="fade-up">
              <div>
                <span className={styles.eyebrow}>
                  La nouvelle collection
                </span>

                <h1 data-aos="fade-up">
                  Les dernières
                  <br />
                  <em>créations Élyra</em>
                </h1>
              </div>

              <div className={styles.heroDescription} data-aos="fade-up">
                <p>
                  Découvrez nos nouvelles pièces en cuir, façonnées avec
                  patience dans nos ateliers à Fès.
                </p>

                <span className={styles.productCount}>
                  {products.length.toString().padStart(2, "0")} pièces
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* COLLECTION */}
        <section className={styles.collection}>
          <div className={styles.collectionInner}>
            <div className={styles.toolbar} data-aos="fade-up">
              <button
                type="button"
                className={styles.filterButton}
                onClick={() => setFiltersOpen(true)}
              >
                <SlidersHorizontal size={17} strokeWidth={1.5} />
                Filtrer
              </button>

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

              <div className={styles.sortWrapper}>
                <label htmlFor="sort">Trier par</label>

                <div className={styles.selectContainer}>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value)}
                  >
                    <option value="newest">Nouveautés</option>
                    <option value="price-low">Prix croissant</option>
                    <option value="price-high">Prix décroissant</option>
                    <option value="name">Nom A–Z</option>
                  </select>

                  <ChevronDown size={15} strokeWidth={1.5} />
                </div>
              </div>
            </div>

            <div className={styles.resultsHeader}>
              <p>
                <strong>{filteredProducts.length}</strong>{" "}
                {filteredProducts.length > 1 ? "produits" : "produit"}
              </p>

              {(selectedCategory !== "Tous" ||
                selectedColor !== "Tous") && (
                  <button type="button" onClick={resetFilters}>
                    Réinitialiser les filtres
                  </button>
                )}
            </div>

            {filteredProducts.length > 0 ? (
              <div className={styles.productGrid}>
                {filteredProducts.map((product, index) => {
                  const productIsFavorite = isFavorite(product.href);

                  return (
                    <article
                      className={styles.productCard}
                      key={product.id}
                      data-aos="fade-up"
                    >
                      <div className={styles.imageContainer}>
                        <Link
                          href={product.href}
                          className={styles.imageLink}
                        >
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="(max-width: 600px) 50vw, (max-width: 1000px) 50vw, 25vw"
                            className={`${styles.productImage} ${styles.mainImage}`}
                          />

                          <Image
                            src={product.hoverImage}
                            alt={`${product.name} - vue alternative`}
                            fill
                            sizes="(max-width: 600px) 50vw, (max-width: 1000px) 50vw, 25vw"
                            className={`${styles.productImage} ${styles.hoverImage}`}
                          />
                        </Link>

                        {product.badge && (
                          <span className={styles.badge}>
                            {product.badge}
                          </span>
                        )}

                        <span className={styles.productNumber}>
                          {(index + 1).toString().padStart(2, "0")}
                        </span>

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
                            size={18}
                            strokeWidth={1.5}
                            fill={productIsFavorite ? "currentColor" : "none"}
                          />
                        </button>

                        <Link
                          href={product.href}
                          className={styles.discoverButton}
                        >
                          Voir le produit
                          <ArrowUpRight size={16} strokeWidth={1.5} />
                        </Link>
                      </div>

                      <div className={styles.productInfo}>
                        <div>
                          <span className={styles.productCategory}>
                            {product.category}
                          </span>

                          <h2>
                            <Link href={product.href}>
                              {product.name}
                            </Link>
                          </h2>
                        </div>

                        <span className={styles.price}>
                          {product.price.toLocaleString("fr-FR")} MAD
                        </span>
                      </div>

                      <span className={styles.productColor}>
                        {product.color}
                      </span>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <span>Maison Élyra</span>

                <h2>
                  Aucun produit ne correspond à votre sélection.
                </h2>

                <button type="button" onClick={resetFilters}>
                  Voir toute la collection
                </button>
              </div>
            )}
          </div>
        </section>

        {/* EDITORIAL */}
        <section className={styles.editorial} data-aos="fade-up">
          <div className={styles.editorialImage} data-aos="fade-in">
            <Image
              src="/images/collections/nouveautes-editorial.png"
              alt="Création artisanale Maison Élyra"
              fill
              sizes="(max-width: 900px) 100vw, 55vw"
            />
          </div>

          <div className={styles.editorialContent} data-aos="fade-up">
            <span className={styles.eyebrow}>
              Le geste artisanal
            </span>

            <h2>
              Conçues lentement,
              <br />
              <em>pensées pour durer.</em>
            </h2>

            <p>
              Chaque pièce passe entre les mains de nos artisans, du choix
              du cuir jusqu’aux dernières finitions.
            </p>

            <Link href="/notre-histoire">
              Découvrir notre histoire
              <ArrowUpRight size={17} strokeWidth={1.5} />
            </Link>
          </div>
        </section>
      </main>

      {/* PANNEAU FILTRES */}
      <aside
        className={
          filtersOpen
            ? `${styles.filterPanel} ${styles.filterPanelOpen}`
            : styles.filterPanel
        }
        aria-hidden={!filtersOpen}
      >
        <div className={styles.filterPanelHeader}>
          <div>
            <span>Maison Élyra</span>
            <h2>Filtres</h2>
          </div>

          <button
            type="button"
            onClick={() => setFiltersOpen(false)}
            aria-label="Fermer les filtres"
          >
            <X size={22} strokeWidth={1.4} />
          </button>
        </div>

        <div className={styles.filterGroup}>
          <h3>Catégories</h3>

          <div className={styles.filterOptions}>
            {categories.map((category) => (
              <label key={category}>
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === category}
                  onChange={() => setSelectedCategory(category)}
                />

                <span>{category}</span>
              </label>
            ))}
          </div>
        </div>

        <div className={styles.filterGroup}>
          <h3>Couleurs</h3>

          <div className={styles.colorOptions}>
            {colors.map((color) => (
              <button
                key={color.value}
                type="button"
                className={
                  selectedColor === color.value
                    ? `${styles.colorButton} ${styles.activeColorButton}`
                    : styles.colorButton
                }
                onClick={() => setSelectedColor(color.value)}
              >
                <span
                  className={`${styles.colorCircle} ${styles[`color${color.value}`] || styles.colorTous
                    }`}
                />

                {color.name}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.filterPanelFooter}>
          <button type="button" onClick={resetFilters}>
            Réinitialiser
          </button>

          <button
            type="button"
            onClick={() => setFiltersOpen(false)}
          >
            Voir {filteredProducts.length} produits
          </button>
        </div>
      </aside>

      {filtersOpen && (
        <button
          type="button"
          className={styles.overlay}
          onClick={() => setFiltersOpen(false)}
          aria-label="Fermer les filtres"
        />
      )}

      <Footer />
    </>
  );
}