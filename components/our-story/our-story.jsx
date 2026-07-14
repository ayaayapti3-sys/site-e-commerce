import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from "./our-story.module.css";

const values = [
  {
    number: "01",
    title: "Façonné à Fès",
  },
  {
    number: "02",
    title: "Cuir sélectionné",
  },
  {
    number: "03",
    title: "Pensé pour durer",
  },
];

export default function OurStory() {
  return (
    <section className={styles.story} id="notre-histoire" data-aos="fade-up">
      <div className={styles.container}>
        <div className={styles.visualSide}>
          <div className={styles.mainImage} data-aos="fade-up">
            <Image
              src="/images/story/story-main.png"
              alt="L’univers artisanal de Maison Élyra"
              fill
              sizes="(max-width: 850px) 100vw, 55vw"
              className={styles.image}
            />

            <div className={styles.imageLabel} data-aos="fade-up">
              <span>Depuis Fès</span>
              <strong>Maison Élyra</strong>
            </div>
          </div>

          <div className={styles.secondaryImage} data-aos="fade-up">
            <Image
              src="/images/story/story-detail.png"
              alt="Détail d’un sac en cuir Maison Élyra"
              fill
              sizes="(max-width: 850px) 42vw, 20vw"
              className={styles.image}
            />
          </div>
        </div>

        <div className={styles.contentSide} data-aos="fade-up">
          <div className={styles.eyebrowRow}  >
            <span className={styles.line} />
            <p className={styles.eyebrow}>Notre histoire</p>
          </div>

          <h2 className={styles.title}>
            Une maison née
            <br />
            du geste et de
            <br />
            <em>la matière.</em>
          </h2>

          <p className={styles.description}>
            Maison Élyra célèbre un cuir choisi avec exigence et travaillé avec
            patience. Chaque pièce est imaginée comme un objet du quotidien,
            capable de traverser les saisons sans perdre son caractère.
          </p>

          <blockquote className={styles.quote}>
            “Créer moins, mais créer des pièces que l’on garde longtemps.”
          </blockquote>

          <Link href="/savoir-faire" className={styles.link}>
            Découvrir notre savoir-faire
            <ArrowUpRight size={17} strokeWidth={1.5} />
          </Link>
        </div>
      </div>

      <div className={styles.values} data-aos="fade-in">
        {values.map((value) => (
          <div className={styles.valueItem} key={value.number}>
            <span>{value.number}</span>
            <p>{value.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}