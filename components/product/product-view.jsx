"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer/footer";

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Heart,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";

import { useCart } from "@/context/cart-context";
import { useFavorites } from "@/context/favorites-context";
import styles from "./product-view.module.css";

function getCategoryLink(category = "") {
  const normalizedCategory = category.toLowerCase();

  if (normalizedCategory.includes("sac")) {
    return "/sacs";
  }

  if (
    normalizedCategory.includes("sandale") ||
    normalizedCategory.includes("mule")
  ) {
    return "/sandales";
  }

  if (
    normalizedCategory.includes("botte") ||
    normalizedCategory.includes("bottine")
  ) {
    return "/bottes";
  }

  return "/nouveautes";
}

function isShoeProduct(product) {
  const productText = [
    product.name,
    product.category,
    product.type,
    product.style,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return [
    "sandale",
    "mule",
    "botte",
    "bottine",
    "chaussure",
  ].some((word) => productText.includes(word));
}

export default function ProductView({
  product,
  relatedProducts = [],
}) {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const gallery = useMemo(() => {
    if (
      Array.isArray(product.images) &&
      product.images.length > 0
    ) {
      return product.images.filter(Boolean);
    }

    return [
      product.image,
      product.hoverImage,
    ].filter(Boolean);
  }, [product]);

  const colors = useMemo(() => {
    if (
      Array.isArray(product.colors) &&
      product.colors.length > 0
    ) {
      return product.colors;
    }

    return product.color ? [product.color] : [];
  }, [product]);

  const sizes = useMemo(() => {
    if (
      Array.isArray(product.sizes) &&
      product.sizes.length > 0
    ) {
      return product.sizes;
    }

    return isShoeProduct(product)
      ? [36, 37, 38, 39, 40]
      : [];
  }, [product]);

  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    colors[0] || ""
  );
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  const productIsFavorite = isFavorite(product.href);
  const categoryLink = getCategoryLink(product.category);

  function showPreviousImage() {
    setActiveImage((currentIndex) =>
      currentIndex === 0
        ? gallery.length - 1
        : currentIndex - 1
    );
  }

  function showNextImage() {
    setActiveImage((currentIndex) =>
      currentIndex === gallery.length - 1
        ? 0
        : currentIndex + 1
    );
  }

  function selectSize(size) {
    setSelectedSize(size);
    setSizeError(false);
  }

  function handleAddToCart() {
    if (sizes.length > 0 && !selectedSize) {
      setSizeError(true);
      return;
    }

    const configuredProduct = {
      ...product,
      selectedColor,
      selectedSize,
    };

    for (let index = 0; index < quantity; index += 1) {
      addToCart(configuredProduct);
    }

    setAdded(true);

    window.setTimeout(() => {
      setAdded(false);
    }, 1800);
  }

  return (
    <main className={styles.page} data-aos="fade-up">
      {/* BREADCRUMB */}
      <section className={styles.breadcrumbSection}>
        <div className={styles.container} data-aos="fade-up">
          <nav className={styles.breadcrumb}>
            <Link href="/">Accueil</Link>

            <span>/</span>

            <Link href={categoryLink}>
              {product.category || "Collection"}
            </Link>

            <span>/</span>

            <span>{product.name}</span>
          </nav>
        </div>
      </section>

      {/* PRODUIT */}
      <section className={styles.productSection}>
        <div className={styles.container}>
          <div className={styles.productLayout}>
            {/* GALERIE */}
            <div className={styles.gallery}>
              <div className={styles.galleryInner}>
                {gallery.length > 1 && (
                  <div className={styles.thumbnails} data-aos="fade-in">
                    {gallery.map((image, index) => (
                      <button
                        type="button"
                        key={`${image}-${index}`}
                        className={
                          activeImage === index
                            ? `${styles.thumbnail} ${styles.activeThumbnail}`
                            : styles.thumbnail
                        }
                        onClick={() => setActiveImage(index)}
                        aria-label={`Afficher l’image ${index + 1}`}
                      >
                        <Image
                          src={image}
                          alt={`${product.name} vue ${index + 1}`}
                          fill
                          sizes="90px"
                        />
                      </button>
                    ))}
                  </div>
                )}

                <div className={styles.mainVisual} data-aos="fade-up">
                  {product.badge && (
                    <span className={styles.badge}>
                      {product.badge}
                    </span>
                  )}

                  {gallery.length > 0 && (
                    <span className={styles.imageCounter}>
                      {(activeImage + 1)
                        .toString()
                        .padStart(2, "0")}
                      {" / "}
                      {gallery.length
                        .toString()
                        .padStart(2, "0")}
                    </span>
                  )}

                  {gallery[activeImage] ? (
                    <Image
                      key={gallery[activeImage]}
                      src={gallery[activeImage]}
                      alt={product.name}
                      fill
                      priority
                      sizes="(max-width: 900px) 100vw, 55vw"
                      className={styles.mainImage}
                    />
                  ) : (
                    <div className={styles.imagePlaceholder}>
                      <span>Maison Élyra</span>
                      <p>Image indisponible</p>
                    </div>
                  )}

                  {gallery.length > 1 && (
                    <div className={styles.galleryNavigation}>
                      <button
                        type="button"
                        onClick={showPreviousImage}
                        aria-label="Image précédente"
                      >
                        <ArrowLeft
                          size={17}
                          strokeWidth={1.4}
                        />
                      </button>

                      <button
                        type="button"
                        onClick={showNextImage}
                        aria-label="Image suivante"
                      >
                        <ArrowRight
                          size={17}
                          strokeWidth={1.4}
                        />
                      </button>
                    </div>
                  )}

                  <span
                    className={styles.visualWatermark}
                    aria-hidden="true"
                  >
                    ÉLYRA
                  </span>
                </div>
              </div>
            </div>

            {/* INFORMATIONS */}
            <div className={styles.productInformation} data-aos="fade-up">
              <div className={styles.productHeading}>
                <div className={styles.headingTop}>
                  <span className={styles.eyebrow}>
                    {product.category || "Maison Élyra"}
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
                      size={20}
                      strokeWidth={1.4}
                      fill={
                        productIsFavorite
                          ? "currentColor"
                          : "none"
                      }
                    />
                  </button>
                </div>

                <h1 data-aos="fade-up">{product.name}</h1>

                <div className={styles.referenceRow}>
                  <span>
                    {product.type ||
                      product.style ||
                      "Création artisanale"}
                  </span>

                  <span>
                    Réf. ÉLYRA-
                    {String(product.id || 1).padStart(3, "0")}
                  </span>
                </div>

                <p className={styles.price}>
                  {Number(product.price).toLocaleString(
                    "fr-FR"
                  )}{" "}
                  MAD
                </p>
              </div>

              <div className={styles.divider} />

              <p className={styles.shortDescription}>
                {product.description ||
                  "Une création façonnée en cuir véritable, pensée pour conjuguer élégance, confort et durabilité."}
              </p>

              {/* COULEURS */}
              {colors.length > 0 && (
                <div className={styles.optionGroup}>
                  <div className={styles.optionHeader}>
                    <span>Couleur</span>
                    <strong>{selectedColor}</strong>
                  </div>

                  <div className={styles.colorOptions}>
                    {colors.map((color) => (
                      <button
                        type="button"
                        key={color}
                        className={
                          selectedColor === color
                            ? `${styles.colorOption} ${styles.selectedColor}`
                            : styles.colorOption
                        }
                        onClick={() =>
                          setSelectedColor(color)
                        }
                      >
                        <span
                          className={styles.colorDot}
                          data-color={color.toLowerCase()}
                        />

                        <span>{color}</span>

                        {selectedColor === color && (
                          <Check
                            size={13}
                            strokeWidth={1.7}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* POINTURES */}
              {sizes.length > 0 && (
                <div className={styles.optionGroup}>
                  <div className={styles.optionHeader}>
                    <span>Pointure</span>

                    <button type="button">
                      Guide des tailles
                      <ArrowUpRight
                        size={13}
                        strokeWidth={1.5}
                      />
                    </button>
                  </div>

                  <div className={styles.sizeOptions}>
                    {sizes.map((size) => (
                      <button
                        type="button"
                        key={size}
                        className={
                          selectedSize === size
                            ? `${styles.sizeButton} ${styles.selectedSize}`
                            : styles.sizeButton
                        }
                        onClick={() => selectSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>

                  {sizeError && (
                    <p className={styles.sizeMessage}>
                      Sélectionnez votre pointure avant
                      l’ajout au panier.
                    </p>
                  )}
                </div>
              )}

              {/* AJOUT AU PANIER */}
              <div className={styles.purchaseRow}>
                <div className={styles.quantity}>
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((currentQuantity) =>
                        Math.max(1, currentQuantity - 1)
                      )
                    }
                    aria-label="Diminuer la quantité"
                  >
                    <Minus size={15} strokeWidth={1.5} />
                  </button>

                  <span>{quantity}</span>

                  <button
                    type="button"
                    onClick={() =>
                      setQuantity(
                        (currentQuantity) =>
                          currentQuantity + 1
                      )
                    }
                    aria-label="Augmenter la quantité"
                  >
                    <Plus size={15} strokeWidth={1.5} />
                  </button>
                </div>

                <button
                  type="button"
                  className={
                    added
                      ? `${styles.addButton} ${styles.addedButton}`
                      : styles.addButton
                  }
                  onClick={handleAddToCart}
                >
                  {added ? (
                    <>
                      <Check
                        size={18}
                        strokeWidth={1.7}
                      />

                      <span>Ajouté au panier</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag
                        size={18}
                        strokeWidth={1.4}
                      />

                      <span>Ajouter au panier</span>

                      <strong>
                        {(
                          Number(product.price) * quantity
                        ).toLocaleString("fr-FR")}{" "}
                        MAD
                      </strong>
                    </>
                  )}
                </button>
              </div>

              {/* RÉASSURANCE */}
              <div className={styles.reassurance}>
                <div>
                  <Truck size={20} strokeWidth={1.3} />

                  <span>
                    <strong>Livraison suivie</strong>
                    Partout au Maroc
                  </span>
                </div>

                <div>
                  <RotateCcw
                    size={19}
                    strokeWidth={1.3}
                  />

                  <span>
                    <strong>Retours faciles</strong>
                    Sous 14 jours
                  </span>
                </div>

                <div>
                  <ShieldCheck
                    size={20}
                    strokeWidth={1.3}
                  />

                  <span>
                    <strong>Paiement sécurisé</strong>
                    Données protégées
                  </span>
                </div>
              </div>

              {/* INFORMATIONS */}
              <div className={styles.details} data-aos="fade-up">
                <details open>
                  <summary>
                    Description
                    <ChevronDown
                      size={17}
                      strokeWidth={1.4}
                    />
                  </summary>

                  <div>
                    <p>
                      {product.longDescription ||
                        product.description ||
                        "Cette création Maison Élyra associe une silhouette intemporelle à des finitions réalisées avec précision."}
                    </p>
                  </div>
                </details>

                <details>
                  <summary>
                    Matières et fabrication
                    <ChevronDown
                      size={17}
                      strokeWidth={1.4}
                    />
                  </summary>

                  <div>
                    <p>
                      {product.materials ||
                        "Cuir véritable soigneusement sélectionné. Découpe, assemblage et finitions réalisés dans nos ateliers à Fès."}
                    </p>
                  </div>
                </details>

                <details>
                  <summary>
                    Conseils d’entretien
                    <ChevronDown
                      size={17}
                      strokeWidth={1.4}
                    />
                  </summary>

                  <div>
                    <p>
                      {product.care ||
                        "Nettoyez délicatement avec un chiffon doux et sec. Évitez l’humidité prolongée et conservez la pièce dans sa housse."}
                    </p>
                  </div>
                </details>

                <details>
                  <summary>
                    Livraison et retours
                    <ChevronDown
                      size={17}
                      strokeWidth={1.4}
                    />
                  </summary>

                  <div>
                    <p>
                      Livraison disponible partout au Maroc.
                      Les conditions détaillées sont disponibles
                      sur notre page Livraison & Retours.
                    </p>

                    <Link href="/livraison-retours">
                      Voir les conditions
                      <ArrowUpRight
                        size={14}
                        strokeWidth={1.5}
                      />
                    </Link>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION MATIÈRE */}
      <section className={styles.materialSection}>
        <div className={styles.container} data-aos="fade-up">
          <div className={styles.materialFlex}>
            <span className={styles.materialNumber}>
              01
            </span>

            <h2>
              Le cuir comme matière,
              <br />
              <em>le geste comme signature.</em>
            </h2>

            <p>
              Chaque création est façonnée lentement afin de
              révéler la beauté naturelle du cuir et de garantir
              une pièce durable.
            </p>
          </div>
        </div>
      </section>

      {/* PRODUITS SIMILAIRES */}
      {relatedProducts.length > 0 && (
        <section className={styles.relatedSection} data-aos="fade-up">
          <div className={styles.container}>
            <div className={styles.relatedHeader} data-aos="fade-up">
              <div>
                <span className={styles.eyebrow}>
                  À découvrir aussi
                </span>

                <h2>Vous aimerez peut-être</h2>
              </div>

              <Link href={categoryLink}>
                Voir la collection
                <ArrowUpRight
                  size={17}
                  strokeWidth={1.5}
                />
              </Link>
            </div>

            <div className={styles.relatedFlex} >
              {relatedProducts.map((relatedProduct) => (
                <article
                  className={styles.relatedCard}
                  key={relatedProduct.href}
                  data-aos="fade-up"
                >
                  <Link
                    href={relatedProduct.href}
                    className={styles.relatedVisual}
                  >
                    {relatedProduct.image ? (
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        fill
                        sizes="(max-width: 650px) 50vw, 33vw"
                      />
                    ) : (
                      <div
                        className={
                          styles.relatedPlaceholder
                        }
                      >
                        Maison Élyra
                      </div>
                    )}

                    <span>Découvrir</span>
                  </Link>

                  <div className={styles.relatedInfo}>
                    <div>
                      <small>
                        {relatedProduct.type ||
                          relatedProduct.style ||
                          relatedProduct.category}
                      </small>

                      <h3>
                        <Link href={relatedProduct.href}>
                          {relatedProduct.name}
                        </Link>
                      </h3>
                    </div>

                    <strong>
                      {Number(
                        relatedProduct.price
                      ).toLocaleString("fr-FR")}{" "}
                      MAD
                    </strong>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
      <Footer />
    </main>

    
  );
}