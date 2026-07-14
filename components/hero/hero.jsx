import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import styles from "./hero.module.css";
import { motion } from "motion/react";

export function Hero() {
  return (
    <section className={styles.hero} data-aos="fade-up">
      <Image
        src="/images/hero.png"
        alt="Sac et sandales Chouara en cuir, posés sur un socle en pierre"
        className={styles.img}
        fill
        priority
        sizes="100vw"

      />
      <div className={styles.imagePanel}>
      </div>
      {/* <span className={styles.watermark} aria-hidden="true">
        C
      </span> */}

      <div className={styles.content}>
        <div className={styles.eyebrowRow} data-aos="fade-up">
          <p className={styles.eyebrow}>Nouvelle collection</p>
          <span className={styles.eyebrowLine} />
        </div>

        <h1 className={styles.title} data-aos="fade-up">
          L&apos;élégance,
          <br />
          façonnée
          <br />
          <span className={styles.titleAccent}>lentement.</span>
        </h1>

        <div className={styles.divider} data-aos="fade-up">
          <span className={styles.diamond} />
          <span className={styles.dividerLine} />
        </div>

        <p className={styles.description} data-aos="fade-up">
          Des sacs et souliers en cuir de Fès, façonnés à la main pour
          accompagner chaque mouvement et traverser les saisons.
        </p>

        <div className={styles.actions} data-aos="fade-up">
          <Link href="/products" className={styles.primaryButton}>
            Découvrir la collection
            <ArrowRight size={16} />
          </Link>

          <Link href="/about" className={styles.secondaryButton}>
            Explorer notre savoir-faire
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}