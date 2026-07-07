import styles from "./ticker.module.css";

const items = [
  "CUIR PLEINE FLEUR",
  "FAÇONNÉ À LA MAIN",
  "CONÇU POUR DURER",
  "SAVOIR-FAIRE DE FÈS",
  "TANNAGE VÉGÉTAL",
];

export default function Ticker() {
  return (
    <section className={styles.ticker} aria-label="Valeurs de la marque" data-aos="fade-up">
      <div className={styles.track}>
        <div className={styles.group}>
          {items.map((item, index) => (
            <div className={styles.item} key={`first-${index}`}>
              <span>{item}</span>
              <span className={styles.dot}>•</span>
            </div>
          ))}
        </div>

        <div className={styles.group} aria-hidden="true">
          {items.map((item, index) => (
            <div className={styles.item} key={`second-${index}`}>
              <span>{item}</span>
              <span className={styles.dot}>•</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}