"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Star,
} from "lucide-react";
import styles from "./reviews.module.css";

const featuredReviews = [
  {
    id: 1,
    name: "Maha E.",
    city: "Marrakech",
    product: "Sac Amira",
    date: "16 mai 2026",
    text: "Une pièce raffinée et facile à porter. L’emballage était superbe et chaque détail donne vraiment l’impression d’un produit haut de gamme.",
  },
  {
    id: 2,
    name: "Salma R.",
    city: "Casablanca",
    product: "Sandales Lina",
    date: "14 mai 2026",
    text: "Le cuir est souple, les finitions sont très délicates et le modèle reste confortable toute la journée.",
  },
  {
    id: 3,
    name: "Inès A.",
    city: "Rabat",
    product: "Sac Nour",
    date: "12 mai 2026",
    text: "Une création élégante et intemporelle. La qualité se remarque immédiatement, jusque dans les plus petits détails.",
  },
];

const smallReviews = [
  {
    id: 1,
    name: "Sophie L.",
    date: "14 mai 2026",
    text: "Qualité exceptionnelle, je suis ravie.",
  },
  {
    id: 2,
    name: "Yasmine B.",
    date: "12 mai 2026",
    text: "Très beau rendu, finitions impeccables.",
  },
  {
    id: 3,
    name: "Noura K.",
    date: "10 mai 2026",
    text: "Service client attentionné et livraison rapide.",
  },
];

const ratingRows = [
  { rating: 5, percentage: 86 },
  { rating: 4, percentage: 10 },
  { rating: 3, percentage: 3 },
  { rating: 2, percentage: 1 },
  { rating: 1, percentage: 0 },
];

function Stars({ size = 17 }) {
  return (
    <div className={styles.stars} aria-label="5 étoiles">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          strokeWidth={1.8}
          fill="currentColor"
        />
      ))}
    </div>
  );
}

function Verified() {
  return (
    <span className={styles.verified}>
      <BadgeCheck size={17} fill="currentColor" />
      Achat vérifié
    </span>
  );
}

export default function Reviews() {
  const [activeReview, setActiveReview] = useState(0);

  const currentReview = featuredReviews[activeReview];

  const previousReview = () => {
    setActiveReview((current) =>
      current === 0 ? featuredReviews.length - 1 : current - 1
    );
  };

  const nextReview = () => {
    setActiveReview((current) =>
      current === featuredReviews.length - 1 ? 0 : current + 1
    );
  };

  return (
    <section className={styles.reviews} data-aos="fade-up">
      <div className={styles.container}>
        <header className={styles.header} data-aos="fade-up" >
          <div className={styles.headingBlock}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowLine} />
              <span>Vos mots, notre signature</span>
            </div>

            <h2 className={styles.title}>
              L’expérience
              <em>Maison Élyra.</em>
            </h2>
          </div>

          <div className={styles.introduction}>
            <span className={styles.verticalLine} />
            <p>
              Des pièces choisies, portées et racontées par celles qui font
              vivre la maison au quotidien.
            </p>
          </div>
        </header>

        <div className={styles.mainContent}>
          <aside className={styles.ratingPanel} >
            <div className={styles.ratingHeading} data-aos="fade-up" >
              <strong>4.9</strong>

              <div>
                <Stars size={20} />
                <p>
                  Basé sur <b>248 avis vérifiés</b>
                </p>
              </div>
            </div>

            <div className={styles.ratingDetails} data-aos="fade-up">
              {ratingRows.map((item) => (
                <div className={styles.ratingRow} key={item.rating}>
                  <span className={styles.ratingNumber}>{item.rating}</span>

                  <Star
                    className={styles.smallStar}
                    size={15}
                    fill="currentColor"
                  />

                  <div className={styles.ratingBar}>
                    <span
                      style={{
                        width: `${item.percentage}%`,
                      }}
                    />
                  </div>

                  <span className={styles.percentage}>
                    {item.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </aside>

          <article className={styles.featuredReview} data-aos="fade-up">
            <span className={styles.quoteMark}>“</span>

            <blockquote key={currentReview.id}>
              “{currentReview.text}”
            </blockquote>

            <div className={styles.reviewFooter}>
              <div className={styles.customer}>
                <div className={styles.customerTop}>
                  <strong>{currentReview.name}</strong>
                  <Verified />
                </div>

                <span>{currentReview.city}</span>
              </div>

              <div className={styles.product}>
                <strong>{currentReview.product}</strong>
                <span>{currentReview.date}</span>
              </div>
            </div>

            <div className={styles.navigation}>
              <button
                type="button"
                onClick={previousReview}
                aria-label="Avis précédent"
              >
                <ArrowLeft size={28} strokeWidth={1.2} />
              </button>

              <button
                type="button"
                onClick={nextReview}
                aria-label="Avis suivant"
              >
                <ArrowRight size={28} strokeWidth={1.2} />
              </button>
            </div>
          </article>
        </div>

        <div className={styles.smallReviews} data-aos="fade-up">
          {smallReviews.map((review) => (
            <article className={styles.smallReview} key={review.id}>
              <div className={styles.smallReviewHeader}>
                <Stars size={15} />
                <span>{review.date}</span>
              </div>

              <p>{review.text}</p>

              <div className={styles.smallReviewFooter}>
                <strong>{review.name}</strong>
                <Verified />
              </div>
            </article>
          ))}
        </div>

        {/* <a href="/avis" className={styles.allReviews}>
          <span>Voir tous les avis</span>
          <ArrowRight size={25} strokeWidth={1.3} />
        </a> */}
      </div>
    </section>
  );
}