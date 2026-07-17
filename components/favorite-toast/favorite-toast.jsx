"use client";

import Image from "next/image";
import { Heart, X } from "lucide-react";

import styles from "./favorite-toast.module.css";

export default function FavoriteToast({ toast, onClose }) {
  if (!toast) return null;

  return (
    <div
      className={`${styles.toast} ${
        toast.action === "removed" ? styles.removedToast : ""
      }`}
      role="status"
      aria-live="polite"
    >
      <div className={styles.imageWrapper}>
        <Image
          src={toast.product.image}
          alt={toast.product.name}
          fill
          sizes="62px"
        />
      </div>

      <div className={styles.content}>
        <div className={styles.iconWrapper}>
          <Heart
            size={15}
            strokeWidth={1.5}
            fill={toast.action === "added" ? "currentColor" : "none"}
          />

          <span>
            {toast.action === "added"
              ? "Ajouté aux favoris"
              : "Retiré des favoris"}
          </span>
        </div>

        <strong>{toast.product.name}</strong>
      </div>

      <button
        type="button"
        className={styles.closeButton}
        onClick={onClose}
        aria-label="Fermer la notification"
      >
        <X size={17} strokeWidth={1.5} />
      </button>

      <span className={styles.progressBar} />
    </div>
  );
}