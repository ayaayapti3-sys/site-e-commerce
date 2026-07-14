import Header from "@/components/header/header";
import styles from "./livraison-retours.module.css";
import Footer from "@/components/footer/footer";
import {
  Truck,
  PackageCheck,
  RotateCcw,
  Clock3,
  MessageCircle,
  Check,
  ArrowUpRight,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Commande confirmée",
    text: "Après validation, votre commande est préparée avec attention dans notre atelier.",
  },
  {
    number: "02",
    title: "Préparation soignée",
    text: "Chaque pièce est vérifiée, protégée et emballée avant l’expédition.",
  },
  {
    number: "03",
    title: "Livraison suivie",
    text: "Votre commande est confiée à notre service de livraison partout au Maroc.",
  },
];

const policies = [
  {
    icon: Truck,
    title: "Livraison partout au Maroc",
    text: "Nous livrons vos commandes dans plusieurs villes du Maroc avec un service fiable.",
  },
  {
    icon: Clock3,
    title: "Délais estimés",
    text: "La livraison prend généralement entre 2 et 5 jours ouvrés selon votre ville.",
  },
  {
    icon: PackageCheck,
    title: "Article contrôlé",
    text: "Chaque produit est inspecté avant son emballage pour garantir une réception soignée.",
  },
  {
    icon: RotateCcw,
    title: "Retours & échanges",
    text: "Un retour ou échange peut être demandé si l’article reçu ne correspond pas à votre commande.",
  },
];

export default function LivraisonRetoursPage() {
  return (
    <>
      <Header />

      <main className={styles.page} data-aos="fade-up">
        <section className={styles.hero}>
          <div className={styles.heroGrid}>
            <div className={styles.heroContent} data-aos="fade-up">
              <span className={styles.eyebrow}>Service client</span>

              <h1>
                Livraison & <span>retours</span>
              </h1>

              <p>
                Une expérience d’achat claire, soignée et rassurante. Chaque
                commande Maison Élyra est préparée à Fès, puis expédiée partout
                au Maroc avec attention.
              </p>

              <div className={styles.heroActions}>
                <a href="#conditions" className={styles.primaryButton}>
                  Voir les conditions
                  <ArrowUpRight size={16} strokeWidth={1.7} />
                </a>

                <a href="#contact" className={styles.secondaryButton}>
                  Besoin d’aide ?
                </a>
              </div>
            </div>

            <div className={styles.heroPanel} data-aos="fade-up">
              <span className={styles.panelLabel}>Maison Élyra</span>

              <div className={styles.panelContent}>
                <Truck size={34} strokeWidth={1.25} />
                <h2>Livraison au Maroc</h2>
                <p>Préparation soignée · Suivi simple · Service attentif</p>
              </div>

              <div className={styles.panelMeta}>
                <span>2—5 jours ouvrés</span>
                <span>Retours possibles</span>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.policySection}>
          <div className={styles.sectionHeader} data-aos="fade-up">
            <span className={styles.eyebrow}>Informations essentielles</span>
            <h2>Tout ce qu’il faut savoir avant de commander.</h2>
          </div>

          <div className={styles.policyGrid}>
            {policies.map((item) => {
              const Icon = item.icon;

              return (
                <article className={styles.policyCard} key={item.title} data-aos="fade-up">
                  <div className={styles.cardTop}>
                    <Icon size={24} strokeWidth={1.4} />
                    <span>Élyra care</span>
                  </div>

                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className={styles.timelineSection}>
          <div className={styles.timelineIntro} data-aos="fade-up">
            <span className={styles.eyebrow}>Processus</span>
            <h2>De notre atelier jusqu’à votre porte.</h2>
            <p>
              Nous avons pensé chaque étape pour que votre commande arrive dans
              les meilleures conditions.
            </p>
          </div>

          <div className={styles.timeline} data-aos="fade-up">
            {steps.map((step) => (
              <article className={styles.step} key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.conditions} id="conditions">
          <div className={styles.conditionsHeader} data-aos="fade-up">
            <span className={styles.eyebrow}>Conditions de retour</span>
            <h2>Avant de demander un retour.</h2>
          </div>

          <div className={styles.conditionsList} data-aos="fade-up">
            <div className={styles.conditionItem}>
              <Check size={18} strokeWidth={1.8} />
              <p>
                L’article doit être non porté, non utilisé et retourné dans son
                état d’origine.
              </p>
            </div>

            <div className={styles.conditionItem} data-aos="fade-in">
              <Check size={18} strokeWidth={1.8} />
              <p>
                La demande doit être effectuée rapidement après la réception de
                votre commande.
              </p>
            </div>

            <div className={styles.conditionItem} data-aos="fade-in">
              <Check size={18} strokeWidth={1.8} />
              <p>
                Les articles personnalisés ou utilisés ne peuvent pas être
                repris, sauf en cas de défaut confirmé.
              </p>
            </div>

            <div className={styles.conditionItem} data-aos="fade-in">
              <Check size={18} strokeWidth={1.8} />
              <p>
                Les frais de retour peuvent varier selon la situation et la
                ville de livraison.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.contact} id="contact" data-aos="fade-up">
          <div className={styles.contactInner} data-aos="fade-up">
            <div>
              <span className={styles.eyebrow}>Assistance</span>
              <h2 className={styles.titleContact}>Une question sur votre commande ?</h2>
            </div>

            <div className={styles.contactBox}>
              <MessageCircle size={26} strokeWidth={1.4} />
              <p>
                Notre équipe vous accompagne pour le suivi, la livraison ou une
                demande de retour.
              </p>

              <a href="#" className={styles.contactButton}>
                Contacter le service client
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}