"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from "./promo-offer.module.css";

const DAY = 24 * 60 * 60 * 1000;

function getRemainingTime(endDate) {
  const difference = endDate.getTime() - Date.now();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      expired: true,
    };
  }

  return {
    days: Math.floor(difference / DAY),
    hours: Math.floor((difference / (60 * 60 * 1000)) % 24),
    minutes: Math.floor((difference / (60 * 1000)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    expired: false,
  };
}

function formatNumber(number) {
  return String(number).padStart(2, "0");
}

export default function PromoOffer() {
  const endDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 6);
    date.setHours(23, 59, 59, 999);

    return date;
  }, []);

  const [remainingTime, setRemainingTime] = useState(() =>
    getRemainingTime(endDate)
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRemainingTime(getRemainingTime(endDate));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [endDate]);

  const countdownItems = [
    {
      value: remainingTime.days,
      label: "Jours",
    },
    {
      value: remainingTime.hours,
      label: "Heures",
    },
    {
      value: remainingTime.minutes,
      label: "Minutes",
    },
    {
      value: remainingTime.seconds,
      label: "Secondes",
    },
  ];

  return (
    <section className={styles.promo} data-aos="fade-up">
      <div className={styles.container} data-aos="fade-up">
        <div className={styles.imageSide}>
          <Image
            src="/images/promo/promo-offer.png"
            alt="Sélection de sacs et chaussures en cuir Maison Élyra"
            fill
            priority={false}
            sizes="(max-width: 820px) 100vw, 50vw"
            className={`${styles.image} ${styles.imageDefault}`}
          />

          <Image
            src="/images/promo/promo-offer-hover.png"
            alt="Collection de sacs, chaussures et accessoires en cuir"
            fill
            priority={false}
            sizes="(max-width: 820px) 100vw, 50vw"
            className={`${styles.image} ${styles.imageHover}`}
          />

          <div className={styles.imageOverlay} />

          <div className={styles.imageLabel}>
            <span>Édition limitée</span>
            <strong>Maison Élyra</strong>
          </div>
        </div>

        <div className={styles.contentSide}> data-aos="fade-up"
          <div className={styles.content} data-aos="fade-up"s>
            <div className={styles.eyebrowRow}>
              <span className={styles.eyebrow}>Offre privée</span>
              <span className={styles.eyebrowLine} />
            </div>

            <p className={styles.discount}>-20%</p>

            <h2 className={styles.title}>
              Une sélection pensée
              <br />
              pour durer.
            </h2>

            <p className={styles.description}>
              Profitez de 20% de réduction sur une sélection de pièces en cuir
              façonnées avec soin.
            </p>

            <div
              className={styles.countdown}
              aria-label="Temps restant avant la fin de l’offre"
            >
              {countdownItems.map((item, index) => (
                <div className={styles.countdownGroup} key={item.label}>
                  <div className={styles.countdownItem}>
                    <span className={styles.countdownValue}>
                      {formatNumber(item.value)}
                    </span>

                    <span className={styles.countdownLabel}>{item.label}</span>
                  </div>

                  {index < countdownItems.length - 1 && (
                    <span className={styles.separator}>:</span>
                  )}
                </div>
              ))}
            </div>

            {remainingTime.expired ? (
              <p className={styles.expiredMessage}>
                Cette offre est maintenant terminée.
              </p>
            ) : (
              <>
                <Link href="/offres" className={styles.button}>
                  Découvrir la sélection
                  <ArrowUpRight size={17} strokeWidth={1.6} />
                </Link>

                <p className={styles.note}>
                  Offre appliquée automatiquement au panier.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}