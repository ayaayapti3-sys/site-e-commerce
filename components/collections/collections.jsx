import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from "./collections.module.css";

export default function Collections() {
  return (
    <section id="collections" className={styles.collections} data-aos="fade-up">
      <div className={styles.container}>
        <header className={styles.header} data-aos="fade-up">
          <span className={styles.eyebrow}>Nos collections</span>

          <h2 className={styles.title}>
            Trois univers,
            <br />
            <em>une même exigence.</em>
          </h2>

          <p className={styles.intro}>
            Des pièces en cuir pensées pour durer, façonnées avec soin entre
            héritage artisanal et lignes contemporaines.
          </p>
        </header>

        <div className={styles.gallery}>
          <article className={`${styles.card} ${styles.sideCard}`} data-aos="fade-up">
            <Link href="/sandales" className={styles.cardLink}>
              <div className={styles.imageWrapper}>
                <Image
                  src="/images/collections/sandale.png"
                  alt="Collection de sandales artisanales en cuir"
                  fill
                  sizes="(max-width: 820px) 100vw, 25vw"
                  className={styles.image}
                />
              </div>

              <div className={styles.cardContent}>
                <div>
                  <span className={styles.cardNumber}>01</span>
                  <h3>Sandales</h3>
                  <p>Une élégance légère, pensée pour chaque mouvement.</p>
                </div>

                <span className={styles.cardAction}>
                  Découvrir
                  <ArrowUpRight size={18} strokeWidth={1.5} />
                </span>
              </div>
            </Link>
          </article>

          <article className={`${styles.card} ${styles.mainCard}`} data-aos="fade-up">
            <span className={styles.featured}>Collection signature</span>

            <Link href="/sacs" className={styles.cardLink}>
              <div className={styles.imageWrapper}>
                <Image
                  src="/images/collections/sacs.png"
                  alt="Collection de sacs en cuir artisanaux"
                  fill
                  sizes="(max-width: 820px) 100vw, 38vw"
                  className={styles.image}
                  priority
                />
              </div>

              <div className={styles.cardContent}>
                <div>
                  <span className={styles.cardNumber}>02</span>
                  <h3>Sacs</h3>
                  <p>
                    Des silhouettes intemporelles, façonnées à la main à Fès.
                  </p>
                </div>

                <span className={styles.cardAction}>
                  Explorer
                  <ArrowUpRight size={18} strokeWidth={1.5} />
                </span>
              </div>
            </Link>
          </article>

          <article className={`${styles.card} ${styles.sideCard}`} data-aos="fade-up">
            <Link href="/bottes" className={styles.cardLink}>
              <div className={styles.imageWrapper}>
                <Image
                  src="/images/collections/botte.png"
                  alt="Collection de bottes élégantes en cuir"
                  fill
                  sizes="(max-width: 820px) 100vw, 25vw"
                  className={styles.image}
                />
              </div>

              <div className={styles.cardContent}>
                <div>
                  <span className={styles.cardNumber}>03</span>
                  <h3>Bottes</h3>
                  <p>Des lignes affirmées pour accompagner chaque saison.</p>
                </div>

                <span className={styles.cardAction}>
                  Voir la collection
                  <ArrowUpRight size={18} strokeWidth={1.5} />
                </span>
              </div>
            </Link>
          </article>
        </div>

        <div className={styles.decorativeLine} data-aos="fade-up">
          <span />
          <div className={styles.diamond} />
          <span />
        </div>
      </div>
    </section>
  );
}