import Link from "next/link";
import {
  ArrowUpRight,
  Camera,
  MessageCircle,
  Mail,
} from "lucide-react";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          {/* BRAND */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              MAISON ÉLYRA
            </Link>

            <p className={styles.tagline}>
              Des pièces en cuir façonnées à Fès,
              <br />
              pensées pour durer au-delà des saisons.
            </p>

            <div className={styles.socials}>
              <Link href="#" aria-label="Instagram">
                <Camera size={18} strokeWidth={1.4} />
              </Link>

              <Link href="#" aria-label="Facebook">
                <MessageCircle size={18} strokeWidth={1.4} />
              </Link>

              <Link
                href="mailto:contact@maisonelyra.com"
                aria-label="E-mail"
              >
                <Mail size={18} strokeWidth={1.4} />
              </Link>
            </div>
          </div>

          {/* LINKS */}
          <div className={styles.linksGrid}>
            <div className={styles.linksColumn}>
              <p className={styles.columnTitle}>Découvrir</p>

              <Link href="/nouveautes">Nouveautés</Link>
              <Link href="/sacs">Sacs</Link>
              <Link href="/sandales">Sandales</Link>
              <Link href="/bottes">Bottes</Link>
            </div>

            <div className={styles.linksColumn}>
              <p className={styles.columnTitle}>La Maison</p>

              <Link href="/notre-histoire">Notre histoire</Link>
              <Link href="/savoir-faire">Notre savoir-faire</Link>
              <Link href="/journal">Journal</Link>
              <Link href="/contact">Nous contacter</Link>
            </div>

            <div className={styles.linksColumn}>
              <p className={styles.columnTitle}>Services</p>

              <Link href="/livraison">Livraison</Link>
              <Link href="/retours">Retours & échanges</Link>
              <Link href="/guide-entretien">Guide d’entretien</Link>
              <Link href="/faq">FAQ</Link>
            </div>
          </div>

          {/* NEWSLETTER */}
          <div className={styles.newsletter}>
            <p className={styles.columnTitle}>Le carnet Élyra</p>

            <h3>
              Recevez nos nouveautés
              <br />
              et histoires de maison.
            </h3>

            <form className={styles.newsletterForm}>
              <input
                type="email"
                placeholder="Votre adresse e-mail"
                aria-label="Votre adresse e-mail"
              />

              <button
                type="submit"
                aria-label="S’inscrire à la newsletter"
              >
                <ArrowUpRight size={18} strokeWidth={1.5} />
              </button>
            </form>

            <p className={styles.privacy}>
              En vous inscrivant, vous acceptez notre politique de
              confidentialité.
            </p>
          </div>
        </div>

        {/* STATEMENT */}
        <div className={styles.statement}>
          <span>Maison Élyra</span>
          <p>Le cuir, façonné lentement.</p>
        </div>

        {/* BOTTOM */}
        <div className={styles.bottom}>
          <p>© 2026 Maison Élyra. Tous droits réservés.</p>

          <div className={styles.legalLinks}>
            <Link href="/mentions-legales">Mentions légales</Link>
            <Link href="/confidentialite">Confidentialité</Link>
            <Link href="/conditions">Conditions générales</Link>
          </div>

          <p className={styles.location}>Fès · Maroc</p>
        </div>
      </div>
    </footer>
  );
}