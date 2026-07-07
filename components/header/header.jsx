"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Heart,
  UserRound,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import styles from "./header.module.css";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);

  return (
    <>
      <header className={styles.header} data-aos="fade-up">
        <div className={styles.navbar} >
          <button
            type="button"
            className={styles.mobileMenuButton}
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <Menu size={22} strokeWidth={1.4} />
          </button>

          <Link href="/" className={styles.logo}>
            <span>MAISON ÉLYRA</span>
            <small>FÈS · MAROC</small>
          </Link>

          <nav className={styles.desktopNavigation}>
            <div className={styles.shopItem}>
              <button type="button" className={styles.shopButton}>
                Shop
                <ChevronDown size={13} strokeWidth={1.4} />
              </button>

              <div className={styles.shopDropdown}>
                <div className={styles.dropdownIntro}>
                  <span>La collection</span>

                  <p>
                    Des pièces en cuir façonnées à la main, pensées pour durer.
                  </p>
                </div>

                <div className={styles.dropdownLinks}>
                  <Link href="/nouveautes">
                    <span>01</span>
                    Nouveautés
                  </Link>

                  <Link href="/sacs">
                    <span>02</span>
                    Sacs
                  </Link>

                  <Link href="/sandales">
                    <span>03</span>
                    Sandales
                  </Link>

                  <Link href="/bottes">
                    <span>04</span>
                    Bottes
                  </Link>
                </div>
              </div>
            </div>

            <Link href="/notre-histoire">Livraison & Retours</Link>
          </nav>

          <div className={styles.actions}>
            <button type="button" aria-label="Rechercher">
              <Search size={20} strokeWidth={1.35} />
            </button>

            <Link href="/wishlist" aria-label="Favoris">
              <Heart size={20} strokeWidth={1.35} />
            </Link>

            <Link href="/account" aria-label="Mon compte">
              <UserRound size={20} strokeWidth={1.35} />
            </Link>

            <Link href="/cart" className={styles.cart} aria-label="Panier">
              <ShoppingBag size={20} strokeWidth={1.35} />
              <span>0</span>
            </Link>
          </div>
        </div>

        <div className={styles.brandStrip}>
          <div className={styles.brandStripTrack}>
            <span>Fait main à Fès</span>
            <i />
            <span>Cuir authentique</span>
            <i />
            <span>Livraison partout au Maroc</span>
            <i />
            <span>Fait main à Fès</span>
            <i />
            <span>Cuir authentique</span>
            <i />
            <span>Livraison partout au Maroc</span>
          </div>
        </div>
      </header>

      <div
        className={`${styles.mobileOverlay} ${
          mobileMenuOpen ? styles.mobileOverlayOpen : ""
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      <aside
        className={`${styles.mobileMenu} ${
          mobileMenuOpen ? styles.mobileMenuOpen : ""
        }`}
      >
        <div className={styles.mobileMenuHeader}>
          <Link href="/" onClick={() => setMobileMenuOpen(false)}>
            MAISON ÉLYRA
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Fermer le menu"
          >
            <X size={22} strokeWidth={1.4} />
          </button>
        </div>

        <nav className={styles.mobileNavigation}>
          <button
            type="button"
            className={styles.mobileShopButton}
            onClick={() => setMobileShopOpen(!mobileShopOpen)}
          >
            Shop
            <ChevronDown
              size={16}
              strokeWidth={1.4}
              className={mobileShopOpen ? styles.chevronOpen : ""}
            />
          </button>

          <div
            className={`${styles.mobileShopLinks} ${
              mobileShopOpen ? styles.mobileShopLinksOpen : ""
            }`}
          >
            <Link
              href="/nouveautes"
              onClick={() => setMobileMenuOpen(false)}
            >
              Nouveautés
            </Link>

            <Link href="/sacs" onClick={() => setMobileMenuOpen(false)}>
              Sacs
            </Link>

            <Link href="/sandales" onClick={() => setMobileMenuOpen(false)}>
              Sandales
            </Link>

            <Link href="/bottes" onClick={() => setMobileMenuOpen(false)}>
              Bottes
            </Link>
          </div>

          <Link
            href="/notre-histoire"
            onClick={() => setMobileMenuOpen(false)}
          >
            La Maison
          </Link>
        </nav>

        <div className={styles.mobileFooter}>
          <Link href="/account">Mon compte</Link>
          <Link href="/wishlist">Mes favoris</Link>
        </div>
      </aside>
    </>
  );
}