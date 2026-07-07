import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import styles from "./bestsellers.module.css";

const products = [
  {
    id: 1,
    name: "Sandales tressées à boucle",
    category: "Sandales plates en cuir",
    price: "890 MAD",
    oldPrice: null,
    badge: "BESTSELLER",
    badgeType: "bestseller",

    image: "/images/bestsellers/san-boucle.png",
    hoverImage: "/images/bestsellers/hovv-oucle.png",

    href: "/products/sandales-tressees-a-boucle",
    colors: ["#7f3f26", "#c39a6b", "#211c19"],
  },
  {
    id: 2,
    name: "Sac structuré à fermoir",
    category: "Sac à main en cuir",
    price: "1 490 MAD",
    oldPrice: null,
    badge: "NEW",
    badgeType: "new",

    image: "/images/bestsellers/sac.png",
    hoverImage: "/images/bestsellers/sac-hover.png",

    href: "/products/sac-structure-a-fermoir",
    colors: ["#b8a38d", "#7c4c32", "#2f241f"],
  },
  {
    id: 3,
    name: "Bottines à talon carré",
    category: "Bottines en cuir",
    price: "1 190 MAD",
    oldPrice: "1 490 MAD",
    badge: "BESTSELLER",
    badgeType: "bestseller",

    image: "/images/bestsellers/bottines-talon.png",
    hoverImage: "/images/bestsellers/bottine-talon-carre-hover.png",

    href: "/products/bottines-a-talon-carre",
    colors: ["#721522", "#2a211d"],
  },
  {
    id: 4,
    name: "Sac hobo grainé",
    category: "Sac porté épaule en cuir",
    price: "1 690 MAD",
    oldPrice: null,
    badge: "SALE",
    badgeType: "sale",

    image: "/images/bestsellers/sac-hobo-graine.png",
    hoverImage: "/images/bestsellers/sac-hobo-graine-hover.png",

    href: "/products/sac-hobo-graine",
    colors: ["#8c1724", "#8a5638", "#25201d"],
  },
];

export default function Bestsellers() {
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
          {products.map((product) => (
            <article className={styles.productCard} key={product.id} data-aos="fade-up">
              <div className={styles.imageWrapper}>
                <Link href={product.href} className={styles.imageLink}>
                  {/* Image principale */}

                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 620px) 100vw, (max-width: 1000px) 50vw, 25vw"
                    className={`${styles.productImage} ${styles.mainImage}`}
                  />

                  {/* Image affichée au hover */}

                  <Image
                    src={product.hoverImage}
                    alt={`${product.name} - deuxième vue`}
                    fill
                    sizes="(max-width: 620px) 100vw, (max-width: 1000px) 50vw, 25vw"
                    className={`${styles.productImage} ${styles.hoverImage}`}
                  />
                </Link>

                <span
                  className={`${styles.badge} ${
                    styles[product.badgeType]
                  }`}
                >
                  {product.badge}
                </span>

                <button
                  type="button"
                  className={styles.favoriteButton}
                  aria-label={`Ajouter ${product.name} aux favoris`}
                >
                  <Heart size={19} strokeWidth={1.5} />
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
                </div>

                <div className={styles.prices}>
                  <span className={styles.price}>
                    {product.price}
                  </span>

                  {product.oldPrice && (
                    <span className={styles.oldPrice}>
                      {product.oldPrice}
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}