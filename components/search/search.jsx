"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Search, X } from "lucide-react";

import { products } from "@/data/products";
import styles from "./search.module.css";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

function normalizeText(value = "") {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export default function SearchPanel({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const panelRef = useRef(null);

  // Garde onClose dans une ref : l'effet ne se relance plus si le parent
  // passe une fonction inline (onClose={() => setOpen(false)}).
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      return;
    }

    // Mémorise l'élément actif pour lui rendre le focus à la fermeture.
    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;

    const timer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 250);

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onCloseRef.current?.();
        return;
      }

      if (event.key !== "Tab") return;

      // Focus trap : Tab boucle à l'intérieur du panneau.
      const focusables = panelRef.current?.querySelectorAll(FOCUSABLE_SELECTOR);
      if (!focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !panelRef.current.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);

      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus();
      }
    };
  }, [isOpen]);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = normalizeText(query);

    if (!normalizedQuery) {
      return products.slice(0, 6);
    }

    return products.filter((product) =>
      normalizeText(
        `${product.name} ${product.category} ${product.type} ${product.color}`
      ).includes(normalizedQuery)
    );
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className={styles.searchLayer}>
      {/* Backdrop : div, pas button — il ne doit pas être dans l'ordre de tabulation.
          La fermeture au clavier est déjà gérée par Escape. */}
      <div
        className={styles.backdrop}
        onClick={onClose}
        aria-hidden="true"
      />

      <section
        ref={panelRef}
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label="Recherche de produits"
      >
        <div className={styles.header}>
          <div>
            <span className={styles.eyebrow}>Maison Élyra</span>
            <h2>Que recherchez-vous ?</h2>
          </div>

          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Fermer la recherche"
          >
            <X size={22} strokeWidth={1.4} />
          </button>
        </div>

        <div className={styles.searchBox}>
          <Search size={22} strokeWidth={1.3} aria-hidden="true" />

          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher un sac, des sandales, des bottes..."
            aria-label="Rechercher un produit"
          />

          {query && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={() => setQuery("")}
            >
              Effacer
            </button>
          )}
        </div>

        <div className={styles.content}>
          <div className={styles.resultsHeader}>
            <span>{query ? "Résultats" : "Suggestions"}</span>

            <span aria-live="polite">
              {filteredProducts.length.toString().padStart(2, "0")} produits
            </span>
          </div>

          {filteredProducts.length > 0 ? (
            <div className={styles.resultsGrid}>
              {filteredProducts.map((product) => (
                <Link
                  href={product.href}
                  className={styles.productCard}
                  key={product.id}
                  onClick={onClose}
                >
                  <div className={styles.productImage}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 700px) 90px, 140px"
                    />
                  </div>

                  <div className={styles.productInfo}>
                    <span className={styles.category}>
                      {product.category} · {product.color}
                    </span>

                    <h3>{product.name}</h3>

                    <span className={styles.type}>{product.type}</span>

                    <strong>{product.price.toLocaleString("fr-FR")} MAD</strong>
                  </div>

                  <ArrowUpRight
                    className={styles.arrow}
                    size={18}
                    strokeWidth={1.4}
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <span>Aucun résultat</span>

              <h3>Nous n’avons trouvé aucun produit pour « {query} ».</h3>

              <button type="button" onClick={() => setQuery("")}>
                Voir les suggestions
              </button>
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <span>Recherches populaires</span>

          <div className={styles.popularSearches}>
            {["Sacs", "Sandales", "Bottes", "Cognac"].map((item) => (
              <button type="button" key={item} onClick={() => setQuery(item)}>
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}